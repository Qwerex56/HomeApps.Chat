# The chat plugin's image. The HomeApps kit comes from the local feed (HomeApps' scripts/pack.sh), passed in as an
# extra build context named "homeapps"; compose.yaml does that, or by hand:
#   docker build --build-context homeapps=$HOME/.homeapps/packages -t homeapps/chat:1.0.0 .
# The UI is not built here: its build in src/Chat.Api/wwwroot/ui is committed (npm run build in src/Chat.Web).
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY --from=homeapps . /packages/
COPY .editorconfig global.json Directory.Build.props Directory.Packages.props nuget.config ./
COPY src/ src/
# nuget.config reads the feed from %HOME%/.homeapps/packages; inside the image it is /packages.
RUN sed -i 's#%HOME%/.homeapps/packages#/packages#' nuget.config \
 && dotnet publish src/Chat.Api/Chat.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
# ffprobe reads films (length, size, rotation), ffmpeg makes their covers and drops their metadata (plan 4.3).
# Photos go through SkiaSharp, whose native library comes with the app (NoDependencies).
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /data/media && chown $APP_UID /data/media
WORKDIR /app
COPY --from=build /app/publish .
USER $APP_UID
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
# The chat_media volume; an empty named volume takes this folder's owner on first use.
VOLUME /data/media
ENTRYPOINT ["dotnet", "Chat.Api.dll"]

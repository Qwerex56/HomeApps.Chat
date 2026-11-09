# HomeApps.Chat

Plugin „Czat” dla [HomeApps](../HomeApps): rozmowa całego domu, pokoje wybranych osób i rozmowy 1:1, tekst w
Markdownie, zdjęcia i filmy (do 30 s i 20 MB). Żyje poza repo HomeApps i korzysta z jego kitu (paczki `HomeApps.*`
z lokalnego feedu) oraz kontraktu pluginów (`docs/plugins.md` w HomeApps). Plan i decyzje: [docs/plan.md](docs/plan.md).

## Stan

| Etap | Co | Stan |
|---|---|---|
| C1 `chat/domain` | `Conversation` (dom, pokoje, 1:1), `Message`, `Attachment`, `ReadMarker` + testy | gotowe |
| C2 `chat/api` | Application, Infrastructure, Api (port 5410), hub SignalR, media | gotowe |
| C3 `chat/web` | UI pluginu (`src/Chat.Web`) i widżet | gotowe |
| C4 `chat/docker` | obraz z `ffmpeg`, `compose.yaml`, wolumin `chat_media` | dalej |

## Wymagania

- .NET SDK 10
- Kit HomeApps **2.2.0** w lokalnym feedzie: w repo HomeApps uruchom `scripts/pack.sh`
  (pakuje do `~/.homeapps/packages`, z którego czyta `nuget.config` tego repo).

## Budowanie i testy

```bash
dotnet test
```

Testy API potrzebują Dockera (Postgres z Testcontainers) i `ffmpeg`/`ffprobe` na `PATH` (`brew install ffmpeg`).

## UI (`src/Chat.Web`)

Vue wg `docs/plugins.md` HomeApps („UI”): strona czatu i widżet „Czat” (tylko strona domu). Zbudowany moduł leży w
`src/Chat.Api/wwwroot/ui` i jest w repo, więc sam .NET wystarcza do uruchomienia. Po zmianach w UI:

```bash
cd src/Chat.Web
npm install
npm test        # vitest: Markdown, oś czasu, sprawdzanie plików
npm run build   # vue-tsc + vite → ../Chat.Api/wwwroot/ui
```

Rozmowę na ekranie trzyma adres (`/homes/{hid}/apps/chat?c={cid}`), tam też prowadzi powiadomienie.

## Uruchomienie w dev

`dotnet run --project src/Chat.Api` startuje na `http://localhost:5410` (Postgres i RabbitMQ z `compose.yaml` HomeApps,
Auth na 5100, Households na 5300). Pliki trafiają do `src/Chat.Api/media/`, klucz podpisu linków jest w
`appsettings.Development.json`; w produkcji `Chat__Media__SigningKey` (C4: `CHAT_MEDIA_SIGNING_KEY` w `.env`).

## API w skrócie

Wszystko pod `/plugins/chat/api/households/{hid}` (tabela w [planie, sekcja 6](docs/plan.md)):
`conversations` (lista z licznikami, `direct`, `read`, `mute`, `messages` z `before`/`after`), `rooms` (zakładanie,
nazwa, uczestnicy, `leave` z `successorId`, `archive`), `messages/{id}` (edycja, usunięcie, `reactions/{emoji}`),
`attachments` (multipart, odpowiedź `202`, potem `AttachmentChanged`), `unread`, `storage`. Pliki:
`/plugins/chat/media/{id}/{original|preview|thumb}?exp=&sig=` (bez tokenu, z podpisem, `Range`).

Hub `/plugins/chat/hub` (`?access_token=`): `Watch(householdId)`, `Open(conversationId?)`, `Typing(householdId,
conversationId)`; do klienta idą małe sygnały z samymi id: `MessageSent`, `MessageEdited`, `MessageDeleted`,
`ReactionChanged`, `ReadMarkerMoved`, `ConversationChanged`, `AttachmentChanged`, `Typing`, `AccessChanged`.

## Domena w skrócie

- **`Conversation`**: „Dom” (nikogo nie wypisuje, decyduje członkostwo w domu), **pokój** (nazwa do 60 znaków,
  uczestnicy, opiekun: zmienia nazwę, usuwa innych, archiwizuje; dodawać może każdy uczestnik; wyjść może każdy,
  opiekun przy wyjściu wskazuje następcę, ostatni archiwizuje) i **1:1** (jedna na parę osób). Pokoje i 1:1 czytają tylko uczestnicy, także nie Owner domu.
- **`Message`**: Markdown do 4000 znaków zapisany surowo, do 10 załączników, odpowiedź na wiadomość z tej samej
  rozmowy, edycja przez autora zawsze z „(edytowano)”, usunięcie przez autora albo moderatora w rozmowie „Dom”
  (zostaje „Wiadomość usunięta”), reakcje: jedno emoji raz na osobę. `ClientMessageId` chroni przed duplikatem po
  zerwanym połączeniu, `SentVia` przygotowane pod MCP, `Encryption` pod tajne rozmowy po 1.0.
- **`Attachment`**: wgrywany przed wysłaniem, `Pending` → `Ready` (albo `Failed` z kodem powodu) → `Attached`; tylko
  własne i gotowe można wysłać; nieużyty po 24 h do sprzątnięcia.
- **`ReadMarker`**: do której wiadomości ktoś przeczytał rozmowę; tylko do przodu.
- **Gość** czyta, nie pisze; widzi wiadomości od dnia dołączenia do domu, w pokoju od chwili dodania, jeśli później.

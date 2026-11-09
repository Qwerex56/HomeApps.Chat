# HomeApps.Chat

Plugin „Czat” dla [HomeApps](../HomeApps): rozmowa całego domu, pokoje wybranych osób i rozmowy 1:1, tekst w
Markdownie, zdjęcia i filmy (do 30 s i 20 MB). Żyje poza repo HomeApps i korzysta z jego kitu (paczki `HomeApps.*`
z lokalnego feedu) oraz kontraktu pluginów (`docs/plugins.md` w HomeApps). Plan i decyzje: [docs/plan.md](docs/plan.md).

## Stan

| Etap | Co | Stan |
|---|---|---|
| C1 `chat/domain` | `Conversation` (dom, pokoje, 1:1), `Message`, `Attachment`, `ReadMarker` + testy | gotowe |
| C2 `chat/api` | Application, Infrastructure, Api (port 5410), hub SignalR, media | dalej |
| C3 `chat/web` | UI pluginu i widżet | |
| C4 `chat/docker` | obraz z `ffmpeg`, `compose.yaml`, wolumin `chat_media` | |

## Wymagania

- .NET SDK 10
- Kit HomeApps **2.2.0** w lokalnym feedzie: w repo HomeApps uruchom `scripts/pack.sh`
  (pakuje do `~/.homeapps/packages`, z którego czyta `nuget.config` tego repo).

## Budowanie i testy

```bash
dotnet test
```

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

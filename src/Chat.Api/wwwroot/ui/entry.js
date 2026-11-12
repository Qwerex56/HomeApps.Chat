import { C as e, F as t, G as n, H as r, I as i, O as a, R as o, S as s, T as c, V as l, _ as u, c as d, d as f, g as p, h as m, i as h, k as g, n as _, p as v, r as y, t as b, w as x, x as S, y as C, z as w } from "./_plugin-vue_export-helper-B9B-GG00.js";
// src/ChatWidget.vue?vue&type=script&setup=true&lang.ts
var T = { class: "chat-widget" }, E = {
	key: 0,
	class: "chat-widget__loading"
}, D = {
	key: 0,
	class: "chat-widget__messages"
}, O = { class: "chat-widget__text" }, k = ["datetime"], A = {
	key: 1,
	class: "chat-widget__empty"
}, j = u({
	id: "chat",
	routes: { "": () => import("./ChatPage-BGYOOSW_.js") },
	widgets: { chat: /* @__PURE__ */ b(/* @__PURE__ */ g({
		__name: "ChatWidget",
		props: {
			householdId: {},
			place: {}
		},
		setup(u) {
			let g = u, { host: b, api: j, conversations: M, nameOf: N } = h(() => g.householdId), P = v(), F = p(), I = S(() => M.data.value?.find((e) => e.kind === "Household") ?? null), L = S(() => (M.data.value ?? []).reduce((e, t) => e + t.unread, 0)), R = m({
				queryKey: S(() => y.recent(g.householdId, I.value?.id ?? null)),
				queryFn: () => j.value.messages(I.value.id, {}, 8),
				enabled: S(() => !!I.value),
				refetchInterval: _
			}), z = S(() => (R.data.value ?? []).filter((e) => !e.deleted).slice(-4)), B = f(b.manifest.endpoints.realtime ?? "/plugins/chat/hub", b.accessToken, g.householdId), V = () => F.invalidateQueries({ queryKey: y.all(g.householdId) }), H = [
				B.on("MessageSent", V),
				B.on("MessageEdited", V),
				B.on("MessageDeleted", V),
				B.on("ReadMarkerMoved", V),
				B.on("ConversationChanged", V),
				B.onReconnected(V)
			];
			t(() => {
				H.forEach((e) => e()), B.stop();
			});
			let U = (e) => e.length === 1 ? b.t(e[0].kind === "Video" ? "media.video" : "media.photo") : b.t("media.count", { count: e.length }), W = S(() => `/homes/${g.householdId}/apps/chat`);
			return (t, u) => {
				let f = w("Skeleton"), p = w("Badge"), m = w("RouterLink");
				return i(), x("div", T, [r(M).isPending.value || r(R).isPending.value ? (i(), x("div", E, [(i(), x(C, null, o(3, (e) => a(f, {
					key: e,
					height: "1.5rem"
				})), 64))])) : (i(), x(C, { key: 1 }, [z.value.length ? (i(), x("ul", D, [(i(!0), x(C, null, o(z.value, (e) => (i(), x("li", { key: e.id }, [
					c("strong", null, l(r(N)(e.authorId)), 1),
					c("span", O, l(r(d)(e.text, 120) || U(e.attachments)), 1),
					c("time", { datetime: e.sentAt }, l(r(P).when(e.sentAt)), 9, k)
				]))), 128))])) : (i(), x("p", A, l(r(b).t("widget.empty")), 1)), a(m, {
					to: W.value,
					class: "chat-widget__open"
				}, {
					default: n(() => [
						u[0] ||= c("i", {
							class: "pi pi-comments",
							"aria-hidden": "true"
						}, null, -1),
						c("span", null, l(r(b).t("widget.open")), 1),
						L.value ? (i(), s(p, {
							key: 0,
							value: L.value > 99 ? "99+" : L.value,
							"aria-label": r(b).t("widget.unread", { count: L.value })
						}, null, 8, ["value", "aria-label"])) : e("", !0)
					]),
					_: 1
				}, 8, ["to"])], 64))]);
			};
		}
	}), [["__scopeId", "data-v-c30d6934"]]) },
	messages: {
		pl: {
			home: "Dom",
			someone: "Ktoś",
			you: "ty",
			back: "Wróć do listy rozmów",
			close: "Zamknij",
			cancel: "Anuluj",
			save: "Zapisz",
			create: "Utwórz",
			add: "Dodaj",
			retry: "Ponów",
			loadFailed: "Nie udało się wczytać wiadomości.",
			newMessages: "Nowe wiadomości",
			list: {
				title: "Rozmowy",
				rooms: "Pokoje",
				direct: "Prywatne",
				archived: "Archiwum ({count})"
			},
			day: {
				today: "Dziś",
				yesterday: "Wczoraj"
			},
			direct: {
				new: "Napisz prywatnie",
				empty: "W tym domu nie ma jeszcze nikogo poza tobą."
			},
			room: {
				new: "Nowy pokój",
				name: "Nazwa pokoju",
				people: "Kto jest w pokoju",
				nobodyToAdd: "Wszyscy domownicy już tu są.",
				addPeople: "Dodaj osoby",
				details: "Pokój i uczestnicy",
				participants: "Uczestnicy: {count}",
				keeper: "opiekun",
				remove: "Usuń z pokoju: {name}",
				leave: "Opuść pokój",
				leaveConfirm: "Opuścić pokój? Wrócisz, gdy ktoś doda cię ponownie.",
				leaveLastConfirm: "Jesteś tu ostatnią osobą. Po wyjściu pokój trafi do archiwum.",
				successor: "Kto zostaje opiekunem pokoju",
				successorPlaceholder: "Wybierz osobę",
				archive: "Archiwizuj pokój",
				archiveConfirm: "Zarchiwizować pokój? Historię da się dalej czytać, ale nikt już w nim nie napisze.",
				archived: "W archiwum",
				archivedNote: "Pokój jest w archiwum: można czytać, nie można pisać."
			},
			mute: {
				title: "Powiadomienia",
				muted: "Wyciszona",
				off: "Włącz powiadomienia",
				eightHours: "Wycisz na 8 godzin",
				forever: "Wycisz"
			},
			message: {
				viaAssistant: "przez JARVIS-a",
				deleted: "Wiadomość usunięta",
				edited: "edytowana",
				actions: "Działania na wiadomości",
				seen: "Przeczytano",
				reply: "Odpowiedz",
				edit: "Edytuj",
				delete: "Usuń wiadomość",
				deleteConfirm: "Usunąć tę wiadomość? Zniknie u wszystkich razem ze zdjęciami i filmami.",
				react: "Reakcja {emoji}"
			},
			quote: { hidden: "Wiadomość sprzed twojego dołączenia" },
			media: {
				count: "Zdjęcia i filmy: {count}",
				gallery: "Zdjęcia i filmy",
				photo: "Zdjęcie",
				video: "Film",
				original: "Oryginał",
				previous: "Poprzednie",
				next: "Następne",
				openPhoto: "Pokaż zdjęcie",
				openVideo: "Odtwórz film"
			},
			composer: {
				placeholder: "Napisz wiadomość",
				send: "Wyślij",
				attach: "Dodaj zdjęcie lub film",
				camera: "Zrób zdjęcie lub nagraj film",
				editing: "Edytujesz wiadomość"
			},
			upload: {
				unsupported: "To nie jest zdjęcie ani film, który umiemy pokazać.",
				tooLarge: "Plik jest za duży (najwyżej 20 MB).",
				tooLong: "Film jest za długi (najwyżej 30 sekund).",
				failed: "Nie udało się dodać pliku.",
				storageFull: "W tym domu zabrakło miejsca na zdjęcia i filmy. Usuń stare albo poproś administratora o więcej.",
				tooMany: "Do jednej wiadomości można dodać najwyżej {count} plików.",
				processing: "Sprawdzanie…",
				remove: "Usuń plik {name}"
			},
			send: {
				sending: "Wysyłanie…",
				failed: "Nie wysłano.",
				discard: "Usuń"
			},
			typing: {
				one: "{name} pisze…",
				many: "{names} piszą…"
			},
			guest: {
				readsFrom: "Widzisz wiadomości od dnia dołączenia.",
				readOnly: "Jako gość możesz tylko czytać rozmowy."
			},
			empty: {
				writable: "Nikt tu jeszcze nie napisał. Zacznij rozmowę.",
				readOnly: "Nikt tu jeszcze nie napisał."
			},
			notice: {
				renamed: "Pokój nazywa się teraz „{name}”.",
				joined: "Nowa osoba w pokoju: {name}.",
				left: "Z pokoju wychodzi {name}.",
				keeper: "Opiekunem pokoju jest teraz {name}.",
				archived: "Pokój trafił do archiwum."
			},
			widget: {
				open: "Otwórz czat",
				empty: "W rozmowie domu nikt jeszcze nie napisał.",
				unread: "Nieprzeczytane: {count}"
			},
			assistant: {
				name: "JARVIS",
				setting: "JARVIS w czacie",
				mentionHint: "Tab, żeby wstawić",
				actions: "Co zrobił JARVIS",
				confirm: "Potwierdź",
				cancel: "Anuluj",
				until: "do {time}",
				expired: "Wygasło, poproś jeszcze raz.",
				waitsForAsker: "Czeka na potwierdzenie osoby, która prosiła.",
				status: {
					Done: "Zrobione",
					Failed: "Nie udało się",
					NeedsConfirmation: "Czeka",
					Denied: "Anulowane",
					Expired: "Wygasło"
				}
			}
		},
		en: {
			home: "Home",
			someone: "Someone",
			you: "you",
			back: "Back to conversations",
			close: "Close",
			cancel: "Cancel",
			save: "Save",
			create: "Create",
			add: "Add",
			retry: "Retry",
			loadFailed: "Could not load the messages.",
			newMessages: "New messages",
			list: {
				title: "Conversations",
				rooms: "Rooms",
				direct: "Direct",
				archived: "Archive ({count})"
			},
			day: {
				today: "Today",
				yesterday: "Yesterday"
			},
			direct: {
				new: "Write privately",
				empty: "Nobody but you is in this household yet."
			},
			room: {
				new: "New room",
				name: "Room name",
				people: "Who is in the room",
				nobodyToAdd: "Everyone in the household is already here.",
				addPeople: "Add people",
				details: "Room and participants",
				participants: "Participants: {count}",
				keeper: "keeper",
				remove: "Remove from the room: {name}",
				leave: "Leave room",
				leaveConfirm: "Leave the room? You come back when someone adds you again.",
				leaveLastConfirm: "You are the last person here. The room is archived once you leave.",
				successor: "Who keeps the room next",
				successorPlaceholder: "Choose a person",
				archive: "Archive room",
				archiveConfirm: "Archive the room? Its history stays readable, but nobody can write in it any more.",
				archived: "Archived",
				archivedNote: "The room is archived: you can read it but not write."
			},
			mute: {
				title: "Notifications",
				muted: "Muted",
				off: "Turn notifications on",
				eightHours: "Mute for 8 hours",
				forever: "Mute"
			},
			message: {
				viaAssistant: "via JARVIS",
				deleted: "Message deleted",
				edited: "edited",
				actions: "Message actions",
				seen: "Seen",
				reply: "Reply",
				edit: "Edit",
				delete: "Delete message",
				deleteConfirm: "Delete this message? It disappears for everyone, with its photos and videos.",
				react: "React with {emoji}"
			},
			quote: { hidden: "A message from before you joined" },
			media: {
				count: "Photos and videos: {count}",
				gallery: "Photos and videos",
				photo: "Photo",
				video: "Video",
				original: "Original",
				previous: "Previous",
				next: "Next",
				openPhoto: "Show photo",
				openVideo: "Play video"
			},
			composer: {
				placeholder: "Write a message",
				send: "Send",
				attach: "Add a photo or video",
				camera: "Take a photo or record a video",
				editing: "Editing a message"
			},
			upload: {
				unsupported: "This is not a photo or video we can show.",
				tooLarge: "The file is too large (20 MB at most).",
				tooLong: "The video is too long (30 seconds at most).",
				failed: "Could not add the file.",
				storageFull: "This household has no room left for photos and videos. Delete old ones or ask the admin for more.",
				tooMany: "A message takes {count} files at most.",
				processing: "Checking…",
				remove: "Remove file {name}"
			},
			send: {
				sending: "Sending…",
				failed: "Not sent.",
				discard: "Discard"
			},
			typing: {
				one: "{name} is typing…",
				many: "{names} are typing…"
			},
			guest: {
				readsFrom: "You see messages from the day you joined.",
				readOnly: "As a guest you can only read conversations."
			},
			empty: {
				writable: "Nobody has written here yet. Start the conversation.",
				readOnly: "Nobody has written here yet."
			},
			notice: {
				renamed: "The room is now called “{name}”.",
				joined: "New in the room: {name}.",
				left: "{name} leaves the room.",
				keeper: "{name} keeps the room now.",
				archived: "The room was archived."
			},
			widget: {
				open: "Open chat",
				empty: "Nobody has written in the household conversation yet.",
				unread: "Unread: {count}"
			},
			assistant: {
				name: "JARVIS",
				setting: "JARVIS in the chat",
				mentionHint: "Tab to insert",
				actions: "What JARVIS did",
				confirm: "Confirm",
				cancel: "Cancel",
				until: "until {time}",
				expired: "Expired, ask again.",
				waitsForAsker: "Waits for the person who asked.",
				status: {
					Done: "Done",
					Failed: "Failed",
					NeedsConfirmation: "Waiting",
					Denied: "Cancelled",
					Expired: "Expired"
				}
			}
		}
	}
});
export { j as default };

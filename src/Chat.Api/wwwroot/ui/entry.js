import { B as e, C as t, D as n, F as r, L as i, O as a, P as o, R as s, S as c, V as l, W as u, b as d, f, g as p, h as m, i as h, m as g, n as _, r as v, s as y, t as b, u as x, v as S, w as C, x as w } from "./_plugin-vue_export-helper-C1WJ0WEO.js";
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
}, j = p({
	id: "chat",
	routes: { "": () => import("./ChatPage-VGaSiryI.js") },
	widgets: { chat: /* @__PURE__ */ b(/* @__PURE__ */ a({
		__name: "ChatWidget",
		props: {
			householdId: {},
			place: {}
		},
		setup(a) {
			let p = a, { host: b, api: j, conversations: M, nameOf: N } = h(() => p.householdId), P = f(), F = m(), I = d(() => M.data.value?.find((e) => e.kind === "Household") ?? null), L = d(() => (M.data.value ?? []).reduce((e, t) => e + t.unread, 0)), R = g({
				queryKey: d(() => v.recent(p.householdId, I.value?.id ?? null)),
				queryFn: () => j.value.messages(I.value.id, {}, 8),
				enabled: d(() => !!I.value),
				refetchInterval: _
			}), z = d(() => (R.data.value ?? []).filter((e) => !e.deleted).slice(-4)), B = x(b.manifest.endpoints.realtime ?? "/plugins/chat/hub", b.accessToken, p.householdId), V = () => F.invalidateQueries({ queryKey: v.all(p.householdId) }), H = [
				B.on("MessageSent", V),
				B.on("MessageEdited", V),
				B.on("MessageDeleted", V),
				B.on("ReadMarkerMoved", V),
				B.on("ConversationChanged", V),
				B.onReconnected(V)
			];
			o(() => {
				H.forEach((e) => e()), B.stop();
			});
			let U = (e) => e.length === 1 ? b.t(e[0].kind === "Video" ? "media.video" : "media.photo") : b.t("media.count", { count: e.length }), W = d(() => `/homes/${p.householdId}/apps/chat`);
			return (a, o) => {
				let d = s("Skeleton"), f = s("Badge"), p = s("RouterLink");
				return r(), t("div", T, [l(M).isPending.value || l(R).isPending.value ? (r(), t("div", E, [(r(), t(S, null, i(3, (e) => n(d, {
					key: e,
					height: "1.5rem"
				})), 64))])) : (r(), t(S, { key: 1 }, [z.value.length ? (r(), t("ul", D, [(r(!0), t(S, null, i(z.value, (n) => (r(), t("li", { key: n.id }, [
					C("strong", null, e(l(N)(n.authorId)), 1),
					C("span", O, e(l(y)(n.text, 120) || U(n.attachments)), 1),
					C("time", { datetime: n.sentAt }, e(l(P).when(n.sentAt)), 9, k)
				]))), 128))])) : (r(), t("p", A, e(l(b).t("widget.empty")), 1)), n(p, {
					to: W.value,
					class: "chat-widget__open"
				}, {
					default: u(() => [
						o[0] ||= C("i", {
							class: "pi pi-comments",
							"aria-hidden": "true"
						}, null, -1),
						C("span", null, e(l(b).t("widget.open")), 1),
						L.value ? (r(), w(f, {
							key: 0,
							value: L.value > 99 ? "99+" : L.value,
							"aria-label": l(b).t("widget.unread", { count: L.value })
						}, null, 8, ["value", "aria-label"])) : c("", !0)
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
			}
		}
	}
});
export { j as default };

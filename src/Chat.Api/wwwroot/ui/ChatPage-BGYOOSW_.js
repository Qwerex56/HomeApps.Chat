import { A as e, B as t, C as n, D as r, E as i, F as a, G as o, H as s, I as c, K as l, L as u, M as d, N as f, O as p, P as m, R as h, S as g, T as _, U as v, V as y, W as b, a as x, b as S, d as C, f as w, i as T, j as E, k as D, l as O, m as k, o as A, p as j, s as M, t as N, u as P, v as F, w as I, x as L, y as R, z } from "./_plugin-vue_export-helper-B9B-GG00.js";
// \0homeapps-shared:vue-router
var B = globalThis.__HOMEAPPS_SHARED__?.["vue-router"];
if (!B) throw Error("HomeApps does not share vue-router; is this plugin loaded by the HomeApps web app?");
B.default;
var { NavigationFailureType: V, RouterLink: ee, RouterView: H, START_LOCATION: U, createMemoryHistory: te, createRouter: W, createRouterMatcher: G, createWebHashHistory: K, createWebHistory: ne, isNavigationFailure: re, loadRouteLocation: q, matchedRouteKey: J, onBeforeRouteLeave: Y, onBeforeRouteUpdate: X, parseQuery: ie, routeLocationKey: Z, routerKey: ae, routerViewLocationKey: oe, stringifyQuery: se, useLink: ce, useRoute: le, useRouter: Q, viewDepthKey: ue } = B, de = ["aria-label"], fe = {
	key: 0,
	class: "chat-list__actions"
}, pe = { key: 0 }, $ = ["onClick"], me = { class: "chat-list__name" }, he = ["title"], ge = {
	key: 4,
	class: "chat-list__when"
}, _e = {
	key: 1,
	class: "chat-list__assistant"
}, ve = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "ConversationList",
	props: {
		chat: {},
		conversations: {},
		selectedId: {},
		formatWhen: { type: Function }
	},
	emits: [
		"select",
		"newRoom",
		"newDirect"
	],
	setup(e, { emit: t }) {
		let i = e, a = t, { host: o, titleOf: l, otherOf: f, avatarOf: m, initialOf: v, canRooms: b, canDirect: x, canSettings: S, assistantOn: C, changeSettings: w } = i.chat, T = u(!1);
		async function E(e) {
			T.value = !0;
			try {
				await w({ assistant: e });
			} catch (e) {
				o.notify("error", o.errorMessage(e));
			} finally {
				T.value = !1;
			}
		}
		let D = (e, t) => (t.lastMessageAt ?? t.createdAt).localeCompare(e.lastMessageAt ?? e.createdAt), O = L(() => i.conversations.filter((e) => e.kind === "Household")), k = L(() => i.conversations.filter((e) => e.kind === "Room" && !e.archived).sort(D)), A = L(() => i.conversations.filter((e) => e.kind === "Direct").sort(D)), j = L(() => i.conversations.filter((e) => e.kind === "Room" && e.archived).sort(D)), M = u(!1), N = L(() => [
			{
				key: "home",
				label: null,
				items: O.value
			},
			{
				key: "rooms",
				label: o.t("list.rooms"),
				items: k.value
			},
			{
				key: "direct",
				label: o.t("list.direct"),
				items: A.value
			},
			{
				key: "archived",
				label: null,
				items: M.value ? j.value : []
			}
		].filter((e) => e.items.length));
		return (t, i) => {
			let u = z("Button"), w = z("Avatar"), D = z("Badge"), O = z("ToggleSwitch");
			return c(), I("nav", {
				class: "chat-list",
				"aria-label": s(o).t("list.title")
			}, [
				s(b) || s(x) ? (c(), I("div", fe, [s(b) ? (c(), g(u, {
					key: 0,
					label: s(o).t("room.new"),
					icon: "pi pi-plus",
					size: "small",
					severity: "secondary",
					outlined: "",
					onClick: i[0] ||= (e) => a("newRoom")
				}, null, 8, ["label"])) : n("", !0), s(x) ? (c(), g(u, {
					key: 1,
					label: s(o).t("direct.new"),
					icon: "pi pi-user",
					size: "small",
					severity: "secondary",
					outlined: "",
					onClick: i[1] ||= (e) => a("newDirect")
				}, null, 8, ["label"])) : n("", !0)])) : n("", !0),
				(c(!0), I(R, null, h(N.value, (t) => (c(), I(R, { key: t.key }, [t.label ? (c(), I("h3", pe, y(t.label), 1)) : n("", !0), (c(!0), I(R, null, h(t.items, (t) => (c(), I("button", {
					key: t.id,
					type: "button",
					class: d(["chat-list__item", {
						active: t.id === e.selectedId,
						unread: t.unread > 0
					}]),
					onClick: (e) => a("select", t.id)
				}, [
					t.kind === "Direct" ? (c(), g(w, {
						key: 0,
						image: s(m)(s(f)(t)) ?? void 0,
						label: s(m)(s(f)(t)) ? void 0 : s(v)(s(f)(t)),
						shape: "circle"
					}, null, 8, ["image", "label"])) : (c(), g(w, {
						key: 1,
						icon: t.kind === "Household" ? "pi pi-home" : t.archived ? "pi pi-inbox" : "pi pi-hashtag",
						shape: "circle"
					}, null, 8, ["icon"])),
					_("span", me, y(s(l)(t)), 1),
					t.muted ? (c(), I("i", {
						key: 2,
						class: "pi pi-bell-slash chat-list__muted",
						title: s(o).t("mute.muted"),
						"aria-hidden": "true"
					}, null, 8, he)) : n("", !0),
					t.unread ? (c(), g(D, {
						key: 3,
						value: t.unread > 99 ? "99+" : t.unread,
						severity: t.muted ? "secondary" : void 0
					}, null, 8, ["value", "severity"])) : t.lastMessageAt ? (c(), I("span", ge, y(e.formatWhen(t.lastMessageAt)), 1)) : n("", !0)
				], 10, $))), 128))], 64))), 128)),
				s(S) ? (c(), I("label", _e, [p(O, {
					"model-value": s(C),
					disabled: T.value,
					"onUpdate:modelValue": E
				}, null, 8, ["model-value", "disabled"]), _("span", null, y(s(o).t("assistant.setting")), 1)])) : n("", !0),
				j.value.length ? (c(), I("button", {
					key: 2,
					type: "button",
					class: "chat-list__archive",
					onClick: i[2] ||= (e) => M.value = !M.value
				}, [_("i", {
					class: d(["pi", M.value ? "pi-chevron-up" : "pi-chevron-down"]),
					"aria-hidden": "true"
				}, null, 2), r(" " + y(s(o).t("list.archived", { count: j.value.length })), 1)])) : n("", !0)
			], 8, de);
		};
	}
}), [["__scopeId", "data-v-aa2fc833"]]);
// src/useThread.ts
function ye(e, n, r) {
	let i = t([]), a = u([]), o = u([]), s = u(!1), c = u(!1), l = u(!1), d = u(!1), f = 0, p = Promise.resolve(), m = /* @__PURE__ */ new Set(), h = (e, t) => {
		let n = new Set(e.map((e) => e.id));
		return [...e, ...t.filter((e) => !n.has(e.id))];
	}, g = () => {
		let e = new Set(i.value.map((e) => e.clientMessageId));
		a.value = a.value.filter((t) => !e.has(t.clientMessageId));
	};
	async function _() {
		let t = n.value, c = ++f;
		if (i.value = [], a.value = [], o.value = [], l.value = !1, d.value = !1, m.clear(), t) {
			s.value = !0;
			try {
				let n = await e.value.messages(t);
				if (c !== f) return;
				i.value = n, l.value = n.length === 50;
			} catch (e) {
				if (c !== f) return;
				d.value = !0, r(e);
			} finally {
				c === f && (s.value = !1);
			}
		}
	}
	b(n, _, { immediate: !0 });
	async function v() {
		let t = n.value, a = i.value[0];
		if (!t || !a || !l.value || c.value) return;
		let o = f;
		c.value = !0;
		try {
			let n = await e.value.messages(t, { before: a.id });
			if (o !== f) return;
			let r = new Set(i.value.map((e) => e.id));
			i.value = [...n.filter((e) => !r.has(e.id)), ...i.value], l.value = n.length === 50;
		} catch (e) {
			o === f && r(e);
		} finally {
			c.value = !1;
		}
	}
	function y() {
		return p = p.then(async () => {
			let t = n.value, r = f;
			if (t && !s.value) try {
				for (;;) {
					let n = i.value[i.value.length - 1], a = await e.value.messages(t, n ? { after: n.id } : {});
					if (r !== f) return;
					if (i.value = h(i.value, a), n || (l.value = a.length === 50), !n || a.length < 50) break;
				}
				g();
			} catch {}
		}), p;
	}
	async function x(t) {
		if (!i.value.some((e) => e.id === t)) return;
		let n = f;
		try {
			let r = await e.value.message(t);
			if (n !== f) return;
			i.value = i.value.map((e) => e.id === t ? r : e);
		} catch {}
	}
	function S(e) {
		m.has(e) || (m.add(e), x(e));
	}
	async function C(t) {
		let i = n.value;
		if (!i) return;
		let o = f;
		t.failed = !1;
		try {
			await e.value.send(i, {
				clientMessageId: t.clientMessageId,
				text: t.text,
				attachmentIds: t.attachments.map((e) => e.id),
				replyToId: t.replyTo?.id ?? null
			}), o === f && await y();
		} catch (e) {
			if (o !== f) return;
			let n = a.value.find((e) => e.clientMessageId === t.clientMessageId);
			n && (n.failed = !0), r(e);
		}
	}
	function w(e, t, n) {
		let r = {
			clientMessageId: M(),
			text: e,
			attachments: t,
			replyTo: n,
			sentAt: (/* @__PURE__ */ new Date()).toISOString(),
			failed: !1
		};
		a.value.push(r), C(a.value[a.value.length - 1]);
	}
	let T = (e) => void C(e), E = (e) => {
		a.value = a.value.filter((t) => t.clientMessageId !== e.clientMessageId);
	};
	function D(e) {
		o.value.push({
			id: M(),
			text: e,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return {
		messages: i,
		outgoing: a,
		notices: o,
		loading: s,
		loadingOlder: c,
		hasOlder: l,
		failed: d,
		load: _,
		loadOlder: v,
		catchUp: y,
		refresh: x,
		refreshMedia: S,
		send: w,
		retry: T,
		discard: E,
		notice: D
	};
}
// src/MediaGallery.vue?vue&type=script&setup=true&lang.ts
var be = ["aria-label"], xe = ["src", "poster"], Se = ["src", "alt"], Ce = { class: "chat-gallery__bar" }, we = { key: 0 }, Te = ["href"], Ee = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "MediaGallery",
	props: {
		items: {},
		start: {}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let r = e, i = t, o = F(), d = u(r.start), f = L(() => r.items[d.value]), h = (e) => d.value = (d.value + e + r.items.length) % r.items.length;
		function v(e) {
			e.key === "Escape" ? i("close") : e.key === "ArrowLeft" ? h(-1) : e.key === "ArrowRight" && h(1);
		}
		return m(() => window.addEventListener("keydown", v)), a(() => window.removeEventListener("keydown", v)), (t, r) => {
			let a = z("Button");
			return c(), g(S, { to: "body" }, [_("div", {
				class: "chat-gallery",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": s(o).t("media.gallery"),
				onClick: r[3] ||= l((e) => i("close"), ["self"])
			}, [
				f.value ? (c(), I(R, { key: 0 }, [f.value.kind === "Video" ? (c(), I("video", {
					key: f.value.id,
					class: "chat-gallery__media",
					src: f.value.originalUrl ?? void 0,
					poster: f.value.thumbUrl ?? void 0,
					controls: "",
					autoplay: "",
					playsinline: ""
				}, null, 8, xe)) : (c(), I("img", {
					key: `i-${f.value.id}`,
					class: "chat-gallery__media",
					src: f.value.previewUrl ?? f.value.originalUrl ?? void 0,
					alt: f.value.description ?? s(o).t("media.photo")
				}, null, 8, Se))], 64)) : n("", !0),
				_("div", Ce, [
					e.items.length > 1 ? (c(), I("span", we, y(d.value + 1) + " / " + y(e.items.length), 1)) : n("", !0),
					f.value?.originalUrl ? (c(), I("a", {
						key: 1,
						href: f.value.originalUrl,
						target: "_blank",
						rel: "noopener noreferrer"
					}, y(s(o).t("media.original")), 9, Te)) : n("", !0),
					p(a, {
						icon: "pi pi-times",
						rounded: "",
						severity: "secondary",
						"aria-label": s(o).t("close"),
						onClick: r[0] ||= (e) => i("close")
					}, null, 8, ["aria-label"])
				]),
				e.items.length > 1 ? (c(), I(R, { key: 1 }, [p(a, {
					class: "chat-gallery__prev",
					icon: "pi pi-chevron-left",
					rounded: "",
					severity: "secondary",
					"aria-label": s(o).t("media.previous"),
					onClick: r[1] ||= (e) => h(-1)
				}, null, 8, ["aria-label"]), p(a, {
					class: "chat-gallery__next",
					icon: "pi pi-chevron-right",
					rounded: "",
					severity: "secondary",
					"aria-label": s(o).t("media.next"),
					onClick: r[2] ||= (e) => h(1)
				}, null, 8, ["aria-label"])], 64)) : n("", !0)
			], 8, be)]);
		};
	}
}), [["__scopeId", "data-v-f00cc410"]]);
// src/mention.ts
function De(e, t) {
	let n = e.slice(0, t), r = /(^|[^\p{L}\p{N}_@])@([\p{L}\p{N}_]*)$/u.exec(n);
	if (!r) return null;
	let i = r[2] ?? "";
	return {
		start: t - i.length - 1,
		query: i
	};
}
function Oe(e, t, n, r) {
	let i = `@${r} `, a = e.slice(n).replace(/^[\p{L}\p{N}_]*/u, "");
	return {
		text: e.slice(0, t.start) + i + a.replace(/^ /, ""),
		caret: t.start + i.length
	};
}
var ke = (e) => e.type.startsWith("video/"), Ae = (e) => e.type.startsWith("image/");
function je(e) {
	return new Promise((t) => {
		let n = URL.createObjectURL(e), r = document.createElement("video"), i = (e) => {
			URL.revokeObjectURL(n), t(e);
		};
		r.preload = "metadata", r.onloadedmetadata = () => i(Number.isFinite(r.duration) ? r.duration : null), r.onerror = () => i(null), r.src = n;
	});
}
async function Me(e, t = je) {
	if (!Ae(e) && !ke(e)) return "unsupported";
	if (e.size > 20971520) return "tooLarge";
	if (ke(e)) {
		let n = await t(e);
		if (n !== null && n > 30.5) return "tooLong";
	}
	return null;
}
function Ne(e) {
	switch (e) {
		case "attachment.too_large": return "tooLarge";
		case "attachment.too_long": return "tooLong";
		case "attachment.unsupported":
		case "attachment.unreadable": return "unsupported";
		default: return null;
	}
}
// src/MessageComposer.vue?vue&type=script&setup=true&lang.ts
var Pe = { class: "chat-composer" }, Fe = {
	key: 0,
	class: "chat-composer__context"
}, Ie = {
	key: 1,
	class: "chat-composer__context"
}, Le = {
	key: 2,
	class: "chat-composer__uploads"
}, Re = { class: "chat-upload__preview" }, ze = ["src"], Be = ["aria-valuenow"], Ve = {
	key: 0,
	class: "chat-upload__problem"
}, He = {
	key: 1,
	class: "chat-upload__note"
}, Ue = { class: "chat-composer__row" }, We = 4e3, Ge = "Jarvis", Ke = 3e3, qe = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "MessageComposer",
	props: {
		api: {},
		hub: {},
		replyTo: {},
		editing: {},
		nameOf: { type: Function },
		assistant: { type: Boolean }
	},
	emits: [
		"send",
		"save",
		"cancelReply",
		"cancelEdit",
		"typing"
	],
	setup(e, { emit: t }) {
		let i = e, o = t, m = F(), v = u(""), x = u(0), S = L(() => {
			if (!i.assistant || i.editing) return null;
			let e = De(v.value, x.value);
			return e && Ge.toLowerCase().startsWith(e.query.toLowerCase()) ? e : null;
		});
		function C() {
			let e = N();
			if (!S.value || !e) return;
			let t = Oe(v.value, S.value, x.value, Ge);
			v.value = t.text, x.value = t.caret, E(() => {
				e.focus(), e.setSelectionRange(t.caret, t.caret);
			});
		}
		let T = () => x.value = N()?.selectionStart ?? v.value.length, D = u([]), O = u(null), k = u(null), j = u(null), N = () => O.value?.$el ?? null, B = L(() => D.value.some((e) => e.state === "uploading" || e.state === "processing")), V = L(() => D.value.filter((e) => e.state === "ready" && e.attachment)), ee = L(() => B.value ? !1 : i.editing ? v.value.trim().length > 0 : v.value.trim().length > 0 || V.value.length > 0);
		b(() => i.editing, (e, t) => {
			e ? v.value = e.text ?? "" : t && (v.value = ""), E(() => N()?.focus());
		}), b(() => i.replyTo, (e) => e && void E(() => N()?.focus()));
		let H = (e) => m.t(`upload.${e ?? "failed"}`);
		async function U(e) {
			if (e) for (let t of [...e]) {
				if (D.value.length >= 10) {
					m.notify("warn", m.t("upload.tooMany", { count: 10 }));
					break;
				}
				let e = {
					key: M(),
					name: t.name,
					video: ke(t),
					localUrl: t.type.startsWith("image/") ? URL.createObjectURL(t) : null,
					progress: 0,
					state: "uploading",
					problem: null,
					attachment: null,
					abort: new AbortController()
				};
				D.value.push(e), te(D.value[D.value.length - 1], t);
			}
		}
		async function te(e, t) {
			let n = await Me(t);
			if (n) e.state = "failed", e.problem = H(n);
			else try {
				W(e, await i.api.upload(t, (t) => e.progress = t, e.abort.signal));
			} catch (t) {
				if (e.abort.signal.aborted) return;
				e.state = "failed";
				let n = A(t);
				e.problem = n === "chat.storage_full" ? m.t("upload.storageFull") : Ne(n) ? H(Ne(n)) : m.errorMessage(t);
			}
		}
		function W(e, t) {
			e.attachment = t, t.status === "Failed" ? (e.state = "failed", e.problem = H(Ne(t.failureCode))) : e.state = t.status === "Pending" ? "processing" : "ready";
		}
		async function G(e) {
			if (e.attachment) try {
				W(e, await i.api.attachment(e.attachment.id));
			} catch {}
		}
		w(i.hub, "AttachmentChanged", (e) => {
			let t = D.value.find((t) => t.attachment?.id === e.attachmentId);
			t && G(t);
		});
		let K = setInterval(() => D.value.filter((e) => e.state === "processing").forEach((e) => void G(e)), Ke);
		function ne(e) {
			e.localUrl && URL.revokeObjectURL(e.localUrl);
		}
		function re(e) {
			e.abort.abort(), ne(e), D.value = D.value.filter((t) => t.key !== e.key);
		}
		a(() => {
			clearInterval(K), D.value.forEach((e) => {
				e.abort.abort(), ne(e);
			});
		});
		function q() {
			if (!ee.value) return;
			let e = v.value.trim();
			i.editing ? o("save", e) : (o("send", e || null, V.value.map((e) => e.attachment)), D.value.forEach(ne), D.value = [], v.value = "");
		}
		let J = 0;
		function Y() {
			T();
			let e = Date.now();
			i.editing || e - J < 3e3 || !v.value || (J = e, o("typing"));
		}
		function X(e) {
			if (e.key === "Tab" && S.value) {
				e.preventDefault(), C();
				return;
			}
			if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
				e.preventDefault(), q();
				return;
			}
			if (e.key === "Escape") {
				i.editing ? o("cancelEdit") : i.replyTo && o("cancelReply");
				return;
			}
			let t = (e.ctrlKey || e.metaKey) && !e.altKey ? {
				b: "**",
				i: "_"
			}[e.key.toLowerCase()] : void 0, n = N();
			if (!t || !n) return;
			e.preventDefault();
			let r = P(v.value, n.selectionStart, n.selectionEnd, t);
			v.value = r.text, E(() => n.setSelectionRange(r.start, r.end));
		}
		function ie(e) {
			let t = e.target;
			U(t.files), t.value = "";
		}
		function Z(e) {
			!i.editing && e.clipboardData?.files.length && (e.preventDefault(), U(e.clipboardData.files));
		}
		return (t, i) => {
			let a = z("Button"), u = z("ProgressSpinner"), b = z("Textarea");
			return c(), I("div", Pe, [
				e.editing ? (c(), I("div", Fe, [
					i[5] ||= _("i", {
						class: "pi pi-pencil",
						"aria-hidden": "true"
					}, null, -1),
					_("span", null, y(s(m).t("composer.editing")), 1),
					p(a, {
						icon: "pi pi-times",
						text: "",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": s(m).t("cancel"),
						onClick: i[0] ||= (e) => o("cancelEdit")
					}, null, 8, ["aria-label"])
				])) : e.replyTo ? (c(), I("div", Ie, [
					i[6] ||= _("i", {
						class: "pi pi-reply",
						"aria-hidden": "true"
					}, null, -1),
					_("span", null, [_("strong", null, y(e.nameOf(e.replyTo.authorId)), 1), r(" " + y(e.replyTo.text || s(m).t("media.count", { count: e.replyTo.attachments.length })), 1)]),
					p(a, {
						icon: "pi pi-times",
						text: "",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": s(m).t("cancel"),
						onClick: i[1] ||= (e) => o("cancelReply")
					}, null, 8, ["aria-label"])
				])) : n("", !0),
				D.value.length ? (c(), I("ul", Le, [(c(!0), I(R, null, h(D.value, (e) => (c(), I("li", {
					key: e.key,
					class: d(`chat-upload chat-upload--${e.state}`)
				}, [
					_("div", Re, [
						e.attachment?.thumbUrl || e.localUrl ? (c(), I("img", {
							key: 0,
							src: e.attachment?.thumbUrl ?? e.localUrl ?? void 0,
							alt: ""
						}, null, 8, ze)) : (c(), I("i", {
							key: 1,
							class: d(["pi", e.video ? "pi-video" : "pi-image"]),
							"aria-hidden": "true"
						}, null, 2)),
						e.state === "processing" ? (c(), g(u, {
							key: 2,
							class: "chat-upload__spinner",
							"stroke-width": "6"
						})) : n("", !0),
						e.state === "uploading" ? (c(), I("div", {
							key: 3,
							class: "chat-upload__bar",
							role: "progressbar",
							"aria-valuenow": Math.round(e.progress * 100)
						}, [_("div", { style: f({ width: `${Math.round(e.progress * 100)}%` }) }, null, 4)], 8, Be)) : n("", !0)
					]),
					e.state === "failed" ? (c(), I("p", Ve, y(e.problem), 1)) : e.state === "processing" ? (c(), I("p", He, y(s(m).t("upload.processing")), 1)) : n("", !0),
					p(a, {
						class: "chat-upload__remove",
						icon: "pi pi-times",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": s(m).t("upload.remove", { name: e.name }),
						onClick: (t) => re(e)
					}, null, 8, ["aria-label", "onClick"])
				], 2))), 128))])) : n("", !0),
				_("div", Ue, [
					e.editing ? n("", !0) : (c(), I(R, { key: 0 }, [
						_("input", {
							ref_key: "fileInput",
							ref: k,
							type: "file",
							accept: "image/*,video/*",
							multiple: "",
							hidden: "",
							onChange: ie
						}, null, 544),
						_("input", {
							ref_key: "cameraInput",
							ref: j,
							type: "file",
							accept: "image/*,video/*",
							capture: "environment",
							hidden: "",
							onChange: ie
						}, null, 544),
						p(a, {
							icon: "pi pi-paperclip",
							text: "",
							rounded: "",
							severity: "secondary",
							"aria-label": s(m).t("composer.attach"),
							onClick: i[2] ||= (e) => k.value?.click()
						}, null, 8, ["aria-label"]),
						p(a, {
							class: "chat-composer__camera",
							icon: "pi pi-camera",
							text: "",
							rounded: "",
							severity: "secondary",
							"aria-label": s(m).t("composer.camera"),
							onClick: i[3] ||= (e) => j.value?.click()
						}, null, 8, ["aria-label"])
					], 64)),
					S.value ? (c(), I("button", {
						key: 1,
						type: "button",
						class: "chat-composer__mention",
						onMousedown: l(C, ["prevent"])
					}, [
						i[7] ||= _("i", {
							class: "pi pi-sparkles",
							"aria-hidden": "true"
						}, null, -1),
						r(" @" + y(Ge) + " "),
						_("span", null, y(s(m).t("assistant.mentionHint")), 1)
					], 32)) : n("", !0),
					p(b, {
						ref_key: "field",
						ref: O,
						modelValue: v.value,
						"onUpdate:modelValue": i[4] ||= (e) => v.value = e,
						class: "chat-composer__field",
						rows: "1",
						"auto-resize": "",
						maxlength: We,
						placeholder: s(m).t("composer.placeholder"),
						"aria-label": s(m).t("composer.placeholder"),
						onKeydown: X,
						onInput: Y,
						onClick: T,
						onKeyup: T,
						onPaste: Z
					}, null, 8, [
						"modelValue",
						"placeholder",
						"aria-label"
					]),
					p(a, {
						icon: e.editing ? "pi pi-check" : "pi pi-send",
						rounded: "",
						disabled: !ee.value,
						"aria-label": s(m).t(e.editing ? "save" : "composer.send"),
						onClick: q
					}, null, 8, [
						"icon",
						"disabled",
						"aria-label"
					])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-d09c1cfd"]]), Je = ["aria-label"], Ye = { class: "chat-card__line" }, Xe = { class: "chat-card__text" }, Ze = { class: "chat-card__status" }, Qe = {
	key: 0,
	class: "chat-card__decide"
}, $e = {
	key: 0,
	class: "chat-card__until"
}, et = {
	key: 1,
	class: "chat-card__until"
}, tt = {
	key: 2,
	class: "chat-card__until"
}, nt = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "ActionCard",
	props: {
		actions: {},
		canDecide: { type: Boolean },
		time: { type: Function }
	},
	emits: ["decide"],
	setup(e, { emit: t }) {
		let r = e, i = t, a = F(), o = u(null), l = {
			Done: "pi pi-check-circle",
			Failed: "pi pi-times-circle",
			NeedsConfirmation: "pi pi-question-circle",
			Denied: "pi pi-ban",
			Expired: "pi pi-clock"
		}, f = (e) => e.status === "NeedsConfirmation" && e.confirmBy && Date.parse(e.confirmBy) < Date.now() ? "Expired" : e.status;
		function m(e, t) {
			e.confirmationId && (o.value = e.confirmationId, i("decide", e.confirmationId, t, () => o.value = null));
		}
		return (t, i) => {
			let u = z("Button");
			return c(), I("ul", {
				class: "chat-card",
				"aria-label": s(a).t("assistant.actions")
			}, [(c(!0), I(R, null, h(r.actions, (t, r) => (c(), I("li", {
				key: t.confirmationId ?? r,
				class: d(`chat-card__line--${f(t)}`)
			}, [_("div", Ye, [
				_("i", {
					class: d(l[f(t)] ?? "pi pi-circle"),
					"aria-hidden": "true"
				}, null, 2),
				_("span", Xe, y(t.description), 1),
				_("span", Ze, y(s(a).t(`assistant.status.${f(t)}`)), 1)
			]), f(t) === "NeedsConfirmation" && e.canDecide ? (c(), I("div", Qe, [
				p(u, {
					label: s(a).t("assistant.confirm"),
					size: "small",
					loading: o.value === t.confirmationId,
					onClick: (e) => m(t, !0)
				}, null, 8, [
					"label",
					"loading",
					"onClick"
				]),
				p(u, {
					label: s(a).t("assistant.cancel"),
					size: "small",
					severity: "secondary",
					disabled: o.value === t.confirmationId,
					onClick: (e) => m(t, !1)
				}, null, 8, [
					"label",
					"disabled",
					"onClick"
				]),
				t.confirmBy ? (c(), I("span", $e, y(s(a).t("assistant.until", { time: e.time(t.confirmBy) })), 1)) : n("", !0)
			])) : f(t) === "NeedsConfirmation" ? (c(), I("p", et, y(s(a).t("assistant.waitsForAsker")), 1)) : f(t) === "Expired" ? (c(), I("p", tt, y(s(a).t("assistant.expired")), 1)) : n("", !0)], 2))), 128))], 8, Je);
		};
	}
}), [["__scopeId", "data-v-5f6642c9"]]), rt = { class: "chat-message__avatar" }, it = { class: "chat-message__body" }, at = {
	key: 0,
	class: "chat-message__author"
}, ot = { class: "chat-message__row" }, st = {
	key: 0,
	class: "chat-message__quote"
}, ct = { key: 0 }, lt = ["aria-label", "onClick"], ut = ["src", "alt"], dt = {
	key: 0,
	class: "chat-message__play"
}, ft = ["innerHTML"], pt = { class: "chat-message__meta" }, mt = { key: 0 }, ht = { key: 1 }, gt = {
	key: 2,
	class: "chat-message__reactions"
}, _t = [
	"title",
	"disabled",
	"onClick"
], vt = {
	key: 3,
	class: "chat-message__seen"
}, yt = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "MessageItem",
	props: {
		message: {},
		mine: { type: Boolean },
		lead: { type: Boolean },
		showAuthor: { type: Boolean },
		userId: {},
		time: {},
		nameOf: { type: Function },
		avatarOf: { type: Function },
		canAct: { type: Boolean },
		canReact: { type: Boolean },
		seen: { type: Boolean },
		timeOf: { type: Function }
	},
	emits: [
		"menu",
		"react",
		"media",
		"stale",
		"decide"
	],
	setup(e, { emit: t }) {
		let i = e, a = t, o = F(), l = L(() => i.message.text ? O(i.message.text) : ""), u = L(() => i.message.attachments.filter((e) => e.thumbUrl || e.originalUrl)), p = L(() => i.message.replyTo), m = L(() => {
			let e = p.value;
			return e ? e.visible ? e.deleted ? o.t("message.deleted") : e.text || o.t("media.count", { count: e.attachments }) : o.t("quote.hidden") : "";
		}), v = (e) => u.value.length === 1 && e.width && e.height ? `${e.width} / ${e.height}` : "1 / 1", b = L(() => i.message.authorKind === "Assistant"), x = L(() => b.value && !!i.userId && p.value?.authorId === i.userId), S = (e) => e.map((e) => i.nameOf(e)).join(", ");
		return (t, i) => {
			let C = z("Avatar"), w = z("Button");
			return c(), I("div", { class: d(["chat-message", {
				"chat-message--mine": e.mine,
				"chat-message--lead": e.lead
			}]) }, [_("div", rt, [e.lead && b.value ? (c(), g(C, {
				key: 0,
				icon: "pi pi-sparkles",
				shape: "circle",
				class: "chat-message__assistant"
			})) : e.lead && !e.mine ? (c(), g(C, {
				key: 1,
				image: e.avatarOf(e.message.authorId) ?? void 0,
				label: e.avatarOf(e.message.authorId) ? void 0 : e.nameOf(e.message.authorId).charAt(0).toUpperCase(),
				shape: "circle"
			}, null, 8, ["image", "label"])) : n("", !0)]), _("div", it, [
				e.lead && e.showAuthor && !e.mine ? (c(), I("div", at, y(e.nameOf(e.message.authorId)), 1)) : n("", !0),
				_("div", ot, [_("div", { class: d(["chat-message__bubble", { "chat-message__bubble--deleted": e.message.deleted }]) }, [e.message.deleted ? (c(), I(R, { key: 0 }, [r(y(s(o).t("message.deleted")), 1)], 64)) : (c(), I(R, { key: 1 }, [
					p.value ? (c(), I("div", st, [p.value.visible && p.value.authorId ? (c(), I("strong", ct, y(e.nameOf(p.value.authorId)), 1)) : n("", !0), _("span", null, y(m.value), 1)])) : n("", !0),
					u.value.length ? (c(), I("div", {
						key: 1,
						class: d(["chat-message__media", `chat-message__media--${Math.min(u.value.length, 3)}`])
					}, [(c(!0), I(R, null, h(u.value, (e, t) => (c(), I("button", {
						key: e.id,
						type: "button",
						class: "chat-message__thumb",
						style: f({ aspectRatio: v(e) }),
						"aria-label": s(o).t(e.kind === "Video" ? "media.openVideo" : "media.openPhoto"),
						onClick: (e) => a("media", u.value, t)
					}, [_("img", {
						src: e.thumbUrl ?? void 0,
						alt: e.description ?? "",
						loading: "lazy",
						onError: i[0] ||= (e) => a("stale")
					}, null, 40, ut), e.kind === "Video" ? (c(), I("span", dt, [...i[3] ||= [_("i", {
						class: "pi pi-play",
						"aria-hidden": "true"
					}, null, -1)]])) : n("", !0)], 12, lt))), 128))], 2)) : n("", !0),
					l.value ? (c(), I("div", {
						key: 2,
						class: "chat-message__text",
						innerHTML: l.value
					}, null, 8, ft)) : n("", !0)
				], 64)), _("div", pt, [
					e.message.sentVia === "Mcp" && !e.message.deleted ? (c(), I("span", mt, y(s(o).t("message.viaAssistant")) + " · ", 1)) : n("", !0),
					e.message.editedAt && !e.message.deleted ? (c(), I("span", ht, y(s(o).t("message.edited")) + " · ", 1)) : n("", !0),
					r(y(e.time), 1)
				])], 2), e.canAct && !e.message.deleted ? (c(), g(w, {
					key: 0,
					class: "chat-message__more",
					icon: "pi pi-ellipsis-h",
					text: "",
					rounded: "",
					size: "small",
					severity: "secondary",
					"aria-label": s(o).t("message.actions"),
					onClick: i[1] ||= (e) => a("menu", e)
				}, null, 8, ["aria-label"])) : n("", !0)]),
				e.message.actions.length && !e.message.deleted ? (c(), g(nt, {
					key: 1,
					actions: e.message.actions,
					"can-decide": x.value,
					time: e.timeOf,
					onDecide: i[2] ||= (e, t, n) => a("decide", e, t, n)
				}, null, 8, [
					"actions",
					"can-decide",
					"time"
				])) : n("", !0),
				e.message.reactions.length && !e.message.deleted ? (c(), I("div", gt, [(c(!0), I(R, null, h(e.message.reactions, (t) => (c(), I("button", {
					key: t.emoji,
					type: "button",
					class: d({ active: !!e.userId && t.userIds.includes(e.userId) }),
					title: S(t.userIds),
					disabled: !e.canReact,
					onClick: (n) => a("react", t.emoji, !!e.userId && t.userIds.includes(e.userId))
				}, [r(y(t.emoji) + " ", 1), _("span", null, y(t.userIds.length), 1)], 10, _t))), 128))])) : n("", !0),
				e.seen ? (c(), I("div", vt, [i[4] ||= _("i", {
					class: "pi pi-check",
					"aria-hidden": "true"
				}, null, -1), r(" " + y(s(o).t("message.seen")), 1)])) : n("", !0)
			])], 2);
		};
	}
}), [["__scopeId", "data-v-3260b7eb"]]), bt = { class: "chat-picker" }, xt = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "MemberPicker",
	props: /*@__PURE__*/ e({ members: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = v(e, "modelValue");
		function n(e) {
			t.value = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
		}
		return (r, i) => {
			let a = z("Checkbox"), o = z("Avatar");
			return c(), I("ul", bt, [(c(!0), I(R, null, h(e.members, (e) => (c(), I("li", { key: e.userId }, [_("label", null, [
				p(a, {
					"model-value": t.value.includes(e.userId),
					binary: "",
					"onUpdate:modelValue": (t) => n(e.userId)
				}, null, 8, ["model-value", "onUpdate:modelValue"]),
				p(o, {
					image: e.avatarUrl ?? void 0,
					label: e.avatarUrl ? void 0 : e.name.charAt(0).toUpperCase(),
					shape: "circle"
				}, null, 8, ["image", "label"]),
				_("span", null, y(e.name), 1)
			])]))), 128))]);
		};
	}
}), [["__scopeId", "data-v-a6c6a27e"]]), St = {
	key: 0,
	class: "chat-room-dialog__field"
}, Ct = { class: "chat-room-dialog__field" }, wt = {
	key: 1,
	class: "chat-room-dialog__empty"
}, Tt = { class: "chat-room-dialog__actions" }, Et = 60, Dt = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "RoomDialog",
	props: {
		mode: {},
		members: {},
		busy: { type: Boolean }
	},
	emits: ["submit", "close"],
	setup(e, { emit: t }) {
		let r = e, i = t, a = F(), d = u(""), f = u([]), m = L(() => r.mode === "add" ? f.value.length > 0 : d.value.trim().length > 0);
		function h() {
			m.value && !r.busy && i("submit", d.value.trim(), f.value);
		}
		return (t, r) => {
			let u = z("InputText"), v = z("Button"), b = z("Dialog");
			return c(), g(b, {
				visible: "",
				modal: "",
				header: s(a).t(e.mode === "create" ? "room.new" : "room.addPeople"),
				style: {
					width: "24rem",
					maxWidth: "95vw"
				},
				"onUpdate:visible": r[3] ||= (e) => i("close")
			}, {
				default: o(() => [_("form", {
					class: "chat-room-dialog",
					onSubmit: l(h, ["prevent"])
				}, [
					e.mode === "create" ? (c(), I("label", St, [_("span", null, y(s(a).t("room.name")), 1), p(u, {
						modelValue: d.value,
						"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
						maxlength: Et,
						autofocus: ""
					}, null, 8, ["modelValue"])])) : n("", !0),
					_("div", Ct, [_("span", null, y(s(a).t("room.people")), 1), e.members.length ? (c(), g(xt, {
						key: 0,
						modelValue: f.value,
						"onUpdate:modelValue": r[1] ||= (e) => f.value = e,
						members: e.members
					}, null, 8, ["modelValue", "members"])) : (c(), I("p", wt, y(s(a).t("room.nobodyToAdd")), 1))]),
					_("div", Tt, [p(v, {
						type: "button",
						label: s(a).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: r[2] ||= (e) => i("close")
					}, null, 8, ["label"]), p(v, {
						type: "submit",
						label: s(a).t(e.mode === "create" ? "create" : "add"),
						disabled: !m.value,
						loading: e.busy
					}, null, 8, [
						"label",
						"disabled",
						"loading"
					])])
				], 32)]),
				_: 1
			}, 8, ["header"]);
		};
	}
}), [["__scopeId", "data-v-cd6c8d45"]]), Ot = { class: "chat-room" }, kt = { class: "chat-room__people" }, At = { class: "chat-room__person" }, jt = {
	key: 2,
	class: "chat-room__danger"
}, Mt = { key: 0 }, Nt = { key: 1 }, Pt = { class: "chat-room__buttons" }, Ft = { class: "chat-room__buttons" }, It = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "RoomPanel",
	props: {
		conversation: {},
		chat: {}
	},
	emits: ["close", "left"],
	setup(e, { emit: t }) {
		let i = e, a = t, { host: d, userId: f, nameOf: m, avatarOf: v, initialOf: x, canRooms: S } = i.chat, C = L(() => i.conversation.keeperId === f.value), w = L(() => !i.conversation.archived), T = L(() => i.conversation.participantIds.filter((e) => e !== f.value)), E = L(() => (i.chat.members.data.value ?? []).filter((e) => !i.conversation.participantIds.includes(e.userId))), D = u(!1);
		async function O(e, t) {
			D.value = !0;
			try {
				await e(i.chat.api.value), t?.();
			} catch (e) {
				d.notify("error", d.errorMessage(e));
			} finally {
				D.value = !1, i.chat.refreshConversations();
			}
		}
		let k = u(i.conversation.name ?? "");
		b(() => i.conversation.name, (e) => k.value = e ?? "");
		let A = L(() => k.value.trim().length > 0 && k.value.trim() !== i.conversation.name), j = () => A.value && O((e) => e.renameRoom(i.conversation.id, k.value.trim())), M = u(!1), N = (e) => O((t) => t.addParticipants(i.conversation.id, e), () => M.value = !1), P = (e) => O((t) => t.removeParticipant(i.conversation.id, e)), F = u(!1), B = u(null), V = L(() => C.value && T.value.length > 0), ee = L(() => T.value.map((e) => ({
			id: e,
			name: m(e)
		}))), H = () => O((e) => e.leaveRoom(i.conversation.id, V.value ? B.value : null), () => a("left")), U = u(!1), te = () => O((e) => e.archiveRoom(i.conversation.id), () => U.value = !1);
		return (t, i) => {
			let u = z("Message"), b = z("InputText"), O = z("Button"), L = z("Avatar"), W = z("Tag"), G = z("Select"), K = z("Drawer");
			return c(), g(K, {
				visible: "",
				position: "right",
				header: e.conversation.name ?? "",
				class: "chat-room-drawer",
				"onUpdate:visible": i[9] ||= (e) => a("close")
			}, {
				default: o(() => [_("div", Ot, [
					e.conversation.archived ? (c(), g(u, {
						key: 0,
						severity: "secondary",
						closable: !1
					}, {
						default: o(() => [r(y(s(d).t("room.archivedNote")), 1)]),
						_: 1
					})) : n("", !0),
					C.value && w.value ? (c(), I("form", {
						key: 1,
						class: "chat-room__rename",
						onSubmit: l(j, ["prevent"])
					}, [_("label", null, [_("span", null, y(s(d).t("room.name")), 1), p(b, {
						modelValue: k.value,
						"onUpdate:modelValue": i[0] ||= (e) => k.value = e,
						maxlength: "60"
					}, null, 8, ["modelValue"])]), p(O, {
						type: "submit",
						label: s(d).t("save"),
						disabled: !A.value,
						loading: D.value
					}, null, 8, [
						"label",
						"disabled",
						"loading"
					])], 32)) : n("", !0),
					_("section", null, [
						_("h3", null, y(s(d).t("room.participants", { count: e.conversation.participantIds.length })), 1),
						_("ul", kt, [(c(!0), I(R, null, h(e.conversation.participantIds, (t) => (c(), I("li", { key: t }, [
							p(L, {
								image: s(v)(t) ?? void 0,
								label: s(v)(t) ? void 0 : s(x)(t),
								shape: "circle"
							}, null, 8, ["image", "label"]),
							_("span", At, [r(y(s(m)(t)), 1), t === s(f) ? (c(), I(R, { key: 0 }, [r(" (" + y(s(d).t("you")) + ")", 1)], 64)) : n("", !0)]),
							t === e.conversation.keeperId ? (c(), g(W, {
								key: 0,
								value: s(d).t("room.keeper"),
								severity: "secondary"
							}, null, 8, ["value"])) : C.value && w.value ? (c(), g(O, {
								key: 1,
								icon: "pi pi-user-minus",
								text: "",
								rounded: "",
								size: "small",
								severity: "secondary",
								"aria-label": s(d).t("room.remove", { name: s(m)(t) }),
								disabled: D.value,
								onClick: (e) => P(t)
							}, null, 8, [
								"aria-label",
								"disabled",
								"onClick"
							])) : n("", !0)
						]))), 128))]),
						s(S) && w.value ? (c(), g(O, {
							key: 0,
							label: s(d).t("room.addPeople"),
							icon: "pi pi-user-plus",
							severity: "secondary",
							outlined: "",
							size: "small",
							onClick: i[1] ||= (e) => M.value = !0
						}, null, 8, ["label"])) : n("", !0)
					]),
					e.conversation.participantIds.includes(s(f) ?? "") ? (c(), I("section", jt, [F.value ? (c(), I(R, { key: 0 }, [V.value ? (c(), I("label", Mt, [_("span", null, y(s(d).t("room.successor")), 1), p(G, {
						modelValue: B.value,
						"onUpdate:modelValue": i[2] ||= (e) => B.value = e,
						options: ee.value,
						"option-label": "name",
						"option-value": "id",
						placeholder: s(d).t("room.successorPlaceholder")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])])) : (c(), I("p", Nt, y(s(d).t(T.value.length ? "room.leaveConfirm" : "room.leaveLastConfirm")), 1)), _("div", Pt, [p(O, {
						label: s(d).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: i[3] ||= (e) => F.value = !1
					}, null, 8, ["label"]), p(O, {
						label: s(d).t("room.leave"),
						severity: "danger",
						disabled: V.value && !B.value,
						loading: D.value,
						onClick: H
					}, null, 8, [
						"label",
						"disabled",
						"loading"
					])])], 64)) : U.value ? (c(), I(R, { key: 1 }, [_("p", null, y(s(d).t("room.archiveConfirm")), 1), _("div", Ft, [p(O, {
						label: s(d).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: i[4] ||= (e) => U.value = !1
					}, null, 8, ["label"]), p(O, {
						label: s(d).t("room.archive"),
						severity: "danger",
						loading: D.value,
						onClick: te
					}, null, 8, ["label", "loading"])])], 64)) : (c(), I(R, { key: 2 }, [p(O, {
						label: s(d).t("room.leave"),
						icon: "pi pi-sign-out",
						severity: "danger",
						outlined: "",
						size: "small",
						onClick: i[5] ||= (e) => F.value = !0
					}, null, 8, ["label"]), C.value && w.value ? (c(), g(O, {
						key: 0,
						label: s(d).t("room.archive"),
						icon: "pi pi-inbox",
						severity: "secondary",
						outlined: "",
						size: "small",
						onClick: i[6] ||= (e) => U.value = !0
					}, null, 8, ["label"])) : n("", !0)], 64))])) : n("", !0)
				]), M.value ? (c(), g(Dt, {
					key: 0,
					mode: "add",
					members: E.value,
					busy: D.value,
					onSubmit: i[7] ||= (e, t) => N(t),
					onClose: i[8] ||= (e) => M.value = !1
				}, null, 8, ["members", "busy"])) : n("", !0)]),
				_: 1
			}, 8, ["header"]);
		};
	}
}), [["__scopeId", "data-v-02583563"]]), Lt = ["aria-label"], Rt = { class: "chat-pane__header" }, zt = { class: "chat-pane__title" }, Bt = { key: 0 }, Vt = {
	key: 0,
	class: "chat-pane__loading"
}, Ht = {
	key: 0,
	class: "chat-pane__older"
}, Ut = {
	key: 1,
	class: "chat-pane__note"
}, Wt = {
	key: 2,
	class: "chat-pane__note"
}, Gt = {
	key: 3,
	class: "chat-pane__note"
}, Kt = {
	key: 0,
	class: "chat-pane__day"
}, qt = {
	key: 1,
	class: "chat-pane__new"
}, Jt = {
	key: 2,
	class: "chat-pane__notice"
}, Yt = { class: "chat-outgoing__bubble" }, Xt = {
	key: 0,
	class: "chat-outgoing__media"
}, Zt = ["src"], Qt = ["innerHTML"], $t = { class: "chat-outgoing__state" }, en = {
	key: 4,
	class: "chat-pane__typing",
	"aria-live": "polite"
}, tn = {
	key: 2,
	class: "chat-pane__readonly"
}, nn = { class: "chat-reactions" }, rn = ["aria-label", "onClick"], an = { class: "chat-pane__confirm" }, on = 288e5, sn = 80, cn = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "ConversationPane",
	props: {
		chat: {},
		hub: {},
		conversation: {},
		typing: {},
		phone: { type: Boolean }
	},
	emits: ["back", "left"],
	setup(e, { emit: t }) {
		let l = e, f = t, { host: v, api: x, userId: S, nameOf: C, avatarOf: T, initialOf: D, otherOf: A, titleOf: M, canWrite: N, canModerate: P, assistantOn: F } = l.chat, B = j(), V = [
			"👍",
			"❤️",
			"😂",
			"😮",
			"😢",
			"🎉"
		], ee = L(() => l.conversation.id), H = (e) => v.notify("error", v.errorMessage(e)), U = ye(x, ee, H), te = L(() => l.conversation.kind === "Household"), W = L(() => l.conversation.kind === "Room"), G = L(() => N.value && !l.conversation.archived), K = l.conversation.unread > 0 ? l.conversation.lastReadMessageId : null, ne = L(() => k(U.messages.value, U.outgoing.value, U.notices.value, S.value, K)), re = L(() => {
			let e = l.conversation.otherReadMessageId;
			if (l.conversation.kind !== "Direct" || !e) return null;
			let t = U.messages.value;
			for (let n = t.findIndex((t) => t.id === e); n >= 0; n--) if (t[n].authorId === S.value) return t[n].id;
			return null;
		}), q = u(null), J = u(!0), Y = u(0), X = () => {
			let e = q.value;
			e && (e.scrollTop = e.scrollHeight), J.value = !0, Y.value = 0;
		}, ie = l.conversation.lastReadMessageId;
		function Z() {
			let e = U.messages.value[U.messages.value.length - 1];
			e && e.id !== ie && J.value && document.visibilityState === "visible" && (ie = e.id, x.value.markRead(l.conversation.id, e.id).then(() => l.chat.refreshConversations()).catch(() => void 0));
		}
		async function ae() {
			let e = q.value;
			if (!e || !U.hasOlder.value || U.loadingOlder.value) return;
			let t = e.scrollHeight;
			await U.loadOlder(), await E(), e.scrollTop += e.scrollHeight - t;
		}
		function oe() {
			let e = q.value;
			e && (J.value = e.scrollHeight - e.scrollTop - e.clientHeight < sn, J.value && (Y.value = 0, Z()), e.scrollTop < 160 && ae());
		}
		b(U.loading, async (e) => {
			if (e) return;
			await E();
			let t = q.value?.querySelector(".chat-pane__new");
			t ? t.scrollIntoView({ block: "center" }) : X(), oe();
		}), b(() => U.messages.value[U.messages.value.length - 1]?.id, async (e, t) => {
			if (!e || !t || U.loading.value) return;
			let n = J.value;
			await E(), n ? (X(), Z()) : Y.value++;
		}), b(() => U.outgoing.value.length + U.notices.value.length, async (e, t) => {
			e <= t || (await E(), X());
		}), b(() => l.typing.length, async () => {
			J.value && (await E(), X());
		});
		let se = () => Z();
		m(() => document.addEventListener("visibilitychange", se)), a(() => document.removeEventListener("visibilitychange", se));
		let ce = (e) => e.conversationId === l.conversation.id;
		w(l.hub, "MessageSent", (e) => ce(e) && void U.catchUp()), w(l.hub, "MessageEdited", (e) => ce(e) && void U.refresh(e.messageId)), w(l.hub, "MessageDeleted", (e) => ce(e) && void U.refresh(e.messageId)), w(l.hub, "ReactionChanged", (e) => ce(e) && void U.refresh(e.messageId)), a(l.hub.onReconnected(() => void U.catchUp())), b(() => l.conversation.lastMessageAt, () => void U.catchUp()), b(() => l.conversation, (e, t) => {
			if (e.kind === "Room") {
				e.name !== t.name && U.notice(v.t("notice.renamed", { name: e.name }));
				for (let n of e.participantIds.filter((e) => !t.participantIds.includes(e))) U.notice(v.t("notice.joined", { name: C(n) }));
				for (let n of t.participantIds.filter((t) => !e.participantIds.includes(t))) U.notice(v.t("notice.left", { name: C(n) }));
				e.keeperId !== t.keeperId && e.keeperId && U.notice(v.t("notice.keeper", { name: C(e.keeperId) })), e.archived && !t.archived && U.notice(v.t("notice.archived"));
			}
		});
		async function le(e, t, n, r) {
			try {
				await x.value.decide(e.id, t, n);
			} catch (e) {
				H(e);
			} finally {
				r();
			}
		}
		let Q = u(null), ue = u(null);
		function de(e, t) {
			U.send(e, t, Q.value), Q.value = null;
		}
		async function fe(e) {
			let t = ue.value;
			if (t) try {
				e !== t.text && await x.value.edit(t.id, e), ue.value = null, U.refresh(t.id);
			} catch (e) {
				H(e);
			}
		}
		async function pe(e, t, n) {
			try {
				await (n ? x.value.unreact(e.id, t) : x.value.react(e.id, t)), U.refresh(e.id);
			} catch (e) {
				H(e);
			}
		}
		let $ = u(null);
		async function me() {
			let e = $.value;
			if ($.value = null, e) try {
				await x.value.remove(e.id), U.refresh(e.id);
			} catch (e) {
				H(e);
			}
		}
		let he = u(null), ge = u(null), _e = (e) => !l.conversation.archived && (e.authorId === S.value ? N.value : te.value && P.value), ve = (e) => G.value || _e(e), be = L(() => {
			let e = ge.value;
			if (!e) return [];
			let t = e.authorId === S.value;
			return [
				...G.value ? [{
					label: v.t("message.reply"),
					icon: "pi pi-reply",
					command: () => (ue.value = null, Q.value = e)
				}] : [],
				...G.value && t ? [{
					label: v.t("message.edit"),
					icon: "pi pi-pencil",
					command: () => (Q.value = null, ue.value = e)
				}] : [],
				..._e(e) ? [{
					label: v.t("message.delete"),
					icon: "pi pi-trash",
					command: () => $.value = e
				}] : []
			];
		});
		function xe(e, t) {
			ge.value = e, he.value?.toggle(t);
		}
		function Se(e) {
			let t = ge.value;
			he.value?.hide(), t && pe(t, e, t.reactions.some((t) => t.emoji === e && !!S.value && t.userIds.includes(S.value)));
		}
		let Ce = u(null);
		async function we(e) {
			try {
				await (e === !1 ? x.value.unmute(l.conversation.id) : x.value.mute(l.conversation.id, e)), l.chat.refreshConversations();
			} catch (e) {
				H(e);
			}
		}
		let Te = L(() => l.conversation.muted ? [{
			label: v.t("mute.off"),
			icon: "pi pi-bell",
			command: () => we(!1)
		}] : [{
			label: v.t("mute.eightHours"),
			icon: "pi pi-clock",
			command: () => we(new Date(Date.now() + on).toISOString())
		}, {
			label: v.t("mute.forever"),
			icon: "pi pi-bell-slash",
			command: () => we(null)
		}]), De = u(!1), Oe = L(() => l.conversation.archived ? v.t("room.archived") : W.value ? v.t("room.participants", { count: l.conversation.participantIds.length }) : null), ke = L(() => {
			let e = l.typing.map((e) => C(e));
			return e.length ? e.length === 1 ? v.t("typing.one", { name: e[0] }) : v.t("typing.many", { names: e.join(", ") }) : null;
		}), Ae = u(null);
		return (t, a) => {
			let l = z("Button"), u = z("Avatar"), m = z("Menu"), b = z("Skeleton"), w = z("ProgressSpinner"), E = z("Dialog");
			return c(), I("section", {
				class: "chat-pane",
				"aria-label": s(M)(e.conversation)
			}, [
				_("header", Rt, [
					e.phone ? (c(), g(l, {
						key: 0,
						icon: "pi pi-arrow-left",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": s(v).t("back"),
						onClick: a[0] ||= (e) => f("back")
					}, null, 8, ["aria-label"])) : n("", !0),
					e.conversation.kind === "Direct" ? (c(), g(u, {
						key: 1,
						image: s(T)(s(A)(e.conversation)) ?? void 0,
						label: s(T)(s(A)(e.conversation)) ? void 0 : s(D)(s(A)(e.conversation)),
						shape: "circle"
					}, null, 8, ["image", "label"])) : (c(), g(u, {
						key: 2,
						icon: te.value ? "pi pi-home" : "pi pi-hashtag",
						shape: "circle"
					}, null, 8, ["icon"])),
					_("div", zt, [_("h2", null, y(s(M)(e.conversation)), 1), Oe.value ? (c(), I("p", Bt, y(Oe.value), 1)) : n("", !0)]),
					p(l, {
						icon: e.conversation.muted ? "pi pi-bell-slash" : "pi pi-bell",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": s(v).t(e.conversation.muted ? "mute.muted" : "mute.title"),
						onClick: a[1] ||= (e) => Ce.value?.toggle(e)
					}, null, 8, ["icon", "aria-label"]),
					p(m, {
						ref_key: "muteMenu",
						ref: Ce,
						model: Te.value,
						popup: ""
					}, null, 8, ["model"]),
					W.value ? (c(), g(l, {
						key: 3,
						icon: "pi pi-users",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": s(v).t("room.details"),
						onClick: a[2] ||= (e) => De.value = !0
					}, null, 8, ["aria-label"])) : n("", !0)
				]),
				_("div", {
					ref_key: "scroller",
					ref: q,
					class: "chat-pane__history",
					onScrollPassive: oe
				}, [s(U).loading.value ? (c(), I("div", Vt, [(c(), I(R, null, h(4, (e) => p(b, {
					key: e,
					height: "2.5rem",
					width: e % 2 ? "60%" : "40%"
				}, null, 8, ["width"])), 64))])) : (c(), I(R, { key: 1 }, [
					s(U).loadingOlder.value ? (c(), I("div", Ht, [p(w, {
						style: {
							width: "1.5rem",
							height: "1.5rem"
						},
						"stroke-width": "6"
					})])) : !s(U).hasOlder.value && e.conversation.readsFrom ? (c(), I("p", Ut, y(s(v).t("guest.readsFrom")), 1)) : n("", !0),
					s(U).failed.value ? (c(), I("p", Wt, [r(y(s(v).t("loadFailed")) + " ", 1), p(l, {
						label: s(v).t("retry"),
						text: "",
						size: "small",
						onClick: a[3] ||= (e) => s(U).load()
					}, null, 8, ["label"])])) : ne.value.length ? n("", !0) : (c(), I("p", Gt, y(s(v).t(G.value ? "empty.writable" : "empty.readOnly")), 1)),
					(c(!0), I(R, null, h(ne.value, (t) => (c(), I(R, { key: t.key }, [t.kind === "day" ? (c(), I("div", Kt, [_("span", null, y(s(B).day(t.date)), 1)])) : t.kind === "new" ? (c(), I("div", qt, [_("span", null, y(s(v).t("newMessages")), 1)])) : t.kind === "notice" ? (c(), I("div", Jt, y(t.text), 1)) : t.kind === "message" ? (c(), g(yt, {
						key: 3,
						message: t.message,
						mine: t.mine,
						lead: t.lead,
						"show-author": e.conversation.kind !== "Direct",
						"user-id": s(S),
						time: s(B).time(t.message.sentAt),
						"name-of": s(C),
						"avatar-of": s(T),
						"can-act": ve(t.message),
						"can-react": G.value,
						seen: t.message.id === re.value,
						"time-of": s(B).time,
						onMenu: (e) => xe(t.message, e),
						onReact: (e, n) => pe(t.message, e, n),
						onMedia: a[4] ||= (e, t) => Ae.value = {
							items: e,
							index: t
						},
						onStale: (e) => s(U).refreshMedia(t.message.id),
						onDecide: (e, n, r) => le(t.message, e, n, r)
					}, null, 8, [
						"message",
						"mine",
						"lead",
						"show-author",
						"user-id",
						"time",
						"name-of",
						"avatar-of",
						"can-act",
						"can-react",
						"seen",
						"time-of",
						"onMenu",
						"onReact",
						"onStale",
						"onDecide"
					])) : (c(), I("div", {
						key: 4,
						class: d(["chat-outgoing", {
							"chat-outgoing--failed": t.message.failed,
							"chat-outgoing--lead": t.lead
						}])
					}, [_("div", Yt, [t.message.attachments.length ? (c(), I("div", Xt, [(c(!0), I(R, null, h(t.message.attachments, (e) => (c(), I("img", {
						key: e.id,
						src: e.thumbUrl ?? void 0,
						alt: ""
					}, null, 8, Zt))), 128))])) : n("", !0), t.message.text ? (c(), I("div", {
						key: 1,
						innerHTML: s(O)(t.message.text)
					}, null, 8, Qt)) : n("", !0)]), _("div", $t, [t.message.failed ? (c(), I(R, { key: 0 }, [
						a[14] ||= _("i", {
							class: "pi pi-exclamation-circle",
							"aria-hidden": "true"
						}, null, -1),
						r(" " + y(s(v).t("send.failed")) + " ", 1),
						p(l, {
							label: s(v).t("retry"),
							text: "",
							size: "small",
							onClick: (e) => s(U).retry(t.message)
						}, null, 8, ["label", "onClick"]),
						p(l, {
							label: s(v).t("send.discard"),
							text: "",
							size: "small",
							severity: "secondary",
							onClick: (e) => s(U).discard(t.message)
						}, null, 8, ["label", "onClick"])
					], 64)) : (c(), I(R, { key: 1 }, [r(y(s(v).t("send.sending")), 1)], 64))])], 2))], 64))), 128)),
					ke.value ? (c(), I("p", en, y(ke.value), 1)) : n("", !0)
				], 64))], 544),
				Y.value ? (c(), g(l, {
					key: 0,
					class: "chat-pane__down",
					label: s(v).t("newMessages"),
					icon: "pi pi-arrow-down",
					size: "small",
					rounded: "",
					onClick: a[5] ||= (e) => (X(), Z())
				}, null, 8, ["label"])) : n("", !0),
				G.value ? (c(), g(qe, {
					key: 1,
					api: s(x),
					hub: e.hub,
					"reply-to": Q.value,
					editing: ue.value,
					"name-of": s(C),
					assistant: s(F) && e.conversation.kind !== "Direct",
					onSend: de,
					onSave: fe,
					onCancelReply: a[6] ||= (e) => Q.value = null,
					onCancelEdit: a[7] ||= (e) => ue.value = null,
					onTyping: a[8] ||= (t) => e.hub.typing(e.conversation.id)
				}, null, 8, [
					"api",
					"hub",
					"reply-to",
					"editing",
					"name-of",
					"assistant"
				])) : (c(), I("p", tn, y(s(v).t(e.conversation.archived ? "room.archivedNote" : "guest.readOnly")), 1)),
				p(m, {
					ref_key: "menu",
					ref: he,
					model: be.value,
					popup: ""
				}, i({ _: 2 }, [G.value ? {
					name: "start",
					fn: o(() => [_("div", nn, [(c(), I(R, null, h(V, (e) => _("button", {
						key: e,
						type: "button",
						"aria-label": s(v).t("message.react", { emoji: e }),
						onClick: (t) => Se(e)
					}, y(e), 9, rn)), 64))])]),
					key: "0"
				} : void 0]), 1032, ["model"]),
				p(E, {
					visible: !!$.value,
					modal: "",
					header: s(v).t("message.delete"),
					style: {
						width: "22rem",
						maxWidth: "95vw"
					},
					"onUpdate:visible": a[10] ||= (e) => $.value = null
				}, {
					footer: o(() => [p(l, {
						label: s(v).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: a[9] ||= (e) => $.value = null
					}, null, 8, ["label"]), p(l, {
						label: s(v).t("message.delete"),
						severity: "danger",
						onClick: me
					}, null, 8, ["label"])]),
					default: o(() => [_("p", an, y(s(v).t("message.deleteConfirm")), 1)]),
					_: 1
				}, 8, ["visible", "header"]),
				De.value && W.value ? (c(), g(It, {
					key: 3,
					conversation: e.conversation,
					chat: e.chat,
					onClose: a[11] ||= (e) => De.value = !1,
					onLeft: a[12] ||= (e) => f("left")
				}, null, 8, ["conversation", "chat"])) : n("", !0),
				Ae.value ? (c(), g(Ee, {
					key: 4,
					items: Ae.value.items,
					start: Ae.value.index,
					onClose: a[13] ||= (e) => Ae.value = null
				}, null, 8, ["items", "start"])) : n("", !0)
			], 8, Lt);
		};
	}
}), [["__scopeId", "data-v-0aa8fdc7"]]), ln = {
	key: 1,
	class: "chat-page__loading"
}, un = {
	key: 1,
	class: "chat-page__pane"
}, dn = {
	key: 0,
	class: "chat-page__people"
}, fn = ["disabled", "onClick"], pn = {
	key: 1,
	class: "chat-page__nobody"
}, mn = 5e3, hn = 12e4, gn = /*#__PURE__*/ N(/* @__PURE__ */ D({
	__name: "ChatPage",
	setup(e) {
		let t = F(), i = T(() => t.household.value.id), { conversations: l, members: v, userId: S, nameOf: w, avatarOf: E, initialOf: D } = i, O = j(), k = le(), A = Q(), M = C(t.manifest.endpoints.realtime ?? "/plugins/chat/hub", t.accessToken, t.household.value.id);
		a(() => M.stop());
		let N = window.matchMedia("(max-width: 767px)"), P = u(N.matches), B = () => P.value = N.matches;
		N.addEventListener("change", B), a(() => N.removeEventListener("change", B));
		let V = L(() => l.data.value ?? []), ee = L(() => typeof k.query.c == "string" ? k.query.c : null), H = L(() => V.value.find((e) => e.id === ee.value) ?? (P.value ? null : V.value.find((e) => e.kind === "Household") ?? null));
		function U(e) {
			let { c: t, ...n } = k.query, r = e ? {
				...n,
				c: e
			} : n;
			e && P.value && !ee.value ? A.push({ query: r }) : A.replace({ query: r });
		}
		let te = u(document.visibilityState === "visible"), W = () => te.value = document.visibilityState === "visible";
		document.addEventListener("visibilitychange", W), a(() => document.removeEventListener("visibilitychange", W)), b([() => H.value?.id ?? null, te], ([e, t]) => M.open(t ? e : null), { immediate: !0 });
		let G = u([]), K = (e, t) => G.value = G.value.filter((n) => n.conversationId !== e || n.userId !== t), ne = (e) => G.value.filter((t) => t.conversationId === e).map((e) => e.userId), re = [
			M.on("MessageSent", (e) => {
				e.authorId && K(e.conversationId, e.authorId), i.refreshConversations();
			}),
			M.on("ReadMarkerMoved", () => void i.refreshConversations()),
			M.on("ConversationChanged", () => void i.refreshConversations()),
			M.on("AccessChanged", () => {
				i.refreshConversations(), i.refreshMembers();
			}),
			M.on("Typing", (e) => {
				if (e.userId === S.value) return;
				K(e.conversationId, e.userId);
				let t = Date.now() + mn;
				G.value.push({
					conversationId: e.conversationId,
					userId: e.userId,
					until: t
				}), setTimeout(() => G.value = G.value.filter((e) => e.until > Date.now()), 5050);
			}),
			M.on("AssistantWorking", (e) => {
				K(e.conversationId, x);
				let t = Date.now() + hn;
				G.value.push({
					conversationId: e.conversationId,
					userId: x,
					until: t
				}), setTimeout(() => G.value = G.value.filter((e) => e.until > Date.now()), 120050);
			}),
			M.onReconnected(() => void i.refreshConversations())
		];
		a(() => re.forEach((e) => e()));
		let q = L(() => (v.data.value ?? []).filter((e) => e.userId !== S.value)), J = u(null), Y = u(!1);
		async function X(e) {
			Y.value = !0;
			try {
				let t = await e();
				await i.refreshConversations(), J.value = null, U(t);
			} catch (e) {
				t.notify("error", t.errorMessage(e));
			} finally {
				Y.value = !1;
			}
		}
		let ie = (e, t) => X(() => i.api.value.createRoom(e, t)), Z = (e) => X(() => i.api.value.startDirect(e)), ae = u(null), oe = u(0), se = () => ae.value && (oe.value = ae.value.getBoundingClientRect().top + window.scrollY);
		m(() => {
			se(), window.addEventListener("resize", se);
		}), a(() => window.removeEventListener("resize", se));
		let ce = L(() => P.value ? void 0 : `max(26rem, calc(100dvh - ${Math.round(oe.value)}px - 1.5rem))`);
		return (e, a) => {
			let u = z("Message"), m = z("Skeleton"), v = z("Avatar"), b = z("Dialog");
			return c(), I("div", {
				ref_key: "root",
				ref: ae,
				class: d(["chat-page", {
					"chat-page--phone": P.value,
					"chat-page--open": !!H.value
				}]),
				style: f({ height: ce.value })
			}, [
				s(l).isError.value ? (c(), g(u, {
					key: 0,
					severity: "error",
					closable: !1
				}, {
					default: o(() => [r(y(s(t).errorMessage(s(l).error.value)), 1)]),
					_: 1
				})) : s(l).isPending.value ? (c(), I("div", ln, [(c(), I(R, null, h(4, (e) => p(m, {
					key: e,
					height: "2.5rem"
				})), 64))])) : (c(), I(R, { key: 2 }, [!P.value || !H.value ? (c(), g(ve, {
					key: 0,
					class: "chat-page__list",
					chat: s(i),
					conversations: V.value,
					"selected-id": H.value?.id ?? null,
					"format-when": s(O).when,
					onSelect: U,
					onNewRoom: a[0] ||= (e) => J.value = "room",
					onNewDirect: a[1] ||= (e) => J.value = "direct"
				}, null, 8, [
					"chat",
					"conversations",
					"selected-id",
					"format-when"
				])) : n("", !0), H.value ? (c(), I("div", un, [(c(), g(cn, {
					key: H.value.id,
					chat: s(i),
					hub: s(M),
					conversation: H.value,
					typing: ne(H.value.id),
					phone: P.value,
					onBack: a[2] ||= (e) => U(null),
					onLeft: a[3] ||= (e) => U(null)
				}, null, 8, [
					"chat",
					"hub",
					"conversation",
					"typing",
					"phone"
				]))])) : n("", !0)], 64)),
				J.value === "room" ? (c(), g(Dt, {
					key: 3,
					mode: "create",
					members: q.value,
					busy: Y.value,
					onSubmit: ie,
					onClose: a[4] ||= (e) => J.value = null
				}, null, 8, ["members", "busy"])) : n("", !0),
				p(b, {
					visible: J.value === "direct",
					modal: "",
					header: s(t).t("direct.new"),
					style: {
						width: "22rem",
						maxWidth: "95vw"
					},
					"onUpdate:visible": a[5] ||= (e) => J.value = null
				}, {
					default: o(() => [q.value.length ? (c(), I("ul", dn, [(c(!0), I(R, null, h(q.value, (e) => (c(), I("li", { key: e.userId }, [_("button", {
						type: "button",
						disabled: Y.value,
						onClick: (t) => Z(e.userId)
					}, [p(v, {
						image: s(E)(e.userId) ?? void 0,
						label: s(E)(e.userId) ? void 0 : s(D)(e.userId),
						shape: "circle"
					}, null, 8, ["image", "label"]), _("span", null, y(s(w)(e.userId)), 1)], 8, fn)]))), 128))])) : (c(), I("p", pn, y(s(t).t("direct.empty")), 1))]),
					_: 1
				}, 8, ["visible", "header"])
			], 6);
		};
	}
}), [["__scopeId", "data-v-0c535ff8"]]);
export { gn as default };

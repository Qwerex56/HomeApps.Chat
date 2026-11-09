import { A as e, B as t, C as n, D as r, E as i, F as a, G as o, H as s, I as c, L as l, M as u, N as d, O as f, P as p, R as m, S as h, T as g, U as _, V as v, W as y, _ as b, a as x, b as S, c as C, d as w, f as T, i as E, j as D, k as O, l as k, o as A, p as j, t as M, u as N, v as P, w as F, x as I, y as L, z as R } from "./_plugin-vue_export-helper-C1WJ0WEO.js";
// \0homeapps-shared:vue-router
var z = globalThis.__HOMEAPPS_SHARED__?.["vue-router"];
if (!z) throw Error("HomeApps does not share vue-router; is this plugin loaded by the HomeApps web app?");
z.default;
var { NavigationFailureType: B, RouterLink: V, RouterView: H, START_LOCATION: U, createMemoryHistory: W, createRouter: G, createRouterMatcher: K, createWebHashHistory: ee, createWebHistory: te, isNavigationFailure: ne, loadRouteLocation: q, matchedRouteKey: J, onBeforeRouteLeave: Y, onBeforeRouteUpdate: X, parseQuery: re, routeLocationKey: ie, routerKey: ae, routerViewLocationKey: oe, stringifyQuery: se, useLink: ce, useRoute: Z, useRouter: Q, viewDepthKey: le } = z, ue = ["aria-label"], de = {
	key: 0,
	class: "chat-list__actions"
}, $ = { key: 0 }, fe = ["onClick"], pe = { class: "chat-list__name" }, me = ["title"], he = {
	key: 4,
	class: "chat-list__when"
}, ge = /*#__PURE__*/ M(/* @__PURE__ */ f({
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
	setup(e, { emit: r }) {
		let o = e, s = r, { host: u, titleOf: d, otherOf: f, avatarOf: p, initialOf: g, canRooms: _, canDirect: y } = o.chat, b = (e, t) => (t.lastMessageAt ?? t.createdAt).localeCompare(e.lastMessageAt ?? e.createdAt), x = S(() => o.conversations.filter((e) => e.kind === "Household")), C = S(() => o.conversations.filter((e) => e.kind === "Room" && !e.archived).sort(b)), w = S(() => o.conversations.filter((e) => e.kind === "Direct").sort(b)), T = S(() => o.conversations.filter((e) => e.kind === "Room" && e.archived).sort(b)), E = c(!1), O = S(() => [
			{
				key: "home",
				label: null,
				items: x.value
			},
			{
				key: "rooms",
				label: u.t("list.rooms"),
				items: C.value
			},
			{
				key: "direct",
				label: u.t("list.direct"),
				items: w.value
			},
			{
				key: "archived",
				label: null,
				items: E.value ? T.value : []
			}
		].filter((e) => e.items.length));
		return (r, o) => {
			let c = m("Button"), b = m("Avatar"), x = m("Badge");
			return a(), n("nav", {
				class: "chat-list",
				"aria-label": v(u).t("list.title")
			}, [
				v(_) || v(y) ? (a(), n("div", de, [v(_) ? (a(), I(c, {
					key: 0,
					label: v(u).t("room.new"),
					icon: "pi pi-plus",
					size: "small",
					severity: "secondary",
					outlined: "",
					onClick: o[0] ||= (e) => s("newRoom")
				}, null, 8, ["label"])) : h("", !0), v(y) ? (a(), I(c, {
					key: 1,
					label: v(u).t("direct.new"),
					icon: "pi pi-user",
					size: "small",
					severity: "secondary",
					outlined: "",
					onClick: o[1] ||= (e) => s("newDirect")
				}, null, 8, ["label"])) : h("", !0)])) : h("", !0),
				(a(!0), n(P, null, l(O.value, (r) => (a(), n(P, { key: r.key }, [r.label ? (a(), n("h3", $, t(r.label), 1)) : h("", !0), (a(!0), n(P, null, l(r.items, (r) => (a(), n("button", {
					key: r.id,
					type: "button",
					class: D(["chat-list__item", {
						active: r.id === e.selectedId,
						unread: r.unread > 0
					}]),
					onClick: (e) => s("select", r.id)
				}, [
					r.kind === "Direct" ? (a(), I(b, {
						key: 0,
						image: v(p)(v(f)(r)) ?? void 0,
						label: v(p)(v(f)(r)) ? void 0 : v(g)(v(f)(r)),
						shape: "circle"
					}, null, 8, ["image", "label"])) : (a(), I(b, {
						key: 1,
						icon: r.kind === "Household" ? "pi pi-home" : r.archived ? "pi pi-inbox" : "pi pi-hashtag",
						shape: "circle"
					}, null, 8, ["icon"])),
					F("span", pe, t(v(d)(r)), 1),
					r.muted ? (a(), n("i", {
						key: 2,
						class: "pi pi-bell-slash chat-list__muted",
						title: v(u).t("mute.muted"),
						"aria-hidden": "true"
					}, null, 8, me)) : h("", !0),
					r.unread ? (a(), I(x, {
						key: 3,
						value: r.unread > 99 ? "99+" : r.unread,
						severity: r.muted ? "secondary" : void 0
					}, null, 8, ["value", "severity"])) : r.lastMessageAt ? (a(), n("span", he, t(e.formatWhen(r.lastMessageAt)), 1)) : h("", !0)
				], 10, fe))), 128))], 64))), 128)),
				T.value.length ? (a(), n("button", {
					key: 1,
					type: "button",
					class: "chat-list__archive",
					onClick: o[2] ||= (e) => E.value = !E.value
				}, [F("i", {
					class: D(["pi", E.value ? "pi-chevron-up" : "pi-chevron-down"]),
					"aria-hidden": "true"
				}, null, 2), i(" " + t(v(u).t("list.archived", { count: T.value.length })), 1)])) : h("", !0)
			], 8, ue);
		};
	}
}), [["__scopeId", "data-v-afcfee6d"]]);
// src/useThread.ts
function _e(e, t, n) {
	let r = R([]), i = c([]), a = c([]), o = c(!1), s = c(!1), l = c(!1), u = c(!1), d = 0, f = Promise.resolve(), p = /* @__PURE__ */ new Set(), m = (e, t) => {
		let n = new Set(e.map((e) => e.id));
		return [...e, ...t.filter((e) => !n.has(e.id))];
	}, h = () => {
		let e = new Set(r.value.map((e) => e.clientMessageId));
		i.value = i.value.filter((t) => !e.has(t.clientMessageId));
	};
	async function g() {
		let s = t.value, c = ++d;
		if (r.value = [], i.value = [], a.value = [], l.value = !1, u.value = !1, p.clear(), s) {
			o.value = !0;
			try {
				let t = await e.value.messages(s);
				if (c !== d) return;
				r.value = t, l.value = t.length === 50;
			} catch (e) {
				if (c !== d) return;
				u.value = !0, n(e);
			} finally {
				c === d && (o.value = !1);
			}
		}
	}
	_(t, g, { immediate: !0 });
	async function v() {
		let i = t.value, a = r.value[0];
		if (!i || !a || !l.value || s.value) return;
		let o = d;
		s.value = !0;
		try {
			let t = await e.value.messages(i, { before: a.id });
			if (o !== d) return;
			let n = new Set(r.value.map((e) => e.id));
			r.value = [...t.filter((e) => !n.has(e.id)), ...r.value], l.value = t.length === 50;
		} catch (e) {
			o === d && n(e);
		} finally {
			s.value = !1;
		}
	}
	function y() {
		return f = f.then(async () => {
			let n = t.value, i = d;
			if (n && !o.value) try {
				for (;;) {
					let t = r.value[r.value.length - 1], a = await e.value.messages(n, t ? { after: t.id } : {});
					if (i !== d) return;
					if (r.value = m(r.value, a), t || (l.value = a.length === 50), !t || a.length < 50) break;
				}
				h();
			} catch {}
		}), f;
	}
	async function b(t) {
		if (!r.value.some((e) => e.id === t)) return;
		let n = d;
		try {
			let i = await e.value.message(t);
			if (n !== d) return;
			r.value = r.value.map((e) => e.id === t ? i : e);
		} catch {}
	}
	function x(e) {
		p.has(e) || (p.add(e), b(e));
	}
	async function S(r) {
		let a = t.value;
		if (!a) return;
		let o = d;
		r.failed = !1;
		try {
			await e.value.send(a, {
				clientMessageId: r.clientMessageId,
				text: r.text,
				attachmentIds: r.attachments.map((e) => e.id),
				replyToId: r.replyTo?.id ?? null
			}), o === d && await y();
		} catch (e) {
			if (o !== d) return;
			let t = i.value.find((e) => e.clientMessageId === r.clientMessageId);
			t && (t.failed = !0), n(e);
		}
	}
	function C(e, t, n) {
		let r = {
			clientMessageId: A(),
			text: e,
			attachments: t,
			replyTo: n,
			sentAt: (/* @__PURE__ */ new Date()).toISOString(),
			failed: !1
		};
		i.value.push(r), S(i.value[i.value.length - 1]);
	}
	let w = (e) => void S(e), T = (e) => {
		i.value = i.value.filter((t) => t.clientMessageId !== e.clientMessageId);
	};
	function E(e) {
		a.value.push({
			id: A(),
			text: e,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return {
		messages: r,
		outgoing: i,
		notices: a,
		loading: o,
		loadingOlder: s,
		hasOlder: l,
		failed: u,
		load: g,
		loadOlder: v,
		catchUp: y,
		refresh: b,
		refreshMedia: x,
		send: C,
		retry: w,
		discard: T,
		notice: E
	};
}
// src/MediaGallery.vue?vue&type=script&setup=true&lang.ts
var ve = ["aria-label"], ye = ["src", "poster"], be = ["src", "alt"], xe = { class: "chat-gallery__bar" }, Se = { key: 0 }, Ce = ["href"], we = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "MediaGallery",
	props: {
		items: {},
		start: {}
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let s = e, l = i, u = b(), f = c(s.start), g = S(() => s.items[f.value]), _ = (e) => f.value = (f.value + e + s.items.length) % s.items.length;
		function y(e) {
			e.key === "Escape" ? l("close") : e.key === "ArrowLeft" ? _(-1) : e.key === "ArrowRight" && _(1);
		}
		return d(() => window.addEventListener("keydown", y)), p(() => window.removeEventListener("keydown", y)), (i, s) => {
			let c = m("Button");
			return a(), I(L, { to: "body" }, [F("div", {
				class: "chat-gallery",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": v(u).t("media.gallery"),
				onClick: s[3] ||= o((e) => l("close"), ["self"])
			}, [
				g.value ? (a(), n(P, { key: 0 }, [g.value.kind === "Video" ? (a(), n("video", {
					key: g.value.id,
					class: "chat-gallery__media",
					src: g.value.originalUrl ?? void 0,
					poster: g.value.thumbUrl ?? void 0,
					controls: "",
					autoplay: "",
					playsinline: ""
				}, null, 8, ye)) : (a(), n("img", {
					key: `i-${g.value.id}`,
					class: "chat-gallery__media",
					src: g.value.previewUrl ?? g.value.originalUrl ?? void 0,
					alt: g.value.description ?? v(u).t("media.photo")
				}, null, 8, be))], 64)) : h("", !0),
				F("div", xe, [
					e.items.length > 1 ? (a(), n("span", Se, t(f.value + 1) + " / " + t(e.items.length), 1)) : h("", !0),
					g.value?.originalUrl ? (a(), n("a", {
						key: 1,
						href: g.value.originalUrl,
						target: "_blank",
						rel: "noopener noreferrer"
					}, t(v(u).t("media.original")), 9, Ce)) : h("", !0),
					r(c, {
						icon: "pi pi-times",
						rounded: "",
						severity: "secondary",
						"aria-label": v(u).t("close"),
						onClick: s[0] ||= (e) => l("close")
					}, null, 8, ["aria-label"])
				]),
				e.items.length > 1 ? (a(), n(P, { key: 1 }, [r(c, {
					class: "chat-gallery__prev",
					icon: "pi pi-chevron-left",
					rounded: "",
					severity: "secondary",
					"aria-label": v(u).t("media.previous"),
					onClick: s[1] ||= (e) => _(-1)
				}, null, 8, ["aria-label"]), r(c, {
					class: "chat-gallery__next",
					icon: "pi pi-chevron-right",
					rounded: "",
					severity: "secondary",
					"aria-label": v(u).t("media.next"),
					onClick: s[2] ||= (e) => _(1)
				}, null, 8, ["aria-label"])], 64)) : h("", !0)
			], 8, ve)]);
		};
	}
}), [["__scopeId", "data-v-f00cc410"]]), Te = (e) => e.type.startsWith("video/"), Ee = (e) => e.type.startsWith("image/");
function De(e) {
	return new Promise((t) => {
		let n = URL.createObjectURL(e), r = document.createElement("video"), i = (e) => {
			URL.revokeObjectURL(n), t(e);
		};
		r.preload = "metadata", r.onloadedmetadata = () => i(Number.isFinite(r.duration) ? r.duration : null), r.onerror = () => i(null), r.src = n;
	});
}
async function Oe(e, t = De) {
	if (!Ee(e) && !Te(e)) return "unsupported";
	if (e.size > 20971520) return "tooLarge";
	if (Te(e)) {
		let n = await t(e);
		if (n !== null && n > 30.5) return "tooLong";
	}
	return null;
}
function ke(e) {
	switch (e) {
		case "attachment.too_large": return "tooLarge";
		case "attachment.too_long": return "tooLong";
		case "attachment.unsupported":
		case "attachment.unreadable": return "unsupported";
		default: return null;
	}
}
// src/MessageComposer.vue?vue&type=script&setup=true&lang.ts
var Ae = { class: "chat-composer" }, je = {
	key: 0,
	class: "chat-composer__context"
}, Me = {
	key: 1,
	class: "chat-composer__context"
}, Ne = {
	key: 2,
	class: "chat-composer__uploads"
}, Pe = { class: "chat-upload__preview" }, Fe = ["src"], Ie = ["aria-valuenow"], Le = {
	key: 0,
	class: "chat-upload__problem"
}, Re = {
	key: 1,
	class: "chat-upload__note"
}, ze = { class: "chat-composer__row" }, Be = 4e3, Ve = 3e3, He = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "MessageComposer",
	props: {
		api: {},
		hub: {},
		replyTo: {},
		editing: {},
		nameOf: { type: Function }
	},
	emits: [
		"send",
		"save",
		"cancelReply",
		"cancelEdit",
		"typing"
	],
	setup(o, { emit: s }) {
		let d = o, f = s, g = b(), y = c(""), C = c([]), T = c(null), E = c(null), O = c(null), j = () => T.value?.$el ?? null, M = S(() => C.value.some((e) => e.state === "uploading" || e.state === "processing")), N = S(() => C.value.filter((e) => e.state === "ready" && e.attachment)), L = S(() => M.value ? !1 : d.editing ? y.value.trim().length > 0 : y.value.trim().length > 0 || N.value.length > 0);
		_(() => d.editing, (t, n) => {
			t ? y.value = t.text ?? "" : n && (y.value = ""), e(() => j()?.focus());
		}), _(() => d.replyTo, (t) => t && void e(() => j()?.focus()));
		let R = (e) => g.t(`upload.${e ?? "failed"}`);
		async function z(e) {
			if (e) for (let t of [...e]) {
				if (C.value.length >= 10) {
					g.notify("warn", g.t("upload.tooMany", { count: 10 }));
					break;
				}
				let e = {
					key: A(),
					name: t.name,
					video: Te(t),
					localUrl: t.type.startsWith("image/") ? URL.createObjectURL(t) : null,
					progress: 0,
					state: "uploading",
					problem: null,
					attachment: null,
					abort: new AbortController()
				};
				C.value.push(e), B(C.value[C.value.length - 1], t);
			}
		}
		async function B(e, t) {
			let n = await Oe(t);
			if (n) e.state = "failed", e.problem = R(n);
			else try {
				V(e, await d.api.upload(t, (t) => e.progress = t, e.abort.signal));
			} catch (t) {
				if (e.abort.signal.aborted) return;
				e.state = "failed";
				let n = x(t);
				e.problem = ke(n) ? R(ke(n)) : g.errorMessage(t);
			}
		}
		function V(e, t) {
			e.attachment = t, t.status === "Failed" ? (e.state = "failed", e.problem = R(ke(t.failureCode))) : e.state = t.status === "Pending" ? "processing" : "ready";
		}
		async function H(e) {
			if (e.attachment) try {
				V(e, await d.api.attachment(e.attachment.id));
			} catch {}
		}
		w(d.hub, "AttachmentChanged", (e) => {
			let t = C.value.find((t) => t.attachment?.id === e.attachmentId);
			t && H(t);
		});
		let U = setInterval(() => C.value.filter((e) => e.state === "processing").forEach((e) => void H(e)), Ve);
		function W(e) {
			e.localUrl && URL.revokeObjectURL(e.localUrl);
		}
		function G(e) {
			e.abort.abort(), W(e), C.value = C.value.filter((t) => t.key !== e.key);
		}
		p(() => {
			clearInterval(U), C.value.forEach((e) => {
				e.abort.abort(), W(e);
			});
		});
		function K() {
			if (!L.value) return;
			let e = y.value.trim();
			d.editing ? f("save", e) : (f("send", e || null, N.value.map((e) => e.attachment)), C.value.forEach(W), C.value = [], y.value = "");
		}
		let ee = 0;
		function te() {
			let e = Date.now();
			d.editing || e - ee < 3e3 || !y.value || (ee = e, f("typing"));
		}
		function ne(t) {
			if (t.key === "Enter" && !t.shiftKey && !t.isComposing) {
				t.preventDefault(), K();
				return;
			}
			if (t.key === "Escape") {
				d.editing ? f("cancelEdit") : d.replyTo && f("cancelReply");
				return;
			}
			let n = (t.ctrlKey || t.metaKey) && !t.altKey ? {
				b: "**",
				i: "_"
			}[t.key.toLowerCase()] : void 0, r = j();
			if (!n || !r) return;
			t.preventDefault();
			let i = k(y.value, r.selectionStart, r.selectionEnd, n);
			y.value = i.text, e(() => r.setSelectionRange(i.start, i.end));
		}
		function q(e) {
			let t = e.target;
			z(t.files), t.value = "";
		}
		function J(e) {
			!d.editing && e.clipboardData?.files.length && (e.preventDefault(), z(e.clipboardData.files));
		}
		return (e, s) => {
			let c = m("Button"), d = m("ProgressSpinner"), p = m("Textarea");
			return a(), n("div", Ae, [
				o.editing ? (a(), n("div", je, [
					s[5] ||= F("i", {
						class: "pi pi-pencil",
						"aria-hidden": "true"
					}, null, -1),
					F("span", null, t(v(g).t("composer.editing")), 1),
					r(c, {
						icon: "pi pi-times",
						text: "",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": v(g).t("cancel"),
						onClick: s[0] ||= (e) => f("cancelEdit")
					}, null, 8, ["aria-label"])
				])) : o.replyTo ? (a(), n("div", Me, [
					s[6] ||= F("i", {
						class: "pi pi-reply",
						"aria-hidden": "true"
					}, null, -1),
					F("span", null, [F("strong", null, t(o.nameOf(o.replyTo.authorId)), 1), i(" " + t(o.replyTo.text || v(g).t("media.count", { count: o.replyTo.attachments.length })), 1)]),
					r(c, {
						icon: "pi pi-times",
						text: "",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": v(g).t("cancel"),
						onClick: s[1] ||= (e) => f("cancelReply")
					}, null, 8, ["aria-label"])
				])) : h("", !0),
				C.value.length ? (a(), n("ul", Ne, [(a(!0), n(P, null, l(C.value, (e) => (a(), n("li", {
					key: e.key,
					class: D(`chat-upload chat-upload--${e.state}`)
				}, [
					F("div", Pe, [
						e.attachment?.thumbUrl || e.localUrl ? (a(), n("img", {
							key: 0,
							src: e.attachment?.thumbUrl ?? e.localUrl ?? void 0,
							alt: ""
						}, null, 8, Fe)) : (a(), n("i", {
							key: 1,
							class: D(["pi", e.video ? "pi-video" : "pi-image"]),
							"aria-hidden": "true"
						}, null, 2)),
						e.state === "processing" ? (a(), I(d, {
							key: 2,
							class: "chat-upload__spinner",
							"stroke-width": "6"
						})) : h("", !0),
						e.state === "uploading" ? (a(), n("div", {
							key: 3,
							class: "chat-upload__bar",
							role: "progressbar",
							"aria-valuenow": Math.round(e.progress * 100)
						}, [F("div", { style: u({ width: `${Math.round(e.progress * 100)}%` }) }, null, 4)], 8, Ie)) : h("", !0)
					]),
					e.state === "failed" ? (a(), n("p", Le, t(e.problem), 1)) : e.state === "processing" ? (a(), n("p", Re, t(v(g).t("upload.processing")), 1)) : h("", !0),
					r(c, {
						class: "chat-upload__remove",
						icon: "pi pi-times",
						rounded: "",
						size: "small",
						severity: "secondary",
						"aria-label": v(g).t("upload.remove", { name: e.name }),
						onClick: (t) => G(e)
					}, null, 8, ["aria-label", "onClick"])
				], 2))), 128))])) : h("", !0),
				F("div", ze, [
					o.editing ? h("", !0) : (a(), n(P, { key: 0 }, [
						F("input", {
							ref_key: "fileInput",
							ref: E,
							type: "file",
							accept: "image/*,video/*",
							multiple: "",
							hidden: "",
							onChange: q
						}, null, 544),
						F("input", {
							ref_key: "cameraInput",
							ref: O,
							type: "file",
							accept: "image/*,video/*",
							capture: "environment",
							hidden: "",
							onChange: q
						}, null, 544),
						r(c, {
							icon: "pi pi-paperclip",
							text: "",
							rounded: "",
							severity: "secondary",
							"aria-label": v(g).t("composer.attach"),
							onClick: s[2] ||= (e) => E.value?.click()
						}, null, 8, ["aria-label"]),
						r(c, {
							class: "chat-composer__camera",
							icon: "pi pi-camera",
							text: "",
							rounded: "",
							severity: "secondary",
							"aria-label": v(g).t("composer.camera"),
							onClick: s[3] ||= (e) => O.value?.click()
						}, null, 8, ["aria-label"])
					], 64)),
					r(p, {
						ref_key: "field",
						ref: T,
						modelValue: y.value,
						"onUpdate:modelValue": s[4] ||= (e) => y.value = e,
						class: "chat-composer__field",
						rows: "1",
						"auto-resize": "",
						maxlength: Be,
						placeholder: v(g).t("composer.placeholder"),
						"aria-label": v(g).t("composer.placeholder"),
						onKeydown: ne,
						onInput: te,
						onPaste: J
					}, null, 8, [
						"modelValue",
						"placeholder",
						"aria-label"
					]),
					r(c, {
						icon: o.editing ? "pi pi-check" : "pi pi-send",
						rounded: "",
						disabled: !L.value,
						"aria-label": v(g).t(o.editing ? "save" : "composer.send"),
						onClick: K
					}, null, 8, [
						"icon",
						"disabled",
						"aria-label"
					])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-9369fa74"]]), Ue = { class: "chat-message__avatar" }, We = { class: "chat-message__body" }, Ge = {
	key: 0,
	class: "chat-message__author"
}, Ke = { class: "chat-message__row" }, qe = {
	key: 0,
	class: "chat-message__quote"
}, Je = { key: 0 }, Ye = ["aria-label", "onClick"], Xe = ["src", "alt"], Ze = {
	key: 0,
	class: "chat-message__play"
}, Qe = ["innerHTML"], $e = { class: "chat-message__meta" }, et = { key: 0 }, tt = {
	key: 1,
	class: "chat-message__reactions"
}, nt = [
	"title",
	"disabled",
	"onClick"
], rt = {
	key: 2,
	class: "chat-message__seen"
}, it = /*#__PURE__*/ M(/* @__PURE__ */ f({
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
		seen: { type: Boolean }
	},
	emits: [
		"menu",
		"react",
		"media",
		"stale"
	],
	setup(e, { emit: r }) {
		let o = e, s = r, c = b(), d = S(() => o.message.text ? C(o.message.text) : ""), f = S(() => o.message.attachments.filter((e) => e.thumbUrl || e.originalUrl)), p = S(() => o.message.replyTo), g = S(() => {
			let e = p.value;
			return e ? e.visible ? e.deleted ? c.t("message.deleted") : e.text || c.t("media.count", { count: e.attachments }) : c.t("quote.hidden") : "";
		}), _ = (e) => f.value.length === 1 && e.width && e.height ? `${e.width} / ${e.height}` : "1 / 1", y = (e) => e.map((e) => o.nameOf(e)).join(", ");
		return (r, o) => {
			let b = m("Avatar"), x = m("Button");
			return a(), n("div", { class: D(["chat-message", {
				"chat-message--mine": e.mine,
				"chat-message--lead": e.lead
			}]) }, [F("div", Ue, [e.lead && !e.mine ? (a(), I(b, {
				key: 0,
				image: e.avatarOf(e.message.authorId) ?? void 0,
				label: e.avatarOf(e.message.authorId) ? void 0 : e.nameOf(e.message.authorId).charAt(0).toUpperCase(),
				shape: "circle"
			}, null, 8, ["image", "label"])) : h("", !0)]), F("div", We, [
				e.lead && e.showAuthor && !e.mine ? (a(), n("div", Ge, t(e.nameOf(e.message.authorId)), 1)) : h("", !0),
				F("div", Ke, [F("div", { class: D(["chat-message__bubble", { "chat-message__bubble--deleted": e.message.deleted }]) }, [e.message.deleted ? (a(), n(P, { key: 0 }, [i(t(v(c).t("message.deleted")), 1)], 64)) : (a(), n(P, { key: 1 }, [
					p.value ? (a(), n("div", qe, [p.value.visible && p.value.authorId ? (a(), n("strong", Je, t(e.nameOf(p.value.authorId)), 1)) : h("", !0), F("span", null, t(g.value), 1)])) : h("", !0),
					f.value.length ? (a(), n("div", {
						key: 1,
						class: D(["chat-message__media", `chat-message__media--${Math.min(f.value.length, 3)}`])
					}, [(a(!0), n(P, null, l(f.value, (e, t) => (a(), n("button", {
						key: e.id,
						type: "button",
						class: "chat-message__thumb",
						style: u({ aspectRatio: _(e) }),
						"aria-label": v(c).t(e.kind === "Video" ? "media.openVideo" : "media.openPhoto"),
						onClick: (e) => s("media", f.value, t)
					}, [F("img", {
						src: e.thumbUrl ?? void 0,
						alt: e.description ?? "",
						loading: "lazy",
						onError: o[0] ||= (e) => s("stale")
					}, null, 40, Xe), e.kind === "Video" ? (a(), n("span", Ze, [...o[2] ||= [F("i", {
						class: "pi pi-play",
						"aria-hidden": "true"
					}, null, -1)]])) : h("", !0)], 12, Ye))), 128))], 2)) : h("", !0),
					d.value ? (a(), n("div", {
						key: 2,
						class: "chat-message__text",
						innerHTML: d.value
					}, null, 8, Qe)) : h("", !0)
				], 64)), F("div", $e, [e.message.editedAt && !e.message.deleted ? (a(), n("span", et, t(v(c).t("message.edited")) + " · ", 1)) : h("", !0), i(t(e.time), 1)])], 2), e.canAct && !e.message.deleted ? (a(), I(x, {
					key: 0,
					class: "chat-message__more",
					icon: "pi pi-ellipsis-h",
					text: "",
					rounded: "",
					size: "small",
					severity: "secondary",
					"aria-label": v(c).t("message.actions"),
					onClick: o[1] ||= (e) => s("menu", e)
				}, null, 8, ["aria-label"])) : h("", !0)]),
				e.message.reactions.length && !e.message.deleted ? (a(), n("div", tt, [(a(!0), n(P, null, l(e.message.reactions, (r) => (a(), n("button", {
					key: r.emoji,
					type: "button",
					class: D({ active: !!e.userId && r.userIds.includes(e.userId) }),
					title: y(r.userIds),
					disabled: !e.canReact,
					onClick: (t) => s("react", r.emoji, !!e.userId && r.userIds.includes(e.userId))
				}, [i(t(r.emoji) + " ", 1), F("span", null, t(r.userIds.length), 1)], 10, nt))), 128))])) : h("", !0),
				e.seen ? (a(), n("div", rt, [o[3] ||= F("i", {
					class: "pi pi-check",
					"aria-hidden": "true"
				}, null, -1), i(" " + t(v(c).t("message.seen")), 1)])) : h("", !0)
			])], 2);
		};
	}
}), [["__scopeId", "data-v-518b9a6a"]]), at = { class: "chat-picker" }, ot = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "MemberPicker",
	props: /*@__PURE__*/ O({ members: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let i = s(e, "modelValue");
		function o(e) {
			i.value = i.value.includes(e) ? i.value.filter((t) => t !== e) : [...i.value, e];
		}
		return (s, c) => {
			let u = m("Checkbox"), d = m("Avatar");
			return a(), n("ul", at, [(a(!0), n(P, null, l(e.members, (e) => (a(), n("li", { key: e.userId }, [F("label", null, [
				r(u, {
					"model-value": i.value.includes(e.userId),
					binary: "",
					"onUpdate:modelValue": (t) => o(e.userId)
				}, null, 8, ["model-value", "onUpdate:modelValue"]),
				r(d, {
					image: e.avatarUrl ?? void 0,
					label: e.avatarUrl ? void 0 : e.name.charAt(0).toUpperCase(),
					shape: "circle"
				}, null, 8, ["image", "label"]),
				F("span", null, t(e.name), 1)
			])]))), 128))]);
		};
	}
}), [["__scopeId", "data-v-a6c6a27e"]]), st = {
	key: 0,
	class: "chat-room-dialog__field"
}, ct = { class: "chat-room-dialog__field" }, lt = {
	key: 1,
	class: "chat-room-dialog__empty"
}, ut = { class: "chat-room-dialog__actions" }, dt = 60, ft = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "RoomDialog",
	props: {
		mode: {},
		members: {},
		busy: { type: Boolean }
	},
	emits: ["submit", "close"],
	setup(e, { emit: i }) {
		let s = e, l = i, u = b(), d = c(""), f = c([]), p = S(() => s.mode === "add" ? f.value.length > 0 : d.value.trim().length > 0);
		function g() {
			p.value && !s.busy && l("submit", d.value.trim(), f.value);
		}
		return (i, s) => {
			let c = m("InputText"), _ = m("Button"), b = m("Dialog");
			return a(), I(b, {
				visible: "",
				modal: "",
				header: v(u).t(e.mode === "create" ? "room.new" : "room.addPeople"),
				style: {
					width: "24rem",
					maxWidth: "95vw"
				},
				"onUpdate:visible": s[3] ||= (e) => l("close")
			}, {
				default: y(() => [F("form", {
					class: "chat-room-dialog",
					onSubmit: o(g, ["prevent"])
				}, [
					e.mode === "create" ? (a(), n("label", st, [F("span", null, t(v(u).t("room.name")), 1), r(c, {
						modelValue: d.value,
						"onUpdate:modelValue": s[0] ||= (e) => d.value = e,
						maxlength: dt,
						autofocus: ""
					}, null, 8, ["modelValue"])])) : h("", !0),
					F("div", ct, [F("span", null, t(v(u).t("room.people")), 1), e.members.length ? (a(), I(ot, {
						key: 0,
						modelValue: f.value,
						"onUpdate:modelValue": s[1] ||= (e) => f.value = e,
						members: e.members
					}, null, 8, ["modelValue", "members"])) : (a(), n("p", lt, t(v(u).t("room.nobodyToAdd")), 1))]),
					F("div", ut, [r(_, {
						type: "button",
						label: v(u).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: s[2] ||= (e) => l("close")
					}, null, 8, ["label"]), r(_, {
						type: "submit",
						label: v(u).t(e.mode === "create" ? "create" : "add"),
						disabled: !p.value,
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
}), [["__scopeId", "data-v-cd6c8d45"]]), pt = { class: "chat-room" }, mt = { class: "chat-room__people" }, ht = { class: "chat-room__person" }, gt = {
	key: 2,
	class: "chat-room__danger"
}, _t = { key: 0 }, vt = { key: 1 }, yt = { class: "chat-room__buttons" }, bt = { class: "chat-room__buttons" }, xt = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "RoomPanel",
	props: {
		conversation: {},
		chat: {}
	},
	emits: ["close", "left"],
	setup(e, { emit: s }) {
		let u = e, d = s, { host: f, userId: p, nameOf: g, avatarOf: b, initialOf: x, canRooms: C } = u.chat, w = S(() => u.conversation.keeperId === p.value), T = S(() => !u.conversation.archived), E = S(() => u.conversation.participantIds.filter((e) => e !== p.value)), D = S(() => (u.chat.members.data.value ?? []).filter((e) => !u.conversation.participantIds.includes(e.userId))), O = c(!1);
		async function k(e, t) {
			O.value = !0;
			try {
				await e(u.chat.api.value), t?.();
			} catch (e) {
				f.notify("error", f.errorMessage(e));
			} finally {
				O.value = !1, u.chat.refreshConversations();
			}
		}
		let A = c(u.conversation.name ?? "");
		_(() => u.conversation.name, (e) => A.value = e ?? "");
		let j = S(() => A.value.trim().length > 0 && A.value.trim() !== u.conversation.name), M = () => j.value && k((e) => e.renameRoom(u.conversation.id, A.value.trim())), N = c(!1), L = (e) => k((t) => t.addParticipants(u.conversation.id, e), () => N.value = !1), R = (e) => k((t) => t.removeParticipant(u.conversation.id, e)), z = c(!1), B = c(null), V = S(() => w.value && E.value.length > 0), H = S(() => E.value.map((e) => ({
			id: e,
			name: g(e)
		}))), U = () => k((e) => e.leaveRoom(u.conversation.id, V.value ? B.value : null), () => d("left")), W = c(!1), G = () => k((e) => e.archiveRoom(u.conversation.id), () => W.value = !1);
		return (s, c) => {
			let u = m("Message"), _ = m("InputText"), S = m("Button"), k = m("Avatar"), K = m("Tag"), ee = m("Select"), te = m("Drawer");
			return a(), I(te, {
				visible: "",
				position: "right",
				header: e.conversation.name ?? "",
				class: "chat-room-drawer",
				"onUpdate:visible": c[9] ||= (e) => d("close")
			}, {
				default: y(() => [F("div", pt, [
					e.conversation.archived ? (a(), I(u, {
						key: 0,
						severity: "secondary",
						closable: !1
					}, {
						default: y(() => [i(t(v(f).t("room.archivedNote")), 1)]),
						_: 1
					})) : h("", !0),
					w.value && T.value ? (a(), n("form", {
						key: 1,
						class: "chat-room__rename",
						onSubmit: o(M, ["prevent"])
					}, [F("label", null, [F("span", null, t(v(f).t("room.name")), 1), r(_, {
						modelValue: A.value,
						"onUpdate:modelValue": c[0] ||= (e) => A.value = e,
						maxlength: "60"
					}, null, 8, ["modelValue"])]), r(S, {
						type: "submit",
						label: v(f).t("save"),
						disabled: !j.value,
						loading: O.value
					}, null, 8, [
						"label",
						"disabled",
						"loading"
					])], 32)) : h("", !0),
					F("section", null, [
						F("h3", null, t(v(f).t("room.participants", { count: e.conversation.participantIds.length })), 1),
						F("ul", mt, [(a(!0), n(P, null, l(e.conversation.participantIds, (o) => (a(), n("li", { key: o }, [
							r(k, {
								image: v(b)(o) ?? void 0,
								label: v(b)(o) ? void 0 : v(x)(o),
								shape: "circle"
							}, null, 8, ["image", "label"]),
							F("span", ht, [i(t(v(g)(o)), 1), o === v(p) ? (a(), n(P, { key: 0 }, [i(" (" + t(v(f).t("you")) + ")", 1)], 64)) : h("", !0)]),
							o === e.conversation.keeperId ? (a(), I(K, {
								key: 0,
								value: v(f).t("room.keeper"),
								severity: "secondary"
							}, null, 8, ["value"])) : w.value && T.value ? (a(), I(S, {
								key: 1,
								icon: "pi pi-user-minus",
								text: "",
								rounded: "",
								size: "small",
								severity: "secondary",
								"aria-label": v(f).t("room.remove", { name: v(g)(o) }),
								disabled: O.value,
								onClick: (e) => R(o)
							}, null, 8, [
								"aria-label",
								"disabled",
								"onClick"
							])) : h("", !0)
						]))), 128))]),
						v(C) && T.value ? (a(), I(S, {
							key: 0,
							label: v(f).t("room.addPeople"),
							icon: "pi pi-user-plus",
							severity: "secondary",
							outlined: "",
							size: "small",
							onClick: c[1] ||= (e) => N.value = !0
						}, null, 8, ["label"])) : h("", !0)
					]),
					e.conversation.participantIds.includes(v(p) ?? "") ? (a(), n("section", gt, [z.value ? (a(), n(P, { key: 0 }, [V.value ? (a(), n("label", _t, [F("span", null, t(v(f).t("room.successor")), 1), r(ee, {
						modelValue: B.value,
						"onUpdate:modelValue": c[2] ||= (e) => B.value = e,
						options: H.value,
						"option-label": "name",
						"option-value": "id",
						placeholder: v(f).t("room.successorPlaceholder")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])])) : (a(), n("p", vt, t(v(f).t(E.value.length ? "room.leaveConfirm" : "room.leaveLastConfirm")), 1)), F("div", yt, [r(S, {
						label: v(f).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: c[3] ||= (e) => z.value = !1
					}, null, 8, ["label"]), r(S, {
						label: v(f).t("room.leave"),
						severity: "danger",
						disabled: V.value && !B.value,
						loading: O.value,
						onClick: U
					}, null, 8, [
						"label",
						"disabled",
						"loading"
					])])], 64)) : W.value ? (a(), n(P, { key: 1 }, [F("p", null, t(v(f).t("room.archiveConfirm")), 1), F("div", bt, [r(S, {
						label: v(f).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: c[4] ||= (e) => W.value = !1
					}, null, 8, ["label"]), r(S, {
						label: v(f).t("room.archive"),
						severity: "danger",
						loading: O.value,
						onClick: G
					}, null, 8, ["label", "loading"])])], 64)) : (a(), n(P, { key: 2 }, [r(S, {
						label: v(f).t("room.leave"),
						icon: "pi pi-sign-out",
						severity: "danger",
						outlined: "",
						size: "small",
						onClick: c[5] ||= (e) => z.value = !0
					}, null, 8, ["label"]), w.value && T.value ? (a(), I(S, {
						key: 0,
						label: v(f).t("room.archive"),
						icon: "pi pi-inbox",
						severity: "secondary",
						outlined: "",
						size: "small",
						onClick: c[6] ||= (e) => W.value = !0
					}, null, 8, ["label"])) : h("", !0)], 64))])) : h("", !0)
				]), N.value ? (a(), I(ft, {
					key: 0,
					mode: "add",
					members: D.value,
					busy: O.value,
					onSubmit: c[7] ||= (e, t) => L(t),
					onClose: c[8] ||= (e) => N.value = !1
				}, null, 8, ["members", "busy"])) : h("", !0)]),
				_: 1
			}, 8, ["header"]);
		};
	}
}), [["__scopeId", "data-v-02583563"]]), St = ["aria-label"], Ct = { class: "chat-pane__header" }, wt = { class: "chat-pane__title" }, Tt = { key: 0 }, Et = {
	key: 0,
	class: "chat-pane__loading"
}, Dt = {
	key: 0,
	class: "chat-pane__older"
}, Ot = {
	key: 1,
	class: "chat-pane__note"
}, kt = {
	key: 2,
	class: "chat-pane__note"
}, At = {
	key: 3,
	class: "chat-pane__note"
}, jt = {
	key: 0,
	class: "chat-pane__day"
}, Mt = {
	key: 1,
	class: "chat-pane__new"
}, Nt = {
	key: 2,
	class: "chat-pane__notice"
}, Pt = { class: "chat-outgoing__bubble" }, Ft = {
	key: 0,
	class: "chat-outgoing__media"
}, It = ["src"], Lt = ["innerHTML"], Rt = { class: "chat-outgoing__state" }, zt = {
	key: 4,
	class: "chat-pane__typing",
	"aria-live": "polite"
}, Bt = {
	key: 2,
	class: "chat-pane__readonly"
}, Vt = { class: "chat-reactions" }, Ht = ["aria-label", "onClick"], Ut = { class: "chat-pane__confirm" }, Wt = 288e5, Gt = 80, Kt = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "ConversationPane",
	props: {
		chat: {},
		hub: {},
		conversation: {},
		typing: {},
		phone: { type: Boolean }
	},
	emits: ["back", "left"],
	setup(o, { emit: s }) {
		let u = o, f = s, { host: b, api: x, userId: E, nameOf: O, avatarOf: k, initialOf: A, otherOf: M, titleOf: N, canWrite: L, canModerate: R } = u.chat, z = T(), B = [
			"👍",
			"❤️",
			"😂",
			"😮",
			"😢",
			"🎉"
		], V = S(() => u.conversation.id), H = (e) => b.notify("error", b.errorMessage(e)), U = _e(x, V, H), W = S(() => u.conversation.kind === "Household"), G = S(() => u.conversation.kind === "Room"), K = S(() => L.value && !u.conversation.archived), ee = u.conversation.unread > 0 ? u.conversation.lastReadMessageId : null, te = S(() => j(U.messages.value, U.outgoing.value, U.notices.value, E.value, ee)), ne = S(() => {
			let e = u.conversation.otherReadMessageId;
			if (u.conversation.kind !== "Direct" || !e) return null;
			let t = U.messages.value;
			for (let n = t.findIndex((t) => t.id === e); n >= 0; n--) if (t[n].authorId === E.value) return t[n].id;
			return null;
		}), q = c(null), J = c(!0), Y = c(0), X = () => {
			let e = q.value;
			e && (e.scrollTop = e.scrollHeight), J.value = !0, Y.value = 0;
		}, re = u.conversation.lastReadMessageId;
		function ie() {
			let e = U.messages.value[U.messages.value.length - 1];
			e && e.id !== re && J.value && document.visibilityState === "visible" && (re = e.id, x.value.markRead(u.conversation.id, e.id).then(() => u.chat.refreshConversations()).catch(() => void 0));
		}
		async function ae() {
			let t = q.value;
			if (!t || !U.hasOlder.value || U.loadingOlder.value) return;
			let n = t.scrollHeight;
			await U.loadOlder(), await e(), t.scrollTop += t.scrollHeight - n;
		}
		function oe() {
			let e = q.value;
			e && (J.value = e.scrollHeight - e.scrollTop - e.clientHeight < Gt, J.value && (Y.value = 0, ie()), e.scrollTop < 160 && ae());
		}
		_(U.loading, async (t) => {
			if (t) return;
			await e();
			let n = q.value?.querySelector(".chat-pane__new");
			n ? n.scrollIntoView({ block: "center" }) : X(), oe();
		}), _(() => U.messages.value[U.messages.value.length - 1]?.id, async (t, n) => {
			if (!t || !n || U.loading.value) return;
			let r = J.value;
			await e(), r ? (X(), ie()) : Y.value++;
		}), _(() => U.outgoing.value.length + U.notices.value.length, async (t, n) => {
			t <= n || (await e(), X());
		}), _(() => u.typing.length, async () => {
			J.value && (await e(), X());
		});
		let se = () => ie();
		d(() => document.addEventListener("visibilitychange", se)), p(() => document.removeEventListener("visibilitychange", se));
		let ce = (e) => e.conversationId === u.conversation.id;
		w(u.hub, "MessageSent", (e) => ce(e) && void U.catchUp()), w(u.hub, "MessageEdited", (e) => ce(e) && void U.refresh(e.messageId)), w(u.hub, "MessageDeleted", (e) => ce(e) && void U.refresh(e.messageId)), w(u.hub, "ReactionChanged", (e) => ce(e) && void U.refresh(e.messageId)), p(u.hub.onReconnected(() => void U.catchUp())), _(() => u.conversation.lastMessageAt, () => void U.catchUp()), _(() => u.conversation, (e, t) => {
			if (e.kind === "Room") {
				e.name !== t.name && U.notice(b.t("notice.renamed", { name: e.name }));
				for (let n of e.participantIds.filter((e) => !t.participantIds.includes(e))) U.notice(b.t("notice.joined", { name: O(n) }));
				for (let n of t.participantIds.filter((t) => !e.participantIds.includes(t))) U.notice(b.t("notice.left", { name: O(n) }));
				e.keeperId !== t.keeperId && e.keeperId && U.notice(b.t("notice.keeper", { name: O(e.keeperId) })), e.archived && !t.archived && U.notice(b.t("notice.archived"));
			}
		});
		let Z = c(null), Q = c(null);
		function le(e, t) {
			U.send(e, t, Z.value), Z.value = null;
		}
		async function ue(e) {
			let t = Q.value;
			if (t) try {
				e !== t.text && await x.value.edit(t.id, e), Q.value = null, U.refresh(t.id);
			} catch (e) {
				H(e);
			}
		}
		async function de(e, t, n) {
			try {
				await (n ? x.value.unreact(e.id, t) : x.value.react(e.id, t)), U.refresh(e.id);
			} catch (e) {
				H(e);
			}
		}
		let $ = c(null);
		async function fe() {
			let e = $.value;
			if ($.value = null, e) try {
				await x.value.remove(e.id), U.refresh(e.id);
			} catch (e) {
				H(e);
			}
		}
		let pe = c(null), me = c(null), he = (e) => !u.conversation.archived && (e.authorId === E.value ? L.value : W.value && R.value), ge = (e) => K.value || he(e), ve = S(() => {
			let e = me.value;
			if (!e) return [];
			let t = e.authorId === E.value;
			return [
				...K.value ? [{
					label: b.t("message.reply"),
					icon: "pi pi-reply",
					command: () => (Q.value = null, Z.value = e)
				}] : [],
				...K.value && t ? [{
					label: b.t("message.edit"),
					icon: "pi pi-pencil",
					command: () => (Z.value = null, Q.value = e)
				}] : [],
				...he(e) ? [{
					label: b.t("message.delete"),
					icon: "pi pi-trash",
					command: () => $.value = e
				}] : []
			];
		});
		function ye(e, t) {
			me.value = e, pe.value?.toggle(t);
		}
		function be(e) {
			let t = me.value;
			pe.value?.hide(), t && de(t, e, t.reactions.some((t) => t.emoji === e && !!E.value && t.userIds.includes(E.value)));
		}
		let xe = c(null);
		async function Se(e) {
			try {
				await (e === !1 ? x.value.unmute(u.conversation.id) : x.value.mute(u.conversation.id, e)), u.chat.refreshConversations();
			} catch (e) {
				H(e);
			}
		}
		let Ce = S(() => u.conversation.muted ? [{
			label: b.t("mute.off"),
			icon: "pi pi-bell",
			command: () => Se(!1)
		}] : [{
			label: b.t("mute.eightHours"),
			icon: "pi pi-clock",
			command: () => Se(new Date(Date.now() + Wt).toISOString())
		}, {
			label: b.t("mute.forever"),
			icon: "pi pi-bell-slash",
			command: () => Se(null)
		}]), Te = c(!1), Ee = S(() => u.conversation.archived ? b.t("room.archived") : G.value ? b.t("room.participants", { count: u.conversation.participantIds.length }) : null), De = S(() => {
			let e = u.typing.map((e) => O(e));
			return e.length ? e.length === 1 ? b.t("typing.one", { name: e[0] }) : b.t("typing.many", { names: e.join(", ") }) : null;
		}), Oe = c(null);
		return (e, s) => {
			let c = m("Button"), u = m("Avatar"), d = m("Menu"), p = m("Skeleton"), _ = m("ProgressSpinner"), S = m("Dialog");
			return a(), n("section", {
				class: "chat-pane",
				"aria-label": v(N)(o.conversation)
			}, [
				F("header", Ct, [
					o.phone ? (a(), I(c, {
						key: 0,
						icon: "pi pi-arrow-left",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": v(b).t("back"),
						onClick: s[0] ||= (e) => f("back")
					}, null, 8, ["aria-label"])) : h("", !0),
					o.conversation.kind === "Direct" ? (a(), I(u, {
						key: 1,
						image: v(k)(v(M)(o.conversation)) ?? void 0,
						label: v(k)(v(M)(o.conversation)) ? void 0 : v(A)(v(M)(o.conversation)),
						shape: "circle"
					}, null, 8, ["image", "label"])) : (a(), I(u, {
						key: 2,
						icon: W.value ? "pi pi-home" : "pi pi-hashtag",
						shape: "circle"
					}, null, 8, ["icon"])),
					F("div", wt, [F("h2", null, t(v(N)(o.conversation)), 1), Ee.value ? (a(), n("p", Tt, t(Ee.value), 1)) : h("", !0)]),
					r(c, {
						icon: o.conversation.muted ? "pi pi-bell-slash" : "pi pi-bell",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": v(b).t(o.conversation.muted ? "mute.muted" : "mute.title"),
						onClick: s[1] ||= (e) => xe.value?.toggle(e)
					}, null, 8, ["icon", "aria-label"]),
					r(d, {
						ref_key: "muteMenu",
						ref: xe,
						model: Ce.value,
						popup: ""
					}, null, 8, ["model"]),
					G.value ? (a(), I(c, {
						key: 3,
						icon: "pi pi-users",
						text: "",
						rounded: "",
						severity: "secondary",
						"aria-label": v(b).t("room.details"),
						onClick: s[2] ||= (e) => Te.value = !0
					}, null, 8, ["aria-label"])) : h("", !0)
				]),
				F("div", {
					ref_key: "scroller",
					ref: q,
					class: "chat-pane__history",
					onScrollPassive: oe
				}, [v(U).loading.value ? (a(), n("div", Et, [(a(), n(P, null, l(4, (e) => r(p, {
					key: e,
					height: "2.5rem",
					width: e % 2 ? "60%" : "40%"
				}, null, 8, ["width"])), 64))])) : (a(), n(P, { key: 1 }, [
					v(U).loadingOlder.value ? (a(), n("div", Dt, [r(_, {
						style: {
							width: "1.5rem",
							height: "1.5rem"
						},
						"stroke-width": "6"
					})])) : !v(U).hasOlder.value && o.conversation.readsFrom ? (a(), n("p", Ot, t(v(b).t("guest.readsFrom")), 1)) : h("", !0),
					v(U).failed.value ? (a(), n("p", kt, [i(t(v(b).t("loadFailed")) + " ", 1), r(c, {
						label: v(b).t("retry"),
						text: "",
						size: "small",
						onClick: s[3] ||= (e) => v(U).load()
					}, null, 8, ["label"])])) : te.value.length ? h("", !0) : (a(), n("p", At, t(v(b).t(K.value ? "empty.writable" : "empty.readOnly")), 1)),
					(a(!0), n(P, null, l(te.value, (e) => (a(), n(P, { key: e.key }, [e.kind === "day" ? (a(), n("div", jt, [F("span", null, t(v(z).day(e.date)), 1)])) : e.kind === "new" ? (a(), n("div", Mt, [F("span", null, t(v(b).t("newMessages")), 1)])) : e.kind === "notice" ? (a(), n("div", Nt, t(e.text), 1)) : e.kind === "message" ? (a(), I(it, {
						key: 3,
						message: e.message,
						mine: e.mine,
						lead: e.lead,
						"show-author": o.conversation.kind !== "Direct",
						"user-id": v(E),
						time: v(z).time(e.message.sentAt),
						"name-of": v(O),
						"avatar-of": v(k),
						"can-act": ge(e.message),
						"can-react": K.value,
						seen: e.message.id === ne.value,
						onMenu: (t) => ye(e.message, t),
						onReact: (t, n) => de(e.message, t, n),
						onMedia: s[4] ||= (e, t) => Oe.value = {
							items: e,
							index: t
						},
						onStale: (t) => v(U).refreshMedia(e.message.id)
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
						"onMenu",
						"onReact",
						"onStale"
					])) : (a(), n("div", {
						key: 4,
						class: D(["chat-outgoing", {
							"chat-outgoing--failed": e.message.failed,
							"chat-outgoing--lead": e.lead
						}])
					}, [F("div", Pt, [e.message.attachments.length ? (a(), n("div", Ft, [(a(!0), n(P, null, l(e.message.attachments, (e) => (a(), n("img", {
						key: e.id,
						src: e.thumbUrl ?? void 0,
						alt: ""
					}, null, 8, It))), 128))])) : h("", !0), e.message.text ? (a(), n("div", {
						key: 1,
						innerHTML: v(C)(e.message.text)
					}, null, 8, Lt)) : h("", !0)]), F("div", Rt, [e.message.failed ? (a(), n(P, { key: 0 }, [
						s[14] ||= F("i", {
							class: "pi pi-exclamation-circle",
							"aria-hidden": "true"
						}, null, -1),
						i(" " + t(v(b).t("send.failed")) + " ", 1),
						r(c, {
							label: v(b).t("retry"),
							text: "",
							size: "small",
							onClick: (t) => v(U).retry(e.message)
						}, null, 8, ["label", "onClick"]),
						r(c, {
							label: v(b).t("send.discard"),
							text: "",
							size: "small",
							severity: "secondary",
							onClick: (t) => v(U).discard(e.message)
						}, null, 8, ["label", "onClick"])
					], 64)) : (a(), n(P, { key: 1 }, [i(t(v(b).t("send.sending")), 1)], 64))])], 2))], 64))), 128)),
					De.value ? (a(), n("p", zt, t(De.value), 1)) : h("", !0)
				], 64))], 544),
				Y.value ? (a(), I(c, {
					key: 0,
					class: "chat-pane__down",
					label: v(b).t("newMessages"),
					icon: "pi pi-arrow-down",
					size: "small",
					rounded: "",
					onClick: s[5] ||= (e) => (X(), ie())
				}, null, 8, ["label"])) : h("", !0),
				K.value ? (a(), I(He, {
					key: 1,
					api: v(x),
					hub: o.hub,
					"reply-to": Z.value,
					editing: Q.value,
					"name-of": v(O),
					onSend: le,
					onSave: ue,
					onCancelReply: s[6] ||= (e) => Z.value = null,
					onCancelEdit: s[7] ||= (e) => Q.value = null,
					onTyping: s[8] ||= (e) => o.hub.typing(o.conversation.id)
				}, null, 8, [
					"api",
					"hub",
					"reply-to",
					"editing",
					"name-of"
				])) : (a(), n("p", Bt, t(v(b).t(o.conversation.archived ? "room.archivedNote" : "guest.readOnly")), 1)),
				r(d, {
					ref_key: "menu",
					ref: pe,
					model: ve.value,
					popup: ""
				}, g({ _: 2 }, [K.value ? {
					name: "start",
					fn: y(() => [F("div", Vt, [(a(), n(P, null, l(B, (e) => F("button", {
						key: e,
						type: "button",
						"aria-label": v(b).t("message.react", { emoji: e }),
						onClick: (t) => be(e)
					}, t(e), 9, Ht)), 64))])]),
					key: "0"
				} : void 0]), 1032, ["model"]),
				r(S, {
					visible: !!$.value,
					modal: "",
					header: v(b).t("message.delete"),
					style: {
						width: "22rem",
						maxWidth: "95vw"
					},
					"onUpdate:visible": s[10] ||= (e) => $.value = null
				}, {
					footer: y(() => [r(c, {
						label: v(b).t("cancel"),
						severity: "secondary",
						text: "",
						onClick: s[9] ||= (e) => $.value = null
					}, null, 8, ["label"]), r(c, {
						label: v(b).t("message.delete"),
						severity: "danger",
						onClick: fe
					}, null, 8, ["label"])]),
					default: y(() => [F("p", Ut, t(v(b).t("message.deleteConfirm")), 1)]),
					_: 1
				}, 8, ["visible", "header"]),
				Te.value && G.value ? (a(), I(xt, {
					key: 3,
					conversation: o.conversation,
					chat: o.chat,
					onClose: s[11] ||= (e) => Te.value = !1,
					onLeft: s[12] ||= (e) => f("left")
				}, null, 8, ["conversation", "chat"])) : h("", !0),
				Oe.value ? (a(), I(we, {
					key: 4,
					items: Oe.value.items,
					start: Oe.value.index,
					onClose: s[13] ||= (e) => Oe.value = null
				}, null, 8, ["items", "start"])) : h("", !0)
			], 8, St);
		};
	}
}), [["__scopeId", "data-v-53ea214f"]]), qt = {
	key: 1,
	class: "chat-page__loading"
}, Jt = {
	key: 1,
	class: "chat-page__pane"
}, Yt = {
	key: 0,
	class: "chat-page__people"
}, Xt = ["disabled", "onClick"], Zt = {
	key: 1,
	class: "chat-page__nobody"
}, Qt = 5e3, $t = /*#__PURE__*/ M(/* @__PURE__ */ f({
	__name: "ChatPage",
	setup(e) {
		let o = b(), s = E(() => o.household.value.id), { conversations: f, members: g, userId: x, nameOf: C, avatarOf: w, initialOf: O } = s, k = T(), A = Z(), j = Q(), M = N(o.manifest.endpoints.realtime ?? "/plugins/chat/hub", o.accessToken, o.household.value.id);
		p(() => M.stop());
		let L = window.matchMedia("(max-width: 767px)"), R = c(L.matches), z = () => R.value = L.matches;
		L.addEventListener("change", z), p(() => L.removeEventListener("change", z));
		let B = S(() => f.data.value ?? []), V = S(() => typeof A.query.c == "string" ? A.query.c : null), H = S(() => B.value.find((e) => e.id === V.value) ?? (R.value ? null : B.value.find((e) => e.kind === "Household") ?? null));
		function U(e) {
			let { c: t, ...n } = A.query, r = e ? {
				...n,
				c: e
			} : n;
			e && R.value && !V.value ? j.push({ query: r }) : j.replace({ query: r });
		}
		let W = c(document.visibilityState === "visible"), G = () => W.value = document.visibilityState === "visible";
		document.addEventListener("visibilitychange", G), p(() => document.removeEventListener("visibilitychange", G)), _([() => H.value?.id ?? null, W], ([e, t]) => M.open(t ? e : null), { immediate: !0 });
		let K = c([]), ee = (e, t) => K.value = K.value.filter((n) => n.conversationId !== e || n.userId !== t), te = (e) => K.value.filter((t) => t.conversationId === e).map((e) => e.userId), ne = [
			M.on("MessageSent", (e) => {
				e.authorId && ee(e.conversationId, e.authorId), s.refreshConversations();
			}),
			M.on("ReadMarkerMoved", () => void s.refreshConversations()),
			M.on("ConversationChanged", () => void s.refreshConversations()),
			M.on("AccessChanged", () => {
				s.refreshConversations(), s.refreshMembers();
			}),
			M.on("Typing", (e) => {
				if (e.userId === x.value) return;
				ee(e.conversationId, e.userId);
				let t = Date.now() + Qt;
				K.value.push({
					conversationId: e.conversationId,
					userId: e.userId,
					until: t
				}), setTimeout(() => K.value = K.value.filter((e) => e.until > Date.now()), 5050);
			}),
			M.onReconnected(() => void s.refreshConversations())
		];
		p(() => ne.forEach((e) => e()));
		let q = S(() => (g.data.value ?? []).filter((e) => e.userId !== x.value)), J = c(null), Y = c(!1);
		async function X(e) {
			Y.value = !0;
			try {
				let t = await e();
				await s.refreshConversations(), J.value = null, U(t);
			} catch (e) {
				o.notify("error", o.errorMessage(e));
			} finally {
				Y.value = !1;
			}
		}
		let re = (e, t) => X(() => s.api.value.createRoom(e, t)), ie = (e) => X(() => s.api.value.startDirect(e)), ae = c(null), oe = c(0), se = () => ae.value && (oe.value = ae.value.getBoundingClientRect().top + window.scrollY);
		d(() => {
			se(), window.addEventListener("resize", se);
		}), p(() => window.removeEventListener("resize", se));
		let ce = S(() => R.value ? void 0 : `max(26rem, calc(100dvh - ${Math.round(oe.value)}px - 1.5rem))`);
		return (e, c) => {
			let d = m("Message"), p = m("Skeleton"), g = m("Avatar"), _ = m("Dialog");
			return a(), n("div", {
				ref_key: "root",
				ref: ae,
				class: D(["chat-page", {
					"chat-page--phone": R.value,
					"chat-page--open": !!H.value
				}]),
				style: u({ height: ce.value })
			}, [
				v(f).isError.value ? (a(), I(d, {
					key: 0,
					severity: "error",
					closable: !1
				}, {
					default: y(() => [i(t(v(o).errorMessage(v(f).error.value)), 1)]),
					_: 1
				})) : v(f).isPending.value ? (a(), n("div", qt, [(a(), n(P, null, l(4, (e) => r(p, {
					key: e,
					height: "2.5rem"
				})), 64))])) : (a(), n(P, { key: 2 }, [!R.value || !H.value ? (a(), I(ge, {
					key: 0,
					class: "chat-page__list",
					chat: v(s),
					conversations: B.value,
					"selected-id": H.value?.id ?? null,
					"format-when": v(k).when,
					onSelect: U,
					onNewRoom: c[0] ||= (e) => J.value = "room",
					onNewDirect: c[1] ||= (e) => J.value = "direct"
				}, null, 8, [
					"chat",
					"conversations",
					"selected-id",
					"format-when"
				])) : h("", !0), H.value ? (a(), n("div", Jt, [(a(), I(Kt, {
					key: H.value.id,
					chat: v(s),
					hub: v(M),
					conversation: H.value,
					typing: te(H.value.id),
					phone: R.value,
					onBack: c[2] ||= (e) => U(null),
					onLeft: c[3] ||= (e) => U(null)
				}, null, 8, [
					"chat",
					"hub",
					"conversation",
					"typing",
					"phone"
				]))])) : h("", !0)], 64)),
				J.value === "room" ? (a(), I(ft, {
					key: 3,
					mode: "create",
					members: q.value,
					busy: Y.value,
					onSubmit: re,
					onClose: c[4] ||= (e) => J.value = null
				}, null, 8, ["members", "busy"])) : h("", !0),
				r(_, {
					visible: J.value === "direct",
					modal: "",
					header: v(o).t("direct.new"),
					style: {
						width: "22rem",
						maxWidth: "95vw"
					},
					"onUpdate:visible": c[5] ||= (e) => J.value = null
				}, {
					default: y(() => [q.value.length ? (a(), n("ul", Yt, [(a(!0), n(P, null, l(q.value, (e) => (a(), n("li", { key: e.userId }, [F("button", {
						type: "button",
						disabled: Y.value,
						onClick: (t) => ie(e.userId)
					}, [r(g, {
						image: v(w)(e.userId) ?? void 0,
						label: v(w)(e.userId) ? void 0 : v(O)(e.userId),
						shape: "circle"
					}, null, 8, ["image", "label"]), F("span", null, t(v(C)(e.userId)), 1)], 8, Xt)]))), 128))])) : (a(), n("p", Zt, t(v(o).t("direct.empty")), 1))]),
					_: 1
				}, 8, ["visible", "header"])
			], 6);
		};
	}
}), [["__scopeId", "data-v-f12acabc"]]);
export { $t as default };

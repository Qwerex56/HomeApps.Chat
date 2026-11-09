// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), r = globalThis.__HOMEAPPS_SHARED__?.vue;
if (!r) throw Error("HomeApps does not share vue; is this plugin loaded by the HomeApps web app?");
r.default;
var { BaseTransition: i, BaseTransitionPropsValidators: a, Comment: o, DeprecationTypes: s, EffectScope: c, ErrorCodes: l, ErrorTypeStrings: u, Fragment: d, KeepAlive: f, ReactiveEffect: p, Static: m, Suspense: h, Teleport: g, Text: _, TrackOpTypes: v, Transition: y, TransitionGroup: b, TriggerOpTypes: ee, VueElement: te, assertNumber: x, callWithAsyncErrorHandling: ne, callWithErrorHandling: re, camelize: ie, capitalize: S, cloneVNode: ae, compatUtils: oe, compile: se, computed: C, createApp: ce, createBlock: le, createCommentVNode: ue, createElementBlock: de, createElementVNode: fe, createHydrationRenderer: pe, createPropsRestProxy: me, createRenderer: he, createSSRApp: ge, createSlots: _e, createStaticVNode: w, createTextVNode: ve, createVNode: ye, customRef: be, defineAsyncComponent: xe, defineComponent: Se, defineCustomElement: Ce, defineEmits: we, defineExpose: Te, defineModel: Ee, defineOptions: T, defineProps: De, defineSSRCustomElement: E, defineSlots: Oe, devtools: ke, effect: Ae, effectScope: je, getCurrentInstance: Me, getCurrentScope: Ne, getCurrentWatcher: Pe, getTransitionRawChildren: Fe, guardReactiveProps: Ie, h: Le, handleError: Re, hasInjectionContext: ze, hydrate: Be, hydrateOnIdle: Ve, hydrateOnInteraction: He, hydrateOnMediaQuery: Ue, hydrateOnVisible: We, initCustomFormatter: Ge, initDirectivesForSSR: Ke, inject: qe, isMemoSame: Je, isProxy: Ye, isReactive: Xe, isReadonly: Ze, isRef: Qe, isRuntimeOnly: $e, isShallow: et, isVNode: tt, markRaw: nt, mergeDefaults: rt, mergeModels: it, mergeProps: at, nextTick: ot, nodeOps: st, normalizeClass: D, normalizeProps: ct, normalizeStyle: lt, onActivated: ut, onBeforeMount: dt, onBeforeUnmount: ft, onBeforeUpdate: pt, onDeactivated: mt, onErrorCaptured: ht, onMounted: gt, onRenderTracked: _t, onRenderTriggered: vt, onScopeDispose: O, onServerPrefetch: yt, onUnmounted: bt, onUpdated: xt, onWatcherCleanup: St, openBlock: Ct, patchProp: wt, popScopeId: Tt, provide: Et, proxyRefs: Dt, pushScopeId: Ot, queuePostFlushCb: kt, reactive: At, readonly: jt, ref: Mt, registerRuntimeCompiler: Nt, render: Pt, renderList: Ft, renderSlot: It, resolveComponent: Lt, resolveDirective: Rt, resolveDynamicComponent: zt, resolveFilter: Bt, resolveTransitionHooks: Vt, setBlockTracking: Ht, setDevtoolsHook: Ut, setTransitionHooks: Wt, shallowReactive: Gt, shallowReadonly: Kt, shallowRef: qt, ssrContextKey: Jt, ssrUtils: Yt, stop: Xt, toDisplayString: Zt, toHandlerKey: k, toHandlers: Qt, toRaw: $t, toRef: en, toRefs: tn, toValue: nn, transformVNodeArgs: rn, triggerRef: an, unref: on, useAttrs: sn, useCssModule: cn, useCssVars: ln, useHost: un, useId: dn, useModel: fn, useSSRContext: pn, useShadowRoot: mn, useSlots: hn, useTemplateRef: gn, useTransitionState: _n, vModelCheckbox: vn, vModelDynamic: yn, vModelRadio: bn, vModelSelect: xn, vModelText: Sn, vShow: Cn, version: wn, warn: Tn, watch: En, watchEffect: Dn, watchPostEffect: On, watchSyncEffect: kn, withAsyncContext: An, withCtx: jn, withDefaults: Mn, withDirectives: Nn, withKeys: Pn, withMemo: Fn, withModifiers: In, withScopeId: Ln } = r;
// node_modules/@homeapps/plugin-sdk/dist/index.js
function Rn(e) {
	return e;
}
var zn = "homeapps:plugin-host";
function Bn() {
	let e = qe(zn);
	if (!e) throw Error("useHost() works only inside a component the HomeApps web app renders for a plugin.");
	return e;
}
// \0homeapps-shared:@tanstack/vue-query
var Vn = globalThis.__HOMEAPPS_SHARED__?.["@tanstack/vue-query"];
if (!Vn) throw Error("HomeApps does not share @tanstack/vue-query; is this plugin loaded by the HomeApps web app?");
Vn.default;
var { CancelledError: Hn, InfiniteQueryObserver: Un, Mutation: Wn, MutationCache: Gn, MutationObserver: Kn, QueriesObserver: qn, Query: Jn, QueryCache: Yn, QueryClient: Xn, QueryObserver: Zn, VUE_QUERY_CLIENT: Qn, VueQueryPlugin: $n, dataTagErrorSymbol: er, dataTagSymbol: tr, defaultScheduler: nr, defaultShouldDehydrateMutation: rr, defaultShouldDehydrateQuery: ir, dehydrate: ar, dehydrateQuery: or, environmentManager: sr, experimental_streamedQuery: cr, focusManager: lr, hashKey: ur, hydrate: dr, infiniteQueryOptions: fr, isCancelledError: pr, isServer: mr, keepPreviousData: hr, matchMutation: gr, matchQuery: _r, mutationOptions: vr, noop: yr, notifyManager: br, onlineManager: xr, partialMatchKey: Sr, queryOptions: Cr, replaceEqualDeep: wr, shouldThrowError: Tr, skipToken: Er, timeoutManager: Dr, unsetMarker: Or, useInfiniteQuery: kr, useIsFetching: Ar, useIsMutating: jr, useMutation: Mr, useMutationState: Nr, usePrefetchInfiniteQuery: Pr, usePrefetchQuery: Fr, useQueries: Ir, useQuery: Lr, useQueryClient: Rr } = Vn, zr = globalThis.__HOMEAPPS_SHARED__?.["vue-i18n"];
if (!zr) throw Error("HomeApps does not share vue-i18n; is this plugin loaded by the HomeApps web app?");
zr.default;
var { DatetimeFormat: Br, I18nD: Vr, I18nInjectionKey: Hr, I18nN: Ur, I18nT: Wr, NumberFormat: Gr, Translation: Kr, VERSION: qr, createI18n: Jr, useI18n: Yr, vTDirective: Xr } = zr, Zr = (e) => {
	let t = new Date(e);
	return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
};
function Qr(e, t, n, r, i) {
	let a = [...e.map((e) => ({
		at: e.sentAt,
		message: e
	})), ...n.map((e) => ({
		at: e.at,
		notice: e
	}))];
	a.sort((e, t) => e.at < t.at ? -1 : +(e.at > t.at)), a.push(...t.map((e) => ({
		at: e.sentAt,
		outgoing: e
	})));
	let o = [], s = null, c = null, l = i === null && null, u = !1;
	for (let e of a) {
		let t = Zr(e.at);
		if (t !== s && (s = t, c = null, o.push({
			kind: "day",
			key: `day-${t}`,
			date: e.at
		})), e.notice) {
			c = null, o.push({
				kind: "notice",
				key: `notice-${e.notice.id}`,
				text: e.notice.text
			});
			continue;
		}
		let n = e.message?.authorId ?? r ?? "", a = new Date(e.at).getTime();
		e.message && l && !u && e.message.authorId !== r && (u = !0, c = null, o.push({
			kind: "new",
			key: "new"
		}));
		let d = c === null || c.authorId !== n || a - c.at > 3e5;
		c = {
			authorId: n,
			at: a
		}, e.message ? (o.push({
			kind: "message",
			key: e.message.id,
			message: e.message,
			mine: n === r,
			lead: d
		}), e.message.id === i && (l = !0)) : e.outgoing && o.push({
			kind: "outgoing",
			key: `out-${e.outgoing.clientMessageId}`,
			message: e.outgoing,
			lead: d
		});
	}
	return o;
}
function $r(e, t = /* @__PURE__ */ new Date()) {
	let n = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime(), r = Math.round((n(t) - n(new Date(e))) / 864e5);
	return r === 0 ? "today" : r === 1 ? "yesterday" : null;
}
// src/format.ts
function ei() {
	let e = Bn(), { locale: t } = Yr({ useScope: "global" }), n = (e) => new Date(e).toLocaleTimeString(t.value, {
		hour: "2-digit",
		minute: "2-digit"
	});
	function r(n) {
		let r = $r(n);
		if (r) return e.t(`day.${r}`);
		let i = new Date(n);
		return i.toLocaleDateString(t.value, {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: i.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? void 0 : "numeric"
		});
	}
	function i(e) {
		return $r(e) === "today" ? n(e) : new Date(e).toLocaleDateString(t.value, {
			day: "numeric",
			month: "short"
		});
	}
	return {
		time: n,
		day: r,
		when: i
	};
}
// node_modules/@microsoft/signalr/dist/esm/Errors.js
var ti = class extends Error {
	constructor(e, t) {
		let n = new.target.prototype;
		super(`${e}: Status code '${t}'`), this.statusCode = t, this.__proto__ = n;
	}
}, ni = class extends Error {
	constructor(e = "A timeout occurred.") {
		let t = new.target.prototype;
		super(e), this.__proto__ = t;
	}
}, A = class extends Error {
	constructor(e = "An abort occurred.") {
		let t = new.target.prototype;
		super(e), this.__proto__ = t;
	}
}, ri = class extends Error {
	constructor(e, t) {
		let n = new.target.prototype;
		super(e), this.transport = t, this.errorType = "UnsupportedTransportError", this.__proto__ = n;
	}
}, ii = class extends Error {
	constructor(e, t) {
		let n = new.target.prototype;
		super(e), this.transport = t, this.errorType = "DisabledTransportError", this.__proto__ = n;
	}
}, ai = class extends Error {
	constructor(e, t) {
		let n = new.target.prototype;
		super(e), this.transport = t, this.errorType = "FailedToStartTransportError", this.__proto__ = n;
	}
}, oi = class extends Error {
	constructor(e) {
		let t = new.target.prototype;
		super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = t;
	}
}, si = class extends Error {
	constructor(e, t) {
		let n = new.target.prototype;
		super(e), this.innerErrors = t, this.__proto__ = n;
	}
}, ci = class {
	constructor(e, t, n) {
		this.statusCode = e, this.statusText = t, this.content = n;
	}
}, li = class {
	get(e, t) {
		return this.send({
			...t,
			method: "GET",
			url: e
		});
	}
	post(e, t) {
		return this.send({
			...t,
			method: "POST",
			url: e
		});
	}
	delete(e, t) {
		return this.send({
			...t,
			method: "DELETE",
			url: e
		});
	}
	getCookieString(e) {
		return "";
	}
}, j;
(function(e) {
	e[e.Trace = 0] = "Trace", e[e.Debug = 1] = "Debug", e[e.Information = 2] = "Information", e[e.Warning = 3] = "Warning", e[e.Error = 4] = "Error", e[e.Critical = 5] = "Critical", e[e.None = 6] = "None";
})(j ||= {});
// node_modules/@microsoft/signalr/dist/esm/Loggers.js
var ui = class {
	constructor() {}
	log(e, t) {}
};
ui.instance = new ui();
// node_modules/@microsoft/signalr/dist/esm/pkg-version.js
var di = "10.0.11", M = class {
	static isRequired(e, t) {
		if (e == null) throw Error(`The '${t}' argument is required.`);
	}
	static isNotEmpty(e, t) {
		if (!e || e.match(/^\s*$/)) throw Error(`The '${t}' argument should not be empty.`);
	}
	static isIn(e, t, n) {
		if (!(e in t)) throw Error(`Unknown ${n} value: ${e}.`);
	}
}, N = class e {
	static get isBrowser() {
		return !e.isNode && typeof window == "object" && typeof window.document == "object";
	}
	static get isWebWorker() {
		return !e.isNode && typeof self == "object" && "importScripts" in self;
	}
	static get isReactNative() {
		return !e.isNode && typeof window == "object" && window.document === void 0;
	}
	static get isNode() {
		return typeof process < "u" && process.release && process.release.name === "node";
	}
};
function fi(e, t) {
	let n = "";
	return mi(e) ? (n = `Binary data of length ${e.byteLength}`, t && (n += `. Content: '${pi(e)}'`)) : typeof e == "string" && (n = `String data of length ${e.length}`, t && (n += `. Content: '${e}'`)), n;
}
function pi(e) {
	let t = new Uint8Array(e), n = "";
	return t.forEach((e) => {
		n += `0x${e < 16 ? "0" : ""}${e.toString(16)} `;
	}), n.substring(0, n.length - 1);
}
function mi(e) {
	return e && typeof ArrayBuffer < "u" && (e instanceof ArrayBuffer || e.constructor && e.constructor.name === "ArrayBuffer");
}
async function hi(e, t, n, r, i, a) {
	let o = {}, [s, c] = yi();
	o[s] = c, e.log(j.Trace, `(${t} transport) sending data. ${fi(i, a.logMessageContent)}.`);
	let l = mi(i) ? "arraybuffer" : "text", u = await n.post(r, {
		content: i,
		headers: {
			...o,
			...a.headers
		},
		responseType: l,
		timeout: a.timeout,
		withCredentials: a.withCredentials
	});
	e.log(j.Trace, `(${t} transport) request complete. Response status: ${u.statusCode}.`);
}
function gi(e) {
	return e === void 0 ? new vi(j.Information) : e === null ? ui.instance : e.log === void 0 ? new vi(e) : e;
}
var _i = class {
	constructor(e, t) {
		this._subject = e, this._observer = t;
	}
	dispose() {
		let e = this._subject.observers.indexOf(this._observer);
		e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((e) => {});
	}
}, vi = class {
	constructor(e) {
		this._minLevel = e, this.out = console;
	}
	log(e, t) {
		if (e >= this._minLevel) {
			let n = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${j[e]}: ${t}`;
			switch (e) {
				case j.Critical:
				case j.Error:
					this.out.error(n);
					break;
				case j.Warning:
					this.out.warn(n);
					break;
				case j.Information:
					this.out.info(n);
					break;
				default: this.out.log(n);
			}
		}
	}
};
function yi() {
	let e = "X-SignalR-User-Agent";
	return N.isNode && (e = "User-Agent"), [e, bi(di, xi(), Ci(), Si())];
}
function bi(e, t, n, r) {
	let i = "Microsoft SignalR/", a = e.split(".");
	return i += `${a[0]}.${a[1]}`, i += ` (${e}; `, i += t && t !== "" ? `${t}; ` : "Unknown OS; ", i += `${n}`, i += r ? `; ${r}` : "; Unknown Runtime Version", i += ")", i;
}
/*#__PURE__*/ function xi() {
	if (N.isNode) switch (process.platform) {
		case "win32": return "Windows NT";
		case "darwin": return "macOS";
		case "linux": return "Linux";
		default: return process.platform;
	}
	else return "";
}
/*#__PURE__*/ function Si() {
	if (N.isNode) return process.versions.node;
}
function Ci() {
	return N.isNode ? "NodeJS" : "Browser";
}
function wi(e) {
	return e.stack ? e.stack : e.message ? e.message : `${e}`;
}
function Ti() {
	if (typeof globalThis < "u") return globalThis;
	if (typeof self < "u") return self;
	if (typeof window < "u") return window;
	if (typeof global < "u") return global;
	throw Error("could not find global");
}
// node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js
var Ei = class extends li {
	constructor(e) {
		if (super(), this._logger = e, typeof fetch > "u" || N.isNode) {
			let e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : n;
			this._jar = new (e("tough-cookie")).CookieJar(), this._fetchType = typeof fetch > "u" ? e("node-fetch") : fetch, this._fetchType = e("fetch-cookie")(this._fetchType, this._jar);
		} else this._fetchType = fetch.bind(Ti());
		if (typeof AbortController > "u") {
			let e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : n;
			this._abortControllerType = e("abort-controller");
		} else this._abortControllerType = AbortController;
	}
	async send(e) {
		if (e.abortSignal && e.abortSignal.aborted) throw new A();
		if (!e.method) throw Error("No method defined.");
		if (!e.url) throw Error("No url defined.");
		let t = new this._abortControllerType(), n;
		e.abortSignal && (e.abortSignal.onabort = () => {
			t.abort(), n = new A();
		});
		let r = null;
		if (e.timeout) {
			let i = e.timeout;
			r = setTimeout(() => {
				t.abort(), this._logger.log(j.Warning, "Timeout from HTTP request."), n = new ni();
			}, i);
		}
		e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, mi(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
		let i;
		try {
			i = await this._fetchType(e.url, {
				body: e.content,
				cache: "no-cache",
				credentials: e.withCredentials === !0 ? "include" : "same-origin",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					...e.headers
				},
				method: e.method,
				mode: "cors",
				redirect: "follow",
				signal: t.signal
			});
		} catch (e) {
			throw n || (this._logger.log(j.Warning, `Error from HTTP request. ${e}.`), e);
		} finally {
			r && clearTimeout(r), e.abortSignal && (e.abortSignal.onabort = null);
		}
		if (!i.ok) throw new ti(await Di(i, "text") || i.statusText, i.status);
		let a = await Di(i, e.responseType);
		return new ci(i.status, i.statusText, a);
	}
	getCookieString(e) {
		let t = "";
		return N.isNode && this._jar && this._jar.getCookies(e, (e, n) => t = n.join("; ")), t;
	}
};
function Di(e, t) {
	let n;
	switch (t) {
		case "arraybuffer":
			n = e.arrayBuffer();
			break;
		case "text":
			n = e.text();
			break;
		case "blob":
		case "document":
		case "json": throw Error(`${t} is not supported.`);
		default: n = e.text();
	}
	return n;
}
// node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js
var Oi = class extends li {
	constructor(e) {
		super(), this._logger = e;
	}
	send(e) {
		return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new A()) : e.method ? e.url ? new Promise((t, n) => {
			let r = new XMLHttpRequest();
			r.open(e.method, e.url, !0), r.withCredentials = e.withCredentials === void 0 || e.withCredentials, r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (mi(e.content) ? r.setRequestHeader("Content-Type", "application/octet-stream") : r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
			let i = e.headers;
			i && Object.keys(i).forEach((e) => {
				r.setRequestHeader(e, i[e]);
			}), e.responseType && (r.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
				r.abort(), n(new A());
			}), e.timeout && (r.timeout = e.timeout), r.onload = () => {
				e.abortSignal && (e.abortSignal.onabort = null), r.status >= 200 && r.status < 300 ? t(new ci(r.status, r.statusText, r.response || r.responseText)) : n(new ti(r.response || r.responseText || r.statusText, r.status));
			}, r.onerror = () => {
				this._logger.log(j.Warning, `Error from HTTP request. ${r.status}: ${r.statusText}.`), n(new ti(r.statusText, r.status));
			}, r.ontimeout = () => {
				this._logger.log(j.Warning, "Timeout from HTTP request."), n(new ni());
			}, r.send(e.content);
		}) : Promise.reject(/* @__PURE__ */ Error("No url defined.")) : Promise.reject(/* @__PURE__ */ Error("No method defined."));
	}
}, ki = class extends li {
	constructor(e) {
		if (super(), typeof fetch < "u" || N.isNode) this._httpClient = new Ei(e);
		else if (typeof XMLHttpRequest < "u") this._httpClient = new Oi(e);
		else throw Error("No usable HttpClient found.");
	}
	send(e) {
		return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new A()) : e.method ? e.url ? this._httpClient.send(e) : Promise.reject(/* @__PURE__ */ Error("No url defined.")) : Promise.reject(/* @__PURE__ */ Error("No method defined."));
	}
	getCookieString(e) {
		return this._httpClient.getCookieString(e);
	}
}, Ai = class e {
	static write(t) {
		return `${t}${e.RecordSeparator}`;
	}
	static parse(t) {
		if (t[t.length - 1] !== e.RecordSeparator) throw Error("Message is incomplete.");
		let n = t.split(e.RecordSeparator);
		return n.pop(), n;
	}
};
Ai.RecordSeparatorCode = 30, Ai.RecordSeparator = String.fromCharCode(Ai.RecordSeparatorCode);
// node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js
var ji = class {
	writeHandshakeRequest(e) {
		return Ai.write(JSON.stringify(e));
	}
	parseHandshakeResponse(e) {
		let t, n;
		if (mi(e)) {
			let r = new Uint8Array(e), i = r.indexOf(Ai.RecordSeparatorCode);
			if (i === -1) throw Error("Message is incomplete.");
			let a = i + 1;
			t = String.fromCharCode.apply(null, Array.prototype.slice.call(r.slice(0, a))), n = r.byteLength > a ? r.slice(a).buffer : null;
		} else {
			let r = e, i = r.indexOf(Ai.RecordSeparator);
			if (i === -1) throw Error("Message is incomplete.");
			let a = i + 1;
			t = r.substring(0, a), n = r.length > a ? r.substring(a) : null;
		}
		let r = Ai.parse(t), i = JSON.parse(r[0]);
		if (i.type) throw Error("Expected a handshake response from the server.");
		return [n, i];
	}
}, P;
(function(e) {
	e[e.Invocation = 1] = "Invocation", e[e.StreamItem = 2] = "StreamItem", e[e.Completion = 3] = "Completion", e[e.StreamInvocation = 4] = "StreamInvocation", e[e.CancelInvocation = 5] = "CancelInvocation", e[e.Ping = 6] = "Ping", e[e.Close = 7] = "Close", e[e.Ack = 8] = "Ack", e[e.Sequence = 9] = "Sequence";
})(P ||= {});
// node_modules/@microsoft/signalr/dist/esm/Subject.js
var Mi = class {
	constructor() {
		this.observers = [];
	}
	next(e) {
		for (let t of this.observers) t.next(e);
	}
	error(e) {
		for (let t of this.observers) t.error && t.error(e);
	}
	complete() {
		for (let e of this.observers) e.complete && e.complete();
	}
	subscribe(e) {
		return this.observers.push(e), new _i(this, e);
	}
}, Ni = class {
	constructor(e, t, n) {
		this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = t, this._bufferSize = n;
	}
	async _send(e) {
		let t = this._protocol.writeMessage(e), n = Promise.resolve();
		if (this._isInvocationMessage(e)) {
			this._totalMessageCount++;
			let e = () => {}, r = () => {};
			mi(t) ? this._bufferedByteCount += t.byteLength : this._bufferedByteCount += t.length, this._bufferedByteCount >= this._bufferSize && (n = new Promise((t, n) => {
				e = t, r = n;
			})), this._messages.push(new Pi(t, this._totalMessageCount, e, r));
		}
		try {
			this._reconnectInProgress || await this._connection.send(t);
		} catch {
			this._disconnected();
		}
		await n;
	}
	_ack(e) {
		let t = -1;
		for (let n = 0; n < this._messages.length; n++) {
			let r = this._messages[n];
			if (r._id <= e.sequenceId) t = n, mi(r._message) ? this._bufferedByteCount -= r._message.byteLength : this._bufferedByteCount -= r._message.length, r._resolver();
			else if (this._bufferedByteCount < this._bufferSize) r._resolver();
			else break;
		}
		t !== -1 && (this._messages = this._messages.slice(t + 1));
	}
	_shouldProcessMessage(e) {
		if (this._waitForSequenceMessage) return e.type === P.Sequence && (this._waitForSequenceMessage = !1, !0);
		if (!this._isInvocationMessage(e)) return !0;
		let t = this._nextReceivingSequenceId;
		return this._nextReceivingSequenceId++, t <= this._latestReceivedSequenceId ? (t === this._latestReceivedSequenceId && this._ackTimer(), !1) : (this._latestReceivedSequenceId = t, this._ackTimer(), !0);
	}
	_resetSequence(e) {
		e.sequenceId > this._nextReceivingSequenceId ? this._connection.stop(/* @__PURE__ */ Error("Sequence ID greater than amount of messages we've received.")) : this._nextReceivingSequenceId = e.sequenceId;
	}
	_disconnected() {
		this._reconnectInProgress = !0, this._waitForSequenceMessage = !0;
	}
	async _resend() {
		let e = this._messages.length === 0 ? this._totalMessageCount + 1 : this._messages[0]._id;
		await this._connection.send(this._protocol.writeMessage({
			type: P.Sequence,
			sequenceId: e
		}));
		let t = this._messages;
		for (let e of t) await this._connection.send(e._message);
		this._reconnectInProgress = !1;
	}
	_dispose(e) {
		e ??= /* @__PURE__ */ Error("Unable to reconnect to server.");
		for (let t of this._messages) t._rejector(e);
	}
	_isInvocationMessage(e) {
		switch (e.type) {
			case P.Invocation:
			case P.StreamItem:
			case P.Completion:
			case P.StreamInvocation:
			case P.CancelInvocation: return !0;
			case P.Close:
			case P.Sequence:
			case P.Ping:
			case P.Ack: return !1;
		}
	}
	_ackTimer() {
		this._ackTimerHandle === void 0 && (this._ackTimerHandle = setTimeout(async () => {
			try {
				this._reconnectInProgress || await this._connection.send(this._protocol.writeMessage({
					type: P.Ack,
					sequenceId: this._latestReceivedSequenceId
				}));
			} catch {}
			clearTimeout(this._ackTimerHandle), this._ackTimerHandle = void 0;
		}, 1e3));
	}
}, Pi = class {
	constructor(e, t, n, r) {
		this._message = e, this._id = t, this._resolver = n, this._rejector = r;
	}
}, Fi = 3e4, Ii = 15e3, Li = 1e5, F;
(function(e) {
	e.Disconnected = "Disconnected", e.Connecting = "Connecting", e.Connected = "Connected", e.Disconnecting = "Disconnecting", e.Reconnecting = "Reconnecting";
})(F ||= {});
var Ri = class e {
	static create(t, n, r, i, a, o, s) {
		return new e(t, n, r, i, a, o, s);
	}
	constructor(e, t, n, r, i, a, o) {
		this._nextKeepAlive = 0, this._freezeEventListener = () => {
			this._logger.log(j.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
		}, M.isRequired(e, "connection"), M.isRequired(t, "logger"), M.isRequired(n, "protocol"), this.serverTimeoutInMilliseconds = i ?? Fi, this.keepAliveIntervalInMilliseconds = a ?? Ii, this._statefulReconnectBufferSize = o ?? Li, this._logger = t, this._protocol = n, this.connection = e, this._reconnectPolicy = r, this._handshakeProtocol = new ji(), this.connection.onreceive = (e) => this._processIncomingData(e), this.connection.onclose = (e) => this._connectionClosed(e), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = F.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: P.Ping });
	}
	get state() {
		return this._connectionState;
	}
	get connectionId() {
		return this.connection && this.connection.connectionId || null;
	}
	get baseUrl() {
		return this.connection.baseUrl || "";
	}
	set baseUrl(e) {
		if (this._connectionState !== F.Disconnected && this._connectionState !== F.Reconnecting) throw Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
		if (!e) throw Error("The HubConnection url must be a valid url.");
		this.connection.baseUrl = e;
	}
	start() {
		return this._startPromise = this._startWithStateTransitions(), this._startPromise;
	}
	async _startWithStateTransitions() {
		if (this._connectionState !== F.Disconnected) return Promise.reject(/* @__PURE__ */ Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
		this._connectionState = F.Connecting, this._logger.log(j.Debug, "Starting HubConnection.");
		try {
			await this._startInternal(), N.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = F.Connected, this._connectionStarted = !0, this._logger.log(j.Debug, "HubConnection connected successfully.");
		} catch (e) {
			return this._connectionState = F.Disconnected, this._logger.log(j.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
		}
	}
	async _startInternal() {
		this._stopDuringStartError = void 0, this._receivedHandshakeResponse = !1;
		let e = new Promise((e, t) => {
			this._handshakeResolver = e, this._handshakeRejecter = t;
		});
		await this.connection.start(this._protocol.transferFormat);
		try {
			let t = this._protocol.version;
			this.connection.features.reconnect || (t = 1);
			let n = {
				protocol: this._protocol.name,
				version: t
			};
			if (this._logger.log(j.Debug, "Sending handshake request."), await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(n)), this._logger.log(j.Information, `Using HubProtocol '${this._protocol.name}'.`), this._cleanupTimeout(), this._resetTimeoutPeriod(), this._resetKeepAliveInterval(), await e, this._stopDuringStartError) throw this._stopDuringStartError;
			this.connection.features.reconnect && (this._messageBuffer = new Ni(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
				if (this._messageBuffer) return this._messageBuffer._resend();
			}), this.connection.features.inherentKeepAlive || await this._sendMessage(this._cachedPingMessage);
		} catch (e) {
			throw this._logger.log(j.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`), this._cleanupTimeout(), this._cleanupPingTimer(), await this.connection.stop(e), e;
		}
	}
	async stop() {
		let e = this._startPromise;
		this.connection.features.reconnect = !1, this._stopPromise = this._stopInternal(), await this._stopPromise;
		try {
			await e;
		} catch {}
	}
	_stopInternal(e) {
		if (this._connectionState === F.Disconnected) return this._logger.log(j.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
		if (this._connectionState === F.Disconnecting) return this._logger.log(j.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
		let t = this._connectionState;
		return this._connectionState = F.Disconnecting, this._logger.log(j.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(j.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (t === F.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new A("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
	}
	async _sendCloseMessage() {
		try {
			await this._sendWithProtocol(this._createCloseMessage());
		} catch {}
	}
	stream(e, ...t) {
		let [n, r] = this._replaceStreamingParams(t), i = this._createStreamInvocation(e, t, r), a, o = new Mi();
		return o.cancelCallback = () => {
			let e = this._createCancelInvocation(i.invocationId);
			return delete this._callbacks[i.invocationId], a.then(() => this._sendWithProtocol(e));
		}, this._callbacks[i.invocationId] = (e, t) => {
			t ? o.error(t) : e && (e.type === P.Completion ? e.error ? o.error(Error(e.error)) : o.complete() : o.next(e.item));
		}, a = this._sendWithProtocol(i).catch((e) => {
			o.error(e), delete this._callbacks[i.invocationId];
		}), this._launchStreams(n, a), o;
	}
	_sendMessage(e) {
		return this._resetKeepAliveInterval(), this.connection.send(e);
	}
	_sendWithProtocol(e) {
		return this._messageBuffer ? this._messageBuffer._send(e) : this._sendMessage(this._protocol.writeMessage(e));
	}
	send(e, ...t) {
		let [n, r] = this._replaceStreamingParams(t), i = this._sendWithProtocol(this._createInvocation(e, t, !0, r));
		return this._launchStreams(n, i), i;
	}
	invoke(e, ...t) {
		let [n, r] = this._replaceStreamingParams(t), i = this._createInvocation(e, t, !1, r);
		return new Promise((e, t) => {
			this._callbacks[i.invocationId] = (n, r) => {
				r ? t(r) : n && (n.type === P.Completion ? n.error ? t(Error(n.error)) : e(n.result) : t(/* @__PURE__ */ Error(`Unexpected message type: ${n.type}`)));
			};
			let r = this._sendWithProtocol(i).catch((e) => {
				t(e), delete this._callbacks[i.invocationId];
			});
			this._launchStreams(n, r);
		});
	}
	on(e, t) {
		e && t && (e = e.toLowerCase(), this._methods[e] || (this._methods[e] = []), this._methods[e].indexOf(t) === -1 && this._methods[e].push(t));
	}
	off(e, t) {
		if (!e) return;
		e = e.toLowerCase();
		let n = this._methods[e];
		if (n) {
			if (t) {
				let r = n.indexOf(t);
				r !== -1 && (n.splice(r, 1), n.length === 0 && delete this._methods[e]);
			} else delete this._methods[e];
		}
	}
	onclose(e) {
		e && this._closedCallbacks.push(e);
	}
	onreconnecting(e) {
		e && this._reconnectingCallbacks.push(e);
	}
	onreconnected(e) {
		e && this._reconnectedCallbacks.push(e);
	}
	_processIncomingData(e) {
		if (this._cleanupTimeout(), this._receivedHandshakeResponse ||= (e = this._processHandshakeResponse(e), !0), e) {
			let t = this._protocol.parseMessages(e, this._logger);
			for (let e of t) if (!this._messageBuffer || this._messageBuffer._shouldProcessMessage(e)) switch (e.type) {
				case P.Invocation:
					this._invokeClientMethod(e).catch((e) => {
						this._logger.log(j.Error, `Invoke client method threw error: ${wi(e)}`);
					});
					break;
				case P.StreamItem:
				case P.Completion: {
					let t = this._callbacks[e.invocationId];
					if (t) {
						e.type === P.Completion && delete this._callbacks[e.invocationId];
						try {
							t(e);
						} catch (e) {
							this._logger.log(j.Error, `Stream callback threw error: ${wi(e)}`);
						}
					}
					break;
				}
				case P.Ping: break;
				case P.Close: {
					this._logger.log(j.Information, "Close message received from server.");
					let t = e.error ? /* @__PURE__ */ Error("Server returned an error on close: " + e.error) : void 0;
					e.allowReconnect === !0 ? this.connection.stop(t) : this._stopPromise = this._stopInternal(t);
					break;
				}
				case P.Ack:
					this._messageBuffer && this._messageBuffer._ack(e);
					break;
				case P.Sequence:
					this._messageBuffer && this._messageBuffer._resetSequence(e);
					break;
				default: this._logger.log(j.Warning, `Invalid message type: ${e.type}.`);
			}
		}
		this._resetTimeoutPeriod();
	}
	_processHandshakeResponse(e) {
		let t, n;
		try {
			[n, t] = this._handshakeProtocol.parseHandshakeResponse(e);
		} catch (e) {
			let t = "Error parsing handshake response: " + e;
			this._logger.log(j.Error, t);
			let n = Error(t);
			throw this._handshakeRejecter(n), n;
		}
		if (t.error) {
			let e = "Server returned handshake error: " + t.error;
			this._logger.log(j.Error, e);
			let n = Error(e);
			throw this._handshakeRejecter(n), n;
		}
		return this._logger.log(j.Debug, "Server handshake complete."), this._handshakeResolver(), n;
	}
	_resetKeepAliveInterval() {
		this.connection.features.inherentKeepAlive || (this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds, this._cleanupPingTimer());
	}
	_resetTimeoutPeriod() {
		if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
			this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
			let e = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
			if (e < 0) {
				this._connectionState === F.Connected && this._trySendPingMessage();
				return;
			}
			this._pingServerHandle === void 0 && (e < 0 && (e = 0), this._pingServerHandle = setTimeout(async () => {
				this._connectionState === F.Connected && await this._trySendPingMessage();
			}, e));
		}
	}
	serverTimeout() {
		this.connection.stop(/* @__PURE__ */ Error("Server timeout elapsed without receiving a message from the server."));
	}
	async _invokeClientMethod(e) {
		let t = e.target.toLowerCase(), n = this._methods[t];
		if (!n) {
			this._logger.log(j.Warning, `No client method with the name '${t}' found.`), e.invocationId && (this._logger.log(j.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), await this._sendWithProtocol(this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)));
			return;
		}
		let r = n.slice(), i = !!e.invocationId, a, o, s;
		for (let n of r) try {
			let r = a;
			a = await n.apply(this, e.arguments), i && a && r && (this._logger.log(j.Error, `Multiple results provided for '${t}'. Sending error to server.`), s = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), o = void 0;
		} catch (e) {
			o = e, this._logger.log(j.Error, `A callback for the method '${t}' threw error '${e}'.`);
		}
		s ? await this._sendWithProtocol(s) : i ? (o ? s = this._createCompletionMessage(e.invocationId, `${o}`, null) : a === void 0 ? (this._logger.log(j.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), s = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)) : s = this._createCompletionMessage(e.invocationId, null, a), await this._sendWithProtocol(s)) : a && this._logger.log(j.Error, `Result given for '${t}' method but server is not expecting a result.`);
	}
	_connectionClosed(e) {
		this._logger.log(j.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new A("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || /* @__PURE__ */ Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === F.Disconnecting ? this._completeClose(e) : this._connectionState === F.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === F.Connected && this._completeClose(e);
	}
	_completeClose(e) {
		if (this._connectionStarted) {
			this._connectionState = F.Disconnected, this._connectionStarted = !1, this._messageBuffer &&= (this._messageBuffer._dispose(e ?? /* @__PURE__ */ Error("Connection closed.")), void 0), N.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
			try {
				this._closedCallbacks.forEach((t) => t.apply(this, [e]));
			} catch (t) {
				this._logger.log(j.Error, `An onclose callback called with error '${e}' threw error '${t}'.`);
			}
		}
	}
	async _reconnect(e) {
		let t = Date.now(), n = 0, r = e === void 0 ? /* @__PURE__ */ Error("Attempting to reconnect due to a unknown error.") : e, i = this._getNextRetryDelay(n, 0, r);
		if (i === null) this._logger.log(j.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
		else {
			if (this._connectionState = F.Reconnecting, e ? this._logger.log(j.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(j.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
				try {
					this._reconnectingCallbacks.forEach((t) => t.apply(this, [e]));
				} catch (t) {
					this._logger.log(j.Error, `An onreconnecting callback called with error '${e}' threw error '${t}'.`);
				}
				if (this._connectionState !== F.Reconnecting) {
					this._logger.log(j.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
					return;
				}
			}
			for (; i !== null;) {
				if (this._logger.log(j.Information, `Reconnect attempt number ${n + 1} will start in ${i} ms.`), await new Promise((e) => {
					this._reconnectDelayHandle = setTimeout(e, i);
				}), this._reconnectDelayHandle = void 0, this._connectionState !== F.Reconnecting) {
					this._logger.log(j.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
					return;
				}
				try {
					if (await this._startInternal(), this._connectionState = F.Connected, this._logger.log(j.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0) try {
						this._reconnectedCallbacks.forEach((e) => e.apply(this, [this.connection.connectionId]));
					} catch (e) {
						this._logger.log(j.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
					}
					return;
				} catch (e) {
					if (this._logger.log(j.Information, `Reconnect attempt failed because of error '${e}'.`), this._connectionState !== F.Reconnecting) {
						this._logger.log(j.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === F.Disconnecting && this._completeClose();
						return;
					}
					n++, r = e instanceof Error ? e : Error(e.toString()), i = this._getNextRetryDelay(n, Date.now() - t, r);
				}
			}
			this._logger.log(j.Information, `Reconnect retries have been exhausted after ${Date.now() - t} ms and ${n} failed attempts. Connection disconnecting.`), this._completeClose();
		}
	}
	_getNextRetryDelay(e, t, n) {
		try {
			return this._reconnectPolicy.nextRetryDelayInMilliseconds({
				elapsedMilliseconds: t,
				previousRetryCount: e,
				retryReason: n
			});
		} catch (n) {
			return this._logger.log(j.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${n}'.`), null;
		}
	}
	_cancelCallbacksWithError(e) {
		let t = this._callbacks;
		this._callbacks = {}, Object.keys(t).forEach((n) => {
			let r = t[n];
			try {
				r(null, e);
			} catch (t) {
				this._logger.log(j.Error, `Stream 'error' callback called with '${e}' threw error: ${wi(t)}`);
			}
		});
	}
	_cleanupPingTimer() {
		this._pingServerHandle &&= (clearTimeout(this._pingServerHandle), void 0);
	}
	_cleanupTimeout() {
		this._timeoutHandle && clearTimeout(this._timeoutHandle);
	}
	_createInvocation(e, t, n, r) {
		if (n) return r.length === 0 ? {
			target: e,
			arguments: t,
			type: P.Invocation
		} : {
			target: e,
			arguments: t,
			streamIds: r,
			type: P.Invocation
		};
		{
			let n = this._invocationId;
			return this._invocationId++, r.length === 0 ? {
				target: e,
				arguments: t,
				invocationId: n.toString(),
				type: P.Invocation
			} : {
				target: e,
				arguments: t,
				invocationId: n.toString(),
				streamIds: r,
				type: P.Invocation
			};
		}
	}
	_launchStreams(e, t) {
		if (e.length !== 0) {
			t ||= Promise.resolve();
			for (let n in e) e[n].subscribe({
				complete: () => {
					t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(n)));
				},
				error: (e) => {
					let r;
					r = e instanceof Error ? e.message : e && e.toString ? e.toString() : "Unknown error", t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(n, r)));
				},
				next: (e) => {
					t = t.then(() => this._sendWithProtocol(this._createStreamItemMessage(n, e)));
				}
			});
		}
	}
	_replaceStreamingParams(e) {
		let t = [], n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this._isObservable(i)) {
				let a = this._invocationId;
				this._invocationId++, t[a] = i, n.push(a.toString()), e.splice(r, 1);
			}
		}
		return [t, n];
	}
	_isObservable(e) {
		return e && e.subscribe && typeof e.subscribe == "function";
	}
	_createStreamInvocation(e, t, n) {
		let r = this._invocationId;
		return this._invocationId++, n.length === 0 ? {
			target: e,
			arguments: t,
			invocationId: r.toString(),
			type: P.StreamInvocation
		} : {
			target: e,
			arguments: t,
			invocationId: r.toString(),
			streamIds: n,
			type: P.StreamInvocation
		};
	}
	_createCancelInvocation(e) {
		return {
			invocationId: e,
			type: P.CancelInvocation
		};
	}
	_createStreamItemMessage(e, t) {
		return {
			invocationId: e,
			item: t,
			type: P.StreamItem
		};
	}
	_createCompletionMessage(e, t, n) {
		return t ? {
			error: t,
			invocationId: e,
			type: P.Completion
		} : {
			invocationId: e,
			result: n,
			type: P.Completion
		};
	}
	_createCloseMessage() {
		return { type: P.Close };
	}
	async _trySendPingMessage() {
		try {
			await this._sendMessage(this._cachedPingMessage);
		} catch {
			this._cleanupPingTimer();
		}
	}
}, zi = [
	0,
	2e3,
	1e4,
	3e4,
	null
], Bi = class {
	constructor(e) {
		this._retryDelays = e === void 0 ? zi : [...e, null];
	}
	nextRetryDelayInMilliseconds(e) {
		return this._retryDelays[e.previousRetryCount];
	}
}, Vi = class {};
Vi.Authorization = "Authorization", Vi.Cookie = "Cookie";
// node_modules/@microsoft/signalr/dist/esm/AccessTokenHttpClient.js
var Hi = class extends li {
	constructor(e, t) {
		super(), this._innerClient = e, this._accessTokenFactory = t;
	}
	async send(e) {
		let t = !0;
		this._accessTokenFactory && (!this._accessToken || e.url && e.url.indexOf("/negotiate?") > 0) && (t = !1, this._accessToken = await this._accessTokenFactory()), this._setAuthorizationHeader(e);
		let n = await this._innerClient.send(e);
		return t && n.statusCode === 401 && this._accessTokenFactory ? (this._accessToken = await this._accessTokenFactory(), this._setAuthorizationHeader(e), await this._innerClient.send(e)) : n;
	}
	_setAuthorizationHeader(e) {
		e.headers ||= {}, this._accessToken ? e.headers[Vi.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[Vi.Authorization] && delete e.headers[Vi.Authorization];
	}
	getCookieString(e) {
		return this._innerClient.getCookieString(e);
	}
}, I;
(function(e) {
	e[e.None = 0] = "None", e[e.WebSockets = 1] = "WebSockets", e[e.ServerSentEvents = 2] = "ServerSentEvents", e[e.LongPolling = 4] = "LongPolling";
})(I ||= {});
var L;
(function(e) {
	e[e.Text = 1] = "Text", e[e.Binary = 2] = "Binary";
})(L ||= {});
// node_modules/@microsoft/signalr/dist/esm/AbortController.js
var Ui = class {
	constructor() {
		this._isAborted = !1, this.onabort = null;
	}
	abort() {
		this._isAborted || (this._isAborted = !0, this.onabort && this.onabort());
	}
	get signal() {
		return this;
	}
	get aborted() {
		return this._isAborted;
	}
}, Wi = class {
	get pollAborted() {
		return this._pollAbort.aborted;
	}
	constructor(e, t, n) {
		this._httpClient = e, this._logger = t, this._pollAbort = new Ui(), this._options = n, this._running = !1, this.onreceive = null, this.onclose = null;
	}
	async connect(e, t) {
		if (M.isRequired(e, "url"), M.isRequired(t, "transferFormat"), M.isIn(t, L, "transferFormat"), this._url = e, this._logger.log(j.Trace, "(LongPolling transport) Connecting."), t === L.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string") throw Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
		let [n, r] = yi(), i = {
			[n]: r,
			...this._options.headers
		}, a = {
			abortSignal: this._pollAbort.signal,
			headers: i,
			timeout: 1e5,
			withCredentials: this._options.withCredentials
		};
		t === L.Binary && (a.responseType = "arraybuffer");
		let o = `${e}&_=${Date.now()}`;
		this._logger.log(j.Trace, `(LongPolling transport) polling: ${o}.`);
		let s = await this._httpClient.get(o, a);
		s.statusCode === 200 ? this._running = !0 : (this._logger.log(j.Error, `(LongPolling transport) Unexpected response code: ${s.statusCode}.`), this._closeError = new ti(s.statusText || "", s.statusCode), this._running = !1), this._receiving = this._poll(this._url, a);
	}
	async _poll(e, t) {
		try {
			for (; this._running;) try {
				let n = `${e}&_=${Date.now()}`;
				this._logger.log(j.Trace, `(LongPolling transport) polling: ${n}.`);
				let r = await this._httpClient.get(n, t);
				r.statusCode === 204 ? (this._logger.log(j.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : r.statusCode === 200 ? r.content ? (this._logger.log(j.Trace, `(LongPolling transport) data received. ${fi(r.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(r.content)) : this._logger.log(j.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._logger.log(j.Error, `(LongPolling transport) Unexpected response code: ${r.statusCode}.`), this._closeError = new ti(r.statusText || "", r.statusCode), this._running = !1);
			} catch (e) {
				this._running ? e instanceof ni ? this._logger.log(j.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = e, this._running = !1) : this._logger.log(j.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
			}
		} finally {
			this._logger.log(j.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
		}
	}
	async send(e) {
		return this._running ? hi(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(/* @__PURE__ */ Error("Cannot send until the transport is connected"));
	}
	async stop() {
		this._logger.log(j.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
		try {
			await this._receiving, this._logger.log(j.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
			let e = {}, [t, n] = yi();
			e[t] = n;
			let r = {
				headers: {
					...e,
					...this._options.headers
				},
				timeout: this._options.timeout,
				withCredentials: this._options.withCredentials
			}, i;
			try {
				await this._httpClient.delete(this._url, r);
			} catch (e) {
				i = e;
			}
			i ? i instanceof ti && (i.statusCode === 404 ? this._logger.log(j.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(j.Trace, `(LongPolling transport) Error sending a DELETE request: ${i}`)) : this._logger.log(j.Trace, "(LongPolling transport) DELETE request accepted.");
		} finally {
			this._logger.log(j.Trace, "(LongPolling transport) Stop finished."), this._raiseOnClose();
		}
	}
	_raiseOnClose() {
		if (this.onclose) {
			let e = "(LongPolling transport) Firing onclose event.";
			this._closeError && (e += " Error: " + this._closeError), this._logger.log(j.Trace, e), this.onclose(this._closeError);
		}
	}
}, Gi = class {
	constructor(e, t, n, r) {
		this._httpClient = e, this._accessToken = t, this._logger = n, this._options = r, this.onreceive = null, this.onclose = null;
	}
	async connect(e, t) {
		return M.isRequired(e, "url"), M.isRequired(t, "transferFormat"), M.isIn(t, L, "transferFormat"), this._logger.log(j.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((n, r) => {
			let i = !1;
			if (t !== L.Text) {
				r(/* @__PURE__ */ Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
				return;
			}
			let a;
			if (N.isBrowser || N.isWebWorker) a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
			else {
				let t = this._httpClient.getCookieString(e), n = {};
				n.Cookie = t;
				let [r, i] = yi();
				n[r] = i, a = new this._options.EventSource(e, {
					withCredentials: this._options.withCredentials,
					headers: {
						...n,
						...this._options.headers
					}
				});
			}
			try {
				a.onmessage = (e) => {
					if (this.onreceive) try {
						this._logger.log(j.Trace, `(SSE transport) data received. ${fi(e.data, this._options.logMessageContent)}.`), this.onreceive(e.data);
					} catch (e) {
						this._close(e);
						return;
					}
				}, a.onerror = (e) => {
					i ? this._close() : r(/* @__PURE__ */ Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
				}, a.onopen = () => {
					this._logger.log(j.Information, `SSE connected to ${this._url}`), this._eventSource = a, i = !0, n();
				};
			} catch (e) {
				r(e);
				return;
			}
		});
	}
	async send(e) {
		return this._eventSource ? hi(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(/* @__PURE__ */ Error("Cannot send until the transport is connected"));
	}
	stop() {
		return this._close(), Promise.resolve();
	}
	_close(e) {
		this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
	}
}, Ki = class {
	constructor(e, t, n, r, i, a) {
		this._logger = n, this._accessTokenFactory = t, this._logMessageContent = r, this._webSocketConstructor = i, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = a;
	}
	async connect(e, t) {
		M.isRequired(e, "url"), M.isRequired(t, "transferFormat"), M.isIn(t, L, "transferFormat"), this._logger.log(j.Trace, "(WebSockets transport) Connecting.");
		let n;
		return this._accessTokenFactory && (n = await this._accessTokenFactory()), new Promise((r, i) => {
			e = e.replace(/^http/, "ws");
			let a, o = this._httpClient.getCookieString(e), s = !1;
			if (N.isNode || N.isReactNative) {
				let t = {}, [r, i] = yi();
				t[r] = i, n && (t[Vi.Authorization] = `Bearer ${n}`), o && (t[Vi.Cookie] = o), a = new this._webSocketConstructor(e, void 0, { headers: {
					...t,
					...this._headers
				} });
			} else n && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(n)}`);
			a ||= new this._webSocketConstructor(e), t === L.Binary && (a.binaryType = "arraybuffer"), a.onopen = (t) => {
				this._logger.log(j.Information, `WebSocket connected to ${e}.`), this._webSocket = a, s = !0, r();
			}, a.onerror = (e) => {
				let t = null;
				t = typeof ErrorEvent < "u" && e instanceof ErrorEvent ? e.error : "There was an error with the transport", this._logger.log(j.Information, `(WebSockets transport) ${t}.`);
			}, a.onmessage = (e) => {
				if (this._logger.log(j.Trace, `(WebSockets transport) data received. ${fi(e.data, this._logMessageContent)}.`), this.onreceive) try {
					this.onreceive(e.data);
				} catch (e) {
					this._close(e);
					return;
				}
			}, a.onclose = (e) => {
				if (s) this._close(e);
				else {
					let t = null;
					t = typeof ErrorEvent < "u" && e instanceof ErrorEvent ? e.error : "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", i(Error(t));
				}
			};
		});
	}
	send(e) {
		return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(j.Trace, `(WebSockets transport) sending data. ${fi(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
	}
	stop() {
		return this._webSocket && this._close(void 0), Promise.resolve();
	}
	_close(e) {
		this._webSocket &&= (this._webSocket.onclose = () => {}, this._webSocket.onmessage = () => {}, this._webSocket.onerror = () => {}, this._webSocket.close(), void 0), this._logger.log(j.Trace, "(WebSockets transport) socket closed."), this.onclose && (this._isCloseEvent(e) && (e.wasClean === !1 || e.code !== 1e3) ? this.onclose(/* @__PURE__ */ Error(`WebSocket closed with status code: ${e.code} (${e.reason || "no reason given"}).`)) : e instanceof Error ? this.onclose(e) : this.onclose());
	}
	_isCloseEvent(e) {
		return e && typeof e.wasClean == "boolean" && typeof e.code == "number";
	}
}, qi = 100, Ji = class {
	constructor(e, t = {}) {
		if (this._stopPromiseResolver = () => {}, this.features = {}, this._negotiateVersion = 1, M.isRequired(e, "url"), this._logger = gi(t.logger), this.baseUrl = this._resolveUrl(e), t ||= {}, t.logMessageContent = t.logMessageContent !== void 0 && t.logMessageContent, typeof t.withCredentials == "boolean" || t.withCredentials === void 0) t.withCredentials = t.withCredentials === void 0 || t.withCredentials;
		else throw Error("withCredentials option was not a 'boolean' or 'undefined' value");
		t.timeout = t.timeout === void 0 ? 1e5 : t.timeout;
		let r = null, i = null;
		if (N.isNode && n !== void 0) {
			let e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : n;
			r = e("ws"), i = e("eventsource");
		}
		!N.isNode && typeof WebSocket < "u" && !t.WebSocket ? t.WebSocket = WebSocket : N.isNode && !t.WebSocket && r && (t.WebSocket = r), !N.isNode && typeof EventSource < "u" && !t.EventSource ? t.EventSource = EventSource : N.isNode && !t.EventSource && i !== void 0 && (t.EventSource = i), this._httpClient = new Hi(t.httpClient || new ki(this._logger), t.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = t, this.onreceive = null, this.onclose = null;
	}
	async start(e) {
		if (e ||= L.Binary, M.isIn(e, L, "transferFormat"), this._logger.log(j.Debug, `Starting connection with transfer format '${L[e]}'.`), this._connectionState !== "Disconnected") return Promise.reject(/* @__PURE__ */ Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
		if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
			let e = "Failed to start the HttpConnection before stop() was called.";
			return this._logger.log(j.Error, e), await this._stopPromise, Promise.reject(new A(e));
		}
		if (this._connectionState !== "Connected") {
			let e = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
			return this._logger.log(j.Error, e), Promise.reject(new A(e));
		}
		this._connectionStarted = !0;
	}
	send(e) {
		return this._connectionState === "Connected" ? (this._sendQueue ||= new Xi(this.transport), this._sendQueue.send(e)) : Promise.reject(/* @__PURE__ */ Error("Cannot send data if the connection is not in the 'Connected' State."));
	}
	async stop(e) {
		if (this._connectionState === "Disconnected") return this._logger.log(j.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`), Promise.resolve();
		if (this._connectionState === "Disconnecting") return this._logger.log(j.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
		this._connectionState = "Disconnecting", this._stopPromise = new Promise((e) => {
			this._stopPromiseResolver = e;
		}), await this._stopInternal(e), await this._stopPromise;
	}
	async _stopInternal(e) {
		this._stopError = e;
		try {
			await this._startInternalPromise;
		} catch {}
		if (this.transport) {
			try {
				await this.transport.stop();
			} catch (e) {
				this._logger.log(j.Error, `HttpConnection.transport.stop() threw error '${e}'.`), this._stopConnection();
			}
			this.transport = void 0;
		} else this._logger.log(j.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
	}
	async _startInternal(e) {
		let t = this.baseUrl;
		this._accessTokenFactory = this._options.accessTokenFactory, this._httpClient._accessTokenFactory = this._accessTokenFactory;
		try {
			if (this._options.skipNegotiation) {
				if (this._options.transport === I.WebSockets) this.transport = this._constructTransport(I.WebSockets), await this._startTransport(t, e);
				else throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");
			} else {
				let n = null, r = 0;
				do {
					if (n = await this._getNegotiationResponse(t), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected") throw new A("The connection was stopped during negotiation.");
					if (n.error) throw Error(n.error);
					if (n.ProtocolVersion) throw Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
					if (n.url && (t = n.url), n.accessToken) {
						let e = n.accessToken;
						this._accessTokenFactory = () => e, this._httpClient._accessToken = e, this._httpClient._accessTokenFactory = void 0;
					}
					r++;
				} while (n.url && r < qi);
				if (r === qi && n.url) throw Error("Negotiate redirection limit exceeded.");
				await this._createTransport(t, this._options.transport, n, e);
			}
			this.transport instanceof Wi && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(j.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
		} catch (e) {
			return this._logger.log(j.Error, "Failed to start the connection: " + e), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(e);
		}
	}
	async _getNegotiationResponse(e) {
		let t = {}, [n, r] = yi();
		t[n] = r;
		let i = this._resolveNegotiateUrl(e);
		this._logger.log(j.Debug, `Sending negotiation request: ${i}.`);
		try {
			let e = await this._httpClient.post(i, {
				content: "",
				headers: {
					...t,
					...this._options.headers
				},
				timeout: this._options.timeout,
				withCredentials: this._options.withCredentials
			});
			if (e.statusCode !== 200) return Promise.reject(/* @__PURE__ */ Error(`Unexpected status code returned from negotiate '${e.statusCode}'`));
			let n = JSON.parse(e.content);
			return (!n.negotiateVersion || n.negotiateVersion < 1) && (n.connectionToken = n.connectionId), n.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new oi("Client didn't negotiate Stateful Reconnect but the server did.")) : n;
		} catch (e) {
			let t = "Failed to complete negotiation with the server: " + e;
			return e instanceof ti && e.statusCode === 404 && (t += " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(j.Error, t), Promise.reject(new oi(t));
		}
	}
	_createConnectUrl(e, t) {
		return t ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${t}` : e;
	}
	async _createTransport(e, t, n, r) {
		let i = this._createConnectUrl(e, n.connectionToken);
		if (this._isITransport(t)) {
			this._logger.log(j.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, await this._startTransport(i, r), this.connectionId = n.connectionId;
			return;
		}
		let a = [], o = n.availableTransports || [], s = n;
		for (let n of o) {
			let o = this._resolveTransportOrError(n, t, r, s?.useStatefulReconnect === !0);
			if (o instanceof Error) a.push(`${n.transport} failed:`), a.push(o);
			else if (this._isITransport(o)) {
				if (this.transport = o, !s) {
					try {
						s = await this._getNegotiationResponse(e);
					} catch (e) {
						return Promise.reject(e);
					}
					i = this._createConnectUrl(e, s.connectionToken);
				}
				try {
					await this._startTransport(i, r), this.connectionId = s.connectionId;
					return;
				} catch (e) {
					if (this._logger.log(j.Error, `Failed to start the transport '${n.transport}': ${e}`), s = void 0, a.push(new ai(`${n.transport} failed: ${e}`, I[n.transport])), this._connectionState !== "Connecting") {
						let e = "Failed to select transport before stop() was called.";
						return this._logger.log(j.Debug, e), Promise.reject(new A(e));
					}
				}
			}
		}
		return a.length > 0 ? Promise.reject(new si(`Unable to connect to the server with any of the available transports. ${a.join(" ")}`, a)) : Promise.reject(/* @__PURE__ */ Error("None of the transports supported by the client are supported by the server."));
	}
	_constructTransport(e) {
		switch (e) {
			case I.WebSockets:
				if (!this._options.WebSocket) throw Error("'WebSocket' is not supported in your environment.");
				return new Ki(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
			case I.ServerSentEvents:
				if (!this._options.EventSource) throw Error("'EventSource' is not supported in your environment.");
				return new Gi(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
			case I.LongPolling: return new Wi(this._httpClient, this._logger, this._options);
			default: throw Error(`Unknown transport: ${e}.`);
		}
	}
	_startTransport(e, t) {
		return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (n) => {
			let r = !1;
			if (this.features.reconnect) try {
				this.features.disconnected(), await this.transport.connect(e, t), await this.features.resend();
			} catch {
				r = !0;
			}
			else {
				this._stopConnection(n);
				return;
			}
			r && this._stopConnection(n);
		} : this.transport.onclose = (e) => this._stopConnection(e), this.transport.connect(e, t);
	}
	_resolveTransportOrError(e, t, n, r) {
		let i = I[e.transport];
		if (i == null) return this._logger.log(j.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), /* @__PURE__ */ Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
		if (Yi(t, i)) {
			if (e.transferFormats.map((e) => L[e]).indexOf(n) >= 0) {
				if (i === I.WebSockets && !this._options.WebSocket || i === I.ServerSentEvents && !this._options.EventSource) return this._logger.log(j.Debug, `Skipping transport '${I[i]}' because it is not supported in your environment.'`), new ri(`'${I[i]}' is not supported in your environment.`, i);
				this._logger.log(j.Debug, `Selecting transport '${I[i]}'.`);
				try {
					return this.features.reconnect = i === I.WebSockets ? r : void 0, this._constructTransport(i);
				} catch (e) {
					return e;
				}
			}
			return this._logger.log(j.Debug, `Skipping transport '${I[i]}' because it does not support the requested transfer format '${L[n]}'.`), /* @__PURE__ */ Error(`'${I[i]}' does not support ${L[n]}.`);
		}
		return this._logger.log(j.Debug, `Skipping transport '${I[i]}' because it was disabled by the client.`), new ii(`'${I[i]}' is disabled by the client.`, i);
	}
	_isITransport(e) {
		return e && typeof e == "object" && "connect" in e;
	}
	_stopConnection(e) {
		if (this._logger.log(j.Debug, `HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`), this.transport = void 0, e = this._stopError || e, this._stopError = void 0, this._connectionState === "Disconnected") this._logger.log(j.Debug, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);
		else {
			if (this._connectionState === "Connecting") throw this._logger.log(j.Warning, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`), Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);
			if (this._connectionState === "Disconnecting" && this._stopPromiseResolver(), e ? this._logger.log(j.Error, `Connection disconnected with error '${e}'.`) : this._logger.log(j.Information, "Connection disconnected."), this._sendQueue &&= (this._sendQueue.stop().catch((e) => {
				this._logger.log(j.Error, `TransportSendQueue.stop() threw error '${e}'.`);
			}), void 0), this.connectionId = void 0, this._connectionState = "Disconnected", this._connectionStarted) {
				this._connectionStarted = !1;
				try {
					this.onclose && this.onclose(e);
				} catch (t) {
					this._logger.log(j.Error, `HttpConnection.onclose(${e}) threw error '${t}'.`);
				}
			}
		}
	}
	_resolveUrl(e) {
		if (e.lastIndexOf("https://", 0) === 0 || e.lastIndexOf("http://", 0) === 0) return e;
		if (!N.isBrowser) throw Error(`Cannot resolve '${e}'.`);
		let t = window.document.createElement("a");
		return t.href = e, this._logger.log(j.Information, `Normalizing '${e}' to '${t.href}'.`), t.href;
	}
	_resolveNegotiateUrl(e) {
		let t = new URL(e);
		t.pathname.endsWith("/") ? t.pathname += "negotiate" : t.pathname += "/negotiate";
		let n = new URLSearchParams(t.searchParams);
		return n.has("negotiateVersion") || n.append("negotiateVersion", this._negotiateVersion.toString()), n.has("useStatefulReconnect") ? n.get("useStatefulReconnect") === "true" && (this._options._useStatefulReconnect = !0) : this._options._useStatefulReconnect === !0 && n.append("useStatefulReconnect", "true"), t.search = n.toString(), t.toString();
	}
};
function Yi(e, t) {
	return !e || (t & e) !== 0;
}
var Xi = class e {
	constructor(e) {
		this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new Zi(), this._transportResult = new Zi(), this._sendLoopPromise = this._sendLoop();
	}
	send(e) {
		return this._bufferData(e), this._transportResult ||= new Zi(), this._transportResult.promise;
	}
	stop() {
		return this._executing = !1, this._sendBufferedData.resolve(), this._sendLoopPromise;
	}
	_bufferData(e) {
		if (this._buffer.length && typeof this._buffer[0] != typeof e) throw Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);
		this._buffer.push(e), this._sendBufferedData.resolve();
	}
	async _sendLoop() {
		for (;;) {
			if (await this._sendBufferedData.promise, !this._executing) {
				this._transportResult && this._transportResult.reject("Connection stopped.");
				break;
			}
			this._sendBufferedData = new Zi();
			let t = this._transportResult;
			this._transportResult = void 0;
			let n = typeof this._buffer[0] == "string" ? this._buffer.join("") : e._concatBuffers(this._buffer);
			this._buffer.length = 0;
			try {
				await this._transport.send(n), t.resolve();
			} catch (e) {
				t.reject(e);
			}
		}
	}
	static _concatBuffers(e) {
		let t = e.map((e) => e.byteLength).reduce((e, t) => e + t), n = new Uint8Array(t), r = 0;
		for (let t of e) n.set(new Uint8Array(t), r), r += t.byteLength;
		return n.buffer;
	}
}, Zi = class {
	constructor() {
		this.promise = new Promise((e, t) => [this._resolver, this._rejecter] = [e, t]);
	}
	resolve() {
		this._resolver();
	}
	reject(e) {
		this._rejecter(e);
	}
}, Qi = "json", $i = class {
	constructor() {
		this.name = Qi, this.version = 2, this.transferFormat = L.Text;
	}
	parseMessages(e, t) {
		if (typeof e != "string") throw Error("Invalid input for JSON hub protocol. Expected a string.");
		if (!e) return [];
		t === null && (t = ui.instance);
		let n = Ai.parse(e), r = [];
		for (let e of n) {
			let n = JSON.parse(e);
			if (typeof n.type != "number") throw Error("Invalid payload.");
			switch (n.type) {
				case P.Invocation:
					this._isInvocationMessage(n);
					break;
				case P.StreamItem:
					this._isStreamItemMessage(n);
					break;
				case P.Completion:
					this._isCompletionMessage(n);
					break;
				case P.Ping: break;
				case P.Close: break;
				case P.Ack:
					this._isAckMessage(n);
					break;
				case P.Sequence:
					this._isSequenceMessage(n);
					break;
				default:
					t.log(j.Information, "Unknown message type '" + n.type + "' ignored.");
					continue;
			}
			r.push(n);
		}
		return r;
	}
	writeMessage(e) {
		return Ai.write(JSON.stringify(e));
	}
	_isInvocationMessage(e) {
		this._assertNotEmptyString(e.target, "Invalid payload for Invocation message."), e.invocationId !== void 0 && this._assertNotEmptyString(e.invocationId, "Invalid payload for Invocation message.");
	}
	_isStreamItemMessage(e) {
		if (this._assertNotEmptyString(e.invocationId, "Invalid payload for StreamItem message."), e.item === void 0) throw Error("Invalid payload for StreamItem message.");
	}
	_isCompletionMessage(e) {
		if (e.result && e.error) throw Error("Invalid payload for Completion message.");
		!e.result && e.error && this._assertNotEmptyString(e.error, "Invalid payload for Completion message."), this._assertNotEmptyString(e.invocationId, "Invalid payload for Completion message.");
	}
	_isAckMessage(e) {
		if (typeof e.sequenceId != "number") throw Error("Invalid SequenceId for Ack message.");
	}
	_isSequenceMessage(e) {
		if (typeof e.sequenceId != "number") throw Error("Invalid SequenceId for Sequence message.");
	}
	_assertNotEmptyString(e, t) {
		if (typeof e != "string" || e === "") throw Error(t);
	}
}, ea = {
	trace: j.Trace,
	debug: j.Debug,
	info: j.Information,
	information: j.Information,
	warn: j.Warning,
	warning: j.Warning,
	error: j.Error,
	critical: j.Critical,
	none: j.None
};
function ta(e) {
	let t = ea[e.toLowerCase()];
	if (t !== void 0) return t;
	throw Error(`Unknown log level: ${e}`);
}
var na = class {
	configureLogging(e) {
		if (M.isRequired(e, "logging"), ra(e)) this.logger = e;
		else if (typeof e == "string") {
			let t = ta(e);
			this.logger = new vi(t);
		} else this.logger = new vi(e);
		return this;
	}
	withUrl(e, t) {
		return M.isRequired(e, "url"), M.isNotEmpty(e, "url"), this.url = e, this.httpConnectionOptions = typeof t == "object" ? {
			...this.httpConnectionOptions,
			...t
		} : {
			...this.httpConnectionOptions,
			transport: t
		}, this;
	}
	withHubProtocol(e) {
		return M.isRequired(e, "protocol"), this.protocol = e, this;
	}
	withAutomaticReconnect(e) {
		if (this.reconnectPolicy) throw Error("A reconnectPolicy has already been set.");
		return this.reconnectPolicy = e ? Array.isArray(e) ? new Bi(e) : e : new Bi(), this;
	}
	withServerTimeout(e) {
		return M.isRequired(e, "milliseconds"), this._serverTimeoutInMilliseconds = e, this;
	}
	withKeepAliveInterval(e) {
		return M.isRequired(e, "milliseconds"), this._keepAliveIntervalInMilliseconds = e, this;
	}
	withStatefulReconnect(e) {
		return this.httpConnectionOptions === void 0 && (this.httpConnectionOptions = {}), this.httpConnectionOptions._useStatefulReconnect = !0, this._statefulReconnectBufferSize = e?.bufferSize, this;
	}
	build() {
		let e = this.httpConnectionOptions || {};
		if (e.logger === void 0 && (e.logger = this.logger), !this.url) throw Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
		let t = new Ji(this.url, e);
		return Ri.create(t, this.logger || ui.instance, this.protocol || new $i(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
	}
};
function ra(e) {
	return e.log !== void 0;
}
// src/hub.ts
var ia = 5e3, aa = 3e4;
function oa(e, t, n) {
	let r = new na().withUrl(e, { accessTokenFactory: t }).withAutomaticReconnect({ nextRetryDelayInMilliseconds: (e) => Math.min(aa, 1e3 * 2 ** e.previousRetryCount) }).configureLogging(j.Warning).build(), i = Mt(!1), a = /* @__PURE__ */ new Set(), o = null, s = !1, c = !1, l;
	async function u() {
		await r.invoke("Watch", n), o && await r.invoke("Open", o), i.value = !0, c && a.forEach((e) => e()), c = !0;
	}
	async function d() {
		if (!s) try {
			await r.start(), await u();
		} catch {
			r.state === F.Connected ? await r.stop().catch(() => void 0) : s || (l = setTimeout(d, ia));
		}
	}
	r.onreconnecting(() => i.value = !1), r.onreconnected(() => u().catch(() => r.stop())), r.onclose(() => {
		i.value = !1, s || (l = setTimeout(d, ia));
	}), d();
	let f = (e, ...t) => {
		r.state === F.Connected && r.invoke(e, ...t).catch(() => void 0);
	};
	return {
		connected: i,
		on(e, t) {
			let i = (e) => {
				e.householdId === n && t(e);
			};
			return r.on(e, i), () => r.off(e, i);
		},
		onReconnected(e) {
			return a.add(e), () => void a.delete(e);
		},
		open(e) {
			o = e, f("Open", e);
		},
		typing: (e) => f("Typing", n, e),
		stop() {
			s = !0, clearTimeout(l), r.stop();
		}
	};
}
function sa(e, t, n) {
	bt(e.on(t, n));
}
// node_modules/mdurl/lib/decode.mjs
var ca = {};
function la(e) {
	let t = ca[e];
	if (t) return t;
	t = ca[e] = [];
	for (let e = 0; e < 128; e++) {
		let n = String.fromCharCode(e);
		t.push(n);
	}
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		t[r] = "%" + ("0" + r.toString(16).toUpperCase()).slice(-2);
	}
	return t;
}
function ua(e, t) {
	typeof t != "string" && (t = ua.defaultChars);
	let n = la(t);
	return e.replace(/(%[a-f0-9]{2})+/gi, function(e) {
		let t = "";
		for (let r = 0, i = e.length; r < i; r += 3) {
			let a = parseInt(e.slice(r + 1, r + 3), 16);
			if (a < 128) t += n[a];
			else {
				if ((a & 224) == 192 && r + 3 < i) {
					let n = parseInt(e.slice(r + 4, r + 6), 16);
					if ((n & 192) == 128) {
						let e = a << 6 & 1984 | n & 63;
						t += e < 128 ? "��" : String.fromCharCode(e), r += 3;
						continue;
					}
				}
				if ((a & 240) == 224 && r + 6 < i) {
					let n = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16);
					if ((n & 192) == 128 && (i & 192) == 128) {
						let e = a << 12 & 61440 | n << 6 & 4032 | i & 63;
						t += e < 2048 || e >= 55296 && e <= 57343 ? "���" : String.fromCharCode(e), r += 6;
						continue;
					}
				}
				if ((a & 248) == 240 && r + 9 < i) {
					let n = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16), o = parseInt(e.slice(r + 10, r + 12), 16);
					if ((n & 192) == 128 && (i & 192) == 128 && (o & 192) == 128) {
						let e = a << 18 & 1835008 | n << 12 & 258048 | i << 6 & 4032 | o & 63;
						e < 65536 || e > 1114111 ? t += "����" : (e -= 65536, t += String.fromCharCode(55296 + (e >> 10), 56320 + (e & 1023))), r += 9;
						continue;
					}
				}
				t += "�";
			}
		}
		return t;
	});
}
ua.defaultChars = ";/?:@&=+$,#", ua.componentChars = "";
// node_modules/mdurl/lib/encode.mjs
var da = {};
function fa(e) {
	let t = da[e];
	if (t) return t;
	t = da[e] = [];
	for (let e = 0; e < 128; e++) {
		let n = String.fromCharCode(e);
		/^[0-9a-z]$/i.test(n) ? t.push(n) : t.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
	}
	for (let n = 0; n < e.length; n++) t[e.charCodeAt(n)] = e[n];
	return t;
}
function pa(e, t, n) {
	typeof t != "string" && (n = t, t = pa.defaultChars), n === void 0 && (n = !0);
	let r = fa(t), i = "";
	for (let t = 0, a = e.length; t < a; t++) {
		let o = e.charCodeAt(t);
		if (n && o === 37 && t + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(t + 1, t + 3))) i += e.slice(t, t + 3), t += 2;
		else if (o < 128) i += r[o];
		else if (o >= 55296 && o <= 57343) {
			if (o >= 55296 && o <= 56319 && t + 1 < a) {
				let n = e.charCodeAt(t + 1);
				if (n >= 56320 && n <= 57343) {
					i += encodeURIComponent(e[t] + e[t + 1]), t++;
					continue;
				}
			}
			i += "%EF%BF%BD";
		} else i += encodeURIComponent(e[t]);
	}
	return i;
}
pa.defaultChars = ";/?:@&=+$,-_.!~*'()#", pa.componentChars = "-_.!~*'()";
// node_modules/mdurl/lib/format.mjs
function ma(e) {
	let t = "";
	return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
// node_modules/mdurl/lib/parse.mjs
function ha() {
	this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var ga = /^([a-z0-9.+-]+:)/i, _a = /:[0-9]*$/, va = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, ya = [
	"%",
	"/",
	"?",
	";",
	"#",
	"'",
	"{",
	"}",
	"|",
	"\\",
	"^",
	"`",
	"<",
	">",
	"\"",
	"`",
	" ",
	"\r",
	"\n",
	"	"
], ba = [
	"/",
	"?",
	"#"
], xa = 255, Sa = /^[+a-z0-9A-Z_-]{0,63}$/, Ca = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, wa = {
	javascript: !0,
	"javascript:": !0
}, Ta = {
	http: !0,
	https: !0,
	ftp: !0,
	gopher: !0,
	file: !0,
	"http:": !0,
	"https:": !0,
	"ftp:": !0,
	"gopher:": !0,
	"file:": !0
};
function Ea(e, t) {
	if (e && e instanceof ha) return e;
	let n = new ha();
	return n.parse(e, t), n;
}
ha.prototype.parse = function(e, t) {
	let n, r, i, a = e;
	if (a = a.trim(), !t && e.split("#").length === 1) {
		let e = va.exec(a);
		if (e) return this.pathname = e[1], e[2] && (this.search = e[2]), this;
	}
	let o = ga.exec(a);
	if (o && (o = o[0], n = o.toLowerCase(), this.protocol = o, a = a.substr(o.length)), (t || o || a.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = a.substr(0, 2) === "//", i && !(o && wa[o]) && (a = a.substr(2), this.slashes = !0)), !wa[o] && (i || o && !Ta[o])) {
		let e = -1;
		for (let t = 0; t < ba.length; t++) r = a.indexOf(ba[t]), r !== -1 && (e === -1 || r < e) && (e = r);
		let t, n;
		n = e === -1 ? a.lastIndexOf("@") : a.lastIndexOf("@", e), n !== -1 && (t = a.slice(0, n), a = a.slice(n + 1), this.auth = t), e = -1;
		for (let t = 0; t < ya.length; t++) r = a.indexOf(ya[t]), r !== -1 && (e === -1 || r < e) && (e = r);
		e === -1 && (e = a.length), a[e - 1] === ":" && e--;
		let i = a.slice(0, e);
		a = a.slice(e), this.parseHost(i), this.hostname = this.hostname || "";
		let o = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
		if (!o) {
			let e = this.hostname.split(/\./);
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				if (n && !n.match(Sa)) {
					let r = "";
					for (let e = 0, t = n.length; e < t; e++) n.charCodeAt(e) > 127 ? r += "x" : r += n[e];
					if (!r.match(Sa)) {
						let r = e.slice(0, t), i = e.slice(t + 1), o = n.match(Ca);
						o && (r.push(o[1]), i.unshift(o[2])), i.length && (a = i.join(".") + a), this.hostname = r.join(".");
						break;
					}
				}
			}
		}
		this.hostname.length > xa && (this.hostname = ""), o && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
	}
	let s = a.indexOf("#");
	s !== -1 && (this.hash = a.substr(s), a = a.slice(0, s));
	let c = a.indexOf("?");
	return c !== -1 && (this.search = a.substr(c), a = a.slice(0, c)), a && (this.pathname = a), Ta[n] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, ha.prototype.parseHost = function(e) {
	let t = _a.exec(e);
	t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
// node_modules/mdurl/index.mjs
var Da = /* @__PURE__ */ t({
	decode: () => ua,
	encode: () => pa,
	format: () => ma,
	parse: () => Ea
}), Oa = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, ka = /[\0-\x1F\x7F-\x9F]/, Aa = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, ja = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Ma = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, Na = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, Pa = /* @__PURE__ */ t({
	Any: () => Oa,
	Cc: () => ka,
	Cf: () => Aa,
	P: () => ja,
	S: () => Ma,
	Z: () => Na
}), Fa = new Uint16Array("ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻\"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌".split("").map((e) => e.charCodeAt(0))), Ia = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))), La = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]), Ra = String.fromCodePoint ?? function(e) {
	let t = "";
	return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
};
function za(e) {
	return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : La.get(e) ?? e;
}
// node_modules/entities/lib/esm/decode.js
var R;
(function(e) {
	e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(R ||= {});
var Ba = 32, Va;
(function(e) {
	e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Va ||= {});
function Ha(e) {
	return e >= R.ZERO && e <= R.NINE;
}
function Ua(e) {
	return e >= R.UPPER_A && e <= R.UPPER_F || e >= R.LOWER_A && e <= R.LOWER_F;
}
function Wa(e) {
	return e >= R.UPPER_A && e <= R.UPPER_Z || e >= R.LOWER_A && e <= R.LOWER_Z || Ha(e);
}
function Ga(e) {
	return e === R.EQUALS || Wa(e);
}
var z;
(function(e) {
	e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(z ||= {});
var Ka;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Ka ||= {});
var qa = class {
	constructor(e, t, n) {
		this.decodeTree = e, this.emitCodePoint = t, this.errors = n, this.state = z.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Ka.Strict;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = z.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
	}
	write(e, t) {
		switch (this.state) {
			case z.EntityStart: return e.charCodeAt(t) === R.NUM ? (this.state = z.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = z.NamedEntity, this.stateNamedEntity(e, t));
			case z.NumericStart: return this.stateNumericStart(e, t);
			case z.NumericDecimal: return this.stateNumericDecimal(e, t);
			case z.NumericHex: return this.stateNumericHex(e, t);
			case z.NamedEntity: return this.stateNamedEntity(e, t);
		}
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | Ba) === R.LOWER_X ? (this.state = z.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = z.NumericDecimal, this.stateNumericDecimal(e, t));
	}
	addToNumericResult(e, t, n, r) {
		if (t !== n) {
			let i = n - t;
			this.result = this.result * r ** +i + parseInt(e.substr(t, i), r), this.consumed += i;
		}
	}
	stateNumericHex(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (Ha(r) || Ua(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 16), this.emitNumericEntity(r, 3);
		}
		return this.addToNumericResult(e, n, t, 16), -1;
	}
	stateNumericDecimal(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (Ha(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 10), this.emitNumericEntity(r, 2);
		}
		return this.addToNumericResult(e, n, t, 10), -1;
	}
	emitNumericEntity(e, t) {
		var n;
		if (this.consumed <= t) return (n = this.errors) == null || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === R.SEMI) this.consumed += 1;
		else if (this.decodeMode === Ka.Strict) return 0;
		return this.emitCodePoint(za(this.result), this.consumed), this.errors && (e !== R.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	stateNamedEntity(e, t) {
		let { decodeTree: n } = this, r = n[this.treeIndex], i = (r & Va.VALUE_LENGTH) >> 14;
		for (; t < e.length; t++, this.excess++) {
			let a = e.charCodeAt(t);
			if (this.treeIndex = Ya(n, r, this.treeIndex + Math.max(1, i), a), this.treeIndex < 0) return this.result === 0 || this.decodeMode === Ka.Attribute && (i === 0 || Ga(a)) ? 0 : this.emitNotTerminatedNamedEntity();
			if (r = n[this.treeIndex], i = (r & Va.VALUE_LENGTH) >> 14, i !== 0) {
				if (a === R.SEMI) return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
				this.decodeMode !== Ka.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
			}
		}
		return -1;
	}
	emitNotTerminatedNamedEntity() {
		var e;
		let { result: t, decodeTree: n } = this, r = (n[t] & Va.VALUE_LENGTH) >> 14;
		return this.emitNamedEntityData(t, r, this.consumed), (e = this.errors) == null || e.missingSemicolonAfterCharacterReference(), this.consumed;
	}
	emitNamedEntityData(e, t, n) {
		let { decodeTree: r } = this;
		return this.emitCodePoint(t === 1 ? r[e] & ~Va.VALUE_LENGTH : r[e + 1], n), t === 3 && this.emitCodePoint(r[e + 2], n), n;
	}
	end() {
		var e;
		switch (this.state) {
			case z.NamedEntity: return this.result !== 0 && (this.decodeMode !== Ka.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case z.NumericDecimal: return this.emitNumericEntity(0, 2);
			case z.NumericHex: return this.emitNumericEntity(0, 3);
			case z.NumericStart: return (e = this.errors) == null || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			case z.EntityStart: return 0;
		}
	}
};
function Ja(e) {
	let t = "", n = new qa(e, (e) => t += Ra(e));
	return function(e, r) {
		let i = 0, a = 0;
		for (; (a = e.indexOf("&", a)) >= 0;) {
			t += e.slice(i, a), n.startEntity(r);
			let o = n.write(e, a + 1);
			if (o < 0) {
				i = a + n.end();
				break;
			}
			i = a + o, a = o === 0 ? i + 1 : i;
		}
		let o = t + e.slice(i);
		return t = "", o;
	};
}
function Ya(e, t, n, r) {
	let i = (t & Va.BRANCH_LENGTH) >> 7, a = t & Va.JUMP_TABLE;
	if (i === 0) return a !== 0 && r === a ? n : -1;
	if (a) {
		let t = r - a;
		return t < 0 || t >= i ? -1 : e[n + t] - 1;
	}
	let o = n, s = o + i - 1;
	for (; o <= s;) {
		let t = o + s >>> 1, n = e[t];
		if (n < r) o = t + 1;
		else if (n > r) s = t - 1;
		else return e[t + i];
	}
	return -1;
}
var Xa = Ja(Fa);
Ja(Ia);
function Za(e, t = Ka.Legacy) {
	return Xa(e, t);
}
function Qa(e) {
	return Xa(e, Ka.Strict);
}
// node_modules/markdown-it/lib/common/utils.mjs
var $a = /* @__PURE__ */ t({
	arrayReplaceAt: () => ao,
	asciiTrim: () => Oo,
	assign: () => io,
	escapeHtml: () => yo,
	escapeRE: () => xo,
	fromCodePoint: () => so,
	has: () => ro,
	isMdAsciiPunct: () => To,
	isPunctChar: () => Co,
	isPunctCharCode: () => wo,
	isSpace: () => B,
	isString: () => to,
	isValidEntityCode: () => oo,
	isWhiteSpace: () => So,
	lib: () => ko,
	normalizeReference: () => Eo,
	unescapeAll: () => mo,
	unescapeMd: () => po
});
function eo(e) {
	return Object.prototype.toString.call(e);
}
function to(e) {
	return eo(e) === "[object String]";
}
var no = Object.prototype.hasOwnProperty;
function ro(e, t) {
	return no.call(e, t);
}
function io(e) {
	return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
		if (t) {
			if (typeof t != "object") throw TypeError(t + "must be object");
			Object.keys(t).forEach(function(n) {
				e[n] = t[n];
			});
		}
	}), e;
}
function ao(e, t, n) {
	return [].concat(e.slice(0, t), n, e.slice(t + 1));
}
function oo(e) {
	return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) == 65535 || (e & 65535) == 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function so(e) {
	if (e > 65535) {
		e -= 65536;
		let t = 55296 + (e >> 10), n = 56320 + (e & 1023);
		return String.fromCharCode(t, n);
	}
	return String.fromCharCode(e);
}
var co = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, lo = RegExp(co.source + "|&([a-z#][a-z0-9]{1,31});", "gi"), uo = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function fo(e, t) {
	if (t.charCodeAt(0) === 35 && uo.test(t)) {
		let n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
		return oo(n) ? so(n) : e;
	}
	let n = Za(e);
	return n === e ? e : n;
}
function po(e) {
	return e.indexOf("\\") < 0 ? e : e.replace(co, "$1");
}
function mo(e) {
	return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(lo, function(e, t, n) {
		return t || fo(e, n);
	});
}
var ho = /[&<>"]/, go = /[&<>"]/g, _o = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
};
function vo(e) {
	return _o[e];
}
function yo(e) {
	return ho.test(e) ? e.replace(go, vo) : e;
}
var bo = /[.?*+^$[\]\\(){}|-]/g;
function xo(e) {
	return e.replace(bo, "\\$&");
}
function B(e) {
	switch (e) {
		case 9:
		case 32: return !0;
	}
	return !1;
}
function So(e) {
	if (e >= 8192 && e <= 8202) return !0;
	switch (e) {
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 32:
		case 160:
		case 5760:
		case 8239:
		case 8287:
		case 12288: return !0;
	}
	return !1;
}
function Co(e) {
	return ja.test(e) || Ma.test(e);
}
function wo(e) {
	return Co(so(e));
}
function To(e) {
	switch (e) {
		case 33:
		case 34:
		case 35:
		case 36:
		case 37:
		case 38:
		case 39:
		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 58:
		case 59:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 124:
		case 125:
		case 126: return !0;
		default: return !1;
	}
}
function Eo(e) {
	return e = e.trim().replace(/\s+/g, " "), e.toLowerCase().toUpperCase();
}
function Do(e) {
	return e === 32 || e === 9 || e === 10 || e === 13;
}
function Oo(e) {
	let t = 0;
	for (; t < e.length && Do(e.charCodeAt(t)); t++);
	let n = e.length - 1;
	for (; n >= t && Do(e.charCodeAt(n)); n--);
	return e.slice(t, n + 1);
}
var ko = {
	mdurl: Da,
	ucmicro: Pa
};
// node_modules/markdown-it/lib/helpers/parse_link_label.mjs
function Ao(e, t, n) {
	let r, i, a, o, s = e.posMax, c = e.pos;
	for (e.pos = t + 1, r = 1; e.pos < s;) {
		if (a = e.src.charCodeAt(e.pos), a === 93 && (r--, r === 0)) {
			i = !0;
			break;
		}
		if (o = e.pos, e.md.inline.skipToken(e), a === 91) {
			if (o === e.pos - 1) r++;
			else if (n) return e.pos = c, -1;
		}
	}
	let l = -1;
	return i && (l = e.pos), e.pos = c, l;
}
// node_modules/markdown-it/lib/helpers/parse_link_destination.mjs
function jo(e, t, n) {
	let r, i = t, a = {
		ok: !1,
		pos: 0,
		str: ""
	};
	if (e.charCodeAt(i) === 60) {
		for (i++; i < n;) {
			if (r = e.charCodeAt(i), r === 10 || r === 60) return a;
			if (r === 62) return a.pos = i + 1, a.str = mo(e.slice(t + 1, i)), a.ok = !0, a;
			r === 92 && i + 1 < n ? i += 2 : i++;
		}
		return a;
	}
	let o = 0;
	for (; i < n && (r = e.charCodeAt(i), !(r === 32 || r < 32 || r === 127));) if (r === 92 && i + 1 < n) {
		if (e.charCodeAt(i + 1) === 32) {
			i++;
			continue;
		}
		i += 2;
	} else {
		if (r === 40 && (o++, o > 32)) return a;
		if (r === 41) {
			if (o === 0) break;
			o--;
		}
		i++;
	}
	return t === i || o !== 0 || (a.str = mo(e.slice(t, i)), a.pos = i, a.ok = !0), a;
}
// node_modules/markdown-it/lib/helpers/parse_link_title.mjs
function Mo(e, t, n, r) {
	let i, a = t, o = {
		ok: !1,
		can_continue: !1,
		pos: 0,
		str: "",
		marker: 0
	};
	if (r) o.str = r.str, o.marker = r.marker;
	else {
		if (a >= n) return o;
		let r = e.charCodeAt(a);
		if (r !== 34 && r !== 39 && r !== 40) return o;
		t++, a++, r === 40 && (r = 41), o.marker = r;
	}
	for (; a < n;) {
		if (i = e.charCodeAt(a), i === o.marker) return o.pos = a + 1, o.str += mo(e.slice(t, a)), o.ok = !0, o;
		if (i === 40 && o.marker === 41) return o;
		i === 92 && a + 1 < n && a++, a++;
	}
	return o.can_continue = !0, o.str += mo(e.slice(t, a)), o;
}
// node_modules/markdown-it/lib/helpers/index.mjs
var No = /* @__PURE__ */ t({
	parseLinkDestination: () => jo,
	parseLinkLabel: () => Ao,
	parseLinkTitle: () => Mo
}), Po = {};
Po.code_inline = function(e, t, n, r, i) {
	let a = e[t];
	return "<code" + i.renderAttrs(a) + ">" + yo(a.content) + "</code>";
}, Po.code_block = function(e, t, n, r, i) {
	let a = e[t];
	return "<pre" + i.renderAttrs(a) + "><code>" + yo(e[t].content) + "</code></pre>\n";
}, Po.fence = function(e, t, n, r, i) {
	let a = e[t], o = a.info ? mo(a.info).trim() : "", s = "", c = "";
	if (o) {
		let e = o.split(/(\s+)/g);
		s = e[0], c = e.slice(2).join("");
	}
	let l;
	if (l = n.highlight && n.highlight(a.content, s, c) || yo(a.content), l.indexOf("<pre") === 0) return l + "\n";
	if (o) {
		let e = a.attrIndex("class"), t = a.attrs ? a.attrs.slice() : [];
		e < 0 ? t.push(["class", n.langPrefix + s]) : (t[e] = t[e].slice(), t[e][1] += " " + n.langPrefix + s);
		let r = { attrs: t };
		return `<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`;
	}
	return `<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`;
}, Po.image = function(e, t, n, r, i) {
	let a = e[t];
	return a.attrs[a.attrIndex("alt")][1] = i.renderInlineAsText(a.children, n, r), i.renderToken(e, t, n);
}, Po.hardbreak = function(e, t, n) {
	return n.xhtmlOut ? "<br />\n" : "<br>\n";
}, Po.softbreak = function(e, t, n) {
	return n.breaks ? n.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, Po.text = function(e, t) {
	return yo(e[t].content);
}, Po.html_block = function(e, t) {
	return e[t].content;
}, Po.html_inline = function(e, t) {
	return e[t].content;
};
function Fo() {
	this.rules = io({}, Po);
}
Fo.prototype.renderAttrs = function(e) {
	let t, n, r;
	if (!e.attrs) return "";
	for (r = "", t = 0, n = e.attrs.length; t < n; t++) r += " " + yo(e.attrs[t][0]) + "=\"" + yo(e.attrs[t][1]) + "\"";
	return r;
}, Fo.prototype.renderToken = function(e, t, n) {
	let r = e[t], i = "";
	if (r.hidden) return "";
	r.block && r.nesting !== -1 && t && e[t - 1].hidden && (i += "\n"), i += (r.nesting === -1 ? "</" : "<") + r.tag, i += this.renderAttrs(r), r.nesting === 0 && n.xhtmlOut && (i += " /");
	let a = !1;
	if (r.block && (a = !0, r.nesting === 1 && t + 1 < e.length)) {
		let n = e[t + 1];
		(n.type === "inline" || n.hidden || n.nesting === -1 && n.tag === r.tag) && (a = !1);
	}
	return i += a ? ">\n" : ">", i;
}, Fo.prototype.renderInline = function(e, t, n) {
	let r = "", i = this.rules;
	for (let a = 0, o = e.length; a < o; a++) {
		let o = e[a].type;
		i[o] === void 0 ? r += this.renderToken(e, a, t) : r += i[o](e, a, t, n, this);
	}
	return r;
}, Fo.prototype.renderInlineAsText = function(e, t, n) {
	let r = "";
	for (let i = 0, a = e.length; i < a; i++) switch (e[i].type) {
		case "text":
			r += e[i].content;
			break;
		case "image":
			r += this.renderInlineAsText(e[i].children, t, n);
			break;
		case "html_inline":
		case "html_block":
			r += e[i].content;
			break;
		case "softbreak":
		case "hardbreak": r += "\n";
	}
	return r;
}, Fo.prototype.render = function(e, t, n) {
	let r = "", i = this.rules;
	for (let a = 0, o = e.length; a < o; a++) {
		let o = e[a].type;
		o === "inline" ? r += this.renderInline(e[a].children, t, n) : i[o] === void 0 ? r += this.renderToken(e, a, t, n) : r += i[o](e, a, t, n, this);
	}
	return r;
};
// node_modules/markdown-it/lib/ruler.mjs
function V() {
	this.__rules__ = [], this.__cache__ = null;
}
V.prototype.__find__ = function(e) {
	for (let t = 0; t < this.__rules__.length; t++) if (this.__rules__[t].name === e) return t;
	return -1;
}, V.prototype.__compile__ = function() {
	let e = this, t = [""];
	e.__rules__.forEach(function(e) {
		e.enabled && e.alt.forEach(function(e) {
			t.indexOf(e) < 0 && t.push(e);
		});
	}), e.__cache__ = {}, t.forEach(function(t) {
		e.__cache__[t] = [], e.__rules__.forEach(function(n) {
			n.enabled && (t && n.alt.indexOf(t) < 0 || e.__cache__[t].push(n.fn));
		});
	});
}, V.prototype.at = function(e, t, n) {
	let r = this.__find__(e), i = n || {};
	if (r === -1) throw Error("Parser rule not found: " + e);
	this.__rules__[r].fn = t, this.__rules__[r].alt = i.alt || [], this.__cache__ = null;
}, V.prototype.before = function(e, t, n, r) {
	let i = this.__find__(e), a = r || {};
	if (i === -1) throw Error("Parser rule not found: " + e);
	this.__rules__.splice(i, 0, {
		name: t,
		enabled: !0,
		fn: n,
		alt: a.alt || []
	}), this.__cache__ = null;
}, V.prototype.after = function(e, t, n, r) {
	let i = this.__find__(e), a = r || {};
	if (i === -1) throw Error("Parser rule not found: " + e);
	this.__rules__.splice(i + 1, 0, {
		name: t,
		enabled: !0,
		fn: n,
		alt: a.alt || []
	}), this.__cache__ = null;
}, V.prototype.push = function(e, t, n) {
	let r = n || {};
	this.__rules__.push({
		name: e,
		enabled: !0,
		fn: t,
		alt: r.alt || []
	}), this.__cache__ = null;
}, V.prototype.enable = function(e, t) {
	Array.isArray(e) || (e = [e]);
	let n = [];
	return e.forEach(function(e) {
		let r = this.__find__(e);
		if (r < 0) {
			if (t) return;
			throw Error("Rules manager: invalid rule name " + e);
		}
		this.__rules__[r].enabled = !0, n.push(e);
	}, this), this.__cache__ = null, n;
}, V.prototype.enableOnly = function(e, t) {
	Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(e) {
		e.enabled = !1;
	}), this.enable(e, t);
}, V.prototype.disable = function(e, t) {
	Array.isArray(e) || (e = [e]);
	let n = [];
	return e.forEach(function(e) {
		let r = this.__find__(e);
		if (r < 0) {
			if (t) return;
			throw Error("Rules manager: invalid rule name " + e);
		}
		this.__rules__[r].enabled = !1, n.push(e);
	}, this), this.__cache__ = null, n;
}, V.prototype.getRules = function(e) {
	return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
// node_modules/markdown-it/lib/token.mjs
function H(e, t, n) {
	this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
H.prototype.attrIndex = function(e) {
	if (!this.attrs) return -1;
	let t = this.attrs;
	for (let n = 0, r = t.length; n < r; n++) if (t[n][0] === e) return n;
	return -1;
}, H.prototype.attrPush = function(e) {
	this.attrs ? this.attrs.push(e) : this.attrs = [e];
}, H.prototype.attrSet = function(e, t) {
	let n = this.attrIndex(e), r = [e, t];
	n < 0 ? this.attrPush(r) : this.attrs[n] = r;
}, H.prototype.attrGet = function(e) {
	let t = this.attrIndex(e), n = null;
	return t >= 0 && (n = this.attrs[t][1]), n;
}, H.prototype.attrJoin = function(e, t) {
	let n = this.attrIndex(e);
	n < 0 ? this.attrPush([e, t]) : this.attrs[n][1] = this.attrs[n][1] + " " + t;
};
// node_modules/markdown-it/lib/rules_core/state_core.mjs
function Io(e, t, n) {
	this.src = e, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = t;
}
Io.prototype.Token = H;
// node_modules/markdown-it/lib/rules_core/normalize.mjs
var Lo = /\r\n?|\n/g, Ro = /\0/g;
function zo(e) {
	let t;
	t = e.src.replace(Lo, "\n"), t = t.replace(Ro, "�"), e.src = t;
}
// node_modules/markdown-it/lib/rules_core/block.mjs
function Bo(e) {
	let t;
	e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
// node_modules/markdown-it/lib/rules_core/inline.mjs
function Vo(e) {
	let t = e.tokens;
	for (let n = 0, r = t.length; n < r; n++) {
		let r = t[n];
		r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
	}
}
// node_modules/markdown-it/lib/rules_core/linkify.mjs
function Ho(e) {
	return /^<a[>\s]/i.test(e);
}
function Uo(e) {
	return /^<\/a\s*>/i.test(e);
}
function Wo(e) {
	let t = e.tokens;
	if (e.md.options.linkify) for (let n = 0, r = t.length; n < r; n++) {
		if (t[n].type !== "inline" || !e.md.linkify.pretest(t[n].content)) continue;
		let r = t[n].children, i = [], a = 0;
		for (let t = r.length - 1; t >= 0; t--) {
			let n = r[t];
			if (n.type === "link_close") for (t--; r[t].level !== n.level && r[t].type !== "link_open";) t--;
			else if (n.type === "html_inline" && (Ho(n.content) && a > 0 && a--, Uo(n.content) && a++), !(a > 0) && n.type === "text" && e.md.linkify.test(n.content)) {
				let a = n.content, o = e.md.linkify.match(a), s = [], c = n.level, l = 0;
				o.length > 0 && o[0].index === 0 && t > 0 && r[t - 1].type === "text_special" && (o = o.slice(1));
				for (let t = 0; t < o.length; t++) {
					let n = o[t].url, r = e.md.normalizeLink(n);
					if (!e.md.validateLink(r)) continue;
					let i = o[t].text;
					i = o[t].schema ? o[t].schema === "mailto:" && !/^mailto:/i.test(i) ? e.md.normalizeLinkText("mailto:" + i).replace(/^mailto:/, "") : e.md.normalizeLinkText(i) : e.md.normalizeLinkText("http://" + i).replace(/^http:\/\//, "");
					let u = o[t].index;
					if (u > l) {
						let t = new e.Token("text", "", 0);
						t.content = a.slice(l, u), t.level = c, s.push(t);
					}
					let d = new e.Token("link_open", "a", 1);
					d.attrs = [["href", r]], d.level = c++, d.markup = "linkify", d.info = "auto", s.push(d);
					let f = new e.Token("text", "", 0);
					f.content = i, f.level = c, s.push(f);
					let p = new e.Token("link_close", "a", -1);
					p.level = --c, p.markup = "linkify", p.info = "auto", s.push(p), l = o[t].lastIndex;
				}
				if (l < a.length) {
					let t = new e.Token("text", "", 0);
					t.content = a.slice(l), t.level = c, s.push(t);
				}
				i.push({
					index: t,
					nodes: s
				});
			}
		}
		if (i.length > 0) {
			let e = r.length;
			for (let t of i) e += t.nodes.length - 1;
			let a = Array(e), o = 0, s = 0;
			i.reverse();
			for (let e = 0; e < r.length; e++) {
				let t = i[o];
				if (t?.index === e) {
					for (let e of t.nodes) a[s++] = e;
					o++;
				} else a[s++] = r[e];
			}
			t[n].children = a;
		}
	}
}
// node_modules/markdown-it/lib/rules_core/replacements.mjs
var Go = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, Ko = /\((c|tm|r)\)/i, qo = /\((c|tm|r)\)/gi, Jo = {
	c: "©",
	r: "®",
	tm: "™"
};
function Yo(e, t) {
	return Jo[t.toLowerCase()];
}
function Xo(e) {
	let t = 0;
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		r.type === "text" && !t && (r.content = r.content.replace(qo, Yo)), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
	}
}
function Zo(e) {
	let t = 0;
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		r.type === "text" && !t && Go.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
	}
}
function Qo(e) {
	let t;
	if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) e.tokens[t].type === "inline" && (Ko.test(e.tokens[t].content) && Xo(e.tokens[t].children), Go.test(e.tokens[t].content) && Zo(e.tokens[t].children));
}
// node_modules/markdown-it/lib/rules_core/smartquotes.mjs
var $o = /['"]/, es = /['"]/g, ts = "’", ns = 1e3;
function rs(e, t, n) {
	for (; e.length > n;) {
		let n = e.pop();
		n.isSingleQuote ? t.single = n.prevSameQuoteIdx : t.double = n.prevSameQuoteIdx;
	}
}
function is(e, t, n, r) {
	e[t] || (e[t] = []), e[t].push({
		pos: n,
		ch: r
	});
}
function as(e, t) {
	let n = "", r = 0;
	t.sort((e, t) => e.pos - t.pos);
	for (let i = 0; i < t.length; i++) {
		let a = t[i];
		n += e.slice(r, a.pos) + a.ch, r = a.pos + 1;
	}
	return n + e.slice(r);
}
function os(e, t) {
	let n, r = [], i = {
		single: -1,
		double: -1
	}, a = {};
	for (let o = 0; o < e.length; o++) {
		let s = e[o], c = e[o].level;
		for (n = r.length - 1; n >= 0 && !(r[n].level <= c); n--);
		if (rs(r, i, n + 1), s.type !== "text") continue;
		let l = s.content, u = 0, d = l.length;
		OUTER: for (; u < d;) {
			es.lastIndex = u;
			let s = es.exec(l);
			if (!s) break;
			let f = !0, p = !0;
			u = s.index + 1;
			let m = s[0] === "'", h = 32;
			if (s.index - 1 >= 0) h = l.charCodeAt(s.index - 1);
			else for (n = o - 1; n >= 0 && e[n].type !== "softbreak" && e[n].type !== "hardbreak"; n--) if (e[n].content) {
				h = e[n].content.charCodeAt(e[n].content.length - 1);
				break;
			}
			let g = 32;
			if (u < d) g = l.charCodeAt(u);
			else for (n = o + 1; n < e.length && e[n].type !== "softbreak" && e[n].type !== "hardbreak"; n++) if (e[n].content) {
				g = e[n].content.charCodeAt(0);
				break;
			}
			let _ = To(h) || wo(h), v = To(g) || wo(g), y = So(h), b = So(g);
			if (b ? f = !1 : v && (y || _ || (f = !1)), y ? p = !1 : _ && (b || v || (p = !1)), g === 34 && s[0] === "\"" && h >= 48 && h <= 57 && (p = f = !1), f && p && (f = _, p = v), !f && !p) m && is(a, o, s.index, ts);
			else {
				if (p && (n = m ? i.single : i.double, n >= 0 && r[n].level === c)) {
					let e = r[n], c, l;
					m ? (c = t.md.options.quotes[2], l = t.md.options.quotes[3]) : (c = t.md.options.quotes[0], l = t.md.options.quotes[1]), is(a, o, s.index, l), is(a, e.tokenIdx, e.contentPos, c), rs(r, i, n);
					continue OUTER;
				}
				if (f) {
					if (r.length >= ns) return;
					r.push({
						tokenIdx: o,
						contentPos: s.index,
						isSingleQuote: m,
						level: c,
						prevSameQuoteIdx: m ? i.single : i.double
					}), m ? i.single = r.length - 1 : i.double = r.length - 1;
				} else p && m && is(a, o, s.index, ts);
			}
		}
	}
	Object.keys(a).forEach(function(t) {
		e[t].content = as(e[t].content, a[t]);
	});
}
function ss(e) {
	if (e.md.options.typographer) for (let t = e.tokens.length - 1; t >= 0; t--) e.tokens[t].type === "inline" && $o.test(e.tokens[t].content) && os(e.tokens[t].children, e);
}
// node_modules/markdown-it/lib/rules_core/text_join.mjs
function cs(e) {
	let t, n, r = e.tokens, i = r.length;
	for (let e = 0; e < i; e++) {
		if (r[e].type !== "inline") continue;
		let i = r[e].children, a = i.length;
		for (t = 0; t < a; t++) i[t].type === "text_special" && (i[t].type = "text");
		for (t = n = 0; t < a; t++) i[t].type === "text" && t + 1 < a && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
		t !== n && (i.length = n);
	}
}
// node_modules/markdown-it/lib/parser_core.mjs
var ls = [
	["normalize", zo],
	["block", Bo],
	["inline", Vo],
	["linkify", Wo],
	["replacements", Qo],
	["smartquotes", ss],
	["text_join", cs]
];
function us() {
	this.ruler = new V();
	for (let e = 0; e < ls.length; e++) this.ruler.push(ls[e][0], ls[e][1]);
}
us.prototype.process = function(e) {
	let t = this.ruler.getRules("");
	for (let n = 0, r = t.length; n < r; n++) t[n](e);
}, us.prototype.State = Io;
// node_modules/markdown-it/lib/rules_block/state_block.mjs
function ds(e, t, n, r) {
	this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
	let i = this.src;
	for (let e = 0, t = 0, n = 0, r = 0, a = i.length, o = !1; t < a; t++) {
		let s = i.charCodeAt(t);
		if (!o) {
			if (B(s)) {
				n++, s === 9 ? r += 4 - r % 4 : r++;
				continue;
			}
			o = !0;
		}
		(s === 10 || t === a - 1) && (s !== 10 && t++, this.bMarks.push(e), this.eMarks.push(t), this.tShift.push(n), this.sCount.push(r), this.bsCount.push(0), o = !1, n = 0, r = 0, e = t + 1);
	}
	this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
ds.prototype.push = function(e, t, n) {
	let r = new H(e, t, n);
	return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
}, ds.prototype.isEmpty = function(e) {
	return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
}, ds.prototype.skipEmptyLines = function(e) {
	for (let t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
	return e;
}, ds.prototype.skipSpaces = function(e) {
	for (let t = this.src.length; e < t && B(this.src.charCodeAt(e)); e++);
	return e;
}, ds.prototype.skipSpacesBack = function(e, t) {
	if (e <= t) return e;
	for (; e > t;) if (!B(this.src.charCodeAt(--e))) return e + 1;
	return e;
}, ds.prototype.skipChars = function(e, t) {
	for (let n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++);
	return e;
}, ds.prototype.skipCharsBack = function(e, t, n) {
	if (e <= n) return e;
	for (; e > n;) if (t !== this.src.charCodeAt(--e)) return e + 1;
	return e;
}, ds.prototype.getLines = function(e, t, n, r) {
	if (e >= t) return "";
	let i = Array(t - e);
	for (let a = 0, o = e; o < t; o++, a++) {
		let e = 0, s = this.bMarks[o], c = s, l;
		for (l = o + 1 < t || r ? this.eMarks[o] + 1 : this.eMarks[o]; c < l && e < n;) {
			let t = this.src.charCodeAt(c);
			if (B(t)) t === 9 ? e += 4 - (e + this.bsCount[o]) % 4 : e++;
			else if (c - s < this.tShift[o]) e++;
			else break;
			c++;
		}
		e > n ? i[a] = Array(e - n + 1).join(" ") + this.src.slice(c, l) : i[a] = this.src.slice(c, l);
	}
	return i.join("");
}, ds.prototype.Token = H;
// node_modules/markdown-it/lib/rules_block/table.mjs
var fs = 65536;
function ps(e, t) {
	let n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t];
	return e.src.slice(n, r);
}
function ms(e) {
	let t = [], n = e.length, r = 0, i = e.charCodeAt(r), a = !1, o = 0, s = "";
	for (; r < n;) i === 124 && (a ? (s += e.substring(o, r - 1), o = r) : (t.push(s + e.substring(o, r)), s = "", o = r + 1)), a = i === 92, r++, i = e.charCodeAt(r);
	return t.push(s + e.substring(o)), t;
}
function hs(e, t, n, r) {
	if (t + 2 > n) return !1;
	let i = t + 1;
	if (e.sCount[i] < e.blkIndent || e.sCount[i] - e.blkIndent >= 4) return !1;
	let a = e.bMarks[i] + e.tShift[i];
	if (a >= e.eMarks[i]) return !1;
	let o = e.src.charCodeAt(a++);
	if (o !== 124 && o !== 45 && o !== 58 || a >= e.eMarks[i]) return !1;
	let s = e.src.charCodeAt(a++);
	if (s !== 124 && s !== 45 && s !== 58 && !B(s) || o === 45 && B(s)) return !1;
	for (; a < e.eMarks[i];) {
		let t = e.src.charCodeAt(a);
		if (t !== 124 && t !== 45 && t !== 58 && !B(t)) return !1;
		a++;
	}
	let c = ps(e, t + 1), l = c.split("|"), u = [];
	for (let e = 0; e < l.length; e++) {
		let t = l[e].trim();
		if (!t) {
			if (e === 0 || e === l.length - 1) continue;
			return !1;
		}
		if (!/^:?-+:?$/.test(t)) return !1;
		t.charCodeAt(t.length - 1) === 58 ? u.push(t.charCodeAt(0) === 58 ? "center" : "right") : t.charCodeAt(0) === 58 ? u.push("left") : u.push("");
	}
	if (c = ps(e, t).trim(), c.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4) return !1;
	l = ms(c), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop();
	let d = l.length;
	if (d === 0 || d !== u.length) return !1;
	if (r) return !0;
	let f = e.parentType;
	e.parentType = "table";
	let p = e.md.block.ruler.getRules("blockquote"), m = e.push("table_open", "table", 1), h = [t, 0];
	m.map = h;
	let g = e.push("thead_open", "thead", 1);
	g.map = [t, t + 1];
	let _ = e.push("tr_open", "tr", 1);
	_.map = [t, t + 1];
	for (let t = 0; t < l.length; t++) {
		let n = e.push("th_open", "th", 1);
		u[t] && (n.attrs = [["style", "text-align:" + u[t]]]);
		let r = e.push("inline", "", 0);
		r.content = l[t].trim(), r.children = [], e.push("th_close", "th", -1);
	}
	e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
	let v, y = 0;
	for (i = t + 2; i < n && !(e.sCount[i] < e.blkIndent); i++) {
		let r = !1;
		for (let t = 0, a = p.length; t < a; t++) if (p[t](e, i, n, !0)) {
			r = !0;
			break;
		}
		if (r || (c = ps(e, i).trim(), !c) || e.sCount[i] - e.blkIndent >= 4 || (l = ms(c), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop(), y += d - l.length, y > fs)) break;
		if (i === t + 2) {
			let n = e.push("tbody_open", "tbody", 1);
			n.map = v = [t + 2, 0];
		}
		let a = e.push("tr_open", "tr", 1);
		a.map = [i, i + 1];
		for (let t = 0; t < d; t++) {
			let n = e.push("td_open", "td", 1);
			u[t] && (n.attrs = [["style", "text-align:" + u[t]]]);
			let r = e.push("inline", "", 0);
			r.content = l[t] ? l[t].trim() : "", r.children = [], e.push("td_close", "td", -1);
		}
		e.push("tr_close", "tr", -1);
	}
	return v && (e.push("tbody_close", "tbody", -1), v[1] = i), e.push("table_close", "table", -1), h[1] = i, e.parentType = f, e.line = i, !0;
}
// node_modules/markdown-it/lib/rules_block/code.mjs
function gs(e, t, n) {
	if (e.sCount[t] - e.blkIndent < 4) return !1;
	let r = t + 1, i = r;
	for (; r < n;) if (e.isEmpty(r)) r++;
	else if (e.sCount[r] - e.blkIndent >= 4) r++, i = r;
	else break;
	e.line = i;
	let a = e.push("code_block", "code", 0);
	return a.content = e.getLines(t, i, 4 + e.blkIndent, !1) + "\n", a.map = [t, e.line], !0;
}
// node_modules/markdown-it/lib/rules_block/fence.mjs
function _s(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4 || i + 3 > a) return !1;
	let o = e.src.charCodeAt(i);
	if (o !== 126 && o !== 96) return !1;
	let s = i;
	i = e.skipChars(i, o);
	let c = i - s;
	if (c < 3) return !1;
	let l = e.src.slice(s, i), u = e.src.slice(i, a);
	if (o === 96 && u.indexOf(String.fromCharCode(o)) >= 0) return !1;
	if (r) return !0;
	let d = t, f = !1;
	for (; d++, !(d >= n || (i = s = e.bMarks[d] + e.tShift[d], a = e.eMarks[d], i < a && e.sCount[d] < e.blkIndent));) if (e.src.charCodeAt(i) === o && !(e.sCount[d] - e.blkIndent >= 4) && (i = e.skipChars(i, o), !(i - s < c) && (i = e.skipSpaces(i), !(i < a)))) {
		f = !0;
		break;
	}
	c = e.sCount[t], e.line = d + +!!f;
	let p = e.push("fence", "code", 0);
	return p.info = u, p.content = e.getLines(t + 1, d, c, !0), p.markup = l, p.map = [t, e.line], !0;
}
// node_modules/markdown-it/lib/rules_block/blockquote.mjs
function vs(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t], o = e.lineMax;
	if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 62) return !1;
	if (r) return !0;
	let s = [], c = [], l = [], u = [], d = e.md.block.ruler.getRules("blockquote"), f = e.parentType;
	e.parentType = "blockquote";
	let p = !1, m;
	for (m = t; m < n; m++) {
		let t = e.sCount[m] < e.blkIndent;
		if (i = e.bMarks[m] + e.tShift[m], a = e.eMarks[m], i >= a) break;
		if (e.src.charCodeAt(i++) === 62 && !t) {
			let t = e.sCount[m] + 1, n, r;
			e.src.charCodeAt(i) === 32 ? (i++, t++, r = !1, n = !0) : e.src.charCodeAt(i) === 9 ? (n = !0, (e.bsCount[m] + t) % 4 == 3 ? (i++, t++, r = !1) : r = !0) : n = !1;
			let o = t;
			for (s.push(e.bMarks[m]), e.bMarks[m] = i; i < a;) {
				let t = e.src.charCodeAt(i);
				if (B(t)) t === 9 ? o += 4 - (o + e.bsCount[m] + +!!r) % 4 : o++;
				else break;
				i++;
			}
			p = i >= a, c.push(e.bsCount[m]), e.bsCount[m] = e.sCount[m] + 1 + +!!n, l.push(e.sCount[m]), e.sCount[m] = o - t, u.push(e.tShift[m]), e.tShift[m] = i - e.bMarks[m];
			continue;
		}
		if (p) break;
		let r = !1;
		for (let t = 0, i = d.length; t < i; t++) if (d[t](e, m, n, !0)) {
			r = !0;
			break;
		}
		if (r) {
			e.lineMax = m, e.blkIndent !== 0 && (s.push(e.bMarks[m]), c.push(e.bsCount[m]), u.push(e.tShift[m]), l.push(e.sCount[m]), e.sCount[m] -= e.blkIndent);
			break;
		}
		s.push(e.bMarks[m]), c.push(e.bsCount[m]), u.push(e.tShift[m]), l.push(e.sCount[m]), e.sCount[m] = -1;
	}
	let h = e.blkIndent;
	e.blkIndent = 0;
	let g = e.push("blockquote_open", "blockquote", 1);
	g.markup = ">";
	let _ = [t, 0];
	g.map = _, e.md.block.tokenize(e, t, m);
	let v = e.push("blockquote_close", "blockquote", -1);
	v.markup = ">", e.lineMax = o, e.parentType = f, _[1] = e.line;
	for (let n = 0; n < u.length; n++) e.bMarks[n + t] = s[n], e.tShift[n + t] = u[n], e.sCount[n + t] = l[n], e.bsCount[n + t] = c[n];
	return e.blkIndent = h, !0;
}
// node_modules/markdown-it/lib/rules_block/hr.mjs
function ys(e, t, n, r) {
	let i = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let a = e.bMarks[t] + e.tShift[t], o = e.src.charCodeAt(a++);
	if (o !== 42 && o !== 45 && o !== 95) return !1;
	let s = 1;
	for (; a < i;) {
		let t = e.src.charCodeAt(a++);
		if (t !== o && !B(t)) return !1;
		t === o && s++;
	}
	if (s < 3) return !1;
	if (r) return !0;
	e.line = t + 1;
	let c = e.push("hr", "hr", 0);
	return c.map = [t, e.line], c.markup = Array(s + 1).join(String.fromCharCode(o)), !0;
}
// node_modules/markdown-it/lib/rules_block/list.mjs
function bs(e, t) {
	let n = e.eMarks[t], r = e.bMarks[t] + e.tShift[t], i = e.src.charCodeAt(r++);
	return i !== 42 && i !== 45 && i !== 43 || r < n && !B(e.src.charCodeAt(r)) ? -1 : r;
}
function xs(e, t) {
	let n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t], i = n;
	if (i + 1 >= r) return -1;
	let a = e.src.charCodeAt(i++);
	if (a < 48 || a > 57) return -1;
	for (;;) {
		if (i >= r) return -1;
		if (a = e.src.charCodeAt(i++), a >= 48 && a <= 57) {
			if (i - n >= 10) return -1;
		} else {
			if (a === 41 || a === 46) break;
			return -1;
		}
	}
	return i < r && (a = e.src.charCodeAt(i), !B(a)) ? -1 : i;
}
function Ss(e, t) {
	let n = e.level + 2;
	for (let r = t + 2, i = e.tokens.length - 2; r < i; r++) e.tokens[r].level === n && e.tokens[r].type === "paragraph_open" && (e.tokens[r + 2].hidden = !0, e.tokens[r].hidden = !0, r += 2);
}
function Cs(e, t, n, r) {
	let i, a, o, s, c = t, l = !0;
	if (e.sCount[c] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[c] - e.listIndent >= 4 && e.sCount[c] < e.blkIndent) return !1;
	let u = !1;
	r && e.parentType === "paragraph" && e.sCount[c] >= e.blkIndent && (u = !0);
	let d, f, p;
	if ((p = xs(e, c)) >= 0) {
		if (d = !0, o = e.bMarks[c] + e.tShift[c], f = Number(e.src.slice(o, p - 1)), u && f !== 1) return !1;
	} else if ((p = bs(e, c)) >= 0) d = !1;
	else return !1;
	if (u && e.skipSpaces(p) >= e.eMarks[c]) return !1;
	if (r) return !0;
	let m = e.src.charCodeAt(p - 1), h = e.tokens.length;
	d ? (s = e.push("ordered_list_open", "ol", 1), f !== 1 && (s.attrs = [["start", f]])) : s = e.push("bullet_list_open", "ul", 1);
	let g = [c, 0];
	s.map = g, s.markup = String.fromCharCode(m);
	let _ = !1, v = e.md.block.ruler.getRules("list"), y = e.parentType;
	for (e.parentType = "list"; c < n;) {
		a = p, i = e.eMarks[c];
		let t = e.sCount[c] + p - (e.bMarks[c] + e.tShift[c]), r = t;
		for (; a < i;) {
			let t = e.src.charCodeAt(a);
			if (t === 9) r += 4 - (r + e.bsCount[c]) % 4;
			else if (t === 32) r++;
			else break;
			a++;
		}
		let u = a, f;
		f = u >= i ? 1 : r - t, f > 4 && (f = 1);
		let h = t + f;
		s = e.push("list_item_open", "li", 1), s.markup = String.fromCharCode(m);
		let g = [c, 0];
		s.map = g, d && (s.info = e.src.slice(o, p - 1));
		let y = e.tight, b = e.tShift[c], ee = e.sCount[c], te = e.listIndent;
		if (e.listIndent = e.blkIndent, e.blkIndent = h, e.tight = !0, e.tShift[c] = u - e.bMarks[c], e.sCount[c] = r, u >= i && e.isEmpty(c + 1) ? e.line = Math.min(e.line + 2, n) : e.md.block.tokenize(e, c, n, !0), (!e.tight || _) && (l = !1), _ = e.line - c > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = te, e.tShift[c] = b, e.sCount[c] = ee, e.tight = y, s = e.push("list_item_close", "li", -1), s.markup = String.fromCharCode(m), c = e.line, g[1] = c, c >= n || e.sCount[c] < e.blkIndent || e.sCount[c] - e.blkIndent >= 4) break;
		let x = !1;
		for (let t = 0, r = v.length; t < r; t++) if (v[t](e, c, n, !0)) {
			x = !0;
			break;
		}
		if (x) break;
		if (d) {
			if (p = xs(e, c), p < 0) break;
			o = e.bMarks[c] + e.tShift[c];
		} else if (p = bs(e, c), p < 0) break;
		if (m !== e.src.charCodeAt(p - 1)) break;
	}
	return s = d ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), s.markup = String.fromCharCode(m), g[1] = c, e.line = c, e.parentType = y, l && Ss(e, h), !0;
}
// node_modules/markdown-it/lib/rules_block/reference.mjs
var ws = 999;
function Ts(e) {
	let t = e.length;
	for (let n = 0; n < e.length - 1; n++) {
		let r = e.charCodeAt(n);
		if (r < 55296 || r > 56319) continue;
		let i = e.charCodeAt(n + 1);
		i >= 56320 && i <= 57343 && (t--, n++);
	}
	return t;
}
function Es(e, t) {
	return Math.min(e.eMarks[t] + 1, e.src.length);
}
function Ds(e, t) {
	let n = e.lineMax;
	if (t >= n || e.isEmpty(t)) return -1;
	let r = !1;
	if (e.sCount[t] - e.blkIndent > 3 && (r = !0), e.sCount[t] < 0 && (r = !0), !r) {
		let r = e.md.block.ruler.getRules("reference"), i = e.parentType;
		e.parentType = "reference";
		let a = !1;
		for (let i = 0, o = r.length; i < o; i++) if (r[i](e, t, n, !0)) {
			a = !0;
			break;
		}
		if (e.parentType = i, a) return -1;
	}
	return e.bMarks[t] + e.tShift[t];
}
function Os(e, t, n, r) {
	let i = e.src, a = e.bMarks[t] + e.tShift[t], o = t + 1;
	if (e.sCount[t] - e.blkIndent >= 4 || i.charCodeAt(a) !== 91) return !1;
	let s = Es(e, t), c = "", l = -1, u = ++a;
	for (; a < s;) {
		if (c.length + a - u > ws * 2) return !1;
		let t = i.charCodeAt(a);
		if (t === 91) return !1;
		if (t === 93) {
			l = a;
			break;
		}
		if (t === 92 && (t = i.charCodeAt(++a)), t === 10 && a < s) {
			let t = Ds(e, o);
			if (t < 0) return !1;
			c += i.slice(u, s), a = u = t, s = Es(e, o++);
		} else a++;
	}
	if (l < 0 || i.charCodeAt(l + 1) !== 58 || (c += i.slice(u, l), c.length > ws && Ts(c) > ws)) return !1;
	for (a = l + 2; a < s;) {
		let t = i.charCodeAt(a);
		if (t === 10) {
			let t = Ds(e, o);
			if (t < 0) break;
			a = t, s = Es(e, o++);
		} else if (B(t)) a++;
		else break;
	}
	let d = e.md.helpers.parseLinkDestination(i, a, s);
	if (!d.ok) return !1;
	let f = e.md.normalizeLink(d.str);
	if (!e.md.validateLink(f)) return !1;
	a = d.pos;
	let p = a, m = s, h = o;
	for (; a < s;) {
		let t = i.charCodeAt(a);
		if (t === 10) {
			let t = Ds(e, o);
			if (t < 0) break;
			a = t, s = Es(e, o++);
		} else if (B(t)) a++;
		else break;
	}
	let g = a, _ = e.md.helpers.parseLinkTitle(i, a, s);
	for (; _.can_continue;) {
		let t = Ds(e, o);
		if (t < 0) break;
		a = t, s = Es(e, o++), _ = e.md.helpers.parseLinkTitle(i, a, s, _);
	}
	let v;
	for (g !== p && _.ok ? (v = _.str, a = _.pos) : (v = "", a = p, s = m, o = h); a < s && B(i.charCodeAt(a));) a++;
	if (a < s && i.charCodeAt(a) !== 10 && v) for (v = "", a = p, s = m, o = h; a < s && B(i.charCodeAt(a));) a++;
	if (a < s && i.charCodeAt(a) !== 10) return !1;
	let y = Eo(c);
	return y ? 
	/* istanbul ignore if */
	(r || (e.env.references === void 0 && (e.env.references = {}), e.env.references[y] === void 0 && (e.env.references[y] = {
		title: v,
		href: f
	}), e.line = o), !0) : !1;
}
// node_modules/markdown-it/lib/common/html_blocks.mjs
var ks = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), As = "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>", js = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
RegExp("^(?:" + As + "|" + js + "|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)");
var Ms = RegExp("^(?:" + As + "|" + js + ")"), Ns = [
	[
		/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
		/<\/(script|pre|style|textarea)>/i,
		!0
	],
	[
		/^<!--/,
		/-->/,
		!0
	],
	[
		/^<\?/,
		/\?>/,
		!0
	],
	[
		/^<![A-Za-z]/,
		/>/,
		!0
	],
	[
		/^<!\[CDATA\[/,
		/\]\]>/,
		!0
	],
	[
		RegExp("^</?(" + ks.join("|") + ")(?=(\\s|/?>|$))", "i"),
		/^$/,
		!0
	],
	[
		RegExp(Ms.source + "\\s*$"),
		/^$/,
		!1
	]
];
function Ps(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(i) !== 60) return !1;
	let o = e.src.slice(i, a), s = 0;
	for (; s < Ns.length && !Ns[s][0].test(o); s++);
	if (s === Ns.length) return !1;
	if (r) return Ns[s][2];
	let c = t + 1, l = Ns[s][1].test("");
	if (!Ns[s][1].test(o)) {
		for (; c < n && !(e.sCount[c] < e.blkIndent && (l || !e.isEmpty(c))); c++) if (i = e.bMarks[c] + e.tShift[c], a = e.eMarks[c], o = e.src.slice(i, a), Ns[s][1].test(o)) {
			o.length !== 0 && c++;
			break;
		}
	}
	e.line = c;
	let u = e.push("html_block", "", 0);
	return u.map = [t, c], u.content = e.getLines(t, c, e.blkIndent, !0), !0;
}
// node_modules/markdown-it/lib/rules_block/heading.mjs
function Fs(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let o = e.src.charCodeAt(i);
	if (o !== 35 || i >= a) return !1;
	let s = 1;
	for (o = e.src.charCodeAt(++i); o === 35 && i < a && s <= 6;) s++, o = e.src.charCodeAt(++i);
	if (s > 6 || i < a && !B(o)) return !1;
	if (r) return !0;
	a = e.skipSpacesBack(a, i);
	let c = e.skipCharsBack(a, 35, i);
	c > i && B(e.src.charCodeAt(c - 1)) && (a = c), e.line = t + 1;
	let l = e.push("heading_open", "h" + String(s), 1);
	l.markup = "########".slice(0, s), l.map = [t, e.line];
	let u = e.push("inline", "", 0);
	u.content = Oo(e.src.slice(i, a)), u.map = [t, e.line], u.children = [];
	let d = e.push("heading_close", "h" + String(s), -1);
	return d.markup = "########".slice(0, s), !0;
}
// node_modules/markdown-it/lib/rules_block/lheading.mjs
function Is(e, t, n) {
	let r = e.md.block.ruler.getRules("paragraph");
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let i = e.parentType;
	e.parentType = "paragraph";
	let a = 0, o, s = t + 1;
	for (; s < n && !e.isEmpty(s); s++) {
		if (e.sCount[s] - e.blkIndent > 3) continue;
		if (e.sCount[s] >= e.blkIndent) {
			let t = e.bMarks[s] + e.tShift[s], n = e.eMarks[s];
			if (t < n && (o = e.src.charCodeAt(t), (o === 45 || o === 61) && (t = e.skipChars(t, o), t = e.skipSpaces(t), t >= n))) {
				a = o === 61 ? 1 : 2;
				break;
			}
		}
		if (e.sCount[s] < 0) continue;
		let t = !1;
		for (let i = 0, a = r.length; i < a; i++) if (r[i](e, s, n, !0)) {
			t = !0;
			break;
		}
		if (t) break;
	}
	if (!a) return e.parentType = i, !1;
	let c = Oo(e.getLines(t, s, e.blkIndent, !1));
	e.line = s + 1;
	let l = e.push("heading_open", "h" + String(a), 1);
	l.markup = String.fromCharCode(o), l.map = [t, e.line];
	let u = e.push("inline", "", 0);
	u.content = c, u.map = [t, e.line - 1], u.children = [];
	let d = e.push("heading_close", "h" + String(a), -1);
	return d.markup = String.fromCharCode(o), e.parentType = i, !0;
}
// node_modules/markdown-it/lib/rules_block/paragraph.mjs
function Ls(e, t, n) {
	let r = e.md.block.ruler.getRules("paragraph"), i = e.parentType, a = t + 1;
	for (e.parentType = "paragraph"; a < n && !e.isEmpty(a); a++) {
		if (e.sCount[a] - e.blkIndent > 3 || e.sCount[a] < 0) continue;
		let t = !1;
		for (let i = 0, o = r.length; i < o; i++) if (r[i](e, a, n, !0)) {
			t = !0;
			break;
		}
		if (t) break;
	}
	let o = Oo(e.getLines(t, a, e.blkIndent, !1));
	e.line = a;
	let s = e.push("paragraph_open", "p", 1);
	s.map = [t, e.line];
	let c = e.push("inline", "", 0);
	return c.content = o, c.map = [t, e.line], c.children = [], e.push("paragraph_close", "p", -1), e.parentType = i, !0;
}
// node_modules/markdown-it/lib/parser_block.mjs
var Rs = [
	[
		"table",
		hs,
		["paragraph", "reference"]
	],
	["code", gs],
	[
		"fence",
		_s,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"blockquote",
		vs,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"hr",
		ys,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"list",
		Cs,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["reference", Os],
	[
		"html_block",
		Ps,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	[
		"heading",
		Fs,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["lheading", Is],
	["paragraph", Ls]
];
function zs() {
	this.ruler = new V();
	for (let e = 0; e < Rs.length; e++) this.ruler.push(Rs[e][0], Rs[e][1], { alt: (Rs[e][2] || []).slice() });
}
zs.prototype.tokenize = function(e, t, n) {
	let r = this.ruler.getRules(""), i = r.length, a = e.md.options.maxNesting, o = t, s = !1;
	for (; o < n && (e.line = o = e.skipEmptyLines(o), !(o >= n || e.sCount[o] < e.blkIndent));) {
		if (e.level >= a) {
			e.line = n;
			break;
		}
		let t = e.line, c = !1;
		for (let a = 0; a < i; a++) if (c = r[a](e, o, n, !1), c) {
			if (t >= e.line) throw Error("block rule didn't increment state.line");
			break;
		}
		if (!c) throw Error("none of the block rules matched");
		e.tight = !s, e.isEmpty(e.line - 1) && (s = !0), o = e.line, o < n && e.isEmpty(o) && (s = !0, o++, e.line = o);
	}
}, zs.prototype.parse = function(e, t, n, r) {
	if (!e) return;
	let i = new this.State(e, t, n, r);
	this.tokenize(i, i.line, i.lineMax);
}, zs.prototype.State = ds;
// node_modules/markdown-it/lib/rules_inline/state_inline.mjs
function Bs(e, t, n, r) {
	this.src = e, this.env = n, this.md = t, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.skipHtmlSpecial = !1, this.linkLevel = 0;
}
Bs.prototype.pushPending = function() {
	let e = new H("text", "", 0);
	return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
}, Bs.prototype.push = function(e, t, n) {
	this.pending && this.pushPending();
	let r = new H(e, t, n), i = null;
	return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], i = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(i), r;
}, Bs.prototype.scanDelims = function(e, t) {
	let n = this.posMax, r = this.src.charCodeAt(e), i;
	if (e === 0) i = 32;
	else if (e === 1) i = this.src.charCodeAt(0), (i & 63488) == 55296 && (i = 65533);
	else if (i = this.src.charCodeAt(e - 1), (i & 64512) == 56320) {
		let t = this.src.charCodeAt(e - 2);
		i = (t & 64512) == 55296 ? 65536 + (t - 55296 << 10) + (i - 56320) : 65533;
	} else (i & 64512) == 55296 && (i = 65533);
	let a = e;
	for (; a < n && this.src.charCodeAt(a) === r;) a++;
	let o = a - e, s = a < n ? this.src.charCodeAt(a) : 32;
	if ((s & 64512) == 55296) {
		let e = this.src.charCodeAt(a + 1);
		s = (e & 64512) == 56320 ? 65536 + (s - 55296 << 10) + (e - 56320) : 65533;
	} else (s & 64512) == 56320 && (s = 65533);
	let c = To(i) || wo(i), l = To(s) || wo(s), u = So(i), d = So(s), f = !d && (!l || u || c), p = !u && (!c || d || l);
	return {
		can_open: f && (t || !p || c),
		can_close: p && (t || !f || l),
		length: o
	};
}, Bs.prototype.Token = H;
// node_modules/markdown-it/lib/rules_inline/text.mjs
function Vs(e) {
	switch (e) {
		case 10:
		case 33:
		case 35:
		case 36:
		case 37:
		case 38:
		case 42:
		case 43:
		case 45:
		case 58:
		case 60:
		case 61:
		case 62:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 125:
		case 126: return !0;
		default: return !1;
	}
}
function Hs(e, t) {
	let n = e.pos;
	for (; n < e.posMax && !Vs(e.src.charCodeAt(n));) n++;
	return n !== e.pos && (t || (e.pending += e.src.slice(e.pos, n)), e.pos = n, !0);
}
// node_modules/markdown-it/lib/rules_inline/linkify.mjs
function Us(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function Ws(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 45 || e === 46;
}
function Gs(e, t) {
	if (!e.md.options.linkify || e.linkLevel > 0) return !1;
	let n = e.pos, r = e.posMax;
	if (n + 3 > r || e.src.charCodeAt(n) !== 58 || e.src.charCodeAt(n + 1) !== 47 || e.src.charCodeAt(n + 2) !== 47) return !1;
	let i = n - Math.min(10, e.pending.length, n), a = n;
	for (; a > i && Ws(e.src.charCodeAt(a - 1));) a--;
	if (a === n || !Us(e.src.charCodeAt(a))) return !1;
	let o = n - a, s = e.md.linkify.matchAtStart(e.src.slice(a));
	if (!s) return !1;
	let c = s.url;
	if (c.length <= o) return !1;
	let l = c.length;
	for (; l > 0 && c.charCodeAt(l - 1) === 42;) l--;
	l !== c.length && (c = c.slice(0, l));
	let u = e.md.normalizeLink(c);
	if (!e.md.validateLink(u)) return !1;
	if (!t) {
		e.pending = e.pending.slice(0, -o);
		let t = e.push("link_open", "a", 1);
		t.attrs = [["href", u]], t.markup = "linkify", t.info = "auto";
		let n = e.push("text", "", 0);
		n.content = e.md.normalizeLinkText(c);
		let r = e.push("link_close", "a", -1);
		r.markup = "linkify", r.info = "auto";
	}
	return e.pos += c.length - o, !0;
}
// node_modules/markdown-it/lib/rules_inline/newline.mjs
function Ks(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 10) return !1;
	let r = e.pending.length - 1, i = e.posMax;
	if (!t) {
		if (r >= 0 && e.pending.charCodeAt(r) === 32) {
			if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
				let t = r - 1;
				for (; t >= 1 && e.pending.charCodeAt(t - 1) === 32;) t--;
				e.pending = e.pending.slice(0, t), e.push("hardbreak", "br", 0);
			} else e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
		} else e.push("softbreak", "br", 0);
	}
	for (n++; n < i && B(e.src.charCodeAt(n));) n++;
	return e.pos = n, !0;
}
// node_modules/markdown-it/lib/rules_inline/escape.mjs
var qs = [];
for (let e = 0; e < 256; e++) qs.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
	qs[e.charCodeAt(0)] = 1;
});
function Js(e, t) {
	let n = e.pos, r = e.posMax;
	if (e.src.charCodeAt(n) !== 92 || (n++, n >= r)) return !1;
	let i = e.src.charCodeAt(n);
	if (i === 10) {
		for (t || e.push("hardbreak", "br", 0), n++; n < r && (i = e.src.charCodeAt(n), B(i));) n++;
		return e.pos = n, !0;
	}
	if (i === 32) {
		if (!t) {
			let t = e.push("text_special", "", 0);
			t.content = "\\", t.markup = "\\", t.info = "escape";
		}
		return e.pos = n, !0;
	}
	let a = e.src[n];
	if (i >= 55296 && i <= 56319 && n + 1 < r) {
		let t = e.src.charCodeAt(n + 1);
		t >= 56320 && t <= 57343 && (a += e.src[n + 1], n++);
	}
	let o = "\\" + a;
	if (!t) {
		let t = e.push("text_special", "", 0);
		t.content = i < 256 && qs[i] !== 0 ? a : o, t.markup = o, t.info = "escape";
	}
	return e.pos = n + 1, !0;
}
// node_modules/markdown-it/lib/rules_inline/backticks.mjs
function Ys(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 96) return !1;
	let r = n;
	n++;
	let i = e.posMax;
	for (; n < i && e.src.charCodeAt(n) === 96;) n++;
	let a = e.src.slice(r, n), o = a.length;
	if (e.backticksScanned && (e.backticks[o] || 0) <= r) return t || (e.pending += a), e.pos += o, !0;
	let s = n, c;
	for (; (c = e.src.indexOf("`", s)) !== -1;) {
		for (s = c + 1; s < i && e.src.charCodeAt(s) === 96;) s++;
		let r = s - c;
		if (r === o) {
			if (!t) {
				let t = e.push("code_inline", "code", 0);
				t.markup = a, t.content = e.src.slice(n, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
			}
			return e.pos = s, !0;
		}
		e.backticks[r] = c;
	}
	return e.backticksScanned = !0, t || (e.pending += a), e.pos += o, !0;
}
// node_modules/markdown-it/lib/rules_inline/strikethrough.mjs
function Xs(e, t) {
	let n = e.pos, r = e.src.charCodeAt(n);
	if (t || r !== 126) return !1;
	let i = e.scanDelims(e.pos, !0), a = i.length, o = String.fromCharCode(r);
	if (a < 2) return !1;
	let s;
	a % 2 && (s = e.push("text", "", 0), s.content = o, a--);
	for (let t = 0; t < a; t += 2) s = e.push("text", "", 0), s.content = o + o, e.delimiters.push({
		marker: r,
		length: 0,
		token: e.tokens.length - 1,
		end: -1,
		open: i.can_open,
		close: i.can_close
	});
	return e.pos += i.length, !0;
}
function Zs(e, t) {
	let n, r = [], i = t.length;
	for (let a = 0; a < i; a++) {
		let i = t[a];
		if (i.marker !== 126 || i.end === -1) continue;
		let o = t[i.end];
		n = e.tokens[i.token], n.type = "s_open", n.tag = "s", n.nesting = 1, n.markup = "~~", n.content = "", n = e.tokens[o.token], n.type = "s_close", n.tag = "s", n.nesting = -1, n.markup = "~~", n.content = "", e.tokens[o.token - 1].type === "text" && e.tokens[o.token - 1].content === "~" && r.push(o.token - 1);
	}
	for (; r.length;) {
		let t = r.pop(), i = t + 1;
		for (; i < e.tokens.length && e.tokens[i].type === "s_close";) i++;
		i--, t !== i && (n = e.tokens[i], e.tokens[i] = e.tokens[t], e.tokens[t] = n);
	}
}
function Qs(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	Zs(e, e.delimiters);
	for (let r = 0; r < n; r++) t[r] && t[r].delimiters && Zs(e, t[r].delimiters);
}
var $s = {
	tokenize: Xs,
	postProcess: Qs
};
// node_modules/markdown-it/lib/rules_inline/emphasis.mjs
function ec(e, t) {
	let n = e.pos, r = e.src.charCodeAt(n);
	if (t || r !== 95 && r !== 42) return !1;
	let i = e.scanDelims(e.pos, r === 42);
	for (let t = 0; t < i.length; t++) {
		let t = e.push("text", "", 0);
		t.content = String.fromCharCode(r), e.delimiters.push({
			marker: r,
			length: i.length,
			token: e.tokens.length - 1,
			end: -1,
			open: i.can_open,
			close: i.can_close
		});
	}
	return e.pos += i.length, !0;
}
function tc(e, t) {
	let n = t.length;
	for (let r = n - 1; r >= 0; r--) {
		let n = t[r];
		if (n.marker !== 95 && n.marker !== 42 || n.end === -1) continue;
		let i = t[n.end], a = r > 0 && t[r - 1].end === n.end + 1 && t[r - 1].marker === n.marker && t[r - 1].token === n.token - 1 && t[n.end + 1].token === i.token + 1, o = String.fromCharCode(n.marker), s = e.tokens[n.token];
		s.type = a ? "strong_open" : "em_open", s.tag = a ? "strong" : "em", s.nesting = 1, s.markup = a ? o + o : o, s.content = "";
		let c = e.tokens[i.token];
		c.type = a ? "strong_close" : "em_close", c.tag = a ? "strong" : "em", c.nesting = -1, c.markup = a ? o + o : o, c.content = "", a && (e.tokens[t[r - 1].token].content = "", e.tokens[t[n.end + 1].token].content = "", r--);
	}
}
function nc(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	tc(e, e.delimiters);
	for (let r = 0; r < n; r++) t[r] && t[r].delimiters && tc(e, t[r].delimiters);
}
var rc = {
	tokenize: ec,
	postProcess: nc
};
// node_modules/markdown-it/lib/rules_inline/link.mjs
function ic(e, t) {
	let n, r, i, a, o = "", s = "", c = e.pos, l = !0;
	if (e.src.charCodeAt(e.pos) !== 91) return !1;
	let u = e.pos, d = e.posMax, f = e.pos + 1, p = e.md.helpers.parseLinkLabel(e, e.pos, !0);
	if (p < 0) return !1;
	let m = p + 1;
	if (m < d && e.src.charCodeAt(m) === 40) {
		for (l = !1, m++; m < d && (n = e.src.charCodeAt(m), B(n) || n === 10); m++);
		if (m >= d) return !1;
		if (c = m, i = e.md.helpers.parseLinkDestination(e.src, m, e.posMax), i.ok) {
			for (o = e.md.normalizeLink(i.str), e.md.validateLink(o) ? m = i.pos : o = "", c = m; m < d && (n = e.src.charCodeAt(m), B(n) || n === 10); m++);
			if (i = e.md.helpers.parseLinkTitle(e.src, m, e.posMax), m < d && c !== m && i.ok) for (s = i.str, m = i.pos; m < d && (n = e.src.charCodeAt(m), B(n) || n === 10); m++);
		}
		(m >= d || e.src.charCodeAt(m) !== 41) && (l = !0), m++;
	}
	if (l) {
		if (e.env.references === void 0) return !1;
		if (m < d && e.src.charCodeAt(m) === 91 ? (c = m + 1, m = e.md.helpers.parseLinkLabel(e, m), m >= 0 ? r = e.src.slice(c, m++) : m = p + 1) : m = p + 1, r ||= e.src.slice(f, p), a = e.env.references[Eo(r)], !a) return e.pos = u, !1;
		o = a.href, s = a.title;
	}
	if (!t) {
		e.pos = f, e.posMax = p;
		let t = e.push("link_open", "a", 1), n = [["href", o]];
		t.attrs = n, s && n.push(["title", s]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
	}
	return e.pos = m, e.posMax = d, !0;
}
// node_modules/markdown-it/lib/rules_inline/image.mjs
function ac(e, t) {
	let n, r, i, a, o, s, c, l, u = "", d = e.pos, f = e.posMax;
	if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91) return !1;
	let p = e.pos + 2, m = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
	if (m < 0) return !1;
	if (a = m + 1, a < f && e.src.charCodeAt(a) === 40) {
		for (a++; a < f && (n = e.src.charCodeAt(a), B(n) || n === 10); a++);
		if (a >= f) return !1;
		for (l = a, s = e.md.helpers.parseLinkDestination(e.src, a, e.posMax), s.ok && (u = e.md.normalizeLink(s.str), e.md.validateLink(u) ? a = s.pos : u = ""), l = a; a < f && (n = e.src.charCodeAt(a), B(n) || n === 10); a++);
		if (s = e.md.helpers.parseLinkTitle(e.src, a, e.posMax), a < f && l !== a && s.ok) for (c = s.str, a = s.pos; a < f && (n = e.src.charCodeAt(a), B(n) || n === 10); a++);
		else c = "";
		if (a >= f || e.src.charCodeAt(a) !== 41) return e.pos = d, !1;
		a++;
	} else {
		if (e.env.references === void 0) return !1;
		if (a < f && e.src.charCodeAt(a) === 91 ? (l = a + 1, a = e.md.helpers.parseLinkLabel(e, a), a >= 0 ? i = e.src.slice(l, a++) : a = m + 1) : a = m + 1, i ||= e.src.slice(p, m), o = e.env.references[Eo(i)], !o) return e.pos = d, !1;
		u = o.href, c = o.title;
	}
	if (!t) {
		r = e.src.slice(p, m);
		let t = [];
		e.md.inline.parse(r, e.md, e.env, t);
		let n = e.push("image", "img", 0), i = [["src", u], ["alt", ""]];
		n.attrs = i, n.children = t, n.content = r, c && i.push(["title", c]);
	}
	return e.pos = a, e.posMax = f, !0;
}
// node_modules/markdown-it/lib/rules_inline/autolink.mjs
var oc = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, sc = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function cc(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 60) return !1;
	let r = e.pos, i = e.posMax;
	for (;;) {
		if (++n >= i) return !1;
		let t = e.src.charCodeAt(n);
		if (t === 60) return !1;
		if (t === 62) break;
	}
	let a = e.src.slice(r + 1, n);
	if (sc.test(a)) {
		let n = e.md.normalizeLink(a);
		if (!e.md.validateLink(n)) return !1;
		if (!t) {
			let t = e.push("link_open", "a", 1);
			t.attrs = [["href", n]], t.markup = "autolink", t.info = "auto";
			let r = e.push("text", "", 0);
			r.content = e.md.normalizeLinkText(a);
			let i = e.push("link_close", "a", -1);
			i.markup = "autolink", i.info = "auto";
		}
		return e.pos += a.length + 2, !0;
	}
	if (oc.test(a)) {
		let n = e.md.normalizeLink("mailto:" + a);
		if (!e.md.validateLink(n)) return !1;
		if (!t) {
			let t = e.push("link_open", "a", 1);
			t.attrs = [["href", n]], t.markup = "autolink", t.info = "auto";
			let r = e.push("text", "", 0);
			r.content = e.md.normalizeLinkText(a);
			let i = e.push("link_close", "a", -1);
			i.markup = "autolink", i.info = "auto";
		}
		return e.pos += a.length + 2, !0;
	}
	return !1;
}
// node_modules/markdown-it/lib/rules_inline/html_inline.mjs
function lc(e) {
	return /^<a[>\s]/i.test(e);
}
function uc(e) {
	return /^<\/a\s*>/i.test(e);
}
function dc(e) {
	let t = e | 32;
	return t >= 97 && t <= 122;
}
function fc(e, t) {
	let n = e.src, r, i;
	if (n.startsWith("<!--", t)) {
		if (n.startsWith(">", t + 4)) return t + 5;
		if (n.startsWith("->", t + 4)) return t + 6;
		r = t + 4, i = "-->";
	} else if (n.startsWith("<![CDATA[", t)) r = t + 9, i = "]]>";
	else if (n.charCodeAt(t + 1) === 63) r = t + 2, i = "?>";
	else if (dc(n.charCodeAt(t + 2))) r = t + 3, i = ">";
	else return -1;
	if (e.skipHtmlSpecial) return -1;
	let a = n.indexOf(i, r);
	return a < 0 ? (e.skipHtmlSpecial = !0, -1) : a + i.length;
}
function pc(e, t) {
	if (!e.md.options.html) return !1;
	let n = e.posMax, r = e.pos;
	if (e.src.charCodeAt(r) !== 60 || r + 2 >= n) return !1;
	let i, a = e.src.charCodeAt(r + 1);
	if (a === 33 || a === 63) i = fc(e, r);
	else if (a === 47 || dc(a)) {
		let t = e.src.slice(r).match(Ms);
		i = t ? r + t[0].length : -1;
	} else return !1;
	if (i < 0) return !1;
	if (!t) {
		let t = e.push("html_inline", "", 0);
		t.content = e.src.slice(r, i), lc(t.content) && e.linkLevel++, uc(t.content) && e.linkLevel--;
	}
	return e.pos = i, !0;
}
// node_modules/markdown-it/lib/rules_inline/entity.mjs
var mc = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, hc = /^&([a-z][a-z0-9]{1,31});/i;
function gc(e, t) {
	let n = e.pos, r = e.posMax;
	if (e.src.charCodeAt(n) !== 38 || n + 1 >= r) return !1;
	if (e.src.charCodeAt(n + 1) === 35) {
		let r = e.src.slice(n).match(mc);
		if (r) {
			if (!t) {
				let t = r[1][0].toLowerCase() === "x" ? parseInt(r[1].slice(1), 16) : parseInt(r[1], 10), n = e.push("text_special", "", 0);
				n.content = oo(t) ? so(t) : so(65533), n.markup = r[0], n.info = "entity";
			}
			return e.pos += r[0].length, !0;
		}
	} else {
		let r = e.src.slice(n).match(hc);
		if (r) {
			let n = Qa(r[0]);
			if (n !== r[0]) {
				if (!t) {
					let t = e.push("text_special", "", 0);
					t.content = n, t.markup = r[0], t.info = "entity";
				}
				return e.pos += r[0].length, !0;
			}
		}
	}
	return !1;
}
// node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs
function _c(e) {
	let t = {}, n = e.length;
	if (!n) return;
	let r = 0, i = -2, a = [];
	for (let o = 0; o < n; o++) {
		let n = e[o];
		if (a.push(0), (e[r].marker !== n.marker || i !== n.token - 1) && (r = o), i = n.token, n.length = n.length || 0, !n.close) continue;
		t.hasOwnProperty(n.marker) || (t[n.marker] = [
			-1,
			-1,
			-1,
			-1,
			-1,
			-1
		]);
		let s = t[n.marker][(n.open ? 3 : 0) + n.length % 3], c = r - a[r] - 1, l = c;
		for (; c > s; c -= a[c] + 1) {
			let t = e[c];
			if (t.marker === n.marker && t.open && t.end < 0) {
				let r = !1;
				if ((t.close || n.open) && (t.length + n.length) % 3 == 0 && (t.length % 3 != 0 || n.length % 3 != 0) && (r = !0), !r) {
					let r = c > 0 && !e[c - 1].open ? a[c - 1] + 1 : 0;
					a[o] = o - c + r, a[c] = r, n.open = !1, t.end = o, t.close = !1, l = -1, i = -2;
					break;
				}
			}
		}
		l !== -1 && (t[n.marker][(n.open ? 3 : 0) + (n.length || 0) % 3] = l);
	}
}
function vc(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	_c(e.delimiters);
	for (let e = 0; e < n; e++) t[e] && t[e].delimiters && _c(t[e].delimiters);
}
// node_modules/markdown-it/lib/rules_inline/fragments_join.mjs
function yc(e) {
	let t, n, r = 0, i = e.tokens, a = e.tokens.length;
	for (t = n = 0; t < a; t++) i[t].nesting < 0 && r--, i[t].level = r, i[t].nesting > 0 && r++, i[t].type === "text" && t + 1 < a && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
	t !== n && (i.length = n);
}
// node_modules/markdown-it/lib/parser_inline.mjs
var bc = [
	["text", Hs],
	["linkify", Gs],
	["newline", Ks],
	["escape", Js],
	["backticks", Ys],
	["strikethrough", $s.tokenize],
	["emphasis", rc.tokenize],
	["link", ic],
	["image", ac],
	["autolink", cc],
	["html_inline", pc],
	["entity", gc]
], xc = [
	["balance_pairs", vc],
	["strikethrough", $s.postProcess],
	["emphasis", rc.postProcess],
	["fragments_join", yc]
];
function Sc() {
	this.ruler = new V();
	for (let e = 0; e < bc.length; e++) this.ruler.push(bc[e][0], bc[e][1]);
	this.ruler2 = new V();
	for (let e = 0; e < xc.length; e++) this.ruler2.push(xc[e][0], xc[e][1]);
}
Sc.prototype.skipToken = function(e) {
	let t = e.pos, n = this.ruler.getRules(""), r = n.length, i = e.md.options.maxNesting, a = e.cache;
	if (a[t] !== void 0) {
		e.pos = a[t];
		return;
	}
	let o = !1;
	if (e.level < i) {
		for (let i = 0; i < r; i++) if (e.level++, o = n[i](e, !0), e.level--, o) {
			if (t >= e.pos) throw Error("inline rule didn't increment state.pos");
			break;
		}
	} else e.pos = e.posMax;
	o || e.pos++, a[t] = e.pos;
}, Sc.prototype.tokenize = function(e) {
	let t = this.ruler.getRules(""), n = t.length, r = e.posMax, i = e.md.options.maxNesting;
	for (; e.pos < r;) {
		let a = e.pos, o = !1;
		if (e.level < i) {
			for (let r = 0; r < n; r++) if (o = t[r](e, !1), o) {
				if (a >= e.pos) throw Error("inline rule didn't increment state.pos");
				break;
			}
		}
		if (o) {
			if (e.pos >= r) break;
		} else e.pending += e.src[e.pos++];
	}
	e.pending && e.pushPending();
}, Sc.prototype.parse = function(e, t, n, r) {
	let i = new this.State(e, t, n, r);
	this.tokenize(i);
	let a = this.ruler2.getRules(""), o = a.length;
	for (let e = 0; e < o; e++) a[e](i);
}, Sc.prototype.State = Bs;
// node_modules/linkify-it/lib/re.mjs
function Cc(e) {
	let t = {};
	e ||= {}, t.src_Any = Oa.source, t.src_Cc = ka.source, t.src_Z = Na.source, t.src_P = ja.source, t.src_ZPCc = [
		t.src_Z,
		t.src_P,
		t.src_Cc
	].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
	let n = "[><｜]";
	return t.src_pseudo_letter = `(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`, t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = `(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`, t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = `(?=$|${n}|${t.src_ZPCc})(?!${e["---"] ? "-(?!--)|" : "-|"}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`, t.src_path = `(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|` + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + `,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`, t.src_email_name = "[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\\"\\.a-zA-Z0-9_]{0,63}", t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = "(?:" + t.src_xn + `|${t.src_pseudo_letter}{1,63})`, t.src_domain = "(?:" + t.src_xn + `|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`, t.src_host = `(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`, t.tpl_host_fuzzy = "(?:" + t.src_ip4 + `|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`, t.tpl_host_no_ip_fuzzy = `(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`, t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = `localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`, t.tpl_email_fuzzy = `(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`, t.tpl_link_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_fuzzy_strict}${t.src_path})`, t.tpl_link_no_ip_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`, t;
}
// node_modules/linkify-it/index.mjs
function wc(e) {
	return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
		t && Object.keys(t).forEach(function(n) {
			e[n] = t[n];
		});
	}), e;
}
function Tc(e) {
	return Object.prototype.toString.call(e);
}
function Ec(e) {
	return Tc(e) === "[object String]";
}
function Dc(e) {
	return Tc(e) === "[object Object]";
}
function Oc(e) {
	return Tc(e) === "[object RegExp]";
}
function kc(e) {
	return Tc(e) === "[object Function]";
}
function Ac(e) {
	return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var jc = {
	fuzzyLink: !0,
	fuzzyEmail: !0,
	fuzzyIP: !1
};
function Mc(e) {
	return Object.keys(e || {}).reduce(function(e, t) {
		return e || jc.hasOwnProperty(t);
	}, !1);
}
var Nc = {
	"http:": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.http || (n.re.http = RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`, "i")), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
	} },
	"https:": "http:",
	"ftp:": "http:",
	"//": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.no_http || (n.re.no_http = RegExp("^" + n.re.src_auth + `(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})` + n.re.src_port + n.re.src_host_terminator + n.re.src_path, "i")), n.re.no_http.test(r) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
	} },
	"mailto:": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.mailto || (n.re.mailto = RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`, "i")), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
	} }
}, Pc = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Fc = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Ic(e) {
	return function(t, n) {
		let r = t.slice(n);
		return e.test(r) ? r.match(e)[0].length : 0;
	};
}
function Lc() {
	return function(e, t) {
		t.normalize(e);
	};
}
function Rc(e) {
	let t = e.re = Cc(e.__opts__), n = e.__tlds__.slice();
	e.onCompile(), e.__tlds_replaced__ || n.push(Pc), n.push(t.src_xn), t.src_tlds = n.join("|");
	function r(e) {
		return e.replace("%TLDS%", t.src_tlds);
	}
	t.email_fuzzy = RegExp(r(t.tpl_email_fuzzy), "i"), t.email_fuzzy_global = RegExp(r(t.tpl_email_fuzzy), "ig"), t.link_fuzzy = RegExp(r(t.tpl_link_fuzzy), "i"), t.link_fuzzy_global = RegExp(r(t.tpl_link_fuzzy), "ig"), t.link_no_ip_fuzzy = RegExp(r(t.tpl_link_no_ip_fuzzy), "i"), t.link_no_ip_fuzzy_global = RegExp(r(t.tpl_link_no_ip_fuzzy), "ig"), t.host_fuzzy_test = RegExp(r(t.tpl_host_fuzzy_test), "i");
	let i = [];
	e.__compiled__ = {};
	function a(e, t) {
		throw Error(`(LinkifyIt) Invalid schema "${e}": ${t}`);
	}
	Object.keys(e.__schemas__).forEach(function(t) {
		let n = e.__schemas__[t];
		if (n === null) return;
		let r = {
			validate: null,
			link: null
		};
		e.__compiled__[t] = r, Dc(n) ? (Oc(n.validate) ? r.validate = Ic(n.validate) : kc(n.validate) ? r.validate = n.validate : a(t, n), kc(n.normalize) ? r.normalize = n.normalize : n.normalize ? a(t, n) : r.normalize = Lc()) : Ec(n) ? i.push(t) : a(t, n);
	}), i.forEach(function(t) {
		e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize);
	}), e.__compiled__[""] = {
		validate: null,
		normalize: Lc()
	};
	let o = Object.keys(e.__compiled__).filter(function(t) {
		return t.length > 0 && e.__compiled__[t];
	}).map(Ac).join("|");
	e.re.schema_test = RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`, "i"), e.re.schema_search = RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`, "ig"), e.re.schema_at_start = RegExp(`^${e.re.schema_search.source}`, "i"), e.re.pretest = RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`, "i");
}
function zc(e, t, n, r) {
	let i = e.slice(n, r);
	this.schema = t.toLowerCase(), this.index = n, this.lastIndex = r, this.raw = i, this.text = i, this.url = i;
}
function U(e, t) {
	if (!(this instanceof U)) return new U(e, t);
	t || Mc(e) && (t = e, e = {}), this.__opts__ = wc({}, jc, t), this.__schemas__ = wc({}, Nc, e), this.__compiled__ = {}, this.__tlds__ = Fc, this.__tlds_replaced__ = !1, this.re = {}, Rc(this);
}
U.prototype.add = function(e, t) {
	return this.__schemas__[e] = t, Rc(this), this;
}, U.prototype.set = function(e) {
	return this.__opts__ = wc(this.__opts__, e), this;
}, U.prototype.test = function(e) {
	if (!e.length) return !1;
	let t, n;
	if (this.re.schema_test.test(e)) {
		for (n = this.re.schema_search, n.lastIndex = 0; (t = n.exec(e)) !== null;) if (this.testSchemaAt(e, t[2], n.lastIndex)) return !0;
	}
	return !!(this.__opts__.fuzzyLink && this.__compiled__["http:"] && e.search(this.re.host_fuzzy_test) >= 0 && e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy) !== null || this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && e.indexOf("@") >= 0 && e.match(this.re.email_fuzzy) !== null);
}, U.prototype.pretest = function(e) {
	return this.re.pretest.test(e);
}, U.prototype.testSchemaAt = function(e, t, n) {
	return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, n, this) : 0;
}, U.prototype.match = function(e) {
	let t = [], n = [], r = [], i = [], a, o, s;
	function c(e, t) {
		return e ? t ? e.index === t.index ? e.lastIndex >= t.lastIndex ? e : t : e.index < t.index ? e : t : e : t;
	}
	if (!e.length) return null;
	if (this.re.schema_test.test(e)) for (s = this.re.schema_search, s.lastIndex = 0; (a = s.exec(e)) !== null;) o = this.testSchemaAt(e, a[2], s.lastIndex), o && n.push({
		schema: a[2],
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length + o
	});
	if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) for (s = this.__opts__.fuzzyIP ? this.re.link_fuzzy_global : this.re.link_no_ip_fuzzy_global, s.lastIndex = 0; (a = s.exec(e)) !== null;) r.push({
		schema: "",
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length
	});
	if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) for (s = this.re.email_fuzzy_global, s.lastIndex = 0; (a = s.exec(e)) !== null;) i.push({
		schema: "mailto:",
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length
	});
	let l = [
		0,
		0,
		0
	], u = 0;
	for (;;) {
		let a = [
			n[l[0]],
			i[l[1]],
			r[l[2]]
		], o = c(c(a[0], a[1]), a[2]);
		if (!o) break;
		if (o === a[0] ? l[0]++ : o === a[1] ? l[1]++ : l[2]++, o.index < u) continue;
		let s = new zc(e, o.schema, o.index, o.lastIndex);
		this.__compiled__[s.schema].normalize(s, this), t.push(s), u = o.lastIndex;
	}
	return t.length ? t : null;
}, U.prototype.matchAtStart = function(e) {
	if (!e.length) return null;
	let t = this.re.schema_at_start.exec(e);
	if (!t) return null;
	let n = this.testSchemaAt(e, t[2], t[0].length);
	if (!n) return null;
	let r = new zc(e, t[2], t.index + t[1].length, t.index + t[0].length + n);
	return this.__compiled__[r.schema].normalize(r, this), r;
}, U.prototype.tlds = function(e, t) {
	return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(e, t, n) {
		return e !== n[t - 1];
	}).reverse(), Rc(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, Rc(this), this);
}, U.prototype.normalize = function(e) {
	e.schema || (e.url = `http://${e.url}`), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = `mailto:${e.url}`);
}, U.prototype.onCompile = function() {};
// node_modules/punycode.js/punycode.es6.js
var Bc = 2147483647, Vc = 36, Hc = 1, Uc = 26, Wc = 38, Gc = 700, Kc = 72, qc = 128, Jc = "-", Yc = /^xn--/, Xc = /[^\0-\x7F]/, Zc = /[\x2E\u3002\uFF0E\uFF61]/g, Qc = {
	overflow: "Overflow: input needs wider integers to process",
	"not-basic": "Illegal input >= 0x80 (not a basic code point)",
	"invalid-input": "Invalid input"
}, $c = 35, el = Math.floor, tl = String.fromCharCode;
function nl(e) {
	throw RangeError(Qc[e]);
}
function rl(e, t) {
	let n = [], r = e.length;
	for (; r--;) n[r] = t(e[r]);
	return n;
}
function il(e, t) {
	let n = e.split("@"), r = "";
	n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(Zc, ".");
	let i = rl(e.split("."), t).join(".");
	return r + i;
}
function al(e) {
	let t = [], n = 0, r = e.length;
	for (; n < r;) {
		let i = e.charCodeAt(n++);
		if (i >= 55296 && i <= 56319 && n < r) {
			let r = e.charCodeAt(n++);
			(r & 64512) == 56320 ? t.push(((i & 1023) << 10) + (r & 1023) + 65536) : (t.push(i), n--);
		} else t.push(i);
	}
	return t;
}
var ol = (e) => String.fromCodePoint(...e), sl = function(e) {
	return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Vc;
}, cl = function(e, t) {
	return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, ll = function(e, t, n) {
	let r = 0;
	for (e = n ? el(e / Gc) : e >> 1, e += el(e / t); e > 455; r += Vc) e = el(e / $c);
	return el(r + 36 * e / (e + Wc));
}, ul = function(e) {
	let t = [], n = e.length, r = 0, i = qc, a = Kc, o = e.lastIndexOf(Jc);
	o < 0 && (o = 0);
	for (let n = 0; n < o; ++n) e.charCodeAt(n) >= 128 && nl("not-basic"), t.push(e.charCodeAt(n));
	for (let s = o > 0 ? o + 1 : 0; s < n;) {
		let o = r;
		for (let t = 1, i = Vc;; i += Vc) {
			s >= n && nl("invalid-input");
			let o = sl(e.charCodeAt(s++));
			o >= Vc && nl("invalid-input"), o > el((Bc - r) / t) && nl("overflow"), r += o * t;
			let c = i <= a ? Hc : i >= a + Uc ? Uc : i - a;
			if (o < c) break;
			let l = Vc - c;
			t > el(Bc / l) && nl("overflow"), t *= l;
		}
		let c = t.length + 1;
		a = ll(r - o, c, o == 0), el(r / c) > Bc - i && nl("overflow"), i += el(r / c), r %= c, t.splice(r++, 0, i);
	}
	return String.fromCodePoint(...t);
}, dl = function(e) {
	let t = [];
	e = al(e);
	let n = e.length, r = qc, i = 0, a = Kc;
	for (let n of e) n < 128 && t.push(tl(n));
	let o = t.length, s = o;
	for (o && t.push(Jc); s < n;) {
		let n = Bc;
		for (let t of e) t >= r && t < n && (n = t);
		let c = s + 1;
		n - r > el((Bc - i) / c) && nl("overflow"), i += (n - r) * c, r = n;
		for (let n of e) if (n < r && ++i > Bc && nl("overflow"), n === r) {
			let e = i;
			for (let n = Vc;; n += Vc) {
				let r = n <= a ? Hc : n >= a + Uc ? Uc : n - a;
				if (e < r) break;
				let i = e - r, o = Vc - r;
				t.push(tl(cl(r + i % o, 0))), e = el(i / o);
			}
			t.push(tl(cl(e, 0))), a = ll(i, c, s === o), i = 0, ++s;
		}
		++i, ++r;
	}
	return t.join("");
}, fl = {
	version: "2.3.1",
	ucs2: {
		decode: al,
		encode: ol
	},
	decode: ul,
	encode: dl,
	toASCII: function(e) {
		return il(e, function(e) {
			return Xc.test(e) ? "xn--" + dl(e) : e;
		});
	},
	toUnicode: function(e) {
		return il(e, function(e) {
			return Yc.test(e) ? ul(e.slice(4).toLowerCase()) : e;
		});
	}
}, pl = {
	default: {
		options: {
			html: !1,
			xhtmlOut: !1,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 100
		},
		components: {
			core: {},
			block: {},
			inline: {}
		}
	},
	zero: {
		options: {
			html: !1,
			xhtmlOut: !1,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: ["paragraph"] },
			inline: {
				rules: ["text"],
				rules2: ["balance_pairs", "fragments_join"]
			}
		}
	},
	commonmark: {
		options: {
			html: !0,
			xhtmlOut: !0,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: [
				"blockquote",
				"code",
				"fence",
				"heading",
				"hr",
				"html_block",
				"lheading",
				"list",
				"reference",
				"paragraph"
			] },
			inline: {
				rules: [
					"autolink",
					"backticks",
					"emphasis",
					"entity",
					"escape",
					"html_inline",
					"image",
					"link",
					"newline",
					"text"
				],
				rules2: [
					"balance_pairs",
					"emphasis",
					"fragments_join"
				]
			}
		}
	}
}, ml = /^(vbscript|javascript|file|data):/, hl = /^data:image\/(gif|png|jpeg|webp);/;
function gl(e) {
	let t = e.trim().toLowerCase();
	return !ml.test(t) || hl.test(t);
}
var _l = [
	"http:",
	"https:",
	"mailto:"
];
function vl(e) {
	let t = Ea(e, !0);
	if (t.hostname && (!t.protocol || _l.indexOf(t.protocol) >= 0)) try {
		t.hostname = fl.toASCII(t.hostname);
	} catch {}
	return pa(ma(t));
}
function yl(e) {
	let t = Ea(e, !0);
	if (t.hostname && (!t.protocol || _l.indexOf(t.protocol) >= 0)) try {
		t.hostname = fl.toUnicode(t.hostname);
	} catch {}
	return ua(ma(t), ua.defaultChars + "%");
}
function W(e, t) {
	if (!(this instanceof W)) return new W(e, t);
	t || to(e) || (t = e || {}, e = "default"), this.inline = new Sc(), this.block = new zs(), this.core = new us(), this.renderer = new Fo(), this.linkify = new U(), this.validateLink = gl, this.normalizeLink = vl, this.normalizeLinkText = yl, this.utils = $a, this.helpers = io({}, No), this.options = {}, this.configure(e), t && this.set(t);
}
W.prototype.set = function(e) {
	return io(this.options, e), this;
}, W.prototype.configure = function(e) {
	let t = this;
	if (to(e)) {
		let t = e;
		if (e = pl[t], !e) throw Error("Wrong `markdown-it` preset \"" + t + "\", check name");
	}
	if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
	return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(n) {
		e.components[n].rules && t[n].ruler.enableOnly(e.components[n].rules), e.components[n].rules2 && t[n].ruler2.enableOnly(e.components[n].rules2);
	}), this;
}, W.prototype.enable = function(e, t) {
	let n = [];
	Array.isArray(e) || (e = [e]), [
		"core",
		"block",
		"inline"
	].forEach(function(t) {
		n = n.concat(this[t].ruler.enable(e, !0));
	}, this), n = n.concat(this.inline.ruler2.enable(e, !0));
	let r = e.filter(function(e) {
		return n.indexOf(e) < 0;
	});
	if (r.length && !t) throw Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
	return this;
}, W.prototype.disable = function(e, t) {
	let n = [];
	Array.isArray(e) || (e = [e]), [
		"core",
		"block",
		"inline"
	].forEach(function(t) {
		n = n.concat(this[t].ruler.disable(e, !0));
	}, this), n = n.concat(this.inline.ruler2.disable(e, !0));
	let r = e.filter(function(e) {
		return n.indexOf(e) < 0;
	});
	if (r.length && !t) throw Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
	return this;
}, W.prototype.use = function(e) {
	let t = [this].concat(Array.prototype.slice.call(arguments, 1));
	return e.apply(e, t), this;
}, W.prototype.parse = function(e, t) {
	if (typeof e != "string") throw Error("Input data should be a String");
	let n = new this.core.State(e, this, t);
	return this.core.process(n), n.tokens;
}, W.prototype.render = function(e, t) {
	return t ||= {}, this.renderer.render(this.parse(e, t), this.options, t);
}, W.prototype.parseInline = function(e, t) {
	let n = new this.core.State(e, this, t);
	return n.inlineMode = !0, this.core.process(n), n.tokens;
}, W.prototype.renderInline = function(e, t) {
	return t ||= {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
// node_modules/dompurify/dist/purify.es.mjs
function bl(e, t) {
	this.v = e, this.k = t;
}
function xl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Sl(e) {
	if (Array.isArray(e)) return e;
}
function Cl(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function wl() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Tl(e, t) {
	return Sl(e) || Cl(e, t) || El(e, t) || wl();
}
function El(e, t) {
	if (e) {
		if (typeof e == "string") return xl(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xl(e, t) : void 0;
	}
}
function Dl(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof bl;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
Dl.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, Dl.prototype.next = function(e) {
	return this._invoke("next", e);
}, Dl.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, Dl.prototype.return = function(e) {
	return this._invoke("return", e);
};
var Ol = Object.entries, kl = Object.setPrototypeOf, Al = Object.isFrozen, jl = Object.getPrototypeOf, Ml = Object.getOwnPropertyDescriptor, G = Object.freeze, K = Object.seal, Nl = Object.create, Pl = typeof Reflect < "u" && Reflect, Fl = Pl.apply, Il = Pl.construct;
G ||= function(e) {
	return e;
}, K ||= function(e) {
	return e;
}, Fl ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Il ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Ll = Y(Array.prototype.forEach);
Array.prototype.indexOf;
var Rl = Y(Array.prototype.lastIndexOf), zl = Y(Array.prototype.pop), Bl = Y(Array.prototype.push), Vl = Y(Array.prototype.slice), Hl = Y(Array.prototype.splice), Ul = Array.isArray, Wl = au(Set), Gl = Y(Set.prototype.add), Kl = Y(Set.prototype.has), ql = Y(String.prototype.toLowerCase), Jl = Y(String.prototype.toString), Yl = Y(String.prototype.match), Xl = Y(String.prototype.replace), Zl = Y(String.prototype.indexOf), Ql = Y(String.prototype.trim), $l = Y(Number.prototype.toString), eu = Y(Boolean.prototype.toString), tu = typeof BigInt > "u" ? null : Y(BigInt.prototype.toString), nu = typeof Symbol > "u" ? null : Y(Symbol.prototype.toString), q = Y(Object.prototype.hasOwnProperty), ru = Y(Object.prototype.toString), J = Y(RegExp.prototype.test), iu = au(TypeError);
function Y(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return Fl(e, t, n);
	};
}
function au(e) {
	return function() {
		return Il(e, [...arguments]);
	};
}
function X(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ql;
	if (kl && kl(e, null), !Ul(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Al(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function ou(e) {
	for (let t = 0; t < e.length; t++) q(e, t) || (e[t] = null);
	return e;
}
function Z(e) {
	let t = Nl(null);
	for (let r of Ol(e)) {
		var n = Tl(r, 2);
		let i = n[0], a = n[1];
		q(e, i) && (t[i] = Ul(a) ? ou(a) : a && typeof a == "object" && a.constructor === Object ? Z(a) : a);
	}
	return t;
}
function su(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return $l(e);
		case "boolean": return eu(e);
		case "bigint": return tu ? tu(e) : "0";
		case "symbol": return nu ? nu(e) : "Symbol()";
		case "undefined": return ru(e);
		case "function":
		case "object": {
			if (e === null) return ru(e);
			let t = e, n = Q(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : ru(e);
			}
			return ru(e);
		}
		default: return ru(e);
	}
}
function Q(e, t) {
	for (; e !== null;) {
		let n = Ml(e, t);
		if (n) {
			if (n.get) return Y(n.get);
			if (typeof n.value == "function") return Y(n.value);
		}
		e = jl(e);
	}
	function n() {
		return null;
	}
	return n;
}
function cu(e, t) {
	for (; e !== null;) {
		let n = Ml(e, t);
		if (n) return n.get ? Y(n.get) : null;
		e = jl(e);
	}
	return null;
}
function lu(e) {
	try {
		return J(e, ""), !0;
	} catch {
		return !1;
	}
}
var uu = G(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), du = G(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), fu = G([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), pu = G([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), mu = G(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), hu = G([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), gu = G(["#text"]), _u = G(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), vu = G(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), yu = G(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), bu = G([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), xu = K(/{{[\w\W]*|^[\w\W]*}}/g), Su = K(/<%[\w\W]*|^[\w\W]*%>/g), Cu = K(/\${[\w\W]*/g), wu = K(/^data-[\-\w.\u00B7-\uFFFF]+$/), Tu = K(/^aria-[\-\w]+$/), Eu = K(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), Du = K(/^(?:\w+script|data):/i), Ou = K(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), ku = K(/^html$/i), Au = K(/^[a-z][.\w]*(-[.\w]+)+$/i), ju = K(/<[/\w!]/g), Mu = K(/<[/\w]/g), Nu = K(/<\/no(script|embed|frames)/i), Pu = K(/\/>/i), $ = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, Fu = G(X({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), Iu = function() {
	return typeof window > "u" ? null : window;
}, Lu = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, Ru = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, zu = function(e, t, n, r) {
	return q(e, t) && Ul(e[t]) ? X(r.base ? Z(r.base) : {}, e[t], r.transform) : n;
}, Bu = function(e, t, n) {
	let r = q(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? Z(r) : n();
};
function Vu() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Iu(), t = (e) => Vu(e);
	if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== $.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = Q(d, "cloneNode"), p = Q(d, "remove"), m = Q(d, "removeAttributeNode"), h = Q(d, "nextSibling"), g = Q(d, "childNodes"), _ = Q(d, "parentNode"), v = Q(d, "shadowRoot"), y = Q(d, "attributes"), b = o && o.prototype ? Q(o.prototype, "nodeType") : null, ee = o && o.prototype ? Q(o.prototype, "nodeName") : null, te = o && o.prototype ? Q(o.prototype, "ownerDocument") : null, x = function(e) {
		return b ? b(e) : e.nodeType;
	}, ne = function(e) {
		return ee ? ee(e) : e.nodeName;
	}, re = cu(d, "namespaceURI"), ie = function(e) {
		return re ? re(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let S, ae = "", oe, se = !1, C = 0, ce = function() {
		if (C > 0) throw iu("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, le = function(e) {
		ce(), C++;
		try {
			return S.createHTML(e);
		} finally {
			C--;
		}
	}, ue = function(e) {
		ce(), C++;
		try {
			return S.createScriptURL(e);
		} finally {
			C--;
		}
	}, de = function() {
		return se ||= (oe = Lu(u, i), !0), oe;
	}, fe = n, pe = fe.implementation, me = fe.createNodeIterator, he = fe.createDocumentFragment, ge = fe.getElementsByTagName, _e = r.importNode, w = Ru();
	t.isSupported = typeof Ol == "function" && typeof _ == "function" && pe && pe.createHTMLDocument !== void 0;
	let ve = xu, ye = Su, be = Cu, xe = wu, Se = Tu, Ce = Du, we = Ou, Te = Au, Ee = Eu, T = null, De = X({}, [
		...uu,
		...du,
		...fu,
		...mu,
		...gu
	]), E = null, Oe = X({}, [
		..._u,
		...vu,
		...yu,
		...bu
	]), ke = Object.seal(Nl(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), Ae = null, je = null, Me = Object.seal(Nl(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), Ne = !0, Pe = !0, Fe = !1, Ie = !0, Le = !1, Re = !0, ze = !1, Be = !1, Ve = null, He = null, Ue = !1, We = !1, Ge = !1, Ke = !1, qe = !0, Je = !1, Ye = "user-content-", Xe = !0, Ze = !1, Qe = null, $e = {}, et = null, tt = X({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), nt = null, rt = X({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), it = null, at = X({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), ot = "http://www.w3.org/1998/Math/MathML", st = "http://www.w3.org/2000/svg", D = "http://www.w3.org/1999/xhtml", ct = D, lt = !1, ut = null, dt = X({}, [
		ot,
		st,
		D
	], Jl), ft = G([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), pt = X({}, ft), mt = G(["annotation-xml"]), ht = X({}, mt), gt = X({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), _t = null, vt = ["application/xhtml+xml", "text/html"], O = null, yt = null, bt = n.createElement("form"), xt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, St = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (yt && yt === e) return;
		e && typeof e == "object" || (e = {}), e = Z(e), _t = vt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, O = _t === "application/xhtml+xml" ? Jl : ql, T = zu(e, "ALLOWED_TAGS", De, { transform: O }), E = zu(e, "ALLOWED_ATTR", Oe, { transform: O }), ut = zu(e, "ALLOWED_NAMESPACES", dt, { transform: Jl }), it = zu(e, "ADD_URI_SAFE_ATTR", at, {
			transform: O,
			base: at
		}), nt = zu(e, "ADD_DATA_URI_TAGS", rt, {
			transform: O,
			base: rt
		}), et = zu(e, "FORBID_CONTENTS", tt, { transform: O }), Ae = zu(e, "FORBID_TAGS", Z({}), { transform: O }), je = zu(e, "FORBID_ATTR", Z({}), { transform: O }), $e = q(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? Z(e.USE_PROFILES) : e.USE_PROFILES : !1, Ne = e.ALLOW_ARIA_ATTR !== !1, Pe = e.ALLOW_DATA_ATTR !== !1, Fe = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Ie = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Le = e.SAFE_FOR_TEMPLATES || !1, Re = e.SAFE_FOR_XML !== !1, ze = e.WHOLE_DOCUMENT || !1, We = e.RETURN_DOM || !1, Ge = e.RETURN_DOM_FRAGMENT || !1, Ke = e.RETURN_TRUSTED_TYPE || !1, Ue = e.FORCE_BODY || !1, qe = e.SANITIZE_DOM !== !1, Je = e.SANITIZE_NAMED_PROPS || !1, Xe = e.KEEP_CONTENT !== !1, Ze = e.IN_PLACE || !1, Ee = lu(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Eu, ct = typeof e.NAMESPACE == "string" ? e.NAMESPACE : D, pt = Bu(e, "MATHML_TEXT_INTEGRATION_POINTS", () => X({}, ft)), ht = Bu(e, "HTML_INTEGRATION_POINTS", () => X({}, mt));
		let t = Bu(e, "CUSTOM_ELEMENT_HANDLING", () => Nl(null));
		if (ke = Nl(null), q(t, "tagNameCheck") && xt(t.tagNameCheck) && (ke.tagNameCheck = t.tagNameCheck), q(t, "attributeNameCheck") && xt(t.attributeNameCheck) && (ke.attributeNameCheck = t.attributeNameCheck), q(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (ke.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), K(ke), Le && (Pe = !1), Ge && (We = !0), $e && (T = X({}, gu), E = Nl(null), $e.html === !0 && (X(T, uu), X(E, _u)), $e.svg === !0 && (X(T, du), X(E, vu), X(E, bu)), $e.svgFilters === !0 && (X(T, fu), X(E, vu), X(E, bu)), $e.mathMl === !0 && (X(T, mu), X(E, yu), X(E, bu))), Me.tagCheck = null, Me.attributeCheck = null, q(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? Me.tagCheck = e.ADD_TAGS : Ul(e.ADD_TAGS) && (T === De && (T = Z(T)), X(T, e.ADD_TAGS, O))), q(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? Me.attributeCheck = e.ADD_ATTR : Ul(e.ADD_ATTR) && (E === Oe && (E = Z(E)), X(E, e.ADD_ATTR, O))), q(e, "ADD_FORBID_CONTENTS") && Ul(e.ADD_FORBID_CONTENTS) && (et === tt && (et = Z(et)), X(et, e.ADD_FORBID_CONTENTS, O)), Xe && (T["#text"] = !0), ze && X(T, [
			"html",
			"head",
			"body"
		]), T.table && (X(T, ["tbody"]), delete Ae.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw iu("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw iu("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = S;
			S = e.TRUSTED_TYPES_POLICY;
			try {
				ae = le("");
			} catch (e) {
				throw S = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (S = void 0, ae = "") : (S === void 0 && (S = de()), S && typeof ae == "string" && (ae = le("")));
		G && G(e), yt = e;
	}, Ct = X({}, [
		...du,
		...fu,
		...pu
	]), wt = X({}, [...mu, ...hu]), Tt = function(e, t, n) {
		return t.namespaceURI === D ? e === "svg" : t.namespaceURI === ot ? e === "svg" && (n === "annotation-xml" || pt[n]) : !!Ct[e];
	}, Et = function(e, t, n) {
		return t.namespaceURI === D ? e === "math" : t.namespaceURI === st ? e === "math" && ht[n] : !!wt[e];
	}, Dt = function(e, t, n) {
		return t.namespaceURI === st && !ht[n] || t.namespaceURI === ot && !pt[n] ? !1 : !wt[e] && (gt[e] || !Ct[e]);
	}, Ot = function(e) {
		let t = ie(e), n = ql(ne(e)), r = _(e), i, a;
		return r && x(r) === $.element ? (i = { namespaceURI: ie(r) }, a = ql(ne(r))) : (i = { namespaceURI: ct }, a = "template"), ut[t] ? t === st ? Tt(n, i, a) : t === ot ? Et(n, i, a) : t === D ? Dt(n, i, a) : !!(_t === "application/xhtml+xml" && ut[t]) : !1;
	}, kt = function(e) {
		Bl(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw iu("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, At = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, jt = function(e) {
		Ft(e);
		let t = g(e);
		t && Ll(Vl(t), (e) => {
			try {
				p(e);
			} catch {}
		});
		let n = x(e) === $.element ? y(e) : null;
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && At(e, r, i);
		}
	}, Mt = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Bl(t.removed, {
			attribute: r || null,
			from: n
		});
		try {
			r ? m(n, r) : n.removeAttribute(e);
		} catch {
			try {
				n.removeAttribute(e);
			} catch {}
		}
		if (e === "is") {
			if (We || Ge) try {
				kt(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, Nt = function(e) {
		let t = y(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || E[O(i)] || At(e, r, i);
		}
	}, Pt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && x(e) === $.element) {
				let t = v(e);
				Xt(t) && r.push(t);
			}
			let i = g(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, Ft = function(e) {
		Pt(e, (e) => {
			x(e) === $.element && Nt(e);
		});
	}, It = function(e) {
		let t = [];
		return Pt(e, (e) => {
			t.push(e);
		}, !0), t;
	}, Lt = function(e, t) {
		let n = Wl();
		Ll(It(e), (e) => {
			x(e) === $.element && Gl(n, e);
		}), Ll(t, (e) => {
			x(e) === $.element && !Kl(n, e) && Nt(e);
		});
	}, Rt = function(e, n) {
		let r = !1;
		return Ll(t.removed, (t) => {
			t.element && (r ||= t.element === e, Ft(t.element));
		}), Lt(e, n), r;
	}, zt = function(e, t) {
		let n = Qe, r = null, i = () => (r || (r = Wl(), Ll(t, (e) => {
			Gl(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = It(e), a = [e], o = !1;
			if (Ll(r, (e) => {
				x(e) === $.documentFragment ? Bl(a, e) : !o && !Kl(n, e) && (o = Kl(i(), e));
			}), !o) return;
			if (t >= 8) throw iu("the tree kept changing during in-place sanitization; refusing to return it");
			Ll(a, (t, n) => {
				Bt(t, n > 0, e, i());
			});
		}
	}, Bt = function(e, t, n, r) {
		let i = Gt(e), a;
		for (; a = i.nextNode();) Kl(r, a) && !Kl(Qe, a) && (t && k(w.uponSanitizeShadowNode, a, null), rn(a, n), dn(a, n), Xt(a.content) && fn(a.content));
	}, Vt = function(e) {
		Qe && Gl(Qe, e);
	}, Ht = function(e, t) {
		return Re ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Ut = function(e) {
		Re && Pt(e, (e) => {
			let t = x(e);
			if (t === $.processingInstruction || t === $.comment && J(Mu, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === $.element) {
				let t = e, n = O(ne(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && Ht("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, Wt = function(e) {
		let t = null, r = null;
		if (Ue) e = "<remove></remove>" + e;
		else {
			let t = Yl(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		_t === "application/xhtml+xml" && ct === D && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = S ? le(e) : e;
		if (ct === D) try {
			t = new l().parseFromString(i, _t);
		} catch {}
		if (!t || !t.documentElement) {
			t = pe.createDocument(ct, "template", null);
			try {
				t.documentElement.innerHTML = lt ? ae : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), ct === D ? ge.call(t, ze ? "html" : "body")[0] : ze ? t.documentElement : a;
	}, Gt = function(e) {
		let t = te ? te(e) : e.ownerDocument;
		return me.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Kt = function(e) {
		return e = Xl(e, ve, " "), e = Xl(e, ye, " "), e = Xl(e, be, " "), e;
	}, qt = function(e) {
		Jt(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && Ll(t, (e) => {
			Xt(e.content) && qt(e.content);
		});
	}, Jt = function(e) {
		e.normalize();
		let t = te ? te(e) : e.ownerDocument, n = me.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Kt(r.data), r = n.nextNode();
	}, Yt = function(e) {
		let t = ee ? ee(e) : null;
		return typeof t != "string" || O(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== y(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== b(e) || e.childNodes !== g(e);
	}, Xt = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return b(e) === $.documentFragment;
		} catch {
			return !1;
		}
	}, Zt = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return typeof b(e) == "number";
		} catch {
			return !1;
		}
	};
	function k(e, n, r) {
		e.length !== 0 && Ll(e, (e) => {
			e.call(t, n, r, yt);
		});
	}
	let Qt = function(e, t) {
		return !!(Re && e.hasChildNodes() && !Zt(e.firstElementChild) && J(ju, e.textContent) && J(ju, e.innerHTML) || Re && Fu[t] && x(e) === $.element && ie(e) === D && (Zt(e.firstElementChild) || typeof e.textContent == "string" && J(ju, e.textContent)) || e.nodeType === $.processingInstruction || Re && e.nodeType === $.comment && J(Mu, e.data));
	}, $t = function(e, t) {
		return e instanceof RegExp ? J(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, en = function(e, t, n) {
		if (!Ae[t] && sn(t) && $t(ke.tagNameCheck, t)) return !1;
		if (Xe && !et[t] && !et[ql(t)]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return kt(e), !0;
	}, tn = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? Z(t) : t;
	}, nn = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ze && Ft(e), !0);
	}, rn = function(e, n) {
		if (Vt(e), k(w.beforeSanitizeElements, e, null), nn(e, n)) return !0;
		if (Yt(e)) return kt(e), !0;
		let r = O(ne(e));
		if (T = tn(w.uponSanitizeElement, T, De, Ve), k(w.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: T
		}), nn(e, n)) return !0;
		if (Qt(e, r)) return kt(e), !0;
		if (Ae[r] || !(Me.tagCheck instanceof Function && Me.tagCheck(r)) && !T[r]) {
			let t = en(e, r, n);
			return t === !1 && (k(w.afterSanitizeElements, e, null), nn(e, n)) ? !0 : t;
		}
		if (x(e) === $.element && !Ot(e) || (r === "noscript" || r === "noembed" || r === "noframes") && J(Nu, e.innerHTML)) return kt(e), !0;
		if (Le && e.nodeType === $.text) {
			let n = Kt(e.textContent);
			e.textContent !== n && (Bl(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return k(w.afterSanitizeElements, e, null), nn(e, n);
	}, an = function(e, t, r) {
		if (je[t] || Ht(t, e) || qe && (t === "id" || t === "name") && (r in n || r in bt)) return !1;
		let i = E[t] || Me.attributeCheck instanceof Function && Me.attributeCheck(t, e);
		return Pe && J(xe, t) || Ne && J(Se, t) ? !0 : i ? it[t] || J(Ee, Xl(r, we, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Zl(r, "data:") === 0 && nt[e] || Fe && !J(Ce, Xl(r, we, "")) ? !0 : !r : sn(e) && $t(ke.tagNameCheck, e) && $t(ke.attributeNameCheck, t, e) || t === "is" && ke.allowCustomizedBuiltInElements && $t(ke.tagNameCheck, r);
	}, on = X({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), sn = function(e) {
		return !on[ql(e)] && J(Te, e);
	}, cn = function(e, t, n, r) {
		if (S && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return le(r);
			case "TrustedScriptURL": return ue(r);
		}
		return r;
	}, ln = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Yt(e) || (kt(e), !1);
		} catch {
			return Mt(t, e), !1;
		}
	}, un = function(e, t) {
		return Re && J(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, t) ? !0 : ql(e) === "attributename" && Yl(t, "href") !== null;
	}, dn = function(e, n) {
		if (k(w.beforeSanitizeAttributes, e, null), nn(e, n)) return;
		let r = e.attributes;
		if (!r || Yt(e)) return;
		E = tn(w.uponSanitizeAttribute, E, Oe, He);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: E,
			forceKeepAttr: void 0
		}, a = r.length, o = O(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = O(s), d = l, f = s === "value" ? d : Ql(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, k(w.uponSanitizeAttribute, e, i), f = i.attrValue, Je && (u === "id" || u === "name") && Zl(f, Ye) !== 0 && (Mt(s, e, n), f = Ye + f, p = !0), un(s, f) ? Mt(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !Ie && J(Pu, f) ? Mt(s, e, n) : (Le && (f = Kt(f)), an(o, u, f) ? (f = cn(o, u, c, f), f !== d && ln(e, s, c, f) && p && zl(t.removed)) : Mt(s, e, n)) : Mt(s, e, n));
		}
		k(w.afterSanitizeAttributes, e, null), nn(e, n);
	}, fn = function(e) {
		let t = null, n = Gt(e);
		for (k(w.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (k(w.uponSanitizeShadowNode, t, null), rn(t, e), dn(t, e), Xt(t.content) && fn(t.content), x(t) === $.element) {
			let e = v(t);
			Xt(e) && (pn(e), fn(e));
		}
		Le && Jt(e), k(w.afterSanitizeShadowDOM, e, null);
	}, pn = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				fn(e.shadow);
				continue;
			}
			let n = e.node, r = x(n) === $.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = ee ? ee(n) : null;
				if (typeof e == "string" && O(e) === "template") {
					let e = n.content;
					Xt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = v(n);
				Xt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (lt = !e, lt && (e = "<!-->"), typeof e != "string" && !Zt(e) && (e = su(e), typeof e != "string")) throw iu("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Be ? (T = Ve, E = He) : St(n), (w.uponSanitizeElement.length > 0 || w.uponSanitizeAttribute.length > 0) && (T = Z(T)), w.uponSanitizeAttribute.length > 0 && (E = Z(E)), t.removed = [];
		let c = Ze && typeof e != "string" && Zt(e), l = [], u = Qe;
		if (c) {
			Ut(e);
			let t = ne(e);
			if (typeof t == "string") {
				let n = O(t);
				if (!T[n] || Ae[n]) throw jt(e), iu("root node is forbidden and cannot be sanitized in-place");
			}
			if (Yt(e)) throw jt(e), iu("root node is clobbered and cannot be sanitized in-place");
			l = It(e), Qe = Wl();
		} else if (Zt(e)) i = Wt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === $.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), pn(i);
		else {
			if (!We && !Le && !ze && e.indexOf("<") === -1) return S && Ke ? le(e) : e;
			if (i = Wt(e), !i) return We ? null : Ke ? ae : "";
		}
		i && Ue && kt(i.firstChild);
		let d = c ? e : i;
		try {
			c && pn(e);
			let t = Gt(d);
			for (; o = t.nextNode();) rn(o, d), dn(o, d), Xt(o.content) && fn(o.content);
			c && zt(e, l);
		} catch (t) {
			throw c && (jt(e), Rt(e, l)), t;
		} finally {
			Qe = u;
		}
		if (c) {
			if (Rt(e, l)) throw iu("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Le && qt(e), e;
		}
		if (We) {
			if (Le && qt(i), Ge) for (s = he.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (E.shadowroot || E.shadowrootmode) && (s = _e.call(r, s, !0)), s;
		}
		let f = ze ? i.outerHTML : i.innerHTML;
		return ze && T["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && J(ku, i.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + f), Le && (f = Kt(f)), S && Ke ? le(f) : f;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		St(e), Be = !0, Ve = T, He = E;
	}, t.clearConfig = function() {
		yt = null, Be = !1, Ve = null, He = null, S = oe, ae = "";
	}, t.isValidAttribute = function(e, t, n) {
		yt || St({});
		let r = O(e), i = O(t);
		return typeof n == "string" && (un(t, n) || !Ie && J(Pu, n)) ? !1 : an(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && q(w, e) && Bl(w[e], t);
	}, t.removeHook = function(e, t) {
		if (q(w, e)) {
			if (t !== void 0) {
				let n = Rl(w[e], t);
				return n === -1 ? void 0 : Hl(w[e], n, 1)[0];
			}
			return zl(w[e]);
		}
	}, t.removeHooks = function(e) {
		q(w, e) && (w[e] = []);
	}, t.removeAllHooks = function() {
		w = Ru();
	}, t;
}
var Hu = Vu(), Uu = new W({
	html: !1,
	linkify: !0,
	breaks: !0
}).disable([
	"heading",
	"lheading",
	"table",
	"image",
	"hr",
	"html_block",
	"html_inline"
]), Wu = /^(https?:|mailto:)/i;
Uu.validateLink = (e) => Wu.test(e.trim()), Hu.addHook("afterSanitizeAttributes", (e) => {
	e.tagName === "A" && (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer"));
});
var Gu = [
	"p",
	"br",
	"strong",
	"em",
	"s",
	"code",
	"pre",
	"a",
	"ul",
	"ol",
	"li",
	"blockquote"
], Ku = [
	"href",
	"start",
	"class"
];
function qu(e) {
	return Hu.sanitize(Uu.render(e), {
		ALLOWED_TAGS: Gu,
		ALLOWED_ATTR: Ku,
		ALLOWED_URI_REGEXP: Wu
	});
}
function Ju(e, t = 200) {
	if (!e) return "";
	let n = document.createElement("div");
	n.innerHTML = qu(e);
	let r = (n.textContent ?? "").replace(/\s+/g, " ").trim();
	return r.length > t ? `${r.slice(0, t - 1).trimEnd()}…` : r;
}
function Yu(e, t, n, r) {
	let i = e.slice(t, n);
	return e.slice(t - r.length, t) === r && e.slice(n, n + r.length) === r ? {
		text: e.slice(0, t - r.length) + i + e.slice(n + r.length),
		start: t - r.length,
		end: n - r.length
	} : {
		text: e.slice(0, t) + r + i + r + e.slice(n),
		start: t + r.length,
		end: n + r.length
	};
}
function Xu(e, t, n) {
	let r = `${t}/households/${n}`, i = async (t, n) => (await e.get(`${r}${t}`, { params: n })).data;
	return {
		conversations: () => i("/conversations"),
		unread: () => i("/unread"),
		members: async () => (await e.get(`/households/${n}/members/names`)).data,
		messages: (e, t = {}, n = 50) => i(`/conversations/${e}/messages`, {
			...t,
			limit: n
		}),
		message: (e) => i(`/messages/${e}`),
		send: async (t, n) => (await e.post(`${r}/conversations/${t}/messages`, n)).data,
		edit: (t, n) => e.put(`${r}/messages/${t}`, { text: n }),
		remove: (t) => e.delete(`${r}/messages/${t}`),
		react: (t, n) => e.put(`${r}/messages/${t}/reactions/${encodeURIComponent(n)}`),
		unreact: (t, n) => e.delete(`${r}/messages/${t}/reactions/${encodeURIComponent(n)}`),
		markRead: (t, n) => e.put(`${r}/conversations/${t}/read`, { messageId: n }),
		mute: (t, n) => e.put(`${r}/conversations/${t}/mute`, { until: n }),
		unmute: (t) => e.delete(`${r}/conversations/${t}/mute`),
		startDirect: async (t) => (await e.post(`${r}/conversations/direct`, { userId: t })).data.id,
		createRoom: async (t, n) => (await e.post(`${r}/rooms`, {
			name: t,
			participantIds: n
		})).data.id,
		renameRoom: (t, n) => e.put(`${r}/rooms/${t}`, { name: n }),
		addParticipants: (t, n) => e.post(`${r}/rooms/${t}/participants`, { userIds: n }),
		removeParticipant: (t, n) => e.delete(`${r}/rooms/${t}/participants/${n}`),
		leaveRoom: (t, n) => e.post(`${r}/rooms/${t}/leave`, { successorId: n }),
		archiveRoom: (t) => e.post(`${r}/rooms/${t}/archive`),
		upload: async (t, n, i) => {
			let a = new FormData();
			return a.append("file", t), (await e.post(`${r}/attachments`, a, {
				signal: i,
				onUploadProgress: (e) => n(e.total ? e.loaded / e.total : 0)
			})).data;
		},
		attachment: (e) => i(`/attachments/${e}`)
	};
}
function Zu(e) {
	let t = e?.response?.data;
	return typeof t?.code == "string" ? t.code : null;
}
function Qu() {
	if (typeof crypto.randomUUID == "function") return crypto.randomUUID();
	let e = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128;
	let t = [...e].map((e) => e.toString(16).padStart(2, "0")).join("");
	return `${t.slice(0, 8)}-${t.slice(8, 12)}-${t.slice(12, 16)}-${t.slice(16, 20)}-${t.slice(20)}`;
}
// src/useChat.ts
var $u = 6e4, ed = {
	all: (e) => [
		"plugins",
		"chat",
		e
	],
	conversations: (e) => [
		"plugins",
		"chat",
		e,
		"conversations"
	],
	members: (e) => [
		"plugins",
		"chat",
		e,
		"members"
	],
	recent: (e, t) => [
		"plugins",
		"chat",
		e,
		"recent",
		t
	]
};
function td(e) {
	let t = Bn(), n = Rr(), r = C(() => nn(e)), i = C(() => Xu(t.http, t.apiBase, r.value)), a = C(() => t.user.value?.id ?? null), o = Lr({
		queryKey: C(() => ed.conversations(r.value)),
		queryFn: () => i.value.conversations(),
		refetchInterval: $u
	}), s = Lr({
		queryKey: C(() => ed.members(r.value)),
		queryFn: () => i.value.members(),
		staleTime: 6e4
	}), c = (e) => e ? s.data.value?.find((t) => t.userId === e) : void 0, l = (e) => c(e)?.name ?? t.t("someone"), u = (e) => c(e)?.avatarUrl ?? null, d = (e) => l(e).trim().charAt(0).toUpperCase() || "?", f = (e) => e.participantIds.find((e) => e !== a.value) ?? null;
	return {
		host: t,
		api: i,
		householdId: r,
		userId: a,
		conversations: o,
		members: s,
		nameOf: l,
		avatarOf: u,
		initialOf: d,
		otherOf: f,
		titleOf: (e) => e.kind === "Direct" ? l(f(e)) : e.kind === "Household" ? t.t("home") : e.name ?? "",
		refreshConversations: () => n.invalidateQueries({ queryKey: ed.conversations(r.value) }),
		refreshMembers: () => n.invalidateQueries({ queryKey: ed.members(r.value) }),
		canWrite: C(() => t.can("chat.write")),
		canDirect: C(() => t.can("chat.direct")),
		canRooms: C(() => t.can("chat.rooms")),
		canModerate: C(() => t.can("chat.moderate"))
	};
}
// \0plugin-vue:export-helper
var nd = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
};
export { ot as A, Zt as B, de as C, ye as D, ve as E, Ct as F, In as G, fn as H, Mt as I, Ft as L, lt as M, gt as N, Se as O, bt as P, Lt as R, ue as S, _e as T, En as U, on as V, jn as W, Bn as _, Zu as a, C as b, qu as c, sa as d, ei as f, Rn as g, Rr as h, td as i, D as j, it as k, Yu as l, Lr as m, $u as n, Qu as o, Qr as p, ed as r, Ju as s, nd as t, oa as u, d as v, fe as w, le as x, g as y, qt as z };

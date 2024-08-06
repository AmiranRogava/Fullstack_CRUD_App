(function() {
    try {
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        navigator.getBattery = undefined;
        var _gaq = [];
        var _gat = {
            _getTracker: function() {
                return {
                    _initData: function() {},
                    _trackPageview: function() {},
                    _trackEvent: function() {},
                    _setAllowLinker: function() {},
                    _setCustomVar: function() {}
                }
            },
            _createTracker: function() {
                return this._getTracker();
            },
            _anonymizeIp: function() {}
        };
        function urchinTracker() {}
        ;(function noTopics(source, args) {
            function noTopics(source) {
                var TOPICS_PROPERTY_NAME = "browsingTopics";
                if (Document instanceof Object === false) {
                    return;
                }
                if (!Object.prototype.hasOwnProperty.call(Document.prototype, TOPICS_PROPERTY_NAME) || Document.prototype[TOPICS_PROPERTY_NAME]instanceof Function === false) {
                    return;
                }
                Document.prototype[TOPICS_PROPERTY_NAME] = function() {
                    return noopPromiseResolve("[]");
                }
                ;
                hit(source);
            }
            function hit(source) {
                if (source.verbose !== true) {
                    return;
                }
                try {
                    var log = console.log.bind(console);
                    var trace = console.trace.bind(console);
                    var prefix = source.ruleText || "";
                    if (source.domainName) {
                        var AG_SCRIPTLET_MARKER = "#%#//";
                        var UBO_SCRIPTLET_MARKER = "##+js";
                        var ruleStartIndex;
                        if (source.ruleText.includes(AG_SCRIPTLET_MARKER)) {
                            ruleStartIndex = source.ruleText.indexOf(AG_SCRIPTLET_MARKER);
                        } else if (source.ruleText.includes(UBO_SCRIPTLET_MARKER)) {
                            ruleStartIndex = source.ruleText.indexOf(UBO_SCRIPTLET_MARKER);
                        }
                        var rulePart = source.ruleText.slice(ruleStartIndex);
                        prefix = "".concat(source.domainName).concat(rulePart);
                    }
                    log("".concat(prefix, " trace start"));
                    if (trace) {
                        trace();
                    }
                    log("".concat(prefix, " trace end"));
                } catch (e) {}
                if (typeof window.__debug === "function") {
                    window.__debug(source);
                }
            }
            function noopPromiseResolve() {
                var responseBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "{}";
                var responseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
                var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "basic";
                if (typeof Response === "undefined") {
                    return;
                }
                var response = new Response(responseBody,{
                    status: 200,
                    statusText: "OK"
                });
                if (responseType === "opaque") {
                    Object.defineProperties(response, {
                        body: {
                            value: null
                        },
                        status: {
                            value: 0
                        },
                        statusText: {
                            value: ""
                        },
                        url: {
                            value: ""
                        },
                        type: {
                            value: responseType
                        }
                    });
                } else {
                    Object.defineProperties(response, {
                        url: {
                            value: responseUrl
                        },
                        type: {
                            value: responseType
                        }
                    });
                }
                return Promise.resolve(response);
            }
            var updatedArgs = args ? [].concat(source).concat(args) : [source];
            try {
                noTopics.apply(this, updatedArgs);
            } catch (e) {
                console.log(e);
            }
        }
        )({
            "args": [],
            "engine": "extension",
            "name": "no-topics",
            "ruleText": "#%#//scriptlet('no-topics')",
            "verbose": false,
            "domainName": "http://127.0.0.1:5000/profile",
            "version": "4.3.53"
        }, []);
        (function setConstant(source, args) {
            function setConstant(source, property, value) {
                var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
                var valueWrapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
                var setProxyTrap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
                var uboAliases = ["set-constant.js", "ubo-set-constant.js", "set.js", "ubo-set.js", "ubo-set-constant", "ubo-set"];
                if (uboAliases.includes(source.name)) {
                    if (stack.length !== 1 && !getNumberFromString(stack)) {
                        valueWrapper = stack;
                    }
                    stack = undefined;
                }
                if (!property || !matchStackTrace(stack, new Error().stack)) {
                    return;
                }
                var isProxyTrapSet = false;
                var emptyArr = noopArray();
                var emptyObj = noopObject();
                var constantValue;
                if (value === "undefined") {
                    constantValue = undefined;
                } else if (value === "false") {
                    constantValue = false;
                } else if (value === "true") {
                    constantValue = true;
                } else if (value === "null") {
                    constantValue = null;
                } else if (value === "emptyArr") {
                    constantValue = emptyArr;
                } else if (value === "emptyObj") {
                    constantValue = emptyObj;
                } else if (value === "noopFunc") {
                    constantValue = noopFunc;
                } else if (value === "noopCallbackFunc") {
                    constantValue = noopCallbackFunc;
                } else if (value === "trueFunc") {
                    constantValue = trueFunc;
                } else if (value === "falseFunc") {
                    constantValue = falseFunc;
                } else if (value === "throwFunc") {
                    constantValue = throwFunc;
                } else if (value === "noopPromiseResolve") {
                    constantValue = noopPromiseResolve;
                } else if (value === "noopPromiseReject") {
                    constantValue = noopPromiseReject;
                } else if (/^\d+$/.test(value)) {
                    constantValue = parseFloat(value);
                    if (nativeIsNaN(constantValue)) {
                        return;
                    }
                    if (Math.abs(constantValue) > 32767) {
                        return;
                    }
                } else if (value === "-1") {
                    constantValue = -1;
                } else if (value === "") {
                    constantValue = "";
                } else if (value === "yes") {
                    constantValue = "yes";
                } else if (value === "no") {
                    constantValue = "no";
                } else {
                    return;
                }
                var valueWrapperNames = ["asFunction", "asCallback", "asResolved", "asRejected"];
                if (valueWrapperNames.includes(valueWrapper)) {
                    var valueWrappersMap = {
                        asFunction(v) {
                            return function() {
                                return v;
                            }
                            ;
                        },
                        asCallback(v) {
                            return function() {
                                return function() {
                                    return v;
                                }
                                ;
                            }
                            ;
                        },
                        asResolved(v) {
                            return Promise.resolve(v);
                        },
                        asRejected(v) {
                            return Promise.reject(v);
                        }
                    };
                    constantValue = valueWrappersMap[valueWrapper](constantValue);
                }
                var canceled = false;
                var mustCancel = function mustCancel(value) {
                    if (canceled) {
                        return canceled;
                    }
                    canceled = value !== undefined && constantValue !== undefined && typeof value !== typeof constantValue && value !== null;
                    return canceled;
                };
                var trapProp = function trapProp(base, prop, configurable, handler) {
                    if (!handler.init(base[prop])) {
                        return false;
                    }
                    var origDescriptor = Object.getOwnPropertyDescriptor(base, prop);
                    var prevSetter;
                    if (origDescriptor instanceof Object) {
                        if (!origDescriptor.configurable) {
                            var message = "Property '".concat(prop, "' is not configurable");
                            logMessage(source, message);
                            return false;
                        }
                        if (base[prop]) {
                            base[prop] = constantValue;
                        }
                        if (origDescriptor.set instanceof Function) {
                            prevSetter = origDescriptor.set;
                        }
                    }
                    Object.defineProperty(base, prop, {
                        configurable: configurable,
                        get() {
                            return handler.get();
                        },
                        set(a) {
                            if (prevSetter !== undefined) {
                                prevSetter(a);
                            }
                            if (a instanceof Object) {
                                var propertiesToCheck = property.split(".").slice(1);
                                if (setProxyTrap && !isProxyTrapSet) {
                                    isProxyTrapSet = true;
                                    a = new Proxy(a,{
                                        get: function get(target, propertyKey, val) {
                                            propertiesToCheck.reduce(function(object, currentProp, index, array) {
                                                var currentObj = object === null || object === void 0 ? void 0 : object[currentProp];
                                                if (index === array.length - 1 && currentObj !== constantValue) {
                                                    object[currentProp] = constantValue;
                                                }
                                                return currentObj || object;
                                            }, target);
                                            return Reflect.get(target, propertyKey, val);
                                        }
                                    });
                                }
                            }
                            handler.set(a);
                        }
                    });
                    return true;
                };
                var setChainPropAccess = function setChainPropAccess(owner, property) {
                    var chainInfo = getPropertyInChain(owner, property);
                    var base = chainInfo.base;
                    var prop = chainInfo.prop
                      , chain = chainInfo.chain;
                    var inChainPropHandler = {
                        factValue: undefined,
                        init(a) {
                            this.factValue = a;
                            return true;
                        },
                        get() {
                            return this.factValue;
                        },
                        set(a) {
                            if (this.factValue === a) {
                                return;
                            }
                            this.factValue = a;
                            if (a instanceof Object) {
                                setChainPropAccess(a, chain);
                            }
                        }
                    };
                    var endPropHandler = {
                        init(a) {
                            if (mustCancel(a)) {
                                return false;
                            }
                            return true;
                        },
                        get() {
                            return constantValue;
                        },
                        set(a) {
                            if (!mustCancel(a)) {
                                return;
                            }
                            constantValue = a;
                        }
                    };
                    if (!chain) {
                        var isTrapped = trapProp(base, prop, false, endPropHandler);
                        if (isTrapped) {
                            hit(source);
                        }
                        return;
                    }
                    if (base !== undefined && base[prop] === null) {
                        trapProp(base, prop, true, inChainPropHandler);
                        return;
                    }
                    if ((base instanceof Object || typeof base === "object") && isEmptyObject(base)) {
                        trapProp(base, prop, true, inChainPropHandler);
                    }
                    var propValue = owner[prop];
                    if (propValue instanceof Object || typeof propValue === "object" && propValue !== null) {
                        setChainPropAccess(propValue, chain);
                    }
                    trapProp(base, prop, true, inChainPropHandler);
                };
                setChainPropAccess(window, property);
            }
            function hit(source) {
                if (source.verbose !== true) {
                    return;
                }
                try {
                    var log = console.log.bind(console);
                    var trace = console.trace.bind(console);
                    var prefix = source.ruleText || "";
                    if (source.domainName) {
                        var AG_SCRIPTLET_MARKER = "#%#//";
                        var UBO_SCRIPTLET_MARKER = "##+js";
                        var ruleStartIndex;
                        if (source.ruleText.includes(AG_SCRIPTLET_MARKER)) {
                            ruleStartIndex = source.ruleText.indexOf(AG_SCRIPTLET_MARKER);
                        } else if (source.ruleText.includes(UBO_SCRIPTLET_MARKER)) {
                            ruleStartIndex = source.ruleText.indexOf(UBO_SCRIPTLET_MARKER);
                        }
                        var rulePart = source.ruleText.slice(ruleStartIndex);
                        prefix = "".concat(source.domainName).concat(rulePart);
                    }
                    log("".concat(prefix, " trace start"));
                    if (trace) {
                        trace();
                    }
                    log("".concat(prefix, " trace end"));
                } catch (e) {}
                if (typeof window.__debug === "function") {
                    window.__debug(source);
                }
            }
            function logMessage(source, message) {
                var forced = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var convertMessageToString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
                var name = source.name
                  , verbose = source.verbose;
                if (!forced && !verbose) {
                    return;
                }
                var nativeConsole = console.log;
                if (!convertMessageToString) {
                    nativeConsole("".concat(name, ":"), message);
                    return;
                }
                nativeConsole("".concat(name, ": ").concat(message));
            }
            function getNumberFromString(rawString) {
                var parsedDelay = parseInt(rawString, 10);
                var validDelay = nativeIsNaN(parsedDelay) ? null : parsedDelay;
                return validDelay;
            }
            function noopArray() {
                return [];
            }
            function noopObject() {
                return {};
            }
            function noopFunc() {}
            function noopCallbackFunc() {
                return noopFunc;
            }
            function trueFunc() {
                return true;
            }
            function falseFunc() {
                return false;
            }
            function throwFunc() {
                throw new Error();
            }
            function noopPromiseReject() {
                return Promise.reject();
            }
            function noopPromiseResolve() {
                var responseBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "{}";
                var responseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
                var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "basic";
                if (typeof Response === "undefined") {
                    return;
                }
                var response = new Response(responseBody,{
                    status: 200,
                    statusText: "OK"
                });
                if (responseType === "opaque") {
                    Object.defineProperties(response, {
                        body: {
                            value: null
                        },
                        status: {
                            value: 0
                        },
                        statusText: {
                            value: ""
                        },
                        url: {
                            value: ""
                        },
                        type: {
                            value: responseType
                        }
                    });
                } else {
                    Object.defineProperties(response, {
                        url: {
                            value: responseUrl
                        },
                        type: {
                            value: responseType
                        }
                    });
                }
                return Promise.resolve(response);
            }
            function getPropertyInChain(base, chain) {
                var pos = chain.indexOf(".");
                if (pos === -1) {
                    return {
                        base: base,
                        prop: chain
                    };
                }
                var prop = chain.slice(0, pos);
                if (base === null) {
                    return {
                        base: base,
                        prop: prop,
                        chain: chain
                    };
                }
                var nextBase = base[prop];
                chain = chain.slice(pos + 1);
                if ((base instanceof Object || typeof base === "object") && isEmptyObject(base)) {
                    return {
                        base: base,
                        prop: prop,
                        chain: chain
                    };
                }
                if (nextBase === null) {
                    return {
                        base: base,
                        prop: prop,
                        chain: chain
                    };
                }
                if (nextBase !== undefined) {
                    return getPropertyInChain(nextBase, chain);
                }
                Object.defineProperty(base, prop, {
                    configurable: true
                });
                return {
                    base: base,
                    prop: prop,
                    chain: chain
                };
            }
            function matchStackTrace(stackMatch, stackTrace) {
                if (!stackMatch || stackMatch === "") {
                    return true;
                }
                if (shouldAbortInlineOrInjectedScript(stackMatch, stackTrace)) {
                    return true;
                }
                var stackRegexp = toRegExp(stackMatch);
                var refinedStackTrace = stackTrace.split("\n").slice(2).map(function(line) {
                    return line.trim();
                }).join("\n");
                return getNativeRegexpTest().call(stackRegexp, refinedStackTrace);
            }
            function nativeIsNaN(num) {
                var native = Number.isNaN || window.isNaN;
                return native(num);
            }
            function isEmptyObject(obj) {
                return Object.keys(obj).length === 0 && !obj.prototype;
            }
            function shouldAbortInlineOrInjectedScript(stackMatch, stackTrace) {
                var INLINE_SCRIPT_STRING = "inlineScript";
                var INJECTED_SCRIPT_STRING = "injectedScript";
                var INJECTED_SCRIPT_MARKER = "<anonymous>";
                var isInlineScript = function isInlineScript(match) {
                    return match.includes(INLINE_SCRIPT_STRING);
                };
                var isInjectedScript = function isInjectedScript(match) {
                    return match.includes(INJECTED_SCRIPT_STRING);
                };
                if (!(isInlineScript(stackMatch) || isInjectedScript(stackMatch))) {
                    return false;
                }
                var documentURL = window.location.href;
                var pos = documentURL.indexOf("#");
                if (pos !== -1) {
                    documentURL = documentURL.slice(0, pos);
                }
                var stackSteps = stackTrace.split("\n").slice(2).map(function(line) {
                    return line.trim();
                });
                var stackLines = stackSteps.map(function(line) {
                    var stack;
                    var getStackTraceURL = /(.*?@)?(\S+)(:\d+):\d+\)?$/.exec(line);
                    if (getStackTraceURL) {
                        var _stackURL, _stackURL2;
                        var stackURL = getStackTraceURL[2];
                        if ((_stackURL = stackURL) !== null && _stackURL !== void 0 && _stackURL.startsWith("(")) {
                            stackURL = stackURL.slice(1);
                        }
                        if ((_stackURL2 = stackURL) !== null && _stackURL2 !== void 0 && _stackURL2.startsWith(INJECTED_SCRIPT_MARKER)) {
                            var _stackFunction;
                            stackURL = INJECTED_SCRIPT_STRING;
                            var stackFunction = getStackTraceURL[1] !== undefined ? getStackTraceURL[1].slice(0, -1) : line.slice(0, getStackTraceURL.index).trim();
                            if ((_stackFunction = stackFunction) !== null && _stackFunction !== void 0 && _stackFunction.startsWith("at")) {
                                stackFunction = stackFunction.slice(2).trim();
                            }
                            stack = "".concat(stackFunction, " ").concat(stackURL).trim();
                        } else {
                            stack = stackURL;
                        }
                    } else {
                        stack = line;
                    }
                    return stack;
                });
                if (stackLines) {
                    for (var index = 0; index < stackLines.length; index += 1) {
                        if (isInlineScript(stackMatch) && documentURL === stackLines[index]) {
                            return true;
                        }
                        if (isInjectedScript(stackMatch) && stackLines[index].startsWith(INJECTED_SCRIPT_STRING)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            function getNativeRegexpTest() {
                var descriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, "test");
                var nativeRegexTest = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
                if (descriptor && typeof descriptor.value === "function") {
                    return nativeRegexTest;
                }
                throw new Error("RegExp.prototype.test is not a function");
            }
            function toRegExp() {
                var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var DEFAULT_VALUE = ".?";
                var FORWARD_SLASH = "/";
                if (input === "") {
                    return new RegExp(DEFAULT_VALUE);
                }
                var delimiterIndex = input.lastIndexOf(FORWARD_SLASH);
                var flagsPart = input.substring(delimiterIndex + 1);
                var regExpPart = input.substring(0, delimiterIndex + 1);
                var isValidRegExpFlag = function isValidRegExpFlag(flag) {
                    if (!flag) {
                        return false;
                    }
                    try {
                        new RegExp("",flag);
                        return true;
                    } catch (ex) {
                        return false;
                    }
                };
                var getRegExpFlags = function getRegExpFlags(regExpStr, flagsStr) {
                    if (regExpStr.startsWith(FORWARD_SLASH) && regExpStr.endsWith(FORWARD_SLASH) && !regExpStr.endsWith("\\/") && isValidRegExpFlag(flagsStr)) {
                        return flagsStr;
                    }
                    return "";
                };
                var flags = getRegExpFlags(regExpPart, flagsPart);
                if (input.startsWith(FORWARD_SLASH) && input.endsWith(FORWARD_SLASH) || flags) {
                    var regExpInput = flags ? regExpPart : input;
                    return new RegExp(regExpInput.slice(1, -1),flags);
                }
                var escaped = input.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                return new RegExp(escaped);
            }
            var updatedArgs = args ? [].concat(source).concat(args) : [source];
            try {
                setConstant.apply(this, updatedArgs);
            } catch (e) {
                console.log(e);
            }
        }
        )({
            "args": ["navigator.privateAttribution", "undefined"],
            "engine": "extension",
            "name": "set-constant",
            "ruleText": "#%#//scriptlet('set-constant', 'navigator.privateAttribution', 'undefined')",
            "verbose": false,
            "domainName": "http://127.0.0.1:5000/profile",
            "version": "4.3.53"
        }, ["navigator.privateAttribution", "undefined"]);
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var addthis = {
            init: function() {},
            addEventListener: function() {},
            button: function() {},
            counter: function() {},
            update: function() {},
            toolbox: function() {},
            layers: function() {}
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
        var AG_onLoad = function(func) {
            if (document.readyState === "complete" || document.readyState === "interactive")
                func();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", func);
            else if (document.attachEvent)
                document.attachEvent("DOMContentLoaded", func)
        };
        var AG_removeElementById = function(id) {
            var element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
        var AG_removeElementBySelector = function(selector) {
            if (!document.querySelectorAll) {
                return;
            }
            var nodes = document.querySelectorAll(selector);
            if (nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }
        };
        var AG_each = function(selector, fn) {
            if (!document.querySelectorAll)
                return;
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i]);
            }
            ;
        };
        var AG_removeParent = function(el, fn) {
            while (el && el.parentNode) {
                if (fn(el)) {
                    el.parentNode.removeChild(el);
                    return;
                }
                el = el.parentNode;
            }
        };
        var AG_removeCookie = function(a) {
            var e = /./;
            /^\/.+\/$/.test(a) ? e = new RegExp(a.slice(1, -1)) : "" !== a && (e = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
            a = function() {
                for (var a = document.cookie.split(";"), g = a.length; g--; ) {
                    cookieStr = a[g];
                    var d = cookieStr.indexOf("=");
                    if (-1 !== d && (d = cookieStr.slice(0, d).trim(),
                    e.test(d)))
                        for (var h = document.location.hostname.split("."), f = 0; f < h.length - 1; f++) {
                            var b = h.slice(f).join(".");
                            if (b) {
                                var c = d + "="
                                  , k = "; domain=" + b;
                                b = "; domain=." + b;
                                document.cookie = c + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + k + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = c + b + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                }
            }
            ;
            a();
            window.addEventListener("beforeunload", a)
        };
        var AG_defineProperty = function() {
            var p, q = Object.defineProperty;
            if ("function" == typeof WeakMap)
                p = WeakMap;
            else {
                var r = 0
                  , t = function() {
                    this.a = (r += Math.random()).toString()
                };
                t.prototype.set = function(a, b) {
                    var d = a[this.a];
                    d && d[0] === a ? d[1] = b : q(a, this.a, {
                        value: [a, b],
                        writable: !0
                    });
                    return this
                }
                ;
                t.prototype.get = function(a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0
                }
                ;
                t.prototype.has = function(a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1
                }
                ;
                p = t
            }
            function u(a) {
                this.b = a;
                this.h = Object.create(null)
            }
            function v(a, b, d, e) {
                this.a = a;
                this.i = b;
                this.c = d;
                this.f = e
            }
            function w() {
                this.g = /^([^\\\.]|\\.)*?\./;
                this.j = /\\(.)/g;
                this.a = new p
            }
            function x(a, b) {
                var d = b.f;
                if (d && !("beforeGet"in d || "beforeSet"in d))
                    return z(d);
                var e = {
                    get: function() {
                        var c = b.f;
                        c && c.beforeGet && c.beforeGet.call(this, b.a.b);
                        a: if (c = b.g)
                            c = A(c) ? c.value : c.get ? c.get.call(this) : void 0;
                        else {
                            c = b.a.b;
                            if (b.i in c && (c = B(c),
                            null !== c)) {
                                var d = C.call(c, b.i);
                                c = d ? d.call(this) : c[b.i];
                                break a
                            }
                            c = void 0
                        }
                        (this === b.a.b || D.call(b.a.b, this)) && E(a, c, b.c);
                        return c
                    },
                    set: function(c) {
                        if (this === b.a.b || D.call(b.a.b, this)) {
                            b.f && b.f.beforeSet && (c = b.f.beforeSet.call(this, c, this));
                            var d = b.g;
                            d && A(d) && d.value === c ? c = !0 : (d = F(b, c, this),
                            G(c) && (c = H(a, c),
                            I(a, c, b.c)),
                            c = d)
                        } else
                            c = F(b, c, this);
                        return c
                    }
                };
                d && J(d, e, K);
                return e
            }
            function I(a, b, d) {
                for (var e in d.h) {
                    var c = d.h[e];
                    if (b.h[e]) {
                        var h = a
                          , g = b.h[e]
                          , k = c;
                        !k.f || g.f || "undefined" === typeof g.a.b || g.g || (g.g = z(k.f));
                        g.c && k.c && g.c !== k.c && I(h, g.c, k.c)
                    } else {
                        g = h = void 0;
                        k = a;
                        var f = b
                          , l = c.i
                          , m = "undefined" !== typeof f.b
                          , y = !1;
                        m && (g = L(f.b, l)) && !g.configurable && (y = !0,
                        h = f.b[l]);
                        var n = y ? H(k, h) : new u(c.c.b);
                        I(k, n, c.c);
                        n = new v(f,l,n,c.f);
                        f.h[l] = n;
                        m && (n.g = g,
                        m = x(k, n),
                        y ? E(k, h, c.c) : (q(f.b, l, m),
                        g && A(g) && (M(m, g.value, f.b),
                        E(k, g.value, c.c))))
                    }
                }
            }
            function E(a, b, d) {
                G(b) && (b = H(a, b),
                I(a, b, d))
            }
            function F(a, b, d) {
                var e = a.g;
                if (!e) {
                    e = B(a.a.b);
                    if (null !== e && (e = N.call(e, a.i)))
                        return e.call(d, b);
                    if (!O(a.a.b))
                        return !1;
                    a.g = {
                        value: b,
                        configurable: !0,
                        writable: !0,
                        enumerable: !0
                    };
                    return !0
                }
                return M(e, b, d)
            }
            function H(a, b) {
                var d = a.a.get(b);
                d || (d = new u(b),
                a.a.set(b, d));
                return d
            }
            function A(a) {
                return "undefined" !== typeof a.writable
            }
            function J(a, b, d) {
                for (var e = 0, c = d.length; e < c; e++) {
                    var h = d[e];
                    h in a && (b[h] = a[h])
                }
            }
            function z(a) {
                if (a) {
                    var b = {};
                    J(a, b, P);
                    return b
                }
            }
            function M(a, b, d) {
                if (A(a))
                    return a.writable ? (a.value = b,
                    !0) : !1;
                if (!a.set)
                    return !1;
                a.set.call(d, b);
                return !0
            }
            var P = "configurable enumerable value get set writable".split(" ")
              , K = P.slice(0, 2)
              , L = Object.getOwnPropertyDescriptor
              , O = Object.isExtensible
              , B = Object.getPrototypeOf
              , D = Object.prototype.isPrototypeOf
              , C = Object.prototype.__lookupGetter__ || function(a) {
                return (a = Q(this, a)) && a.get ? a.get : void 0
            }
              , N = Object.prototype.__lookupSetter__ || function(a) {
                return (a = Q(this, a)) && a.set ? a.set : void 0
            }
            ;
            function Q(a, b) {
                if (b in a) {
                    for (; !w.hasOwnProperty.call(a, b); )
                        a = B(a);
                    return L(a, b)
                }
            }
            function G(a) {
                var b = typeof a;
                return "function" === b || "object" === b && null !== a ? !0 : !1
            }
            var R;
            return function(a, b, d) {
                R || (R = new w);
                var e = R;
                d = d || window;
                var c = new u;
                a += ".";
                var h = c || new u;
                for (var g = e.g, k = e.j, f, l, m; a; ) {
                    f = g.exec(a);
                    if (null === f)
                        throw 1;
                    f = f[0].length;
                    l = a.slice(0, f - 1).replace(k, "$1");
                    a = a.slice(f);
                    (f = h.h[l]) ? m = f.c : (m = new u,
                    f = new v(h,l,m),
                    h.h[l] = f);
                    h = m
                }
                if (!f)
                    throw 1;
                a = f;
                a.f = b;
                E(e, d, c)
            }
            ;
        }();
        var AG_abortOnPropertyWrite = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeSet: function() {
                    b && console.warn("AdGuard aborted property write: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortOnPropertyRead = function(a, b) {
            var c = Math.random().toString(36).substr(2, 8);
            AG_defineProperty(a, {
                beforeGet: function() {
                    b && console.warn("AdGuard aborted property read: " + a);
                    throw new ReferenceError(c);
                }
            });
            var d = window.onerror;
            window.onerror = function(e) {
                if ("string" === typeof e && -1 !== e.indexOf(c))
                    return b && console.warn("AdGuard has caught window.onerror: " + a),
                    !0;
                if (d instanceof Function)
                    return d.apply(this, arguments)
            }
        };
        var AG_abortInlineScript = function(g, b, c) {
            var d = function() {
                if ("currentScript"in document)
                    return document.currentScript;
                var a = document.getElementsByTagName("script");
                return a[a.length - 1]
            }
              , e = Math.random().toString(36).substr(2, 8)
              , h = d();
            AG_defineProperty(b, {
                beforeGet: function() {
                    var a = d();
                    if (a instanceof HTMLScriptElement && a !== h && "" === a.src && g.test(a.textContent))
                        throw c && console.warn("AdGuard aborted execution of an inline script"),
                        new ReferenceError(e);
                }
            });
            var f = window.onerror;
            window.onerror = function(a) {
                if ("string" === typeof a && -1 !== a.indexOf(e))
                    return c && console.warn("AdGuard has caught window.onerror: " + b),
                    !0;
                if (f instanceof Function)
                    return f.apply(this, arguments)
            }
        };
        var AG_setConstant = function(e, a) {
            if ("undefined" === a)
                a = void 0;
            else if ("false" === a)
                a = !1;
            else if ("true" === a)
                a = !0;
            else if ("noopFunc" === a)
                a = function() {}
                ;
            else if ("trueFunc" === a)
                a = function() {
                    return !0
                }
                ;
            else if ("falseFunc" === a)
                a = function() {
                    return !1
                }
                ;
            else if (/^\d+$/.test(a)) {
                if (a = parseFloat(a),
                isNaN(a) || 32767 < Math.abs(a))
                    return
            } else
                return;
            var b = !1;
            AG_defineProperty(e, {
                get: function() {
                    return a
                },
                set: function(c) {
                    if (b)
                        var d = !0;
                    else
                        void 0 !== c && void 0 !== a && typeof c !== typeof a && (b = !0),
                        d = b;
                    d && (a = c)
                }
            })
        };
    } catch (ex) {
        console.error('Error executing AG js: ' + ex);
    }
}
)();
;(function setDomSignal() {
    try {
        if ("globalPrivacyControl"in Navigator.prototype) {
            return;
        }
        Object.defineProperty(Navigator.prototype, "globalPrivacyControl", {
            get: ()=>true,
            configurable: true,
            enumerable: true
        });
    } catch (ex) {// Ignore
    }
}
)();
;(function hideDocumentReferrer() {
    const origDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, "referrer");
    if (!origDescriptor || !origDescriptor.get || !origDescriptor.configurable) {
        return;
    }
    const returnEmptyReferrerFunc = ()=>"";
    // Protect getter from native code check
    returnEmptyReferrerFunc.toString = origDescriptor.get.toString.bind(origDescriptor.get);
    Object.defineProperty(Document.prototype, "referrer", {
        get: returnEmptyReferrerFunc
    });
}
)();

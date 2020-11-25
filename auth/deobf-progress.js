/* JS */
CALLBACK(function(ctx) { // _ = ctx
    var window = this; // also not obfuscated
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var iter, defineProperty, findGlobalRoot, globalRoot, compute, iterableIterator, La, Sa;
    ctx.ja = function(a) {
        return function() {
            return ctx.ea[a].apply(this, arguments)
        }
    };
    ctx._DumpException = function(a) { // random placement???
        throw a;
    };
    ctx.ea = [];
    iter = function(a) { // ma = iter
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    };
    defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) { // oa = defineProperty
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };
    findGlobalRoot = function(outerThis) { // xa = findGlobalRoot
        var possibleRoots = ["object" == typeof globalThis && globalThis, outerThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        
        for (var index = 0; index < possibleRoots.length; ++index) {
            var current = possibleRoots[index];
            if (current && current.Math == Math)
                return current
        }
        
        throw Error("Failed to locate global root"); // originally Error("a")
    };
    globalRoot = findGlobalRoot(this); // Ba = globalRoot
    compute = function(childName, gen) { // Da = compute
        if (gen) genBlock: {
            var obj = globalRoot;
            var nameParts = childName.split(".");
            for (var index = 0; index < nameParts.length - 1; index++) {
                var current = nameParts[index];
                if (!(current in obj)) break genBlock;
                obj = obj[current]
            }
            
            var lastName = nameParts[nameParts.length - 1];
            var child = obj[lastName];
            var mapped = gen(child);
            mapped != child && null != mapped && defineProperty(obj, lastName, {
                configurable: !0,
                writable: !0,
                value: mapped
            })
        }
    };
    compute("Symbol", function(old) {
        if (old)
            return old;
        
        var NewSymbol = function(str, desc) {
            this.str = str;
            defineProperty(this, "description", {
                configurable: !0,
                writable: !0,
                value: desc
            })
        };
        
        NewSymbol.prototype.toString = function() {
            return this.str
        };
        
        var nSymbols = 0,
            create = function(obj) {
                if (this instanceof create)
                    throw new TypeError("Symbol is not a constructor"); // just like in the real Symbol
                
                return new NewSymbol("jscomp_symbol_" + (obj || "") + "_" + nSymbols++, obj)
            };
        
        return create
    });
    
    compute("Symbol.iterator", function(old) {
        if (old)
            return old;
        
        var propSymbol = Symbol("Symbol.iterator");
        for (var arrayTypes = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), index = 0; index < b.length; index++) {
            var currentType = globalRoot[arrayTypes[index]];
            "function" === typeof currentType && "function" != typeof currentType.prototype[propSymbol] && defineProperty(currentType.prototype, propSymbol, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return iterableIterator(iter(this))
                }
            })
        }
        
        return propSymbol
    });
    
    iterableIterator = function(iterFunc) { // Ea = iterableIterator
        var iterator = {
            next: iterFunc
        };
        
        iterator[Symbol.iterator] = function() {
            return this
        };
        
        return iterator
    };
    
    _.Ha = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: ma(a)
        }
    };
    _.Ja = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    };
    if ("function" == typeof Object.setPrototypeOf) La = Object.setPrototypeOf;
    else {
        var Ma;
        a: {
            var Na = {
                    a: !0
                },
                Pa = {};
            try {
                Pa.__proto__ = Na;
                Ma = Pa.a;
                break a
            } catch (a) {}
            Ma = !1
        }
        La = Ma ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    _.Ra = La;
    Sa = function(a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    Da("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Sa(this, b, "startsWith"),
                e = d.length,
                f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e;)
                if (d[c++] != b[g++]) return !1;
            return g >= f
        }
    });
    var Ta = function(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    };
    Da("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Ta(this, function(b) {
                return b
            })
        }
    });
    Da("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Ta(this, function(b, c) {
                return c
            })
        }
    });
    var Ua = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    Da("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Ua(b, d) && c.push(b[d]);
            return c
        }
    });
    Da("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(k) {
                return k
            };
            var e = [],
                f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
            return e
        }
    });
    Da("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    Da("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    Da("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== Sa(this, b, "includes").indexOf(b, c || 0)
        }
    });
    Da("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Ua(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var Va = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d) Ua(d, e) && (a[e] = d[e])
        }
        return a
    };
    Da("Object.assign", function(a) {
        return a || Va
    });
    Da("Array.prototype.flat", function(a) {
        return a ? a : function(b) {
            b = void 0 === b ? 1 : b;
            for (var c = [], d = 0; d < this.length; d++) {
                var e = this[d];
                Array.isArray(e) && 0 < b ? (e = Array.prototype.flat.call(e, b - 1), c.push.apply(c, e)) : c.push(e)
            }
            return c
        }
    });
    Da("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return Ta(this, function(b, c) {
                return [b, c]
            })
        }
    });
    Da("WeakMap", function(a) {
        function b() {}

        function c(l) {
            var m = typeof l;
            return "object" === m && null !== l || "function" === m
        }

        function d(l) {
            if (!Ua(l, f)) {
                var m = new b;
                oa(l, f, {
                    value: m
                })
            }
        }

        function e(l) {
            var m = Object[l];
            m && (Object[l] = function(n) {
                if (n instanceof b) return n;
                Object.isExtensible(n) && d(n);
                return m(n)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var l = Object.seal({}),
                        m = Object.seal({}),
                        n = new a([
                            [l, 2],
                            [m, 3]
                        ]);
                    if (2 != n.get(l) || 3 != n.get(m)) return !1;
                    n.delete(l);
                    n.set(m, 4);
                    return !n.has(l) && 4 == n.get(m)
                } catch (p) {
                    return !1
                }
            }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0,
            k = function(l) {
                this.Ca = (g += Math.random() + 1).toString();
                if (l) {
                    l = _.Ha(l);
                    for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1])
                }
            };
        k.prototype.set = function(l, m) {
            if (!c(l)) throw Error("b");
            d(l);
            if (!Ua(l, f)) throw Error("c`" + l);
            l[f][this.Ca] = m;
            return this
        };
        k.prototype.get = function(l) {
            return c(l) && Ua(l, f) ? l[f][this.Ca] : void 0
        };
        k.prototype.has = function(l) {
            return c(l) && Ua(l, f) && Ua(l[f], this.Ca)
        };
        k.prototype.delete =
            function(l) {
                return c(l) && Ua(l, f) && Ua(l[f], this.Ca) ? delete l[f][this.Ca] : !1
            };
        return k
    });
    Da("Map", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var k = Object.seal({
                            x: 4
                        }),
                        l = new a(_.Ha([
                            [k, "s"]
                        ]));
                    if ("s" != l.get(k) || 1 != l.size || l.get({
                            x: 4
                        }) || l.set({
                            x: 4
                        }, "t") != l || 2 != l.size) return !1;
                    var m = l.entries(),
                        n = m.next();
                    if (n.done || n.value[0] != k || "s" != n.value[1]) return !1;
                    n = m.next();
                    return n.done || 4 != n.value[0].x || "t" != n.value[1] || !m.next().done ? !1 : !0
                } catch (p) {
                    return !1
                }
            }()) return a;
        var b = new WeakMap,
            c = function(k) {
                this.yf = {};
                this.Ze =
                    f();
                this.size = 0;
                if (k) {
                    k = _.Ha(k);
                    for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
                }
            };
        c.prototype.set = function(k, l) {
            k = 0 === k ? 0 : k;
            var m = d(this, k);
            m.list || (m.list = this.yf[m.id] = []);
            m.we ? m.we.value = l : (m.we = {
                next: this.Ze,
                ej: this.Ze.ej,
                head: this.Ze,
                key: k,
                value: l
            }, m.list.push(m.we), this.Ze.ej.next = m.we, this.Ze.ej = m.we, this.size++);
            return this
        };
        c.prototype.delete = function(k) {
            k = d(this, k);
            return k.we && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this.yf[k.id], k.we.ej.next = k.we.next, k.we.next.ej =
                k.we.ej, k.we.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function() {
            this.yf = {};
            this.Ze = this.Ze.ej = f();
            this.size = 0
        };
        c.prototype.has = function(k) {
            return !!d(this, k).we
        };
        c.prototype.get = function(k) {
            return (k = d(this, k).we) && k.value
        };
        c.prototype.entries = function() {
            return e(this, function(k) {
                return [k.key, k.value]
            })
        };
        c.prototype.keys = function() {
            return e(this, function(k) {
                return k.key
            })
        };
        c.prototype.values = function() {
            return e(this, function(k) {
                return k.value
            })
        };
        c.prototype.forEach = function(k, l) {
            for (var m = this.entries(),
                    n; !(n = m.next()).done;) n = n.value, k.call(l, n[1], n[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(k, l) {
                var m = l && typeof l;
                "object" == m || "function" == m ? b.has(l) ? m = b.get(l) : (m = "" + ++g, b.set(l, m)) : m = "p_" + l;
                var n = k.yf[m];
                if (n && Ua(k.yf, m))
                    for (k = 0; k < n.length; k++) {
                        var p = n[k];
                        if (l !== l && p.key !== p.key || l === p.key) return {
                            id: m,
                            list: n,
                            index: k,
                            we: p
                        }
                    }
                return {
                    id: m,
                    list: n,
                    index: -1,
                    we: void 0
                }
            },
            e = function(k, l) {
                var m = k.Ze;
                return Ea(function() {
                    if (m) {
                        for (; m.head != k.Ze;) m = m.ej;
                        for (; m.next != m.head;) return m =
                            m.next, {
                                done: !1,
                                value: l(m)
                            };
                        m = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            },
            f = function() {
                var k = {};
                return k.ej = k.next = k.head = k
            },
            g = 0;
        return c
    });
    Da("Set", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var c = Object.seal({
                            x: 4
                        }),
                        d = new a(_.Ha([c]));
                    if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                            x: 4
                        }) != d || 2 != d.size) return !1;
                    var e = d.entries(),
                        f = e.next();
                    if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                    f = e.next();
                    return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
                } catch (g) {
                    return !1
                }
            }()) return a;
        var b = function(c) {
            this.Ha = new Map;
            if (c) {
                c =
                    _.Ha(c);
                for (var d; !(d = c.next()).done;) this.add(d.value)
            }
            this.size = this.Ha.size
        };
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.Ha.set(c, c);
            this.size = this.Ha.size;
            return this
        };
        b.prototype.delete = function(c) {
            c = this.Ha.delete(c);
            this.size = this.Ha.size;
            return c
        };
        b.prototype.clear = function() {
            this.Ha.clear();
            this.size = 0
        };
        b.prototype.has = function(c) {
            return this.Ha.has(c)
        };
        b.prototype.entries = function() {
            return this.Ha.entries()
        };
        b.prototype.values = function() {
            return this.Ha.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.Ha.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        };
        return b
    });
    _.q = {};
    _.Wa = _.Wa || {};
    _.A = this || self;
    _.Ya = "closure_uid_" + (1E9 * Math.random() >>> 0);
    _.C = function(a, b) {
        a = a.split(".");
        var c = _.A;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b
    };
    _.K = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.T = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.yp = function(d, e, f) {
            for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
            return b.prototype[e].apply(d, g)
        }
    };
    gadgets = window.gadgets || {};
    osapi = window.osapi = window.osapi || {};

    window.___jsl = window.___jsl || {};
    (window.___jsl.cd = window.___jsl.cd || []).push({
        gwidget: {
            parsetags: "explicit"
        },
        appsapi: {
            plus_one_service: "/plus/v1"
        },
        csi: {
            rate: .01
        },
        poshare: {
            hangoutContactPickerServer: "https://plus.google.com"
        },
        gappsutil: {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: !1
        },
        appsutil: {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: !1
        },
        "oauth-flow": {
            authUrl: "https://accounts.google.com/o/oauth2/auth",
            proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
            redirectUri: "postmessage"
        },
        iframes: {
            sharebox: {
                params: {
                    json: "&"
                },
                url: ":socialhost:/:session_prefix:_/sharebox/dialog"
            },
            plus: {
                url: ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
            },
            ":socialhost:": "https://apis.google.com",
            ":im_socialhost:": "https://plus.googleapis.com",
            domains_suggest: {
                url: "https://domains.google.com/suggest/flow"
            },
            card: {
                params: {
                    s: "#",
                    userid: "&"
                },
                url: ":socialhost:/:session_prefix:_/hovercard/internalcard"
            },
            ":signuphost:": "https://plus.google.com",
            ":gplus_url:": "https://plus.google.com",
            plusone: {
                url: ":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1"
            },
            plus_share: {
                url: ":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1"
            },
            plus_circle: {
                url: ":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1"
            },
            plus_followers: {
                url: ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
            },
            configurator: {
                url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
            },
            appcirclepicker: {
                url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
            },
            page: {
                url: ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
            },
            person: {
                url: ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
            },
            community: {
                url: ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
            },
            follow: {
                url: ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
            },
            commentcount: {
                url: ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
            },
            comments: {
                url: ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1"
            },
            blogger: {
                url: ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1"
            },
            youtube: {
                url: ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1"
            },
            reportabuse: {
                url: ":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1"
            },
            additnow: {
                url: ":socialhost:/additnow/additnow.html"
            },
            appfinder: {
                url: "https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
            },
            ":source:": "1p"
        },
        poclient: {
            update_session: "google.updateSessionCallback"
        },
        "googleapis.config": {
            rpc: "/rpc",
            root: "https://content.googleapis.com",
            "root-1p": "https://clients6.google.com",
            useGapiForXd3: !0,
            xd3: "/static/proxy.html",
            auth: {
                useInterimAuth: !1
            }
        },
        report: {
            apis: ["iframes\\..*", "gadgets\\..*", "gapi\\.appcirclepicker\\..*", "gapi\\.client\\..*"],
            rate: 1E-4
        },
        client: {
            perApiBatch: !0
        }
    });

    window.___jsl = window.___jsl || {};
    (window.___jsl.cd = window.___jsl.cd || []).push({
        gwidget: {
            parsetags: "onload"
        },
        iframes: {
            ":source:": "3p"
        }
    });

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var jb, kb, mb;
    _.$a = function(a, b) {
        return 0 <= (0, _.Za)(a, b)
    };
    _.bb = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    };
    _.cb = function() {};
    _.eb = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    };
    _.hb = function(a) {
        var b = _.eb(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    };
    jb = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    };
    kb = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    };
    _.R = function(a, b, c) {
        _.R = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? jb : kb;
        return _.R.apply(null, arguments)
    };
    _.lb = function() {
        return Date.now()
    };
    mb = function(a) {
        return a
    };
    _.Za = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };
    _.nb = Array.prototype.lastIndexOf ? function(a, b) {
        return Array.prototype.lastIndexOf.call(a, b, a.length - 1)
    } : function(a, b) {
        var c = a.length - 1;
        0 > c && (c = Math.max(0, a.length + c));
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
        for (; 0 <= c; c--)
            if (c in a && a[c] === b) return c;
        return -1
    };
    _.ob = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    };
    _.pb = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var k = f[g];
                b.call(void 0, k, g, a) && (d[e++] = k)
            }
        return d
    };
    _.qb = Array.prototype.map ? function(a, b) {
        return Array.prototype.map.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    };
    _.rb = Array.prototype.some ? function(a, b, c) {
        return Array.prototype.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    };
    _.sb = Array.prototype.every ? function(a, b, c) {
        return Array.prototype.every.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    };
    var vb;
    _.tb = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    };
    _.wb = function(a, b) {
        var c = 0;
        a = (0, _.tb)(String(a)).split(".");
        b = (0, _.tb)(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length) break;
                c = vb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || vb(0 == f[2].length, 0 == g[2].length) || vb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    };
    vb = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    a: {
        var yb = _.A.navigator;
        if (yb) {
            var zb = yb.userAgent;
            if (zb) {
                _.xb = zb;
                break a
            }
        }
        _.xb = ""
    }
    _.Bb = function(a) {
        return -1 != _.xb.indexOf(a)
    };
    var Eb;
    _.Db = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    };
    Eb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    _.Fb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Eb.length; f++) c = Eb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    _.Gb = function() {
        return _.Bb("Opera")
    };
    _.Hb = function() {
        return _.Bb("Trident") || _.Bb("MSIE")
    };
    _.Ib = function() {
        return _.Bb("Firefox") || _.Bb("FxiOS")
    };
    _.Jb = function() {
        return (_.Bb("Chrome") || _.Bb("CriOS")) && !_.Bb("Edge")
    };
    _.Kb = function(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };
    var Lb;
    _.Mb = function() {
        if (void 0 === Lb) {
            var a = null,
                b = _.A.trustedTypes;
            if (b && b.createPolicy) try {
                a = b.createPolicy("goog#html", {
                    createHTML: mb,
                    createScript: mb,
                    createScriptURL: mb
                })
            } catch (c) {
                _.A.console && _.A.console.error(c.message)
            }
            Lb = a
        }
        return Lb
    };
    var Ob, Nb;
    _.Pb = function(a, b) {
        this.EN = a === Nb && b || "";
        this.gR = Ob
    };
    _.Pb.prototype.Ph = !0;
    _.Pb.prototype.xd = _.ja(4);
    _.Qb = function(a) {
        return a instanceof _.Pb && a.constructor === _.Pb && a.gR === Ob ? a.EN : "type_error:Const"
    };
    _.Rb = function(a) {
        return new _.Pb(Nb, a)
    };
    Ob = {};
    Nb = {};
    _.Ub = function(a, b) {
        this.OL = b === _.Sb ? a : ""
    };
    _.Ub.prototype.Ph = !0;
    _.Ub.prototype.xd = _.ja(3);
    _.Ub.prototype.zB = !0;
    _.Ub.prototype.Hh = _.ja(6);
    _.Sb = {};
    _.Wb = new _.Ub("about:invalid#zClosurez", _.Sb);
    _.Yb = function(a, b) {
        this.NL = b === _.Xb ? a : ""
    };
    _.Yb.prototype.Ph = !0;
    _.Yb.prototype.xd = _.ja(2);
    _.Xb = {};
    _.Zb = new _.Yb("", _.Xb);
    _.$b = {};
    _.ac = function(a, b) {
        this.ML = b === _.$b ? a : "";
        this.Ph = !0
    };
    _.cc = function(a) {
        a = _.Qb(a);
        return 0 === a.length ? bc : new _.ac(a, _.$b)
    };
    _.ac.prototype.xd = _.ja(1);
    var bc = new _.ac("", _.$b);
    var dc;
    _.ec = function(a, b, c) {
        this.LL = c === dc ? a : "";
        this.GS = b
    };
    _.ec.prototype.zB = !0;
    _.ec.prototype.Hh = _.ja(5);
    _.ec.prototype.Ph = !0;
    _.ec.prototype.xd = _.ja(0);
    _.fc = function(a) {
        if (a instanceof _.ec && a.constructor === _.ec) return a.LL;
        _.eb(a);
        return "type_error:SafeHtml"
    };
    dc = {};
    _.gc = function(a, b) {
        var c = _.Mb();
        a = c ? c.createHTML(a) : a;
        return new _.ec(a, b, dc)
    };
    _.hc = new _.ec(_.A.trustedTypes && _.A.trustedTypes.emptyHTML || "", 0, dc);
    _.ic = _.gc("<br>", 0);
    _.jc = _.Kb(function() {
        var a = document.createElement("div"),
            b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = _.fc(_.hc);
        return !b.parentElement
    });
    _.kc = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    } : function(a, b) {
        return Array(b + 1).join(a)
    };
    _.lc = 2147483648 * Math.random() | 0;
    _.mc = function() {
        return _.Bb("iPhone") && !_.Bb("iPod") && !_.Bb("iPad")
    };
    _.nc = function() {
        return _.mc() || _.Bb("iPad") || _.Bb("iPod")
    };
    var oc = function(a) {
        oc[" "](a);
        return a
    };
    oc[" "] = _.cb;
    _.pc = function(a, b) {
        try {
            return oc(a[b]), !0
        } catch (c) {}
        return !1
    };
    _.qc = function(a, b, c) {
        return Object.prototype.hasOwnProperty.call(a, b) ? a[b] : a[b] = c(b)
    };
    var Gc, Jc, Oc, Sc;
    _.rc = _.Gb();
    _.sc = _.Hb();
    _.tc = _.Bb("Edge");
    _.uc = _.tc || _.sc;
    _.vc = _.Bb("Gecko") && !(-1 != _.xb.toLowerCase().indexOf("webkit") && !_.Bb("Edge")) && !(_.Bb("Trident") || _.Bb("MSIE")) && !_.Bb("Edge");
    _.wc = -1 != _.xb.toLowerCase().indexOf("webkit") && !_.Bb("Edge");
    _.xc = _.wc && _.Bb("Mobile");
    _.yc = _.Bb("Macintosh");
    _.zc = _.Bb("Windows");
    _.Ac = _.Bb("Linux") || _.Bb("CrOS");
    _.Bc = _.Bb("Android");
    _.Cc = _.mc();
    _.Dc = _.Bb("iPad");
    _.Ec = _.Bb("iPod");
    _.Fc = _.nc();
    Gc = function() {
        var a = _.A.document;
        return a ? a.documentMode : void 0
    };
    a: {
        var Kc = "",
            Lc = function() {
                var a = _.xb;
                if (_.vc) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (_.tc) return /Edge\/([\d\.]+)/.exec(a);
                if (_.sc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (_.wc) return /WebKit\/(\S+)/.exec(a);
                if (_.rc) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();Lc && (Kc = Lc ? Lc[1] : "");
        if (_.sc) {
            var Mc = Gc();
            if (null != Mc && Mc > parseFloat(Kc)) {
                Jc = String(Mc);
                break a
            }
        }
        Jc = Kc
    }
    _.Nc = Jc;
    Oc = {};
    _.Pc = function(a) {
        return _.qc(Oc, a, function() {
            return 0 <= _.wb(_.Nc, a)
        })
    };
    _.Rc = function(a) {
        return Number(_.Qc) >= a
    };
    if (_.A.document && _.sc) {
        var Tc = Gc();
        Sc = Tc ? Tc : parseInt(_.Nc, 10) || void 0
    } else Sc = void 0;
    _.Qc = Sc;

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Yc, Zc, $c, bd, dd, fd, gd, hd, id, jd, kd, ld, nd, ud, vd, wd, xd, Fd, Gd;
    _.Uc = function(a, b) {
        return _.ea[a] = b
    };
    _.Vc = function(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, _.Vc);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    _.Wc = function(a) {
        return Array.prototype.concat.apply([], arguments)
    };
    _.Xc = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    _.Ub.prototype.Hh = _.Uc(6, function() {
        return 1
    });
    _.ec.prototype.Hh = _.Uc(5, function() {
        return this.GS
    });
    _.Pb.prototype.xd = _.Uc(4, function() {
        return this.EN
    });
    _.Ub.prototype.xd = _.Uc(3, function() {
        return this.OL.toString()
    });
    _.Yb.prototype.xd = _.Uc(2, function() {
        return this.NL
    });
    _.ac.prototype.xd = _.Uc(1, function() {
        return this.ML
    });
    _.ec.prototype.xd = _.Uc(0, function() {
        return this.LL.toString()
    });
    Yc = null;
    Zc = /^[\w+/_-]+[=]{0,2}$/;
    $c = function(a) {
        return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && Zc.test(a) ? a : ""
    };
    _.ad = function(a) {
        if (a && a != _.A) return $c(a.document);
        null === Yc && (Yc = $c(_.A.document));
        return Yc
    };
    bd = 0;
    _.cd = function(a) {
        return Object.prototype.hasOwnProperty.call(a, _.Ya) && a[_.Ya] || (a[_.Ya] = ++bd)
    };
    _.K(_.Vc, Error);
    _.Vc.prototype.name = "CustomError";
    _.ed = function(a, b) {
        return 0 == a.lastIndexOf(b, 0)
    };
    fd = /&/g;
    gd = /</g;
    hd = />/g;
    id = /"/g;
    jd = /'/g;
    kd = /\x00/g;
    ld = /[\x00&<>"']/;
    _.md = function(a, b) {
        if (b) a = a.replace(fd, "&amp;").replace(gd, "&lt;").replace(hd, "&gt;").replace(id, "&quot;").replace(jd, "&#39;").replace(kd, "&#0;");
        else {
            if (!ld.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(fd, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(gd, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(hd, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(id, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(jd, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(kd, "&#0;"))
        }
        return a
    };
    nd = {};
    _.od = function(a, b) {
        this.PL = b === nd ? a : ""
    };
    _.od.prototype.Ph = !0;
    _.od.prototype.xd = function() {
        return this.PL.toString()
    };
    _.od.prototype.zB = !0;
    _.od.prototype.Hh = function() {
        return 1
    };
    _.pd = function(a) {
        if (a instanceof _.od && a.constructor === _.od) return a.PL;
        _.eb(a);
        return "type_error:TrustedResourceUrl"
    };
    _.qd = function(a) {
        return _.pd(a).toString()
    };
    _.rd = function(a) {
        var b = _.Mb();
        a = b ? b.createScriptURL(a) : a;
        return new _.od(a, nd)
    };
    _.sd = function(a) {
        return _.rd(_.Qb(a))
    };
    _.td = function(a) {
        if (a instanceof _.Ub && a.constructor === _.Ub) return a.OL;
        _.eb(a);
        return "type_error:SafeUrl"
    };
    ud = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i;
    vd = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
    wd = function(a) {
        a = String(a);
        a = a.replace(/(%0A|%0D)/g, "");
        var b = a.match(vd);
        return b && ud.test(b[1]) ? new _.Ub(a, _.Sb) : null
    };
    xd = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    _.yd = function(a) {
        if (a instanceof _.Ub) return a;
        a = "object" == typeof a && a.Ph ? a.xd() : String(a);
        return xd.test(a) ? new _.Ub(a, _.Sb) : wd(a)
    };
    _.zd = function(a, b) {
        if (a instanceof _.Ub) return a;
        a = "object" == typeof a && a.Ph ? a.xd() : String(a);
        if (b && /^data:/i.test(a) && (b = wd(a) || _.Wb, b.xd() == a)) return b;
        xd.test(a) || (a = "about:invalid#zClosurez");
        return new _.Ub(a, _.Sb)
    };
    _.Ad = function(a) {
        if (a instanceof _.ec) return a;
        var b = "object" == typeof a,
            c = null;
        b && a.zB && (c = a.Hh());
        return _.gc(_.md(b && a.Ph ? a.xd() : String(a)), c)
    };
    _.Bd = function(a, b) {
        if ((0, _.jc)())
            for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = _.fc(b)
    };
    _.Cd = function(a, b) {
        b = b instanceof _.Ub ? b : _.zd(b);
        a.href = _.td(b)
    };
    _.Dd = function(a, b, c, d) {
        a = a instanceof _.Ub ? a : _.zd(a);
        c = c instanceof _.Pb ? _.Qb(c) : c || "";
        return (b || _.A).open(_.td(a), c, d, void 0)
    };
    _.Ed = function(a) {
        return a = _.md(a, void 0)
    };
    Fd = !_.sc || _.Rc(9);
    Gd = !_.vc && !_.sc || _.sc && _.Rc(9) || _.vc && _.Pc("1.9.1");
    _.Hd = _.sc && !_.Pc("9");
    _.Id = _.sc || _.rc || _.wc;
    _.Md = _.sc && !_.Rc(9);
    var Sd, Wd;
    _.Pd = function(a) {
        return a ? new _.Nd(_.Od(a)) : dd || (dd = new _.Nd)
    };
    _.Qd = function(a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    };
    _.Rd = function(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && _.$a(b.split(/\s+/), c) && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    };
    _.Td = function(a, b) {
        _.Db(b, function(c, d) {
            c && "object" == typeof c && c.Ph && (c = c.xd());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Sd.hasOwnProperty(d) ? a.setAttribute(Sd[d], c) : _.ed(d, "aria-") || _.ed(d, "data-") ? a.setAttribute(d, c) : a[d] = c
        })
    };
    Sd = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    _.Ud = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    };
    _.Xd = function(a, b) {
        var c = String(b[0]),
            d = b[1];
        if (!Fd && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', _.Ed(d.name), '"');
            if (d.type) {
                c.push(' type="', _.Ed(d.type), '"');
                var e = {};
                _.Fb(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c = _.Vd(a, c);
        d && ("string" === typeof d ? c.className = d : Array.isArray(d) ? c.className = d.join(" ") : _.Td(c, d));
        2 < b.length && Wd(a, c, b, 2);
        return c
    };
    Wd = function(a, b, c, d) {
        function e(k) {
            k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!_.hb(f) || _.bb(f) && 0 < f.nodeType) e(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (_.bb(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                _.ob(g ? _.Xc(f) : f, e)
            }
        }
    };
    _.Zd = function(a) {
        return _.Vd(document, a)
    };
    _.Vd = function(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    };
    _.$d = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    _.ae = function(a, b) {
        Wd(_.Od(a), a, arguments, 1)
    };
    _.be = function(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    };
    _.ce = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    };
    _.de = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    _.ee = function(a) {
        var b, c = a.parentNode;
        if (c && 11 != c.nodeType) {
            if (a.removeNode) return a.removeNode(!1);
            for (; b = a.firstChild;) c.insertBefore(b, a);
            return _.de(a)
        }
    };
    _.fe = function(a) {
        return Gd && void 0 != a.children ? a.children : _.pb(a.childNodes, function(b) {
            return 1 == b.nodeType
        })
    };
    _.ge = function(a) {
        return _.bb(a) && 1 == a.nodeType
    };
    _.he = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    _.Od = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    };
    _.ie = function(a, b) {
        if ("textContent" in a) a.textContent = b;
        else if (3 == a.nodeType) a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = String(b)
        } else _.be(a), a.appendChild(_.Od(a).createTextNode(String(b)))
    };
    _.Nd = function(a) {
        this.rb = a || _.A.document || document
    };
    _.h = _.Nd.prototype;
    _.h.Fa = _.Pd;
    _.h.ND = _.ja(7);
    _.h.ub = function() {
        return this.rb
    };
    _.h.H = function(a) {
        return _.Qd(this.rb, a)
    };
    _.h.getElementsByTagName = function(a, b) {
        return (b || this.rb).getElementsByTagName(String(a))
    };
    _.h.ta = function(a, b, c) {
        return _.Xd(this.rb, arguments)
    };
    _.h.createElement = function(a) {
        return _.Vd(this.rb, a)
    };
    _.h.createTextNode = function(a) {
        return this.rb.createTextNode(String(a))
    };
    _.h.Ab = function() {
        var a = this.rb;
        return a.parentWindow || a.defaultView
    };
    _.h.appendChild = function(a, b) {
        a.appendChild(b)
    };
    _.h.append = _.ae;
    _.h.canHaveChildren = _.$d;
    _.h.Nd = _.be;
    _.h.ZJ = _.ce;
    _.h.removeNode = _.de;
    _.h.qT = _.ee;
    _.h.lA = _.fe;
    _.h.isElement = _.ge;
    _.h.contains = _.he;
    _.h.Sh = _.ja(8);
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    _.je = window;
    _.ke = document;
    _.le = _.je.location;
    _.me = /\[native code\]/;
    _.ne = function(a, b, c) {
        return a[b] = a[b] || c
    };
    _.oe = function() {
        var a;
        if ((a = Object.create) && _.me.test(a)) a = a(null);
        else {
            a = {};
            for (var b in a) a[b] = void 0
        }
        return a
    };
    _.pe = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    _.qe = function(a, b) {
        a = a || {};
        for (var c in a) _.pe(a, c) && (b[c] = a[c])
    };
    _.re = _.ne(_.je, "gapi", {});
    _.te = function(a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
        b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
        if (a = a && (d.exec(a) || b.exec(a))) try {
            c = decodeURIComponent(a[2])
        } catch (e) {}
        return c
    };
    _.ue = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source);
    _.ve = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source, "g");
    _.we = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i");
    _.ye = function(a, b, c) {
        _.xe(a, b, c, "add", "at")
    };
    _.xe = function(a, b, c, d, e) {
        if (a[d + "EventListener"]) a[d + "EventListener"](b, c, !1);
        else if (a[e + "tachEvent"]) a[e + "tachEvent"]("on" + b, c)
    };
    _.ze = _.ne(_.je, "___jsl", _.oe());
    _.ne(_.ze, "I", 0);
    _.ne(_.ze, "hel", 10);
    var Ae, Be, Ce, De, Ee, Fe, Ge;
    Ae = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    };
    Be = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = !a && b.cfg || {};
        return b.cfg
    };
    Ce = function(a) {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    };
    De = function(a, b, c) {
        if (b && "object" === typeof b)
            for (var d in b) !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !Ce(a[d]) && !Ce(b[d]) ? De(a[d], b[d]) : b[d] && "object" === typeof b[d] ? (a[d] = Ce(b[d]) ? [] : {}, De(a[d], b[d])) : a[d] = b[d])
    };
    Ee = function(a) {
        if (a && !/^\s+$/.test(a)) {
            for (; 0 == a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
            try {
                var b = window.JSON.parse(a)
            } catch (c) {}
            if ("object" === typeof b) return b;
            try {
                b = (new Function("return (" + a + "\n)"))()
            } catch (c) {}
            if ("object" === typeof b) return b;
            try {
                b = (new Function("return ({" + a + "\n})"))()
            } catch (c) {}
            return "object" === typeof b ? b : {}
        }
    };
    Fe = function(a, b) {
        var c = {
            ___goc: void 0
        };
        a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length - 1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
        De(c, b);
        a.push(c)
    };
    Ge = function(a) {
        Be(!0);
        var b = window.___gcfg,
            c = Ae("cu"),
            d = window.___gu;
        b && b !== d && (Fe(c, b), window.___gu = b);
        b = Ae("cu");
        var e = document.scripts || document.getElementsByTagName("script") || [];
        d = [];
        var f = [];
        f.push.apply(f, Ae("us"));
        for (var g = 0; g < e.length; ++g)
            for (var k = e[g], l = 0; l < f.length; ++l) k.src && 0 == k.src.indexOf(f[l]) && d.push(k);
        0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
        for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") || (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g =
            f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || f.innerText || f.innerHTML || "") : f = void 0, (f = Ee(f)) && b.push(f));
        a && Fe(c, a);
        d = Ae("cd");
        a = 0;
        for (b = d.length; a < b; ++a) De(Be(), d[a], !0);
        d = Ae("ci");
        a = 0;
        for (b = d.length; a < b; ++a) De(Be(), d[a], !0);
        a = 0;
        for (b = c.length; a < b; ++a) De(Be(), c[a], !0)
    };
    _.S = function(a, b) {
        var c = Be();
        if (!a) return c;
        a = a.split("/");
        for (var d = 0, e = a.length; c && "object" === typeof c && d < e; ++d) c = c[a[d]];
        return d === a.length && void 0 !== c ? c : b
    };
    _.He = function(a, b) {
        var c;
        if ("string" === typeof a) {
            var d = c = {};
            a = a.split("/");
            for (var e = 0, f = a.length; e < f - 1; ++e) {
                var g = {};
                d = d[a[e]] = g
            }
            d[a[e]] = b
        } else c = a;
        Ge(c)
    };
    var Ie = function() {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), _.ne(_.ze, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    Ie && Ie();
    Ge();
    _.C("gapi.config.get", _.S);
    _.C("gapi.config.update", _.He);

    _.Je = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (_.hb(d)) {
                var e = a.length || 0,
                    f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++) a[e + g] = d[g]
            } else a.push(d)
        }
    };
    _.Ke = function(a) {
        for (var b = {}, c = 0, d = 0; d < a.length;) {
            var e = a[d++];
            var f = e;
            f = _.bb(f) ? "o" + _.cd(f) : (typeof f).charAt(0) + f;
            Object.prototype.hasOwnProperty.call(b, f) || (b[f] = !0, a[c++] = e)
        }
        a.length = c
    };
    _.Le = function(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    };
    _.Me = function(a) {
        return /^[\s\xa0]*$/.test(a)
    };
    _.Ne = function(a, b) {
        var c = b || document;
        if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
        else {
            c = document;
            var d = b || c;
            a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : _.Rd(c, "*", a, b)[0] || null
        }
        return a || null
    };

    var Te, Ue, Ve, We, Xe, Ye, Ze, $e, af, bf, cf, df, ef, ff, gf, hf, jf, kf, lf, mf, nf, of, pf, qf, rf, sf, tf, uf, vf, wf, xf, Af, Bf;
    Ve = void 0;
    We = function(a) {
        try {
            return _.A.JSON.parse.call(_.A.JSON, a)
        } catch (b) {
            return !1
        }
    };
    Xe = function(a) {
        return Object.prototype.toString.call(a)
    };
    Ye = Xe(0);
    Ze = Xe(new Date(0));
    $e = Xe(!0);
    af = Xe("");
    bf = Xe({});
    cf = Xe([]);
    df = function(a, b) {
        if (b)
            for (var c = 0, d = b.length; c < d; ++c)
                if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = Xe(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a, "toJSON") || (e !== cf || a.constructor !== Array && a.constructor !== Object) && (e !== bf || a.constructor !== Array && a.constructor !== Object) && e !== af && e !== Ye && e !== $e && e !== Ze)) return df(a.toJSON.call(a), c);
            if (null ==
                a) b[b.length] = "null";
            else if (e === Ye) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
            else if (e === $e) b[b.length] = String(!!Number(a));
            else {
                if (e === Ze) return df(a.toISOString.call(a), c);
                if (e === cf && Xe(a.length) === Ye) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f) f && (b[b.length] = ","), b[b.length] = df(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == af && Xe(a.length) === Ye) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f),
                        e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a) Object.prototype.hasOwnProperty.call(a, f) && (e = df(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = df(f), b[b.length] = ":", b[b.length] = e));
                    b[b.length] = "}"
                } else return
            }
            return b.join("")
        }
    };
    ef = /[\0-\x07\x0b\x0e-\x1f]/;
    ff = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/;
    gf = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/;
    hf = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/;
    jf = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g;
    kf = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g;
    lf = /[ \t\n\r]+/g;
    mf = /[^"]:/;
    nf = /""/g;
    of = /true|false|null/g;
    pf = /00/;
    qf = /[\{]([^0\}]|0[^:])/;
    rf = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/;
    sf = /[^\[,:][\[\{]/;
    tf = /^(\{|\}|\[|\]|,|:|0)+/;
    uf = /\u2028/g;
    vf = /\u2029/g;
    wf = function(a) {
        a = String(a);
        if (ef.test(a) || ff.test(a) || gf.test(a) || hf.test(a)) return !1;
        var b = a.replace(jf, '""');
        b = b.replace(kf, "0");
        b = b.replace(lf, "");
        if (mf.test(b)) return !1;
        b = b.replace(nf, "0");
        b = b.replace(of, "0");
        if (pf.test(b) || qf.test(b) || rf.test(b) || sf.test(b) || !b || (b = b.replace(tf, ""))) return !1;
        a = a.replace(uf, "\\u2028").replace(vf, "\\u2029");
        b = void 0;
        try {
            b = Ve ? [We(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 ===
            b.length ? b[0] : !1
    };
    xf = function() {
        var a = ((_.A.document || {}).scripts || []).length;
        if ((void 0 === Te || void 0 === Ve || Ue !== a) && -1 !== Ue) {
            Te = Ve = !1;
            Ue = -1;
            try {
                try {
                    Ve = !!_.A.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === _.A.JSON.stringify.call(_.A.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function() {}
                    }) && !0 === We("true") && 3 === We('[{"a":3}]')[0].a
                } catch (b) {}
                Te = Ve && !We("[00]") && !We('"\u0007"') && !We('"\\0"') && !We('"\\v"')
            } finally {
                Ue = a
            }
        }
    };
    _.yf = function(a) {
        if (-1 === Ue) return !1;
        xf();
        return (Te ? We : wf)(a)
    };
    _.zf = function(a) {
        if (-1 !== Ue) return xf(), Ve ? _.A.JSON.stringify.call(_.A.JSON, a) : df(a)
    };
    Af = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString();
    Bf = function() {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1),
            "Z"
        ].join("")
    };
    Date.prototype.toISOString = Af ? Bf : Date.prototype.toISOString;

    var Cf;
    Cf = window.console;
    _.Df = function(a) {
        Cf && Cf.log && Cf.log(a)
    };
    _.Ff = function(a) {
        Cf && (Cf.error ? Cf.error(a) : Cf.log && Cf.log(a))
    };
    _.Gf = function(a) {
        Cf && (Cf.warn ? Cf.warn(a) : Cf.log && Cf.log(a))
    };
    _.Hf = function() {};

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Yg = function() {
        return _.Bb("Safari") && !(_.Jb() || _.Bb("Coast") || _.Gb() || _.Bb("Edge") || _.Bb("Edg/") || _.Bb("OPR") || _.Ib() || _.Bb("Silk") || _.Bb("Android"))
    };
    _.Zg = function() {
        return _.Bb("Android") && !(_.Jb() || _.Ib() || _.Gb() || _.Bb("Silk"))
    };
    _.$g = _.Ib();
    _.ah = _.mc() || _.Bb("iPod");
    _.bh = _.Bb("iPad");
    _.ch = _.Zg();
    _.dh = _.Jb();
    _.eh = _.Yg() && !_.nc();

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.fh = function(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        return b
    };
    var gh;
    gh = {};
    _.hh = null;
    _.ih = _.vc || _.wc && !_.eh || _.rc || !_.eh && !_.sc && "function" == typeof _.A.atob;
    _.kh = function(a, b) {
        void 0 === b && (b = 0);
        _.jh();
        b = gh[b];
        for (var c = [], d = 0; d < a.length; d += 3) {
            var e = a[d],
                f = d + 1 < a.length,
                g = f ? a[d + 1] : 0,
                k = d + 2 < a.length,
                l = k ? a[d + 2] : 0,
                m = e >> 2;
            e = (e & 3) << 4 | g >> 4;
            g = (g & 15) << 2 | l >> 6;
            l &= 63;
            k || (l = 64, f || (g = 64));
            c.push(b[m], b[e], b[g] || "", b[l] || "")
        }
        return c.join("")
    };
    _.jh = function() {
        if (!_.hh) {
            _.hh = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                gh[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === _.hh[f] && (_.hh[f] = e)
                }
            }
        }
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Ch;
    _.Bh = function(a) {
        this.rb = a || {
            cookie: ""
        }
    };
    _.h = _.Bh.prototype;
    _.h.isEnabled = function() {
        return navigator.cookieEnabled
    };
    _.h.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.ica;
            d = c.secure || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var k = c.HK
        }
        if (/[;=\s]/.test(a)) throw Error("x`" + a);
        if (/[;\r\n]/.test(b)) throw Error("y`" + b);
        void 0 === k && (k = -1);
        this.rb.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > k ? "" : 0 == k ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(_.lb() + 1E3 * k)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
    };
    _.h.get = function(a, b) {
        for (var c = a + "=", d = (this.rb.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = (0, _.tb)(d[e]);
            if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
            if (f == a) return ""
        }
        return b
    };
    _.h.remove = function(a, b, c) {
        var d = this.Ud(a);
        this.set(a, "", {
            HK: 0,
            path: b,
            domain: c
        });
        return d
    };
    _.h.Ae = function() {
        return Ch(this).keys
    };
    _.h.Xc = function() {
        return Ch(this).values
    };
    _.h.isEmpty = function() {
        return !this.rb.cookie
    };
    _.h.Hb = function() {
        return this.rb.cookie ? (this.rb.cookie || "").split(";").length : 0
    };
    _.h.Ud = function(a) {
        return void 0 !== this.get(a)
    };
    _.h.Sj = function(a) {
        for (var b = Ch(this).values, c = 0; c < b.length; c++)
            if (b[c] == a) return !0;
        return !1
    };
    _.h.clear = function() {
        for (var a = Ch(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
    };
    Ch = function(a) {
        a = (a.rb.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++) e = (0, _.tb)(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    };
    _.Dh = new _.Bh("undefined" == typeof document ? null : document);

    _.Lh = {};
    _.Mh = function(a) {
        return _.Lh[a || "token"] || null
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.hi = function(a, b) {
        a: {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    };
    _.ii = function(a, b) {
        a.prototype = (0, _.Ja)(b.prototype);
        a.prototype.constructor = a;
        if (_.Ra)(0, _.Ra)(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.T = b.prototype
    };
    _.ji = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    };
    _.ki = [];
    _.li = [];
    _.mi = !1;
    _.ni = function(a) {
        _.ki[_.ki.length] = a;
        if (_.mi)
            for (var b = 0; b < _.li.length; b++) a((0, _.R)(_.li[b].wrap, _.li[b]))
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var qi;
    _.oi = function(a, b) {
        b = (0, _.Za)(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    };
    _.pi = function(a, b) {
        a = a.split(".");
        b = b || _.A;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]], null == b) return null;
        return b
    };
    qi = function(a, b) {
        for (var c in a)
            if (b.call(void 0, a[c], c, a)) return !0;
        return !1
    };
    _.ri = function() {
        this.Ob = this.Ob;
        this.km = this.km
    };
    _.ri.prototype.Ob = !1;
    _.ri.prototype.Vn = function() {
        return this.Ob
    };
    _.ri.prototype.Da = function() {
        this.Ob || (this.Ob = !0, this.va())
    };
    _.ui = function(a, b) {
        _.si(a, _.ji(_.ti, b))
    };
    _.si = function(a, b) {
        a.Ob ? b() : (a.km || (a.km = []), a.km.push(b))
    };
    _.ri.prototype.va = function() {
        if (this.km)
            for (; this.km.length;) this.km.shift()()
    };
    _.ti = function(a) {
        a && "function" == typeof a.Da && a.Da()
    };
    _.vi = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.wm = !1
    };
    _.vi.prototype.stopPropagation = function() {
        this.wm = !0
    };
    _.vi.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    };
    var xi, yi;
    _.wi = !_.sc || _.Rc(9);
    xi = !_.sc || _.Rc(9);
    yi = _.sc && !_.Pc("9");
    !_.wc || _.Pc("528");
    _.vc && _.Pc("1.9b") || _.sc && _.Pc("8") || _.rc && _.Pc("9.5") || _.wc && _.Pc("528");
    _.vc && !_.Pc("8") || _.sc && _.Pc("9");
    var zi = function() {
        if (!_.A.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        try {
            _.A.addEventListener("test", _.cb, b), _.A.removeEventListener("test", _.cb, b)
        } catch (c) {}
        return a
    }();
    _.Ai = function(a, b) {
        _.vi.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.TC = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.xe = null;
        a && this.init(a, b)
    };
    _.K(_.Ai, _.vi);
    var Bi = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    _.Ai.prototype.init = function(a, b) {
        var c = this.type = a.type,
            d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        (b = a.relatedTarget) ? _.vc && (_.pc(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.offsetX = _.wc || void 0 !==
            a.offsetX ? a.offsetX : a.layerX, this.offsetY = _.wc || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.TC = _.yc ? a.metaKey : a.ctrlKey;
        this.pointerId = a.pointerId ||
            0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Bi[a.pointerType] || "";
        this.state = a.state;
        this.xe = a;
        a.defaultPrevented && this.preventDefault()
    };
    _.Ai.prototype.stopPropagation = function() {
        _.Ai.T.stopPropagation.call(this);
        this.xe.stopPropagation ? this.xe.stopPropagation() : this.xe.cancelBubble = !0
    };
    _.Ai.prototype.preventDefault = function() {
        _.Ai.T.preventDefault.call(this);
        var a = this.xe;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, yi) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    var Ei;
    _.Ci = "closure_listenable_" + (1E6 * Math.random() | 0);
    _.Di = function(a) {
        return !(!a || !a[_.Ci])
    };
    Ei = 0;
    var Fi = function(a, b, c, d, e) {
            this.listener = a;
            this.tw = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.Ye = e;
            this.key = ++Ei;
            this.ro = this.Bt = !1
        },
        Gi = function(a) {
            a.ro = !0;
            a.listener = null;
            a.tw = null;
            a.src = null;
            a.Ye = null
        };
    _.Hi = function(a) {
        this.src = a;
        this.yd = {};
        this.Es = 0
    };
    _.Hi.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.yd[f];
        a || (a = this.yd[f] = [], this.Es++);
        var g = Ii(a, b, d, e); - 1 < g ? (b = a[g], c || (b.Bt = !1)) : (b = new Fi(b, this.src, f, !!d, e), b.Bt = c, a.push(b));
        return b
    };
    _.Hi.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.yd)) return !1;
        var e = this.yd[a];
        b = Ii(e, b, c, d);
        return -1 < b ? (Gi(e[b]), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.yd[a], this.Es--), !0) : !1
    };
    _.Ji = function(a, b) {
        var c = b.type;
        if (!(c in a.yd)) return !1;
        var d = _.oi(a.yd[c], b);
        d && (Gi(b), 0 == a.yd[c].length && (delete a.yd[c], a.Es--));
        return d
    };
    _.Hi.prototype.removeAll = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.yd)
            if (!a || c == a) {
                for (var d = this.yd[c], e = 0; e < d.length; e++) ++b, Gi(d[e]);
                delete this.yd[c];
                this.Es--
            }
        return b
    };
    _.Hi.prototype.Bn = function(a, b, c, d) {
        a = this.yd[a.toString()];
        var e = -1;
        a && (e = Ii(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    _.Hi.prototype.hasListener = function(a, b) {
        var c = void 0 !== a,
            d = c ? a.toString() : "",
            e = void 0 !== b;
        return qi(this.yd, function(f) {
            for (var g = 0; g < f.length; ++g)
                if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
            return !1
        })
    };
    var Ii = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ro && f.listener == b && f.capture == !!c && f.Ye == d) return e
        }
        return -1
    };
    var Ki, Li, Mi, Qi, Si, Ti, Xi, Wi, Ui, Yi;
    Ki = "closure_lm_" + (1E6 * Math.random() | 0);
    Li = {};
    Mi = 0;
    _.Oi = function(a, b, c, d, e) {
        if (d && d.once) return _.Ni(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) _.Oi(a, b[f], c, d, e);
            return null
        }
        c = _.Pi(c);
        return _.Di(a) ? a.V(b, c, _.bb(d) ? !!d.capture : !!d, e) : Qi(a, b, c, !1, d, e)
    };
    Qi = function(a, b, c, d, e, f) {
        if (!b) throw Error("z");
        var g = _.bb(e) ? !!e.capture : !!e,
            k = _.Ri(a);
        k || (a[Ki] = k = new _.Hi(a));
        c = k.add(b, c, d, g, f);
        if (c.tw) return c;
        d = Si();
        c.tw = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) zi || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Ti(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("A");
        Mi++;
        return c
    };
    Si = function() {
        var a = Ui,
            b = xi ? function(c) {
                return a.call(b.src, b.listener, c)
            } : function(c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
        return b
    };
    _.Ni = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) _.Ni(a, b[f], c, d, e);
            return null
        }
        c = _.Pi(c);
        return _.Di(a) ? a.eo(b, c, _.bb(d) ? !!d.capture : !!d, e) : Qi(a, b, c, !0, d, e)
    };
    _.Vi = function(a) {
        if ("number" === typeof a || !a || a.ro) return !1;
        var b = a.src;
        if (_.Di(b)) return b.CE(a);
        var c = a.type,
            d = a.tw;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Ti(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Mi--;
        (c = _.Ri(b)) ? (_.Ji(c, a), 0 == c.Es && (c.src = null, b[Ki] = null)) : Gi(a);
        return !0
    };
    Ti = function(a) {
        return a in Li ? Li[a] : Li[a] = "on" + a
    };
    Xi = function(a, b, c, d) {
        var e = !0;
        if (a = _.Ri(a))
            if (b = a.yd[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.ro && (f = Wi(f, d), e = e && !1 !== f)
                }
            return e
    };
    Wi = function(a, b) {
        var c = a.listener,
            d = a.Ye || a.src;
        a.Bt && _.Vi(a);
        return c.call(d, b)
    };
    Ui = function(a, b) {
        if (a.ro) return !0;
        if (!xi) {
            var c = b || _.pi("window.event");
            b = new _.Ai(c, this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break a
                    } catch (g) {
                        e = !0
                    }
                    if (e || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (e = b.currentTarget; e; e = e.parentNode) c.push(e);a = a.type;
                for (e = c.length - 1; !b.wm && 0 <= e; e--) {
                    b.currentTarget = c[e];
                    var f = Xi(c[e], a, !0, b);
                    d = d && f
                }
                for (e = 0; !b.wm && e < c.length; e++) b.currentTarget = c[e],
                f = Xi(c[e], a, !1, b),
                d = d && f
            }
            return d
        }
        return Wi(a, new _.Ai(b,
            this))
    };
    _.Ri = function(a) {
        a = a[Ki];
        return a instanceof _.Hi ? a : null
    };
    Yi = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    _.Pi = function(a) {
        if ("function" === typeof a) return a;
        a[Yi] || (a[Yi] = function(b) {
            return a.handleEvent(b)
        });
        return a[Yi]
    };
    _.ni(function(a) {
        Ui = a(Ui)
    });

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Zi = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    };
    _.$i = function(a) {
        for (var b in a) return !1;
        return !0
    };
    _.cj = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) _.cj(a, b[f], c, d, e);
        else d = _.bb(d) ? !!d.capture : !!d, c = _.Pi(c), _.Di(a) ? a.$b(b, c, d, e) : a && (a = _.Ri(a)) && (b = a.Bn(b, c, d, e)) && _.Vi(b)
    };
    _.dj = function() {
        _.ri.call(this);
        this.Pi = new _.Hi(this);
        this.CR = this;
        this.OC = null
    };
    _.K(_.dj, _.ri);
    _.dj.prototype[_.Ci] = !0;
    _.h = _.dj.prototype;
    _.h.Jl = function() {
        return this.OC
    };
    _.h.Sw = _.ja(12);
    _.h.addEventListener = function(a, b, c, d) {
        _.Oi(this, a, b, c, d)
    };
    _.h.removeEventListener = function(a, b, c, d) {
        _.cj(this, a, b, c, d)
    };
    _.h.dispatchEvent = function(a) {
        var b, c = this.Jl();
        if (c)
            for (b = []; c; c = c.Jl()) b.push(c);
        c = this.CR;
        var d = a.type || a;
        if ("string" === typeof a) a = new _.vi(a, c);
        else if (a instanceof _.vi) a.target = a.target || c;
        else {
            var e = a;
            a = new _.vi(d, c);
            _.Fb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.wm && 0 <= f; f--) {
                var g = a.currentTarget = b[f];
                e = g.gq(d, !0, a) && e
            }
        a.wm || (g = a.currentTarget = c, e = g.gq(d, !0, a) && e, a.wm || (e = g.gq(d, !1, a) && e));
        if (b)
            for (f = 0; !a.wm && f < b.length; f++) g = a.currentTarget = b[f], e = g.gq(d, !1, a) && e;
        return e
    };
    _.h.va = function() {
        _.dj.T.va.call(this);
        this.cD();
        this.OC = null
    };
    _.h.V = function(a, b, c, d) {
        return this.Pi.add(String(a), b, !1, c, d)
    };
    _.h.eo = function(a, b, c, d) {
        return this.Pi.add(String(a), b, !0, c, d)
    };
    _.h.$b = function(a, b, c, d) {
        return this.Pi.remove(String(a), b, c, d)
    };
    _.h.CE = function(a) {
        return _.Ji(this.Pi, a)
    };
    _.h.cD = function(a) {
        this.Pi && this.Pi.removeAll(a)
    };
    _.h.gq = function(a, b, c) {
        a = this.Pi.yd[String(a)];
        if (!a) return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f && !f.ro && f.capture == b) {
                var g = f.listener,
                    k = f.Ye || f.src;
                f.Bt && this.CE(f);
                d = !1 !== g.call(k, c) && d
            }
        }
        return d && !c.defaultPrevented
    };
    _.h.Bn = function(a, b, c, d) {
        return this.Pi.Bn(String(a), b, c, d)
    };
    _.h.hasListener = function(a, b) {
        return this.Pi.hasListener(void 0 !== a ? String(a) : void 0, b)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var rk;
    _.kk = function(a, b) {
        for (var c in a)
            if (!(c in b) || a[c] !== b[c]) return !1;
        for (var d in b)
            if (!(d in a)) return !1;
        return !0
    };
    _.lk = function(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    };
    _.mk = function(a) {
        return a
    };
    _.nk = function(a, b) {
        a.src = _.pd(b);
        (b = _.ad(a.ownerDocument && a.ownerDocument.defaultView)) && a.setAttribute("nonce", b)
    };
    _.ok = function(a) {
        var b = window.location;
        a = a instanceof _.Ub ? a : _.zd(a);
        b.href = _.td(a)
    };
    _.pk = function(a) {
        a.prototype.$goog_Thenable = !0
    };
    _.qk = function(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    rk = function(a, b) {
        this.DS = a;
        this.XZ = b;
        this.Yv = 0;
        this.Ze = null
    };
    rk.prototype.get = function() {
        if (0 < this.Yv) {
            this.Yv--;
            var a = this.Ze;
            this.Ze = a.next;
            a.next = null
        } else a = this.DS();
        return a
    };
    rk.prototype.put = function(a) {
        this.XZ(a);
        100 > this.Yv && (this.Yv++, a.next = this.Ze, this.Ze = a)
    };
    var sk, uk, vk, tk;
    sk = function(a) {
        _.A.setTimeout(function() {
            throw a;
        }, 0)
    };
    _.wk = function(a) {
        a = tk(a);
        "function" !== typeof _.A.setImmediate || _.A.Window && _.A.Window.prototype && !_.Bb("Edge") && _.A.Window.prototype.setImmediate == _.A.setImmediate ? (uk || (uk = vk()), uk(a)) : _.A.setImmediate(a)
    };
    vk = function() {
        var a = _.A.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !_.Bb("Presto") && (a = function() {
            var e = _.Zd("IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random(),
                k = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = (0, _.R)(function(l) {
                if (("*" == k || l.origin == k) && l.data == g) this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, k)
                }
            }
        });
        if ("undefined" !== typeof a && !_.Hb()) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.cb;
                    c.cb = null;
                    e()
                }
            };
            return function(e) {
                d.next = {
                    cb: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            _.A.setTimeout(e, 0)
        }
    };
    tk = _.mk;
    _.ni(function(a) {
        tk = a
    });
    var xk = function() {
            this.yx = this.Uo = null
        },
        zk = new rk(function() {
            return new yk
        }, function(a) {
            a.reset()
        });
    xk.prototype.add = function(a, b) {
        var c = zk.get();
        c.set(a, b);
        this.yx ? this.yx.next = c : this.Uo = c;
        this.yx = c
    };
    xk.prototype.remove = function() {
        var a = null;
        this.Uo && (a = this.Uo, this.Uo = this.Uo.next, this.Uo || (this.yx = null), a.next = null);
        return a
    };
    var yk = function() {
        this.next = this.scope = this.Wg = null
    };
    yk.prototype.set = function(a, b) {
        this.Wg = a;
        this.scope = b;
        this.next = null
    };
    yk.prototype.reset = function() {
        this.next = this.scope = this.Wg = null
    };
    var Ak, Bk, Ck, Dk, Fk;
    _.Ek = function(a, b) {
        Ak || Bk();
        Ck || (Ak(), Ck = !0);
        Dk.add(a, b)
    };
    Bk = function() {
        if (_.A.Promise && _.A.Promise.resolve) {
            var a = _.A.Promise.resolve(void 0);
            Ak = function() {
                a.then(Fk)
            }
        } else Ak = function() {
            _.wk(Fk)
        }
    };
    Ck = !1;
    Dk = new xk;
    Fk = function() {
        for (var a; a = Dk.remove();) {
            try {
                a.Wg.call(a.scope)
            } catch (b) {
                sk(b)
            }
            zk.put(a)
        }
        Ck = !1
    };
    var Hk, Ik, Tk, Rk;
    _.Gk = function(a, b) {
        this.Ea = 0;
        this.ij = void 0;
        this.ln = this.Qj = this.$a = null;
        this.Pu = this.Qz = !1;
        if (a != _.cb) try {
            var c = this;
            a.call(b, function(d) {
                c.lh(2, d)
            }, function(d) {
                c.lh(3, d)
            })
        } catch (d) {
            this.lh(3, d)
        }
    };
    Hk = function() {
        this.next = this.context = this.jo = this.xr = this.ol = null;
        this.rp = !1
    };
    Hk.prototype.reset = function() {
        this.context = this.jo = this.xr = this.ol = null;
        this.rp = !1
    };
    Ik = new rk(function() {
        return new Hk
    }, function(a) {
        a.reset()
    });
    _.Jk = function(a, b, c) {
        var d = Ik.get();
        d.xr = a;
        d.jo = b;
        d.context = c;
        return d
    };
    _.Kk = function(a) {
        if (a instanceof _.Gk) return a;
        var b = new _.Gk(_.cb);
        b.lh(2, a);
        return b
    };
    _.Lk = function(a) {
        return new _.Gk(function(b, c) {
            c(a)
        })
    };
    _.Nk = function(a, b, c) {
        Mk(a, b, c, null) || _.Ek(_.ji(b, a))
    };
    _.Ok = function(a) {
        return new _.Gk(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(m, n) {
                        d--;
                        e[m] = n;
                        0 == d && b(e)
                    }, g = function(m) {
                        c(m)
                    }, k = 0, l; k < a.length; k++) l = a[k], _.Nk(l, _.ji(f, k), g);
            else b(e)
        })
    };
    _.Qk = function() {
        var a, b, c = new _.Gk(function(d, e) {
            a = d;
            b = e
        });
        return new Pk(c, a, b)
    };
    _.Gk.prototype.then = function(a, b, c) {
        return Rk(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    };
    _.pk(_.Gk);
    _.Gk.prototype.ys = function(a, b) {
        return Rk(this, null, a, b)
    };
    _.Gk.prototype.cancel = function(a) {
        if (0 == this.Ea) {
            var b = new Sk(a);
            _.Ek(function() {
                Tk(this, b)
            }, this)
        }
    };
    Tk = function(a, b) {
        if (0 == a.Ea)
            if (a.$a) {
                var c = a.$a;
                if (c.Qj) {
                    for (var d = 0, e = null, f = null, g = c.Qj; g && (g.rp || (d++, g.ol == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                    e && (0 == c.Ea && 1 == d ? Tk(c, b) : (f ? (d = f, d.next == c.ln && (c.ln = d), d.next = d.next.next) : Uk(c), Vk(c, e, 3, b)))
                }
                a.$a = null
            } else a.lh(3, b)
    };
    _.Xk = function(a, b) {
        a.Qj || 2 != a.Ea && 3 != a.Ea || Wk(a);
        a.ln ? a.ln.next = b : a.Qj = b;
        a.ln = b
    };
    Rk = function(a, b, c, d) {
        var e = _.Jk(null, null, null);
        e.ol = new _.Gk(function(f, g) {
            e.xr = b ? function(k) {
                try {
                    var l = b.call(d, k);
                    f(l)
                } catch (m) {
                    g(m)
                }
            } : f;
            e.jo = c ? function(k) {
                try {
                    var l = c.call(d, k);
                    void 0 === l && k instanceof Sk ? g(k) : f(l)
                } catch (m) {
                    g(m)
                }
            } : g
        });
        e.ol.$a = a;
        _.Xk(a, e);
        return e.ol
    };
    _.Gk.prototype.v1 = function(a) {
        this.Ea = 0;
        this.lh(2, a)
    };
    _.Gk.prototype.w1 = function(a) {
        this.Ea = 0;
        this.lh(3, a)
    };
    _.Gk.prototype.lh = function(a, b) {
        0 == this.Ea && (this === b && (a = 3, b = new TypeError("Promise cannot resolve to itself")), this.Ea = 1, Mk(b, this.v1, this.w1, this) || (this.ij = b, this.Ea = a, this.$a = null, Wk(this), 3 != a || b instanceof Sk || Yk(this, b)))
    };
    var Mk = function(a, b, c, d) {
            if (a instanceof _.Gk) return _.Xk(a, _.Jk(b || _.cb, c || null, d)), !0;
            if (_.qk(a)) return a.then(b, c, d), !0;
            if (_.bb(a)) try {
                var e = a.then;
                if ("function" === typeof e) return Zk(a, e, b, c, d), !0
            } catch (f) {
                return c.call(d, f), !0
            }
            return !1
        },
        Zk = function(a, b, c, d, e) {
            var f = !1,
                g = function(l) {
                    f || (f = !0, c.call(e, l))
                },
                k = function(l) {
                    f || (f = !0, d.call(e, l))
                };
            try {
                b.call(a, g, k)
            } catch (l) {
                k(l)
            }
        },
        Wk = function(a) {
            a.Qz || (a.Qz = !0, _.Ek(a.dT, a))
        },
        Uk = function(a) {
            var b = null;
            a.Qj && (b = a.Qj, a.Qj = b.next, b.next = null);
            a.Qj || (a.ln =
                null);
            return b
        };
    _.Gk.prototype.dT = function() {
        for (var a; a = Uk(this);) Vk(this, a, this.Ea, this.ij);
        this.Qz = !1
    };
    var Vk = function(a, b, c, d) {
            if (3 == c && b.jo && !b.rp)
                for (; a && a.Pu; a = a.$a) a.Pu = !1;
            if (b.ol) b.ol.$a = null, $k(b, c, d);
            else try {
                b.rp ? b.xr.call(b.context) : $k(b, c, d)
            } catch (e) {
                al.call(null, e)
            }
            Ik.put(b)
        },
        $k = function(a, b, c) {
            2 == b ? a.xr.call(a.context, c) : a.jo && a.jo.call(a.context, c)
        },
        Yk = function(a, b) {
            a.Pu = !0;
            _.Ek(function() {
                a.Pu && al.call(null, b)
            })
        },
        al = sk,
        Sk = function(a) {
            _.Vc.call(this, a)
        };
    _.K(Sk, _.Vc);
    Sk.prototype.name = "cancel";
    var Pk = function(a, b, c) {
        this.promise = a;
        this.resolve = b;
        this.reject = c
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.hs = function(a, b, c) {
        if (null !== a && b in a) throw Error("e`" + b);
        a[b] = c
    };
    _.is = function(a) {
        _.ri.call(this);
        this.ng = a;
        this.Qb = {}
    };
    _.K(_.is, _.ri);
    var js = [];
    _.is.prototype.V = function(a, b, c, d) {
        return this.kr(a, b, c, d)
    };
    _.is.prototype.kr = function(a, b, c, d, e) {
        Array.isArray(b) || (b && (js[0] = b.toString()), b = js);
        for (var f = 0; f < b.length; f++) {
            var g = _.Oi(a, b[f], c || this.handleEvent, d || !1, e || this.ng || this);
            if (!g) break;
            this.Qb[g.key] = g
        }
        return this
    };
    _.is.prototype.eo = function(a, b, c, d) {
        return ks(this, a, b, c, d)
    };
    var ks = function(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var g = 0; g < c.length; g++) ks(a, b, c[g], d, e, f);
        else {
            b = _.Ni(b, c, d || a.handleEvent, e, f || a.ng || a);
            if (!b) return a;
            a.Qb[b.key] = b
        }
        return a
    };
    _.is.prototype.$b = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) this.$b(a, b[f], c, d, e);
        else c = c || this.handleEvent, d = _.bb(d) ? !!d.capture : !!d, e = e || this.ng || this, c = _.Pi(c), d = !!d, b = _.Di(a) ? a.Bn(b, c, d, e) : a ? (a = _.Ri(a)) ? a.Bn(b, c, d, e) : null : null, b && (_.Vi(b), delete this.Qb[b.key]);
        return this
    };
    _.is.prototype.removeAll = function() {
        _.Db(this.Qb, function(a, b) {
            this.Qb.hasOwnProperty(b) && _.Vi(a)
        }, this);
        this.Qb = {}
    };
    _.is.prototype.va = function() {
        _.is.T.va.call(this);
        this.removeAll()
    };
    _.is.prototype.handleEvent = function() {
        throw Error("G");
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */

    var yu, zu, Au, Bu, Du, Eu, Fu, Gu, Iu;
    oauth2 = {};
    _.xu = !1;
    yu = function(a) {
        try {
            _.xu && window.console && window.console.log && window.console.log(a)
        } catch (b) {}
    };
    zu = function(a, b) {
        if (!a) return -1;
        if (a.indexOf) return a.indexOf(b, void 0);
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] === b) return c;
        return -1
    };
    Au = function(a, b) {
        function c() {}
        if (!a) throw "Child class cannot be empty.";
        if (!b) throw "Parent class cannot be empty.";
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };
    Bu = function(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    };
    _.Cu = function(a) {
        var b = {};
        if (a)
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    };
    Du = function(a) {
        var b = location.hash;
        a = new RegExp("[&#]" + a + "=([^&]*)");
        b = decodeURIComponent(b);
        b = a.exec(b);
        return null == b ? "" : b[1].replace(/\+/g, " ")
    };
    Eu = function(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else throw "Add event handler for " + b + " failed.";
    };
    Fu = {
        token: 1,
        id_token: 1
    };
    Gu = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && 8 == parseInt(a.split("msie")[1], 10)
    };
    _.Hu = window.JSON;
    Iu = function(a) {
        this.QE = a || [];
        this.Yb = {}
    };
    Iu.prototype.addEventListener = function(a, b) {
        if (!(0 <= zu(this.QE, a))) throw "Unrecognized event type: " + a;
        if (!Bu(b)) throw "The listener for event '" + a + "' is not a function.";
        this.Yb[a] || (this.Yb[a] = []);
        0 > zu(this.Yb[a], b) && this.Yb[a].push(b)
    };
    Iu.prototype.removeEventListener = function(a, b) {
        if (!(0 <= zu(this.QE, a))) throw "Unrecognized event type: " + a;
        Bu(b) && this.Yb[a] && this.Yb[a].length && (b = zu(this.Yb[a], b), 0 <= b && this.Yb[a].splice(b, 1))
    };
    Iu.prototype.dispatchEvent = function(a) {
        var b = a.type;
        if (!(b && 0 <= zu(this.QE, b))) throw "Failed to dispatch unrecognized event type: " + b;
        if (this.Yb[b] && this.Yb[b].length)
            for (var c = 0, d = this.Yb[b].length; c < d; c++) this.Yb[b][c](a)
    };
    var Ju, Ku, Lu, Pu, Qu, gv, hv, jv, kv, mv, vv;
    Ju = {};
    Ku = {};
    Lu = {
        google: {
            authServerUrl: "https://accounts.google.com/o/oauth2/auth",
            idpIFrameUrl: "https://accounts.google.com/o/oauth2/iframe"
        }
    };
    _.Mu = function(a, b) {
        if (a = Lu[a]) return a[b]
    };
    _.Nu = function(a, b) {
        if (!a) throw Error("L");
        if (!b.authServerUrl) throw Error("M");
        if (!b.idpIFrameUrl) throw Error("N");
        Lu[a] = {
            authServerUrl: b.authServerUrl,
            idpIFrameUrl: b.idpIFrameUrl
        }
    };
    _.Ou = void 0;
    Pu = function(a) {
        a.style.position = "absolute";
        a.style.width = "1px";
        a.style.height = "1px";
        a.style.left = "-9999px";
        a.style.top = "-9999px";
        a.style.right = "-9999px";
        a.style.bottom = "-9999px";
        a.style.display = "none";
        a.setAttribute("aria-hidden", "true")
    };
    Qu = function() {
        this.a2 = window;
        this.Rt = this.tl = this.Fr = this.ih = null
    };
    Qu.prototype.open = function(a, b, c, d) {
        Ru(this);
        this.Fr ? (this.tl && (this.tl(), this.tl = null), Su(this)) : this.Fr = "authPopup" + Math.floor(1E6 * Math.random() + 1);
        a: {
            this.ih = this.a2.open(a, this.Fr, b);
            try {
                this.ih.focus();
                if (this.ih.closed || "undefined" == typeof this.ih.closed) throw Error("P");
                _.Ou = this.ih
            } catch (e) {
                d && setTimeout(d, 0);
                this.ih = null;
                break a
            }
            c && (this.tl = c, Tu(this))
        }
    };
    var Ru = function(a) {
            try {
                if (null == a.ih || a.ih.closed) a.ih = null, a.Fr = null, Su(a), a.tl && (a.tl(), a.tl = null)
            } catch (b) {
                a.ih = null, a.Fr = null, Su(a)
            }
        },
        Tu = function(a) {
            a.Rt = window.setInterval(function() {
                Ru(a)
            }, 300)
        },
        Su = function(a) {
            a.Rt && (window.clearInterval(a.Rt), a.Rt = null)
        };
    Ku = Ku || {};
    var Uu = function(a, b) {
        this.Rb = a;
        this.JB = b;
        this.kd = null;
        this.Vl = !1
    };
    Uu.prototype.start = function() {
        if (!this.Vl && !this.kd) {
            var a = this;
            this.kd = window.setTimeout(function() {
                a.clear();
                a.Vl || (a.Rb(), a.Vl = !0)
            }, Ku.SI(this.JB))
        }
    };
    Uu.prototype.clear = function() {
        this.kd && (window.clearTimeout(this.kd), this.kd = null)
    };
    var Vu = function(a, b) {
        var c = Ku.mp;
        this.KW = Ku.$o;
        this.fO = c;
        this.Rb = a;
        this.JB = b;
        this.kd = null;
        this.Vl = !1;
        var d = this;
        this.gO = function() {
            document[d.KW] || (d.clear(), d.start())
        }
    };
    Vu.prototype.start = function() {
        if (!this.Vl && !this.kd) {
            Eu(document, this.fO, this.gO);
            var a = this;
            this.kd = window.setTimeout(function() {
                a.clear();
                a.Vl || (a.Rb(), a.Vl = !0)
            }, Ku.SI(this.JB))
        }
    };
    Vu.prototype.clear = function() {
        var a = this.fO,
            b = this.gO,
            c = document;
        if (c.removeEventListener) c.removeEventListener(a, b, !1);
        else if (c.detachEvent) c.detachEvent("on" + a, b);
        else throw "Remove event handler for " + a + " failed.";
        this.kd && (window.clearTimeout(this.kd), this.kd = null)
    };
    Ku.$o = null;
    Ku.mp = null;
    Ku.gX = function() {
        var a = document;
        "undefined" !== typeof a.hidden ? (Ku.$o = "hidden", Ku.mp = "visibilitychange") : "undefined" !== typeof a.msHidden ? (Ku.$o = "msHidden", Ku.mp = "msvisibilitychange") : "undefined" !== typeof a.webkitHidden && (Ku.$o = "webkitHidden", Ku.mp = "webkitvisibilitychange")
    };
    Ku.gX();
    Ku.CS = function(a, b) {
        return Ku.$o && Ku.mp ? new Vu(a, b) : new Uu(a, b)
    };
    Ku.SI = function(a) {
        return Math.max(1, a - (new Date).getTime())
    };
    var Wu = function(a, b) {
            document.cookie = "G_ENABLED_IDPS=" + a + ";domain=." + b + ";expires=Fri, 31 Dec 9999 12:00:00 GMT;path=/"
        },
        Xu = function() {
            function a() {
                e[0] = 1732584193;
                e[1] = 4023233417;
                e[2] = 2562383102;
                e[3] = 271733878;
                e[4] = 3285377520;
                n = m = 0
            }

            function b(p) {
                for (var u = g, r = 0; 64 > r; r += 4) u[r / 4] = p[r] << 24 | p[r + 1] << 16 | p[r + 2] << 8 | p[r + 3];
                for (r = 16; 80 > r; r++) p = u[r - 3] ^ u[r - 8] ^ u[r - 14] ^ u[r - 16], u[r] = (p << 1 | p >>> 31) & 4294967295;
                p = e[0];
                var v = e[1],
                    t = e[2],
                    w = e[3],
                    y = e[4];
                for (r = 0; 80 > r; r++) {
                    if (40 > r)
                        if (20 > r) {
                            var D = w ^ v & (t ^ w);
                            var z = 1518500249
                        } else D =
                            v ^ t ^ w, z = 1859775393;
                    else 60 > r ? (D = v & t | w & (v | t), z = 2400959708) : (D = v ^ t ^ w, z = 3395469782);
                    D = ((p << 5 | p >>> 27) & 4294967295) + D + y + z + u[r] & 4294967295;
                    y = w;
                    w = t;
                    t = (v << 30 | v >>> 2) & 4294967295;
                    v = p;
                    p = D
                }
                e[0] = e[0] + p & 4294967295;
                e[1] = e[1] + v & 4294967295;
                e[2] = e[2] + t & 4294967295;
                e[3] = e[3] + w & 4294967295;
                e[4] = e[4] + y & 4294967295
            }

            function c(p, u) {
                if ("string" === typeof p) {
                    p = unescape(encodeURIComponent(p));
                    for (var r = [], v = 0, t = p.length; v < t; ++v) r.push(p.charCodeAt(v));
                    p = r
                }
                u || (u = p.length);
                r = 0;
                if (0 == m)
                    for (; r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64;
                for (; r <
                    u;)
                    if (f[m++] = p[r++], n++, 64 == m)
                        for (m = 0, b(f); r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64
            }

            function d() {
                var p = [],
                    u = 8 * n;
                56 > m ? c(k, 56 - m) : c(k, 64 - (m - 56));
                for (var r = 63; 56 <= r; r--) f[r] = u & 255, u >>>= 8;
                b(f);
                for (r = u = 0; 5 > r; r++)
                    for (var v = 24; 0 <= v; v -= 8) p[u++] = e[r] >> v & 255;
                return p
            }
            for (var e = [], f = [], g = [], k = [128], l = 1; 64 > l; ++l) k[l] = 0;
            var m, n;
            a();
            return {
                reset: a,
                update: c,
                digest: d,
                Sg: function() {
                    for (var p = d(), u = "", r = 0; r < p.length; r++) u += "0123456789ABCDEF".charAt(Math.floor(p[r] / 16)) + "0123456789ABCDEF".charAt(p[r] % 16);
                    return u
                }
            }
        },
        Yu =
        window.crypto,
        Zu = !1,
        $u = 0,
        av = 1,
        bv = 0,
        cv = "",
        dv = function(a) {
            a = a || window.event;
            var b = a.screenX + a.clientX << 16;
            b += a.screenY + a.clientY;
            b *= (new Date).getTime() % 1E6;
            av = av * b % bv;
            if (3 == ++$u)
                if (a = window, b = dv, a.removeEventListener) a.removeEventListener("mousemove", b, !1);
                else if (a.detachEvent) a.detachEvent("onmousemove", b);
            else throw Error("Q`mousemove");
        },
        ev = function(a) {
            var b = Xu();
            b.update(a);
            return b.Sg()
        };
    Zu = !!Yu && "function" == typeof Yu.getRandomValues;
    Zu || (bv = 1E6 * (screen.width * screen.width + screen.height), cv = ev(document.cookie + "|" + document.location + "|" + (new Date).getTime() + "|" + Math.random()), Eu(window, "mousemove", dv));
    Ju = Ju || {};
    Ju.mP = "ssIFrame_";
    _.fv = function(a, b) {
        this.Kb = a;
        if (!this.Kb) throw Error("R");
        a = _.Mu(a, "idpIFrameUrl");
        if (!a) throw Error("S");
        this.IJ = a;
        if (!b) throw Error("T");
        this.Nk = b;
        a = this.IJ;
        b = document.createElement("a");
        b.setAttribute("href", a);
        a = [b.protocol, "//", b.hostname];
        "http:" == b.protocol && "" != b.port && "0" != b.port && "80" != b.port ? (a.push(":"), a.push(b.port)) : "https:" == b.protocol && "" != b.port && "0" != b.port && "443" != b.port && (a.push(":"), a.push(b.port));
        this.tB = a.join("");
        this.k_ = [location.protocol, "//", location.host].join("");
        this.sB =
            this.Qn = !1;
        this.EJ = null;
        this.fw = [];
        this.oo = [];
        this.Ei = {};
        this.Yl = void 0
    };
    _.fv.prototype.show = function() {
        var a = this.Yl;
        a.style.position = "fixed";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.left = "0px";
        a.style.top = "0px";
        a.style.right = "0px";
        a.style.bottom = "0px";
        a.style.display = "block";
        a.style.zIndex = "9999999";
        a.style.overflow = "hidden";
        a.setAttribute("aria-hidden", "false")
    };
    _.fv.prototype.nc = function() {
        Pu(this.Yl)
    };
    _.fv.prototype.Hv = function(a) {
        if (this.Qn) a && a(this);
        else {
            if (!this.Yl) {
                var b = Ju.mP + this.Kb;
                var c = this.Kb;
                var d = location.hostname;
                var e, f = document.cookie.match("(^|;) ?G_ENABLED_IDPS=([^;]*)(;|$)");
                f && 2 < f.length && (e = f[2]);
                (f = e && 0 <= zu(e.split("|"), c)) ? Wu(e, d): Wu(e ? e + "|" + c : c, d);
                c = !f;
                f = this.IJ;
                var g = this.k_;
                d = this.Nk;
                e = document.createElement("iframe");
                e.setAttribute("id", b);
                b = "allow-scripts allow-same-origin";
                document.requestStorageAccess && Bu(document.requestStorageAccess) && (b += " allow-storage-access-by-user-activation");
                e.setAttribute("sandbox", b);
                Pu(e);
                e.setAttribute("frame-border", "0");
                b = [f, "#origin=", encodeURIComponent(g)];
                b.push("&rpcToken=");
                b.push(encodeURIComponent(d));
                c && b.push("&clearCache=1");
                _.xu && b.push("&debug=1");
                document.body.appendChild(e);
                e.setAttribute("src", b.join(""));
                this.Yl = e
            }
            a && this.fw.push(a)
        }
    };
    _.fv.prototype.Il = function() {
        return this.EJ
    };
    gv = function(a) {
        for (var b = 0; b < a.fw.length; b++) a.fw[b](a);
        a.fw = []
    };
    _.iv = function(a, b, c, d) {
        if (a.Qn) {
            if (a.Qn && a.sB) throw a = "Failed to communicate with IDP IFrame due to unitialization error: " + a.Il(), yu(a), Error(a);
            hv(a, {
                method: b,
                params: c
            }, d)
        } else a.oo.push({
            rpc: {
                method: b,
                params: c
            },
            callback: d
        }), a.Hv()
    };
    hv = function(a, b, c) {
        if (c) {
            for (var d = b.id; !d || a.Ei[d];) d = (new Date).getMilliseconds() + "-" + (1E6 * Math.random() + 1);
            b.id = d;
            a.Ei[d] = c
        }
        b.rpcToken = a.Nk;
        a.Yl.contentWindow.postMessage(_.Hu.stringify(b), a.tB)
    };
    jv = function(a) {
        if (a && 0 <= a.indexOf("::")) throw Error("U");
    };
    _.fv.prototype.Uh = function(a, b, c, d, e, f, g, k) {
        jv(f);
        b = _.Cu(b);
        _.iv(this, "getTokenResponse", {
            clientId: a,
            loginHint: c,
            request: b,
            sessionSelector: d,
            forceRefresh: g,
            skipCache: k,
            id: f
        }, e)
    };
    _.fv.prototype.Gv = function(a, b, c, d, e) {
        b = _.Cu(b);
        _.iv(this, "listIdpSessions", {
            clientId: a,
            request: b,
            sessionSelector: c,
            forceRefresh: e
        }, d)
    };
    kv = function(a, b, c) {
        jv(b.identifier);
        _.iv(a, "getSessionSelector", b, c)
    };
    _.lv = function(a, b, c, d, e) {
        jv(b.identifier);
        _.iv(a, "setSessionSelector", {
            domain: b.domain,
            crossSubDomains: b.crossSubDomains,
            policy: b.policy,
            id: b.id,
            hint: d,
            disabled: !!c
        }, e)
    };
    mv = function(a, b, c) {
        _.iv(a, "monitorClient", {
            clientId: b
        }, c)
    };
    _.fv.prototype.Mr = _.ja(29);
    _.fv.prototype.$w = function(a, b) {
        _.iv(this, "showDialog", {
            Daa: a
        }, b)
    };
    _.fv.prototype.Hp = _.ja(31);
    Ju.dv = {};
    Ju.yA = function(a) {
        return Ju.dv[a]
    };
    Ju.Hv = function(a, b) {
        var c = Ju.yA(a);
        if (!c) {
            c = String;
            if (Zu) {
                var d = new window.Uint32Array(1);
                Yu.getRandomValues(d);
                d = Number("0." + d[0])
            } else d = av, d += parseInt(cv.substr(0, 20), 16), cv = ev(cv), d /= bv + Math.pow(16, 20);
            c = c(2147483647 * d);
            c = new _.fv(a, c);
            Ju.dv[a] = c
        }
        c.Hv(b)
    };
    Ju.aU = function(a) {
        for (var b in Ju.dv) {
            var c = Ju.yA(b);
            if (c && c.Yl && c.Yl.contentWindow == a.source && c.tB == a.origin) return c
        }
    };
    Ju.LU = function(a) {
        for (var b in Ju.dv) {
            var c = Ju.yA(b);
            if (c && c.tB == a) return c
        }
    };
    Ju = Ju || {};
    var ov = function() {
        var a = [],
            b;
        for (b in nv) a.push(nv[b]);
        Iu.call(this, a);
        this.vk = {};
        yu("EventBus is ready.")
    };
    Au(ov, Iu);
    var nv = {
            QQ: "sessionSelectorChanged",
            Yx: "sessionStateChanged",
            Ex: "authResult",
            VO: "displayIFrame"
        },
        qv = function(a) {
            var b = pv;
            a && (b.vk[a] || (b.vk[a] = []))
        },
        rv = function(a, b, c) {
            return b && a.vk[b] && 0 <= zu(a.vk[b], c)
        };
    _.h = ov.prototype;
    _.h.sZ = function(a) {
        var b, c = !!a.source && (a.source.opener === window || a.source === _.Ou);
        if (b = c ? Ju.LU(a.origin) : Ju.aU(a)) {
            try {
                var d = _.Hu.parse(a.data)
            } catch (e) {
                yu("Bad event, an error happened when parsing data.");
                return
            }
            if (!c) {
                if (!d || !d.rpcToken || d.rpcToken != b.Nk) {
                    yu("Bad event, no RPC token.");
                    return
                }
                if (d.id && !d.method) {
                    c = d;
                    if (a = b.Ei[c.id]) delete b.Ei[c.id], a(c.result, c.error);
                    return
                }
            }
            "fireIdpEvent" != d.method ? yu("Bad IDP event, method unknown.") : (a = d.params) && a.type && this.HJ[a.type] ? (d = this.HJ[a.type],
                c && !d.GR ? yu("Bad IDP event. Source window cannot be a popup.") : d.Ro && !d.Ro.call(this, b, a) ? yu("Bad IDP event.") : d.Ye.call(this, b, a)) : yu("Bad IDP event.")
        } else yu("Bad event, no corresponding Idp Stub.")
    };
    _.h.O_ = function(a, b) {
        return rv(this, a.Kb, b.clientId)
    };
    _.h.N_ = function(a, b) {
        b = b.clientId;
        return !b || rv(this, a.Kb, b)
    };
    _.h.RR = function(a, b) {
        return rv(this, a.Kb, b.clientId)
    };
    _.h.DY = function(a) {
        a.Qn = !0;
        gv(a);
        for (var b = 0; b < a.oo.length; b++) hv(a, a.oo[b].rpc, a.oo[b].callback);
        a.oo = []
    };
    _.h.CY = function(a, b) {
        b = {
            error: b.error
        };
        a.Qn = !0;
        a.sB = !0;
        a.EJ = b;
        a.oo = [];
        gv(a)
    };
    _.h.zw = function(a, b) {
        b.originIdp = a.Kb;
        this.dispatchEvent(b)
    };
    var pv = new ov,
        sv = pv,
        tv = {};
    tv.idpReady = {
        Ye: sv.DY
    };
    tv.idpError = {
        Ye: sv.CY
    };
    tv.sessionStateChanged = {
        Ye: sv.zw,
        Ro: sv.O_
    };
    tv.sessionSelectorChanged = {
        Ye: sv.zw,
        Ro: sv.N_
    };
    tv.authResult = {
        Ye: sv.zw,
        Ro: sv.RR,
        GR: !0
    };
    tv.displayIFrame = {
        Ye: sv.zw
    };
    pv.HJ = tv || {};
    Eu(window, "message", function(a) {
        pv.sZ.call(pv, a)
    });
    _.uv = function(a, b) {
        this.je = !1;
        if (!a) throw Error("V");
        var c = [],
            d;
        for (d in a) c.push(a[d]);
        Iu.call(this, c);
        this.Cd = [location.protocol, "//", location.host].join("");
        this.xc = b.crossSubDomains ? b.domain || this.Cd : this.Cd;
        if (!b) throw Error("W");
        if (!b.idpId) throw Error("X");
        if (!_.Mu(b.idpId, "authServerUrl") || !_.Mu(b.idpId, "idpIFrameUrl")) throw Error("Y`" + b.idpId);
        this.Kb = b.idpId;
        this.Vb = void 0;
        this.KS = !!b.disableTokenRefresh;
        this.zT = !!b.forceTokenRefresh;
        this.R0 = !!b.skipTokenCache;
        this.setOptions(b);
        this.Pp = [];
        this.bm = this.fK = !1;
        this.Un = void 0;
        this.XL();
        this.Zc = void 0;
        var e = this,
            f = function() {
                yu("Token Manager is ready.");
                if (e.Pp.length)
                    for (var g = 0; g < e.Pp.length; g++) e.Pp[g].call(e);
                e.fK = !0;
                e.Pp = []
            };
        Ju.Hv(this.Kb, function(g) {
            e.Zc = g;
            g.Qn && g.sB ? (e.bm = !0, e.Un = g.Il(), e.bw(e.Un)) : e.Vb ? mv(e.Zc, e.Vb, function(k) {
                if (k) {
                    k = e.Kb;
                    var l = e.Vb,
                        m = pv;
                    k && l && (m.vk[k] || (m.vk[k] = []), 0 > zu(m.vk[k], l) && m.vk[k].push(l));
                    f()
                } else e.Un = {
                    error: "Not a valid origin for the client: " + e.Cd + " has not been whitelisted for client ID " + e.Vb +
                        ". Please go to https://console.developers.google.com/ and whitelist this origin for your project's client ID."
                }, e.bm = !0, e.bw(e.Un)
            }) : (qv(e.Kb), f())
        })
    };
    Au(_.uv, Iu);
    _.uv.prototype.setOptions = function() {};
    _.uv.prototype.XL = function() {};
    _.uv.prototype.bw = function() {};
    _.uv.prototype.Il = function() {
        return this.Un
    };
    vv = function(a, b, c) {
        return function() {
            b.apply(a, c)
        }
    };
    _.wv = function(a, b, c) {
        if (a.fK) b.apply(a, c);
        else {
            if (a.bm) throw a.Un;
            a.Pp.push(vv(a, b, c))
        }
    };
    _.uv.prototype.LG = _.ja(32);
    _.uv.prototype.Hp = _.ja(30);
    _.yv = function(a, b) {
        _.uv.call(this, a, b);
        this.EL = new Qu;
        this.fj = this.rm = null;
        xv(this)
    };
    Au(_.yv, _.uv);
    _.yv.prototype.setOptions = function() {};
    var zv = function(a, b) {
            a.ie = {
                crossSubDomains: !!b.crossSubDomains,
                id: b.sessionSelectorId,
                domain: a.xc
            };
            b.crossSubDomains && (a.ie.policy = b.policy)
        },
        Av = function(a, b) {
            if (!b.authParameters) throw Error("Z");
            if (!b.authParameters.scope) throw Error("$");
            if (!b.authParameters.response_type) throw Error("aa");
            a.xp = b.authParameters;
            a.xp.redirect_uri || (a.xp.redirect_uri = [location.protocol, "//", location.host, location.pathname].join(""));
            a.fi = _.Cu(b.rpcAuthParameters || a.xp);
            if (!a.fi.scope) throw Error("ba");
            if (!a.fi.response_type) throw Error("ca");
            a: {
                var c = a.fi.response_type.split(" ");
                for (var d = 0, e = c.length; d < e; d++)
                    if (c[d] && !Fu[c[d]]) {
                        c = !0;
                        break a
                    }
                c = !1
            }
            if (c) throw Error("da");
            b.enableSerialConsent && (a.fi.enable_serial_consent = !0);
            b.authResultIdentifier && (a.SR = b.authResultIdentifier);
            b.spec_compliant && (a.fi.spec_compliant = b.spec_compliant)
        };
    _.yv.prototype.XL = function() {
        var a = this;
        pv.addEventListener(nv.QQ, function(b) {
            a.je && a.ie && b.originIdp == a.Kb && !b.crossSubDomains == !a.ie.crossSubDomains && b.domain == a.ie.domain && b.id == a.ie.id && a.qL(b)
        });
        pv.addEventListener(nv.Yx, function(b) {
            a.je && b.originIdp == a.Kb && b.clientId == a.Vb && a.rL(b)
        });
        pv.addEventListener(nv.Ex, function(b) {
            _.Ou = void 0;
            a.je && b.originIdp == a.Kb && b.clientId == a.Vb && b.id == a.aj && (a.rm && (window.clearTimeout(a.rm), a.rm = null), a.aj = void 0, a.ur(b))
        });
        pv.addEventListener(nv.VO, function(b) {
            a.je &&
                b.originIdp == a.Kb && (b.nc ? a.Zc.nc() : a.Zc.show())
        })
    };
    _.yv.prototype.qL = function() {};
    _.yv.prototype.rL = function() {};
    _.yv.prototype.ur = function() {};
    var Cv = function(a, b) {
            Bv(a);
            a.KS || (a.fj = Ku.CS(function() {
                a.Uh(!0)
            }, b - 3E5), navigator.onLine && a.fj.start())
        },
        Bv = function(a) {
            a.fj && (a.fj.clear(), a.fj = null)
        },
        xv = function(a) {
            var b = window;
            Gu() && (b = document.body);
            Eu(b, "online", function() {
                a.fj && a.fj.start()
            });
            Eu(b, "offline", function() {
                a.fj && a.fj.clear()
            })
        };
    _.h = _.yv.prototype;
    _.h.Uh = function() {};
    _.h.$w = function(a, b) {
        this.Zc.$w(a, b)
    };
    _.h.$K = _.ja(33);
    _.h.QX = function(a, b) {
        if (!this.Vb) throw Error("ha");
        this.Zc.Gv(this.Vb, this.fi, this.ie, a, b)
    };
    _.h.Gv = function(a, b) {
        _.wv(this, this.QX, [a, b])
    };
    _.Ev = function(a) {
        this.ee = void 0;
        this.Tg = !1;
        this.Do = void 0;
        _.yv.call(this, _.Dv, a)
    };
    Au(_.Ev, _.yv);
    _.Dv = {
        zF: "noSessionBound",
        lp: "userLoggedOut",
        rO: "activeSessionChanged",
        Yx: "sessionStateChanged",
        oR: "tokenReady",
        nR: "tokenFailed",
        Ex: "authResult",
        ERROR: "error"
    };
    _.Ev.prototype.setOptions = function(a) {
        if (!a.clientId) throw Error("ia");
        this.Vb = a.clientId;
        this.Ca = a.id;
        zv(this, a);
        Av(this, a)
    };
    _.Ev.prototype.bw = function(a) {
        this.dispatchEvent({
            type: _.Dv.ERROR,
            error: "idpiframe_initialization_failed",
            details: a.error,
            idpId: this.Kb
        })
    };
    var Fv = function(a) {
        Bv(a);
        a.Do = void 0;
        a.VB = void 0
    };
    _.h = _.Ev.prototype;
    _.h.qL = function(a) {
        var b = a.newValue || {};
        if (this.ee != b.hint || this.Tg != !!b.disabled) {
            a = this.ee;
            var c = !this.ee || this.Tg;
            Fv(this);
            this.ee = b.hint;
            this.Tg = !!b.disabled;
            (b = !this.ee || this.Tg) && !c ? this.dispatchEvent({
                type: _.Dv.lp,
                idpId: this.Kb
            }) : b || (a != this.ee && this.dispatchEvent({
                type: _.Dv.rO,
                idpId: this.Kb
            }), this.ee && this.Uh())
        }
    };
    _.h.rL = function(a) {
        this.Tg || (this.ee ? a.user || this.Do ? a.user == this.ee && (this.Do ? a.sessionState ? this.Do = a.sessionState : (Fv(this), this.dispatchEvent({
            type: _.Dv.lp,
            idpId: this.Kb
        })) : a.sessionState && (this.Do = a.sessionState, this.Uh())) : this.Uh() : this.dispatchEvent({
            type: _.Dv.Yx,
            idpId: this.Kb
        }))
    };
    _.h.ur = function(a) {
        this.dispatchEvent({
            type: _.Dv.Ex,
            authResult: a.authResult
        })
    };
    _.h.uq = _.ja(35);
    _.h.mq = function(a) {
        _.wv(this, this.kA, [a])
    };
    _.h.kA = function(a) {
        kv(this.Zc, this.ie, a)
    };
    _.h.bx = function(a, b, c) {
        if (!a) throw Error("ja");
        Fv(this);
        this.ee = a;
        this.Tg = !1;
        b && _.lv(this.Zc, this.ie, !1, this.ee);
        this.je = !0;
        this.Uh(c, !0)
    };
    _.h.start = function() {
        _.wv(this, this.W0, [])
    };
    _.h.W0 = function() {
        var a = this.Vb == Du("client_id") ? Du("login_hint") : void 0;
        var b = this.Vb == Du("client_id") ? Du("state") : void 0;
        this.vC = b;
        if (a) window.history.replaceState ? window.history.replaceState(null, document.title, window.location.href.split("#")[0]) : window.location.href.hash = "", this.bx(a, !0, !0);
        else {
            var c = this;
            this.mq(function(d) {
                c.je = !0;
                d && d.hint ? (Fv(c), c.ee = d.hint, c.Tg = !!d.disabled, c.Tg ? c.dispatchEvent({
                    type: _.Dv.lp,
                    idpId: c.Kb
                }) : c.bx(d.hint)) : (Fv(c), c.ee = void 0, c.Tg = !(!d || !d.disabled), c.dispatchEvent({
                    type: _.Dv.zF,
                    autoOpenAuthUrl: !c.Tg,
                    idpId: c.Kb
                }))
            })
        }
    };
    _.h.dI = _.ja(36);
    _.h.Uh = function(a, b) {
        var c = this;
        this.Zc.Uh(this.Vb, this.fi, this.ee, this.ie, function(d, e) {
            (e = e || d.error) ? "user_logged_out" == e ? (Fv(c), c.dispatchEvent({
                type: _.Dv.lp,
                idpId: c.Kb
            })) : (c.VB = null, c.dispatchEvent({
                type: _.Dv.nR,
                idpId: c.Kb,
                error: e
            })): (c.VB = d, c.Do = d.session_state, Cv(c, d.expires_at), d.idpId = c.Kb, b && c.vC && (d.state = c.vC, c.vC = void 0), c.dispatchEvent({
                type: _.Dv.oR,
                idpId: c.Kb,
                response: d
            }))
        }, this.Ca, a)
    };
    _.h.Mr = _.ja(28);
    _.h.lM = _.ja(37);
    _.Gv = function(a) {
        this.kl = null;
        _.yv.call(this, {}, a);
        this.je = !0
    };
    Au(_.Gv, _.yv);
    _.h = _.Gv.prototype;
    _.h.setOptions = function(a) {
        if (!a.clientId) throw Error("ia");
        this.Vb = a.clientId;
        this.Ca = a.id;
        zv(this, a);
        Av(this, a)
    };
    _.h.bw = function(a) {
        this.kl && (this.kl({
            authResult: {
                error: "idpiframe_initialization_failed",
                details: a.error
            }
        }), this.kl = null)
    };
    _.h.ur = function(a) {
        if (this.kl) {
            var b = this.kl;
            this.kl = null;
            b(a)
        }
    };
    _.h.uq = _.ja(34);
    _.h.mq = function(a) {
        this.bm ? a(this.Il()) : _.wv(this, this.kA, [a])
    };
    _.h.kA = function(a) {
        kv(this.Zc, this.ie, a)
    };
    _.Hv = function(a, b, c) {
        a.bm ? c(a.Il()) : _.wv(a, a.SY, [b, c])
    };
    _.Gv.prototype.SY = function(a, b) {
        this.Zc.Uh(this.Vb, this.fi, a, this.ie, function(c, d) {
            d ? b({
                error: d
            }) : b(c)
        }, this.Ca, this.zT, this.R0)
    };
    _.Gv.prototype.AK = _.ja(38);

    var Iv, Kv, Lv, Mv, Nv, Ov, Pv, Qv, Rv, Sv, Tv, Uv, Xv;
    Iv = function(a) {
        return Array.prototype.concat.apply([], arguments)
    };
    _.Jv = function() {
        try {
            var a = Array.from((window.crypto || window.msCrypto).getRandomValues(new Uint8Array(64)))
        } catch (c) {
            a = [];
            for (var b = 0; 64 > b; b++) a[b] = Math.floor(256 * Math.random())
        }
        return _.kh(a, 3).substring(0, 64)
    };
    Kv = function(a, b, c) {
        if (!a.je) throw Error("ea");
        b ? _.lv(a.Zc, a.ie, !0, void 0, c) : _.lv(a.Zc, a.ie, !0, a.ee, c)
    };
    Lv = function(a) {
        if (!a.je) throw Error("ea");
        return a.VB
    };
    _.Gv.prototype.AK = _.Uc(38, function(a, b) {
        var c = this.Zc,
            d = this.Vb,
            e = this.ie,
            f = _.Cu(this.fi);
        delete f.response_type;
        _.iv(c, "getOnlineCode", {
            clientId: d,
            loginHint: a,
            request: f,
            sessionSelector: e
        }, b)
    });
    _.Ev.prototype.lM = _.Uc(37, function(a) {
        Lv(this) && Lv(this).access_token && (this.Zc.Mr(this.Vb, Lv(this).access_token, a), Kv(this, !0))
    });
    _.Ev.prototype.dI = _.Uc(36, function() {
        var a = this;
        this.mq(function(b) {
            b && b.hint ? b.disabled ? a.dispatchEvent({
                type: _.Dv.lp,
                idpId: a.Kb
            }) : a.Uh(!0) : a.dispatchEvent({
                type: _.Dv.zF,
                idpId: a.Kb
            })
        })
    });
    _.Ev.prototype.uq = _.Uc(35, function() {
        var a = this;
        return function(b) {
            b && b.authResult && b.authResult.login_hint && a.bx(b.authResult.login_hint, a.Tg || b.authResult.login_hint != a.ee, !0)
        }
    });
    _.Gv.prototype.uq = _.Uc(34, function(a) {
        var b = this;
        return function(c) {
            c && c.authResult && c.authResult.login_hint ? b.mq(function(d) {
                _.lv(b.Zc, b.ie, d && d.disabled, c.authResult.login_hint, function() {
                    _.Hv(b, c.authResult.login_hint, a)
                })
            }) : a(c && c.authResult && c.authResult.error ? c.authResult : c && c.authResult && !c.authResult.login_hint ? {
                error: "wrong_response_type"
            } : {
                error: "unknown_error"
            })
        }
    });
    _.yv.prototype.$K = _.Uc(33, function() {
        this.Vb && _.iv(this.Zc, "startPolling", {
            clientId: this.Vb,
            origin: this.Cd,
            id: this.aj
        }, void 0)
    });
    _.fv.prototype.Mr = _.Uc(29, function(a, b, c) {
        _.iv(this, "revoke", {
            clientId: a,
            token: b
        }, c)
    });
    _.Ev.prototype.Mr = _.Uc(28, function(a) {
        _.wv(this, this.lM, [a])
    });
    Mv = function() {
        var a = navigator.userAgent,
            b;
        if (b = !!a && -1 != a.indexOf("CriOS")) b = -1, (a = a.match(/CriOS\/(\d+)/)) && a[1] && (b = parseInt(a[1], 10) || -1), b = 48 > b;
        return b
    };
    Nv = function() {
        var a = navigator.userAgent.toLowerCase();
        if (!(-1 < a.indexOf("safari/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("android"))) return !1;
        var b = /version\/(\d+)\.(\d+)[\.0-9]*/.exec(navigator.userAgent.toLowerCase());
        if (!b || 3 > b.length) return !1;
        a = parseInt(b[1], 10);
        b = parseInt(b[2], 10);
        return 12 < a || 12 == a && 1 <= b
    };
    Ov = function(a, b, c, d, e, f, g) {
        var k = _.Mu(a, "authServerUrl");
        if (!k) throw Error("O`" + a);
        a = _.Cu(d);
        a.response_type = g || "permission";
        a.client_id = c;
        a.ss_domain = b;
        if (f && f.extraQueryParams)
            for (var l in f.extraQueryParams) a[l] = f.extraQueryParams[l];
        e && Nv() && !a.prompt && (a.prompt = "select_account");
        b = k + (0 > k.indexOf("?") ? "?" : "&");
        c = [];
        for (var m in a)
            if (a.hasOwnProperty(m)) {
                e = a[m];
                if (null === e || void 0 === e) e = "";
                c.push(encodeURIComponent(m) + "=" + encodeURIComponent(e))
            }
        return b + c.join("&")
    };
    Pv = function(a, b, c, d) {
        if (!a.Vb) throw Error("fa");
        a.aj = c || a.SR || "auth" + Math.floor(1E6 * Math.random() + 1);
        b = b || {};
        b.extraQueryParams = b.extraQueryParams || {};
        if (!b.extraQueryParams.redirect_uri) {
            var e = a.Cd.split("//");
            c = b.extraQueryParams;
            var f = e[0],
                g = f.indexOf(":");
            0 < g && (f = f.substring(0, g));
            e = ["storagerelay://", f, "/", e[1], "?"];
            e.push("id=" + a.aj);
            c.redirect_uri = e.join("")
        }
        return Ov(a.Kb, a.xc, a.Vb, a.xp, !0, b, d)
    };
    Qv = function(a, b, c) {
        if (!a.Vb) throw Error("fa");
        return Ov(a.Kb, a.xc, a.Vb, a.xp, !1, b, c)
    };
    Rv = function(a, b) {
        a.rm && window.clearTimeout(a.rm);
        a.rm = window.setTimeout(function() {
            a.aj == b && (_.Ou = void 0, a.rm = null, a.aj = void 0, a.ur({
                authResult: {
                    error: "popup_closed_by_user"
                }
            }))
        }, 1E3)
    };
    Sv = function(a, b, c) {
        if (!a.Vb) throw Error("ga");
        c = c || {};
        c = Pv(a, c.sessionMeta, c.oneTimeId, c.responseType);
        (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject || Mv()) && _.wv(a, a.$K, []);
        var d = a.aj;
        a.EL.open(c, b, function() {
            a.aj == d && Rv(a, d)
        }, function() {
            a.aj = void 0;
            a.ur({
                authResult: {
                    error: "popup_blocked_by_browser"
                }
            })
        })
    };
    Tv = function(a) {
        _.wv(a, a.dI, [])
    };
    Uv = function(a, b, c) {
        a.bm ? c(a.Il()) : _.wv(a, a.AK, [b, c])
    };
    _.Vv = function(a) {
        for (var b = [], c = 0, d = 0; c < a.length;) {
            var e = a[c++];
            if (128 > e) b[d++] = String.fromCharCode(e);
            else if (191 < e && 224 > e) {
                var f = a[c++];
                b[d++] = String.fromCharCode((e & 31) << 6 | f & 63)
            } else if (239 < e && 365 > e) {
                f = a[c++];
                var g = a[c++],
                    k = a[c++];
                e = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | k & 63) - 65536;
                b[d++] = String.fromCharCode(55296 + (e >> 10));
                b[d++] = String.fromCharCode(56320 + (e & 1023))
            } else f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63)
        }
        return b.join("")
    };
    _.Wv = function(a, b) {
        function c(l) {
            for (; d < a.length;) {
                var m = a.charAt(d++),
                    n = _.hh[m];
                if (null != n) return n;
                if (!_.Me(m)) throw Error("u`" + m);
            }
            return l
        }
        _.jh();
        for (var d = 0;;) {
            var e = c(-1),
                f = c(0),
                g = c(64),
                k = c(64);
            if (64 === k && -1 === e) break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k))
        }
    };
    Xv = function(a) {
        var b = [];
        _.Wv(a, function(c) {
            b.push(c)
        });
        return b
    };
    _.Yv = function(a, b) {
        _.Lh[b || "token"] = a
    };
    _.Zv = function(a) {
        delete _.Lh[a || "token"]
    };
    _.Hu = {
        parse: function(a) {
            a = _.yf("[" + String(a) + "]");
            if (!1 === a || 1 !== a.length) throw new SyntaxError("JSON parsing failed.");
            return a[0]
        },
        stringify: function(a) {
            return _.zf(a)
        }
    };
    _.Gv.prototype.Yz = function(a, b) {
        _.wv(this, this.lT, [a, b])
    };
    _.Gv.prototype.lT = function(a, b) {
        this.Zc.Yz(this.Vb, a, this.fi, this.ie, b)
    };
    _.fv.prototype.Yz = function(a, b, c, d, e) {
        c = _.Cu(c);
        _.iv(this, "gsi:fetchLoginHint", {
            clientId: a,
            loginHint: b,
            request: c,
            sessionSelector: d
        }, e)
    };
    var $v, aw = ["client_id", "cookie_policy", "scope"],
        bw = "client_id cookie_policy fetch_basic_profile hosted_domain scope openid_realm disable_token_refresh login_hint ux_mode redirect_uri state prompt oidc_spec_compliant nonce enable_serial_consent include_granted_scopes response_type session_selection gsiwebsdk".split(" "),
        cw = ["authuser", "after_redirect", "access_type", "hl"],
        dw = ["login_hint", "prompt"],
        ew = {
            clientid: "client_id",
            cookiepolicy: "cookie_policy"
        },
        fw = ["approval_prompt", "authuser", "login_hint",
            "prompt", "hd"
        ],
        gw = ["login_hint", "g-oauth-window", "status"],
        hw = Math.min(_.S("oauth-flow/authWindowWidth", 599), screen.width - 20),
        iw = Math.min(_.S("oauth-flow/authWindowHeight", 600), screen.height - 30);
    var jw = function(a) {
        _.Vc.call(this, a)
    };
    _.ii(jw, _.Vc);
    jw.prototype.name = "gapi.auth2.ExternallyVisibleError";
    var kw = function() {};
    kw.prototype.select = function(a, b) {
        if (a.sessions && 1 == a.sessions.length && (a = a.sessions[0], a.login_hint)) {
            b(a);
            return
        }
        b()
    };
    var lw = function() {};
    lw.prototype.select = function(a, b) {
        if (a.sessions && a.sessions.length)
            for (var c = 0; c < a.sessions.length; c++) {
                var d = a.sessions[c];
                if (d.login_hint) {
                    b(d);
                    return
                }
            }
        b()
    };
    var mw = function(a) {
        this.TR = a
    };
    mw.prototype.select = function(a, b) {
        if (a.sessions)
            for (var c = 0; c < a.sessions.length; c++) {
                var d = a.sessions[c];
                if (d.session_state && d.session_state.extraQueryParams && d.session_state.extraQueryParams.authuser == this.TR) {
                    d.login_hint ? b(d) : b();
                    return
                }
            }
        b()
    };
    var nw = function(a) {
        this.Qd = a;
        this.Kw = []
    };
    nw.prototype.select = function(a) {
        var b = 0,
            c = this,
            d = function(e) {
                if (e) a(e);
                else {
                    var f = c.Kw[b];
                    f ? (b++, c.Qd.Gv(function(g) {
                        g ? f.select(g, d) : d()
                    })) : a()
                }
            };
        d()
    };
    var ow = function(a) {
            a = new nw(a);
            a.Kw.push(new kw);
            return a
        },
        pw = function(a) {
            a = new nw(a);
            a.Kw.push(new lw);
            return a
        },
        qw = function(a, b) {
            void 0 === b || null === b ? b = ow(a) : (a = new nw(a), a.Kw.push(new mw(b)), b = a);
            return b
        };
    var rw = function(a) {
        this.Ye = a;
        this.$d = !0
    };
    rw.prototype.remove = function() {
        this.$d = !1
    };
    rw.prototype.trigger = function() {};
    var sw = function(a) {
            this.remove = function() {
                a.remove()
            };
            this.trigger = function() {
                a.trigger()
            }
        },
        tw = function() {
            this.Yb = []
        };
    tw.prototype.add = function(a) {
        this.Yb.push(a)
    };
    tw.prototype.notify = function(a) {
        for (var b = this.Yb, c = [], d = 0; d < b.length; d++) {
            var e = b[d];
            e.$d && (c.push(e), _.wk(uw(e.Ye, a)))
        }
        this.Yb = c
    };
    var uw = function(a, b) {
        return function() {
            a(b)
        }
    };
    var ww = function(a) {
        this.le = null;
        this.S1 = new vw(this);
        this.Yb = new tw;
        void 0 != a && this.set(a)
    };
    ww.prototype.set = function(a) {
        a != this.le && (this.le = a, this.S1.value = a, this.Yb.notify(this.le))
    };
    ww.prototype.get = function() {
        return this.le
    };
    ww.prototype.V = function(a) {
        a = new xw(this, a);
        this.Yb.add(a);
        return a
    };
    var xw = function(a, b) {
        rw.call(this, b);
        this.TX = a
    };
    _.ii(xw, rw);
    xw.prototype.trigger = function() {
        var a = this.Ye;
        a(this.TX.get())
    };
    var vw = function(a) {
        this.value = null;
        this.V = function(b) {
            return new sw(a.V(b))
        }
    };
    var yw = {
            I4: "fetch_basic_profile",
            U5: "login_hint",
            P7: "prompt",
            Z7: "redirect_uri",
            r8: "scope",
            b$: "ux_mode",
            y9: "state"
        },
        zw = function(a) {
            this.Ba = {};
            if (a && !_.$i(a))
                if ("function" == typeof a.get) this.Ba = a.get();
                else
                    for (var b in yw) {
                        var c = yw[b];
                        c in a && (this.Ba[c] = a[c])
                    }
        };
    zw.prototype.get = function() {
        return this.Ba
    };
    zw.prototype.eN = function(a) {
        this.Ba.scope = a;
        return this
    };
    zw.prototype.Gq = function() {
        return this.Ba.scope
    };
    var Aw = function(a, b) {
        var c = a.Ba.scope;
        b = Iv(b.split(" "), c ? c.split(" ") : []);
        _.Ke(b);
        a.Ba.scope = b.join(" ")
    };
    _.h = zw.prototype;
    _.h.v0 = function(a) {
        this.Ba.prompt = a;
        return this
    };
    _.h.OU = function() {
        return this.Ba.prompt
    };
    _.h.R_ = function() {
        _.Gf("Property app_package_name no longer supported and was not set");
        return this
    };
    _.h.FT = function() {
        _.Gf("Property app_package_name no longer supported")
    };
    _.h.Ne = function(a) {
        this.Ba.state = a
    };
    _.h.getState = function() {
        return this.Ba.state
    };
    var Bw = function() {
            return ["toolbar=no", "location=" + (window.opera ? "no" : "yes"), "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no", "width=" + hw, "height=" + iw, "top=" + (screen.height - iw) / 2, "left=" + (screen.width - hw) / 2].join()
        },
        Cw = function(a) {
            a = a && a.id_token;
            if (!a || !a.split(".")[1]) return null;
            a = (a.split(".")[1] + "...").replace(/^((....)+).?.?.?$/, "$1");
            return JSON.parse(_.Vv(Xv(a)))
        },
        Dw = function() {
            $v = _.S("auth2/idpValue", "google");
            var a = _.S("oauth-flow/authUrl", "https://accounts.google.com/o/oauth2/auth"),
                b = _.S("oauth-flow/idpIframeUrl", "https://accounts.google.com/o/oauth2/iframe");
            _.Nu($v, {
                authServerUrl: a,
                idpIFrameUrl: b
            })
        },
        Ew = function(a, b, c) {
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                if (d === b.length - 1) {
                    a[e] = c;
                    break
                }
                _.bb(a[e]) || (a[e] = {});
                a = a[e]
            }
        },
        Fw = function() {
            var a = window.location.origin;
            a || (a = window.location.protocol + "//" + window.location.host);
            return a
        };
    var Gw = function(a) {
        var b = a ? (b = Cw(a)) ? b.sub : null : null;
        this.Ca = b;
        this.wc = a ? _.lk(a) : null
    };
    _.h = Gw.prototype;
    _.h.ma = function() {
        return this.Ca
    };
    _.h.vA = function() {
        var a = Cw(this.wc);
        return a ? a.hd : null
    };
    _.h.If = function() {
        return !!this.wc
    };
    _.h.ek = function(a) {
        if (a) return this.wc;
        a = Hw;
        var b = _.lk(this.wc);
        !a.ov || a.nB || a.xW || (delete b.access_token, delete b.scope);
        return b
    };
    _.h.bD = function() {
        return Hw.bD()
    };
    _.h.wj = function() {
        this.wc = null
    };
    _.h.jU = function() {
        return this.wc ? this.wc.scope : null
    };
    _.h.update = function(a) {
        this.Ca = a.Ca;
        this.wc = a.wc;
        this.wc.id_token ? this.tt = new Iw(this.wc) : this.tt && (this.tt = null)
    };
    var Jw = function(a) {
        return a.wc && "object" == typeof a.wc.session_state ? _.lk(a.wc.session_state.extraQueryParams || {}) : {}
    };
    _.h = Gw.prototype;
    _.h.iq = function() {
        var a = Jw(this);
        return a && void 0 !== a.authuser && null !== a.authuser ? a.authuser : null
    };
    _.h.vj = function(a) {
        var b = Hw,
            c = new zw(a);
        b.nB = c.Gq() ? !0 : !1;
        Hw.ov && Aw(c, "openid profile email");
        return new _.Gk(function(d, e) {
            var f = Jw(this);
            f.login_hint = this.ma();
            f.scope = c.Gq();
            Kw(b, d, e, f)
        }, this)
    };
    _.h.Iq = function(a) {
        return new _.Gk(function(b, c) {
            var d = a || {},
                e = Hw;
            d.login_hint = this.ma();
            e.Iq(d).then(b, c)
        }, this)
    };
    _.h.jV = function(a) {
        return this.vj(a)
    };
    _.h.disconnect = function() {
        return Hw.disconnect()
    };
    _.h.IT = function() {
        return this.tt
    };
    _.h.Yu = function(a) {
        if (!this.If()) return !1;
        var b = this.wc && this.wc.scope ? this.wc.scope.split(" ") : "";
        return _.sb(a ? a.split(" ") : [], function(c) {
            return _.$a(b, c)
        })
    };
    var Iw = function(a) {
        a = Cw(a);
        this.CT = a.sub;
        this.Ad = a.name;
        this.gV = a.given_name;
        this.jT = a.family_name;
        this.OJ = a.picture;
        this.$t = a.email
    };
    _.h = Iw.prototype;
    _.h.ma = function() {
        return this.CT
    };
    _.h.getName = function() {
        return this.Ad
    };
    _.h.hU = function() {
        return this.gV
    };
    _.h.cU = function() {
        return this.jT
    };
    _.h.sU = function() {
        return this.OJ
    };
    _.h.Au = function() {
        return this.$t
    };
    var Mw = function(a, b, c) {
            this.jm = b;
            this.pY = a;
            for (var d in a) a.hasOwnProperty(d) && Lw(this, d);
            if (c && c.length)
                for (a = 0; a < c.length; a++) this[c[a]] = this.jm[c[a]]
        },
        Lw = function(a, b) {
            a[b] = function() {
                return a.pY[b].apply(a.jm, arguments)
            }
        };
    Mw.prototype.then = function(a, b, c) {
        var d = this;
        return _.Kk().then(function() {
            return Nw(d.jm, a, b, c)
        })
    };
    _.pk(Mw);
    var Ow;
    Ow = function(a) {
        var b = location;
        if (a && "none" != a) return "single_host_origin" == a ? b.protocol + "//" + b.host : a
    };
    _.Pw = function(a) {
        if (!a) throw new jw("No cookiePolicy");
        var b = window.location.hostname;
        "single_host_origin" == a && (a = window.location.protocol + "//" + b);
        if ("none" == a) return null;
        var c = /^(https?:\/\/)([0-9.\-_A-Za-z]+)(?::(\d+))?$/.exec(a);
        if (!c) throw new jw("Invalid cookiePolicy");
        a = c[2];
        c = c[1];
        var d = {};
        d.dotValue = a.split(".").length;
        d.isSecure = -1 != c.indexOf("https");
        d.domain = a;
        if (!_.Zi(b, "." + a) && !_.Zi(b, a)) throw new jw("Invalid cookiePolicy domain");
        return d
    };
    var Rw, Qw, Sw, Tw, Uw, Vw, Xw, bx, Yw, dx, ex, Zw;
    Rw = function(a) {
        var b = a || {},
            c = Qw();
        _.ob(bw, function(d) {
            "undefined" === typeof b[d] && "undefined" !== typeof c[d] && (b[d] = c[d])
        });
        return b
    };
    Qw = function() {
        for (var a = {}, b = document.getElementsByTagName("meta"), c = 0; c < b.length; ++c)
            if (b[c].name) {
                var d = b[c].name;
                if (0 == d.indexOf("google-signin-")) {
                    d = d.substring(14);
                    var e = b[c].content;
                    ew[d] && (d = ew[d]);
                    _.$a(bw, d) && e && (a[d] = "true" == e ? !0 : "false" == e ? !1 : e)
                }
            }
        return a
    };
    Sw = function(a) {
        return String(a).replace(/_([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    };
    Tw = function(a) {
        _.ob(bw, function(b) {
            var c = Sw(b);
            "undefined" !== typeof a[c] && "undefined" === typeof a[b] && (a[b] = a[c], delete a[c])
        })
    };
    Uw = function(a) {
        a = Rw(a);
        Tw(a);
        a.cookie_policy || (a.cookie_policy = "single_host_origin");
        var b = bw + cw,
            c;
        for (c in a) 0 > b.indexOf(c) && delete a[c];
        return a
    };
    Vw = function(a, b) {
        if (!a) throw new jw("Empty initial options.");
        for (var c = 0; c < aw.length; ++c)
            if (!(b && "scope" == aw[c] || a[aw[c]])) throw new jw("Missing required parameter '" + aw[c] + "'");
        _.Pw(a.cookie_policy)
    };
    Xw = function(a) {
        var b = {
            authParameters: {
                redirect_uri: void 0,
                response_type: "token id_token",
                scope: a.scope,
                "openid.realm": a.openid_realm
            },
            clientId: a.client_id,
            crossSubDomains: !0,
            domain: Ow(a.cookie_policy),
            disableTokenRefresh: !!a.disable_token_refresh,
            idpId: $v
        };
        _.Ww(b, a);
        _.ob(dw, function(c) {
            a[c] && (b.authParameters[c] = a[c])
        });
        "boolean" == typeof a.enable_serial_consent && (b.enableSerialConsent = a.enable_serial_consent);
        return b
    };
    _.Ww = function() {};
    bx = function(a) {
        var b = a.client_id,
            c = a.cookie_policy,
            d = a.scope,
            e = a.openid_realm,
            f = a.hosted_domain,
            g = a.oidc_spec_compliant,
            k = a.nonce,
            l = Yw(a),
            m = {
                authParameters: {
                    response_type: l,
                    scope: d,
                    "openid.realm": e
                },
                rpcAuthParameters: {
                    response_type: l,
                    scope: d,
                    "openid.realm": e
                },
                clientId: b,
                crossSubDomains: !0,
                domain: Ow(c),
                idpId: $v
            };
        f && (m.authParameters.hd = f, m.rpcAuthParameters.hd = f);
        g && (m.rpcAuthParameters.spec_compliant = g, k = k || _.Jv());
        k && (m.authParameters.nonce = k, m.rpcAuthParameters.nonce = k, m.forceTokenRefresh = !0, m.skipTokenCache = !0);
        _.ob(dw.concat(cw), function(n) {
            a[n] && (m.authParameters[n] = a[n])
        });
        void 0 !== a.authuser && null !== a.authuser && (m.authParameters.authuser = a.authuser);
        "boolean" == typeof a.include_granted_scopes && (b = new Zw(a.response_type || "token"), $w(b) && (m.authParameters.include_granted_scopes = a.include_granted_scopes), ax(b) && (m.rpcAuthParameters.include_granted_scopes = a.include_granted_scopes, !1 === a.include_granted_scopes && (m.forceTokenRefresh = !0, m.skipTokenCache = !0)));
        "boolean" == typeof a.enable_serial_consent && (m.enableSerialConsent =
            a.enable_serial_consent);
        return m
    };
    Yw = function(a) {
        a = new Zw(a.response_type || "token");
        var b = [];
        ax(a) && b.push("token");
        cx(a, "id_token") && b.push("id_token");
        0 == b.length && (b = ["token", "id_token"]);
        return b.join(" ")
    };
    dx = ["permission", "id_token"];
    ex = /(^|[^_])token/;
    Zw = function(a) {
        this.wo = [];
        this.EB(a)
    };
    Zw.prototype.EB = function(a) {
        a ? ((0 <= a.indexOf("permission") || a.match(ex)) && this.wo.push("permission"), 0 <= a.indexOf("id_token") && this.wo.push("id_token"), 0 <= a.indexOf("code") && this.wo.push("code")) : this.wo = dx
    };
    var $w = function(a) {
            return cx(a, "code")
        },
        ax = function(a) {
            return cx(a, "permission")
        };
    Zw.prototype.toString = function() {
        return this.wo.join(" ")
    };
    var cx = function(a, b) {
        var c = !1;
        _.ob(a.wo, function(d) {
            d == b && (c = !0)
        });
        return c
    };
    var Hw, fx, hx, jx, kx, Nw;
    Hw = null;
    _.gx = function() {
        return Hw ? fx() : null
    };
    fx = function() {
        return new Mw(hx.prototype, Hw, ["currentUser", "isSignedIn"])
    };
    hx = function(a) {
        delete a.include_granted_scopes;
        this.Ba = Xw(a);
        this.yS = a.cookie_policy;
        this.xW = !!a.scope;
        (this.ov = !1 !== a.fetch_basic_profile) && (this.Ba.authParameters.scope = ix(this, "openid profile email"));
        this.Sq = a.hosted_domain;
        this.P1 = a.ux_mode || "popup";
        this.yZ = a.redirect_uri || null;
        jx(this)
    };
    jx = function(a) {
        a.currentUser = new ww(new Gw(null));
        a.isSignedIn = new ww(!1);
        a.Qd = new _.Ev(a.Ba);
        a.Xn = null;
        a.vv = null;
        a.GX = new _.Gk(function(b, c) {
            this.Xn = b;
            this.vv = c
        }, a);
        a.ew = {};
        a.fr = !0;
        kx(a);
        a.Qd.start()
    };
    kx = function(a) {
        a.Qd.addEventListener("error", function(b) {
            a.fr && a.Xn && (a.fr = !1, a.vv({
                error: b.error,
                details: b.details
            }), a.Xn = null, a.vv = null)
        });
        a.Qd.addEventListener("authResult", function(b) {
            b && b.authResult && a.Te(b);
            a.Qd.uq()(b)
        });
        a.Qd.addEventListener("tokenReady", function(b) {
            var c = new Gw(b.response);
            if (a.Sq && a.Sq != c.vA()) a.Te({
                type: "tokenFailed",
                reason: "Account domain does not match hosted_domain specified by gapi.auth2.init.",
                accountDomain: c.vA(),
                expectedDomain: a.Sq
            });
            else {
                a.currentUser.get().update(c);
                var d = a.currentUser;
                d.Yb.notify(d.le);
                a.isSignedIn.set(!0);
                c = c.iq();
                (d = _.Pw(a.yS)) && c && _.Dh.set(["G_AUTHUSER_", "https:" === window.location.protocol && d.Fe ? "S" : "H", d.Ah].join(""), c, {
                    domain: d.domain,
                    secure: d.isSecure
                });
                _.Yv(b.response);
                a.Te(b)
            }
        });
        a.Qd.addEventListener("noSessionBound", function(b) {
            a.fr && b.autoOpenAuthUrl ? (a.fr = !1, ow(a.Qd).select(function(c) {
                if (c && c.login_hint) {
                    var d = a.Qd;
                    _.wv(d, d.bx, [c.login_hint, !0])
                } else a.currentUser.set(new Gw(null)), a.isSignedIn.set(!1), _.Zv(), a.Te(b)
            })) : (a.currentUser.set(new Gw(null)),
                a.isSignedIn.set(!1), _.Zv(), a.Te(b))
        });
        a.Qd.addEventListener("tokenFailed", function(b) {
            a.Te(b)
        });
        a.Qd.addEventListener("userLoggedOut", function(b) {
            a.currentUser.get().wj();
            var c = a.currentUser;
            c.Yb.notify(c.le);
            a.isSignedIn.set(!1);
            _.Zv();
            a.Te(b)
        })
    };
    Nw = function(a, b, c, d) {
        return a.GX.then(function(e) {
            if (b) return b(e.hV)
        }, c, d)
    };
    hx.prototype.Te = function(a) {
        if (a) {
            this.fr = !1;
            var b = a.type || "";
            if (this.ew[b]) this.ew[b](a);
            this.Xn && (this.Xn({
                hV: this
            }), this.vv = this.Xn = null)
        }
    };
    var lx = function(a, b) {
            _.Db(b, function(c, d) {
                a.ew[d] = function(e) {
                    a.ew = {};
                    c(e)
                }
            })
        },
        Kw = function(a, b, c, d) {
            d = _.lk(d);
            a.Sq && (d.hd = a.Sq);
            var e = d.ux_mode || a.P1;
            delete d.ux_mode;
            delete d.app_package_name;
            var f = {
                sessionMeta: {
                    extraQueryParams: d
                },
                responseType: "permission id_token"
            };
            "redirect" == e ? (d.redirect_uri || (d.redirect_uri = a.yZ || Fw() + window.location.pathname), mx(a, f)) : (delete d.redirect_uri, nx(a, f), lx(a, {
                authResult: function(g) {
                    g.authResult && g.authResult.error ? c(g.authResult) : lx(a, {
                        tokenReady: function() {
                            b(a.currentUser.get())
                        },
                        tokenFailed: c
                    })
                }
            }))
        };
    hx.prototype.vj = function(a) {
        return new _.Gk(function(b, c) {
            var d = new zw(a);
            this.nB = d.Gq() ? !0 : !1;
            this.ov ? (d.Ba.fetch_basic_profile = !0, Aw(d, "email profile openid")) : d.Ba.fetch_basic_profile = !1;
            var e = ix(this, d.Gq());
            d.eN(e);
            Kw(this, b, c, d.get())
        }, this)
    };
    hx.prototype.Iq = function(a) {
        var b = a || {};
        this.nB = !!b.scope;
        a = ix(this, b.scope);
        if ("" == a) return _.Lk({
            error: "Missing required parameter: scope"
        });
        var c = {
            scope: a,
            access_type: "offline",
            include_granted_scopes: !0
        };
        _.ob(fw, function(d) {
            null != b[d] && (c[d] = b[d])
        });
        c.hasOwnProperty("prompt") || c.hasOwnProperty("approval_prompt") || (c.prompt = "consent");
        return "postmessage" == b.redirect_uri || void 0 == b.redirect_uri ? ox(this, c) : px(this, c, b.redirect_uri)
    };
    var px = function(a, b, c) {
            b.redirect_uri = c;
            mx(a, {
                sessionMeta: {
                    extraQueryParams: b
                },
                responseType: "code id_token"
            });
            return _.Kk({
                message: "Redirecting to IDP."
            })
        },
        ox = function(a, b) {
            b.origin = Fw();
            delete b.redirect_uri;
            nx(a, {
                sessionMeta: {
                    extraQueryParams: b
                },
                responseType: "code permission id_token"
            });
            return new _.Gk(function(c, d) {
                lx(this, {
                    authResult: function(e) {
                        (e = e && e.authResult) && e.code ? c({
                            code: e.code
                        }) : d(e && e.error ? e : {
                            error: "unknown_error"
                        })
                    }
                })
            }, a)
        },
        nx = function(a, b) {
            Ew(b, ["sessionMeta", "extraQueryParams",
                "gsiwebsdk"
            ], "2");
            Sv(a.Qd, Bw(), b)
        },
        mx = function(a, b) {
            Ew(b, ["sessionMeta", "extraQueryParams", "gsiwebsdk"], "2");
            b = b || {};
            window.location.assign(Qv(a.Qd, b.sessionMeta, b.responseType))
        };
    hx.prototype.wj = function(a) {
        var b = a || !1;
        return new _.Gk(function(c) {
            Kv(this.Qd, b, function() {
                c()
            })
        }, this)
    };
    hx.prototype.zI = function() {
        return this.Ba.authParameters.scope
    };
    var ix = function(a, b) {
        a = a.zI();
        b = Iv(b ? b.split(" ") : [], a ? a.split(" ") : []);
        _.Ke(b);
        return b.join(" ")
    };
    hx.prototype.bD = function() {
        var a = this;
        return new _.Gk(function(b, c) {
            lx(a, {
                noSessionBound: c,
                tokenFailed: c,
                userLoggedOut: c,
                tokenReady: function(d) {
                    b(d.response)
                }
            });
            Tv(a.Qd)
        })
    };
    hx.prototype.PR = function(a, b, c, d) {
        if (a = "string" === typeof a ? document.getElementById(a) : a) {
            var e = this;
            _.Oi(a, "click", function() {
                var f = b;
                "function" == typeof b && (f = b());
                e.vj(f).then(function(g) {
                    c && c(g)
                }, function(g) {
                    d && d(g)
                })
            })
        } else d && d({
            error: "Could not attach click handler to the element. Reason: element not found."
        })
    };
    hx.prototype.disconnect = function() {
        return new _.Gk(function(a) {
            this.Qd.Mr(function() {
                a()
            })
        }, this)
    };
    var qx;
    _.Gk.prototype["catch"] = _.Gk.prototype.ys;
    qx = null;
    _.rx = function(a) {
        a = Uw(a);
        if (Hw) {
            if (_.kk(a, qx || {})) return fx();
            throw new jw("gapi.auth2 has been initialized with different options. Consider calling gapi.auth2.getAuthInstance() instead of gapi.auth2.init().");
        }
        Vw(a, !1 !== a.fetch_basic_profile);
        Dw();
        qx = a;
        Hw = new hx(a);
        _.ze.ga = 1;
        return fx()
    };
    var tx, vx, sx, xx, wx, yx;
    _.ux = function(a, b) {
        Dw();
        a = Uw(a);
        Vw(a);
        var c = bx(a),
            d = new _.Gv(c);
        "none" == a.prompt ? sx(d, a, function(e) {
            e.status = e.error ? {
                signed_in: !1,
                method: null,
                google_logged_in: !1
            } : {
                signed_in: !0,
                method: "AUTO",
                google_logged_in: !0
            };
            b(e)
        }) : tx(d, a, function(e) {
            if (e.error) e.status = {
                signed_in: !1,
                method: null,
                google_logged_in: !1
            };
            else {
                var f = e.access_token || e.id_token;
                e.status = {
                    signed_in: !!f,
                    method: "PROMPT",
                    google_logged_in: !!f
                }
            }
            e["g-oauth-window"] = d.EL.ih;
            b(e)
        })
    };
    tx = function(a, b, c) {
        var d = new Zw(b.response_type);
        c = vx(a, d, c);
        var e = {
            responseType: d.toString()
        };
        Ew(e, ["sessionMeta", "extraQueryParams", "gsiwebsdk"], b.gsiwebsdk || "2");
        $w(d) && Ew(e, ["sessionMeta", "extraQueryParams", "access_type"], b.access_type || "offline");
        b.redirect_uri && Ew(e, ["sessionMeta", "extraQueryParams", "redirect_uri"], b.redirect_uri);
        b.state && Ew(e, ["sessionMeta", "extraQueryParams", "state"], b.state);
        b = Bw();
        a.bm ? c({
            authResult: {
                error: "idpiframe_initialization_failed",
                details: a.Il().error
            }
        }) : (a.kl =
            c, Sv(a, b, e))
    };
    vx = function(a, b, c) {
        if (ax(b)) {
            var d = wx(c);
            return function(e) {
                e && e.authResult && !e.authResult.error ? a.uq(function(f) {
                    f && !f.error ? (f = _.lk(f), $w(b) && (f.code = e.authResult.code), d(f)) : d(f ? f : {
                        error: "unknown_error"
                    })
                })(e) : d(e && e.authResult ? e.authResult : {
                    error: "unknown_error"
                })
            }
        }
        return function(e) {
            e && e.authResult && !e.authResult.error ? c(_.lk(e.authResult)) : c(e && e.authResult ? e.authResult : {
                error: "unknown_error"
            })
        }
    };
    sx = function(a, b, c) {
        if ($w(new Zw(b.response_type)) && "offline" == b.access_type) c({
            error: "immediate_failed",
            error_subtype: "access_denied"
        });
        else {
            var d = wx(c);
            b.login_hint ? a.Yz(b.login_hint, function(e) {
                e ? xx(a, b, e, d) : c({
                    error: "immediate_failed",
                    error_subtype: "access_denied"
                })
            }) : void 0 !== b.authuser && null !== b.authuser ? qw(a, b.authuser).select(function(e) {
                e && e.login_hint ? xx(a, b, e.login_hint, d) : d({
                    error: "immediate_failed",
                    error_subtype: "access_denied"
                })
            }) : a.mq(function(e) {
                e && e.hint ? xx(a, b, e.hint, d) : e && e.disabled ?
                    d({
                        error: "immediate_failed",
                        error_subtype: "no_user_bound"
                    }) : ("first_valid" == b.session_selection ? pw(a) : ow(a)).select(function(f) {
                        f && f.login_hint ? xx(a, b, f.login_hint, d) : d({
                            error: "immediate_failed",
                            error_subtype: "no_user_bound"
                        })
                    })
            })
        }
    };
    xx = function(a, b, c, d) {
        b = new Zw(b.response_type);
        var e = 0,
            f = {},
            g = function(k) {
                !k || k.error ? d(k) : (e--, _.Fb(f, k), 0 == e && d(f))
            };
        (ax(b) || cx(b, "id_token")) && e++;
        $w(b) && e++;
        (ax(b) || cx(b, "id_token")) && _.Hv(a, c, g);
        $w(b) && Uv(a, c, g)
    };
    wx = function(a) {
        return function(b) {
            if (!b || b.error) _.Zv(), b ? a(b) : a({
                error: "unknown_error"
            });
            else {
                if (b.access_token) {
                    var c = _.lk(b);
                    yx(c);
                    delete c.id_token;
                    delete c.code;
                    _.Yv(c)
                }
                a(b)
            }
        }
    };
    yx = function(a) {
        _.ob(gw, function(b) {
            delete a[b]
        })
    };
    _.C("gapi.auth2.init", _.rx);
    _.C("gapi.auth2.authorize", function(a, b) {
        if (null != Hw) throw new jw("gapi.auth2.authorize cannot be called after GoogleAuth has been initialized (i.e. with a call to gapi.auth2.init, or gapi.client.init when given a 'clientId' and a 'scope' parameters).");
        _.ux(a, function(c) {
            yx(c);
            b(c)
        })
    });
    _.C("gapi.auth2._gt", function() {
        return _.Mh()
    });
    _.C("gapi.auth2.enableDebugLogs", function(a) {
        a = !1 !== a;
        _.xu = "0" != a && !!a
    });
    _.C("gapi.auth2.getAuthInstance", _.gx);
    _.C("gapi.auth2.BasicProfile", Iw);
    _.C("gapi.auth2.BasicProfile.prototype.getId", Iw.prototype.ma);
    _.C("gapi.auth2.BasicProfile.prototype.getName", Iw.prototype.getName);
    _.C("gapi.auth2.BasicProfile.prototype.getGivenName", Iw.prototype.hU);
    _.C("gapi.auth2.BasicProfile.prototype.getFamilyName", Iw.prototype.cU);
    _.C("gapi.auth2.BasicProfile.prototype.getImageUrl", Iw.prototype.sU);
    _.C("gapi.auth2.BasicProfile.prototype.getEmail", Iw.prototype.Au);
    _.C("gapi.auth2.GoogleAuth", hx);
    _.C("gapi.auth2.GoogleAuth.prototype.attachClickHandler", hx.prototype.PR);
    _.C("gapi.auth2.GoogleAuth.prototype.disconnect", hx.prototype.disconnect);
    _.C("gapi.auth2.GoogleAuth.prototype.grantOfflineAccess", hx.prototype.Iq);
    _.C("gapi.auth2.GoogleAuth.prototype.signIn", hx.prototype.vj);
    _.C("gapi.auth2.GoogleAuth.prototype.signOut", hx.prototype.wj);
    _.C("gapi.auth2.GoogleAuth.prototype.getInitialScopes", hx.prototype.zI);
    _.C("gapi.auth2.GoogleUser", Gw);
    _.C("gapi.auth2.GoogleUser.prototype.grant", Gw.prototype.jV);
    _.C("gapi.auth2.GoogleUser.prototype.getId", Gw.prototype.ma);
    _.C("gapi.auth2.GoogleUser.prototype.isSignedIn", Gw.prototype.If);
    _.C("gapi.auth2.GoogleUser.prototype.getAuthResponse", Gw.prototype.ek);
    _.C("gapi.auth2.GoogleUser.prototype.getBasicProfile", Gw.prototype.IT);
    _.C("gapi.auth2.GoogleUser.prototype.getGrantedScopes", Gw.prototype.jU);
    _.C("gapi.auth2.GoogleUser.prototype.getHostedDomain", Gw.prototype.vA);
    _.C("gapi.auth2.GoogleUser.prototype.grantOfflineAccess", Gw.prototype.Iq);
    _.C("gapi.auth2.GoogleUser.prototype.hasGrantedScopes", Gw.prototype.Yu);
    _.C("gapi.auth2.GoogleUser.prototype.reloadAuthResponse", Gw.prototype.bD);
    _.C("gapi.auth2.LiveValue", ww);
    _.C("gapi.auth2.LiveValue.prototype.listen", ww.prototype.V);
    _.C("gapi.auth2.LiveValue.prototype.get", ww.prototype.get);
    _.C("gapi.auth2.SigninOptionsBuilder", zw);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getAppPackageName", zw.prototype.FT);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setAppPackageName", zw.prototype.R_);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getScope", zw.prototype.Gq);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setScope", zw.prototype.eN);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getPrompt", zw.prototype.OU);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setPrompt", zw.prototype.v0);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.get", zw.prototype.get);

    _.Ww = function(a, b) {
        var c = b.oidc_spec_compliant;
        b = b.nonce;
        c && (a.spec_compliant = c, b = b || _.Jv());
        b && (a.authParameters.nonce = b, a.forceTokenRefresh = !0, a.skipTokenCache = !0)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var zx = function() {};
    zx.prototype.DG = null;
    zx.prototype.getOptions = function() {
        var a;
        (a = this.DG) || (a = {}, _.Ax(this) && (a[0] = !0, a[1] = !0), a = this.DG = a);
        return a
    };
    var Cx;
    Cx = function() {};
    _.K(Cx, zx);
    _.Ax = function(a) {
        if (!a.JJ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.JJ = d
                } catch (e) {}
            }
            throw Error("ka");
        }
        return a.JJ
    };
    _.Bx = new Cx;

    _.Oe = _.Oe || {};

    _.Oe = _.Oe || {};
    (function() {
        function a(c, d) {
            return String.fromCharCode(d)
        }
        var b = {
            0: !1,
            10: !0,
            13: !0,
            34: !0,
            39: !0,
            60: !0,
            62: !0,
            92: !0,
            8232: !0,
            8233: !0,
            65282: !0,
            65287: !0,
            65308: !0,
            65310: !0,
            65340: !0
        };
        _.Oe.escape = function(c, d) {
            if (c) {
                if ("string" === typeof c) return _.Oe.escapeString(c);
                if ("Array" === typeof c) {
                    var e = 0;
                    for (d = c.length; e < d; ++e) c[e] = _.Oe.escape(c[e])
                } else if ("object" === typeof c && d) {
                    d = {};
                    for (e in c) c.hasOwnProperty(e) && (d[_.Oe.escapeString(e)] = _.Oe.escape(c[e], !0));
                    return d
                }
            }
            return c
        };
        _.Oe.escapeString = function(c) {
            if (!c) return c;
            for (var d = [], e, f, g = 0, k = c.length; g < k; ++g) e = c.charCodeAt(g), f = b[e], !0 === f ? d.push("&#", e, ";") : !1 !== f && d.push(c.charAt(g));
            return d.join("")
        };
        _.Oe.unescapeString = function(c) {
            return c ? c.replace(/&#([0-9]+);/g, a) : c
        }
    })();

    _.Oe = _.Oe || {};
    (function() {
        function a(b) {
            var c = "";
            if (3 == b.nodeType || 4 == b.nodeType) c = b.nodeValue;
            else if (b.innerText) c = b.innerText;
            else if (b.innerHTML) c = b.innerHTML;
            else if (b.firstChild) {
                c = [];
                for (b = b.firstChild; b; b = b.nextSibling) c.push(a(b));
                c = c.join("")
            }
            return c
        }
        _.Oe.createElement = function(b) {
            if (!document.body || document.body.namespaceURI) try {
                var c = document.createElementNS("http://www.w3.org/1999/xhtml", b)
            } catch (d) {}
            return c || document.createElement(b)
        };
        _.Oe.createIframeElement = function(b) {
            var c = _.Oe.createElement("iframe");
            try {
                var d = ["<", "iframe"],
                    e = b || {},
                    f;
                for (f in e) e.hasOwnProperty(f) && (d.push(" "), d.push(f), d.push('="'), d.push(_.Oe.escapeString(e[f])), d.push('"'));
                d.push("></");
                d.push("iframe");
                d.push(">");
                var g = _.Oe.createElement(d.join(""));
                g && (!c || g.tagName == c.tagName && g.namespaceURI == c.namespaceURI) && (c = g)
            } catch (l) {}
            d = c;
            b = b || {};
            for (var k in b) b.hasOwnProperty(k) && (d[k] = b[k]);
            return c
        };
        _.Oe.getBodyElement = function() {
            if (document.body) return document.body;
            try {
                var b = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",
                    "body");
                if (b && 1 == b.length) return b[0]
            } catch (c) {}
            return document.documentElement || document
        };
        _.Oe.Xaa = function(b) {
            return a(b)
        }
    })();

    (function() {
        function a(e, f) {
            if (!(e < c) && d)
                if (2 === e && d.warn) d.warn(f);
                else if (3 === e && d.error) try {
                d.error(f)
            } catch (g) {} else d.log && d.log(f)
        }
        var b = function(e) {
            a(1, e)
        };
        _.Pe = function(e) {
            a(2, e)
        };
        _.Qe = function(e) {
            a(3, e)
        };
        _.Re = function() {};
        b.INFO = 1;
        b.WARNING = 2;
        b.NONE = 4;
        var c = 1,
            d = window.console ? window.console : window.opera ? window.opera.postError : void 0;
        return b
    })();

    _.Oe = _.Oe || {};
    (function() {
        var a = [];
        _.Oe.registerOnLoadHandler = function(b) {
            a.push(b)
        };
        _.Oe.hca = function() {
            for (var b = 0, c = a.length; b < c; ++b) a[b]()
        }
    })();

    _.Oe = _.Oe || {};
    (function() {
        function a(c) {
            var d = "undefined" === typeof c;
            if (null !== b && d) return b;
            var e = {};
            c = c || window.location.href;
            var f = c.indexOf("?"),
                g = c.indexOf("#");
            c = (-1 === g ? c.substr(f + 1) : [c.substr(f + 1, g - f - 1), "&", c.substr(g + 1)].join("")).split("&");
            f = window.decodeURIComponent ? decodeURIComponent : unescape;
            g = 0;
            for (var k = c.length; g < k; ++g) {
                var l = c[g].indexOf("=");
                if (-1 !== l) {
                    var m = c[g].substring(0, l);
                    l = c[g].substring(l + 1);
                    l = l.replace(/\+/g, " ");
                    try {
                        e[m] = f(l)
                    } catch (n) {}
                }
            }
            d && (b = e);
            return e
        }
        var b = null;
        _.Oe.getUrlParameters = a;
        a()
    })();
    _.C("gadgets.util.getUrlParameters", _.Oe.getUrlParameters);

    _.Se = function() {
        var a = window.gadgets && window.gadgets.config && window.gadgets.config.get;
        a && _.He(a());
        return {
            register: function(b, c, d) {
                d && d(_.S())
            },
            get: function(b) {
                return _.S(b)
            },
            update: function(b, c) {
                if (c) throw "Config replacement is not supported";
                _.He(b)
            },
            init: function() {}
        }
    }();
    _.C("gadgets.config.register", _.Se.register);
    _.C("gadgets.config.get", _.Se.get);
    _.C("gadgets.config.init", _.Se.init);
    _.C("gadgets.config.update", _.Se.update);

    _.C("gadgets.json.stringify", _.zf);
    _.C("gadgets.json.parse", _.yf);

    _.If = function() {
        var a = _.ke.readyState;
        return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
    };
    _.Jf = function(a) {
        if (_.If()) a();
        else {
            var b = !1,
                c = function() {
                    if (!b) return b = !0, a.apply(this, arguments)
                };
            _.je.addEventListener ? (_.je.addEventListener("load", c, !1), _.je.addEventListener("DOMContentLoaded", c, !1)) : _.je.attachEvent && (_.je.attachEvent("onreadystatechange", function() {
                _.If() && c.apply(this, arguments)
            }), _.je.attachEvent("onload", c))
        }
    };
    _.te(_.je.location.href, "rpctoken") && _.ye(_.ke, "unload", function() {});
    var Kf = Kf || {};
    Kf.mM = null;
    Kf.XK = null;
    Kf.ev = null;
    Kf.frameElement = null;
    Kf = Kf || {};
    Kf.VE || (Kf.VE = function() {
        function a(f, g, k) {
            "undefined" != typeof window.addEventListener ? window.addEventListener(f, g, k) : "undefined" != typeof window.attachEvent && window.attachEvent("on" + f, g);
            "message" === f && (window.___jsl = window.___jsl || {}, f = window.___jsl, f.RPMQ = f.RPMQ || [], f.RPMQ.push(g))
        }

        function b(f) {
            var g = _.yf(f.data);
            if (g && g.f) {
                (0, _.Re)("gadgets.rpc.receive(" + window.name + "): " + f.data);
                var k = _.Lf.getTargetOrigin(g.f);
                e && ("undefined" !== typeof f.origin ? f.origin !== k : f.domain !== /^.+:\/\/([^:]+).*/.exec(k)[1]) ? _.Qe("Invalid rpc message origin. " +
                    k + " vs " + (f.origin || "")) : c(g, f.origin)
            }
        }
        var c, d, e = !0;
        return {
            nI: function() {
                return "wpm"
            },
            FX: function() {
                return !0
            },
            init: function(f, g) {
                _.Se.register("rpc", null, function(k) {
                    "true" === String((k && k.rpc || {}).disableForceSecure) && (e = !1)
                });
                c = f;
                d = g;
                a("message", b, !1);
                d("..", !0);
                return !0
            },
            Fc: function(f) {
                d(f, !0);
                return !0
            },
            call: function(f, g, k) {
                var l = _.Lf.getTargetOrigin(f),
                    m = _.Lf.UF(f);
                l ? window.setTimeout(function() {
                    var n = _.zf(k);
                    (0, _.Re)("gadgets.rpc.send(" + window.name + "): " + n);
                    m.postMessage(n, l)
                }, 0) : ".." != f && _.Qe("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");
                return !0
            }
        }
    }());
    if (window.gadgets && window.gadgets.rpc) "undefined" != typeof _.Lf && _.Lf || (_.Lf = window.gadgets.rpc, _.Lf.config = _.Lf.config, _.Lf.register = _.Lf.register, _.Lf.unregister = _.Lf.unregister, _.Lf.registerDefault = _.Lf.registerDefault, _.Lf.unregisterDefault = _.Lf.unregisterDefault, _.Lf.forceParentVerifiable = _.Lf.forceParentVerifiable, _.Lf.call = _.Lf.call, _.Lf.getRelayUrl = _.Lf.getRelayUrl, _.Lf.setRelayUrl = _.Lf.setRelayUrl, _.Lf.setAuthToken = _.Lf.setAuthToken, _.Lf.setupReceiver = _.Lf.setupReceiver, _.Lf.getAuthToken =
        _.Lf.getAuthToken, _.Lf.removeReceiver = _.Lf.removeReceiver, _.Lf.getRelayChannel = _.Lf.getRelayChannel, _.Lf.receive = _.Lf.receive, _.Lf.WL = _.Lf.receiveSameDomain, _.Lf.getOrigin = _.Lf.getOrigin, _.Lf.getTargetOrigin = _.Lf.getTargetOrigin, _.Lf.UF = _.Lf._getTargetWin, _.Lf.yR = _.Lf._parseSiblingId);
    else {
        _.Lf = function() {
            function a(x, N) {
                if (!O[x]) {
                    var aa = Xa;
                    N || (aa = na);
                    O[x] = aa;
                    N = M[x] || [];
                    for (var ca = 0; ca < N.length; ++ca) {
                        var la = N[ca];
                        la.t = D[x];
                        aa.call(x, la.f, la)
                    }
                    M[x] = []
                }
            }

            function b() {
                function x() {
                    ha = !0
                }
                Ia || ("undefined" !=
                    typeof window.addEventListener ? window.addEventListener("unload", x, !1) : "undefined" != typeof window.attachEvent && window.attachEvent("onunload", x), Ia = !0)
            }

            function c(x, N, aa, ca, la) {
                D[N] && D[N] === aa || (_.Qe("Invalid gadgets.rpc token. " + D[N] + " vs " + aa), ua(N, 2));
                la.onunload = function() {
                    J[N] && !ha && (ua(N, 1), _.Lf.removeReceiver(N))
                };
                b();
                ca = _.yf(decodeURIComponent(ca))
            }

            function d(x, N) {
                if (x && "string" === typeof x.s && "string" === typeof x.f && x.a instanceof Array)
                    if (D[x.f] && D[x.f] !== x.t && (_.Qe("Invalid gadgets.rpc token. " +
                            D[x.f] + " vs " + x.t), ua(x.f, 2)), "__ack" === x.s) window.setTimeout(function() {
                        a(x.f, !0)
                    }, 0);
                    else {
                        x.c && (x.callback = function(ra) {
                            _.Lf.call(x.f, (x.g ? "legacy__" : "") + "__cb", null, x.c, ra)
                        });
                        if (N) {
                            var aa = e(N);
                            x.origin = N;
                            var ca = x.r;
                            try {
                                var la = e(ca)
                            } catch (ra) {}
                            ca && la == aa || (ca = N);
                            x.referer = ca
                        }
                        N = (t[x.s] || t[""]).apply(x, x.a);
                        x.c && "undefined" !== typeof N && _.Lf.call(x.f, "__cb", null, x.c, N)
                    }
            }

            function e(x) {
                if (!x) return "";
                x = x.split("#")[0].split("?")[0];
                x = x.toLowerCase();
                0 == x.indexOf("//") && (x = window.location.protocol + x); -
                1 == x.indexOf("://") && (x = window.location.protocol + "//" + x);
                var N = x.substring(x.indexOf("://") + 3),
                    aa = N.indexOf("/"); - 1 != aa && (N = N.substring(0, aa));
                x = x.substring(0, x.indexOf("://"));
                if ("http" !== x && "https" !== x && "chrome-extension" !== x && "file" !== x && "android-app" !== x && "chrome-search" !== x && "chrome-untrusted" !== x && "chrome" !== x && "devtools" !== x) throw Error("l");
                aa = "";
                var ca = N.indexOf(":");
                if (-1 != ca) {
                    var la = N.substring(ca + 1);
                    N = N.substring(0, ca);
                    if ("http" === x && "80" !== la || "https" === x && "443" !== la) aa = ":" + la
                }
                return x +
                    "://" + N + aa
            }

            function f(x) {
                if ("/" == x.charAt(0)) {
                    var N = x.indexOf("|");
                    return {
                        id: 0 < N ? x.substring(1, N) : x.substring(1),
                        origin: 0 < N ? x.substring(N + 1) : null
                    }
                }
                return null
            }

            function g(x) {
                if ("undefined" === typeof x || ".." === x) return window.parent;
                var N = f(x);
                if (N) return window.top.frames[N.id];
                x = String(x);
                return (N = window.frames[x]) ? N : (N = document.getElementById(x)) && N.contentWindow ? N.contentWindow : null
            }

            function k(x, N) {
                if (!0 !== J[x]) {
                    "undefined" === typeof J[x] && (J[x] = 0);
                    var aa = g(x);
                    ".." !== x && null == aa || !0 !== Xa.Fc(x, N) ?
                        !0 !== J[x] && 10 > J[x]++ ? window.setTimeout(function() {
                            k(x, N)
                        }, 500) : (O[x] = na, J[x] = !0) : J[x] = !0
                }
            }

            function l(x) {
                (x = w[x]) && "/" === x.substring(0, 1) && (x = "/" === x.substring(1, 2) ? document.location.protocol + x : document.location.protocol + "//" + document.location.host + x);
                return x
            }

            function m(x, N, aa) {
                N && !/http(s)?:\/\/.+/.test(N) && (0 == N.indexOf("//") ? N = window.location.protocol + N : "/" == N.charAt(0) ? N = window.location.protocol + "//" + window.location.host + N : -1 == N.indexOf("://") && (N = window.location.protocol + "//" + N));
                w[x] = N;
                "undefined" !==
                typeof aa && (y[x] = !!aa)
            }

            function n(x, N) {
                N = N || "";
                D[x] = String(N);
                k(x, N)
            }

            function p(x) {
                x = (x.passReferrer || "").split(":", 2);
                L = x[0] || "none";
                Y = x[1] || "origin"
            }

            function u(x) {
                "true" === String(x.useLegacyProtocol) && (Xa = Kf.ev || na, Xa.init(d, a))
            }

            function r(x, N) {
                function aa(ca) {
                    ca = ca && ca.rpc || {};
                    p(ca);
                    var la = ca.parentRelayUrl || "";
                    la = e(X.parent || N) + la;
                    m("..", la, "true" === String(ca.useLegacyProtocol));
                    u(ca);
                    n("..", x)
                }!X.parent && N ? aa({}) : _.Se.register("rpc", null, aa)
            }

            function v(x, N, aa) {
                if (".." === x) r(aa || X.rpctoken || X.ifpctok ||
                    "", N);
                else a: {
                    var ca = null;
                    if ("/" != x.charAt(0)) {
                        if (!_.Oe) break a;
                        ca = document.getElementById(x);
                        if (!ca) throw Error("m`" + x);
                    }
                    ca = ca && ca.src;N = N || _.Lf.getOrigin(ca);m(x, N);N = _.Oe.getUrlParameters(ca);n(x, aa || N.rpctoken)
                }
            }
            var t = {},
                w = {},
                y = {},
                D = {},
                z = 0,
                G = {},
                J = {},
                X = {},
                O = {},
                M = {},
                L = null,
                Y = null,
                sa = window.top !== window.self,
                Ca = window.name,
                ua = function() {},
                Oa = window.console,
                Ka = Oa && Oa.log && function(x) {
                    Oa.log(x)
                } || function() {},
                na = function() {
                    function x(N) {
                        return function() {
                            Ka(N + ": call ignored")
                        }
                    }
                    return {
                        nI: function() {
                            return "noop"
                        },
                        FX: function() {
                            return !0
                        },
                        init: x("init"),
                        Fc: x("setup"),
                        call: x("call")
                    }
                }();
            _.Oe && (X = _.Oe.getUrlParameters());
            var ha = !1,
                Ia = !1,
                Xa = function() {
                    if ("rmr" == X.rpctx) return Kf.mM;
                    var x = "function" === typeof window.postMessage ? Kf.VE : "object" === typeof window.postMessage ? Kf.VE : window.ActiveXObject ? Kf.XK ? Kf.XK : Kf.ev : 0 < navigator.userAgent.indexOf("WebKit") ? Kf.mM : "Gecko" === navigator.product ? Kf.frameElement : Kf.ev;
                    x || (x = na);
                    return x
                }();
            t[""] = function() {
                Ka("Unknown RPC service: " + this.s)
            };
            t.__cb = function(x, N) {
                var aa = G[x];
                aa && (delete G[x], aa.call(this, N))
            };
            return {
                config: function(x) {
                    "function" === typeof x.sM && (ua = x.sM)
                },
                register: function(x, N) {
                    if ("__cb" === x || "__ack" === x) throw Error("n");
                    if ("" === x) throw Error("o");
                    t[x] = N
                },
                unregister: function(x) {
                    if ("__cb" === x || "__ack" === x) throw Error("p");
                    if ("" === x) throw Error("q");
                    delete t[x]
                },
                registerDefault: function(x) {
                    t[""] = x
                },
                unregisterDefault: function() {
                    delete t[""]
                },
                forceParentVerifiable: function() {},
                call: function(x, N, aa, ca) {
                    x = x || "..";
                    var la = "..";
                    ".." === x ? la = Ca : "/" == x.charAt(0) &&
                        (la = _.Lf.getOrigin(window.location.href), la = "/" + Ca + (la ? "|" + la : ""));
                    ++z;
                    aa && (G[z] = aa);
                    var ra = {
                        s: N,
                        f: la,
                        c: aa ? z : 0,
                        a: Array.prototype.slice.call(arguments, 3),
                        t: D[x],
                        l: !!y[x]
                    };
                    a: if ("bidir" === L || "c2p" === L && ".." === x || "p2c" === L && ".." !== x) {
                        var I = window.location.href;
                        var ka = "?";
                        if ("query" === Y) ka = "#";
                        else if ("hash" === Y) break a;
                        ka = I.lastIndexOf(ka);
                        ka = -1 === ka ? I.length : ka;
                        I = I.substring(0, ka)
                    } else I = null;
                    I && (ra.r = I);
                    if (".." === x || null != f(x) || document.getElementById(x))(I = O[x]) || null === f(x) || (I = Xa), 0 === N.indexOf("legacy__") &&
                        (I = Xa, ra.s = N.substring(8), ra.c = ra.c ? ra.c : z), ra.g = !0, ra.r = la, I ? (y[x] && (I = Kf.ev), !1 === I.call(x, la, ra) && (O[x] = na, Xa.call(x, la, ra))) : M[x] ? M[x].push(ra) : M[x] = [ra]
                },
                getRelayUrl: l,
                setRelayUrl: m,
                setAuthToken: n,
                setupReceiver: v,
                getAuthToken: function(x) {
                    return D[x]
                },
                removeReceiver: function(x) {
                    delete w[x];
                    delete y[x];
                    delete D[x];
                    delete J[x];
                    delete O[x]
                },
                getRelayChannel: function() {
                    return Xa.nI()
                },
                receive: function(x, N) {
                    4 < x.length ? Xa.caa(x, d) : c.apply(null, x.concat(N))
                },
                WL: function(x) {
                    x.a = Array.prototype.slice.call(x.a);
                    window.setTimeout(function() {
                        d(x)
                    }, 0)
                },
                getOrigin: e,
                getTargetOrigin: function(x) {
                    var N = null,
                        aa = l(x);
                    aa ? N = aa : (aa = f(x)) ? N = aa.origin : ".." == x ? N = X.parent : (x = document.getElementById(x)) && "iframe" === x.tagName.toLowerCase() && (N = x.src);
                    return e(N)
                },
                init: function() {
                    !1 === Xa.init(d, a) && (Xa = na);
                    sa ? v("..") : _.Se.register("rpc", null, function(x) {
                        x = x.rpc || {};
                        p(x);
                        u(x)
                    })
                },
                UF: g,
                yR: f,
                ACK: "__ack",
                n8: Ca || "..",
                A8: 0,
                z8: 1,
                y8: 2
            }
        }();
        _.Lf.init()
    };
    _.Lf.config({
        sM: function(a) {
            throw Error("r`" + a);
        }
    });
    _.Re = _.Hf;
    _.C("gadgets.rpc.config", _.Lf.config);
    _.C("gadgets.rpc.register", _.Lf.register);
    _.C("gadgets.rpc.unregister", _.Lf.unregister);
    _.C("gadgets.rpc.registerDefault", _.Lf.registerDefault);
    _.C("gadgets.rpc.unregisterDefault", _.Lf.unregisterDefault);
    _.C("gadgets.rpc.forceParentVerifiable", _.Lf.forceParentVerifiable);
    _.C("gadgets.rpc.call", _.Lf.call);
    _.C("gadgets.rpc.getRelayUrl", _.Lf.getRelayUrl);
    _.C("gadgets.rpc.setRelayUrl", _.Lf.setRelayUrl);
    _.C("gadgets.rpc.setAuthToken", _.Lf.setAuthToken);
    _.C("gadgets.rpc.setupReceiver", _.Lf.setupReceiver);
    _.C("gadgets.rpc.getAuthToken", _.Lf.getAuthToken);
    _.C("gadgets.rpc.removeReceiver", _.Lf.removeReceiver);
    _.C("gadgets.rpc.getRelayChannel", _.Lf.getRelayChannel);
    _.C("gadgets.rpc.receive", _.Lf.receive);
    _.C("gadgets.rpc.receiveSameDomain", _.Lf.WL);
    _.C("gadgets.rpc.getOrigin", _.Lf.getOrigin);
    _.C("gadgets.rpc.getTargetOrigin", _.Lf.getTargetOrigin);

    _.qg = window.gapi && window.gapi.util || {};

    _.sg = function(a) {
        if (!a) return "";
        a = a.split("#")[0].split("?")[0];
        a = a.toLowerCase();
        0 == a.indexOf("//") && (a = window.location.protocol + a);
        /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
        var b = a.substring(a.indexOf("://") + 3),
            c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
        a = a.substring(0, a.indexOf("://"));
        if ("http" !== a && "https" !== a && "chrome-extension" !== a && "moz-extension" !== a && "file" !== a && "android-app" !== a && "chrome-search" !== a && "chrome-untrusted" !== a && "chrome" !== a && "app" !== a && "devtools" !== a) throw Error("s`" +
            a);
        c = "";
        var d = b.indexOf(":");
        if (-1 != d) {
            var e = b.substring(d + 1);
            b = b.substring(0, d);
            if ("http" === a && "80" !== e || "https" === a && "443" !== e) c = ":" + e
        }
        return a + "://" + b + c
    };

    _.qg.getOrigin = function(a) {
        return _.sg(a)
    };

    _.tg = window.googleapis && window.googleapis.server || {};

    var zh;
    zh = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//;
    _.Ah = function(a) {
        var b = _.S("googleapis.config/sessionIndex");
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (b = window.__X_GOOG_AUTHUSER);
        "string" === typeof b && 254 < b.length && (b = null);
        if (null == b) {
            var c = window.google;
            c && (b = c.authuser)
        }
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (a = a || window.location.href, b = _.te(a, "authuser") || null, null == b && (b = (b = a.match(zh)) ? b[1] : null));
        if (null == b) return null;
        b = String(b);
        254 < b.length && (b = null);
        return b
    };

    _.Eh = function() {
        function a() {
            e[0] = 1732584193;
            e[1] = 4023233417;
            e[2] = 2562383102;
            e[3] = 271733878;
            e[4] = 3285377520;
            n = m = 0
        }

        function b(p) {
            for (var u = g, r = 0; 64 > r; r += 4) u[r / 4] = p[r] << 24 | p[r + 1] << 16 | p[r + 2] << 8 | p[r + 3];
            for (r = 16; 80 > r; r++) p = u[r - 3] ^ u[r - 8] ^ u[r - 14] ^ u[r - 16], u[r] = (p << 1 | p >>> 31) & 4294967295;
            p = e[0];
            var v = e[1],
                t = e[2],
                w = e[3],
                y = e[4];
            for (r = 0; 80 > r; r++) {
                if (40 > r)
                    if (20 > r) {
                        var D = w ^ v & (t ^ w);
                        var z = 1518500249
                    } else D = v ^ t ^ w, z = 1859775393;
                else 60 > r ? (D = v & t | w & (v | t), z = 2400959708) : (D = v ^ t ^ w, z = 3395469782);
                D = ((p << 5 | p >>> 27) & 4294967295) +
                    D + y + z + u[r] & 4294967295;
                y = w;
                w = t;
                t = (v << 30 | v >>> 2) & 4294967295;
                v = p;
                p = D
            }
            e[0] = e[0] + p & 4294967295;
            e[1] = e[1] + v & 4294967295;
            e[2] = e[2] + t & 4294967295;
            e[3] = e[3] + w & 4294967295;
            e[4] = e[4] + y & 4294967295
        }

        function c(p, u) {
            if ("string" === typeof p) {
                p = unescape(encodeURIComponent(p));
                for (var r = [], v = 0, t = p.length; v < t; ++v) r.push(p.charCodeAt(v));
                p = r
            }
            u || (u = p.length);
            r = 0;
            if (0 == m)
                for (; r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64;
            for (; r < u;)
                if (f[m++] = p[r++], n++, 64 == m)
                    for (m = 0, b(f); r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64
        }

        function d() {
            var p = [],
                u = 8 * n;
            56 > m ? c(k, 56 - m) : c(k, 64 - (m - 56));
            for (var r = 63; 56 <= r; r--) f[r] = u & 255, u >>>= 8;
            b(f);
            for (r = u = 0; 5 > r; r++)
                for (var v = 24; 0 <= v; v -= 8) p[u++] = e[r] >> v & 255;
            return p
        }
        for (var e = [], f = [], g = [], k = [128], l = 1; 64 > l; ++l) k[l] = 0;
        var m, n;
        a();
        return {
            reset: a,
            update: c,
            digest: d,
            Sg: function() {
                for (var p = d(), u = "", r = 0; r < p.length; r++) u += "0123456789ABCDEF".charAt(Math.floor(p[r] / 16)) + "0123456789ABCDEF".charAt(p[r] % 16);
                return u
            }
        }
    };
    var Gh = function(a, b, c) {
            var d = [],
                e = [];
            if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], _.ob(d, function(k) {
                e.push(k)
            }), Fh(e.join(" "));
            var f = [],
                g = [];
            _.ob(c, function(k) {
                g.push(k.key);
                f.push(k.value)
            });
            c = Math.floor((new Date).getTime() / 1E3);
            e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
            _.ob(d, function(k) {
                e.push(k)
            });
            a = Fh(e.join(" "));
            a = [c, a];
            0 == g.length || a.push(g.join(""));
            return a.join("_")
        },
        Fh = function(a) {
            var b = _.Eh();
            b.update(a);
            return b.Sg().toLowerCase()
        };
    _.Hh = function() {
        var a = _.A.__SAPISID || _.A.__APISID || _.A.__OVERRIDE_SID;
        if (a) return !0;
        a = new _.Bh(document);
        a = a.get("SAPISID") || a.get("APISID") || a.get("__Secure-3PAPISID") || a.get("SID");
        return !!a
    };
    _.Ih = function(a) {
        var b = _.sg(String(_.A.location.href));
        if (_.Hh()) {
            var c = (b = 0 == b.indexOf("https:") || 0 == b.indexOf("chrome-extension:") || 0 == b.indexOf("moz-extension:")) ? _.A.__SAPISID : _.A.__APISID;
            c || (c = new _.Bh(document), c = c.get(b ? "SAPISID" : "APISID") || c.get("__Secure-3PAPISID"));
            if (c) {
                b = b ? "SAPISIDHASH" : "APISIDHASH";
                var d = String(_.A.location.href);
                return d && c && b ? [b, Gh(_.sg(d), c, a || null)].join(" ") : null
            }
        }
        return null
    };

    _.Jh = function(a) {
        var b = {
            SAPISIDHASH: !0,
            APISIDHASH: !0
        };
        return a && (a.OriginToken || a.Authorization && b[String(a.Authorization).split(" ")[0]]) ? !0 : !1
    };
    _.Kh = {
        qJ: _.Jh,
        AX: _.Hh,
        FI: function() {
            var a = null;
            _.Hh() && (a = window.__PVT, null == a && (a = (new _.Bh(document)).get("BEAT")));
            return a
        },
        hI: _.Ih
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.lh = function(a) {
        return encodeURIComponent(String(a))
    };
    _.mh = function(a) {
        return null == a ? "" : String(a)
    };
    _.nh = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    _.oh = function(a, b) {
        if (!b) return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else e = a.substring(d + 1, c);
        a = [a.substr(0, d), e, a.substr(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    };
    _.ph = function(a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++) _.ph(a, String(b[d]), c);
        else null != b && c.push(a + ("" === b ? "" : "=" + _.lh(b)))
    };
    _.qh = function(a) {
        var b = [],
            c;
        for (c in a) _.ph(c, a[c], b);
        return b.join("&")
    };
    _.rh = function(a, b) {
        b = _.qh(b);
        return _.oh(a, b)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Nh = function() {
        this.Oj = -1
    };
    var Oh = function() {
        this.Oj = 64;
        this.Hc = [];
        this.Ey = [];
        this.uR = [];
        this.kw = [];
        this.kw[0] = 128;
        for (var a = 1; a < this.Oj; ++a) this.kw[a] = 0;
        this.kx = this.Rn = 0;
        this.reset()
    };
    _.K(Oh, Nh);
    Oh.prototype.reset = function() {
        this.Hc[0] = 1732584193;
        this.Hc[1] = 4023233417;
        this.Hc[2] = 2562383102;
        this.Hc[3] = 271733878;
        this.Hc[4] = 3285377520;
        this.kx = this.Rn = 0
    };
    var Ph = function(a, b, c) {
        c || (c = 0);
        var d = a.uR;
        if ("string" === typeof b)
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.Hc[0];
        c = a.Hc[1];
        var g = a.Hc[2],
            k = a.Hc[3],
            l = a.Hc[4];
        for (e = 0; 80 > e; e++) {
            if (40 > e)
                if (20 > e) {
                    f = k ^ c & (g ^ k);
                    var m = 1518500249
                } else f = c ^ g ^ k, m = 1859775393;
            else 60 > e ? (f = c & g | k & (c | g),
                m = 2400959708) : (f = c ^ g ^ k, m = 3395469782);
            f = (b << 5 | b >>> 27) + f + l + m + d[e] & 4294967295;
            l = k;
            k = g;
            g = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f
        }
        a.Hc[0] = a.Hc[0] + b & 4294967295;
        a.Hc[1] = a.Hc[1] + c & 4294967295;
        a.Hc[2] = a.Hc[2] + g & 4294967295;
        a.Hc[3] = a.Hc[3] + k & 4294967295;
        a.Hc[4] = a.Hc[4] + l & 4294967295
    };
    Oh.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.Oj, d = 0, e = this.Ey, f = this.Rn; d < b;) {
                if (0 == f)
                    for (; d <= c;) Ph(this, a, d), d += this.Oj;
                if ("string" === typeof a)
                    for (; d < b;) {
                        if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Oj) {
                            Ph(this, e);
                            f = 0;
                            break
                        }
                    } else
                        for (; d < b;)
                            if (e[f] = a[d], ++f, ++d, f == this.Oj) {
                                Ph(this, e);
                                f = 0;
                                break
                            }
            }
            this.Rn = f;
            this.kx += b
        }
    };
    Oh.prototype.digest = function() {
        var a = [],
            b = 8 * this.kx;
        56 > this.Rn ? this.update(this.kw, 56 - this.Rn) : this.update(this.kw, this.Oj - (this.Rn - 56));
        for (var c = this.Oj - 1; 56 <= c; c--) this.Ey[c] = b & 255, b /= 256;
        Ph(this, this.Ey);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8) a[b] = this.Hc[c] >> d & 255, ++b;
        return a
    };
    _.Rh = function() {
        this.dE = new Oh
    };
    _.h = _.Rh.prototype;
    _.h.reset = function() {
        this.dE.reset()
    };
    _.h.XN = function(a) {
        this.dE.update(a)
    };
    _.h.sH = function() {
        return this.dE.digest()
    };
    _.h.tx = function(a) {
        a = unescape(encodeURIComponent(a));
        for (var b = [], c = 0, d = a.length; c < d; ++c) b.push(a.charCodeAt(c));
        this.XN(b)
    };
    _.h.Sg = function() {
        for (var a = this.sH(), b = "", c = 0; c < a.length; c++) b += "0123456789ABCDEF".charAt(Math.floor(a[c] / 16)) + "0123456789ABCDEF".charAt(a[c] % 16);
        return b
    };

    var Th, Sh, Zh, $h, Uh, Xh, Vh, ai, Wh;
    _.Yh = function() {
        if (Sh) {
            var a = new _.je.Uint32Array(1);
            Th.getRandomValues(a);
            a = Number("0." + a[0])
        } else a = Uh, a += parseInt(Vh.substr(0, 20), 16), Vh = Wh(Vh), a /= Xh + Math.pow(16, 20);
        return a
    };
    Th = _.je.crypto;
    Sh = !1;
    Zh = 0;
    $h = 0;
    Uh = 1;
    Xh = 0;
    Vh = "";
    ai = function(a) {
        a = a || _.je.event;
        var b = a.screenX + a.clientX << 16;
        b += a.screenY + a.clientY;
        b *= (new Date).getTime() % 1E6;
        Uh = Uh * b % Xh;
        0 < Zh && ++$h == Zh && _.xe(_.je, "mousemove", ai, "remove", "de")
    };
    Wh = function(a) {
        var b = new _.Rh;
        b.tx(a);
        return b.Sg()
    };
    Sh = !!Th && "function" == typeof Th.getRandomValues;
    Sh || (Xh = 1E6 * (screen.width * screen.width + screen.height), Vh = Wh(_.ke.cookie + "|" + _.ke.location + "|" + (new Date).getTime() + "|" + Math.random()), Zh = _.S("random/maxObserveMousemove") || 0, 0 != Zh && _.ye(_.je, "mousemove", ai));

    var bi = function(a, b) {
        a = _.Oe.createIframeElement({
            id: a,
            name: a
        });
        a.style.width = "1px";
        a.style.height = "1px";
        a.style.position = "absolute";
        a.style.top = "-100px";
        a.style.display = "none";
        if (window.navigator) {
            var c = window.navigator.userAgent || "";
            var d = window.navigator.product || "";
            c = 0 != c.indexOf("Opera") && -1 == c.indexOf("WebKit") && "Gecko" == d && 0 < c.indexOf("rv:1.")
        } else c = !1;
        a.src = c ? "about:blank" : b;
        a.tabIndex = -1;
        "function" === typeof a.setAttribute ? a.setAttribute("aria-hidden", "true") : a["aria-hidden"] = "true";
        document.body.appendChild(a);
        c && (a.src = b);
        return a
    };
    _.Kh = {
        qJ: _.Jh,
        AX: _.Hh,
        FI: function() {
            var a = null;
            _.Hh() && (a = window.__PVT, null == a && (a = (new _.Bh(document)).get("BEAT")));
            return a
        },
        hI: _.Ih
    };
    var di, ci;
    di = function() {
        return !!ci("auth/useFirstPartyAuthV2")
    };
    ci = function(a) {
        return _.S("googleapis.config/" + a)
    };
    _.ei = function(a, b, c) {
        a = void 0 === a ? {} : a;
        b = void 0 === b ? window.location.href : b;
        c = void 0 === c ? "auto" : c;
        if ("none" == c) return a;
        var d = a.Authorization,
            e = a.OriginToken;
        if (!d && !e) {
            (e = _.Mh()) && e.access_token && ("oauth2" == c || "auto" == c) && (d = String(e.token_type || "Bearer") + " " + e.access_token);
            if (e = !d) e = (!!ci("auth/useFirstPartyAuth") || "1p" == c) && "oauth2" != c;
            if (e && _.Hh()) {
                if (di()) {
                    d = ci("primaryEmail");
                    c = ci("appDomain");
                    e = ci("fogId");
                    var f = [];
                    d && f.push({
                        key: "e",
                        value: d
                    });
                    c && f.push({
                        key: "a",
                        value: c
                    });
                    e && f.push({
                        key: "u",
                        value: e
                    });
                    d = _.Ih(f)
                } else d = _.Ih();
                d && (b = _.Ah(b), b = a["X-Goog-AuthUser"] || b, _.Me(_.mh(b)) && (!di() || di() && _.Me(_.mh(ci("primaryEmail"))) && _.Me(_.mh(ci("appDomain"))) && _.Me(_.mh(ci("fogId")))) && (b = "0"), _.Me(_.mh(b)) || (a["X-Goog-AuthUser"] = b))
            }
            d ? a.Authorization = d : !1 !== ci("auth/useOriginToken") && (e = _.Kh.FI()) && (a.OriginToken = e)
        }
        return a
    };
    _.fi = function() {
        function a(n, p, u, r, v) {
            var t = f("proxy");
            if (r || !t) {
                t = f("root");
                var w = f("root-1p") || t;
                t = t || "https://content.googleapis.com";
                w = w || "https://clients6.google.com";
                var y = f("xd3") || "/static/proxy.html";
                t = (r || String(p ? w : t)) + y
            }
            t = String(t);
            u && (t += (0 <= t.indexOf("?") ? "&" : "?") + "usegapi=1");
            (p = _.Oe.getUrlParameters().jsh || _.ze.h) && (t += (0 <= t.indexOf("?") ? "&" : "?") + "jsh=" + encodeURIComponent(p));
            t += "#parent=" + encodeURIComponent(null != v ? String(v) : _.qg.getOrigin(document.location.href));
            return t + ("&rpctoken=" +
                n)
        }

        function b(n, p, u, r, v) {
            var t = d(u, r, v);
            k[t] || (u = bi(t, p), _.Lf.register("ready:" + n, function() {
                _.Lf.unregister("ready:" + n);
                if (!l[t]) {
                    l[t] = !0;
                    var w = m[t];
                    m[t] = [];
                    for (var y = 0, D = w.length; y < D; ++y) {
                        var z = w[y];
                        e(z.rpc, z.TZ, z.callback)
                    }
                }
            }), _.Lf.setupReceiver(t, p), k[t] = u)
        }

        function c(n, p, u) {
            var r = String(2147483647 * _.Yh() | 0),
                v = a(r, n, p, u);
            _.Jf(function() {
                b(r, v, n, p, u)
            })
        }

        function d(n, p, u) {
            n = a("", n, p, u, "");
            u = g[n + p];
            if (!u) {
                u = new _.Rh;
                u.tx(n);
                u = u.Sg().toLowerCase();
                var r = _.Yh();
                u += r;
                g[n + p] = u
            }
            return "apiproxy" + u
        }

        function e(n,
            p, u) {
            var r = void 0,
                v = !1;
            if ("makeHttpRequests" !== n) throw 'only "makeHttpRequests" RPCs are implemented';
            var t = function(G) {
                if (G) {
                    if ("undefined" != typeof r && "undefined" != typeof G.root && r != G.root) throw "all requests in a batch must have the same root URL";
                    r = G.root || r;
                    v = _.Kh.qJ(G.headers)
                }
            };
            if (p)
                for (var w = 0, y = p.length; w < y; ++w) {
                    var D = p[w];
                    D && t(D.params)
                }
            t = !!f("useGapiForXd3");
            var z = d(v, t, r);
            k[z] || c(v, t, r);
            l[z] ? _.Lf.call(z, n, function(G) {
                if (this.f == z && this.t == _.Lf.getAuthToken(this.f) && this.origin == _.Lf.getTargetOrigin(this.f)) {
                    var J =
                        _.yf(G);
                    u(J, G)
                }
            }, p) : (m[z] || (m[z] = []), m[z].push({
                rpc: n,
                TZ: p,
                callback: u
            }))
        }

        function f(n) {
            return _.S("googleapis.config/" + n)
        }
        var g = {},
            k = {},
            l = {},
            m = {};
        return {
            faa: function(n, p, u) {
                return _.ei(n, p, u)
            },
            lj: e
        }
    }();

    var Cg = {
            AUTHORIZATION: "Authorization",
            MO: "Content-ID",
            b3: "Content-Transfer-Encoding",
            CONTENT_TYPE: "Content-Type",
            G3: "Date",
            d7: "OriginToken",
            m5: "hotrod-board-name",
            n5: "hotrod-chrome-cpu-model",
            o5: "hotrod-chrome-processors",
            x$: "WWW-Authenticate",
            y$: "X-ClientDetails",
            z$: "X-Compass-Routing-Destination",
            A$: "X-Goog-AuthUser",
            B$: "X-Goog-Encode-Response-If-Executable",
            C$: "X-Goog-Meeting-ABR",
            D$: "X-Goog-Meeting-Botguardid",
            E$: "X-Goog-Meeting-ClientInfo",
            F$: "X-Goog-Meeting-ClientVersion",
            G$: "X-Goog-Meeting-Debugid",
            H$: "X-Goog-Meeting-Identifier",
            I$: "X-Goog-Meeting-RtcClient",
            J$: "X-Goog-Meeting-StartSource",
            K$: "X-Goog-Meeting-Token",
            L$: "X-Goog-PageId",
            M$: "X-Goog-Safety-Content-Type",
            N$: "X-Goog-Safety-Encoding",
            O$: "X-HTTP-Method-Override",
            P$: "X-JavaScript-User-Agent",
            Q$: "X-Origin",
            R$: "X-Referer",
            S$: "X-Requested-With",
            T$: "X-Use-HTTP-Status-Code-Override"
        },
        Dg = "Accept Accept-Language Authorization Cache-Control cast-device-capabilities Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date EES-S7E-MODE GData-Version google-cloud-resource-prefix hotrod-board-name hotrod-chrome-cpu-model hotrod-chrome-processors Host If-Match If-Modified-Since If-None-Match If-Unmodified-Since MIME-Version Origin OriginToken Pragma Range Slug Transfer-Encoding Want-Digest x-alkali-account-key x-alkali-application-key x-alkali-auth-apps-namespace x-alkali-auth-entities-namespace x-alkali-auth-entity x-alkali-client-locale x-chrome-connected X-Client-Data X-ClientDetails X-Client-Version X-Firebase-Locale X-GData-Client X-GData-Key X-Goog-AuthUser X-Goog-PageId X-Goog-Encode-Response-If-Executable X-GoogApps-Allowed-Domains X-Goog-AdX-Buyer-Impersonation X-Goog-Api-Client X-Goog-Api-Key X-Goog-Correlation-Id X-Goog-Request-Info X-Goog-Request-Reason X-Goog-Experiments x-goog-ext-124712974-jspb x-goog-ext-251363160-jspb x-goog-ext-259736195-jspb x-goog-ext-275505673-bin X-Goog-Firebase-Installations-Auth X-Firebase-Client X-Firebase-Client-Log-Type x-goog-iam-authority-selector x-goog-iam-authorization-token x-goog-request-params X-Goog-Spatula X-Goog-Travel-Bgr X-Goog-Travel-Settings X-Goog-Upload-Command X-Goog-Upload-Content-Disposition X-Goog-Upload-Content-Length X-Goog-Upload-Content-Type X-Goog-Upload-File-Name X-Goog-Upload-Header-Content-Encoding X-Goog-Upload-Header-Content-Length X-Goog-Upload-Header-Content-Type X-Goog-Upload-Header-Transfer-Encoding X-Goog-Upload-Offset X-Goog-Upload-Protocol X-Goog-User-Project X-Goog-Visitor-Id X-Goog-FieldMask X-Google-Project-Override X-HTTP-Method-Override X-JavaScript-User-Agent X-Pan-Versionid X-Proxied-User-IP X-Origin X-Referer X-Requested-With X-Stadia-Client-Context X-Upload-Content-Length X-Upload-Content-Type X-Use-HTTP-Status-Code-Override X-Ios-Bundle-Identifier X-Android-Package X-Ariane-Xsrf-Token X-Earth-Engine-App-ID-Token X-Earth-Engine-Computation-Profile X-Earth-Engine-Computation-Profiling X-Play-Console-Experiments-Override X-Play-Console-Session-Id X-YouTube-VVT X-YouTube-Page-CL X-YouTube-Page-Timestamp X-Compass-Routing-Destination X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-Identifier X-Goog-Meeting-RtcClient X-Goog-Meeting-StartSource X-Goog-Meeting-Token X-Sfdc-Authorization".split(" "),
        Eg = "Digest Cache-Control Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date ETag Expires Last-Modified Location Pragma Range Server Transfer-Encoding WWW-Authenticate Vary Unzipped-Content-MD5 X-Correlation-ID X-Debug-Tracking-Id X-Goog-Generation X-Goog-Metageneration X-Goog-Safety-Content-Type X-Goog-Safety-Encoding X-Google-Trace X-Goog-Upload-Chunk-Granularity X-Goog-Upload-Control-URL X-Goog-Upload-Size-Received X-Goog-Upload-Status X-Goog-Upload-URL X-Goog-Diff-Download-Range X-Goog-Hash X-Goog-Updated-Authorization X-Server-Object-Version X-Guploader-Customer X-Guploader-Upload-Result X-Guploader-Uploadid X-Google-Gfe-Backend-Request-Cost X-Earth-Engine-Computation-Profile X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-RtcClient X-Goog-Meeting-Token X-Compass-Routing-Destination".split(" ");
    var Fg, Gg, Hg, Ig, Kg, Lg, Mg, Ng, Og, Pg, Qg, Rg;
    Fg = null;
    Gg = null;
    Hg = null;
    Ig = function(a, b) {
        var c = a.length;
        if (c != b.length) return !1;
        for (var d = 0; d < c; ++d) {
            var e = a.charCodeAt(d),
                f = b.charCodeAt(d);
            65 <= e && 90 >= e && (e += 32);
            65 <= f && 90 >= f && (f += 32);
            if (e != f) return !1
        }
        return !0
    };
    _.Jg = function(a) {
        a = String(a || "").split("\x00").join("");
        for (var b = [], c = !0, d = 0, e = a.length; d < e; ++d) {
            var f = a.charAt(d),
                g = a.charCodeAt(d);
            if (55296 <= g && 56319 >= g && d + 1 < e) {
                var k = a.charAt(d + 1),
                    l = a.charCodeAt(d + 1);
                56320 <= l && 57343 >= l && (f += k, g = 65536 + (g - 55296 << 10) + (l - 56320), ++d)
            }
            if (!(0 <= g && 1114109 >= g) || 55296 <= g && 57343 >= g || 64976 <= g && 65007 >= g || 65534 == (g & 65534)) g = 65533, f = String.fromCharCode(g);
            k = !(32 <= g && 126 >= g) || " " == f || c && ":" == f || "\\" == f;
            !c || "/" != f && "?" != f || (c = !1);
            "%" == f && (d + 2 >= e ? k = !0 : (l = 16 * parseInt(a.charAt(d +
                1), 16) + parseInt(a.charAt(d + 2), 16), 0 <= l && 255 >= l ? (g = l, f = 0 == g ? "" : "%" + (256 + l).toString(16).toUpperCase().substr(1), d += 2) : k = !0));
            k && (f = encodeURIComponent(f), 1 >= f.length && (0 <= g && 127 >= g ? f = "%" + (256 + g).toString(16).toUpperCase().substr(1) : (g = 65533, f = encodeURIComponent(String.fromCharCode(g)))));
            b.push(f)
        }
        a = b.join("");
        a = a.split("#")[0];
        a = a.split("?");
        b = a[0].split("/");
        c = [];
        d = 0;
        for (e = b.length; d < e; ++d) f = b[d], g = f.split("%2E").join("."), g = g.split(encodeURIComponent("\uff0e")).join("."), "." == g ? d + 1 == e && c.push("") :
            ".." == g ? (0 < c.length && c.pop(), d + 1 == e && c.push("")) : c.push(f);
        a[0] = c.join("/");
        for (a = a.join("?"); a && "/" == a.charAt(0);) a = a.substr(1);
        return "/" + a
    };
    Kg = {
        "access-control-allow-origin": !0,
        "access-control-allow-credentials": !0,
        "access-control-expose-headers": !0,
        "access-control-max-age": !0,
        "access-control-allow-headers": !0,
        "access-control-allow-methods": !0,
        p3p: !0,
        "proxy-authenticate": !0,
        "set-cookie": !0,
        "set-cookie2": !0,
        status: !0,
        tsv: !0,
        "": !0
    };
    Lg = {
        "accept-charset": !0,
        "accept-encoding": !0,
        "access-control-request-headers": !0,
        "access-control-request-method": !0,
        "client-ip": !0,
        clientip: !0,
        connection: !0,
        "content-length": !0,
        cookie: !0,
        cookie2: !0,
        date: !0,
        dnt: !0,
        expect: !0,
        forwarded: !0,
        "forwarded-for": !0,
        "front-end-https": !0,
        host: !0,
        "keep-alive": !0,
        "max-forwards": !0,
        method: !0,
        origin: !0,
        "raw-post-data": !0,
        referer: !0,
        te: !0,
        trailer: !0,
        "transfer-encoding": !0,
        upgrade: !0,
        url: !0,
        "user-agent": !0,
        version: !0,
        via: !0,
        "x-att-deviceid": !0,
        "x-chrome-connected": !0,
        "x-client-data": !0,
        "x-client-ip": !0,
        "x-do-not-track": !0,
        "x-forwarded-by": !0,
        "x-forwarded-for": !0,
        "x-forwarded-host": !0,
        "x-forwarded-proto": !0,
        "x-geo": !0,
        "x-googapps-allowed-domains": !0,
        "x-origin": !0,
        "x-proxyuser-ip": !0,
        "x-real-ip": !0,
        "x-referer": !0,
        "x-uidh": !0,
        "x-user-ip": !0,
        "x-wap-profile": !0,
        "": !0
    };
    Mg = function(a) {
        if (!_.hb(a)) return null;
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c];
            if ("string" === typeof d && d) {
                var e = d.toLowerCase();
                Ig(d, e) && (b[e] = d)
            }
        }
        for (var f in Cg) Object.prototype.hasOwnProperty.call(Cg, f) && (d = Cg[f], e = d.toLowerCase(), Ig(d, e) && Object.prototype.hasOwnProperty.call(b, e) && (b[e] = d));
        return b
    };
    Ng = new RegExp("(" + /[\t -~\u00A0-\u2027\u202A-\uD7FF\uE000-\uFFFF]/.source + "|" + /[\uD800-\uDBFF][\uDC00-\uDFFF]/.source + "){1,100}", "g");
    Og = /[ \t]*(\r?\n[ \t]+)+/g;
    Pg = /^[ \t]+|[ \t]+$/g;
    Qg = function(a, b) {
        if (!b && "object" === typeof a && a && "number" === typeof a.length) {
            b = a;
            a = "";
            for (var c = 0, d = b.length; c < d; ++c) {
                var e = Qg(b[c], !0);
                e && (a && (e = a + ", " + e), a = e)
            }
        }
        if ("string" === typeof a && (a = a.replace(Og, " "), a = a.replace(Pg, ""), "" == a.replace(Ng, "") && a)) return a
    };
    Rg = /^[-0-9A-Za-z!#\$%&'\*\+\.\^_`\|~]+$/g;
    _.Sg = function(a) {
        if ("string" !== typeof a || !a || !a.match(Rg)) return null;
        a = a.toLowerCase();
        if (null == Hg) {
            var b = [],
                c = _.S("googleapis/headers/response");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.S("client/headers/response")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Eg);
            (c = _.S("googleapis/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.S("client/headers/request")) &&
            "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Dg);
            for (var d in Cg) Object.prototype.hasOwnProperty.call(Cg, d) && b.push(Cg[d]);
            Hg = Mg(b)
        }
        return null != Hg && Hg.hasOwnProperty(a) ? Hg[a] : a
    };
    _.Tg = function(a, b) {
        if (!_.Sg(a) || !Qg(b)) return null;
        a = a.toLowerCase();
        if (a.match(/^x-google|^x-gfe|^proxy-|^sec-/i) || Lg[a]) return null;
        if (null == Fg) {
            b = [];
            var c = _.S("googleapis/headers/request");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.S("client/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Dg);
            Fg = Mg(b)
        }
        return null != Fg && Fg.hasOwnProperty(a) ? Fg[a] : null
    };
    _.Ug = function(a, b) {
        if (!_.Sg(a) || !Qg(b)) return null;
        a = a.toLowerCase();
        if (Kg[a]) return null;
        if (null == Gg) {
            b = [];
            var c = _.S("googleapis/headers/response");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.S("client/headers/response")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Eg);
            Gg = Mg(b)
        }
        return null != Gg && Gg.hasOwnProperty(a) ? a : null
    };
    _.Vg = function(a, b) {
        if (_.Sg(b) && null != a && "object" === typeof a) {
            var c = void 0,
                d;
            for (d in a)
                if (Object.prototype.hasOwnProperty.call(a, d) && Ig(d, b)) {
                    var e = Qg(a[d]);
                    e && (void 0 !== c && (e = c + ", " + e), c = e)
                }
            return c
        }
    };
    _.Wg = function(a, b, c, d) {
        var e = _.Sg(b);
        if (e) {
            c && (c = Qg(c));
            b = b.toLowerCase();
            for (var f in a) Object.prototype.hasOwnProperty.call(a, f) && Ig(f, b) && delete a[f];
            c && (d || (b = e), a[b] = c)
        }
    };
    _.Xg = function(a, b) {
        var c = {};
        if (!a) return c;
        a = a.split("\r\n");
        for (var d = 0, e = a.length; d < e; ++d) {
            var f = a[d];
            if (!f) break;
            var g = f.indexOf(":");
            if (!(0 >= g)) {
                var k = f.substring(0, g);
                if (k = _.Sg(k)) {
                    for (f = f.substring(g + 1); d + 1 < e && a[d + 1].match(/^[ \t]/);) f += "\r\n" + a[d + 1], ++d;
                    if (f = Qg(f))
                        if (k = _.Ug(k, f) || (b ? void 0 : k)) k = k.toLowerCase(), g = _.Vg(c, k), void 0 !== g && (f = g + ", " + f), _.Wg(c, k, f, !0)
                }
            }
        }
        return c
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.pt = "StopIteration" in _.A ? _.A.StopIteration : {
        message: "StopIteration",
        stack: ""
    };
    _.qt = function() {};
    _.qt.prototype.next = function() {
        throw _.pt;
    };
    _.qt.prototype.Ai = function() {
        return this
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.rt = function(a, b) {
        this.Ha = {};
        this.Qb = [];
        this.Js = this.Wb = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("f");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.addAll(a)
    };
    _.h = _.rt.prototype;
    _.h.Hb = function() {
        return this.Wb
    };
    _.h.Xc = function() {
        st(this);
        for (var a = [], b = 0; b < this.Qb.length; b++) a.push(this.Ha[this.Qb[b]]);
        return a
    };
    _.h.Ae = function() {
        st(this);
        return this.Qb.concat()
    };
    _.h.Ud = function(a) {
        return _.tt(this.Ha, a)
    };
    _.h.Sj = _.ja(9);
    _.h.equals = function(a, b) {
        if (this === a) return !0;
        if (this.Wb != a.Hb()) return !1;
        b = b || ut;
        st(this);
        for (var c, d = 0; c = this.Qb[d]; d++)
            if (!b(this.get(c), a.get(c))) return !1;
        return !0
    };
    var ut = function(a, b) {
        return a === b
    };
    _.rt.prototype.isEmpty = function() {
        return 0 == this.Wb
    };
    _.rt.prototype.clear = function() {
        this.Ha = {};
        this.Js = this.Wb = this.Qb.length = 0
    };
    _.rt.prototype.remove = function(a) {
        return _.tt(this.Ha, a) ? (delete this.Ha[a], this.Wb--, this.Js++, this.Qb.length > 2 * this.Wb && st(this), !0) : !1
    };
    var st = function(a) {
        if (a.Wb != a.Qb.length) {
            for (var b = 0, c = 0; b < a.Qb.length;) {
                var d = a.Qb[b];
                _.tt(a.Ha, d) && (a.Qb[c++] = d);
                b++
            }
            a.Qb.length = c
        }
        if (a.Wb != a.Qb.length) {
            var e = {};
            for (c = b = 0; b < a.Qb.length;) d = a.Qb[b], _.tt(e, d) || (a.Qb[c++] = d, e[d] = 1), b++;
            a.Qb.length = c
        }
    };
    _.h = _.rt.prototype;
    _.h.get = function(a, b) {
        return _.tt(this.Ha, a) ? this.Ha[a] : b
    };
    _.h.set = function(a, b) {
        _.tt(this.Ha, a) || (this.Wb++, this.Qb.push(a), this.Js++);
        this.Ha[a] = b
    };
    _.h.addAll = function(a) {
        if (a instanceof _.rt)
            for (var b = a.Ae(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
        else
            for (b in a) this.set(b, a[b])
    };
    _.h.forEach = function(a, b) {
        for (var c = this.Ae(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    _.h.clone = function() {
        return new _.rt(this)
    };
    _.h.Ai = function(a) {
        st(this);
        var b = 0,
            c = this.Js,
            d = this,
            e = new _.qt;
        e.next = function() {
            if (c != d.Js) throw Error("I");
            if (b >= d.Qb.length) throw _.pt;
            var f = d.Qb[b++];
            return a ? f : d.Ha[f]
        };
        return e
    };
    _.tt = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.vt = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    };
    _.wt = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    };
    _.xt = function(a) {
        if (a.Xc && "function" == typeof a.Xc) return a.Xc();
        if ("string" === typeof a) return a.split("");
        if (_.hb(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return _.vt(a)
    };
    _.yt = function(a) {
        if (a.Ae && "function" == typeof a.Ae) return a.Ae();
        if (!a.Xc || "function" != typeof a.Xc) {
            if (_.hb(a) || "string" === typeof a) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++) b.push(c);
                return b
            }
            return _.wt(a)
        }
    };
    _.zt = function(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
        else if (_.hb(a) || "string" === typeof a) _.ob(a, b, c);
        else
            for (var d = _.yt(a), e = _.xt(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Dx = function(a, b) {
        var c = {},
            d;
        for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    };
    _.Ex = function(a, b) {
        var c = _.hb(b),
            d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a) return;
            a = a[d[c]]
        }
        return a
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Fx;
    _.Gx = function(a) {
        return (new Fx).Pf(a)
    };
    Fx = function() {};
    Fx.prototype.Pf = function(a) {
        var b = [];
        Hx(this, a, b);
        return b.join("")
    };
    var Hx = function(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (Array.isArray(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), Hx(a, d[f], c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else {
                        c.push("{");
                        e = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Ix(d, c), c.push(":"), Hx(a, f, c), e = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                    case "string":
                        Ix(b, c);
                        break;
                    case "number":
                        c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                        break;
                    case "boolean":
                        c.push(String(b));
                        break;
                    case "function":
                        c.push("null");
                        break;
                    default:
                        throw Error("ma`" + typeof b);
                }
            }
        },
        Jx = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Kx = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g,
        Ix = function(a, b) {
            b.push('"', a.replace(Kx, function(c) {
                var d = Jx[c];
                d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), Jx[c] =
                    d);
                return d
            }), '"')
        };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Lx = function(a, b, c) {
        if ("function" === typeof a) c && (a = (0, _.R)(a, c));
        else if (a && "function" == typeof a.handleEvent) a = (0, _.R)(a.handleEvent, a);
        else throw Error("na");
        return 2147483647 < Number(b) ? -1 : _.A.setTimeout(a, b || 0)
    };
    _.Mx = function(a) {
        _.A.clearTimeout(a)
    };
    _.Nx = function(a) {
        var b = null;
        return (new _.Gk(function(c, d) {
            b = _.Lx(function() {
                c(void 0)
            }, a); - 1 == b && d(Error("oa"))
        })).ys(function(c) {
            _.Mx(b);
            throw c;
        })
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Qx, Ux, Vx, Xx, ay, cy;
    _.Ox = function(a) {
        if (!Array.isArray(a))
            for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0
    };
    _.Px = function(a) {
        return (a = _.Ax(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    };
    Qx = function(a) {
        for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
        return c
    };
    _.Rx = function(a) {
        var b = 0,
            c;
        for (c in a) b++;
        return b
    };
    _.Sx = function(a, b) {
        return null !== a && b in a
    };
    _.Tx = function(a) {
        if (!a || "object" !== typeof a) return a;
        if ("function" === typeof a.clone) return a.clone();
        var b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length),
            c;
        for (c in a) b[c] = _.Tx(a[c]);
        return b
    };
    Ux = function(a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) return b[1];
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
            if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                if (a && a[1]) switch (a[1]) {
                    case "4.0":
                        b = "8.0";
                        break;
                    case "5.0":
                        b = "9.0";
                        break;
                    case "6.0":
                        b = "10.0";
                        break;
                    case "7.0":
                        b = "11.0"
                } else b = "7.0";
                else b = c[1];
        return b
    };
    Vx = function() {
        function a(e) {
            e = _.hi(e, d);
            return c[e] || ""
        }
        var b = _.xb;
        if (_.Hb()) return Ux(b);
        b = Qx(b);
        var c = {};
        _.ob(b, function(e) {
            c[e[0]] = e[1]
        });
        var d = _.ji(_.Sx, c);
        return _.Gb() ? a(["Version", "Opera"]) : _.Bb("Edge") ? a(["Edge"]) : _.Bb("Edg/") ? a(["Edg"]) : _.Jb() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (b = b[2]) && b[1] || ""
    };
    _.Wx = function(a) {
        return 0 <= _.wb(Vx(), a)
    };
    Xx = function(a, b) {
        var c = [];
        for (b = b || 0; b < a.length; b += 2) _.ph(a[b], a[b + 1], c);
        return c.join("&")
    };
    _.Yx = function(a, b) {
        var c = 2 == arguments.length ? Xx(arguments[1], 0) : Xx(arguments, 1);
        return _.oh(a, c)
    };
    _.Zx = function(a, b, c) {
        c = null != c ? "=" + _.lh(c) : "";
        return _.oh(a, b + c)
    };
    _.$x = function(a, b) {
        _.Zi(a, "/") && (a = a.substr(0, a.length - 1));
        _.ed(b, "/") && (b = b.substr(1));
        return a + "/" + b
    };
    ay = {};
    _.by = function(a) {
        if (ay[a]) return ay[a];
        a = String(a);
        if (!ay[a]) {
            var b = /function\s+([^\(]+)/m.exec(a);
            ay[a] = b ? b[1] : "[Anonymous]"
        }
        return ay[a]
    };
    cy = function(a, b) {
        var c = [];
        if (_.$a(b, a)) c.push("[...circular reference...]");
        else if (a && 50 > b.length) {
            c.push(_.by(a) + "(");
            for (var d = a.arguments, e = 0; d && e < d.length; e++) {
                0 < e && c.push(", ");
                var f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        f = String(f);
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = _.by(f)) ? f : "[fn]";
                        break;
                    default:
                        f = typeof f
                }
                40 < f.length && (f = f.substr(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(cy(a.caller,
                    b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    };
    _.dy = function(a) {
        var b = Error();
        if (Error.captureStackTrace) Error.captureStackTrace(b, a || _.dy), b = String(b.stack);
        else {
            try {
                throw b;
            } catch (c) {
                b = c
            }
            b = (b = b.stack) ? String(b) : null
        }
        b || (b = cy(a || arguments.callee.caller, []));
        return b
    };
    _.ey = function(a) {
        switch (a) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                return !0;
            default:
                return !1
        }
    };
    _.fy = function(a, b) {
        _.dj.call(this);
        this.Ak = a || 1;
        this.zs = b || _.A;
        this.zG = (0, _.R)(this.o1, this);
        this.wK = _.lb()
    };
    _.K(_.fy, _.dj);
    _.h = _.fy.prototype;
    _.h.enabled = !1;
    _.h.uc = null;
    _.h.setInterval = function(a) {
        this.Ak = a;
        this.uc && this.enabled ? (this.stop(), this.start()) : this.uc && this.stop()
    };
    _.h.o1 = function() {
        if (this.enabled) {
            var a = _.lb() - this.wK;
            0 < a && a < .8 * this.Ak ? this.uc = this.zs.setTimeout(this.zG, this.Ak - a) : (this.uc && (this.zs.clearTimeout(this.uc), this.uc = null), this.dispatchEvent("tick"), this.enabled && (this.stop(), this.start()))
        }
    };
    _.h.start = function() {
        this.enabled = !0;
        this.uc || (this.uc = this.zs.setTimeout(this.zG, this.Ak), this.wK = _.lb())
    };
    _.h.stop = function() {
        this.enabled = !1;
        this.uc && (this.zs.clearTimeout(this.uc), this.uc = null)
    };
    _.h.va = function() {
        _.fy.T.va.call(this);
        this.stop();
        delete this.zs
    };
    var hy, iy, jy;
    _.gy = function(a) {
        _.dj.call(this);
        this.headers = new _.rt;
        this.Ax = a || null;
        this.tf = !1;
        this.zx = this.Oa = null;
        this.Ev = "";
        this.Yn = 0;
        this.$l = this.BB = this.gv = this.Lz = !1;
        this.Jm = 0;
        this.kd = null;
        this.Mk = "";
        this.ME = this.sf = !1
    };
    _.K(_.gy, _.dj);
    _.gy.prototype.Bb = null;
    hy = /^https?$/i;
    iy = ["POST", "PUT"];
    jy = [];
    _.ky = function(a, b, c, d, e, f, g) {
        var k = new _.gy;
        jy.push(k);
        b && k.V("complete", b);
        k.eo("ready", k.kS);
        f && k.bE(f);
        g && (k.sf = g);
        k.send(a, c, d, e)
    };
    _.gy.prototype.kS = function() {
        this.Da();
        _.oi(jy, this)
    };
    _.gy.prototype.bE = function(a) {
        this.Jm = Math.max(0, a)
    };
    _.gy.prototype.send = function(a, b, c, d) {
        if (this.Oa) throw Error("pa`" + this.Ev + "`" + a);
        b = b ? b.toUpperCase() : "GET";
        this.Ev = a;
        this.Yn = 0;
        this.Lz = !1;
        this.tf = !0;
        this.Oa = this.Ax ? _.Px(this.Ax) : _.Px(_.Bx);
        this.zx = this.Ax ? this.Ax.getOptions() : _.Bx.getOptions();
        this.Oa.onreadystatechange = (0, _.R)(this.mL, this);
        try {
            this.BB = !0, this.Oa.open(b, String(a), !0), this.BB = !1
        } catch (f) {
            this.ju(5, f);
            return
        }
        a = c || "";
        var e = this.headers.clone();
        d && _.zt(d, function(f, g) {
            e.set(g, f)
        });
        d = _.hi(e.Ae(), ly);
        c = _.A.FormData && a instanceof _.A.FormData;
        !_.$a(iy, b) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(f, g) {
            this.Oa.setRequestHeader(g, f)
        }, this);
        this.Mk && (this.Oa.responseType = this.Mk);
        "withCredentials" in this.Oa && this.Oa.withCredentials !== this.sf && (this.Oa.withCredentials = this.sf);
        try {
            my(this), 0 < this.Jm && ((this.ME = ny(this.Oa)) ? (this.Oa.timeout = this.Jm, this.Oa.ontimeout = (0, _.R)(this.Bg, this)) : this.kd = _.Lx(this.Bg, this.Jm, this)), this.gv = !0, this.Oa.send(a), this.gv = !1
        } catch (f) {
            this.ju(5, f)
        }
    };
    var ny = function(a) {
            return _.sc && _.Pc(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
        },
        ly = function(a) {
            return "content-type" == a.toLowerCase()
        };
    _.gy.prototype.Bg = function() {
        "undefined" != typeof _.Wa && this.Oa && (this.Yn = 8, this.dispatchEvent("timeout"), this.abort(8))
    };
    _.gy.prototype.ju = function(a) {
        this.tf = !1;
        this.Oa && (this.$l = !0, this.Oa.abort(), this.$l = !1);
        this.Yn = a;
        oy(this);
        py(this)
    };
    var oy = function(a) {
        a.Lz || (a.Lz = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
    _.gy.prototype.abort = function(a) {
        this.Oa && this.tf && (this.tf = !1, this.$l = !0, this.Oa.abort(), this.$l = !1, this.Yn = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), py(this))
    };
    _.gy.prototype.va = function() {
        this.Oa && (this.tf && (this.tf = !1, this.$l = !0, this.Oa.abort(), this.$l = !1), py(this, !0));
        _.gy.T.va.call(this)
    };
    _.gy.prototype.mL = function() {
        this.Ob || (this.BB || this.gv || this.$l ? qy(this) : this.BC())
    };
    _.gy.prototype.BC = function() {
        qy(this)
    };
    var qy = function(a) {
            if (a.tf && "undefined" != typeof _.Wa && (!a.zx[1] || 4 != _.ry(a) || 2 != a.getStatus()))
                if (a.gv && 4 == _.ry(a)) _.Lx(a.mL, 0, a);
                else if (a.dispatchEvent("readystatechange"), 4 == _.ry(a)) {
                a.tf = !1;
                try {
                    _.sy(a) ? (a.dispatchEvent("complete"), a.dispatchEvent("success")) : (a.Yn = 6, a.getStatus(), oy(a))
                } finally {
                    py(a)
                }
            }
        },
        py = function(a, b) {
            if (a.Oa) {
                my(a);
                var c = a.Oa,
                    d = a.zx[0] ? _.cb : null;
                a.Oa = null;
                a.zx = null;
                b || a.dispatchEvent("ready");
                try {
                    c.onreadystatechange = d
                } catch (e) {}
            }
        },
        my = function(a) {
            a.Oa && a.ME && (a.Oa.ontimeout =
                null);
            a.kd && (_.Mx(a.kd), a.kd = null)
        };
    _.gy.prototype.$d = function() {
        return !!this.Oa
    };
    _.sy = function(a) {
        var b = a.getStatus(),
            c;
        if (!(c = _.ey(b))) {
            if (b = 0 === b) a = String(a.Ev).match(_.nh)[1] || null, !a && _.A.self && _.A.self.location && (a = _.A.self.location.protocol, a = a.substr(0, a.length - 1)), b = !hy.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    };
    _.ry = function(a) {
        return a.Oa ? a.Oa.readyState : 0
    };
    _.gy.prototype.getStatus = function() {
        try {
            return 2 < _.ry(this) ? this.Oa.status : -1
        } catch (a) {
            return -1
        }
    };
    _.ty = function(a) {
        try {
            return a.Oa ? a.Oa.responseText : ""
        } catch (b) {
            return ""
        }
    };
    _.uy = function(a) {
        try {
            if (!a.Oa) return null;
            if ("response" in a.Oa) return a.Oa.response;
            switch (a.Mk) {
                case "":
                case "text":
                    return a.Oa.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer" in a.Oa) return a.Oa.mozResponseArrayBuffer
            }
            return null
        } catch (b) {
            return null
        }
    };
    _.gy.prototype.getResponseHeader = function(a) {
        if (this.Oa && 4 == _.ry(this)) return a = this.Oa.getResponseHeader(a), null === a ? void 0 : a
    };
    _.gy.prototype.getAllResponseHeaders = function() {
        return this.Oa && 4 == _.ry(this) ? this.Oa.getAllResponseHeaders() || "" : ""
    };
    _.ni(function(a) {
        _.gy.prototype.BC = a(_.gy.prototype.BC)
    });

    _.Oe = _.Oe || {};
    _.Oe.attachBrowserEvent = function(a, b, c, d) {
        "undefined" != typeof a.addEventListener ? a.addEventListener(b, c, d) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + b, c) : _.Pe("cannot attachBrowserEvent: " + b)
    };
    _.Oe.FZ = function(a) {
        var b = window;
        b.removeEventListener ? b.removeEventListener("mousemove", a, !1) : b.detachEvent ? b.detachEvent("onmousemove", a) : _.Pe("cannot removeBrowserEvent: mousemove")
    };

    var ug;
    ug = function() {
        function a() {
            e[0] = 1732584193;
            e[1] = 4023233417;
            e[2] = 2562383102;
            e[3] = 271733878;
            e[4] = 3285377520;
            n = m = 0
        }

        function b(p) {
            for (var u = g, r = 0; 64 > r; r += 4) u[r / 4] = p[r] << 24 | p[r + 1] << 16 | p[r + 2] << 8 | p[r + 3];
            for (r = 16; 80 > r; r++) p = u[r - 3] ^ u[r - 8] ^ u[r - 14] ^ u[r - 16], u[r] = (p << 1 | p >>> 31) & 4294967295;
            p = e[0];
            var v = e[1],
                t = e[2],
                w = e[3],
                y = e[4];
            for (r = 0; 80 > r; r++) {
                if (40 > r)
                    if (20 > r) {
                        var D = w ^ v & (t ^ w);
                        var z = 1518500249
                    } else D = v ^ t ^ w, z = 1859775393;
                else 60 > r ? (D = v & t | w & (v | t), z = 2400959708) : (D = v ^ t ^ w, z = 3395469782);
                D = ((p << 5 | p >>> 27) & 4294967295) + D +
                    y + z + u[r] & 4294967295;
                y = w;
                w = t;
                t = (v << 30 | v >>> 2) & 4294967295;
                v = p;
                p = D
            }
            e[0] = e[0] + p & 4294967295;
            e[1] = e[1] + v & 4294967295;
            e[2] = e[2] + t & 4294967295;
            e[3] = e[3] + w & 4294967295;
            e[4] = e[4] + y & 4294967295
        }

        function c(p, u) {
            if ("string" === typeof p) {
                p = unescape(encodeURIComponent(p));
                for (var r = [], v = 0, t = p.length; v < t; ++v) r.push(p.charCodeAt(v));
                p = r
            }
            u || (u = p.length);
            r = 0;
            if (0 == m)
                for (; r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64;
            for (; r < u;)
                if (f[m++] = p[r++], n++, 64 == m)
                    for (m = 0, b(f); r + 64 < u;) b(p.slice(r, r + 64)), r += 64, n += 64
        }

        function d() {
            var p = [],
                u =
                8 * n;
            56 > m ? c(k, 56 - m) : c(k, 64 - (m - 56));
            for (var r = 63; 56 <= r; r--) f[r] = u & 255, u >>>= 8;
            b(f);
            for (r = u = 0; 5 > r; r++)
                for (var v = 24; 0 <= v; v -= 8) p[u++] = e[r] >> v & 255;
            return p
        }
        for (var e = [], f = [], g = [], k = [128], l = 1; 64 > l; ++l) k[l] = 0;
        var m, n;
        a();
        return {
            reset: a,
            update: c,
            digest: d,
            Sg: function() {
                for (var p = d(), u = "", r = 0; r < p.length; r++) u += "0123456789ABCDEF".charAt(Math.floor(p[r] / 16)) + "0123456789ABCDEF".charAt(p[r] % 16);
                return u
            }
        }
    };
    _.vg = function() {
        function a(m) {
            var n = ug();
            n.update(m);
            return n.Sg()
        }
        var b = window.crypto;
        if (b && "function" == typeof b.getRandomValues) return function() {
            var m = new window.Uint32Array(1);
            b.getRandomValues(m);
            return Number("0." + m[0])
        };
        var c = _.S("random/maxObserveMousemove");
        null == c && (c = -1);
        var d = 0,
            e = Math.random(),
            f = 1,
            g = 1E6 * (screen.width * screen.width + screen.height),
            k = function(m) {
                m = m || window.event;
                var n = m.screenX + m.clientX << 16;
                n += m.screenY + m.clientY;
                n *= (new Date).getTime() % 1E6;
                f = f * n % g;
                0 < c && ++d == c && _.Oe.FZ(k)
            };
        0 != c && _.Oe.attachBrowserEvent(window, "mousemove", k, !1);
        var l = a(document.cookie + "|" + document.location + "|" + (new Date).getTime() + "|" + e);
        return function() {
            var m = f;
            m += parseInt(l.substr(0, 20), 16);
            l = a(l);
            return m / (g + Math.pow(16, 20))
        }
    }();
    _.C("shindig.random", _.vg);

    var wg = function(a) {
            return {
                execute: function(b) {
                    var c = {
                            method: a.httpMethod || "GET",
                            root: a.root,
                            path: a.url,
                            params: a.urlParams,
                            headers: a.headers,
                            body: a.body
                        },
                        d = window.gapi,
                        e = function() {
                            var f = d.config.get("client/apiKey"),
                                g = d.config.get("client/version");
                            try {
                                var k = d.config.get("googleapis.config/developerKey"),
                                    l = d.config.get("client/apiKey", k);
                                d.config.update("client/apiKey", l);
                                d.config.update("client/version", "1.0.0-alpha");
                                var m = d.client;
                                m.request.call(m, c).then(b, b)
                            } finally {
                                d.config.update("client/apiKey",
                                    f), d.config.update("client/version", g)
                            }
                        };
                    d.client ? e() : d.load.call(d, "client", e)
                }
            }
        },
        xg = function(a, b) {
            return function(c) {
                var d = {};
                c = c.body;
                var e = _.yf(c),
                    f = {};
                if (e && e.length)
                    for (var g = 0, k = e.length; g < k; ++g) {
                        var l = e[g];
                        f[l.id] = l
                    }
                g = 0;
                for (k = b.length; g < k; ++g) l = b[g].id, d[l] = e && e.length ? f[l] : e;
                a(d, c)
            }
        },
        yg = function(a) {
            a.transport = {
                name: "googleapis",
                execute: function(b, c) {
                    for (var d = [], e = 0, f = b.length; e < f; ++e) {
                        var g = b[e],
                            k = g.method,
                            l = String(k).split(".")[0];
                        l = _.S("googleapis.config/versions/" + k) || _.S("googleapis.config/versions/" +
                            l) || "v1";
                        d.push({
                            jsonrpc: "2.0",
                            id: g.id,
                            method: k,
                            apiVersion: String(l),
                            params: g.params
                        })
                    }
                    b = wg({
                        httpMethod: "POST",
                        root: a.transport.root,
                        url: "/rpc?pp=0",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: d
                    });
                    b.execute.call(b, xg(c, d))
                },
                root: void 0
            }
        },
        zg = function(a) {
            var b = this.method,
                c = this.transport;
            c.execute.call(c, [{
                method: b,
                id: b,
                params: this.rpc
            }], function(d) {
                d = d[b];
                d.error || (d = d.data || d.result);
                a(d)
            })
        },
        Bg = function() {
            for (var a = Ag, b = a.split("."), c = function(k) {
                    k = k || {};
                    k.groupId = k.groupId || "@self";
                    k.userId =
                        k.userId || "@viewer";
                    k = {
                        method: a,
                        rpc: k || {}
                    };
                    yg(k);
                    k.execute = zg;
                    return k
                }, d = _.A, e = 0, f = b.length; e < f; ++e) {
                var g = d[b[e]] || {};
                e + 1 == f && (g = c);
                d = d[b[e]] = g
            }
            if (1 < b.length && "googleapis" != b[0])
                for (b[0] = "googleapis", "delete" == b[b.length - 1] && (b[b.length - 1] = "remove"), d = _.A, e = 0, f = b.length; e < f; ++e) g = d[b[e]] || {}, e + 1 == f && (g = c), d = d[b[e]] = g
        },
        Ag;
    for (Ag in _.S("googleapis.config/methods")) Bg();
    _.C("googleapis.newHttpRequest", function(a) {
        return wg(a)
    });
    _.C("googleapis.setUrlParameter", function(a, b) {
        if ("trace" !== a) throw Error("t");
        _.He("client/trace", b)
    });

    _.vy = function(a, b) {
        this.Ad = a;
        a = b || {};
        this.bY = Number(a.maxAge) || 0;
        this.xc = a.domain;
        this.Fk = a.path;
        this.w_ = !!a.secure
    };
    _.vy.prototype.read = function() {
        for (var a = this.Ad + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a)) return d.substr(a.length)
        }
    };
    _.vy.prototype.write = function(a, b) {
        if (!wy.test(this.Ad)) throw "Invalid cookie name";
        if (!xy.test(a)) throw "Invalid cookie value";
        a = this.Ad + "=" + a;
        this.xc && (a += ";domain=" + this.xc);
        this.Fk && (a += ";path=" + this.Fk);
        b = "number" === typeof b ? b : this.bY;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.w_ && (a += ";secure");
        document.cookie = a;
        return !0
    };
    _.vy.prototype.clear = function() {
        this.write("", 0)
    };
    var xy = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
        wy = /^[A-Z_][A-Z0-9_]{0,63}$/;
    _.vy.iterate = function(a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="),
                e = d.shift();
            a(e, d.join("="))
        }
    };
    _.yy = function(a) {
        this.Th = a
    };
    _.yy.prototype.read = function() {
        if (zy.hasOwnProperty(this.Th)) return zy[this.Th]
    };
    _.yy.prototype.write = function(a) {
        zy[this.Th] = a;
        return !0
    };
    _.yy.prototype.clear = function() {
        delete zy[this.Th]
    };
    var zy = {};
    _.yy.iterate = function(a) {
        for (var b in zy) zy.hasOwnProperty(b) && a(b, zy[b])
    };
    var Ay = function() {
            this.le = null;
            this.key = function() {
                return null
            };
            this.getItem = function() {
                return this.le
            };
            this.setItem = function(a, b) {
                this.le = b;
                this.length = 1
            };
            this.removeItem = function() {
                this.clear()
            };
            this.clear = function() {
                this.le = null;
                this.length = 0
            };
            this.length = 0
        },
        By = function(a) {
            try {
                var b = a || window.sessionStorage;
                if (!b) return !1;
                b.setItem("gapi.sessionStorageTest", "gapi.sessionStorageTest" + b.length);
                b.removeItem("gapi.sessionStorageTest");
                return !0
            } catch (c) {
                return !1
            }
        },
        Cy = function(a, b) {
            this.Ad = a;
            this.Sf =
                By(b) ? b || window.sessionStorage : new Ay
        };
    Cy.prototype.read = function() {
        return this.Sf.getItem(this.Ad)
    };
    Cy.prototype.write = function(a) {
        try {
            this.Sf.setItem(this.Ad, a)
        } catch (b) {
            return !1
        }
        return !0
    };
    Cy.prototype.clear = function() {
        this.Sf.removeItem(this.Ad)
    };
    Cy.iterate = function(a) {
        if (By())
            for (var b = 0, c = window.sessionStorage.length; b < c; ++b) {
                var d = window.sessionStorage.key(b);
                a(d, window.sessionStorage[d])
            }
    };
    for (var Dy = 0; 64 > Dy; ++Dy);
    _.Ey = "https:" === window.location.protocol;
    _.Fy = _.Ey || "http:" === window.location.protocol ? _.vy : _.yy;
    _.Gy = function(a) {
        var b = a.substr(1),
            c = "",
            d = window.location.hostname;
        if ("" !== b) {
            c = parseInt(b, 10);
            if (isNaN(c)) return null;
            b = d.split(".");
            if (b.length < c - 1) return null;
            b.length == c - 1 && (d = "." + d)
        } else d = "";
        return {
            Fe: "S" == a.charAt(0),
            domain: d,
            Ah: c
        }
    };
    _.Hy = function(a) {
        if (0 !== a.indexOf("GCSC")) return null;
        var b = {
            OB: !1
        };
        a = a.substr(4);
        if (!a) return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d) return b;
        var e = _.Gy(a.substr(d + 1));
        if (null == e) return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0)) return b;
        d = "E" === c && e.Fe;
        return !d && ("U" !== c || e.Fe) || d && !_.Ey ? b : {
            OB: !0,
            Fe: d,
            pS: a.substr(1),
            domain: e.domain,
            Ah: e.Ah
        }
    };
    var Iy, Jy, My, Ny;
    Iy = _.oe();
    Jy = _.oe();
    _.Ky = _.oe();
    _.Ly = _.oe();
    My = "state code cookie_policy g_user_cookie_policy authuser prompt g-oauth-window status".split(" ");
    Ny = function(a) {
        this.DL = a;
        this.jC = null
    };
    Ny.prototype.write = function(a) {
        var b = _.oe(),
            c = _.oe(),
            d = window.decodeURIComponent ? decodeURIComponent : unescape,
            e;
        for (e in a)
            if (_.pe(a, e)) {
                var f = a[e];
                f = f.replace(/\+/g, " ");
                c[e] = d(f);
                b[e] = a[e]
            }
        d = 0;
        for (e = My.length; d < e; ++d) delete c[My[d]];
        a = String(a.authuser || 0);
        d = _.oe();
        d[a] = c;
        c = _.zf(d);
        this.DL.write(c);
        this.jC = b
    };
    Ny.prototype.read = function() {
        return this.jC
    };
    Ny.prototype.clear = function() {
        this.DL.clear();
        this.jC = _.oe()
    };
    _.Oy = function(a) {
        return a ? {
            domain: a.domain,
            path: "/",
            secure: a.Fe
        } : null
    };
    Cy.iterate(function(a) {
        var b = _.Hy(a);
        b && b.OB && (Iy[a] = new Ny(new Cy(a)))
    });
    _.Fy.iterate(function(a) {
        Iy[a] && (Jy[a] = new _.Fy(a, _.Oy(_.Hy(a))))
    });

    _.jj = function(a) {
        this.S = a
    };
    _.h = _.jj.prototype;
    _.h.value = function() {
        return this.S
    };
    _.h.Qk = function(a) {
        this.S.width = a;
        return this
    };
    _.h.Rc = function() {
        return this.S.width
    };
    _.h.ji = function(a) {
        this.S.height = a;
        return this
    };
    _.h.getHeight = function() {
        return this.S.height
    };
    _.h.Od = function(a) {
        this.S.style = a;
        return this
    };
    _.h.Ql = _.ja(14);
    _.kj = function(a) {
        this.S = a
    };
    _.kj.prototype.CD = function(a) {
        this.S.anchor = a;
        return this
    };
    _.kj.prototype.Gh = function() {
        return this.S.anchor
    };
    _.kj.prototype.Mw = _.ja(16);
    _.lj = function(a) {
        a.S.show = !0;
        return a
    };
    _.kj.prototype.ji = function(a) {
        this.S.height = a;
        return this
    };
    _.kj.prototype.getHeight = function() {
        return this.S.height
    };
    _.kj.prototype.Qk = function(a) {
        this.S.width = a;
        return this
    };
    _.kj.prototype.Rc = function() {
        return this.S.width
    };
    _.mj = function(a) {
        this.S = a || {}
    };
    _.mj.prototype.value = function() {
        return this.S
    };
    _.mj.prototype.setUrl = function(a) {
        this.S.url = a;
        return this
    };
    _.mj.prototype.getUrl = function() {
        return this.S.url
    };
    _.nj = function(a, b) {
        a.S.where = b;
        return a
    };
    _.h = _.mj.prototype;
    _.h.Od = function(a) {
        this.S.style = a;
        return this
    };
    _.h.Ql = _.ja(13);
    _.h.Me = function(a) {
        this.S.id = a;
        return this
    };
    _.h.ma = function() {
        return this.S.id
    };
    _.h.Pk = function(a) {
        this.S.rpctoken = a;
        return this
    };
    _.oj = function(a, b) {
        a.S.queryParams = b;
        return a
    };
    _.pj = function(a, b) {
        a.S.relayOpen = b;
        return a
    };
    _.qj = function(a, b) {
        a.S.messageHandlers = b;
        return a
    };
    _.rj = function(a, b) {
        a.S.messageHandlersFilter = b;
        return a
    };
    _.mj.prototype.Eo = _.ja(17);
    _.mj.prototype.getContext = function() {
        return this.S.context
    };
    _.mj.prototype.Qc = function() {
        return this.S.openerIframe
    };
    _.sj = function(a) {
        return new _.kj(a.S)
    };
    _.mj.prototype.Hl = function() {
        this.S.attributes = this.S.attributes || {};
        return new _.jj(this.S.attributes)
    };
    _.tj = function(a) {
        a.S.connectWithQueryParams = !0;
        return a
    };

    var xj, yj, zj, Aj, Bj, Cj, Dj, Ej, Fj, Gj, Hj, Ij, Mj, Oj, Pj, Qj;
    _.uj = function(a) {
        return !!a && "object" === typeof a && _.me.test(a.push)
    };
    _.vj = function(a) {
        for (var b = 0; b < this.length; b++)
            if (this[b] === a) return b;
        return -1
    };
    _.wj = function(a, b) {
        if (!a) throw Error(b || "");
    };
    xj = /&/g;
    yj = /</g;
    zj = />/g;
    Aj = /"/g;
    Bj = /'/g;
    Cj = function(a) {
        return String(a).replace(xj, "&amp;").replace(yj, "&lt;").replace(zj, "&gt;").replace(Aj, "&quot;").replace(Bj, "&#39;")
    };
    Dj = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g;
    Ej = /%([a-f]|[0-9a-fA-F][a-f])/g;
    Fj = /^(https?|ftp|file|chrome-extension):$/i;
    Gj = function(a) {
        a = String(a);
        a = a.replace(Dj, function(e) {
            try {
                return encodeURIComponent(e)
            } catch (f) {
                return encodeURIComponent(e.replace(/^[^%]+$/g, "\ufffd"))
            }
        }).replace(_.ve, function(e) {
            return e.replace(/%/g, "%25")
        }).replace(Ej, function(e) {
            return e.toUpperCase()
        });
        a = a.match(_.ue) || [];
        var b = _.oe(),
            c = function(e) {
                return e.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g, "%7D")
            },
            d = !!(a[1] || "").match(Fj);
        b.yp = c((a[1] || "") + (a[2] || "") + (a[3] ||
            (a[2] && d ? "/" : "")));
        d = function(e) {
            return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"))
        };
        b.query = a[5] ? [d(a[5])] : [];
        b.Eh = a[7] ? [d(a[7])] : [];
        return b
    };
    Hj = function(a) {
        return a.yp + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.Eh.length ? "#" + a.Eh.join("&") : "")
    };
    Ij = function(a, b) {
        var c = [];
        if (a)
            for (var d in a)
                if (_.pe(a, d) && null != a[d]) {
                    var e = b ? b(a[d]) : a[d];
                    c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                }
        return c
    };
    _.Jj = function(a, b, c, d) {
        a = Gj(a);
        a.query.push.apply(a.query, Ij(b, d));
        a.Eh.push.apply(a.Eh, Ij(c, d));
        return Hj(a)
    };
    _.Kj = function(a, b) {
        var c = Gj(b);
        b = c.yp;
        c.query.length && (b += "?" + c.query.join(""));
        c.Eh.length && (b += "#" + c.Eh.join(""));
        var d = "";
        2E3 < b.length && (c = b, b = b.substr(0, 2E3), b = b.replace(_.we, ""), d = c.substr(b.length));
        var e = a.createElement("div");
        a = a.createElement("a");
        c = Gj(b);
        b = c.yp;
        c.query.length && (b += "?" + c.query.join(""));
        c.Eh.length && (b += "#" + c.Eh.join(""));
        _.Cd(a, new _.Ub(b, _.Sb));
        e.appendChild(a);
        b = _.gc(e.innerHTML, null);
        _.Bd(e, b);
        b = String(e.firstChild.href);
        e.parentNode && e.parentNode.removeChild(e);
        c = Gj(b +
            d);
        b = c.yp;
        c.query.length && (b += "?" + c.query.join(""));
        c.Eh.length && (b += "#" + c.Eh.join(""));
        return b
    };
    _.Lj = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    Mj = function(a) {
        for (; a.firstChild;) a.removeChild(a.firstChild)
    };
    _.Nj = function(a, b) {
        var c = _.ne(_.ze, "watt", _.oe());
        _.ne(c, a, b)
    };
    Oj = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//;
    Pj = function(a) {
        var b = _.S("googleapis.config/sessionDelegate");
        "string" === typeof b && 21 < b.length && (b = null);
        null == b && (b = (a = (a || window.location.href).match(Oj)) ? a[1] : null);
        if (null == b) return null;
        b = String(b);
        21 < b.length && (b = null);
        return b
    };
    var Rj = function() {
            var a = _.ze.onl;
            if (!a) {
                a = _.oe();
                _.ze.onl = a;
                var b = _.oe();
                a.e = function(c) {
                    var d = b[c];
                    d && (delete b[c], d())
                };
                a.a = function(c, d) {
                    b[c] = d
                };
                a.r = function(c) {
                    delete b[c]
                }
            }
            return a
        },
        Sj = function(a, b) {
            b = b.onload;
            return "function" === typeof b ? (Rj().a(a, b), b) : null
        },
        Tj = function(a) {
            _.wj(/^\w+$/.test(a), "Unsupported id - " + a);
            Rj();
            return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        },
        Uj = function(a) {
            Rj().r(a)
        };
    var Wj, Xj, bk;
    _.Vj = {
        allowtransparency: "true",
        frameborder: "0",
        hspace: "0",
        marginheight: "0",
        marginwidth: "0",
        scrolling: "no",
        style: "",
        tabindex: "0",
        vspace: "0",
        width: "100%"
    };
    Wj = {
        allowtransparency: !0,
        onload: !0
    };
    Xj = 0;
    _.Yj = function(a, b) {
        var c = 0;
        do var d = b.id || ["I", Xj++, "_", (new Date).getTime()].join(""); while (a.getElementById(d) && 5 > ++c);
        _.wj(5 > c, "Error creating iframe id");
        return d
    };
    _.Zj = function(a, b) {
        return a ? b + "/" + a : ""
    };
    _.ak = function(a, b, c, d) {
        var e = {},
            f = {};
        a.documentMode && 9 > a.documentMode && (e.hostiemode = a.documentMode);
        _.qe(d.queryParams || {}, e);
        _.qe(d.fragmentParams || {}, f);
        var g = d.pfname;
        var k = _.oe();
        _.S("iframes/dropLegacyIdParam") || (k.id = c);
        k._gfid = c;
        k.parent = a.location.protocol + "//" + a.location.host;
        c = _.te(a.location.href, "parent");
        g = g || "";
        !g && c && (g = _.te(a.location.href, "_gfid", "") || _.te(a.location.href, "id", ""), g = _.Zj(g, _.te(a.location.href, "pfname", "")));
        g || (c = _.yf(_.te(a.location.href, "jcp", ""))) && "object" ==
            typeof c && (g = _.Zj(c.id, c.pfname));
        k.pfname = g;
        d.connectWithJsonParam && (g = {}, g.jcp = _.zf(k), k = g);
        g = _.te(b, "rpctoken") || e.rpctoken || f.rpctoken;
        g || (g = d.rpctoken || String(Math.round(1E8 * _.Yh())), k.rpctoken = g);
        d.rpctoken = g;
        _.qe(k, d.connectWithQueryParams ? e : f);
        k = a.location.href;
        a = _.oe();
        (g = _.te(k, "_bsh", _.ze.bsh)) && (a._bsh = g);
        (k = _.ze.dpo ? _.ze.h : _.te(k, "jsh", _.ze.h)) && (a.jsh = k);
        d.hintInFragment ? _.qe(a, f) : _.qe(a, e);
        return _.Jj(b, e, f, d.paramsSerializer)
    };
    bk = function(a) {
        _.wj(!a || _.Lj.test(a), "Illegal url for new iframe - " + a)
    };
    _.ck = function(a, b, c, d, e) {
        bk(c.src);
        var f, g = Sj(d, c),
            k = g ? Tj(d) : "";
        try {
            document.all && (f = a.createElement('<iframe frameborder="' + Cj(String(c.frameborder)) + '" scrolling="' + Cj(String(c.scrolling)) + '" ' + k + ' name="' + Cj(String(c.name)) + '"/>'))
        } catch (m) {} finally {
            f || (f = a.createElement("iframe"), g && (f.onload = function() {
                f.onload = null;
                g.call(this)
            }, Uj(d)))
        }
        f.setAttribute("ng-non-bindable", "");
        for (var l in c) a = c[l], "style" === l && "object" === typeof a ? _.qe(a, f.style) : Wj[l] || f.setAttribute(l, String(a));
        (l = e && e.beforeNode ||
            null) || e && e.dontclear || Mj(b);
        b.insertBefore(f, l);
        f = l ? l.previousSibling : b.lastChild;
        c.allowtransparency && (f.allowTransparency = !0);
        return f
    };
    var dk, gk;
    dk = /^:[\w]+$/;
    _.ek = /:([a-zA-Z_]+):/g;
    _.fk = function() {
        var a = _.Ah() || "0",
            b = Pj();
        var c = _.Ah(void 0) || a;
        var d = Pj(void 0),
            e = "";
        c && (e += "u/" + encodeURIComponent(String(c)) + "/");
        d && (e += "b/" + encodeURIComponent(String(d)) + "/");
        c = e || null;
        (e = (d = !1 === _.S("isLoggedIn")) ? "_/im/" : "") && (c = "");
        var f = _.S("iframes/:socialhost:"),
            g = _.S("iframes/:im_socialhost:");
        return Qj = {
            socialhost: f,
            ctx_socialhost: d ? g : f,
            session_index: a,
            session_delegate: b,
            session_prefix: c,
            im_prefix: e
        }
    };
    gk = function(a, b) {
        return _.fk()[b] || ""
    };
    _.hk = function(a) {
        return _.Kj(_.ke, a.replace(_.ek, gk))
    };
    _.ik = function(a) {
        var b = a;
        dk.test(a) && (b = _.S("iframes/" + b.substring(1) + "/url"), _.wj(!!b, "Unknown iframe url config for - " + a));
        return _.hk(b)
    };
    _.jk = function(a, b, c) {
        var d = c || {};
        c = d.attributes || {};
        _.wj(!(d.allowPost || d.forcePost) || !c.onload, "onload is not supported by post iframe (allowPost or forcePost)");
        a = _.ik(a);
        c = b.ownerDocument || _.ke;
        var e = _.Yj(c, d);
        a = _.ak(c, a, e, d);
        var f = _.oe();
        _.qe(_.Vj, f);
        _.qe(d.attributes, f);
        f.name = f.id = e;
        f.src = a;
        d.eurl = a;
        var g = d || {},
            k = !!g.allowPost;
        if (g.forcePost || k && 2E3 < a.length) {
            g = Gj(a);
            f.src = "";
            d.dropDataPostorigin || (f["data-postorigin"] = a);
            a = _.ck(c, b, f, e);
            if (-1 != navigator.userAgent.indexOf("WebKit")) {
                var l = a.contentWindow.document;
                l.open();
                f = l.createElement("div");
                k = {};
                var m = e + "_inner";
                k.name = m;
                k.src = "";
                k.style = "display:none";
                _.ck(c, f, k, m, d)
            }
            f = (d = g.query[0]) ? d.split("&") : [];
            d = [];
            for (k = 0; k < f.length; k++) m = f[k].split("=", 2), d.push([decodeURIComponent(m[0]), decodeURIComponent(m[1])]);
            g.query = [];
            f = Hj(g);
            _.wj(_.Lj.test(f), "Invalid URL: " + f);
            g = c.createElement("form");
            g.method = "POST";
            g.target = e;
            g.style.display = "none";
            e = f instanceof _.Ub ? f : _.zd(f);
            g.action = _.td(e);
            for (e = 0; e < d.length; e++) f = c.createElement("input"), f.type = "hidden", f.name =
                d[e][0], f.value = d[e][1], g.appendChild(f);
            b.appendChild(g);
            g.submit();
            g.parentNode.removeChild(g);
            l && l.close();
            b = a
        } else b = _.ck(c, b, f, e, d);
        return b
    };

    _.bl = function(a) {
        return new _.Gk(a)
    };

    var jl = function() {
        this.Ds = {
            ZL: cl ? "../" + cl : null,
            nz: dl,
            WI: el,
            Lba: fl,
            Nu: gl,
            tca: hl
        };
        this.rf = _.je;
        this.GL = this.HS;
        this.uT = /MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent);
        if (this.Ds.ZL) {
            this.rf = this.Ds.WI(this.rf, this.Ds.ZL);
            var a = this.rf.document,
                b = a.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.text = "window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};";
            a.body.appendChild(b);
            this.GL = this.rf.doPostMsg
        }
        this.eE = {};
        this.EE = {};
        a = (0, _.R)(this.cB,
            this);
        _.ye(this.rf, "message", a);
        _.ne(_.ze, "RPMQ", []).push(a);
        this.rf != this.rf.parent && il(this, this.rf.parent, this.fC(this.rf.name), "*")
    };
    jl.prototype.fC = function(a) {
        return '{"h":"' + escape(a) + '"}'
    };
    var kl = function(a) {
            var b = null;
            0 === a.indexOf('{"h":"') && a.indexOf('"}') === a.length - 2 && (b = unescape(a.substring(6, a.length - 2)));
            return b
        },
        ll = function(a) {
            if (!/^\s*{/.test(a)) return !1;
            a = _.yf(a);
            return null !== a && "object" === typeof a && !!a.g
        };
    jl.prototype.cB = function(a) {
        var b = String(a.data);
        (0, _.Hf)("gapi.rpc.receive(" + fl + "): " + (!b || 512 >= b.length ? b : b.substr(0, 512) + "... (" + b.length + " bytes)"));
        var c = 0 !== b.indexOf("!_");
        c || (b = b.substring(2));
        var d = ll(b);
        if (!c && !d) {
            if (!d && (c = kl(b))) {
                if (this.eE[c]) this.eE[c]();
                else this.EE[c] = 1;
                return
            }
            var e = a.origin,
                f = this.Ds.nz;
            this.uT ? _.je.setTimeout(function() {
                f(b, e)
            }, 0) : f(b, e)
        }
    };
    jl.prototype.Fc = function(a, b) {
        ".." === a || this.EE[a] ? (b(), delete this.EE[a]) : this.eE[a] = b
    };
    var il = function(a, b, c, d) {
        var e = ll(c) ? "" : "!_";
        (0, _.Hf)("gapi.rpc.send(" + fl + "): " + (!c || 512 >= c.length ? c : c.substr(0, 512) + "... (" + c.length + " bytes)"));
        a.GL(b, e + c, d)
    };
    jl.prototype.HS = function(a, b, c) {
        a.postMessage(b, c)
    };
    jl.prototype.send = function(a, b, c) {
        (a = this.Ds.WI(this.rf, a)) && !a.closed && il(this, a, b, c)
    };
    var ml, nl, pl, ql, rl, sl, tl, cl, fl, ul, vl, wl, el, gl, yl, zl, El, Fl, Hl, hl, Jl, Il, Al, Bl, Kl, dl, Ll, Ml;
    ml = 0;
    nl = [];
    pl = {};
    ql = {};
    rl = _.je.location.href;
    sl = _.te(rl, "rpctoken");
    tl = _.te(rl, "parent") || _.ke.referrer;
    cl = _.te(rl, "rly");
    fl = cl || (_.je !== _.je.top || _.je.opener) && _.je.name || "..";
    ul = null;
    vl = {};
    wl = function() {};
    _.xl = {
        send: wl,
        Fc: wl,
        fC: wl
    };
    el = function(a, b) {
        "/" == b.charAt(0) && (b = b.substring(1), a = _.je.top);
        if (0 === b.length) return a;
        for (b = b.split("/"); b.length;) {
            var c = b.shift();
            "{" == c.charAt(0) && "}" == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1));
            if (".." === c) a = a == a.parent ? a.opener : a.parent;
            else if (".." !== c && a.frames[c]) {
                if (a = a.frames[c], !("postMessage" in a)) throw "Not a window";
            } else return null
        }
        return a
    };
    gl = function(a) {
        return (a = pl[a]) && a.Uk
    };
    yl = function(a) {
        if (a.f in {}) return !1;
        var b = a.t,
            c = pl[a.r];
        a = a.origin;
        return c && (c.Uk === b || !c.Uk && !b) && (a === c.origin || "*" === c.origin)
    };
    zl = function(a) {
        var b = a.id.split("/"),
            c = b[b.length - 1],
            d = a.origin;
        return function(e) {
            var f = e.origin;
            return e.f == c && (d == f || "*" == d)
        }
    };
    _.Cl = function(a, b, c) {
        a = Al(a);
        ql[a.name] = {
            Wg: b,
            jr: a.jr,
            Ro: c || yl
        };
        Bl()
    };
    _.Dl = function(a) {
        delete ql[Al(a).name]
    };
    El = {};
    Fl = function(a, b) {
        (a = El["_" + a]) && a[1](this) && a[0].call(this, b)
    };
    Hl = function(a) {
        var b = a.c;
        if (!b) return wl;
        var c = a.r,
            d = a.g ? "legacy__" : "";
        return function() {
            var e = [].slice.call(arguments, 0);
            e.unshift(c, d + "__cb", null, b);
            _.Gl.apply(null, e)
        }
    };
    hl = function(a) {
        ul = a
    };
    Jl = function(a) {
        vl[a] || (vl[a] = _.je.setTimeout(function() {
            vl[a] = !1;
            Il(a)
        }, 0))
    };
    Il = function(a) {
        var b = pl[a];
        if (b && b.ready) {
            var c = b.$C;
            for (b.$C = []; c.length;) _.xl.send(a, _.zf(c.shift()), b.origin)
        }
    };
    Al = function(a) {
        return 0 === a.indexOf("legacy__") ? {
            name: a.substring(8),
            jr: !0
        } : {
            name: a,
            jr: !1
        }
    };
    Bl = function() {
        for (var a = _.S("rpc/residenceSec") || 60, b = (new Date).getTime() / 1E3, c = 0, d; d = nl[c]; ++c) {
            var e = d.rpc;
            if (!e || 0 < a && b - d.timestamp > a) nl.splice(c, 1), --c;
            else {
                var f = e.s,
                    g = ql[f] || ql["*"];
                if (g)
                    if (nl.splice(c, 1), --c, e.origin = d.origin, d = Hl(e), e.callback = d, g.Ro(e)) {
                        if ("__cb" !== f && !!g.jr != !!e.g) break;
                        e = g.Wg.apply(e, e.a);
                        void 0 !== e && d(e)
                    } else(0, _.Hf)("gapi.rpc.rejected(" + fl + "): " + f)
            }
        }
    };
    Kl = function(a, b, c) {
        nl.push({
            rpc: a,
            origin: b,
            timestamp: (new Date).getTime() / 1E3
        });
        c || Bl()
    };
    dl = function(a, b) {
        a = _.yf(a);
        Kl(a, b, !1)
    };
    Ll = function(a) {
        for (; a.length;) Kl(a.shift(), this.origin, !0);
        Bl()
    };
    Ml = function(a) {
        var b = !1;
        a = a.split("|");
        var c = a[0];
        0 <= c.indexOf("/") && (b = !0);
        return {
            id: c,
            origin: a[1] || "*",
            MB: b
        }
    };
    _.Nl = function(a, b, c, d) {
        var e = Ml(a);
        d && (_.je.frames[e.id] = _.je.frames[e.id] || d);
        a = e.id;
        if (!pl.hasOwnProperty(a)) {
            c = c || null;
            d = e.origin;
            if (".." === a) d = _.sg(tl), c = c || sl;
            else if (!e.MB) {
                var f = _.ke.getElementById(a);
                f && (f = f.src, d = _.sg(f), c = c || _.te(f, "rpctoken"))
            }
            "*" === e.origin && d || (d = e.origin);
            pl[a] = {
                Uk: c,
                $C: [],
                origin: d,
                h_: b,
                UL: function() {
                    var g = a;
                    pl[g].ready = 1;
                    Il(g)
                }
            };
            _.xl.Fc(a, pl[a].UL)
        }
        return pl[a].UL
    };
    _.Gl = function(a, b, c, d) {
        a = a || "..";
        _.Nl(a);
        a = a.split("|", 1)[0];
        var e = b,
            f = [].slice.call(arguments, 3),
            g = c,
            k = fl,
            l = sl,
            m = pl[a],
            n = k,
            p = Ml(a);
        if (m && ".." !== a) {
            if (p.MB) {
                if (!(l = pl[a].h_)) {
                    l = ul ? ul.substring(1).split("/") : [fl];
                    n = l.length - 1;
                    for (var u = _.je.parent; u !== _.je.top;) {
                        var r = u.parent;
                        if (!n--) {
                            for (var v = null, t = r.frames.length, w = 0; w < t; ++w) r.frames[w] == u && (v = w);
                            l.unshift("{" + v + "}")
                        }
                        u = r
                    }
                    l = "/" + l.join("/")
                }
                n = l
            } else n = k = "..";
            l = m.Uk
        }
        g && p ? (m = yl, p.MB && (m = zl(p)), El["_" + ++ml] = [g, m], g = ml) : g = null;
        f = {
            s: e,
            f: k,
            r: n,
            t: l,
            c: g,
            a: f
        };
        e = Al(e);
        f.s = e.name;
        f.g = e.jr;
        pl[a].$C.push(f);
        Jl(a)
    };
    if ("function" === typeof _.je.postMessage || "object" === typeof _.je.postMessage) _.xl = new jl, _.Cl("__cb", Fl, function() {
        return !0
    }), _.Cl("_processBatch", Ll, function() {
        return !0
    }), _.Nl("..");

    var Ol = function(a, b) {
        a = window.getComputedStyle(a, "").getPropertyValue(b).match(/^([0-9]+)/);
        return parseInt(a[0], 10)
    };
    _.Pl = function() {
        var a = 0;
        self.innerHeight ? a = self.innerHeight : document.documentElement && document.documentElement.clientHeight ? a = document.documentElement.clientHeight : document.body && (a = document.body.clientHeight);
        var b = document.body,
            c = document.documentElement;
        if ("CSS1Compat" === document.compatMode && c.scrollHeight) return c.scrollHeight !== a ? c.scrollHeight : c.offsetHeight;
        if (0 <= navigator.userAgent.indexOf("AppleWebKit")) {
            a = 0;
            for (b = [document.body]; 0 < b.length;) {
                var d = b.shift();
                c = d.childNodes;
                if ("undefined" !==
                    typeof d.style) {
                    var e = d.style.overflowY;
                    e || (e = (e = document.defaultView.getComputedStyle(d, null)) ? e.overflowY : null);
                    if ("visible" != e && "inherit" != e && (e = d.style.height, e || (e = (e = document.defaultView.getComputedStyle(d, null)) ? e.height : ""), 0 < e.length && "auto" != e)) continue
                }
                for (d = 0; d < c.length; d++) {
                    e = c[d];
                    if ("undefined" !== typeof e.offsetTop && "undefined" !== typeof e.offsetHeight) {
                        var f = e.offsetTop + e.offsetHeight + Ol(e, "margin-bottom");
                        a = Math.max(a, f)
                    }
                    b.push(e)
                }
            }
            return a + Ol(document.body, "border-bottom") + Ol(document.body,
                "margin-bottom") + Ol(document.body, "padding-bottom")
        }
        if (b && c) return d = c.scrollHeight, e = c.offsetHeight, c.clientHeight !== e && (d = b.scrollHeight, e = b.offsetHeight), d > a ? d > e ? d : e : d < e ? d : e
    };

    var Ql, Tl, Xl, Yl, $l, Zl, am, bm;
    _.jj.prototype.Ql = _.Uc(14, function() {
        return this.S.style
    });
    _.mj.prototype.Ql = _.Uc(13, function() {
        return this.S.style
    });
    Ql = function(a, b) {
        a.S.onload = b
    };
    _.Rl = function(a) {
        return a.S.rpctoken
    };
    _.Sl = function(a) {
        a.S.waitForOnload = !0;
        return a
    };
    Tl = function(a) {
        return (a = a.S.timeout) ? a : null
    };
    _.Ul = function(a, b, c) {
        if (a) {
            _.wj(_.uj(a), "arrayForEach was called with a non array value");
            for (var d = 0; d < a.length; d++) b.call(c, a[d], d)
        }
    };
    _.Vl = function(a, b, c) {
        if (a)
            if (_.uj(a)) _.Ul(a, b, c);
            else {
                _.wj("object" === typeof a, "objectForEach was called with a non object value");
                c = c || a;
                for (var d in a) _.pe(a, d) && void 0 !== a[d] && b.call(c, a[d], d)
            }
    };
    $l = function(a) {
        this.resolve = this.reject = null;
        this.promise = _.bl((0, _.R)(function(b, c) {
            this.resolve = b;
            this.reject = c
        }, this));
        a && (this.promise = Zl(this.promise, a))
    };
    Zl = function(a, b) {
        return a.then(function(c) {
            try {
                b(c)
            } catch (d) {}
            return c
        })
    };
    am = {
        height: !0,
        width: !0
    };
    bm = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
    _.cm = function(a) {
        "number" === typeof a && (a = String(a) + "px");
        return a
    };
    _.dm = function(a) {
        this.S = a || {}
    };
    _.ii(_.dm, _.mj);
    _.em = function(a, b) {
        a.S.frameName = b;
        return a
    };
    _.dm.prototype.vd = function() {
        return this.S.frameName
    };
    _.fm = function(a, b) {
        a.S.rpcAddr = b;
        return a
    };
    _.dm.prototype.Ff = function() {
        return this.S.rpcAddr
    };
    _.gm = function(a, b) {
        a.S.retAddr = b;
        return a
    };
    _.dm.prototype.Zg = function() {
        return this.S.retAddr
    };
    _.dm.prototype.li = function(a) {
        this.S.origin = a;
        return this
    };
    _.dm.prototype.getOrigin = function() {
        return this.S.origin
    };
    _.dm.prototype.sj = function(a) {
        this.S.setRpcReady = a;
        return this
    };
    _.hm = function(a) {
        return a.S.setRpcReady
    };
    _.dm.prototype.Go = function(a) {
        this.S.context = a
    };
    var im = function(a, b) {
        a.S._rpcReadyFn = b
    };
    _.dm.prototype.Ma = function() {
        return this.S.iframeEl
    };
    var mm;
    _.jm = _.oe();
    _.km = _.oe();
    _.lm = function(a) {
        return _.jm[a]
    };
    mm = function(a, b) {
        _.re.load("gapi.iframes.style." + a, b)
    };
    _.om = function(a) {
        a = a || {};
        this.Ob = !1;
        this.AL = _.oe();
        this.xf = _.oe();
        this.rf = a._window || _.je;
        this.ld = this.rf.location.href;
        this.BL = (this.PC = nm(this.ld, "parent")) ? nm(this.ld, "pfname") : "";
        this.Ca = this.PC ? nm(this.ld, "_gfid") || nm(this.ld, "id") : "";
        this.jg = _.Zj(this.Ca, this.BL);
        this.Cd = _.sg(this.ld);
        if (this.Ca) {
            var b = new _.dm;
            _.fm(b, a._parentRpcAddr || "..");
            _.gm(b, a._parentRetAddr || this.Ca);
            b.li(_.sg(this.PC || this.ld));
            _.em(b, this.BL);
            this.$a = this.Mj(b.value())
        } else this.$a = null
    };
    _.h = _.om.prototype;
    _.h.Vn = _.ja(11);
    _.h.Da = function() {
        if (!this.Ob) {
            for (var a = _.Ha(Object.values(this.xf)), b = a.next(); !b.done; b = a.next()) b.value.Da();
            this.Ob = !0
        }
    };
    _.h.vd = function() {
        return this.jg
    };
    _.h.Ab = function() {
        return this.rf
    };
    _.h.ub = function() {
        return this.rf.document
    };
    _.h.Ow = _.ja(18);
    _.h.uA = function(a) {
        return this.AL[a]
    };
    _.h.Mj = function(a) {
        _.wj(!this.Ob, "Cannot attach iframe in disposed context");
        a = new _.dm(a);
        a.Ff() || _.fm(a, a.ma());
        a.Zg() || _.gm(a, "..");
        a.getOrigin() || a.li(_.sg(a.getUrl()));
        a.vd() || _.em(a, _.Zj(a.ma(), this.jg));
        var b = a.vd();
        if (this.xf[b]) return this.xf[b];
        var c = a.Ff(),
            d = c;
        a.getOrigin() && (d = c + "|" + a.getOrigin());
        var e = a.Zg(),
            f = _.Rl(a);
        f || (f = (f = a.Ma()) && (f.getAttribute("data-postorigin") || f.src) || a.getUrl(), f = _.te(f, "rpctoken"));
        im(a, _.Nl(d, e, f, a.S._popupWindow));
        d = ((window.gadgets || {}).rpc || {}).setAuthToken;
        f && d && d(c, f);
        var g = new _.pm(this, c, b, a),
            k = a.S.messageHandlersFilter;
        _.Vl(a.S.messageHandlers, function(l, m) {
            g.register(m, l, k)
        });
        _.hm(a) && g.sj();
        _.qm(g, "_g_rpcReady");
        return g
    };
    _.h.oD = function(a) {
        _.em(a, null);
        var b = a.ma();
        !b || rm.test(b) && !this.Ab().document.getElementById(b) || (_.Df("Ignoring requested iframe ID - " + b), a.Me(null))
    };
    var nm = function(a, b) {
        var c = _.te(a, b);
        c || (c = _.yf(_.te(a, "jcp", ""))[b]);
        return c || ""
    };
    _.om.prototype.Wh = function(a) {
        _.wj(!this.Ob, "Cannot open iframe in disposed context");
        var b = new _.dm(a);
        sm(this, b);
        var c = b.vd();
        if (c && this.xf[c]) return this.xf[c];
        this.oD(b);
        c = b.getUrl();
        _.wj(c, "No url for new iframe");
        var d = b.S.queryParams || {};
        d.usegapi = "1";
        _.oj(b, d);
        d = this.lB && this.lB(c, b);
        d || (d = b.S.where, _.wj(!!d, "No location for new iframe"), c = _.jk(c, d, a), b.S.iframeEl = c, d = c.getAttribute("id"));
        _.fm(b, d).Me(d);
        b.li(_.sg(b.S.eurl || ""));
        this.gC && this.gC(b, b.Ma());
        c = this.Mj(a);
        c.Rw && c.Rw(c, a);
        (a =
            b.S.onCreate) && a(c);
        b.S.disableRelayOpen || c.vp("_open");
        return c
    };
    var tm = function(a, b, c) {
            var d = b.S.canvasUrl;
            if (!d) return c;
            _.wj(!b.S.allowPost && !b.S.forcePost, "Post is not supported when using canvas url");
            var e = b.getUrl();
            _.wj(e && _.sg(e) === a.Cd && _.sg(d) === a.Cd, "Wrong origin for canvas or hidden url " + d);
            b.setUrl(d);
            _.Sl(b);
            b.S.canvasUrl = null;
            return function(f) {
                var g = f.Ab(),
                    k = g.location.hash;
                k = _.ik(e) + (/#/.test(e) ? k.replace(/^#/, "&") : k);
                g.location.replace(k);
                c && c(f)
            }
        },
        um = function(a, b, c) {
            var d = b.S.relayOpen;
            if (d) {
                var e = a.$a;
                d instanceof _.pm ? (e = d, _.pj(b, 0)) : 0 < Number(d) &&
                    _.pj(b, Number(d) - 1);
                if (e) {
                    _.wj(!!e.GC, "Relaying iframe open is disabled");
                    if (d = b.Ql())
                        if (d = _.km[d]) b.Go(a), d(b.value()), b.Go(null);
                    b.S.openerIframe = null;
                    c.resolve(e.GC(b));
                    return !0
                }
            }
            return !1
        },
        vm = function(a, b, c) {
            var d = b.Ql();
            if (d)
                if (_.wj(!!_.lm, "Defer style is disabled, when requesting style " + d), _.jm[d]) sm(a, b);
                else return mm(d, function() {
                    _.wj(!!_.jm[d], "Fail to load style - " + d);
                    c.resolve(a.open(b.value()))
                }), !0;
            return !1
        };
    _.om.prototype.open = function(a, b) {
        _.wj(!this.Ob, "Cannot open iframe in disposed context");
        var c = new _.dm(a);
        b = tm(this, c, b);
        var d = new $l(b);
        (b = c.getUrl()) && c.setUrl(_.ik(b));
        if (um(this, c, d) || vm(this, c, d) || um(this, c, d)) return d.promise;
        if (null != Tl(c)) {
            var e = setTimeout(function() {
                    g.Ma().src = "about:blank";
                    d.reject({
                        timeout: "Exceeded time limit of :" + Tl(c) + "milliseconds"
                    })
                }, Tl(c)),
                f = d.resolve;
            d.resolve = function(k) {
                clearTimeout(e);
                f(k)
            }
        }
        c.S.waitForOnload && Ql(c.Hl(), function() {
            d.resolve(g)
        });
        var g = this.Wh(a);
        c.S.waitForOnload || d.resolve(g);
        return d.promise
    };
    _.om.prototype.HI = _.ja(19);
    var wm = function(a, b) {
        var c = a.$a,
            d = !0;
        b.filter && (d = b.filter.call(b.Hf, b.params));
        return _.Kk(d).then(function(e) {
            return e && c ? (b.zL && b.zL.call(a, b.params), e = b.sender ? b.sender(b.params) : _.qm(c, b.message, b.params), b.T1 ? e.then(function() {
                return !0
            }) : !0) : !1
        })
    };
    _.h = _.om.prototype;
    _.h.Sy = function(a, b, c) {
        a = wm(this, {
            sender: function(d) {
                var e = _.Wl.$a;
                _.Vl(_.Wl.xf, function(f) {
                    f !== e && _.qm(f, "_g_wasClosed", d)
                });
                return _.qm(e, "_g_closeMe", d)
            },
            message: "_g_closeMe",
            params: a,
            Hf: c,
            filter: this.uA("onCloseSelfFilter")
        });
        b = new $l(b);
        b.resolve(a);
        return b.promise
    };
    _.h.lD = function(a, b, c) {
        a = a || {};
        b = new $l(b);
        b.resolve(wm(this, {
            message: "_g_restyleMe",
            params: a,
            Hf: c,
            filter: this.uA("onRestyleSelfFilter"),
            T1: !0,
            zL: this.WN
        }));
        return b.promise
    };
    _.h.WN = function(a) {
        "auto" === a.height && (a.height = _.Pl())
    };
    _.h.IM = _.ja(20);
    _.h.cN = _.ja(21);
    var sm = function(a, b) {
        var c = b.Ql();
        if (c) {
            b.Od(null);
            var d = _.jm[c];
            _.wj(d, "No such style: " + c);
            b.Go(a);
            d(b.value());
            b.Go(null)
        }
    };
    _.pm = function(a, b, c, d) {
        this.Ob = !1;
        this.Ji = a;
        this.nD = b;
        this.jg = c;
        this.Ba = d;
        this.kM = this.Ba.Zg();
        this.Cd = this.Ba.getOrigin();
        this.WW = this.Ba.Ma();
        this.yN = this.Ba.S.where;
        this.qo = [];
        this.vp("_default");
        a = this.Ba.S.apis || [];
        for (b = 0; b < a.length; b++) this.vp(a[b]);
        this.Ji.xf[c] = this
    };
    _.h = _.pm.prototype;
    _.h.Vn = _.ja(10);
    _.h.Da = function() {
        if (!this.Ob) {
            for (var a = 0; a < this.qo.length; a++) this.unregister(this.qo[a]);
            delete _.Wl.xf[this.vd()];
            this.Ob = !0
        }
    };
    _.h.getContext = function() {
        return this.Ji
    };
    _.h.getOptions = function() {
        return this.Ba
    };
    _.h.Ff = function() {
        return this.nD
    };
    _.h.Zg = function() {
        return this.kM
    };
    _.h.vd = function() {
        return this.jg
    };
    _.h.Ma = function() {
        return this.WW
    };
    _.h.Db = function() {
        return this.yN
    };
    _.h.Rf = function(a) {
        this.yN = a
    };
    _.h.sj = function() {
        (0, this.Ba.S._rpcReadyFn)()
    };
    _.h.$M = function(a, b) {
        this.Ba.value()[a] = b
    };
    _.h.Gu = _.ja(22);
    _.h.lc = function() {
        return this.Ba.value()
    };
    _.h.ma = function() {
        return this.Ba.ma()
    };
    _.h.getOrigin = function() {
        return this.Cd
    };
    _.h.register = function(a, b, c) {
        _.wj(!this.Ob, "Cannot register handler on disposed iframe " + a);
        _.wj((c || _.xm)(this), "Rejecting untrusted message " + a);
        c = this.jg + ":" + this.Ji.jg + ":" + a;
        1 == _.ne(Xl, c, []).push(b) && (this.qo.push(a), _.Cl(c, ym(c, this, "_g_wasClosed" === a)))
    };
    _.h.unregister = function(a, b) {
        var c = this.jg + ":" + this.Ji.jg + ":" + a,
            d = Xl[c];
        d && (b ? (b = _.vj.call(d, b), 0 <= b && d.splice(b, 1)) : d.splice(0, d.length), 0 == d.length && (b = _.vj.call(this.qo, a), 0 <= b && this.qo.splice(b, 1), _.Dl(c)))
    };
    _.h.PU = function() {
        return this.qo
    };
    _.h.vp = function(a) {
        this.py = this.py || [];
        if (!(0 <= _.vj.call(this.py, a))) {
            this.py.push(a);
            a = Yl[a] || {
                map: {}
            };
            for (var b in a.map) _.pe(a.map, b) && this.register(b, a.map[b], a.filter)
        }
    };
    _.h.Ab = function() {
        if (!_.xm(this)) return null;
        var a = this.Ba.S._popupWindow;
        if (a) return a;
        var b = this.nD.split("/");
        a = this.getContext().Ab();
        for (var c = 0; c < b.length && a; c++) {
            var d = b[c];
            a = ".." === d ? a == a.parent ? a.opener : a.parent : a.frames[d]
        }
        return a
    };
    _.zm = function(a) {
        var b = {};
        if (a)
            for (var c in a) _.pe(a, c) && _.pe(am, c) && bm.test(a[c]) && (b[c] = a[c]);
        return b
    };
    _.h = _.pm.prototype;
    _.h.close = function(a, b) {
        return _.qm(this, "_g_close", a, b)
    };
    _.h.Ew = _.ja(23);
    _.h.xo = function(a, b) {
        return _.qm(this, "_g_restyleDone", a, b)
    };
    _.h.sS = function(a) {
        return this.getContext().Sy(a, void 0, this)
    };
    _.h.d_ = function(a) {
        if (a && "object" === typeof a) return this.getContext().lD(a, void 0, this)
    };
    _.h.e_ = function(a) {
        var b = this.Ba.S.onRestyle;
        b && b.call(this, a, this);
        a = a && "object" === typeof a ? _.zm(a) : {};
        (b = this.Ma()) && a && "object" === typeof a && (_.pe(a, "height") && (a.height = _.cm(a.height)), _.pe(a, "width") && (a.width = _.cm(a.width)), _.qe(a, b.style))
    };
    _.h.tS = function(a) {
        var b = this.Ba.S.onClose;
        b && b.call(this, a, this);
        this.Py && this.Py() || (b = this.Ma()) && b.parentNode && b.parentNode.removeChild(b);
        if (b = this.Ba.S.controller) {
            var c = {};
            c.frameName = this.vd();
            _.qm(b, "_g_disposeControl", c)
        }
        Am(this.jg + ":" + this.Ji.jg + ":_g_wasClosed", a, this)
    };
    _.h.YL = _.ja(24);
    _.h.Hk = function(a, b) {
        this.register("_g_wasClosed", a, b)
    };
    _.h.W1 = function() {
        delete this.getContext().xf[this.vd()];
        this.getContext().Ab().setTimeout((0, _.R)(function() {
            this.Da()
        }, this), 0)
    };
    _.h.send = function(a, b, c, d) {
        _.wj(!this.Ob, "Cannot send message to disposed iframe - " + a);
        _.wj((d || _.xm)(this), "Wrong target for message " + a);
        c = new $l(c);
        _.Gl(this.nD, this.Ji.jg + ":" + this.jg + ":" + a, c.resolve, b);
        return c.promise
    };
    _.qm = function(a, b, c, d) {
        return a.send(b, c, d, _.Bm)
    };
    _.pm.prototype.hZ = function(a) {
        return a
    };
    _.pm.prototype.ping = function(a, b) {
        return _.qm(this, "_g_ping", b, a)
    };
    var rm, ym, Am;
    rm = /^[\w\.\-]*$/;
    _.xm = function(a) {
        return a.Cd === a.getContext().Cd
    };
    _.Bm = function() {
        return !0
    };
    ym = function(a, b, c) {
        return function(d) {
            if (!b.Ob) {
                var e = this.origin,
                    f = b.getOrigin();
                _.wj(e === f, "Wrong origin " + e + " != " + f);
                e = this.callback;
                d = Am(a, d, b);
                !c && 0 < d.length && _.Ok(d).then(e)
            }
        }
    };
    Am = function(a, b, c) {
        a = Xl[a];
        if (!a) return [];
        for (var d = [], e = 0; e < a.length; e++) d.push(_.Kk(a[e].call(c, b, c)));
        return d
    };
    _.Cm = function(a, b, c) {
        _.wj("_default" != a, "Cannot update default api");
        Yl[a] = {
            map: b,
            filter: c
        }
    };
    _.Dm = function(a, b, c) {
        _.wj("_default" != a, "Cannot update default api");
        _.ne(Yl, a, {
            map: {},
            filter: _.xm
        }).map[b] = c
    };
    _.Em = function(a, b) {
        _.ne(Yl, "_default", {
            map: {},
            filter: _.Bm
        }).map[a] = b;
        _.Vl(_.Wl.xf, function(c) {
            c.register(a, b, _.Bm)
        })
    };
    _.Fm = function() {
        return _.Wl
    };
    Xl = _.oe();
    Yl = _.oe();
    _.Wl = new _.om;
    _.Em("_g_rpcReady", _.pm.prototype.sj);
    _.Em("_g_discover", _.pm.prototype.PU);
    _.Em("_g_ping", _.pm.prototype.hZ);
    _.Em("_g_close", _.pm.prototype.sS);
    _.Em("_g_closeMe", _.pm.prototype.tS);
    _.Em("_g_restyle", _.pm.prototype.d_);
    _.Em("_g_restyleMe", _.pm.prototype.e_);
    _.Em("_g_wasClosed", _.pm.prototype.W1);

    var Km;
    _.mj.prototype.Eo = _.Uc(17, function(a) {
        this.S.apis = a;
        return this
    });
    _.Gm = function(a, b) {
        a.S.onClose = b;
        return a
    };
    _.Hm = function(a) {
        this.S = a || {}
    };
    _.Hm.prototype.value = function() {
        return this.S
    };
    _.Hm.prototype.getIframe = function() {
        return this.S.iframe
    };
    _.Im = function(a, b) {
        a.S.role = b;
        return a
    };
    _.Hm.prototype.sj = function(a) {
        this.S.setRpcReady = a;
        return this
    };
    _.Hm.prototype.Pk = function(a) {
        this.S.rpctoken = a;
        return this
    };
    _.Jm = function(a) {
        a.S.selfConnect = !0;
        return a
    };
    Km = function(a) {
        this.S = a || {}
    };
    Km.prototype.value = function() {
        return this.S
    };
    var Lm = function(a) {
        var b = new Km;
        b.S.role = a;
        return b
    };
    Km.prototype.NI = function() {
        return this.S.role
    };
    Km.prototype.qc = function(a) {
        this.S.handler = a;
        return this
    };
    Km.prototype.tb = function() {
        return this.S.handler
    };
    var Mm = function(a, b) {
        a.S.filter = b;
        return a
    };
    Km.prototype.Eo = function(a) {
        this.S.apis = a;
        return this
    };
    var Nm = function(a) {
        a.S.runOnce = !0;
        return a
    };
    _.h = _.pm.prototype;
    _.h.vS = function(a) {
        var b = new _.dm(a);
        a = new _.Hm(b.value());
        if (a.S.selfConnect) var c = this;
        else(_.wj(Om.test(b.getOrigin()), "Illegal origin for connected iframe - " + b.getOrigin()), c = this.getContext().xf[b.vd()], c) ? _.hm(b) && (c.sj(), _.qm(c, "_g_rpcReady")) : (b = _.em(_.gm(_.fm(new _.dm, b.Ff()), b.Zg()).li(b.getOrigin()), b.vd()).sj(_.hm(b)).Pk(_.Rl(b)), c = this.getContext().Mj(b.value()));
        b = this.getContext();
        var d = a.S.role;
        a = a.S.data;
        Pm(b);
        d = d || "";
        _.ne(b.Xy, d, []).push({
            Hf: c,
            data: a
        });
        Qm(c, a, b.yC[d])
    };
    _.h.Rw = function(a, b) {
        (new _.dm(b)).S._relayedDepth || (b = {}, _.Jm(_.Im(new _.Hm(b), "_opener")), _.qm(a, "_g_connect", b))
    };
    _.h.GC = function(a) {
        var b = this,
            c = a.S.messageHandlers,
            d = a.S.messageHandlersFilter,
            e = a.S.onClose;
        _.Gm(_.rj(_.qj(a, null), null), null);
        return _.qm(this, "_g_open", a.value()).then(function(f) {
            var g = new _.dm(f[0]),
                k = g.vd();
            f = new _.dm;
            var l = b.Zg(),
                m = g.Zg();
            _.gm(_.fm(f, b.Ff() + "/" + g.Ff()), m + "/" + l);
            _.em(f, k);
            f.li(g.getOrigin());
            f.Eo(g.S.apis);
            f.Pk(_.Rl(a));
            _.qj(f, c);
            _.rj(f, d);
            _.Gm(f, e);
            (g = b.getContext().xf[k]) || (g = b.getContext().Mj(f.value()));
            return g
        })
    };
    _.h.oD = function(a) {
        var b = a.getUrl();
        _.wj(!b || _.Lj.test(b), "Illegal url for new iframe - " + b);
        var c = a.Hl().value();
        b = {};
        for (var d in c) _.pe(c, d) && _.pe(Rm, d) && (b[d] = c[d]);
        _.pe(c, "style") && (d = c.style, "object" === typeof d && (b.style = _.zm(d)));
        a.value().attributes = b
    };
    _.h.UY = function(a) {
        a = new _.dm(a);
        this.oD(a);
        var b = a.S._relayedDepth || 0;
        a.S._relayedDepth = b + 1;
        a.S.openerIframe = this;
        var c = _.Rl(a);
        a.Pk(null);
        return this.getContext().open(a.value()).then((0, _.R)(function(d) {
            var e = (new _.dm(d.lc())).S.apis,
                f = new _.dm;
            _.Sm(d, this, f);
            0 == b && _.Im(new _.Hm(f.value()), "_opener");
            f.sj(!0);
            f.Pk(c);
            _.qm(d, "_g_connect", f.value());
            f = new _.dm;
            _.em(_.gm(_.fm(f, d.Ff()), d.kM), d.vd()).li(d.getOrigin()).Eo(e);
            return f.value()
        }, this))
    };
    _.h.c_ = function(a) {
        this.getContext().Jj(function(b) {
            b.send("_g_wasRestyled", a, void 0, _.Bm)
        }, null, _.Bm)
    };
    var Om, Rm, Tm;
    Om = /^https?:\/\/[^\/%\\?#\s]+$/i;
    Rm = {
        longdesc: !0,
        name: !0,
        src: !0,
        frameborder: !0,
        marginwidth: !0,
        marginheight: !0,
        scrolling: !0,
        align: !0,
        height: !0,
        width: !0,
        id: !0,
        "class": !0,
        title: !0,
        tabindex: !0,
        hspace: !0,
        vspace: !0,
        allowtransparency: !0
    };
    _.Sm = function(a, b, c) {
        var d = a.Ff(),
            e = b.Zg();
        _.gm(_.fm(c, a.Zg() + "/" + b.Ff()), e + "/" + d);
        _.em(c, b.vd()).li(b.getOrigin())
    };
    Tm = _.Wl.$a;
    Tm && Tm.register("_g_restyleDone", _.pm.prototype.c_, _.Bm);
    _.Em("_g_connect", _.pm.prototype.vS);
    var Um = {};
    Um._g_open = _.pm.prototype.UY;
    _.Cm("_open", Um, _.Bm);
    _.om.prototype.ready = function(a, b, c, d) {
        var e = b || {},
            f = this.$a;
        this.Jj(function(k) {
            _.Vl(e, function(l, m) {
                k.register(m, l, d)
            }, this);
            k !== f && k.send("_ready", g, void 0, d)
        }, void 0, d);
        var g = a || {};
        g.height = g.height || "auto";
        this.WN(g);
        f && f.send("_ready", g, c, _.Bm)
    };
    _.om.prototype.Vy = _.ja(25);
    var Pm = function(a) {
        a.Xy || (a.Xy = _.oe(), a.yC = _.oe())
    };
    _.om.prototype.ky = function(a, b, c, d) {
        Pm(this);
        "object" === typeof a ? (b = new Km(a), c = b.NI() || "") : (b = Mm(Lm(a).qc(b).Eo(c), d), c = a);
        d = this.Xy[c] || [];
        a = !1;
        for (var e = 0; e < d.length && !a; e++) Qm(this.xf[d[e].Hf.vd()], d[e].data, [b]), a = b.S.runOnce;
        c = _.ne(this.yC, c, []);
        a || b.S.dontWait || c.push(b)
    };
    _.om.prototype.aM = _.ja(26);
    var Qm = function(a, b, c) {
        c = c || [];
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            if (e && a) {
                var f = e.S.filter || _.xm;
                if (a && f(a)) {
                    f = e.S.apis || [];
                    for (var g = 0; g < f.length; g++) a.vp(f[g]);
                    e.tb() && e.tb()(a, b);
                    e.S.runOnce && (c.splice(d, 1), --d)
                }
            }
        }
    };
    _.om.prototype.Jj = function(a, b, c) {
        this.ky(Nm(Mm(Lm("_opener").qc(a).Eo(b), c)).value())
    };

    _.pm.prototype.Ew = _.Uc(23, function(a, b) {
        return _.qm(this, "_g_restyle", a, b)
    });
    _.pm.prototype.Gu = _.Uc(22, function(a) {
        return this.Ba.value()[a]
    });
    _.Vm = function(a) {
        for (var b = _.oe(), c = 0; c < a.length; c++) b[a[c]] = !0;
        return function(d) {
            return !!b[d.Cd]
        }
    };
    _.om.prototype.lB = function() {};
    _.om.prototype.gC = function() {};
    _.pm.prototype.Py = function() {};

    _.Se.A4 = function(a) {
        var b = [];
        if (1 < arguments.length)
            for (var c = 0, d; d = arguments[c]; ++c) b.push(d);
        else b = a;
        return function(e) {
            for (var f = 0; b[f]; ++f)
                if (e === b[f]) return !0;
            return !1
        }
    };
    _.Se.o8 = function(a) {
        return function(b) {
            return a.test(b)
        }
    };
    _.Se.bP = function(a) {
        return "undefined" !== typeof a
    };
    _.Se.V6 = function(a) {
        return "string" === typeof a && 0 < a.length
    };
    _.Se.M2 = function(a) {
        return "boolean" === typeof a
    };
    _.Se.Z5 = function(a) {
        return function(b) {
            for (var c in a)
                if (a.hasOwnProperty(c) && !(0, a[c])(b[c])) return !1;
            return !0
        }
    };

    _.Oe = _.Oe || {};
    _.Oe.makeClosure = function(a, b, c) {
        for (var d = [], e = 2, f = arguments.length; e < f; ++e) d.push(arguments[e]);
        return function() {
            for (var g = d.slice(), k = 0, l = arguments.length; k < l; ++k) g.push(arguments[k]);
            return b.apply(a, g)
        }
    };
    _.Oe.nr = function(a) {
        var b, c, d = {};
        for (b = 0; c = a[b]; ++b) d[c] = c;
        return d
    };

    _.Oe = _.Oe || {};
    (function() {
        function a(d) {
            b = d["core.util"] || {}
        }
        var b = {},
            c = {};
        _.Se && _.Se.register("core.util", null, a);
        _.Oe.getFeatureParameters = function(d) {
            return "undefined" === typeof b[d] ? null : b[d]
        };
        _.Oe.hasFeature = function(d) {
            return "undefined" !== typeof b[d]
        };
        _.Oe.dba = function() {
            return c
        }
    })();

    _.gi = function(a) {
        var b = window;
        a = (a || b.location.href).match(/.*(\?|#|&)usegapi=([^&#]+)/) || [];
        return "1" === decodeURIComponent(a[a.length - 1] || "")
    };

    _.dn = _.oe();

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Sq, Tq, Vq, Wq, Xq, Yq, Zq, $q, ar, dr, er, fr, gr, kr, or, pr, qr;
    _.Gq = function(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };
    _.Hq = function(a, b, c, d) {
        return Array.prototype.splice.apply(a, _.Gq(arguments, 1))
    };
    _.Iq = function(a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    };
    _.Jq = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    _.h = _.Jq.prototype;
    _.h.clone = function() {
        return new _.Jq(this.x, this.y)
    };
    _.h.equals = function(a) {
        return a instanceof _.Jq && _.Iq(this, a)
    };
    _.h.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    _.h.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    _.h.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    _.h.translate = function(a, b) {
        a instanceof _.Jq ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
        return this
    };
    _.h.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    };
    _.Kq = function(a, b) {
        this.width = a;
        this.height = b
    };
    _.h = _.Kq.prototype;
    _.h.clone = function() {
        return new _.Kq(this.width, this.height)
    };
    _.h.aspectRatio = function() {
        return this.width / this.height
    };
    _.h.isEmpty = function() {
        return !(this.width * this.height)
    };
    _.h.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    _.h.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    _.h.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    _.h.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    };
    _.Lq = function(a) {
        return "CSS1Compat" == a.compatMode
    };
    _.Mq = function(a) {
        a = a.document;
        a = _.Lq(a) ? a.documentElement : a.body;
        return new _.Kq(a.clientWidth, a.clientHeight)
    };
    _.Nq = function(a) {
        return _.Mq(a || window)
    };
    _.Oq = function(a) {
        return a.scrollingElement ? a.scrollingElement : !_.wc && _.Lq(a) ? a.documentElement : a.body || a.documentElement
    };
    _.Pq = function(a) {
        var b = _.Oq(a);
        a = a.parentWindow || a.defaultView;
        return _.sc && _.Pc("10") && a.pageYOffset != b.scrollTop ? new _.Jq(b.scrollLeft, b.scrollTop) : new _.Jq(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    };
    _.Qq = function(a, b, c, d) {
        return _.Rd(a.rb, b, c, d)
    };
    _.Rq = function(a) {
        a.FB = void 0;
        a.lb = function() {
            return a.FB ? a.FB : a.FB = new a
        }
    };
    Sq = function(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        _.Vc.call(this, c + a[d])
    };
    _.K(Sq, _.Vc);
    Sq.prototype.name = "AssertionError";
    Tq = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    _.Uq = function(a) {
        if (a instanceof _.Yb && a.constructor === _.Yb) return a.NL;
        _.eb(a);
        return "type_error:SafeStyle"
    };
    Vq = /\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g;
    Wq = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
    Xq = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/;
    Yq = /\/\*/;
    Zq = function(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b) return !1;
                b = !0
            } else if ("[" == e) {
                if (!b) return !1;
                b = !1
            } else if (!b && !c.test(e)) return !1
        }
        return b
    };
    $q = function(a) {
        return a.replace(Wq, function(b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function(g, k, l) {
                f = k;
                return l
            });
            b = (_.yd(d) || _.Wb).xd();
            return c + f + b + f + e
        })
    };
    ar = function(a) {
        if (a instanceof _.Ub) return 'url("' + _.td(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        if (a instanceof _.Pb) a = _.Qb(a);
        else {
            a = String(a);
            var b = a.replace(Vq, "$1").replace(Vq, "$1").replace(Wq, "url");
            if (Xq.test(b)) {
                if (b = !Yq.test(a)) {
                    for (var c = b = !0, d = 0; d < a.length; d++) {
                        var e = a.charAt(d);
                        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
                    }
                    b = b && c && Zq(a)
                }
                a = b ? $q(a) : "zClosurez"
            } else a = "zClosurez"
        }
        if (/[{;}]/.test(a)) throw new Sq("Value does not allow [{;}], got: %s.", [a]);
        return a
    };
    _.br = function(a) {
        var b = "",
            c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("g`" + c);
                var d = a[c];
                null != d && (d = Array.isArray(d) ? _.qb(d, ar).join(" ") : ar(d), b += c + ":" + d + ";")
            }
        return b ? new _.Yb(b, _.Xb) : _.Zb
    };
    _.cr = function(a) {
        if (a instanceof _.ac && a.constructor === _.ac) return a.ML;
        _.eb(a);
        return "type_error:SafeStyleSheet"
    };
    dr = /^[a-zA-Z0-9-]+$/;
    er = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    };
    fr = {
        APPLET: !0,
        BASE: !0,
        EMBED: !0,
        IFRAME: !0,
        LINK: !0,
        MATH: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    };
    gr = function(a) {
        var b = _.Ad(_.hc),
            c = b.Hh(),
            d = [],
            e = function(f) {
                Array.isArray(f) ? _.ob(f, e) : (f = _.Ad(f), d.push(_.fc(f).toString()), f = f.Hh(), 0 == c ? c = f : 0 != f && c != f && (c = null))
            };
        _.ob(a, e);
        return _.gc(d.join(_.fc(b).toString()), c)
    };
    _.hr = function(a) {
        return gr(Array.prototype.slice.call(arguments))
    };
    _.ir = function(a, b, c) {
        var d = String(a);
        if (!dr.test(d)) throw Error("k");
        if (d.toUpperCase() in fr) throw Error("k");
        a = String(a);
        d = null;
        var e = "<" + a,
            f = "";
        if (b)
            for (l in b)
                if (Object.prototype.hasOwnProperty.call(b, l)) {
                    if (!dr.test(l)) throw Error("k");
                    var g = b[l];
                    if (null != g) {
                        var k = l;
                        if (g instanceof _.Pb) g = _.Qb(g);
                        else if ("style" == k.toLowerCase()) {
                            if (!_.bb(g)) throw Error("k");
                            g instanceof _.Yb || (g = _.br(g));
                            g = _.Uq(g)
                        } else {
                            if (/^on/i.test(k)) throw Error("k");
                            if (k.toLowerCase() in er)
                                if (g instanceof _.od) g = _.qd(g);
                                else if (g instanceof _.Ub) g = _.td(g);
                            else if ("string" === typeof g) g = (_.yd(g) || _.Wb).xd();
                            else throw Error("k");
                        }
                        g.Ph && (g = g.xd());
                        k = k + '="' + _.md(String(g)) + '"';
                        f += " " + k
                    }
                }
        var l = e + f;
        null == c ? c = [] : Array.isArray(c) || (c = [c]);
        !0 === Tq[a.toLowerCase()] ? l += ">" : (c = _.hr(c), l += ">" + _.fc(c).toString() + "</" + a + ">", d = c.Hh());
        (b = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(b) ? 0 : null);
        return _.gc(l, d)
    };
    _.jr = function(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    };
    kr = function(a) {
        return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
            return c + d.toUpperCase()
        })
    };
    _.lr = function(a, b, c) {
        return _.Xd(document, arguments)
    };
    _.mr = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    };
    _.nr = function(a) {
        var b;
        if (_.Id && !(_.sc && _.Pc("9") && !_.Pc("10") && _.A.SVGElement && a instanceof _.A.SVGElement) && (b = a.parentElement)) return b;
        b = a.parentNode;
        return _.ge(b) ? b : null
    };
    or = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    pr = {
        IMG: " ",
        BR: "\n"
    };
    qr = function(a, b, c) {
        if (!(a.nodeName in or))
            if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in pr) b.push(pr[a.nodeName]);
        else
            for (a = a.firstChild; a;) qr(a, b, c), a = a.nextSibling
    };
    _.rr = function(a) {
        if (_.Hd && null !== a && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        else {
            var b = [];
            qr(a, b, !0);
            a = b.join("")
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        _.Hd || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    };
    _.sr = function(a) {
        var b = [];
        qr(a, b, !1);
        return b.join("")
    };
    _.tr = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    _.h = _.tr.prototype;
    _.h.Rc = function() {
        return this.right - this.left
    };
    _.h.getHeight = function() {
        return this.bottom - this.top
    };
    _.h.clone = function() {
        return new _.tr(this.top, this.right, this.bottom, this.left)
    };
    _.h.contains = function(a) {
        return this && a ? a instanceof _.tr ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    _.h.expand = function(a, b, c, d) {
        _.bb(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
        return this
    };
    _.h.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    _.h.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    _.h.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    _.h.translate = function(a, b) {
        a instanceof _.Jq ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
        return this
    };
    _.h.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    var wr, Cr, Ar, Fr, Rr, Sr;
    _.vr = function(a, b, c) {
        if ("string" === typeof b)(b = _.ur(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d],
                    f = _.ur(c, d);
                f && (c.style[f] = e)
            }
    };
    wr = {};
    _.ur = function(a, b) {
        var c = wr[b];
        if (!c) {
            var d = _.jr(b);
            c = d;
            void 0 === a.style[d] && (d = (_.wc ? "Webkit" : _.vc ? "Moz" : _.sc ? "ms" : _.rc ? "O" : null) + kr(d), void 0 !== a.style[d] && (c = d));
            wr[b] = c
        }
        return c
    };
    _.xr = function(a, b) {
        var c = _.Od(a);
        return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    };
    _.yr = function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : null
    };
    _.zr = function(a, b) {
        return _.xr(a, b) || _.yr(a, b) || a.style && a.style[b]
    };
    _.Br = function(a, b, c) {
        if (b instanceof _.Jq) {
            var d = b.x;
            b = b.y
        } else d = b, b = c;
        a.style.left = Ar(d, !1);
        a.style.top = Ar(b, !1)
    };
    Cr = function(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    };
    _.Gr = function(a, b) {
        b = b || _.Oq(document);
        var c = b || _.Oq(document);
        var d = _.Dr(a),
            e = _.Dr(c),
            f = _.Er(c);
        if (c == _.Oq(document)) {
            var g = d.x - c.scrollLeft;
            d = d.y - c.scrollTop;
            _.sc && !_.Rc(10) && (g += f.left, d += f.top)
        } else g = d.x - e.x - f.left, d = d.y - e.y - f.top;
        a = Fr(a);
        f = c.clientHeight - a.height;
        e = c.scrollLeft;
        var k = c.scrollTop;
        e += Math.min(g, Math.max(g - (c.clientWidth - a.width), 0));
        k += Math.min(d, Math.max(d - f, 0));
        c = new _.Jq(e, k);
        b.scrollLeft = c.x;
        b.scrollTop = c.y
    };
    _.Dr = function(a) {
        var b = _.Od(a),
            c = new _.Jq(0, 0);
        var d = b ? _.Od(b) : document;
        d = !_.sc || _.Rc(9) || _.Lq(_.Pd(d).rb) ? d.documentElement : d.body;
        if (a == d) return c;
        a = Cr(a);
        b = _.Pq(_.Pd(b).rb);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    };
    _.Ir = function(a, b) {
        var c = new _.Jq(0, 0),
            d = _.Ud(_.Od(a));
        if (!_.pc(d, "parent")) return c;
        do {
            var e = d == b ? _.Dr(a) : _.Hr(a);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
        return c
    };
    _.Hr = function(a) {
        a = Cr(a);
        return new _.Jq(a.left, a.top)
    };
    _.Jr = function(a, b, c) {
        if (b instanceof _.Kq) c = b.height, b = b.width;
        else if (void 0 == c) throw Error("F");
        a.style.width = Ar(b, !0);
        a.style.height = Ar(c, !0)
    };
    Ar = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    };
    _.Kr = function(a) {
        var b = Fr;
        if ("none" != _.zr(a, "display")) return b(a);
        var c = a.style,
            d = c.display,
            e = c.visibility,
            f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    };
    Fr = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = _.wc && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Cr(a), new _.Kq(a.right - a.left, a.bottom - a.top)) : new _.Kq(b, c)
    };
    _.Lr = function(a, b) {
        a.style.display = b ? "" : "none"
    };
    _.Nr = function(a) {
        var b = _.Pd(void 0),
            c = b.ub();
        if (_.sc && c.createStyleSheet) return b = c.createStyleSheet(), _.Mr(b, a), b;
        c = _.Qq(b, "HEAD")[0];
        if (!c) {
            var d = _.Qq(b, "BODY")[0];
            c = b.ta("HEAD");
            d.parentNode.insertBefore(c, d)
        }
        d = b.ta("STYLE");
        var e = _.ad();
        e && d.setAttribute("nonce", e);
        _.Mr(d, a);
        b.appendChild(c, d);
        return d
    };
    _.Mr = function(a, b) {
        b = _.cr(b);
        _.sc && void 0 !== a.cssText ? a.cssText = b : _.A.trustedTypes ? _.ie(a, b) : a.innerHTML = b
    };
    _.Or = function(a) {
        return "rtl" == _.zr(a, "direction")
    };
    _.Pr = _.vc ? "MozUserSelect" : _.wc || _.tc ? "WebkitUserSelect" : null;
    _.Qr = function(a, b) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var c = a.style.left,
            d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        b = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return +b
    };
    Rr = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    Sr = function(a, b) {
        if ("none" == _.yr(a, b + "Style")) return 0;
        b = _.yr(a, b + "Width");
        return b in Rr ? Rr[b] : _.Qr(a, b)
    };
    _.Er = function(a) {
        if (_.sc && !_.Rc(9)) {
            var b = Sr(a, "borderLeft"),
                c = Sr(a, "borderRight"),
                d = Sr(a, "borderTop");
            a = Sr(a, "borderBottom");
            return new _.tr(d, c, a, b)
        }
        b = _.xr(a, "borderLeftWidth");
        c = _.xr(a, "borderRightWidth");
        d = _.xr(a, "borderTopWidth");
        a = _.xr(a, "borderBottomWidth");
        return new _.tr(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Py = function(a) {
        this.u1 = a
    };
    _.Py.prototype.toString = function() {
        return this.u1
    };
    _.Qy = function(a) {
        _.ri.call(this);
        this.Th = 1;
        this.ow = [];
        this.uw = 0;
        this.nf = [];
        this.vi = {};
        this.OR = !!a
    };
    _.K(_.Qy, _.ri);
    _.h = _.Qy.prototype;
    _.h.subscribe = function(a, b, c) {
        var d = this.vi[a];
        d || (d = this.vi[a] = []);
        var e = this.Th;
        this.nf[e] = a;
        this.nf[e + 1] = b;
        this.nf[e + 2] = c;
        this.Th = e + 3;
        d.push(e);
        return e
    };
    _.h.us = _.ja(40);
    _.h.unsubscribe = function(a, b, c) {
        if (a = this.vi[a]) {
            var d = this.nf;
            if (a = _.hi(a, function(e) {
                    return d[e + 1] == b && d[e + 2] == c
                })) return this.Cj(a)
        }
        return !1
    };
    _.h.Cj = function(a) {
        var b = this.nf[a];
        if (b) {
            var c = this.vi[b];
            0 != this.uw ? (this.ow.push(a), this.nf[a + 1] = _.cb) : (c && _.oi(c, a), delete this.nf[a], delete this.nf[a + 1], delete this.nf[a + 2])
        }
        return !!b
    };
    _.h.no = function(a, b) {
        var c = this.vi[a];
        if (c) {
            for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
            if (this.OR)
                for (e = 0; e < c.length; e++) {
                    var g = c[e];
                    Ry(this.nf[g + 1], this.nf[g + 2], d)
                } else {
                    this.uw++;
                    try {
                        for (e = 0, f = c.length; e < f; e++) g = c[e], this.nf[g + 1].apply(this.nf[g + 2], d)
                    } finally {
                        if (this.uw--, 0 < this.ow.length && 0 == this.uw)
                            for (; c = this.ow.pop();) this.Cj(c)
                    }
                }
            return 0 != e
        }
        return !1
    };
    var Ry = function(a, b, c) {
        _.Ek(function() {
            a.apply(b, c)
        })
    };
    _.Qy.prototype.clear = function(a) {
        if (a) {
            var b = this.vi[a];
            b && (_.ob(b, this.Cj, this), delete this.vi[a])
        } else this.nf.length = 0, this.vi = {}
    };
    _.Qy.prototype.Hb = function(a) {
        if (a) {
            var b = this.vi[a];
            return b ? b.length : 0
        }
        a = 0;
        for (b in this.vi) a += this.Hb(b);
        return a
    };
    _.Qy.prototype.va = function() {
        _.Qy.T.va.call(this);
        this.clear();
        this.ow.length = 0
    };
    _.Sy = function(a) {
        _.ri.call(this);
        this.Ld = new _.Qy(a);
        _.ui(this, this.Ld)
    };
    _.K(_.Sy, _.ri);
    _.h = _.Sy.prototype;
    _.h.subscribe = function(a, b, c) {
        return this.Ld.subscribe(a.toString(), b, c)
    };
    _.h.us = _.ja(39);
    _.h.unsubscribe = function(a, b, c) {
        return this.Ld.unsubscribe(a.toString(), b, c)
    };
    _.h.Cj = function(a) {
        return this.Ld.Cj(a)
    };
    _.h.no = function(a, b) {
        return this.Ld.no(a.toString(), b)
    };
    _.h.clear = function(a) {
        this.Ld.clear(void 0 !== a ? a.toString() : void 0)
    };
    _.h.Hb = function(a) {
        return this.Ld.Hb(void 0 !== a ? a.toString() : void 0)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    _.Ty = function(a, b) {
        Array.isArray(b) || (b = [b]);
        b = _.qb(b, function(c) {
            return "string" === typeof c ? c : c.sw + " " + c.duration + "s " + c.timing + " " + c.delay + "s"
        });
        _.vr(a, "transition", b.join(","))
    };
    _.Uy = _.Kb(function() {
        if (_.sc) return _.Pc("10.0");
        var a = _.Zd("DIV"),
            b = _.wc ? "-webkit" : _.vc ? "-moz" : _.sc ? "-ms" : _.rc ? "-o" : null,
            c = {
                transition: "opacity 1s linear"
            };
        b && (c[b + "-transition"] = "opacity 1s linear");
        b = _.ir("div", {
            style: c
        });
        _.Bd(a, b);
        a = a.firstChild;
        b = a.style[_.jr("transition")];
        return "" != ("undefined" !== typeof b ? b : a.style[_.ur(a, "transition")] || "")
    });

    _.Wy = !1;
    _.Xy = function() {
        _.Vy = "oauth2relay" + String(2147483647 * (0, _.vg)() | 0)
    };
    _.Yy = new _.Sy;
    _.Zy = new _.Py("oauth");
    _.Xy();
    _.S("oauth-flow/client_id");
    var $y = String(_.S("oauth-flow/redirectUri"));
    if ($y) $y.replace(/[#][\s\S]*/, "");
    else {
        var az = _.qg.getOrigin(window.location.href);
        _.S("oauth-flow/callbackUrl");
        encodeURIComponent(az)
    }
    _.qg.getOrigin(window.location.href);

    _.Wy = !0;

    _.pg = (window.gapi || {}).load;

    _.Wm = _.ne(_.ze, "rw", _.oe());

    var Xm = function(a, b) {
        (a = _.Wm[a]) && a.state < b && (a.state = b)
    };
    var Ym = function(a) {
        a = (a = _.Wm[a]) ? a.oid : void 0;
        if (a) {
            var b = _.ke.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete _.Wm[a];
            Ym(a)
        }
    };
    _.Zm = function(a) {
        a = a.container;
        "string" === typeof a && (a = document.getElementById(a));
        return a
    };
    _.$m = function(a) {
        var b = a.clientWidth;
        return "position:absolute;top:-10000px;width:" + (b ? b + "px" : a.style.width || "300px") + ";margin:0px;border-style:none;"
    };
    _.an = function(a, b) {
        var c = {},
            d = a.lc(),
            e = b && b.width,
            f = b && b.height,
            g = b && b.verticalAlign;
        g && (c.verticalAlign = g);
        e || (e = d.width || a.width);
        f || (f = d.height || a.height);
        d.width = c.width = e;
        d.height = c.height = f;
        d = a.Ma();
        e = a.ma();
        Xm(e, 2);
        a: {
            e = a.Db();c = c || {};
            if (_.ze.oa) {
                var k = d.id;
                if (k) {
                    f = (f = _.Wm[k]) ? f.state : void 0;
                    if (1 === f || 4 === f) break a;
                    Ym(k)
                }
            }(f = e.nextSibling) && f.getAttribute && f.getAttribute("data-gapistub") && (e.parentNode.removeChild(f), e.style.cssText = "");f = c.width;g = c.height;
            var l = e.style;l.textIndent = "0";l.margin =
            "0";l.padding = "0";l.background = "transparent";l.borderStyle = "none";l.cssFloat = "none";l.styleFloat = "none";l.lineHeight = "normal";l.fontSize = "1px";l.verticalAlign = "baseline";e = e.style;e.display = "inline-block";d = d.style;d.position = "static";d.left = "0";d.top = "0";d.visibility = "visible";f && (e.width = d.width = f + "px");g && (e.height = d.height = g + "px");c.verticalAlign && (e.verticalAlign = c.verticalAlign);k && Xm(k, 3)
        }(k = b ? b.title : null) && a.Ma().setAttribute("title", k);
        (b = b ? b.ariaLabel : null) && a.Ma().setAttribute("aria-label",
            b)
    };
    _.bn = function(a) {
        var b = a.Db();
        b && b.removeChild(a.Ma())
    };
    _.cn = function(a) {
        a.where = _.Zm(a);
        var b = a.messageHandlers = a.messageHandlers || {},
            c = function(e) {
                _.an(this, e)
            };
        b._ready = c;
        b._renderstart = c;
        var d = a.onClose;
        a.onClose = function(e) {
            d && d.call(this, e);
            _.bn(this)
        };
        a.onCreate = function(e) {
            e = e.Ma();
            e.style.cssText = _.$m(e)
        }
    };

    _.en = {};
    window.iframer = _.en;

    var fn, gn, hn, jn, kn, ln, pn, qn;
    fn = function(a) {
        if (_.me.test(Object.keys)) return Object.keys(a);
        var b = [],
            c;
        for (c in a) _.pe(a, c) && b.push(c);
        return b
    };
    gn = function(a, b) {
        if (!_.If()) try {
            a()
        } catch (c) {}
        _.Jf(b)
    };
    hn = {
        button: !0,
        div: !0,
        span: !0
    };
    jn = function(a) {
        var b = _.ne(_.ze, "sws", []);
        return 0 <= _.vj.call(b, a)
    };
    kn = function(a) {
        return _.ne(_.ze, "watt", _.oe())[a]
    };
    ln = function(a) {
        return function(b, c) {
            return a ? _.fk()[c] || a[c] || "" : _.fk()[c] || ""
        }
    };
    _.mn = {
        callback: 1,
        clientid: 1,
        cookiepolicy: 1,
        openidrealm: -1,
        includegrantedscopes: -1,
        requestvisibleactions: 1,
        scope: 1
    };
    _.nn = !1;
    _.on = function() {
        if (!_.nn) {
            for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                var c = a[b].name.toLowerCase();
                if (_.ed(c, "google-signin-")) {
                    c = c.substring(14);
                    var d = a[b].content;
                    _.mn[c] && d && (_.dn[c] = d)
                }
            }
            if (window.self !== window.top) {
                a = document.location.toString();
                for (var e in _.mn) 0 < _.mn[e] && (b = _.te(a, e, "")) && (_.dn[e] = b)
            }
            _.nn = !0
        }
        e = _.oe();
        _.qe(_.dn, e);
        return e
    };
    pn = function(a) {
        var b;
        a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
        return _.Kj(document, b ? b : a)
    };
    qn = function(a) {
        a = a || "canonical";
        for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
            var e = b[c],
                f = e.getAttribute("rel");
            if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = pn(e)) && null != e.match(/^https?:\/\/[\w\-_\.]+/i)) return e
        }
        return window.location.href
    };
    _.rn = function() {
        return window.location.origin || window.location.protocol + "//" + window.location.host
    };
    _.sn = function(a, b, c, d) {
        return (a = "string" == typeof a ? a : void 0) ? pn(a) : qn(d)
    };
    _.tn = function(a, b, c) {
        null == a && c && (a = c.db, null == a && (a = c.gwidget && c.gwidget.db));
        return a || void 0
    };
    _.un = function(a, b, c) {
        null == a && c && (a = c.ecp, null == a && (a = c.gwidget && c.gwidget.ecp));
        return a || void 0
    };
    _.vn = function(a, b, c) {
        return _.sn(a, b, c, b.action ? void 0 : "publisher")
    };
    var wn, xn, yn, zn, An, Bn, Dn, Cn;
    wn = {
        se: "0"
    };
    xn = {
        post: !0
    };
    yn = {
        style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
    };
    zn = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" ");
    An = _.ne(_.ze, "WI", _.oe());
    Bn = ["style", "data-gapiscan"];
    Dn = function(a) {
        for (var b = _.oe(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
            var f = a.attributes[d],
                g = f.name,
                k = f.value;
            0 <= _.vj.call(Bn, g) || c && 0 != g.indexOf("data-") || "null" === k || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = k)
        }
        a = a.style;
        (c = Cn(a && a.height)) && (b.height = String(c));
        (a = Cn(a && a.width)) && (b.width = String(a));
        return b
    };
    _.Fn = function(a, b, c, d, e, f) {
        if (c.rd) var g = b;
        else g = document.createElement("div"), b.setAttribute("data-gapistub", !0), g.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(g, b);
        f.siteElement = g;
        g.id || (g.id = _.En(a));
        b = _.oe();
        b[">type"] = a;
        _.qe(c, b);
        a = _.jk(d, g, e);
        f.iframeNode = a;
        f.id = a.getAttribute("id")
    };
    _.En = function(a) {
        _.ne(An, a, 0);
        return "___" + a + "_" + An[a]++
    };
    Cn = function(a) {
        var b = void 0;
        "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
        return b
    };
    var Gn = function() {},
        Jn = function(a) {
            var b = a.rn,
                c = function(l) {
                    c.T.constructor.call(this, l);
                    var m = this.zh.length;
                    this.Rg = [];
                    for (var n = 0; n < m; ++n) this.zh[n].Caa || (this.Rg[n] = new this.zh[n](l))
                };
            _.K(c, b);
            for (var d = []; a && a !== Object;) {
                if (b = a.rn) {
                    b.zh && (_.Je(d, b.zh), _.Ke(d));
                    var e = b.prototype,
                        f;
                    for (f in e)
                        if (e.hasOwnProperty(f) && "function" === typeof e[f] && e[f] !== b) {
                            var g = !!e[f].kaa,
                                k = Hn(f, e, d, g);
                            (g = In(f, e, k, g)) && (c.prototype[f] = g)
                        }
                }
                a = a === Object ? Object : Object.getPrototypeOf ? Object.getPrototypeOf(a.prototype).constructor ||
                    Object : a.T && a.T.constructor || Object
            }
            c.prototype.zh = d;
            return c
        },
        Hn = function(a, b, c, d) {
            for (var e = [], f = 0; f < c.length && (c[f].prototype[a] === b[a] || (e.push(f), !d)); ++f);
            return e
        },
        In = function(a, b, c, d) {
            return c.length ? d ? function(e) {
                var f = this.Rg[c[0]];
                return f ? f[a].apply(this.Rg[c[0]], arguments) : this.zh[c[0]].prototype[a].apply(this, arguments)
            } : b[a].dS ? function(e) {
                a: {
                    var f = Array.prototype.slice.call(arguments, 0);
                    for (var g = 0; g < c.length; ++g) {
                        var k = this.Rg[c[g]];
                        if (k = k ? k[a].apply(k, f) : this.zh[c[g]].prototype[a].apply(this,
                                f)) {
                            f = k;
                            break a
                        }
                    }
                    f = !1
                }
                return f
            } : b[a].cS ? function(e) {
                a: {
                    var f = Array.prototype.slice.call(arguments, 0);
                    for (var g = 0; g < c.length; ++g) {
                        var k = this.Rg[c[g]];
                        k = k ? k[a].apply(k, f) : this.zh[c[g]].prototype[a].apply(this, f);
                        if (null != k) {
                            f = k;
                            break a
                        }
                    }
                    f = void 0
                }
                return f
            } : b[a].ZK ? function(e) {
                for (var f = Array.prototype.slice.call(arguments, 0), g = 0; g < c.length; ++g) {
                    var k = this.Rg[c[g]];
                    k ? k[a].apply(k, f) : this.zh[c[g]].prototype[a].apply(this, f)
                }
            } : function(e) {
                for (var f = Array.prototype.slice.call(arguments, 0), g = [], k = 0; k < c.length; ++k) {
                    var l =
                        this.Rg[c[k]];
                    g.push(l ? l[a].apply(l, f) : this.zh[c[k]].prototype[a].apply(this, f))
                }
                return g
            } : d || b[a].dS || b[a].cS || b[a].ZK ? null : Kn
        },
        Kn = function() {
            return []
        };
    Gn.prototype.$z = function(a) {
        if (this.Rg)
            for (var b = 0; b < this.Rg.length; ++b)
                if (this.Rg[b] instanceof a) return this.Rg[b];
        return null
    };
    var Ln = function(a) {
        return this.Xa.$z(a)
    };
    var Mn, Nn, On, Rn, Sn = /(?:^|\s)g-((\S)*)(?:$|\s)/,
        Tn = {
            plusone: !0,
            autocomplete: !0,
            profile: !0,
            signin: !0,
            signin2: !0
        };
    Mn = _.ne(_.ze, "SW", _.oe());
    Nn = _.ne(_.ze, "SA", _.oe());
    On = _.ne(_.ze, "SM", _.oe());
    Rn = _.ne(_.ze, "FW", []);
    var Un = function(a, b) {
            return ("string" === typeof a ? document.getElementById(a) : a) || b
        },
        Yn = function(a, b) {
            var c;
            Vn.ps0 = (new Date).getTime();
            Wn("ps0");
            a = Un(a, _.ke);
            var d = _.ke.documentMode;
            if (a.querySelectorAll && (!d || 8 < d)) {
                d = b ? [b] : fn(Mn).concat(fn(Nn)).concat(fn(On));
                for (var e = [], f = 0; f < d.length; f++) {
                    var g = d[f];
                    e.push(".g-" + g, "g\\:" + g)
                }
                d = a.querySelectorAll(e.join(","))
            } else d = a.getElementsByTagName("*");
            a = _.oe();
            for (e = 0; e < d.length; e++) {
                f = d[e];
                var k = f;
                g = b;
                var l = k.nodeName.toLowerCase(),
                    m = void 0;
                if (k.getAttribute("data-gapiscan")) g =
                    null;
                else {
                    var n = l.indexOf("g:");
                    0 == n ? m = l.substr(2) : (n = (n = String(k.className || k.getAttribute("class"))) && Sn.exec(n)) && (m = n[1]);
                    g = !m || !(Mn[m] || Nn[m] || On[m]) || g && m !== g ? null : m
                }
                g && (Tn[g] || 0 == f.nodeName.toLowerCase().indexOf("g:") || 0 != fn(Dn(f)).length) && (f.setAttribute("data-gapiscan", !0), _.ne(a, g, []).push(f))
            }
            for (p in a) Rn.push(p);
            Vn.ps1 = (new Date).getTime();
            Wn("ps1");
            if (b = Rn.join(":")) try {
                _.re.load(b, void 0)
            } catch (u) {
                _.Df(u);
                return
            }
            e = [];
            for (c in a) {
                d = a[c];
                var p = 0;
                for (b = d.length; p < b; p++) f = d[p], Xn(c, f,
                    Dn(f), e, b)
            }
        };
    var Zn = function(a, b) {
            var c = kn(a);
            b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : _.re.load(a, function() {
                var d = kn(a),
                    e = b && b.iframeNode,
                    f = b && b.userParams;
                e && d ? (d(b), e.setAttribute("data-gapiattached", !0)) : (d = _.re[a].go, "signin2" == a ? d(e, f) : d(e && e.parentNode, f))
            })
        },
        Xn = function(a, b, c, d, e, f, g) {
            switch ($n(b, a, f)) {
                case 0:
                    a = On[a] ? a + "_annotation" : a;
                    d = {};
                    d.iframeNode = b;
                    d.userParams = c;
                    Zn(a, d);
                    break;
                case 1:
                    if (b.parentNode) {
                        for (var k in c) {
                            if (f = _.pe(c, k)) f = c[k], f = !!f && "object" === typeof f && (!f.toString ||
                                f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                            if (f) try {
                                c[k] = _.zf(c[k])
                            } catch (w) {
                                delete c[k]
                            }
                        }
                        k = !0;
                        c.dontclear && (k = !1);
                        delete c.dontclear;
                        var l;
                        f = {};
                        var m = l = a;
                        "plus" == a && c.action && (l = a + "_" + c.action, m = a + "/" + c.action);
                        (l = _.S("iframes/" + l + "/url")) || (l = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + m + "?usegapi=1");
                        for (n in wn) f[n] = n + "/" + (c[n] || wn[n]) + "/";
                        var n = _.Kj(_.ke, l.replace(_.ek, ln(f)));
                        m = "iframes/" + a + "/params/";
                        f = {};
                        _.qe(c, f);
                        (l = _.S("lang") || _.S("gwidget/lang")) &&
                        (f.hl = l);
                        xn[a] || (f.origin = _.rn());
                        f.exp = _.S(m + "exp");
                        if (m = _.S(m + "location"))
                            for (l = 0; l < m.length; l++) {
                                var p = m[l];
                                f[p] = _.je.location[p]
                            }
                        switch (a) {
                            case "plus":
                            case "follow":
                                f.url = _.vn(f.href, c, null);
                                delete f.href;
                                break;
                            case "plusone":
                                m = (m = c.href) ? pn(m) : qn();
                                f.url = m;
                                f.db = _.tn(c.db, void 0, _.S());
                                f.ecp = _.un(c.ecp, void 0, _.S());
                                delete f.href;
                                break;
                            case "signin":
                                f.url = qn()
                        }
                        _.ze.ILI && (f.iloader = "1");
                        delete f["data-onload"];
                        delete f.rd;
                        for (var u in wn) f[u] && delete f[u];
                        f.gsrc = _.S("iframes/:source:");
                        u = _.S("inline/css");
                        "undefined" !== typeof u && 0 < e && u >= e && (f.ic = "1");
                        u = /^#|^fr-/;
                        e = {};
                        for (var r in f) _.pe(f, r) && u.test(r) && (e[r.replace(u, "")] = f[r], delete f[r]);
                        r = "q" == _.S("iframes/" + a + "/params/si") ? f : e;
                        u = _.on();
                        for (var v in u) !_.pe(u, v) || _.pe(f, v) || _.pe(e, v) || (r[v] = u[v]);
                        v = [].concat(zn);
                        r = _.S("iframes/" + a + "/methods");
                        _.uj(r) && (v = v.concat(r));
                        for (t in c) _.pe(c, t) && /^on/.test(t) && ("plus" != a || "onconnect" != t) && (v.push(t), delete f[t]);
                        delete f.callback;
                        e._methods = v.join(",");
                        var t = _.Jj(n, f, e);
                        v = g || {};
                        v.allowPost = 1;
                        v.attributes =
                            yn;
                        v.dontclear = !k;
                        g = {};
                        g.userParams = c;
                        g.url = t;
                        g.type = a;
                        _.Fn(a, b, c, t, v, g);
                        b = g.id;
                        c = _.oe();
                        c.id = b;
                        c.userParams = g.userParams;
                        c.url = g.url;
                        c.type = g.type;
                        c.state = 1;
                        _.Wm[b] = c;
                        b = g
                    } else b = null;
                    b && ((c = b.id) && d.push(c), Zn(a, b))
            }
        },
        $n = function(a, b, c) {
            if (a && 1 === a.nodeType && b) {
                if (c) return 1;
                if (On[b]) {
                    if (hn[a.nodeName.toLowerCase()]) return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
                } else {
                    if (Nn[b]) return 0;
                    if (Mn[b]) return 1
                }
            }
            return null
        };
    _.ne(_.re, "platform", {}).go = function(a, b) {
        Yn(a, b)
    };
    var ao = _.ne(_.ze, "perf", _.oe()),
        Vn = _.ne(ao, "g", _.oe()),
        bo = _.ne(ao, "i", _.oe()),
        co, eo, fo, Wn, ho, io, jo;
    _.ne(ao, "r", []);
    co = _.oe();
    eo = _.oe();
    fo = function(a, b, c, d) {
        co[c] = co[c] || !!d;
        _.ne(eo, c, []);
        eo[c].push([a, b])
    };
    Wn = function(a, b, c) {
        var d = ao.r;
        "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
    };
    ho = function(a, b, c, d) {
        if ("_p" == b) throw Error("C");
        _.go(a, b, c, d)
    };
    _.go = function(a, b, c, d) {
        io(b, c)[a] = d || (new Date).getTime();
        Wn(a, b, c)
    };
    io = function(a, b) {
        a = _.ne(bo, a, _.oe());
        return _.ne(a, b, _.oe())
    };
    jo = function(a, b, c) {
        var d = null;
        b && c && (d = io(b, c)[a]);
        return d || Vn[a]
    };
    (function() {
        function a(g) {
            this.t = {};
            this.tick = function(k, l, m) {
                this.t[k] = [void 0 != m ? m : (new Date).getTime(), l];
                if (void 0 == m) try {
                    window.console.timeStamp("CSI/" + k)
                } catch (n) {}
            };
            this.getStartTickTime = function() {
                return this.t.start[0]
            };
            this.tick("start", null, g)
        }
        var b;
        if (window.performance) var c = (b = window.performance.timing) && b.responseStart;
        var d = 0 < c ? new a(c) : new a;
        window.__gapi_jstiming__ = {
            Timer: a,
            load: d
        };
        if (b) {
            var e = b.navigationStart;
            0 < e && c >= e && (window.__gapi_jstiming__.srt = c - e)
        }
        if (b) {
            var f = window.__gapi_jstiming__.load;
            0 < e && c >= e && (f.tick("_wtsrt", void 0, e), f.tick("wtsrt_", "_wtsrt", c), f.tick("tbsd_", "wtsrt_"))
        }
        try {
            b = null, window.chrome && window.chrome.csi && (b = Math.floor(window.chrome.csi().pageT), f && 0 < e && (f.tick("_tbnd", void 0, window.chrome.csi().startE), f.tick("tbnd_", "_tbnd", e))), null == b && window.gtbExternal && (b = window.gtbExternal.pageT()), null == b && window.external && (b = window.external.pageT, f && 0 < e && (f.tick("_tbnd", void 0, window.external.startE), f.tick("tbnd_", "_tbnd", e))), b && (window.__gapi_jstiming__.pt = b)
        } catch (g) {}
    })();
    if (window.__gapi_jstiming__) {
        window.__gapi_jstiming__.vG = {};
        window.__gapi_jstiming__.OZ = 1;
        var ko = function(a, b, c) {
                var d = a.t[b],
                    e = a.t.start;
                if (d && (e || c)) return d = a.t[b][0], e = void 0 != c ? c : e[0], Math.round(d - e)
            },
            mo = function(a, b, c) {
                var d = "";
                window.__gapi_jstiming__.srt && (d += "&srt=" + window.__gapi_jstiming__.srt, delete window.__gapi_jstiming__.srt);
                window.__gapi_jstiming__.pt && (d += "&tbsrt=" + window.__gapi_jstiming__.pt, delete window.__gapi_jstiming__.pt);
                try {
                    window.external && window.external.tran ? d += "&tran=" +
                        window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
                } catch (p) {}
                var e = window.chrome;
                if (e && (e = e.loadTimes)) {
                    e().wasFetchedViaSpdy && (d += "&p=s");
                    if (e().wasNpnNegotiated) {
                        d += "&npn=1";
                        var f = e().npnNegotiatedProtocol;
                        f && (d += "&npnv=" + (encodeURIComponent || escape)(f))
                    }
                    e().wasAlternateProtocolAvailable && (d += "&apa=1")
                }
                var g = a.t,
                    k = g.start;
                e = [];
                f = [];
                for (var l in g)
                    if ("start" != l && 0 != l.indexOf("_")) {
                        var m =
                            g[l][1];
                        m ? g[m] && f.push(l + "." + ko(a, l, g[m][0])) : k && e.push(l + "." + ko(a, l))
                    }
                delete g.start;
                if (b)
                    for (var n in b) d += "&" + n + "=" + b[n];
                (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
                return [b, "?v=3", "&s=" + (window.__gapi_jstiming__.sn || "gwidget") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
            },
            no = function(a, b, c) {
                a = mo(a, b, c);
                if (!a) return "";
                b = new Image;
                var d = window.__gapi_jstiming__.OZ++;
                window.__gapi_jstiming__.vG[d] = b;
                b.onload = b.onerror = function() {
                    window.__gapi_jstiming__ && delete window.__gapi_jstiming__.vG[d]
                };
                b.src = a;
                b = null;
                return a
            };
        window.__gapi_jstiming__.report = function(a, b, c) {
            var d = document.visibilityState,
                e = "visibilitychange";
            d || (d = document.webkitVisibilityState, e = "webkitvisibilitychange");
            if ("prerender" == d) {
                var f = !1,
                    g = function() {
                        if (!f) {
                            b ? b.prerender = "1" : b = {
                                prerender: "1"
                            };
                            if ("prerender" == (document.visibilityState || document.webkitVisibilityState)) var k = !1;
                            else no(a, b, c), k = !0;
                            k && (f = !0, document.removeEventListener(e,
                                g, !1))
                        }
                    };
                document.addEventListener(e, g, !1);
                return ""
            }
            return no(a, b, c)
        }
    };
    var oo = {
            g: "gapi_global",
            m: "gapi_module",
            w: "gwidget"
        },
        po = function(a, b) {
            this.type = a ? "_p" == a ? "m" : "w" : "g";
            this.name = a;
            this.Mo = b
        };
    po.prototype.key = function() {
        switch (this.type) {
            case "g":
                return this.type;
            case "m":
                return this.type + "." + this.Mo;
            case "w":
                return this.type + "." + this.name + this.Mo
        }
    };
    var qo = new po,
        ro = navigator.userAgent.match(/iPhone|iPad|Android|PalmWebOS|Maemo|Bada/),
        so = _.ne(ao, "_c", _.oe()),
        to = Math.random() < (_.S("csi/rate") || 0),
        vo = function(a, b, c) {
            for (var d = new po(b, c), e = _.ne(so, d.key(), _.oe()), f = eo[a] || [], g = 0; g < f.length; ++g) {
                var k = f[g],
                    l = k[0],
                    m = a,
                    n = b,
                    p = c;
                k = jo(k[1], n, p);
                m = jo(m, n, p);
                e[l] = k && m ? m - k : null
            }
            co[a] && to && (uo(qo), uo(d))
        },
        wo = function(a, b) {
            b = b || [];
            for (var c = [], d = 0; d < b.length; d++) c.push(a + b[d]);
            return c
        },
        uo = function(a) {
            var b = _.je.__gapi_jstiming__;
            b.sn = oo[a.type];
            var c = new b.Timer(0);
            a: {
                switch (a.type) {
                    case "g":
                        var d = "global";
                        break a;
                    case "m":
                        d = a.Mo;
                        break a;
                    case "w":
                        d = a.name;
                        break a
                }
                d = void 0
            }
            c.name = d;
            d = !1;
            var e = a.key(),
                f = so[e];
            c.tick("_start", null, 0);
            for (var g in f) c.tick(g, "_start", f[g]), d = !0;
            so[e] = _.oe();
            d && (g = [], g.push("l" + (_.S("isPlusUser") ? "1" : "0")), d = "m" + (ro ? "1" : "0"), g.push(d), "m" == a.type ? g.push("p" + a.Mo) : "w" == a.type && (e = "n" + a.Mo, g.push(e), "0" == a.Mo && g.push(d + e)), g.push("u" + (_.S("isLoggedIn") ? "1" : "0")), a = wo("", g), a = wo("abc_", a).join(","), b.report(c, {
                e: a
            }))
        };
    fo("blt", "bs0", "bs1");
    fo("psi", "ps0", "ps1");
    fo("rpcqi", "rqe", "rqd");
    fo("bsprt", "bsrt0", "bsrt1");
    fo("bsrqt", "bsrt1", "bsrt2");
    fo("bsrst", "bsrt2", "bsrt3");
    fo("mli", "ml0", "ml1");
    fo("mei", "me0", "me1", !0);
    fo("wcdi", "wrs", "wcdi");
    fo("wci", "wrs", "wdc");
    fo("wdi", "wrs", "wrdi");
    fo("wdt", "bs0", "wrdt");
    fo("wri", "wrs", "wrri", !0);
    fo("wrt", "bs0", "wrrt");
    fo("wji", "wje0", "wje1", !0);
    fo("wjli", "wjl0", "wjl1");
    fo("whi", "wh0", "wh1", !0);
    fo("wai", "waaf0", "waaf1", !0);
    fo("wadi", "wrs", "waaf1", !0);
    fo("wadt", "bs0", "waaf1", !0);
    fo("wprt", "wrt0", "wrt1");
    fo("wrqt", "wrt1", "wrt2");
    fo("wrst", "wrt2", "wrt3", !0);
    fo("fbprt", "fsrt0", "fsrt1");
    fo("fbrqt", "fsrt1", "fsrt2");
    fo("fbrst", "fsrt2", "fsrt3", !0);
    fo("fdns", "fdns0", "fdns1");
    fo("fcon", "fcon0", "fcon1");
    fo("freq", "freq0", "freq1");
    fo("frsp", "frsp0", "frsp1");
    fo("fttfb", "fttfb0", "fttfb1");
    fo("ftot", "ftot0", "ftot1", !0);
    var xo = ao.r;
    if ("function" !== typeof xo) {
        for (var yo; yo = xo.shift();) vo.apply(null, yo);
        ao.r = vo
    };
    var zo = ["div"],
        Ao = "onload",
        Bo = !0,
        Co = !0,
        Do = function(a) {
            return a
        },
        Eo = null,
        Fo = function(a) {
            var b = _.S(a);
            return "undefined" !== typeof b ? b : _.S("gwidget/" + a)
        },
        ap, bp, cp, dp, Uo, Wo, ep, Vo, fp, gp, hp, ip;
    Eo = _.S();
    _.S("gwidget");
    var Go = Fo("parsetags");
    Ao = "explicit" === Go || "onload" === Go ? Go : Ao;
    var Ho = Fo("google_analytics");
    "undefined" !== typeof Ho && (Bo = !!Ho);
    var Io = Fo("data_layer");
    "undefined" !== typeof Io && (Co = !!Io);
    var Jo = function() {
            var a = this && this.ma();
            a && (_.ze.drw = a)
        },
        Ko = function() {
            _.ze.drw = null
        },
        Lo = function(a) {
            return function(b) {
                var c = a;
                "number" === typeof b ? c = b : "string" === typeof b && (c = b.indexOf("px"), -1 != c && (b = b.substring(0, c)), c = parseInt(b, 10));
                return c
            }
        },
        Mo = function(a) {
            "string" === typeof a && (a = window[a]);
            return "function" === typeof a ? a : null
        },
        No = function() {
            return Fo("lang") || "en-US"
        },
        Oo = function(a) {
            if (!_.q.tb("attach")) {
                var b = {},
                    c = _.q.tb("inline"),
                    d;
                for (d in c) c.hasOwnProperty(d) && (b[d] = c[d]);
                b.open = function(e) {
                    var f =
                        e.lc().renderData.id;
                    f = document.getElementById(f);
                    if (!f) throw Error("D");
                    return c.attach(e, f)
                };
                _.q.qc("attach", b)
            }
            a.style = "attach"
        },
        Po = function() {
            var a = {};
            a.width = [Lo(450)];
            a.height = [Lo(24)];
            a.onready = [Mo];
            a.lang = [No, "hl"];
            a.iloader = [function() {
                return _.ze.ILI
            }, "iloader"];
            return a
        }(),
        So = function(a) {
            var b = {};
            b.Qe = a[0];
            b.To = -1;
            b.Ica = "___" + b.Qe + "_";
            b.X1 = "g:" + b.Qe;
            b.xba = "g-" + b.Qe;
            b.bM = [];
            b.config = {};
            b.Ct = [];
            b.$N = {};
            b.lx = {};
            var c = function(e) {
                    for (var f in e)
                        if (_.pe(e, f)) {
                            b.config[f] = [Mo];
                            b.Ct.push(f);
                            var g =
                                e[f],
                                k = null,
                                l = null,
                                m = null;
                            "function" === typeof g ? k = g : g && "object" === typeof g && (k = g.mba, l = g.mx, m = g.OE);
                            m && (b.Ct.push(m), b.config[m] = [Mo], b.$N[f] = m);
                            k && (b.config[f] = [k]);
                            l && (b.lx[f] = l)
                        }
                },
                d = function(e) {
                    for (var f = {}, g = 0; g < e.length; ++g) f[e[g].toLowerCase()] = 1;
                    f[b.X1] = 1;
                    b.$X = f
                };
            a[1] && (b.parameters = a[1]);
            (function(e) {
                b.config = e;
                for (var f in Po) Po.hasOwnProperty(f) && !b.config.hasOwnProperty(f) && (b.config[f] = Po[f])
            })(a[2] || {});
            a[3] && c(a[3]);
            a[4] && d(a[4]);
            a[5] && (b.Jk = a[5]);
            b.Aca = !0 === a[6];
            b.pZ = a[7];
            b.I1 = a[8];
            b.$X || d(zo);
            b.CC = function(e) {
                b.To++;
                ho("wrs", b.Qe, String(b.To));
                var f = [],
                    g = e.element,
                    k = e.config,
                    l = ":" + b.Qe;
                ":plus" == l && e.Gk && e.Gk.action && (l += "_" + e.Gk.action);
                var m = Qo(b, k),
                    n = {};
                _.qe(_.on(), n);
                for (var p in e.Gk) null != e.Gk[p] && (n[p] = e.Gk[p]);
                p = {
                    container: g.id,
                    renderData: e.JZ,
                    style: "inline",
                    height: k.height,
                    width: k.width
                };
                Oo(p);
                b.Jk && (f[2] = p, f[3] = n, f[4] = m, b.Jk("i", f));
                l = _.q.open(l, p, n, m);
                Ro(b, l, k, g, e.ES);
                f[5] = l;
                b.Jk && b.Jk("e", f)
            };
            return b
        },
        Qo = function(a, b) {
            for (var c = {}, d = a.Ct.length - 1; 0 <= d; --d) {
                var e =
                    a.Ct[d],
                    f = b[a.$N[e] || e] || b[e],
                    g = b[e];
                g && f !== g && (f = function(l, m) {
                    return function(n) {
                        m.apply(this, arguments);
                        l.apply(this, arguments)
                    }
                }(f, g));
                f && (c[e] = f)
            }
            for (var k in a.lx) a.lx.hasOwnProperty(k) && (c[k] = To(c[k] || function() {}, a.lx[k]));
            c.drefresh = Jo;
            c.erefresh = Ko;
            return c
        },
        To = function(a, b) {
            return function(c) {
                var d = b(c);
                if (d) {
                    var e = c.href || null;
                    if (Bo) {
                        if (window._gat) try {
                            var f = window._gat._getTrackerByName("~0");
                            f && "UA-XXXXX-X" != f._getAccount() ? f._trackSocial("Google", d, e) : window._gaq && window._gaq.push(["_trackSocial",
                                "Google", d, e
                            ])
                        } catch (k) {}
                        if (window.ga && window.ga.getAll) try {
                            var g = window.ga.getAll();
                            for (f = 0; f < g.length; f++) g[f].send("social", "Google", d, e)
                        } catch (k) {}
                    }
                    if (Co && window.dataLayer) try {
                        window.dataLayer.push({
                            event: "social",
                            socialNetwork: "Google",
                            socialAction: d,
                            socialTarget: e
                        })
                    } catch (k) {}
                }
                a.call(this, c)
            }
        },
        Ro = function(a, b, c, d, e) {
            Uo(b, c);
            Vo(b, d);
            Wo(a, b, e);
            Xo(a.Qe, a.To.toString(), b);
            (new Yo).Xa.Zm(a, b, c, d, e)
        },
        Yo = function() {
            if (!this.Xa) {
                for (var a = this.constructor; a && !a.rn;) a = a.T && a.T.constructor;
                a.rn.nH || (a.rn.nH =
                    Jn(a));
                this.Xa = new a.rn.nH(this);
                this.$z || (this.$z = Ln)
            }
        },
        Zo = function() {},
        $o = Yo;
    Zo.T || _.K(Zo, Gn);
    $o.rn = Zo;
    Zo.prototype.Zm = function(a) {
        a = a ? a : function() {};
        a.ZK = !0;
        return a
    }();
    ap = function(a) {
        return _.pm && "undefined" != typeof _.pm && a instanceof _.pm
    };
    bp = function(a) {
        return ap(a) ? "_renderstart" : "renderstart"
    };
    cp = function(a) {
        return ap(a) ? "_ready" : "ready"
    };
    dp = function() {
        return !0
    };
    Uo = function(a, b) {
        if (b.onready) {
            var c = !1,
                d = function() {
                    c || (c = !0, b.onready.call(null))
                };
            a.register(cp(a), d, dp);
            a.register(bp(a), d, dp)
        }
    };
    Wo = function(a, b, c) {
        var d = a.Qe,
            e = String(a.To),
            f = !1,
            g = function() {
                f || (f = !0, c && ho("wrdt", d, e), ho("wrdi", d, e))
            };
        b.register(bp(b), g, dp);
        var k = !1;
        a = function() {
            k || (k = !0, g(), c && ho("wrrt", d, e), ho("wrri", d, e))
        };
        b.register(cp(b), a, dp);
        ap(b) ? b.register("widget-interactive-" + b.id, a, dp) : _.Lf.register("widget-interactive-" + b.id, a);
        _.Lf.register("widget-csi-tick-" + b.id, function(l, m, n) {
            "wdc" === l ? ho("wdc", d, e, n) : "wje0" === l ? ho("wje0", d, e, n) : "wje1" === l ? ho("wje1", d, e, n) : "wh0" == l ? _.go("wh0", d, e, n) : "wh1" == l ? _.go("wh1", d,
                e, n) : "wcdi" == l && _.go("wcdi", d, e, n)
        })
    };
    ep = function(a) {
        return "number" == typeof a ? a + "px" : "100%" == a ? a : null
    };
    Vo = function(a, b) {
        var c = function(d) {
            d = d || a;
            var e = ep(d.width);
            e && b.style.width != e && (b.style.width = e);
            (d = ep(d.height)) && b.style.height != d && (b.style.height = d)
        };
        ap(a) ? a.$M("onRestyle", c) : (a.register("ready", c, dp), a.register("renderstart", c, dp), a.register("resize", c, dp))
    };
    fp = function(a, b) {
        for (var c in Po)
            if (Po.hasOwnProperty(c)) {
                var d = Po[c][1];
                d && !b.hasOwnProperty(d) && (b[d] = a[d])
            }
        return b
    };
    gp = function(a, b) {
        var c = {},
            d;
        for (d in a) a.hasOwnProperty(d) && (c[a[d][1] || d] = (a[d] && a[d][0] || Do)(b[d.toLowerCase()], b, Eo));
        return c
    };
    hp = function(a) {
        if (a = a.pZ)
            for (var b = 0; b < a.length; b++)(new Image).src = a[b]
    };
    ip = function(a, b) {
        var c = b.userParams,
            d = b.siteElement;
        d || (d = (d = b.iframeNode) && d.parentNode);
        if (d && 1 === d.nodeType) {
            var e = gp(a.config, c);
            a.bM.push({
                element: d,
                config: e,
                Gk: fp(e, gp(a.parameters, c)),
                cca: 3,
                ES: !!c["data-onload"],
                JZ: b
            })
        }
        b = a.bM;
        for (a = a.CC; 0 < b.length;) a(b.shift())
    };
    _.jp = function(a) {
        var b = So(a);
        hp(b);
        _.Nj(b.Qe, function(d) {
            ip(b, d)
        });
        Mn[b.Qe] = !0;
        var c = {
            wa: function(d, e, f) {
                var g = e || {};
                g.type = b.Qe;
                e = g.type;
                delete g.type;
                var k = Un(d);
                if (k) {
                    d = {};
                    for (var l in g) _.pe(g, l) && (d[l.toLowerCase()] = g[l]);
                    d.rd = 1;
                    (l = !!d.ri) && delete d.ri;
                    Xn(e, k, d, [], 0, l, f)
                } else _.Df("string" === "gapi." + e + ".render: missing element " + typeof d ? d : "")
            },
            go: function(d) {
                Yn(d, b.Qe)
            },
            dca: function() {
                var d = _.ne(_.ze, "WI", _.oe()),
                    e;
                for (e in d) delete d[e]
            }
        };
        a = function() {
            "onload" === Ao && c.go()
        };
        jn(b.Qe) || gn(a,
            a);
        _.C("gapi." + b.Qe + ".go", c.go);
        _.C("gapi." + b.Qe + ".render", c.wa);
        return c
    };
    var kp = ip,
        lp = function(a, b) {
            a.To++;
            ho("wrs", a.Qe, String(a.To));
            var c = b.userParams,
                d = gp(a.config, c),
                e = [],
                f = b.iframeNode,
                g = b.siteElement,
                k = Qo(a, d),
                l = gp(a.parameters, c);
            _.qe(_.on(), l);
            l = fp(d, l);
            c = !!c["data-onload"];
            var m = _.Wl,
                n = _.oe();
            n.renderData = b;
            n.height = d.height;
            n.width = d.width;
            n.id = b.id;
            n.url = b.url;
            n.iframeEl = f;
            n.where = n.container = g;
            n.apis = ["_open"];
            n.messageHandlers = k;
            n.messageHandlersFilter = _.Bm;
            _.cn(n);
            f = l;
            a.Jk && (e[2] = n, e[3] = f, e[4] = k, a.Jk("i", e));
            k = m.Mj(n);
            k.id = b.id;
            k.Rw(k, n);
            Ro(a, k, d, g, c);
            e[5] =
                k;
            a.Jk && a.Jk("e", e)
        };
    ip = function(a, b) {
        var c = b.url;
        a.I1 || _.gi(c) ? _.Fm ? lp(a, b) : (0, _.pg)("gapi.iframes.impl", function() {
            lp(a, b)
        }) : _.q.open ? kp(a, b) : (0, _.pg)("iframes", function() {
            kp(a, b)
        })
    };
    var mp = function() {
            var a = window;
            return !!a.performance && !!a.performance.getEntries
        },
        Xo = function(a, b, c) {
            if (mp()) {
                var d = function() {
                        var f = !1;
                        return function() {
                            if (f) return !0;
                            f = !0;
                            return !1
                        }
                    }(),
                    e = function() {
                        d() || window.setTimeout(function() {
                            var f = c.Ma().src;
                            var g = f.indexOf("#"); - 1 != g && (f = f.substring(0, g));
                            f = window.performance.getEntriesByName(f);
                            1 > f.length ? f = null : (f = f[0], f = 0 == f.responseStart ? null : f);
                            if (f) {
                                g = Math.round(f.requestStart);
                                var k = Math.round(f.responseStart),
                                    l = Math.round(f.responseEnd);
                                ho("wrt0",
                                    a, b, Math.round(f.startTime));
                                ho("wrt1", a, b, g);
                                ho("wrt2", a, b, k);
                                ho("wrt3", a, b, l)
                            }
                        }, 1E3)
                    };
                c.register(bp(c), e, dp);
                c.register(cp(c), e, dp)
            }
        };
    _.C("gapi.widget.make", _.jp);

    var rg = _.qg = _.qg || {};
    window.___jsl = window.___jsl || {};
    rg.uG = {
        Taa: function() {
            return window.___jsl.bsh
        },
        nU: function() {
            return window.___jsl.h
        },
        ED: function(a) {
            window.___jsl.bsh = a
        },
        h0: function(a) {
            window.___jsl.h = a
        }
    };

    _.tp = _.tp || {};
    _.tp.getViewportDimensions = function() {
        var a = 0,
            b = 0;
        self.innerHeight ? (a = self.innerWidth, b = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (a = document.documentElement.clientWidth, b = document.documentElement.clientHeight) : document.body && (a = document.body.clientWidth, b = document.body.clientHeight);
        return {
            width: a,
            height: b
        }
    };

    _.tp = _.tp || {};
    (function() {
        function a(b, c) {
            b = window.getComputedStyle(b, "").getPropertyValue(c).match(/^([0-9]+)/);
            return parseInt(b[0], 10)
        }
        _.tp.getHeight = function() {
            var b = _.tp.getViewportDimensions().height,
                c = document.body,
                d = document.documentElement;
            if ("CSS1Compat" === document.compatMode && d.scrollHeight) return d.scrollHeight !== b ? d.scrollHeight : d.offsetHeight;
            if (0 <= navigator.userAgent.indexOf("AppleWebKit")) {
                b = 0;
                for (c = [document.body]; 0 < c.length;) {
                    var e = c.shift();
                    d = e.childNodes;
                    if ("undefined" !== typeof e.style) {
                        var f = e.style.overflowY;
                        f || (f = (f = document.defaultView.getComputedStyle(e, null)) ? f.overflowY : null);
                        if ("visible" != f && "inherit" != f && (f = e.style.height, f || (f = (f = document.defaultView.getComputedStyle(e, null)) ? f.height : ""), 0 < f.length && "auto" != f)) continue
                    }
                    for (e = 0; e < d.length; e++) {
                        f = d[e];
                        if ("undefined" !== typeof f.offsetTop && "undefined" !== typeof f.offsetHeight) {
                            var g = f.offsetTop + f.offsetHeight + a(f, "margin-bottom");
                            b = Math.max(b, g)
                        }
                        c.push(f)
                    }
                }
                return b + a(document.body, "border-bottom") + a(document.body, "margin-bottom") + a(document.body,
                    "padding-bottom")
            }
            if (c && d) return e = d.scrollHeight, f = d.offsetHeight, d.clientHeight !== f && (e = c.scrollHeight, f = c.offsetHeight), e > b ? e > f ? e : f : e < f ? e : f
        }
    })();

    _.q.util = {};
    var up = function() {};
    up.makeClosure = function(a, b, c) {
        for (var d = [], e = 2, f = arguments.length; e < f; ++e) d.push(arguments[e]);
        return function() {
            for (var g = d.slice(), k = 0, l = arguments.length; k < l; ++k) g.push(arguments[k]);
            return b.apply(a, g)
        }
    };
    _.q.util.Qs = up;

    var vp, wp, xp, zp, Ap, Bp, Gp, Hp, Ip, Jp, Lp, Mp, Np, Pp, Qp, Sp;
    vp = function() {
        _.q.LJ++;
        return ["I", _.q.LJ, "_", (new Date).getTime()].join("")
    };
    wp = function(a) {
        return a instanceof Array ? a.join(",") : a instanceof Object ? _.zf(a) : a
    };
    xp = function(a) {
        var b = _.S("googleapis.config/elog");
        if (b) try {
            b(a)
        } catch (c) {}
    };
    zp = function(a) {
        a && a.match(yp) && _.He("googleapis.config/gcv", a)
    };
    Ap = function(a) {
        _.qg.uG.h0(a)
    };
    Bp = function(a) {
        _.qg.uG.ED(a)
    };
    _.Cp = function(a, b) {
        b = b || {};
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    };
    _.Ep = function(a, b, c, d, e) {
        var f = [],
            g;
        for (g in a)
            if (a.hasOwnProperty(g)) {
                var k = b,
                    l = c,
                    m = a[g],
                    n = d,
                    p = Dp(g);
                p[k] = p[k] || {};
                n = _.q.util.Qs.makeClosure(n, m);
                m._iframe_wrapped_rpc_ && (n._iframe_wrapped_rpc_ = !0);
                p[k][l] = n;
                f.push(g)
            }
        if (e)
            for (g in _.q.In) _.q.In.hasOwnProperty(g) && f.push(g);
        return f.join(",")
    };
    Gp = function(a, b, c) {
        var d = {};
        if (a && a._methods) {
            a = a._methods.split(",");
            for (var e = 0; e < a.length; e++) {
                var f = a[e];
                d[f] = Fp(f, b, c)
            }
        }
        return d
    };
    Hp = function(a) {
        if (a && a.disableMultiLevelParentRelay) a = !1;
        else {
            var b;
            if (b = _.en && _.en._open && "inline" != a.style && !0 !== a.inline) a = a.container, b = !(a && ("string" == typeof a && document.getElementById(a) || document == (a.ownerDocument || a.document)));
            a = b
        }
        return a
    };
    Ip = function(a, b) {
        var c = {};
        b = b.params || {};
        for (var d in a) "#" == d.charAt(0) && (c[d.substring(1)] = a[d]), 0 == d.indexOf("fr-") && (c[d.substring(3)] = a[d]), "#" == b[d] && (c[d] = a[d]);
        for (var e in c) delete a["fr-" + e], delete a["#" + e], delete a[e];
        return c
    };
    Jp = function(a) {
        if (":" == a.charAt(0)) {
            var b = _.S("iframes/" + a.substring(1));
            a = {};
            _.qe(b, a);
            (b = a.url) && (a.url = _.hk(b));
            a.params || (a.params = {});
            return a
        }
        return {
            url: _.hk(a)
        }
    };
    Lp = function(a) {
        function b() {}
        b.prototype = Kp.prototype;
        a.prototype = new b
    };
    Mp = function(a) {
        return _.q.ts[a]
    };
    Np = function(a, b) {
        _.q.ts[a] = b
    };
    Pp = function(a) {
        a = a || {};
        "auto" === a.height && (a.height = _.Pl());
        var b = window && Op && Op.lb();
        b ? b.hM(a.width || 0, a.height || 0) : _.en && _.en._resizeMe && _.en._resizeMe(a)
    };
    Qp = function(a) {
        zp(a)
    };
    _.Rp = function() {
        return _.je.location.origin || _.je.location.protocol + "//" + _.je.location.host
    };
    Sp = function(a) {
        var b = _.te(a.location.href, "urlindex");
        if (b = _.ne(_.ze, "fUrl", [])[parseInt(b, 10)]) {
            var c = a.location.hash;
            b += /#/.test(b) ? c.replace(/^#/, "&") : c;
            a.location.replace(b)
        }
    };
    var Tp;
    (function() {
        function a(c) {
            var d = "undefined" === typeof c;
            if (null !== b && d) return b;
            var e = {};
            c = c || window.location.href;
            var f = c.indexOf("?"),
                g = c.indexOf("#");
            c = (-1 === g ? c.substr(f + 1) : [c.substr(f + 1, g - f - 1), "&", c.substr(g + 1)].join("")).split("&");
            f = window.decodeURIComponent ? decodeURIComponent : unescape;
            g = 0;
            for (var k = c.length; g < k; ++g) {
                var l = c[g].indexOf("=");
                if (-1 !== l) {
                    var m = c[g].substring(0, l);
                    l = c[g].substring(l + 1);
                    l = l.replace(/\+/g, " ");
                    try {
                        e[m] = f(l)
                    } catch (n) {}
                }
            }
            d && (b = e);
            return e
        }
        var b = null;
        Tp = a;
        a()
    })();
    if (window.ToolbarApi) Op = window.ToolbarApi, Op.lb = window.ToolbarApi.getInstance, Op.prototype = window.ToolbarApi.prototype, _.h = Op.prototype, _.h.openWindow = Op.prototype.openWindow, _.h.WG = Op.prototype.closeWindow, _.h.ZM = Op.prototype.setOnCloseHandler, _.h.FG = Op.prototype.canClosePopup, _.h.hM = Op.prototype.resizeWindow;
    else {
        var Op = function() {};
        Op.lb = function() {
            !Up && window.external && window.external.GTB_IsToolbar && (Up = new Op);
            return Up
        };
        _.h = Op.prototype;
        _.h.openWindow = function(a) {
            return window.external.GTB_OpenPopup &&
                window.external.GTB_OpenPopup(a)
        };
        _.h.WG = function(a) {
            window.external.GTB_ClosePopupWindow && window.external.GTB_ClosePopupWindow(a)
        };
        _.h.ZM = function(a, b) {
            window.external.GTB_SetOnCloseHandler && window.external.GTB_SetOnCloseHandler(a, b)
        };
        _.h.FG = function(a) {
            return window.external.GTB_CanClosePopup && window.external.GTB_CanClosePopup(a)
        };
        _.h.hM = function(a, b) {
            return window.external.GTB_ResizeWindow && window.external.GTB_ResizeWindow(a, b)
        };
        var Up = null;
        window.ToolbarApi = Op;
        window.ToolbarApi.getInstance = Op.lb
    };
    var Vp = function() {
            _.Lf.register("_noop_echo", function() {
                this.callback(_.q.KU(_.q.uk[this.f]))
            })
        },
        Wp = function() {
            window.setTimeout(function() {
                _.Lf.call("..", "_noop_echo", _.q.cZ)
            }, 0)
        },
        Fp = function(a, b, c) {
            var d = function(e) {
                var f = Array.prototype.slice.call(arguments, 0),
                    g = f[f.length - 1];
                if ("function" === typeof g) {
                    var k = g;
                    f.pop()
                }
                f.unshift(b, a, k, c);
                _.Lf.call.apply(_.Lf, f)
            };
            d._iframe_wrapped_rpc_ = !0;
            return d
        },
        Dp = function(a) {
            _.q.yw[a] || (_.q.yw[a] = {}, _.Lf.register(a, function(b, c) {
                var d = this.f;
                if (!("string" != typeof b ||
                        b in {} || d in {})) {
                    var e = this.callback,
                        f = _.q.yw[a][d],
                        g;
                    f && Object.hasOwnProperty.call(f, b) ? g = f[b] : Object.hasOwnProperty.call(_.q.In, a) && (g = _.q.In[a]);
                    if (g) return d = Array.prototype.slice.call(arguments, 1), g._iframe_wrapped_rpc_ && e && d.push(e), g.apply({}, d)
                }
                _.Ff(['Unregistered call in window "', window.name, '" for method "', a, '", via proxyId "', b, '" from frame "', d, '".'].join(""));
                return null
            }));
            return _.q.yw[a]
        };
    _.q.bS = function(a, b, c) {
        var d = Array.prototype.slice.call(arguments);
        _.q.II(function(e) {
            e.sameOrigin && (d.unshift("/" + e.claimedOpenerId + "|" + window.location.protocol + "//" + window.location.host), _.Lf.call.apply(_.Lf, d))
        })
    };
    _.q.BZ = function(a, b) {
        _.Lf.register(a, b)
    };
    var yp = /^[-_.0-9A-Za-z]+$/,
        Xp = {
            open: "open",
            onready: "ready",
            close: "close",
            onresize: "resize",
            onOpen: "open",
            onReady: "ready",
            onClose: "close",
            onResize: "resize",
            onRenderStart: "renderstart"
        },
        Yp = {
            onBeforeParentOpen: "beforeparentopen"
        },
        Zp = {
            onOpen: function(a) {
                var b = a.lc();
                a.ug(b.container || b.element);
                return a
            },
            onClose: function(a) {
                a.remove()
            }
        };
    _.q.Hl = function(a) {
        var b = _.oe();
        _.qe(_.Vj, b);
        _.qe(a, b);
        return b
    };
    var Kp = function(a, b, c, d, e, f, g, k) {
        this.config = Jp(a);
        this.openParams = this.Br = b || {};
        this.params = c || {};
        this.methods = d;
        this.ex = !1;
        $p(this, b.style);
        this.Cp = {};
        aq(this, function() {
            var l;
            (l = this.Br.style) && _.q.ts[l] ? l = _.q.ts[l] : l ? (_.Gf(['Missing handler for style "', l, '". Continuing with default handler.'].join("")), l = null) : l = Zp;
            if (l) {
                if ("function" === typeof l) var m = l(this);
                else {
                    var n = {};
                    for (m in l) {
                        var p = l[m];
                        n[m] = "function" === typeof p ? _.q.util.Qs.makeClosure(l, p, this) : p
                    }
                    m = n
                }
                for (var u in e) l = m[u], "function" ===
                    typeof l && bq(this, e[u], _.q.util.Qs.makeClosure(m, l))
            }
            f && bq(this, "close", f)
        });
        this.$i = this.ac = g;
        this.IC = (k || []).slice();
        g && this.IC.unshift(g.ma())
    };
    Kp.prototype.lc = function() {
        return this.Br
    };
    Kp.prototype.getParams = function() {
        return this.params
    };
    Kp.prototype.Fu = function() {
        return this.methods
    };
    Kp.prototype.Qc = function() {
        return this.$i
    };
    var $p = function(a, b) {
            a.ex || ((b = b && !_.q.ts[b] && _.q.kz[b]) ? (a.jz = [], b(function() {
                a.ex = !0;
                for (var c = 0, d = a.jz.length; c < d; ++c) a.jz[c].call(a)
            })) : a.ex = !0)
        },
        aq = function(a, b) {
            a.ex ? b.call(a) : a.jz.push(b)
        };
    Kp.prototype.Td = function(a, b) {
        aq(this, function() {
            bq(this, a, b)
        })
    };
    var bq = function(a, b, c) {
        a.Cp[b] = a.Cp[b] || [];
        a.Cp[b].push(c)
    };
    Kp.prototype.xm = function(a, b) {
        aq(this, function() {
            var c = this.Cp[a];
            if (c)
                for (var d = 0, e = c.length; d < e; ++d)
                    if (c[d] === b) {
                        c.splice(d, 1);
                        break
                    }
        })
    };
    Kp.prototype.$g = function(a, b) {
        var c = this.Cp[a];
        if (c)
            for (var d = Array.prototype.slice.call(arguments, 1), e = 0, f = c.length; e < f; ++e) try {
                var g = c[e].apply({}, d)
            } catch (k) {
                _.Ff(['Exception when calling callback "', a, '" with exception "', k.name, ": ", k.message, '".'].join("")), xp(k)
            }
        return g
    };
    var cq = function(a) {
            return "number" == typeof a ? {
                value: a,
                dA: a + "px"
            } : "100%" == a ? {
                value: 100,
                dA: "100%",
                iK: !0
            } : null
        },
        dq = function(a, b, c, d, e, f, g) {
            Kp.call(this, a, b, c, d, Xp, e, f, g);
            this.id = b.id || vp();
            this.Nr = b.rpctoken && String(b.rpctoken) || Math.round(1E9 * (0, _.vg)());
            this.JW = Ip(this.params, this.config);
            this.Sz = {};
            aq(this, function() {
                this.$g("open");
                _.Cp(this.Sz, this)
            })
        };
    Lp(dq);
    _.h = dq.prototype;
    _.h.ug = function(a, b) {
        if (!this.config.url) return _.Ff("Cannot open iframe, empty URL."), this;
        var c = this.id;
        _.q.uk[c] = this;
        var d = _.Cp(this.methods);
        d._ready = this.gw;
        d._close = this.close;
        d._open = this.vL;
        d._resizeMe = this.iM;
        d._renderstart = this.oL;
        var e = this.JW;
        this.Nr && (e.rpctoken = this.Nr);
        e._methods = _.Ep(d, c, "", this, !0);
        this.el = a = "string" === typeof a ? document.getElementById(a) : a;
        d = {};
        d.id = c;
        if (b) {
            d.attributes = b;
            var f = b.style;
            if ("string" === typeof f) {
                if (f) {
                    var g = [];
                    f = f.split(";");
                    for (var k = 0, l = f.length; k <
                        l; ++k) {
                        var m = f[k];
                        if (0 != m.length || k + 1 != l) m = m.split(":"), 2 == m.length && m[0].match(/^[ a-zA-Z_-]+$/) && m[1].match(/^[ +.%0-9a-zA-Z_-]+$/) ? g.push(m.join(":")) : _.Ff(['Iframe style "', f[k], '" not allowed.'].join(""))
                    }
                    g = g.join(";")
                } else g = "";
                b.style = g
            }
        }
        this.lc().allowPost && (d.allowPost = !0);
        this.lc().forcePost && (d.forcePost = !0);
        d.queryParams = this.params;
        d.fragmentParams = e;
        d.paramsSerializer = wp;
        this.eh = _.jk(this.config.url, a, d);
        a = this.eh.getAttribute("data-postorigin") || this.eh.src;
        _.q.uk[c] = this;
        _.Lf.setAuthToken(this.id,
            this.Nr);
        _.Lf.setRelayUrl(this.id, a);
        return this
    };
    _.h.Vg = function(a, b) {
        this.Sz[a] = b
    };
    _.h.ma = function() {
        return this.id
    };
    _.h.Ma = function() {
        return this.eh
    };
    _.h.Db = function() {
        return this.el
    };
    _.h.Rf = function(a) {
        this.el = a
    };
    _.h.gw = function(a) {
        var b = Gp(a, this.id, "");
        this.$i && "function" == typeof this.methods._ready && (a._methods = _.Ep(b, this.$i.ma(), this.id, this, !1), this.methods._ready(a));
        _.Cp(a, this);
        _.Cp(b, this);
        this.$g("ready", a)
    };
    _.h.oL = function(a) {
        this.$g("renderstart", a)
    };
    _.h.close = function(a) {
        a = this.$g("close", a);
        delete _.q.uk[this.id];
        return a
    };
    _.h.remove = function() {
        var a = document.getElementById(this.id);
        a && a.parentNode && a.parentNode.removeChild(a)
    };
    _.h.vL = function(a) {
        var b = Gp(a.params, this.id, a.proxyId);
        delete a.params._methods;
        "_parent" == a.openParams.anchor && (a.openParams.anchor = this.el);
        if (Hp(a.openParams)) new eq(a.url, a.openParams, a.params, b, b._onclose, this, a.openedByProxyChain);
        else {
            var c = new dq(a.url, a.openParams, a.params, b, b._onclose, this, a.openedByProxyChain),
                d = this;
            aq(c, function() {
                var e = {
                        childId: c.ma()
                    },
                    f = c.Sz;
                f._toclose = c.close;
                e._methods = _.Ep(f, d.id, c.id, c, !1);
                b._onopen(e)
            })
        }
    };
    _.h.iM = function(a) {
        if (void 0 === this.$g("resize", a) && this.eh) {
            var b = cq(a.width);
            null != b && (this.eh.style.width = b.dA);
            a = cq(a.height);
            null != a && (this.eh.style.height = a.dA);
            this.eh.parentElement && (null != b && b.iK || null != a && a.iK) && (this.eh.parentElement.style.display = "block")
        }
    };
    var eq = function(a, b, c, d, e, f, g) {
        Kp.call(this, a, b, c, d, Yp, e, f, g);
        this.url = a;
        this.Im = null;
        this.ZC = vp();
        aq(this, function() {
            this.$g("beforeparentopen");
            var k = _.Cp(this.methods);
            k._onopen = this.TY;
            k._ready = this.gw;
            k._onclose = this.RY;
            this.params._methods = _.Ep(k, "..", this.ZC, this, !0);
            k = {};
            for (m in this.params) k[m] = wp(this.params[m]);
            var l = this.config.url;
            if (this.Br.hideUrlFromParent) {
                var m = window.name;
                var n = l;
                l = _.Jj(this.config.url, this.params, {}, wp);
                var p = k;
                k = {};
                k._methods = p._methods;
                k["#opener"] = p["#opener"];
                k["#urlindex"] = p["#urlindex"];
                k["#opener"] && void 0 != p["#urlindex"] ? (k["#opener"] = m + "," + k["#opener"], m = n) : (n = _.ne(_.ze, "fUrl", []), p = n.length, n[p] = l, _.ze.rUrl = Sp, k["#opener"] = m, k["#urlindex"] = p, m = _.sg(_.je.location.href), l = _.S("iframes/relay_url_" + encodeURIComponent(m)) || "/_/gapi/sibling/1/frame.html", m += l);
                l = m
            }
            _.en._open({
                url: l,
                openParams: this.Br,
                params: k,
                proxyId: this.ZC,
                openedByProxyChain: this.IC
            })
        })
    };
    Lp(eq);
    eq.prototype.$U = function() {
        return this.Im
    };
    eq.prototype.TY = function(a) {
        this.Im = a.childId;
        var b = Gp(a, "..", this.Im);
        _.Cp(b, this);
        this.close = b._toclose;
        _.q.uk[this.Im] = this;
        this.$i && this.methods._onopen && (a._methods = _.Ep(b, this.$i.ma(), this.Im, this, !1), this.methods._onopen(a))
    };
    eq.prototype.gw = function(a) {
        var b = String(this.Im),
            c = Gp(a, "..", b);
        _.Cp(a, this);
        _.Cp(c, this);
        this.$g("ready", a);
        this.$i && this.methods._ready && (a._methods = _.Ep(c, this.$i.ma(), b, this, !1), this.methods._ready(a))
    };
    eq.prototype.RY = function(a) {
        if (this.$i && this.methods._onclose) this.methods._onclose(a);
        else return a = this.$g("close", a), delete _.q.uk[this.Im], a
    };
    var fq = function(a, b, c, d, e, f, g) {
        Kp.call(this, a, b, c, d, Yp, f, g);
        this.id = b.id || vp();
        this.t1 = e;
        d._close = this.close;
        this.onClosed = this.hL;
        this.mO = 0;
        aq(this, function() {
            this.$g("beforeparentopen");
            var k = _.Cp(this.methods);
            this.params._methods = _.Ep(k, "..", this.ZC, this, !0);
            k = {};
            k.queryParams = this.params;
            a = _.ak(_.ke, this.config.url, this.id, k);
            var l = e.openWindow(a);
            this.canAutoClose = function(m) {
                m(e.FG(l))
            };
            e.ZM(l, this);
            this.mO = l
        })
    };
    Lp(fq);
    fq.prototype.close = function(a) {
        a = this.$g("close", a);
        this.t1.WG(this.mO);
        return a
    };
    fq.prototype.hL = function() {
        this.$g("close")
    };
    (function() {
        _.q.uk = {};
        _.q.ts = {};
        _.q.kz = {};
        _.q.LJ = 0;
        _.q.yw = {};
        _.q.In = {};
        _.q.mw = null;
        _.q.lw = [];
        _.q.cZ = function(c) {
            var d = !1;
            try {
                if (null != c) {
                    var e = window.parent.frames[c.id];
                    d = e.iframer.id == c.id && e.iframes.openedId_(_.en.id)
                }
            } catch (f) {}
            try {
                _.q.mw = {
                    origin: this.origin,
                    referer: this.referer,
                    claimedOpenerId: c && c.id,
                    claimedOpenerProxyChain: c && c.proxyChain || [],
                    sameOrigin: d
                };
                for (c = 0; c < _.q.lw.length; ++c) _.q.lw[c](_.q.mw);
                _.q.lw = []
            } catch (f) {
                xp(f)
            }
        };
        _.q.KU = function(c) {
            var d = c && c.$i,
                e = null;
            d && (e = {}, e.id = d.ma(), e.proxyChain =
                c.IC);
            return e
        };
        Vp();
        if (window.parent != window) {
            var a = Tp();
            a.gcv && zp(a.gcv);
            var b = a.jsh;
            b && Ap(b);
            _.Cp(Gp(a, "..", ""), _.en);
            _.Cp(a, _.en);
            Wp()
        }
        _.q.tb = Mp;
        _.q.qc = Np;
        _.q.g0 = Qp;
        _.q.resize = Pp;
        _.q.XT = function(c) {
            return _.q.kz[c]
        };
        _.q.JD = function(c, d) {
            _.q.kz[c] = d
        };
        _.q.gM = Pp;
        _.q.H0 = Qp;
        _.q.Vu = {};
        _.q.Vu.get = Mp;
        _.q.Vu.set = Np;
        _.q.allow = function(c, d) {
            Dp(c);
            _.q.In[c] = d || window[c]
        };
        _.q.Gaa = function(c) {
            delete _.q.In[c]
        };
        _.q.open = function(c, d, e, f, g, k) {
            3 == arguments.length ? f = {} : 4 == arguments.length && "function" === typeof f &&
                (g = f, f = {});
            var l = "bubble" === d.style && Op ? Op.lb() : null;
            return l ? new fq(c, d, e, f, l, g, k) : Hp(d) ? new eq(c, d, e, f, g, k) : new dq(c, d, e, f, g, k)
        };
        _.q.close = function(c, d) {
            _.en && _.en._close && _.en._close(c, d)
        };
        _.q.ready = function(c, d, e) {
            2 == arguments.length && "function" === typeof d && (e = d, d = {});
            var f = c || {};
            "height" in f || (f.height = _.Pl());
            f._methods = _.Ep(d || {}, "..", "", _.en, !0);
            _.en && _.en._ready && _.en._ready(f, e)
        };
        _.q.II = function(c) {
            _.q.mw ? c(_.q.mw) : _.q.lw.push(c)
        };
        _.q.XY = function(c) {
            return !!_.q.uk[c]
        };
        _.q.iU = function() {
            return ["https://ssl.gstatic.com/gb/js/",
                _.S("googleapis.config/gcv")
            ].join("")
        };
        _.q.QL = function(c) {
            var d = {
                mouseover: 1,
                mouseout: 1
            };
            if (_.en._event)
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    f in d && document.addEventListener(f, function(g) {
                        _.en._event({
                            event: g.type,
                            timestamp: (new Date).getTime()
                        })
                    }, !0)
                }
        };
        _.q.q0 = Ap;
        _.q.ED = Bp;
        _.q.CK = xp;
        _.q.NJ = _.en
    })();
    _.C("iframes.allow", _.q.allow);
    _.C("iframes.callSiblingOpener", _.q.bS);
    _.C("iframes.registerForOpenedSibling", _.q.BZ);
    _.C("iframes.close", _.q.close);
    _.C("iframes.getGoogleConnectJsUri", _.q.iU);
    _.C("iframes.getHandler", _.q.tb);
    _.C("iframes.getDeferredHandler", _.q.XT);
    _.C("iframes.getParentInfo", _.q.II);
    _.C("iframes.iframer", _.q.NJ);
    _.C("iframes.open", _.q.open);
    _.C("iframes.openedId_", _.q.XY);
    _.C("iframes.propagate", _.q.QL);
    _.C("iframes.ready", _.q.ready);
    _.C("iframes.resize", _.q.resize);
    _.C("iframes.setGoogleConnectJsVersion", _.q.g0);
    _.C("iframes.setBootstrapHint", _.q.ED);
    _.C("iframes.setJsHint", _.q.q0);
    _.C("iframes.setHandler", _.q.qc);
    _.C("iframes.setDeferredHandler", _.q.JD);
    _.C("IframeBase", Kp);
    _.C("IframeBase.prototype.addCallback", Kp.prototype.Td);
    _.C("IframeBase.prototype.getMethods", Kp.prototype.Fu);
    _.C("IframeBase.prototype.getOpenerIframe", Kp.prototype.Qc);
    _.C("IframeBase.prototype.getOpenParams", Kp.prototype.lc);
    _.C("IframeBase.prototype.getParams", Kp.prototype.getParams);
    _.C("IframeBase.prototype.removeCallback", Kp.prototype.xm);
    _.C("Iframe", dq);
    _.C("Iframe.prototype.close", dq.prototype.close);
    _.C("Iframe.prototype.exposeMethod", dq.prototype.Vg);
    _.C("Iframe.prototype.getId", dq.prototype.ma);
    _.C("Iframe.prototype.getIframeEl", dq.prototype.Ma);
    _.C("Iframe.prototype.getSiteEl", dq.prototype.Db);
    _.C("Iframe.prototype.openInto", dq.prototype.ug);
    _.C("Iframe.prototype.remove", dq.prototype.remove);
    _.C("Iframe.prototype.setSiteEl", dq.prototype.Rf);
    _.C("Iframe.prototype.addCallback", dq.prototype.Td);
    _.C("Iframe.prototype.getMethods", dq.prototype.Fu);
    _.C("Iframe.prototype.getOpenerIframe", dq.prototype.Qc);
    _.C("Iframe.prototype.getOpenParams", dq.prototype.lc);
    _.C("Iframe.prototype.getParams", dq.prototype.getParams);
    _.C("Iframe.prototype.removeCallback", dq.prototype.xm);
    _.C("IframeProxy", eq);
    _.C("IframeProxy.prototype.getTargetIframeId", eq.prototype.$U);
    _.C("IframeProxy.prototype.addCallback", eq.prototype.Td);
    _.C("IframeProxy.prototype.getMethods", eq.prototype.Fu);
    _.C("IframeProxy.prototype.getOpenerIframe", eq.prototype.Qc);
    _.C("IframeProxy.prototype.getOpenParams", eq.prototype.lc);
    _.C("IframeProxy.prototype.getParams", eq.prototype.getParams);
    _.C("IframeProxy.prototype.removeCallback", eq.prototype.xm);
    _.C("IframeWindow", fq);
    _.C("IframeWindow.prototype.close", fq.prototype.close);
    _.C("IframeWindow.prototype.onClosed", fq.prototype.hL);
    _.C("iframes.util.getTopMostAccessibleWindow", _.q.util.Qs.iba);
    _.C("iframes.handlers.get", _.q.Vu.get);
    _.C("iframes.handlers.set", _.q.Vu.set);
    _.C("iframes.resizeMe", _.q.gM);
    _.C("iframes.setVersionOverride", _.q.H0);
    Kp.prototype.send = function(a, b, c) {
        _.q.vM(this, a, b, c)
    };
    _.en.send = function(a, b, c) {
        _.q.vM(_.en, a, b, c)
    };
    Kp.prototype.register = function(a, b) {
        var c = this;
        c.Td(a, function(d) {
            b.call(c, d)
        })
    };
    _.q.vM = function(a, b, c, d) {
        var e = [];
        void 0 !== c && e.push(c);
        d && e.push(function(f) {
            d.call(this, [f])
        });
        a[b] && a[b].apply(a, e)
    };
    _.q.Gx = function() {
        return !0
    };
    _.C("iframes.CROSS_ORIGIN_IFRAMES_FILTER", _.q.Gx);
    _.C("IframeBase.prototype.send", Kp.prototype.send);
    _.C("IframeBase.prototype.register", Kp.prototype.register);
    _.C("Iframe.prototype.send", dq.prototype.send);
    _.C("Iframe.prototype.register", dq.prototype.register);
    _.C("IframeProxy.prototype.send", eq.prototype.send);
    _.C("IframeProxy.prototype.register", eq.prototype.register);
    _.C("IframeWindow.prototype.send", fq.prototype.send);
    _.C("IframeWindow.prototype.register", fq.prototype.register);
    _.C("iframes.iframer.send", _.q.NJ.send);

    var Us = _.q.qc,
        Vs = {
            open: function(a) {
                var b = _.Zm(a.lc());
                return a.ug(b, {
                    style: _.$m(b)
                })
            },
            attach: function(a, b) {
                var c = _.Zm(a.lc()),
                    d = b.id,
                    e = b.getAttribute("data-postorigin") || b.src,
                    f = /#(?:.*&)?rpctoken=(\d+)/.exec(e);
                f = f && f[1];
                a.id = d;
                a.Nr = f;
                a.el = c;
                a.eh = b;
                _.q.uk[d] = a;
                b = _.Cp(a.methods);
                b._ready = a.gw;
                b._close = a.close;
                b._open = a.vL;
                b._resizeMe = a.iM;
                b._renderstart = a.oL;
                _.Ep(b, d, "", a, !0);
                _.Lf.setAuthToken(a.id, a.Nr);
                _.Lf.setRelayUrl(a.id, e);
                c = _.q.Hl({
                    style: _.$m(c)
                });
                for (var g in c) Object.prototype.hasOwnProperty.call(c,
                    g) && ("style" == g ? a.eh.style.cssText = c[g] : a.eh.setAttribute(g, c[g]))
            }
        };
    Vs.onready = _.an;
    Vs.onRenderStart = _.an;
    Vs.close = _.bn;
    Us("inline", Vs);

    var cz, dz, ez, fz, gz, uz, vz, wz, xz, yz, zz, Bz, Cz, Dz, Ez, Fz, Gz, Hz, Iz, Jz, Kz, Lz, Mz, Nz, Oz, Pz, Qz, Rz, Sz, Tz, Uz, Vz, Wz, Xz, Yz, Zz, $z, aA, bA, cA, dA, eA, hA, gA, iA, jA, kA, lA, mA, nA, pA, qA, sA;
    _.bz = function(a, b) {
        if (_.ih && !b) return _.A.atob(a);
        var c = "";
        _.Wv(a, function(d) {
            c += String.fromCharCode(d)
        });
        return c
    };
    cz = function(a) {
        var b = String(a("immediate") || "");
        a = String(a("prompt") || "");
        return "true" === b || "none" === a
    };
    dz = function(a) {
        return _.S("enableMultilogin") && a("cookie_policy") && !cz(a) ? !0 : !1
    };
    gz = function() {
        var a, b = null;
        _.Fy.iterate(function(c, d) {
            0 === c.indexOf("G_AUTHUSER_") && (c = _.Gy(c.substring(11)), !a || c.Fe && !a.Fe || c.Fe == a.Fe && c.Ah > a.Ah) && (a = c, b = d)
        });
        return {
            YR: a,
            authuser: b
        }
    };
    uz = [".APPS.GOOGLEUSERCONTENT.COM", "@DEVELOPER.GSERVICEACCOUNT.COM"];
    vz = function(a) {
        a = a.toUpperCase();
        for (var b = 0, c = uz.length; b < c; ++b) {
            var d = a.split(uz[b]);
            2 == d.length && "" === d[1] && (a = d[0])
        }
        a = a.replace(/-/g, "_").toUpperCase();
        40 < a.length && (b = new _.Rh, b.tx(a), a = b.Sg().toUpperCase());
        return a
    };
    wz = function(a) {
        if (!a) return [];
        a = a.split("=");
        return a[1] ? a[1].split("|") : []
    };
    xz = function(a) {
        a = a.split(":");
        return {
            clientId: a[0].split("=")[1],
            P_: wz(a[1]),
            Fba: wz(a[2]),
            Naa: wz(a[3])
        }
    };
    yz = function(a) {
        var b = gz(),
            c = b.YR;
        b = b.authuser;
        var d = a && vz(a);
        if (null !== b) {
            var e;
            _.Fy.iterate(function(g, k) {
                (g = _.Hy(g)) && g.OB && (d && g.pS != d || g.Fe == c.Fe && g.Ah == c.Ah && (e = k))
            });
            if (e) {
                var f = xz(e);
                a = f && f.P_[Number(b)];
                f = f && f.clientId;
                if (a) return {
                    authuser: b,
                    oca: a,
                    clientId: f
                }
            }
        }
        return null
    };
    zz = function(a, b) {
        a = _.Mh(a);
        if (!a || !b && a.error) return null;
        b = Math.floor((new Date).getTime() / 1E3);
        return a.expires_at && b > a.expires_at ? null : a
    };
    _.Az = function(a, b) {
        if (b) {
            var c = b;
            var d = a
        } else "string" === typeof a ? d = a : c = a;
        c ? _.Yv(c, d) : _.Zv(d)
    };
    Bz = function(a) {
        if (!a) return null;
        "single_host_origin" !== a && (a = _.sg(a));
        var b = window.location.hostname,
            c = b,
            d = _.Ey;
        if ("single_host_origin" !== a) {
            c = a.split("://");
            if (2 == c.length) d = "https" === c.shift();
            else return _.Df("WARNING invalid cookie_policy: " + a), null;
            c = c[0]
        }
        if (-1 !== c.indexOf(":")) c = b = "";
        else {
            a = "." + c;
            if (b.lastIndexOf(a) !== b.length - a.length) return _.Df("Invalid cookie_policy domain: " + c), null;
            c = a;
            b = c.split(".").length - 1
        }
        return {
            domain: c,
            Fe: d,
            Ah: b
        }
    };
    Cz = function(a) {
        var b = Bz(a);
        if (!b) return new _.yy("G_USERSTATE_");
        a = ["G_USERSTATE_", _.Ey && b.Fe ? "S" : "H", b.Ah].join("");
        var c = _.Ly[a];
        c || (c = {
            HK: 63072E3
        }, _.qe(_.Oy(b), c), c = new _.vy(a, c), _.Ly[a] = c, b = c.read(), "undefined" !== typeof b && null !== b && (document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/", c.write(b)));
        return c
    };
    Dz = function(a) {
        var b = Cz(a).read();
        a = _.oe();
        if (b) {
            b = b.split(":");
            for (var c; c = b.shift();) c = c.split("="), a[c[0]] = c[1]
        }
        return a
    };
    Ez = function(a, b, c) {
        var d = Dz(b),
            e = d[a];
        d[a] = "0";
        var f = [];
        _.Vl(d, function(k, l) {
            f.push(l + "=" + k)
        });
        var g = f.join(":");
        b = Cz(b);
        g ? b.write(g) : b.clear();
        d[a] !== e && c && c()
    };
    Fz = function(a, b) {
        b = Dz(b);
        return "0" == b[a] || "X" == b[a]
    };
    Gz = function(a) {
        a = Bz(a.g_user_cookie_policy);
        if (!a || a.Fe && !_.Ey) a = null;
        else {
            var b = ["G_AUTHUSER_", _.Ey && a.Fe ? "S" : "H", a.Ah].join(""),
                c = _.Ky[b];
            c || (c = new _.Fy(b, _.Oy(a)), _.Ky[b] = c);
            a = c
        }
        _.He("googleapis.config/sessionIndex", null);
        a.clear()
    };
    Hz = function(a) {
        return cz(function(b) {
            return a[b]
        })
    };
    Iz = 0;
    Jz = !1;
    Kz = [];
    Lz = {};
    Mz = {};
    Nz = null;
    Oz = function(a) {
        var b = _.Vy;
        return function(c) {
            if (this.f == b && this.t == _.Lf.getAuthToken(this.f) && this.origin == _.Lf.getTargetOrigin(this.f)) return a.apply(this, arguments)
        }
    };
    Pz = function(a) {
        "function" === typeof a.setAttribute ? a.setAttribute("aria-hidden", "true") : a["aria-hidden"] = "true"
    };
    Qz = function(a) {
        if (_.Wy && a && !decodeURIComponent(a).startsWith("m;/_/scs/")) throw Error("ra");
    };
    Rz = function(a) {
        var b = _.Oe.getUrlParameters,
            c = b(a).jsh;
        if (null != c) return Qz(c), a;
        if (b = String(b().jsh || _.ze.h || "")) Qz(b), c = (a + "#").indexOf("#"), a = a.substr(0, c) + (-1 !== a.substr(0, c).indexOf("?") ? "&" : "?") + "jsh=" + encodeURIComponent(b) + a.substr(c);
        return a
    };
    Sz = function() {
        return !!_.S("oauth-flow/usegapi")
    };
    Tz = function(a, b) {
        Sz() ? Nz.unregister(a) : _.Lf.unregister(a + ":" + b)
    };
    Uz = function(a, b, c) {
        Sz() ? Nz.register(a, c, _.Bm) : _.Lf.register(a + ":" + b, Oz(c))
    };
    Vz = function() {
        ez.parentNode.removeChild(ez)
    };
    Wz = function(a) {
        var b = ez;
        _.Ty(b, [{
            sw: "-webkit-transform",
            duration: 1,
            timing: "ease",
            delay: 0
        }]);
        _.Ty(b, [{
            sw: "transform",
            duration: 1,
            timing: "ease",
            delay: 0
        }]);
        _.Lx(function() {
            b.style.webkitTransform = "translate3d(0px," + a + "px,0px)";
            b.style.transform = "translate3d(0px," + a + "px,0px)"
        }, 0)
    };
    Xz = function() {
        var a = fz + 88;
        Wz(a);
        fz = a
    };
    Yz = function() {
        var a = fz - 88;
        Wz(a);
        fz = a
    };
    Zz = function(a) {
        var b = a ? Xz : Yz,
            c = a ? Yz : Xz;
        a = a ? "-" : "";
        fz = parseInt(a + 88, 10);
        ez.style.webkitTransform = "translate3d(0px," + a + 88 + "px,0px)";
        ez.style.transform = "translate3d(0px," + a + 88 + "px,0px)";
        ez.style.display = "";
        ez.style.visibility = "visible";
        b();
        _.Lx(c, 4E3);
        _.Lx(Vz, 5E3)
    };
    $z = function(a) {
        var b = _.S("oauth-flow/toast/position");
        "top" !== b && (b = "bottom");
        var c = document.createElement("div");
        ez = c;
        c.style.cssText = "position:fixed;left:0px;z-index:1000;width:100%;";
        _.vr(c, "visibility", "hidden");
        _.vr(c, b, "-40px");
        _.vr(c, "height", "128px");
        var d = c;
        if ("desktop" == _.S("deviceType")) {
            d = document.createElement("div");
            d.style.cssText = "float:left;position:relative;left:50%;";
            c.appendChild(d);
            var e = document.createElement("div");
            e.style.cssText = "float:left;position:relative;left:-50%";
            d.appendChild(e);
            d = e
        }
        e = "top" == b ? "-" : "";
        fz = parseInt(e + 88, 10);
        ez.style.webkitTransform = "translate3d(0px," + e + 88 + "px,0px)";
        ez.style.transform = "translate3d(0px," + e + 88 + "px,0px)";
        e = window;
        try {
            for (; e.parent != e && e.parent.document;) e = e.parent
        } catch (f) {}
        e = e.document.body;
        try {
            e.insertBefore(c, e.firstChild)
        } catch (f) {}
        _.Wl.Wh({
            url: ":socialhost:/:session_prefix:_/widget/oauthflow/toast",
            queryParams: {
                clientId: a.client_id,
                idToken: a.id_token
            },
            where: d,
            onRestyle: function() {
                "top" === b ? Zz(!0) : Zz(!1)
            }
        })
    };
    aA = function(a) {
        var b = _.on(),
            c = b && b.scope;
        b = a && a.scope;
        b = "string" === typeof b ? b.split(" ") : b || [];
        if (c) {
            c = c.split(" ");
            for (var d = 0; d < c.length; ++d) {
                var e = c[d]; - 1 == _.vj.call(b, e) && b.push(e)
            }
            0 < b.length && (a.scope = b.join(" "))
        }
        return a
    };
    bA = function(a, b) {
        var c = null;
        a && b && (c = b.client_id = b.client_id || a.client_id, b.scope = b.scope || a.scope, b.g_user_cookie_policy = a.cookie_policy, b.cookie_policy = b.cookie_policy || a.cookie_policy, b.response_type = b.response_type || a.response_type);
        if (b) {
            b.issued_at || (b.issued_at = String(Math.floor((new Date).getTime() / 1E3)));
            var d = parseInt(b.expires_in, 10) || 86400;
            b.error && (d = _.S("oauth-flow/errorMaxAge") || 86400);
            b.expires_in = String(d);
            b.expires_at || (b.expires_at = String(Math.floor((new Date).getTime() / 1E3) + d));
            b._aa || b.error || null != yz(c) || !Hz(a) || (b._aa = "1");
            a = b.status = {};
            a.google_logged_in = !!b.session_state;
            c = a.signed_in = !!b.access_token;
            a.method = c ? b["g-oauth-window"] ? "PROMPT" : "AUTO" : null
        }
        return b
    };
    cA = function(a) {
        a = a && a.id_token;
        if (!a || !a.split(".")[1]) return null;
        a = (a.split(".")[1] + "...").replace(/^((....)+)\.?\.?\.?$/, "$1");
        a = _.yf(_.bz(a, !0));
        if (!1 === a) throw Error("sa");
        return a
    };
    dA = function(a) {
        return (a = cA(a)) ? a.sub : null
    };
    eA = function(a) {
        a && Kz.push(a);
        a = _.Vy;
        var b = document.getElementById(a),
            c = (new Date).getTime();
        if (b) {
            if (Iz && 6E4 > c - Iz) return;
            var d = _.Lf.getAuthToken(a);
            d && (Tz("oauth2relayReady", d), Tz("oauth2callback", d));
            b.parentNode.removeChild(b);
            if (/Firefox/.test(navigator.userAgent)) try {
                window.frames[a] = void 0
            } catch (f) {}
            _.Xy();
            a = _.Vy
        }
        Iz = c;
        var e = String(2147483647 * (0, _.vg)() | 0);
        b = _.S("oauth-flow/proxyUrl") || _.S("oauth-flow/relayUrl");
        Sz() ? Nz = _.Wl.Wh({
            where: _.Oe.getBodyElement(),
            url: b,
            id: a,
            attributes: {
                style: {
                    width: "1px",
                    height: "1px",
                    position: "absolute",
                    top: "-100px",
                    display: "none"
                },
                "aria-hidden": "true"
            },
            dontclear: !0
        }) : (b = [b, "?parent=", encodeURIComponent(_.qg.getOrigin(window.location.href)), "#rpctoken=", e, "&forcesecure=1"].join(""), c = _.Oe.getBodyElement(), d = _.Oe.createIframeElement({
            name: a,
            id: a
        }), d.src = Rz(b), d.style.width = "1px", d.style.height = "1px", d.style.position = "absolute", d.style.top = "-100px", d.tabIndex = -1, Pz(d), c.appendChild(d), _.Lf.setupReceiver(a));
        Uz("oauth2relayReady", e, function() {
            Tz("oauth2relayReady", e);
            var f = Kz;
            if (null !== f) {
                Kz = null;
                for (var g = 0, k = f.length; g < k; ++g) f[g]()
            }
        });
        Uz("oauth2callback", e, function(f) {
            var g = _.Oe.getUrlParameters;
            g = g(f);
            var k = g.state;
            f = k.replace(/\|.*$/, "");
            f = {}.hasOwnProperty.call(Mz, f) ? Mz[f] : null;
            g.state = f;
            if (null != g.state) {
                f = Lz[k];
                delete Lz[k];
                k = f && f.key || "token";
                var l = g = bA(f && f.params, g);
                var m = (m = dA(l)) ? Fz(m, l.cookie_policy) : !1;
                !m && l && 0 <= (" " + (l.scope || "") + " ").indexOf(" https://www.googleapis.com/auth/plus.login ") && _.S("isLoggedIn") && "1" === (l && l._aa) && (l._aa = "0", Jz || (Jz = !0, $z(l)));
                _.Az(k, g);
                g = zz(k);
                if (f) {
                    k = f.popup;
                    l = f.after_redirect;
                    if (k && "keep_open" != l) try {
                        k.close()
                    } catch (n) {}
                    f.callback && (f.callback(g), f.callback = null)
                }
            }
        })
    };
    _.fA = function(a) {
        null !== Kz ? eA(a) : a && a()
    };
    hA = function(a, b) {
        var c = gA,
            d = dA(a);
        d && (Gz(a), Ez(d, b, function() {
            if (c) {
                var e = {
                    error: "user_signed_out"
                };
                e.client_id = a.client_id;
                e.g_user_cookie_policy = a.g_user_cookie_policy;
                e.scope = a.scope;
                e.response_type = a.response_type;
                e.session_state = a.session_state;
                e = bA(null, e);
                c(e)
            }
        }))
    };
    gA = function(a) {
        a || (a = zz(void 0, !0));
        a && "object" === typeof a || (a = {
            error: "invalid_request",
            error_description: "no callback data"
        });
        var b = a.error_description;
        b && window.console && (window.console.error(a.error), window.console.error(b));
        a.error || (_.ze.drw = null);
        _.Az(a);
        if (b = a.authuser) _.S("googleapis.config/sessionIndex"), _.He("googleapis.config/sessionIndex", b);
        _.Yy.no(_.Zy, a);
        return a
    };
    iA = ["client_id", "cookie_policy", "response_type"];
    jA = "client_id response_type login_hint authuser prompt include_granted_scopes after_redirect access_type hl state".split(" ");
    kA = function(a) {
        var b = _.lk(a);
        b.session_state && b.session_state.extraQueryParams && (b.authuser = b.session_state.extraQueryParams.authuser);
        b.session_state = null;
        a.expires_at && (b.expires_at = parseInt(a.expires_at / 1E3).toString());
        a.expires_in && (b.expires_in = a.expires_in.toString());
        a.first_issued_at && (b.issued_at = parseInt(a.first_issued_at / 1E3).toString(), delete b.first_issued_at);
        _.Yv(b);
        return b
    };
    lA = function(a) {
        if (void 0 === a.include_granted_scopes) {
            var b = _.S("include_granted_scopes");
            a.include_granted_scopes = !!b
        }
    };
    mA = function(a) {
        window.console && ("function" === typeof window.console.warn ? window.console.warn(a) : "function" === typeof window.console.log && window.console.log(a))
    };
    nA = function(a) {
        var b = a || {},
            c = {};
        _.ob(jA, function(d) {
            null != b[d] && (c[d] = b[d])
        });
        a = _.S("googleapis/overrideClientId");
        null != a && (c.client_id = a);
        lA(c);
        "string" === typeof b.scope ? c.scope = b.scope : Array.isArray(b.scope) && (c.scope = b.scope.join(" "));
        null != b["openid.realm"] && (c.openid_realm = b["openid.realm"]);
        null != b.cookie_policy ? c.cookie_policy = b.cookie_policy : null != b.cookiepolicy && (c.cookie_policy = b.cookiepolicy);
        null == c.login_hint && null != b.user_id && (c.login_hint = b.user_id);
        try {
            _.Pw(c.cookie_policy)
        } catch (d) {
            c.cookie_policy &&
                mA("The cookie_policy configuration: '" + c.cookie_policy + "' is illegal, and thus ignored."), delete c.cookie_policy
        }
        null != b.hd && (c.hosted_domain = b.hd);
        null == c.prompt && (1 == b.immediate || "true" == b.immediate ? c.prompt = "none" : "force" == b.approval_prompt && (c.prompt = "consent"));
        "none" == c.prompt && (c.session_selection = "first_valid");
        "none" == c.prompt && "offline" == c.access_type && delete c.access_type;
        "undefined" === typeof c.authuser && (a = _.Ah(), null != a && (c.authuser = a));
        a = b.redirect_uri || _.S("oauth-flow/redirectUri");
        null != a && "postmessage" != a && (c.redirect_uri = a);
        c.gsiwebsdk = "shim";
        return c
    };
    _.oA = function(a, b) {
        var c = nA(a),
            d = new _.Gk(function(e, f) {
                _.ux(c, function(g) {
                    var k = g || {};
                    _.ob(iA, function(l) {
                        null == k[l] && (k[l] = c[l])
                    });
                    !c.include_granted_scopes && a && a.scope && (k.scope = a.scope);
                    a && null != a.state && (k.state = a.state);
                    k.error ? ("none" == c.prompt && "user_logged_out" == k.error && (k.error = "immediate_failed_user_logged_out"), f(k)) : (g = kA(k), null != g.authuser && _.He("googleapis.config/sessionIndex", g.authuser), e(g))
                })
            });
        b && d.then(b, b);
        return d
    };
    pA = _.Kh.hI;
    qA = null;
    _.tA = function(a, b) {
        if ("force" !== a.approvalprompt) {
            a = _.rA(a);
            a.prompt = "none";
            delete a.redirect_uri;
            delete a.approval_prompt;
            delete a.immediate;
            if (b = !b) qA ? (a.client_id !== qA.client_id && window.console && window.console.log && window.console.log("Ignoring mismatched page-level auth param client_id=" + a.client_id), b = !0) : (qA = a, b = !1);
            b || sA(a)
        }
    };
    _.rA = function(a) {
        var b = a.redirecturi || "postmessage",
            c = (0, _.tb)((a.scope || "").replace(/[\s\xa0]+/g, " "));
        b = {
            client_id: a.clientid,
            redirect_uri: b,
            response_type: "code token id_token gsession",
            scope: c
        };
        a.approvalprompt && (b.approval_prompt = a.approvalprompt);
        a.state && (b.state = a.state);
        a.openidrealm && (b["openid.realm"] = a.openidrealm);
        c = "offline" == a.accesstype ? !0 : (c = a.redirecturi) && "postmessage" != c;
        c && (b.access_type = "offline");
        a.requestvisibleactions && (b.request_visible_actions = (0, _.tb)(a.requestvisibleactions.replace(/[\s\xa0]+/g,
            " ")));
        a.after_redirect && (b.after_redirect = a.after_redirect);
        a.cookiepolicy && "none" !== a.cookiepolicy && (b.cookie_policy = a.cookiepolicy);
        "undefined" != typeof a.includegrantedscopes && (b.include_granted_scopes = a.includegrantedscopes);
        a.e && (b.e = a.e);
        (a = a.authuser || _.S("googleapis.config/sessionIndex")) && (b.authuser = a);
        (a = _.S("useoriginassocialhost")) && (b.use_origin_as_socialhost = a);
        return b
    };
    sA = function(a) {
        _.go("waaf0", "signin", "0");
        _.oA(a, function(b) {
            _.go("waaf1", "signin", "0");
            gA(b)
        })
    };
    _.uA = function(a) {
        a = _.rA(a);
        _.He("oauth-flow/authWindowWidth", 445);
        _.He("oauth-flow/authWindowHeight", 615);
        sA(a)
    };
    _.vA = function(a) {
        _.Yy.unsubscribe(_.Zy, a);
        _.Yy.subscribe(_.Zy, a)
    };
    var CA, FA;
    _.xA = function(a) {
        return a.cookiepolicy ? !0 : (_.wA("cookiepolicy is a required field.  See https://developers.google.com/+/web/signin/#button_attr_cookiepolicy for more information."), !1)
    };
    _.wA = function(a) {
        window.console && (window.console.error ? window.console.error(a) : window.console.log && window.console.log(a))
    };
    _.BA = function(a, b) {
        var c = _.on();
        _.qe(a, c);
        c = aA(c);
        if (_.xA(c)) {
            var d = _.yA();
            _.zA(c);
            b ? _.ye(b, "click", function() {
                _.AA(c, d)
            }) : _.AA(c, d)
        }
    };
    _.yA = function() {
        var a = new CA;
        _.vA(function(b) {
            a.iC && b && (b.access_token && _.He("isPlusUser", !0), b["g-oauth-window"] && (a.iC = !1, _.Gf("OTA app install is no longer supported.")))
        });
        return a
    };
    CA = function() {
        this.iC = !1
    };
    _.zA = function(a) {
        a = _.DA(a);
        _.EA(a.callback);
        _.fA(function() {
            _.tA(a)
        })
    };
    _.DA = function(a) {
        FA(a);
        a.redirecturi && delete a.redirecturi;
        dz(function(b) {
            return a[b]
        }) || (a.authuser = 0);
        return a
    };
    FA = function(a) {
        /^\s*$/.test(a.scope || "") && (a.scope = "https://www.googleapis.com/auth/plus.login")
    };
    _.EA = function(a) {
        if ("string" === typeof a)
            if (window[a]) a = window[a];
            else {
                _.wA('Callback function named "' + a + '" not found');
                return
            }
        a && _.vA(a)
    };
    _.AA = function(a, b) {
        b.iC = !0;
        a = _.DA(a);
        _.uA(a)
    };
    _.C("gapi.auth.authorize", _.oA);
    _.C("gapi.auth.checkSessionState", function(a, b) {
        var c = _.oe();
        c.client_id = a.client_id;
        c.session_state = a.session_state;
        _.fA(function() {
            Sz() ? Nz.send("check_session_state", c, function(d) {
                b.call(null, d[0])
            }, _.Bm) : _.Lf.call(_.Vy, "check_session_state", Oz(function(d) {
                b.call(null, d)
            }), c.session_state, c.client_id)
        })
    });
    _.C("gapi.auth.getAuthHeaderValueForFirstParty", pA);
    _.C("gapi.auth.getToken", zz);
    _.C("gapi.auth.getVersionInfo", function(a, b) {
        _.fA(function() {
            var c = _.Ih() || "",
                d = null,
                e = null;
            c && (e = c.split(" "), 2 == e.length && (d = e[1]));
            d ? Sz() ? Nz.send("get_versioninfo", {
                xapisidHash: d,
                sessionIndex: b
            }, function(f) {
                a(f[0])
            }, _.Bm) : _.Lf.call(_.Vy, "get_versioninfo", Oz(function(f) {
                a(f)
            }), d, b) : a()
        })
    });
    _.C("gapi.auth.init", _.fA);
    _.C("gapi.auth.setToken", _.Az);
    _.C("gapi.auth.signIn", function(a) {
        _.BA(a)
    });
    _.C("gapi.auth.signOut", function() {
        var a = zz();
        a && hA(a, a.cookie_policy)
    });
    _.C("gapi.auth.unsafeUnpackIdToken", cA);
    _.C("gapi.auth._pimf", _.tA);
    _.C("gapi.auth._oart", $z);
    _.C("gapi.auth._guss", function(a) {
        return Cz(a).read()
    });

    _.GA = function(a) {
        return !!(a.clientid && a.scope && a.callback)
    };
    _.HA = function() {
        var a = _.on();
        _.GA(a) && !_.S("disableRealtimeCallback") ? _.zA(a) : _.fA()
    };
    _.wk(function() {
        _.HA()
    });

    _.HA = function() {
        var a = _.on();
        _.GA(a) && !_.S("disableRealtimeCallback") && _.zA(a)
    };

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var Dt, Ut, Ot, Yt, Pt, Rt, Qt, Vt, St, Zt;
    _.At = function(a) {
        if (!(a instanceof Array)) {
            a = _.Ha(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    };
    _.Bt = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ _.lb()).toString(36)
    };
    _.Ct = function(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : _.Rd(document, "*", a, b)
    };
    Dt = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };
    _.Et = function(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    };
    _.Ft = /#|$/;
    _.Gt = function(a, b) {
        var c = a.search(_.Ft),
            d = _.Et(a, 0, b, c);
        if (0 > d) return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    };
    _.Ht = function(a, b) {
        this.xc = this.Tf = this.jf = "";
        this.Mf = null;
        this.eA = this.Fk = "";
        this.og = this.jK = !1;
        var c;
        a instanceof _.Ht ? (this.og = void 0 !== b ? b : a.og, _.It(this, a.jf), _.Jt(this, a.Tf), _.Kt(this, a.xc), _.Lt(this, a.Mf), this.setPath(a.getPath()), _.Mt(this, a.Dd.clone()), this.rj(a.yq())) : a && (c = String(a).match(_.nh)) ? (this.og = !!b, _.It(this, c[1] || "", !0), _.Jt(this, c[2] || "", !0), _.Kt(this, c[3] || "", !0), _.Lt(this, c[4]), this.setPath(c[5] || "", !0), _.Mt(this, c[6] || "", !0), this.rj(c[7] || "", !0)) : (this.og = !!b, this.Dd = new _.Nt(null,
            this.og))
    };
    _.Ht.prototype.toString = function() {
        var a = [],
            b = this.jf;
        b && a.push(Ot(b, Pt, !0), ":");
        var c = this.xc;
        if (c || "file" == b) a.push("//"), (b = this.Tf) && a.push(Ot(b, Pt, !0), "@"), a.push(_.lh(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.Mf, null != c && a.push(":", String(c));
        if (c = this.getPath()) this.xc && "/" != c.charAt(0) && a.push("/"), a.push(Ot(c, "/" == c.charAt(0) ? Qt : Rt, !0));
        (c = this.Dd.toString()) && a.push("?", c);
        (c = this.yq()) && a.push("#", Ot(c, St));
        return a.join("")
    };
    _.Ht.prototype.resolve = function(a) {
        var b = this.clone(),
            c = !!a.jf;
        c ? _.It(b, a.jf) : c = !!a.Tf;
        c ? _.Jt(b, a.Tf) : c = !!a.xc;
        c ? _.Kt(b, a.xc) : c = null != a.Mf;
        var d = a.getPath();
        if (c) _.Lt(b, a.Mf);
        else if (c = !!a.Fk) {
            if ("/" != d.charAt(0))
                if (this.xc && !this.Fk) d = "/" + d;
                else {
                    var e = b.getPath().lastIndexOf("/"); - 1 != e && (d = b.getPath().substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e) d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = _.ed(e, "/");
                e = e.split("/");
                for (var f = [], g = 0; g < e.length;) {
                    var k = e[g++];
                    "." == k ? d && g == e.length && f.push("") :
                        ".." == k ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(k), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? b.setPath(d) : c = a.Kn();
        c ? _.Mt(b, a.Dd.clone()) : c = !!a.eA;
        c && b.rj(a.yq());
        return b
    };
    _.Ht.prototype.clone = function() {
        return new _.Ht(this)
    };
    _.It = function(a, b, c) {
        _.Tt(a);
        a.jf = c ? Ut(b, !0) : b;
        a.jf && (a.jf = a.jf.replace(/:$/, ""));
        return a
    };
    _.Jt = function(a, b, c) {
        _.Tt(a);
        a.Tf = c ? Ut(b) : b;
        return a
    };
    _.Kt = function(a, b, c) {
        _.Tt(a);
        a.xc = c ? Ut(b, !0) : b;
        return a
    };
    _.Lt = function(a, b) {
        _.Tt(a);
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("J`" + b);
            a.Mf = b
        } else a.Mf = null;
        return a
    };
    _.Ht.prototype.getPath = function() {
        return this.Fk
    };
    _.Ht.prototype.setPath = function(a, b) {
        _.Tt(this);
        this.Fk = b ? Ut(a, !0) : a;
        return this
    };
    _.Ht.prototype.Kn = function() {
        return "" !== this.Dd.toString()
    };
    _.Mt = function(a, b, c) {
        _.Tt(a);
        b instanceof _.Nt ? (a.Dd = b, a.Dd.PD(a.og)) : (c || (b = Ot(b, Vt)), a.Dd = new _.Nt(b, a.og));
        return a
    };
    _.Ht.prototype.Ua = function(a, b) {
        return _.Mt(this, a, b)
    };
    _.Ht.prototype.getQuery = function() {
        return this.Dd.toString()
    };
    _.Wt = function(a, b, c) {
        _.Tt(a);
        a.Dd.set(b, c);
        return a
    };
    _.Ht.prototype.Kh = function(a) {
        return this.Dd.get(a)
    };
    _.Ht.prototype.yq = function() {
        return this.eA
    };
    _.Ht.prototype.rj = function(a, b) {
        _.Tt(this);
        this.eA = b ? Ut(a) : a;
        return this
    };
    _.Ht.prototype.removeParameter = function(a) {
        _.Tt(this);
        this.Dd.remove(a);
        return this
    };
    _.Tt = function(a) {
        if (a.jK) throw Error("K");
    };
    _.Ht.prototype.PD = function(a) {
        this.og = a;
        this.Dd && this.Dd.PD(a)
    };
    _.Xt = function(a) {
        return a instanceof _.Ht ? a.clone() : new _.Ht(a, void 0)
    };
    Ut = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    };
    Ot = function(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Yt), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    };
    Yt = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    };
    Pt = /[#\/\?@]/g;
    Rt = /[#\?:]/g;
    Qt = /[#\?]/g;
    Vt = /[#\?@]/g;
    St = /#/g;
    _.Nt = function(a, b) {
        this.Wb = this.Bc = null;
        this.Cf = a || null;
        this.og = !!b
    };
    Zt = function(a) {
        a.Bc || (a.Bc = new _.rt, a.Wb = 0, a.Cf && Dt(a.Cf, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    _.h = _.Nt.prototype;
    _.h.Hb = function() {
        Zt(this);
        return this.Wb
    };
    _.h.add = function(a, b) {
        Zt(this);
        this.Cf = null;
        a = $t(this, a);
        var c = this.Bc.get(a);
        c || this.Bc.set(a, c = []);
        c.push(b);
        this.Wb += 1;
        return this
    };
    _.h.remove = function(a) {
        Zt(this);
        a = $t(this, a);
        return this.Bc.Ud(a) ? (this.Cf = null, this.Wb -= this.Bc.get(a).length, this.Bc.remove(a)) : !1
    };
    _.h.clear = function() {
        this.Bc = this.Cf = null;
        this.Wb = 0
    };
    _.h.isEmpty = function() {
        Zt(this);
        return 0 == this.Wb
    };
    _.h.Ud = function(a) {
        Zt(this);
        a = $t(this, a);
        return this.Bc.Ud(a)
    };
    _.h.Sj = function(a) {
        var b = this.Xc();
        return _.$a(b, a)
    };
    _.h.forEach = function(a, b) {
        Zt(this);
        this.Bc.forEach(function(c, d) {
            _.ob(c, function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    _.h.Ae = function() {
        Zt(this);
        for (var a = this.Bc.Xc(), b = this.Bc.Ae(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    _.h.Xc = function(a) {
        Zt(this);
        var b = [];
        if ("string" === typeof a) this.Ud(a) && (b = _.Wc(b, this.Bc.get($t(this, a))));
        else {
            a = this.Bc.Xc();
            for (var c = 0; c < a.length; c++) b = _.Wc(b, a[c])
        }
        return b
    };
    _.h.set = function(a, b) {
        Zt(this);
        this.Cf = null;
        a = $t(this, a);
        this.Ud(a) && (this.Wb -= this.Bc.get(a).length);
        this.Bc.set(a, [b]);
        this.Wb += 1;
        return this
    };
    _.h.get = function(a, b) {
        if (!a) return b;
        a = this.Xc(a);
        return 0 < a.length ? String(a[0]) : b
    };
    _.h.setValues = function(a, b) {
        this.remove(a);
        0 < b.length && (this.Cf = null, this.Bc.set($t(this, a), _.Xc(b)), this.Wb += b.length)
    };
    _.h.toString = function() {
        if (this.Cf) return this.Cf;
        if (!this.Bc) return "";
        for (var a = [], b = this.Bc.Ae(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = _.lh(d);
            d = this.Xc(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + _.lh(d[f]));
                a.push(g)
            }
        }
        return this.Cf = a.join("&")
    };
    _.h.clone = function() {
        var a = new _.Nt;
        a.Cf = this.Cf;
        this.Bc && (a.Bc = this.Bc.clone(), a.Wb = this.Wb);
        return a
    };
    var $t = function(a, b) {
        b = String(b);
        a.og && (b = b.toLowerCase());
        return b
    };
    _.Nt.prototype.PD = function(a) {
        a && !this.og && (Zt(this), this.Cf = null, this.Bc.forEach(function(b, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c), this.setValues(d, b))
        }, this));
        this.og = a
    };
    _.Nt.prototype.extend = function(a) {
        for (var b = 0; b < arguments.length; b++) _.zt(arguments[b], function(c, d) {
            this.add(d, c)
        }, this)
    };

    var IA = function(a) {
            return new _.Gk(function(b) {
                var c = a.length,
                    d = [];
                if (c)
                    for (var e = function(k, l, m) {
                            c--;
                            d[k] = l ? {
                                su: !0,
                                value: m
                            } : {
                                su: !1,
                                reason: m
                            };
                            0 == c && b(d)
                        }, f = 0, g; f < a.length; f++) g = a[f], _.Nk(g, _.ji(e, f, !0), _.ji(e, f, !1));
                else b(d)
            })
        },
        JA, KA, LA, MA = {
            wG: function(a) {
                JA = a;
                try {
                    delete MA.wG
                } catch (b) {}
            },
            xG: function(a) {
                KA = a;
                try {
                    delete MA.xG
                } catch (b) {}
            },
            yG: function(a) {
                LA = a;
                try {
                    delete MA.yG
                } catch (b) {}
            }
        },
        NA = function(a) {
            return _.ey(a.status)
        },
        OA = function() {
            var a = !0,
                b = _.Px(_.Bx);
            b && void 0 !== b.withCredentials || (a = !1);
            return a
        },
        PA = function(a, b) {
            if (null == b) return b;
            b = String(b);
            b.match(/^\/\/.*/) && (b = ("http:" == window.location.protocol ? "http:" : "https:") + b);
            b.match(/^\/([^\/].*)?$/) && window.location.host && String(window.location.protocol).match(/^https?:$/) && (b = window.location.protocol + "//" + window.location.host + b);
            var c = b.match(/^(https?:)(\/\/)?(\/([^\/].*)?)?$/i);
            c && window.location.host && String(window.location.protocol).match(/^https?:$/) && (b = c[1] + "//" + window.location.host + (c[3] || ""));
            b = b.replace(/^(https?:\/\/[^\/?#@]*)\/$/i,
                "$1");
            b = b.replace(/^(http:\/\/[-_a-z0-9.]+):0*80([\/?#].*)?$/i, "$1$2");
            b = b.replace(/^(https:\/\/[-_a-z0-9.]+):0*443([\/?#].*)?$/i, "$1$2");
            b.match(/^https?:\/\/[-_a-z0-9.]*[-_a-z][-_a-z0-9.]*$/i) && (b = b.toLowerCase());
            c = _.S("client/rewrite");
            _.bb(c) && Object.prototype.hasOwnProperty.call(c, b) ? b = String(c[b] || b) : (b = b.replace(/^(https?):\/\/www\.googleapis\.com$/, "$1://content.googleapis.com"), b = b.replace(/^(https?):\/\/www-(googleapis-[-_a-z0-9]+\.[-_a-z0-9]+\.google\.com)$/, "$1://content-$2"), b.match(/^https?:\/\/content(-[-_a-z0-9.]+)?\.googleapis\.com$/) ||
                (b = b.replace(/^(https?):\/\/([-_a-z0-9]+(\.[-_a-z0-9]+)?\.googleapis\.com)$/, "$1://content-$2")));
            a && (a = _.S("client/firstPartyRewrite"), _.bb(a) && Object.prototype.hasOwnProperty.call(a, b) ? b = String(a[b] || b) : (b = b.replace(/^(https?):\/\/content\.googleapis\.com$/, "$1://clients6.google.com"), b = b.replace(/^(https?):\/\/content-([-a-z0-9]+)\.([-a-z0-9]+)\.googleapis\.com$/, "$1://$2-googleapis.$3.google.com"), b = b.replace(/^(https?):\/\/content-([-a-z0-9]+)\.googleapis\.com$/, "$1://$2.clients6.google.com"),
                b = b.replace(/^(https?):\/\/([-a-z0-9]+)-www-googleapis\.([-a-z0-9]+).google.com$/, "$1://content-googleapis-$2.$3.google.com")));
            return b
        },
        QA = function(a) {
            _.Vc.call(this, a)
        },
        VA, WA, XA, YA, ZA, $A, aB, bB, cB, dB, eB, fB, gB, hB, iB;
    _.ii(QA, _.Vc);
    QA.prototype.name = "gapi.client.Error";
    var RA = function(a) {
        if (!a || "function" !== typeof a) throw new QA("Must provide a function.");
        this.Nf = null;
        this.eT = a
    };
    RA.prototype.then = function(a, b, c) {
        this.Nf || (this.Nf = this.eT());
        return this.Nf.then(a, b, c)
    };
    RA.prototype.Uw = function(a) {
        this.Nf || (this.Nf = a)
    };
    var SA = {};
    SA = function(a) {
        var b = {},
            c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = _.Vg(a, c);
                d && (c = _.Ug(c, d)) && _.Wg(b, c, d, !0)
            }
        return b
    };
    var TA = {
            error: {
                code: -1,
                message: "A network error occurred and the request could not be completed."
            }
        },
        UA = function(a, b, c, d) {
            _.gy.call(this);
            this.ld = a;
            this.mC = b;
            this.sd = c;
            a = {};
            if (d)
                for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (b = _.Vg(d, e), void 0 !== b && (e = _.Tg(e, b)) && _.Wg(a, e, b));
            d = {};
            for (e in a) Object.prototype.hasOwnProperty.call(a, e) && (d[unescape(encodeURIComponent(e))] = unescape(encodeURIComponent(a[e])));
            this.Oq = d;
            this.Nf = null
        };
    _.ii(UA, _.gy);
    UA.prototype.then = function(a) {
        this.Nf || (this.Nf = (new _.Gk(function(b, c) {
            this.V("error", (0, _.R)(function() {
                c(VA(this))
            }, this));
            this.V("success", (0, _.R)(function() {
                b(VA(this))
            }, this));
            this.send(this.ld, this.mC, this.sd, this.Oq)
        }, this)).then(function(b) {
            b.headers = SA(b.headers);
            return b
        }, function(b) {
            return b.status ? (b.headers = SA(b.headers), _.Lk(b)) : _.Lk({
                result: TA,
                body: '{"error":{"code":-1,"message":"A network error occurred and the request could not be completed."}}',
                headers: null,
                status: null,
                statusText: null
            })
        }));
        return this.Nf.then.apply(this.Nf, arguments)
    };
    VA = function(a) {
        var b = a.getStatus(),
            c = _.ty(a);
        var d = 204 == b ? !1 : "" == a.Mk ? _.yf(c) : _.uy(a);
        var e = a.getAllResponseHeaders();
        e = _.Xg(e, !1);
        try {
            var f = 2 < _.ry(a) ? a.Oa.statusText : ""
        } catch (g) {
            f = ""
        }
        return {
            result: d,
            body: c,
            headers: e,
            status: b,
            statusText: f
        }
    };
    WA = /;\s*charset\s*=\s*("utf-?8"|utf-?8)\s*(;|$)/i;
    XA = /^(text\/[^\s;\/""]+|application\/(json(\+[^\s;\/""]*)?|([^\s;\/""]*\+)?xml))\s*(;|$)/i;
    YA = /;\s*charset\s*=/i;
    ZA = /(([\r\n]{0,2}[A-Za-z0-9+\/]){4,4}){0,1024}([\r\n]{0,2}[A-Za-z0-9+\/][\r\n]{0,2}[AQgw]([\r\n]{0,2}=){2,2}|([\r\n]{0,2}[A-Za-z0-9+\/]){2,2}[\r\n]{0,2}[AEIMQUYcgkosw048][\r\n]{0,2}=|([\r\n]{0,2}[A-Za-z0-9+\/]){4,4})[\r\n]{0,2}/g;
    $A = function(a) {
        var b = [];
        a = a.replace(ZA, function(c) {
            b.push(_.bz(c));
            return ""
        });
        if (a.length) throw Error("qa");
        return b.join("")
    };
    aB = function(a) {
        var b = a.headers;
        if (b && "base64" === _.Vg(b, "X-Goog-Safety-Encoding")) {
            var c = $A(a.body),
                d = _.Vg(b, "X-Goog-Safety-Content-Type");
            b["Content-Type"] = d;
            if (d.match(WA) || d.match(XA) && !d.match(YA)) c = _.Vv(_.fh(c));
            _.Wg(b, "X-Goog-Safety-Encoding");
            _.Wg(b, "X-Goog-Safety-Content-Type");
            a.body = c
        }
    };
    bB = function(a, b, c) {
        c || ((c = _.S("googleapis.config/proxy")) && (c = String(c).replace(/\/static\/proxy\.html$/, "") || "/"), c = String(c || ""));
        c || (c = _.S("googleapis.config/root"), b && (c = _.S("googleapis.config/root-1p") || c), c = String(c || ""));
        c = String(PA(b, c) || c);
        return a = _.$x(c, a)
    };
    cB = function(a, b) {
        var c = a.params || _.oe();
        c.url = c.path;
        var d = c.root;
        d = bB("/", _.Jh(c.headers), d);
        d.match(/^(.*[^\/])?\/$/) && (d = d.substr(0, d.length - 1));
        c.root = d;
        a.params = c;
        _.fi.lj("makeHttpRequests", [a], function(e, f) {
            e && e.gapiRequest ? (e.gapiRequest.data ? aB(e.gapiRequest.data) : aB(e), b(e, _.zf(e))) : b(e, f)
        })
    };
    dB = function(a) {
        var b = _.Ex(a, "params", "headers");
        b && "object" === typeof b || (b = {});
        a = {};
        for (var c in b)
            if (Object.prototype.hasOwnProperty.call(b, c)) {
                var d = _.Vg(b, c);
                d && (_.Tg(c, d), _.Wg(a, c, d))
            }
        c = "chrome-extension" == (window.location.href.match(_.nh)[1] || null);
        a = _.Jh(a);
        return !(c && a) && OA()
    };
    eB = function(a) {
        return new _.Gk(function(b, c) {
            var d = function(e) {
                e && e.gapiRequest ? e = e.gapiRequest.data || e : c(e);
                e = {
                    result: 204 != e.status && _.yf(e.body),
                    body: e.body,
                    headers: e.headers || null,
                    status: e.status || null,
                    statusText: e.statusText || null
                };
                NA(e) ? b(e) : c(e)
            };
            try {
                cB(a, d)
            } catch (e) {
                c(e)
            }
        })
    };
    fB = function(a) {
        var b = !_.S("client/cors") || !!_.S("client/xd4"),
            c = {};
        _.Vl(a, function(d, e) {
            (d = _.Tg(e, d)) || b || (d = _.Sg(e));
            d && (e = _.Vg(a, d)) && _.Wg(c, d, e)
        });
        return c
    };
    gB = function(a) {
        var b = a.params || _.oe();
        a = _.lk(b.headers || {});
        var c = b.httpMethod || "GET",
            d = String(b.url || ""),
            e = encodeURIComponent("$unique");
        if (!("POST" === c || 0 <= _.Et(d, 0, "$unique", d.search(_.Ft)) || 0 <= _.Et(d, 0, e, d.search(_.Ft)))) {
            var f = [];
            for (g in a) Object.prototype.hasOwnProperty.call(a, g) && f.push(g.toLowerCase());
            f.sort();
            f.push(_.sg(location.href));
            var g = f.join(":");
            f = _.Eh();
            f.update(g);
            g = f.Sg().toLowerCase().substr(0, 7);
            g = String(parseInt(g, 16) % 1E3 + 1E3).substr(1);
            d = _.Yx(d, e, "gc" + g)
        }
        e = b.body || null;
        g = b.responseType || null;
        b = _.Jh(a) || "1p" == b.authType;
        f = !!_.S("googleapis.config/auth/useUberProxyAuth");
        _.Wg(a, "X-Referer", void 0);
        a = fB(a);
        var k = new UA(d, c, e, a);
        k.sf = b || f;
        g && (k.Mk = g);
        return new _.Gk(function(l, m) {
            k.then(function(n) {
                aB(n);
                l(n)
            }, function(n) {
                m(n)
            })
        })
    };
    hB = function(a, b) {
        var c = function(d) {
            d = _.lk(d);
            delete d.result;
            d = {
                gapiRequest: {
                    data: d
                }
            };
            b && b(d, _.zf(d))
        };
        gB(a).then(c, c)
    };
    iB = function(a, b) {
        (_.S("client/cors") || _.S("client/xd4")) && dB(a) ? hB(a, b) : cB(a, b)
    };
    _.jB = {};
    var kB = function(a) {
        this.Uc = a;
        this.tf = !1;
        this.promise = {
            then: (0, _.R)(function(b, c, d) {
                this.tf || (this.tf = !0);
                this.Lr && !this.Kr ? this.Uc.resolve(this.Lr) : this.Kr && !this.Lr && this.Uc.reject(this.Kr);
                return this.Uc.promise.then(b, c, d)
            }, this)
        }
    };
    kB.prototype.resolve = function(a) {
        this.tf ? this.Uc.resolve(a) : this.Lr || this.Kr || (this.Lr = a)
    };
    kB.prototype.reject = function(a) {
        this.tf ? this.Uc.reject(a) : this.Lr || this.Kr || (this.Kr = a)
    };
    var lB = function(a) {
            a = _.Tx(a.error);
            return {
                code: a.code,
                data: a.errors,
                message: a.message
            }
        },
        mB = function(a) {
            throw Error("ta`" + a);
        };
    var nB = function(a) {
        RA.call(this, nB.prototype.vm);
        if (!a || "object" != typeof a && "string" != typeof a) throw new QA("Missing required parameters");
        if ("string" === typeof a) {
            var b = {};
            b.path = a
        } else b = a;
        if (!b.path) throw new QA('Missing required parameter: "path"');
        this.kh = {};
        this.kh.path = b.path;
        this.kh.method = b.method || "GET";
        this.kh.params = b.params || {};
        this.kh.headers = b.headers || {};
        this.kh.body = b.body;
        this.kh.root = b.root;
        this.kh.responseType = b.responseType;
        this.kh.apiId = b.apiId;
        this.ll = b.authType || "auto";
        this.MX = !!b.isXd4;
        this.dK = !1;
        this.ii(this.ll);
        this.dM = !1
    };
    _.ii(nB, RA);
    nB.prototype.Be = function() {
        return this.kh
    };
    nB.prototype.ii = function(a) {
        this.ll = a;
        this.dK = "1p" === this.ll
    };
    nB.prototype.Cq = function() {
        return this.dK
    };
    nB.prototype.dj = function() {
        if (!this.dM) {
            this.dM = !0;
            var a = this.kh,
                b = a.headers = a.headers || {},
                c = [],
                d = [];
            for (g in b)
                if (Object.prototype.hasOwnProperty.call(b, g)) {
                    c.push(g);
                    var e = g,
                        f = _.Vg(b, e);
                    f && (e = _.Tg(e, f) || _.Sg(e)) && d.push([e, f])
                }
            var g = 0;
            for (e = c.length; g < e; ++g) delete b[c[g]];
            c = 0;
            for (g = d.length; c < g; ++c) _.Wg(b, d[c][0], d[c][1]);
            if (this.MX) d = "1p" == this.ll;
            else {
                d = b;
                c = String(_.S("client/version", "1.1.0"));
                g = String(_.S("client/name", "google-api-javascript-client"));
                g = !0 === oB[g] ? g : "google-api-javascript-client";
                e = String(_.S("client/appName", ""));
                f = [];
                e && (f.push(e), f.push(" "));
                f.push(g);
                c && (f.push("/"), f.push(c));
                _.Wg(d, "X-JavaScript-User-Agent", f.join(""));
                _.Wg(b, "X-Requested-With", "XMLHttpRequest");
                d = _.Vg(b, "Content-Type");
                a.body && !d && _.Wg(b, "Content-Type", "application/json");
                _.S("client/allowExecutableResponse") || _.Wg(b, "X-Goog-Encode-Response-If-Executable", "base64");
                (d = _.Vg(b, "Content-Type")) && "application/json" == d.toLowerCase() && !a.params.alt && (a.params.alt = "json");
                (d = a.body || null) && _.bb(d) && (a.body =
                    _.zf(d));
                a.key = a.id;
                b = _.ei(b, void 0, this.ll);
                d = _.Jh(b);
                if ((c = b) && window.navigator) {
                    g = [];
                    for (e = 0; e < pB.length; e++)(f = window.navigator[pB[e]]) && g.push(encodeURIComponent(pB[e]) + "=" + encodeURIComponent(f));
                    _.Wg(c, "X-ClientDetails", g.join("&"))
                }(c = _.S("client/apiKey")) && void 0 === a.params.key && (a.params.key = c);
                (c = _.S("client/trace")) && !a.params.trace && (a.params.trace = c)
            }
            "auto" == this.ll && (d ? this.ii("1p") : (b = _.Vg(b, "Authorization")) && String(b).match(/^(Bearer|MAC)[ \t]/i) ? this.ii("oauth2") : this.ii("none"));
            if ((b = String(a.path || "").match(/^(https?:\/\/[^\/?#]+)([\/?#].*)?$/i)) && !a.root)
                if (a.root = String(b[1]), a.path = String(b[2] || "/"), a.path.match(/^\/_ah\/api(\/.*)?$/)) a.root += "/_ah/api", a.path = a.path.substr(8);
                else {
                    b = _.S("googleapis.config/root");
                    d && (b = _.S("googleapis.config/root-1p") || b);
                    b = String(b || "");
                    c = a.root + a.path;
                    if (g = b && c.substr(0, b.length) === b) g = _.Xt(b), e = _.Xt(c), g = (!g.xc && !e.xc || g.xc == e.xc) && (null == g.Mf && null == e.Mf || g.Mf == e.Mf);
                    g && (a.path = c.substr(b.length), a.root = b)
                }
            b = a.params;
            c = _.Jg(a.path);
            g = String(_.S("googleapis.config/xd3") || "");
            18 <= g.length && "/static/proxy.html" == g.substring(g.length - 18) && (g = g.substring(0, g.length - 18));
            g || (g = "/");
            e = _.Jg(g);
            if (g != e) throw Error("v");
            "/" != g.charAt(g.length - 1) && (g += "/");
            c = _.$x(g, c);
            _.Zi(c, "/") && (c = c.substring(0, c.length - 1));
            g = _.oe();
            for (var k in b) Object.prototype.hasOwnProperty.call(b, k) && (e = encodeURIComponent(k), g[e] = b[k]);
            c = _.rh(c, g);
            a.path = c;
            a.root = PA(!!d, a.root);
            a.url = bB(a.path, !!d, a.root)
        }
    };
    var qB = function(a) {
        a.dj();
        var b = a.kh;
        return {
            key: "gapiRequest",
            params: {
                id: b.id,
                key: b.key,
                url: b.url,
                path: b.path,
                httpMethod: b.method,
                body: b.body || "",
                headers: b.headers || {},
                urlParams: {},
                root: b.root,
                authType: a.ll
            }
        }
    };
    nB.prototype.execute = function(a) {
        var b = qB(this);
        iB(b, function(c, d) {
            var e = c;
            c.gapiRequest && (e = c.gapiRequest);
            e && e.data && (e = e.data);
            c = e instanceof Array ? e[0] : e;
            if (204 != c.status && c.body) try {
                var f = _.yf(c.body)
            } catch (g) {}
            a && a(f, d)
        })
    };
    nB.prototype.vm = function() {
        var a = qB(this);
        return (_.S("client/cors") || _.S("client/xd4")) && dB(a) ? gB(a) : eB(a)
    };
    nB.prototype.Lh = function() {
        return this.vm()
    };
    var pB = ["appVersion", "platform", "userAgent"],
        oB = {
            "google-api-gwt-client": !0,
            "google-api-javascript-client": !0
        };
    nB.prototype.execute = nB.prototype.execute;
    nB.prototype.then = nB.prototype.then;
    nB.prototype.getPromise = nB.prototype.Lh;
    var rB = function(a) {
        if (!a || "object" != typeof a) throw new QA("Missing rpc parameters");
        if (!a.method) throw new QA("Missing rpc method");
        this.Hw = a
    };
    rB.prototype.Ol = function() {
        var a = this.Hw.transport;
        return a ? a.root || null : null
    };
    rB.prototype.execute = function(a) {
        var b = KA();
        b.add(this, {
            id: "gapiRpc",
            callback: this.mr(a)
        });
        b.execute()
    };
    rB.prototype.Lv = function(a) {
        var b = this.Hw.method,
            c = String,
            d;
        (d = this.Hw.apiVersion) || (d = String(b).split(".")[0], d = _.S("googleapis.config/versions/" + b) || _.S("googleapis.config/versions/" + d) || "v1", d = String(d));
        c = c(d);
        a = {
            jsonrpc: "2.0",
            id: a,
            method: b,
            apiVersion: c
        };
        (b = this.Hw.rpcParams) && (a.params = b);
        return a
    };
    rB.prototype.mr = function(a) {
        return function(b, c) {
            if (b)
                if (b.error) {
                    var d = b.error;
                    null == d.error && (d.error = _.lk(b.error))
                } else d = b.result || b.data, _.bb(d) && null == d.result && (d.result = _.lk(b.result || b.data));
            else d = !1;
            a(d, c)
        }
    };
    rB.prototype.execute = rB.prototype.execute;
    var tB = function(a, b) {
            this.Df = b || 0;
            2 == this.Df ? (b = null, null != a && _.bb(a) && (b = {}, b.method = a.method, b.rpcParams = a.rpcParams, b.transport = a.transport, b.root = a.root, b.apiVersion = a.apiVersion, b.authType = a.authType), this.mb = new rB(b)) : (0 == this.Df && (b = a && a.callback) && (a.callback = sB(b)), b = null, null != a && (_.bb(a) ? (b = {}, b.path = a.path, b.method = a.method, b.params = a.params, b.headers = a.headers, b.body = a.body, b.root = a.root, b.responseType = a.responseType, b.authType = a.authType, b.apiId = a.apiId) : "string" === typeof a && (b = a)),
                this.mb = new nB(b))
        },
        sB = function(a) {
            return function(b) {
                if (null != b && _.bb(b) && b.error) {
                    var c = lB(b);
                    b = _.zf([{
                        id: "gapiRpc",
                        error: c
                    }]);
                    c.error = _.Tx(c)
                } else null == b && (b = {}), c = _.Tx(b), c.result = _.Tx(b), b = _.zf([{
                    id: "gapiRpc",
                    result: b
                }]);
                a(c, b)
            }
        };
    _.h = tB.prototype;
    _.h.getFormat = function() {
        return this.Df
    };
    _.h.execute = function(a) {
        this.mb.execute(a && 1 == this.Df ? sB(a) : a)
    };
    _.h.then = function(a, b, c) {
        2 == this.Df && mB('The "then" method is not available on this object.');
        return this.mb.then(a, b, c)
    };
    _.h.Uw = function(a) {
        this.mb.Uw && this.mb.Uw(a)
    };
    _.h.Be = function() {
        if (this.mb.Be) return this.mb.Be()
    };
    _.h.dj = function() {
        this.mb.Be && this.mb.dj()
    };
    _.h.Ol = function() {
        if (this.mb.Ol) return this.mb.Ol()
    };
    _.h.Lv = function(a) {
        if (this.mb.Lv) return this.mb.Lv(a)
    };
    _.h.ii = function(a) {
        this.mb.ii && this.mb.ii(a)
    };
    _.h.Cq = function() {
        return this.mb.Cq()
    };
    _.h.Lh = function() {
        if (this.mb.Lh) return this.mb.Lh()
    };
    tB.prototype.execute = tB.prototype.execute;
    tB.prototype.then = tB.prototype.then;
    tB.prototype.getPromise = tB.prototype.Lh;
    var uB = /<response-(.*)>/,
        vB = /^application\/http(;.+$|$)/,
        wB = ["clients6.google.com", "content.googleapis.com", "www.googleapis.com"],
        xB = function(a, b) {
            a = _.Vg(a, b);
            if (!a) throw new QA("Unable to retrieve header.");
            return a
        },
        yB = function(a) {
            var b = void 0;
            a = _.Ha(a);
            for (var c = a.next(); !c.done; c = a.next()) {
                c = c.value.Be().apiId;
                if ("string" !== typeof c) return "batch";
                if (void 0 === b) b = c;
                else if (b != c) return "batch"
            }
            b = _.S("client/batchPath/" + b) || "batch/" + b.split(":").join("/");
            return String(b)
        },
        zB = function(a) {
            a = a.map(function(b) {
                return b.request
            });
            return yB(a)
        },
        AB = function(a, b) {
            var c = [];
            a = a.Be();
            var d = function(f, g) {
                    _.Vl(f, function(k, l) {
                        g.push(l + ": " + k)
                    })
                },
                e = {
                    "Content-Type": "application/http",
                    "Content-Transfer-Encoding": "binary"
                };
            e["Content-ID"] = "<" + b + ">";
            d(e, c);
            c.push("");
            c.push(a.method + " " + a.path);
            d(a.headers, c);
            c.push("");
            a.body && c.push(a.body);
            return c.join("\r\n")
        },
        DB = function(a, b) {
            a = BB(a, b);
            var c = {};
            _.Db(a, function(d, e) {
                c[e] = CB(d, e)
            });
            return c
        },
        CB = function(a, b) {
            return {
                result: a.result || a.body,
                rawResult: _.zf({
                    id: b,
                    result: a.result || a.body
                }),
                id: b
            }
        },
        BB = function(a, b) {
            a = (0, _.tb)(a);
            _.Zi(a, "--") && (a = a.substring(0, a.length - 2));
            a = a.split(b);
            b = _.oe();
            for (var c = 0; c < a.length; c++)
                if (a[c]) {
                    var d;
                    if (d = a[c]) {
                        _.Zi(d, "\r\n") && (d = d.substring(0, d.length - 2));
                        if (d) {
                            d = d.split("\r\n");
                            for (var e = 0, f = {
                                    headers: {},
                                    body: ""
                                }; e < d.length && "" == d[e];) e++;
                            for (f.outerHeaders = EB(d, e); e < d.length && "" != d[e];) e++;
                            e++;
                            var g = d[e++].split(" ");
                            f.status = Number(g[1]);
                            f.statusText = g.slice(2).join(" ");
                            for (f.headers = EB(d, e); e < d.length && "" != d[e];) e++;
                            e++;
                            f.body = d.slice(e).join("\r\n");
                            aB(f);
                            d = f
                        } else d = null;
                        e = _.oe();
                        f = xB(d.outerHeaders, "Content-Type");
                        if (null == vB.exec(f)) throw new QA("Unexpected Content-Type <" + f + ">");
                        f = xB(d.outerHeaders, "Content-ID");
                        f = uB.exec(f);
                        if (!f) throw new QA("Unable to recognize Content-Id.");
                        e.id = decodeURIComponent(f[1].split("@")[0].replace(/^.*[+]/, ""));
                        e.response = {
                            status: d.status,
                            statusText: d.statusText,
                            headers: d.headers
                        };
                        204 != d.status && (e.response.body = d.body, e.response.result = _.yf(d.body));
                        d = e
                    } else d = null;
                    d && d.id && (b[d.id] = d.response)
                }
            return b
        },
        EB =
        function(a, b) {
            for (var c = []; b < a.length && a[b]; b++) c.push(a[b]);
            return _.Xg(c.join("\r\n"), !1)
        },
        FB = function(a, b, c) {
            a = a || b;
            if (!a || "https" !== _.Xt(a).jf)
                if (a = c ? _.S("googleapis.config/root-1p") : _.S("googleapis.config/root"), !a) return !1;
            a = PA(c, String(a)) || a;
            return wB.includes(_.Xt(a).xc)
        };
    var GB = function(a) {
        RA.call(this, GB.prototype.vm);
        this.Ni = {};
        this.vt = {};
        this.Kk = [];
        this.Le = a;
        this.aY = !!a;
        this.sJ = this.Xu = !1
    };
    _.ii(GB, RA);
    var HB = function(a, b) {
            a = _.Ha(Object.values(a.Ni));
            for (var c = a.next(); !c.done; c = a.next())
                if (c.value.map(function(d) {
                        return d.id
                    }).includes(b)) return !0;
            return !1
        },
        IB = function(a) {
            (function(b) {
                setTimeout(function() {
                    throw b;
                })
            })(a)
        };
    GB.prototype.add = function(a, b) {
        var c = b || _.oe();
        b = _.oe();
        if (!a) throw new QA("Batch entry " + (_.pe(c, "id") ? '"' + c.id + '" ' : "") + "is missing a request method");
        a.dj();
        b.request = a;
        var d = _.Qk();
        d = new kB(d);
        b.vo = d;
        a.Uw(b.vo.promise);
        d = a.Be().headers;
        _.Jh(d) && (this.Xu = !0);
        (d = String((d || {}).Authorization || "") || null) && d.match(/^Bearer|MAC[ \t]/i) && (this.sJ = !0);
        d = a.Be().root;
        if (!this.aY) {
            if (d && this.Le && d != this.Le) throw new QA('The "root" provided in this request is not consistent with that of existing requests in the batch.');
            this.Le = d || this.Le
        }
        if (_.pe(c, "id")) {
            d = c.id;
            if (HB(this, d)) throw new QA('Batch ID "' + d + '" already in use, please use another.');
            b.id = d
        } else {
            do b.id = String(Math.round(2147483647 * _.Yh())); while (HB(this, b.id))
        }
        b.callback = c.callback;
        c = "batch";
        FB(this.Le, a.Be().path, this.Xu) && (c = zB([b]));
        this.Ni[c] = this.Ni[c] || [];
        this.Ni[c].push(b);
        this.vt[b.id] = b;
        return b.id
    };
    var JB = function(a) {
        var b = [],
            c = FB(a.Le, void 0, a.Xu);
        1 < Object.entries(a.Ni).length && _.Gf("Heterogeneous batch requests are deprecated. See https://developers.googleblog.com/2018/03/discontinuing-support-for-json-rpc-and.html");
        for (var d = _.Ha(Object.entries(a.Ni)), e = d.next(); !e.done; e = d.next()) {
            e = _.Ha(e.value);
            var f = e.next().value;
            e = e.next().value;
            for (var g = !0, k = _.Ha(e), l = k.next(); !l.done; l = k.next()) l = l.value, l.request.dj(), "batch" === f && c && (g = !1, l.CX = !0, l.request.Be.root = a.Le, b.push(l.request), a.Kk.push([l]));
            if (g) {
                f = a.Le;
                g = a.Xu;
                k = a.sJ;
                l = "batch" + String(Math.round(2147483647 * _.Yh())) + String(Math.round(2147483647 * _.Yh()));
                var m = "--" + l;
                l = "multipart/mixed; boundary=" + l;
                for (var n = {
                        path: zB(e),
                        method: "POST"
                    }, p = [], u = 0; u < e.length; u++) p.push(AB(e[u].request, [m.substr(m.indexOf("--") + 2), "+", encodeURIComponent(e[u].id).split("(").join("%28").split(")").join("%29").split(".").join("%2E"), "@googleapis.com"].join("")));
                n.body = [m, p.join("\r\n" + m + "\r\n"), m + "--"].join("\r\n") + "\r\n";
                n.root = f || null;
                _.S("client/xd4") && OA() ?
                    (n.isXd4 = !0, n.params = {
                        $ct: l
                    }, n.headers = {}, _.Wg(n.headers, "Content-Type", "text/plain; charset=UTF-8"), g ? n.authType = "1p" : k && (n.authType = "oauth2"), f = new nB(n)) : (n.headers = {}, _.Wg(n.headers, "Content-Type", l), f = LA(n));
                b.push(f);
                a.Kk.push(e)
            }
        }
        return b
    };
    GB.prototype.execute = function(a) {
        if (!(1 > Object.keys(this.Ni).length)) {
            var b = this.mr(a);
            a = JB(this);
            var c = [],
                d = a.map(function(e) {
                    return new _.Gk(function(f) {
                        try {
                            e.execute(function(g, k) {
                                return f({
                                    tG: g,
                                    vZ: k
                                })
                            })
                        } catch (g) {
                            c.push(g), f({
                                tG: {
                                    su: !1,
                                    reason: g
                                }
                            })
                        }
                    })
                });
            if (0 < c.length && c.length === a.length) throw c[0];
            _.Ok(d).then(function(e) {
                var f = e.map(function(g) {
                    return g.vZ
                });
                e = e.map(function(g) {
                    return g.tG
                });
                b(e, f)
            })
        }
    };
    GB.prototype.vm = function() {
        var a = this;
        if (1 > Object.keys(this.Ni).length) return _.Kk({});
        var b = JB(this).map(function(c) {
            return new _.Gk(function(d, e) {
                return c.Lh().then(d, e)
            })
        });
        return IA(b).then(function(c) {
            c = c.map(function(d) {
                return d.su ? d.value : d
            });
            return KB(a, c, !0)
        })
    };
    var LB = function(a, b, c, d, e) {
            var f = {};
            if (d) {
                f = c ? BB : DB;
                c = xB(b.headers, "Content-Type").split("boundary=")[1];
                if (!c) throw new QA("Boundary not indicated in response.");
                f = f(b.body, "--" + c)
            } else c ? (b.result = _.yf(b.body), f[e] = b) : f[e] = CB(b, e);
            b = {};
            f = _.Ha(Object.entries(f));
            for (c = f.next(); !c.done; c = f.next())
                if (d = _.Ha(c.value), c = d.next().value, d = d.next().value, b[c] = d, !a.vt[c]) throw new QA("Could not find batch entry for id " + c + ".");
            return b
        },
        KB = function(a, b, c, d, e) {
            for (var f = !1, g = {}, k, l = 0, m = 0; m < b.length; m++) {
                var n =
                    b[m];
                if (!1 === n.su) {
                    l++;
                    b[m] = n.reason;
                    var p = MB([b[m]]),
                        u = _.Ha(a.Kk[m]);
                    for (n = u.next(); !n.done; n = u.next()) g[n.value.id] = p
                } else {
                    if (1 > a.Kk[m].length) throw new QA("Error processing batch responses.");
                    try {
                        var r = !(1 === a.Kk[m].length && a.Kk[m][0].CX),
                            v = a.Kk[m][0].id;
                        if (!c) {
                            p = n;
                            var t = d[m];
                            u = p;
                            if (t && (!u || !r)) {
                                var w = _.yf(t);
                                w && (u = w.gapiRequest ? w.gapiRequest.data : w, !r && p && (u.body = p))
                            }
                            if (!u) throw new QA("The batch response is missing.");
                            n = u
                        }
                        p = void 0;
                        if (u = n) {
                            var y = u.headers;
                            if (y) {
                                var D = _.oe();
                                for (p in y)
                                    if (Object.prototype.hasOwnProperty.call(y,
                                            p)) {
                                        var z = _.Vg(y, p);
                                        _.Wg(D, p, z, !0)
                                    }
                                u.headers = D
                            }
                        }
                        if (r && 0 != xB(n.headers, "Content-Type").indexOf("multipart/mixed")) throw new QA("The response's Content-Type is not multipart/mixed.");
                        k = k || _.Tx(n);
                        var G = NA(n);
                        G && !NA(k) && (k.status = n.status, k.statusText = n.statusText);
                        if (G || c || !r) f = !0, g = Object.assign(g, LB(a, n, c, r, v))
                    } catch (J) {
                        for (l++, b[m] = J, p = MB([J]), u = _.Ha(a.Kk[m]), n = u.next(); !n.done; n = u.next()) g[n.value.id] = p
                    }
                }
            }
            if (l === b.length) {
                d = MB(b);
                g = _.zf(d);
                k = 0;
                a = Array.from(Object.values(a.Ni)).flat();
                f = _.Ha(a);
                for (l = f.next(); !l.done; l = f.next())
                    if (l = l.value, c) l.vo.reject(d);
                    else if (l.callback) try {
                    k++, l.callback(d, g)
                } catch (J) {
                    IB(J)
                }
                if (e) try {
                    e(d, g)
                } catch (J) {
                    IB(J)
                } else if (k !== a.length) throw 1 === b.length ? b[0] : d;
            } else {
                if (f)
                    for (f = _.Ha(Object.entries(g)), l = f.next(); !l.done; l = f.next())
                        if (l = _.Ha(l.value), m = l.next().value, l = l.next().value, c) m = a.vt[m], l && NA(l) ? m.vo.resolve(l) : m.vo.reject(l);
                        else if (m = a.vt[m], m.callback) {
                    if (l && l.rawResult) try {
                        delete l.rawResult
                    } catch (J) {}
                    try {
                        m.callback(l || !1, _.zf(l))
                    } catch (J) {
                        IB(J)
                    }
                }
                k.result =
                    g || {};
                k.body = 1 === b.length ? k.body : "";
                if (e) try {
                    e(g || null, 1 === d.length ? d[0] : null)
                } catch (J) {
                    IB(J)
                }
                return k
            }
        },
        MB = function(a) {
            var b = {
                error: {
                    code: 0,
                    message: "The batch request could not be fulfilled.  "
                }
            };
            a = _.Ha(a);
            for (var c = a.next(); !c.done; c = a.next())(c = c.value) && c.message || c instanceof Error && c.message ? b.error.message += (c.message || c instanceof Error && c.message) + "  " : c && c.error && c.error.message && (b.error.message += c.error.message + "  ", b.error.code = c.error.code || b.error.code || 0);
            b.error.message = b.error.message.trim();
            return {
                result: b,
                body: _.zf(b),
                headers: null,
                status: null,
                statusText: null
            }
        };
    GB.prototype.mr = function(a) {
        var b = this;
        return function(c, d) {
            b.yy(c, d, a)
        }
    };
    GB.prototype.yy = function(a, b, c) {
        KB(this, a, !1, b, c)
    };
    GB.prototype.add = GB.prototype.add;
    GB.prototype.execute = GB.prototype.execute;
    GB.prototype.then = GB.prototype.then;
    var NB = function() {
        this.Zj = [];
        this.Le = this.Tc = null
    };
    NB.prototype.add = function(a, b) {
        b = b || {};
        var c = {},
            d = Object.prototype.hasOwnProperty;
        if (a) c.rpc = a;
        else throw new QA("Batch entry " + (d.call(b, "id") ? '"' + b.id + '" ' : "") + "is missing a request method");
        if (d.call(b, "id")) {
            a = b.id;
            for (d = 0; d < this.Zj.length; d++)
                if (this.Zj[d].id == a) throw new QA('Batch ID "' + a + '" already in use, please use another.');
            c.id = a
        } else {
            do c.id = String(2147483647 * _.Yh() | 0); while (d.call(this.Zj, c.id))
        }
        c.callback = b.callback;
        this.Zj.push(c);
        return c.id
    };
    var OB = function(a) {
        return function(b) {
            var c = b.body;
            if (b = b.result) {
                for (var d = {}, e = 0, f = b.length; e < f; ++e) d[b[e].id] = b[e];
                a(d, c)
            } else a(b, c)
        }
    };
    NB.prototype.execute = function(a) {
        this.Tc = [];
        for (var b, c, d = 0; d < this.Zj.length; d++) b = this.Zj[d], c = b.rpc, this.Tc.push(c.Lv(b.id)), this.Le = c.Ol() || this.Le;
        c = this.mr(a);
        a = {
            requests: this.Tc,
            root: this.Le
        };
        b = {};
        d = a.headers || {};
        for (var e in d) {
            var f = e;
            if (Object.prototype.hasOwnProperty.call(d, f)) {
                var g = _.Vg(d, f);
                g && (f = _.Tg(f, g) || _.Sg(f)) && _.Wg(b, f, g)
            }
        }
        _.Wg(b, "Content-Type", "application/json");
        e = OB(c);
        LA({
            method: "POST",
            root: a.root || void 0,
            path: "/rpc",
            params: a.urlParams,
            headers: b,
            body: a.requests || []
        }).then(e,
            e)
    };
    NB.prototype.mr = function(a) {
        var b = this;
        return function(c, d) {
            b.yy(c, d, a)
        }
    };
    NB.prototype.yy = function(a, b, c) {
        a || (a = {});
        for (var d = 0; d < this.Zj.length; d++) {
            var e = this.Zj[d];
            e.callback && e.callback(a[e.id] || !1, b)
        }
        c && c(a, b)
    };
    MA.xG(function() {
        return new NB
    });
    NB.prototype.add = NB.prototype.add;
    NB.prototype.execute = NB.prototype.execute;
    var PB = function(a, b) {
        this.ZY = a;
        this.Df = b || null;
        this.zp = null
    };
    PB.prototype.EB = function(a) {
        this.Df = a;
        this.zp = 2 == this.Df ? new NB : new GB(this.ZY)
    };
    PB.prototype.add = function(a, b) {
        if (!a) throw a = b || _.oe(), new QA("Batch entry " + (_.pe(a, "id") ? '"' + a.id + '" ' : "") + "is missing a request method");
        null === this.Df && this.EB(a.getFormat());
        this.Df !== a.getFormat() && mB("Unable to add item to batch.");
        var c = b && b.callback;
        1 == this.Df && c && (b.callback = function(d) {
            d = QB(d);
            var e = _.zf([d]);
            c(d, e)
        });
        return this.zp.add(a, b)
    };
    PB.prototype.execute = function(a) {
        var b = a && 1 == this.Df ? function(c) {
            var d = [];
            _.Vl(c, function(f, g) {
                f = QB(f);
                c[g] = f;
                d.push(f)
            });
            var e = _.zf(d);
            a(c, e)
        } : a;
        this.zp && this.zp.execute(b)
    };
    var QB = function(a) {
        var b = a ? _.Ex(a, "result") : null;
        _.bb(b) && null != b.error && (b = lB(b), a = {
            id: a.id,
            error: b
        });
        return a
    };
    PB.prototype.then = function(a, b, c) {
        2 == this.Df && mB('The "then" method is not available on this object.');
        return this.zp.then(a, b, c)
    };
    PB.prototype.add = PB.prototype.add;
    PB.prototype.execute = PB.prototype.execute;
    PB.prototype.then = PB.prototype.then;
    var RB = function(a) {
        RA.call(this, RB.prototype.vm);
        this.mb = a
    };
    _.ii(RB, RA);
    var SB = function(a) {
        a.mb.dj();
        var b = a.mb,
            c = b.Be();
        return !(FB(c.root, c.path, a.mb.Cq()) ? "batch" !== yB([b]) : 1)
    };
    _.h = RB.prototype;
    _.h.execute = function(a) {
        var b = this;
        if (SB(this)) this.mb.execute(a);
        else {
            var c = function(d) {
                if ("function" === typeof a) {
                    var e = {
                        gapiRequest: {
                            data: {
                                status: d && d.status,
                                statusText: d && d.statusText,
                                headers: d && d.headers,
                                body: d && d.body
                            }
                        }
                    };
                    if (1 === b.getFormat()) {
                        a = sB(a);
                        var f = {}
                    }
                    var g = d ? d.result : !1;
                    d && 204 == d.status && (g = f, delete e.gapiRequest.data.body);
                    a(g, _.zf(e))
                }
            };
            this.Lh().then(c, c)
        }
    };
    _.h.vm = function() {
        return SB(this) ? this.mb.Lh() : new _.Gk(function(a, b) {
            var c = JA(),
                d = c.add(this.mb, {
                    id: "gapiRequest"
                });
            c.then(function(e) {
                var f = e.result;
                if (f && (f = f[d])) {
                    Object.prototype.hasOwnProperty.call(f, "result") || (f.result = !1);
                    Object.prototype.hasOwnProperty.call(f, "body") || (f.body = "");
                    NA(f) ? a(f) : b(f);
                    return
                }
                b(e)
            }, b)
        }, this)
    };
    _.h.Be = function() {
        if (this.mb.Be) return this.mb.Be()
    };
    _.h.dj = function() {
        this.mb.dj && this.mb.dj()
    };
    _.h.Ol = function() {
        if (this.mb.Ol) return this.mb.Ol()
    };
    _.h.ii = function(a) {
        this.mb.ii && this.mb.ii(a)
    };
    _.h.Cq = function() {
        return this.mb.Cq()
    };
    _.h.getFormat = function() {
        return this.mb.getFormat ? this.mb.getFormat() : 0
    };
    _.h.Lh = function() {
        return this.vm()
    };
    RB.prototype.execute = RB.prototype.execute;
    RB.prototype.then = RB.prototype.then;
    RB.prototype.getPromise = RB.prototype.Lh;
    var TB = "/rest?fields=" + encodeURIComponent("kind,name,version,rootUrl,servicePath,resources,parameters,methods,batchPath,id") + "&pp=0",
        UB = function(a, b) {
            return "/discovery/v1/apis/" + (encodeURIComponent(a) + "/" + encodeURIComponent(b) + TB)
        },
        WB = function(a, b, c, d) {
            if (_.bb(a)) {
                var e = a;
                var f = a.name;
                a = a.version || "v1"
            } else f = a, a = b;
            if (!f || !a) throw new QA("Missing required parameters.");
            var g = c || function() {},
                k = _.bb(d) ? d : {};
            c = function(l) {
                var m = l && l.result;
                if (!m || m.error || !m.name || !l || l.error || l.message || l.message) g(m &&
                    m.error ? m : l && (l.error || l.message || l.message) ? l : new QA("API discovery response missing required fields."));
                else {
                    l = k.root;
                    l = null != m.rootUrl ? String(m.rootUrl) : l;
                    l = "string" === typeof l ? l.replace(/([^\/])\/$/, "$1") : void 0;
                    k.root = l;
                    m.name && m.version && !m.id && (m.id = [m.name, m.version].join(":"));
                    m.id && (k.apiId = m.id, l = "client/batchPath/" + m.id, m.batchPath && !_.S(l) && _.He(l, m.batchPath));
                    var n = m.servicePath,
                        p = m.parameters,
                        u = function(v) {
                            _.Vl(v, function(t) {
                                if (!(t && t.id && t.path && t.httpMethod)) throw new QA("Missing required parameters");
                                var w = t.id.split("."),
                                    y = window.gapi.client,
                                    D;
                                for (D = 0; D < w.length - 1; D++) {
                                    var z = w[D];
                                    y[z] = y[z] || {};
                                    y = y[z]
                                }
                                var G, J;
                                k && (k.hasOwnProperty("root") && (G = k.root), k.hasOwnProperty("apiId") && (J = k.apiId));
                                z = window.gapi.client[w[0]];
                                z.ZE || (z.ZE = {
                                    servicePath: n || "",
                                    parameters: p,
                                    apiId: J
                                });
                                w = w[D];
                                y[w] || (y[w] = _.ji(VB, {
                                        path: "string" === typeof t.path ? t.path : null,
                                        httpMethod: "string" === typeof t.httpMethod ? t.httpMethod : null,
                                        parameters: t.parameters,
                                        parameterName: (t.request || {}).parameterName || "",
                                        request: t.request,
                                        root: G
                                    },
                                    z.ZE))
                            })
                        },
                        r = function(v) {
                            _.Vl(v, function(t) {
                                u(t.methods);
                                r(t.resources)
                            })
                        };
                    r(m.resources);
                    u(m.methods);
                    g.call()
                }
            };
            e ? c({
                result: e
            }) : 0 < f.indexOf("://") ? LA({
                path: f,
                params: {
                    pp: 0,
                    fields: 0 <= ("/" + f).indexOf("/discovery/v1/apis/") ? "kind,name,version,rootUrl,servicePath,resources,parameters,methods,batchPath,id" : 'fields["kind"],fields["name"],fields["version"],fields["rootUrl"],fields["servicePath"],fields["resources"],fields["parameters"],fields["methods"],fields["batchPath"],fields["id"]'
                }
            }).then(c, c) : LA({
                path: UB(f,
                    a),
                root: d && d.root
            }).then(c, c)
        },
        VB = function(a, b, c, d) {
            var e = b.servicePath || "";
            _.ed(e, "/") || (e = "/" + e);
            var f = XB(a.path, [a.parameters, b.parameters], c || {});
            c = f.Gk;
            var g = f.D1;
            e = _.$x(e, f.path);
            f = g.root;
            delete g.root;
            var k = a.parameterName;
            !k && 1 == _.Rx(g) && g.hasOwnProperty("resource") && (k = "resource");
            if (k) {
                var l = g[k];
                delete g[k]
            }
            null == l && (l = d);
            null == l && a.request && (_.$i(g) && (g = void 0), l = g);
            k = {};
            var m = a.httpMethod;
            "GET" == m && void 0 !== l && "" != String(l) && (_.Wg(k, "X-HTTP-Method-Override", m), m = "POST");
            if ((null == l ||
                    null != d) && g)
                for (var n in g) "string" === typeof g[n] && (c[n] = g[n]);
            return LA({
                path: e,
                method: m,
                params: c,
                headers: k,
                body: l,
                root: f || a.root,
                apiId: b.apiId
            }, 1)
        },
        XB = function(a, b, c) {
            c = _.lk(c);
            var d = {};
            _.Ul(b, function(e) {
                _.Vl(e, function(f, g) {
                    var k = f.required;
                    if ("path" == f.location)
                        if (Object.prototype.hasOwnProperty.call(c, g)) - 1 != a.indexOf("{" + g + "}") ? (f = _.lh(c[g]), a = a.replace("{" + g + "}", f)) : -1 != a.indexOf("{+" + g + "}") && (f = encodeURI(String(c[g])), a = a.replace("{+" + g + "}", f)), delete c[g];
                        else {
                            if (k) throw new QA("Required path parameter " +
                                g + " is missing.");
                        }
                    else "query" == f.location && Object.prototype.hasOwnProperty.call(c, g) && (d[g] = c[g], delete c[g])
                })
            });
            if (b = c.trace) d.trace = b, delete c.trace;
            return {
                path: a,
                Gk: d,
                D1: c
            }
        };
    var YB = function(a, b, c, d) {
            var e = b || "v1",
                f = _.bb(d) ? d : {
                    root: d
                };
            if (c) WB(a, e, function(g) {
                if (g)
                    if (g.error) c(g);
                    else {
                        var k = "API discovery was unsuccessful.";
                        if (g.message || g.message) k = g.message || g.message;
                        c({
                            error: k,
                            code: 0
                        })
                    }
                else c()
            }, f);
            else return new _.Gk(function(g, k) {
                var l = function(m) {
                    m ? k(m) : g()
                };
                try {
                    WB(a, e, l, f)
                } catch (m) {
                    k(m)
                }
            })
        },
        ZB = new RegExp(/^((([Hh][Tt][Tt][Pp][Ss]?:)?\/\/[^\/?#]*)?\/)?/.source + /(_ah\/api\/)?(batch|rpc)(\/|\?|#|$)/.source),
        $B = function(a, b) {
            if (!a) throw new QA("Missing required parameters");
            var c = "object" === typeof a ? a : {
                path: a
            };
            a = c.callback;
            delete c.callback;
            b = new tB(c, b);
            if (c = !!_.S("client/xd4") && OA()) {
                var d = b.Be();
                c = d.path;
                (d = d.root) && "/" !== d.charAt(d.length - 1) && (d += "/");
                d && c && c.substr(0, d.length) === d && (c = c.substr(d.length));
                c = !c.match(ZB)
            }
            c && (b = new RB(b));
            return a ? (b.execute(a), null) : b
        };
    MA.yG(function(a) {
        return $B.apply(null, arguments)
    });
    var aC = function(a, b) {
            if (!a) throw new QA("Missing required parameters");
            for (var c = a.split("."), d = window.gapi.client, e = 0; e < c.length - 1; e++) {
                var f = c[e];
                d[f] = d[f] || {};
                d = d[f]
            }
            c = c[c.length - 1];
            if (!d[c]) {
                var g = b || {};
                d[c] = function(k) {
                    var l = "string" == typeof g ? g : g.root;
                    k && k.root && (l = k.root);
                    return new tB({
                        method: a,
                        apiVersion: g.apiVersion,
                        rpcParams: k,
                        transport: {
                            name: "googleapis",
                            root: l
                        }
                    }, 2)
                }
            }
        },
        bC = function(a) {
            return new PB(a)
        };
    MA.wG(function(a) {
        return bC.apply(null, arguments)
    });
    var cC = function(a) {
        if (_.jB.JSONRPC_ERROR_MOD) throw new QA(a + " is discontinued. See https://developers.googleblog.com/2018/03/discontinuing-support-for-json-rpc-and.html");
        _.Df(a + " is deprecated. See https://developers.google.com/api-client-library/javascript/reference/referencedocs")
    };
    _.C("gapi.client.init", function(a) {
        a.apiKey && _.He("client/apiKey", a.apiKey);
        var b = _.qb(a.discoveryDocs || [], function(d) {
            return YB(d)
        });
        if ((a.clientId || a.client_id) && a.scope) {
            var c = new _.Gk(function(d, e) {
                var f = function() {
                    _.A.gapi.auth2.init.call(_.A.gapi.auth2, a).then(function() {
                        d()
                    }, e)
                };
                _.A.gapi.load("auth2", {
                    callback: function() {
                        f()
                    },
                    onerror: function(g) {
                        e(g || Error("ua"))
                    }
                })
            });
            b.push(c)
        } else(a.clientId || a.client_id || a.scope) && _.Df("client_id and scope must both be provided to initialize OAuth.");
        return _.Ok(b).then(function() {})
    });
    _.C("gapi.client.load", YB);
    _.C("gapi.client.newBatch", bC);
    _.C("gapi.client.newRpcBatch", function() {
        cC("gapi.client.newRpcBatch");
        return bC()
    });
    _.C("gapi.client.newHttpBatch", function(a) {
        cC("gapi.client.newHttpBatch");
        return new PB(a, 0)
    });
    _.C("gapi.client.register", function(a, b) {
        cC("gapi.client.register");
        var c;
        b && (c = {
            apiVersion: b.apiVersion,
            root: b.root
        });
        aC(a, c)
    });
    _.C("gapi.client.request", $B);
    _.C("gapi.client.rpcRequest", function(a, b, c) {
        cC("gapi.client.rpcRequest");
        if (!a) throw new QA('Missing required parameter "method".');
        return new tB({
            method: a,
            apiVersion: b,
            rpcParams: c,
            transport: {
                name: "googleapis",
                root: c && c.root || ""
            }
        }, 2)
    });
    _.C("gapi.client.setApiKey", function(a) {
        _.He("client/apiKey", a);
        _.He("googleapis.config/developerKey", a)
    });
    _.C("gapi.client.setApiVersions", function(a) {
        cC("gapi.client.setApiVersions");
        _.He("googleapis.config/versions", a)
    });
    _.C("gapi.client.getToken", function(a) {
        return _.Mh(a)
    });
    _.C("gapi.client.setToken", function(a, b) {
        a ? _.Yv(a, b) : _.Zv(b)
    });
    _.C("gapi.client.AuthType", {
        u2: "auto",
        NONE: "none",
        W6: "oauth2",
        M4: "1p"
    });
    _.C("gapi.client.AuthType.AUTO", "auto");
    _.C("gapi.client.AuthType.NONE", "none");
    _.C("gapi.client.AuthType.OAUTH2", "oauth2");
    _.C("gapi.client.AuthType.FIRST_PARTY", "1p");

});
// Google Inc.

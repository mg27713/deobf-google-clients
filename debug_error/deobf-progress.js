/* JS */
CALLBACK(function(ctx) { // _ = ctx (because this function is called through useIndependentCtx, not the same ctx as in loader though)
    var window = this; // was never obfuscated, wow!
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
    */
    ctx.QQ = function(a, b) {
        this.Jw = [];
        this.gL = a;
        this.lH = b || null;
        this.Jq = this.xn = !1;
        this.ij = void 0;
        this.nE = this.ZR = this.zy = !1;
        this.nx = 0;
        this.$a = null;
        this.By = 0
    };
    ctx.QQ.prototype.cancel = function(a) {
        if (this.xn) this.ij instanceof ctx.QQ && this.ij.cancel();
        else {
            if (this.$a) {
                var b = this.$a;
                delete this.$a;
                a ? b.cancel(a) : (b.By--, 0 >= b.By && b.cancel())
            }
            this.gL ? this.gL.call(this.lH, this) : this.nE = !0;
            this.xn || (a = new ctx.RQ(this), ctx.SQ(this), ctx.TQ(this, !1, a))
        }
    };
    ctx.QQ.prototype.dH = function(a, b) {
        this.zy = !1;
        ctx.TQ(this, a, b)
    };
    ctx.TQ = function(a, b, c) {
        a.xn = !0;
        a.ij = c;
        a.Jq = !b;
        UQ(a)
    };
    ctx.SQ = function(a) {
        if (a.xn) {
            if (!a.nE) throw new VQ(a);
            a.nE = !1
        }
    };
    ctx.QQ.prototype.callback = function(a) {
        ctx.SQ(this);
        ctx.TQ(this, !0, a)
    };
    ctx.QQ.prototype.Td = function(a, b) {
        return this.Zm(a, null, b)
    };
    ctx.QQ.prototype.Zm = function(a, b, c) {
        this.Jw.push([a, b, c]);
        this.xn && UQ(this);
        return this
    };
    ctx.QQ.prototype.then = function(a, b, c) {
        var d, e, f = new ctx.Gk(function(g, k) {
            d = g;
            e = k
        });
        this.Zm(d, function(g) {
            g instanceof ctx.RQ ? f.cancel() : e(g)
        });
        return f.then(a, b, c)
    };
    ctx.pk(ctx.QQ);
    ctx.QQ.prototype.isError = function(a) {
        return a instanceof Error
    };
    var WQ = function(a) {
            return ctx.rb(a.Jw, function(b) {
                return "function" === typeof b[1]
            })
        },
        UQ = function(a) {
            if (a.nx && a.xn && WQ(a)) {
                var b = a.nx,
                    c = XQ[b];
                c && (ctx.A.clearTimeout(c.Ca), delete XQ[b]);
                a.nx = 0
            }
            a.$a && (a.$a.By--, delete a.$a);
            b = a.ij;
            for (var d = c = !1; a.Jw.length && !a.zy;) {
                var e = a.Jw.shift(),
                    f = e[0],
                    g = e[1];
                e = e[2];
                if (f = a.Jq ? g : f) try {
                    var k = f.call(e || a.lH, b);
                    void 0 !== k && (a.Jq = a.Jq && (k == b || a.isError(k)), a.ij = b = k);
                    if (ctx.qk(b) || "function" === typeof ctx.A.Promise && b instanceof ctx.A.Promise) d = !0, a.zy = !0
                } catch (l) {
                    b = l, a.Jq = !0, WQ(a) ||
                        (c = !0)
                }
            }
            a.ij = b;
            d && (k = (0, ctx.R)(a.dH, a, !0), d = (0, ctx.R)(a.dH, a, !1), b instanceof ctx.QQ ? (b.Zm(k, d), b.ZR = !0) : b.then(k, d));
            c && (b = new YQ(b), XQ[b.Ca] = b, a.nx = b.Ca)
        },
        VQ = function() {
            ctx.Vc.call(this)
        };
    ctx.K(VQ, ctx.Vc);
    VQ.prototype.message = "Deferred has already fired";
    VQ.prototype.name = "AlreadyCalledError";
    ctx.RQ = function() {
        ctx.Vc.call(this)
    };
    ctx.K(ctx.RQ, ctx.Vc);
    ctx.RQ.prototype.message = "Deferred was canceled";
    ctx.RQ.prototype.name = "CanceledError";
    var YQ = function(a) {
        this.Ca = ctx.A.setTimeout((0, ctx.R)(this.n1, this), 0);
        this.ju = a
    };
    YQ.prototype.n1 = function() {
        delete XQ[this.Ca];
        throw this.ju;
    };
    var XQ = {};

    var ZQ = function(a) {
            (0, eval)(a)
        },
        $Q = function(a) {
            var b = ctx.A.onerror,
                c = !1;
            ctx.wc && !ctx.Pc("535.3") && (c = !c);
            ctx.A.onerror = function(d, e, f, g, k) {
                b && b(d, e, f, g, k);
                a({
                    message: d,
                    fileName: e,
                    line: f,
                    lineNumber: f,
                    xaa: g,
                    error: k
                });
                return c
            }
        },
        aR = function(a) {
            var b = "";
            "function" === typeof a.toString && (b = "" + a);
            return b + a.stack
        },
        bR = function(a, b) {
            b || (b = {});
            b[aR(a)] = !0;
            var c = a.stack || "";
            (a = a.JG) && !b[aR(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += bR(a, b));
            return c
        },
        cR = function(a) {
            var b = ctx.pi("window.location.href");
            null == a && (a = 'Unknown Error of type "null/undefined"');
            if ("string" === typeof a) return {
                message: a,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: b,
                stack: "Not available"
            };
            var c = !1;
            try {
                var d = a.lineNumber || a.line || "Not available"
            } catch (f) {
                d = "Not available", c = !0
            }
            try {
                var e = a.fileName || a.filename || a.sourceURL || ctx.A.$googDebugFname || b
            } catch (f) {
                e = "Not available", c = !0
            }
            b = bR(a);
            if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) return c = a.message,
                null == c && (c = a.constructor && a.constructor instanceof Function ? 'Unknown Error of type "' + (a.constructor.name ? a.constructor.name : ctx.by(a.constructor)) + '"' : "Unknown Error of unknown type", "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())), {
                    message: c,
                    name: a.name || "UnknownError",
                    lineNumber: d,
                    fileName: e,
                    stack: b || "Not available"
                };
            a.stack = b;
            return a
        };
    var dR = function() {
        ctx.ri.call(this)
    };
    ctx.ii(dR, ctx.ri);
    dR.prototype.init = function() {
        this.zo = []
    };
    var gR = function(a) {
            var b = eR;
            b.xD = a;
            fR(b)
        },
        iR = function(a, b) {
            var c = eR;
            if (c.kca) {
                a = "Potentially sensitive message stripped for security reasons.";
                var d = Error("Ra");
                d.columnNumber = b.columnNumber;
                d.lineNumber = b.lineNumber;
                d.name = b.name;
                d.fileName = b.fileName;
                if (ctx.Jb() && ctx.Wx(28) || ctx.Ib() && ctx.Wx(14)) d.stack = b.stack;
                b = d
            }
            c.Ob || b instanceof ctx.RQ || (c.xD ? hR(c.xD, b, a) : c.zo && 10 > c.zo.length && c.zo.push([a, b]))
        },
        fR = function(a) {
            a.zo && (ctx.ob(a.zo, function(b) {
                hR(this.xD, b[1], b[0])
            }, a), a.zo = null)
        };
    dR.prototype.Bb = null;
    var eR = new dR;
    var jR = function() {
        var a = window;
        if (!a.location) try {
            ctx.Gx(a)
        } catch (c) {}
        var b = a.location && a.location.ancestorOrigins;
        if (void 0 !== b) return b && b.length ? b[b.length - 1] == a.location.origin : !0;
        try {
            return void 0 !== a.top.location.href
        } catch (c) {
            return !1
        }
    };
    var kR = {},
        lR = function() {
            var a = {};
            a.location = document.location.toString();
            if (jR()) try {
                a["top.location"] = top.location.toString()
            } catch (c) {
                a["top.location"] = "[external]"
            } else a["top.location"] = "[external]";
            for (var b in kR) try {
                a[b] = kR[b].call()
            } catch (c) {
                a[b] = "[error] " + c.message
            }
            return a
        };
    var mR = function(a) {
            this.XG = a;
            this.SJ = {};
            this.Nq = []
        },
        hR = function(a, b, c) {
            var d = lR();
            c && (d.message = c);
            a: {
                c = ctx.dy();d["call-stack"] = c;b = b instanceof Error ? b : b || "";
                for (c = 0; c < a.Nq.length; c++)
                    if (!1 === a.Nq[c](b, d)) break a;c = "";
                if (b) {
                    c = b.message || "unknown";
                    for (var e = 0, f = 0; f < c.length; ++f) e = 31 * e + c.charCodeAt(f) >>> 0;
                    c = e
                }
                e = "";
                for (g in d) e = e + g + ":" + d[g] + ":";
                var g = c + "::" + e;c = a.SJ[g];c || (c = {
                    time: 0,
                    count: 0
                }, a.SJ[g] = c);1E4 > ctx.lb() - c.time ? (c.count++, 1 == c.count && (d = lR(), d.message = "Throttling: " + g, a.XG.Ru(b, d))) : (c.count &&
                    (d["dropped-instances"] = c.count), c.time = ctx.lb(), c.count = 0, a.XG.Ru(b, d))
            }
        };
    /*
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var nR = function(a) {
        ctx.ri.call(this);
        this.bT = a
    };
    ctx.K(nR, ctx.ri);
    nR.prototype.wrap = function(a) {
        return oR(this, a)
    };
    var pR = function(a, b) {
            return (b ? "__wrapper_" : "__protected_") + ctx.cd(a) + "__"
        },
        oR = function(a, b) {
            var c = pR(a, !0);
            b[c] || ((b[c] = qR(a, b))[pR(a, !1)] = b);
            return b[c]
        },
        qR = function(a, b) {
            var c = function() {
                if (a.Ob) return b.apply(this, arguments);
                try {
                    return b.apply(this, arguments)
                } catch (d) {
                    a.mg(d)
                } finally {}
            };
            c[pR(a, !1)] = b;
            return c
        };
    nR.prototype.mg = function(a) {
        if (!(a && "object" === typeof a && "string" === typeof a.message && 0 == a.message.indexOf("Error in protected function: ") || "string" === typeof a && 0 == a.indexOf("Error in protected function: "))) throw this.bT(a), new rR(a);
    };
    var sR = function(a, b) {
        var c = ctx.A.window,
            d = c[b];
        c[b] = function(e, f) {
            "string" === typeof e && (e = ctx.ji(ZQ, e));
            arguments[0] = e = oR(a, e);
            if (d.apply) return d.apply(this, arguments);
            var g = e;
            if (2 < arguments.length) {
                var k = Array.prototype.slice.call(arguments, 2);
                g = function() {
                    e.apply(this, k)
                }
            }
            return d(g, f)
        };
        c[b][pR(a, !1)] = d
    };
    nR.prototype.va = function() {
        var a = ctx.A.window;
        var b = a.setTimeout;
        b = b[pR(this, !1)] || b;
        a.setTimeout = b;
        b = a.setInterval;
        b = b[pR(this, !1)] || b;
        a.setInterval = b;
        nR.T.va.call(this)
    };
    var rR = function(a) {
        ctx.Vc.call(this, "Error in protected function: " + (a && a.message ? String(a.message) : String(a)));
        (a = (this.JG = a) && a.stack) && "string" === typeof a && (this.stack = a)
    };
    ctx.K(rR, ctx.Vc);
    var uR = function(a, b, c) {
        ctx.dj.call(this);
        this.cH = b || null;
        this.fG = {};
        this.nO = tR;
        this.nW = a;
        if (!c)
            if (this.wn = null, ctx.sc && !ctx.Pc("10")) $Q((0, ctx.R)(this.Ru, this));
            else {
                this.wn = new nR((0, ctx.R)(this.Ru, this));
                sR(this.wn, "setTimeout");
                sR(this.wn, "setInterval");
                a = this.wn;
                b = ctx.A.window;
                c = ["requestAnimationFrame", "mozRequestAnimationFrame", "webkitAnimationFrame", "msRequestAnimationFrame"];
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    c[d] in b && sR(a, e)
                }
                a = this.wn;
                ctx.mi = !0;
                b = (0, ctx.R)(a.wrap, a);
                for (c = 0; c < ctx.ki.length; c++) ctx.ki[c](b);
                ctx.li.push(a)
            }
    };
    ctx.K(uR, ctx.dj);
    var vR = function(a, b) {
        ctx.vi.call(this, "a");
        this.error = a;
        this.context = b
    };
    ctx.K(vR, ctx.vi);
    var tR = function(a, b, c, d) {
            ctx.ky(a, null, b, c, d)
        },
        wR = function(a, b) {
            a.nO = b
        };
    uR.prototype.Ru = function(a, b) {
        a = a.error || a;
        b = b ? ctx.lk(b) : {};
        a instanceof Error && ctx.Fb(b, a.__closure__error__context__984382 || {});
        a = cR(a);
        if (this.cH) try {
            this.cH(a, b)
        } catch (k) {}
        var c = a.message.substring(0, 1900),
            d = a.stack;
        try {
            var e = ctx.Yx(this.nW, "script", a.fileName, "error", c, "line", a.lineNumber);
            ctx.$i(this.fG) || (e = ctx.rh(e, this.fG));
            c = {};
            c.trace = d;
            if (b)
                for (var f in b) c["context." + f] = b[f];
            var g = ctx.qh(c);
            this.nO(e, "POST", g, this.Oaa)
        } catch (k) {}
        try {
            this.dispatchEvent(new vR(a, b))
        } catch (k) {}
    };
    uR.prototype.va = function() {
        ctx.ti(this.wn);
        uR.T.va.call(this)
    };
    var xR = function() {
            var a = ctx.S("debug/host"),
                b = "withCredentials" in new XMLHttpRequest,
                c = !!window.XDomainRequest,
                d = document.location.origin;
            eR.init();
            var e = new uR("/_/jserror", void 0, !0);
            wR(e, function(f, g, k, l) {
                a === d ? ctx.ky(a + f, null, g, k, l) : c ? (l = new window.XDomainRequest, l.open(g, a + f), l.send(k)) : b && ctx.ky(a + f, null, g, k, l)
            });
            gR(new mR(e))
        },
        yR = !1;
    (window.___jsl = window.___jsl || {}).hefn = function(a, b) { // there's the jsl hefn that was uncracked in the loader!
        yR || (xR(), yR = !0);
        var c = ctx.S("debug/reportExceptionRate");
        ("number" === typeof c ? c : 0) >= Math.random() && (b ? iR(b, a) : iR(null, a));
        if (ctx.S("debug/rethrowException")) throw a;
    };

});
// Google Inc.
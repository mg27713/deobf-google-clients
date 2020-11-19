/* JS */
CALLBACK(function(_) {
    var window = this;
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
    */
    _.QQ = function(a, b) {
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
    _.QQ.prototype.cancel = function(a) {
        if (this.xn) this.ij instanceof _.QQ && this.ij.cancel();
        else {
            if (this.$a) {
                var b = this.$a;
                delete this.$a;
                a ? b.cancel(a) : (b.By--, 0 >= b.By && b.cancel())
            }
            this.gL ? this.gL.call(this.lH, this) : this.nE = !0;
            this.xn || (a = new _.RQ(this), _.SQ(this), _.TQ(this, !1, a))
        }
    };
    _.QQ.prototype.dH = function(a, b) {
        this.zy = !1;
        _.TQ(this, a, b)
    };
    _.TQ = function(a, b, c) {
        a.xn = !0;
        a.ij = c;
        a.Jq = !b;
        UQ(a)
    };
    _.SQ = function(a) {
        if (a.xn) {
            if (!a.nE) throw new VQ(a);
            a.nE = !1
        }
    };
    _.QQ.prototype.callback = function(a) {
        _.SQ(this);
        _.TQ(this, !0, a)
    };
    _.QQ.prototype.Td = function(a, b) {
        return this.Zm(a, null, b)
    };
    _.QQ.prototype.Zm = function(a, b, c) {
        this.Jw.push([a, b, c]);
        this.xn && UQ(this);
        return this
    };
    _.QQ.prototype.then = function(a, b, c) {
        var d, e, f = new _.Gk(function(g, k) {
            d = g;
            e = k
        });
        this.Zm(d, function(g) {
            g instanceof _.RQ ? f.cancel() : e(g)
        });
        return f.then(a, b, c)
    };
    _.pk(_.QQ);
    _.QQ.prototype.isError = function(a) {
        return a instanceof Error
    };
    var WQ = function(a) {
            return _.rb(a.Jw, function(b) {
                return "function" === typeof b[1]
            })
        },
        UQ = function(a) {
            if (a.nx && a.xn && WQ(a)) {
                var b = a.nx,
                    c = XQ[b];
                c && (_.A.clearTimeout(c.Ca), delete XQ[b]);
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
                    if (_.qk(b) || "function" === typeof _.A.Promise && b instanceof _.A.Promise) d = !0, a.zy = !0
                } catch (l) {
                    b = l, a.Jq = !0, WQ(a) ||
                        (c = !0)
                }
            }
            a.ij = b;
            d && (k = (0, _.R)(a.dH, a, !0), d = (0, _.R)(a.dH, a, !1), b instanceof _.QQ ? (b.Zm(k, d), b.ZR = !0) : b.then(k, d));
            c && (b = new YQ(b), XQ[b.Ca] = b, a.nx = b.Ca)
        },
        VQ = function() {
            _.Vc.call(this)
        };
    _.K(VQ, _.Vc);
    VQ.prototype.message = "Deferred has already fired";
    VQ.prototype.name = "AlreadyCalledError";
    _.RQ = function() {
        _.Vc.call(this)
    };
    _.K(_.RQ, _.Vc);
    _.RQ.prototype.message = "Deferred was canceled";
    _.RQ.prototype.name = "CanceledError";
    var YQ = function(a) {
        this.Ca = _.A.setTimeout((0, _.R)(this.n1, this), 0);
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
            var b = _.A.onerror,
                c = !1;
            _.wc && !_.Pc("535.3") && (c = !c);
            _.A.onerror = function(d, e, f, g, k) {
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
            var b = _.pi("window.location.href");
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
                var e = a.fileName || a.filename || a.sourceURL || _.A.$googDebugFname || b
            } catch (f) {
                e = "Not available", c = !0
            }
            b = bR(a);
            if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) return c = a.message,
                null == c && (c = a.constructor && a.constructor instanceof Function ? 'Unknown Error of type "' + (a.constructor.name ? a.constructor.name : _.by(a.constructor)) + '"' : "Unknown Error of unknown type", "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())), {
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
        _.ri.call(this)
    };
    _.ii(dR, _.ri);
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
                if (_.Jb() && _.Wx(28) || _.Ib() && _.Wx(14)) d.stack = b.stack;
                b = d
            }
            c.Ob || b instanceof _.RQ || (c.xD ? hR(c.xD, b, a) : c.zo && 10 > c.zo.length && c.zo.push([a, b]))
        },
        fR = function(a) {
            a.zo && (_.ob(a.zo, function(b) {
                hR(this.xD, b[1], b[0])
            }, a), a.zo = null)
        };
    dR.prototype.Bb = null;
    var eR = new dR;
    var jR = function() {
        var a = window;
        if (!a.location) try {
            _.Gx(a)
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
                c = _.dy();d["call-stack"] = c;b = b instanceof Error ? b : b || "";
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
                }, a.SJ[g] = c);1E4 > _.lb() - c.time ? (c.count++, 1 == c.count && (d = lR(), d.message = "Throttling: " + g, a.XG.Ru(b, d))) : (c.count &&
                    (d["dropped-instances"] = c.count), c.time = _.lb(), c.count = 0, a.XG.Ru(b, d))
            }
        };
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var nR = function(a) {
        _.ri.call(this);
        this.bT = a
    };
    _.K(nR, _.ri);
    nR.prototype.wrap = function(a) {
        return oR(this, a)
    };
    var pR = function(a, b) {
            return (b ? "__wrapper_" : "__protected_") + _.cd(a) + "__"
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
        var c = _.A.window,
            d = c[b];
        c[b] = function(e, f) {
            "string" === typeof e && (e = _.ji(ZQ, e));
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
        var a = _.A.window;
        var b = a.setTimeout;
        b = b[pR(this, !1)] || b;
        a.setTimeout = b;
        b = a.setInterval;
        b = b[pR(this, !1)] || b;
        a.setInterval = b;
        nR.T.va.call(this)
    };
    var rR = function(a) {
        _.Vc.call(this, "Error in protected function: " + (a && a.message ? String(a.message) : String(a)));
        (a = (this.JG = a) && a.stack) && "string" === typeof a && (this.stack = a)
    };
    _.K(rR, _.Vc);
    var uR = function(a, b, c) {
        _.dj.call(this);
        this.cH = b || null;
        this.fG = {};
        this.nO = tR;
        this.nW = a;
        if (!c)
            if (this.wn = null, _.sc && !_.Pc("10")) $Q((0, _.R)(this.Ru, this));
            else {
                this.wn = new nR((0, _.R)(this.Ru, this));
                sR(this.wn, "setTimeout");
                sR(this.wn, "setInterval");
                a = this.wn;
                b = _.A.window;
                c = ["requestAnimationFrame", "mozRequestAnimationFrame", "webkitAnimationFrame", "msRequestAnimationFrame"];
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    c[d] in b && sR(a, e)
                }
                a = this.wn;
                _.mi = !0;
                b = (0, _.R)(a.wrap, a);
                for (c = 0; c < _.ki.length; c++) _.ki[c](b);
                _.li.push(a)
            }
    };
    _.K(uR, _.dj);
    var vR = function(a, b) {
        _.vi.call(this, "a");
        this.error = a;
        this.context = b
    };
    _.K(vR, _.vi);
    var tR = function(a, b, c, d) {
            _.ky(a, null, b, c, d)
        },
        wR = function(a, b) {
            a.nO = b
        };
    uR.prototype.Ru = function(a, b) {
        a = a.error || a;
        b = b ? _.lk(b) : {};
        a instanceof Error && _.Fb(b, a.__closure__error__context__984382 || {});
        a = cR(a);
        if (this.cH) try {
            this.cH(a, b)
        } catch (k) {}
        var c = a.message.substring(0, 1900),
            d = a.stack;
        try {
            var e = _.Yx(this.nW, "script", a.fileName, "error", c, "line", a.lineNumber);
            _.$i(this.fG) || (e = _.rh(e, this.fG));
            c = {};
            c.trace = d;
            if (b)
                for (var f in b) c["context." + f] = b[f];
            var g = _.qh(c);
            this.nO(e, "POST", g, this.Oaa)
        } catch (k) {}
        try {
            this.dispatchEvent(new vR(a, b))
        } catch (k) {}
    };
    uR.prototype.va = function() {
        _.ti(this.wn);
        uR.T.va.call(this)
    };
    var xR = function() {
            var a = _.S("debug/host"),
                b = "withCredentials" in new XMLHttpRequest,
                c = !!window.XDomainRequest,
                d = document.location.origin;
            eR.init();
            var e = new uR("/_/jserror", void 0, !0);
            wR(e, function(f, g, k, l) {
                a === d ? _.ky(a + f, null, g, k, l) : c ? (l = new window.XDomainRequest, l.open(g, a + f), l.send(k)) : b && _.ky(a + f, null, g, k, l)
            });
            gR(new mR(e))
        },
        yR = !1;
    (window.___jsl = window.___jsl || {}).hefn = function(a, b) {
        yR || (xR(), yR = !0);
        var c = _.S("debug/reportExceptionRate");
        ("number" === typeof c ? c : 0) >= Math.random() && (b ? iR(b, a) : iR(null, a));
        if (_.S("debug/rethrowException")) throw a;
    };

});
// Google Inc.

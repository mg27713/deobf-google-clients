var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function() {
    /*
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var global = this || self,
        allowAll = function(check) {
            return check
        };
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&
    */
   var // m = window, // m = window
     //   n = document, // n = document
     //   aa = window.location, // aa = location (it's not even used wtf)
        ba = function() {},
        nativeRegex = /\[native code\]/, // ca = nativeRegex
        putIfAbsent = function(dict, key, value) { // q (q period best period) = putIfAbsent
            return dict[key] = dict[key] || value
        },
        condenseDuplicates = function(list) { // da = condenseDuplicates
            list = list.sort();
            for (var out = [], prev = void 0, index = 0; index < list.length; index++) {
                var current = list[index];
                current != prev && out.push(current);
                prev = current
            }
            return out
        },
        blankObject = function() { // v = blankObject
            var obj;
            if ((obj = Object.create) && nativeRegex.test(obj)) obj = obj(null);
            else {
                obj = {};
                for (var key in obj) obj[key] = void 0 // what's the point of this?
            }
            return obj
        },
        gapi = putIfAbsent(window, "gapi", {}); // x = gapi (this isn't used either!)
    var C;
    C = putIfAbsent(window, "___jsl", blankObject());
    putIfAbsent(C, "I", 0);
    putIfAbsent(C, "remainingVisibleErrors", 10); // hel = remainingVisibleErrors
    var locateJshParam = function() { // D = locateJshParam
            var loc = location.href;
            if (C.dpo) var res = C.h;
            else {
                res = C.h;
                var uriFormA = /([#].*&|[#])jsh=([^&#]*)/g,
                    uriFormB = /([?#].*&|[?#])jsh=([^&#]*)/g;
                if (loc = loc && (uriFormA.exec(loc) || uriFormB.exec(loc))) try {
                    res = decodeURIComponent(loc[2])
                } catch (e) {}
            }
            return res
        },
        doTasks = function(callback) { // fa = doTasks
            var tasks = putIfAbsent(C, "tasks", []); // C.PQ = tasks (not used unless accessed dynamically???)
            C.tasks = [];
            var nTasks = tasks.length;
            if (0 === nTasks) callback();
            else
                for (var finished = 0, doneFunc = function() {
                        ++finished === nTasks && callback()
                    }, whichTask = 0; whichTask < nTasks; whichTask++) tasks[whichTask](doneFunc)
        },
        E = function(a) {
            return putIfAbsent(putIfAbsent(C, "H", blankObject()), a, blankObject())
        };
    var perf = putIfAbsent(C, "perf", blankObject()), // F = perf
        perfTotalTime = putIfAbsent(perf, "g", blankObject()), // G = perfTotalTime
        perfGroups = putIfAbsent(perf, "groups", blankObject()); // perf.i = groups, ha = perfGroups
    putIfAbsent(perf, "logs", []); // also not referenced except in H
    // perf.r = logs
    blankObject(); // why?
    blankObject();
    var perfLog = function(id, group, content) { // H = perfLog
            var logs = perf.logs;
            "function" === typeof logs ? logs(id, group, content) : logs.push([id, group, content])
        },
        advancedPerfLog = function(id, b, c) { // L = advancedPerfLog
            b && 0 < b.length && (b = multiToName(b), c && 0 < c.length && (b += "___" + multiToName(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = putIfAbsent(perfGroups, "mainGroup", blankObject()), putIfAbsent(b, c, blankObject())[id] = (new Date).getTime(), perfLog(id, "mainGroup", c))
            // group _p = mainGroup
        },
        multiToName = function(parts) { // K = multiToName
            return parts.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_")
        };
    var hintProcessors = blankObject(), // M = hintProcessors
        N = [],
        hintError = function(a) { // Q = hintError
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    N.push(["jsl", function(a) {
        for (var b in a)
            if (Object.prototype.hasOwnProperty.call(a, b)) {
                var c = a[b];
                "object" == typeof c ? C[b] = putIfAbsent(C, b, []).concat(c) : putIfAbsent(C, b, c)
            }
        if (b = a.u) a = putIfAbsent(C, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var ia = /^(\/[a-zA-Z0-9_\-]+)+$/,
        ampPaths = [/\/amp\//, /\/amp$/, /^\/amp$/], // R = ampPaths
        paramValueValidate = /^[a-zA-Z0-9\-_\.,!]+$/, // ja = paramValueValidate
        ka = /^gapi\.loaded_[0-9]+$/,
        verifyName = /^[a-zA-Z0-9,._-]+$/, // la = verifyName
        generateLoadURL = function(a, b, c, d) { // pa = generateLoadURL
            var e = a.split(";"),
                hintProcessorName = e.shift(),
                processHint = hintProcessors[hintProcessorName],
                loadURL = null;
            processHint ? loadURL = processHint(e, b, c, d) : hintError("no hint processor for: " + hintProcessorName);
            loadURL || hintError("failed to generate load url");
            b = loadURL;
            c = b.match(ma);
            (d = b.match(na)) && 1 === d.length && oa.test(b) && c && 1 === c.length || hintError("failed sanity: " + a);
            return loadURL
        },
        toURI = function(path, b, callback, d) { // ra = toURI
            var decoded = decodePath(path);
            ka.test(callback) || hintError("invalid_callback");
            b = toName(b);
            d = d && d.length ? toName(d) : null;
            var encode =
                function(component) {
                    return encodeURIComponent(component).replace(/%2C/g, ",")
                };
            return [encodeURIComponent(decoded.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", encode(decoded.version), "/m=", encode(b), d ? "/exm=" + encode(d) : "", "/rt=j/sv=1/d=1/ed=1", decoded.a ? "/am=" + encode(decoded.a) : "", decoded.c ? "/rs=" + encode(decoded.c) : "", decoded.f ? "/t=" + encode(decoded.f) : "", "/cb=", encode(callback)].join("")
        },
        decodePath = function(path) {  // qa = decodePath
            "/" !== path.charAt(0) && hintError("relative path");
            for (var parts = path.substring(1).split("/"), outParts = []; parts.length;) {
                path = parts.shift();
                if (!path.length || 0 == path.indexOf(".")) hintError("empty/relative directory");
                else if (0 < path.indexOf("=")) {
                    parts.unshift(path);
                    break
                }
                outParts.push(path)
            }
            
            var searchParams = {};
            
            for (var current = 0, len = parts.length; current < len; ++current) {
                var sides = parts[current].split("="),
                    key = decodeURIComponent(sides[0]),
                    value = decodeURIComponent(sides[1]);
                2 == sides.length && key && value && (a[key] = a[key] || value)
            }
            var prefix = "/" + outParts.join("/");
            ia.test(prefix) || hintError("invalid_prefix");
            var version = 0;
            for (len = ampPaths.length; version < len; ++version) ampPaths[version].test(prefix) && hintError("invalid_prefix");
            version = getParamValue(searchParams, "k", true);
            var d = getParamValue(searchParams, "am");
            e = getParamValue(searchParams, "rs");
            var t = getParamValue(searchParams, "t");
            return {
                pathPrefix: prefix,
                version: version,
                a: d,
                c: e,
                f: t
            }
        },
        toName = function(thing) { // S = toName
            for (var out = [], current = 0, size = thing.length; current < size; ++c) {
                var thisChar = thing[current].replace(/\./g, "_").replace(/-/g, "_");
                verifyName.test(thisChar) && out.push(thisChar)
            }
            return out.join(",")
        },
        getParamValue = function(searchParams, key, required) { // T = getParamValue
            var value = searchParams[key];
            !value && required && hintError("missing: " + key);
            if (value) {
                if (paramValueValidate.test(value)) return value;
                hintError("invalid: " + key)
            }
            return null
        },
        oa = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        na = /\/cb=/g,
        ma = /\/\//g,
        getJSH = function() { // sa = getJSH
            var jsh = locateJshParam();
            if (!jsh) throw Error("Bad hint");
            return jsh
        };
    hintProcessors.m = function(a, b, c, d) {
        (a = a[0]) || hintError("missing_hint");
        return "https://apis.google.com" + toURI(a, b, c, d)
    };
    var scriptTag = decodeURI("%73cript"), // U = scriptTag
        verifyNonce = /^[-+_0-9\/A-Za-z]+={0,2}$/, // V = verifyNonce
        W = function(array1, array2) { // W = intersection
            for (var out = [], index = 0; index < array1.length; ++index) {
                var current = array1[index],
                    otherIndex,
                    exists;
                
                if (e) {
                    searchBlock: {
                        for (otherIndex = 0; otherIndex < array2.length; otherIndex++)
                            if (array2[otherIndex] === current)
                                break searchBlock;
                        
                        otherIndex = -1
                    }
                    exists = 0 > otherIndex
                }
                exists && out.push(current)
            }
            return out
        },
        findNonce = function() { // X = findNonce
            var nonce = C.nonce;
            
            return void 0 !== nonce 
                ? nonce && nonce === String(nonce) && nonce.match(verifyNonce) 
                    ? nonce 
                    : C.nonce = null 
                : document.querySelector 
                    ? (nonce = document.querySelector("script[nonce]")) 
                        ? (nonce = nonce.nonce || nonce.getAttribute("nonce") || "", nonce && nonce === String(nonce) && nonce.match(verifyNonce) 
                            ? C.nonce = nonce 
                            : C.nonce = null)
                        : null 
                    : null
        },
        loadScript = function(uri) { // ua = loadScript
            if ("loading" != document.readyState) loadScriptPostWindow(uri);
            else {
                var nonce = findNonce(),
                    nonceCode = "";
                null !== nonce && (nonceCode = ' nonce="' + nonce + '"');
                var code = "<" + scriptTag + ' src="' + encodeURI(uri) + '"' + nonceCode + "></" + scriptTag + ">";
                document.write(freePolicy ? freePolicy.createHTML(code) : code)
            }
        },
        loadScriptPostWindow = function(uri) { // ta = loadScriptPostWindow
            var script = document.createElement(scriptTag);
            script.setAttribute("src", freePolicy ? freePolicy.createScriptURL(uri) : uri);
            var nonce = findNonce();
            null !== nonce && script.setAttribute("nonce", nonce);
            script.async = "true";
            
            var firstScript;
            (firstScript = document.getElementsByTagName(scriptTag)[0]) ? firstScript.parentNode.insertBefore(script, firstScript): (document.head || document.body || document.documentElement).appendChild(script)
        },
        va = function(a, b) {
            var c = b && b._c;
            if (c)
                for (var d = 0; d < N.length; d++) {
                    var e = N[d][0],
                        f = N[d][1];
                    f && Object.prototype.hasOwnProperty.call(c,
                        e) && f(c[e], a, b)
                }
        },
        xa = function(a, b, c) {
            callQuiet(function() {
                var d = b === locateJshParam() ? putIfAbsent(gapi, "_", blankObject()) : blankObject();
                d = putIfAbsent(E(b), "_", d);
                a(d)
            }, c)
        },
        za = function(a, b) {
            var c = b || {};
            "function" == typeof b && (c = {}, c.callback = b);
            va(a, c);
            b = a ? a.split(":") : [];
            var d = c.h || getJSH(),
                e = putIfAbsent(C, "ah", blankObject());
            if (e["::"] && b.length) {
                a = [];
                for (var f = null; f = b.shift();) {
                    var l = f.split(".");
                    l = e[f] || e[l[1] && "ns:" + l[0] || ""] || d;
                    var k = a.length && a[a.length - 1] || null,
                        w = k;
                    k && k.hint == l || (w = {
                        hint: l,
                        b: []
                    }, a.push(w));
                    w.b.push(f)
                }
                var y = a.length;
                if (1 < y) {
                    var z = c.callback;
                    z && (c.callback = function() {
                        0 ==
                            --y && z()
                    })
                }
                for (; b = a.shift();) ya(b.b, c, b.hint)
            } else ya(b || [], c, d)
        },
        ya = function(a, b, c) {
            a = condenseDuplicates(a) || [];
            var d = b.callback,
                e = b.config,
                f = b.timeout,
                l = b.ontimeout,
                k = b.onerror,
                w = void 0;
            "function" == typeof k && (w = k);
            var y = null,
                z = !1;
            if (f && !l || !f && l) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            k = putIfAbsent(E(c), "r", []).sort();
            var O = putIfAbsent(E(c), "L", []).sort(),
                I = [].concat(k),
                ea = function(u, A) {
                    if (z) return 0;
                    m.clearTimeout(y);
                    O.push.apply(O, p);
                    var B = ((gapi || {}).config || {}).update;
                    B ? B(e) : e && putIfAbsent(C, "cu", []).push(e);
                    if (A) {
                        advancedPerfLog("me0", u, I);
                        try {
                            xa(A, c, w)
                        } finally {
                            advancedPerfLog("me1", u, I)
                        }
                    }
                    return 1
                };
            0 < f && (y = m.setTimeout(function() {
                z = !0;
                l()
            }, f));
            var p = W(a, O);
            if (p.length) {
                p = W(a, k);
                var r = putIfAbsent(C, "CP", []),
                    t = r.length;
                r[t] = function(u) {
                    if (!u) return 0;
                    advancedPerfLog("ml1", p, I);
                    var A = function(J) {
                            r[t] = null;
                            ea(p, u) && doTasks(function() {
                                d && d();
                                J()
                            })
                        },
                        B = function() {
                            var J = r[t + 1];
                            J && J()
                        };
                    0 < t && r[t - 1] ? r[t] = function() {
                        A(B)
                    } : A(B)
                };
                if (p.length) {
                    var P = "loaded_" + C.I++;
                    gapi[P] = function(u) {
                        r[t](u);
                        gapi[P] = null
                    };
                    a = generateLoadURL(c, p, "gapi." + P, k);
                    k.push.apply(k, p);
                    advancedPerfLog("ml0", p, I);
                    b.sync ||
                        m.___gapisync ? loadScript(a) : loadScriptPostWindow(a)
                } else r[t](ba)
            } else ea(p) && d && d()
        },
        freePolicy2; // Aa = freePolicy2
    var freePolicy1 = null, // Ba = freePolicy1
        trustedTypes = global.trustedTypes;
    if (trustedTypes && trustedTypes.createPolicy) try {
        freePolicy1 = trustedTypes.createPolicy("gapi#gapi", {
            createHTML: allowAll,
            createScript: allowAll,
            createScriptURL: allowAll
        })
    } catch (securityError) {
        global.console && global.console.error(securityError.message)
    }
    freePolicy2 = freePolicy1;
    var freePolicy = freePolicy2; // Y = freePolicy
    var callQuiet = function(func, errorFilter) { // wa = callQuiet
        if (C.hee && 0 < C.remainingVisibleErrors) try {
            return func()
        } catch (error) {
            errorFilter && errorFilter(error), C.remainingVisibleErrors--, za("debug_error", function() {
                try {
                    window.___jsl.hefn(error)
                } catch (ignoredError) {
                    throw error;
                }
            })
        } else try {
            return func()
        } catch (error) {
            throw errorFilter && errorFilter(error), error;
        }
    };
    gapi.load = function(a, b) {
        return callQuiet(function() {
            return za(a, b)
        })
    };
    perfTotalTime.bs0 = window.gapi._bs || (new Date).getTime();
    perfLog("bs0");
    perfTotalTime.bs1 = (new Date).getTime();
    perfLog("bs1");
    delete window.gapi._bs;
}).call(this);
gapi.load("", {
    callback: window["gapi_onload"],
    _c: {
        "jsl": {
            "ci": {
                "deviceType": "desktop",
                "oauth-flow": {
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "disableOpt": true,
                    "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                    "usegapi": false
                },
                "debug": {
                    "reportExceptionRate": 0.05,
                    "forceIm": false,
                    "rethrowException": false,
                    "host": "https://apis.google.com"
                },
                "enableMultilogin": true,
                "googleapis.config": {
                    "auth": {
                        "useFirstPartyAuthV2": true
                    }
                },
                "isPlusUser": true,
                "inline": {
                    "css": 1
                },
                "disableRealtimeCallback": false,
                "drive_share": {
                    "skipInitCommand": true
                },
                "csi": {
                    "rate": 0.01
                },
                "client": {
                    "cors": false
                },
                "isLoggedIn": true,
                "signInDeprecation": {
                    "rate": 0.0
                },
                "include_granted_scopes": true,
                "llang": "en",
                "iframes": {
                    "youtube": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "ytsubscribe": {
                        "url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"
                    },
                    "plus_circle": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                    },
                    "plus_share": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                    },
                    "rbr_s": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                    },
                    ":source:": "3p",
                    "playemm": {
                        "url": "https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "savetoandroidpay": {
                        "url": "https://pay.google.com/gp/v/widget/save"
                    },
                    "blogger": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "evwidget": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                    },
                    "partnersbadge": {
                        "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"
                    },
                    "dataconnector": {
                        "url": "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"
                    },
                    "surveyoptin": {
                        "url": "https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"
                    },
                    ":socialhost:": "https://apis.google.com",
                    "shortlists": {
                        "url": ""
                    },
                    "hangout": {
                        "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                    },
                    "plus_followers": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                    },
                    "post": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                    },
                    ":gplus_url:": "https://plus.google.com",
                    "signin": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                        "methods": ["onauth"]
                    },
                    "rbr_i": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                    },
                    "share": {
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"
                    },
                    "plusone": {
                        "params": {
                            "count": "",
                            "size": "",
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                    },
                    "comments": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    ":im_socialhost:": "https://plus.googleapis.com",
                    "backdrop": {
                        "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"
                    },
                    "visibility": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                    },
                    "autocomplete": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                    },
                    "additnow": {
                        "url": "https://apis.google.com/marketplace/button?usegapi\u003d1",
                        "methods": ["launchurl"]
                    },
                    ":signuphost:": "https://plus.google.com",
                    "ratingbadge": {
                        "url": "https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"
                    },
                    "appcirclepicker": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                    },
                    "follow": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"
                    },
                    "community": {
                        "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"
                    },
                    "sharetoclassroom": {
                        "url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"
                    },
                    "ytshare": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                    },
                    "plus": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"
                    },
                    "family_creation": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "commentcount": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"
                    },
                    "configurator": {
                        "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"
                    },
                    "zoomableimage": {
                        "url": "https://ssl.gstatic.com/microscope/embed/"
                    },
                    "appfinder": {
                        "url": "https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"
                    },
                    "savetowallet": {
                        "url": "https://pay.google.com/gp/v/widget/save"
                    },
                    "person": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"
                    },
                    "savetodrive": {
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                        "methods": ["save"]
                    },
                    "page": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"
                    },
                    "card": {
                        "url": ":socialhost:/:session_prefix:_/hovercard/card"
                    }
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.6Uw6xjIGoH8.O/am\u003dwQE/d\u003d1/ct\u003dzgms/rs\u003dAGLTcCOCpwZBnKr4AHjJwpr6PLObYk6mnA/m\u003d__features__",
            "u": "https://apis.google.com/js/api.js",
            "hee": true,
            "fp": "8ce5d92840216c7cbbc5ca875448ffb0960c9648",
            "dpo": false
        },
        "fp": "8ce5d92840216c7cbbc5ca875448ffb0960c9648",
        "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
        "bimodal": ["signin", "share"]
    }
});

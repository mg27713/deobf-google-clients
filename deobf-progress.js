var gapi = window.gapi = window.gapi || {}; // basically gapi = gapi || {}
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
     //   aa = window.location, // aa = location (it's not even used I don't understand)
        doNothing = function() {},
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
    var ctx;
    ctx = putIfAbsent(window, "___jsl", blankObject()); // C = ctx
    putIfAbsent(ctx, "howManyLoaded", 0);
    putIfAbsent(ctx, "remainingVisibleErrors", 10); // hel = remainingVisibleErrors
    var locateJshParam = function() { // D = locateJshParam
            var loc = location.href;
            if (ctx.dpo) var res = ctx.h;
            else {
                res = ctx.h;
                var uriFormA = /([#].*&|[#])jsh=([^&#]*)/g,
                    uriFormB = /([?#].*&|[?#])jsh=([^&#]*)/g;
                if (loc = loc && (uriFormA.exec(loc) || uriFormB.exec(loc))) try {
                    res = decodeURIComponent(loc[2])
                } catch (e) {}
            }
            return res
        },
        doTasks = function(callback) { // fa = doTasks
            var tasks = putIfAbsent(ctx, "tasks", []); // C.PQ = tasks (not used unless accessed dynamically???)
            ctx.tasks = [];
            var nTasks = tasks.length;
            if (0 === nTasks) callback();
            else
                for (var finished = 0, doneFunc = function() {
                        ++finished === nTasks && callback()
                    }, whichTask = 0; whichTask < nTasks; whichTask++) tasks[whichTask](doneFunc)
        },
        independentCtx = function(obj) {
            return putIfAbsent(putIfAbsent(ctx, "independentContexts", blankObject()), obj, blankObject()) // C.H = independentContexts
        };
    var perf = putIfAbsent(ctx, "perf", blankObject()), // F = perf
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
        configHandlers = [], // N = configHandlers
        hintError = function(a) { // Q = hintError
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    configHandlers.push(["jsl", function(subconfig) {
        for (var prop in subconfig)
            if (Object.prototype.hasOwnProperty.call(subconfig, prop)) {
                var value = subconfig[prop];
                "object" == typeof value ? ctx[prop] = putIfAbsent(ctx, prop, []).concat(value) : putIfAbsent(ctx, prop, value)
            }
        
        var gapiScripts, scriptLoc;
        if (scriptLoc = subconfig.u)
            gapiScripts = putIfAbsent(ctx, "us", []),
            gapiScripts.push(scriptLoc),
            (scriptLoc = /^https:(.*)$/.exec(scriptLoc)) && gapiScripts.push("http:" + scriptLoc[1]) // basically add both http and https to the mysterious list
    }]);
    var ia = /^(\/[a-zA-Z0-9_\-]+)+$/,
        ampPaths = [/\/amp\//, /\/amp$/, /^\/amp$/], // R = ampPaths
        paramValueValidate = /^[a-zA-Z0-9\-_\.,!]+$/, // ja = paramValueValidate
        testCallback = /^gapi\.loaded_[0-9]+$/, // ka = testCallback
        verifyName = /^[a-zA-Z0-9,._-]+$/, // la = verifyName
        generateLoadURL = function(hint, b, callback, d) { // pa = generateLoadURL
            var parts = hint.split(";"),
                hintProcessorName = parts.shift(),
                processHint = hintProcessors[hintProcessorName],
                loadURL = null;
            processHint ? loadURL = processHint(parts, b, callback, d) : hintError("no hint processor for: " + hintProcessorName);
            loadURL || hintError("failed to generate load url");
//             b = loadURL;
            var c = loadURL.match(ma);
            (d = loadURL.match(na)) && 1 === d.length && oa.test(loadURL) && c && 1 === c.length || hintError("failed sanity: " + hint);
            return loadURL
        },
        toURI = function(path, b, callback, d) { // ra = toURI
            var decoded = decodePath(path);
            testCallback.test(callback) || hintError("invalid_callback");
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
                2 == sides.length && key && value && (searchParams[key] = searchParams[key] || value)
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
    hintProcessors.m = function(hint, b, callback, d) {
        (hint = hint[0]) || hintError("missing_hint");
        return "https://apis.google.com" + toURI(hint, b, callback, d)
    };
    var scriptTag = decodeURI("%73cript"), // U = scriptTag
        verifyNonce = /^[-+_0-9\/A-Za-z]+={0,2}$/, // V = verifyNonce
        onlyInSource = function(source, target) { // W = onlyInSource
            for (var out = [], index = 0; index < source.length; ++index) {
                var current = source[index],
                    otherIndex,
                    doesNotExist;
                
                if (current) {
                    searchBlock: {
                        for (otherIndex = 0; otherIndex < target.length; otherIndex++)
                            if (target[otherIndex] === current)
                                break searchBlock;
                        
                        otherIndex = -1
                    }
                    doesNotExist = 0 > otherIndex
                }
                doesNotExist && out.push(current)
            }
            return out
        },
        findNonce = function() { // X = findNonce
            var nonce = ctx.nonce;
            
            return void 0 !== nonce 
                ? nonce && nonce === String(nonce) && nonce.match(verifyNonce) 
                    ? nonce 
                    : ctx.nonce = null 
                : document.querySelector 
                    ? (nonce = document.querySelector("script[nonce]")) 
                        ? (nonce = nonce.nonce || nonce.getAttribute("nonce") || "", nonce && nonce === String(nonce) && nonce.match(verifyNonce) 
                            ? ctx.nonce = nonce 
                            : ctx.nonce = null)
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
        loadConfig = function(a, configRoot) { // va = loadConfig
            var config = configRoot && configRoot.config;
            if (config)
                for (var num = 0; num < configHandlers.length; num++) {
                    var property = configHandlers[num][0],
                        handler = configHandlers[num][1];
                    handler && Object.prototype.hasOwnProperty.call(config, property) && handler(config[property], a, configRoot)
                }
        },
        useIndependentCtx = function(func, owner, errorFilter) { // xa = useIndependentCtx
            callQuiet(function() {
                var d = owner === locateJshParam() ? putIfAbsent(gapi, "_", blankObject()) : blankObject();
                d = putIfAbsent(independentCtx(owner), "_", d);
                func(d)
            }, errorFilter)
        },
        load = function(a, paramConfig) { // za = load
            var masterConfig = paramConfig || {};
            "function" == typeof paramConfig && (masterConfig = {}, masterConfig.callback = paramConfig);
            loadConfig(a, masterConfig);
            
            var parts = a ? a.split(":") : [];
            var defaultHint = masterConfig.h || getJSH(),
                e = putIfAbsent(ctx, "ah", blankObject()),
                configs;
            
            if (e["::"] && parts.length) {
                configs = [];
                for (var current = null; current = parts.shift();) {
                    var hint = current.split(".");
                    hint = e[f] || e[hint[1] && "ns:" + hint[0] || ""] || defaultHint;
                    var prevConfig = a.length && a[a.length - 1] || null,
                        currentConfig = prevConfig;
                    prevConfig && prevConfig.hint == hint || (currentConfig = {
                        hint: hint,
                        b: []
                    }, a.push(currentConfig));
                    currentConfig.b.push(current)
                }
                
                var size = configs.length;
                if (1 < size) {
                    var callback = masterConfig.callback;
                    callback && (masterConfig.callback = function() {
                        0 == --size && callback()
                    })
                }
                
                var theConfig;
                for (; theConfig = configs.shift();)
                    getAndLoadScript(theConfig.b, masterConfig, theConfig.hint)
            } else getAndLoadScript(parts || [], masterConfig, defaultHint)
        },
        getAndLoadScript = function(a, requestInfo, hint) { // ya = getAndLoadScript
            a = condenseDuplicates(a) || [];
            var callback = requestInfo.callback,
                config = requestInfo.config,
                timeout = requestInfo.timeout,
                ontimeout = requestInfo.ontimeout,
                onerrorLenient = requestInfo.onerror,
                onerror = void 0;
            "function" == typeof onerrorLenient && (onerror = onerrorLenient);
            var timeoutHandler = null,
                timedOut = !1; // false
            
            if (timeout && !ontimeout || !timeout && ontimeout)
                throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            // why not just say 
            //     timeout != ontimeout
            
            var startedTokens = putIfAbsent(independentCtx(hint), "r", []).sort();
            var finishedTokens = putIfAbsent(independentCtx(hint), "L", []).sort(),
                I = [].concat(startedTokens),
                finishTokens = function(u, log) {
                    if (timedOut)
                        return 0;
                    
                    clearTimeout(timeoutHandler); // previously window.clearTimeout
                    finishedTokens.push.apply(finishedTokens, currentTokens);
                    var update = ((gapi || {}).config || {}).update;
                    update ? update(config) : config && putIfAbsent(ctx, "cu", []).push(config);
                    if (log) {
                        advancedPerfLog("me0", u, I);
                        try {
                            useIndependentCtx(log, hint, onerror)
                        } finally {
                            advancedPerfLog("me1", u, I)
                        }
                    }
                    return 1
                };
            
            0 < timeout && (timeoutHandler = setTimeout(function() {
                timedOut = !0; // true
                ontimeout()
            }, timeout));
            
            var currentTokens = onlyInSource(a, finishedTokens);
            if (currentTokens.length) {
                currentTokens = onlyInSource(a, startedTokens);
                var handlers = putIfAbsent(ctx, "CP", []),
                    len = handlers.length;
                handlers[len] = function(u) {
                    if (!u) return 0;
                    advancedPerfLog("ml1", currentTokens, I);
                    var doTasksAndCallback = function(paramCallback) {
                            handlers[len] = null;
                            finishTokens(currentTokens, u) && doTasks(function() {
                                callback && callback();
                                paramCallback()
                            })
                        },
                        callNextHandler = function() {
                            var next = handlers[len + 1];
                            next && next()
                        };
                    0 < len && handlers[len - 1] ? handlers[len] = function() {
                        doTasksAndCallback(callNextHandler)
                    } : doTasksAndCallback(callNextHandler)
                };
                if (currentTokens.length) {
                    var callbackName = "loaded_" + ctx.howManyLoaded++;
                    gapi[callbackName] = function(u) {
                        handlers[t](u);
                        gapi[callbackName] = null
                    };
                    var loadURL = generateLoadURL(hint, currentTokens, "gapi." + callbackName, startedTokens);
                    startedTokens.push.apply(startedTokens, currentTokens);
                    advancedPerfLog("ml0", currentTokens, I);
                    requestInfo.sync ||
                        ___gapisync ? loadScript(loadURL) : loadScriptPostWindow(loadURL)
                } else handlers[t](doNothing)
            } else finishTokens(currentTokens) && callback && callback()
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
        if (ctx.hee && 0 < ctx.remainingVisibleErrors) try {
            return func()
        } catch (error) {
            errorFilter && errorFilter(error), ctx.remainingVisibleErrors--, load("debug_error", function() {
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
    gapi.load = function(a, config) {
        return callQuiet(function() {
            return load(a, config)
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
    config: {
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

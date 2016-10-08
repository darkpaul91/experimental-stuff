"use strict";
window.onclick = twineMove;
window.onload = twineMove;

function twineMove() {
    var stories = document.getElementsByTagName("tw-story"),
        containers = document.getElementsByTagName("tw-container"),
        index;
    for (index = 0; index <= stories.length - 1; index++) { containers[index].appendChild(stories[index]); } };

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2 }
    return Array.from(arr) }
var _slicedToArray = function() {
        function sliceIterator(arr, i) {
            var _arr = [],
                _n = !0,
                _d = !1,
                _e = void 0;
            try {
                for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err } finally {
                try {!_n && _i["return"] && _i["return"]() } finally {
                    if (_d) throw _e } }
            return _arr }
        return function(arr, i) {
            if (Array.isArray(arr)) return arr;
            if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance") } }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj };
! function() {
    /**
     * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
     * Available via the MIT or new BSD license.
     * see: http://github.com/jrburke/almond for details
     */
    var requirejs, require, define;
    ! function(undef) {
        function hasProp(obj, prop) {
            return hasOwn.call(obj, prop) }

        function normalize(name, baseName) {
            var nameParts, nameSegment, mapValue, foundMap, lastIndex, foundI, foundStarMap, starI, i, j, part, baseParts = baseName && baseName.split("/"),
                map = config.map,
                starMap = map && map["*"] || {};
            if (name && "." === name.charAt(0))
                if (baseName) {
                    for (name = name.split("/"), lastIndex = name.length - 1, config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex]) && (name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "")), name = baseParts.slice(0, baseParts.length - 1).concat(name), i = 0; i < name.length; i += 1)
                        if (part = name[i], "." === part) name.splice(i, 1), i -= 1;
                        else if (".." === part) {
                        if (1 === i && (".." === name[2] || ".." === name[0])) break;
                        i > 0 && (name.splice(i - 1, 2), i -= 2) }
                    name = name.join("/") } else 0 === name.indexOf("./") && (name = name.substring(2));
            if ((baseParts || starMap) && map) {
                for (nameParts = name.split("/"), i = nameParts.length; i > 0; i -= 1) {
                    if (nameSegment = nameParts.slice(0, i).join("/"), baseParts)
                        for (j = baseParts.length; j > 0; j -= 1)
                            if (mapValue = map[baseParts.slice(0, j).join("/")], mapValue && (mapValue = mapValue[nameSegment])) { foundMap = mapValue, foundI = i;
                                break }
                    if (foundMap) break;!foundStarMap && starMap && starMap[nameSegment] && (foundStarMap = starMap[nameSegment], starI = i) }!foundMap && foundStarMap && (foundMap = foundStarMap, foundI = starI), foundMap && (nameParts.splice(0, foundI, foundMap), name = nameParts.join("/")) }
            return name }

        function makeRequire(relName, forceSync) {
            return function() {
                var args = aps.call(arguments, 0);
                return "string" != typeof args[0] && 1 === args.length && args.push(null), _req.apply(undef, args.concat([relName, forceSync])) } }

        function makeNormalize(relName) {
            return function(name) {
                return normalize(name, relName) } }

        function makeLoad(depName) {
            return function(value) { defined[depName] = value } }

        function callDep(name) {
            if (hasProp(waiting, name)) {
                var args = waiting[name];
                delete waiting[name], defining[name] = !0, main.apply(undef, args) }
            if (!hasProp(defined, name) && !hasProp(defining, name)) throw new Error("No " + name);
            return defined[name] }

        function splitPrefix(name) {
            var prefix, index = name ? name.indexOf("!") : -1;
            return index > -1 && (prefix = name.substring(0, index), name = name.substring(index + 1, name.length)), [prefix, name] }

        function makeConfig(name) {
            return function() {
                return config && config.config && config.config[name] || {} } }
        var main, _req, makeMap, handlers, defined = {},
            waiting = {},
            config = {},
            defining = {},
            hasOwn = Object.prototype.hasOwnProperty,
            aps = [].slice,
            jsSuffixRegExp = /\.js$/;
        makeMap = function(name, relName) {
            var plugin, parts = splitPrefix(name),
                prefix = parts[0];
            return name = parts[1], prefix && (prefix = normalize(prefix, relName), plugin = callDep(prefix)), prefix ? name = plugin && plugin.normalize ? plugin.normalize(name, makeNormalize(relName)) : normalize(name, relName) : (name = normalize(name, relName), parts = splitPrefix(name), prefix = parts[0], name = parts[1], prefix && (plugin = callDep(prefix))), { f: prefix ? prefix + "!" + name : name, n: name, pr: prefix, p: plugin } }, handlers = { require: function(name) {
                return makeRequire(name) }, exports: function(name) {
                var e = defined[name];
                return "undefined" != typeof e ? e : defined[name] = {} }, module: function(name) {
                return { id: name, uri: "", exports: defined[name], config: makeConfig(name) } } }, main = function(name, deps, callback, relName) {
            var cjsModule, depName, ret, map, i, usingExports, args = [],
                callbackType = "undefined" == typeof callback ? "undefined" : _typeof(callback);
            if (relName = relName || name, "undefined" === callbackType || "function" === callbackType) {
                for (deps = !deps.length && callback.length ? ["require", "exports", "module"] : deps, i = 0; i < deps.length; i += 1)
                    if (map = makeMap(deps[i], relName), depName = map.f, "require" === depName) args[i] = handlers.require(name);
                    else if ("exports" === depName) args[i] = handlers.exports(name), usingExports = !0;
                else if ("module" === depName) cjsModule = args[i] = handlers.module(name);
                else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) args[i] = callDep(depName);
                else {
                    if (!map.p) throw new Error(name + " missing " + depName);
                    map.p.load(map.n, makeRequire(relName, !0), makeLoad(depName), {}), args[i] = defined[depName] }
                ret = callback ? callback.apply(defined[name], args) : void 0, name && (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name] ? defined[name] = cjsModule.exports : ret === undef && usingExports || (defined[name] = ret)) } else name && (defined[name] = callback) }, requirejs = require = _req = function(deps, callback, relName, forceSync, alt) {
            if ("string" == typeof deps) return handlers[deps] ? handlers[deps](callback) : callDep(makeMap(deps, callback).f);
            if (!deps.splice) {
                if (config = deps, config.deps && _req(config.deps, config.callback), !callback) return;
                callback.splice ? (deps = callback, callback = relName, relName = null) : deps = undef }
            return callback = callback || function() {}, "function" == typeof relName && (relName = forceSync, forceSync = alt), forceSync ? main(undef, deps, callback, relName) : setTimeout(function() { main(undef, deps, callback, relName) }, 4), _req }, _req.config = function(cfg) {
            return _req(cfg) }, requirejs._defined = defined, define = function(name, deps, callback) {
            if ("string" != typeof name) throw new Error("See almond README: incorrect module build, no module name");
            deps.splice || (callback = deps, deps = []), hasProp(defined, name) || hasProp(waiting, name) || (waiting[name] = [name, deps, callback]) }, define.amd = { jQuery: !0 } }(), define("almond", function() {}),
        function(global, factory) { "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) ? module.exports = global.document ? factory(global, !0) : function(w) {
                if (!w.document) throw new Error("jQuery requires a window with a document");
                return factory(w) } : factory(global) }("undefined" != typeof window ? window : this, function(window, noGlobal) {
            function isArrayLike(obj) {
                var length = !!obj && "length" in obj && obj.length,
                    type = jQuery.type(obj);
                return "function" === type || jQuery.isWindow(obj) ? !1 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj }

            function winnow(elements, qualifier, not) {
                if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not });
                if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                    return elem === qualifier !== not });
                if ("string" == typeof qualifier) {
                    if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
                    qualifier = jQuery.filter(qualifier, elements) }
                return jQuery.grep(elements, function(elem) {
                    return indexOf.call(qualifier, elem) > -1 !== not }) }

            function sibling(cur, dir) {
                for (;
                    (cur = cur[dir]) && 1 !== cur.nodeType;);
                return cur }

            function createOptions(options) {
                var object = {};
                return jQuery.each(options.match(rnotwhite) || [], function(_, flag) { object[flag] = !0 }), object }

            function completed() { document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), jQuery.ready() }

            function Data() { this.expando = jQuery.expando + Data.uid++ }

            function dataAttr(elem, key, data) {
                var name;
                if (void 0 === data && 1 === elem.nodeType)
                    if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) {
                        try { data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data } catch (e) {}
                        dataUser.set(elem, key, data) } else data = void 0;
                return data }

            function adjustCSS(elem, prop, valueParts, tween) {
                var adjusted, scale = 1,
                    maxIterations = 20,
                    currentValue = tween ? function() {
                        return tween.cur() } : function() {
                        return jQuery.css(elem, prop, "") },
                    initial = currentValue(),
                    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                    initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
                if (initialInUnit && initialInUnit[3] !== unit) { unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
                    do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations) }
                return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), adjusted }

            function getAll(context, tag) {
                var ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
                return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret }

            function setGlobalEval(elems, refElements) {
                for (var i = 0, l = elems.length; l > i; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval")) }

            function buildFragment(elems, context, scripts, selection, ignored) {
                for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++)
                    if (elem = elems[i], elem || 0 === elem)
                        if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        else if (rhtml.test(elem)) {
                    for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                    jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "" } else nodes.push(context.createTextNode(elem));
                for (fragment.textContent = "", i = 0; elem = nodes[i++];)
                    if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem);
                    else if (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)
                    for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
                return fragment }

            function returnTrue() {
                return !0 }

            function returnFalse() {
                return !1 }

            function safeActiveElement() {
                try {
                    return document.activeElement } catch (err) {} }

            function _on(elem, types, selector, data, fn, one) {
                var origFn, type;
                if ("object" === ("undefined" == typeof types ? "undefined" : _typeof(types))) { "string" != typeof selector && (data = data || selector, selector = void 0);
                    for (type in types) _on(elem, type, selector, data, types[type], one);
                    return elem }
                if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
                else if (!fn) return this;
                return 1 === one && (origFn = fn, fn = function(event) {
                    return jQuery().off(event), origFn.apply(this, arguments) }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() { jQuery.event.add(this, types, fn, data, selector) }) }

            function manipulationTarget(elem, content) {
                return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem : elem }

            function disableScript(elem) {
                return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem }

            function restoreScript(elem) {
                var match = rscriptTypeMasked.exec(elem.type);
                return match ? elem.type = match[1] : elem.removeAttribute("type"), elem }

            function cloneCopyEvent(src, dest) {
                var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
                if (1 === dest.nodeType) {
                    if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), events = pdataOld.events)) { delete pdataCur.handle, pdataCur.events = {};
                        for (type in events)
                            for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]) }
                    dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), dataUser.set(dest, udataCur)) } }

            function fixInput(src, dest) {
                var nodeName = dest.nodeName.toLowerCase(); "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue) }

            function domManip(collection, args, callback, ignored) { args = concat.apply([], args);
                var fragment, first, scripts, hasScripts, node, doc, i = 0,
                    l = collection.length,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
                    var self = collection.eq(index);
                    isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored) });
                if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first || ignored)) {
                    for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(collection[i], node, i);
                    if (hasScripts)
                        for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, ""))) }
                return collection }

            function _remove(elem, selector, keepData) {
                for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), node.parentNode.removeChild(node));
                return elem }

            function actualDisplay(name, doc) {
                var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                    display = jQuery.css(elem[0], "display");
                return elem.detach(), display }

            function defaultDisplay(nodeName) {
                var doc = document,
                    display = elemdisplay[nodeName];
                return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display }

            function curCSS(elem, name, computed) {
                var width, minWidth, maxWidth, ret, style = elem.style;
                return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name], "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), void 0 !== ret ? ret + "" : ret }

            function addGetHookIf(conditionFn, hookFn) {
                return { get: function() {
                        return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments) } } }

            function vendorPropName(name) {
                if (name in emptyStyle) return name;
                for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--;)
                    if (name = cssPrefixes[i] + capName, name in emptyStyle) return name }

            function setPositiveNumber(elem, value, subtract) {
                var matches = rcssNum.exec(value);
                return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value }

            function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
                for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
                return val }

            function getWidthOrHeight(elem, name, extra) {
                var valueIsBorderBox = !0,
                    val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                    styles = getStyles(elem),
                    isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
                if (document.msFullscreenElement && window.top !== window && elem.getClientRects().length && (val = Math.round(100 * elem.getBoundingClientRect()[name])), 0 >= val || null == val) {
                    if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                    valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0 }
                return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px" }

            function showHide(elements, show) {
                for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = dataPriv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), "none" === display && hidden || dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
                for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
                return elements }

            function Tween(elem, options, prop, end, easing) {
                return new Tween.prototype.init(elem, options, prop, end, easing) }

            function createFxNow() {
                return window.setTimeout(function() { fxNow = void 0 }), fxNow = jQuery.now() }

            function genFx(type, includeWidth) {
                var which, i = 0,
                    attrs = { height: type };
                for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
                return includeWidth && (attrs.opacity = attrs.width = type), attrs }

            function createTween(value, prop, animation) {
                for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; length > index; index++)
                    if (tween = collection[index].call(animation, prop, value)) return tween }

            function defaultPrefilter(elem, props, opts) {
                var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
                    orig = {},
                    style = elem.style,
                    hidden = elem.nodeType && isHidden(elem),
                    dataShow = dataPriv.get(elem, "fxshow");
                opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() { hooks.unqueued || oldfire() }), hooks.unqueued++, anim.always(function() { anim.always(function() { hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire() }) })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() { style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2] }));
                for (prop in props)
                    if (value = props[prop], rfxtypes.exec(value)) {
                        if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                            if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                            hidden = !0 }
                        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop) } else display = void 0;
                if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
                else { dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() { jQuery(elem).hide() }), anim.done(function() {
                        var prop;
                        dataPriv.remove(elem, "fxshow");
                        for (prop in orig) jQuery.style(elem, prop, orig[prop]) });
                    for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0)) } }

            function propFilter(props, specialEasing) {
                var index, name, easing, value, hooks;
                for (index in props)
                    if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) { value = hooks.expand(value), delete props[name];
                        for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing) } else specialEasing[name] = easing }

            function Animation(elem, properties, options) {
                var result, stopped, index = 0,
                    length = Animation.prefilters.length,
                    deferred = jQuery.Deferred().always(function() { delete tick.elem }),
                    tick = function() {
                        if (stopped) return !1;
                        for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
                        return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1) },
                    animation = deferred.promise({ elem: elem, props: jQuery.extend({}, properties), opts: jQuery.extend(!0, { specialEasing: {}, easing: jQuery.easing._default }, options), originalProperties: properties, originalOptions: options, startTime: fxNow || createFxNow(), duration: options.duration, tweens: [], createTween: function(prop, end) {
                            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                            return animation.tweens.push(tween), tween }, stop: function(gotoEnd) {
                            var index = 0,
                                length = gotoEnd ? animation.tweens.length : 0;
                            if (stopped) return this;
                            for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                            return gotoEnd ? (deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation, gotoEnd])) : deferred.rejectWith(elem, [animation, gotoEnd]), this } }),
                    props = animation.props;
                for (propFilter(props, animation.opts.specialEasing); length > index; index++)
                    if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), result;
                return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, { elem: elem, anim: animation, queue: animation.opts.queue })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always) }

            function getClass(elem) {
                return elem.getAttribute && elem.getAttribute("class") || "" }

            function addToPrefiltersOrTransports(structure) {
                return function(dataTypeExpression, func) { "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                    var dataType, i = 0,
                        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                    if (jQuery.isFunction(func))
                        for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func) } }

            function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
                function inspect(dataType) {
                    var selected;
                    return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                        return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1) }), selected }
                var inspected = {},
                    seekingTransport = structure === transports;
                return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*") }

            function ajaxExtend(target, src) {
                var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
                for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
                return deep && jQuery.extend(!0, target, deep), target }

            function ajaxHandleResponses(s, jqXHR, responses) {
                for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
                    "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
                if (ct)
                    for (type in contents)
                        if (contents[type] && contents[type].test(ct)) { dataTypes.unshift(type);
                            break }
                if (dataTypes[0] in responses) finalDataType = dataTypes[0];
                else {
                    for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) { finalDataType = type;
                            break }
                        firstDataType || (firstDataType = type) }
                    finalDataType = finalDataType || firstDataType }
                return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0 }

            function ajaxConvert(s, response, jqXHR, isSuccess) {
                var conv2, current, conv, tmp, prev, converters = {},
                    dataTypes = s.dataTypes.slice();
                if (dataTypes[1])
                    for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
                for (current = dataTypes.shift(); current;)
                    if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                        if ("*" === current) current = prev;
                        else if ("*" !== prev && prev !== current) {
                    if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                        for (conv2 in converters)
                            if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) { conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                                break }
                    if (conv !== !0)
                        if (conv && s["throws"]) response = conv(response);
                        else try { response = conv(response) } catch (e) {
                            return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current } } }
                return { state: "success", data: response } }

            function buildParams(prefix, obj, traditional, add) {
                var name;
                if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) { traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" === ("undefined" == typeof v ? "undefined" : _typeof(v)) && null != v ? i : "") + "]", v, traditional, add) });
                else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
                else
                    for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add) }

            function getWindow(elem) {
                return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView }
            var arr = [],
                document = window.document,
                _slice = arr.slice,
                concat = arr.concat,
                push = arr.push,
                indexOf = arr.indexOf,
                class2type = {},
                toString = class2type.toString,
                hasOwn = class2type.hasOwnProperty,
                support = {},
                version = "2.2.0",
                jQuery = function jQuery(selector, context) {
                    return new jQuery.fn.init(selector, context) },
                rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                rmsPrefix = /^-ms-/,
                rdashAlpha = /-([\da-z])/gi,
                fcamelCase = function(all, letter) {
                    return letter.toUpperCase() };
            jQuery.fn = jQuery.prototype = { jquery: version, constructor: jQuery, selector: "", length: 0, toArray: function() {
                    return _slice.call(this) }, get: function(num) {
                    return null != num ? 0 > num ? this[num + this.length] : this[num] : _slice.call(this) }, pushStack: function(elems) {
                    var ret = jQuery.merge(this.constructor(), elems);
                    return ret.prevObject = this, ret.context = this.context, ret }, each: function(callback) {
                    return jQuery.each(this, callback) }, map: function(callback) {
                    return this.pushStack(jQuery.map(this, function(elem, i) {
                        return callback.call(elem, i, elem) })) }, slice: function() {
                    return this.pushStack(_slice.apply(this, arguments)) }, first: function() {
                    return this.eq(0) }, last: function() {
                    return this.eq(-1) }, eq: function(i) {
                    var len = this.length,
                        j = +i + (0 > i ? len : 0);
                    return this.pushStack(j >= 0 && len > j ? [this[j]] : []) }, end: function() {
                    return this.prevObject || this.constructor() }, push: push, sort: arr.sort, splice: arr.splice }, jQuery.extend = jQuery.fn.extend = function() {
                var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = !1;
                for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" === ("undefined" == typeof target ? "undefined" : _typeof(target)) || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); length > i; i++)
                    if (null != (options = arguments[i]))
                        for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
                return target }, jQuery.extend({ expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""), isReady: !0, error: function(msg) {
                    throw new Error(msg) }, noop: function() {}, isFunction: function(obj) {
                    return "function" === jQuery.type(obj) }, isArray: Array.isArray, isWindow: function(obj) {
                    return null != obj && obj === obj.window }, isNumeric: function(obj) {
                    var realStringObj = obj && obj.toString();
                    return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0 }, isPlainObject: function(obj) {
                    return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0 }, isEmptyObject: function(obj) {
                    var name;
                    for (name in obj) return !1;
                    return !0 }, type: function(obj) {
                    return null == obj ? obj + "" : "object" === ("undefined" == typeof obj ? "undefined" : _typeof(obj)) || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : "undefined" == typeof obj ? "undefined" : _typeof(obj) }, globalEval: function(code) {
                    var script, indirect = eval;
                    code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code)) }, camelCase: function(string) {
                    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase) }, nodeName: function(elem, name) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase() }, each: function(obj, callback) {
                    var length, i = 0;
                    if (isArrayLike(obj))
                        for (length = obj.length; length > i && callback.call(obj[i], i, obj[i]) !== !1; i++);
                    else
                        for (i in obj)
                            if (callback.call(obj[i], i, obj[i]) === !1) break; return obj }, trim: function(text) {
                    return null == text ? "" : (text + "").replace(rtrim, "") }, makeArray: function(arr, results) {
                    var ret = results || [];
                    return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret }, inArray: function(elem, arr, i) {
                    return null == arr ? -1 : indexOf.call(arr, elem, i) }, merge: function(first, second) {
                    for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
                    return first.length = i, first }, grep: function(elems, callback, invert) {
                    for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
                    return matches }, map: function(elems, callback, arg) {
                    var length, value, i = 0,
                        ret = [];
                    if (isArrayLike(elems))
                        for (length = elems.length; length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
                    else
                        for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
                    return concat.apply([], ret) }, guid: 1, proxy: function proxy(fn, context) {
                    var tmp, args, proxy;
                    return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = _slice.call(arguments, 2), proxy = function() {
                        return fn.apply(context || this, args.concat(_slice.call(arguments))) }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0 }, now: Date.now, support: support }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) { class2type["[object " + name + "]"] = name.toLowerCase() });
            var Sizzle = function(window) {
                function Sizzle(selector, context, results, seed) {
                    var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument,
                        nodeType = context ? context.nodeType : 9;
                    if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
                    if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, documentIsHTML)) {
                        if (11 !== nodeType && (match = rquickExpr.exec(selector)))
                            if (m = match[1]) {
                                if (9 === nodeType) {
                                    if (!(elem = context.getElementById(m))) return results;
                                    if (elem.id === m) return results.push(elem), results } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results } else {
                                if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                                if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results }
                        if (!(!support.qsa || compilerCache[selector + " "] || rbuggyQSA && rbuggyQSA.test(selector))) {
                            if (1 !== nodeType) newContext = context, newSelector = selector;
                            else if ("object" !== context.nodeName.toLowerCase()) {
                                for ((nid = context.getAttribute("id")) ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid = expando), groups = tokenize(selector), i = groups.length, nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']"; i--;) groups[i] = nidselect + " " + toSelector(groups[i]);
                                newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                            }
                            if (newSelector) try {
                                return push.apply(results, newContext.querySelectorAll(newSelector)), results } catch (qsaError) {} finally { nid === expando && context.removeAttribute("id") }
                        }
                    }
                    return select(selector.replace(rtrim, "$1"), context, results, seed)
                }

                function createCache() {
                    function cache(key, value) {
                        return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value }
                    var keys = [];
                    return cache }

                function markFunction(fn) {
                    return fn[expando] = !0, fn }

                function assert(fn) {
                    var div = document.createElement("div");
                    try {
                        return !!fn(div) } catch (e) {
                        return !1 } finally { div.parentNode && div.parentNode.removeChild(div), div = null } }

                function addHandle(attrs, handler) {
                    for (var arr = attrs.split("|"), i = arr.length; i--;) Expr.attrHandle[arr[i]] = handler }

                function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                    if (diff) return diff;
                    if (cur)
                        for (; cur = cur.nextSibling;)
                            if (cur === b) return -1;
                    return a ? 1 : -1 }

                function createInputPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && elem.type === type } }

                function createButtonPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return ("input" === name || "button" === name) && elem.type === type } }

                function createPositionalPseudo(fn) {
                    return markFunction(function(argument) {
                        return argument = +argument, markFunction(function(seed, matches) {
                            for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j])) }) }) }

                function testContext(context) {
                    return context && "undefined" != typeof context.getElementsByTagName && context }

                function setFilters() {}

                function toSelector(tokens) {
                    for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
                    return selector }

                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && "parentNode" === dir,
                        doneName = done++;
                    return combinator.first ? function(elem, context, xml) {
                        for (; elem = elem[dir];)
                            if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml) } : function(elem, context, xml) {
                        var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                        if (xml) {
                            for (; elem = elem[dir];)
                                if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0 } else
                            for (; elem = elem[dir];)
                                if (1 === elem.nodeType || checkNonElements) {
                                    if (outerCache = elem[expando] || (elem[expando] = {}), uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), (oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                                    if (uniqueCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0 } } }

                function elementMatcher(matchers) {
                    return matchers.length > 1 ? function(elem, context, xml) {
                        for (var i = matchers.length; i--;)
                            if (!matchers[i](elem, context, xml)) return !1;
                        return !0 } : matchers[0] }

                function multipleContexts(selector, contexts, results) {
                    for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
                    return results }

                function condense(unmatched, map, filter, context, xml) {
                    for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
                    return newUnmatched }

                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                        var temp, i, elem, preMap = [],
                            postMap = [],
                            preexisting = results.length,
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                            matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                            for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                    postFinder(null, matcherOut = [], temp, xml) }
                                for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem)) } } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut) }) }

                function matcherFromTokens(tokens) {
                    for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                            return elem === checkContext }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                            return indexOf(checkContext, elem) > -1 }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                            var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                            return checkContext = null, ret }]; len > i; i++)
                        if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        else {
                            if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                                for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: " " === tokens[i - 2].type ? "*" : "" })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens)) }
                            matchers.push(matcher) }
                    return elementMatcher(matchers) }

                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        superMatcher = function(seed, context, xml, results, outermost) {
                            var elem, j, matcher, matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                setMatched = [],
                                contextBackup = outermostContext,
                                elems = seed || byElement && Expr.find.TAG("*", outermost),
                                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                                len = elems.length;
                            for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                                if (byElement && elem) {
                                    for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++];)
                                        if (matcher(elem, context || document, xml)) { results.push(elem);
                                            break }
                                    outermost && (dirruns = dirrunsUnique) }
                                bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem)) }
                            if (matchedCount += i, bySet && i !== matchedCount) {
                                for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                                if (seed) {
                                    if (matchedCount > 0)
                                        for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                    setMatched = condense(setMatched) }
                                push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results) }
                            return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched };
                    return bySet ? markFunction(superMatcher) : superMatcher }
                var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date,
                    preferredDoc = window.document,
                    dirruns = 0,
                    done = 0,
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),
                    sortOrder = function(a, b) {
                        return a === b && (hasDuplicate = !0), 0 },
                    MAX_NEGATIVE = 1 << 31,
                    hasOwn = {}.hasOwnProperty,
                    arr = [],
                    pop = arr.pop,
                    push_native = arr.push,
                    push = arr.push,
                    slice = arr.slice,
                    indexOf = function(list, elem) {
                        for (var i = 0, len = list.length; len > i; i++)
                            if (list[i] === elem) return i;
                        return -1 },
                    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    whitespace = "[\\x20\\t\\r\\n\\f]",
                    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                    pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
                    rwhitespace = new RegExp(whitespace + "+", "g"),
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                    rpseudo = new RegExp(pseudos),
                    ridentifier = new RegExp("^" + identifier + "$"),
                    matchExpr = { ID: new RegExp("^#(" + identifier + ")"), CLASS: new RegExp("^\\.(" + identifier + ")"), TAG: new RegExp("^(" + identifier + "|[*])"), ATTR: new RegExp("^" + attributes), PSEUDO: new RegExp("^" + pseudos), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"), bool: new RegExp("^(?:" + booleans + ")$", "i"), needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i") },
                    rinputs = /^(?:input|select|textarea|button)$/i,
                    rheader = /^h\d$/i,
                    rnative = /^[^{]+\{\s*\[native \w/,
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    rsibling = /[+~]/,
                    rescape = /'|\\/g,
                    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                    funescape = function(_, escaped, escapedWhitespace) {
                        var high = "0x" + escaped - 65536;
                        return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320) },
                    unloadHandler = function() { setDocument() };
                try { push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType } catch (e) { push = { apply: arr.length ? function(target, els) { push_native.apply(target, slice.call(els)) } : function(target, els) {
                            for (var j = target.length, i = 0; target[j++] = els[i++];);
                            target.length = j - 1 } } }
                support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return documentElement ? "HTML" !== documentElement.nodeName : !1 }, setDocument = Sizzle.setDocument = function(node) {
                    var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
                    return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = document.documentElement, documentIsHTML = !isXML(document), (parent = document.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), support.attributes = assert(function(div) {
                        return div.className = "i", !div.getAttribute("className") }), support.getElementsByTagName = assert(function(div) {
                        return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), support.getById = assert(function(div) {
                        return docElem.appendChild(div).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length }), support.getById ? (Expr.find.ID = function(id, context) {
                        if ("undefined" != typeof context.getElementById && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m ? [m] : [] } }, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId } }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                            return node && node.value === attrId } }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                        return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0 } : function(tag, context) {
                        var elem, tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);
                        if ("*" === tag) {
                            for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                            return tmp }
                        return results }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                        return "undefined" != typeof context.getElementsByClassName && documentIsHTML ? context.getElementsByClassName(className) : void 0 }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(div) { docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]") }), assert(function(div) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:") })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) { support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos) }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                        var adown = 9 === a.nodeType ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup))) } : function(a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1 }, sortOrder = hasCompare ? function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1) } : function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var cur, i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                        if (aup === bup) return siblingCheck(a, b);
                        for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                        for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                        for (; ap[i] === bp[i];) i++;
                        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0 }, document) : document }, Sizzle.matches = function(expr, elements) {
                    return Sizzle(expr, null, null, elements) }, Sizzle.matchesSelector = function(elem, expr) {
                    if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || compilerCache[expr + " "] || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret } catch (e) {}
                    return Sizzle(expr, document, null, [elem]).length > 0 }, Sizzle.contains = function(context, elem) {
                    return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem) }, Sizzle.attr = function(elem, name) {
                    (elem.ownerDocument || elem) !== document && setDocument(elem);
                    var fn = Expr.attrHandle[name.toLowerCase()],
                        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                    return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null }, Sizzle.error = function(msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg) }, Sizzle.uniqueSort = function(results) {
                    var elem, duplicates = [],
                        j = 0,
                        i = 0;
                    if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                        for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                        for (; j--;) results.splice(duplicates[j], 1) }
                    return sortInput = null, results }, getText = Sizzle.getText = function(elem) {
                    var node, ret = "",
                        i = 0,
                        nodeType = elem.nodeType;
                    if (nodeType) {
                        if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                            if ("string" == typeof elem.textContent) return elem.textContent;
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem) } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue } else
                        for (; node = elem[i++];) ret += getText(node);
                    return ret }, Expr = Sizzle.selectors = { cacheLength: 50, createPseudo: markFunction, match: matchExpr, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function(match) {
                            return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4) }, CHILD: function(match) {
                            return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match }, PSEUDO: function(match) {
                            var excess, unquoted = !match[6] && match[2];
                            return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3)) } }, filter: { TAG: function(nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                            return "*" === nodeNameSelector ? function() {
                                return !0 } : function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName } }, CLASS: function(className) {
                            var pattern = classCache[className + " "];
                            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "") }) }, ATTR: function(name, operator, check) {
                            return function(elem) {
                                var result = Sizzle.attr(elem, name);
                                return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0 } }, CHILD: function(type, what, argument, first, last) {
                            var simple = "nth" !== type.slice(0, 3),
                                forward = "last" !== type.slice(-4),
                                ofType = "of-type" === what;
                            return 1 === first && 0 === last ? function(elem) {
                                return !!elem.parentNode } : function(elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = !1;
                                if (parent) {
                                    if (simple) {
                                        for (; dir;) {
                                            for (node = elem; node = node[dir];)
                                                if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                            start = dir = "only" === type && !start && "nextSibling" }
                                        return !0 }
                                    if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                        for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                                            if (1 === node.nodeType && ++diff && node === elem) { uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break } } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1)
                                        for (;
                                            (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [dirruns, diff]), node !== elem)););
                                    return diff -= last, diff === first || diff % first === 0 && diff / first >= 0 } } }, PSEUDO: function(pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                            return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i]) }) : function(elem) {
                                return fn(elem, 0, args) }) : fn } }, pseudos: { not: markFunction(function(selector) {
                            var input = [],
                                results = [],
                                matcher = compile(selector.replace(rtrim, "$1"));
                            return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                                for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem)) }) : function(elem, context, xml) {
                                return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop() } }), has: markFunction(function(selector) {
                            return function(elem) {
                                return Sizzle(selector, elem).length > 0 } }), contains: markFunction(function(text) {
                            return text = text.replace(runescape, funescape),
                                function(elem) {
                                    return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1 } }), lang: markFunction(function(lang) {
                            return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                                function(elem) {
                                    var elemLang;
                                    do
                                        if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                                    while ((elem = elem.parentNode) && 1 === elem.nodeType);
                                    return !1 } }), target: function(elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id }, root: function(elem) {
                            return elem === docElem }, focus: function(elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex) }, enabled: function(elem) {
                            return elem.disabled === !1 }, disabled: function(elem) {
                            return elem.disabled === !0 }, checked: function(elem) {
                            var nodeName = elem.nodeName.toLowerCase();
                            return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected }, selected: function(elem) {
                            return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0 }, empty: function(elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                                if (elem.nodeType < 6) return !1;
                            return !0 }, parent: function(elem) {
                            return !Expr.pseudos.empty(elem) }, header: function(elem) {
                            return rheader.test(elem.nodeName) }, input: function(elem) {
                            return rinputs.test(elem.nodeName) }, button: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return "input" === name && "button" === elem.type || "button" === name }, text: function(elem) {
                            var attr;
                            return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase()) }, first: createPositionalPseudo(function() {
                            return [0] }), last: createPositionalPseudo(function(matchIndexes, length) {
                            return [length - 1] }), eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                            return [0 > argument ? argument + length : argument] }), even: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                            return matchIndexes }), odd: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                            return matchIndexes }), lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                            return matchIndexes }), gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                            return matchIndexes }) } }, Expr.pseudos.nth = Expr.pseudos.eq;
                for (i in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) Expr.pseudos[i] = createInputPseudo(i);
                for (i in { submit: !0, reset: !0 }) Expr.pseudos[i] = createButtonPseudo(i);
                return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                    if (cached) return parseOnly ? 0 : cached.slice(0);
                    for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                        (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({ value: matched, type: match[0].replace(rtrim, " ") }), soFar = soFar.slice(matched.length));
                        for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({ value: matched, type: type, matches: match }), soFar = soFar.slice(matched.length));
                        if (!matched) break }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0) }, compile = Sizzle.compile = function(selector, match) {
                    var i, setMatchers = [],
                        elementMatchers = [],
                        cached = compilerCache[selector + " "];
                    if (!cached) {
                        for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector }
                    return cached }, select = Sizzle.select = function(selector, context, results, seed) {
                    var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
                        match = !seed && tokenize(selector = compiled.selector || selector);
                    if (results = results || [], 1 === match.length) {
                        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                            if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                            compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length) }
                        for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                            if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                                break } }
                    return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), results }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                    return 1 & div1.compareDocumentPosition(document.createElement("div")) }), assert(function(div) {
                    return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href") }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                    return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2) }), support.attributes && assert(function(div) {
                    return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value") }) || addHandle("value", function(elem, name, isXML) {
                    return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue }), assert(function(div) {
                    return null == div.getAttribute("disabled") }) || addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null }), Sizzle
            }(window);
            jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
            var dir = function(elem, _dir, until) {
                    for (var matched = [], truncate = void 0 !== until;
                        (elem = elem[_dir]) && 9 !== elem.nodeType;)
                        if (1 === elem.nodeType) {
                            if (truncate && jQuery(elem).is(until)) break;
                            matched.push(elem) }
                    return matched },
                _siblings = function(n, elem) {
                    for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
                    return matched },
                rneedsContext = jQuery.expr.match.needsContext,
                rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                risSimple = /^.[^:#\[\.,]*$/;
            jQuery.filter = function(expr, elems, not) {
                var elem = elems[0];
                return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                    return 1 === elem.nodeType })) }, jQuery.fn.extend({ find: function(selector) {
                    var i, len = this.length,
                        ret = [],
                        self = this;
                    if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                        for (i = 0; len > i; i++)
                            if (jQuery.contains(self[i], this)) return !0 }));
                    for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
                    return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret }, filter: function(selector) {
                    return this.pushStack(winnow(this, selector || [], !1)) }, not: function(selector) {
                    return this.pushStack(winnow(this, selector || [], !0)) }, is: function(selector) {
                    return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length } });
            var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                init = jQuery.fn.init = function(selector, context, root) {
                    var match, elem;
                    if (!selector) return this;
                    if (root = root || rootjQuery, "string" == typeof selector) {
                        if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
                        if (match[1]) {
                            if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                                for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                            return this }
                        return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this }
                    return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this)) };
            init.prototype = jQuery.fn, rootjQuery = jQuery(document);
            var rparentsprev = /^(?:parents|prev(?:Until|All))/,
                guaranteedUnique = { children: !0, contents: !0, next: !0, prev: !0 };
            jQuery.fn.extend({
                has: function(target) {
                    var targets = jQuery(target, this),
                        l = targets.length;

                    return this.filter(function() {
                        for (var i = 0; l > i; i++)
                            if (jQuery.contains(this, targets[i])) return !0 })
                },
                closest: function(selectors, context) {
                    for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                            if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) { matched.push(cur);
                                break }
                    return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched) },
                index: function(elem) {
                    return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 },
                add: function(selector, context) {
                    return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context)))) },
                addBack: function(selector) {
                    return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector)) }
            }), jQuery.each({ parent: function parent(elem) {
                    var parent = elem.parentNode;
                    return parent && 11 !== parent.nodeType ? parent : null }, parents: function(elem) {
                    return dir(elem, "parentNode") }, parentsUntil: function(elem, i, until) {
                    return dir(elem, "parentNode", until) }, next: function(elem) {
                    return sibling(elem, "nextSibling") }, prev: function(elem) {
                    return sibling(elem, "previousSibling") }, nextAll: function(elem) {
                    return dir(elem, "nextSibling") }, prevAll: function(elem) {
                    return dir(elem, "previousSibling") }, nextUntil: function(elem, i, until) {
                    return dir(elem, "nextSibling", until) }, prevUntil: function(elem, i, until) {
                    return dir(elem, "previousSibling", until) }, siblings: function(elem) {
                    return _siblings((elem.parentNode || {}).firstChild, elem) }, children: function(elem) {
                    return _siblings(elem.firstChild) }, contents: function(elem) {
                    return elem.contentDocument || jQuery.merge([], elem.childNodes) } }, function(name, fn) { jQuery.fn[name] = function(until, selector) {
                    var matched = jQuery.map(this, fn, until);
                    return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched) } });
            var rnotwhite = /\S+/g;
            jQuery.Callbacks = function(options) { options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
                var firing, memory, _fired, _locked, list = [],
                    queue = [],
                    firingIndex = -1,
                    fire = function() {
                        for (_locked = options.once, _fired = firing = !0; queue.length; firingIndex = -1)
                            for (memory = queue.shift(); ++firingIndex < list.length;) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, memory = !1);
                        options.memory || (memory = !1), firing = !1, _locked && (list = memory ? [] : "") },
                    self = { add: function() {
                            return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), function add(args) { jQuery.each(args, function(_, arg) { jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg) }) }(arguments), memory && !firing && fire()), this }, remove: function() {
                            return jQuery.each(arguments, function(_, arg) {
                                for (var index;
                                    (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firingIndex >= index && firingIndex-- }), this }, has: function(fn) {
                            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0 }, empty: function() {
                            return list && (list = []), this }, disable: function() {
                            return _locked = queue = [], list = memory = "", this }, disabled: function() {
                            return !list }, lock: function() {
                            return _locked = queue = [], memory || (list = memory = ""), this }, locked: function() {
                            return !!_locked }, fireWith: function(context, args) {
                            return _locked || (args = args || [], args = [context, args.slice ? args.slice() : args], queue.push(args), firing || fire()), this }, fire: function() {
                            return self.fireWith(this, arguments), this }, fired: function() {
                            return !!_fired } };
                return self }, jQuery.extend({ Deferred: function(func) {
                    var tuples = [
                            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", jQuery.Callbacks("memory")]
                        ],
                        _state = "pending",
                        _promise2 = { state: function() {
                                return _state }, always: function() {
                                return deferred.done(arguments).fail(arguments), this }, then: function() {
                                var fns = arguments;
                                return jQuery.Deferred(function(newDefer) { jQuery.each(tuples, function(i, tuple) {
                                        var fn = jQuery.isFunction(fns[i]) && fns[i];
                                        deferred[tuple[1]](function() {
                                            var returned = fn && fn.apply(this, arguments);
                                            returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this === _promise2 ? newDefer.promise() : this, fn ? [returned] : arguments) }) }), fns = null }).promise() }, promise: function(obj) {
                                return null != obj ? jQuery.extend(obj, _promise2) : _promise2 } },
                        deferred = {};
                    return _promise2.pipe = _promise2.then, jQuery.each(tuples, function(i, tuple) {
                        var list = tuple[2],
                            stateString = tuple[3];
                        _promise2[tuple[1]] = list.add, stateString && list.add(function() { _state = stateString }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                            return deferred[tuple[0] + "With"](this === deferred ? _promise2 : this, arguments), this }, deferred[tuple[0] + "With"] = list.fireWith }), _promise2.promise(deferred), func && func.call(deferred, deferred), deferred }, when: function(subordinate) {
                    var progressValues, progressContexts, resolveContexts, i = 0,
                        resolveValues = _slice.call(arguments),
                        length = resolveValues.length,
                        remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                        deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                        updateFunc = function(i, contexts, values) {
                            return function(value) { contexts[i] = this, values[i] = arguments.length > 1 ? _slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values) } };
                    if (length > 1)
                        for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject) : --remaining;
                    return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise() } });
            var readyList;
            jQuery.fn.ready = function(fn) {
                return jQuery.ready.promise().done(fn), this }, jQuery.extend({ isReady: !1, readyWait: 1, holdReady: function(hold) { hold ? jQuery.readyWait++ : jQuery.ready(!0) }, ready: function(wait) {
                    (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready")))) } }), jQuery.ready.promise = function(obj) {
                return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), window.addEventListener("load", completed))), readyList.promise(obj) }, jQuery.ready.promise();
            var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
                    var i = 0,
                        len = elems.length,
                        bulk = null == key;
                    if ("object" === jQuery.type(key)) { chainable = !0;
                        for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw) } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value) })), fn))
                        for (; len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet },
                acceptData = function(owner) {
                    return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType };
            Data.uid = 1, Data.prototype = { register: function(owner, initial) {
                    var value = initial || {};
                    return owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, { value: value, writable: !0, configurable: !0 }), owner[this.expando] }, cache: function(owner) {
                    if (!acceptData(owner)) return {};
                    var value = owner[this.expando];
                    return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, { value: value, configurable: !0 }))), value }, set: function(owner, data, value) {
                    var prop, cache = this.cache(owner);
                    if ("string" == typeof data) cache[data] = value;
                    else
                        for (prop in data) cache[prop] = data[prop];
                    return cache }, get: function(owner, key) {
                    return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][key] }, access: function(owner, key, value) {
                    var stored;
                    return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key) }, remove: function(owner, key) {
                    var i, name, camel, cache = owner[this.expando];
                    if (void 0 !== cache) {
                        if (void 0 === key) this.register(owner);
                        else { jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length;
                            for (; i--;) delete cache[name[i]] }(void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando]) } }, hasData: function(owner) {
                    var cache = owner[this.expando];
                    return void 0 !== cache && !jQuery.isEmptyObject(cache) } };
            var dataPriv = new Data,
                dataUser = new Data,
                rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                rmultiDash = /[A-Z]/g;
            jQuery.extend({ hasData: function(elem) {
                    return dataUser.hasData(elem) || dataPriv.hasData(elem) }, data: function(elem, name, _data) {
                    return dataUser.access(elem, name, _data) }, removeData: function(elem, name) { dataUser.remove(elem, name) }, _data: function(elem, name, data) {
                    return dataPriv.access(elem, name, data) }, _removeData: function(elem, name) { dataPriv.remove(elem, name) } }), jQuery.fn.extend({ data: function data(key, value) {
                    var i, name, data, elem = this[0],
                        attrs = elem && elem.attributes;
                    if (void 0 === key) {
                        if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                            for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                            dataPriv.set(elem, "hasDataAttrs", !0) }
                        return data }
                    return "object" === ("undefined" == typeof key ? "undefined" : _typeof(key)) ? this.each(function() { dataUser.set(this, key) }) : access(this, function(value) {
                        var data, camelKey;
                        if (elem && void 0 === value) {
                            if (data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase()), void 0 !== data) return data;
                            if (camelKey = jQuery.camelCase(key), data = dataUser.get(elem, camelKey), void 0 !== data) return data;
                            if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data } else camelKey = jQuery.camelCase(key), this.each(function() {
                            var data = dataUser.get(this, camelKey);
                            dataUser.set(this, camelKey, value), key.indexOf("-") > -1 && void 0 !== data && dataUser.set(this, key, value) }) }, null, value, arguments.length > 1, null, !0) }, removeData: function(key) {
                    return this.each(function() { dataUser.remove(this, key) }) } }), jQuery.extend({ queue: function queue(elem, type, data) {
                    var queue;
                    return elem ? (type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0 }, dequeue: function(elem, type) { type = type || "fx";
                    var queue = jQuery.queue(elem, type),
                        startLength = queue.length,
                        fn = queue.shift(),
                        hooks = jQuery._queueHooks(elem, type),
                        next = function() { jQuery.dequeue(elem, type) }; "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire() }, _queueHooks: function(elem, type) {
                    var key = type + "queueHooks";
                    return dataPriv.get(elem, key) || dataPriv.access(elem, key, { empty: jQuery.Callbacks("once memory").add(function() { dataPriv.remove(elem, [type + "queue", key]) }) }) } }), jQuery.fn.extend({ queue: function(type, data) {
                    var setter = 2;
                    return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                        var queue = jQuery.queue(this, type, data);
                        jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type) }) }, dequeue: function(type) {
                    return this.each(function() { jQuery.dequeue(this, type) }) }, clearQueue: function(type) {
                    return this.queue(type || "fx", []) }, promise: function(type, obj) {
                    var tmp, count = 1,
                        defer = jQuery.Deferred(),
                        elements = this,
                        i = this.length,
                        resolve = function() {--count || defer.resolveWith(elements, [elements]) };
                    for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = dataPriv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                    return resolve(), defer.promise(obj) } });
            var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
                cssExpand = ["Top", "Right", "Bottom", "Left"],
                isHidden = function(elem, el) {
                    return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem) },
                rcheckableType = /^(?:checkbox|radio)$/i,
                rtagName = /<([\w:-]+)/,
                rscriptType = /^$|\/(?:java|ecma)script/i,
                wrapMap = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
            wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
            var rhtml = /<|&#?\w+;/;
            ! function() {
                var fragment = document.createDocumentFragment(),
                    div = fragment.appendChild(document.createElement("div")),
                    input = document.createElement("input");
                input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue }();
            var rkeyEvent = /^key/,
                rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
            jQuery.event = { global: {}, add: function(elem, types, handler, data, selector) {
                    var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                    if (elemData)
                        for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                                return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0 }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({ type: type, origType: origType, data: data, handler: handler, guid: handler.guid, selector: selector, needsContext: selector && jQuery.expr.match.needsContext.test(selector), namespace: namespaces.join(".") }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0) }, remove: function(elem, types, handler, selector, mappedTypes) {
                    var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                    if (elemData && (events = elemData.events)) {
                        for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
                            if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                                for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                                origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type]) } else
                                for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                        jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events") } }, dispatch: function(event) { event = jQuery.event.fix(event);
                    var i, j, ret, matched, handleObj, handlerQueue = [],
                        args = _slice.call(arguments),
                        handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                        special = jQuery.event.special[event.type] || {};
                    if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                        for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                            (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                            for (event.currentTarget = matched.elem, j = 0;
                                (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.rnamespace || event.rnamespace.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                        return special.postDispatch && special.postDispatch.call(this, event), event.result } }, handlers: function(event, _handlers) {
                    var i, matches, sel, handleObj, handlerQueue = [],
                        delegateCount = _handlers.delegateCount,
                        cur = event.target;
                    if (delegateCount && cur.nodeType && ("click" !== event.type || isNaN(event.button) || event.button < 1))
                        for (; cur !== this; cur = cur.parentNode || this)
                            if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                                for (matches = [], i = 0; delegateCount > i; i++) handleObj = _handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                                matches.length && handlerQueue.push({ elem: cur, handlers: matches }) }
                    return delegateCount < _handlers.length && handlerQueue.push({ elem: this, handlers: _handlers.slice(delegateCount) }), handlerQueue }, props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(event, original) {
                        return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(event, original) {
                        var eventDoc, doc, body, button = original.button;
                        return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event } }, fix: function(event) {
                    if (event[jQuery.expando]) return event;
                    var i, prop, copy, type = event.type,
                        originalEvent = event,
                        fixHook = this.fixHooks[type];
                    for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                    return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event }, special: { load: { noBubble: !0 }, focus: { trigger: function() {
                            return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0 }, delegateType: "focusin" }, blur: { trigger: function() {
                            return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0 }, delegateType: "focusout" }, click: { trigger: function() {
                            return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), !1) : void 0 }, _default: function(event) {
                            return jQuery.nodeName(event.target, "a") } }, beforeunload: { postDispatch: function(event) { void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result) } } } }, jQuery.removeEvent = function(elem, type, handle) { elem.removeEventListener && elem.removeEventListener(type, handle) }, jQuery.Event = function(src, props) {
                return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props) }, jQuery.Event.prototype = { constructor: jQuery.Event, isDefaultPrevented: returnFalse, isPropagationStopped: returnFalse, isImmediatePropagationStopped: returnFalse, preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = returnTrue, e && e.preventDefault() }, stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = returnTrue, e && e.stopPropagation() }, stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation(), this.stopPropagation() } }, jQuery.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(orig, fix) { jQuery.event.special[orig] = { delegateType: fix, bindType: fix, handle: function(event) {
                        var ret, target = this,
                            related = event.relatedTarget,
                            handleObj = event.handleObj;
                        return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret } } }), jQuery.fn.extend({ on: function(types, selector, data, fn) {
                    return _on(this, types, selector, data, fn) }, one: function(types, selector, data, fn) {
                    return _on(this, types, selector, data, fn, 1) }, off: function(types, selector, fn) {
                    var handleObj, type;
                    if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                    if ("object" === ("undefined" == typeof types ? "undefined" : _typeof(types))) {
                        for (type in types) this.off(type, selector, types[type]);
                        return this }
                    return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() { jQuery.event.remove(this, types, fn, selector) }) } });
            var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                rnoInnerhtml = /<script|<style|<link/i,
                rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
                rscriptTypeMasked = /^true\/(.*)/,
                rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            jQuery.extend({ htmlPrefilter: function(html) {
                    return html.replace(rxhtmlTag, "<$1></$2>") }, clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
                    var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
                        inPage = jQuery.contains(elem.ownerDocument, elem);
                    if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                        for (destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
                    if (dataAndEvents)
                        if (deepDataAndEvents)
                            for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]);
                        else cloneCopyEvent(elem, clone);
                    return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone }, cleanData: function(elems) {
                    for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++)
                        if (acceptData(elem)) {
                            if (data = elem[dataPriv.expando]) {
                                if (data.events)
                                    for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                                elem[dataPriv.expando] = void 0 }
                            elem[dataUser.expando] && (elem[dataUser.expando] = void 0) } } }), jQuery.fn.extend({ domManip: domManip, detach: function(selector) {
                    return _remove(this, selector, !0) }, remove: function(selector) {
                    return _remove(this, selector) }, text: function(value) {
                    return access(this, function(value) {
                        return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value) }) }, null, value, arguments.length) }, append: function() {
                    return domManip(this, arguments, function(elem) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var target = manipulationTarget(this, elem);
                            target.appendChild(elem) } }) }, prepend: function() {
                    return domManip(this, arguments, function(elem) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var target = manipulationTarget(this, elem);
                            target.insertBefore(elem, target.firstChild) } }) }, before: function() {
                    return domManip(this, arguments, function(elem) { this.parentNode && this.parentNode.insertBefore(elem, this) }) }, after: function() {
                    return domManip(this, arguments, function(elem) { this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling) }) }, empty: function() {
                    for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = "");
                    return this }, clone: function(dataAndEvents, deepDataAndEvents) {
                    return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                        return jQuery.clone(this, dataAndEvents, deepDataAndEvents) }) }, html: function(value) {
                    return access(this, function(value) {
                        var elem = this[0] || {},
                            i = 0,
                            l = this.length;
                        if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                        if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) { value = jQuery.htmlPrefilter(value);
                            try {
                                for (; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                                elem = 0 } catch (e) {} }
                        elem && this.empty().append(value) }, null, value, arguments.length) }, replaceWith: function() {
                    var ignored = [];
                    return domManip(this, arguments, function(elem) {
                        var parent = this.parentNode;
                        jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this)) }, ignored) } }), jQuery.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(name, original) { jQuery.fn[name] = function(selector) {
                    for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
                    return this.pushStack(ret) } });
            var iframe, elemdisplay = { HTML: "block", BODY: "block" },
                rmargin = /^margin/,
                rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
                getStyles = function(elem) {
                    var view = elem.ownerDocument.defaultView;
                    return view.opener || (view = window), view.getComputedStyle(elem) },
                swap = function(elem, options, callback, args) {
                    var ret, name, old = {};
                    for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
                    ret = callback.apply(elem, args || []);
                    for (name in options) elem.style[name] = old[name];
                    return ret },
                documentElement = document.documentElement;
            ! function() {
                function computeStyleTests() { div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", div.innerHTML = "", documentElement.appendChild(container);
                    var divStyle = window.getComputedStyle(div);
                    pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = "2px" === divStyle.marginLeft, boxSizingReliableVal = "4px" === divStyle.width, div.style.marginRight = "50%", pixelMarginRightVal = "4px" === divStyle.marginRight, documentElement.removeChild(container) }
                var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"),
                    div = document.createElement("div");
                div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", container.appendChild(div), jQuery.extend(support, { pixelPosition: function() {
                        return computeStyleTests(), pixelPositionVal }, boxSizingReliable: function() {
                        return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal }, pixelMarginRight: function() {
                        return null == boxSizingReliableVal && computeStyleTests(), pixelMarginRightVal }, reliableMarginLeft: function() {
                        return null == boxSizingReliableVal && computeStyleTests(), reliableMarginLeftVal }, reliableMarginRight: function() {
                        var ret, marginDiv = div.appendChild(document.createElement("div"));
                        return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", documentElement.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight), documentElement.removeChild(container), div.removeChild(marginDiv), ret } })) }();
            var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
                cssShow = { position: "absolute", visibility: "hidden", display: "block" },
                cssNormalTransform = { letterSpacing: "0", fontWeight: "400" },
                cssPrefixes = ["Webkit", "O", "Moz", "ms"],
                emptyStyle = document.createElement("div").style;
            jQuery.extend({ cssHooks: { opacity: { get: function(elem, computed) {
                            if (computed) {
                                var ret = curCSS(elem, "opacity");
                                return "" === ret ? "1" : ret } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(elem, name, value, extra) {
                    if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                        var ret, type, hooks, origName = jQuery.camelCase(name),
                            style = elem.style;
                        return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = "undefined" == typeof value ? "undefined" : _typeof(value), "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), void 0) } }, css: function(elem, name, extra, styles) {
                    var val, num, hooks, origName = jQuery.camelCase(name);
                    return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val } }), jQuery.each(["height", "width"], function(i, name) {
                jQuery.cssHooks[name] = {
                    get: function(elem, computed, extra) {
                        return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra) }) : getWidthOrHeight(elem, name, extra) : void 0 },
                    set: function(elem, value, extra) {
                        var matches, styles = extra && getStyles(elem),
                            subtract = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles);

                        return subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[name] = value, value = jQuery.css(elem, name)), setPositiveNumber(elem, value, subtract)
                    }
                }
            }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
                return computed ? (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
                    return elem.getBoundingClientRect().left })) + "px" : void 0 }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
                return computed ? swap(elem, { display: "inline-block" }, curCSS, [elem, "marginRight"]) : void 0 }), jQuery.each({ margin: "", padding: "", border: "Width" }, function(prefix, suffix) { jQuery.cssHooks[prefix + suffix] = { expand: function(value) {
                        for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                        return expanded } }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber) }), jQuery.fn.extend({ css: function(name, value) {
                    return access(this, function(elem, name, value) {
                        var styles, len, map = {},
                            i = 0;
                        if (jQuery.isArray(name)) {
                            for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                            return map }
                        return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name) }, name, value, arguments.length > 1) }, show: function() {
                    return showHide(this, !0) }, hide: function() {
                    return showHide(this) }, toggle: function(state) {
                    return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() { isHidden(this) ? jQuery(this).show() : jQuery(this).hide() }) } }), jQuery.Tween = Tween, Tween.prototype = { constructor: Tween, init: function(elem, options, prop, end, easing, unit) { this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px") }, cur: function() {
                    var hooks = Tween.propHooks[this.prop];
                    return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this) }, run: function(percent) {
                    var eased, hooks = Tween.propHooks[this.prop];
                    return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this } }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = { _default: { get: function(tween) {
                        var result;
                        return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) }, set: function(tween) { jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) } } }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = { set: function(tween) { tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now) } }, jQuery.easing = { linear: function(p) {
                    return p }, swing: function(p) {
                    return .5 - Math.cos(p * Math.PI) / 2 }, _default: "swing" }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
            var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
                rrun = /queueHooks$/;
            jQuery.Animation = jQuery.extend(Animation, { tweeners: { "*": [function(prop, value) {
                            var tween = this.createTween(prop, value);
                            return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween }] }, tweener: function(props, callback) { jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.match(rnotwhite);
                        for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback) }, prefilters: [defaultPrefilter], prefilter: function(callback, prepend) { prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback) } }), jQuery.speed = function(speed, easing, fn) {
                    var opt = speed && "object" === ("undefined" == typeof speed ? "undefined" : _typeof(speed)) ? jQuery.extend({}, speed) : { complete: fn || !fn && easing || jQuery.isFunction(speed) && speed, duration: speed, easing: fn && easing || easing && !jQuery.isFunction(easing) && easing };
                    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() { jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue) }, opt }, jQuery.fn.extend({ fadeTo: function(speed, to, easing, callback) {
                        return this.filter(isHidden).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback) }, animate: function(prop, speed, easing, callback) {
                        var empty = jQuery.isEmptyObject(prop),
                            optall = jQuery.speed(speed, easing, callback),
                            doAnimation = function() {
                                var anim = Animation(this, jQuery.extend({}, prop), optall);
                                (empty || dataPriv.get(this, "finish")) && anim.stop(!0) };
                        return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation) }, stop: function(type, clearQueue, gotoEnd) {
                        var stopQueue = function(hooks) {
                            var stop = hooks.stop;
                            delete hooks.stop, stop(gotoEnd) };
                        return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                            var dequeue = !0,
                                index = null != type && type + "queueHooks",
                                timers = jQuery.timers,
                                data = dataPriv.get(this);
                            if (index) data[index] && data[index].stop && stopQueue(data[index]);
                            else
                                for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                            for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                            (dequeue || !gotoEnd) && jQuery.dequeue(this, type) }) }, finish: function(type) {
                        return type !== !1 && (type = type || "fx"), this.each(function() {
                            var index, data = dataPriv.get(this),
                                queue = data[type + "queue"],
                                hooks = data[type + "queueHooks"],
                                timers = jQuery.timers,
                                length = queue ? queue.length : 0;
                            for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                            for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                            delete data.finish }) } }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
                    var cssFn = jQuery.fn[name];
                    jQuery.fn[name] = function(speed, easing, callback) {
                        return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback) } }), jQuery.each({ slideDown: genFx("show"), slideUp: genFx("hide"), slideToggle: genFx("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(name, props) { jQuery.fn[name] = function(speed, easing, callback) {
                        return this.animate(props, speed, easing, callback) } }), jQuery.timers = [], jQuery.fx.tick = function() {
                    var timer, i = 0,
                        timers = jQuery.timers;
                    for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
                    timers.length || jQuery.fx.stop(), fxNow = void 0 }, jQuery.fx.timer = function(timer) { jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop() }, jQuery.fx.interval = 13, jQuery.fx.start = function() { timerId || (timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval)) }, jQuery.fx.stop = function() { window.clearInterval(timerId), timerId = null }, jQuery.fx.speeds = { slow: 600, fast: 200, _default: 400 }, jQuery.fn.delay = function(time, type) {
                    return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                        var timeout = window.setTimeout(next, time);
                        hooks.stop = function() { window.clearTimeout(timeout) } }) },
                function() {
                    var input = document.createElement("input"),
                        select = document.createElement("select"),
                        opt = select.appendChild(document.createElement("option"));
                    input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value }();
            var boolHook, attrHandle = jQuery.expr.attrHandle;
            jQuery.fn.extend({ attr: function(name, value) {
                    return access(this, jQuery.attr, name, value, arguments.length > 1) }, removeAttr: function(name) {
                    return this.each(function() { jQuery.removeAttr(this, name) }) } }), jQuery.extend({ attr: function(elem, name, value) {
                    var ret, hooks, nType = elem.nodeType;
                    if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret)) }, attrHooks: { type: { set: function(elem, value) {
                            if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                                var val = elem.value;
                                return elem.setAttribute("type", value), val && (elem.value = val), value } } } }, removeAttr: function(elem, value) {
                    var name, propName, i = 0,
                        attrNames = value && value.match(rnotwhite);
                    if (attrNames && 1 === elem.nodeType)
                        for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name) } }), boolHook = { set: function(elem, value, name) {
                    return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name } }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
                var getter = attrHandle[name] || jQuery.find.attr;
                attrHandle[name] = function(elem, name, isXML) {
                    var ret, handle;
                    return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret } });
            var rfocusable = /^(?:input|select|textarea|button)$/i,
                rclickable = /^(?:a|area)$/i;
            jQuery.fn.extend({ prop: function(name, value) {
                    return access(this, jQuery.prop, name, value, arguments.length > 1) }, removeProp: function(name) {
                    return this.each(function() { delete this[jQuery.propFix[name] || name] }) } }), jQuery.extend({ prop: function(elem, name, value) {
                    var ret, hooks, nType = elem.nodeType;
                    if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name] }, propHooks: { tabIndex: { get: function(elem) {
                            var tabindex = jQuery.find.attr(elem, "tabindex");
                            return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), support.optSelected || (jQuery.propHooks.selected = { get: function(elem) {
                    var parent = elem.parentNode;
                    return parent && parent.parentNode && parent.parentNode.selectedIndex, null } }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { jQuery.propFix[this.toLowerCase()] = this });
            var rclass = /[\t\r\n\f]/g;
            jQuery.fn.extend({ addClass: function(value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                    if (jQuery.isFunction(value)) return this.each(function(j) { jQuery(this).addClass(value.call(this, j, getClass(this))) });
                    if ("string" == typeof value && value)
                        for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                            if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                                for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                                finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue) }
                    return this }, removeClass: function(value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                    if (jQuery.isFunction(value)) return this.each(function(j) { jQuery(this).removeClass(value.call(this, j, getClass(this))) });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof value && value)
                        for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                            if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                                for (j = 0; clazz = classes[j++];)
                                    for (; cur.indexOf(" " + clazz + " ") > -1;) cur = cur.replace(" " + clazz + " ", " ");
                                finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue) }
                    return this }, toggleClass: function(value, stateVal) {
                    var type = "undefined" == typeof value ? "undefined" : _typeof(value);
                    return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) { jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal) } : function() {
                        var className, i, self, classNames;
                        if ("string" === type)
                            for (i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                        else(void 0 === value || "boolean" === type) && (className = getClass(this), className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : dataPriv.get(this, "__className__") || "")) }) }, hasClass: function(selector) {
                    var className, elem, i = 0;
                    for (className = " " + selector + " "; elem = this[i++];)
                        if (1 === elem.nodeType && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) return !0;
                    return !1 } });
            var rreturn = /\r/g;
            jQuery.fn.extend({ val: function(value) {
                    var hooks, ret, isFunction, elem = this[0]; {
                        if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                            var val;
                            1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                                return null == value ? "" : value + "" })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val)) });
                        if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret) } } }), jQuery.extend({ valHooks: { option: { get: function(elem) {
                            return jQuery.trim(elem.value) } }, select: { get: function(elem) {
                            for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                                if (option = options[i], !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                                    if (value = jQuery(option).val(), one) return value;
                                    values.push(value) }
                            return values }, set: function(elem, value) {
                            for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                            return optionSet || (elem.selectedIndex = -1), values } } } }), jQuery.each(["radio", "checkbox"], function() { jQuery.valHooks[this] = { set: function(elem, value) {
                        return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1 : void 0 } }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                    return null === elem.getAttribute("value") ? "on" : elem.value }) });
            var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
            jQuery.extend(jQuery.event, { trigger: function(event, data, elem, onlyHandlers) {
                    var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
                        type = hasOwn.call(event, "type") ? event.type : event,
                        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                    if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" === ("undefined" == typeof event ? "undefined" : _typeof(event)) && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                            for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                            tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window) }
                        for (i = 0;
                            (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
                        return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result } }, simulate: function(type, elem, event) {
                    var e = jQuery.extend(new jQuery.Event, event, { type: type, isSimulated: !0 });
                    jQuery.event.trigger(e, null, elem), e.isDefaultPrevented() && event.preventDefault() } }), jQuery.fn.extend({ trigger: function(type, data) {
                    return this.each(function() { jQuery.event.trigger(type, data, this) }) }, triggerHandler: function(type, data) {
                    var elem = this[0];
                    return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0 } }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) { jQuery.fn[name] = function(data, fn) {
                    return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name) } }), jQuery.fn.extend({ hover: function(fnOver, fnOut) {
                    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver) } }), support.focusin = "onfocusin" in window, support.focusin || jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
                var handler = function(event) { jQuery.event.simulate(fix, event.target, jQuery.event.fix(event)) };
                jQuery.event.special[fix] = { setup: function() {
                        var doc = this.ownerDocument || this,
                            attaches = dataPriv.access(doc, fix);
                        attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1) }, teardown: function() {
                        var doc = this.ownerDocument || this,
                            attaches = dataPriv.access(doc, fix) - 1;
                        attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), dataPriv.remove(doc, fix)) } } });
            var location = window.location,
                nonce = jQuery.now(),
                rquery = /\?/;
            jQuery.parseJSON = function(data) {
                return JSON.parse(data + "") }, jQuery.parseXML = function(data) {
                var xml;
                if (!data || "string" != typeof data) return null;
                try { xml = (new window.DOMParser).parseFromString(data, "text/xml") } catch (e) { xml = void 0 }
                return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), xml };
            var rhash = /#.*$/,
                rts = /([?&])_=[^&]*/,
                rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                rnoContent = /^(?:GET|HEAD)$/,
                rprotocol = /^\/\//,
                prefilters = {},
                transports = {},
                allTypes = "*/".concat("*"),
                originAnchor = document.createElement("a");
            originAnchor.href = location.href, jQuery.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: location.href, type: "GET", isLocal: rlocalProtocol.test(location.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": allTypes, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function(target, settings) {
                    return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target) }, ajaxPrefilter: addToPrefiltersOrTransports(prefilters), ajaxTransport: addToPrefiltersOrTransports(transports), ajax: function(url, options) {
                    function done(status, nativeStatusText, responses, headers) {
                        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                        2 !== state && (state = 2, timeoutTimer && window.clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(_statusCode), _statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop"))) } "object" === ("undefined" == typeof url ? "undefined" : _typeof(url)) && (options = url, url = void 0), options = options || {};
                    var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                        callbackContext = s.context || s,
                        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                        deferred = jQuery.Deferred(),
                        completeDeferred = jQuery.Callbacks("once memory"),
                        _statusCode = s.statusCode || {},
                        requestHeaders = {},
                        requestHeadersNames = {},
                        state = 0,
                        strAbort = "canceled",
                        jqXHR = { readyState: 0, getResponseHeader: function(key) {
                                var match;
                                if (2 === state) {
                                    if (!responseHeaders)
                                        for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                                    match = responseHeaders[key.toLowerCase()] }
                                return null == match ? null : match }, getAllResponseHeaders: function() {
                                return 2 === state ? responseHeadersString : null }, setRequestHeader: function(name, value) {
                                var lname = name.toLowerCase();
                                return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this }, overrideMimeType: function(type) {
                                return state || (s.mimeType = type), this }, statusCode: function(map) {
                                var code;
                                if (map)
                                    if (2 > state)
                                        for (code in map) _statusCode[code] = [_statusCode[code], map[code]];
                                    else jqXHR.always(map[jqXHR.status]);
                                return this }, abort: function(statusText) {
                                var finalText = statusText || strAbort;
                                return transport && transport.abort(finalText), done(0, finalText), this } };
                    if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain) { urlAnchor = document.createElement("a");
                        try { urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host } catch (e) { s.crossDomain = !0 } }
                    if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                    fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                    for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                    if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
                    strAbort = "abort";
                    for (i in { success: 1, error: 1, complete: 1 }) jqXHR[i](s[i]);
                    if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                        if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), 2 === state) return jqXHR;
                        s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() { jqXHR.abort("timeout") }, s.timeout));
                        try { state = 1, transport.send(requestHeaders, done) } catch (e) {
                            if (!(2 > state)) throw e;
                            done(-1, e) } } else done(-1, "No Transport");
                    return jqXHR }, getJSON: function(url, data, callback) {
                    return jQuery.get(url, data, callback, "json") }, getScript: function(url, callback) {
                    return jQuery.get(url, void 0, callback, "script") } }), jQuery.each(["get", "post"], function(i, method) { jQuery[method] = function(url, data, callback, type) {
                    return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax(jQuery.extend({ url: url, type: method, dataType: type, data: data, success: callback }, jQuery.isPlainObject(url) && url)) } }), jQuery._evalUrl = function(url) {
                return jQuery.ajax({ url: url, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }, jQuery.fn.extend({ wrapAll: function(html) {
                    var wrap;
                    return jQuery.isFunction(html) ? this.each(function(i) { jQuery(this).wrapAll(html.call(this, i)) }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                        for (var elem = this; elem.firstElementChild;) elem = elem.firstElementChild;
                        return elem }).append(this)), this) }, wrapInner: function(html) {
                    return this.each(jQuery.isFunction(html) ? function(i) { jQuery(this).wrapInner(html.call(this, i)) } : function() {
                        var self = jQuery(this),
                            contents = self.contents();
                        contents.length ? contents.wrapAll(html) : self.append(html) }) }, wrap: function(html) {
                    var isFunction = jQuery.isFunction(html);
                    return this.each(function(i) { jQuery(this).wrapAll(isFunction ? html.call(this, i) : html) }) }, unwrap: function() {
                    return this.parent().each(function() { jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes) }).end() } }), jQuery.expr.filters.hidden = function(elem) {
                return !jQuery.expr.filters.visible(elem) }, jQuery.expr.filters.visible = function(elem) {
                return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0 };
            var r20 = /%20/g,
                rbracket = /\[\]$/,
                rCRLF = /\r?\n/g,
                rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
                rsubmittable = /^(?:input|select|textarea|keygen)/i;
            jQuery.param = function(a, traditional) {
                var prefix, s = [],
                    add = function(key, value) { value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value) };
                if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() { add(this.name, this.value) });
                else
                    for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
                return s.join("&").replace(r20, "+") }, jQuery.fn.extend({ serialize: function() {
                    return jQuery.param(this.serializeArray()) }, serializeArray: function() {
                    return this.map(function() {
                        var elements = jQuery.prop(this, "elements");
                        return elements ? jQuery.makeArray(elements) : this }).filter(function() {
                        var type = this.type;
                        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type)) }).map(function(i, elem) {
                        var val = jQuery(this).val();
                        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") } }) : { name: elem.name, value: val.replace(rCRLF, "\r\n") } }).get() } }), jQuery.ajaxSettings.xhr = function() {
                try {
                    return new window.XMLHttpRequest } catch (e) {} };
            var xhrSuccessStatus = { 0: 200, 1223: 204 },
                xhrSupported = jQuery.ajaxSettings.xhr();
            support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(options) {
                var _callback, errorCallback;
                return support.cors || xhrSupported && !options.crossDomain ? { send: function(headers, complete) {
                        var i, xhr = options.xhr();
                        if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
                            for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                        options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                        _callback = function(type) {
                            return function() { _callback && (_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null, "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders())) } }, xhr.onload = _callback(), errorCallback = xhr.onerror = _callback("error"), void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function() { 4 === xhr.readyState && window.setTimeout(function() { _callback && errorCallback() }) }, _callback = _callback("abort");
                        try { xhr.send(options.hasContent && options.data || null) } catch (e) {
                            if (_callback) throw e } }, abort: function() { _callback && _callback() } } : void 0 }), jQuery.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function(text) {
                        return jQuery.globalEval(text), text } } }), jQuery.ajaxPrefilter("script", function(s) { void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET") }), jQuery.ajaxTransport("script", function(s) {
                if (s.crossDomain) {
                    var script, _callback2;
                    return { send: function(_, complete) { script = jQuery("<script>").prop({ charset: s.scriptCharset, src: s.url }).on("load error", _callback2 = function(evt) { script.remove(), _callback2 = null, evt && complete("error" === evt.type ? 404 : 200, evt.type) }), document.head.appendChild(script[0]) }, abort: function() { _callback2 && _callback2() } } } });
            var oldCallbacks = [],
                rjsonp = /(=)\?(?=&|$)|\?\?/;
            jQuery.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
                    var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                    return this[callback] = !0, callback } }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
                var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");

                return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                    return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0] }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() { responseContainer = arguments }, jqXHR.always(function() { void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0 }), "script") : void 0
            }), support.createHTMLDocument = function() {
                var body = document.implementation.createHTMLDocument("").body;
                return body.innerHTML = "<form></form><form></form>", 2 === body.childNodes.length }(), jQuery.parseHTML = function(data, context, keepScripts) {
                if (!data || "string" != typeof data) return null; "boolean" == typeof context && (keepScripts = context, context = !1), context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
                var parsed = rsingleTag.exec(data),
                    scripts = !keepScripts && [];
                return parsed ? [context.createElement(parsed[1])] : (parsed = buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes)) };
            var _load = jQuery.fn.load;
            jQuery.fn.load = function(url, params, callback) {
                if ("string" != typeof url && _load) return _load.apply(this, arguments);
                var selector, type, response, self = this,
                    off = url.indexOf(" ");
                return off > -1 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" === ("undefined" == typeof params ? "undefined" : _typeof(params)) && (type = "POST"), self.length > 0 && jQuery.ajax({ url: url, type: type || "GET", dataType: "html", data: params }).done(function(responseText) { response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText) }).always(callback && function(jqXHR, status) { self.each(function() { callback.apply(self, response || [jqXHR.responseText, status, jqXHR]) }) }), this }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) { jQuery.fn[type] = function(fn) {
                    return this.on(type, fn) } }), jQuery.expr.filters.animated = function(elem) {
                return jQuery.grep(jQuery.timers, function(fn) {
                    return elem === fn.elem }).length }, jQuery.offset = { setOffset: function(elem, options, i) {
                    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                        curElem = jQuery(elem),
                        props = {}; "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props) } }, jQuery.fn.extend({ offset: function(options) {
                    if (arguments.length) return void 0 === options ? this : this.each(function(i) { jQuery.offset.setOffset(this, options, i) });
                    var docElem, win, elem = this[0],
                        box = { top: 0, left: 0 },
                        doc = elem && elem.ownerDocument;
                    if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (box = elem.getBoundingClientRect(), win = getWindow(doc), { top: box.top + win.pageYOffset - docElem.clientTop, left: box.left + win.pageXOffset - docElem.clientLeft }) : box }, position: function() {
                    if (this[0]) {
                        var offsetParent, offset, elem = this[0],
                            parentOffset = { top: 0, left: 0 };
                        return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0) - offsetParent.scrollTop(), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0) - offsetParent.scrollLeft()), { top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0), left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0) } } }, offsetParent: function() {
                    return this.map(function() {
                        for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                        return offsetParent || documentElement }) } }), jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
                var top = "pageYOffset" === prop;
                jQuery.fn[method] = function(val) {
                    return access(this, function(elem, method, val) {
                        var win = getWindow(elem);
                        return void 0 === val ? win ? win[prop] : elem[method] : void(win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val) }, method, val, arguments.length) } }), jQuery.each(["top", "left"], function(i, prop) { jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                    return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0 }) }), jQuery.each({ Height: "height", Width: "width" }, function(name, type) { jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function(defaultExtra, funcName) { jQuery.fn[funcName] = function(margin, value) {
                        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                            extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                        return access(this, function(elem, type, value) {
                            var doc;
                            return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra) }, type, chainable ? margin : void 0, chainable, null) } }) }), jQuery.fn.extend({ bind: function(types, data, fn) {
                    return this.on(types, null, data, fn) }, unbind: function(types, fn) {
                    return this.off(types, null, fn) }, delegate: function(selector, types, data, fn) {
                    return this.on(types, selector, data, fn) }, undelegate: function(selector, types, fn) {
                    return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn) }, size: function() {
                    return this.length } }), jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return jQuery });
            var _jQuery = window.jQuery,
                _$ = window.$;
            return jQuery.noConflict = function(deep) {
                return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery
        }),
        /*!
         * https://github.com/paulmillr/es6-shim
         * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
         *   and contributors,  MIT License
         * es6-shim: v0.34.4
         * see https://github.com/paulmillr/es6-shim/blob/0.34.4/LICENSE
         * Details and documentation:
         * https://github.com/paulmillr/es6-shim/
         */
        function(root, factory) { "function" == typeof define && define.amd ? define("es6-shim", factory) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = factory() : root.returnExports = factory() }(this, function() {
            var ArrayIterator, _apply = Function.call.bind(Function.apply),
                _call = Function.call.bind(Function.call),
                isArray = Array.isArray,
                keys = Object.keys,
                not = function(func) {
                    return function() {
                        return !_apply(func, this, arguments) } },
                throwsError = function(func) {
                    try {
                        return func(), !1 } catch (e) {
                        return !0 } },
                valueOrFalseIfThrows = function(func) {
                    try {
                        return func() } catch (e) {
                        return !1 } },
                isCallableWithoutNew = not(throwsError),
                arePropertyDescriptorsSupported = function() {
                    return !throwsError(function() { Object.defineProperty({}, "x", { get: function() {} }) }) },
                supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported(),
                functionsHaveNames = "foo" === function() {}.name,
                _forEach = Function.call.bind(Array.prototype.forEach),
                _reduce = Function.call.bind(Array.prototype.reduce),
                _filter = Function.call.bind(Array.prototype.filter),
                _some = Function.call.bind(Array.prototype.some),
                defineProperty = function(object, name, value, force) {!force && name in object || (supportsDescriptors ? Object.defineProperty(object, name, { configurable: !0, enumerable: !1, writable: !0, value: value }) : object[name] = value) },
                defineProperties = function(object, map, forceOverride) { _forEach(keys(map), function(name) {
                        var method = map[name];
                        defineProperty(object, name, method, !!forceOverride) }) },
                _toString = Function.call.bind(Object.prototype.toString),
                isCallable = "function" == typeof /abc/ ? function(x) {
                    return "function" == typeof x && "[object Function]" === _toString(x) } : function(x) {
                    return "function" == typeof x },
                Value = { getter: function(object, name, _getter) {
                        if (!supportsDescriptors) throw new TypeError("getters require true ES5 support");
                        Object.defineProperty(object, name, { configurable: !0, enumerable: !1, get: _getter }) }, proxy: function(originalObject, key, targetObject) {
                        if (!supportsDescriptors) throw new TypeError("getters require true ES5 support");
                        var originalDescriptor = Object.getOwnPropertyDescriptor(originalObject, key);
                        Object.defineProperty(targetObject, key, { configurable: originalDescriptor.configurable, enumerable: originalDescriptor.enumerable, get: function() {
                                return originalObject[key] }, set: function(value) { originalObject[key] = value } }) }, redefine: function(object, property, newValue) {
                        if (supportsDescriptors) {
                            var descriptor = Object.getOwnPropertyDescriptor(object, property);
                            descriptor.value = newValue, Object.defineProperty(object, property, descriptor) } else object[property] = newValue }, defineByDescriptor: function(object, property, descriptor) { supportsDescriptors ? Object.defineProperty(object, property, descriptor) : "value" in descriptor && (object[property] = descriptor.value) }, preserveToString: function(target, source) { source && isCallable(source.toString) && defineProperty(target, "toString", source.toString.bind(source), !0) } },
                create = Object.create || function(prototype, properties) {
                    var Prototype = function() {};
                    Prototype.prototype = prototype;
                    var object = new Prototype;
                    return "undefined" != typeof properties && keys(properties).forEach(function(key) { Value.defineByDescriptor(object, key, properties[key]) }), object },
                supportsSubclassing = function(C, f) {
                    return Object.setPrototypeOf ? valueOrFalseIfThrows(function() {
                        var Sub = function Subclass(arg) {
                            var o = new C(arg);
                            return Object.setPrototypeOf(o, Subclass.prototype), o };
                        return Object.setPrototypeOf(Sub, C), Sub.prototype = create(C.prototype, { constructor: { value: Sub } }), f(Sub) }) : !1 },
                getGlobal = function() {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw new Error("unable to locate global object") },
                globals = getGlobal(),
                globalIsFinite = globals.isFinite,
                _indexOf = Function.call.bind(String.prototype.indexOf),
                _concat = Function.call.bind(Array.prototype.concat),
                _sort = Function.call.bind(Array.prototype.sort),
                _strSlice = Function.call.bind(String.prototype.slice),
                _push = Function.call.bind(Array.prototype.push),
                _pushApply = Function.apply.bind(Array.prototype.push),
                _shift = Function.call.bind(Array.prototype.shift),
                _max = Math.max,
                _min = Math.min,
                _floor = Math.floor,
                _abs = Math.abs,
                _log = Math.log,
                _sqrt = Math.sqrt,
                _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty),
                noop = function() {},
                _Symbol = globals.Symbol || {},
                symbolSpecies = _Symbol.species || "@@species",
                numberIsNaN = Number.isNaN || function(value) {
                    return value !== value },
                numberIsFinite = Number.isFinite || function(value) {
                    return "number" == typeof value && globalIsFinite(value) },
                isStandardArguments = function(value) {
                    return "[object Arguments]" === _toString(value) },
                isLegacyArguments = function(value) {
                    return null !== value && "object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) && "number" == typeof value.length && value.length >= 0 && "[object Array]" !== _toString(value) && "[object Function]" === _toString(value.callee) },
                isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments,
                Type = { primitive: function(x) {
                        return null === x || "function" != typeof x && "object" !== ("undefined" == typeof x ? "undefined" : _typeof(x)) }, object: function(x) {
                        return null !== x && "object" === ("undefined" == typeof x ? "undefined" : _typeof(x)) }, string: function(x) {
                        return "[object String]" === _toString(x) }, regex: function(x) {
                        return "[object RegExp]" === _toString(x) }, symbol: function(x) {
                        return "function" == typeof globals.Symbol && "symbol" === ("undefined" == typeof x ? "undefined" : _typeof(x)) } },
                overrideNative = function(object, property, replacement) {
                    var original = object[property];
                    defineProperty(object, property, replacement, !0), Value.preserveToString(object[property], original) },
                hasSymbols = "function" == typeof _Symbol && "function" == typeof _Symbol["for"] && Type.symbol(_Symbol()),
                $iterator$ = Type.symbol(_Symbol.iterator) ? _Symbol.iterator : "_es6-shim iterator_";
            globals.Set && "function" == typeof(new globals.Set)["@@iterator"] && ($iterator$ = "@@iterator"), globals.Reflect || defineProperty(globals, "Reflect", {});
            var Reflect = globals.Reflect,
                $String = String,
                ES = { Call: function(F, V) {
                        var args = arguments.length > 2 ? arguments[2] : [];
                        if (!ES.IsCallable(F)) throw new TypeError(F + " is not a function");
                        return _apply(F, V, args) }, RequireObjectCoercible: function(x, optMessage) {
                        if (null == x) throw new TypeError(optMessage || "Cannot call method on " + x);
                        return x }, TypeIsObject: function(x) {
                        return void 0 === x || null === x || x === !0 || x === !1 ? !1 : "function" == typeof x || "object" === ("undefined" == typeof x ? "undefined" : _typeof(x)) }, ToObject: function(o, optMessage) {
                        return Object(ES.RequireObjectCoercible(o, optMessage)) }, IsCallable: isCallable, IsConstructor: function(x) {
                        return ES.IsCallable(x) }, ToInt32: function(x) {
                        return ES.ToNumber(x) >> 0 }, ToUint32: function(x) {
                        return ES.ToNumber(x) >>> 0 }, ToNumber: function(value) {
                        if ("[object Symbol]" === _toString(value)) throw new TypeError("Cannot convert a Symbol value to a number");
                        return +value }, ToInteger: function(value) {
                        var number = ES.ToNumber(value);
                        return numberIsNaN(number) ? 0 : 0 !== number && numberIsFinite(number) ? (number > 0 ? 1 : -1) * _floor(_abs(number)) : number }, ToLength: function(value) {
                        var len = ES.ToInteger(value);
                        return 0 >= len ? 0 : len > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : len }, SameValue: function(a, b) {
                        return a === b ? 0 === a ? 1 / a === 1 / b : !0 : numberIsNaN(a) && numberIsNaN(b) }, SameValueZero: function(a, b) {
                        return a === b || numberIsNaN(a) && numberIsNaN(b) }, IsIterable: function(o) {
                        return ES.TypeIsObject(o) && ("undefined" != typeof o[$iterator$] || isArguments(o)) }, GetIterator: function(o) {
                        if (isArguments(o)) return new ArrayIterator(o, "value");
                        var itFn = ES.GetMethod(o, $iterator$);
                        if (!ES.IsCallable(itFn)) throw new TypeError("value is not an iterable");
                        var it = ES.Call(itFn, o);
                        if (!ES.TypeIsObject(it)) throw new TypeError("bad iterator");
                        return it }, GetMethod: function(o, p) {
                        var func = ES.ToObject(o)[p];
                        if (void 0 === func || null === func) return void 0;
                        if (!ES.IsCallable(func)) throw new TypeError("Method not callable: " + p);
                        return func }, IteratorComplete: function(iterResult) {
                        return !!iterResult.done }, IteratorClose: function(iterator, completionIsThrow) {
                        var returnMethod = ES.GetMethod(iterator, "return");
                        if (void 0 !== returnMethod) {
                            var innerResult, innerException;
                            try { innerResult = ES.Call(returnMethod, iterator) } catch (e) { innerException = e }
                            if (!completionIsThrow) {
                                if (innerException) throw innerException;
                                if (!ES.TypeIsObject(innerResult)) throw new TypeError("Iterator's return method returned a non-object.") } } }, IteratorNext: function(it) {
                        var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
                        if (!ES.TypeIsObject(result)) throw new TypeError("bad iterator");
                        return result }, IteratorStep: function(it) {
                        var result = ES.IteratorNext(it),
                            done = ES.IteratorComplete(result);
                        return done ? !1 : result }, Construct: function(C, args, newTarget, isES6internal) {
                        var target = "undefined" == typeof newTarget ? C : newTarget;
                        if (!isES6internal && Reflect.construct) return Reflect.construct(C, args, target);
                        var proto = target.prototype;
                        ES.TypeIsObject(proto) || (proto = Object.prototype);
                        var obj = create(proto),
                            result = ES.Call(C, obj, args);
                        return ES.TypeIsObject(result) ? result : obj }, SpeciesConstructor: function(O, defaultConstructor) {
                        var C = O.constructor;
                        if (void 0 === C) return defaultConstructor;
                        if (!ES.TypeIsObject(C)) throw new TypeError("Bad constructor");
                        var S = C[symbolSpecies];
                        if (void 0 === S || null === S) return defaultConstructor;
                        if (!ES.IsConstructor(S)) throw new TypeError("Bad @@species");
                        return S }, CreateHTML: function(string, tag, attribute, value) {
                        var S = ES.ToString(string),
                            p1 = "<" + tag;
                        if ("" !== attribute) {
                            var V = ES.ToString(value),
                                escapedV = V.replace(/"/g, "&quot;");
                            p1 += " " + attribute + '="' + escapedV + '"' }
                        var p2 = p1 + ">",
                            p3 = p2 + S;
                        return p3 + "</" + tag + ">" }, IsRegExp: function(argument) {
                        if (!ES.TypeIsObject(argument)) return !1;
                        var isRegExp = argument[_Symbol.match];
                        return "undefined" != typeof isRegExp ? !!isRegExp : Type.regex(argument) }, ToString: function(string) {
                        return $String(string) } };
            if (supportsDescriptors && hasSymbols) {
                var defineWellKnownSymbol = function(name) {
                    if (Type.symbol(_Symbol[name])) return _Symbol[name];
                    var sym = _Symbol["for"]("Symbol." + name);
                    return Object.defineProperty(_Symbol, name, { configurable: !1, enumerable: !1, writable: !1, value: sym }), sym };
                if (!Type.symbol(_Symbol.search)) {
                    var symbolSearch = defineWellKnownSymbol("search"),
                        originalSearch = String.prototype.search;
                    defineProperty(RegExp.prototype, symbolSearch, function(string) {
                        return ES.Call(originalSearch, string, [this]) });
                    var searchShim = function(regexp) {
                        var O = ES.RequireObjectCoercible(this);
                        if (null !== regexp && "undefined" != typeof regexp) {
                            var searcher = ES.GetMethod(regexp, symbolSearch);
                            if ("undefined" != typeof searcher) return ES.Call(searcher, regexp, [O]) }
                        return ES.Call(originalSearch, O, [ES.ToString(regexp)]) };
                    overrideNative(String.prototype, "search", searchShim) }
                if (!Type.symbol(_Symbol.replace)) {
                    var symbolReplace = defineWellKnownSymbol("replace"),
                        originalReplace = String.prototype.replace;
                    defineProperty(RegExp.prototype, symbolReplace, function(string, replaceValue) {
                        return ES.Call(originalReplace, string, [this, replaceValue]) });
                    var replaceShim = function(searchValue, replaceValue) {
                        var O = ES.RequireObjectCoercible(this);
                        if (null !== searchValue && "undefined" != typeof searchValue) {
                            var replacer = ES.GetMethod(searchValue, symbolReplace);
                            if ("undefined" != typeof replacer) return ES.Call(replacer, searchValue, [O, replaceValue]) }
                        return ES.Call(originalReplace, O, [ES.ToString(searchValue), replaceValue]) };
                    overrideNative(String.prototype, "replace", replaceShim) }
                if (!Type.symbol(_Symbol.split)) {
                    var symbolSplit = defineWellKnownSymbol("split"),
                        originalSplit = String.prototype.split;
                    defineProperty(RegExp.prototype, symbolSplit, function(string, limit) {
                        return ES.Call(originalSplit, string, [this, limit]) });
                    var splitShim = function(separator, limit) {
                        var O = ES.RequireObjectCoercible(this);
                        if (null !== separator && "undefined" != typeof separator) {
                            var splitter = ES.GetMethod(separator, symbolSplit);
                            if ("undefined" != typeof splitter) return ES.Call(splitter, separator, [O, limit]) }
                        return ES.Call(originalSplit, O, [ES.ToString(separator), limit]) };
                    overrideNative(String.prototype, "split", splitShim) }
                var symbolMatchExists = Type.symbol(_Symbol.match),
                    stringMatchIgnoresSymbolMatch = symbolMatchExists && function() {
                        var o = {};
                        return o[_Symbol.match] = function() {
                            return 42 }, 42 !== "a".match(o) }();
                if (!symbolMatchExists || stringMatchIgnoresSymbolMatch) {
                    var symbolMatch = defineWellKnownSymbol("match"),
                        originalMatch = String.prototype.match;
                    defineProperty(RegExp.prototype, symbolMatch, function(string) {
                        return ES.Call(originalMatch, string, [this]) });
                    var matchShim = function(regexp) {
                        var O = ES.RequireObjectCoercible(this);
                        if (null !== regexp && "undefined" != typeof regexp) {
                            var matcher = ES.GetMethod(regexp, symbolMatch);
                            if ("undefined" != typeof matcher) return ES.Call(matcher, regexp, [O]) }
                        return ES.Call(originalMatch, O, [ES.ToString(regexp)]) };
                    overrideNative(String.prototype, "match", matchShim) } }
            var wrapConstructor = function(original, replacement, keysToSkip) { Value.preserveToString(replacement, original), Object.setPrototypeOf && Object.setPrototypeOf(original, replacement), supportsDescriptors ? _forEach(Object.getOwnPropertyNames(original), function(key) { key in noop || keysToSkip[key] || Value.proxy(original, key, replacement) }) : _forEach(Object.keys(original), function(key) { key in noop || keysToSkip[key] || (replacement[key] = original[key]) }), replacement.prototype = original.prototype, Value.redefine(original.prototype, "constructor", replacement) },
                defaultSpeciesGetter = function() {
                    return this },
                addDefaultSpecies = function(C) { supportsDescriptors && !_hasOwnProperty(C, symbolSpecies) && Value.getter(C, symbolSpecies, defaultSpeciesGetter) },
                addIterator = function(prototype, impl) {
                    var implementation = impl || function() {
                        return this };
                    defineProperty(prototype, $iterator$, implementation), !prototype[$iterator$] && Type.symbol($iterator$) && (prototype[$iterator$] = implementation) },
                createDataProperty = function(object, name, value) { supportsDescriptors ? Object.defineProperty(object, name, { configurable: !0, enumerable: !0, writable: !0, value: value }) : object[name] = value },
                createDataPropertyOrThrow = function(object, name, value) {
                    if (createDataProperty(object, name, value), !ES.SameValue(object[name], value)) throw new TypeError("property is nonconfigurable") },
                emulateES6construct = function(o, defaultNewTarget, defaultProto, slots) {
                    if (!ES.TypeIsObject(o)) throw new TypeError("Constructor requires `new`: " + defaultNewTarget.name);
                    var proto = defaultNewTarget.prototype;
                    ES.TypeIsObject(proto) || (proto = defaultProto);
                    var obj = create(proto);
                    for (var name in slots)
                        if (_hasOwnProperty(slots, name)) {
                            var value = slots[name];
                            defineProperty(obj, name, value, !0) }
                    return obj };
            if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
                var originalFromCodePoint = String.fromCodePoint;
                overrideNative(String, "fromCodePoint", function() {
                    return ES.Call(originalFromCodePoint, this, arguments) }) }
            var StringShims = { fromCodePoint: function() {
                    for (var next, result = [], i = 0, length = arguments.length; length > i; i++) {
                        if (next = Number(arguments[i]), !ES.SameValue(next, ES.ToInteger(next)) || 0 > next || next > 1114111) throw new RangeError("Invalid code point " + next);
                        65536 > next ? _push(result, String.fromCharCode(next)) : (next -= 65536, _push(result, String.fromCharCode((next >> 10) + 55296)), _push(result, String.fromCharCode(next % 1024 + 56320))) }
                    return result.join("") }, raw: function(callSite) {
                    var cooked = ES.ToObject(callSite, "bad callSite"),
                        rawString = ES.ToObject(cooked.raw, "bad raw value"),
                        len = rawString.length,
                        literalsegments = ES.ToLength(len);
                    if (0 >= literalsegments) return "";
                    for (var nextKey, next, nextSeg, nextSub, stringElements = [], nextIndex = 0; literalsegments > nextIndex && (nextKey = ES.ToString(nextIndex), nextSeg = ES.ToString(rawString[nextKey]), _push(stringElements, nextSeg), !(nextIndex + 1 >= literalsegments));) next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : "", nextSub = ES.ToString(next), _push(stringElements, nextSub), nextIndex += 1;
                    return stringElements.join("") } };
            String.raw && "xy" !== String.raw({ raw: { 0: "x", 1: "y", length: 2 } }) && overrideNative(String, "raw", StringShims.raw), defineProperties(String, StringShims);
            var stringRepeat = function repeat(s, times) {
                    if (1 > times) return "";
                    if (times % 2) return repeat(s, times - 1) + s;
                    var half = repeat(s, times / 2);
                    return half + half },
                stringMaxLength = 1 / 0,
                StringPrototypeShims = { repeat: function(times) {
                        var thisStr = ES.ToString(ES.RequireObjectCoercible(this)),
                            numTimes = ES.ToInteger(times);
                        if (0 > numTimes || numTimes >= stringMaxLength) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
                        return stringRepeat(thisStr, numTimes) }, startsWith: function(searchString) {
                        var S = ES.ToString(ES.RequireObjectCoercible(this));
                        if (ES.IsRegExp(searchString)) throw new TypeError('Cannot call method "startsWith" with a regex');
                        var position, searchStr = ES.ToString(searchString);
                        arguments.length > 1 && (position = arguments[1]);
                        var start = _max(ES.ToInteger(position), 0);
                        return _strSlice(S, start, start + searchStr.length) === searchStr }, endsWith: function(searchString) {
                        var S = ES.ToString(ES.RequireObjectCoercible(this));
                        if (ES.IsRegExp(searchString)) throw new TypeError('Cannot call method "endsWith" with a regex');
                        var endPosition, searchStr = ES.ToString(searchString),
                            len = S.length;
                        arguments.length > 1 && (endPosition = arguments[1]);
                        var pos = "undefined" == typeof endPosition ? len : ES.ToInteger(endPosition),
                            end = _min(_max(pos, 0), len);
                        return _strSlice(S, end - searchStr.length, end) === searchStr }, includes: function(searchString) {
                        if (ES.IsRegExp(searchString)) throw new TypeError('"includes" does not accept a RegExp');
                        var position, searchStr = ES.ToString(searchString);
                        return arguments.length > 1 && (position = arguments[1]), -1 !== _indexOf(this, searchStr, position) }, codePointAt: function(pos) {
                        var thisStr = ES.ToString(ES.RequireObjectCoercible(this)),
                            position = ES.ToInteger(pos),
                            length = thisStr.length;
                        if (position >= 0 && length > position) {
                            var first = thisStr.charCodeAt(position),
                                isEnd = position + 1 === length;
                            if (55296 > first || first > 56319 || isEnd) return first;
                            var second = thisStr.charCodeAt(position + 1);
                            return 56320 > second || second > 57343 ? first : 1024 * (first - 55296) + (second - 56320) + 65536 } } };
            if (String.prototype.includes && "a".includes("a", 1 / 0) !== !1 && overrideNative(String.prototype, "includes", StringPrototypeShims.includes), String.prototype.startsWith && String.prototype.endsWith) {
                var startsWithRejectsRegex = throwsError(function() { "/a/".startsWith(/a/) }),
                    startsWithHandlesInfinity = valueOrFalseIfThrows(function() {
                        return "abc".startsWith("a", 1 / 0) === !1 });
                startsWithRejectsRegex && startsWithHandlesInfinity || (overrideNative(String.prototype, "startsWith", StringPrototypeShims.startsWith), overrideNative(String.prototype, "endsWith", StringPrototypeShims.endsWith)) }
            if (hasSymbols) {
                var startsWithSupportsSymbolMatch = valueOrFalseIfThrows(function() {
                    var re = /a/;
                    return re[_Symbol.match] = !1, "/a/".startsWith(re) });
                startsWithSupportsSymbolMatch || overrideNative(String.prototype, "startsWith", StringPrototypeShims.startsWith);
                var endsWithSupportsSymbolMatch = valueOrFalseIfThrows(function() {
                    var re = /a/;
                    return re[_Symbol.match] = !1, "/a/".endsWith(re) });
                endsWithSupportsSymbolMatch || overrideNative(String.prototype, "endsWith", StringPrototypeShims.endsWith);
                var includesSupportsSymbolMatch = valueOrFalseIfThrows(function() {
                    var re = /a/;
                    return re[_Symbol.match] = !1, "/a/".includes(re) });
                includesSupportsSymbolMatch || overrideNative(String.prototype, "includes", StringPrototypeShims.includes) }
            defineProperties(String.prototype, StringPrototypeShims);
            var ws = ["    \n\f\r   ᠎    ", "         　\u2028", "\u2029"].join(""),
                trimRegexp = new RegExp("(^[" + ws + "]+)|([" + ws + "]+$)", "g"),
                trimShim = function() {
                    return ES.ToString(ES.RequireObjectCoercible(this)).replace(trimRegexp, "") },
                nonWS = ["", "​", "￾"].join(""),
                nonWSregex = new RegExp("[" + nonWS + "]", "g"),
                isBadHexRegex = /^[\-+]0x[0-9a-f]+$/i,
                hasStringTrimBug = nonWS.trim().length !== nonWS.length;
            defineProperty(String.prototype, "trim", trimShim, hasStringTrimBug);
            var StringIterator = function(s) { ES.RequireObjectCoercible(s), this._s = ES.ToString(s), this._i = 0 };
            StringIterator.prototype.next = function() {
                var s = this._s,
                    i = this._i;
                if ("undefined" == typeof s || i >= s.length) return this._s = void 0, { value: void 0, done: !0 };
                var second, len, first = s.charCodeAt(i);
                return 55296 > first || first > 56319 || i + 1 === s.length ? len = 1 : (second = s.charCodeAt(i + 1), len = 56320 > second || second > 57343 ? 1 : 2), this._i = i + len, { value: s.substr(i, len), done: !1 } }, addIterator(StringIterator.prototype), addIterator(String.prototype, function() {
                return new StringIterator(this) });
            var ArrayShims = { from: function(items) {
                    var mapFn, C = this;
                    arguments.length > 1 && (mapFn = arguments[1]);
                    var mapping, T;
                    if ("undefined" == typeof mapFn) mapping = !1;
                    else {
                        if (!ES.IsCallable(mapFn)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                        arguments.length > 2 && (T = arguments[2]), mapping = !0 }
                    var length, result, i, usingIterator = "undefined" != typeof(isArguments(items) || ES.GetMethod(items, $iterator$));
                    if (usingIterator) { result = ES.IsConstructor(C) ? Object(new C) : [];
                        var next, nextValue, iterator = ES.GetIterator(items);
                        for (i = 0;;) {
                            if (next = ES.IteratorStep(iterator), next === !1) break;
                            nextValue = next.value;
                            try { mapping && (nextValue = "undefined" == typeof T ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i)), result[i] = nextValue } catch (e) {
                                throw ES.IteratorClose(iterator, !0), e }
                            i += 1 }
                        length = i } else {
                        var arrayLike = ES.ToObject(items);
                        length = ES.ToLength(arrayLike.length), result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
                        var value;
                        for (i = 0; length > i; ++i) value = arrayLike[i], mapping && (value = "undefined" == typeof T ? mapFn(value, i) : _call(mapFn, T, value, i)), result[i] = value }
                    return result.length = length, result }, of: function() {
                    for (var len = arguments.length, C = this, A = isArray(C) || !ES.IsCallable(C) ? new Array(len) : ES.Construct(C, [len]), k = 0; len > k; ++k) createDataPropertyOrThrow(A, k, arguments[k]);
                    return A.length = len, A } };
            defineProperties(Array, ArrayShims), addDefaultSpecies(Array);
            var iteratorResult = function(x) {
                return { value: x, done: 0 === arguments.length } };
            ArrayIterator = function(array, kind) { this.i = 0, this.array = array, this.kind = kind }, defineProperties(ArrayIterator.prototype, { next: function() {
                    var i = this.i,
                        array = this.array;
                    if (!(this instanceof ArrayIterator)) throw new TypeError("Not an ArrayIterator");
                    if ("undefined" != typeof array)
                        for (var len = ES.ToLength(array.length); len > i; i++) {
                            var retval, kind = this.kind;
                            return "key" === kind ? retval = i : "value" === kind ? retval = array[i] : "entry" === kind && (retval = [i, array[i]]), this.i = i + 1, { value: retval, done: !1 } }
                    return this.array = void 0, { value: void 0, done: !0 } } }), addIterator(ArrayIterator.prototype);
            var orderKeys = function(a, b) {
                    var aNumeric = String(ES.ToInteger(a)) === a,
                        bNumeric = String(ES.ToInteger(b)) === b;
                    return aNumeric && bNumeric ? b - a : aNumeric && !bNumeric ? -1 : !aNumeric && bNumeric ? 1 : a.localeCompare(b) },
                getAllKeys = function(object) {
                    var ownKeys = [],
                        keys = [];
                    for (var key in object) _push(_hasOwnProperty(object, key) ? ownKeys : keys, key);
                    return _sort(ownKeys, orderKeys), _sort(keys, orderKeys), _concat(ownKeys, keys) },
                ObjectIterator = function(object, kind) { defineProperties(this, { object: object, array: getAllKeys(object), kind: kind }) };
            defineProperties(ObjectIterator.prototype, { next: function() {
                    var key, array = this.array;
                    if (!(this instanceof ObjectIterator)) throw new TypeError("Not an ObjectIterator");
                    for (; array.length > 0;)
                        if (key = _shift(array), key in this.object) return iteratorResult("key" === this.kind ? key : "value" === this.kind ? this.object[key] : [key, this.object[key]]);
                    return iteratorResult() } }), addIterator(ObjectIterator.prototype);
            var arrayOfSupportsSubclassing = Array.of === ArrayShims.of || function() {
                var Foo = function(len) { this.length = len };
                Foo.prototype = [];
                var fooArr = Array.of.apply(Foo, [1, 2]);
                return fooArr instanceof Foo && 2 === fooArr.length }();
            arrayOfSupportsSubclassing || overrideNative(Array, "of", ArrayShims.of);
            var ArrayPrototypeShims = { copyWithin: function(target, start) {
                    var end, o = ES.ToObject(this),
                        len = ES.ToLength(o.length),
                        relativeTarget = ES.ToInteger(target),
                        relativeStart = ES.ToInteger(start),
                        to = 0 > relativeTarget ? _max(len + relativeTarget, 0) : _min(relativeTarget, len),
                        from = 0 > relativeStart ? _max(len + relativeStart, 0) : _min(relativeStart, len);
                    arguments.length > 2 && (end = arguments[2]);
                    var relativeEnd = "undefined" == typeof end ? len : ES.ToInteger(end),
                        finalItem = 0 > relativeEnd ? _max(len + relativeEnd, 0) : _min(relativeEnd, len),
                        count = _min(finalItem - from, len - to),
                        direction = 1;
                    for (to > from && from + count > to && (direction = -1, from += count - 1, to += count - 1); count > 0;) from in o ? o[to] = o[from] : delete o[to], from += direction, to += direction, count -= 1;
                    return o }, fill: function(value) {
                    var start;
                    arguments.length > 1 && (start = arguments[1]);
                    var end;
                    arguments.length > 2 && (end = arguments[2]);
                    var O = ES.ToObject(this),
                        len = ES.ToLength(O.length);
                    start = ES.ToInteger("undefined" == typeof start ? 0 : start), end = ES.ToInteger("undefined" == typeof end ? len : end);
                    for (var relativeStart = 0 > start ? _max(len + start, 0) : _min(start, len), relativeEnd = 0 > end ? len + end : end, i = relativeStart; len > i && relativeEnd > i; ++i) O[i] = value;
                    return O }, find: function(predicate) {
                    var list = ES.ToObject(this),
                        length = ES.ToLength(list.length);
                    if (!ES.IsCallable(predicate)) throw new TypeError("Array#find: predicate must be a function");
                    for (var value, thisArg = arguments.length > 1 ? arguments[1] : null, i = 0; length > i; i++)
                        if (value = list[i], thisArg) {
                            if (_call(predicate, thisArg, value, i, list)) return value } else if (predicate(value, i, list)) return value }, findIndex: function(predicate) {
                    var list = ES.ToObject(this),
                        length = ES.ToLength(list.length);
                    if (!ES.IsCallable(predicate)) throw new TypeError("Array#findIndex: predicate must be a function");
                    for (var thisArg = arguments.length > 1 ? arguments[1] : null, i = 0; length > i; i++)
                        if (thisArg) {
                            if (_call(predicate, thisArg, list[i], i, list)) return i } else if (predicate(list[i], i, list)) return i;
                    return -1 }, keys: function() {
                    return new ArrayIterator(this, "key") }, values: function() {
                    return new ArrayIterator(this, "value") }, entries: function() {
                    return new ArrayIterator(this, "entry") } };
            if (Array.prototype.keys && !ES.IsCallable([1].keys().next) && delete Array.prototype.keys, Array.prototype.entries && !ES.IsCallable([1].entries().next) && delete Array.prototype.entries, Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[$iterator$] && (defineProperties(Array.prototype, { values: Array.prototype[$iterator$] }), Type.symbol(_Symbol.unscopables) && (Array.prototype[_Symbol.unscopables].values = !0)), functionsHaveNames && Array.prototype.values && "values" !== Array.prototype.values.name) {
                var originalArrayPrototypeValues = Array.prototype.values;
                overrideNative(Array.prototype, "values", function() {
                    return ES.Call(originalArrayPrototypeValues, this, arguments) }), defineProperty(Array.prototype, $iterator$, Array.prototype.values, !0) }
            defineProperties(Array.prototype, ArrayPrototypeShims), addIterator(Array.prototype, function() {
                return this.values() }), Object.getPrototypeOf && addIterator(Object.getPrototypeOf([].values()));
            var arrayFromSwallowsNegativeLengths = function() {
                    return valueOrFalseIfThrows(function() {
                        return 0 === Array.from({ length: -1 }).length }) }(),
                arrayFromHandlesIterables = function() {
                    var arr = Array.from([0].entries());
                    return 1 === arr.length && isArray(arr[0]) && 0 === arr[0][0] && 0 === arr[0][1] }();
            arrayFromSwallowsNegativeLengths && arrayFromHandlesIterables || overrideNative(Array, "from", ArrayShims.from);
            var arrayFromHandlesUndefinedMapFunction = function() {
                return valueOrFalseIfThrows(function() {
                    return Array.from([0], void 0) }) }();
            if (!arrayFromHandlesUndefinedMapFunction) {
                var origArrayFrom = Array.from;
                overrideNative(Array, "from", function(items) {
                    return arguments.length > 1 && "undefined" != typeof arguments[1] ? ES.Call(origArrayFrom, this, arguments) : _call(origArrayFrom, this, items) }) }
            var int32sAsOne = -(Math.pow(2, 32) - 1),
                toLengthsCorrectly = function(method, reversed) {
                    var obj = { length: int32sAsOne };
                    return obj[reversed ? (obj.length >>> 0) - 1 : 0] = !0, valueOrFalseIfThrows(function() {
                        return _call(method, obj, function() {
                            throw new RangeError("should not reach here") }, []), !0 }) };
            if (!toLengthsCorrectly(Array.prototype.forEach)) {
                var originalForEach = Array.prototype.forEach;
                overrideNative(Array.prototype, "forEach", function() {
                    return ES.Call(originalForEach, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.map)) {
                var originalMap = Array.prototype.map;
                overrideNative(Array.prototype, "map", function() {
                    return ES.Call(originalMap, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.filter)) {
                var originalFilter = Array.prototype.filter;
                overrideNative(Array.prototype, "filter", function() {
                    return ES.Call(originalFilter, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.some)) {
                var originalSome = Array.prototype.some;
                overrideNative(Array.prototype, "some", function() {
                    return ES.Call(originalSome, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.every)) {
                var originalEvery = Array.prototype.every;
                overrideNative(Array.prototype, "every", function() {
                    return ES.Call(originalEvery, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.reduce)) {
                var originalReduce = Array.prototype.reduce;
                overrideNative(Array.prototype, "reduce", function() {
                    return ES.Call(originalReduce, this.length >= 0 ? this : [], arguments) }, !0) }
            if (!toLengthsCorrectly(Array.prototype.reduceRight, !0)) {
                var originalReduceRight = Array.prototype.reduceRight;
                overrideNative(Array.prototype, "reduceRight", function() {
                    return ES.Call(originalReduceRight, this.length >= 0 ? this : [], arguments) }, !0) }
            var lacksOctalSupport = 8 !== Number("0o10"),
                lacksBinarySupport = 2 !== Number("0b10"),
                trimsNonWhitespace = _some(nonWS, function(c) {
                    return 0 === Number(c + 0 + c) });
            if (lacksOctalSupport || lacksBinarySupport || trimsNonWhitespace) {
                var OrigNumber = Number,
                    binaryRegex = /^0b[01]+$/i,
                    octalRegex = /^0o[0-7]+$/i,
                    isBinary = binaryRegex.test.bind(binaryRegex),
                    isOctal = octalRegex.test.bind(octalRegex),
                    toPrimitive = function(O) {
                        var result;
                        if ("function" == typeof O.valueOf && (result = O.valueOf(), Type.primitive(result))) return result;
                        if ("function" == typeof O.toString && (result = O.toString(), Type.primitive(result))) return result;
                        throw new TypeError("No default value") },
                    hasNonWS = nonWSregex.test.bind(nonWSregex),
                    isBadHex = isBadHexRegex.test.bind(isBadHexRegex),
                    NumberShim = function() {
                        var NumberShim = function(value) {
                            var primValue;
                            primValue = arguments.length > 0 ? Type.primitive(value) ? value : toPrimitive(value, "number") : 0, "string" == typeof primValue && (primValue = ES.Call(trimShim, primValue), isBinary(primValue) ? primValue = parseInt(_strSlice(primValue, 2), 2) : isOctal(primValue) ? primValue = parseInt(_strSlice(primValue, 2), 8) : (hasNonWS(primValue) || isBadHex(primValue)) && (primValue = 0 / 0));
                            var receiver = this,
                                valueOfSucceeds = valueOrFalseIfThrows(function() {
                                    return OrigNumber.prototype.valueOf.call(receiver), !0 });
                            return receiver instanceof NumberShim && !valueOfSucceeds ? new OrigNumber(primValue) : OrigNumber(primValue) };
                        return NumberShim }();
                wrapConstructor(OrigNumber, NumberShim, {}), defineProperties(NumberShim, { NaN: OrigNumber.NaN, MAX_VALUE: OrigNumber.MAX_VALUE, MIN_VALUE: OrigNumber.MIN_VALUE, NEGATIVE_INFINITY: OrigNumber.NEGATIVE_INFINITY, POSITIVE_INFINITY: OrigNumber.POSITIVE_INFINITY }), Number = NumberShim, Value.redefine(globals, "Number", NumberShim) }
            var maxSafeInteger = Math.pow(2, 53) - 1;
            defineProperties(Number, { MAX_SAFE_INTEGER: maxSafeInteger, MIN_SAFE_INTEGER: -maxSafeInteger, EPSILON: 2.220446049250313e-16, parseInt: globals.parseInt, parseFloat: globals.parseFloat, isFinite: numberIsFinite, isInteger: function(value) {
                    return numberIsFinite(value) && ES.ToInteger(value) === value }, isSafeInteger: function(value) {
                    return Number.isInteger(value) && _abs(value) <= Number.MAX_SAFE_INTEGER }, isNaN: numberIsNaN }), defineProperty(Number, "parseInt", globals.parseInt, Number.parseInt !== globals.parseInt), [, 1].find(function(item, idx) {
                return 0 === idx }) || overrideNative(Array.prototype, "find", ArrayPrototypeShims.find), 0 !== [, 1].findIndex(function(item, idx) {
                return 0 === idx }) && overrideNative(Array.prototype, "findIndex", ArrayPrototypeShims.findIndex);
            var isEnumerableOn = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable),
                ensureEnumerable = function(obj, prop) { supportsDescriptors && isEnumerableOn(obj, prop) && Object.defineProperty(obj, prop, { enumerable: !1 }) },
                sliceArgs = function() {
                    for (var initial = Number(this), len = arguments.length, desiredArgCount = len - initial, args = new Array(0 > desiredArgCount ? 0 : desiredArgCount), i = initial; len > i; ++i) args[i - initial] = arguments[i];
                    return args },
                assignTo = function(source) {
                    return function(target, key) {
                        return target[key] = source[key], target } },
                assignReducer = function(target, source) {
                    var symbols, sourceKeys = keys(Object(source));
                    return ES.IsCallable(Object.getOwnPropertySymbols) && (symbols = _filter(Object.getOwnPropertySymbols(Object(source)), isEnumerableOn(source))), _reduce(_concat(sourceKeys, symbols || []), assignTo(source), target) },
                ObjectShims = {
                    assign: function(target) {
                        var to = ES.ToObject(target, "Cannot convert undefined or null to object");
                        return _reduce(ES.Call(sliceArgs, 1, arguments), assignReducer, to);

                    },
                    is: function(a, b) {
                        return ES.SameValue(a, b) }
                },
                assignHasPendingExceptions = Object.assign && Object.preventExtensions && function() {
                    var thrower = Object.preventExtensions({ 1: 2 });
                    try { Object.assign(thrower, "xy") } catch (e) {
                        return "y" === thrower[1] } }();
            if (assignHasPendingExceptions && overrideNative(Object, "assign", ObjectShims.assign), defineProperties(Object, ObjectShims), supportsDescriptors) {
                var ES5ObjectShims = { setPrototypeOf: function(Object, magic) {
                        var set, checkArgs = function(O, proto) {
                                if (!ES.TypeIsObject(O)) throw new TypeError("cannot set prototype on a non-object");
                                if (null !== proto && !ES.TypeIsObject(proto)) throw new TypeError("can only set prototype to an object or null" + proto) },
                            setPrototypeOf = function(O, proto) {
                                return checkArgs(O, proto), _call(set, O, proto), O };
                        try { set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set, _call(set, {}, null) } catch (e) {
                            if (Object.prototype !== {}[magic]) return;
                            set = function(proto) { this[magic] = proto }, setPrototypeOf.polyfill = setPrototypeOf(setPrototypeOf({}, null), Object.prototype) instanceof Object }
                        return setPrototypeOf }(Object, "__proto__") };
                defineProperties(Object, ES5ObjectShims) }
            Object.setPrototypeOf && Object.getPrototypeOf && null !== Object.getPrototypeOf(Object.setPrototypeOf({}, null)) && null === Object.getPrototypeOf(Object.create(null)) && ! function() {
                var FAKENULL = Object.create(null),
                    gpo = Object.getPrototypeOf,
                    spo = Object.setPrototypeOf;
                Object.getPrototypeOf = function(o) {
                    var result = gpo(o);
                    return result === FAKENULL ? null : result }, Object.setPrototypeOf = function(o, p) {
                    var proto = null === p ? FAKENULL : p;
                    return spo(o, proto) }, Object.setPrototypeOf.polyfill = !1 }();
            var objectKeysAcceptsPrimitives = !throwsError(function() { Object.keys("foo") });
            if (!objectKeysAcceptsPrimitives) {
                var originalObjectKeys = Object.keys;
                overrideNative(Object, "keys", function(value) {
                    return originalObjectKeys(ES.ToObject(value)) }), keys = Object.keys }
            if (Object.getOwnPropertyNames) {
                var objectGOPNAcceptsPrimitives = !throwsError(function() { Object.getOwnPropertyNames("foo") });
                if (!objectGOPNAcceptsPrimitives) {
                    var cachedWindowNames = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) ? Object.getOwnPropertyNames(window) : [],
                        originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
                    overrideNative(Object, "getOwnPropertyNames", function(value) {
                        var val = ES.ToObject(value);
                        if ("[object Window]" === _toString(val)) try {
                            return originalObjectGetOwnPropertyNames(val) } catch (e) {
                            return _concat([], cachedWindowNames) }
                        return originalObjectGetOwnPropertyNames(val) }) } }
            if (Object.getOwnPropertyDescriptor) {
                var objectGOPDAcceptsPrimitives = !throwsError(function() { Object.getOwnPropertyDescriptor("foo", "bar") });
                if (!objectGOPDAcceptsPrimitives) {
                    var originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                    overrideNative(Object, "getOwnPropertyDescriptor", function(value, property) {
                        return originalObjectGetOwnPropertyDescriptor(ES.ToObject(value), property) }) } }
            if (Object.seal) {
                var objectSealAcceptsPrimitives = !throwsError(function() { Object.seal("foo") });
                if (!objectSealAcceptsPrimitives) {
                    var originalObjectSeal = Object.seal;
                    overrideNative(Object, "seal", function(value) {
                        return Type.object(value) ? originalObjectSeal(value) : value }) } }
            if (Object.isSealed) {
                var objectIsSealedAcceptsPrimitives = !throwsError(function() { Object.isSealed("foo") });
                if (!objectIsSealedAcceptsPrimitives) {
                    var originalObjectIsSealed = Object.isSealed;
                    overrideNative(Object, "isSealed", function(value) {
                        return Type.object(value) ? originalObjectIsSealed(value) : !0 }) } }
            if (Object.freeze) {
                var objectFreezeAcceptsPrimitives = !throwsError(function() { Object.freeze("foo") });
                if (!objectFreezeAcceptsPrimitives) {
                    var originalObjectFreeze = Object.freeze;
                    overrideNative(Object, "freeze", function(value) {
                        return Type.object(value) ? originalObjectFreeze(value) : value }) } }
            if (Object.isFrozen) {
                var objectIsFrozenAcceptsPrimitives = !throwsError(function() { Object.isFrozen("foo") });
                if (!objectIsFrozenAcceptsPrimitives) {
                    var originalObjectIsFrozen = Object.isFrozen;
                    overrideNative(Object, "isFrozen", function(value) {
                        return Type.object(value) ? originalObjectIsFrozen(value) : !0 }) } }
            if (Object.preventExtensions) {
                var objectPreventExtensionsAcceptsPrimitives = !throwsError(function() { Object.preventExtensions("foo") });
                if (!objectPreventExtensionsAcceptsPrimitives) {
                    var originalObjectPreventExtensions = Object.preventExtensions;
                    overrideNative(Object, "preventExtensions", function(value) {
                        return Type.object(value) ? originalObjectPreventExtensions(value) : value }) } }
            if (Object.isExtensible) {
                var objectIsExtensibleAcceptsPrimitives = !throwsError(function() { Object.isExtensible("foo") });
                if (!objectIsExtensibleAcceptsPrimitives) {
                    var originalObjectIsExtensible = Object.isExtensible;
                    overrideNative(Object, "isExtensible", function(value) {
                        return Type.object(value) ? originalObjectIsExtensible(value) : !1 }) } }
            if (Object.getPrototypeOf) {
                var objectGetProtoAcceptsPrimitives = !throwsError(function() { Object.getPrototypeOf("foo") });
                if (!objectGetProtoAcceptsPrimitives) {
                    var originalGetProto = Object.getPrototypeOf;
                    overrideNative(Object, "getPrototypeOf", function(value) {
                        return originalGetProto(ES.ToObject(value)) }) } }
            var hasFlags = supportsDescriptors && function() {
                var desc = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags");
                return desc && ES.IsCallable(desc.get) }();
            if (supportsDescriptors && !hasFlags) {
                var regExpFlagsGetter = function() {
                    if (!ES.TypeIsObject(this)) throw new TypeError("Method called on incompatible type: must be an object.");
                    var result = "";
                    return this.global && (result += "g"), this.ignoreCase && (result += "i"), this.multiline && (result += "m"), this.unicode && (result += "u"), this.sticky && (result += "y"), result };
                Value.getter(RegExp.prototype, "flags", regExpFlagsGetter) }
            var regExpSupportsFlagsWithRegex = supportsDescriptors && valueOrFalseIfThrows(function() {
                    return "/a/i" === String(new RegExp(/a/g, "i")) }),
                regExpNeedsToSupportSymbolMatch = hasSymbols && supportsDescriptors && function() {
                    var regex = /./;
                    return regex[_Symbol.match] = !1, RegExp(regex) === regex }();
            if (supportsDescriptors && (!regExpSupportsFlagsWithRegex || regExpNeedsToSupportSymbolMatch)) {
                var flagsGetter = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get,
                    sourceDesc = Object.getOwnPropertyDescriptor(RegExp.prototype, "source") || {},
                    legacySourceGetter = function() {
                        return this.source },
                    sourceGetter = ES.IsCallable(sourceDesc.get) ? sourceDesc.get : legacySourceGetter,
                    OrigRegExp = RegExp,
                    RegExpShim = function() {
                        return function RegExp(pattern, flags) {
                            var patternIsRegExp = ES.IsRegExp(pattern),
                                calledWithNew = this instanceof RegExp;
                            if (!calledWithNew && patternIsRegExp && "undefined" == typeof flags && pattern.constructor === RegExp) return pattern;
                            var P = pattern,
                                F = flags;
                            return Type.regex(pattern) ? (P = ES.Call(sourceGetter, pattern), F = "undefined" == typeof flags ? ES.Call(flagsGetter, pattern) : flags, new RegExp(P, F)) : (patternIsRegExp && (P = pattern.source, F = "undefined" == typeof flags ? pattern.flags : flags), new OrigRegExp(pattern, flags)) } }();
                wrapConstructor(OrigRegExp, RegExpShim, { $input: !0 }), RegExp = RegExpShim, Value.redefine(globals, "RegExp", RegExpShim) }
            if (supportsDescriptors) {
                var regexGlobals = { input: "$_", lastMatch: "$&", lastParen: "$+", leftContext: "$`", rightContext: "$'" };
                _forEach(keys(regexGlobals), function(prop) { prop in RegExp && !(regexGlobals[prop] in RegExp) && Value.getter(RegExp, regexGlobals[prop], function() {
                        return RegExp[prop] }) }) }
            addDefaultSpecies(RegExp);
            var inverseEpsilon = 1 / Number.EPSILON,
                roundTiesToEven = function(n) {
                    return n + inverseEpsilon - inverseEpsilon },
                BINARY_32_EPSILON = Math.pow(2, -23),
                BINARY_32_MAX_VALUE = Math.pow(2, 127) * (2 - BINARY_32_EPSILON),
                BINARY_32_MIN_VALUE = Math.pow(2, -126),
                numberCLZ = Number.prototype.clz;
            delete Number.prototype.clz;
            var MathShims = { acosh: function(value) {
                    var x = Number(value);
                    return Number.isNaN(x) || 1 > value ? 0 / 0 : 1 === x ? 0 : x === 1 / 0 ? x : _log(x / Math.E + _sqrt(x + 1) * _sqrt(x - 1) / Math.E) + 1 }, asinh: function(value) {
                    var x = Number(value);
                    return 0 !== x && globalIsFinite(x) ? 0 > x ? -Math.asinh(-x) : _log(x + _sqrt(x * x + 1)) : x }, atanh: function(value) {
                    var x = Number(value);
                    return Number.isNaN(x) || -1 > x || x > 1 ? 0 / 0 : -1 === x ? -(1 / 0) : 1 === x ? 1 / 0 : 0 === x ? x : .5 * _log((1 + x) / (1 - x)) }, cbrt: function(value) {
                    var x = Number(value);
                    if (0 === x) return x;
                    var result, negate = 0 > x;
                    return negate && (x = -x), x === 1 / 0 ? result = 1 / 0 : (result = Math.exp(_log(x) / 3), result = (x / (result * result) + 2 * result) / 3), negate ? -result : result }, clz32: function(value) {
                    var x = Number(value),
                        number = ES.ToUint32(x);
                    return 0 === number ? 32 : numberCLZ ? ES.Call(numberCLZ, number) : 31 - _floor(_log(number + .5) * Math.LOG2E) }, cosh: function(value) {
                    var x = Number(value);
                    return 0 === x ? 1 : Number.isNaN(x) ? 0 / 0 : globalIsFinite(x) ? (0 > x && (x = -x), x > 21 ? Math.exp(x) / 2 : (Math.exp(x) + Math.exp(-x)) / 2) : 1 / 0 }, expm1: function(value) {
                    var x = Number(value);
                    if (x === -(1 / 0)) return -1;
                    if (!globalIsFinite(x) || 0 === x) return x;
                    if (_abs(x) > .5) return Math.exp(x) - 1;
                    for (var t = x, sum = 0, n = 1; sum + t !== sum;) sum += t, n += 1, t *= x / n;
                    return sum }, hypot: function() {
                    for (var result = 0, largest = 0, i = 0; i < arguments.length; ++i) {
                        var value = _abs(Number(arguments[i]));
                        value > largest ? (result *= largest / value * (largest / value), result += 1, largest = value) : result += value > 0 ? value / largest * (value / largest) : value }
                    return largest === 1 / 0 ? 1 / 0 : largest * _sqrt(result) }, log2: function(value) {
                    return _log(value) * Math.LOG2E }, log10: function(value) {
                    return _log(value) * Math.LOG10E }, log1p: function(value) {
                    var x = Number(value);
                    return -1 > x || Number.isNaN(x) ? 0 / 0 : 0 === x || x === 1 / 0 ? x : -1 === x ? -(1 / 0) : 1 + x - 1 === 0 ? x : x * (_log(1 + x) / (1 + x - 1)) }, sign: function(value) {
                    var number = Number(value);
                    return 0 === number ? number : Number.isNaN(number) ? number : 0 > number ? -1 : 1 }, sinh: function(value) {
                    var x = Number(value);
                    return globalIsFinite(x) && 0 !== x ? _abs(x) < 1 ? (Math.expm1(x) - Math.expm1(-x)) / 2 : (Math.exp(x - 1) - Math.exp(-x - 1)) * Math.E / 2 : x }, tanh: function(value) {
                    var x = Number(value);
                    if (Number.isNaN(x) || 0 === x) return x;
                    if (x === 1 / 0) return 1;
                    if (x === -(1 / 0)) return -1;
                    var a = Math.expm1(x),
                        b = Math.expm1(-x);
                    return a === 1 / 0 ? 1 : b === 1 / 0 ? -1 : (a - b) / (Math.exp(x) + Math.exp(-x)) }, trunc: function(value) {
                    var x = Number(value);
                    return 0 > x ? -_floor(-x) : _floor(x) }, imul: function(x, y) {
                    var a = ES.ToUint32(x),
                        b = ES.ToUint32(y),
                        ah = a >>> 16 & 65535,
                        al = 65535 & a,
                        bh = b >>> 16 & 65535,
                        bl = 65535 & b;
                    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0 }, fround: function(x) {
                    var v = Number(x);
                    if (0 === v || v === 1 / 0 || v === -(1 / 0) || numberIsNaN(v)) return v;
                    var sign = Math.sign(v),
                        abs = _abs(v);
                    if (BINARY_32_MIN_VALUE > abs) return sign * roundTiesToEven(abs / BINARY_32_MIN_VALUE / BINARY_32_EPSILON) * BINARY_32_MIN_VALUE * BINARY_32_EPSILON;
                    var a = (1 + BINARY_32_EPSILON / Number.EPSILON) * abs,
                        result = a - (a - abs);
                    return result > BINARY_32_MAX_VALUE || numberIsNaN(result) ? sign * (1 / 0) : sign * result } };
            defineProperties(Math, MathShims), defineProperty(Math, "log1p", MathShims.log1p, -1e-17 !== Math.log1p(-1e-17)), defineProperty(Math, "asinh", MathShims.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7)), defineProperty(Math, "tanh", MathShims.tanh, -2e-17 !== Math.tanh(-2e-17)), defineProperty(Math, "acosh", MathShims.acosh, Math.acosh(Number.MAX_VALUE) === 1 / 0), defineProperty(Math, "cbrt", MathShims.cbrt, Math.abs(1 - Math.cbrt(1e-300) / 1e-100) / Number.EPSILON > 8), defineProperty(Math, "sinh", MathShims.sinh, -2e-17 !== Math.sinh(-2e-17));
            var expm1OfTen = Math.expm1(10);
            defineProperty(Math, "expm1", MathShims.expm1, expm1OfTen > 22025.465794806718 || 22025.465794806718 > expm1OfTen);
            var origMathRound = Math.round,
                roundHandlesBoundaryConditions = 0 === Math.round(.5 - Number.EPSILON / 4) && 1 === Math.round(-.5 + Number.EPSILON / 3.99),
                smallestPositiveNumberWhereRoundBreaks = inverseEpsilon + 1,
                largestPositiveNumberWhereRoundBreaks = 2 * inverseEpsilon - 1,
                roundDoesNotIncreaseIntegers = [smallestPositiveNumberWhereRoundBreaks, largestPositiveNumberWhereRoundBreaks].every(function(num) {
                    return Math.round(num) === num });
            defineProperty(Math, "round", function(x) {
                var floor = _floor(x),
                    ceil = -1 === floor ? -0 : floor + 1;
                return .5 > x - floor ? floor : ceil }, !roundHandlesBoundaryConditions || !roundDoesNotIncreaseIntegers), Value.preserveToString(Math.round, origMathRound);
            var origImul = Math.imul; - 5 !== Math.imul(4294967295, 5) && (Math.imul = MathShims.imul, Value.preserveToString(Math.imul, origImul)), 2 !== Math.imul.length && overrideNative(Math, "imul", function() {
                return ES.Call(origImul, Math, arguments) });
            var PromiseShim = function() {
                var setTimeout = globals.setTimeout;
                if ("function" == typeof setTimeout || "object" === ("undefined" == typeof setTimeout ? "undefined" : _typeof(setTimeout))) { ES.IsPromise = function(promise) {
                        return ES.TypeIsObject(promise) ? "undefined" == typeof promise._promise ? !1 : !0 : !1 };
                    var makeZeroTimeout, PromiseCapability = function(C) {
                        if (!ES.IsConstructor(C)) throw new TypeError("Bad promise constructor");
                        var capability = this,
                            resolver = function(resolve, reject) {
                                if (void 0 !== capability.resolve || void 0 !== capability.reject) throw new TypeError("Bad Promise implementation!");
                                capability.resolve = resolve, capability.reject = reject };
                        if (capability.resolve = void 0, capability.reject = void 0, capability.promise = new C(resolver), !ES.IsCallable(capability.resolve) || !ES.IsCallable(capability.reject)) throw new TypeError("Bad promise constructor") }; "undefined" != typeof window && ES.IsCallable(window.postMessage) && (makeZeroTimeout = function() {
                        var timeouts = [],
                            messageName = "zero-timeout-message",
                            setZeroTimeout = function(fn) { _push(timeouts, fn), window.postMessage(messageName, "*") },
                            handleMessage = function(event) {
                                if (event.source === window && event.data === messageName) {
                                    if (event.stopPropagation(), 0 === timeouts.length) return;
                                    var fn = _shift(timeouts);
                                    fn() } };
                        return window.addEventListener("message", handleMessage, !0), setZeroTimeout });
                    var Promise$prototype, Promise$prototype$then, makePromiseAsap = function() {
                            var P = globals.Promise,
                                pr = P && P.resolve && P.resolve();
                            return pr && function(task) {
                                return pr.then(task) } },
                        enqueue = ES.IsCallable(globals.setImmediate) ? globals.setImmediate : "object" === ("undefined" == typeof process ? "undefined" : _typeof(process)) && process.nextTick ? process.nextTick : makePromiseAsap() || (ES.IsCallable(makeZeroTimeout) ? makeZeroTimeout() : function(task) { setTimeout(task, 0) }),
                        PROMISE_IDENTITY = function(x) {
                            return x },
                        PROMISE_THROWER = function(e) {
                            throw e },
                        PROMISE_PENDING = 0,
                        PROMISE_FULFILLED = 1,
                        PROMISE_REJECTED = 2,
                        PROMISE_FULFILL_OFFSET = 0,
                        PROMISE_REJECT_OFFSET = 1,
                        PROMISE_CAPABILITY_OFFSET = 2,
                        PROMISE_FAKE_CAPABILITY = {},
                        enqueuePromiseReactionJob = function(handler, capability, argument) { enqueue(function() { promiseReactionJob(handler, capability, argument) }) },
                        promiseReactionJob = function(handler, promiseCapability, argument) {
                            var handlerResult, f;
                            if (promiseCapability === PROMISE_FAKE_CAPABILITY) return handler(argument);
                            try { handlerResult = handler(argument), f = promiseCapability.resolve } catch (e) { handlerResult = e, f = promiseCapability.reject }
                            f(handlerResult) },
                        fulfillPromise = function(promise, value) {
                            var _promise = promise._promise,
                                length = _promise.reactionLength;
                            if (length > 0 && (enqueuePromiseReactionJob(_promise.fulfillReactionHandler0, _promise.reactionCapability0, value), _promise.fulfillReactionHandler0 = void 0, _promise.rejectReactions0 = void 0, _promise.reactionCapability0 = void 0, length > 1))
                                for (var i = 1, idx = 0; length > i; i++, idx += 3) enqueuePromiseReactionJob(_promise[idx + PROMISE_FULFILL_OFFSET], _promise[idx + PROMISE_CAPABILITY_OFFSET], value), promise[idx + PROMISE_FULFILL_OFFSET] = void 0, promise[idx + PROMISE_REJECT_OFFSET] = void 0, promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
                            _promise.result = value, _promise.state = PROMISE_FULFILLED, _promise.reactionLength = 0 },
                        rejectPromise = function(promise, reason) {
                            var _promise = promise._promise,
                                length = _promise.reactionLength;
                            if (length > 0 && (enqueuePromiseReactionJob(_promise.rejectReactionHandler0, _promise.reactionCapability0, reason), _promise.fulfillReactionHandler0 = void 0, _promise.rejectReactions0 = void 0, _promise.reactionCapability0 = void 0, length > 1))
                                for (var i = 1, idx = 0; length > i; i++, idx += 3) enqueuePromiseReactionJob(_promise[idx + PROMISE_REJECT_OFFSET], _promise[idx + PROMISE_CAPABILITY_OFFSET], reason), promise[idx + PROMISE_FULFILL_OFFSET] = void 0, promise[idx + PROMISE_REJECT_OFFSET] = void 0, promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
                            _promise.result = reason, _promise.state = PROMISE_REJECTED, _promise.reactionLength = 0 },
                        createResolvingFunctions = function(promise) {
                            var alreadyResolved = !1,
                                resolve = function(resolution) {
                                    var then;
                                    if (!alreadyResolved) {
                                        if (alreadyResolved = !0, resolution === promise) return rejectPromise(promise, new TypeError("Self resolution"));
                                        if (!ES.TypeIsObject(resolution)) return fulfillPromise(promise, resolution);
                                        try { then = resolution.then } catch (e) {
                                            return rejectPromise(promise, e) }
                                        return ES.IsCallable(then) ? void enqueue(function() { promiseResolveThenableJob(promise, resolution, then) }) : fulfillPromise(promise, resolution) } },
                                reject = function(reason) {
                                    return alreadyResolved ? void 0 : (alreadyResolved = !0, rejectPromise(promise, reason)) };
                            return { resolve: resolve, reject: reject } },
                        optimizedThen = function(then, thenable, resolve, reject) { then === Promise$prototype$then ? _call(then, thenable, resolve, reject, PROMISE_FAKE_CAPABILITY) : _call(then, thenable, resolve, reject) },
                        promiseResolveThenableJob = function(promise, thenable, then) {
                            var resolvingFunctions = createResolvingFunctions(promise),
                                resolve = resolvingFunctions.resolve,
                                reject = resolvingFunctions.reject;
                            try { optimizedThen(then, thenable, resolve, reject) } catch (e) { reject(e) } },
                        Promise = function() {
                            var PromiseShim = function(resolver) {
                                if (!(this instanceof PromiseShim)) throw new TypeError('Constructor Promise requires "new"');
                                if (this && this._promise) throw new TypeError("Bad construction");
                                if (!ES.IsCallable(resolver)) throw new TypeError("not a valid resolver");
                                var promise = emulateES6construct(this, PromiseShim, Promise$prototype, { _promise: { result: void 0, state: PROMISE_PENDING, reactionLength: 0, fulfillReactionHandler0: void 0, rejectReactionHandler0: void 0, reactionCapability0: void 0 } }),
                                    resolvingFunctions = createResolvingFunctions(promise),
                                    reject = resolvingFunctions.reject;
                                try { resolver(resolvingFunctions.resolve, reject) } catch (e) { reject(e) }
                                return promise };
                            return PromiseShim }();
                    Promise$prototype = Promise.prototype;
                    var _promiseAllResolver = function(index, values, capability, remaining) {
                            var alreadyCalled = !1;
                            return function(x) {
                                if (!alreadyCalled && (alreadyCalled = !0, values[index] = x, 0 === --remaining.count)) {
                                    var resolve = capability.resolve;
                                    resolve(values) } } },
                        performPromiseAll = function(iteratorRecord, C, resultCapability) {
                            for (var next, nextValue, it = iteratorRecord.iterator, values = [], remaining = { count: 1 }, index = 0;;) {
                                try {
                                    if (next = ES.IteratorStep(it), next === !1) { iteratorRecord.done = !0;
                                        break }
                                    nextValue = next.value } catch (e) {
                                    throw iteratorRecord.done = !0, e }
                                values[index] = void 0;
                                var nextPromise = C.resolve(nextValue),
                                    resolveElement = _promiseAllResolver(index, values, resultCapability, remaining);
                                remaining.count += 1, optimizedThen(nextPromise.then, nextPromise, resolveElement, resultCapability.reject), index += 1 }
                            if (0 === --remaining.count) {
                                var resolve = resultCapability.resolve;
                                resolve(values) }
                            return resultCapability.promise },
                        performPromiseRace = function(iteratorRecord, C, resultCapability) {
                            for (var next, nextValue, nextPromise, it = iteratorRecord.iterator;;) {
                                try {
                                    if (next = ES.IteratorStep(it), next === !1) { iteratorRecord.done = !0;
                                        break }
                                    nextValue = next.value } catch (e) {
                                    throw iteratorRecord.done = !0, e }
                                nextPromise = C.resolve(nextValue), optimizedThen(nextPromise.then, nextPromise, resultCapability.resolve, resultCapability.reject) }
                            return resultCapability.promise };
                    return defineProperties(Promise, { all: function(iterable) {
                            var C = this;
                            if (!ES.TypeIsObject(C)) throw new TypeError("Promise is not object");
                            var iterator, iteratorRecord, capability = new PromiseCapability(C);
                            try {
                                return iterator = ES.GetIterator(iterable), iteratorRecord = { iterator: iterator, done: !1 }, performPromiseAll(iteratorRecord, C, capability) } catch (e) {
                                var exception = e;
                                if (iteratorRecord && !iteratorRecord.done) try { ES.IteratorClose(iterator, !0) } catch (ee) { exception = ee }
                                var reject = capability.reject;
                                return reject(exception), capability.promise } }, race: function(iterable) {
                            var C = this;
                            if (!ES.TypeIsObject(C)) throw new TypeError("Promise is not object");
                            var iterator, iteratorRecord, capability = new PromiseCapability(C);
                            try {
                                return iterator = ES.GetIterator(iterable), iteratorRecord = { iterator: iterator, done: !1 }, performPromiseRace(iteratorRecord, C, capability) } catch (e) {
                                var exception = e;
                                if (iteratorRecord && !iteratorRecord.done) try { ES.IteratorClose(iterator, !0) } catch (ee) { exception = ee }
                                var reject = capability.reject;
                                return reject(exception), capability.promise } }, reject: function(reason) {
                            var C = this;
                            if (!ES.TypeIsObject(C)) throw new TypeError("Bad promise constructor");
                            var capability = new PromiseCapability(C),
                                rejectFunc = capability.reject;
                            return rejectFunc(reason), capability.promise }, resolve: function(v) {
                            var C = this;
                            if (!ES.TypeIsObject(C)) throw new TypeError("Bad promise constructor");
                            if (ES.IsPromise(v)) {
                                var constructor = v.constructor;
                                if (constructor === C) return v }
                            var capability = new PromiseCapability(C),
                                resolveFunc = capability.resolve;
                            return resolveFunc(v), capability.promise } }), defineProperties(Promise$prototype, { "catch": function(onRejected) {
                            return this.then(null, onRejected) }, then: function(onFulfilled, onRejected) {
                            var promise = this;
                            if (!ES.IsPromise(promise)) throw new TypeError("not a promise");
                            var resultCapability, C = ES.SpeciesConstructor(promise, Promise),
                                returnValueIsIgnored = arguments.length > 2 && arguments[2] === PROMISE_FAKE_CAPABILITY;
                            resultCapability = returnValueIsIgnored && C === Promise ? PROMISE_FAKE_CAPABILITY : new PromiseCapability(C);
                            var value, fulfillReactionHandler = ES.IsCallable(onFulfilled) ? onFulfilled : PROMISE_IDENTITY,
                                rejectReactionHandler = ES.IsCallable(onRejected) ? onRejected : PROMISE_THROWER,
                                _promise = promise._promise;
                            if (_promise.state === PROMISE_PENDING) {
                                if (0 === _promise.reactionLength) _promise.fulfillReactionHandler0 = fulfillReactionHandler, _promise.rejectReactionHandler0 = rejectReactionHandler, _promise.reactionCapability0 = resultCapability;
                                else {
                                    var idx = 3 * (_promise.reactionLength - 1);
                                    _promise[idx + PROMISE_FULFILL_OFFSET] = fulfillReactionHandler, _promise[idx + PROMISE_REJECT_OFFSET] = rejectReactionHandler, _promise[idx + PROMISE_CAPABILITY_OFFSET] = resultCapability }
                                _promise.reactionLength += 1 } else if (_promise.state === PROMISE_FULFILLED) value = _promise.result, enqueuePromiseReactionJob(fulfillReactionHandler, resultCapability, value);
                            else {
                                if (_promise.state !== PROMISE_REJECTED) throw new TypeError("unexpected Promise state");
                                value = _promise.result, enqueuePromiseReactionJob(rejectReactionHandler, resultCapability, value) }
                            return resultCapability.promise } }), PROMISE_FAKE_CAPABILITY = new PromiseCapability(Promise), Promise$prototype$then = Promise$prototype.then, Promise } }();
            if (globals.Promise && (delete globals.Promise.accept, delete globals.Promise.defer, delete globals.Promise.prototype.chain), "function" == typeof PromiseShim) { defineProperties(globals, { Promise: PromiseShim });
                var promiseSupportsSubclassing = supportsSubclassing(globals.Promise, function(S) {
                        return S.resolve(42).then(function() {}) instanceof S }),
                    promiseIgnoresNonFunctionThenCallbacks = !throwsError(function() { globals.Promise.reject(42).then(null, 5).then(null, noop) }),
                    promiseRequiresObjectContext = throwsError(function() { globals.Promise.call(3, noop) }),
                    promiseResolveBroken = function(Promise) {
                        var p = Promise.resolve(5);
                        p.constructor = {};
                        var p2 = Promise.resolve(p);
                        try { p2.then(null, noop).then(null, noop) } catch (e) {
                            return !0 }
                        return p === p2 }(globals.Promise),
                    getsThenSynchronously = supportsDescriptors && function() {
                        var count = 0,
                            thenable = Object.defineProperty({}, "then", { get: function() { count += 1 } });
                        return Promise.resolve(thenable), 1 === count }(),
                    BadResolverPromise = function BadResolverPromise(executor) {
                        var p = new Promise(executor);
                        executor(3, function() {}), this.then = p.then, this.constructor = BadResolverPromise };
                BadResolverPromise.prototype = Promise.prototype, BadResolverPromise.all = Promise.all;
                var hasBadResolverPromise = valueOrFalseIfThrows(function() {
                    return !!BadResolverPromise.all([1, 2]) });
                if (promiseSupportsSubclassing && promiseIgnoresNonFunctionThenCallbacks && promiseRequiresObjectContext && !promiseResolveBroken && getsThenSynchronously && !hasBadResolverPromise || (Promise = PromiseShim, overrideNative(globals, "Promise", PromiseShim)), 1 !== Promise.all.length) {
                    var origAll = Promise.all;
                    overrideNative(Promise, "all", function() {
                        return ES.Call(origAll, this, arguments) }) }
                if (1 !== Promise.race.length) {
                    var origRace = Promise.race;
                    overrideNative(Promise, "race", function() {
                        return ES.Call(origRace, this, arguments) }) }
                if (1 !== Promise.resolve.length) {
                    var origResolve = Promise.resolve;
                    overrideNative(Promise, "resolve", function() {
                        return ES.Call(origResolve, this, arguments) }) }
                if (1 !== Promise.reject.length) {
                    var origReject = Promise.reject;
                    overrideNative(Promise, "reject", function() {
                        return ES.Call(origReject, this, arguments) }) }
                ensureEnumerable(Promise, "all"), ensureEnumerable(Promise, "race"), ensureEnumerable(Promise, "resolve"), ensureEnumerable(Promise, "reject"), addDefaultSpecies(Promise) }
            var testOrder = function(a) {
                    var b = keys(_reduce(a, function(o, k) {
                        return o[k] = !0, o }, {}));
                    return a.join(":") === b.join(":") },
                preservesInsertionOrder = testOrder(["z", "a", "bb"]),
                preservesNumericInsertionOrder = testOrder(["z", 1, "a", "3", 2]);
            if (supportsDescriptors) {
                var fastkey = function(key) {
                        return preservesInsertionOrder ? "undefined" == typeof key || null === key ? "^" + ES.ToString(key) : "string" == typeof key ? "$" + key : "number" == typeof key ? preservesNumericInsertionOrder ? key : "n" + key : "boolean" == typeof key ? "b" + key : null : null },
                    emptyObject = function() {
                        return Object.create ? Object.create(null) : {} },
                    addIterableToMap = function(MapConstructor, map, iterable) {
                        if (isArray(iterable) || Type.string(iterable)) _forEach(iterable, function(entry) {
                            if (!ES.TypeIsObject(entry)) throw new TypeError("Iterator value " + entry + " is not an entry object");
                            map.set(entry[0], entry[1]) });
                        else if (iterable instanceof MapConstructor) _call(MapConstructor.prototype.forEach, iterable, function(value, key) { map.set(key, value) });
                        else {
                            var iter, adder;
                            if (null !== iterable && "undefined" != typeof iterable) {
                                if (adder = map.set, !ES.IsCallable(adder)) throw new TypeError("bad map");
                                iter = ES.GetIterator(iterable) }
                            if ("undefined" != typeof iter)
                                for (;;) {
                                    var next = ES.IteratorStep(iter);
                                    if (next === !1) break;
                                    var nextItem = next.value;
                                    try {
                                        if (!ES.TypeIsObject(nextItem)) throw new TypeError("Iterator value " + nextItem + " is not an entry object");
                                        _call(adder, map, nextItem[0], nextItem[1]) } catch (e) {
                                        throw ES.IteratorClose(iter, !0), e } } } },
                    addIterableToSet = function(SetConstructor, set, iterable) {
                        if (isArray(iterable) || Type.string(iterable)) _forEach(iterable, function(value) { set.add(value) });
                        else if (iterable instanceof SetConstructor) _call(SetConstructor.prototype.forEach, iterable, function(value) { set.add(value) });
                        else {
                            var iter, adder;
                            if (null !== iterable && "undefined" != typeof iterable) {
                                if (adder = set.add, !ES.IsCallable(adder)) throw new TypeError("bad set");
                                iter = ES.GetIterator(iterable) }
                            if ("undefined" != typeof iter)
                                for (;;) {
                                    var next = ES.IteratorStep(iter);
                                    if (next === !1) break;
                                    var nextValue = next.value;
                                    try { _call(adder, set, nextValue) } catch (e) {
                                        throw ES.IteratorClose(iter, !0), e } } } },
                    collectionShims = {
                        Map: function() {
                            var empty = {},
                                MapEntry = function(key, value) { this.key = key, this.value = value, this.next = null, this.prev = null };
                            MapEntry.prototype.isRemoved = function() {
                                return this.key === empty };
                            var isMap = function(map) {
                                    return !!map._es6map },
                                requireMapSlot = function(map, method) {
                                    if (!ES.TypeIsObject(map) || !isMap(map)) throw new TypeError("Method Map.prototype." + method + " called on incompatible receiver " + ES.ToString(map)) },
                                MapIterator = function(map, kind) { requireMapSlot(map, "[[MapIterator]]"), this.head = map._head, this.i = this.head, this.kind = kind };
                            MapIterator.prototype = { next: function() {
                                    var result, i = this.i,
                                        kind = this.kind,
                                        head = this.head;
                                    if ("undefined" == typeof this.i) return { value: void 0, done: !0 };
                                    for (; i.isRemoved() && i !== head;) i = i.prev;
                                    for (; i.next !== head;)
                                        if (i = i.next, !i.isRemoved()) return result = "key" === kind ? i.key : "value" === kind ? i.value : [i.key, i.value], this.i = i, { value: result, done: !1 };
                                    return this.i = void 0, { value: void 0, done: !0 } } }, addIterator(MapIterator.prototype);
                            var Map$prototype, MapShim = function Map() {
                                if (!(this instanceof Map)) throw new TypeError('Constructor Map requires "new"');
                                if (this && this._es6map) throw new TypeError("Bad construction");
                                var map = emulateES6construct(this, Map, Map$prototype, { _es6map: !0, _head: null, _storage: emptyObject(), _size: 0 }),
                                    head = new MapEntry(null, null);
                                return head.next = head.prev = head, map._head = head, arguments.length > 0 && addIterableToMap(Map, map, arguments[0]), map };
                            return Map$prototype = MapShim.prototype, Value.getter(Map$prototype, "size", function() {
                                if ("undefined" == typeof this._size) throw new TypeError("size method called on incompatible Map");
                                return this._size }), defineProperties(Map$prototype, { get: function(key) { requireMapSlot(this, "get");
                                    var fkey = fastkey(key);
                                    if (null !== fkey) {
                                        var entry = this._storage[fkey];
                                        return entry ? entry.value : void 0 }
                                    for (var head = this._head, i = head;
                                        (i = i.next) !== head;)
                                        if (ES.SameValueZero(i.key, key)) return i.value }, has: function(key) { requireMapSlot(this, "has");
                                    var fkey = fastkey(key);
                                    if (null !== fkey) return "undefined" != typeof this._storage[fkey];
                                    for (var head = this._head, i = head;
                                        (i = i.next) !== head;)
                                        if (ES.SameValueZero(i.key, key)) return !0;
                                    return !1 }, set: function(key, value) { requireMapSlot(this, "set");
                                    var entry, head = this._head,
                                        i = head,
                                        fkey = fastkey(key);
                                    if (null !== fkey) {
                                        if ("undefined" != typeof this._storage[fkey]) return this._storage[fkey].value = value, this;
                                        entry = this._storage[fkey] = new MapEntry(key, value), i = head.prev }
                                    for (;
                                        (i = i.next) !== head;)
                                        if (ES.SameValueZero(i.key, key)) return i.value = value, this;
                                    return entry = entry || new MapEntry(key, value), ES.SameValue(-0, key) && (entry.key = 0), entry.next = this._head, entry.prev = this._head.prev, entry.prev.next = entry, entry.next.prev = entry, this._size += 1, this }, "delete": function(key) { requireMapSlot(this, "delete");
                                    var head = this._head,
                                        i = head,
                                        fkey = fastkey(key);
                                    if (null !== fkey) {
                                        if ("undefined" == typeof this._storage[fkey]) return !1;
                                        i = this._storage[fkey].prev, delete this._storage[fkey] }
                                    for (;
                                        (i = i.next) !== head;)
                                        if (ES.SameValueZero(i.key, key)) return i.key = i.value = empty, i.prev.next = i.next, i.next.prev = i.prev, this._size -= 1, !0;
                                    return !1 }, clear: function() { requireMapSlot(this, "clear"), this._size = 0, this._storage = emptyObject();
                                    for (var head = this._head, i = head, p = i.next;
                                        (i = p) !== head;) i.key = i.value = empty, p = i.next, i.next = i.prev = head;
                                    head.next = head.prev = head }, keys: function() {
                                    return requireMapSlot(this, "keys"), new MapIterator(this, "key") }, values: function() {
                                    return requireMapSlot(this, "values"), new MapIterator(this, "value") }, entries: function() {
                                    return requireMapSlot(this, "entries"), new MapIterator(this, "key+value") }, forEach: function(callback) { requireMapSlot(this, "forEach");
                                    for (var context = arguments.length > 1 ? arguments[1] : null, it = this.entries(), entry = it.next(); !entry.done; entry = it.next()) context ? _call(callback, context, entry.value[1], entry.value[0], this) : callback(entry.value[1], entry.value[0], this) } }), addIterator(Map$prototype, Map$prototype.entries), MapShim }(),
                        Set: function() {
                            var Set$prototype, isSet = function(set) {
                                    return set._es6set && "undefined" != typeof set._storage },
                                requireSetSlot = function(set, method) {
                                    if (!ES.TypeIsObject(set) || !isSet(set)) throw new TypeError("Set.prototype." + method + " called on incompatible receiver " + ES.ToString(set)) },
                                SetShim = function Set() {
                                    if (!(this instanceof Set)) throw new TypeError('Constructor Set requires "new"');
                                    if (this && this._es6set) throw new TypeError("Bad construction");
                                    var set = emulateES6construct(this, Set, Set$prototype, { _es6set: !0, "[[SetData]]": null, _storage: emptyObject() });
                                    if (!set._es6set) throw new TypeError("bad set");
                                    return arguments.length > 0 && addIterableToSet(Set, set, arguments[0]), set };
                            Set$prototype = SetShim.prototype;
                            var decodeKey = function(key) {
                                    var k = key;
                                    if ("^null" === k) return null;
                                    if ("^undefined" === k) return void 0;
                                    var first = k.charAt(0);
                                    return "$" === first ? _strSlice(k, 1) : "n" === first ? +_strSlice(k, 1) : "b" === first ? "btrue" === k : +k },
                                ensureMap = function(set) {
                                    if (!set["[[SetData]]"]) {
                                        var m = set["[[SetData]]"] = new collectionShims.Map;
                                        _forEach(keys(set._storage), function(key) {
                                            var k = decodeKey(key);
                                            m.set(k, k) }), set["[[SetData]]"] = m }
                                    set._storage = null };
                            return Value.getter(SetShim.prototype, "size", function() {
                                return requireSetSlot(this, "size"), this._storage ? keys(this._storage).length : (ensureMap(this), this["[[SetData]]"].size) }), defineProperties(SetShim.prototype, {
                                has: function(key) { requireSetSlot(this, "has");
                                    var fkey;
                                    return this._storage && null !== (fkey = fastkey(key)) ? !!this._storage[fkey] : (ensureMap(this), this["[[SetData]]"].has(key)) },
                                add: function(key) { requireSetSlot(this, "add");
                                    var fkey;
                                    return this._storage && null !== (fkey = fastkey(key)) ? (this._storage[fkey] = !0, this) : (ensureMap(this), this["[[SetData]]"].set(key, key), this) },
                                "delete": function(key) { requireSetSlot(this, "delete");
                                    var fkey;
                                    if (this._storage && null !== (fkey = fastkey(key))) {
                                        var hasFKey = _hasOwnProperty(this._storage, fkey);
                                        return delete this._storage[fkey] && hasFKey }
                                    return ensureMap(this), this["[[SetData]]"]["delete"](key) },
                                clear: function() { requireSetSlot(this, "clear"), this._storage && (this._storage = emptyObject()), this["[[SetData]]"] && this["[[SetData]]"].clear() },
                                values: function() {
                                    return requireSetSlot(this, "values"), ensureMap(this), this["[[SetData]]"].values() },
                                entries: function() {
                                    return requireSetSlot(this, "entries"), ensureMap(this), this["[[SetData]]"].entries() },
                                forEach: function(callback) { requireSetSlot(this, "forEach");
                                    var context = arguments.length > 1 ? arguments[1] : null,
                                        entireSet = this;
                                    ensureMap(entireSet), this["[[SetData]]"].forEach(function(value, key) { context ? _call(callback, context, key, key, entireSet) : callback(key, key, entireSet) }) }
                            }), defineProperty(SetShim.prototype, "keys", SetShim.prototype.values, !0), addIterator(SetShim.prototype, SetShim.prototype.values), SetShim
                        }()
                    };
                if (globals.Map || globals.Set) {
                    var mapAcceptsArguments = valueOrFalseIfThrows(function() {
                        return 2 === new Map([
                            [1, 2]
                        ]).get(1) });
                    if (!mapAcceptsArguments) {
                        var OrigMapNoArgs = globals.Map;
                        globals.Map = function Map() {
                            if (!(this instanceof Map)) throw new TypeError('Constructor Map requires "new"');
                            var m = new OrigMapNoArgs;
                            return arguments.length > 0 && addIterableToMap(Map, m, arguments[0]), delete m.constructor, Object.setPrototypeOf(m, globals.Map.prototype), m }, globals.Map.prototype = create(OrigMapNoArgs.prototype), defineProperty(globals.Map.prototype, "constructor", globals.Map, !0), Value.preserveToString(globals.Map, OrigMapNoArgs) }
                    var testMap = new Map,
                        mapUsesSameValueZero = function() {
                            var m = new Map([
                                [1, 0],
                                [2, 0],
                                [3, 0],
                                [4, 0]
                            ]);
                            return m.set(-0, m), m.get(0) === m && m.get(-0) === m && m.has(0) && m.has(-0) }(),
                        mapSupportsChaining = testMap.set(1, 2) === testMap;
                    if (!mapUsesSameValueZero || !mapSupportsChaining) {
                        var origMapSet = Map.prototype.set;
                        overrideNative(Map.prototype, "set", function(k, v) {
                            return _call(origMapSet, this, 0 === k ? 0 : k, v), this }) }
                    if (!mapUsesSameValueZero) {
                        var origMapGet = Map.prototype.get,
                            origMapHas = Map.prototype.has;
                        defineProperties(Map.prototype, { get: function(k) {
                                return _call(origMapGet, this, 0 === k ? 0 : k) }, has: function(k) {
                                return _call(origMapHas, this, 0 === k ? 0 : k) } }, !0), Value.preserveToString(Map.prototype.get, origMapGet), Value.preserveToString(Map.prototype.has, origMapHas) }
                    var testSet = new Set,
                        setUsesSameValueZero = function(s) {
                            return s["delete"](0), s.add(-0), !s.has(0) }(testSet),
                        setSupportsChaining = testSet.add(1) === testSet;
                    if (!setUsesSameValueZero || !setSupportsChaining) {
                        var origSetAdd = Set.prototype.add;
                        Set.prototype.add = function(v) {
                            return _call(origSetAdd, this, 0 === v ? 0 : v), this }, Value.preserveToString(Set.prototype.add, origSetAdd) }
                    if (!setUsesSameValueZero) {
                        var origSetHas = Set.prototype.has;
                        Set.prototype.has = function(v) {
                            return _call(origSetHas, this, 0 === v ? 0 : v) }, Value.preserveToString(Set.prototype.has, origSetHas);
                        var origSetDel = Set.prototype["delete"];
                        Set.prototype["delete"] = function(v) {
                            return _call(origSetDel, this, 0 === v ? 0 : v) }, Value.preserveToString(Set.prototype["delete"], origSetDel) }
                    var mapSupportsSubclassing = supportsSubclassing(globals.Map, function(M) {
                            var m = new M([]);
                            return m.set(42, 42), m instanceof M }),
                        mapFailsToSupportSubclassing = Object.setPrototypeOf && !mapSupportsSubclassing,
                        mapRequiresNew = function() {
                            try {
                                return !(globals.Map() instanceof globals.Map) } catch (e) {
                                return e instanceof TypeError } }();
                    if (0 !== globals.Map.length || mapFailsToSupportSubclassing || !mapRequiresNew) {
                        var OrigMap = globals.Map;
                        globals.Map = function Map() {
                            if (!(this instanceof Map)) throw new TypeError('Constructor Map requires "new"');
                            var m = new OrigMap;
                            return arguments.length > 0 && addIterableToMap(Map, m, arguments[0]), delete m.constructor, Object.setPrototypeOf(m, Map.prototype), m }, globals.Map.prototype = OrigMap.prototype, defineProperty(globals.Map.prototype, "constructor", globals.Map, !0), Value.preserveToString(globals.Map, OrigMap) }
                    var setSupportsSubclassing = supportsSubclassing(globals.Set, function(S) {
                            var s = new S([]);
                            return s.add(42, 42), s instanceof S }),
                        setFailsToSupportSubclassing = Object.setPrototypeOf && !setSupportsSubclassing,
                        setRequiresNew = function() {
                            try {
                                return !(globals.Set() instanceof globals.Set) } catch (e) {
                                return e instanceof TypeError } }();
                    if (0 !== globals.Set.length || setFailsToSupportSubclassing || !setRequiresNew) {
                        var OrigSet = globals.Set;
                        globals.Set = function Set() {
                            if (!(this instanceof Set)) throw new TypeError('Constructor Set requires "new"');
                            var s = new OrigSet;
                            return arguments.length > 0 && addIterableToSet(Set, s, arguments[0]), delete s.constructor, Object.setPrototypeOf(s, Set.prototype), s }, globals.Set.prototype = OrigSet.prototype, defineProperty(globals.Set.prototype, "constructor", globals.Set, !0), Value.preserveToString(globals.Set, OrigSet) }
                    var mapIterationThrowsStopIterator = !valueOrFalseIfThrows(function() {
                        return (new Map).keys().next().done });
                    if (("function" != typeof globals.Map.prototype.clear || 0 !== (new globals.Set).size || 0 !== (new globals.Map).size || "function" != typeof globals.Map.prototype.keys || "function" != typeof globals.Set.prototype.keys || "function" != typeof globals.Map.prototype.forEach || "function" != typeof globals.Set.prototype.forEach || isCallableWithoutNew(globals.Map) || isCallableWithoutNew(globals.Set) || "function" != typeof(new globals.Map).keys().next || mapIterationThrowsStopIterator || !mapSupportsSubclassing) && defineProperties(globals, { Map: collectionShims.Map, Set: collectionShims.Set }, !0), globals.Set.prototype.keys !== globals.Set.prototype.values && defineProperty(globals.Set.prototype, "keys", globals.Set.prototype.values, !0), addIterator(Object.getPrototypeOf((new globals.Map).keys())), addIterator(Object.getPrototypeOf((new globals.Set).keys())), functionsHaveNames && "has" !== globals.Set.prototype.has.name) {
                        var anonymousSetHas = globals.Set.prototype.has;
                        overrideNative(globals.Set.prototype, "has", function(key) {
                            return _call(anonymousSetHas, this, key) }) } }
                defineProperties(globals, collectionShims), addDefaultSpecies(globals.Map), addDefaultSpecies(globals.Set)
            }
            var throwUnlessTargetIsObject = function(target) {
                    if (!ES.TypeIsObject(target)) throw new TypeError("target must be an object") },
                ReflectShims = { apply: function() {
                        return ES.Call(ES.Call, null, arguments) }, construct: function(constructor, args) {
                        if (!ES.IsConstructor(constructor)) throw new TypeError("First argument must be a constructor.");
                        var newTarget = arguments.length > 2 ? arguments[2] : constructor;
                        if (!ES.IsConstructor(newTarget)) throw new TypeError("new.target must be a constructor.");
                        return ES.Construct(constructor, args, newTarget, "internal") }, deleteProperty: function(target, key) {
                        if (throwUnlessTargetIsObject(target), supportsDescriptors) {
                            var desc = Object.getOwnPropertyDescriptor(target, key);
                            if (desc && !desc.configurable) return !1 }
                        return delete target[key] }, enumerate: function(target) {
                        return throwUnlessTargetIsObject(target), new ObjectIterator(target, "key") }, has: function(target, key) {
                        return throwUnlessTargetIsObject(target), key in target } };
            Object.getOwnPropertyNames && Object.assign(ReflectShims, { ownKeys: function(target) { throwUnlessTargetIsObject(target);
                    var keys = Object.getOwnPropertyNames(target);
                    return ES.IsCallable(Object.getOwnPropertySymbols) && _pushApply(keys, Object.getOwnPropertySymbols(target)), keys } });
            var callAndCatchException = function(func) {
                return !throwsError(func) };
            if (Object.preventExtensions && Object.assign(ReflectShims, { isExtensible: function(target) {
                        return throwUnlessTargetIsObject(target), Object.isExtensible(target) }, preventExtensions: function(target) {
                        return throwUnlessTargetIsObject(target), callAndCatchException(function() { Object.preventExtensions(target) }) } }), supportsDescriptors) {
                var internalGet = function(target, key, receiver) {
                        var desc = Object.getOwnPropertyDescriptor(target, key);
                        if (!desc) {
                            var parent = Object.getPrototypeOf(target);
                            return null === parent ? void 0 : internalGet(parent, key, receiver) }
                        return "value" in desc ? desc.value : desc.get ? ES.Call(desc.get, receiver) : void 0 },
                    internalSet = function(target, key, value, receiver) {
                        var desc = Object.getOwnPropertyDescriptor(target, key);
                        if (!desc) {
                            var parent = Object.getPrototypeOf(target);
                            if (null !== parent) return internalSet(parent, key, value, receiver);
                            desc = { value: void 0, writable: !0, enumerable: !0, configurable: !0 } }
                        if ("value" in desc) {
                            if (!desc.writable) return !1;
                            if (!ES.TypeIsObject(receiver)) return !1;
                            var existingDesc = Object.getOwnPropertyDescriptor(receiver, key);
                            return existingDesc ? Reflect.defineProperty(receiver, key, { value: value }) : Reflect.defineProperty(receiver, key, { value: value, writable: !0, enumerable: !0, configurable: !0 }) }
                        return desc.set ? (_call(desc.set, receiver, value), !0) : !1 };
                Object.assign(ReflectShims, { defineProperty: function(target, propertyKey, attributes) {
                        return throwUnlessTargetIsObject(target), callAndCatchException(function() { Object.defineProperty(target, propertyKey, attributes) }) }, getOwnPropertyDescriptor: function(target, propertyKey) {
                        return throwUnlessTargetIsObject(target), Object.getOwnPropertyDescriptor(target, propertyKey) }, get: function(target, key) { throwUnlessTargetIsObject(target);
                        var receiver = arguments.length > 2 ? arguments[2] : target;
                        return internalGet(target, key, receiver) }, set: function(target, key, value) { throwUnlessTargetIsObject(target);
                        var receiver = arguments.length > 3 ? arguments[3] : target;
                        return internalSet(target, key, value, receiver) } }) }
            if (Object.getPrototypeOf) {
                var objectDotGetPrototypeOf = Object.getPrototypeOf;
                ReflectShims.getPrototypeOf = function(target) {
                    return throwUnlessTargetIsObject(target), objectDotGetPrototypeOf(target) } }
            if (Object.setPrototypeOf && ReflectShims.getPrototypeOf) {
                var willCreateCircularPrototype = function(object, lastProto) {
                    for (var proto = lastProto; proto;) {
                        if (object === proto) return !0;
                        proto = ReflectShims.getPrototypeOf(proto) }
                    return !1 };
                Object.assign(ReflectShims, { setPrototypeOf: function(object, proto) {
                        if (throwUnlessTargetIsObject(object), null !== proto && !ES.TypeIsObject(proto)) throw new TypeError("proto must be an object or null");
                        return proto === Reflect.getPrototypeOf(object) ? !0 : Reflect.isExtensible && !Reflect.isExtensible(object) ? !1 : willCreateCircularPrototype(object, proto) ? !1 : (Object.setPrototypeOf(object, proto), !0) } }) }
            var defineOrOverrideReflectProperty = function(key, shim) {
                if (ES.IsCallable(globals.Reflect[key])) {
                    var acceptsPrimitives = valueOrFalseIfThrows(function() {
                        return globals.Reflect[key](1), globals.Reflect[key](0 / 0), globals.Reflect[key](!0), !0 });
                    acceptsPrimitives && overrideNative(globals.Reflect, key, shim) } else defineProperty(globals.Reflect, key, shim) };
            if (Object.keys(ReflectShims).forEach(function(key) { defineOrOverrideReflectProperty(key, ReflectShims[key]) }), functionsHaveNames && "getPrototypeOf" !== globals.Reflect.getPrototypeOf.name) {
                var originalReflectGetProto = globals.Reflect.getPrototypeOf;
                overrideNative(globals.Reflect, "getPrototypeOf", function(target) {
                    return _call(originalReflectGetProto, globals.Reflect, target) }) }
            if (globals.Reflect.setPrototypeOf && valueOrFalseIfThrows(function() {
                    return globals.Reflect.setPrototypeOf(1, {}), !0 }) && overrideNative(globals.Reflect, "setPrototypeOf", ReflectShims.setPrototypeOf), globals.Reflect.defineProperty && (valueOrFalseIfThrows(function() {
                    var basic = !globals.Reflect.defineProperty(1, "test", { value: 1 }),
                        extensible = "function" != typeof Object.preventExtensions || !globals.Reflect.defineProperty(Object.preventExtensions({}), "test", {});
                    return basic && extensible }) || overrideNative(globals.Reflect, "defineProperty", ReflectShims.defineProperty)), globals.Reflect.construct && (valueOrFalseIfThrows(function() {
                    var F = function() {};
                    return globals.Reflect.construct(function() {}, [], F) instanceof F }) || overrideNative(globals.Reflect, "construct", ReflectShims.construct)), "Invalid Date" !== String(new Date(0 / 0))) {
                var dateToString = Date.prototype.toString,
                    shimmedDateToString = function() {
                        var valueOf = +this;
                        return valueOf !== valueOf ? "Invalid Date" : ES.Call(dateToString, this) };
                overrideNative(Date.prototype, "toString", shimmedDateToString) }
            var stringHTMLshims = { anchor: function(name) {
                    return ES.CreateHTML(this, "a", "name", name) }, big: function() {
                    return ES.CreateHTML(this, "big", "", "") }, blink: function() {
                    return ES.CreateHTML(this, "blink", "", "") }, bold: function() {
                    return ES.CreateHTML(this, "b", "", "") }, fixed: function() {
                    return ES.CreateHTML(this, "tt", "", "") }, fontcolor: function(color) {
                    return ES.CreateHTML(this, "font", "color", color) }, fontsize: function(size) {
                    return ES.CreateHTML(this, "font", "size", size) }, italics: function() {
                    return ES.CreateHTML(this, "i", "", "") }, link: function(url) {
                    return ES.CreateHTML(this, "a", "href", url) }, small: function() {
                    return ES.CreateHTML(this, "small", "", "") }, strike: function() {
                    return ES.CreateHTML(this, "strike", "", "") }, sub: function() {
                    return ES.CreateHTML(this, "sub", "", "") }, sup: function() {
                    return ES.CreateHTML(this, "sup", "", "") } };
            _forEach(Object.keys(stringHTMLshims), function(key) {
                var method = String.prototype[key],
                    shouldOverwrite = !1;
                if (ES.IsCallable(method)) {
                    var output = _call(method, "", ' " '),
                        quotesCount = _concat([], output.match(/"/g)).length;
                    shouldOverwrite = output !== output.toLowerCase() || quotesCount > 2 } else shouldOverwrite = !0;
                shouldOverwrite && overrideNative(String.prototype, key, stringHTMLshims[key]) });
            var JSONstringifiesSymbols = function() {
                    if (!hasSymbols) return !1;
                    var stringify = "object" === ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && "function" == typeof JSON.stringify ? JSON.stringify : null;
                    if (!stringify) return !1;
                    if ("undefined" != typeof stringify(_Symbol())) return !0;
                    if ("[null]" !== stringify([_Symbol()])) return !0;
                    var obj = { a: _Symbol() };
                    return obj[_Symbol()] = !0, "{}" !== stringify(obj) ? !0 : !1 }(),
                JSONstringifyAcceptsObjectSymbol = valueOrFalseIfThrows(function() {
                    return hasSymbols ? "{}" === JSON.stringify(Object(_Symbol())) && "[{}]" === JSON.stringify([Object(_Symbol())]) : !0 });
            if (JSONstringifiesSymbols || !JSONstringifyAcceptsObjectSymbol) {
                var origStringify = JSON.stringify;
                overrideNative(JSON, "stringify", function(value) {
                    if ("symbol" !== ("undefined" == typeof value ? "undefined" : _typeof(value))) {
                        var replacer;
                        arguments.length > 1 && (replacer = arguments[1]);
                        var args = [value];
                        if (isArray(replacer)) args.push(replacer);
                        else {
                            var replaceFn = ES.IsCallable(replacer) ? replacer : null,
                                wrappedReplacer = function(key, val) {
                                    var parsedValue = replaceFn ? _call(replaceFn, this, key, val) : val;
                                    return "symbol" !== ("undefined" == typeof parsedValue ? "undefined" : _typeof(parsedValue)) ? Type.symbol(parsedValue) ? assignTo({})(parsedValue) : parsedValue : void 0 };
                            args.push(wrappedReplacer) }
                        return arguments.length > 2 && args.push(arguments[2]), origStringify.apply(this, args) } }) }
            return globals
        }), define("jqueryplugins", ["jquery"], function($) { $.prototype.extend({ popAttr: function(attr) {
                    var ret = this.attr(attr);
                    return this.removeAttr(attr), ret }, popData: function(name) {
                    var ret = this.data(name);
                    return this.removeData(name), ret }, tag: function() {
                    return this[0] && this[0].tagName && this[0].tagName.toLowerCase() }, textNodes: function() {
                    return 1 === this.length && this[0] instanceof Text ? [this[0]] : Array.from(this.add(this.contents().add(this.find("*").contents())).filter(function() {
                        return this instanceof Text })).sort(function(left, right) {
                        return 2 & left.compareDocumentPosition(right) ? 1 : -1 }) }, prevTextNode: function() {
                    var elem = this.first()[0],
                        parent = this.parent();
                    if (!parent.length) return null;
                    var textNodes = parent.textNodes().filter(function(e) {
                        var pos = e.compareDocumentPosition(elem);
                        return 4 & pos && !(8 & pos) });
                    return textNodes = textNodes[textNodes.length - 1], textNodes ? textNodes : parent.prevTextNode() }, nextTextNode: function() {
                    var elem = this.last()[0],
                        parent = this.parent();
                    if (!parent.length) return null;
                    var textNodes = parent.textNodes().filter(function(e) {
                        var pos = e.compareDocumentPosition(elem);
                        return 2 & pos && !(8 & pos) })[0];
                    return textNodes ? textNodes : parent.nextTextNode() } }) }),
        function() {
            function Token() {
                for (var i = 0; i < arguments.length; i++)
                    for (var j in arguments[i]) this[j] = arguments[i][j] }

            function cacheChildPos(token, childToken) { token.childAt = token.childAt || {};
                for (var i = childToken.start; i < childToken.end; i += 1) token.childAt[i] = childToken }

            function shouldTest(rule, text, lastToken, unmatchedLength) {
                return !(rule.canFollow && !(rule.canFollow.indexOf(lastToken && lastToken.type) > -1) || rule.cannotFollow && (-1 !== rule.cannotFollow.indexOf(lastToken && lastToken.type) || rule.cannotFollow.indexOf("text") > -1 && unmatchedLength) || rule.peek && rule.peek !== text.slice(0, rule.peek.length)) }

            function _lex(parentToken) {
                for (var src = parentToken.innerText, frontTokenStack = [], index = 0, firstUnmatchedIndex = index, endIndex = src.length, lastToken = null; endIndex > index;) {
                    for (var slice = src.slice(index), mode = (frontTokenStack.length ? frontTokenStack[0] : parentToken).innerMode, i = 0, l = mode.length; l > i; i += 1) {
                        var rule = rules[mode[i]];
                        if (shouldTest(rule, slice, lastToken, index > firstUnmatchedIndex) && rule.pattern.test(slice)) {
                            var match = rule.pattern.exec(slice),
                                tokenData = rule.fn(match),
                                isMatchingBack = !1,
                                ft = 0;
                            if (tokenData.matches) {
                                for (; ft < frontTokenStack.length; ft += 1) {
                                    var type = frontTokenStack[ft].type;
                                    if (type in tokenData.matches) { isMatchingBack = !0;
                                        break }
                                    tokenData.cannotCross && tokenData.cannotCross.indexOf(type) > -1 && (ft = frontTokenStack.length - 1) }
                                if (ft >= frontTokenStack.length && !tokenData.isFront) continue }
                            index > firstUnmatchedIndex && parentToken.addChild({ type: "text", text: src.slice(firstUnmatchedIndex, index), innerMode: mode }), lastToken = parentToken.addChild(tokenData), index += lastToken.text.length, firstUnmatchedIndex = index, isMatchingBack && (foldTokens(parentToken, lastToken, frontTokenStack[ft]), frontTokenStack = frontTokenStack.slice(ft + 1)), lastToken.isFrontToken() && frontTokenStack.unshift(lastToken);
                            break } }
                    i === l && (index += 1, null === lastToken && (lastToken = { type: "text" })) }
                for (index > firstUnmatchedIndex && parentToken.addChild({ type: "text", text: src.slice(firstUnmatchedIndex, index), innerMode: (frontTokenStack.length ? frontTokenStack[0] : parentToken).innerMode }); frontTokenStack.length > 0;) frontTokenStack.shift().demote();
                return parentToken }

            function foldTokens(parentToken, backToken, frontToken) {
                var backTokenIndex = parentToken.children.indexOf(backToken),
                    frontTokenIndex = parentToken.children.indexOf(frontToken);
                backToken.children = parentToken.children.splice(frontTokenIndex + 1, backTokenIndex - (frontTokenIndex + 1)), backToken.children.forEach(function(token) { cacheChildPos(backToken, token) }), backToken.type = backToken.matches[frontToken.type], backToken.innerText = "";
                for (var i = 0, l = backToken.children.length; l > i; i++) backToken.innerText += backToken.children[i].text;
                backToken.start = frontToken.start, backToken.text = frontToken.text + backToken.innerText + backToken.text, Object.keys(frontToken).forEach(function(key) { Object.hasOwnProperty.call(backToken, key) || (backToken[key] = frontToken[key]) }), backToken.isFront && (backToken.isFront = !1), parentToken.children.splice(frontTokenIndex, 1), cacheChildPos(parentToken, backToken) }
            var Lexer = void 0,
                rules = {};
            Token.prototype = { constructor: Token, addChild: function(tokenData) {
                    var index = this.lastChildEnd(),
                        childToken = new Token({ start: index, end: tokenData.text && index + tokenData.text.length, children: [] }, tokenData);
                    return childToken.innerText && _lex(childToken), this.children.push(childToken), cacheChildPos(this, childToken), childToken }, lastChild: function() {
                    return this.children ? this.children[this.children.length - 1] || null : null }, lastChildEnd: function() {
                    var lastToken = this.lastChild();
                    return lastToken ? lastToken.end : this.start + Math.max(0, this.text.indexOf(this.innerText)) }, tokenAt: function(index) {
                    if (index < this.start || index >= this.end) return null;
                    if (this.childAt) return this.childAt[index] && this.childAt[index].tokenAt(index) || this;
                    if (this.children.length)
                        for (var i = 0; i < this.children.length; i += 1) {
                            var childToken = this.children[i].tokenAt(index);
                            if (childToken) return childToken }
                    return this }, pathAt: function(index) {
                    if (index < this.start || index >= this.end) return [];
                    if (this.childAt) return (this.childAt[index] && this.childAt[index].pathAt(index) || []).concat(this);
                    var path = [];
                    if (this.children.length)
                        for (var i = 0; i < this.children.length; i += 1) {
                            var childPath = this.children[i].pathAt(index);
                            if (childPath.length) { path.concat(childPath);
                                break } }
                    return path.concat(this) }, nearestTokenAt: function(index) {
                    return index < this.start || index >= this.end ? null : this.children ? this.children.reduce(function(prevValue, child) {
                        return prevValue || (index >= child.start && index < child.end ? child : null) }, null) : this }, everyLeaf: function everyLeaf(fn) {
                    if (!this.children || 0 === this.children.length) return !!fn(this);
                    var ret = void 0;
                    return this.children.everyLeaf(function() { ret = ret && !!everyLeaf(fn) }) }, isWhitespace: function() {
                    return this.everyLeaf(function(e) {
                        return "whitespace" === e.type || !e.text.trim() }) }, isFrontToken: function() {
                    return this.isFront }, isBackToken: function() {
                    return "matches" in this }, demote: function() { this.type = "text" }, error: function(message) { this.type = "error", this.message = message }, toString: function() {
                    var ret = this.type + "(" + this.start + "→" + this.end + ")";
                    return this.children && this.children.length > 0 && (ret += "[" + this.children + "]"), ret } }, Lexer = { lex: function(src, initIndex) {
                    return _lex(new Token({ type: "root", start: initIndex || 0, end: src.length, text: src, innerText: src, children: [], childAt: {}, innerMode: Lexer.startMode })) }, rules: rules }, "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) ? module.exports = Lexer : "function" == typeof define && define.amd ? define("lexer", [], function() {
                return Lexer }) : "function" == typeof StoryFormat && this instanceof StoryFormat ? (this.modules || (this.modules = {}), this.modules.Lexer = Lexer) : this.TwineLexer = Lexer }.call(eval("this") || ("undefined" != typeof global ? global : window)),
        function() {
            function escape(str) {
                return str && "object" === ("undefined" == typeof str ? "undefined" : _typeof(str)) ? (Object.keys(str).forEach(function(e) { str[e] = escape(str[e]) }), str) : (str + "").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }

            function notChars() {
                return "[^" + Array.apply(0, arguments).map(escape).join("") + "]*" }

            function makeWrapper(starter) {
                return function() {
                    return "(" + starter + Array.apply(0, arguments).join("|") + ")" } }
            var Patterns = void 0,
                either = makeWrapper("?:"),
                notBefore = makeWrapper("?!"),
                before = makeWrapper("?="),
                ws = "[ \\f\\t\\v  ᠎ - \u2028\u2029  　]*",
                mws = ws.replace("*", "+"),
                wb = "\\b",
                escapedLine = "\\\\\\n\\\\?|\\n\\\\",
                br = "\\n(?!\\\\)",
                anyLetter = "[\\w\\-À-Þß-ÿŐŰőű]",
                anyLetterStrict = "[\\wÀ-Þß-ÿŐŰőű]",
                eol = either("\\n", "$"),
                noUnescapedLineBreak = "(" + either(escapedLine, "[^\\n]") + "+)",
                bullet = "\\*",
                bulleted = ws + "(" + bullet + "+)" + mws + noUnescapedLineBreak + eol,
                numberPoint = "(?:0\\.)",
                numbered = ws + "(" + numberPoint + "+)" + mws + noUnescapedLineBreak + eol,
                hr = ws + "-{3,}" + ws + eol,
                heading = ws + "(#{1,6})" + ws + noUnescapedLineBreak + eol,
                align = ws + "(==+>|<=+|=+><=+|<==+>)" + ws + eol,
                passageLink = { opener: "\\[\\[(?!\\[)", text: "(" + notChars("]") + ")", rightSeparator: either("\\->", "\\|"), leftSeparator: "<\\-", closer: "\\]\\]", legacySeparator: "\\|", legacyText: "(" + either("[^\\|\\]]", "\\]" + notBefore("\\]")) + "+)" },
                validPropertyName = anyLetter.replace("\\-", "") + "*" + anyLetter.replace("\\-", "").replace("\\w", "a-zA-Z") + anyLetter.replace("\\-", "") + "*",
                variable = "\\$(" + validPropertyName + ")",
                property = "'s" + mws + "(" + validPropertyName + ")",
                belongingProperty = "(" + validPropertyName + ")" + mws + "of" + wb + notBefore("it" + wb),
                possessiveOperator = "'s" + mws,
                belongingOperator = "of" + wb,
                identifier = either("it", "time") + wb,
                itsProperty = "its" + mws + "(" + validPropertyName + ")",
                itsOperator = "its" + mws,
                belongingItProperty = "(" + validPropertyName + ")" + mws + "of" + mws + "it" + wb,
                belongingItOperator = "of" + wb + mws + "it" + wb,
                macro = { opener: "\\(", name: "(" + either(anyLetter.replace("]", "\\/]") + anyLetter + "*", variable) + "):", closer: "\\)" },
                twine1Macro = "<<[^>\\s]+\\s*(?:\\\\.|'(?:[^'\\\\]*\\\\.)*[^'\\\\]*'|\"(?:[^\"\\\\]*\\\\.)*[^\"\\\\]*\"|[^'\"\\\\>]|>(?!>))*>>",
                tag = { name: "[a-zA-Z][\\w\\-]*", attrs: "(?:\"[^\"]*\"|'[^']*'|[^'\">])*?" },
                hookTagFront = "\\|(" + anyLetter.replace("]", "_]") + "*)>",
                hookTagBack = "<(" + anyLetter.replace("]", "_]") + "*)\\|",
                number = "\\b(\\d+(?:\\.\\d+)?(?:[eE][+\\-]?\\d+)?|NaN)" + notBefore("m?s") + "\\b";
            passageLink.main = passageLink.opener + either(passageLink.text + passageLink.rightSeparator, passageLink.text.replace("*", "*?") + passageLink.leftSeparator) + passageLink.text, Patterns = { upperLetter: "[A-ZÀ-ÞŐŰ]", lowerLetter: "[a-z0-9_\\-ß-ÿőű]", anyLetter: anyLetter, anyLetterStrict: anyLetterStrict, whitespace: mws, escapedLine: escapedLine, br: br, commentFront: "<!--", commentBack: "-->", tag: "<\\/?" + tag.name + tag.attrs + ">", tagPeek: "<", scriptStyleTag: "<(" + either("script", "style") + ")" + tag.attrs + ">[^]*?<\\/\\1>", scriptStyleTagOpener: "<", url: "(" + either("https?", "mailto", "javascript", "ftp", "data") + ":\\/\\/[^\\s<]+[^<.,:;\"')\\]\\s])", bullet: bullet, hr: hr, heading: heading, align: align, bulleted: bulleted, numbered: numbered, delOpener: escape("~~"), italicOpener: escape("//"), boldOpener: escape("''"), supOpener: escape("^^"), strongFront: escape("**"), strongBack: escape("**"), emFront: escape("*"), emBack: escape("*"), verbatimOpener: "`+", collapsedFront: "{", collapsedBack: "}", hookAppendedFront: "\\[", hookPrependedFront: hookTagFront + "\\[", hookAnonymousFront: "\\[", hookBack: "\\]" + notBefore(hookTagBack), hookAppendedBack: "\\]" + hookTagBack, passageLink: passageLink.main + passageLink.closer, passageLinkPeek: "[[", legacyLink: passageLink.opener + passageLink.legacyText + passageLink.legacySeparator + passageLink.legacyText + passageLink.closer, legacyLinkPeek: "[[", simpleLink: passageLink.opener + passageLink.legacyText + passageLink.closer, simpleLinkPeek: "[[", macroFront: macro.opener + before(macro.name), macroFrontPeek: "(", macroName: macro.name, groupingFront: "\\(" + notBefore(macro.name), groupingFrontPeek: "(", groupingBack: "\\)", twine1Macro: twine1Macro, twine1MacroPeek: "<<", property: property, propertyPeek: "'s", belongingProperty: belongingProperty, possessiveOperator: possessiveOperator, belongingOperator: belongingOperator, belongingOperatorPeek: "of", itsOperator: itsOperator, itsOperatorPeek: "its", belongingItOperator: belongingItOperator, belongingItOperatorPeek: "of", variable: variable, variablePeek: "$", hookRef: "\\?(" + anyLetter + "+)\\b", hookRefPeek: "?", cssTime: "(\\d+\\.?\\d*|\\d*\\.?\\d+)(m?s)" + wb, colour: either(either("Red", "Orange", "Yellow", "Lime", "Green", "Cyan", "Aqua", "Blue", "Navy", "Purple", "Fuchsia", "Magenta", "White", "Gray", "Grey", "Black"), "#[\\dA-Fa-f]{3}(?:[\\dA-Fa-f]{3})?"), number: number, "boolean": either("true", "false") + wb, identifier: identifier, itsProperty: itsProperty, itsPropertyPeek: "its", belongingItProperty: belongingItProperty, escapedStringChar: "\\\\[^\\n]", singleStringOpener: "'", doubleStringOpener: '"', is: "is" + notBefore(" not", " in") + wb, isNot: "is not" + wb, and: "and" + wb, or: "or" + wb, not: "not" + wb, inequality: either("<(?!=)", "<=", ">(?!=)", ">="), isIn: "is in" + wb, contains: "contains" + wb, addition: escape("+") + notBefore("="), subtraction: escape("-") + notBefore("="), multiplication: escape("*") + notBefore("="), division: either("/", "%") + notBefore("="), comma: ",", spread: "\\.\\.\\." + notBefore("\\."), to: either("to" + wb, "="), into: "into" + wb, augmentedAssign: either("\\+", "\\-", "\\*", "\\/", "%") + "=" }, "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) ? module.exports = Patterns : "function" == typeof define && define.amd ? define("patterns", [], function() {
                return Patterns }) : "function" == typeof StoryFormat && this instanceof StoryFormat ? (this.modules || (this.modules = {}), this.modules.Patterns = Patterns) : this.Patterns = Patterns }.call(eval("this") || ("undefined" != typeof global ? global : window)),
        function() {
            function rules(Lexer) {
                function textTokenFn(name) {
                    return name = name || "innerText",
                        function(match) {
                            var innerText = match.reduceRight(function(a, b, index) {
                                    return a || (index ? b : "") }, ""),
                                data = {};
                            return data[name] = innerText, data } }

                function openerFn(name, foldedName) {
                    var matches = {};
                    return matches[name] = foldedName,
                        function() {
                            return { isFront: !0, matches: matches } } }

                function setupRules(mode, target) {
                    return Object.keys(target).forEach(function(ruleName) {
                        var innerFn = target[ruleName].fn;
                        target[ruleName].fn = function(match) {
                            var ret = innerFn(match);
                            return ret.text || (ret.text = match[0]), ret.type || (ret.type = ruleName), ret.innerMode || (ret.innerMode = mode), ret } }), target }
                var emptyFn = Object.bind(0, null),
                    markupMode = [],
                    macroMode = [],
                    blockRules = setupRules(markupMode, { hr: { fn: emptyFn }, bulleted: { fn: function(match) {
                                return { depth: match[1].length, innerText: match[2] } } }, numbered: { fn: function(match) {
                                return { depth: match[1].length / 2, innerText: match[2] } } }, heading: { fn: function(match) {
                                return { depth: match[1].length, innerText: match[2] } } }, align: { fn: function(match) {
                                var align = void 0,
                                    arrow = match[1],
                                    centerIndex = arrow.indexOf("><");
                                return ~centerIndex ? (align = Math.round(centerIndex / (arrow.length - 2) * 50), 25 === align && (align = "center")) : "<" === arrow[0] && ">" === arrow.slice(-1) ? align = "justify" : arrow.indexOf(">") > -1 ? align = "right" : arrow.indexOf("<") > -1 && (align = "left"), { align: align } } } });
                Object.keys(blockRules).forEach(function(key) { blockRules[key].canFollow = [null, "br", "hr", "bulleted", "numbered", "heading", "align"], blockRules[key].cannotFollow = ["text"] });
                var inlineRules = setupRules(markupMode, { twine1Macro: { fn: function() {
                                return { type: "error", message: "Harlowe macros use a different syntax to Twine 1 and SugarCube macros." } } }, br: { fn: emptyFn }, emBack: { fn: function() {
                                return { matches: { emFront: "em" } } } }, strongBack: { fn: function() {
                                return { matches: { strongFront: "strong" } } } }, strongFront: { fn: function() {
                                return { isFront: !0 } } }, emFront: { fn: function() {
                                return { isFront: !0 } } }, boldOpener: { fn: openerFn("boldOpener", "bold") }, italicOpener: { fn: openerFn("italicOpener", "italic") }, delOpener: { fn: openerFn("delOpener", "del") }, supOpener: { fn: openerFn("supOpener", "sup") }, commentFront: { fn: function() {
                                return { isFront: !0 } } }, commentBack: { fn: function() {
                                return { matches: { commentFront: "comment" } } } }, scriptStyleTag: { fn: emptyFn }, tag: { fn: emptyFn }, url: { fn: emptyFn }, passageLink: { fn: function(match) {
                                var p1 = match[1],
                                    p2 = match[2],
                                    p3 = match[3];
                                return { type: "twineLink", innerText: p2 ? p3 : p1, passage: p1 ? p3 : p2 } } }, simpleLink: { fn: function(match) {
                                return { type: "twineLink", innerText: match[1], passage: match[1] } } }, hookPrependedFront: { fn: function(match) {
                                return { name: match[1], isFront: !0, tagPosition: "prepended" } } }, hookAnonymousFront: { fn: function() {
                                return { isFront: !0, demote: function() { this.error("This tagged hook doesn't have a matching ].") } } }, canFollow: ["macro", "variable"] }, hookAppendedFront: { fn: function() {
                                return { isFront: !0 } }, cannotFollow: ["macro", "variable"] }, hookBack: { fn: function() {
                                return { type: "hookAppendedBack", matches: { hookPrependedFront: "hook", hookAnonymousFront: "hook" } } } }, hookAppendedBack: { fn: function(match) {
                                return { name: match[1], tagPosition: "appended", matches: { hookAppendedFront: "hook" } } } }, verbatimOpener: { fn: function(match) {
                                var number = match[0].length,
                                    matches = {};
                                return matches["verbatim" + number] = "verbatim", { type: "verbatim" + number, isFront: !0, matches: matches } } }, collapsedFront: { fn: function() {
                                return { isFront: !0 } } }, collapsedBack: { fn: function() {
                                return { matches: { collapsedFront: "collapsed" } } } }, escapedLine: { fn: emptyFn }, legacyLink: { fn: function(match) {
                                return { type: "twineLink", innerText: match[1], passage: match[2] } } } }),
                    expressionRules = setupRules(macroMode, { macroFront: { fn: function(match) {
                                return { isFront: !0, name: match[1] } } }, groupingBack: { fn: function() {
                                return { matches: { groupingFront: "grouping", macroFront: "macro" }, cannotCross: ["singleStringOpener", "doubleStringOpener"] } } }, hookRef: { fn: textTokenFn("name") }, variable: { fn: textTokenFn("name") }, whitespace: { fn: emptyFn, cannotFollow: "text" } }),
                    macroRules = setupRules(macroMode, Object.assign({
                        macroName: { canFollow: ["macroFront"], fn: function(match) {
                                return match[2] ? { isMethodCall: !0, innerText: match[2] } : { isMethodCall: !1 } } },
                        groupingFront: { fn: function() {
                                return { isFront: !0 } } },
                        property: { fn: textTokenFn("name"), canFollow: ["variable", "hookRef", "property", "itsProperty", "belongingItProperty", "macro", "grouping", "string", "boolean", "number"] },
                        possessiveOperator: { fn: emptyFn },
                        itsProperty: { cannotFollow: ["text"], fn: textTokenFn("name") },
                        itsOperator: { cannotFollow: ["text"], fn: emptyFn },
                        belongingItProperty: { cannotFollow: ["text"], fn: textTokenFn("name") },
                        belongingItOperator: { cannotFollow: ["text"], fn: emptyFn },
                        belongingProperty: { cannotFollow: ["text"], fn: textTokenFn("name") },
                        belongingOperator: { cannotFollow: ["text"], fn: emptyFn },
                        escapedStringChar: { fn: function() {
                                return { type: "text" } } },
                        singleStringOpener: { fn: function() {
                                return { isFront: !0, matches: { singleStringOpener: "string" } } } },
                        doubleStringOpener: { fn: function() {
                                return { isFront: !0, matches: { doubleStringOpener: "string" } } } },
                        cssTime: { fn: function(match) {
                                return { value: +match[1] * ("s" === match[2].toLowerCase() ? 1e3 : 1) } } },
                        colour: { cannotFollow: ["text"], fn: function(match) {
                                var colour, m = match[0].toLowerCase(),
                                    mapping = { red: "e61919", orange: "e68019", yellow: "e5e619", lime: "80e619", green: "19e619", cyan: "19e5e6", aqua: "19e5e6", blue: "197fe6", navy: "1919e6", purple: "7f19e6", fuchsia: "e619e5", magenta: "e619e5", white: "fff", black: "000", gray: "888", grey: "888" };
                                return colour = Object.hasOwnProperty.call(mapping, m) ? "#" + mapping[m] : m, { colour: colour } } },
                        number: { fn: function(match) {
                                return { value: parseFloat(match[0]) } } },
                        addition: { fn: emptyFn },
                        subtraction: { fn: emptyFn },
                        multiplication: { fn: emptyFn },
                        division: { fn: emptyFn },
                        inequality: { fn: function(match) {
                                return { operator: match[0] } } },
                        augmentedAssign: { fn: function(match) {
                                return { operator: match[0][0] } } },
                        identifier: {
                            fn: textTokenFn("name"),
                            cannotFollow: ["text"]
                        }
                    }, ["boolean", "is", "to", "into", "and", "or", "not", "isNot", "contains", "isIn"].reduce(function(a, e) {
                        return a[e] = { fn: emptyFn, cannotFollow: ["text"] }, a }, {}), ["comma", "spread", "addition", "subtraction", "multiplication", "division"].reduce(function(a, e) {
                        return a[e] = { fn: emptyFn }, a }, {})));
                markupMode.push.apply(markupMode, _toConsumableArray(Object.keys(blockRules)).concat(_toConsumableArray(Object.keys(inlineRules)), _toConsumableArray(Object.keys(expressionRules)))), macroMode.push.apply(macroMode, _toConsumableArray(Object.keys(expressionRules)).concat(_toConsumableArray(Object.keys(macroRules))));
                var allRules = Object.assign({}, blockRules, inlineRules, expressionRules, macroRules);
                return Object.keys(allRules).forEach(function(key) {
                    var re = Patterns[key];
                    allRules[key].pattern = "string" != typeof re ? re : new RegExp("^(?:" + re + ")", "i"), Patterns[key + "Peek"] && (allRules[key].peek = Patterns[key + "Peek"]) }), Object.assign(Lexer.rules, allRules), Lexer.startMode = markupMode, Lexer
            }

            function exporter(Lexer) {
                var TwineMarkup = Object.freeze({ lex: rules(Lexer).lex, Patterns: Patterns });
                return TwineMarkup }
            var Patterns = void 0;
            Object.assign = Object.assign || function(obj) {
                for (var i = 1; i < arguments.length; i++) {
                    var target = arguments[i];
                    for (var key in target) Object.hasOwnProperty.call(target, key) && (obj[key] = target[key]) }
                return obj }, "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) ? (Patterns = require("patterns"), module.exports = exporter(require("lexer"))) : "function" == typeof define && define.amd ? define("markup", ["lexer", "patterns"], function(Lexer, P) {
                return Patterns = P, exporter(Lexer) }) : "function" == typeof StoryFormat && this instanceof StoryFormat ? (Patterns = this.modules.Patterns, this.modules.Markup = exporter(this.modules.Lexer), this.lex = this.modules.Markup.lex) : (Patterns = this.Patterns, this.TwineMarkup = exporter(this.TwineLexer))
        }.call(eval("this") || ("undefined" != typeof global ? global : window)), define("utils/selectors", [], function() {
            return Object.freeze({ passage: "tw-passage", story: "tw-story", sidebar: "tw-sidebar", internalLink: "tw-link", brokenLink: "tw-broken-link", hook: "tw-hook", pseudoHook: "tw-pseudo-hook", enchantment: "tw-enchantment", expression: "tw-expression", enchanter: "[enchanter]", script: "[role=script]", stylesheet: "[role=stylesheet]", storyData: "tw-storydata", passageData: "tw-passagedata", whitespace: "tw-char[char=space], tw-char[char=tab], br", collapsed: "tw-collapsed" }) }), define("utils/customelements", [], function() {
            if (document.registerElement) {
                var CustomElements = {};
                return function register(name) {
                    for (var proto = Object.create(HTMLElement.prototype), propDef = {}, _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _len > _key; _key++) props[_key - 1] = arguments[_key];
                    props.forEach(function(p) { propDef[p] = { value: null } }), Object.defineProperties(proto, propDef);
                    var el = document.registerElement(name, { prototype: proto });
                    return CustomElements[name] = el, register }("tw-storydata", "storyname", "startnode", "creator", "creator-version", "options")("tw-passagedata", "name", "pid", "position")("tw-story")("tw-debugger")("tw-passage")("tw-link", "passage-name")("tw-broken-link", "passage-name")("tw-expression", "type", "name", "js")("tw-sidebar")("tw-icon")("tw-align")("tw-collapsed")("tw-verbatim")("tw-hook", "name", "source")("tw-pseudo-hook")("tw-transition-container")("tw-error")("tw-error-explanation")("tw-error-explanation-button")("tw-notifier", "message"), Object.freeze(CustomElements) } }), define("utils", ["jquery", "markup", "utils/selectors", "utils/customelements"], function(_$2, TwineMarkup, Selectors) {
            var lockDesc = { configurable: 0, writable: 0 },
                t8nAnimationTimes = { "transition-in": Object.create(null), "transition-out": Object.create(null) },
                usuallyBlockElements = "audio,blockquote,canvas,div,h1,h2,h3,h4,h5,hr,ol,p,pre,table,ul,video,tw-align,tw-story,tw-passage".split(","),
                usuallyInlineElements = "a,b,i,em,strong,sup,sub,abbr,acronym,s,strike,del,big,small,script,img,button,input,tw-link,tw-broken-link,tw-verbatim,tw-collapsed,tw-error".split(","),
                nonDetachableElements = ["audio"],
                storyElement = void 0,
                Utils = { lockProperties: function(obj) {
                        for (var keys = Object.keys(obj), propDesc = {}, i = 0; i < keys.length; i++) propDesc[keys[i]] = lockDesc;
                        return Object.defineProperties(obj, propDesc) }, lockProperty: function(obj, prop, value) {
                        var propDesc = Object.create(lockDesc);
                        return value && (propDesc.value = value), Object.defineProperty(obj, prop, propDesc), obj }, getInheritedPropertyDescriptor: function(obj, prop) {
                        for (; obj && !obj.hasOwnProperty(prop);) obj = Object.getPrototypeOf(obj);
                        return obj && Object.getOwnPropertyDescriptor(obj, prop) || null }, toJSLiteral: JSON.stringify, toTSStringLiteral: function(str) {
                        var _Math, consecutiveGraves = (_Math = Math).max.apply(_Math, _toConsumableArray((str.match(/(`+)/g) || []).map(function(e) {
                            return e.length }).concat(0))) + 1;
                        return "`".repeat(consecutiveGraves) + str + "`".repeat(consecutiveGraves) }, cssTimeUnit: function(s) {
                        if ("string" == typeof s) {
                            if (s = s.toLowerCase(), "ms" === s.slice(-2)) return +s.slice(0, -2) || 0;
                            if ("s" === s.slice(-1)) return 1e3 * +s.slice(0, -1) || 0 } else if (Array.isArray(s)) {
                            var _ret = function() {
                                var ret = [];
                                return s.forEach(function(e) {
                                    var time = Utils.cssTimeUnit(e);
                                    time > 0 && ret.push(time) }), { v: ret } }();
                            if ("object" === ("undefined" == typeof _ret ? "undefined" : _typeof(_ret))) return _ret.v }
                        return 0 }, nth: function(num) {
                        var lastDigit = (num + "").slice(-1);
                        return num + ("1" === lastDigit ? "st" : "2" === lastDigit ? "nd" : "3" === lastDigit ? "rd" : "th") }, plural: function(num, noun) {
                        return num + " " + noun + (num > 1 ? "s" : "") }, unescape: function(text) {
                        return text.replace(/&(?:amp|lt|gt|quot|nbsp|zwnj|#39|#96);/g, function(e) {
                            return { "&amp;": "&", "&gt;": ">", "&lt;": "<", "&quot;": '"', "&#39;": "'", "&nbsp;": String.fromCharCode(160), "&zwnj;": String.fromCharCode(8204) }[e] }) }, escape: function(text) {
                        return text.replace(/[&><"']/g, function(e) {
                            return { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#39;" }[e] }) }, insensitiveName: function(e) {
                        return (e + "").toLowerCase().replace(/-|_/g, "") }, wrapHTMLTag: function(text, tagName) {
                        return "<" + tagName + ">" + text + "</" + tagName + ">" }, findAndFilter: function(q, selector) {
                        return q = _$2(q || Utils.storyElement), q.filter(selector).add(q.find(selector)) }, closestHookSpan: function(elems) {
                        var ret = elems.closest(Selectors.hook + "," + Selectors.pseudoHook);
                        return ret.length ? ret : elems }, childrenProbablyInline: function(jq) {
                        var unknown = [];
                        return Array.prototype.every.call(jq.find("*"), function(elem) {
                            return elem.hidden || /none|inline/.test(elem.style.display) ? !0 : usuallyBlockElements.indexOf(elem.tagName.toLowerCase()) > -1 || /none|inline/.test(elem.style.display) ? !1 : usuallyInlineElements.indexOf(elem.tagName.toLowerCase()) > -1 ? !0 : (unknown.push(elem), !0) }) && unknown.every(function(elem) {
                            return /none|inline/.test(elem.style.display) }) }, transitionReplace: function(oldElem, newElem, transIndex) { oldElem = Utils.closestHookSpan(oldElem);
                        var container1 = _$2("<tw-transition-container>").css("position", "relative");
                        container1.insertBefore(oldElem.first());
                        var container2a = void 0;
                        newElem && (container2a = _$2("<tw-transition-container>").appendTo(container1), newElem.appendTo(container2a));
                        var container2b = _$2("<tw-transition-container>").css("position", "absolute").prependTo(container1);
                        oldElem.detach().appendTo(container2b), Utils.transitionOut(container2b, transIndex), newElem && Utils.transitionIn(container2a, transIndex, function() { container2a.unwrap().children().first().unwrap() }) }, transitionOut: function(el, transIndex) {
                        function onComplete() { el.remove() }
                        var childrenInline = Utils.childrenProbablyInline(el),
                            mustWrap = el.length > 1 || !childrenInline || -1 === ["tw-hook", "tw-passage"].indexOf(el.tag());
                        mustWrap && (el = el.wrapAll("<tw-transition-container>").parent()), el.attr("data-t8n", transIndex).addClass("transition-out"), Utils.childrenProbablyInline(el) && el.css("display", "inline-block");
                        var delay = Utils.transitionTime(transIndex, "transition-out");
                        delay ? window.setTimeout(onComplete, delay) : onComplete() }, transitionIn: function(el, transIndex) {
                        function onComplete() {
                            var detachable = 0 === Utils.findAndFilter(el, nonDetachableElements.join(",")).length;
                            mustWrap && detachable ? el.contents().unwrap() : el.removeClass("transition-in").removeAttr("data-t8n") }
                        var childrenInline = Utils.childrenProbablyInline(el),
                            mustWrap = el.length > 1 || !childrenInline || -1 === ["tw-hook", "tw-passage"].indexOf(el.tag());
                        mustWrap && (el = el.wrapAll("<tw-transition-container>").parent()), el.attr("data-t8n", transIndex).addClass("transition-in"), Utils.childrenProbablyInline(el) && el.css("display", "inline-block");
                        var delay = Utils.transitionTime(transIndex, "transition-in");
                        delay ? window.setTimeout(onComplete, delay) : onComplete() }, transitionTime: function(transIndex, className) {
                        var animClass = t8nAnimationTimes[className];
                        if (!animClass[transIndex]) {
                            var p = _$2("<p>").appendTo(document.body).attr("data-t8n", transIndex).addClass(className);
                            animClass[transIndex] = Utils.cssTimeUnit(p.css("animation-duration")) + Utils.cssTimeUnit(p.css("animation-delay")), p.remove() }
                        return animClass[transIndex] }, $: function(str, context) {
                        return _$2(str, context || Utils.storyElement).not(".transition-out, .transition-out *") }, log: function(data) { window.console && console.log(data) }, impossible: function(where, data) { window.console && console.error(where + "(): " + data) }, assert: function(assertion) { window.console && (assertion || console.error("Assertion failed!")) }, assertMustHave: function(object, props) {
                        if (window.console)
                            for (var i = 0; i < props.length; i += 1) props[i] in object || console.error("Assertion failed: " + object + " lacks property " + props[i]) }, assertOnlyHas: function(object, props) {
                        if (window.console)
                            for (var i in object) - 1 === props.indexOf(i) && console.error("Assertion failed: " + object + " had unexpected property '" + i + "'!") }, get storyElement() {
                        return storyElement } };
            return _$2(function() {
                return storyElement = _$2(Selectors.story) }), Object.freeze(Utils) }), define("twinescript/compiler", ["utils"], function(_ref) {
            function indexOfType(array) {
                for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _len2 > _key2; _key2++) types[_key2 - 1] = arguments[_key2];
                for (var i = 0; i < array.length; i += 1)
                    if (types.indexOf(array[i].type) > -1) return i;
                return 0 / 0 }

            function rightAssociativeIndexOfType(array) {
                for (var _len3 = arguments.length, types = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _len3 > _key3; _key3++) types[_key3 - 1] = arguments[_key3];
                return array.length - 1 - indexOfType.apply(void 0, [
                    [].concat(_toConsumableArray(array)).reverse()
                ].concat(types)) }

            function compile(tokens, isVarRef) {
                if (!tokens) return "";
                tokens = [].concat(tokens);
                var token = tokens[0];
                if (1 === tokens.length) {
                    if ("identifier" === token.type) return isVarRef ? "TwineError.create('keyword','I can\\'t use \\'" + token.text + "\\' in this position.') " : " Operations.Identifiers." + token.text.toLowerCase() + " ";
                    if ("variable" === token.type) return "VarRef.create(State.variables," + toJSLiteral(token.name) + ")" + (isVarRef ? "" : ".get()");
                    if ("hookRef" === token.type) return isVarRef ? "VarRef.create(section.selectHook('?" + token.name + "'), 'TwineScript_Assignee')" : " section.selectHook('?" + token.name + "') ";
                    if ("string" === token.type) return token.text.replace(/\n/g, "\\n");
                    if ("colour" === token.type) return "Colour.create(" + toJSLiteral(token.colour) + ")";
                    if ("root" === token.type) return compile(token.children) }
                var i = void 0,
                    macroNameToken = void 0,
                    left = void 0,
                    right = void 0,
                    midString = void 0,
                    operation = void 0,
                    assignment = void 0,
                    possessive = void 0,
                    needsLeft = !0,
                    needsRight = !0,
                    implicitLeftIt = !1;
                return (i = indexOfType(tokens, "comma")) > -1 ? (midString = ",", needsRight = !1) : (i = indexOfType(tokens, "spread")) > -1 ? (midString = "Operations.makeSpreader(", right = compile(tokens.splice(i + 1)) + ")", needsLeft = !1) : (i = indexOfType(tokens, "to")) > -1 ? (assignment = "to", left = "Operations.setIt(" + compile(tokens.slice(0, i), "varRef") + ")") : (i = indexOfType(tokens, "into")) > -1 ? (assignment = "into", right = compile(tokens.slice(0, i), "varRef"), left = "Operations.setIt(" + compile(tokens.slice(i + 1), "varRef") + ")") : (i = indexOfType(tokens, "augmentedAssign")) > -1 ? (assignment = tokens[i].operator, left = compile(tokens.slice(0, i), "varRef"), right = "Operations['" + assignment + "'](" + (compile(tokens.slice(0, i)) + "," + compile(tokens.splice(i + 1))) + ")") : (i = indexOfType(tokens, "and", "or")) > -1 ? operation = tokens[i].type : (i = indexOfType(tokens, "is", "isNot")) > -1 ? (implicitLeftIt = !0, operation = tokens[i].type) : (i = indexOfType(tokens, "contains", "isIn")) > -1 ? (implicitLeftIt = !0, operation = tokens[i].type) : (i = indexOfType(tokens, "inequality")) > -1 ? (implicitLeftIt = !0, operation = tokens[i].operator) : (i = indexOfType(tokens, "addition", "subtraction")) > -1 ? (operation = tokens[i].text, left = compile(tokens.slice(0, i)), left.trim() || (left = "0")) : (i = indexOfType(tokens, "multiplication", "division")) > -1 ? operation = tokens[i].text : (i = indexOfType(tokens, "not")) > -1 ? (midString = "Operations.not(", right = compile(tokens.splice(i + 1)) + ")", needsLeft = !1) : (i = indexOfType(tokens, "belongingProperty")) > -1 ? (right = "VarRef.create(" + compile(tokens.slice(i + 1), "varref") + "," + toJSLiteral(tokens[i].name) + ")" + (isVarRef ? "" : ".get()"), midString = " ", needsLeft = needsRight = !1) : (i = indexOfType(tokens, "belongingOperator", "belongingItOperator")) > -1 ? (tokens[i].type.includes("It") && (right = "Operations.Identifiers.it", needsRight = !1), possessive = "belonging") : (i = rightAssociativeIndexOfType(tokens, "property")) > -1 ? (left = "VarRef.create(" + compile(tokens.slice(0, i), "varref") + "," + toJSLiteral(tokens[i].name) + ")" + (isVarRef ? "" : ".get()"), midString = " ", needsLeft = needsRight = !1) : (i = rightAssociativeIndexOfType(tokens, "itsProperty")) > -1 || (i = indexOfType(tokens, "belongingItProperty")) > -1 ? (left = "VarRef.create(Operations.Identifiers.it," + toJSLiteral(tokens[i].name) + ").get()", midString = " ", needsLeft = needsRight = !1) : (i = rightAssociativeIndexOfType(tokens, "possessiveOperator", "itsOperator")) > -1 ? (tokens[i].type.includes("it") && (left = "Operations.Identifiers.it", needsLeft = !1), possessive = "possessive") : (i = indexOfType(tokens, "macro")) > -1 ? (macroNameToken = tokens[i].children[0], assert("macroName" === macroNameToken.type), midString = "Macros.run(" + (macroNameToken.isMethodCall ? compile(macroNameToken.children) : '"' + tokens[i].name + '"') + ", [section," + compile(tokens[i].children.slice(1)) + "])", needsLeft = needsRight = !1) : (i = indexOfType(tokens, "grouping")) > -1 && (midString = "(" + compile(tokens[i].children, isVarRef) + ")", needsLeft = needsRight = !1), i > -1 ? (left = left || compile(tokens.slice(0, i), isVarRef).trim(), right = right || compile(tokens.splice(i + 1)).trim(), implicitLeftIt && !left && (left = " Operations.Identifiers.it "), needsLeft && !left || needsRight && !right ? "TwineError.create('operation','I need some code to be " + (needsLeft ? "left " : "") + (needsLeft && needsRight ? "and " : "") + (needsRight ? "right " : "") + 'of "' + tokens[i].text + "\"')" : midString ? left + midString + right : assignment ? "Operations.makeAssignmentRequest(" + [left, right, toJSLiteral(assignment)] + ")" : possessive ? "VarRef.create(" + ("belonging" === possessive ? right : left) + ",{computed:true,value:" + ("belonging" === possessive ? left : right) + "})" + (isVarRef ? "" : ".get()") : operation ? " Operations[" + toJSLiteral(operation) + "](" + left + "," + right + ") " : "") : 1 === tokens.length ? ((token.value || token.text) + "").trim() || " " : tokens.reduce(function(a, token) {
                    return a + compile(token, isVarRef) }, "") }
            var toJSLiteral = _ref.toJSLiteral,
                assert = _ref.assert;
            return compile }), define("internaltypes/twineerror", ["jquery", "utils"], function($, _ref2) {
            var impossible = _ref2.impossible,
                assert = _ref2.assert,
                escape = _ref2.escape,
                errorExplanations = { syntax: "The markup seems to contain a mistake.", saving: "I tried to save or load the game, but I couldn't do it.", operation: "I tried to use an operation on some data, but the data's type was incorrect.", macrocall: "I tried to use a macro, but its call wasn't written correctly.", datatype: "I tried to use a macro, but was given the wrong type of data to it.", keyword: "I was given a keyword in a way that I didn't understand.", changer: "This is a command to change a hook, but it isn't being used correctly.", infinite: "I almost ended up doing the same thing over and over, forever.", property: "I tried to access a value in a string/array/datamap, but I couldn't find it.", unimplemented: "I currently don't have this particular feature. I'm sorry.", javascript: "This error message was reported by your browser's Javascript engine. I don't understand it either, but it usually means that an expression was badly written." },
                TwineError = { create: function(type, message, explanation) {
                        return message || impossible("TwineError.create", "called with only 1 string."), assert(explanation || type in errorExplanations), Object.assign(Object.create(this), { type: type, message: message, explanation: explanation }) }, fromError: function(error) {
                        return TwineError.create("javascript", "☕ " + error.message) }, containsError: function() {
                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _len4 > _key4; _key4++) args[_key4] = arguments[_key4];
                        return args.reduce(function(last, e) {
                            return last ? last : e instanceof Error ? e : TwineError.isPrototypeOf(e) ? e : Array.isArray(e) ? TwineError.containsError.apply(TwineError, _toConsumableArray(e)) : !1 }, !1) }, createWarning: function(type, message) {
                        return Object.assign(this.create(type, message), { warning: !0 }) }, render: function(titleText) { titleText = titleText || "";
                        var errorElement = $("<tw-error class='" + ("javascript" === this.type ? "javascript " : "") + (this.warning ? "warning" : "error") + "' title='" + escape(titleText) + "'>" + escape(this.message) + "</tw-error>"),
                            explanationElement = $("<tw-error-explanation>").text(this.explanation || errorExplanations[this.type]).hide(),
                            explanationButton = $("<tw-error-explanation-button tabindex=0>").html("<span class='folddown-arrowhead'>&#9658;</span>");
                        return explanationButton.on("click", function() { explanationElement.toggle(), explanationButton.children(".folddown-arrowhead").css("transform", "rotate(" + (explanationElement.is(":visible") ? "90deg" : "0deg") + ")") }), errorElement.append(explanationButton).append(explanationElement), errorElement } };
            return TwineError }), define("renderer", ["utils", "markup", "twinescript/compiler", "internaltypes/twineerror"], function(_ref3, TwineMarkup, Compiler, TwineError) {
            function renderTag(token, tagName) {
                var contents = Renderer.render(token.children);
                return contents && wrapHTMLTag(contents, tagName) }
            var wrapHTMLTag = _ref3.wrapHTMLTag,
                escape = _ref3.escape,
                impossible = _ref3.impossible,
                toJSLiteral = _ref3.toJSLiteral,
                Renderer = void 0,
                center = "text-align: center; max-width:50%; ";
            return Renderer = { options: {}, exec: function() {
                    var cachedInput = void 0,
                        cachedOutput = void 0;
                    return function(src) {
                        return "string" != typeof src ? (impossible("Renderer.exec", "source was not a string, but " + ("undefined" == typeof src ? "undefined" : _typeof(src))), "") : src === cachedInput ? cachedOutput : (cachedInput = src, cachedOutput = Renderer.render(TwineMarkup.lex(src).children)) } }(), render: function render(tokens) {
                    var out = "";
                    if (!tokens) return out;
                    for (var len = tokens.length, i = 0; len > i; i += 1) {
                        var token = tokens[i];
                        switch (token.type) {
                            case "error":
                                out += TwineError.create("syntax", token.message).render(escape(token.text))[0].outerHTML;
                                break;
                            case "numbered":
                            case "bulleted":
                                var tagName = "numbered" === token.type ? "ol" : "ul";
                                out += "<" + tagName + ">";
                                for (var depth = 1; len > i && tokens[i] && tokens[i].type === token.type;) out += ("<" + tagName + ">").repeat(Math.max(0, tokens[i].depth - depth)), out += ("</" + tagName + ">").repeat(Math.max(0, depth - tokens[i].depth)), depth = tokens[i].depth, out += renderTag(tokens[i], "li"), i += 1;
                                i -= 1, out += ("</" + tagName + ">").repeat(depth + 1);
                                break;
                            case "align":
                                for (; token && "align" === token.type;) {
                                    var style = "",
                                        body = "",
                                        align = token.align,
                                        j = i += 1;
                                    if ("left" === align) { i -= 1;
                                        break }
                                    for (; len > i && tokens[i] && "align" !== tokens[i].type;) i += 1;
                                    switch (body += render(tokens.slice(j, i)), align) {
                                        case "center":
                                            style += center + "margin-left: auto; margin-right: auto;";
                                            break;
                                        case "justify":
                                        case "right":
                                            style += "text-align: " + align + ";";
                                            break;
                                        default:
                                            +align && (style += center + "margin-left: " + align + "%;") }
                                    out += "<tw-align " + (style ? 'style="' + style + '"' : "") + (Renderer.options.debug ? ' title="' + token.text + '"' : "") + ">" + body + "</tw-align>\n", token = tokens[i] }
                                break;
                            case "heading":
                                out += renderTag(token, "h" + token.depth);
                                break;
                            case "br":
                            case "hr":
                                out += "<" + token.type + ">";
                                break;
                            case "escapedLine":
                            case "comment":
                                break;
                            case "inlineUrl":
                                out += '<a class="link" href="' + escape(token.text) + '">' + token.text + "</a>";
                                break;
                            case "scriptStyleTag":
                            case "tag":
                                out += token.text.startsWith("</") ? token.text : token.text.replace(/>$/, " data-raw>");
                                break;
                            case "sub":
                            case "sup":
                            case "del":
                            case "strong":
                            case "em":
                                out += renderTag(token, token.type);
                                break;
                            case "bold":
                                out += renderTag(token, "b");
                                break;
                            case "italic":
                                out += renderTag(token, "i");
                                break;
                            case "twineLink":
                                var newTwineLinkToken = TwineMarkup.lex("(link-goto:" + toJSLiteral(token.innerText) + "," + toJSLiteral(token.passage) + ")");
                                out += render(newTwineLinkToken.children);
                                break;
                            case "hook":
                                out += "<tw-hook " + (token.name ? 'name="' + token.name + '"' : "") + (Renderer.options.debug && token.name ? ' title="Hook: ?' + token.name + '"' : "") + ' source="' + escape(token.innerText) + '"></tw-hook>';
                                break;
                            case "verbatim":
                                out += wrapHTMLTag(escape(token.innerText).replace(/\n/g, "<br>"), "tw-verbatim");
                                break;
                            case "collapsed":
                                out += renderTag(token, "tw-collapsed");
                                break;
                            case "hookRef":
                            case "variable":
                            case "macro":
                                out += '<tw-expression type="' + token.type + '" name="' + escape(token.name || token.text) + '"' + (Renderer.options.debug ? ' title="' + escape(token.text) + '"' : "") + ' js="' + escape(Compiler(token)) + '"></tw-expression>';
                                break;
                            default:
                                out += token.children && token.children.length ? render(token.children) : token.text } }
                    return out } }, Object.freeze(Renderer) }), define("passages", ["jquery", "utils", "utils/selectors"], function($, _ref4, Selectors) {
            function Passage(elem) {
                return Object.assign(new Map([
                    ["source", unescape(elem.html())],
                    ["tags", (elem.attr("tags") || "").split(/\s/)],
                    ["name", elem.attr("name")]
                ]), { TwineScript_TypeName: "passage datamap", TwineScript_ObjectName: "a passage datamap" }) }
            var unescape = _ref4.unescape,
                Passages = Object.assign(new Map, { TwineScript_ObjectName: "the Passages datamap", getTagged: function(tag) {
                        var ret = [];
                        return this.forEach(function(v) {
                            var tags = v instanceof Map && v.get("tags");
                            Array.isArray(tags) && tags.indexOf(tag) > -1 && ret.push(v) }), ret.sort(function(left, right) {
                            return left.get("name") > right.get("name") }) }, create: Passage });
            return $(function() { Array.from($(Selectors.storyData + " > " + Selectors.passageData)).forEach(function(e) { e = $(e), Passages.set(e.attr("name"), new Passage(e)) }) }), Passages }), define("state", ["utils", "passages"], function(_ref5, Passages) {
            var impossible = _ref5.impossible,
                SystemVariables = { TwineScript_ObjectName: "this story's variables", TwineScript_Writeproof: [] },
                Moment = { passage: "", variables: SystemVariables, create: function(p, v) {
                        var ret = Object.create(Moment);
                        return ret.passage = p || "", ret.variables = Object.assign(Object.create(this.variables), v), ret } },
                timeline = [],
                recent = -1,
                present = Moment.create(),
                serialisable = !0,
                State = Object.assign({get passage() {
                        return present.passage }, get variables() {
                        return present.variables }, get pastLength() {
                        return recent }, get futureLength() {
                        return timeline.length - 1 - recent }, passageNameVisited: function(name) {
                        var ret = 0;
                        if (!Passages.get(name)) return 0;
                        for (var i = 0; recent >= i; i++) ret += +(name === timeline[i].passage);
                        return ret }, passageNameLastVisited: function(name) {
                        if (!Passages.get(name)) return 1 / 0;
                        if (name === present.passage) return 0;
                        for (var i = recent; i > 0; i--)
                            if (timeline[i].passage === name) return recent - i + 1;
                        return 1 / 0 }, pastPassageNames: function() {
                        for (var ret = [], i = recent - 1; i >= 0; i--) ret.unshift(timeline[i].passage);
                        return ret }, newPresent: function(newPassageName) { present = (timeline[recent] || Moment).create(newPassageName) }, play: function(newPassageName) { present || impossible("State.play", "present is undefined!"), present.passage = newPassageName, timeline = timeline.slice(0, recent + 1).concat(present), recent += 1, this.newPresent(newPassageName) }, rewind: function(arg) {
                        var steps = 1,
                            moved = !1;
                        if (arg)
                            if ("string" == typeof arg) {
                                if (steps = this.passageNameLastVisited(arg), steps === 1 / 0) return } else "number" == typeof arg && (steps = arg);
                        for (; steps > 0 && recent > 0; steps--) moved = !0, recent -= 1;
                        return moved && this.newPresent(timeline[recent].passage), moved }, fastForward: function(arg) {
                        var steps = 1,
                            moved = !1;
                        for ("number" == typeof arg && (steps = arg); steps > 0 && timeline.length > 0; steps--) moved = !0, recent += 1;
                        return moved && this.newPresent(timeline[recent].passage), moved }, reset: function() { timeline = [], recent = -1, present = Moment.create(), serialisable = !0 } }, function() {
                    function isSerialisable(variable) {
                        return "number" == typeof variable || "boolean" == typeof variable || "string" == typeof variable || null === variable || Array.isArray(variable) && variable.every(isSerialisable) || variable instanceof Set && Array.from(variable).every(isSerialisable) || variable instanceof Map && Array.from(variable.values()).every(isSerialisable) }

                    function replacer(name, variable) {
                        return variable instanceof Set ? { "(dataset:)": Array.from(variable) } : variable instanceof Map ? { "(datamap:)": Array.from(variable) } : variable }

                    function reviver(name, variable) {
                        if (Object.prototype.isPrototypeOf(variable)) {
                            if (Array.isArray(variable["(dataset:)"])) return new Set(variable["(dataset:)"]);
                            if (Array.isArray(variable["(datamap:)"])) return new Map(variable["(datamap:)"]) }
                        return variable }

                    function serialise() {
                        var ret = timeline.slice(0, recent + 1);
                        if (serialisable = serialisable && ret.every(function(moment) {
                                return Object.keys(moment.variables).every(function(e) {
                                    return isSerialisable(moment.variables[e]) }) }), !serialisable) return !1;
                        try {
                            return JSON.stringify(ret, replacer) } catch (e) {
                            return !1 } }

                    function deserialise(str) {
                        var newTimeline = void 0,
                            lastVariables = SystemVariables;
                        try { newTimeline = JSON.parse(str, reviver) } catch (e) {
                            return !1 }
                        return Array.isArray(newTimeline) ? (newTimeline = newTimeline.map(function(moment) {
                            return "object" === ("undefined" == typeof moment ? "undefined" : _typeof(moment)) && moment.hasOwnProperty("passage") && moment.hasOwnProperty("variables") ? (moment.variables = Object.assign(Object.create(lastVariables), moment.variables), lastVariables = moment.variables, Object.assign(Object.create(Moment), moment)) : !1 })).indexOf(!1) > -1 ? !1 : (timeline = newTimeline, recent = timeline.length - 1, void this.newPresent(timeline[recent].passage)) : !1 }
                    return { serialise: serialise, deserialise: deserialise } }());
            return Object.seal(Moment), Object.freeze(State) }), define("utils/naturalsort", [], function() {
            return function(locale) {
                return function naturalSort(a, b) {
                    var oFxNcL, oFyNcL, collator, colCmp, re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
                        sre = /(^[ ]*|[ ]*$)/g,
                        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                        hre = /^0x[0-9a-f]+$/i,
                        ore = /^0/,
                        i = function(s) {
                            return naturalSort.insensitive && ("" + s).toLowerCase() || "" + s },
                        x = i(a).replace(sre, "") || "",
                        y = i(b).replace(sre, "") || "",
                        xN = x.replace(re, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"),
                        yN = y.replace(re, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"),
                        xD = parseInt(x.match(hre)) || 1 !== xN.length && x.match(dre) && Date.parse(x),
                        yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null;
                    if (locale && window.Intl && window.Intl.Collator && (collator = window.Intl.Collator(locale)), yD) {
                        if (yD > xD) return -1;
                        if (xD > yD) return 1 }
                    for (var cLoc = 0, numS = Math.max(xN.length, yN.length); numS > cLoc; cLoc++) {
                        if (oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0, oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0, isNaN(oFxNcL) !== isNaN(oFyNcL)) return isNaN(oFxNcL) ? 1 : -1;
                        if (("undefined" == typeof oFxNcL ? "undefined" : _typeof(oFxNcL)) !== ("undefined" == typeof oFyNcL ? "undefined" : _typeof(oFyNcL))) oFxNcL += "", oFyNcL += "";
                        else if ("string" == typeof oFxNcL && collator && (colCmp = collator.compare(oFxNcL, oFyNcL), 0 !== colCmp)) return colCmp;
                        if (oFyNcL > oFxNcL) return -1;
                        if (oFxNcL > oFyNcL) return 1 }
                    return 0 } } }), define("utils/operationutils", ["utils", "internaltypes/twineerror"], function(_ref6, TwineError) {
            function isObject(value) {
                return !!value && ("object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) || "function" == typeof value) }

            function collectionType(value) {
                return Array.isArray(value) ? "array" : value instanceof Map ? "datamap" : value instanceof Set ? "dataset" : value && "object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) ? "object" : "" }

            function isValidDatamapName(map, name) {
                if (assert(map instanceof Map), "string" != typeof name && "number" != typeof name) return TwineError.create("property", "Only strings and numbers can be used as data names for " + objectName(map) + ", not " + objectName(name) + ".");
                var otherName = "string" == typeof name ? +name : "" + name;
                return !Number.isNaN(otherName) && map.has(otherName) ? TwineError.create("property", "You mustn't use both " + objectName(name) + " and " + objectName(otherName) + " as data names in the same datamap.") : !0 }

            function isSequential(value) {
                return "string" == typeof value || Array.isArray(value) }

            function clone(value) {
                if (!isObject(value)) return value;
                if ("function" == typeof value.TwineScript_Clone) return value.TwineScript_Clone();
                if (Array.isArray(value)) return [].concat(_toConsumableArray(value));
                if (value instanceof Map) return Object.assign(new Map(value), value);
                if (value instanceof Set) return Object.assign(new Set(value), value);
                if ("function" == typeof value) return Object.assign(value.bind(), value);
                switch (Object.getPrototypeOf(value)) {
                    case Object.prototype:
                        return Object.assign({}, value);
                    case null:
                        return Object.assign(Object.create(null), value) }
                return impossible("OperationUtils.clone", "The value " + (value.toSource ? value.toSource() : value) + " cannot be cloned!"), value }

            function coerceToString(fn, left, right) {
                return "string" == typeof left && isObject(right) && "TwineScript_ToString" in right ? fn(left, right.TwineScript_ToString()) : "string" == typeof right && isObject(left) && "TwineScript_ToString" in left ? fn(left.TwineScript_ToString(), right) : !1 }

            function objectName(obj) {
                return isObject(obj) && "TwineScript_ObjectName" in obj ? obj.TwineScript_ObjectName : Array.isArray(obj) ? "an array" : obj instanceof Map ? "a datamap" : obj instanceof Set ? "a dataset" : "boolean" == typeof obj ? "the logic value '" + obj + "'" : "string" == typeof obj || "number" == typeof obj ? "the " + ("undefined" == typeof obj ? "undefined" : _typeof(obj)) + " " + toJSLiteral(obj) : void 0 === obj ? "an empty variable" : "...whatever this is" }

            function typeName(obj) {
                return obj.innerType ? "either" === obj.pattern ? (assert(Array.isArray(obj.innerType)), obj.innerType.map(typeName).join(" or ")) : "optional" === obj.pattern ? "(an optional) " + typeName(obj.innerType) : typeName(obj.innerType) : obj === String || obj === Number || obj === Boolean ? "a " + _typeof(obj()) : obj === Map ? "a datamap" : obj === Set ? "a dataset" : obj === Array ? "an array" : isObject(obj) && "TwineScript_TypeName" in obj ? obj.TwineScript_TypeName : objectName(obj) }

            function is(l, r) {
                return "object" !== ("undefined" == typeof l ? "undefined" : _typeof(l)) && "object" !== ("undefined" == typeof r ? "undefined" : _typeof(r)) ? l === r : Array.isArray(l) && Array.isArray(r) ? l.length !== r.length ? !1 : l.every(function(element, index) {
                    return is(r[index], element) }) : l instanceof Map && r instanceof Map ? is(Array.from(l.entries()).sort(), Array.from(r.entries()).sort()) : l instanceof Set && r instanceof Set ? is(Array.from(l.values()), Array.from(r.values())) : l && "function" == typeof l.TwineScript_is ? l.TwineScript_is(r) : l && "object" === ("undefined" == typeof l ? "undefined" : _typeof(l)) && r && "object" === ("undefined" == typeof r ? "undefined" : _typeof(r)) && Object.getPrototypeOf(l) === Object.prototype && Object.getPrototypeOf(r) === Object.prototype ? is(Object.getOwnPropertyNames(l).map(function(name) {
                    return [name, l[name]] }), Object.getOwnPropertyNames(r).map(function(name) {
                    return [name, r[name]] })) : Object.is(l, r) }

            function contains(container, obj) {
                if (container) {
                    if ("string" == typeof container) return container.indexOf(obj) > -1;
                    if (Array.isArray(container)) return container.some(function(e) {
                        return is(e, obj) });
                    if (container instanceof Set || container instanceof Map) return Array.from(container.keys()).some(function(e) {
                        return is(e, obj) }) }
                return is(container, obj) }

            function subset(sequence, a, b) {
                if (!a || !b) return TwineError.create("macrocall", "The sub" + collectionType(sequence) + " index values must not be 0 or NaN.");
                if (0 > a && (a = sequence.length + a + 1), 0 > b && (b = sequence.length + b + 1), a > b) return subset(sequence, b, a);
                var isString = "string" == typeof sequence;
                isString && (sequence = Array.from(sequence));
                var ret = sequence.slice(a > 0 ? a - 1 : a, b);
                return isString ? ret.join("") : ret }
            var assert = _ref6.assert,
                impossible = _ref6.impossible,
                toJSLiteral = _ref6.toJSLiteral,
                OperationUtils = Object.freeze({ isObject: isObject, isValidDatamapName: isValidDatamapName, collectionType: collectionType, isSequential: isSequential, clone: clone, coerceToString: coerceToString, objectName: objectName, typeName: typeName, is: is, contains: contains, subset: subset, numericIndex: /^(?:[1-9]\d*|0)$/ });
            return OperationUtils }), define("macros", ["jquery", "utils/naturalsort", "utils", "utils/operationutils", "internaltypes/twineerror"], function($, NaturalSort, _ref7, _ref8, TwineError) {
            function readArguments(fn) {
                return function(args) { args = args.reduce(function(newArgs, el) {
                        if (el && el.spreader === !0)
                            if (Array.isArray(el.value) || "string" == typeof el.value)
                                for (var i = 0; i < el.value.length; i++) newArgs.push(el.value[i]);
                            else newArgs.push(el.value instanceof Set ? Array.from(el.value).sort(NaturalSort("en")) : TwineError.create("operation", "I can't spread out " + objectName(el.value) + ", which is not a string, dataset or array."));
                        else newArgs.push(el);
                        return newArgs }, []);
                    var error = TwineError.containsError(args);
                    return error ? error : fn.apply(void 0, _toConsumableArray(args)) } }

            function singleTypeCheck(arg, type) {
                if (null === type) return void 0 === arg;
                if (type.innerType) {
                    if ("optional" === type.pattern || "zero or more" === type.pattern) return void 0 === arg ? !0 : singleTypeCheck(arg, type.innerType);
                    if ("either" === type.pattern) return type.innerType.some(function(type) {
                        return singleTypeCheck(arg, type) });
                    if ("wrapped" === type.pattern) return singleTypeCheck(arg, type.innerType) }
                return void 0 !== type && void 0 === arg ? !1 : type !== Macros.TypeSignature.Any || void 0 === arg || arg.TwineScript_Unobservable ? type === String ? "string" == typeof arg : type === Boolean ? "boolean" == typeof arg : type === Number ? "number" == typeof arg : type === Array ? Array.isArray(arg) : type === Map || type === Set ? arg instanceof type : Object.isPrototypeOf.call(type, arg) : !0 }

            function typeSignatureCheck(name, fn, typeSignature) {
                if (!typeSignature) return fn;
                typeSignature = [].concat(typeSignature), name = "(" + (Array.isArray(name) && name.length > 1 ? name[0] : name) + ":)";
                var signatureInfo = void 0;
                return signatureInfo = typeSignature.length > 0 ? "The " + name + " macro must only be given " + typeSignature.map(typeName).reduce(function(a, e, i, arr) {
                        return a + (0 === i ? "" : i < arr.length - 1 ? ", " : ", and ") + e }, "") + (typeSignature.length > 1 ? ", in that order" : ".") : "The macro must not be given any data - just write " + name + ".",
                    function(section) {
                        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _len5 > _key5; _key5++) args[_key5 - 1] = arguments[_key5];
                        for (var rest = void 0, ind = 0, end = Math.max(args.length, typeSignature.length); end > ind; ind += 1) {
                            var type = typeSignature[ind],
                                arg = args[ind];
                            if (ind >= typeSignature.length && !rest) return TwineError.create("typesignature", args.length - typeSignature.length + " too many values were given to this " + name + " macro.", signatureInfo);
                            if (type || (type = rest), !type.innerType || "rest" !== type.pattern && "zero or more" !== type.pattern || (rest = type.innerType, "rest" === type.pattern && (type = type.innerType)), !singleTypeCheck(arg, type)) return void 0 === arg ? TwineError.create("typesignature", "The " + name + " macro needs " + plural(typeSignature.length - ind, "more value") + ".", signatureInfo) : arg && arg.TwineScript_Unobservable && type === Macros.TypeSignature.Any ? TwineError.create("typesignature", name + "'s " + nth(ind + 1) + " value is not valid data for this macro.", signatureInfo) : TwineError.create("typesignature", name + "'s " + nth(ind + 1) + " value is " + objectName(arg) + ", but should be " + typeName(type) + ".", type.message || signatureInfo) }
                        return fn.apply(void 0, [section].concat(args)) } }

            function privateAdd(name, type, fn) { Array.isArray(name) ? name.forEach(function(n) {
                    return lockProperty(macroRegistry, insensitiveName(n), fn) }) : lockProperty(macroRegistry, insensitiveName(name), fn) }
            var insensitiveName = _ref7.insensitiveName,
                nth = _ref7.nth,
                plural = _ref7.plural,
                assert = _ref7.assert,
                lockProperty = _ref7.lockProperty,
                objectName = _ref8.objectName,
                typeName = _ref8.typeName,
                Macros = void 0,
                macroRegistry = {},
                commandRegistry = {};
            return Macros = { has: function(e) {
                    return e = insensitiveName(e), macroRegistry.hasOwnProperty(e) }, get: function(e) {
                    return e = insensitiveName(e), macroRegistry.hasOwnProperty(e) && macroRegistry[e] }, add: function add(name, fn, typeSignature) {
                    return privateAdd(name, "value", readArguments(typeSignatureCheck(name, fn, typeSignature))), add }, addChanger: function addChanger(name, fn, changerCommandFn, typeSignature) {
                    return assert(changerCommandFn), privateAdd(name, "changer", readArguments(typeSignatureCheck(name, fn, typeSignature))), commandRegistry[Array.isArray(name) ? name[0] : name] = changerCommandFn, addChanger }, getChangerFn: function(name) {
                    return commandRegistry[name] }, TypeSignature: { optional: function(type) {
                        return { pattern: "optional", innerType: type } }, zeroOrMore: function(type) {
                        return { pattern: "zero or more", innerType: type } }, either: function() {
                        for (var _len6 = arguments.length, innerType = Array(_len6), _key6 = 0; _len6 > _key6; _key6++) innerType[_key6] = arguments[_key6];
                        return { pattern: "either", innerType: innerType } }, rest: function(type) {
                        return { pattern: "rest", innerType: type } }, wrapped: function(innerType, message) {
                        return { pattern: "wrapped", innerType: innerType, message: message } }, Any: { TwineScript_TypeName: "anything" } }, run: function(name, args) {
                    return TwineError.containsError(name) ? name : Macros.has(name) ? Macros.get(name)(args) : TwineError.create("macrocall", "I can't run the macro '" + name + "' because it doesn't exist.") } }, Object.freeze(Macros)
        }), define("datatypes/colour", ["utils", "jquery"], function(_ref9, $) {
            function css3ToRGB(colourName) {
                if (colourName in cssNameCache) return cssNameCache[colourName];
                var colour = $("<p>").css("background-color", colourName).css("background-color");
                return colour = colour.startsWith("rgb") ? colour.match(/\d+/g).reduce(function(colour, num, ind) {
                    return colour["rgb" [ind]] = +num, colour }, {}) : { r: 192, g: 192, b: 192 }, cssNameCache[colourName] = colour, colour }

            function hexToRGB(str) {
                return "string" != typeof str ? str : (str = str.replace("#", ""), str = str.replace(tripleDigit, "$1$1$2$2$3$3"), { r: parseInt(str.slice(0, 2), 16), g: parseInt(str.slice(2, 4), 16), b: parseInt(str.slice(4, 6), 16) }) }
            var assert = _ref9.assert,
                singleDigit = /^([\da-fA-F])$/,
                tripleDigit = /^([\da-fA-F])([\da-fA-F])([\da-fA-F])$/,
                sextupleDigit = /^([\da-fA-F])([\da-fA-F])([\da-fA-F])([\da-fA-F])([\da-fA-F])([\da-fA-F])$/,
                cssNameCache = Object.create(null),
                Colour = Object.freeze({ colour: !0, TwineScript_TypeName: "a colour", TwineScript_ObjectName: "a colour", "TwineScript_+": function(other) {
                        var l = this,
                            r = other;
                        return Colour.create({ r: Math.min(Math.round(.6 * (l.r + r.r)), 255), g: Math.min(Math.round(.6 * (l.g + r.g)), 255), b: Math.min(Math.round(.6 * (l.b + r.b)), 255) }) }, TwineScript_Print: function() {
                        return "<tw-colour style='background-color:rgb(" + [this.r, this.g, this.b].join(",") + ");'></span>" }, TwineScript_is: function(other) {
                        return Colour.isPrototypeOf(other) && other.r === this.r && other.g === this.g && other.b === this.b }, TwineScript_Clone: function() {
                        return Colour.create(this) }, toHexString: function() {
                        return assert(this !== Colour), "#" + this.r.toString(16).replace(singleDigit, "0$1") + this.g.toString(16).replace(singleDigit, "0$1") + this.b.toString(16).replace(singleDigit, "0$1") }, create: function(rgbObj) {
                        return "string" == typeof rgbObj ? this.create(Colour.isHexString(rgbObj) ? hexToRGB(rgbObj) : css3ToRGB(rgbObj)) : Object.assign(Object.create(this), rgbObj) }, isHexString: function(str) {
                        return "string" == typeof str && "#" === str[0] && (str.slice(1).match(tripleDigit) || str.slice(1).match(sextupleDigit)) } });
            return Colour }), define("utils/hookutils", ["jquery", "utils/selectors"], function($, Selectors) {
            function sliceNode(node, start, end) {
                var l = node.textContent.length;
                if (!(start >= l)) {
                    var newNode = void 0,
                        ret = [newNode = 0 === start ? node : node.splitText(start)];
                    return end && (0 >= end && (end = l - end), l > end && ret.push(newNode.splitText(end - start))), ret } }

            function findTextInNodes(textNodes, searchString) {
                var examinedNodes = [],
                    examinedText = "",
                    ret = [];
                if (!textNodes.length || !searchString) return ret;
                for (; textNodes.length > 0;) { examinedNodes.push(textNodes[0]), examinedText += textNodes[0].textContent, textNodes.shift();
                    var index = examinedText.indexOf(searchString);
                    if (index > -1) {
                        for (var _ret2, remainingLength = examinedText.length - (index + searchString.length); index >= examinedNodes[0].textContent.length;) index -= examinedNodes[0].textContent.length, examinedNodes.shift();
                        if (1 === examinedNodes.length) {
                            var _slices = sliceNode(examinedNodes[0], index, index + searchString.length);
                            ret.push(_slices[0]), _slices[1] && textNodes.unshift(_slices[1]);
                            break }
                        ret.push(sliceNode(examinedNodes[0], index, examinedNodes[0].length)[0]), (_ret2 = ret).push.apply(_ret2, _toConsumableArray(examinedNodes.slice(1, -1)));
                        var slices = sliceNode(examinedNodes[examinedNodes.length - 1], 0, examinedNodes[examinedNodes.length - 1].textContent.length - remainingLength);
                        ret.push(slices[0]), slices[1] && textNodes.unshift(slices[1]), ret = ret.filter(Boolean);
                        break } }
                return [ret].concat(_toConsumableArray(findTextInNodes(textNodes, searchString))) }
            var HookUtils = { wrapTextNodes: function(searchString, dom, htmlTag) {
                    var nodes = findTextInNodes(dom.textNodes(), searchString),
                        ret = $();
                    return nodes.forEach(function(e) { ret = ret.add($(e).wrapAll(htmlTag)) }), ret }, selectorType: function(val) {
                    if (val && "string" == typeof val) {
                        var r = /\?(\w*)/.exec(val);
                        return r && r.length ? "hookRef" : "<" === val[0] && ">" === val[val.length - 1] ? "html" : "string" }
                    return "undefined" }, hookToSelector: function(c) {
                    return c = c.replace(/"/g, "&quot;"), Selectors.hook + '[name="' + c + '"]' } };
            return Object.freeze(HookUtils) }), define("datatypes/hookset", ["jquery", "utils/hookutils"], function($, _ref10) {
            function hooks() {
                return this.section.$(hookToSelector(this.selector.slice(1))) }

            function jQueryCall(methodName) {
                for (var myHooks = hooks.call(this), _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _len7 > _key7; _key7++) args[_key7 - 1] = arguments[_key7];
                return methodName in myHooks && myHooks[methodName].apply(myHooks, args) }
            var hookToSelector = _ref10.hookToSelector,
                HookSet = Object.freeze({ forEach: function(fn) {
                        return jQueryCall.call(this, "each", function(i) { fn($(this), i) }) }, text: function() {
                        return jQueryCall.call(this, "text") }, TwineScript_ToString: function() {
                        return this.text() }, TwineScript_Print: function() {
                        return this.text() }, get TwineScript_ObjectName() {
                        return this.selector + " (a hook reference)" }, TwineScript_TypeName: "a hook reference (like ?this)", set TwineScript_Assignee(value) { this.section.renderInto(value, hooks.call(this), { append: "replace" }) }, get TwineScript_Assignee() {
                        return this }, TwineScript_AssignValue: function() {
                        return jQueryCall.call(this, "text") }, TwineScript_DeleteValue: function(prop) { "TwineScript_Assignee" === prop && jQueryCall.call(this, "text", "") }, create: function(section, hookSelector) {
                        var ret = Object.create(this);
                        return ret.section = section, ret.selector = hookSelector, Object.freeze(ret) } });
            return HookSet }), define("internaltypes/varref", ["state", "internaltypes/twineerror", "utils/operationutils", "datatypes/hookset"], function(State, TwineError, _ref11, HookSet) {
            function compilePropertyIndex(obj, prop) {
                var error = void 0;
                if (obj instanceof Map && (error = TwineError.containsError(isValidDatamapName(obj, prop)))) return error;
                if (isSequential(obj)) {
                    var match = void 0;
                    if ("number" == typeof prop) prop -= 1;
                    else if ("string" == typeof prop && (match = /(\d+)(?:st|[nr]d|th)last/i.exec(prop))) prop = -match[1] + "";
                    else if ("string" == typeof prop && (match = /(\d+)(?:st|[nr]d|th)/i.exec(prop))) prop = match[1] - 1 + "";
                    else if ("last" === prop) prop = -1;
                    else if ("length" !== prop) return TwineError.create("property", "You can only access position strings/numbers ('4th', 'last', '2ndlast', (2), etc.) and 'length' of " + objectName(obj) + ", not " + objectName(prop) + ".") } else if (obj instanceof Set) {
                    if ("length" !== prop) return TwineError.create("property", "You can only get the 'length' of a " + objectName(obj) + ".", "To check contained values, use the 'contains' operator.");
                    prop = "size" } else if ("number" == typeof obj || "boolean" == typeof obj) return TwineError.create("property", "You can't get data values from " + objectName(obj) + ".");
                return prop }

            function compilePropertyChain(object, propertyChain) {
                var compiledPropertyChain = propertyChain.reduce(function(arr, prop, i) { prop.computed && (prop = prop.value), prop = Array.isArray(prop) ? prop.map(function(prop) {
                        return compilePropertyIndex(object, prop) }) : compilePropertyIndex(object, prop);
                    var error = void 0;
                    return (error = TwineError.containsError(arr, prop)) ? error : (i < propertyChain.length - 1 && (object = _get(object, prop)), arr.push(prop), arr) }, []);
                return { compiledPropertyChain: compiledPropertyChain, deepestObject: object } }

            function objectOrMapGet(obj, prop) {
                return void 0 === obj ? obj : obj instanceof Map ? obj.get(prop) : (isSequential(obj) && 0 > prop - 0 && (prop = obj.length + (prop - 0)), obj[prop]) }

            function propertyDebugName(prop) {
                return prop.computed ? "(" + objectName(prop.value) + ")" : "'" + prop + "'" }

            function canSet(obj, prop) {
                if (Array.isArray(prop)) return prop.map(function(prop) {
                    return canSet(obj, prop) });
                var specialCollectionErrorMsg = "I won't add " + propertyDebugName(prop) + " to " + objectName(obj) + " because it's one of my special system collections.",
                    writeproofErrorMsg = "I can't modify '" + propertyDebugName(prop) + "' because it holds one of my special system collections.";
                if (obj instanceof Map) return obj.TwineScript_Sealed && !obj.has(prop) ? TwineError.create("operation", specialCollectionErrorMsg) : obj.TwineScript_Writeproof && obj.TwineScript_Writeproof.indexOf(prop) > -1 ? TwineError.create("operation", writeproofErrorMsg) : !0;
                if (isSequential(obj)) {
                    if ("length" === prop) return TwineError.create("operation", "I can't forcibly alter the length of " + objectName(obj) + ".");
                    if (+prop !== (0 | prop)) return TwineError.create("property", objectName(obj) + " can only have position keys ('3rd', '1st', (5), etc.), not " + propertyDebugName(prop) + ".") }
                return !obj.TwineScript_Sealed || prop in obj ? obj.TwineScript_Writeproof && obj.TwineScript_Writeproof.indexOf(prop) > -1 ? TwineError.create("operation", writeproofErrorMsg) : "number" == typeof obj || "boolean" == typeof obj ? TwineError.create("operation", "You can't alter the data values of " + objectName(obj) + ".") : !0 : TwineError.create("operation", specialCollectionErrorMsg) }

            function objectOrMapSet(obj, prop, value) { obj instanceof Map ? obj.set(prop, value) : (isSequential(obj) && 0 > prop - 0 && (prop = obj.length + (prop - 0)), obj[prop] = value) }

            function objectOrMapDelete(obj, prop) { isSequential(obj) && 0 > prop - 0 && (prop = obj.length + (prop - 0)), Array.isArray(obj) && numericIndex.exec(prop) ? obj.splice(prop, 1) : obj instanceof Map || obj instanceof Set ? obj["delete"](prop) : obj.TwineScript_DeleteValue ? obj.TwineScript_DeleteValue(prop) : delete obj[prop] }

            function wrapError(error) {
                function self() {
                    return error }
                return { get: self, set: self, "delete": self } }

            function _get(obj, prop, originalProp) {
                if (Array.isArray(prop)) return prop.map(function(e) {
                    return _get(obj, e, e) })["string" == typeof obj ? "join" : "valueOf"](""); "string" == typeof obj && (obj = [].concat(_toConsumableArray(obj)));
                var result = objectOrMapGet(obj, prop);
                return void 0 === result ? obj === State.variables ? defaultValue : TwineError.create("property", "I can't find a " + propertyDebugName(originalProp) + " data name in " + objectName(obj)) : result }

            function mutateRight(fn, value) {
                var _this = this,
                    result = this.compiledPropertyChain.reduce(function(arr, prop) {
                        var object = void 0;
                        return object = 0 === arr.length ? _this.object : _get.apply(void 0, _toConsumableArray(arr[arr.length - 1])), arr.push([object, prop]) && arr }, []).reduceRight(fn, value);
                return TwineError.containsError(result) ? result : void 0 }
            var isObject = _ref11.isObject,
                isSequential = _ref11.isSequential,
                objectName = _ref11.objectName,
                clone = _ref11.clone,
                numericIndex = _ref11.numericIndex,
                isValidDatamapName = _ref11.isValidDatamapName,
                defaultValue = 0,
                VarRefProto = Object.freeze({ varref: !0, get: function() {
                        return _get(this.deepestObject, this.compiledPropertyChain.slice(-1)[0], this.propertyChain.slice(-1)[0]) }, set: function(value) {
                        return value && value.TwineScript_AssignValue && (value = value.TwineScript_AssignValue()), mutateRight.call(this, function(value, _ref12, i) {
                            var _ref13 = _slicedToArray(_ref12, 2),
                                object = _ref13[0],
                                property = _ref13[1],
                                error = void 0;
                            if (error = TwineError.containsError(value, object, property) || TwineError.containsError(isObject(object) && canSet(object, property))) return error;
                            if (HookSet.isPrototypeOf(object) && "string" != typeof value) return TwineError.create("datatype", "You can only set hook references to strings, not " + objectName(value) + ".");
                            if ("string" == typeof object) {
                                var _ret3 = function() {
                                    if ("string" != typeof value || value.length !== (Array.isArray(property) ? property.length : 1)) return { v: TwineError.create("datatype", "I can't put this non-string value, " + objectName(value) + ", in a string.") };
                                    object = [].concat(_toConsumableArray(object));
                                    var valArray = [].concat(_toConsumableArray(value));
                                    [].concat(property).forEach(function(index) { 0 > 0 + index && (index = object.length + (0 + index)), object = [].concat(_toConsumableArray(object.slice(0, index)), [valArray.shift()], _toConsumableArray(object.slice(index + 1))) }), object = object.join("") }();
                                if ("object" === ("undefined" == typeof _ret3 ? "undefined" : _typeof(_ret3))) return _ret3.v } else isObject(object) && (Array.isArray(property) && isSequential(value) ? ("string" == typeof value && (value = [].concat(_toConsumableArray(value))), property.map(function(prop, i) {
                                return [prop, value[i]] }).forEach(function(_ref14) {
                                var _ref15 = _slicedToArray(_ref14, 2),
                                    e = _ref15[0],
                                    value = _ref15[1];
                                return objectOrMapSet(object, e, value) })) : objectOrMapSet(object, property, value));
                            return i > 0 && (object = clone(object)), object }, value) }, "delete": function() {
                        return mutateRight.call(this, function(value, _ref16, i) {
                            var _ref17 = _slicedToArray(_ref16, 2),
                                object = _ref17[0],
                                property = _ref17[1],
                                error = void 0;
                            return (error = TwineError.containsError(value, object, property) || TwineError.containsError(isObject(object) && canSet(object, property))) ? error : (i > 0 && (object = clone(object)), null === value ? isObject(object) && (Array.isArray(property) ? property.forEach(function(prop) {
                                return objectOrMapDelete(object, prop) }) : objectOrMapDelete(object, property)) : objectOrMapSet(object, property, value), object) }, null) }, create: function(object, propertyChain) {
                        var error = void 0;
                        if (error = TwineError.containsError(object)) return wrapError(error);
                        propertyChain = [].concat(propertyChain), VarRefProto.isPrototypeOf(object) && (propertyChain = object.propertyChain.concat(propertyChain), object = object.object);
                        var _compilePropertyChain = compilePropertyChain(object, propertyChain),
                            compiledPropertyChain = _compilePropertyChain.compiledPropertyChain,
                            deepestObject = _compilePropertyChain.deepestObject;
                        return (error = TwineError.containsError(compiledPropertyChain, deepestObject)) ? wrapError(error) : Object.assign(Object.create(VarRefProto), { object: object, propertyChain: propertyChain, compiledPropertyChain: compiledPropertyChain, deepestObject: deepestObject }) }, get TwineScript_ObjectName() {
                        return (this.object === State.variables ? "$" : objectName(this.object) + "'s ") + this.propertyChain.reduce(function(a, e) {
                            return a + "'s " + propertyDebugName(e) }) } });
            return VarRefProto }), define("internaltypes/assignmentrequest", ["utils"], function(_ref18) {
            var assert = _ref18.assert,
                assignmentRequest = Object.freeze({ assignmentRequest: !0, TwineScript_TypeName: "an assignment operation", TwineScript_ObjectName: "an assignment operation", TwineScript_Unobservable: !0, create: function(dest, src, operator) {
                        return assert("propertyChain" in dest && "object" in dest), Object.assign(Object.create(this), { dest: dest, src: src, operator: operator }) } });
            return assignmentRequest }), define("twinescript/operations", ["state", "datatypes/colour", "internaltypes/assignmentrequest", "utils/operationutils", "internaltypes/twineerror"], function(State, Colour, AssignmentRequest, _ref19, TwineError) {
            function onlyPrimitives(type, fn, operationVerb, message) {
                return operationVerb = operationVerb || "do this to",
                    function(left, right) { 1 === fn.length && (right = left);
                        var error = void 0;
                        return (error = TwineError.containsError(left, right)) ? error : ("undefined" == typeof left ? "undefined" : _typeof(left)) !== type || ("undefined" == typeof right ? "undefined" : _typeof(right)) !== type ? TwineError.create("operation", "I can only " + operationVerb + " " + type + "s, not " + objectName(("undefined" == typeof left ? "undefined" : _typeof(left)) !== type ? left : right) + ".", message) : fn(left, right) } }

            function doNotCoerce(fn) {
                return function(left, right) {
                    var error = void 0;
                    return (error = TwineError.containsError(left, right)) ? error : left && left.varref ? TwineError.create("operation", "I can't give an expression a new value.") : ("undefined" == typeof left ? "undefined" : _typeof(left)) !== ("undefined" == typeof right ? "undefined" : _typeof(right)) || collectionType(left) !== collectionType(right) ? coerceToString(fn, left, right) || TwineError.create("operation", objectName(left) + " isn't the same type of data as " + objectName(right)) : fn(left, right) } }

            function comparisonOp(fn) {
                return function(left, right) {
                    return It = left, fn(left, right) } }
            var isObject = _ref19.isObject,
                collectionType = _ref19.collectionType,
                coerceToString = _ref19.coerceToString,
                is = _ref19.is,
                contains = _ref19.contains,
                objectName = _ref19.objectName,
                Operations = void 0,
                It = 0,
                andOrNotMessage = "If one of these values is a number, you may want to write a check that it 'is not 0'. Also, if one is a string, you may want to write a check that it 'is not \"\" '.";
            return Operations = { create: function(section) {
                    var ret = Object.create(this);
                    return ret.Identifiers = {get it() {
                            return It }, get time() {
                            return Date.now() - section.timestamp } }, ret }, and: onlyPrimitives("boolean", doNotCoerce(function(l, r) {
                    return l && r }), "use 'and' to join", andOrNotMessage), or: onlyPrimitives("boolean", doNotCoerce(function(l, r) {
                    return l || r }), "use 'or' to join", andOrNotMessage), not: onlyPrimitives("boolean", function(e) {
                    return !e }, "use 'not' to invert", andOrNotMessage), "+": doNotCoerce(function(l, r) {
                    if (Array.isArray(l)) return [].concat(_toConsumableArray(l), _toConsumableArray(r));
                    var ret = void 0;
                    return l instanceof Map ? (ret = new Map(l), r.forEach(function(v, k) {
                        return ret.set(k, v) }), ret) : l instanceof Set ? (ret = new Set(l), r.forEach(function(v) {
                        return ret.add(v) }), ret) : "function" == typeof l["TwineScript_+"] ? l["TwineScript_+"](r) : "string|number|boolean".includes("undefined" == typeof l ? "undefined" : _typeof(l)) ? l + r : TwineError.create("operation", "I can't use + on " + objectName(l) + ".") }), "-": doNotCoerce(function(l, r) {
                    if (Array.isArray(l)) return l.filter(function(e) {
                        return -1 === r.indexOf(e) });
                    var ret = void 0;
                    return l instanceof Set ? (ret = new Set(l), r.forEach(function(v) {
                        return ret["delete"](v) }), ret) : "string" == typeof l ? l.split(r).join("") : l - r }), "*": onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return l * r }), "multiply"), "/": onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return 0 === r ? TwineError.create("operation", "I can't divide " + objectName(l) + " by zero.") : l / r }), "divide"), "%": onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return 0 === r ? TwineError.create("operation", "I can't modulo " + objectName(l) + " by zero.") : l % r }), "modulus"), "<": comparisonOp(onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return r > l }), "do < to")), ">": comparisonOp(onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return l > r }), "do > to")), "<=": comparisonOp(onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return r >= l }), "do <= to")), ">=": comparisonOp(onlyPrimitives("number", doNotCoerce(function(l, r) {
                    return l >= r }), "do >= to")), is: comparisonOp(is), isNot: comparisonOp(function(l, r) {
                    return !Operations.is(l, r) }), contains: comparisonOp(contains), isIn: comparisonOp(function(l, r) {
                    return contains(r, l) }), makeSpreader: function(val) {
                    return { value: val, spreader: !0 } }, makeAssignmentRequest: function(dest, src, operator) {
                    var error = TwineError.containsError(dest, src);
                    return error ? error : src && src.TwineScript_Unobservable ? TwineError.create("operation", "That type of value can't be stored.") : isObject(dest) && "propertyChain" in dest ? AssignmentRequest.create(dest, src, operator) : TwineError.create("operation", "I can't store a new value inside " + objectName(dest) + ".") }, setIt: function(e) {
                    return TwineError.containsError(e) ? e : e.varref ? (It = e.get(), e) : TwineError.create("operation", "I can't put a new value into " + objectName(e) + ".") } }, Object.freeze(Operations) }), define("twinescript/environ", ["macros", "state", "utils", "datatypes/colour", "internaltypes/varref", "internaltypes/twineerror", "twinescript/operations"], function(Macros, State, Utils, Colour, VarRef, TwineError, OperationsProto) {
            return function(section) { "object" === ("undefined" == typeof section ? "undefined" : _typeof(section)) && section || Utils.impossible("TwineScript.environ", "no Section argument was given!");
                var Operations = OperationsProto.create(section);
                return section.eval = function() {
                    try {
                        return eval(Array.from(arguments).join("")) } catch (e) {
                        return Utils.log(e), Utils.log(Array.from(arguments).join("")), e } }, section } }), define("internaltypes/pseudohookset", ["jquery", "utils/hookutils"], function($, _ref20) {
            var wrapTextNodes = _ref20.wrapTextNodes,
                PseudoHookSet = Object.freeze({ forEach: function(fn) {
                        var e = wrapTextNodes(this.selector, this.section.dom, "<tw-pseudo-hook>").parent();
                        e.each(function(i) { fn($(this), i) }), e.contents().unwrap().parent().each(function() { this.normalize() }) }, create: function(section, pseudoHookSelector) {
                        var ret = Object.create(this);
                        return ret.section = section, ret.selector = pseudoHookSelector, ret } });
            return PseudoHookSet }), define("internaltypes/changedescriptor", ["jquery", "utils", "renderer"], function($, _ref21, _ref22) {
            var assertOnlyHas = _ref21.assertOnlyHas,
                impossible = _ref21.impossible,
                transitionIn = _ref21.transitionIn,
                exec = _ref22.exec,
                changeDescriptorShape = void 0,
                ChangeDescriptor = { source: "", enabled: !0, target: null, append: "append", transition: "instant", transitionTime: 0, styles: null, attr: null, data: null, section: null, create: function(properties, changer) {
                        var ret = Object.assign(Object.create(this), { attr: [].concat(this.attr || []), styles: [].concat(this.styles || []) }, properties);
                        return changer && changer.run(ret), ret }, update: function() {
                        var _this2 = this,
                            target = this.target;
                        Array.isArray(this.styles) && setTimeout(function() {
                            var _Object;
                            return target.css((_Object = Object).assign.apply(_Object, _toConsumableArray([{}].concat(_this2.styles)))) }), this.attr && this.attr.forEach(function(e) {
                            return target.attr(e) }), this.data && target.data(this.data) }, render: function() {
                        var target = this.target,
                            source = this.source,
                            transition = this.transition,
                            enabled = this.enabled,
                            append = this.append;
                        if (assertOnlyHas(this, changeDescriptorShape), !target || !enabled) return $();
                        if (!(append in target)) {
                            if ("replace" !== append) return void impossible("Section.render", "The target jQuery doesn't have a '" + append + "' method.");
                            target.empty(), append = "append" }
                        var dom = $(source && $.parseHTML(exec(source), document, !0));
                        return target[append](dom.length ? dom : void 0), this.update(), transition && transitionIn("replace" === append ? target : dom, transition), dom } };
            return changeDescriptorShape = Object.keys(ChangeDescriptor), Object.seal(ChangeDescriptor) }), define("internaltypes/twinenotifier", ["jquery", "utils"], function($, _ref23) {
            var impossible = _ref23.impossible,
                TwineNotifier = { create: function(message) {
                        return message || impossible("TwineNotifier.create", "called with only 1 string."), Object.assign(Object.create(TwineNotifier), { message: message }) }, render: function() {
                        return $("<tw-notifier>").attr("message", this.message) } };
            return TwineNotifier }), define("section", ["jquery", "utils", "utils/selectors", "renderer", "twinescript/environ", "state", "utils/hookutils", "datatypes/hookset", "internaltypes/pseudohookset", "internaltypes/changedescriptor", "internaltypes/twineerror", "internaltypes/twinenotifier"], function($, Utils, Selectors, Renderer, Environ, State, HookUtils, HookSet, PseudoHookSet, ChangeDescriptor, TwineError, TwineNotifier) {
            function applyExpressionToHook(expr, result) {
                var nextHook = expr.next(Selectors.hook);
                if (result && result.changer)
                    if (nextHook.length) {
                        var enabled = this.renderInto(nextHook.popAttr("source"), nextHook, result);
                        if (!enabled) return expr.addClass("false"), void("elseif" !== Utils.insensitiveName(expr.attr("name")) && (this.stack[0].lastHookShown = !1)) } else expr.replaceWith(TwineError.create("changer", "The (" + result.macroName + ":) command should be assigned to a variable or attached to a hook.", "Macros like this should usually be touching the left side of a hook: " + expr.attr("title") + "[Some text]").render(expr.attr("title")));
                else if (result && result.live) runLiveHook.call(this, nextHook, result.delay, result.event);
                else if ((result === !1 || null === result || void 0 === result) && (nextHook.removeAttr("source"), expr.addClass("false"), nextHook.length)) return void(this.stack[0].lastHookShown = !1);
                nextHook.length && (this.stack[0].lastHookShown = !0) }

            function runExpression(expr) {
                var result = this.eval(expr.popAttr("js") || "");
                if (TwineError.containsError(result)) result instanceof Error && (result = TwineError.fromError(result)), expr.replaceWith(result.render(expr.attr("title"), expr));
                else if (TwineNotifier.isPrototypeOf(result)) expr.append(result.render());
                else if (result && result.TwineScript_Print && !result.changer) {
                    if (result = result.TwineScript_Print(), result.earlyExit) return !1;
                    result instanceof $ ? expr.append(result) : TwineError.containsError(result) ? (result instanceof Error && (result = TwineError.fromError(result)), expr.replaceWith(result.render(expr.attr("title"), expr))) : this.renderInto(result, expr) } else "string" == typeof result || "number" == typeof result || "object" === ("undefined" == typeof result ? "undefined" : _typeof(result)) && result && result.toString !== Object.prototype.toString ? this.renderInto(result + "", expr) : applyExpressionToHook.call(this, expr, result) }

            function collapse(elem) {
                function noVerbatim(e) {
                    return 0 === $(this || e).parentsUntil("tw-collapsed").filter("tw-verbatim, tw-expression, [collapsing=false]").length }
                var beforeNode = elem.prevTextNode();
                $(beforeNode).parents("tw-collapsed").length || (beforeNode = null);
                var afterNode = elem.nextTextNode();
                $(afterNode).parents("tw-collapsed").length || (afterNode = null), Utils.findAndFilter(elem, "br:not([data-raw])").filter(noVerbatim).replaceWith(document.createTextNode(" "));
                var nodes = elem.textNodes(),
                    finalSpaces = 0;
                nodes.reduce(function(prevNode, node) {
                    return noVerbatim(node) ? (node.textContent = node.textContent.replace(/\s+/g, " "), " " !== node.textContent[0] || prevNode && prevNode.textContent && !(prevNode.textContent.search(/\s$/) > -1) || (node.textContent = node.textContent.slice(1)), node) : document.createTextNode("A") }, beforeNode), [].concat(_toConsumableArray(nodes)).reverse().every(function(node) {
                    return noVerbatim(node) ? node.textContent.match(/^\s*$/) ? (finalSpaces += node.textContent.length, node.textContent = "", !0) : (node.textContent = node.textContent.replace(/\s+$/, function(substr) {
                        return finalSpaces += substr.length, "" }), !1) : !1 }), finalSpaces > 0 && afterNode && (nodes[nodes.length - 1].textContent += " "), elem[0] && supportsNormalize() && elem[0].normalize() }

            function runLiveHook(target, delay) {
                var _this3 = this,
                    source = target.popAttr("source") || "";
                delay = void 0 === delay ? 20 : delay;
                var recursive = function recursive() { _this3.inDOM() && (_this3.renderInto(source, target, { append: "replace" }), target.find(Selectors.expression + "[name='stop']").length || _this3.inDOM() && setTimeout(recursive, delay)) };
                setTimeout(recursive, delay) }
            var Section = void 0,
                supportsNormalize = function() {
                    var result = void 0;
                    return function() {
                        if (void 0 !== result) return result;
                        var p = $("<p>");
                        return p[0].normalize ? (p.append(document.createTextNode("0-"), document.createTextNode("2"), document.createTextNode(""))[0].normalize(), result = 1 === p.contents().length) : result = !1 } }();
            return Section = {
                create: function(dom) { Utils.assert(dom instanceof $ && 1 === dom.length);
                    var ret = Object.assign(Object.create(this), { timestamp: Date.now(), dom: dom || Utils.storyElement, stack: [], enchantments: [] });
                    return ret = Environ(ret) },
                inDOM: function() {
                    return $(Utils.storyElement).find(this.dom).length > 0 },
                $: function(str) {
                    return Utils.$(str, this.dom) },
                evaluateTwineMarkup: function(expr) {
                    var p = $("<p>");
                    this.renderInto(expr, p);
                    var errors = void 0;
                    return (errors = p.find("tw-error")).length > 0 ? errors : p.text() },
                selectHook: function(selectorString) {
                    if (HookSet.isPrototypeOf(selectorString) || PseudoHookSet.isPrototypeOf(selectorString)) return selectorString;
                    switch (HookUtils.selectorType(selectorString)) {
                        case "hookRef":
                            return HookSet.create(this, selectorString);
                        case "html":
                            return Utils.findAndFilter(this.dom.add(Utils.storyElement), selectorString.slice(1, -1));
                        case "string":
                            return PseudoHookSet.create(this, selectorString) }
                    return null },
                renderInto: function(source, target, changers) {
                    var desc = ChangeDescriptor.create({ target: target, source: source });
                    if (desc.section = this, changers && [].concat(changers).forEach(function(changer) { changer && changer.changer ? changer.run(desc) : Object.assign(desc, changer) }), "string" == typeof desc.target && (desc.target = this.selectHook(desc.target)), !desc.target) return Utils.impossible("Section.renderInto", "ChangeDescriptor has source but not a target!"), !1;
                    var dom = $();
                    this.stack.length >= 50 ? dom = TwineError.create("infinite", "Printing this expression may have trapped me in an infinite loop.").render(target.attr("title")).replaceAll(target) : desc.target instanceof $ ? dom = desc.render() : desc.target.forEach(function(e) { dom = dom.add(desc.create({ target: e }).render()) }), this.stack.unshift(Object.create(null));
                    var section = this;
                    return Utils.findAndFilter(dom, Selectors.hook + "," + Selectors.expression).each(function() {
                        var expr = $(this);
                        switch (expr.tag()) {
                            case Selectors.hook:
                                expr.attr("source") && (section.renderInto(expr.attr("source"), expr), expr.removeAttr("source"));
                                break;
                            case Selectors.expression:
                                return runExpression.call(section, expr) }
                    }), dom.length && target instanceof $ && target.is(Selectors.hook) && target.parents("tw-collapsed").length > 0 && collapse(dom), Utils.findAndFilter(dom, Selectors.collapsed).each(function() { collapse($(this)) }), this.stack.shift(), 0 === this.stack.length && this.updateEnchantments(), desc.enabled
                },
                updateEnchantments: function() { this.enchantments.forEach(function(e) { e.disenchant(), e.enchantScope() }) }
            }, Object.preventExtensions(Section)
        }), define("engine", ["jquery", "utils", "utils/selectors", "state", "section", "passages"], function($, Utils, Selectors, State, Section, Passages) {
            function createPassageElement() {
                var container = $("<tw-passage><tw-sidebar>"),
                    sidebar = container.children(Selectors.sidebar);
                options.permalink && State.save && sidebar.append('<tw-icon tabindex=0 class="permalink" title="Permanent link to this passage"><a href="#' + State.save() + '">&sect;');
                var back = $('<tw-icon tabindex=0 class="undo" title="Undo">&#8630;</tw-icon>').click(Engine.goBack),
                    fwd = $('<tw-icon tabindex=0 class="redo" title="Redo">&#8631;</tw-icon>').click(Engine.goForward);
                return State.pastLength <= 0 && back.css("visibility", "hidden"), State.futureLength <= 0 && fwd.css("visibility", "hidden"), sidebar.append(back).append(fwd), container }

            function setupPassageElement(tagType, setupPassage) {
                return "<tw-include type=" + tagType + " title='" + escape(setupPassage.get("name")) + "'>" + setupPassage.get("source") + "</tw-include>" }

            function showPassage(name, stretch) {
                var t8n = "instant",
                    passageData = Passages.get(name),
                    story = Utils.storyElement,
                    parent = story.parent();
                parent.is(Selectors.enchantment) && (parent = story.unwrap().parent()), passageData && passageData instanceof Map && passageData.has("source") || impossible("Engine.showPassage", "There's no passage with the name \"" + name + '"!'), story.detach();
                var oldPassages = Utils.$(story.children(passageSelector));!stretch && t8n && transitionOut(oldPassages, t8n);
                var newPassage = createPassageElement().appendTo(story);
                assert(newPassage.length > 0);
                var section = Section.create(newPassage),
                    source = passageData.get("source");
                source = (options.debug ? Passages.getTagged("debug-header").map(setupPassageElement.bind(0, "debug-header")).join("") : "") + Passages.getTagged("header").map(setupPassageElement.bind(0, "header")).join("") + source + Passages.getTagged("footer").map(setupPassageElement.bind(0, "footer")).join("") + (options.debug ? Passages.getTagged("debug-footer").map(setupPassageElement.bind(0, "debug-footer")).join("") : ""), State.pastLength <= 0 && (options.debug && (source = Passages.getTagged("debug-startup").map(setupPassageElement.bind(0, "debug-startup")).join("") + source), source = Passages.getTagged("startup").map(setupPassageElement.bind(0, "startup")).join("") + source), section.renderInto(source, newPassage, [{ transition: "dissolve" }]), $("html").append(story.parent().length ? story.parent() : story), scroll(0, stretch ? newPassage.offset().top - .05 * $(window).height() : parent.offset().top) }
            var escape = Utils.escape,
                impossible = Utils.impossible,
                passageSelector = Utils.passageSelector,
                transitionOut = Utils.transitionOut,
                assert = Utils.assert,
                Engine = void 0,
                options = Object.create(null);
            return Engine = { goBack: function() { State.rewind() && showPassage(State.passage) }, goForward: function() { State.fastForward() && showPassage(State.passage) }, goToPassage: function(id, stretch) { State.play(id), showPassage(id, stretch) }, showPassage: showPassage, options: options }, Object.freeze(Engine) }), define("macrolib/values", ["macros", "utils/operationutils", "internaltypes/twineerror"], function(Macros, _ref24, TwineError) {
            function mathFilter(fn) {
                return function(args) {
                    var result = fn.apply(void 0, _toConsumableArray(args));
                    return "number" != typeof result || isNaN(result) ? TwineError.create("macrocall", "This mathematical expression doesn't compute!") : result } }

            function either() {
                return arguments.length <= ~~(Math.random() * arguments.length) + 0 ? void 0 : arguments[~~(Math.random() * arguments.length) + 0] }
            var subset = _ref24.subset,
                objectName = _ref24.objectName,
                _Macros$TypeSignature = Macros.TypeSignature,
                rest = _Macros$TypeSignature.rest,
                zeroOrMore = _Macros$TypeSignature.zeroOrMore,
                Any = _Macros$TypeSignature.Any;
            Macros.add(["text", "string"], function() {
                for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _len8 > _key8; _key8++) args[_key8 - 1] = arguments[_key8];
                return args.join("") }, [zeroOrMore(Macros.TypeSignature.either(String, Number, Boolean, Array))])("substring", function(_, string, a, b) {
                return subset(string, a, b) }, [String, Number, Number])(["num", "number"], function(_, expr) {
                return Number.isNaN(+expr) ? TwineError.create("macrocall", "I couldn't convert " + objectName(expr) + " to a number.") : +expr }, [String]), { weekday: [function() {
                    return ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"][(new Date).getDay()] + "day" }, null], monthday: [function() {
                    return (new Date).getDate() }, null], currenttime: [function() {
                    var d = new Date,
                        am = d.getHours() < 12;
                    return d.getHours() % 12 + ":" + d.getMinutes() + " " + (am ? "A" : "P") + "M" }, null], currentdate: [function() {
                    return (new Date).toDateString() }, null], min: [Math.min, rest(Number)], max: [Math.max, rest(Number)], abs: [Math.abs, Number], sign: [Math.sign, Number], sin: [Math.sin, Number], cos: [Math.cos, Number], tan: [Math.tan, Number], floor: [Math.floor, Number], round: [Math.round, Number], ceil: [Math.ceil, Number], pow: [Math.pow, Number], exp: [Math.exp, Number], sqrt: [mathFilter(Math.sqrt), Number], log: [mathFilter(Math.log), Number], log10: [mathFilter(Math.log10), Number], log2: [mathFilter(Math.log2), Number], random: [function(a, b) {
                        if (a !== (0 | a) || b !== (0 | b)) return TwineError.create("macrocall", "(random:) only accepts whole numbers, not " + objectName(a !== (0 | a) ? a : b));
                        var from = void 0,
                            to = void 0;
                        return b ? (from = Math.min(a, b), to = Math.max(a, b)) : (from = 0, to = a), to += 1, ~~(Math.random() * (to - from)) + from },
                    [Number, Macros.TypeSignature.optional(Number)]
                ], either: [either, rest(Any)], alert: [function(text) {
                    return window.alert(text || "") }, String], prompt: [function(text, value) {
                    return window.prompt(text || "", value || "") || "" }, String, String], confirm: [function(text) {
                    return window.confirm(text || "") }, String], openURL: [window.open, String], reload: [window.location.reload.bind(window.location), null], gotoURL: [window.location.assign.bind(window.location), String], pageURL: [function() {
                    return window.location.href }, null], "": function() {
                    var _this4 = this;
                    Object.keys(this).forEach(function(key) { key && ! function() {
                            var fn = _this4[key][0],
                                typeSignature = _this4[key][1];
                            Macros.add(key, function() {
                                for (var _len9 = arguments.length, rest = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _len9 > _key9; _key9++) rest[_key9 - 1] = arguments[_key9];
                                return fn.apply(void 0, rest) }, typeSignature) }() }) } }[""]() }),
        function(global) {! function() {
                if (!global.requestAnimationFrame) { global.webkitRequestAnimationFrame && (global.requestAnimationFrame = global.webkitRequestAnimationFrame, global.cancelAnimationFrame = global.webkitCancelAnimationFrame || global.webkitCancelRequestAnimationFrame);
                    var lastTime = 0;
                    global.requestAnimationFrame = function(callback) {
                        var currTime = (new Date).getTime(),
                            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                            id = global.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall);
                        return lastTime = currTime + timeToCall, id }, global.cancelAnimationFrame = function(id) { clearTimeout(id) } } }(), "function" == typeof define && define("requestAnimationFrame", [], function() {
                return global.requestAnimationFrame }) }(window), define("macrolib/commands", ["requestAnimationFrame", "macros", "utils", "state", "passages", "engine", "internaltypes/twineerror", "utils/operationutils"], function(requestAnimationFrame, Macros, _ref25, State, Passages, Engine, TwineError, _ref26) {
            function storagePrefix(text) {
                return "(" + text + " " + Engine.options.ifid + ") " }
            var toJSLiteral = _ref25.toJSLiteral,
                unescape = _ref25.unescape,
                isObject = _ref26.isObject,
                _Macros$TypeSignature2 = Macros.TypeSignature,
                Any = _Macros$TypeSignature2.Any,
                optional = _Macros$TypeSignature2.optional,
                hasStorage = !!localStorage && function() {
                    try {
                        return localStorage.setItem("test", "1"), localStorage.removeItem("test"), !0 } catch (e) {
                        return !1 } }();
            Macros.add("display", function(_, name) {
                return { TwineScript_ObjectName: "a (display: " + toJSLiteral(name) + ") command", TwineScript_TypeName: "a (display:) command", TwineScript_Print: function() {
                        return Passages.has(name) ? unescape(Passages.get(name).get("source")) : TwineError.create("macrocall", "I can't (display:) the passage '" + name + "' because it doesn't exist.") } } }, [String])("print", function print(_, expr) {
                if (TwineError.containsError(expr)) return expr;
                if (expr && "function" == typeof expr.TwineScript_Print) expr = expr.TwineScript_Print();
                else if (expr instanceof Map) {
                    if (expr = Array.from(expr.entries()), TwineError.containsError(expr)) return expr;
                    expr = expr.reduce(function(html, pair) {
                        return html + "<tr><td>" + print(_, pair[0]).TwineScript_Print() + "</td><td>" + print(_, pair[1]).TwineScript_Print() + "</td></tr>" }, "<table class=datamap>") + "</table>" } else if (expr instanceof Set) expr = Array.from(expr.values());
                else if (Array.isArray(expr)) expr += "";
                else {
                    if (isObject(expr)) throw new TypeError("I don't know how to print this value yet.");
                    expr += "" }
                return { TwineScript_ObjectName: "a (print: " + toJSLiteral(expr) + ") command", TwineScript_TypeName: "a (print:) command", TwineScript_Print: function() {
                        return expr } } }, [Any])("goto", function(_, name) {
                return { TwineScript_ObjectName: "a (go-to: " + toJSLiteral(name) + ") command", TwineScript_TypeName: "a (go-to:) command", TwineScript_Print: function() {
                        return Passages.has(name) ? (requestAnimationFrame(Engine.goToPassage.bind(Engine, name, !1)), { earlyExit: 1 }) : TwineError.create("macrocall", "I can't (go-to:) the passage '" + name + "' because it doesn't exist.") } } }, [String])("live", function(_, delay) {
                return { TwineScript_ObjectName: "a (live: " + delay + ") command", TwineScript_TypeName: "a (live:) command", live: !0, delay: delay } }, [optional(Number)])("stop", function() {
                return { TwineScript_ObjectName: "a (stop:) command", TwineScript_TypeName: "a (stop:) command", TwineScript_Print: function() {
                        return "" } } }, [])("savegame", function(_, slotName, fileName) {
                if (fileName = fileName || "", !hasStorage) return !1;
                var serialisation = State.serialise();
                if (!serialisation) return TwineError.create("saving", "The game's variables contain a complex data structure; the game can no longer be saved.");
                try {
                    return localStorage.setItem(storagePrefix("Saved Game") + slotName, serialisation), localStorage.setItem(storagePrefix("Saved Game Filename") + slotName, fileName), !0 } catch (e) {
                    return !1 } }, [String, optional(String)])("loadgame", function(_, slotName) {
                return { TwineScript_ObjectName: "a (load-game:) command", TwineScript_TypeName: "a (load-game:) command", TwineScript_Print: function() {
                        var saveData = localStorage.getItem(storagePrefix("Saved Game") + slotName);
                        return saveData ? (State.deserialise(saveData), requestAnimationFrame(Engine.showPassage.bind(Engine, State.passage, !1)), { earlyExit: 1 }) : TwineError.create("saving", "I can't find a save slot named '" + slotName + "'!") } } }, [String]) }), define("macrolib/datastructures", ["jquery", "utils/naturalsort", "macros", "utils/operationutils", "state", "engine", "passages", "internaltypes/assignmentrequest", "internaltypes/twineerror", "internaltypes/twinenotifier"], function($, NaturalSort, Macros, _ref27, State, Engine, Passages, AssignmentRequest, TwineError, TwineNotifier) {
            var objectName = _ref27.objectName,
                subset = _ref27.subset,
                collectionType = _ref27.collectionType,
                isValidDatamapName = _ref27.isValidDatamapName,
                _Macros$TypeSignature3 = Macros.TypeSignature,
                optional = _Macros$TypeSignature3.optional,
                rest = _Macros$TypeSignature3.rest,
                zeroOrMore = _Macros$TypeSignature3.zeroOrMore,
                Any = _Macros$TypeSignature3.Any;
            Macros.add("set", function() {
                for (var debugMessage = "", i = 0; i < arguments.length - 1; i += 1) {
                    var ar = arguments.length <= i + 1 ? void 0 : arguments[i + 1];
                    if ("into" === ar.operator) return TwineError.create("macrocall", "Please say 'to' when using the (set:) macro.");
                    var result = ar.dest.set(ar.src);
                    if (TwineError.isPrototypeOf(result)) return result;
                    Engine.options.debug && (debugMessage += (debugMessage ? "; " : "") + objectName(ar.dest) + " is now " + objectName(ar.src)) }
                return { TwineScript_TypeName: "a (set:) operation", TwineScript_ObjectName: "a (set:) operation", TwineScript_Unobservable: !0, TwineScript_Print: function() {
                        return debugMessage && TwineNotifier.create(debugMessage).render() } } }, [rest(AssignmentRequest)])("put", function() {
                for (var debugMessage = "", i = 0; i < arguments.length - 1; i += 1) {
                    var ar = arguments.length <= i + 1 ? void 0 : arguments[i + 1];
                    if ("into" !== ar.operator) return TwineError.create("macrocall", "Please say 'into' when using the (put:) macro.");
                    var result = ar.dest.set(ar.src);
                    if (TwineError.isPrototypeOf(result)) return result;
                    Engine.options.debug && (debugMessage += (debugMessage ? "; " : "") + objectName(ar.dest) + " is now " + objectName(ar.src)) }
                return { TwineScript_TypeName: "a (put:) operation", TwineScript_ObjectName: "a (put:) operation", TwineScript_Unobservable: !0, TwineScript_Print: function() {
                        return debugMessage && TwineNotifier.create(debugMessage).render() } } }, [rest(AssignmentRequest)])("move", function(_, ar) {
                if ("into" !== ar.operator) return TwineError.create("macrocall", "Please say 'into' when using the (move:) macro.");
                if (ar.src && ar.src.varref) {
                    var get = ar.src.get(),
                        error = void 0;
                    if (error = TwineError.containsError(get)) return error;
                    ar.dest.set(get), ar.src["delete"]() } else ar.dest.set(ar.src), ar.src.TwineScript_DeleteValue && ar.src.TwineScript_DeleteValue();
                return { TwineScript_TypeName: "a (move:) operation", TwineScript_ObjectName: "a (move:) operation", TwineScript_Unobservable: !0, TwineScript_Print: "" } }, [rest(AssignmentRequest)])(["a", "array"], function() {
                for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _len10 > _key10; _key10++) args[_key10 - 1] = arguments[_key10];
                return args }, zeroOrMore(Any))("range", function range(_, a, b) {
                if (a > b) return range(_, b, a);
                var ret = [a];
                for (b -= a; b-- > 0;) ret.push(++a);
                return ret }, [Number, Number])("subarray", function(_, array, a, b) {
                return subset(array, a, b) }, [Array, Number, Number])("shuffled", function() {
                for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _len11 > _key11; _key11++) args[_key11 - 1] = arguments[_key11];
                return args.reduce(function(a, e, ind) {
                    var j = Math.random() * (ind + 1) | 0;
                    return j === ind ? a.push(e) : (a.push(a[j]), a[j] = e), a }, []) }, [Any, rest(Any)])("sorted", function() {
                for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _len12 > _key12; _key12++) args[_key12 - 1] = arguments[_key12];
                return args.sort(NaturalSort("en")) }, [String, rest(String)])("rotated", function(_, number) {
                for (var _len13 = arguments.length, array = Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _len13 > _key13; _key13++) array[_key13 - 2] = arguments[_key13];
                return number *= -1, 0 === number ? TwineError.create("macrocall", "I can't rotate these values by 0 positions.") : Math.abs(number) >= array.length ? TwineError.create("macrocall", "I can't rotate these " + array.length + " values by " + number + " positions.") : array.slice(number).concat(array.slice(0, number)) }, [Any, Any, rest(Any)])("datanames", function(_, map) {
                return Array.from(map.keys()).sort(NaturalSort("en")) }, [Map])("datavalues", function(_, map) {
                return Array.from(map.entries()).sort(function(a, b) {
                    return [a[0], b[0]].sort(NaturalSort("en"))[0] === a[0] ? -1 : 1 }).map(function(e) {
                    return e[1] }) }, [Map])("history", function() {
                return State.pastPassageNames() }, [])("passage", function(_, passageName) {
                return Passages.get(passageName || State.passage) || TwineError.create("macrocall", "There's no passage named '" + passageName + "' in this story.") }, [optional(String)])("savedgames", function() {
                function storagePrefix(text) {
                    return "(" + text + " " + Engine.options.ifid + ") " }
                var i = 0,
                    key = void 0,
                    savesMap = new Map;
                do { key = localStorage.key(i), i += 1;
                    var prefix = storagePrefix("Saved Game");
                    key && key.startsWith(prefix) && (key = key.slice(prefix.length), savesMap.set(key, localStorage.getItem(storagePrefix("Saved Game Filename") + key))) } while (key);
                return savesMap }, [])("datamap", function() {
                for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _len14 > _key14; _key14++) args[_key14 - 1] = arguments[_key14];
                var key = void 0,
                    map = new Map,
                    status = args.reduce(function(status, element) {
                        var error = void 0;
                        if (TwineError.containsError(status)) return status;
                        if (void 0 === key) key = element;
                        else {
                            if (error = TwineError.containsError(isValidDatamapName(map, key))) return error;
                            if (map.has(key)) return TwineError.create("macrocall", "You used the same data name (" + objectName(key) + ") twice in the same (datamap:) call.");
                            map.set(key, element), key = void 0 }
                        return status }, !0);
                return TwineError.containsError(status) ? status : void 0 !== key ? TwineError.create("macrocall", "This datamap has a data name without a value.") : map }, zeroOrMore(Any))("dataset", function() {
                for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _len15 > _key15; _key15++) args[_key15 - 1] = arguments[_key15];
                return new Set(args) }, zeroOrMore(Any))("count", function(_, collection, value) {
                switch (collectionType(collection)) {
                    case "dataset":
                    case "datamap":
                        return +collection.has(name);
                    case "string":
                        return "string" != typeof value ? new TypeError(objectName(collection) + " can't contain  " + objectName(value) + " because it isn't a string.") : collection.split(value).length - 1;
                    case "array":
                        return collection.reduce(function(count, e) {
                            return count + (e === value) }, 0) } }, [Any, Any]) }), define("datatypes/changercommand", ["utils", "macros", "utils/operationutils"], function(_ref28, Macros, _ref29) {
            var assert = _ref28.assert,
                is = _ref29.is,
                ChangerCommand = { changer: !0, TwineScript_TypeName: "a changer command", TwineScript_Print: function() {
                        return "[A '" + this.macroName + "' command]" }, create: function(macroName, params, next) {
                        return assert(void 0 === params || Array.isArray(params)), Object.assign(Object.create(this), { macroName: macroName, params: params, next: next || null, TwineScript_ObjectName: "a (" + macroName + ":) command" }) }, "TwineScript_+": function(other) {
                        for (var ret = this.TwineScript_Clone(); ret.next;) ret = ret.next;
                        return ret.next = other, ret }, TwineScript_is: function(other) {
                        return ChangerCommand.isPrototypeOf(other) ? this.macroName === other.macroName && is(this.params, other.params) && is(this.next, other.next) : void 0 }, TwineScript_Clone: function() {
                        return this.create(this.macroName, this.params, this.next) }, run: function(desc) { Macros.getChangerFn(this.macroName).apply(void 0, [desc].concat(_toConsumableArray(this.params))), this.next && this.next.run(desc) } };
            return Object.freeze(ChangerCommand) }), define("macrolib/stylechangers", ["jquery", "macros", "utils", "utils/selectors", "datatypes/colour", "datatypes/changercommand", "internaltypes/twineerror"], function($, Macros, _ref30, Selectors, Colour, ChangerCommand, TwineError) {
            var insensitiveName = _ref30.insensitiveName,
                assert = _ref30.assert,
                childrenProbablyInline = _ref30.childrenProbablyInline,
                _Macros$TypeSignature4 = Macros.TypeSignature,
                either = _Macros$TypeSignature4.either,
                wrapped = _Macros$TypeSignature4.wrapped,
                IfTypeSignature = [wrapped(Boolean, 'If you gave a number, you may instead want to check that the number is not 0. If you gave a string, you may instead want to check that the string is not "".')];
            Macros.addChanger("if", function(_, expr) {
                return ChangerCommand.create("if", [expr]) }, function(d, expr) {
                return d.enabled = d.enabled && expr }, IfTypeSignature)("unless", function(_, expr) {
                return ChangerCommand.create("unless", [!expr]) }, function(d, expr) {
                return d.enabled = d.enabled && expr }, IfTypeSignature)("elseif", function(section, expr) {
                return "lastHookShown" in section.stack[0] ? ChangerCommand.create("elseif", [section.stack[0].lastHookShown === !1 && !!expr]) : TwineError.create("macrocall", "There's no (if:) or something else before this to do (else-if:) with.") }, function(d, expr) {
                return d.enabled = d.enabled && expr }, IfTypeSignature)("else", function(section) {
                return "lastHookShown" in section.stack[0] ? ChangerCommand.create("else", [section.stack[0].lastHookShown === !1]) : TwineError.create("macrocall", "There's nothing before this to do (else:) with.") }, function(d, expr) {
                return d.enabled = d.enabled && expr }, null)(["hook"], function(_, name) {
                return ChangerCommand.create("hook", [name]) }, function(d, name) {
                return d.attr.push({ name: name }) }, [String])(["transition", "t8n"], function(_, name) {
                var validT8ns = ["dissolve", "shudder", "pulse"];
                return name = insensitiveName(name), -1 === validT8ns.indexOf(name) ? TwineError.create("macrocall", "'" + name + '" is not a valid (transition:)', "Only the following names are recognised (capitalisation and hyphens ignored): " + validT8ns.join(", ")) : ChangerCommand.create("transition", [name]) }, function(d, name) {
                return d.transition = name, d }, [String])("font", function(_, family) {
                return ChangerCommand.create("font", [family]) }, function(d, family) {
                return d.styles.push({ "font-family": family }), d }, [String])("align", function(_, arrow) {
                var style = void 0,
                    centerIndex = arrow.indexOf("><");
                if (!/^(==+>|<=+|=+><=+|<==+>)$/.test(arrow)) return TwineError.create("macrocall", 'The (align:) macro requires an alignment arrow ("==>", "<==", "==><=" etc.) be provided, not "' + arrow + '"');
                if (~centerIndex) {
                    var alignPercent = Math.round(centerIndex / (arrow.length - 2) * 50);
                    style = Object.assign({ "text-align": "center", "max-width": "50%" }, 25 === alignPercent ? { "margin-left": "auto", "margin-right": "auto" } : { "margin-left": alignPercent + "%" }) } else style = "<" === arrow[0] && ">" === arrow.slice(-1) ? { "text-align": "justify", "max-width": "50%" } : arrow.includes(">") ? { "text-align": "right" } : { "text-align": "left" };
                return style.display = "block", ChangerCommand.create("align", [style]) }, function(d, style) { d.styles.push(style) }, [String])(["text-colour", "text-color", "color", "colour"], function(_, CSScolour) {
                return CSScolour && CSScolour.colour && (CSScolour = CSScolour.toHexString(CSScolour)), ChangerCommand.create("text-colour", [CSScolour]) }, function(d, CSScolour) {
                return d.styles.push({ color: CSScolour }), d }, [either(String, Colour)])("text-rotate", function(_, rotation) {
                return ChangerCommand.create("text-rotate", [rotation]) }, function(d, rotation) {
                return d.styles.push({ display: "inline-block", transform: function() {
                        var currentTransform = $(this).css("transform") || "";
                        return "none" === currentTransform && (currentTransform = ""), currentTransform + " rotate(" + rotation + "deg)" } }), d }, [Number])("background", function(_, value) {
                return value && value.colour && (value = value.toHexString(value)), ChangerCommand.create("background", [value]) }, function(d, value) {
                var property = void 0;
                return property = Colour.isHexString(value) ? { "background-color": value } : { "background-size": "cover", "background-image": "url(" + value + ")" }, d.styles.push(property, { display: function() {
                        return childrenProbablyInline($(this)) ? "initial" : "block" } }), d }, [either(String, Colour)]).apply(void 0, _toConsumableArray(function() {
                var colourTransparent = { color: "transparent" },
                    styleTagNames = Object.assign(Object.create(null), { bold: { "font-weight": "bold" }, italic: { "font-style": "italic" }, underline: { "text-decoration": "underline" }, strike: { "text-decoration": "line-through" }, superscript: { "vertical-align": "super", "font-size": ".83em" }, subscript: { "vertical-align": "sub", "font-size": ".83em" }, blink: { animation: "fade-in-out 1s steps(1,end) infinite alternate" }, shudder: { animation: "shudder linear 0.1s 0s infinite", display: "inline-block" }, mark: { "background-color": "hsla(60, 100%, 50%, 0.6)" }, condense: { "letter-spacing": "-0.08em" }, expand: { "letter-spacing": "0.1em" }, outline: [{ "text-shadow": function() {
                                var colour = $(this).css("color");
                                return "-1px -1px 0 " + colour + ", 1px -1px 0 " + colour + ",-1px  1px 0 " + colour + ", 1px  1px 0 " + colour } }, { color: function() {
                                return $(this).css("background-color") } }], shadow: { "text-shadow": function() {
                                return "0.08em 0.08em 0.08em " + $(this).css("color") } }, emboss: { "text-shadow": function() {
                                return "0.08em 0.08em 0em " + $(this).css("color") } }, smear: [{ "text-shadow": function() {
                                var colour = $(this).css("color");
                                return "0em   0em 0.02em " + colour + ",-0.2em 0em  0.5em " + colour + ", 0.2em 0em  0.5em " + colour } }, colourTransparent], blur: [{ "text-shadow": function() {
                                return "0em 0em 0.08em " + $(this).css("color") } }, colourTransparent], blurrier: [{ "text-shadow": function() {
                                return "0em 0em 0.2em " + $(this).css("color") }, "user-select": "none" }, colourTransparent], mirror: { display: "inline-block", transform: "scaleX(-1)" }, upsidedown: { display: "inline-block", transform: "scaleY(-1)" }, fadeinout: { animation: "fade-in-out 2s ease-in-out infinite alternate" }, rumble: { animation: "rumble linear 0.1s 0s infinite", display: "inline-block" } });
                return ["text-style", function(_, styleName) {
                    return styleName = insensitiveName(styleName), styleName in styleTagNames ? ChangerCommand.create("text-style", [styleName]) : TwineError.create("macrocall", "'" + styleName + '" is not a valid (textstyle:)', "Only the following names are recognised (capitalisation and hyphens ignored): " + Object.keys(styleTagNames).join(", ")) }, function(d, styleName) {
                    return assert(styleName in styleTagNames), d.styles = d.styles.concat(styleTagNames[styleName]), d }] }()).concat([
                [String]
            ]))("css", function(_, text) {
                return text.trim().endsWith(";") || (text += ";"), ChangerCommand.create("css", [text]) }, function(d, text) {
                return d.attr.push({ style: function() {
                        return ($(this).attr("style") || "") + text } }), d }, [String]) }), define("internaltypes/enchantment", ["jquery", "utils", "internaltypes/changedescriptor"], function($, Utils, ChangeDescriptor) {
            var Enchantment = { create: function(descriptor) {
                    return Utils.assertOnlyHas(descriptor, ["scope", "attr", "data", "changer"]), Object.assign(Object.create(this), { enchantments: $() }, descriptor) }, enchantScope: function() {
                    var _this5 = this,
                        attr = this.attr,
                        data = this.data,
                        changer = this.changer,
                        scope = this.scope;
                    scope instanceof $ && (scope = Array.prototype.map.call(scope, function(e) {
                        return $(e) })), this.enchantments = $(), scope.forEach(function(e) {
                        var wrapping = e.wrapAll("<tw-enchantment>").parent();
                        if (attr && wrapping.attr(attr), data && wrapping.data(data), changer) {
                            var cd = ChangeDescriptor.create({ target: wrapping });
                            changer.run(cd), cd.update() }
                        e.is("tw-story") && wrapping.css({ width: "100%", height: "100%" }), _this5.enchantments = _this5.enchantments.add(wrapping) }) }, disenchant: function() { this.enchantments.each(function() { $(this).contents().unwrap() }) } };
            return Object.freeze(Enchantment) }), define("macrolib/enchantments", ["jquery", "utils", "macros", "datatypes/hookset", "datatypes/changercommand", "internaltypes/enchantment", "internaltypes/twineerror"], function($, Utils, Macros, HookSet, ChangerCommand, Enchantment, TwineError) {
            function newEnchantmentMacroFns(enchantDesc, name) {
                return Utils.assert(enchantDesc), $(function() { Utils.storyElement.on(enchantDesc.event + ".enchantment", "." + enchantDesc.classList.replace(/ /g, "."), function() {
                        var enchantment = $(this),
                            event = enchantment.data("enchantmentEvent");
                        event && event(enchantment) }) }), [function(_, selector) {
                    return selector.selector && (selector = selector.selector), selector ? ChangerCommand.create(name, [selector]) : TwineError.create("datatype", "The string given to this (" + name + ":) macro was empty.") }, function(desc, selector) { desc.enabled = !1, enchantDesc.rerender && (desc.target = selector, desc.append = enchantDesc.rerender);
                    var enchantData = Enchantment.create({ attr: Object.assign({ "class": enchantDesc.classList }, enchantDesc.classList.includes("link") ? { tabIndex: "0" } : {}), data: { enchantmentEvent: function() {
                                if (enchantDesc.once) {
                                    var index = desc.section.enchantments.indexOf(enchantData);
                                    desc.section.enchantments.splice(index, 1), enchantData.disenchant() }
                                desc.section.renderInto(desc.source, null, Object.assign({}, desc, { enabled: !0 })) } }, scope: desc.section.selectHook(selector) });
                    return desc.section.enchantments.push(enchantData), enchantData.enchantScope(), desc }, either(HookSet, String)] }
            var either = Macros.TypeSignature.either,
                revisionTypes = ["replace", "append", "prepend"];
            revisionTypes.forEach(function(e) { Macros.addChanger(e, function(_, scope) {
                    return scope ? ChangerCommand.create(e, [scope]) : TwineError.create("datatype", "The string given to this (" + e + ":) macro was empty.") }, function(desc, scope) {
                    var collapsing = $(desc.target.context).parents().filter("tw-collapsed").length > 0;
                    return collapsing || (desc.attr = [].concat(_toConsumableArray(desc.attr), [{ collapsing: !1 }])), desc.target = scope, desc.append = e, desc }, either(HookSet, String)) });
            var interactionTypes = [{ name: "click", enchantDesc: { event: "click", once: !0, rerender: "", classList: "link enchantment-link" } }, { name: "mouseover", enchantDesc: { event: "mouseenter", once: !0, rerender: "", classList: "enchantment-mouseover" } }, { name: "mouseout", enchantDesc: { event: "mouseleave", once: !0, rerender: "", classList: "enchantment-mouseout" } }];
            interactionTypes.forEach(function(e) {
                return Macros.addChanger.apply(Macros, [e.name].concat(_toConsumableArray(newEnchantmentMacroFns(e.enchantDesc, e.name)))) }), revisionTypes.forEach(function(revisionType) { interactionTypes.forEach(function(interactionType) {
                    var enchantDesc = Object.assign({}, interactionType.enchantDesc, { rerender: revisionType }),
                        name = interactionType.name + "-" + revisionType;
                    Macros.addChanger.apply(Macros, [name].concat(_toConsumableArray(newEnchantmentMacroFns(enchantDesc, name)))) }) }) }), define("macrolib/links", ["jquery", "macros", "utils", "utils/selectors", "state", "passages", "engine", "datatypes/changercommand"], function($, Macros, Utils, Selectors, State, Passages, Engine, ChangerCommand) {
            var optional = Macros.TypeSignature.optional;
            $(function() {
                return $(Utils.storyElement).on("click.passage-link", Selectors.internalLink, function() {
                    var link = $(this),
                        event = link.parent().data("clickEvent");
                    if (event) return void event(link);
                    var next = link.attr("passage-name");
                    next && Engine.goToPassage(next, !1) }) }), [
                ["link", "link-replace"],
                ["link-reveal"],
                ["link-repeat"]
            ].forEach(function(arr) {
                return Macros.addChanger(arr, function(_, expr) {
                    return ChangerCommand.create(arr[0], [expr]) }, function(desc, text) {
                    var innerSource = desc.source;
                    desc.source = "<tw-link tabindex=0>" + text + "</tw-link>", desc.append = "link" === arr[0] ? "replace" : "append", desc.data = { clickEvent: function(link) { desc.source = innerSource, desc.section.renderInto(innerSource + "", null, desc), "link-reveal" === arr[0] && link.contents().unwrap() } } }, [String]) }), Macros.add(["link-goto"], function(section, text, passage) {
                return { TwineScript_TypeName: "a (link-goto: " + Utils.toJSLiteral(text) + ", " + Utils.toJSLiteral(passage) + ") command", TwineScript_ObjectName: "a (link-goto:) command", TwineScript_Print: function() {
                        var passageName = section.evaluateTwineMarkup(Utils.unescape(passage || text));
                        if (passageName instanceof $) return passageName;
                        if (!Passages.has(passageName)) return '<tw-broken-link passage-name="' + Utils.escape(passageName) + '">' + (text || passage) + "</tw-broken-link>";
                        var visited = State.passageNameVisited(passageName);
                        return "<tw-link tabindex=0 " + (visited > 0 ? 'class="visited" ' : "") + 'passage-name="' + Utils.escape(passageName) + '">' + (text || passage) + "</tw-link>" } } }, [String, optional(String)]) }), define("macrolib", ["utils", "macrolib/values", "macrolib/commands", "macrolib/datastructures", "macrolib/stylechangers", "macrolib/enchantments", "macrolib/links"], function(_ref31) {
            var log = _ref31.log;
            log("Loaded the built-in macros.") }), define("repl", ["utils", "markup", "twinescript/compiler", "twinescript/environ"], function(Utils, TwineMarkup, Compiler, Environ) { window.REPL = function(a) {
                var r = Compiler(TwineMarkup.lex("(print:" + a + ")"));
                return console.log(r), Environ({}).eval(r) }, window.LEX = function(a) {
                var r = TwineMarkup.lex(a);
                return 1 === r.length ? r[0] : r } }), require.config({ paths: { jquery: "../node_modules/jquery/dist/jquery", almond: "../node_modules/almond/almond", "es6-shim": "../node_modules/es6-shim/es6-shim", requestAnimationFrame: "../node_modules/requestanimationframe/app/requestAnimationFrame", jqueryplugins: "utils/jqueryplugins", markup: "./markup/markup", lexer: "./markup/lexer", patterns: "./markup/patterns" }, deps: ["jquery", "es6-shim", "jqueryplugins"] }), require(["jquery", "renderer", "state", "engine", "passages", "utils/selectors", "macrolib", "repl"], function($, Renderer, State, Engine, Passages, Selectors) {
            function _eval(text) {
                return eval(text + "") }

            function testPlayCleanup() {
                ["_", "Backbone", "Store", "Mn", "Marionette", "saveAs", "FastClick", "JSZip", "SVG", "requestAnimFrame", "UUID", "XDate", "CodeMirror", "ui", "nwui", "AppPref", "Passage", "StoryFormat", "Story", "AppPrefCollection", "PassageCollection", "StoryCollection", "StoryFormatCollection", "WelcomeView", "StoryItemView", "StoryListView", "PassageItemView", "StoryEditView", "TwineRouter", "TransRegion", "TwineApp", "app", "storyFormat"].forEach(function(name) {
                    try { delete window[name] } catch (e) { window[name] = void 0 } }) }
            var _installHandlers = function() {
                var html = $(document.documentElement),
                    debugHTML = "<tw-debugger><button class='show-invisibles'>&#9903; Debug View</button></tw-debugger>";
                html.on("keydown", function(event) {
                    13 === event.which && "0" === event.target.getAttribute("tabindex") && $(event.target).trigger("click");

                }), Engine.options.debug && ($(document.body).append(debugHTML), $(".show-invisibles").click(function() { html.toggleClass("debug-mode").is(".debug-mode") })), _installHandlers = null
            };
            ! function(oldOnError) { window.onerror = function(message, _, __, ___, error) {
                    var stack = error && error.stack && "\n" + error.stack.replace(/\([^\)]+\)/g, "") + "\n" || "(" + message + ")\n";
                    alert("Sorry to interrupt, but this page's code has got itself in a mess. " + stack + "(This is probably due to a bug in the Twine game engine.)"), window.onerror = oldOnError, "function" == typeof oldOnError && oldOnError.apply(void 0, arguments) } }(window.onerror), $(function() {
                var header = $(Selectors.storyData);
                if (0 !== header.length) { "TwineApp" in window && testPlayCleanup();
                    var options = header.attr("options");
                    options && options.split(/\s/).forEach(function(b) { Renderer.options[b] = Engine.options[b] = !0 });
                    var startPassage = header.attr("startnode");
                    return Renderer.options.ifid = Engine.options.ifid = header.attr("ifid"), startPassage || (startPassage = [].reduce.call($(Selectors.passageData), function(id, el) {
                        var pid = el.getAttribute("pid");
                        return id > pid ? pid : id }, 1 / 0)), startPassage = $(Selectors.passageData + "[pid=" + startPassage + "]").attr("name"), _installHandlers(), $(Selectors.script).each(function(i) {
                        try { _eval($(this).html()) } catch (e) { alert("There is a problem with this story's script (#" + (i + 1) + "):\n\n" + e.message) } }), $(Selectors.stylesheet).each(function(i) { $(document.head).append('<style data-title="Story stylesheet ' + (i + 1) + '">' + $(this).html()) }), window.location.hash && !window.location.hash.includes("stories") && State.load(window.location.hash) ? void Engine.showPassage(State.passage) : void Engine.goToPassage(startPassage) } })
        }), define("harlowe", twineMove), require(["harlowe"])
}();

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
* @vue/shared v3.4.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.4.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  if (!isSymbol(key))
    key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      )
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel
    );
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
/**
* @vue/runtime-core v3.4.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      pauseTracking();
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      extend(slots, children);
      def(slots, "_", type);
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (hasOwn(setupState, ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (hasOwn(setupState, ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                namespace,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        namespace
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      NOOP,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => {
      if (effect2.dirty) {
        effect2.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing2 = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing2) {
      isFlushing2 = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing2 = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref3, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v));
      else
        setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
const version = "3.4.25";
/**
* @vue/runtime-dom v3.4.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
var LRUCache = /* @__PURE__ */ function() {
  function LRUCache2(maxSize) {
    _classCallCheck(this, LRUCache2);
    this.map = /* @__PURE__ */ new Map();
    this.first = void 0;
    this.last = void 0;
    this.maxSize = maxSize;
  }
  _createClass(LRUCache2, [{
    key: "size",
    get: function get2() {
      return this.map.size;
    }
    /**
     * Gets the specified key from the cache, or undefined if it is not in the
     * cache.
     * @param key The key to get.
     * @returns The cached value, or undefined if key is not in the cache.
     */
  }, {
    key: "get",
    value: function get2(key) {
      var node = this.map.get(key);
      if (node === void 0) {
        return void 0;
      }
      if (node !== this.first) {
        if (node === this.last) {
          this.last = node.prev;
          this.last.next = void 0;
        } else {
          node.prev.next = node.next;
          node.next.prev = node.prev;
        }
        node.next = this.first;
        this.first.prev = node;
        this.first = node;
      }
      return node.value;
    }
    /**
     * Sets an entry in the cache.
     *
     * @param key The key of the entry.
     * @param value The value of the entry.
     * @throws Error, if the map already contains the key.
     */
  }, {
    key: "set",
    value: function set2(key, value) {
      if (this.maxSize < 1) {
        return;
      }
      if (this.map.has(key)) {
        throw new Error("Cannot update existing keys in the cache");
      }
      var node = new ListNode(key, value);
      if (this.first === void 0) {
        this.first = node;
        this.last = node;
      } else {
        node.next = this.first;
        this.first.prev = node;
        this.first = node;
      }
      this.map.set(key, node);
      while (this.map.size > this.maxSize) {
        var last = this.last;
        this.map["delete"](last.key);
        this.last = last.prev;
        this.last.next = void 0;
      }
    }
  }]);
  return LRUCache2;
}();
var ListNode = /* @__PURE__ */ _createClass(function ListNode2(key, value) {
  _classCallCheck(this, ListNode2);
  this.next = void 0;
  this.prev = void 0;
  this.key = key;
  this.value = value;
});
var MAX_SIGNIFICANT_DIGITS = 17;
var EXP_LIMIT = 9e15;
var LAYER_DOWN = Math.log10(9e15);
var FIRST_NEG_LAYER = 1 / 9e15;
var NUMBER_EXP_MAX = 308;
var NUMBER_EXP_MIN = -324;
var MAX_ES_IN_A_ROW = 5;
var DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1;
var powerOf10 = function() {
  var powersOf10 = [];
  for (var i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
    powersOf10.push(Number("1e" + i));
  }
  var indexOf0InPowersOf10 = 323;
  return function(power) {
    return powersOf10[power + indexOf0InPowersOf10];
  };
}();
var critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
var critical_tetr_values = [[
  // Base 2 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1,
  1.0891180521811203,
  1.1789767925673957,
  1.2701455431742086,
  1.3632090180450092,
  1.4587818160364217,
  1.5575237916251419,
  1.6601571006859253,
  1.767485818836978,
  1.8804192098842727,
  2
], [
  // Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1,
  1.1121114330934079,
  1.231038924931609,
  1.3583836963111375,
  1.4960519303993531,
  1.6463542337511945,
  1.8121385357018724,
  1.996971324618307,
  2.2053895545527546,
  2.4432574483385254,
  Math.E
  //1.0
], [
  // Base 3
  1,
  1.1187738849693603,
  1.2464963939368214,
  1.38527004705667,
  1.5376664685821402,
  1.7068895236551784,
  1.897001227148399,
  2.1132403089001035,
  2.362480153784171,
  2.6539010333870774,
  3
], [
  // Base 4
  1,
  1.1367350847096405,
  1.2889510672956703,
  1.4606478703324786,
  1.6570295196661111,
  1.8850062585672889,
  2.1539465047453485,
  2.476829779693097,
  2.872061932789197,
  3.3664204535587183,
  4
], [
  // Base 5
  1,
  1.1494592900767588,
  1.319708228183931,
  1.5166291280087583,
  1.748171114438024,
  2.0253263297298045,
  2.3636668498288547,
  2.7858359149579424,
  3.3257226212448145,
  4.035730287722532,
  5
], [
  // Base 6
  1,
  1.159225940787673,
  1.343712473580932,
  1.5611293155111927,
  1.8221199554561318,
  2.14183924486326,
  2.542468319282638,
  3.0574682501653316,
  3.7390572020926873,
  4.6719550537360774,
  6
], [
  // Base 7
  1,
  1.1670905356972596,
  1.3632807444991446,
  1.5979222279405536,
  1.8842640123816674,
  2.2416069644878687,
  2.69893426559423,
  3.3012632110403577,
  4.121250340630164,
  5.281493033448316,
  7
], [
  // Base 8
  1,
  1.1736630594087796,
  1.379783782386201,
  1.6292821855668218,
  1.9378971836180754,
  2.3289975651071977,
  2.8384347394720835,
  3.5232708454565906,
  4.478242031114584,
  5.868592169644505,
  8
], [
  // Base 9
  1,
  1.1793017514670474,
  1.394054150657457,
  1.65664127441059,
  1.985170999970283,
  2.4069682290577457,
  2.9647310119960752,
  3.7278665320924946,
  4.814462547283592,
  6.436522247411611,
  9
], [
  // Base 10 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1,
  1.1840100246247336,
  1.4061375836156955,
  1.6802272208863964,
  2.026757028388619,
  2.4770056063449646,
  3.080525271755482,
  3.9191964192627284,
  5.135152840833187,
  6.989961179534715,
  10
]];
var critical_slog_values = [[
  // Base 2
  -1,
  -0.9194161097107025,
  -0.8335625019330468,
  -0.7425599821143978,
  -0.6466611521029437,
  -0.5462617907227869,
  -0.4419033816638769,
  -0.3342645487554494,
  -0.224140440909962,
  -0.11241087890006762,
  0
], [
  // Base E
  -1,
  -0.90603157029014,
  -0.80786507256596,
  -0.7064666939634,
  -0.60294836853664,
  -0.49849837513117,
  -0.39430303318768,
  -0.29147201034755,
  -0.19097820800866,
  -0.09361896280296,
  0
  //1.0
], [
  // Base 3
  -1,
  -0.9021579584316141,
  -0.8005762598234203,
  -0.6964780623319391,
  -0.5911906810998454,
  -0.486050182576545,
  -0.3823089430815083,
  -0.28106046722897615,
  -0.1831906535795894,
  -0.08935809204418144,
  0
], [
  // Base 4
  -1,
  -0.8917227442365535,
  -0.781258746326964,
  -0.6705130326902455,
  -0.5612813129406509,
  -0.4551067709033134,
  -0.35319256652135966,
  -0.2563741554088552,
  -0.1651412821106526,
  -0.0796919581982668,
  0
], [
  // Base 5
  -1,
  -0.8843387974366064,
  -0.7678744063886243,
  -0.6529563724510552,
  -0.5415870994657841,
  -0.4352842206588936,
  -0.33504449124791424,
  -0.24138853420685147,
  -0.15445285440944467,
  -0.07409659641336663,
  0
], [
  // Base 6
  -1,
  -0.8786709358426346,
  -0.7577735191184886,
  -0.6399546189952064,
  -0.527284921869926,
  -0.4211627631006314,
  -0.3223479611761232,
  -0.23107655627789858,
  -0.1472057700818259,
  -0.07035171210706326,
  0
], [
  // Base 7
  -1,
  -0.8740862815291583,
  -0.7497032990976209,
  -0.6297119746181752,
  -0.5161838335958787,
  -0.41036238255751956,
  -0.31277212146489963,
  -0.2233976621705518,
  -0.1418697367979619,
  -0.06762117662323441,
  0
], [
  // Base 8
  -1,
  -0.8702632331800649,
  -0.7430366914122081,
  -0.6213373075161548,
  -0.5072025698095242,
  -0.40171437727184167,
  -0.30517930701410456,
  -0.21736343968190863,
  -0.137710238299109,
  -0.06550774483471955,
  0
], [
  // Base 9
  -1,
  -0.8670016295947213,
  -0.7373984232432306,
  -0.6143173985094293,
  -0.49973884395492807,
  -0.394584953527678,
  -0.2989649949848695,
  -0.21245647317021688,
  -0.13434688362382652,
  -0.0638072667348083,
  0
], [
  // Base 10
  -1,
  -0.8641642839543857,
  -0.732534623168535,
  -0.6083127477059322,
  -0.4934049257184696,
  -0.3885773075899922,
  -0.29376029055315767,
  -0.2083678561173622,
  -0.13155653399373268,
  -0.062401588652553186,
  0
]];
var D = function D2(value) {
  return Decimal.fromValue_noAlloc(value);
};
var FC = function FC2(sign, layer, mag) {
  return Decimal.fromComponents(sign, layer, mag);
};
var FC_NN = function FC_NN2(sign, layer, mag) {
  return Decimal.fromComponents_noNormalize(sign, layer, mag);
};
var decimalPlaces = function decimalPlaces2(value, places) {
  var len = places + 1;
  var numDigits = Math.ceil(Math.log10(Math.abs(value)));
  var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
  return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
};
var f_maglog10 = function f_maglog102(n) {
  return Math.sign(n) * Math.log10(Math.abs(n));
};
var f_gamma = function f_gamma2(n) {
  if (!isFinite(n)) {
    return n;
  }
  if (n < -50) {
    if (n === Math.trunc(n)) {
      return Number.NEGATIVE_INFINITY;
    }
    return 0;
  }
  var scal1 = 1;
  while (n < 10) {
    scal1 = scal1 * n;
    ++n;
  }
  n -= 1;
  var l = 0.9189385332046727;
  l = l + (n + 0.5) * Math.log(n);
  l = l - n;
  var n2 = n * n;
  var np = n;
  l = l + 1 / (12 * np);
  np = np * n2;
  l = l + 1 / (360 * np);
  np = np * n2;
  l = l + 1 / (1260 * np);
  np = np * n2;
  l = l + 1 / (1680 * np);
  np = np * n2;
  l = l + 1 / (1188 * np);
  np = np * n2;
  l = l + 691 / (360360 * np);
  np = np * n2;
  l = l + 7 / (1092 * np);
  np = np * n2;
  l = l + 3617 / (122400 * np);
  return Math.exp(l) / scal1;
};
var _EXPN1 = 0.36787944117144233;
var OMEGA = 0.5671432904097838;
var f_lambertw = function f_lambertw2(z) {
  var tol = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e-10;
  var w;
  var wn;
  if (!Number.isFinite(z)) {
    return z;
  }
  if (z === 0) {
    return z;
  }
  if (z === 1) {
    return OMEGA;
  }
  if (z < 10) {
    w = 0;
  } else {
    w = Math.log(z) - Math.log(Math.log(z));
  }
  for (var i = 0; i < 100; ++i) {
    wn = (z * Math.exp(-w) + w * w) / (w + 1);
    if (Math.abs(wn - w) < tol * Math.abs(wn)) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error("Iteration failed to converge: ".concat(z.toString()));
};
function d_lambertw(z) {
  var tol = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e-10;
  var w;
  var ew, wewz, wn;
  if (!Number.isFinite(z.mag)) {
    return z;
  }
  if (z.eq(Decimal.dZero)) {
    return z;
  }
  if (z.eq(Decimal.dOne)) {
    return Decimal.fromNumber(OMEGA);
  }
  w = Decimal.ln(z);
  for (var i = 0; i < 100; ++i) {
    ew = w.neg().exp();
    wewz = w.sub(z.mul(ew));
    wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2)))));
    if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error("Iteration failed to converge: ".concat(z.toString()));
}
var Decimal = /* @__PURE__ */ function() {
  function Decimal2(value) {
    _classCallCheck(this, Decimal2);
    this.sign = 0;
    this.mag = 0;
    this.layer = 0;
    if (value instanceof Decimal2) {
      this.fromDecimal(value);
    } else if (typeof value === "number") {
      this.fromNumber(value);
    } else if (typeof value === "string") {
      this.fromString(value);
    }
  }
  _createClass(Decimal2, [{
    key: "m",
    get: function get2() {
      if (this.sign === 0) {
        return 0;
      } else if (this.layer === 0) {
        var exp = Math.floor(Math.log10(this.mag));
        var man;
        if (this.mag === 5e-324) {
          man = 5;
        } else {
          man = this.mag / powerOf10(exp);
        }
        return this.sign * man;
      } else if (this.layer === 1) {
        var residue = this.mag - Math.floor(this.mag);
        return this.sign * Math.pow(10, residue);
      } else {
        return this.sign;
      }
    },
    set: function set2(value) {
      if (this.layer <= 2) {
        this.fromMantissaExponent(value, this.e);
      } else {
        this.sign = Math.sign(value);
        if (this.sign === 0) {
          this.layer = 0;
          this.exponent = 0;
        }
      }
    }
  }, {
    key: "e",
    get: function get2() {
      if (this.sign === 0) {
        return 0;
      } else if (this.layer === 0) {
        return Math.floor(Math.log10(this.mag));
      } else if (this.layer === 1) {
        return Math.floor(this.mag);
      } else if (this.layer === 2) {
        return Math.floor(Math.sign(this.mag) * Math.pow(10, Math.abs(this.mag)));
      } else {
        return this.mag * Number.POSITIVE_INFINITY;
      }
    },
    set: function set2(value) {
      this.fromMantissaExponent(this.m, value);
    }
  }, {
    key: "s",
    get: function get2() {
      return this.sign;
    },
    set: function set2(value) {
      if (value === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
      } else {
        this.sign = value;
      }
    }
    // Object.defineProperty(Decimal.prototype, "mantissa", {
  }, {
    key: "mantissa",
    get: function get2() {
      return this.m;
    },
    set: function set2(value) {
      this.m = value;
    }
  }, {
    key: "exponent",
    get: function get2() {
      return this.e;
    },
    set: function set2(value) {
      this.e = value;
    }
    /**
     * Turns the given components into a valid Decimal.
     */
  }, {
    key: "normalize",
    value: (
      /**
       * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
       *
       * Note: this function mutates the Decimal it is called on.
       */
      function normalize() {
        if (this.sign === 0 || this.mag === 0 && this.layer === 0 || this.mag === Number.NEGATIVE_INFINITY && this.layer > 0 && Number.isFinite(this.layer)) {
          this.sign = 0;
          this.mag = 0;
          this.layer = 0;
          return this;
        }
        if (this.layer === 0 && this.mag < 0) {
          this.mag = -this.mag;
          this.sign = -this.sign;
        }
        if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
          if (this.sign == 1) {
            this.mag = Number.POSITIVE_INFINITY;
            this.layer = Number.POSITIVE_INFINITY;
          } else if (this.sign == -1) {
            this.mag = Number.NEGATIVE_INFINITY;
            this.layer = Number.NEGATIVE_INFINITY;
          }
          return this;
        }
        if (this.layer === 0 && this.mag < FIRST_NEG_LAYER) {
          this.layer += 1;
          this.mag = Math.log10(this.mag);
          return this;
        }
        var absmag = Math.abs(this.mag);
        var signmag = Math.sign(this.mag);
        if (absmag >= EXP_LIMIT) {
          this.layer += 1;
          this.mag = signmag * Math.log10(absmag);
          return this;
        } else {
          while (absmag < LAYER_DOWN && this.layer > 0) {
            this.layer -= 1;
            if (this.layer === 0) {
              this.mag = Math.pow(10, this.mag);
            } else {
              this.mag = signmag * Math.pow(10, absmag);
              absmag = Math.abs(this.mag);
              signmag = Math.sign(this.mag);
            }
          }
          if (this.layer === 0) {
            if (this.mag < 0) {
              this.mag = -this.mag;
              this.sign = -this.sign;
            } else if (this.mag === 0) {
              this.sign = 0;
            }
          }
        }
        if (Number.isNaN(this.sign) || Number.isNaN(this.layer) || Number.isNaN(this.mag)) {
          this.sign = Number.NaN;
          this.layer = Number.NaN;
          this.mag = Number.NaN;
        }
        return this;
      }
    )
    /**
     * Turns the given components into a valid Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromComponents",
    value: function fromComponents(sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;
      this.normalize();
      return this;
    }
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromComponents_noNormalize",
    value: function fromComponents_noNormalize(sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;
      return this;
    }
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromMantissaExponent",
    value: function fromMantissaExponent(mantissa, exponent) {
      this.layer = 1;
      this.sign = Math.sign(mantissa);
      mantissa = Math.abs(mantissa);
      this.mag = exponent + Math.log10(mantissa);
      this.normalize();
      return this;
    }
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromMantissaExponent_noNormalize",
    value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
      this.fromMantissaExponent(mantissa, exponent);
      return this;
    }
    /**
     * Turns the Decimal that this function is called on into a deep copy of the provided value.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromDecimal",
    value: function fromDecimal(value) {
      this.sign = value.sign;
      this.layer = value.layer;
      this.mag = value.mag;
      return this;
    }
    /**
     * Converts a floating-point number into a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromNumber",
    value: function fromNumber(value) {
      this.mag = Math.abs(value);
      this.sign = Math.sign(value);
      this.layer = 0;
      this.normalize();
      return this;
    }
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromString",
    value: function fromString(value) {
      var linearhyper4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var originalValue = value;
      var cached = Decimal2.fromStringCache.get(originalValue);
      if (cached !== void 0) {
        return this.fromDecimal(cached);
      }
      {
        value = value.replace(",", "");
      }
      var pentationparts = value.split("^^^");
      if (pentationparts.length === 2) {
        var _base = parseFloat(pentationparts[0]);
        var _height = parseFloat(pentationparts[1]);
        var heightparts = pentationparts[1].split(";");
        var payload = 1;
        if (heightparts.length === 2) {
          payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) {
            payload = 1;
          }
        }
        if (isFinite(_base) && isFinite(_height)) {
          var result = Decimal2.pentate(_base, _height, payload, linearhyper4);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var tetrationparts = value.split("^^");
      if (tetrationparts.length === 2) {
        var _base2 = parseFloat(tetrationparts[0]);
        var _height2 = parseFloat(tetrationparts[1]);
        var _heightparts = tetrationparts[1].split(";");
        var _payload = 1;
        if (_heightparts.length === 2) {
          _payload = parseFloat(_heightparts[1]);
          if (!isFinite(_payload)) {
            _payload = 1;
          }
        }
        if (isFinite(_base2) && isFinite(_height2)) {
          var _result = Decimal2.tetrate(_base2, _height2, _payload, linearhyper4);
          this.sign = _result.sign;
          this.layer = _result.layer;
          this.mag = _result.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var powparts = value.split("^");
      if (powparts.length === 2) {
        var _base3 = parseFloat(powparts[0]);
        var _exponent = parseFloat(powparts[1]);
        if (isFinite(_base3) && isFinite(_exponent)) {
          var _result2 = Decimal2.pow(_base3, _exponent);
          this.sign = _result2.sign;
          this.layer = _result2.layer;
          this.mag = _result2.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      value = value.trim().toLowerCase();
      var base;
      var height;
      var ptparts = value.split("pt");
      if (ptparts.length === 2) {
        base = 10;
        height = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        var _payload2 = parseFloat(ptparts[1]);
        if (!isFinite(_payload2)) {
          _payload2 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result3 = Decimal2.tetrate(base, height, _payload2, linearhyper4);
          this.sign = _result3.sign;
          this.layer = _result3.layer;
          this.mag = _result3.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      ptparts = value.split("p");
      if (ptparts.length === 2) {
        base = 10;
        height = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        var _payload3 = parseFloat(ptparts[1]);
        if (!isFinite(_payload3)) {
          _payload3 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result4 = Decimal2.tetrate(base, height, _payload3, linearhyper4);
          this.sign = _result4.sign;
          this.layer = _result4.layer;
          this.mag = _result4.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      ptparts = value.split("f");
      if (ptparts.length === 2) {
        base = 10;
        ptparts[0] = ptparts[0].replace("(", "");
        ptparts[0] = ptparts[0].replace(")", "");
        var _payload4 = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        height = parseFloat(ptparts[1]);
        if (!isFinite(_payload4)) {
          _payload4 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result5 = Decimal2.tetrate(base, height, _payload4, linearhyper4);
          this.sign = _result5.sign;
          this.layer = _result5.layer;
          this.mag = _result5.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var parts = value.split("e");
      var ecount = parts.length - 1;
      if (ecount === 0) {
        var numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt)) {
          this.fromNumber(numberAttempt);
          if (Decimal2.fromStringCache.size >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      } else if (ecount === 1) {
        var _numberAttempt = parseFloat(value);
        if (isFinite(_numberAttempt) && _numberAttempt !== 0) {
          this.fromNumber(_numberAttempt);
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var newparts = value.split("e^");
      if (newparts.length === 2) {
        this.sign = 1;
        if (newparts[0].charAt(0) == "-") {
          this.sign = -1;
        }
        var layerstring = "";
        for (var i = 0; i < newparts[1].length; ++i) {
          var chrcode = newparts[1].charCodeAt(i);
          if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
            layerstring += newparts[1].charAt(i);
          } else {
            this.layer = parseFloat(layerstring);
            this.mag = parseFloat(newparts[1].substr(i + 1));
            this.normalize();
            if (Decimal2.fromStringCache.maxSize >= 1) {
              Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
            }
            return this;
          }
        }
      }
      if (ecount < 1) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (Decimal2.fromStringCache.maxSize >= 1) {
          Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
        }
        return this;
      }
      var mantissa = parseFloat(parts[0]);
      if (mantissa === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (Decimal2.fromStringCache.maxSize >= 1) {
          Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
        }
        return this;
      }
      var exponent = parseFloat(parts[parts.length - 1]);
      if (ecount >= 2) {
        var me = parseFloat(parts[parts.length - 2]);
        if (isFinite(me)) {
          exponent *= Math.sign(me);
          exponent += f_maglog10(me);
        }
      }
      if (!isFinite(mantissa)) {
        this.sign = parts[0] === "-" ? -1 : 1;
        this.layer = ecount;
        this.mag = exponent;
      } else if (ecount === 1) {
        this.sign = Math.sign(mantissa);
        this.layer = 1;
        this.mag = exponent + Math.log10(Math.abs(mantissa));
      } else {
        this.sign = Math.sign(mantissa);
        this.layer = ecount;
        if (ecount === 2) {
          var _result6 = Decimal2.mul(FC(1, 2, exponent), D(mantissa));
          this.sign = _result6.sign;
          this.layer = _result6.layer;
          this.mag = _result6.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        } else {
          this.mag = exponent;
        }
      }
      this.normalize();
      if (Decimal2.fromStringCache.maxSize >= 1) {
        Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
      }
      return this;
    }
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromValue",
    value: function fromValue(value) {
      if (value instanceof Decimal2) {
        return this.fromDecimal(value);
      }
      if (typeof value === "number") {
        return this.fromNumber(value);
      }
      if (typeof value === "string") {
        return this.fromString(value);
      }
      this.sign = 0;
      this.layer = 0;
      this.mag = 0;
      return this;
    }
    /**
     * Returns the numeric value of the Decimal it's called on. Will return Infinity (or -Infinity for negatives) for Decimals that are larger than Number.MAX_VALUE.
     */
  }, {
    key: "toNumber",
    value: function toNumber() {
      if (this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && this.sign === 1) {
        return Number.POSITIVE_INFINITY;
      }
      if (this.mag === Number.NEGATIVE_INFINITY && this.layer === Number.NEGATIVE_INFINITY && this.sign === -1) {
        return Number.NEGATIVE_INFINITY;
      }
      if (!Number.isFinite(this.layer)) {
        return Number.NaN;
      }
      if (this.layer === 0) {
        return this.sign * this.mag;
      } else if (this.layer === 1) {
        return this.sign * Math.pow(10, this.mag);
      } else {
        return this.mag > 0 ? this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : 0;
      }
    }
  }, {
    key: "mantissaWithDecimalPlaces",
    value: function mantissaWithDecimalPlaces(places) {
      if (isNaN(this.m)) {
        return Number.NaN;
      }
      if (this.m === 0) {
        return 0;
      }
      return decimalPlaces(this.m, places);
    }
  }, {
    key: "magnitudeWithDecimalPlaces",
    value: function magnitudeWithDecimalPlaces(places) {
      if (isNaN(this.mag)) {
        return Number.NaN;
      }
      if (this.mag === 0) {
        return 0;
      }
      return decimalPlaces(this.mag, places);
    }
    /**
     * Returns a string representation of the Decimal it's called on.
     * This string is written as a plain number for most layer 0 numbers, in scientific notation for layer 1 numbers (and layer 0 numbers below 1e-6),
     * in "ee...X" form for numbers from layers 2 to 5, and in (e^N)X form for layer > 5.
     */
  }, {
    key: "toString",
    value: function toString() {
      if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
        return "NaN";
      }
      if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
        return this.sign === 1 ? "Infinity" : "-Infinity";
      }
      if (this.layer === 0) {
        if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
          return (this.sign * this.mag).toString();
        }
        return this.m + "e" + this.e;
      } else if (this.layer === 1) {
        return this.m + "e" + this.e;
      } else {
        if (this.layer <= MAX_ES_IN_A_ROW) {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
        } else {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
        }
      }
    }
  }, {
    key: "toExponential",
    value: function toExponential(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toExponential(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
  }, {
    key: "toFixed",
    value: function toFixed(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toFixed(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
  }, {
    key: "toPrecision",
    value: function toPrecision(places) {
      if (this.e <= -7) {
        return this.toExponential(places - 1);
      }
      if (places > this.e) {
        return this.toFixed(places - this.exponent - 1);
      }
      return this.toExponential(places - 1);
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toStringWithDecimalPlaces",
    value: function toStringWithDecimalPlaces(places) {
      if (this.layer === 0) {
        if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
          return (this.sign * this.mag).toFixed(places);
        }
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      } else if (this.layer === 1) {
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      } else {
        if (this.layer <= MAX_ES_IN_A_ROW) {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places);
        } else {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
        }
      }
    }
    /**
     * Absolute value function: returns 'this' if 'this' >= 0, returns the negative of 'this' if this < 0.
     */
  }, {
    key: "abs",
    value: function abs() {
      return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "neg",
    value: function neg() {
      return FC_NN(-this.sign, this.layer, this.mag);
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "negate",
    value: function negate() {
      return this.neg();
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "negated",
    value: function negated() {
      return this.neg();
    }
    // public sign () {
    //     return this.sign;
    //   }
    /**
     * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
     */
  }, {
    key: "sgn",
    value: function sgn() {
      return this.sign;
    }
    /**
     * Rounds the Decimal it's called on to the nearest integer.
     */
  }, {
    key: "round",
    value: function round() {
      if (this.mag < 0) {
        return Decimal2.dZero;
      }
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.round(this.mag));
      }
      return this;
    }
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
     */
  }, {
    key: "floor",
    value: function floor() {
      if (this.mag < 0) {
        if (this.sign === -1)
          return Decimal2.dNegOne;
        else
          return Decimal2.dZero;
      }
      if (this.sign === -1)
        return this.neg().ceil().neg();
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.floor(this.mag));
      }
      return this;
    }
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
     */
  }, {
    key: "ceil",
    value: function ceil() {
      if (this.mag < 0) {
        if (this.sign === 1)
          return Decimal2.dOne;
        else
          return Decimal2.dZero;
      }
      if (this.sign === -1)
        return this.neg().floor().neg();
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.ceil(this.mag));
      }
      return this;
    }
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
  }, {
    key: "trunc",
    value: function trunc() {
      if (this.mag < 0) {
        return Decimal2.dZero;
      }
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.trunc(this.mag));
      }
      return this;
    }
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
  }, {
    key: "add",
    value: function add2(value) {
      var decimal = D(value);
      if (!Number.isFinite(this.layer)) {
        return this;
      }
      if (!Number.isFinite(decimal.layer)) {
        return decimal;
      }
      if (this.sign === 0) {
        return decimal;
      }
      if (decimal.sign === 0) {
        return this;
      }
      if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) {
        return FC_NN(0, 0, 0);
      }
      var a;
      var b;
      if (this.layer >= 2 || decimal.layer >= 2) {
        return this.maxabs(decimal);
      }
      if (Decimal2.cmpabs(this, decimal) > 0) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return Decimal2.fromNumber(a.sign * a.mag + b.sign * b.mag);
      }
      var layera = a.layer * Math.sign(a.mag);
      var layerb = b.layer * Math.sign(b.mag);
      if (layera - layerb >= 2) {
        return a;
      }
      if (layera === 0 && layerb === -1) {
        if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          var magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
          var mantissa = b.sign + a.sign * magdiff;
          return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
        }
      }
      if (layera === 1 && layerb === 0) {
        if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          var _magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
          var _mantissa = b.sign + a.sign * _magdiff;
          return FC(Math.sign(_mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(_mantissa)));
        }
      }
      if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        var _magdiff2 = Math.pow(10, a.mag - b.mag);
        var _mantissa2 = b.sign + a.sign * _magdiff2;
        return FC(Math.sign(_mantissa2), 1, b.mag + Math.log10(Math.abs(_mantissa2)));
      }
    }
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
  }, {
    key: "plus",
    value: function plus(value) {
      return this.add(value);
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "sub",
    value: function sub(value) {
      return this.add(D(value).neg());
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "subtract",
    value: function subtract(value) {
      return this.sub(value);
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "minus",
    value: function minus(value) {
      return this.sub(value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "mul",
    value: function mul(value) {
      var decimal = D(value);
      if (!Number.isFinite(this.layer)) {
        return this;
      }
      if (!Number.isFinite(decimal.layer)) {
        return decimal;
      }
      if (this.sign === 0 || decimal.sign === 0) {
        return FC_NN(0, 0, 0);
      }
      if (this.layer === decimal.layer && this.mag === -decimal.mag) {
        return FC_NN(this.sign * decimal.sign, 0, 1);
      }
      var a;
      var b;
      if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return Decimal2.fromNumber(a.sign * b.sign * a.mag * b.mag);
      }
      if (a.layer >= 3 || a.layer - b.layer >= 2) {
        return FC(a.sign * b.sign, a.layer, a.mag);
      }
      if (a.layer === 1 && b.layer === 0) {
        return FC(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
      }
      if (a.layer === 1 && b.layer === 1) {
        return FC(a.sign * b.sign, 1, a.mag + b.mag);
      }
      if (a.layer === 2 && b.layer === 1) {
        var newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
        return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
      }
      if (a.layer === 2 && b.layer === 2) {
        var _newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
        return FC(a.sign * b.sign, _newmag.layer + 1, _newmag.sign * _newmag.mag);
      }
      throw Error("Bad arguments to mul: " + this + ", " + value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "multiply",
    value: function multiply(value) {
      return this.mul(value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "times",
    value: function times(value) {
      return this.mul(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "div",
    value: function div(value) {
      var decimal = D(value);
      return this.mul(decimal.recip());
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "divide",
    value: function divide(value) {
      return this.div(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "divideBy",
    value: function divideBy(value) {
      return this.div(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "dividedBy",
    value: function dividedBy(value) {
      return this.div(value);
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "recip",
    value: function recip() {
      if (this.mag === 0) {
        return Decimal2.dNaN;
      } else if (this.layer === 0) {
        return FC(this.sign, 0, 1 / this.mag);
      } else {
        return FC(this.sign, this.layer, -this.mag);
      }
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "reciprocal",
    value: function reciprocal() {
      return this.recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "reciprocate",
    value: function reciprocate() {
      return this.recip();
    }
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    //Taken from OmegaNum.js, with a couple touch-ups
  }, {
    key: "mod",
    value: function mod(value) {
      var decimal = D(value).abs();
      if (decimal.eq(Decimal2.dZero))
        return Decimal2.dZero;
      var num_this = this.toNumber();
      var num_decimal = decimal.toNumber();
      if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
        return new Decimal2(num_this % num_decimal);
      }
      if (this.sub(decimal).eq(this)) {
        return Decimal2.dZero;
      }
      if (decimal.sub(this).eq(decimal)) {
        return this;
      }
      if (this.sign == -1)
        return this.abs().mod(decimal).neg();
      return this.sub(this.div(decimal).floor().mul(decimal));
    }
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modulo",
    value: function modulo(value) {
      return this.mod(value);
    }
    /**
     * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modular",
    value: function modular(value) {
      return this.mod(value);
    }
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
  }, {
    key: "cmp",
    value: function cmp(value) {
      var decimal = D(value);
      if (this.sign > decimal.sign) {
        return 1;
      }
      if (this.sign < decimal.sign) {
        return -1;
      }
      return this.sign * this.cmpabs(value);
    }
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'this'| > |'value'|, returns -1 if |'this'| < |'value'|, returns 0 if |'this'| == |'value'|.
     */
  }, {
    key: "cmpabs",
    value: function cmpabs(value) {
      var decimal = D(value);
      var layera = this.mag > 0 ? this.layer : -this.layer;
      var layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
      if (layera > layerb) {
        return 1;
      }
      if (layera < layerb) {
        return -1;
      }
      if (this.mag > decimal.mag) {
        return 1;
      }
      if (this.mag < decimal.mag) {
        return -1;
      }
      return 0;
    }
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
  }, {
    key: "compare",
    value: function compare(value) {
      return this.cmp(value);
    }
    /**
     * Returns true if the Decimal is an NaN value.
     */
  }, {
    key: "isNan",
    value: function isNan() {
      return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
    }
    /**
     * Returns true if the Decimal is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
     */
  }, {
    key: "isFinite",
    value: function(_isFinite2) {
      function isFinite2() {
        return _isFinite2.apply(this, arguments);
      }
      isFinite2.toString = function() {
        return _isFinite2.toString();
      };
      return isFinite2;
    }(
      function() {
        return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
      }
      /**
       * The Decimal equivalent of ==. Returns true if 'this' and 'value' have equal values.
       */
    )
  }, {
    key: "eq",
    value: function eq(value) {
      var decimal = D(value);
      return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    }
    /**
     * Returns true if 'this' and 'value' have equal values.
     */
  }, {
    key: "equals",
    value: function equals(value) {
      return this.eq(value);
    }
    /**
     * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
     */
  }, {
    key: "neq",
    value: function neq(value) {
      return !this.eq(value);
    }
    /**
     * Returns true if 'this' and 'value' do not have equal values.
     */
  }, {
    key: "notEquals",
    value: function notEquals(value) {
      return this.neq(value);
    }
    /**
     * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
     */
  }, {
    key: "lt",
    value: function lt(value) {
      return this.cmp(value) === -1;
    }
    /**
     * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
     */
  }, {
    key: "lte",
    value: function lte(value) {
      return !this.gt(value);
    }
    /**
     * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
     */
  }, {
    key: "gt",
    value: function gt(value) {
      return this.cmp(value) === 1;
    }
    /**
     * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
     */
  }, {
    key: "gte",
    value: function gte(value) {
      return !this.lt(value);
    }
    /**
     * Returns whichever of 'this' and 'value' is higher.
     */
  }, {
    key: "max",
    value: function max(value) {
      var decimal = D(value);
      return this.lt(decimal) ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' is lower.
     */
  }, {
    key: "min",
    value: function min(value) {
      var decimal = D(value);
      return this.gt(decimal) ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' has a larger absolute value.
     */
  }, {
    key: "maxabs",
    value: function maxabs(value) {
      var decimal = D(value);
      return this.cmpabs(decimal) < 0 ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' has a smaller absolute value.
     */
  }, {
    key: "minabs",
    value: function minabs(value) {
      var decimal = D(value);
      return this.cmpabs(decimal) > 0 ? decimal : this;
    }
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
     */
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      return this.max(min).min(max);
    }
    /**
     * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
     */
  }, {
    key: "clampMin",
    value: function clampMin(min) {
      return this.max(min);
    }
    /**
     * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
     */
  }, {
    key: "clampMax",
    value: function clampMax(max) {
      return this.min(max);
    }
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "cmp_tolerance",
    value: function cmp_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "compare_tolerance",
    value: function compare_tolerance(value, tolerance) {
      return this.cmp_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "eq_tolerance",
    value: function eq_tolerance(value, tolerance) {
      var decimal = D(value);
      if (tolerance == null) {
        tolerance = 1e-7;
      }
      if (this.sign !== decimal.sign) {
        return false;
      }
      if (Math.abs(this.layer - decimal.layer) > 1) {
        return false;
      }
      var magA = this.mag;
      var magB = decimal.mag;
      if (this.layer > decimal.layer) {
        magB = f_maglog10(magB);
      }
      if (this.layer < decimal.layer) {
        magA = f_maglog10(magA);
      }
      return Math.abs(magA - magB) <= tolerance * Math.max(Math.abs(magA), Math.abs(magB));
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "equals_tolerance",
    value: function equals_tolerance(value, tolerance) {
      return this.eq_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "neq_tolerance",
    value: function neq_tolerance(value, tolerance) {
      return !this.eq_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "notEquals_tolerance",
    value: function notEquals_tolerance(value, tolerance) {
      return this.neq_tolerance(value, tolerance);
    }
    /**
     * Returns true if 'this' is less than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lt_tolerance",
    value: function lt_tolerance(value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }
    /**
     * Returns true if 'this' is less than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lte_tolerance",
    value: function lte_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }
    /**
     * Returns true if 'this' is greater than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gt_tolerance",
    value: function gt_tolerance(value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }
    /**
     * Returns true if 'this' is greater than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gte_tolerance",
    value: function gte_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
  }, {
    key: "pLog10",
    value: function pLog10() {
      if (this.lt(Decimal2.dZero)) {
        return Decimal2.dZero;
      }
      return this.log10();
    }
    /**
     * Returns the base-10 logarithm of abs('this').
     */
  }, {
    key: "absLog10",
    value: function absLog10() {
      if (this.sign === 0) {
        return Decimal2.dNaN;
      } else if (this.layer > 0) {
        return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      } else {
        return FC(1, 0, Math.log10(this.mag));
      }
    }
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'this'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
  }, {
    key: "log10",
    value: function log10() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      } else if (this.layer > 0) {
        return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      } else {
        return FC(this.sign, 0, Math.log10(this.mag));
      }
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
  }, {
    key: "log",
    value: function log(base) {
      base = D(base);
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      }
      if (base.sign <= 0) {
        return Decimal2.dNaN;
      }
      if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
        return Decimal2.dNaN;
      } else if (this.layer === 0 && base.layer === 0) {
        return FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
      }
      return Decimal2.div(this.log10(), base.log10());
    }
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
     */
  }, {
    key: "log2",
    value: function log2() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      } else if (this.layer === 0) {
        return FC(this.sign, 0, Math.log2(this.mag));
      } else if (this.layer === 1) {
        return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362);
      } else if (this.layer === 2) {
        return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247);
      } else {
        return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      }
    }
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'this'.
     */
  }, {
    key: "ln",
    value: function ln() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      } else if (this.layer === 0) {
        return FC(this.sign, 0, Math.log(this.mag));
      } else if (this.layer === 1) {
        return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046);
      } else if (this.layer === 2) {
        return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325);
      } else {
        return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      }
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
  }, {
    key: "logarithm",
    value: function logarithm(base) {
      return this.log(base);
    }
    /**
     * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
     */
  }, {
    key: "pow",
    value: function pow(value) {
      var decimal = D(value);
      var a = this;
      var b = decimal;
      if (a.sign === 0) {
        return b.eq(0) ? FC_NN(1, 0, 1) : a;
      }
      if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
        return a;
      }
      if (b.sign === 0) {
        return FC_NN(1, 0, 1);
      }
      if (b.sign === 1 && b.layer === 0 && b.mag === 1) {
        return a;
      }
      var result = a.absLog10().mul(b).pow10();
      if (this.sign === -1) {
        if (Math.abs(b.toNumber() % 2) % 2 === 1) {
          return result.neg();
        } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
          return result;
        }
        return Decimal2.dNaN;
      }
      return result;
    }
    /**
     * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
     */
  }, {
    key: "pow10",
    value: function pow10() {
      if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
        return Decimal2.dNaN;
      }
      var a = this;
      if (a.layer === 0) {
        var newmag = Math.pow(10, a.sign * a.mag);
        if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
          return FC(1, 0, newmag);
        } else {
          if (a.sign === 0) {
            return Decimal2.dOne;
          } else {
            a = FC_NN(a.sign, a.layer + 1, Math.log10(a.mag));
          }
        }
      }
      if (a.sign > 0 && a.mag >= 0) {
        return FC(a.sign, a.layer + 1, a.mag);
      }
      if (a.sign < 0 && a.mag >= 0) {
        return FC(-a.sign, a.layer + 1, -a.mag);
      }
      return Decimal2.dOne;
    }
    /**
     * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
     */
  }, {
    key: "pow_base",
    value: function pow_base(value) {
      return D(value).pow(this);
    }
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
     * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
     */
  }, {
    key: "root",
    value: function root(value) {
      var decimal = D(value);
      return this.pow(decimal.recip());
    }
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
  }, {
    key: "factorial",
    value: function factorial() {
      if (this.mag < 0) {
        return this.add(1).gamma();
      } else if (this.layer === 0) {
        return this.add(1).gamma();
      } else if (this.layer === 1) {
        return Decimal2.exp(Decimal2.mul(this, Decimal2.ln(this).sub(1)));
      } else {
        return Decimal2.exp(this);
      }
    }
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    //from HyperCalc source code
  }, {
    key: "gamma",
    value: function gamma() {
      if (this.mag < 0) {
        return this.recip();
      } else if (this.layer === 0) {
        if (this.lt(FC_NN(1, 0, 24))) {
          return Decimal2.fromNumber(f_gamma(this.sign * this.mag));
        }
        var t = this.mag - 1;
        var l = 0.9189385332046727;
        l = l + (t + 0.5) * Math.log(t);
        l = l - t;
        var n2 = t * t;
        var np = t;
        var lm = 12 * np;
        var adj = 1 / lm;
        var l2 = l + adj;
        if (l2 === l) {
          return Decimal2.exp(l);
        }
        l = l2;
        np = np * n2;
        lm = 360 * np;
        adj = 1 / lm;
        l2 = l - adj;
        if (l2 === l) {
          return Decimal2.exp(l);
        }
        l = l2;
        np = np * n2;
        lm = 1260 * np;
        var lt = 1 / lm;
        l = l + lt;
        np = np * n2;
        lm = 1680 * np;
        lt = 1 / lm;
        l = l - lt;
        return Decimal2.exp(l);
      } else if (this.layer === 1) {
        return Decimal2.exp(Decimal2.mul(this, Decimal2.ln(this).sub(1)));
      } else {
        return Decimal2.exp(this);
      }
    }
    /**
     * Returns the natural logarithm of Gamma('this').
     */
  }, {
    key: "lngamma",
    value: function lngamma() {
      return this.gamma().ln();
    }
    /**
     * Base-e exponentiation: returns e^'this'.
     */
  }, {
    key: "exp",
    value: function exp() {
      if (this.mag < 0) {
        return Decimal2.dOne;
      }
      if (this.layer === 0 && this.mag <= 709.7) {
        return Decimal2.fromNumber(Math.exp(this.sign * this.mag));
      } else if (this.layer === 0) {
        return FC(1, 1, this.sign * Math.log10(Math.E) * this.mag);
      } else if (this.layer === 1) {
        return FC(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
      } else {
        return FC(1, this.layer + 1, this.sign * this.mag);
      }
    }
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
  }, {
    key: "sqr",
    value: function sqr() {
      return this.pow(2);
    }
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
     */
  }, {
    key: "sqrt",
    value: function sqrt() {
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.sqrt(this.sign * this.mag));
      } else if (this.layer === 1) {
        return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
      } else {
        var result = Decimal2.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
        result.layer += 1;
        result.normalize();
        return result;
      }
    }
    /**
     * Cubing a number means raising it to the third power.
     */
  }, {
    key: "cube",
    value: function cube() {
      return this.pow(3);
    }
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
     */
  }, {
    key: "cbrt",
    value: function cbrt() {
      return this.pow(1 / 3);
    }
    /**
     *
     * Tetration: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
     *
     * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "tetrate",
    value: function tetrate() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (height === 1) {
        return Decimal2.pow(this, payload);
      }
      if (height === 0) {
        return new Decimal2(payload);
      }
      if (this.eq(Decimal2.dOne)) {
        return Decimal2.dOne;
      }
      if (this.eq(-1)) {
        return Decimal2.pow(this, payload);
      }
      if (height === Number.POSITIVE_INFINITY) {
        var this_num = this.toNumber();
        if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
          if (this_num > 1.444667861009099) {
            return Decimal2.fromNumber(Math.E);
          }
          var negln = Decimal2.ln(this).neg();
          return negln.lambertw().div(negln);
        } else if (this_num > 1.444667861009766) {
          return Decimal2.fromNumber(Number.POSITIVE_INFINITY);
        } else {
          return Decimal2.dNaN;
        }
      }
      if (this.eq(Decimal2.dZero)) {
        var result = Math.abs((height + 1) % 2);
        if (result > 1) {
          result = 2 - result;
        }
        return Decimal2.fromNumber(result);
      }
      if (height < 0) {
        return Decimal2.iteratedlog(payload, this, -height, linear);
      }
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight - height;
      if (this.gt(Decimal2.dZero) && this.lte(1.444667861009766) && (oldheight > 1e4 || !linear)) {
        height = Math.min(1e4, height);
        for (var i = 0; i < height; ++i) {
          var old_payload = payload;
          payload = this.pow(payload);
          if (old_payload.eq(payload)) {
            return payload;
          }
        }
        if (fracheight != 0 || oldheight > 1e4) {
          var next_payload = this.pow(payload);
          if (oldheight <= 1e4 || Math.ceil(oldheight) % 2 == 0) {
            return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
          } else {
            return payload.mul(fracheight).add(next_payload.mul(1 - fracheight));
          }
        }
        return payload;
      }
      if (fracheight !== 0) {
        if (payload.eq(Decimal2.dOne)) {
          if (this.gt(10) || linear) {
            payload = this.pow(fracheight);
          } else {
            payload = Decimal2.fromNumber(Decimal2.tetrate_critical(this.toNumber(), fracheight));
            if (this.lt(2)) {
              payload = payload.sub(1).mul(this.minus(1)).plus(1);
            }
          }
        } else {
          if (this.eq(10)) {
            payload = payload.layeradd10(fracheight, linear);
          } else {
            payload = payload.layeradd(fracheight, this, linear);
          }
        }
      }
      for (var _i = 0; _i < height; ++_i) {
        payload = this.pow(payload);
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (payload.layer - this.layer > 3) {
          return FC_NN(payload.sign, payload.layer + (height - _i - 1), payload.mag);
        }
        if (_i > 1e4) {
          return payload;
        }
      }
      return payload;
    }
    /**
     * Iterated exponentiation, the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * Identical to tetrate.
     */
  }, {
    key: "iteratedexp",
    value: function iteratedexp() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return this.tetrate(height, payload, linear);
    }
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "iteratedlog",
    value: function iteratedlog() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (times < 0) {
        return Decimal2.tetrate(base, -times, this, linear);
      }
      base = D(base);
      var result = Decimal2.fromDecimal(this);
      var fulltimes = times;
      times = Math.trunc(times);
      var fraction = fulltimes - times;
      if (result.layer - base.layer > 3) {
        var layerloss = Math.min(times, result.layer - base.layer - 3);
        times -= layerloss;
        result.layer -= layerloss;
      }
      for (var i = 0; i < times; ++i) {
        result = result.log(base);
        if (!isFinite(result.layer) || !isFinite(result.mag)) {
          return result.normalize();
        }
        if (i > 1e4) {
          return result;
        }
      }
      if (fraction > 0 && fraction < 1) {
        if (base.eq(10)) {
          result = result.layeradd10(-fraction, linear);
        } else {
          result = result.layeradd(-fraction, base, linear);
        }
      }
      return result;
    }
    /**
     * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'this'. https://en.wikipedia.org/wiki/Super-logarithm
     *
     * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
     *
     * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "slog",
    value: function slog() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var iterations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var step_size = 1e-3;
      var has_changed_directions_once = false;
      var previously_rose = false;
      var result = this.slog_internal(base, linear).toNumber();
      for (var i = 1; i < iterations; ++i) {
        var new_decimal = new Decimal2(base).tetrate(result, Decimal2.dOne, linear);
        var currently_rose = new_decimal.gt(this);
        if (i > 1) {
          if (previously_rose != currently_rose) {
            has_changed_directions_once = true;
          }
        }
        previously_rose = currently_rose;
        if (has_changed_directions_once) {
          step_size /= 2;
        } else {
          step_size *= 2;
        }
        step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
        result += step_size;
        if (step_size === 0) {
          break;
        }
      }
      return Decimal2.fromNumber(result);
    }
  }, {
    key: "slog_internal",
    value: function slog_internal() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var linear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      base = D(base);
      if (base.lte(Decimal2.dZero)) {
        return Decimal2.dNaN;
      }
      if (base.eq(Decimal2.dOne)) {
        return Decimal2.dNaN;
      }
      if (base.lt(Decimal2.dOne)) {
        if (this.eq(Decimal2.dOne)) {
          return Decimal2.dZero;
        }
        if (this.eq(Decimal2.dZero)) {
          return Decimal2.dNegOne;
        }
        return Decimal2.dNaN;
      }
      if (this.mag < 0 || this.eq(Decimal2.dZero)) {
        return Decimal2.dNegOne;
      }
      var result = 0;
      var copy = Decimal2.fromDecimal(this);
      if (copy.layer - base.layer > 3) {
        var layerloss = copy.layer - base.layer - 3;
        result += layerloss;
        copy.layer -= layerloss;
      }
      for (var i = 0; i < 100; ++i) {
        if (copy.lt(Decimal2.dZero)) {
          copy = Decimal2.pow(base, copy);
          result -= 1;
        } else if (copy.lte(Decimal2.dOne)) {
          if (linear)
            return Decimal2.fromNumber(result + copy.toNumber() - 1);
          else
            return Decimal2.fromNumber(result + Decimal2.slog_critical(base.toNumber(), copy.toNumber()));
        } else {
          result += 1;
          copy = Decimal2.log(copy, base);
        }
      }
      return Decimal2.fromNumber(result);
    }
    //background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
  }, {
    key: "layeradd10",
    value: (
      /**
       * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
       *
       * Tetration for non-integer heights does not have a single agreed-upon definition,
       * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
       * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
       * Analytic approximation is not currently supported for bases > 10.
       */
      //Moved this over to use the same critical section as tetrate/slog.
      function layeradd10(diff) {
        var linear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        diff = Decimal2.fromValue_noAlloc(diff).toNumber();
        var result = Decimal2.fromDecimal(this);
        if (diff >= 1) {
          if (result.mag < 0 && result.layer > 0) {
            result.sign = 0;
            result.mag = 0;
            result.layer = 0;
          } else if (result.sign === -1 && result.layer == 0) {
            result.sign = 1;
            result.mag = -result.mag;
          }
          var layeradd = Math.trunc(diff);
          diff -= layeradd;
          result.layer += layeradd;
        }
        if (diff <= -1) {
          var _layeradd = Math.trunc(diff);
          diff -= _layeradd;
          result.layer += _layeradd;
          if (result.layer < 0) {
            for (var i = 0; i < 100; ++i) {
              result.layer++;
              result.mag = Math.log10(result.mag);
              if (!isFinite(result.mag)) {
                if (result.sign === 0) {
                  result.sign = 1;
                }
                if (result.layer < 0) {
                  result.layer = 0;
                }
                return result.normalize();
              }
              if (result.layer >= 0) {
                break;
              }
            }
          }
        }
        while (result.layer < 0) {
          result.layer++;
          result.mag = Math.log10(result.mag);
        }
        if (result.sign === 0) {
          result.sign = 1;
          if (result.mag === 0 && result.layer >= 1) {
            result.layer -= 1;
            result.mag = 1;
          }
        }
        result.normalize();
        if (diff !== 0) {
          return result.layeradd(diff, 10, linear);
        }
        return result;
      }
    )
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "layeradd",
    value: function layeradd(diff, base) {
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var slogthis = this.slog(base).toNumber();
      var slogdest = slogthis + diff;
      if (slogdest >= 0) {
        return Decimal2.tetrate(base, slogdest, Decimal2.dOne, linear);
      } else if (!Number.isFinite(slogdest)) {
        return Decimal2.dNaN;
      } else if (slogdest >= -1) {
        return Decimal2.log(Decimal2.tetrate(base, slogdest + 1, Decimal2.dOne, linear), base);
      } else {
        return Decimal2.log(Decimal2.log(Decimal2.tetrate(base, slogdest + 2, Decimal2.dOne, linear), base), base);
      }
    }
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  }, {
    key: "lambertw",
    value: function lambertw() {
      if (this.lt(-0.3678794411710499)) {
        throw Error("lambertw is unimplemented for results less than -1, sorry!");
      } else if (this.mag < 0) {
        return Decimal2.fromNumber(f_lambertw(this.toNumber()));
      } else if (this.layer === 0) {
        return Decimal2.fromNumber(f_lambertw(this.sign * this.mag));
      } else if (this.layer === 1) {
        return d_lambertw(this);
      } else if (this.layer === 2) {
        return d_lambertw(this);
      }
      if (this.layer >= 3) {
        return FC_NN(this.sign, this.layer - 1, this.mag);
      }
      throw "Unhandled behavior in lambertw()";
    }
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
  }, {
    key: "ssqrt",
    value: function ssqrt() {
      return this.linear_sroot(2);
    }
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    //Another reason this doesn't support analytic approximation because I don't know the structure of non-linear tetrations for inputs < 1
    //TODO: Optimize this like how slog is optimized (if it isn't already)
  }, {
    key: "linear_sroot",
    value: function linear_sroot(degree) {
      if (degree == 1) {
        return this;
      }
      if (this.eq(Decimal2.dInf)) {
        return Decimal2.dInf;
      }
      if (!this.isFinite()) {
        return Decimal2.dNaN;
      }
      if (degree > 0 && degree < 1) {
        return this.root(degree);
      }
      if (degree > -2 && degree < -1) {
        return Decimal2.fromNumber(degree).add(2).pow(this.recip());
      }
      if (degree <= 0) {
        return Decimal2.dNaN;
      }
      if (degree == Number.POSITIVE_INFINITY) {
        var this_num = this.toNumber();
        if (this_num < Math.E && this_num > _EXPN1) {
          return this.pow(this.recip());
        } else {
          return Decimal2.dNaN;
        }
      }
      if (this.eq(1)) {
        return Decimal2.dOne;
      }
      if (this.lt(0)) {
        return Decimal2.dNaN;
      }
      if (this.lte("1ee-16")) {
        if (degree % 2 == 1)
          return this;
        else
          return Decimal2.dNaN;
      }
      if (this.gt(1)) {
        var upperBound = Decimal2.dTen;
        if (this.gte(Decimal2.tetrate(10, degree, 1, true))) {
          upperBound = this.iteratedlog(10, degree - 1, true);
        }
        if (degree <= 1) {
          upperBound = this.root(degree);
        }
        var lower = Decimal2.dZero;
        var layer = upperBound.layer;
        var upper = upperBound.iteratedlog(10, layer, true);
        var previous = upper;
        var guess = upper.div(2);
        var loopGoing = true;
        while (loopGoing) {
          guess = lower.add(upper).div(2);
          if (Decimal2.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this))
            upper = guess;
          else
            lower = guess;
          if (guess.eq(previous))
            loopGoing = false;
          else
            previous = guess;
        }
        return Decimal2.iteratedexp(10, layer, guess, true);
      } else {
        var stage = 1;
        var minimum = FC(1, 10, 1);
        var maximum = FC(1, 10, 1);
        var _lower = FC(1, 10, 1);
        var _upper = FC(1, 1, -16);
        var prevspan = Decimal2.dZero;
        var difference = FC(1, 10, 1);
        var _upperBound = _upper.pow10().recip();
        var distance = Decimal2.dZero;
        var prevPoint = _upperBound;
        var nextPoint = _upperBound;
        var evenDegree = Math.ceil(degree) % 2 == 0;
        var range = 0;
        var lastValid = FC(1, 10, 1);
        var infLoopDetector = false;
        var previousUpper = Decimal2.dZero;
        var decreasingFound = false;
        while (stage < 4) {
          if (stage == 2) {
            if (evenDegree)
              break;
            else {
              _lower = FC(1, 10, 1);
              _upper = minimum;
              stage = 3;
              difference = FC(1, 10, 1);
              lastValid = FC(1, 10, 1);
            }
          }
          infLoopDetector = false;
          while (_upper.neq(_lower)) {
            previousUpper = _upper;
            if (_upper.pow10().recip().tetrate(degree, 1, true).eq(1) && _upper.pow10().recip().lt(0.4)) {
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.pow10().recip();
              nextPoint = _upper.pow10().recip();
              distance = Decimal2.dZero;
              range = -1;
              if (stage == 3)
                lastValid = _upper;
            } else if (_upper.pow10().recip().tetrate(degree, 1, true).eq(_upper.pow10().recip()) && !evenDegree && _upper.pow10().recip().lt(0.4)) {
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.pow10().recip();
              nextPoint = _upper.pow10().recip();
              distance = Decimal2.dZero;
              range = 0;
            } else if (_upper.pow10().recip().tetrate(degree, 1, true).eq(_upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
              _upperBound = _upper.pow10().recip();
              prevPoint = Decimal2.dZero;
              nextPoint = _upperBound.mul(2);
              distance = _upperBound;
              if (evenDegree)
                range = -1;
              else
                range = 0;
            } else {
              prevspan = _upper.mul(12e-17);
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.add(prevspan).pow10().recip();
              distance = _upperBound.sub(prevPoint);
              nextPoint = _upperBound.add(distance);
              while (prevPoint.tetrate(degree, 1, true).eq(_upperBound.tetrate(degree, 1, true)) || nextPoint.tetrate(degree, 1, true).eq(_upperBound.tetrate(degree, 1, true)) || prevPoint.gte(_upperBound) || nextPoint.lte(_upperBound)) {
                prevspan = prevspan.mul(2);
                prevPoint = _upper.add(prevspan).pow10().recip();
                distance = _upperBound.sub(prevPoint);
                nextPoint = _upperBound.add(distance);
              }
              if (stage == 1 && nextPoint.tetrate(degree, 1, true).gt(_upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).gt(_upperBound.tetrate(degree, 1, true)) || stage == 3 && nextPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true))) {
                lastValid = _upper;
              }
              if (nextPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true))) {
                range = -1;
              } else if (evenDegree) {
                range = 1;
              } else if (stage == 3 && _upper.gt_tolerance(minimum, 1e-8)) {
                range = 0;
              } else {
                while (prevPoint.tetrate(degree, 1, true).eq_tolerance(_upperBound.tetrate(degree, 1, true), 1e-8) || nextPoint.tetrate(degree, 1, true).eq_tolerance(_upperBound.tetrate(degree, 1, true), 1e-8) || prevPoint.gte(_upperBound) || nextPoint.lte(_upperBound)) {
                  prevspan = prevspan.mul(2);
                  prevPoint = _upper.add(prevspan).pow10().recip();
                  distance = _upperBound.sub(prevPoint);
                  nextPoint = _upperBound.add(distance);
                }
                if (nextPoint.tetrate(degree, 1, true).sub(_upperBound.tetrate(degree, 1, true)).lt(_upperBound.tetrate(degree, 1, true).sub(prevPoint.tetrate(degree, 1, true)))) {
                  range = 0;
                } else {
                  range = 1;
                }
              }
            }
            if (range == -1)
              decreasingFound = true;
            if (stage == 1 && range == 1 || stage == 3 && range != 0) {
              if (_lower.eq(FC(1, 10, 1))) {
                _upper = _upper.mul(2);
              } else {
                var cutOff = false;
                if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                  cutOff = true;
                _upper = _upper.add(_lower).div(2);
                if (cutOff)
                  break;
              }
            } else {
              if (_lower.eq(FC(1, 10, 1))) {
                _lower = _upper;
                _upper = _upper.div(2);
              } else {
                var _cutOff = false;
                if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                  _cutOff = true;
                _lower = _lower.sub(difference);
                _upper = _upper.sub(difference);
                if (_cutOff)
                  break;
              }
            }
            if (_lower.sub(_upper).div(2).abs().gt(difference.mul(1.5)))
              infLoopDetector = true;
            difference = _lower.sub(_upper).div(2).abs();
            if (_upper.gt("1e18"))
              break;
            if (_upper.eq(previousUpper))
              break;
          }
          if (_upper.gt("1e18"))
            break;
          if (!decreasingFound)
            break;
          if (lastValid == FC(1, 10, 1)) {
            break;
          }
          if (stage == 1)
            minimum = lastValid;
          else if (stage == 3)
            maximum = lastValid;
          stage++;
        }
        _lower = minimum;
        _upper = FC(1, 1, -18);
        var _previous = _upper;
        var _guess = Decimal2.dZero;
        var _loopGoing = true;
        while (_loopGoing) {
          if (_lower.eq(FC(1, 10, 1)))
            _guess = _upper.mul(2);
          else
            _guess = _lower.add(_upper).div(2);
          if (Decimal2.pow(10, _guess).recip().tetrate(degree, 1, true).gt(this))
            _upper = _guess;
          else
            _lower = _guess;
          if (_guess.eq(_previous))
            _loopGoing = false;
          else
            _previous = _guess;
          if (_upper.gt("1e18"))
            return Decimal2.dNaN;
        }
        if (!_guess.eq_tolerance(minimum, 1e-15)) {
          return _guess.pow10().recip();
        } else {
          if (maximum.eq(FC(1, 10, 1))) {
            return Decimal2.dNaN;
          }
          _lower = FC(1, 10, 1);
          _upper = maximum;
          _previous = _upper;
          _guess = Decimal2.dZero;
          _loopGoing = true;
          while (_loopGoing) {
            if (_lower.eq(FC(1, 10, 1)))
              _guess = _upper.mul(2);
            else
              _guess = _lower.add(_upper).div(2);
            if (Decimal2.pow(10, _guess).recip().tetrate(degree, 1, true).gt(this))
              _upper = _guess;
            else
              _lower = _guess;
            if (_guess.eq(_previous))
              _loopGoing = false;
            else
              _previous = _guess;
            if (_upper.gt("1e18"))
              return Decimal2.dNaN;
          }
          return _guess.pow10().recip();
        }
      }
    }
    /**
     * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
     * https://en.wikipedia.org/wiki/Pentation
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
     */
  }, {
    key: "pentate",
    value: function pentate() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight - height;
      if (fracheight !== 0) {
        if (payload.eq(Decimal2.dOne)) {
          ++height;
          payload = Decimal2.fromNumber(fracheight);
        } else {
          if (this.eq(10)) {
            payload = payload.layeradd10(fracheight, linear);
          } else {
            payload = payload.layeradd(fracheight, this, linear);
          }
        }
      }
      for (var i = 0; i < height; ++i) {
        payload = this.tetrate(payload.toNumber(), Decimal2.dOne, linear);
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (i > 10) {
          return payload;
        }
      }
      return payload;
    }
    // trig functions!
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "sin",
    value: function sin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.sin(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "cos",
    value: function cos() {
      if (this.mag < 0) {
        return Decimal2.dOne;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.cos(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
  }, {
    key: "tan",
    value: function tan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.tan(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The arcsine function, the inverse of the sine function.
     */
  }, {
    key: "asin",
    value: function asin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.asin(this.sign * this.mag));
      }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    /**
     * The arccosine function, the inverse of the cosine function.
     */
  }, {
    key: "acos",
    value: function acos() {
      if (this.mag < 0) {
        return Decimal2.fromNumber(Math.acos(this.toNumber()));
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.acos(this.sign * this.mag));
      }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    /**
     * The arctangent function, the inverse of the tangent function.
     */
  }, {
    key: "atan",
    value: function atan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.atan(this.sign * this.mag));
      }
      return Decimal2.fromNumber(Math.atan(this.sign * Infinity));
    }
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
  }, {
    key: "sinh",
    value: function sinh() {
      return this.exp().sub(this.negate().exp()).div(2);
    }
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
  }, {
    key: "cosh",
    value: function cosh() {
      return this.exp().add(this.negate().exp()).div(2);
    }
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
  }, {
    key: "tanh",
    value: function tanh() {
      return this.sinh().div(this.cosh());
    }
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
  }, {
    key: "asinh",
    value: function asinh() {
      return Decimal2.ln(this.add(this.sqr().add(1).sqrt()));
    }
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
  }, {
    key: "acosh",
    value: function acosh() {
      return Decimal2.ln(this.add(this.sqr().sub(1).sqrt()));
    }
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
  }, {
    key: "atanh",
    value: function atanh() {
      if (this.abs().gte(1)) {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
      return Decimal2.ln(this.add(1).div(Decimal2.fromNumber(1).sub(this))).div(2);
    }
    /**
     * Joke function from Realm Grinder
     */
  }, {
    key: "ascensionPenalty",
    value: function ascensionPenalty(ascensions) {
      if (ascensions === 0) {
        return this;
      }
      return this.root(Decimal2.pow(10, ascensions));
    }
    /**
     * Joke function from Cookie Clicker. It's 'egg'
     */
  }, {
    key: "egg",
    value: function egg() {
      return this.add(9);
    }
  }, {
    key: "lessThanOrEqualTo",
    value: function lessThanOrEqualTo(other) {
      return this.cmp(other) < 1;
    }
  }, {
    key: "lessThan",
    value: function lessThan(other) {
      return this.cmp(other) < 0;
    }
  }, {
    key: "greaterThanOrEqualTo",
    value: function greaterThanOrEqualTo(other) {
      return this.cmp(other) > -1;
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(other) {
      return this.cmp(other) > 0;
    }
  }], [{
    key: "fromComponents",
    value: function fromComponents(sign, layer, mag) {
      return new Decimal2().fromComponents(sign, layer, mag);
    }
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     */
  }, {
    key: "fromComponents_noNormalize",
    value: function fromComponents_noNormalize(sign, layer, mag) {
      return new Decimal2().fromComponents_noNormalize(sign, layer, mag);
    }
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     */
  }, {
    key: "fromMantissaExponent",
    value: function fromMantissaExponent(mantissa, exponent) {
      return new Decimal2().fromMantissaExponent(mantissa, exponent);
    }
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     */
  }, {
    key: "fromMantissaExponent_noNormalize",
    value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
      return new Decimal2().fromMantissaExponent_noNormalize(mantissa, exponent);
    }
    /**
     * Creates a deep copy of the provided value.
     */
  }, {
    key: "fromDecimal",
    value: function fromDecimal(value) {
      return new Decimal2().fromDecimal(value);
    }
    /**
     * Converts a floating-point number into a Decimal.
     */
  }, {
    key: "fromNumber",
    value: function fromNumber(value) {
      return new Decimal2().fromNumber(value);
    }
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     */
  }, {
    key: "fromString",
    value: function fromString(value) {
      var linearhyper4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      return new Decimal2().fromString(value, linearhyper4);
    }
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     */
  }, {
    key: "fromValue",
    value: function fromValue(value) {
      return new Decimal2().fromValue(value);
    }
    /**
     * Converts a DecimalSource to a Decimal, without constructing a new Decimal
     * if the provided value is already a Decimal.
     *
     * As the return value could be the provided value itself, this function
     * returns a read-only Decimal to prevent accidental mutations of the value.
     * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
     * is required.
     */
  }, {
    key: "fromValue_noAlloc",
    value: function fromValue_noAlloc(value) {
      if (value instanceof Decimal2) {
        return value;
      } else if (typeof value === "string") {
        var cached = Decimal2.fromStringCache.get(value);
        if (cached !== void 0) {
          return cached;
        }
        return Decimal2.fromString(value);
      } else if (typeof value === "number") {
        return Decimal2.fromNumber(value);
      } else {
        return Decimal2.dZero;
      }
    }
    /**
     * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
     */
  }, {
    key: "abs",
    value: function abs(value) {
      return D(value).abs();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "neg",
    value: function neg(value) {
      return D(value).neg();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "negate",
    value: function negate(value) {
      return D(value).neg();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "negated",
    value: function negated(value) {
      return D(value).neg();
    }
    /**
     * Returns the sign of the given value.
     */
  }, {
    key: "sign",
    value: function sign(value) {
      return D(value).sign;
    }
    /**
     * Returns the sign of the given value.
     */
  }, {
    key: "sgn",
    value: function sgn(value) {
      return D(value).sign;
    }
    /**
     * Rounds the value to the nearest integer.
     */
  }, {
    key: "round",
    value: function round(value) {
      return D(value).round();
    }
    /**
     * "Rounds" the value to the nearest integer that's less than or equal to it.
     */
  }, {
    key: "floor",
    value: function floor(value) {
      return D(value).floor();
    }
    /**
     * "Rounds" the value to the nearest integer that's greater than or equal to it.
     */
  }, {
    key: "ceil",
    value: function ceil(value) {
      return D(value).ceil();
    }
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
  }, {
    key: "trunc",
    value: function trunc(value) {
      return D(value).trunc();
    }
    /**
     * Addition: returns the sum of the two Decimals.
     */
  }, {
    key: "add",
    value: function add2(value, other) {
      return D(value).add(other);
    }
    /**
     * Addition: returns the sum of the two Decimals.
     */
  }, {
    key: "plus",
    value: function plus(value, other) {
      return D(value).add(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "sub",
    value: function sub(value, other) {
      return D(value).sub(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "subtract",
    value: function subtract(value, other) {
      return D(value).sub(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "minus",
    value: function minus(value, other) {
      return D(value).sub(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "mul",
    value: function mul(value, other) {
      return D(value).mul(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "multiply",
    value: function multiply(value, other) {
      return D(value).mul(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "times",
    value: function times(value, other) {
      return D(value).mul(other);
    }
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
  }, {
    key: "div",
    value: function div(value, other) {
      return D(value).div(other);
    }
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
  }, {
    key: "divide",
    value: function divide(value, other) {
      return D(value).div(other);
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "recip",
    value: function recip(value) {
      return D(value).recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "reciprocal",
    value: function reciprocal(value) {
      return D(value).recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "reciprocate",
    value: function reciprocate(value) {
      return D(value).reciprocate();
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "mod",
    value: function mod(value, other) {
      return D(value).mod(other);
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modulo",
    value: function modulo(value, other) {
      return D(value).modulo(other);
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modular",
    value: function modular(value, other) {
      return D(value).modular(other);
    }
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
  }, {
    key: "cmp",
    value: function cmp(value, other) {
      return D(value).cmp(other);
    }
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
     */
  }, {
    key: "cmpabs",
    value: function cmpabs(value, other) {
      return D(value).cmpabs(other);
    }
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
  }, {
    key: "compare",
    value: function compare(value, other) {
      return D(value).cmp(other);
    }
    /**
     * Returns true if the given value is an NaN value.
     */
  }, {
    key: "isNaN",
    value: function(_isNaN) {
      function isNaN2(_x) {
        return _isNaN.apply(this, arguments);
      }
      isNaN2.toString = function() {
        return _isNaN.toString();
      };
      return isNaN2;
    }(
      function(value) {
        value = D(value);
        return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
      }
      /**
       * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
       */
    )
  }, {
    key: "isFinite",
    value: function(_isFinite) {
      function isFinite2(_x2) {
        return _isFinite.apply(this, arguments);
      }
      isFinite2.toString = function() {
        return _isFinite.toString();
      };
      return isFinite2;
    }(
      function(value) {
        value = D(value);
        return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
      }
      /**
       * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
       */
    )
  }, {
    key: "eq",
    value: function eq(value, other) {
      return D(value).eq(other);
    }
    /**
     * Returns true if 'value' and 'other' have equal values.
     */
  }, {
    key: "equals",
    value: function equals(value, other) {
      return D(value).eq(other);
    }
    /**
     * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
     */
  }, {
    key: "neq",
    value: function neq(value, other) {
      return D(value).neq(other);
    }
    /**
     * Returns true if 'value' and 'other' do not have equal values.
     */
  }, {
    key: "notEquals",
    value: function notEquals(value, other) {
      return D(value).notEquals(other);
    }
    /**
     * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
     */
  }, {
    key: "lt",
    value: function lt(value, other) {
      return D(value).lt(other);
    }
    /**
     * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
     */
  }, {
    key: "lte",
    value: function lte(value, other) {
      return D(value).lte(other);
    }
    /**
     * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
     */
  }, {
    key: "gt",
    value: function gt(value, other) {
      return D(value).gt(other);
    }
    /**
     * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
     */
  }, {
    key: "gte",
    value: function gte(value, other) {
      return D(value).gte(other);
    }
    /**
     * Returns whichever of 'value' and 'other' is higher.
     */
  }, {
    key: "max",
    value: function max(value, other) {
      return D(value).max(other);
    }
    /**
     * Returns whichever of 'value' and 'other' is lower.
     */
  }, {
    key: "min",
    value: function min(value, other) {
      return D(value).min(other);
    }
    /**
     * Returns whichever of 'value' and 'other' has a larger absolute value.
     */
  }, {
    key: "minabs",
    value: function minabs(value, other) {
      return D(value).minabs(other);
    }
    /**
     * Returns whichever of 'value' and 'other' has a smaller absolute value.
     */
  }, {
    key: "maxabs",
    value: function maxabs(value, other) {
      return D(value).maxabs(other);
    }
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
     */
  }, {
    key: "clamp",
    value: function clamp(value, min, max) {
      return D(value).clamp(min, max);
    }
    /**
     * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
     */
  }, {
    key: "clampMin",
    value: function clampMin(value, min) {
      return D(value).clampMin(min);
    }
    /**
     * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
     */
  }, {
    key: "clampMax",
    value: function clampMax(value, max) {
      return D(value).clampMax(max);
    }
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "cmp_tolerance",
    value: function cmp_tolerance(value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    }
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "compare_tolerance",
    value: function compare_tolerance(value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "eq_tolerance",
    value: function eq_tolerance(value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "equals_tolerance",
    value: function equals_tolerance(value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "neq_tolerance",
    value: function neq_tolerance(value, other, tolerance) {
      return D(value).neq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "notEquals_tolerance",
    value: function notEquals_tolerance(value, other, tolerance) {
      return D(value).notEquals_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is less than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lt_tolerance",
    value: function lt_tolerance(value, other, tolerance) {
      return D(value).lt_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is less than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lte_tolerance",
    value: function lte_tolerance(value, other, tolerance) {
      return D(value).lte_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is greater than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gt_tolerance",
    value: function gt_tolerance(value, other, tolerance) {
      return D(value).gt_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is greater than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gte_tolerance",
    value: function gte_tolerance(value, other, tolerance) {
      return D(value).gte_tolerance(other, tolerance);
    }
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
  }, {
    key: "pLog10",
    value: function pLog10(value) {
      return D(value).pLog10();
    }
    /**
     * Returns the base-10 logarithm of abs('value').
     */
  }, {
    key: "absLog10",
    value: function absLog10(value) {
      return D(value).absLog10();
    }
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
  }, {
    key: "log10",
    value: function log10(value) {
      return D(value).log10();
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
  }, {
    key: "log",
    value: function log(value, base) {
      return D(value).log(base);
    }
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
     */
  }, {
    key: "log2",
    value: function log2(value) {
      return D(value).log2();
    }
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
     */
  }, {
    key: "ln",
    value: function ln(value) {
      return D(value).ln();
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
  }, {
    key: "logarithm",
    value: function logarithm(value, base) {
      return D(value).logarithm(base);
    }
    /**
     * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
     */
  }, {
    key: "pow",
    value: function pow(value, other) {
      return D(value).pow(other);
    }
    /**
     * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
     */
  }, {
    key: "pow10",
    value: function pow10(value) {
      return D(value).pow10();
    }
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
     * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
     */
  }, {
    key: "root",
    value: function root(value, other) {
      return D(value).root(other);
    }
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
  }, {
    key: "factorial",
    value: function factorial(value, _other) {
      return D(value).factorial();
    }
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
  }, {
    key: "gamma",
    value: function gamma(value, _other) {
      return D(value).gamma();
    }
    /**
     * Returns the natural (base-e) logarithm of Gamma('value').
     */
  }, {
    key: "lngamma",
    value: function lngamma(value, _other) {
      return D(value).lngamma();
    }
    /**
     * Base-e exponentiation: returns e^'value'.
     */
  }, {
    key: "exp",
    value: function exp(value) {
      return D(value).exp();
    }
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
  }, {
    key: "sqr",
    value: function sqr(value) {
      return D(value).sqr();
    }
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
     */
  }, {
    key: "sqrt",
    value: function sqrt(value) {
      return D(value).sqrt();
    }
    /**
     * Cubing a number means raising it to the third power.
     */
  }, {
    key: "cube",
    value: function cube(value) {
      return D(value).cube();
    }
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
     */
  }, {
    key: "cbrt",
    value: function cbrt(value) {
      return D(value).cbrt();
    }
    /**
     *
     * Tetration: The result of exponentiating 'value' to 'value' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
     *
     * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "tetrate",
    value: function tetrate(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).tetrate(height, payload, linear);
    }
    /**
     * Iterated exponentiation, the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * Identical to tetrate.
     */
  }, {
    key: "iteratedexp",
    value: function iteratedexp(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).iteratedexp(height, payload, linear);
    }
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "iteratedlog",
    value: function iteratedlog(value) {
      var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
      var times = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).iteratedlog(base, times, linear);
    }
    /**
     * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "layeradd10",
    value: function layeradd10(value, diff) {
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return D(value).layeradd10(diff, linear);
    }
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "layeradd",
    value: function layeradd(value, diff) {
      var base = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).layeradd(diff, base, linear);
    }
    /**
     * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'value'. https://en.wikipedia.org/wiki/Super-logarithm
     *
     * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
     *
     * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "slog",
    value: function slog(value) {
      var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return D(value).slog(base, 100, linear);
    }
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
  }, {
    key: "lambertw",
    value: function lambertw(value) {
      return D(value).lambertw();
    }
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
  }, {
    key: "ssqrt",
    value: function ssqrt(value) {
      return D(value).ssqrt();
    }
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
  }, {
    key: "linear_sroot",
    value: function linear_sroot(value, degree) {
      return D(value).linear_sroot(degree);
    }
    /**
     * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
     * https://en.wikipedia.org/wiki/Pentation
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
     */
  }, {
    key: "pentate",
    value: function pentate(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).pentate(height, payload, linear);
    }
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "sin",
    value: function sin(value) {
      return D(value).sin();
    }
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "cos",
    value: function cos(value) {
      return D(value).cos();
    }
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
  }, {
    key: "tan",
    value: function tan(value) {
      return D(value).tan();
    }
    /**
     * The arcsine function, the inverse of the sine function.
     */
  }, {
    key: "asin",
    value: function asin(value) {
      return D(value).asin();
    }
    /**
     * The arccosine function, the inverse of the cosine function.
     */
  }, {
    key: "acos",
    value: function acos(value) {
      return D(value).acos();
    }
    /**
     * The arctangent function, the inverse of the tangent function.
     */
  }, {
    key: "atan",
    value: function atan(value) {
      return D(value).atan();
    }
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
  }, {
    key: "sinh",
    value: function sinh(value) {
      return D(value).sinh();
    }
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
  }, {
    key: "cosh",
    value: function cosh(value) {
      return D(value).cosh();
    }
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
  }, {
    key: "tanh",
    value: function tanh(value) {
      return D(value).tanh();
    }
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
  }, {
    key: "asinh",
    value: function asinh(value) {
      return D(value).asinh();
    }
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
  }, {
    key: "acosh",
    value: function acosh(value) {
      return D(value).acosh();
    }
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
  }, {
    key: "atanh",
    value: function atanh(value) {
      return D(value).atanh();
    }
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something
     * with exponentially increasing cost each purchase (start at priceStart,
     * multiply by priceRatio, already own currentOwned), how much of it can you buy?
     * Adapted from Trimps source code.
     */
  }, {
    key: "affordGeometricSeries",
    value: function affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      return this.affordGeometricSeries_core(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
    }
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it multiplies by priceRatio each purchase?
     */
  }, {
    key: "sumGeometricSeries",
    value: function sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
      return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
    }
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
     * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
     * how much of it can you buy?
     */
  }, {
    key: "affordArithmeticSeries",
    value: function affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      return this.affordArithmeticSeries_core(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
    }
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it adds priceAdd each purchase?
     * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
     */
  }, {
    key: "sumArithmeticSeries",
    value: function sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
      return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
    }
    /**
     * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
     * the lowest efficiency score is the better one to purchase.
     * From Frozen Cookies:
     * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
     */
  }, {
    key: "efficiencyOfPurchase",
    value: function efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
      return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
    }
  }, {
    key: "randomDecimalForTesting",
    value: function randomDecimalForTesting(maxLayers) {
      if (Math.random() * 20 < 1) {
        return FC_NN(0, 0, 0);
      }
      var randomsign = Math.random() > 0.5 ? 1 : -1;
      if (Math.random() * 20 < 1) {
        return FC_NN(randomsign, 0, 1);
      }
      var layer = Math.floor(Math.random() * (maxLayers + 1));
      var randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16;
      if (Math.random() > 0.9) {
        randomexp = Math.trunc(randomexp);
      }
      var randommag = Math.pow(10, randomexp);
      if (Math.random() > 0.9) {
        randommag = Math.trunc(randommag);
      }
      return FC(randomsign, layer, randommag);
    }
  }, {
    key: "affordGeometricSeries_core",
    value: function affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
      return Decimal2.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10()));
    }
  }, {
    key: "sumGeometricSeries_core",
    value: function sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
      return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal2.sub(1, priceRatio.pow(numItems))).div(Decimal2.sub(1, priceRatio));
    }
  }, {
    key: "affordArithmeticSeries_core",
    value: function affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      var b = actualStart.sub(priceAdd.div(2));
      var b2 = b.pow(2);
      return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    }
  }, {
    key: "sumArithmeticSeries_core",
    value: function sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    }
  }, {
    key: "efficiencyOfPurchase_core",
    value: function efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
      return cost.div(currentRpS).add(cost.div(deltaRpS));
    }
  }, {
    key: "slog_critical",
    value: function slog_critical(base, height) {
      if (base > 10) {
        return height - 1;
      }
      return Decimal2.critical_section(base, height, critical_slog_values);
    }
  }, {
    key: "tetrate_critical",
    value: function tetrate_critical(base, height) {
      return Decimal2.critical_section(base, height, critical_tetr_values);
    }
  }, {
    key: "critical_section",
    value: function critical_section(base, height, grid) {
      height *= 10;
      if (height < 0) {
        height = 0;
      }
      if (height > 10) {
        height = 10;
      }
      if (base < 2) {
        base = 2;
      }
      if (base > 10) {
        base = 10;
      }
      var lower = 0;
      var upper = 0;
      for (var i = 0; i < critical_headers.length; ++i) {
        if (critical_headers[i] == base) {
          lower = grid[i][Math.floor(height)];
          upper = grid[i][Math.ceil(height)];
          break;
        } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
          var basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
          lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
          upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
          break;
        }
      }
      var frac = height - Math.floor(height);
      if (lower <= 0 || upper <= 0) {
        return lower * (1 - frac) + upper * frac;
      } else {
        return Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
      }
    }
  }]);
  return Decimal2;
}();
Decimal.dZero = FC_NN(0, 0, 0);
Decimal.dOne = FC_NN(1, 0, 1);
Decimal.dNegOne = FC_NN(-1, 0, 1);
Decimal.dTwo = FC_NN(1, 0, 2);
Decimal.dTen = FC_NN(1, 0, 10);
Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN);
Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
Decimal.dNegInf = FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
Decimal.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE);
D = Decimal.fromValue_noAlloc;
FC = Decimal.fromComponents;
FC_NN = Decimal.fromComponents_noNormalize;
Decimal.fromMantissaExponent;
Decimal.fromMantissaExponent_noNormalize;
class Observeable {
  constructor(v) {
    __publicField(this, "_v");
    this._v = ref(v);
  }
  get r() {
    return this._v;
  }
  set v(v) {
    this._v.value = v;
  }
  get v() {
    return this._v.value;
  }
}
class Totaler extends Observeable {
  constructor(v) {
    super(v);
    __publicField(this, "_t");
    this._t = ref(v);
  }
  static get Zero() {
    return new Totaler(Decimal.dZero);
  }
  get t() {
    return this._t;
  }
  get r() {
    return super.r;
  }
  get v() {
    return super.v;
  }
  set v(v) {
    super.v = v;
    const diff = v.minus(super.r.value);
    if (diff.greaterThan(0))
      this.t = this.t.value.add(v);
  }
  set t(t) {
    this._t.value = t;
  }
}
class Maxer {
  constructor() {
    __publicField(this, "_value", Totaler.Zero);
    __publicField(this, "_max", new Observeable(Decimal.dTen.pow(2)));
  }
  get m() {
    return this._max;
  }
  set m(v) {
    this.m.v = v;
    this.v = this.v.v.min(this.m.v);
  }
  get v() {
    return this._value;
  }
  set v(v) {
    this.v.v = v.min(this.m.v);
  }
  get left() {
    return this.m.v.minus(this.v.v);
  }
}
class Research {
  constructor(data) {
    __publicField(this, "cost");
    __publicField(this, "name");
    __publicField(this, "description");
    __publicField(this, "effect");
    __publicField(this, "unlock");
    this.cost = data.cost;
    this.name = data.name;
    this.description = data.description;
    this.effect = data.effect;
    this.unlock = data.unlock;
  }
  uppercase(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  get cost_display() {
    let c = "";
    for (const [k, v] of Object.entries(this.cost)) {
      c += this.uppercase(k) + ": " + v;
    }
    return c.trimEnd();
  }
}
const Researchs = [
  new Research({
    cost: { research: 100 },
    name: "Communication",
    description: "Humans Communicating!!! Wow!!!",
    effect: (v, g) => {
      return {
        max_humans: v.mul(2),
        research: v.mul(1.5)
      };
    }
  }),
  new Research({
    cost: { research: 200 },
    name: "Fire",
    description: "Lightning Goes BURRRR!",
    effect: (v, g) => {
      return {
        max_humans: v.mul(3),
        humans: v.mul(1.5)
      };
    }
  }),
  new Research({
    cost: { research: 1e3 },
    name: "Crude Hut",
    description: "Weak Housing",
    effect: (v, g) => {
      return {
        max_humans: v.mul(5),
        humans: v.mul(1.5)
      };
    },
    unlock: "CrudeHouse"
  }),
  new Research({
    cost: { research: 1e4 },
    name: "Basic Agriculture",
    description: "Farming but everyone is an idiot",
    effect: (v, g) => {
      return {
        max_humans: v.mul(1.5),
        humans: v.mul(1.2),
        research: v.mul(1.3)
      };
    },
    unlock: "BasicAgriculture"
  })
];
class Game {
  constructor() {
    __publicField(this, "humans", new Maxer());
    __publicField(this, "land", new Maxer());
    __publicField(this, "crude_homes", Totaler.Zero);
    __publicField(this, "farms", Totaler.Zero);
    __publicField(this, "research_points", Totaler.Zero);
    __publicField(this, "researched", []);
    __publicField(this, "unlocks", {});
    __publicField(this, "effect_mapped", {
      humans: () => this.humans.v,
      research: () => this.research_points
    });
    __publicField(this, "build_mapped", {
      crude_homes: () => this.crude_homes,
      farms: () => this.farms
    });
    __publicField(this, "last_update", Date.now());
    this.start_ticks();
  }
  build(v, n) {
    const building = this.build_mapped[n]();
    if (new Decimal(v).lessThan(0)) {
      v = new Decimal(v).abs();
      const max_remove = this.land.v.v.min(v).min(building.v);
      this.land.v = this.land.v.v.minus(max_remove);
      building.v = building.v.minus(max_remove);
    } else {
      const max_build = this.land.left.min(v);
      this.land.v = this.land.v.v.add(max_build);
      building.v = building.v.plus(max_build);
    }
  }
  start_ticks() {
    setInterval(() => {
      const dt = (Date.now() - this.last_update) / 1e3 * 100;
      this.last_update = Date.now();
      this.humans.v = this.humans.v.v.add(this.human_rate.mul(dt));
      this.research_points.v = this.research_points.v.add(
        this.research_rate.mul(dt)
      );
      this.humans.m.v = this.human_max;
      this.land.m.v = this.land_max;
    });
  }
  get human_max() {
    let total = Decimal.dTen.mul(this.land.left);
    total = total.plus(Decimal.dTen.mul(2).mul(this.crude_homes.v));
    total = total.plus(Decimal.dTen.mul(this.farms.v));
    total = this.calculate_research_effects(total, "max_humans");
    return total;
  }
  get land_max() {
    let total = Decimal.dTen;
    total = this.calculate_research_effects(total, "land");
    return total;
  }
  calculate_research_effects(total, n) {
    for (let index = 0; index < this.researched.length; index++) {
      const researched = this.researched[index];
      if (!researched)
        continue;
      const research = Researchs[index];
      total = research.effect(total, game)[n] || total;
    }
    return total;
  }
  get human_rate() {
    let total = Decimal.dOne.plus(this.humans.v.v.div(100));
    total = total.mul(Decimal.dOne.plus(this.farms.v.div(3)));
    total = this.calculate_research_effects(total, "humans");
    return total;
  }
  get research_rate() {
    let total = this.humans.v.v.div(100);
    total = this.calculate_research_effects(total, "research");
    return total;
  }
  can_afford(research) {
    for (const [k, v] of Object.entries(research.cost)) {
      if (this.effect_mapped[k]().v.lessThan(v))
        return false;
    }
    return true;
  }
  no_check_buy(research) {
    for (const [k, v] of Object.entries(research.cost)) {
      const current = this.effect_mapped[k]();
      current.v = current.v.minus(v);
    }
  }
  research(i) {
    if (this.researched[i])
      return;
    const research = Researchs[i];
    if (research === void 0)
      return;
    if (!this.can_afford(research))
      return;
    this.no_check_buy(research);
    this.researched[i] = true;
    if (research.unlock)
      this.unlocks[research.unlock] = true;
  }
}
const game = new Game();
const _hoisted_1 = { class: "bar" };
const _hoisted_2 = { class: "resource-item" };
const _hoisted_3 = { class: "resource-item" };
const _hoisted_4 = { class: "bar" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = { class: "upgrades" };
const _hoisted_8 = ["onClick", "disabled"];
const _hoisted_9 = { class: "upgrade-name" };
const _hoisted_10 = { class: "upgrade-description" };
const _hoisted_11 = { key: 0 };
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("p", null, "Bought", -1);
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = {
  key: 1,
  class: "upgrade-cost"
};
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("p", null, "Cost:", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const ResearchStuff = ref(Researchs);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("ul", _hoisted_1, [
          createBaseVNode("li", _hoisted_2, [
            createBaseVNode("p", null, "Humans: " + toDisplayString(unref(game).humans.v.r.value.toFixed(2)) + " / " + toDisplayString(unref(game).humans.m.r.value.toFixed(2)), 1),
            createBaseVNode("p", null, "Rate: " + toDisplayString(unref(game).human_rate.toFixed(2)) + "/s", 1)
          ]),
          createBaseVNode("li", _hoisted_3, [
            createBaseVNode("p", null, "Research: " + toDisplayString(unref(game).research_points.r.value.toFixed(2)), 1),
            createBaseVNode("p", null, "Rate: " + toDisplayString(unref(game).research_rate.toFixed(2)) + "/s", 1)
          ])
        ]),
        createBaseVNode("ul", _hoisted_4, [
          createBaseVNode("li", null, [
            createBaseVNode("p", null, "Land: " + toDisplayString(unref(game).land.left.toFixed(2)) + " / " + toDisplayString(unref(game).land.m.r.value.toFixed(2)), 1)
          ]),
          unref(game).unlocks.CrudeHouse ? (openBlock(), createElementBlock("li", _hoisted_5, [
            createBaseVNode("p", null, "Crude Huts: " + toDisplayString(unref(game).crude_homes.v.toFixed(2)), 1),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => unref(game).build(1, "crude_homes"))
            }, "Build"),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => unref(game).build(-1, "crude_homes"))
            }, "Destroy")
          ])) : createCommentVNode("", true),
          unref(game).unlocks.BasicAgriculture ? (openBlock(), createElementBlock("li", _hoisted_6, [
            createBaseVNode("p", null, "Farm: " + toDisplayString(unref(game).farms.v.toFixed(2)), 1),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => unref(game).build(1, "farms"))
            }, "Build"),
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = ($event) => unref(game).build(-1, "farms"))
            }, "Destroy")
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("ul", _hoisted_7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(ResearchStuff.value, (upgrade, k) => {
            return openBlock(), createElementBlock("li", null, [
              createBaseVNode("button", {
                class: "upgrade-button",
                onClick: ($event) => unref(game).research(k),
                disabled: unref(game).researched[k]
              }, [
                createBaseVNode("p", _hoisted_9, toDisplayString(upgrade.name), 1),
                createBaseVNode("p", _hoisted_10, toDisplayString(upgrade.description), 1),
                unref(game).researched[k] ? (openBlock(), createElementBlock("div", _hoisted_11, _hoisted_13)) : (openBlock(), createElementBlock("div", _hoisted_14, [
                  _hoisted_15,
                  createBaseVNode("p", null, toDisplayString(upgrade.cost_display), 1)
                ]))
              ], 8, _hoisted_8)
            ]);
          }), 256))
        ])
      ], 64);
    };
  }
});
createApp(_sfc_main).mount("#app");
//# sourceMappingURL=index-dVB_WiId.js.map

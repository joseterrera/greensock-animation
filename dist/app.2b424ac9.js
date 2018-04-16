// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var remove = exports.remove = function remove(count) {
  return function (start) {
    return function (arr) {
      // create a copy of the original array
      // now you're not fucking with the original when you
      // mutate the data
      var arrCopy = arr.slice();

      // NOW MUTATE THIS
      var thisisWhatIsSpliceOut = arrCopy.splice(start, count);

      // this now no longer has the spliced out item, we want this
      var whatRemains = arrCopy;

      // This seems confusing because arrCopy is mutated by
      // the dangerous mutating function splce
      return [thisisWhatIsSpliceOut, whatRemains];
    };
  };
};

var remove1 = exports.remove1 = remove(1);
// Not pure
var remove1RandomItem = exports.remove1RandomItem = function remove1RandomItem(arr) {
  return remove1(Math.floor(Math.random() * arr.length))(arr);
};

var shuffle = exports.shuffle = function shuffle(arr) {
  var tempArr = arr;
  var removedItem = void 0;
  return arr.reduce(function (acc, item) {
    var _remove1RandomItem, _remove1RandomItem2;

    return (_remove1RandomItem = remove1RandomItem(tempArr), _remove1RandomItem2 = _slicedToArray(_remove1RandomItem, 2), removedItem = _remove1RandomItem2[0], tempArr = _remove1RandomItem2[1], _remove1RandomItem), acc.concat(removedItem);
  }, []);
};

var head = exports.head = function head(list) {
  return list[0];
};

// state manager
var simpleStateClosure = exports.simpleStateClosure = function simpleStateClosure(fn) {
  return function (initialState) {
    var state = initialState;
    return getNextShuffleItem(initialState)(state);
  };
};

// generator function - a function that can be paused and resumed, so that other code can run in between.
//it will not execute the body of the function. Instead, it will return a generator object called an iterator,
//which is an object that controls the exeuciotn of the generation via .next()

//A generator allows you to treat your function like a program, that can be used following the rules that one defines.

//To execute a program , we need an interpreter, that will give that special behavior that we want.
//yield is a command to the interpreter.
var getNextShuffleItem = exports.getNextShuffleItem = function getNextShuffleItem(initialState) {
  return function (state) {
    return function () {
      var _remove1RandomItem3 = remove1RandomItem(state),
          _remove1RandomItem4 = _slicedToArray(_remove1RandomItem3, 2),
          thisisWhatIsSpliceOut = _remove1RandomItem4[0],
          whatRemains = _remove1RandomItem4[1];

      state = whatRemains.length ? whatRemains : initialState;
      return head(thisisWhatIsSpliceOut);
    };
  };
};

var getNextShuffledItemGenerator = exports.getNextShuffledItemGenerator = simpleStateClosure(getNextShuffleItem);

// export const getNextShuffledItem = getNextShuffledItemGenerator([1,2,3,4,5,6])
},{}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var flatten = exports.flatten = function flatten(multiList) {
  return multiList.reduce(function (acc, item) {
    return acc.concat(item);
  }, []);
};
},{}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectMultiple = exports.fSelector = exports.selector = undefined;

var _helpers = require('./helpers');

var selector = exports.selector = function selector(query) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return [].slice.call(context.querySelectorAll(query));
};

// const pipe = (funcs) => input => funcs.reduce( (acc,item) => item(acc), input )

var fSelector = exports.fSelector = function fSelector(context) {
  return function (query) {
    return selector(query, context);
  };
};
var selectMultiple = exports.selectMultiple = function selectMultiple(context) {
  return function () {
    for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
      queries[_key] = arguments[_key];
    }

    return (0, _helpers.flatten)(queries.map(fSelector(context)));
  };
};
},{"./helpers":10}],12:[function(require,module,exports) {
var global = (1,eval)("this");
/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) { 
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.20.4";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenLite");
},{}],6:[function(require,module,exports) {
var global = (1,eval)("this");
/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

	"use strict";

	_gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function (Ease) {

		var _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
		    _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
		    _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
		    _needsParsingExp = /[cLlsS]/g,
		    _bezierError = "CustomEase only accepts Cubic Bezier data.",
		    _bezierToPoints = function _bezierToPoints(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
			var x12 = (x1 + x2) / 2,
			    y12 = (y1 + y2) / 2,
			    x23 = (x2 + x3) / 2,
			    y23 = (y2 + y3) / 2,
			    x34 = (x3 + x4) / 2,
			    y34 = (y3 + y4) / 2,
			    x123 = (x12 + x23) / 2,
			    y123 = (y12 + y23) / 2,
			    x234 = (x23 + x34) / 2,
			    y234 = (y23 + y34) / 2,
			    x1234 = (x123 + x234) / 2,
			    y1234 = (y123 + y234) / 2,
			    dx = x4 - x1,
			    dy = y4 - y1,
			    d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx),
			    d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx),
			    length;
			if (!points) {
				points = [{ x: x1, y: y1 }, { x: x4, y: y4 }];
				index = 1;
			}
			points.splice(index || points.length - 1, 0, { x: x1234, y: y1234 });
			if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
				length = points.length;
				_bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
				_bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
			}
			return points;
		},
		    _pathDataToBezier = function _pathDataToBezier(d) {
			var a = (d + "").replace(_scientific, function (m) {
				var n = +m;
				return n < 0.0001 && n > -0.0001 ? 0 : n;
			}).match(_svgPathExp) || [],
			    //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
			path = [],
			    relativeX = 0,
			    relativeY = 0,
			    elements = a.length,
			    l = 2,
			    i,
			    x,
			    y,
			    command,
			    isRelative,
			    segment,
			    startX,
			    startY,
			    prevCommand,
			    difX,
			    difY;
			for (i = 0; i < elements; i++) {
				prevCommand = command;
				if (isNaN(a[i])) {
					command = a[i].toUpperCase();
					isRelative = command !== a[i]; //lower case means relative
				} else {
					//commands like "C" can be strung together without any new command characters between.
					i--;
				}
				x = +a[i + 1];
				y = +a[i + 2];
				if (isRelative) {
					x += relativeX;
					y += relativeY;
				}
				if (!i) {
					startX = x;
					startY = y;
				}
				if (command === "M") {
					if (segment && segment.length < 8) {
						//if the path data was funky and just had a M with no actual drawing anywhere, skip it.
						path.length -= 1;
						l = 0;
					}
					relativeX = startX = x;
					relativeY = startY = y;
					segment = [x, y];
					l = 2;
					path.push(segment);
					i += 2;
					command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").
				} else if (command === "C") {
					if (!segment) {
						segment = [0, 0];
					}
					segment[l++] = x;
					segment[l++] = y;
					if (!isRelative) {
						relativeX = relativeY = 0;
					}
					segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.
					segment[l++] = relativeY + a[i + 4] * 1;
					segment[l++] = relativeX = relativeX + a[i + 5] * 1;
					segment[l++] = relativeY = relativeY + a[i + 6] * 1;
					i += 6;
				} else if (command === "S") {
					if (prevCommand === "C" || prevCommand === "S") {
						difX = relativeX - segment[l - 4];
						difY = relativeY - segment[l - 3];
						segment[l++] = relativeX + difX;
						segment[l++] = relativeY + difY;
					} else {
						segment[l++] = relativeX;
						segment[l++] = relativeY;
					}
					segment[l++] = x;
					segment[l++] = y;
					if (!isRelative) {
						relativeX = relativeY = 0;
					}
					segment[l++] = relativeX = relativeX + a[i + 3] * 1;
					segment[l++] = relativeY = relativeY + a[i + 4] * 1;
					i += 4;
				} else if (command === "L" || command === "Z") {
					if (command === "Z") {
						x = startX;
						y = startY;
						segment.closed = true;
					}
					if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
						segment[l++] = relativeX + (x - relativeX) / 3;
						segment[l++] = relativeY + (y - relativeY) / 3;
						segment[l++] = relativeX + (x - relativeX) * 2 / 3;
						segment[l++] = relativeY + (y - relativeY) * 2 / 3;
						segment[l++] = x;
						segment[l++] = y;
						if (command === "L") {
							i += 2;
						}
					}
					relativeX = x;
					relativeY = y;
				} else {
					throw _bezierError;
				}
			}
			return path[0];
		},
		    _findMinimum = function _findMinimum(values) {
			var l = values.length,
			    min = 999999999999,
			    i;
			for (i = 1; i < l; i += 6) {
				if (+values[i] < min) {
					min = +values[i];
				}
			}
			return min;
		},
		    _normalize = function _normalize(values, height, originY) {
			//takes all the points and translates/scales them so that the x starts at 0 and ends at 1.
			if (!originY && originY !== 0) {
				originY = Math.max(+values[values.length - 1], +values[1]);
			}
			var tx = +values[0] * -1,
			    ty = -originY,
			    l = values.length,
			    sx = 1 / (+values[l - 2] + tx),
			    sy = -height || (Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0]) ? _findMinimum(values) + ty : +values[l - 1] + ty),
			    i;
			if (sy) {
				//typically y ends at 1 (so that the end values are reached)
				sy = 1 / sy;
			} else {
				//in case the ease returns to its beginning value, scale everything proportionally
				sy = -sx;
			}
			for (i = 0; i < l; i += 2) {
				values[i] = (+values[i] + tx) * sx;
				values[i + 1] = (+values[i + 1] + ty) * sy;
			}
		},
		    _getRatio = function _getRatio(p) {
			var point = this.lookup[p * this.l | 0] || this.lookup[this.l - 1];
			if (point.nx < p) {
				point = point.n;
			}
			return point.y + (p - point.x) / point.cx * point.cy;
		},
		    CustomEase = function CustomEase(id, data, config) {
			this._calcEnd = true;
			this.id = id;
			if (id) {
				Ease.map[id] = this;
			}
			this.getRatio = _getRatio; //speed optimization, faster lookups.
			this.setData(data, config);
		},
		    p = CustomEase.prototype = new Ease();

		p.constructor = CustomEase;

		p.setData = function (data, config) {
			data = data || "0,0,1,1";
			var values = data.match(_numbersExp),
			    closest = 1,
			    points = [],
			    l,
			    a1,
			    a2,
			    i,
			    inc,
			    j,
			    point,
			    prevPoint,
			    p,
			    precision;
			config = config || {};
			precision = config.precision || 1;
			this.data = data;
			this.lookup = [];
			this.points = points;
			this.fast = precision <= 1;
			if (_needsParsingExp.test(data) || data.indexOf("M") !== -1 && data.indexOf("C") === -1) {
				values = _pathDataToBezier(data);
			}
			l = values.length;
			if (l === 4) {
				values.unshift(0, 0);
				values.push(1, 1);
				l = 8;
			} else if ((l - 2) % 6) {
				throw _bezierError;
			}
			if (+values[0] !== 0 || +values[l - 2] !== 1) {
				_normalize(values, config.height, config.originY);
			}

			this.rawBezier = values;

			for (i = 2; i < l; i += 6) {
				a1 = { x: +values[i - 2], y: +values[i - 1] };
				a2 = { x: +values[i + 4], y: +values[i + 5] };
				points.push(a1, a2);
				_bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 200000), points, points.length - 1);
			}
			l = points.length;
			for (i = 0; i < l; i++) {
				point = points[i];
				prevPoint = points[i - 1] || point;
				if (point.x > prevPoint.x || prevPoint.y !== point.y && prevPoint.x === point.x || point === prevPoint) {
					//if a point goes BACKWARD in time or is a duplicate, just drop it.
					prevPoint.cx = point.x - prevPoint.x; //change in x between this point and the next point (performance optimization)
					prevPoint.cy = point.y - prevPoint.y;
					prevPoint.n = point;
					prevPoint.nx = point.x; //next point's x value (performance optimization, making lookups faster in getRatio()). Remember, the lookup will always land on a spot where it's either this point or the very next one (never beyond that)
					if (this.fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) {
						//if there's a sudden change in direction, prioritize accuracy over speed. Like a bounce ease - you don't want to risk the sampling chunks landing on each side of the bounce anchor and having it clipped off.
						this.fast = false;
					}
					if (prevPoint.cx < closest) {
						if (!prevPoint.cx) {
							prevPoint.cx = 0.001; //avoids math problems in getRatio() (dividing by zero)
							if (i === l - 1) {
								//in case the final segment goes vertical RIGHT at the end, make sure we end at the end.
								prevPoint.x -= 0.001;
								closest = Math.min(closest, 0.001);
								this.fast = false;
							}
						} else {
							closest = prevPoint.cx;
						}
					}
				} else {
					points.splice(i--, 1);
					l--;
				}
			}
			l = 1 / closest + 1 | 0;
			this.l = l; //record for speed optimization
			inc = 1 / l;
			j = 0;
			point = points[0];
			if (this.fast) {
				for (i = 0; i < l; i++) {
					//for fastest lookups, we just sample along the path at equal x (time) distance. Uses more memory and is slightly less accurate for anchors that don't land on the sampling points, but for the vast majority of eases it's excellent (and fast).
					p = i * inc;
					if (point.nx < p) {
						point = points[++j];
					}
					a1 = point.y + (p - point.x) / point.cx * point.cy;
					this.lookup[i] = { x: p, cx: inc, y: a1, cy: 0, nx: 9 };
					if (i) {
						this.lookup[i - 1].cy = a1 - this.lookup[i - 1].y;
					}
				}
				this.lookup[l - 1].cy = points[points.length - 1].y - a1;
			} else {
				//this option is more accurate, ensuring that EVERY anchor is hit perfectly. Clipping across a bounce, for example, would never happen.
				for (i = 0; i < l; i++) {
					//build a lookup table based on the smallest distance so that we can instantly find the appropriate point (well, it'll either be that point or the very next one). We'll look up based on the linear progress. So it's it's 0.5 and the lookup table has 100 elements, it'd be like lookup[Math.floor(0.5 * 100)]
					if (point.nx < i * inc) {
						point = points[++j];
					}
					this.lookup[i] = point;
				}

				if (j < points.length - 1) {
					this.lookup[i - 1] = points[points.length - 2];
				}
			}
			this._calcEnd = points[points.length - 1].y !== 1 || points[0].y !== 0; //ensures that we don't run into floating point errors. As long as we're starting at 0 and ending at 1, tell GSAP to skip the final calculation and use 0/1 as the factor.
			return this;
		};

		p.getRatio = _getRatio;

		p.getSVGData = function (config) {
			return CustomEase.getSVGData(this, config);
		};

		CustomEase.create = function (id, data, config) {
			return new CustomEase(id, data, config);
		};

		CustomEase.version = "0.2.2";

		CustomEase.bezierToPoints = _bezierToPoints;
		CustomEase.get = function (id) {
			return Ease.map[id];
		};
		CustomEase.getSVGData = function (ease, config) {
			config = config || {};
			var rnd = 1000,
			    width = config.width || 100,
			    height = config.height || 100,
			    x = config.x || 0,
			    y = (config.y || 0) + height,
			    e = config.path,
			    a,
			    slope,
			    i,
			    inc,
			    tx,
			    ty,
			    precision,
			    threshold,
			    prevX,
			    prevY;
			if (config.invert) {
				height = -height;
				y = 0;
			}
			ease = ease.getRatio ? ease : Ease.map[ease] || console.log("No ease found: ", ease);
			if (!ease.rawBezier) {
				a = ["M" + x + "," + y];
				precision = Math.max(5, (config.precision || 1) * 200);
				inc = 1 / precision;
				precision += 2;
				threshold = 5 / precision;
				prevX = ((x + inc * width) * rnd | 0) / rnd;
				prevY = ((y + ease.getRatio(inc) * -height) * rnd | 0) / rnd;
				slope = (prevY - y) / (prevX - x);
				for (i = 2; i < precision; i++) {
					tx = ((x + i * inc * width) * rnd | 0) / rnd;
					ty = ((y + ease.getRatio(i * inc) * -height) * rnd | 0) / rnd;
					if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) {
						//only add points when the slope changes beyond the threshold
						a.push(prevX + "," + prevY);
						slope = (ty - prevY) / (tx - prevX);
					}
					prevX = tx;
					prevY = ty;
				}
			} else {
				a = [];
				precision = ease.rawBezier.length;
				for (i = 0; i < precision; i += 2) {
					a.push(((x + ease.rawBezier[i] * width) * rnd | 0) / rnd + "," + ((y + ease.rawBezier[i + 1] * -height) * rnd | 0) / rnd);
				}
				a[0] = "M" + a[0];
				a[1] = "C" + a[1];
			}
			if (e) {
				(typeof e === "string" ? document.querySelector(e) : e).setAttribute("d", a.join(" "));
			}
			return a.join(" ");
		};

		return CustomEase;
	}, true);
});if (_gsScope._gsDefine) {
	_gsScope._gsQueue.pop()();
}

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof module !== "undefined" && module.exports) {
		//node
		require("gsap/TweenLite");
		module.exports = getGlobal();
	} else if (typeof define === "function" && define.amd) {
		//AMD
		define(["gsap/TweenLite"], getGlobal);
	}
})("CustomEase");
},{"gsap/TweenLite":12}],7:[function(require,module,exports) {
var global = (1,eval)("this");
/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

	"use strict";

	_gsScope._gsDefine("easing.CustomWiggle", ["easing.CustomEase", "easing.Ease"], function (CustomEase, Ease) {

		var eases = {
			easeOut: new CustomEase("", "M0,1,C0.7,1,0.6,0,1,0"),
			easeInOut: new CustomEase("", "M0,0,C0.104,0,0.242,1,0.444,1,0.644,1,0.608,0,1,0"),
			anticipate: new CustomEase("", "M0,0,C0,0.222,0.024,0.386,0.06,0.402,0.181,0.455,0.647,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1"),
			uniform: new CustomEase("", "M0,0,C0,0.95,0.01,1,0.01,1,0.01,1,1,1,1,1,1,1,1,0.01,1,0")
		},
		    _linearEase = new CustomEase(),
		    //linear
		_parseEase = function _parseEase(ease, invertNonCustomEases) {
			ease = ease.getRatio ? ease : Ease.map[ease] || new CustomEase("", ease);
			return ease.rawBezier || !invertNonCustomEases ? ease : { getRatio: function getRatio(n) {
					return 1 - ease.getRatio(n);
				} };
		},
		    CustomWiggle = function CustomWiggle(id, vars) {
			this.vars = vars || {};
			CustomEase.call(this, id);
			this.update(this.vars);
		},
		    p;

		CustomWiggle.prototype = p = new CustomEase();
		p.constructor = CustomWiggle;

		p.update = function (vars) {
			vars = vars || this.vars;
			var wiggles = (vars.wiggles || 10) | 0,
			    inc = 1 / wiggles,
			    x = inc / 2,
			    anticipate = vars.type === "anticipate",
			    yEase = eases[vars.type] || eases.easeOut,
			    xEase = _linearEase,
			    rnd = 1000,
			    nextX,
			    nextY,
			    angle,
			    handleX,
			    handleY,
			    easedX,
			    y,
			    path,
			    i;
			if (anticipate) {
				//the anticipate ease is actually applied on the x-axis (timing) and uses easeOut for amplitude.
				xEase = yEase;
				yEase = eases.easeOut;
			}
			if (vars.timingEase) {
				xEase = _parseEase(vars.timingEase);
			}
			if (vars.amplitudeEase) {
				yEase = _parseEase(vars.amplitudeEase, true);
			}
			easedX = xEase.getRatio(x);
			y = anticipate ? -yEase.getRatio(x) : yEase.getRatio(x);
			path = [0, 0, easedX / 4, 0, easedX / 2, y, easedX, y];

			if (vars.type === "random") {
				//if we just select random values on the y-axis and plug them into the "normal" algorithm, since the control points are always straight horizontal, it creates a bit of a slowdown at each anchor which just didn't seem as desirable, so we switched to an algorithm that bends the control points to be more in line with their context.
				path.length = 4;
				nextX = xEase.getRatio(inc);
				nextY = Math.random() * 2 - 1;
				for (i = 2; i < wiggles; i++) {
					x = nextX;
					y = nextY;
					nextX = xEase.getRatio(inc * i);
					nextY = Math.random() * 2 - 1;
					angle = Math.atan2(nextY - path[path.length - 3], nextX - path[path.length - 4]);
					handleX = Math.cos(angle) * inc;
					handleY = Math.sin(angle) * inc;
					path.push(x - handleX, y - handleY, x, y, x + handleX, y + handleY);
				}
				path.push(nextX, 0, 1, 0);
			} else {
				for (i = 1; i < wiggles; i++) {
					path.push(xEase.getRatio(x + inc / 2), y);
					x += inc;
					y = (y > 0 ? -1 : 1) * yEase.getRatio(i * inc);
					easedX = xEase.getRatio(x);
					path.push(xEase.getRatio(x - inc / 2), y, easedX, y);
				}
				path.push(xEase.getRatio(x + inc / 4), y, xEase.getRatio(x + inc / 4), 0, 1, 0);
			}
			i = path.length;
			while (--i > -1) {
				path[i] = (path[i] * rnd | 0) / rnd; //round values to avoid odd strings for super tiny values
			}
			path[2] = "C" + path[2];
			this.setData("M" + path.join(","));
		};

		CustomWiggle.create = function (id, vars) {
			return new CustomWiggle(id, vars);
		};

		CustomWiggle.version = "0.2.1";
		CustomWiggle.eases = eases;

		return CustomWiggle;
	}, true);
});if (_gsScope._gsDefine) {
	_gsScope._gsQueue.pop()();
}

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof module !== "undefined" && module.exports) {
		//node
		require("./CustomEase");
		require("gsap/TweenLite");
		module.exports = getGlobal();
	} else if (typeof define === "function" && define.amd) {
		//AMD
		define(["gsap/TweenLite", "./CustomEase"], getGlobal);
	}
})("CustomWiggle");
},{"./CustomEase":6,"gsap/TweenLite":12}],8:[function(require,module,exports) {
var global = (1,eval)("this");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * VERSION: 0.11.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * ThrowPropsPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

	"use strict";

	_gsScope._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function (TweenPlugin, TweenLite, Ease, VelocityTracker) {

		var ThrowPropsPlugin = function ThrowPropsPlugin(props, priority) {
			TweenPlugin.call(this, "throwProps");
			this._overwriteProps.length = 0;
		},
		    _max = 999999999999999,
		    _min = 0.0000000001,
		    _globals = _gsScope._gsDefine.globals,
		    _recordEndMode = false,
		    //in a typical throwProps css tween that has an "end" defined as a function, it grabs that value initially when the tween is rendered, then again when we calculate the necessary duration, and then a 3rd time after we invalidate() the tween, so we toggle _recordEndMode to true when we're about to begin such a tween which tells the engine to grab the end value(s) once and record them as "max" and "min" on the throwProps object, thus we can skip those extra calls. Then we set it back to false when we're done with our fancy initialization routine.
		_transforms = { x: 1, y: 1, z: 2, scale: 1, scaleX: 1, scaleY: 1, rotation: 1, rotationZ: 1, rotationX: 2, rotationY: 2, skewX: 1, skewY: 1, xPercent: 1, yPercent: 1 },
		    _getClosest = function _getClosest(n, values, max, min, radius) {
			var i = values.length,
			    closest = 0,
			    absDif = _max,
			    val,
			    dif,
			    p,
			    dist;
			if ((typeof n === "undefined" ? "undefined" : _typeof(n)) === "object") {
				while (--i > -1) {
					val = values[i];
					dif = 0;
					for (p in n) {
						dist = val[p] - n[p];
						dif += dist * dist;
					}
					if (dif < absDif) {
						closest = i;
						absDif = dif;
					}
				}
				if ((radius || _max) < _max && radius < Math.sqrt(absDif)) {
					return n;
				}
			} else {
				while (--i > -1) {
					val = values[i];
					dif = val - n;
					if (dif < 0) {
						dif = -dif;
					}
					if (dif < absDif && val >= min && val <= max) {
						closest = i;
						absDif = dif;
					}
				}
			}
			return values[closest];
		},
		    _parseEnd = function _parseEnd(curProp, end, max, min, name, radius) {
			if (curProp.end === "auto") {
				return curProp;
			}
			var endVar = curProp.end,
			    adjustedEnd,
			    p;
			max = isNaN(max) ? _max : max;
			min = isNaN(min) ? -_max : min;
			if ((typeof end === "undefined" ? "undefined" : _typeof(end)) === "object") {
				//for objects, like {x, y} where they're linked and we must pass an object to the function or find the closest value in an array.
				adjustedEnd = end.calculated ? end : (typeof endVar === "function" ? endVar(end) : _getClosest(end, endVar, max, min, radius)) || end;
				if (!end.calculated) {
					for (p in adjustedEnd) {
						end[p] = adjustedEnd[p];
					}
					end.calculated = true;
				}
				adjustedEnd = adjustedEnd[name];
			} else {
				adjustedEnd = typeof endVar === "function" ? endVar(end) : endVar instanceof Array ? _getClosest(end, endVar, max, min, radius) : Number(endVar);
			}
			if (adjustedEnd > max) {
				adjustedEnd = max;
			} else if (adjustedEnd < min) {
				adjustedEnd = min;
			}
			return { max: adjustedEnd, min: adjustedEnd, unitFactor: curProp.unitFactor };
		},
		    _extend = function _extend(decoratee, extras, exclude) {
			for (var p in extras) {
				if (decoratee[p] === undefined && p !== exclude) {
					decoratee[p] = extras[p];
				}
			}
			return decoratee;
		},
		    _calculateChange = ThrowPropsPlugin.calculateChange = function (velocity, ease, duration, checkpoint) {
			if (checkpoint == null) {
				checkpoint = 0.05;
			}
			var e = ease instanceof Ease ? ease : !ease ? TweenLite.defaultEase : new Ease(ease);
			return duration * checkpoint * velocity / e.getRatio(checkpoint);
		},
		    _calculateDuration = ThrowPropsPlugin.calculateDuration = function (start, end, velocity, ease, checkpoint) {
			checkpoint = checkpoint || 0.05;
			var e = ease instanceof Ease ? ease : !ease ? TweenLite.defaultEase : new Ease(ease);
			return Math.abs((end - start) * e.getRatio(checkpoint) / velocity / checkpoint);
		},
		    _calculateTweenDuration = ThrowPropsPlugin.calculateTweenDuration = function (target, vars, maxDuration, minDuration, overshootTolerance, recordEnd) {
			if (typeof target === "string") {
				target = TweenLite.selector(target);
			}
			if (!target) {
				return 0;
			}
			if (maxDuration == null) {
				maxDuration = 10;
			}
			if (minDuration == null) {
				minDuration = 0.2;
			}
			if (overshootTolerance == null) {
				overshootTolerance = 1;
			}
			if (target.length) {
				target = target[0] || target;
			}
			var duration = 0,
			    clippedDuration = 9999999999,
			    throwPropsVars = vars.throwProps || vars,
			    ease = vars.ease instanceof Ease ? vars.ease : !vars.ease ? TweenLite.defaultEase : new Ease(vars.ease),
			    checkpoint = isNaN(throwPropsVars.checkpoint) ? 0.05 : Number(throwPropsVars.checkpoint),
			    resistance = isNaN(throwPropsVars.resistance) ? ThrowPropsPlugin.defaultResistance : Number(throwPropsVars.resistance),
			    p,
			    curProp,
			    curDuration,
			    curVelocity,
			    curResistance,
			    curVal,
			    end,
			    curClippedDuration,
			    tracker,
			    unitFactor,
			    linkedProps,
			    linkedPropNames,
			    i;

			if (throwPropsVars.linkedProps) {
				//when there are linkedProps (typically "x,y" where snapping has to factor in multiple properties, we must first populate an object with all of those end values, then feed it to the function that make any necessary alterations. So the point of this first loop is to simply build an object (like {x:100, y:204.5}) for feeding into that function which we'll do later in the "real" loop.
				linkedPropNames = throwPropsVars.linkedProps.split(",");
				linkedProps = {};
				for (i = 0; i < linkedPropNames.length; i++) {
					p = linkedPropNames[i];
					curProp = throwPropsVars[p];
					if (curProp) {
						if (curProp.velocity !== undefined && typeof curProp.velocity === "number") {
							curVelocity = Number(curProp.velocity) || 0;
						} else {
							tracker = tracker || VelocityTracker.getByTarget(target);
							curVelocity = tracker && tracker.isTrackingProp(p) ? tracker.getVelocity(p) : 0;
						}
						curResistance = isNaN(curProp.resistance) ? resistance : Number(curProp.resistance);
						curDuration = curVelocity * curResistance > 0 ? curVelocity / curResistance : curVelocity / -curResistance;
						curVal = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]() : target[p] || 0;
						linkedProps[p] = curVal + _calculateChange(curVelocity, ease, curDuration, checkpoint);
					}
				}
			}

			for (p in throwPropsVars) {

				if (p !== "resistance" && p !== "checkpoint" && p !== "preventOvershoot" && p !== "linkedProps" && p !== "radius") {
					curProp = throwPropsVars[p];
					if ((typeof curProp === "undefined" ? "undefined" : _typeof(curProp)) !== "object") {
						tracker = tracker || VelocityTracker.getByTarget(target);
						if (tracker && tracker.isTrackingProp(p)) {
							curProp = typeof curProp === "number" ? { velocity: curProp } : { velocity: tracker.getVelocity(p) }; //if we're tracking this property, we should use the tracking velocity and then use the numeric value that was passed in as the min and max so that it tweens exactly there.
						} else {
							curVelocity = Number(curProp) || 0;
							curDuration = curVelocity * resistance > 0 ? curVelocity / resistance : curVelocity / -resistance;
						}
					}
					if ((typeof curProp === "undefined" ? "undefined" : _typeof(curProp)) === "object") {

						if (curProp.velocity !== undefined && typeof curProp.velocity === "number") {
							curVelocity = Number(curProp.velocity) || 0;
						} else {
							tracker = tracker || VelocityTracker.getByTarget(target);
							curVelocity = tracker && tracker.isTrackingProp(p) ? tracker.getVelocity(p) : 0;
						}
						curResistance = isNaN(curProp.resistance) ? resistance : Number(curProp.resistance);
						curDuration = curVelocity * curResistance > 0 ? curVelocity / curResistance : curVelocity / -curResistance;
						curVal = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]() : target[p] || 0;
						end = curVal + _calculateChange(curVelocity, ease, curDuration, checkpoint);
						if (curProp.end !== undefined) {
							curProp = _parseEnd(curProp, linkedProps && p in linkedProps ? linkedProps : end, curProp.max, curProp.min, p, throwPropsVars.radius);
							if (recordEnd || _recordEndMode) {
								throwPropsVars[p] = _extend(curProp, throwPropsVars[p], "end");
							}
						}
						if (curProp.max !== undefined && end > Number(curProp.max) + _min) {
							unitFactor = curProp.unitFactor || ThrowPropsPlugin.defaultUnitFactors[p] || 1; //some values are measured in special units like radians in which case our thresholds need to be adjusted accordingly.
							//if the value is already exceeding the max or the velocity is too low, the duration can end up being uncomfortably long but in most situations, users want the snapping to occur relatively quickly (0.75 seconds), so we implement a cap here to make things more intuitive. If the max and min match, it means we're animating to a particular value and we don't want to shorten the time unless the velocity is really slow. Example: a rotation where the start and natural end value are less than the snapping spot, but the natural end is pretty close to the snap.
							curClippedDuration = curVal > curProp.max && curProp.min !== curProp.max || curVelocity * unitFactor > -15 && curVelocity * unitFactor < 45 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.max, curVelocity, ease, checkpoint);
							if (curClippedDuration + overshootTolerance < clippedDuration) {
								clippedDuration = curClippedDuration + overshootTolerance;
							}
						} else if (curProp.min !== undefined && end < Number(curProp.min) - _min) {
							unitFactor = curProp.unitFactor || ThrowPropsPlugin.defaultUnitFactors[p] || 1; //some values are measured in special units like radians in which case our thresholds need to be adjusted accordingly.
							//if the value is already exceeding the min or if the velocity is too low, the duration can end up being uncomfortably long but in most situations, users want the snapping to occur relatively quickly (0.75 seconds), so we implement a cap here to make things more intuitive.
							curClippedDuration = curVal < curProp.min && curProp.min !== curProp.max || curVelocity * unitFactor > -45 && curVelocity * unitFactor < 15 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.min, curVelocity, ease, checkpoint);
							if (curClippedDuration + overshootTolerance < clippedDuration) {
								clippedDuration = curClippedDuration + overshootTolerance;
							}
						}

						if (curClippedDuration > duration) {
							duration = curClippedDuration;
						}
					}

					if (curDuration > duration) {
						duration = curDuration;
					}
				}
			}
			if (duration > clippedDuration) {
				duration = clippedDuration;
			}
			if (duration > maxDuration) {
				return maxDuration;
			} else if (duration < minDuration) {
				return minDuration;
			}
			return duration;
		},
		    p = ThrowPropsPlugin.prototype = new TweenPlugin("throwProps"),
		    _cssProxy,
		    _cssVars,
		    _last,
		    _lastValue; //these serve as a cache of sorts, recording the last css-related proxy and the throwProps vars that get calculated in the _cssRegister() method. This allows us to grab them in the ThrowPropsPlugin.to() function and calculate the duration. Of course we could have structured things in a more "clean" fashion, but performance is of paramount importance.


		p.constructor = ThrowPropsPlugin;
		ThrowPropsPlugin.version = "0.11.1";
		ThrowPropsPlugin.API = 2;
		ThrowPropsPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		ThrowPropsPlugin.defaultResistance = 100;
		ThrowPropsPlugin.defaultUnitFactors = { time: 1000, totalTime: 1000 }; //setting the unitFactor to a higher value (default is 1) reduces the chance of the auto-accelerating behavior kicking in when determining durations when the initial velocity is adequately low - imagine dragging something past a boundary and then letting go - snapping back relatively quickly should be prioritized over matching the initial velocity (at least that's the behavior most people consider intuitive). But in some situations when the units are very low (like "time" of a timeline or rotation when using radians), it can kick in too frequently so this allows tweaking.

		ThrowPropsPlugin.track = function (target, props, types) {
			return VelocityTracker.track(target, props, types);
		};

		ThrowPropsPlugin.untrack = function (target, props) {
			VelocityTracker.untrack(target, props);
		};

		ThrowPropsPlugin.isTracking = function (target, prop) {
			return VelocityTracker.isTracking(target, prop);
		};

		ThrowPropsPlugin.getVelocity = function (target, prop) {
			var vt = VelocityTracker.getByTarget(target);
			return vt ? vt.getVelocity(prop) : NaN;
		};

		ThrowPropsPlugin._cssRegister = function () {
			var CSSPlugin = _globals.com.greensock.plugins.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
			    _parseToProxy = _internals._parseToProxy,
			    _setPluginRatio = _internals._setPluginRatio,
			    CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("throwProps", { parser: function parser(t, e, prop, cssp, pt, plugin) {
					plugin = new ThrowPropsPlugin();
					var velocities = {},
					    min = {},
					    max = {},
					    end = {},
					    res = {},
					    preventOvershoot = {},
					    hasResistance,
					    val,
					    p,
					    data,
					    tracker;
					_cssVars = {};
					for (p in e) {
						if (p !== "resistance" && p !== "preventOvershoot" && p !== "linkedProps" && p !== "radius") {
							val = e[p];
							if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
								if (val.velocity !== undefined && typeof val.velocity === "number") {
									velocities[p] = Number(val.velocity) || 0;
								} else {
									tracker = tracker || VelocityTracker.getByTarget(t);
									velocities[p] = tracker && tracker.isTrackingProp(p) ? tracker.getVelocity(p) : 0; //rotational values are actually converted to radians in CSSPlugin, but our tracking velocity is in radians already, so make it into degrees to avoid a funky conversion
								}
								if (val.end !== undefined) {
									end[p] = val.end;
								}
								if (val.min !== undefined) {
									min[p] = val.min;
								}
								if (val.max !== undefined) {
									max[p] = val.max;
								}
								if (val.preventOvershoot) {
									preventOvershoot[p] = true;
								}
								if (val.resistance !== undefined) {
									hasResistance = true;
									res[p] = val.resistance;
								}
							} else if (typeof val === "number") {
								velocities[p] = val;
							} else {
								tracker = tracker || VelocityTracker.getByTarget(t);
								if (tracker && tracker.isTrackingProp(p)) {
									velocities[p] = tracker.getVelocity(p);
								} else {
									velocities[p] = val || 0;
								}
							}
							if (_transforms[p]) {
								cssp._enableTransforms(_transforms[p] === 2);
							}
						}
					}
					data = _parseToProxy(t, velocities, cssp, pt, plugin);
					_cssProxy = data.proxy;
					velocities = data.end;
					for (p in _cssProxy) {
						_cssVars[p] = { velocity: velocities[p], min: min[p], max: max[p], end: end[p], resistance: res[p], preventOvershoot: preventOvershoot[p] };
					}
					if (e.resistance != null) {
						_cssVars.resistance = e.resistance;
					}
					if (e.linkedProps != null) {
						_cssVars.linkedProps = e.linkedProps;
					}
					if (e.radius != null) {
						_cssVars.radius = e.radius;
					}
					if (e.preventOvershoot) {
						_cssVars.preventOvershoot = true;
					}
					pt = new CSSPropTween(t, "throwProps", 0, 0, data.pt, 2);
					cssp._overwriteProps.pop(); //don't overwrite all other throwProps tweens. In the CSSPropTween constructor, we add the property to the _overwriteProps, so remove it here.
					pt.plugin = plugin;
					pt.setRatio = _setPluginRatio;
					pt.data = data;
					plugin._onInitTween(_cssProxy, _cssVars, cssp._tween);
					return pt;
				} });
		};

		ThrowPropsPlugin.to = function (target, vars, maxDuration, minDuration, overshootTolerance) {
			if (!vars.throwProps) {
				vars = { throwProps: vars };
			}
			if (overshootTolerance === 0) {
				vars.throwProps.preventOvershoot = true;
			}
			_recordEndMode = true; //if we encounter a function-based "end" value, ThrowPropsPlugin will record it as "max" and "min" properties, replacing "end" (this is an optimization so that the function only gets called once)
			var tween = new TweenLite(target, minDuration || 1, vars);
			tween.render(0, true, true); //we force a render so that the CSSPlugin instantiates and populates the _cssProxy and _cssVars which we need in order to calculate the tween duration. Remember, we can't use the regular target for calculating the duration because the current values wouldn't be able to be grabbed like target["propertyName"], as css properties can be complex like boxShadow:"10px 10px 20px 30px red" or backgroundPosition:"25px 50px". The proxy is the result of breaking all that complex data down and finding just the numeric values and assigning them to a generic proxy object with unique names. THAT is what the _calculateTweenDuration() can look at. We also needed to do the same break down of any min or max or velocity data
			if (tween.vars.css) {
				tween.duration(_calculateTweenDuration(_cssProxy, { throwProps: _cssVars, ease: vars.ease }, maxDuration, minDuration, overshootTolerance));
				if (tween._delay && !tween.vars.immediateRender) {
					tween.invalidate(); //if there's a delay, the starting values could be off, so invalidate() to force reinstantiation when the tween actually starts.
				} else {
					_last._onInitTween(_cssProxy, _lastValue, tween);
				}
				_recordEndMode = false;
				return tween;
			} else {
				tween.kill();
				tween = new TweenLite(target, _calculateTweenDuration(target, vars, maxDuration, minDuration, overshootTolerance), vars);
				_recordEndMode = false;
				return tween;
			}
		};

		p._onInitTween = function (target, value, tween, index) {
			this.target = target;
			this._props = [];
			_last = this;
			_lastValue = value;
			var ease = tween._ease,
			    checkpoint = isNaN(value.checkpoint) ? 0.05 : Number(value.checkpoint),
			    duration = tween._duration,
			    preventOvershoot = value.preventOvershoot,
			    cnt = 0,
			    p,
			    curProp,
			    curVal,
			    isFunc,
			    velocity,
			    change1,
			    end,
			    change2,
			    tracker,
			    linkedProps,
			    linkedPropNames,
			    i;

			if (value.linkedProps) {
				//when there are linkedProps (typically "x,y" where snapping has to factor in multiple properties, we must first populate an object with all of those end values, then feed it to the function that make any necessary alterations. So the point of this first loop is to simply build an object (like {x:100, y:204.5}) for feeding into that function which we'll do later in the "real" loop.
				linkedPropNames = value.linkedProps.split(",");
				linkedProps = {};
				for (i = 0; i < linkedPropNames.length; i++) {
					p = linkedPropNames[i];
					curProp = value[p];
					if (curProp) {
						if (curProp.velocity !== undefined && typeof curProp.velocity === "number") {
							velocity = Number(curProp.velocity) || 0;
						} else {
							tracker = tracker || VelocityTracker.getByTarget(target);
							velocity = tracker && tracker.isTrackingProp(p) ? tracker.getVelocity(p) : 0;
						}
						curVal = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]() : target[p] || 0;
						linkedProps[p] = curVal + _calculateChange(velocity, ease, duration, checkpoint);
					}
				}
			}

			for (p in value) {
				if (p !== "resistance" && p !== "checkpoint" && p !== "preventOvershoot" && p !== "linkedProps" && p !== "radius") {
					curProp = value[p];
					if (typeof curProp === "function") {
						curProp = curProp(index, target);
					}
					if (typeof curProp === "number") {
						velocity = Number(curProp) || 0;
					} else if ((typeof curProp === "undefined" ? "undefined" : _typeof(curProp)) === "object" && !isNaN(curProp.velocity)) {
						velocity = Number(curProp.velocity);
					} else {
						tracker = tracker || VelocityTracker.getByTarget(target);
						if (tracker && tracker.isTrackingProp(p)) {
							velocity = tracker.getVelocity(p);
						} else {
							throw "ERROR: No velocity was defined in the throwProps tween of " + target + " property: " + p;
						}
					}
					change1 = _calculateChange(velocity, ease, duration, checkpoint);
					change2 = 0;
					isFunc = typeof target[p] === "function";
					curVal = isFunc ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]() : target[p];
					if ((typeof curProp === "undefined" ? "undefined" : _typeof(curProp)) === "object") {
						end = curVal + change1;
						if (curProp.end !== undefined) {
							curProp = _parseEnd(curProp, linkedProps && p in linkedProps ? linkedProps : end, curProp.max, curProp.min, p, value.radius);
							if (_recordEndMode) {
								value[p] = _extend(curProp, value[p], "end");
							}
						}
						if (curProp.max !== undefined && Number(curProp.max) < end) {
							if (preventOvershoot || curProp.preventOvershoot) {
								change1 = curProp.max - curVal;
							} else {
								change2 = curProp.max - curVal - change1;
							}
						} else if (curProp.min !== undefined && Number(curProp.min) > end) {
							if (preventOvershoot || curProp.preventOvershoot) {
								change1 = curProp.min - curVal;
							} else {
								change2 = curProp.min - curVal - change1;
							}
						}
					}
					this._overwriteProps[cnt] = p;
					this._props[cnt++] = { p: p, s: curVal, c1: change1, c2: change2, f: isFunc, r: false };
				}
			}
			return true;
		};

		p._kill = function (lookup) {
			var i = this._props.length;
			while (--i > -1) {
				if (lookup[this._props[i].p] != null) {
					this._props.splice(i, 1);
				}
			}
			return TweenPlugin.prototype._kill.call(this, lookup);
		};

		p._mod = function (lookup) {
			var p = this._props,
			    i = p.length,
			    val;
			while (--i > -1) {
				val = lookup[p[i].p] || lookup.throwProps;
				if (typeof val === "function") {
					p[i].m = val;
				}
			}
		};

		p.setRatio = function (v) {
			var i = this._props.length,
			    cp,
			    val;
			while (--i > -1) {
				cp = this._props[i];
				val = cp.s + cp.c1 * v + cp.c2 * v * v;
				if (cp.m) {
					val = cp.m(val, this.target);
				} else if (v === 1) {
					val = (val * 10000 + (val < 0 ? -0.5 : 0.5) | 0) / 10000; //if we don't round things at the very end, binary math issues can creep in and cause snapping not to be exact (like landing on 20.000000000001 instead of 20).
				}
				if (cp.f) {
					this.target[cp.p](val);
				} else {
					this.target[cp.p] = val;
				}
			}
		};

		TweenPlugin.activate([ThrowPropsPlugin]);

		return ThrowPropsPlugin;
	}, true);

	/*
  * ----------------------------------------------------------------
  * VelocityTracker
  * ----------------------------------------------------------------
  */
	_gsScope._gsDefine("utils.VelocityTracker", ["TweenLite"], function (TweenLite) {

		var _first,
		    _initted,
		    _time1,
		    _time2,
		    _capsExp = /([A-Z])/g,
		    _empty = {},
		    _doc = _gsScope.document,
		    _transforms = { x: 1, y: 1, z: 2, scale: 1, scaleX: 1, scaleY: 1, rotation: 1, rotationZ: 1, rotationX: 2, rotationY: 2, skewX: 1, skewY: 1, xPercent: 1, yPercent: 1 },
		    _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function () {},
		    _getStyle = function _getStyle(t, p, cs) {
			var rv = (t._gsTransform || _empty)[p];
			if (rv || rv === 0) {
				return rv;
			} else if (t.style[p]) {
				rv = t.style[p];
			} else if (cs = cs || _getComputedStyle(t, null)) {
				rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
			} else if (t.currentStyle) {
				rv = t.currentStyle[p];
			}
			return parseFloat(rv) || 0;
		},
		    _ticker = TweenLite.ticker,
		    VelocityProp = function VelocityProp(p, isFunc, next) {
			this.p = p;
			this.f = isFunc;
			this.v1 = this.v2 = 0;
			this.t1 = this.t2 = _ticker.time;
			this.css = false;
			this.type = "";
			this._prev = null;
			if (next) {
				this._next = next;
				next._prev = this;
			}
		},
		    _update = function _update() {
			var vt = _first,
			    t = _ticker.time,
			    val,
			    vp;
			//if the frame rate is too high, we won't be able to track the velocity as well, so only update the values about 33 times per second
			if (t - _time1 >= 0.03) {
				_time2 = _time1;
				_time1 = t;
				while (vt) {
					vp = vt._firstVP;
					while (vp) {
						val = vp.css ? _getStyle(vt.target, vp.p) : vp.f ? vt.target[vp.p]() : vt.target[vp.p];
						if (val !== vp.v1 || t - vp.t1 > 0.15) {
							//use a threshold of 0.15 seconds for zeroing-out velocity. If we only use 0.03 and things update slightly slower, like some Android devices dispatch "touchmove" events sluggishly so 2 or 3 ticks of the TweenLite.ticker may elapse inbetween, thus it may appear like the object is not moving but it actually is but it's not updating as frequently. A threshold of 0.15 seconds seems to be a good balance. We want to update things frequently (0.03 seconds) when they're moving so that we can respond to fast motions accurately, but we want to be more resistant to go back to a zero velocity.
							vp.v2 = vp.v1;
							vp.v1 = val;
							vp.t2 = vp.t1;
							vp.t1 = t;
						}
						vp = vp._next;
					}
					vt = vt._next;
				}
			}
		},
		    VelocityTracker = function VelocityTracker(target) {
			this._lookup = {};
			this.target = target;
			this.elem = target.style && target.nodeType ? true : false;
			if (!_initted) {
				_ticker.addEventListener("tick", _update, null, false, -100);
				_time1 = _time2 = _ticker.time;
				_initted = true;
			}
			if (_first) {
				this._next = _first;
				_first._prev = this;
			}
			_first = this;
		},
		    getByTarget = VelocityTracker.getByTarget = function (target) {
			var vt = _first;
			while (vt) {
				if (vt.target === target) {
					return vt;
				}
				vt = vt._next;
			}
		},
		    p = VelocityTracker.prototype;

		p.addProp = function (prop, type) {
			if (!this._lookup[prop]) {
				var t = this.target,
				    isFunc = typeof t[prop] === "function",
				    alt = isFunc ? this._altProp(prop) : prop,
				    vp = this._firstVP;
				this._firstVP = this._lookup[prop] = this._lookup[alt] = vp = new VelocityProp(alt !== prop && prop.indexOf("set") === 0 ? alt : prop, isFunc, vp);
				vp.css = this.elem && (this.target.style[vp.p] !== undefined || _transforms[vp.p]);
				if (vp.css && _transforms[vp.p] && !t._gsTransform) {
					TweenLite.set(t, { x: "+=0", overwrite: false }); //just forces CSSPlugin to create a _gsTransform for the element if it doesn't exist
				}
				vp.type = type || vp.css && prop.indexOf("rotation") === 0 ? "deg" : "";
				vp.v1 = vp.v2 = vp.css ? _getStyle(t, vp.p) : isFunc ? t[vp.p]() : t[vp.p];
			}
		};

		p.removeProp = function (prop) {
			var vp = this._lookup[prop];
			if (vp) {
				if (vp._prev) {
					vp._prev._next = vp._next;
				} else if (vp === this._firstVP) {
					this._firstVP = vp._next;
				}
				if (vp._next) {
					vp._next._prev = vp._prev;
				}
				this._lookup[prop] = 0;
				if (vp.f) {
					this._lookup[this._altProp(prop)] = 0; //if it's a getter/setter, we should remove the matching counterpart (if one exists)
				}
			}
		};

		p.isTrackingProp = function (prop) {
			return this._lookup[prop] instanceof VelocityProp;
		};

		p.getVelocity = function (prop) {
			var vp = this._lookup[prop],
			    target = this.target,
			    val,
			    dif,
			    rotationCap;
			if (!vp) {
				throw "The velocity of " + prop + " is not being tracked.";
			}
			val = vp.css ? _getStyle(target, vp.p) : vp.f ? target[vp.p]() : target[vp.p];
			dif = val - vp.v2;
			if (vp.type === "rad" || vp.type === "deg") {
				//rotational values need special interpretation so that if, for example, they go from 179 to -178 degrees it is interpreted as a change of 3 instead of -357.
				rotationCap = vp.type === "rad" ? Math.PI * 2 : 360;
				dif = dif % rotationCap;
				if (dif !== dif % (rotationCap / 2)) {
					dif = dif < 0 ? dif + rotationCap : dif - rotationCap;
				}
			}
			return dif / (_ticker.time - vp.t2);
		};

		p._altProp = function (p) {
			//for getters/setters like getCustomProp() and setCustomProp() - we should accommodate both
			var pre = p.substr(0, 3),
			    alt = (pre === "get" ? "set" : pre === "set" ? "get" : pre) + p.substr(3);
			return typeof this.target[alt] === "function" ? alt : p;
		};

		VelocityTracker.getByTarget = function (target) {
			var vt = _first;
			if (typeof target === "string") {
				target = TweenLite.selector(target);
			}
			if (target.length && target !== window && target[0] && target[0].style && !target.nodeType) {
				target = target[0];
			}
			while (vt) {
				if (vt.target === target) {
					return vt;
				}
				vt = vt._next;
			}
		};

		VelocityTracker.track = function (target, props, types) {
			var vt = getByTarget(target),
			    a = props.split(","),
			    i = a.length;
			types = (types || "").split(",");
			if (!vt) {
				vt = new VelocityTracker(target);
			}
			while (--i > -1) {
				vt.addProp(a[i], types[i] || types[0]);
			}
			return vt;
		};

		VelocityTracker.untrack = function (target, props) {
			var vt = getByTarget(target),
			    a = (props || "").split(","),
			    i = a.length;
			if (!vt) {
				return;
			}
			while (--i > -1) {
				vt.removeProp(a[i]);
			}
			if (!vt._firstVP || !props) {
				if (vt._prev) {
					vt._prev._next = vt._next;
				} else if (vt === _first) {
					_first = vt._next;
				}
				if (vt._next) {
					vt._next._prev = vt._prev;
				}
			}
		};

		VelocityTracker.isTracking = function (target, prop) {
			var vt = getByTarget(target);
			return !vt ? false : !prop && vt._firstVP ? true : vt.isTrackingProp(prop);
		};

		return VelocityTracker;
	}, true);
});if (_gsScope._gsDefine) {
	_gsScope._gsQueue.pop()();
}

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof module !== "undefined" && module.exports) {
		//node
		require("gsap/TweenLite");
		module.exports = getGlobal();
	} else if (typeof define === "function" && define.amd) {
		//AMD
		define(["gsap/TweenLite"], getGlobal);
	}
})("ThrowPropsPlugin");
},{"gsap/TweenLite":12}],2:[function(require,module,exports) {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// import {TweenMax, TweenLite,TimelineMax, CSSPLugin } from "gsap";

// import { ThrowPropsPlugin} from "gsap";


// import{ CustomWiggle } from '/js/lib/CustomWiggle.js'


// import{ CustomWiggle } from '/js/lib/CustomWiggle.js'


var _shuffle = require('./js/lib/shuffle');

var _helpers = require('./js/lib/helpers');

var _selector = require('./js/lib/selector');

var _CustomEase = require('/js/lib/CustomEase.js');

var _CustomEase2 = _interopRequireDefault(_CustomEase);

var _CustomWiggle = require('/js/lib/CustomWiggle.js');

var _CustomWiggle2 = _interopRequireDefault(_CustomWiggle);

var _ThrowPropsPlugin = require('/js/lib/ThrowPropsPlugin.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const CustomWiggle = require('/js/lib/CustomWiggle.js')
// const ThrowPropsPlugin = require( 'gsap/ThrowPropsPlugin');


var main = function main(event) {
  // const flowers = document.querySelectorAll('.cls-187');
  var add = function add(a, b, c) {
    return a + b + c;
  };
  var curriedAdd = function curriedAdd(a) {
    return function (b) {
      return function (c) {
        return add(a, b, c);
      };
    };
  };
  var curry = function curry(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.length >= fn.length ? fn.apply(undefined, args) : curry.bind.apply(curry, [null, fn].concat(args));
  };

  var selectMultiFromDocument = (0, _selector.selectMultiple)(document);
  var flowers = selectMultiFromDocument('.cls-186', '.cls-186');
  var peak = selectMultiFromDocument('.cls-182', '.cls-188');
  var clouds = (0, _selector.selector)('g#clouds');

  var cloud1 = document.querySelector('g#cloud1');
  var cloud2Shadow = document.querySelector("g#cloud2-shadow");
  var cloud1Shadow = document.querySelector("g#cloud1-shadow");

  var closedEgg = document.querySelector('path.cls-198.closed-egg');
  console.log(closedEgg);
  var flowersArray = (0, _selector.selector)('.cls-186');
  var yellowFlowersArray = (0, _selector.selector)('.cls-187');
  var eyes = selectMultiFromDocument('#eyes1', '#eyes2', '#eyes3', '#eyes4', '#eyes5', '#eyes6', '#eyes7', '#eyes8', '#eyes9', '#eyes10', '#eyes11', '#eyes12', '#eyes13', '#eyes14');
  // console.log(eyes);

  var eggs = selectMultiFromDocument('#egg1', '#egg2', '#egg3', '#egg4', '#egg5', '#egg6', '#egg7', '#egg8', '#egg9', '#egg10');
  // const eggs2 = document.querySelectorAll( '#egg1,  #egg2, #egg3, #egg4,  #egg5,  #egg6,  #egg7,  #egg8,  #egg9, #egg10');
  // console.log(...eggs2);


  function clearStage() {
    var clearTl = new TimelineMax();
    clearTl.set(flowersArray, { autoAlpha: 0 }).set(yellowFlowersArray, { autoAlpha: 0 })
    // .set(clouds, {left:-200, opacity:0});
    .set(cloud1, { x: '-1200', autoAlpha: 0.5 }).set(cloud1Shadow, { x: '-2400', autoAlpha: 1 }).set(cloud2, { x: '-=3600', autoAlpha: 0.5 }).set(cloud2Shadow, { x: '-=1400', autoAlpha: 1 })
    // .set("#chickenHead", {autoAlpha: 0})
    .set("#chickenHead2", { autoAlpha: 0 }).set(closedEgg, { fill: "#F0D7BF" })
    // .set("#chickenBody", {autoAlpha: 0})

    // .set("#topEggShell", {y:120, rotate: 100})
    .set("#topEggShell2", { y: 45 });

    // .set("#topEggShellb", {y:120, rotate: 100})

    return clearTl;
  }

  var cloudShadow = selectMultiFromDocument("g#cloud1-shadow", "g#cloud1");
  // console.log('classy',cloudShadow);

  function enterFloorVegetation() {
    var enterFloorVegetationTl = new TimelineMax();
    enterFloorVegetationTl.fromTo(flowersArray, 1, { autoAlpha: 0, scaleY: 0.2, transformOrigin: 'center center' }, { autoAlpha: 1, scaleY: 1, transformOrigin: 'center center', ease: Back.easeInOut, onComplete: startBlinking }).fromTo(yellowFlowersArray, 1, { autoAlpha: 0, scaleX: 0.2, transformOrigin: 'center center' }, { autoAlpha: 1, scaleX: 1, transformOrigin: 'center center', ease: Back.easeInOut }, "-=0.9");

    return enterFloorVegetationTl;
  }

  var flowerDance = function flowerDance() {
    var removeFirstItems = function removeFirstItems(arr, count) {
      return (0, _shuffle.remove)(count)(0)((0, _shuffle.shuffle)((0, _helpers.flatten)(arr)));
    };

    var _removeFirstItems = removeFirstItems(flowers, 10),
        _removeFirstItems2 = _slicedToArray(_removeFirstItems, 2),
        removeItems1 = _removeFirstItems2[0],
        leftOver1 = _removeFirstItems2[1];

    var _removeFirstItems3 = removeFirstItems(leftOver1, 50),
        _removeFirstItems4 = _slicedToArray(_removeFirstItems3, 2),
        removeItems2 = _removeFirstItems4[0],
        leftOver2 = _removeFirstItems4[1];

    return new TimelineMax({ repeat: -1, repeatDelay: 1 }).to(removeItems1, 1, { throwProps: { rotation: 360 } })
    // .to(removeItems1, 1, {y:0, rotation:32, x:'-=1'}, 0)
    .to(removeItems2, 1, { throwProps: { rotation: 360 } }, '-=0.5');
    // .to(removeItems2, 1, {y:0, rotation:32, x:'+=1'}, '-=0.2')
  };

  // not used, nor finished
  function birdsEating() {
    var birdsEatingTl = new TimelineMax({ repeat: -1, repeatDelay: 4 });
    birdsEatingTl.to(peak, 1.4, { y: '+=3' }, '+=0.1').to(peak, 1.4, { y: '-=3' }, '+=0.1');

    return birdsEatingTl;
  }

  function startBlinking() {

    var birdBlinksTl = new TimelineMax({ repeat: -1, repeatDelay: 10 });

    (0, _shuffle.shuffle)(eyes).forEach(function (eye) {
      return birdBlinksTl.set(eye, { autoAlpha: 0 }).set(eye, { autoAlpha: 1 }, '+=0.2').set(eye, { autoAlpha: 0 }, '+=0.2').set(eye, { autoAlpha: 1 }, '+=0.2');
    });
    return birdBlinksTl;
  }

  //clouds moving 
  function cloudsMoving() {
    var cloudsMovingTl = new TimelineMax({ repeat: -1 }, Math.random() * 5);
    cloudsMovingTl.to(cloud1, 14, { autoAlpha: 1 }).to(cloud1Shadow, 14, { autoAlpha: 1 }).to(cloud2, 14, { autoAlpha: 1 }).to(cloud2Shadow, 14, { autoAlpha: 1 }).to(cloud1, 40, { x: "+=3000", ease: Linear.easeNone }, 0).to(cloud1Shadow, 40, { x: "+=3000", ease: Linear.easeNone }, 0).to(cloud2, 60, { x: "+=3000", ease: Linear.easeNone }, 0).to(cloud2Shadow, 60, { x: "+=3000", ease: Linear.easeNone }, 0);

    return cloudsMovingTl;
  }

  function bunnyInTheBack() {
    var bunnyInTheBackTl = new TimelineMax({ repeat: -1, repeatDelay: 10 });
    bunnyInTheBackTl.to('#bunnyInTheBack', 1, { y: 85 }).to('#bunnyInTheBack', 1, { y: "-=85" });
    return bunnyInTheBackTl;
  }

  function eggsShaking() {
    var eggsShakingTl = new TimelineMax({ repeat: -1, repeatDelay: 3 });
    eggsShakingTl;
    (0, _shuffle.shuffle)(eggs).forEach(function (egg) {
      return eggsShakingTl.to(egg, 0.1, { x: "+=20", yoyo: true, repeat: 5 }, '+=5');
    });
    // .to("#egg6", 1, {x: 400});
    return eggsShakingTl;
  }

  // TweenMax.to("#basket", 4, {x:10, y:10, ease: "wiggle"});

  // var tl = new TimelineMax({repeat:50, repeatDelay:1, delay:1});
  // tl.to("#basket", 4, {x:10, y:10, ease: "wiggle"});


  function bunnyHand() {
    // function wiggle(id, duration) {
    //   var tl = new TimelineLite();
    //   tl.to("#" + id, duration, {rotation:30, ease:"Wiggle.easeOut" })
    //   return tl;
    // }
    _CustomWiggle2.default.create("theWiggle", { wiggles: 2 });
    var bunnyHandTl = new TimelineMax();
    bunnyHandTl.to("#bunnyHand", 0.5, { x: -10 }).to("#bunnyHand", 0.5, { x: 10 }).to("#basket", 1, { y: -10, rotation: 10, ease: "theWiggle" }, "-=0.6").to("#redEggBasket", 2, { x: 10, y: 100, ease: Power2.easeOut }, "-=0.8");

    return bunnyHandTl;
  }

  function eggPopping() {}

  function animationController() {
    // clear the stage
    // setup initial state and run main animation
    var masterTl = new TimelineMax();
    masterTl.add(clearStage(), 'scene-clear-stage').add(enterFloorVegetation(), 'scene-floor-vegetation').add(birdsEating(), "birds-eating").add(cloudsMoving(), 'clouds-moving').add(flowerDance(), 0).add(bunnyHand(), 'bunny-hand').add(bunnyInTheBack(), 'bunny-in-the-back').add(eggsShaking(), 'eggs-shaking');
  }

  function go() {
    console.log('hey...');
    // var iter = animationController();
    // iter.next();
    // requestAnimationFrame(() => iter.next());
    var masterTl = new TimelineMax();
    masterTl.add(clearStage(), 'scene-clear-stage').add(enterFloorVegetation(), 'scene-floor-vegetation').add(birdsEating(), "birds-eating").add(cloudsMoving(), 'clouds-moving').add(flowerDance(), 0).add(bunnyHand(), 'bunny-hand').add(bunnyInTheBack(), 'bunny-in-the-back').add(eggsShaking(), 'eggs-shaking');
  }

  go();
};

document.addEventListener('DOMContentLoaded', main);
},{"./js/lib/shuffle":9,"./js/lib/helpers":10,"./js/lib/selector":11,"/js/lib/CustomEase.js":6,"/js/lib/CustomWiggle.js":7,"/js/lib/ThrowPropsPlugin.js":8}],24:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49802' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[24,2])
//# sourceMappingURL=/app.2b424ac9.map
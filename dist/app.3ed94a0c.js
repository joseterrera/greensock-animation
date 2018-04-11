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
})({10:[function(require,module,exports) {
/*!
 * dope 2.2.2
 * http://github.com/ryanve/dope
 * MIT License (c) Ryan Van Etten 
 */

/*jshint expr:true, sub:true, supernew:true, debug:true, node:true, boss:true, devel:true, evil:true, 
  laxcomma:true, eqnull:true, undef:true, unused:true, browser:true, jquery:true, maxerr:10 */

(function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make();
  else root[name] = make();
}(this, 'dope', function() {

  // developers.google.com/closure/compiler/docs/api-tutorial3
  // developers.google.com/closure/compiler/docs/js-for-compiler

  var doc = document
    , xports = {}
    , effins = xports['fn'] = {}
    , owns = xports.hasOwnProperty
    , DMS = typeof DOMStringMap != 'undefined'
    , parseJSON = typeof JSON != 'undefined' && JSON.parse
    , queryMethod = 'querySelectorAll' 
    , QSA = !!doc[queryMethod] || !(queryMethod = 'getElementsByTagName')
    , queryEngine = function(s, root) {
        return s ? (root || doc)[queryMethod](s) : []; 
      }
    , camels = /([a-z])([A-Z])/g // lowercase next to uppercase
    , dashB4 = /-(.)/g // finds chars after hyphens
    , csvSsv = /\s*[\s\,]+\s*/ // splitter for comma *or* space-separated values
    , cleanAttr = /^[\[\s]+|\s+|[\]\s]+$/g // replace whitespace, trim [] brackets
    , cleanPre = /^[\[\s]?(data-)?|\s+|[\]\s]?$/g // replace whitespace, trim [] brackets, trim prefix
    , escDots = /\\*\./g // find periods w/ and w/o preceding backslashes
    , ssv = /\s+/
    , trimmer = /^\s+|\s+$/
    , trim = ''.trim ? function(s) {
        return null == s ? '' : s.trim(); 
      } : function(s) {
        return null == s ? '' : s.replace(trimmer, ''); 
      };
  
  /**
   * @return {string}
   */
  function camelHandler(all, letter) { 
    return letter.toUpperCase();
  }

  /**
   * Convert  'data-pulp-fiction' to 'pulpFiction'. Non-scalars return an
   * empty string. number|boolean coerces to string. (opposite: datatize())
   * @param {string|number|boolean|*} s
   * @return {string}
   */
  function camelize(s) {
    if (typeof s != 'string') return typeof s == 'number' || typeof s == 'boolean' ? '' + s : ''; 
    // Remove data- prefix and convert remaining dashed string to camelCase:
    return s.replace(cleanPre, '').replace(dashB4, camelHandler); // -a to A
  }

  /**
   * Convert 'pulpFiction' to 'data-pulp-fiction' OR 47 to 'data-47'
   * Invalid types return an empty string. (opposite: camelize())
   * @param {string|number|*} s
   * @return {string}
   */
  function datatize(s) {
    if (typeof s == 'string') s = s.replace(cleanPre, '$1').replace(camels, '$1-$2'); // aA to a-A
    else s = typeof s == 'number'  ? '' + s : '';
    return s ? ('data-' + s.toLowerCase()) : s;
  }

  /**
   * Convert a stringified primitive into its correct type.
   * @param {string|*} s
   */
  function parse(s) {
    var n; // undefined, or becomes number
    return typeof s != 'string' || !s ? s
      : 'false' === s ? false
      : 'true' === s ? true
      : 'null' === s ? null
      : 'undefined' === s || (n = (+s)) || 0 === n || 'NaN' === s ? n
      : s;
  }

  /**
   * @param {Object|Array|*} list
   * @param {Function} fn   
   * @param {(Object|*)=} scope
   * @param {boolean=} compact 
   * @return {Array}
   */
  function map(list, fn, scope, compact) {
    var l, i = 0, v, u = 0, ret = [];
    if (list == null) return ret;
    compact = true === compact;
    for (l = list.length; i < l;) {
      v = fn.call(scope, list[i], i++, list);
      if (v || !compact) ret[u++] = v;
    }
    return ret;
  }
  
  /** 
   * special-case DOM-node iterator optimized for internal use
   * @param {Object|Array} ob
   * @param {Function} fn
   * @param {*=} param
   */
  function eachNode(ob, fn, param) {
    for (var l = ob.length, i = 0; i < l; i++)
      ob[i] && ob[i].nodeType && fn(ob[i], param);
    return ob;
  }

  /**
   * internal-use function to iterate a node's attributes
   * @param {Object} el
   * @param {Function} fn
   * @param {(boolean|*)=} exp
   */
  function eachAttr(el, fn, exp) {
    var test, n, a, i, l;
    if (!el.attributes) return;
    test = typeof exp == 'boolean' ? /^data-/ : test;
    for (i = 0, l = el.attributes.length; i < l;) {
      if (a = el.attributes[i++]) {
        n = '' + a.name;
        test && test.test(n) !== exp || null == a.value || fn.call(el, a.value, n, a);
      }
    }
  }

  /**
   * Get object containing an element's data attrs.
   * @param {Element} el
   * @return {DOMStringMap|Object|undefined}
   */
  function getDataset(el) {
    var ob;
    if (!el || 1 !== el.nodeType) return;  // undefined
    if (ob = DMS && el.dataset) return ob; // native
    ob = {}; // Fallback plain object cannot mutate the dataset via reference.
    eachAttr(el, function(v, k) {
      ob[camelize(k)] = '' + v;
    }, true);
    return ob;
  }

  /**
   * @param {Element} el
   * @param {Object=} ob
   */
  function resetDataset(el, ob) {
    if (!el) return;
    var n, curr = el.dataset;
    if (curr && DMS) {
      if (curr === ob) return;
      for (n in curr) delete curr[n];
    }
    ob && dataset(el, ob);
  }
  
  /**
   * @param {Element} el
   * @param {Object} ob
   * @param {Function} fn
   */
  function setViaObject(el, ob, fn) {
    for (var n in ob) owns.call(ob, n) && fn(el, n, ob[n]);
  }
  
  /**
   * @param {Object|Array|Function} el
   * @param {(string|Object|*)=} k
   * @param {*=} v
   */  
  function attr(el, k, v) {
    el = el.nodeType ? el : el[0];
    if (!el || !el.setAttribute) return;
    k = typeof k == 'function' ? k.call(el) : k;
    if (!k) return;
    if (typeof k == 'object') {
      // SET-multi
      setViaObject(el, k, attr);
    } else {
      if (void 0 === v) {
        // GET
        k = el.getAttribute(k); // repurpose
        return null == k ? v : '' + k; // normalize
      }
      // SET
      v = typeof v == 'function' ? v.call(el) : v;
      v = '' + v; // normalize inputs
      el.setAttribute(k, v);
      return v; // the curr value
    }
  }
  
  /**
   * @param {Object|Array|Function} el
   * @param {(string|Object|*)=} k
   * @param {*=} v
   */  
  function dataset(el, k, v) {
    var exact, kFun = typeof k == 'function';
    el = el.nodeType ? el : el[0];
    if (!el || !el.setAttribute) return;
    if (void 0 === k && v === k) return getDataset(el);
    k = kFun ? k.call(el) : k;

    if (typeof k == 'object' && (kFun || !(exact = void 0 === v && datatize(k[0])))) {
      // SET-multi
      kFun && deletes(el);
      k && setViaObject(el, k, dataset);
    } else {
      k = exact || datatize(k);
      if (!k) return;
      if (void 0 === v) {
        // GET
        k = el.getAttribute(k); // repurpose
        return null == k ? v : exact ? parse(k) : '' + k; // normalize
      }
      // SET
      v = typeof v == 'function' ? v.call(el) : v;
      v = '' + v; // normalize inputs
      el.setAttribute(k, v);
      return v; // current value
    }
  }

  /**
   * @param {Element} el
   * @param {(Array|string|number)=} keys
   */
  function deletes(el, keys) {
    var k, i = 0;
    el = el.nodeType ? el : el[0];
    if (!el || !el.removeAttribute)
      return;
    if (void 0 === keys) {
      resetDataset(el); 
    } else {
      keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys);
      while (i < keys.length) {
        k = datatize(keys[i++]);
        k && el.removeAttribute(k);
      }
    }
  }
  
  /**
   * @param {Element} el
   * @param {Array|string|number} keys
   */
  function removeAttr(el, keys) {
    var i = 0;
    el = el.nodeType ? el : el[0];
    if (el && el.removeAttribute) {
      for (keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys); i < keys.length; i++) {
        keys[i] && el.removeAttribute(keys[i]);
      }
    }
  }

  /**
   * Convert list of attr names or data- keys into a selector.
   * @param {Array|string|number|*} list
   * @param {boolean=} prefix
   * @param {boolean=} join
   * @return {string|Array}
   */
  function toAttrSelector(list, prefix, join) {
    var l, s, i = 0, j = 0, emp = '', arr = [];
    prefix = true === prefix;
    list = typeof list == 'string' ? list.split(csvSsv) : typeof list == 'number' ? '' + list : list;
    for (l = list.length; i < l;) {
      s = list[i++];
      s = prefix ? datatize(s) : s.replace(cleanAttr, emp);
      s && (arr[j++] = s);
    }
    // Escape periods to allow atts like `[data-the.wh_o]`
    // @link api.jquery.com/category/selectors/
    // @link stackoverflow.com/q/13283699/770127
    return false === join ? arr : j ? '[' + arr.join('],[').replace(escDots, '\\\\.') + ']' : emp;
  }

  /**
   * Get elements matched by a data key.
   * @param {Array|string} list array or CSV or SSV data keys
   * @return {Array|*}
   */   
  xports['queryData'] = QSA ? function(list, root) {
    // Modern browsers, IE8+
    return false === root ? toAttrSelector(list, true, root) : queryEngine(toAttrSelector(list, true), root);
  } : function(list, root) {
    // == FALLBACK ==
    list = toAttrSelector(list, true, false);
    return false === root ? list : queryAttrFallback(list, root); 
  };
  
  /**
   * Get elements matched by an attribute name.
   * @param {Array|string} list array or CSV or SSV data keys
   * @return {Array|*}
   */   
  xports['queryAttr'] = QSA ? function(list, root) {
    // Modern browsers, IE8+
    return false === root ? toAttrSelector(list, root, root) : queryEngine(toAttrSelector(list), root);
  } : function(list, root) {
    // == FALLBACK ==
    list = toAttrSelector(list, false, false);
    return false === root ? list : queryAttrFallback(list, root); 
  };
  
  /**
   * @param {Array|string} list array of attribute names (w/o bracks)
   * @param {Object=} root
   */
  function queryAttrFallback(list, root) {
    var j, i, e, els, l = list.length, ret = [], u = 0;
    if (!l) return ret;
    els = queryEngine('*', root);
    for (j = 0; (e = els[j]); j++) {
      i = l; // reset i for each outer iteration
      while (i--) {// each attr name
        if (attr(e, list[i]) != null) {
          ret[u++] = e; // ghetto push
          break; // prevent pushing same elem twice
        }
      }
    }
    return ret;
  }
  
  // Expose remaining top-level methods:
  xports['map'] = map;
  xports['parse'] = parse;

  /**
   * @param {string|*} s
   * @since 2.1.0
   */
  xports['parseJSON'] = function(s) {
    s = parse(s);
    if (typeof s == 'string') {
      try {
        s = parseJSON(trim(s));
      } catch (e) {}
    }
    return s;
  };

  xports['trim'] = trim;
  xports['qsa'] = queryEngine;
  xports['attr'] = attr;
  xports['removeAttr'] = removeAttr;
  xports['dataset'] = dataset;
  xports['deletes'] = deletes;
  xports['camelize'] = camelize;
  xports['datatize'] = datatize;

  /**
   * @this {Object|Array}
   * @param {*=} k
   * @param {*=} v
   */
  effins['dataset'] = function(k, v) {
    var kMulti = typeof k == 'object' ? !(void 0 === v && datatize(k[0])) : typeof k == 'function';
    if (void 0 === v && !kMulti) return dataset(this[0], k); // GET
    return (k = kMulti ? k : datatize(k)) ? eachNode(this, function(e, x) {
      x = typeof v == 'function' ? v.call(e) : v;
      kMulti ? dataset(e, k, x) : e.setAttribute(k, '' + x); 
    }) : void 0 === v ? v : this;
  };

  /**
   * @this {Object|Array}
   * @param {*=} k
   * @param {*=} v
   */  
  effins['attr'] = function(k, v) {
    var kMulti = typeof k == 'object' || typeof k == 'function';
    if (void 0 === v && !kMulti) return attr(this[0], k); // GET
    return k ? eachNode(this, function(e, x) {
      x = typeof v == 'function' ? v.call(e) : v;
      kMulti ? attr(e, k, x) : e.setAttribute(k, '' + x); 
    }) : (void 0 === v ? v : this);
  };

  /**
   * Remove data- attrs for each element in a collection.
   * @this {Object|Array}
   * @param {Array|string}  keys  one or more SSV or CSV data attr keys or names
   */
  effins['deletes'] = function(keys) {
    if (void 0 === keys) return eachNode(this, resetDataset);
    keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys);
    return eachNode(this, removeAttr, map(keys, datatize));
  };
  
  /**
   * Remove attrbutes for each element in a collection.
   * @this {Object|Array}
   * @param {Array|string}  keys  one or more SSV or CSV attr names
   */
  effins['removeAttr'] = function(keys) {
    return eachNode(this, removeAttr, keys);
  };

  return xports;
}));
},{}],3:[function(require,module,exports) {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('dope');

var main = function main(event) {
  var eyes = document.querySelectorAll('.cls-16');
  // const flowers = document.querySelectorAll('.cls-187');
  var selector = function selector(query) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return [].slice.call(context.querySelectorAll(query));
  };

  // const pipe = (funcs) => input => funcs.reduce( (acc,item) => item(acc), input )

  var fSelector = function fSelector(context) {
    return function (query) {
      return selector(query, context);
    };
  };
  var flatten = function flatten(multiList) {
    return multiList.reduce(function (acc, item) {
      return acc.concat(item);
    }, []);
  };
  var selectMultiple = function selectMultiple(context) {
    return function () {
      for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
        queries[_key] = arguments[_key];
      }

      return flatten(queries.map(fSelector(context)));
    };
  };

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
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return args.length >= fn.length ? fn.apply(undefined, args) : curry.bind.apply(curry, [null, fn].concat(args));
  };

  var selectMultiFromDocument = selectMultiple(document);
  var flowers = selectMultiFromDocument('.cls-186', '.cls-186');
  var peak = selectMultiFromDocument('.cls-182', '.cls-188');
  var clouds = selector('g#clouds');
  console.log(clouds);

  var flowersArray = selector('.cls-186');
  var yellowFlowersArray = selector('.cls-187');
  // const flowers = $selector('.cls-186', '.cls-187');
  // console.log(flowers);

  function clearStage() {
    var clearTl = new TimelineMax();

    clearTl.set(flowersArray, { autoAlpha: 0 }).set(yellowFlowersArray, { autoAlpha: 0 }).set(clouds, { left: -100, opacity: 0 });

    return clearTl;
  }

  function enterFloorVegetation() {
    var enterFloorVegetationTl = new TimelineMax();
    enterFloorVegetationTl.fromTo(flowersArray, 1, { autoAlpha: 0, scaleY: 0.2, transformOrigin: 'center center' }, { autoAlpha: 1, scaleY: 1, transformOrigin: 'center center', ease: Back.easeInOut, onComplete: startBlinking }).fromTo(yellowFlowersArray, 1, { autoAlpha: 0, scaleX: 0.2, transformOrigin: 'center center' }, { autoAlpha: 1, scaleX: 1, transformOrigin: 'center center', ease: Back.easeInOut }, "-=0.9");

    return enterFloorVegetationTl;
  }

  var remove = function remove(count) {
    return function (start) {
      return function (arr) {
        // create a copy of the original array
        // now you're not fucking with the original when you
        // mutate the shit out of the data
        var arrCopy = arr.slice();

        // NOW MUTATE THIS BITCH
        var thisisWhatIsSpliceOut = arrCopy.splice(start, count);

        // this now no longer has the spliced out item, we want this
        var whatRemains = arrCopy;

        // This seems confusing because arrCopy is mutated by
        // the dangerous mutating function splcie
        return [thisisWhatIsSpliceOut, whatRemains];
      };
    };
  };

  var remove1 = remove(1);
  // Not pure
  var remove1RandomItem = function remove1RandomItem(arr) {
    return remove1(Math.floor(Math.random() * arr.length))(arr);
  };
  // Not pure
  var shuffle = function shuffle(arr) {
    var tempArr = arr;
    var removedItem = void 0;
    return arr.reduce(function (acc, item) {
      var _remove1RandomItem, _remove1RandomItem2;

      return (_remove1RandomItem = remove1RandomItem(tempArr), _remove1RandomItem2 = _slicedToArray(_remove1RandomItem, 2), removedItem = _remove1RandomItem2[0], tempArr = _remove1RandomItem2[1], _remove1RandomItem), acc.concat(removedItem);
    }, []);
  };

  var flowerDance = function flowerDance() {
    var removeFirstItems = function removeFirstItems(arr, count) {
      return remove(count)(0)(shuffle(flatten(arr)));
    };

    var _removeFirstItems = removeFirstItems(flowers, 10),
        _removeFirstItems2 = _slicedToArray(_removeFirstItems, 2),
        removeItems1 = _removeFirstItems2[0],
        leftOver1 = _removeFirstItems2[1];

    var _removeFirstItems3 = removeFirstItems(leftOver1, 50),
        _removeFirstItems4 = _slicedToArray(_removeFirstItems3, 2),
        removeItems2 = _removeFirstItems4[0],
        leftOver2 = _removeFirstItems4[1];

    return new TimelineMax({ repeat: -1, repeatDelay: 1 }).to(removeItems1, 2, { throwProps: { rotation: 360 } })
    // .to(removeItems1, 1, {y:0, rotation:32, x:'-=1'}, 0)
    .to(removeItems2, 2, { throwProps: { rotation: 360 } });
    // .to(removeItems2, 1, {y:0, rotation:32, x:'+=1'}, '-=0.2')
  };

  function birdsEating() {
    var birdsEatingTl = new TimelineMax({ repeat: -1, repeatDelay: 4 });
    birdsEatingTl
    // .set(peak, {rotation:12})
    // .set(peak, { rotation: 0})
    .to(peak, 1.4, { y: '+=3' }, '+=0.1').to(peak, 1.4, { y: '-=3' }, '+=0.1');

    return birdsEatingTl;
  }

  function startBlinking() {
    var birdBlinksTl = new TimelineMax({ repeat: -1, repeatDelay: 4 });

    // birdBlinksTl
    //   .set(eyes, {autoAlpha:0})
    //   .set(eyes, {autoAlpha:1}, '+=0.2')
    //   .set(eyes, {autoAlpha:0}, '+=2.2')
    //   .set(eyes, {autoAlpha:1}, '+=0.2');

    return birdBlinksTl;
  }

  //clouds moving 
  function cloudsMoving() {
    var cloudsMovingTl = new TimelineMax({ repeat: -1 });
    cloudsMovingTl.to(clouds, 0.8, { opacity: 1 })
    // .to(clouds, 1, {x:'-=1250'})
    .to(clouds, 6 + Math.random() * 8, { x: "100%", ease: Linear.easeNone }, 0);
    return cloudsMovingTl;
  }

  // flowers falling
  // (function doFallingLeaves() {
  // TweenMax.set(flowers, {y: -100, autoAlpha: 0.2});

  // TweenMax.to(flowers, 10 + Math.random()*10, {y:'+=200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: [flowers] });
  // // TweenMax.to("#redLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: ["#redLeaf"] });
  // // TweenMax.to("#orangeLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone,  onComplete: doneFalling, onCompleteParams: ["#orangeLeaf"] });

  // function doneFalling(leafId) {
  //   var range = Math.random() * 800;
  //   range = range - 400;

  //   TweenMax.set(leafId, {y: -100, x: range, autoAlpha: 0.2, rotation: Math.random()*360});
  //   TweenMax.to(leafId, 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: [leafId] });
  // }

  // })();


  //eyes blink

  // function eyesBlink() {
  //   const eyesBlinkTl = new TimelineMax();
  //   eyesBlinkTl
  // }


  function go() {
    console.log('hey...');
    var masterTl = new TimelineMax();
    masterTl
    // .add(clearStage(), 'scene-clear-stage')
    .add(enterFloorVegetation(), 'scene-floor-vegetation')
    // .add(birdsEating(), "birds-eating")
    .add(cloudsMoving(), 'clouds-moving').add(flowerDance(), 0);
  }

  go();
};

// function startBlinking() {
//   var birdBlinksTl = new TimelineMax({repeat:-1, repeatDelay: 4});

//   birdBlinksTl
//     .set($birdEyes, {autoAlpha:0})
//     .set($birdEyes, {autoAlpha:1}, '+=0.2')
//     .set($birdEyes, {autoAlpha:0}, '+=1.2')
//     .set($birdEyes, {autoAlpha:1}, '+=0.2');

// }


document.addEventListener('DOMContentLoaded', main);
},{"dope":10}],17:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57118' + '/');
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
},{}]},{},[17,3])
//# sourceMappingURL=/app.3ed94a0c.map
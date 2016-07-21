(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.infinitedropdown = infinitedropdown;

	var _utils = __webpack_require__(1);

	function infinitedropdown(_ref) {
	  var _ref$selector = _ref.selector;
	  var selector = _ref$selector === undefined ? '.am-idd' : _ref$selector;
	  var _ref$data = _ref.data;
	  var data = _ref$data === undefined ? false : _ref$data;
	  var _ref$init = _ref.init;
	  var init = _ref$init === undefined ? false : _ref$init;
	  var _ref$showTooltip = _ref.showTooltip;
	  var showTooltip = _ref$showTooltip === undefined ? true : _ref$showTooltip;
	  var _ref$tooltip = _ref.tooltip;
	  var tooltip = _ref$tooltip === undefined ? '请设置提示信息' : _ref$tooltip;
	  var _ref$defaultValue = _ref.defaultValue;
	  var defaultValue = _ref$defaultValue === undefined ? false : _ref$defaultValue;
	  var _ref$className = _ref.className;
	  var className = _ref$className === undefined ? '' : _ref$className;
	  var _ref$callback = _ref.callback;
	  var callback = _ref$callback === undefined ? false : _ref$callback;


	  if (!selector || !data || !init) {
	    console.log('configuration');
	  }
	  var iddNode = document.querySelector(selector);
	  var allSelect = []; // for storing selected data

	  var first = (0, _utils.loop)(init, data); // get initialization
	  var initNode = void 0; // init first node
	  first.unshift([tooltip, 1]);

	  if (!defaultValue && (0, _utils.dataCheck)(first, 'array')) {
	    initNode = (0, _utils.create)(init, first, iddNode, className);
	  } else if ((0, _utils.dataCheck)(defaultValue, 'array')) {
	    var firstIndex = void 0;
	    initNode = (0, _utils.create)(defaultValue[0], first, iddNode, className);
	    firstIndex = (0, _utils.getIndex)(defaultValue[0], init, data);
	    initNode.selectedIndex = firstIndex;
	    var values = {};
	    values.value = defaultValue[0];
	    values.text = initNode.options[firstIndex].text;
	    allSelect.push(values);

	    defaultValue.forEach(function (items, i, arr) {
	      var dataBack = (0, _utils.loop)(items, data);
	      dataBack.unshift([tooltip, 1]);
	      var nodeBack = void 0;
	      var index = void 0;
	      var nextIs = arr[i + 1];
	      var values = {};

	      if (nextIs) {
	        index = (0, _utils.getIndex)(arr[i + 1], items, data);
	        nodeBack = (0, _utils.create)(nextIs, dataBack, iddNode, className);
	        nodeBack.selectedIndex = index;

	        values.value = nextIs;
	        values.text = nodeBack.options[index].text;
	        allSelect.push(values);
	        console.log(allSelect);
	      } else {
	        (0, _utils.create)('init', dataBack, iddNode, className);
	      }
	    });
	  }

	  /**
	   * [when selected, trigger render function]
	   * @param  {[type]} event [description]
	   * @return {[Array]}       [the selects's data]
	   */
	  function render(event) {
	    var target = event.target || event.srcElement;
	    if (target.nodeName.toUpperCase() === 'SELECT') {
	      var index = target.selectedIndex;
	      var value = target.options[index].value;
	      var text = target.options[index].text;
	      console.log('当前选择: ', text);

	      var _values = {};
	      _values.value = value;
	      _values.text = text;

	      if (target.name !== 'init') {
	        (0, _utils.clean)(target.name, iddNode, allSelect);
	      }

	      target.name = value;
	      allSelect.push(_values);

	      var dataset = (0, _utils.loop)(value, data);
	      dataset.unshift([tooltip, 1]);
	      (0, _utils.create)('init', dataset, iddNode, className);

	      // callback function
	      if (callback) {
	        console.log(callback);
	        callback();
	      }
	    }

	    console.log('已选择数据: ', allSelect);
	  }

	  iddNode.addEventListener('change', render, false);

	  // public hook
	  return {
	    data: allSelect
	  };
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * get data from data , return array
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loop = loop;
	exports.create = create;
	exports.clean = clean;
	exports.dataCheck = dataCheck;
	exports.getIndex = getIndex;
	function loop(value, data) {
	  var arr = [];
	  for (var items in data[value]) {
	    arr.push([data[value][items], items]);
	  }
	  return arr;
	}

	/**
	 * [create select]
	 * @param  {[String]} name    [set select name]
	 * @param  {[Array]} optionsContent [every options content]
	 * @param  {[String]} node    [the parent node where to append node]
	 * @return {[Object]}         [return created select]
	 */
	function create(name, optionsContent, node, className) {
	  if (optionsContent.length < 2) {
	    console.log('NO INCOMING DATA');
	    return false;
	  }
	  var select = document.createElement('select');
	  var content = '';
	  select.name = name;
	  select.className = className || '';
	  for (var i = 0; i < optionsContent.length; i++) {
	    content += '<option value=' + optionsContent[i][1] + '>' + optionsContent[i][0] + '</option>';
	  }
	  select.innerHTML = content;
	  node.appendChild(select);
	  return select;
	}

	/**
	 * [clean old selected data and old select]
	 * @param  {[type]} name [description]
	 * @param  {[type]} node [description]
	 * @return {[type]}      [description]
	 */
	function clean(name, node, array) {
	  // let a = document.querySelector(`select[name=${name}]`);
	  var last = node.lastChild;
	  array.pop();
	  while (last.name !== name && last.nodeType === 1) {
	    node.removeChild(last);
	    if (last.name !== 'init') {
	      array.pop();
	    }
	    last = node.lastChild;
	  }
	  return true;
	}

	/**
	 * detect if the value is definied and type is the same as we give
	 * @param  {[**]} value [data]
	 * @param  {[String]} type  [the data type you want to check]
	 * @return {[Boolean]}
	 */
	function dataCheck(value, type) {
	  var clas = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
	  console.log(clas, '你的数据类型');
	  if (value && clas === type.toLowerCase()) {
	    return true;
	  } else {
	    console.log('默认值设置错误');
	    return false;
	  }
	}

	/**
	 * [get Index ]
	 * @param  {[NUmber/String]} code [the code of value]
	 * @param  {[type]} dataset  [description]
	 * @param  {[type]} data  [description]
	 * @return {[Number]}       [return the index number]
	 */
	function getIndex(code, dataset, data) {
	  var a = 0;
	  for (var items in data[dataset]) {
	    a++;
	    if (items == code) {
	      return a;
	    }
	  }
	  console.log('no data found');
	  return false;
	}

/***/ }
/******/ ])
});
;
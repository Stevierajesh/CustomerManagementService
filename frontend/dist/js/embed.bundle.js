/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/big-text.js/big-text.js":
/*!**********************************************!*\
  !*** ./node_modules/big-text.js/big-text.js ***!
  \**********************************************/
/***/ ((module) => {

eval("/*\nBrorlandi/big-text.js v1.0.0, 2017\nAdapted from DanielHoffmann/jquery-bigtext, v1.3.0, May 2014\nAnd from Jetroid/bigtext.js v1.0.0, September 2016\n\nUsage:\nBigText(\"#myElement\",{\n\trotateText: {Number}, (null)\n\tfontSizeFactor: {Number}, (0.8)\n\tmaximumFontSize: {Number}, (null)\n\tlimitingDimension: {String}, (\"both\")\n\thorizontalAlign: {String}, (\"center\")\n\tverticalAlign: {String}, (\"center\")\n\ttextAlign: {String}, (\"center\")\n\twhiteSpace: {String}, (\"nowrap\")\n});\n\n\nOriginal Projects: \nhttps://github.com/DanielHoffmann/jquery-bigtext\nhttps://github.com/Jetroid/bigtext.js\n\nOptions:\n\nrotateText: Rotates the text inside the element by X degrees.\n\nfontSizeFactor: This option is used to give some vertical spacing for letters that overflow the line-height (like 'g', 'Á' and most other accentuated uppercase letters). This does not affect the font-size if the limiting factor is the width of the parent div. The default is 0.8\n\nmaximumFontSize: maximum font size to use.\n\nlimitingDimension: In which dimension the font size should be limited. Possible values: \"width\", \"height\" or \"both\". Defaults to both. Using this option with values different than \"both\" overwrites the element parent width or height.\n\nhorizontalAlign: Where to align the text horizontally. Possible values: \"left\", \"center\", \"right\". Defaults to \"center\".\n\nverticalAlign: Where to align the text vertically. Possible values: \"top\", \"center\", \"bottom\". Defaults to \"center\".\n\ntextAlign: Sets the text align of the element. Possible values: \"left\", \"center\", \"right\". Defaults to \"center\". This option is only useful if there are linebreaks (<br> tags) inside the text.\n\nwhiteSpace: Sets whitespace handling. Possible values: \"nowrap\", \"pre\". Defaults to \"nowrap\". (Can also be set to enable wrapping but this doesn't work well.)\n\nBruno Orlandi - 2017\n\nCopyright (C) 2013 Daniel Hoffmann Bernardes, Ícaro Technologies\nCopyright (C) 2016 Jet Holt\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\nfunction _calculateInnerDimensions(computedStyle){\n\t//Calculate the inner width and height\n\tvar innerWidth;\n\tvar innerHeight;\n\n\tvar width = parseInt(computedStyle.getPropertyValue(\"width\"));\n\tvar height = parseInt(computedStyle.getPropertyValue(\"height\"));\n\tvar paddingLeft = parseInt(computedStyle.getPropertyValue(\"padding-left\"));\n\tvar paddingRight = parseInt(computedStyle.getPropertyValue(\"padding-right\"));\n\tvar paddingTop = parseInt(computedStyle.getPropertyValue(\"padding-top\"));\n\tvar paddingBottom = parseInt(computedStyle.getPropertyValue(\"padding-bottom\"));\n\tvar borderLeft = parseInt(computedStyle.getPropertyValue(\"border-left-width\"));\n\tvar borderRight = parseInt(computedStyle.getPropertyValue(\"border-right-width\"));\n\tvar borderTop = parseInt(computedStyle.getPropertyValue(\"border-top-width\"));\n\tvar borderBottom = parseInt(computedStyle.getPropertyValue(\"border-bottom-width\"));\n\n\t//If box-sizing is border-box, we need to subtract padding and border.\n\tvar parentBoxSizing = computedStyle.getPropertyValue(\"box-sizing\");\n\tif(parentBoxSizing == \"border-box\"){\n\t\tinnerWidth = width - (paddingLeft + paddingRight + borderLeft + borderRight);\n\t\tinnerHeight = height - (paddingTop + paddingBottom + borderTop + borderBottom);\n\t}else{\n\t\tinnerWidth = width;\n\t\tinnerHeight = height;\n\t}\n\tvar obj = {};\n\tobj[\"width\"] = innerWidth;\n\tobj[\"height\"] = innerHeight;\n\treturn obj;\n}\n\nBigText = function(element, options){\n\n\tif (typeof element === 'string') {\n\t\telement = document.querySelector(element);\n\t} else if (element.length) {\n\t\t// Support for array based queries (such as jQuery)\n\t\telement = element[0];\n\t}\n\n\tvar defaultOptions = {\n\t\trotateText: null,\n\t\tfontSizeFactor: 0.8,\n\t\tmaximumFontSize: null,\n\t\tlimitingDimension: \"both\",\n\t\thorizontalAlign: \"center\",\n\t\tverticalAlign: \"center\",\n\t\ttextAlign: \"center\",\n\t\twhiteSpace: \"nowrap\"\n\t};\n\t\n\t//Merge provided options and default options\n\toptions = options || {};\n\tfor (var opt in defaultOptions)\n\t\tif (defaultOptions.hasOwnProperty(opt) && !options.hasOwnProperty(opt))\n\t\t\toptions[opt] = defaultOptions[opt];\n\t\n\t//Get variables which we will reference frequently\n\tvar style = element.style;\n\tvar computedStyle = document.defaultView.getComputedStyle(element);\n\tvar parent = element.parentNode;\n\tvar parentStyle = parent.style;\n\tvar parentComputedStyle = document.defaultView.getComputedStyle(parent);\n\t\n\t//hides the element to prevent \"flashing\"\n\tstyle.visibility = \"hidden\";\n\t\n\t//Set some properties\n\tstyle.display = \"inline-block\";\n\tstyle.clear = \"both\";\n\tstyle.float = \"left\";\n\tstyle.fontSize = (1000 * options.fontSizeFactor) + \"px\";\n\tstyle.lineHeight = \"1000px\";\n\tstyle.whiteSpace = options.whiteSpace;\n\tstyle.textAlign = options.textAlign;\n\tstyle.position = \"relative\";\n\tstyle.padding = 0;\n\tstyle.margin = 0;\n\tstyle.left = \"50%\";\n\tstyle.top = \"50%\";\n\n\t//Get properties of parent to allow easier referencing later.\n\tvar parentPadding = {\n\t\ttop: parseInt(parentComputedStyle.getPropertyValue(\"padding-top\")),\n\t\tright: parseInt(parentComputedStyle.getPropertyValue(\"padding-right\")),\n\t\tbottom: parseInt(parentComputedStyle.getPropertyValue(\"padding-bottom\")),\n\t\tleft: parseInt(parentComputedStyle.getPropertyValue(\"padding-left\")),\n\t};\n\tvar parentBorder = {\n\t\ttop: parseInt(parentComputedStyle.getPropertyValue(\"border-top\")),\n\t\tright: parseInt(parentComputedStyle.getPropertyValue(\"border-right\")),\n\t\tbottom: parseInt(parentComputedStyle.getPropertyValue(\"border-bottom\")),\n\t\tleft: parseInt(parentComputedStyle.getPropertyValue(\"border-left\")),\n\t};\n\n\t//Calculate the parent inner width and height\n\tvar parentInnerDimensions = _calculateInnerDimensions(parentComputedStyle);\n\tvar parentInnerWidth = parentInnerDimensions[\"width\"];\n\tvar parentInnerHeight = parentInnerDimensions[\"height\"];\n\t\n\tvar box = {\n\t\twidth: element.offsetWidth, //Note: This is slightly larger than the jQuery version\n\t\theight: element.offsetHeight,\n\t};\n\n\t\n\tif (options.rotateText !== null) {\n\t\tif (typeof options.rotateText !== \"number\")\n\t\t\tthrow \"bigText error: rotateText value must be a number\";\n\t\tvar rotate= \"rotate(\" + options.rotateText + \"deg)\";\n\t\tstyle.webkitTransform = rotate;\n\t\tstyle.msTransform = rotate;\n\t\tstyle.MozTransform = rotate;\n\t\tstyle.OTransform = rotate;\n\t\tstyle.transform = rotate;\n\t\t//calculating bounding box of the rotated element\n\t\tvar sine = Math.abs(Math.sin(options.rotateText * Math.PI / 180));\n\t\tvar cosine = Math.abs(Math.cos(options.rotateText * Math.PI / 180));\n\t\tbox.width = element.offsetWidth * cosine + element.offsetHeight * sine;\n\t\tbox.height = element.offsetWidth * sine + element.offsetHeight * cosine;\n\t}\n\t\n\tvar widthFactor = (parentInnerWidth - parentPadding.left - parentPadding.right) / box.width;\n\tvar heightFactor = (parentInnerHeight - parentPadding.top - parentPadding.bottom) / box.height;\n\tvar lineHeight;\n\n\tif (options.limitingDimension.toLowerCase() === \"width\") {\n\t\tlineHeight= Math.floor(widthFactor * 1000);\n\t\tparentStyle.height = lineHeight + \"px\";\n\t} else if (options.limitingDimension.toLowerCase() === \"height\") {\n\t\tlineHeight= Math.floor(heightFactor * 1000);\n\t} else if (widthFactor < heightFactor)\n\t\tlineHeight= Math.floor(widthFactor * 1000);\n\telse if (widthFactor >= heightFactor)\n\t\tlineHeight= Math.floor(heightFactor * 1000);\n\n\tvar fontSize = lineHeight * options.fontSizeFactor;\n\tif (options.maximumFontSize !== null && fontSize > options.maximumFontSize) {\n\t\tfontSize = options.maximumFontSize;\n\t\tlineHeight = fontSize / options.fontSizeFactor;\n\t}\n\n\tstyle.fontSize = Math.floor(fontSize) + \"px\";\n\tstyle.lineHeight = Math.ceil(lineHeight)  + \"px\";\n\tstyle.marginBottom = \"0px\";\n\tstyle.marginRight = \"0px\";\n\n\tif (options.limitingDimension.toLowerCase() === \"height\") {\n\t\t//this option needs the font-size to be set already so computedStyle.getPropertyValue(\"width\") returns the right size\n\t\t//this +4 is to compensate the rounding erros that can occur due to the calls to Math.floor in the centering code\n\t\tparentStyle.width = (parseInt(computedStyle.getPropertyValue(\"width\")) + 4) + \"px\";\n\t}\n\n\t//Calculate the inner width and height\n\tvar innerDimensions = _calculateInnerDimensions(computedStyle);\n\tvar innerWidth = innerDimensions[\"width\"];\n\tvar innerHeight = innerDimensions[\"height\"];\n\n\tswitch(options.verticalAlign.toLowerCase()) {\n\t\tcase \"top\":\n\t\t\tstyle.top = \"0%\";\n\t\tbreak;\n\t\tcase \"bottom\":\n\t\t\tstyle.top = \"100%\";\n\t\t\tstyle.marginTop = Math.floor(-innerHeight) + \"px\";\n\t\tbreak;\n\t\tdefault:\n\t\t\tstyle.marginTop = Math.floor((-innerHeight / 2)) + \"px\";\n\t\tbreak;\n\t}\n\n\tswitch(options.horizontalAlign.toLowerCase()) {\n\t\tcase \"left\":\n\t\t\tstyle.left = \"0%\";\n\t\tbreak;\n\t\tcase \"right\":\n\t\t\tstyle.left = \"100%\";\n\t\t\tstyle.marginLeft = Math.floor(-innerWidth) + \"px\";\n\t\tbreak;\n\t\tdefault:\n\t\t\tstyle.marginLeft = Math.floor((-innerWidth / 2)) + \"px\";\n\t\tbreak;\n\t}\n\n\t//shows the element after the work is done\n\tstyle.visibility = \"visible\";\n\n\treturn element;\n}\n\nmodule.exports = BigText;\n\n//# sourceURL=webpack://trentstotalautocare/./node_modules/big-text.js/big-text.js?");

/***/ }),

/***/ "./src/embed.js":
/*!**********************!*\
  !*** ./src/embed.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var big_text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-text.js */ \"./node_modules/big-text.js/big-text.js\");\n/* harmony import */ var big_text_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_text_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nbig_text_js__WEBPACK_IMPORTED_MODULE_0___default()(\".cal-day span\");\n\n//# sourceURL=webpack://trentstotalautocare/./src/embed.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/embed.js");
/******/ 	
/******/ })()
;
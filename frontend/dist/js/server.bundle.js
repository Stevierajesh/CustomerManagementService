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

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { MongoClient, ServerApiVersion } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'mongodb'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst uri = 'mongodb+srv://stevieisrajesh:<QSdHeknDQkI8SNq5>@trentweb.5yfn5.mongodb.net/?retryWrites=true&w=majority&appName=TrentWEB';\n\n\n// Create a MongoClient with a MongoClientOptions object to set the Stable API version\nconst client = new MongoClient(uri, {\n    serverApi: {\n      version: ServerApiVersion.v1,\n      strict: true,\n      deprecationErrors: true,\n    }\n  });\n  async function run() {\n    try {\n      // Connect the client to the server\t(optional starting in v4.7)\n      await client.connect();\n      // Send a ping to confirm a successful connection\n      await client.db(\"admin\").command({ ping: 1 });\n      console.log(\"Pinged your deployment. You successfully connected to MongoDB!\");\n    } finally {\n      // Ensures that the client will close when you finish/error\n      await client.close();\n    }\n  }\n  run().catch(console.dir);\n\n//# sourceURL=webpack://trentstotalautocare/./src/server.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.js");
/******/ 	
/******/ })()
;
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

/***/ "./src/system.js":
/*!***********************!*\
  !*** ./src/system.js ***!
  \***********************/
/***/ (() => {

eval("(function () {\n    // Store original console methods\n    const originalConsoleError = console.error;\n    const originalConsoleLog = console.log;\n\n    // Create notification container\n    const notificationContainer = document.getElementById('error-notifications-container');\n\n    // Function to create and append notification div\n    function createNotification(message, className) {\n        const notification = document.createElement('div');\n        notification.className = className; // Use a class to style the notification\n        notification.textContent = message; // Add the message\n        notificationContainer.appendChild(notification); // Append to container\n\n        // Remove notification after 5 seconds\n        setTimeout(() => {\n            if (notification.parentNode) {\n                notificationContainer.removeChild(notification);\n            }\n        }, 5000);\n    }\n\n    // Override console.error\n    console.error = function (...args) {\n        // Call the original console.error\n        originalConsoleError.apply(console, args);\n\n        // Create and display error notification\n        const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');\n        createNotification(message, 'error-notification');\n    };\n\n    // Override console.log\n    console.log = function (...args) {\n        // Call the original console.log\n        originalConsoleLog.apply(console, args);\n\n        // Create and display log notification\n        const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');\n        createNotification(message, 'log-notification');\n    };\n})();\n\n\n//# sourceURL=webpack://trentstotalautocare/./src/system.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/system.js"]();
/******/ 	
/******/ })()
;
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\n/* harmony import */ var _book_cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book-cards.js */ \"./js/book-cards.js\");\n\n\nconst API_KEY = 'AIzaSyDi7ZqwPvQfKvBZOE75VsLXXdkGG271aZ8';\n\nconst fetchData = async (subject, startIndex) => {\n    const url = `https://www.googleapis.com/books/v1/volumes?q=\"subject:${subject}\"&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;\n    try {\n        const data = await fetch(url);\n        const response = await data.json();\n        if (response) {\n            (0,_book_cards_js__WEBPACK_IMPORTED_MODULE_0__.renderBookCards)(response, startIndex);\n        }\n    } catch (error) {\n        console.error(error.message);\n    }\n};\n\n//# sourceURL=webpack://bookshop/./js/api.js?");

/***/ }),

/***/ "./js/book-cards.js":
/*!**************************!*\
  !*** ./js/book-cards.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   booksCount: () => (/* binding */ booksCount),\n/* harmony export */   renderBookCards: () => (/* binding */ renderBookCards)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./js/api.js\");\n/* harmony import */ var _subjects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subjects.js */ \"./js/subjects.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./js/utils.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart.js */ \"./js/cart.js\");\n\n\n\n\n\nconst loadBtn = document.querySelector('.load');\nconst container = document.querySelector('.books-container');\n\nlet booksCount = 0;\n\nconst createBookCard = (book) => {\n    const inStock = book.saleInfo.listPrice;\n    const averageRating = book.volumeInfo.averageRating || 0;\n    const ratingsCount = book.volumeInfo.ratingsCount || 0;\n    const starsHTML = averageRating ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.generateStarIcons)(averageRating) : '';\n    const cart = JSON.parse(localStorage.getItem('cart')) || [];\n    const inCart = cart.some(cartItem => cartItem.title === book.volumeInfo.title);\n    return `\n        <div class=\"book-card\">\n            <img src=\"${book.volumeInfo.imageLinks?.thumbnail || '../img/default.png'}\" alt=\"${book.volumeInfo.title}\">\n            <div class=\"book-info\">\n                <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>\n                <h2>${book.volumeInfo.title}</h2>\n                <p class=\"description\">${book.volumeInfo.description || 'No description available'}</p>\n                ${averageRating && ratingsCount ? `\n                <div class=\"rating\">\n                    <div>${starsHTML}</div>\n                    <p>${ratingsCount} review</p>\n                </div>\n                ` : ''}\n                <h3>${inStock?.amount ? `${inStock.currencyCode} ${inStock.amount}` : ''}</h3>\n                <button class=\"button bookCardBtn${!inStock ? ` disabled` : ''} ${inCart ? 'inCart' : ''}\">\n                    ${!inStock ? `Out of stock` : inCart ? 'In the cart' : 'Buy Now'}\n                </button>\n            </div>\n        </div>\n    `;\n};\n\nconst renderBookCards = (data, startIndex) => {\n    booksCount = startIndex;\n    booksCount === 0 ? container.innerHTML = '' : container.removeChild(loadBtn);\n    data.items.forEach(book => {\n        const bookCardHTML = createBookCard(book);\n        container.innerHTML += bookCardHTML;\n    });\n    container.appendChild(loadBtn);\n    (0,_cart_js__WEBPACK_IMPORTED_MODULE_3__.updateCartCounter)();\n};\n\nloadBtn.addEventListener('click', () => {\n    booksCount += 6;\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchData)(_subjects_js__WEBPACK_IMPORTED_MODULE_1__.currentSubject, booksCount);\n});\n\ncontainer.addEventListener('click', _cart_js__WEBPACK_IMPORTED_MODULE_3__.handleCart);\n\n//# sourceURL=webpack://bookshop/./js/book-cards.js?");

/***/ }),

/***/ "./js/cart.js":
/*!********************!*\
  !*** ./js/cart.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleCart: () => (/* binding */ handleCart),\n/* harmony export */   updateCartCounter: () => (/* binding */ updateCartCounter)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./js/utils.js\");\n\n\nconst cartCounter = document.querySelector('.cart-counter');\n\nconst handleCart = (event) => {\n    if (event.target.classList.contains('bookCardBtn') && !event.target.classList.contains('disabled')) {\n        const bookCard = event.target.closest('.book-card');\n        const bookTitle = bookCard.querySelector('h2').textContent;\n        event.target.classList.toggle('inCart');\n\n        let cart = JSON.parse(localStorage.getItem('cart')) || [];\n\n        if (event.target.classList.contains('inCart')) {\n            event.target.textContent = 'In the cart';\n            const bookInfo = {\n                title: bookTitle,\n                authors: bookCard.querySelector('p').textContent,\n                price: bookCard.querySelector('h3').textContent\n            };\n            const bookExists = cart.some(book => book.title === bookTitle);\n            if (!bookExists) {\n                cart.push(bookInfo);\n            }\n        } else {\n            event.target.textContent = 'Buy Now';\n            cart = cart.filter(book => book.title !== bookTitle);\n        }\n\n        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.manageLocalStorage)(cart);\n        updateCartCounter();\n    }\n};\n\nconst updateCartCounter = () => {\n    const cart = JSON.parse(localStorage.getItem('cart')) || [];\n    cartCounter.textContent = cart.length;\n    cartCounter.style.display = cart.length > 0 ? 'block' : 'none';\n};\n\n//# sourceURL=webpack://bookshop/./js/cart.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./js/api.js\");\n/* harmony import */ var _subjects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subjects.js */ \"./js/subjects.js\");\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider.js */ \"./js/slider.js\");\n/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/styles.scss */ \"./css/styles.scss\");\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchData)('Architecture', 0);\n    (0,_subjects_js__WEBPACK_IMPORTED_MODULE_1__.getSubjects)();\n    (0,_slider_js__WEBPACK_IMPORTED_MODULE_2__.initializeSlider)();\n    (0,_subjects_js__WEBPACK_IMPORTED_MODULE_1__.handleClick)();\n});\n\n//# sourceURL=webpack://bookshop/./js/index.js?");

/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   changeSlide: () => (/* binding */ changeSlide),\n/* harmony export */   initializeSlider: () => (/* binding */ initializeSlider),\n/* harmony export */   setData: () => (/* binding */ setData),\n/* harmony export */   updateRectangles: () => (/* binding */ updateRectangles)\n/* harmony export */ });\nlet currentIndex = 0;\nconst data = ['./img/banner.png', './img/banner 2.png', './img/banner 3.png']\n\nconst img = document.querySelector('.banner');\nconst rectangles = document.querySelectorAll('.rec');\n\n\nconst setData = (index) => {\n    img.src = data[index];\n};\n\nconst updateRectangles = () => {\n    rectangles.forEach((rectangle, index) => {\n        rectangle.classList.toggle('active', index === currentIndex);\n    });\n};\n\nconst changeSlide = () => {\n    currentIndex = (currentIndex + 1) % data.length;\n    updateRectangles();\n    setData(currentIndex);\n};\n\nrectangles.forEach((rectangle, index) => {\n    rectangle.addEventListener('click', () => {\n        currentIndex = index;\n        updateRectangles();\n        setData(index);\n    })\n});\n\n\nconst initializeSlider = () => {\n    setData(0);\n    updateRectangles();\n    setInterval(changeSlide, 5000);\n};\n\n\n\n//# sourceURL=webpack://bookshop/./js/slider.js?");

/***/ }),

/***/ "./js/subjects.js":
/*!************************!*\
  !*** ./js/subjects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   currentSubject: () => (/* binding */ currentSubject),\n/* harmony export */   getSubjects: () => (/* binding */ getSubjects),\n/* harmony export */   handleClick: () => (/* binding */ handleClick)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./js/api.js\");\n\n\nconst subjectsData = ['Architecture', 'Art & Fashion', 'Biography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Food & Drink',\n    'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel & Maps'\n]\n\nconst subjectsWrap = document.querySelector('.subjects');\nlet currentSubject = 'Architecture';\n\nconst getSubjects = () => {\n    subjectsWrap.innerHTML = subjectsData.map((item, index) => {\n        const active = index === 0 ? ' active' : '';\n        return `<li class='subject${active}'>${item}</li>`;\n    }).join('');\n};\n\nconst updateSubject = (subjects) => {\n    subjects.forEach((item, index) => {\n        item.classList.toggle('active', subjectsData[index] === currentSubject);\n    });\n\n};\n\nconst handleClick = () => {\n    const subjects = document.querySelectorAll('.subject');\n    subjects.forEach((item, index) => {\n        item.addEventListener('click', () => {\n            currentSubject = subjectsData[index];\n            updateSubject(subjects);\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchData)(currentSubject, 0);\n        })\n    });\n    \n};\n\n\n\n//# sourceURL=webpack://bookshop/./js/subjects.js?");

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateStarIcons: () => (/* binding */ generateStarIcons),\n/* harmony export */   manageLocalStorage: () => (/* binding */ manageLocalStorage)\n/* harmony export */ });\nconst generateStarIcons = (averageRating) => {\n    const fullStars = Math.floor(averageRating);\n    const halfStar = averageRating % 1 !== 0;\n    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);\n    let starsHTML = '';\n    for (let i = 0; i < fullStars; i++) {\n        starsHTML += '<i class=\"full-star fas fa-star\"></i>';\n    }\n    if (halfStar) {\n        starsHTML += '<i class=\"half-star fas fa-star-half-alt\"></i>';\n    }\n    for (let i = 0; i < emptyStars; i++) {\n        starsHTML += '<i class=\"empty-star fas fa-star\"></i>';\n    }\n    return starsHTML;\n};\n\nconst manageLocalStorage = (cart) => {\n    localStorage.setItem('cart', JSON.stringify(cart));\n};\n\n//# sourceURL=webpack://bookshop/./js/utils.js?");

/***/ }),

/***/ "./css/styles.scss":
/*!*************************!*\
  !*** ./css/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./css/styles.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;
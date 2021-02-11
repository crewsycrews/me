(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/animations.ts":
/*!*******************************!*\
  !*** ./src/app/animations.ts ***!
  \*******************************/
/*! exports provided: Blinking, cubeTransitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blinking", function() { return Blinking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubeTransitions", function() { return cubeTransitions; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");

var Blinking = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('Blinking', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('lightGreen', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        textShadow: '0px 0px 25px rgba(40, 210, 40, 0.9)'
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('lightRed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        textShadow: '0px 0px 25px rgba(210, 40, 40, 0.9)'
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('lightYellow', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        textShadow: '0px 0px 25px rgba(210, 210, 40, 0.9)'
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('lightBlue', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        textShadow: '0px 0px 25px rgba(40, 40, 210, 0.9)'
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('lightWhite', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        textShadow: '0px 0px 25px rgba(200, 200, 200, 0.9)'
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('lightGreen => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1.8s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.1)', offset: 0.05 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.9)', offset: 0.25 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 210, 40, 0.1)', offset: 0.3 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.9)', offset: 0.35 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 210, 40, 0.1)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.9)', offset: 0.55 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 210, 40, 0.1)', offset: 0.75 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.8)', offset: 0.95 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 210, 40, 0.9)', offset: 1 })
        ])),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('lightRed => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1.8s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.1)', offset: 0.05 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.9)', offset: 0.25 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(210, 40, 40, 0.1)', offset: 0.3 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.9)', offset: 0.35 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(210, 40, 40, 0.1)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.9)', offset: 0.55 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(210, 40, 40, 0.1)', offset: 0.75 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.8)', offset: 0.95 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(210, 40, 40, 0.9)', offset: 1 })
        ])),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('lightYellow => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1.8s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.1)', offset: 0.05 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.9)', offset: 0.25 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 40, 0.1)', offset: 0.3 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.9)', offset: 0.35 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 40, 0.1)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.9)', offset: 0.55 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 40, 0.1)', offset: 0.75 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.8)', offset: 0.95 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 40, 0.9)', offset: 1 })
        ])),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('lightBlue => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1.8s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.1)', offset: 0.05 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.9)', offset: 0.25 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 40, 210, 0.1)', offset: 0.3 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.9)', offset: 0.35 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 40, 210, 0.1)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.9)', offset: 0.55 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(40, 40, 210, 0.1)', offset: 0.75 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.8)', offset: 0.95 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(40, 40, 210, 0.9)', offset: 1 })
        ])),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('lightWhite => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1.8s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.1)', offset: 0.05 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.9)', offset: 0.25 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 200, 0.1)', offset: 0.3 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.9)', offset: 0.35 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 200, 0.1)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.9)', offset: 0.55 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 2px rgba(200, 200, 200, 0.1)', offset: 0.75 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.8)', offset: 0.95 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ textShadow: '0px 0px 25px rgba(200, 200, 200, 0.9)', offset: 1 })
        ])),
    ]),
]);
var cubeTransitions = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routeAnimations', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('HomePage => summary', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute'
            })
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'rotateY(0deg)',
                    'transform-origin': 'left center'
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1500ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'rotateY(270deg) translateX(-420px)',
                }))
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'rotateY(90deg) translateX(100px)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1500ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'rotateY(0deg)' }))
            ])
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('summary => HomePage', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute'
            })
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'rotateY(0deg)',
                    'transform-origin': 'right center'
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1000ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'rotateY(270deg) translateX(100px)',
                }))
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'rotateY(90deg) translateX(420px)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1000ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'rotateY(0deg)' }))
            ])
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => job', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute'
            })
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('700ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateX(-500px)',
                    opacity: '0',
                }))
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(200px)',
                    opacity: '1.0',
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('700ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0)' }))
            ])
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('job => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute'
            })
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('700ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateX(500px)',
                    opacity: '0',
                }))
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-200px)',
                    opacity: '1.0',
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('700ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0)' }))
            ])
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()),
    ])
]);


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"], data: { animation: 'HomePage' } },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<header class=\"mb-auto\"></header>\n<main role=\"main\" class=\"main\" testing>\n    <!-- [@routeAnimations]=\"prepareRoute(outlet)\" -->\n  <div class=\"cube\">\n    <router-outlet #outlet=\"outlet\">\n    </router-outlet>\n  </div>\n</main>\n<footer class=\"mt-auto\"></footer>\n\n"

/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  color: whitesmoke;\n  background-color: #0f0f0f;\n  font-family: 'Anonymous Pro', 'Fira Mono', monospace;\n  -webkit-perspective: 100%;\n          perspective: 100%;\n  -webkit-perspective-origin: 50% 400px;\n          perspective-origin: 50% 400px;\n}\n.cube {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL21lL21lL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EscURBQUE7RUFDQSwwQkFBQTtVQUFBLGtCQUFBO0VBQ0gsc0NBQUE7VUFBQSw4QkFBQTtDQ0RBO0FER0Q7RUFNSSxxQ0FBQTtVQUFBLDZCQUFBO0NDTkgiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAYmdjb2xvcjogIHJnYigxNSwxNSwxNSk7XG5cbi5tYWluIHtcbiAgICBjb2xvcjogd2hpdGVzbW9rZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAYmdjb2xvcjtcbiAgICBmb250LWZhbWlseTogJ0Fub255bW91cyBQcm8nLCAnRmlyYSBNb25vJywgbW9ub3NwYWNlO1xuICAgIHBlcnNwZWN0aXZlOiAxMDAlO1xuXHRwZXJzcGVjdGl2ZS1vcmlnaW46IDUwJSA0MDBweDtcbn1cbi5jdWJlIHtcbiAgICAvLyBkaXNwbGF5OiBmbGV4O1xuICAgIC8vIGZsZXgtd3JhcDogd3JhcDtcbiAgICAvLyB3aWR0aDogNDUlO1xuICAgIC8vIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLy8ganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbn1cbiIsIi5tYWluIHtcbiAgY29sb3I6IHdoaXRlc21va2U7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwZjBmMGY7XG4gIGZvbnQtZmFtaWx5OiAnQW5vbnltb3VzIFBybycsICdGaXJhIE1vbm8nLCBtb25vc3BhY2U7XG4gIHBlcnNwZWN0aXZlOiAxMDAlO1xuICBwZXJzcGVjdGl2ZS1vcmlnaW46IDUwJSA0MDBweDtcbn1cbi5jdWJlIHtcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        // Donno how it works with animations in Angular WTF?!
        // @HostBinding('@cubeTransitions') cubeTransitions = true;
        // @HostBinding('style.display') display = 'block';
        // @HostBinding('style.position') position = 'flex';
        this.height = document.documentElement.clientHeight;
    }
    AppComponent.prototype.prepareRoute = function (outlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")],
            animations: [
            // cubeTransitions
            ]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _main_main_component__WEBPACK_IMPORTED_MODULE_5__["MainComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/main/main.component.html":
/*!******************************************!*\
  !*** ./src/app/main/main.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@Blinking]=\"lightColor\" class=\"logo\">Danil Rodin</div>\n<div class=\"row d-none d-md-flex zsh\">\n  <span class=\"col-1\"></span>\n  <span class=\"col\">\n    <span class=\"{{ colors[k] }}\">[</span>~/Crewsy/Crews<span\n      class=\"{{ colors[k] }}\"\n      >] [</span\n    >main<span class=\"{{ colors[k] }}\">]<br /></span>\n  </span>\n  <span class=\"col-1\"></span>\n</div>\n<div class=\"row d-none d-md-flex zsh\">\n  <span class=\"col-1\"></span>\n  <span class=\"col-10\">\n    <span class=\"text-left\">\n      <span class=\"{{ classForText }} text \">\n        {{ textyText }}\n      </span>\n    </span>\n  </span>\n  <span class=\"col-1\"></span>\n</div>\n<a href=\"https://github.com/crewsycrews\" title=\"GitHub\" target=\"_blank\"\n  ><img src=\"assets/images/git_logo.png\" alt=\"GitHub\" class=\"icon\"\n/></a>\n<a href=\"https://ru.hexlet.io/u/casiq\" title=\"Hexlet\" target=\"_blank\"\n  ><img src=\"assets/images/hexlet_logo.png\" alt=\"Hexlet\" class=\"icon\"\n/></a>\n<a href=\"https://tele.gg/casiq\" title=\"Telegram\" target=\"_blank\"\n  ><img src=\"assets/images/telegram_logo.png\" alt=\"Telegram\" class=\"icon\"\n/></a>\n<a\n  href=\"https://www.codewars.com/users/crewsycrews/\"\n  title=\"CodeWars\"\n  target=\"_blank\"\n  ><img src=\"assets/images/codewars_logo.png\" alt=\"CodeWars\" class=\"icon\"\n/></a>\n<a href=\"https://dev.to/crewsycrews\" title=\"Dev.to\" target=\"_blank\">\n  <img\n    src=\"https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg\"\n    alt=\"Danil Rodin's DEV Profile\"\n    class=\"icon devto\"\n  />\n</a>\n<div class=\"row mt-3\">\n  <a href=\"https://crewsycrews.github.io/blog/\" class=\"col zsh\"\n    >Blog</a\n  >\n</div>\n"

/***/ }),

/***/ "./src/app/main/main.component.less":
/*!******************************************!*\
  !*** ./src/app/main/main.component.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".logo {\n  font-family: 'Chakra Petch', sans-serif;\n  color: #000000;\n  font-size: 6rem;\n  text-align: center;\n}\n.zsh {\n  font-size: 1.5rem;\n  line-height: 1.2;\n  font-family: 'Source Code Pro';\n}\n.Red {\n  color: red;\n}\n.Blue {\n  color: blue;\n}\n.White {\n  color: white;\n}\n.Yellow {\n  color: yellow;\n}\n.Green {\n  color: green;\n}\n.text {\n  display: inline-block;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 4px solid #275c17;\n  font-size: 1.5rem;\n  opacity: 0.65;\n  margin-left: 0.5rem;\n}\n.textBlock0 {\n  width: 13ch;\n  -webkit-animation: printed-text 4s steps(12) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text 4s steps(12) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes flashin-border {\n  0% {\n    border-color: #275c17;\n  }\n  50% {\n    border-color: transparent;\n  }\n  100% {\n    border-color: #275c17;\n  }\n}\n@keyframes flashin-border {\n  0% {\n    border-color: #275c17;\n  }\n  50% {\n    border-color: transparent;\n  }\n  100% {\n    border-color: #275c17;\n  }\n}\n@-webkit-keyframes printed-text {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 13ch;\n  }\n}\n@keyframes printed-text {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 13ch;\n  }\n}\n.textBlock1 {\n  width: 17ch;\n  -webkit-animation: printed-text1 5s steps(17) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text1 5s steps(17) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes printed-text1 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 17ch;\n  }\n}\n@keyframes printed-text1 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 17ch;\n  }\n}\n.textBlock2 {\n  width: 9ch;\n  -webkit-animation: printed-text2 4s steps(9) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text2 4s steps(9) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes printed-text2 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 9ch;\n  }\n}\n@keyframes printed-text2 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 9ch;\n  }\n}\n.commonBlock {\n  display: flex;\n  flex-wrap: wrap;\n  width: 840px;\n  align-items: center;\n  justify-content: center;\n  margin: 20px 0px;\n}\nnav {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  margin: 2% 0;\n}\nnav a {\n  display: block;\n  padding: 0.2em 0.4em;\n  background-color: #565656;\n  color: white;\n  text-decoration: none;\n  box-shadow: 1px 1px 5px 0px #565656;\n  margin-right: 5px;\n  margin-left: 5px;\n  text-align: center;\n}\nnav a:first-child {\n  text-align: right;\n}\nnav a:last-child {\n  text-align: left;\n}\n.icon {\n  width: 3rem;\n  height: 3rem;\n  margin: 0 5px 0;\n  opacity: 0.3;\n  transition: -webkit-transform 0.15s;\n  transition: transform 0.15s;\n  transition: transform 0.15s, -webkit-transform 0.15s;\n}\n.devto {\n  -webkit-filter: invert(1);\n          filter: invert(1);\n}\n.icon:hover {\n  -webkit-transform: scale(1.25, 1.25);\n          transform: scale(1.25, 1.25);\n  opacity: 0.7;\n  transition: -webkit-transform 0.15s;\n  transition: transform 0.15s;\n  transition: transform 0.15s, -webkit-transform 0.15s;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL21lL21lL3NyYy9hcHAvbWFpbi9tYWluLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9tYWluL21haW4uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDSSx3Q0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0NDRkg7QURLRDtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQkFBQTtDQ0hIO0FES0Q7RUFDSSxXQUFBO0NDSEg7QURLRDtFQUNJLFlBQUE7Q0NISDtBREtEO0VBQ0ksYUFBQTtDQ0hIO0FES0Q7RUFDSSxjQUFBO0NDSEg7QURLRDtFQUNJLGFBQUE7Q0NISDtBREtEO0VBQ0ksc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtDQ0hIO0FES0Q7RUFDSSxZQUFBO0VBQ0EsZ0dBQUE7VUFBQSx3RkFBQTtDQ0hIO0FET0Q7RUFDSTtJQUNFLHNCQUFBO0dDTEg7RURPQztJQUNFLDBCQUFBO0dDTEg7RURPQztJQUNFLHNCQUFBO0dDTEg7Q0FDRjtBREpEO0VBQ0k7SUFDRSxzQkFBQTtHQ0xIO0VET0M7SUFDRSwwQkFBQTtHQ0xIO0VET0M7SUFDRSxzQkFBQTtHQ0xIO0NBQ0Y7QURPRDtFQUNBO0lBQ0ksVUFBQTtHQ0xEO0VET0g7SUFDSSxZQUFBO0dDTEQ7Q0FDRjtBREREO0VBQ0E7SUFDSSxVQUFBO0dDTEQ7RURPSDtJQUNJLFlBQUE7R0NMRDtDQUNGO0FET0Q7RUFDSSxZQUFBO0VBQ0EsaUdBQUE7VUFBQSx5RkFBQTtDQ0xIO0FEU0Q7RUFDQTtJQUNJLFVBQUE7R0NQRDtFRFNIO0lBQ0ksWUFBQTtHQ1BEO0NBQ0Y7QURDRDtFQUNBO0lBQ0ksVUFBQTtHQ1BEO0VEU0g7SUFDSSxZQUFBO0dDUEQ7Q0FDRjtBRFNEO0VBQ0ksV0FBQTtFQUNBLGdHQUFBO1VBQUEsd0ZBQUE7Q0NQSDtBRFdEO0VBQ0E7SUFDSSxVQUFBO0dDVEQ7RURXSDtJQUNJLFdBQUE7R0NURDtDQUNGO0FER0Q7RUFDQTtJQUNJLFVBQUE7R0NURDtFRFdIO0lBQ0ksV0FBQTtHQ1REO0NBQ0Y7QURZRDtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7Q0NWSDtBRFlEO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBRUEsb0JBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7Q0NYSDtBRGFEO0VBQ0ksZUFBQTtFQUNBLHFCQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFFQSxtQkFBQTtDQ1pIO0FEYUc7RUFDSSxrQkFBQTtDQ1hQO0FEYUc7RUFDSSxpQkFBQTtDQ1hQO0FEZUQ7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQUEsNEJBQUE7RUFBQSxxREFBQTtDQ2JIO0FEZUQ7RUFDSSwwQkFBQTtVQUFBLGtCQUFBO0NDYkg7QURlRDtFQUNJLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFBQSw0QkFBQTtFQUFBLHFEQUFBO0NDYkgiLCJmaWxlIjoic3JjL2FwcC9tYWluL21haW4uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA6aG9zdCB7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDEwMHB4KTtcbi8vIH1cbi5sb2dvIHtcbiAgICBmb250LWZhbWlseTogJ0NoYWtyYSBQZXRjaCcsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHJnYigwLCAwLCAwKTtcbiAgICBmb250LXNpemU6IDZyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIC8vIHRleHQtc2hhZG93OjBweCAwcHggMjBweCByZ2JhKDE2OCwgMTY2LCA0NiwgMC44KTtcbn1cbi56c2gge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgZm9udC1mYW1pbHk6ICdTb3VyY2UgQ29kZSBQcm8nO1xufVxuLlJlZCB7XG4gICAgY29sb3I6IHJlZDtcbn1cbi5CbHVlIHtcbiAgICBjb2xvcjogYmx1ZTtcbn1cbi5XaGl0ZSB7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuLlllbGxvdyB7XG4gICAgY29sb3I6IHllbGxvdztcbn1cbi5HcmVlbiB7XG4gICAgY29sb3I6IGdyZWVuO1xufVxuLnRleHQge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgcmdiKDM5LCA5MiwgMjMpO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIG9wYWNpdHk6IDAuNjU7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cbi50ZXh0QmxvY2swIHtcbiAgICB3aWR0aDogMTNjaDtcbiAgICBhbmltYXRpb246IHByaW50ZWQtdGV4dCA0cyBzdGVwcygxMikgaW5maW5pdGUsIFxuICAgICAgICAgICAgICAgIGZsYXNoaW4tYm9yZGVyIC43NXMgc3RlcC1zdGFydCBcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgZmxhc2hpbi1ib3JkZXJ7XG4gICAgMCV7XG4gICAgICBib3JkZXItY29sb3I6ICByZ2IoMzksIDkyLCAyMyk7XG4gICAgfVxuICAgIDUwJXtcbiAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgIDEwMCV7XG4gICAgICBib3JkZXItY29sb3I6ICByZ2IoMzksIDkyLCAyMyk7XG4gICAgfVxuICB9XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dHtcbmZyb20ge1xuICAgIHdpZHRoOiAwJTtcbn1cbjM3JSB7XG4gICAgd2lkdGg6IDEzY2g7XG59XG59XG4udGV4dEJsb2NrMSB7XG4gICAgd2lkdGg6IDE3Y2g7XG4gICAgYW5pbWF0aW9uOiBwcmludGVkLXRleHQxIDVzIHN0ZXBzKDE3KSBpbmZpbml0ZSwgXG4gICAgICAgICAgICAgICAgZmxhc2hpbi1ib3JkZXIgLjc1cyBzdGVwLXN0YXJ0IFxuICAgICAgICAgICAgICAgIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBwcmludGVkLXRleHQxe1xuZnJvbSB7XG4gICAgd2lkdGg6IDAlO1xufVxuMzclIHtcbiAgICB3aWR0aDogMTdjaDtcbn1cbn1cbi50ZXh0QmxvY2syIHtcbiAgICB3aWR0aDogOWNoO1xuICAgIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0MiA0cyBzdGVwcyg5KSBpbmZpbml0ZSwgXG4gICAgICAgICAgICAgICAgZmxhc2hpbi1ib3JkZXIgLjc1cyBzdGVwLXN0YXJ0IFxuICAgICAgICAgICAgICAgIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBwcmludGVkLXRleHQye1xuZnJvbSB7XG4gICAgd2lkdGg6IDAlO1xufVxuMzclIHtcbiAgICB3aWR0aDogOWNoO1xufVxufVxuXG4uY29tbW9uQmxvY2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIHdpZHRoOiA4NDBweDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIG1hcmdpbjogMjBweCAwcHg7XG59XG5uYXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIC8vIHdpZHRoOiA4NDBweDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIG1hcmdpbjogMiUgMDtcbn1cbm5hdiBhIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiAwLjJlbSAwLjRlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTY1NjU2O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4ICM1NjU2NTY7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAvLyB3aWR0aDogMTB2bWluO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgfVxufVxuXG4uaWNvbiB7XG4gICAgd2lkdGg6IDNyZW07XG4gICAgaGVpZ2h0OiAzcmVtO1xuICAgIG1hcmdpbjogMCA1cHggMDtcbiAgICBvcGFjaXR5OiAwLjM7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzO1xufVxuLmRldnRvIHtcbiAgICBmaWx0ZXI6IGludmVydCgxKTtcbn1cbi5pY29uOmhvdmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUsMS4yNSk7XG4gICAgb3BhY2l0eTogMC43O1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcbn0iLCIubG9nbyB7XG4gIGZvbnQtZmFtaWx5OiAnQ2hha3JhIFBldGNoJywgc2Fucy1zZXJpZjtcbiAgY29sb3I6ICMwMDAwMDA7XG4gIGZvbnQtc2l6ZTogNnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnpzaCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICBmb250LWZhbWlseTogJ1NvdXJjZSBDb2RlIFBybyc7XG59XG4uUmVkIHtcbiAgY29sb3I6IHJlZDtcbn1cbi5CbHVlIHtcbiAgY29sb3I6IGJsdWU7XG59XG4uV2hpdGUge1xuICBjb2xvcjogd2hpdGU7XG59XG4uWWVsbG93IHtcbiAgY29sb3I6IHllbGxvdztcbn1cbi5HcmVlbiB7XG4gIGNvbG9yOiBncmVlbjtcbn1cbi50ZXh0IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBib3JkZXItcmlnaHQ6IDRweCBzb2xpZCAjMjc1YzE3O1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgb3BhY2l0eTogMC42NTtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cbi50ZXh0QmxvY2swIHtcbiAgd2lkdGg6IDEzY2g7XG4gIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0IDRzIHN0ZXBzKDEyKSBpbmZpbml0ZSwgZmxhc2hpbi1ib3JkZXIgMC43NXMgc3RlcC1zdGFydCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgZmxhc2hpbi1ib3JkZXIge1xuICAwJSB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMjc1YzE3O1xuICB9XG4gIDUwJSB7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuICAxMDAlIHtcbiAgICBib3JkZXItY29sb3I6ICMyNzVjMTc7XG4gIH1cbn1cbkBrZXlmcmFtZXMgcHJpbnRlZC10ZXh0IHtcbiAgZnJvbSB7XG4gICAgd2lkdGg6IDAlO1xuICB9XG4gIDM3JSB7XG4gICAgd2lkdGg6IDEzY2g7XG4gIH1cbn1cbi50ZXh0QmxvY2sxIHtcbiAgd2lkdGg6IDE3Y2g7XG4gIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0MSA1cyBzdGVwcygxNykgaW5maW5pdGUsIGZsYXNoaW4tYm9yZGVyIDAuNzVzIHN0ZXAtc3RhcnQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dDEge1xuICBmcm9tIHtcbiAgICB3aWR0aDogMCU7XG4gIH1cbiAgMzclIHtcbiAgICB3aWR0aDogMTdjaDtcbiAgfVxufVxuLnRleHRCbG9jazIge1xuICB3aWR0aDogOWNoO1xuICBhbmltYXRpb246IHByaW50ZWQtdGV4dDIgNHMgc3RlcHMoOSkgaW5maW5pdGUsIGZsYXNoaW4tYm9yZGVyIDAuNzVzIHN0ZXAtc3RhcnQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dDIge1xuICBmcm9tIHtcbiAgICB3aWR0aDogMCU7XG4gIH1cbiAgMzclIHtcbiAgICB3aWR0aDogOWNoO1xuICB9XG59XG4uY29tbW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHdpZHRoOiA4NDBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMjBweCAwcHg7XG59XG5uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW46IDIlIDA7XG59XG5uYXYgYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwLjJlbSAwLjRlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU2NTY1NjtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJveC1zaGFkb3c6IDFweCAxcHggNXB4IDBweCAjNTY1NjU2O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxubmF2IGE6Zmlyc3QtY2hpbGQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbm5hdiBhOmxhc3QtY2hpbGQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmljb24ge1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAzcmVtO1xuICBtYXJnaW46IDAgNXB4IDA7XG4gIG9wYWNpdHk6IDAuMztcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzO1xufVxuLmRldnRvIHtcbiAgZmlsdGVyOiBpbnZlcnQoMSk7XG59XG4uaWNvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7XG4gIG9wYWNpdHk6IDAuNztcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/*!****************************************!*\
  !*** ./src/app/main/main.component.ts ***!
  \****************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animations */ "./src/app/animations.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainComponent = /** @class */ (function () {
    function MainComponent() {
        var _this = this;
        this.title = 'Madbroz';
        this.classForText = 'textBlock0';
        this.textyText = 'PHP developer';
        this.textyTexts = ['PHP developer', 'GameDev Romantic', 'ZSH lover'];
        this.lightColor = null;
        this.colors = ['Green', 'White', 'Red', 'Blue', 'Yellow'];
        this.i = 1;
        this.j = 1;
        this.k = 0;
        setTimeout(function () {
            _this.lightColor = 'lightGreen';
        }, 1);
        setInterval(function () {
            _this.colorLogoChange();
        }, 10000);
        setTimeout(function () {
            _this.colorShChange();
            setInterval(function () {
                _this.colorShChange();
            }, 10000);
        }, 11800);
        setInterval(function () {
            _this.classForText = 'textBlock' + _this.i;
            _this.textyText = _this.textyTexts[_this.i];
            _this.i++;
            if (_this.i === 3) {
                _this.i = 0;
            }
        }, 4000);
    }
    MainComponent.prototype.colorLogoChange = function () {
        this.lightColor = 'light' + this.colors[this.j];
        this.j++;
        if (this.j === 5) {
            this.j = 0;
        }
    };
    MainComponent.prototype.colorShChange = function () {
        if (this.k === 4) {
            this.k = 0;
            return;
        }
        this.k++;
    };
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/main/main.component.html"),
            styles: [__webpack_require__(/*! ../app.component.less */ "./src/app/app.component.less"), __webpack_require__(/*! ./main.component.less */ "./src/app/main/main.component.less")],
            animations: [
                _animations__WEBPACK_IMPORTED_MODULE_1__["Blinking"]
            ]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/me/me/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
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

module.exports = "<div [@Blinking]=\"lightColor\" class=\"logo\">Danil Rodin</div>\n<div class=\"row d-none d-md-flex zsh\">\n  <span class=\"col-1\"></span>\n  <span class=\"col\">\n    <span class=\"{{ colors[k] }}\">[</span>~/Crewsy/Crews<span\n      class=\"{{ colors[k] }}\"\n      >] [</span\n    >main<span class=\"{{ colors[k] }}\">]<br /></span>\n  </span>\n  <span class=\"col-1\"></span>\n</div>\n<div class=\"row d-none d-md-flex zsh\">\n  <span class=\"col-1\"></span>\n  <span class=\"col-10\">\n    <span class=\"text-left\">\n      <span class=\"{{ classForText }} text \">\n        {{ textyText }}\n      </span>\n    </span>\n  </span>\n  <span class=\"col-1\"></span>\n</div>\n<a href=\"https://github.com/crewsycrews\" title=\"GitHub\" target=\"_blank\"\n  ><img src=\"assets/images/git_logo.png\" alt=\"GitHub\" class=\"icon\"\n/></a>\n<a href=\"https://ru.hexlet.io/u/casiq\" title=\"Hexlet\" target=\"_blank\"\n  ><img src=\"assets/images/hexlet_logo.png\" alt=\"Hexlet\" class=\"icon\"\n/></a>\n<a href=\"https://tele.gg/casiq\" title=\"Telegram\" target=\"_blank\"\n  ><img src=\"assets/images/telegram_logo.png\" alt=\"Telegram\" class=\"icon\"\n/></a>\n<a\n  href=\"https://www.codewars.com/users/crewsycrews/\"\n  title=\"CodeWars\"\n  target=\"_blank\"\n  ><img src=\"assets/images/codewars_logo.png\" alt=\"CodeWars\" class=\"icon\"\n/></a>\n<a href=\"https://dev.to/crewsycrews\" title=\"Dev.to\" target=\"_blank\">\n  <img\n    src=\"https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg\"\n    alt=\"Danil Rodin's DEV Profile\"\n    class=\"icon devto\"\n  />\n</a>\n<div class=\"row mt-4\">\n  <span class=\"col\"></span>\n  <button\n    type=\"button\"\n    class=\"col-4 btn btn-outline-secondary zsh\"\n    (click)=\"redirectToBlog()\"\n  >\n    My blog\n  </button>\n  <span class=\"col\"></span>\n</div>\n"

/***/ }),

/***/ "./src/app/main/main.component.less":
/*!******************************************!*\
  !*** ./src/app/main/main.component.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".logo {\n  font-family: \"Chakra Petch\", sans-serif;\n  color: #000000;\n  font-size: 6rem;\n  text-align: center;\n}\n.zsh {\n  font-size: 1.5rem;\n  line-height: 1.2;\n  font-family: \"Source Code Pro\";\n}\n.Red {\n  color: red;\n}\n.Blue {\n  color: blue;\n}\n.White {\n  color: white;\n}\n.Yellow {\n  color: yellow;\n}\n.Green {\n  color: green;\n}\n.text {\n  display: inline-block;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 4px solid #275c17;\n  font-size: 1.5rem;\n  opacity: 0.65;\n  margin-left: 0.5rem;\n}\n.textBlock0 {\n  width: 13ch;\n  -webkit-animation: printed-text 4s steps(13) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text 4s steps(13) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes flashin-border {\n  0% {\n    border-color: #275c17;\n  }\n  50% {\n    border-color: transparent;\n  }\n  100% {\n    border-color: #275c17;\n  }\n}\n@keyframes flashin-border {\n  0% {\n    border-color: #275c17;\n  }\n  50% {\n    border-color: transparent;\n  }\n  100% {\n    border-color: #275c17;\n  }\n}\n@-webkit-keyframes printed-text {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 13ch;\n  }\n}\n@keyframes printed-text {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 13ch;\n  }\n}\n.textBlock1 {\n  width: 11ch;\n  -webkit-animation: printed-text1 5s steps(11) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text1 5s steps(11) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes printed-text1 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 11ch;\n  }\n}\n@keyframes printed-text1 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 11ch;\n  }\n}\n.textBlock2 {\n  width: 18ch;\n  -webkit-animation: printed-text2 4s steps(18) infinite, flashin-border 0.75s step-start infinite;\n          animation: printed-text2 4s steps(18) infinite, flashin-border 0.75s step-start infinite;\n}\n@-webkit-keyframes printed-text2 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 18ch;\n  }\n}\n@keyframes printed-text2 {\n  from {\n    width: 0%;\n  }\n  37% {\n    width: 18ch;\n  }\n}\n.commonBlock {\n  display: flex;\n  flex-wrap: wrap;\n  width: 840px;\n  align-items: center;\n  justify-content: center;\n  margin: 20px 0px;\n}\nnav {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  margin: 2% 0;\n}\nnav a {\n  display: block;\n  padding: 0.2em 0.4em;\n  background-color: #565656;\n  color: white;\n  text-decoration: none;\n  box-shadow: 1px 1px 5px 0px #565656;\n  margin-right: 5px;\n  margin-left: 5px;\n  text-align: center;\n}\nnav a:first-child {\n  text-align: right;\n}\nnav a:last-child {\n  text-align: left;\n}\n.icon {\n  width: 3rem;\n  height: 3rem;\n  margin: 0 5px 0;\n  opacity: 0.3;\n  transition: -webkit-transform 0.15s;\n  transition: transform 0.15s;\n  transition: transform 0.15s, -webkit-transform 0.15s;\n}\n.devto {\n  -webkit-filter: invert(1);\n          filter: invert(1);\n}\n.icon:hover {\n  -webkit-transform: scale(1.25, 1.25);\n          transform: scale(1.25, 1.25);\n  opacity: 0.7;\n  transition: -webkit-transform 0.15s;\n  transition: transform 0.15s;\n  transition: transform 0.15s, -webkit-transform 0.15s;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL21lL21lL3NyYy9hcHAvbWFpbi9tYWluLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9tYWluL21haW4uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSx3Q0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0NDRkQ7QURLRDtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQkFBQTtDQ0hEO0FES0Q7RUFDRSxXQUFBO0NDSEQ7QURLRDtFQUNFLFlBQUE7Q0NIRDtBREtEO0VBQ0UsYUFBQTtDQ0hEO0FES0Q7RUFDRSxjQUFBO0NDSEQ7QURLRDtFQUNFLGFBQUE7Q0NIRDtBREtEO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtDQ0hEO0FES0Q7RUFDRSxZQUFBO0VBQ0EsZ0dBQUE7VUFBQSx3RkFBQTtDQ0hEO0FETUQ7RUFDRTtJQUNFLHNCQUFBO0dDSkQ7RURNRDtJQUNFLDBCQUFBO0dDSkQ7RURNRDtJQUNFLHNCQUFBO0dDSkQ7Q0FDRjtBRExEO0VBQ0U7SUFDRSxzQkFBQTtHQ0pEO0VETUQ7SUFDRSwwQkFBQTtHQ0pEO0VETUQ7SUFDRSxzQkFBQTtHQ0pEO0NBQ0Y7QURNRDtFQUNFO0lBQ0UsVUFBQTtHQ0pEO0VETUQ7SUFDRSxZQUFBO0dDSkQ7Q0FDRjtBREZEO0VBQ0U7SUFDRSxVQUFBO0dDSkQ7RURNRDtJQUNFLFlBQUE7R0NKRDtDQUNGO0FETUQ7RUFDRSxZQUFBO0VBQ0EsaUdBQUE7VUFBQSx5RkFBQTtDQ0pEO0FET0Q7RUFDRTtJQUNFLFVBQUE7R0NMRDtFRE9EO0lBQ0UsWUFBQTtHQ0xEO0NBQ0Y7QURERDtFQUNFO0lBQ0UsVUFBQTtHQ0xEO0VET0Q7SUFDRSxZQUFBO0dDTEQ7Q0FDRjtBRE9EO0VBQ0UsWUFBQTtFQUNBLGlHQUFBO1VBQUEseUZBQUE7Q0NMRDtBRFFEO0VBQ0U7SUFDRSxVQUFBO0dDTkQ7RURRRDtJQUNFLFlBQUE7R0NORDtDQUNGO0FEQUQ7RUFDRTtJQUNFLFVBQUE7R0NORDtFRFFEO0lBQ0UsWUFBQTtHQ05EO0NBQ0Y7QURTRDtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7Q0NQRDtBRFNEO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBRUEsb0JBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7Q0NSRDtBRFVEO0VBQ0UsZUFBQTtFQUNBLHFCQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFFQSxtQkFBQTtDQ1REO0FEVUM7RUFDRSxrQkFBQTtDQ1JIO0FEVUM7RUFDRSxpQkFBQTtDQ1JIO0FEWUQ7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQUEsNEJBQUE7RUFBQSxxREFBQTtDQ1ZEO0FEWUQ7RUFDRSwwQkFBQTtVQUFBLGtCQUFBO0NDVkQ7QURZRDtFQUNFLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFBQSw0QkFBQTtFQUFBLHFEQUFBO0NDVkQiLCJmaWxlIjoic3JjL2FwcC9tYWluL21haW4uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA6aG9zdCB7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDEwMHB4KTtcbi8vIH1cbi5sb2dvIHtcbiAgZm9udC1mYW1pbHk6IFwiQ2hha3JhIFBldGNoXCIsIHNhbnMtc2VyaWY7XG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XG4gIGZvbnQtc2l6ZTogNnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAvLyB0ZXh0LXNoYWRvdzowcHggMHB4IDIwcHggcmdiYSgxNjgsIDE2NiwgNDYsIDAuOCk7XG59XG4uenNoIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBDb2RlIFByb1wiO1xufVxuLlJlZCB7XG4gIGNvbG9yOiByZWQ7XG59XG4uQmx1ZSB7XG4gIGNvbG9yOiBibHVlO1xufVxuLldoaXRlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuLlllbGxvdyB7XG4gIGNvbG9yOiB5ZWxsb3c7XG59XG4uR3JlZW4ge1xuICBjb2xvcjogZ3JlZW47XG59XG4udGV4dCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgcmdiKDM5LCA5MiwgMjMpO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgb3BhY2l0eTogMC42NTtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cbi50ZXh0QmxvY2swIHtcbiAgd2lkdGg6IDEzY2g7XG4gIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0IDRzIHN0ZXBzKDEzKSBpbmZpbml0ZSxcbiAgICBmbGFzaGluLWJvcmRlciAwLjc1cyBzdGVwLXN0YXJ0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBmbGFzaGluLWJvcmRlciB7XG4gIDAlIHtcbiAgICBib3JkZXItY29sb3I6IHJnYigzOSwgOTIsIDIzKTtcbiAgfVxuICA1MCUge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2IoMzksIDkyLCAyMyk7XG4gIH1cbn1cbkBrZXlmcmFtZXMgcHJpbnRlZC10ZXh0IHtcbiAgZnJvbSB7XG4gICAgd2lkdGg6IDAlO1xuICB9XG4gIDM3JSB7XG4gICAgd2lkdGg6IDEzY2g7XG4gIH1cbn1cbi50ZXh0QmxvY2sxIHtcbiAgd2lkdGg6IDExY2g7XG4gIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0MSA1cyBzdGVwcygxMSkgaW5maW5pdGUsXG4gICAgZmxhc2hpbi1ib3JkZXIgMC43NXMgc3RlcC1zdGFydCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgcHJpbnRlZC10ZXh0MSB7XG4gIGZyb20ge1xuICAgIHdpZHRoOiAwJTtcbiAgfVxuICAzNyUge1xuICAgIHdpZHRoOiAxMWNoO1xuICB9XG59XG4udGV4dEJsb2NrMiB7XG4gIHdpZHRoOiAxOGNoO1xuICBhbmltYXRpb246IHByaW50ZWQtdGV4dDIgNHMgc3RlcHMoMTgpIGluZmluaXRlLFxuICAgIGZsYXNoaW4tYm9yZGVyIDAuNzVzIHN0ZXAtc3RhcnQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dDIge1xuICBmcm9tIHtcbiAgICB3aWR0aDogMCU7XG4gIH1cbiAgMzclIHtcbiAgICB3aWR0aDogMThjaDtcbiAgfVxufVxuXG4uY29tbW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHdpZHRoOiA4NDBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMjBweCAwcHg7XG59XG5uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIC8vIHdpZHRoOiA4NDBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMiUgMDtcbn1cbm5hdiBhIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDAuMmVtIDAuNGVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTY1NjU2O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4ICM1NjU2NTY7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICAvLyB3aWR0aDogMTB2bWluO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICB9XG4gICY6bGFzdC1jaGlsZCB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxufVxuXG4uaWNvbiB7XG4gIHdpZHRoOiAzcmVtO1xuICBoZWlnaHQ6IDNyZW07XG4gIG1hcmdpbjogMCA1cHggMDtcbiAgb3BhY2l0eTogMC4zO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXM7XG59XG4uZGV2dG8ge1xuICBmaWx0ZXI6IGludmVydCgxKTtcbn1cbi5pY29uOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1LCAxLjI1KTtcbiAgb3BhY2l0eTogMC43O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXM7XG59XG4iLCIubG9nbyB7XG4gIGZvbnQtZmFtaWx5OiBcIkNoYWtyYSBQZXRjaFwiLCBzYW5zLXNlcmlmO1xuICBjb2xvcjogIzAwMDAwMDtcbiAgZm9udC1zaXplOiA2cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uenNoIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBDb2RlIFByb1wiO1xufVxuLlJlZCB7XG4gIGNvbG9yOiByZWQ7XG59XG4uQmx1ZSB7XG4gIGNvbG9yOiBibHVlO1xufVxuLldoaXRlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuLlllbGxvdyB7XG4gIGNvbG9yOiB5ZWxsb3c7XG59XG4uR3JlZW4ge1xuICBjb2xvcjogZ3JlZW47XG59XG4udGV4dCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgIzI3NWMxNztcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIG9wYWNpdHk6IDAuNjU7XG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG59XG4udGV4dEJsb2NrMCB7XG4gIHdpZHRoOiAxM2NoO1xuICBhbmltYXRpb246IHByaW50ZWQtdGV4dCA0cyBzdGVwcygxMykgaW5maW5pdGUsIGZsYXNoaW4tYm9yZGVyIDAuNzVzIHN0ZXAtc3RhcnQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIGZsYXNoaW4tYm9yZGVyIHtcbiAgMCUge1xuICAgIGJvcmRlci1jb2xvcjogIzI3NWMxNztcbiAgfVxuICA1MCUge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMjc1YzE3O1xuICB9XG59XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dCB7XG4gIGZyb20ge1xuICAgIHdpZHRoOiAwJTtcbiAgfVxuICAzNyUge1xuICAgIHdpZHRoOiAxM2NoO1xuICB9XG59XG4udGV4dEJsb2NrMSB7XG4gIHdpZHRoOiAxMWNoO1xuICBhbmltYXRpb246IHByaW50ZWQtdGV4dDEgNXMgc3RlcHMoMTEpIGluZmluaXRlLCBmbGFzaGluLWJvcmRlciAwLjc1cyBzdGVwLXN0YXJ0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBwcmludGVkLXRleHQxIHtcbiAgZnJvbSB7XG4gICAgd2lkdGg6IDAlO1xuICB9XG4gIDM3JSB7XG4gICAgd2lkdGg6IDExY2g7XG4gIH1cbn1cbi50ZXh0QmxvY2syIHtcbiAgd2lkdGg6IDE4Y2g7XG4gIGFuaW1hdGlvbjogcHJpbnRlZC10ZXh0MiA0cyBzdGVwcygxOCkgaW5maW5pdGUsIGZsYXNoaW4tYm9yZGVyIDAuNzVzIHN0ZXAtc3RhcnQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHByaW50ZWQtdGV4dDIge1xuICBmcm9tIHtcbiAgICB3aWR0aDogMCU7XG4gIH1cbiAgMzclIHtcbiAgICB3aWR0aDogMThjaDtcbiAgfVxufVxuLmNvbW1vbkJsb2NrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICB3aWR0aDogODQwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW46IDIwcHggMHB4O1xufVxubmF2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiAyJSAwO1xufVxubmF2IGEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMC4yZW0gMC40ZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NjU2NTY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBib3gtc2hhZG93OiAxcHggMXB4IDVweCAwcHggIzU2NTY1NjtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbm5hdiBhOmZpcnN0LWNoaWxkIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5uYXYgYTpsYXN0LWNoaWxkIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5pY29uIHtcbiAgd2lkdGg6IDNyZW07XG4gIGhlaWdodDogM3JlbTtcbiAgbWFyZ2luOiAwIDVweCAwO1xuICBvcGFjaXR5OiAwLjM7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcbn1cbi5kZXZ0byB7XG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xufVxuLmljb246aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUsIDEuMjUpO1xuICBvcGFjaXR5OiAwLjc7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcbn1cbiJdfQ== */"

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
        this.textyText = 'Software dev';
        this.textyTexts = ['Software dev', 'Family guy', 'Healthy lifestyle'];
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
    MainComponent.prototype.redirectToBlog = function () {
        window.location.href = "https://crewsycrews-blog.netlify.app/";
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
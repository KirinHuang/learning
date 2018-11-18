"use strict";

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

(0, _rxjs.range)(1, 200).pipe((0, _operators.filter)(x => x % 2 === 1), (0, _operators.map)(x => x + x)).subscribe(x => console.log(x));
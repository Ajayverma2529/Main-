// "use strict";

// function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

// function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var FlipDown = function () {
//   function FlipDown(uts) {
//     var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flipdown";
//     var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

//     _classCallCheck(this, FlipDown);

//     if (typeof uts !== "number") {
//       throw new Error("FlipDown: Constructor expected unix timestamp, got ".concat(_typeof(uts), " instead."));
//     }

//     if (_typeof(el) === "object") {
//       opt = el;
//       el = "flipdown";
//     }

//     this.version = "0.3.2";
//     this.initialised = false;
//     this.now = this._getTime();
//     this.epoch = uts;
//     this.countdownEnded = false;
//     this.hasEndedCallback = null;
//     this.element = document.getElementById(el);
//     this.rotors = [];
//     this.rotorLeafFront = [];
//     this.rotorLeafRear = [];
//     this.rotorTops = [];
//     this.rotorBottoms = [];
//     this.countdown = null;
//     this.daysRemaining = 0;
//     this.clockValues = {};
//     this.clockStrings = {};
//     this.clockValuesAsString = [];
//     this.prevClockValuesAsString = [];
//     this.opts = this._parseOptions(opt);

//     this._setOptions();

//     console.log("FlipDown ".concat(this.version, " (Theme: ").concat(this.opts.theme, ")"));
//   }

//   _createClass(FlipDown, [{
//     key: "start",
//     value: function start() {
//       if (!this.initialised) this._init();
//       this.countdown = setInterval(this._tick.bind(this), 1000);
//       return this;
//     }
//   }, {
//     key: "ifEnded",
//     value: function ifEnded(cb) {
//       this.hasEndedCallback = function () {
//         cb();
//         this.hasEndedCallback = null;
//       };

//       return this;
//     }
//   }, {
//     key: "_getTime",
//     value: function _getTime() {
//       return new Date().getTime() / 1000;
//     }
//   }, {
//     key: "_hasCountdownEnded",
//     value: function _hasCountdownEnded() {
//       if (this.epoch - this.now < 0) {
//         this.countdownEnded = true;

//         if (this.hasEndedCallback != null) {
//           this.hasEndedCallback();
//           this.hasEndedCallback = null;
//         }

//         return true;
//       } else {
//         this.countdownEnded = false;
//         return false;
//       }
//     }
//   }, {
//     key: "_parseOptions",
//     value: function _parseOptions(opt) {
//       var headings = ["Days", "Hours", "Minutes", "Seconds"];

//       if (opt.headings && opt.headings.length === 4) {
//         headings = opt.headings;
//       }

//       return {
//         theme: opt.hasOwnProperty("theme") ? opt.theme : "dark",
//         headings: headings
//       };
//     }
//   }, {
//     key: "_setOptions",
//     value: function _setOptions() {
//       this.element.classList.add("flipdown__theme-".concat(this.opts.theme));
//     }
//   }, {
//     key: "_init",
//     value: function _init() {
//       this.initialised = true;

//       if (this._hasCountdownEnded()) {
//         this.daysremaining = 0;
//       } else {
//         this.daysremaining = Math.floor((this.epoch - this.now) / 86400).toString().length;
//       }

//       var dayRotorCount = this.daysremaining <= 2 ? 2 : this.daysremaining;

//       for (var i = 0; i < dayRotorCount + 6; i++) {
//         this.rotors.push(this._createRotor(0));
//       }

//       var dayRotors = [];

//       for (var i = 0; i < dayRotorCount; i++) {
//         dayRotors.push(this.rotors[i]);
//       }

//       this.element.appendChild(this._createRotorGroup(dayRotors, 0));
//       var count = dayRotorCount;

//       for (var i = 0; i < 3; i++) {
//         var otherRotors = [];

//         for (var j = 0; j < 2; j++) {
//           otherRotors.push(this.rotors[count]);
//           count++;
//         }

//         this.element.appendChild(this._createRotorGroup(otherRotors, i + 1));
//       }

//       this.rotorLeafFront = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front"));
//       this.rotorLeafRear = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear"));
//       this.rotorTop = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top"));
//       this.rotorBottom = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom"));

//       this._tick();

//       this._updateClockValues(true);

//       return this;
//     }
//   }, {
//     key: "_createRotorGroup",
//     value: function _createRotorGroup(rotors, rotorIndex) {
//       var rotorGroup = document.createElement("div");
//       rotorGroup.className = "rotor-group";
//       var dayRotorGroupHeading = document.createElement("div");
//       dayRotorGroupHeading.className = "rotor-group-heading";
//       dayRotorGroupHeading.setAttribute("data-before", this.opts.headings[rotorIndex]);
//       rotorGroup.appendChild(dayRotorGroupHeading);
//       appendChildren(rotorGroup, rotors);
//       return rotorGroup;
//     }
//   }, {
//     key: "_createRotor",
//     value: function _createRotor() {
//       var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
//       var rotor = document.createElement("div");
//       var rotorLeaf = document.createElement("div");
//       var rotorLeafRear = document.createElement("figure");
//       var rotorLeafFront = document.createElement("figure");
//       var rotorTop = document.createElement("div");
//       var rotorBottom = document.createElement("div");
//       rotor.className = "rotor";
//       rotorLeaf.className = "rotor-leaf";
//       rotorLeafRear.className = "rotor-leaf-rear";
//       rotorLeafFront.className = "rotor-leaf-front";
//       rotorTop.className = "rotor-top";
//       rotorBottom.className = "rotor-bottom";
//       rotorLeafRear.textContent = v;
//       rotorTop.textContent = v;
//       rotorBottom.textContent = v;
//       appendChildren(rotor, [rotorLeaf, rotorTop, rotorBottom]);
//       appendChildren(rotorLeaf, [rotorLeafRear, rotorLeafFront]);
//       return rotor;
//     }
//   }, {
//     key: "_tick",
//     value: function _tick() {
//       this.now = this._getTime();
//       var diff = this.epoch - this.now <= 0 ? 0 : this.epoch - this.now;
//       this.clockValues.d = Math.floor(diff / 86400);
//       diff -= this.clockValues.d * 86400;
//       this.clockValues.h = Math.floor(diff / 3600);
//       diff -= this.clockValues.h * 3600;
//       this.clockValues.m = Math.floor(diff / 60);
//       diff -= this.clockValues.m * 60;
//       this.clockValues.s = Math.floor(diff);

//       this._updateClockValues();

//       this._hasCountdownEnded();
//     }
//   }, {
//     key: "_updateClockValues",
//     value: function _updateClockValues() {
//       var _this = this;

//       var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
//       this.clockStrings.d = pad(this.clockValues.d, 2);
//       this.clockStrings.h = pad(this.clockValues.h, 2);
//       this.clockStrings.m = pad(this.clockValues.m, 2);
//       this.clockStrings.s = pad(this.clockValues.s, 2);
//       this.clockValuesAsString = (this.clockStrings.d + this.clockStrings.h + this.clockStrings.m + this.clockStrings.s).split("");
//       this.rotorLeafFront.forEach(function (el, i) {
//         el.textContent = _this.prevClockValuesAsString[i];
//       });
//       this.rotorBottom.forEach(function (el, i) {
//         el.textContent = _this.prevClockValuesAsString[i];
//       });

//       function rotorTopFlip() {
//         var _this2 = this;

//         this.rotorTop.forEach(function (el, i) {
//           if (el.textContent != _this2.clockValuesAsString[i]) {
//             el.textContent = _this2.clockValuesAsString[i];
//           }
//         });
//       }

//       function rotorLeafRearFlip() {
//         var _this3 = this;

//         this.rotorLeafRear.forEach(function (el, i) {
//           if (el.textContent != _this3.clockValuesAsString[i]) {
//             el.textContent = _this3.clockValuesAsString[i];
//             el.parentElement.classList.add("flipped");
//             var flip = setInterval(function () {
//               el.parentElement.classList.remove("flipped");
//               clearInterval(flip);
//             }.bind(_this3), 500);
//           }
//         });
//       }

//       if (!init) {
//         setTimeout(rotorTopFlip.bind(this), 500);
//         setTimeout(rotorLeafRearFlip.bind(this), 500);
//       } else {
//         rotorTopFlip.call(this);
//         rotorLeafRearFlip.call(this);
//       }

//       this.prevClockValuesAsString = this.clockValuesAsString;
//     }
//   }]);

//   return FlipDown;
// }();

// function pad(n, len) {
//   n = n.toString();
//   return n.length < len ? pad("0" + n, len) : n;
// }

// function appendChildren(parent, children) {
//   children.forEach(function (el) {
//     parent.appendChild(el);
//   });
// }
"use strict";
"use strict";

var cssua = function (n, l, p) {
    var q = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,
        r = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,
        s = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,
        t = /\bsilk-accelerated=true\b/,
        u = /\bfluidapp\b/,
        v = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,
        w = /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,
        x = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,
        k = { parse: function parse(b, d) {
            var a = {};d && (a.standalone = d);b = ("" + b).toLowerCase();if (!b) return a;for (var c, e, g = b.split(/[()]/), f = 0, k = g.length; f < k; f++) {
                if (f % 2) {
                    var m = g[f].split(";");c = 0;for (e = m.length; c < e; c++) {
                        if (q.exec(m[c])) {
                            var h = RegExp.$1.split(" ").join("_"),
                                l = RegExp.$2;if (!a[h] || parseFloat(a[h]) < parseFloat(l)) a[h] = l;
                        }
                    }
                } else if (m = g[f].match(r)) for (c = 0, e = m.length; c < e; c++) {
                    h = m[c].split(/[\/\s]+/), h.length && "mozilla" !== h[0] && (a[h[0].split(" ").join("_")] = h.slice(1).join("-"));
                }
            }w.exec(b) ? (a.mobile = RegExp.$1, s.exec(b) && (delete a[a.mobile], a.blackberry = a.version || RegExp.$3 || RegExp.$2 || RegExp.$1, RegExp.$1 ? a.mobile = "blackberry" : "0.0.1" === a.version && (a.blackberry = "7.1.0.0"))) : x.exec(b) ? (a.game = RegExp.$1, c = a.game.split(" ").join("_"), a.version && !a[c] && (a[c] = a.version)) : v.exec(b) && (a.desktop = RegExp.$1);a.intel_mac_os_x ? (a.mac_os_x = a.intel_mac_os_x.split("_").join("."), delete a.intel_mac_os_x) : a.cpu_iphone_os ? (a.ios = a.cpu_iphone_os.split("_").join("."), delete a.cpu_iphone_os) : a.cpu_os ? (a.ios = a.cpu_os.split("_").join("."), delete a.cpu_os) : "iphone" !== a.mobile || a.ios || (a.ios = "1");a.opera && a.version ? (a.opera = a.version, delete a.blackberry) : t.exec(b) ? a.silk_accelerated = !0 : u.exec(b) && (a.fluidapp = a.version);a.edge && (delete a.applewebkit, delete a.safari, delete a.chrome, delete a.android);if (a.applewebkit) a.webkit = a.applewebkit, delete a.applewebkit, a.opr && (a.opera = a.opr, delete a.opr, delete a.chrome), a.safari && (a.chrome || a.crios || a.fxios || a.opera || a.silk || a.fluidapp || a.phantomjs || a.mobile && !a.ios ? (delete a.safari, a.vivaldi && delete a.chrome) : a.safari = a.version && !a.rim_tablet_os ? a.version : { 419: "2.0.4", 417: "2.0.3", 416: "2.0.2", 412: "2.0", 312: "1.3", 125: "1.2", 85: "1.0" }[parseInt(a.safari, 10)] || a.safari);else if (a.msie || a.trident) {
                if (a.opera || (a.ie = a.msie || a.rv), delete a.msie, delete a.android, a.windows_phone_os) a.windows_phone = a.windows_phone_os, delete a.windows_phone_os;else {
                    if ("wpdesktop" === a.mobile || "xblwp7" === a.mobile || "zunewp7" === a.mobile) a.mobile = "windows desktop", a.windows_phone = 9 > +a.ie ? "7.0" : 10 > +a.ie ? "7.5" : "8.0", delete a.windows_nt;
                }
            } else if (a.gecko || a.firefox) a.gecko = a.rv;a.rv && delete a.rv;a.version && delete a.version;return a;
        }, format: function format(b) {
            var d = "",
                a;for (a in b) {
                if (a && b.hasOwnProperty(a)) {
                    var c = a,
                        e = b[a],
                        c = c.split(".").join("-"),
                        g = " ua-" + c;if ("string" === typeof e) {
                        for (var e = e.split(" ").join("_").split(".").join("-"), f = e.indexOf("-"); 0 < f;) {
                            g += " ua-" + c + "-" + e.substring(0, f), f = e.indexOf("-", f + 1);
                        }g += " ua-" + c + "-" + e;
                    }d += g;
                }
            }return d;
        }, encode: function encode(b) {
            var d = "",
                a;for (a in b) {
                a && b.hasOwnProperty(a) && (d && (d += "\x26"), d += encodeURIComponent(a) + "\x3d" + encodeURIComponent(b[a]));
            }return d;
        } };k.userAgent = k.ua = k.parse(l, p);l = k.format(k.ua) + " js";n.className = n.className ? n.className.replace(/\bno-js\b/g, "") + l : l.substr(1);return k;
}(document.documentElement, navigator.userAgent, navigator.standalone);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * jquery-match-height master by @liabru
 * http://brm.io/jquery-match-height/
 * License: MIT
 */

;(function (factory) {
	// eslint-disable-line no-extra-semi
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['bower_components/jquery/jquery'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('bower_components/jquery/jquery'));
	} else {
		// Global
		factory(jQuery);
	}
})(function ($) {
	/*
 *	internal
 */

	var _previousResizeWidth = -1,
	    _updateTimeout = -1;

	/*
 *	_parse
 *	value parse utility function
 */

	var _parse = function _parse(value) {
		// parse value and convert NaN to 0
		return parseFloat(value) || 0;
	};

	/*
 *	_rows
 *	utility function returns array of jQuery selections representing each row
 *	(as displayed after float wrapping applied by browser)
 */

	var _rows = function _rows(elements) {
		var tolerance = 1,
		    $elements = $(elements),
		    lastTop = null,
		    rows = [];

		// group elements by their top position
		$elements.each(function () {
			var $that = $(this),
			    top = $that.offset().top - _parse($that.css('margin-top')),
			    lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

			if (lastRow === null) {
				// first item on the row, so just push it
				rows.push($that);
			} else {
				// if the row top is the same, add to the row group
				if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
					rows[rows.length - 1] = lastRow.add($that);
				} else {
					// otherwise start a new row group
					rows.push($that);
				}
			}

			// keep track of the last row top
			lastTop = top;
		});

		return rows;
	};

	/*
 *	_parseOptions
 *	handle plugin options
 */

	var _parseOptions = function _parseOptions(options) {
		var opts = {
			byRow: true,
			property: 'height',
			target: null,
			remove: false
		};

		if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
			return $.extend(opts, options);
		}

		if (typeof options === 'boolean') {
			opts.byRow = options;
		} else if (options === 'remove') {
			opts.remove = true;
		}

		return opts;
	};

	/*
 *	matchHeight
 *	plugin definition
 */

	var matchHeight = $.fn.matchHeight = function (options) {
		var opts = _parseOptions(options);

		// handle remove
		if (opts.remove) {
			var that = this;

			// remove fixed height from all selected elements
			this.css(opts.property, '');

			// remove selected elements from all groups
			$.each(matchHeight._groups, function (key, group) {
				group.elements = group.elements.not(that);
			});

			// TODO: cleanup empty groups

			return this;
		}

		if (this.length <= 1 && !opts.target) {
			return this;
		}

		// keep track of this group so we can re-apply later on load and resize
		// events
		matchHeight._groups.push({
			elements: this,
			options: opts
		});

		// match each element's height to the tallest element in the selection
		matchHeight._apply(this, opts);

		return this;
	};

	/*
 *	plugin global options
 */

	matchHeight.version = 'master';
	matchHeight._groups = [];
	matchHeight._throttle = 80;
	matchHeight._maintainScroll = false;
	matchHeight._beforeUpdate = null;
	matchHeight._afterUpdate = null;
	matchHeight._rows = _rows;
	matchHeight._parse = _parse;
	matchHeight._parseOptions = _parseOptions;

	/*
 *	matchHeight._apply
 *	apply matchHeight to given elements
 */

	matchHeight._apply = function (elements, options) {
		var opts = _parseOptions(options),
		    $elements = $(elements),
		    rows = [$elements];

		// take note of scroll position
		var scrollTop = $(window).scrollTop(),
		    htmlHeight = $('html').outerHeight(true);

		// get hidden parents
		var $hiddenParents = $elements.parents().filter(':hidden');

		// cache the original inline style
		$hiddenParents.each(function () {
			var $that = $(this);
			$that.data('style-cache', $that.attr('style'));
		});

		// temporarily must force hidden parents visible
		$hiddenParents.css('display', 'block');

		// get rows if using byRow, otherwise assume one row
		if (opts.byRow && !opts.target) {

			// must first force an arbitrary equal height so floating elements break
			// evenly
			$elements.each(function () {
				var $that = $(this),
				    display = $that.css('display');

				// temporarily force a usable display value
				if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
					display = 'block';
				}

				// cache the original inline style
				$that.data('style-cache', $that.attr('style'));

				$that.css({
					'display': display,
					'padding-top': '0',
					'padding-bottom': '0',
					'margin-top': '0',
					'margin-bottom': '0',
					'border-top-width': '0',
					'border-bottom-width': '0',
					'height': '100px',
					'overflow': 'hidden'
				});
			});

			// get the array of rows (based on element top position)
			rows = _rows($elements);

			// revert original inline styles
			$elements.each(function () {
				var $that = $(this);
				$that.attr('style', $that.data('style-cache') || '');
			});
		}

		$.each(rows, function (key, row) {
			var $row = $(row),
			    targetHeight = 0;

			if (!opts.target) {
				// skip apply to rows with only one item
				if (opts.byRow && $row.length <= 1) {
					$row.css(opts.property, '');
					return;
				}

				// iterate the row and find the max height
				$row.each(function () {
					var $that = $(this),
					    style = $that.attr('style'),
					    display = $that.css('display');

					// temporarily force a usable display value
					if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
						display = 'block';
					}

					// ensure we get the correct actual height (and not a previously set
					// height value)
					var css = { 'display': display };
					css[opts.property] = '';
					$that.css(css);

					// find the max height (including padding, but not margin)
					if ($that.outerHeight(false) > targetHeight) {
						targetHeight = $that.outerHeight(false);
					}

					// revert styles
					if (style) {
						$that.attr('style', style);
					} else {
						$that.css('display', '');
					}
				});
			} else {
				// if target set, use the height of the target element
				targetHeight = opts.target.outerHeight(false);
			}

			// iterate the row and apply the height to all elements
			$row.each(function () {
				var $that = $(this),
				    verticalPadding = 0;

				// don't apply to a target
				if (opts.target && $that.is(opts.target)) {
					return;
				}

				// handle padding and border correctly (required when not using
				// border-box)
				if ($that.css('box-sizing') !== 'border-box') {
					verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
					verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
				}

				// set the height (accounting for padding and border)
				$that.css(opts.property, targetHeight - verticalPadding + 'px');
			});
		});

		// revert hidden parents
		$hiddenParents.each(function () {
			var $that = $(this);
			$that.attr('style', $that.data('style-cache') || null);
		});

		// restore scroll position if enabled
		if (matchHeight._maintainScroll) {
			$(window).scrollTop(scrollTop / htmlHeight * $('html').outerHeight(true));
		}

		return this;
	};

	/*
 *	matchHeight._applyDataApi
 *	applies matchHeight to all elements with a data-match-height attribute
 */

	matchHeight._applyDataApi = function () {
		var groups = {};

		// generate groups by their groupId set by elements using data-match-height
		$('[data-match-height], [data-mh]').each(function () {
			var $this = $(this),
			    groupId = $this.attr('data-mh') || $this.attr('data-match-height');

			if (groupId in groups) {
				groups[groupId] = groups[groupId].add($this);
			} else {
				groups[groupId] = $this;
			}
		});

		// apply matchHeight to each group
		$.each(groups, function () {
			this.matchHeight(true);
		});
	};

	/*
 *	matchHeight._update
 *	updates matchHeight on all current groups with their correct options
 */

	var _update = function _update(event) {
		if (matchHeight._beforeUpdate) {
			matchHeight._beforeUpdate(event, matchHeight._groups);
		}

		$.each(matchHeight._groups, function () {
			matchHeight._apply(this.elements, this.options);
		});

		if (matchHeight._afterUpdate) {
			matchHeight._afterUpdate(event, matchHeight._groups);
		}
	};

	matchHeight._update = function (throttle, event) {
		// prevent update if fired from a resize event
		// where the viewport width hasn't actually changed
		// fixes an event looping bug in IE8
		if (event && event.type === 'resize') {
			var windowWidth = $(window).width();
			if (windowWidth === _previousResizeWidth) {
				return;
			}
			_previousResizeWidth = windowWidth;
		}

		// throttle updates
		if (!throttle) {
			_update(event);
		} else if (_updateTimeout === -1) {
			_updateTimeout = setTimeout(function () {
				_update(event);
				_updateTimeout = -1;
			}, matchHeight._throttle);
		}
	};

	/*
 *	bind events
 */

	// apply on DOM ready event
	$(matchHeight._applyDataApi);

	// use on or bind where supported
	var on = $.fn.on ? 'on' : 'bind';

	// update heights on load and resize events
	$(window)[on]('load', function (event) {
		matchHeight._update(false, event);
	});

	// throttled update heights on resize events
	$(window)[on]('resize orientationchange', function (event) {
		matchHeight._update(true, event);
	});
});
"use strict";

/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function () {
  "use strict";
  function t(t, e) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E";
  }function e(t) {
    if (t.srcset && !p && window.picturefill) {
      var e = window.picturefill._;t[e.ns] && t[e.ns].evaled || e.fillImg(t, { reselect: !0 }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, { reselect: !0 })), t.currentSrc = t[e.ns].curSrc || t.src;
    }
  }function i(t) {
    for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = u.exec(i));) {
      r[e[1]] = e[2];
    }return r;
  }function r(e, i, r) {
    var n = t(i || 1, r || 0);b.call(e, "src") !== n && h.call(e, "src", n);
  }function n(t, e) {
    t.naturalWidth ? e(t) : setTimeout(n, 100, t, e);
  }function c(t) {
    var c = i(t),
        o = t[l];if (c["object-fit"] = c["object-fit"] || "fill", !o.img) {
      if ("fill" === c["object-fit"]) return;if (!o.skipTest && f && !c["object-position"]) return;
    }if (!o.img) {
      o.img = new Image(t.width, t.height), o.img.srcset = b.call(t, "data-ofi-srcset") || t.srcset, o.img.src = b.call(t, "data-ofi-src") || t.src, h.call(t, "data-ofi-src", t.src), t.srcset && h.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = "");try {
        s(t);
      } catch (t) {
        window.console && console.warn("https://bit.ly/ofi-old-browser");
      }
    }e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () {
      o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto";
    }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) {
      r(t, e.naturalWidth, e.naturalHeight);
    });
  }function s(t) {
    var e = { get: function get(e) {
        return t[l].img[e ? e : "src"];
      }, set: function set(e, i) {
        return t[l].img[i ? i : "src"] = e, h.call(t, "data-ofi-" + i, e), c(t), e;
      } };Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", { get: function get() {
        return e.get("currentSrc");
      } }), Object.defineProperty(t, "srcset", { get: function get() {
        return e.get("srcset");
      }, set: function set(t) {
        return e.set(t, "srcset");
      } });
  }function o() {
    function t(t, e) {
      return t[l] && t[l].img && ("src" === e || "srcset" === e) ? t[l].img : t;
    }d || (HTMLImageElement.prototype.getAttribute = function (e) {
      return b.call(t(this, e), e);
    }, HTMLImageElement.prototype.setAttribute = function (e, i) {
      return h.call(t(this, e), e, String(i));
    });
  }function a(t, e) {
    var i = !y && !t;if (e = e || {}, t = t || "img", d && !e.skipTest || !m) return !1;"img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);for (var r = 0; r < t.length; r++) {
      t[r][l] = t[r][l] || { skipTest: e.skipTest }, c(t[r]);
    }i && (document.body.addEventListener("load", function (t) {
      "IMG" === t.target.tagName && a(t.target, { skipTest: e.skipTest });
    }, !0), y = !0, t = "img"), e.watchMQ && window.addEventListener("resize", a.bind(null, t, { skipTest: e.skipTest }));
  }var l = "bfred-it:object-fit-images",
      u = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
      g = "undefined" == typeof Image ? { style: { "object-position": 1 } } : new Image(),
      f = "object-fit" in g.style,
      d = "object-position" in g.style,
      m = "background-size" in g.style,
      p = "string" == typeof g.currentSrc,
      b = g.getAttribute,
      h = g.setAttribute,
      y = !1;return a.supportsObjectFit = f, a.supportsObjectPosition = d, o(), a;
}();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (i) {
    "use strict";

    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
}(function (i) {
    "use strict";

    var e = window.Slick || {};
    (e = function () {
        var e = 0;
        return function (t, o) {
            var s,
                n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function customPaging(e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
        };
    }()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
        }), s.$slidesCache = s.$slides, s.reinit();
    }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({ height: e }, i.options.speed);
        }
    }, e.prototype.animateSlide = function (e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function step(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
            },
            complete: function complete() {
                t && t.call();
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
            s.disableTransition(), t.call();
        }, s.options.speed));
    }, e.prototype.getNavTarget = function () {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t;
    }, e.prototype.asNavFor = function (e) {
        var t = this.getNavTarget();
        null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
        });
    }, e.prototype.applyTransition = function (i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
    }, e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }, e.prototype.autoPlayIterator = function () {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
    }, e.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, e.prototype.buildDots = function () {
        var e,
            t,
            o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) {
                t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            }o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
    }, e.prototype.buildRows = function () {
        var i,
            e,
            t,
            o,
            s,
            n,
            r,
            l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c));
                    }
                    d.appendChild(a);
                }
                o.appendChild(d);
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, e.prototype.checkResponsive = function (e, t) {
        var o,
            s,
            n,
            r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) {
                r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            }null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
        }
    }, e.prototype.changeSlide = function (e, t) {
        var o,
            s,
            n,
            r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return;
        }
    }, e.prototype.checkNavigable = function (i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];else for (var o in e) {
            if (i < e[o]) {
                i = t;
                break;
            }
            t = e[o];
        }
        return i;
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.cleanUpRows = function () {
        var i,
            e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
    }, e.prototype.clickHandler = function (i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            i(this).attr("style", i(this).data("originalStyling"));
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
    }, e.prototype.disableTransition = function (i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call();
        }, t.options.speed));
    }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }));
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function () {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
            }, 0);
        });
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        return this.currentSlide;
    }, e.prototype.getDotCount = function () {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite) {
            if (i.slideCount <= i.options.slidesToShow) ++o;else for (; e < i.slideCount;) {
                ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            }
        } else if (!0 === i.options.centerMode) o = i.slideCount;else if (i.options.asNavFor) for (; e < i.slideCount;) {
            ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        } else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1;
    }, e.prototype.getLeft = function (i) {
        var e,
            t,
            o,
            s,
            n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
    }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        return this.options[i];
    }, e.prototype.getNavigableIndexes = function () {
        var i,
            e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) {
            s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        }return s;
    }, e.prototype.getSlick = function () {
        return this;
    }, e.prototype.getSlideCount = function () {
        var e,
            t,
            o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
    }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
    }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
    }, e.prototype.initADA = function () {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function (i) {
            return i >= 0 && i < e.slideCount;
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s });
        }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
            var n = o[s];
            i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) {
            e.$slides.eq(s).attr("tabindex", 0);
        }e.activateADA();
    }, e.prototype.initArrowEvents = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }, e.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
    }, e.prototype.initUI = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
    }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            i("img[data-lazy]", e).each(function () {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function () {
                    e.animate({ opacity: 0 }, 100, function () {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), n.$slider.trigger("lazyLoaded", [n, e, t]);
                    });
                }, r.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
                }, r.src = t;
            });
        }

        var t,
            o,
            s,
            n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) {
            r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        }e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
    }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }, e.prototype.next = e.prototype.slickNext = function () {
        this.changeSlide({ data: { message: "next" } });
    }, e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition();
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0;
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
    }, e.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        this.changeSlide({ data: { message: "previous" } });
    }, e.prototype.preventDefault = function (i) {
        i.preventDefault();
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t,
            o,
            s,
            n,
            r,
            l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
        }, r.onerror = function () {
            e < 3 ? setTimeout(function () {
                l.progressiveLazyLoad(e + 1);
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
    }, e.prototype.refresh = function (e) {
        var t,
            o,
            s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1);
    }, e.prototype.registerBreakpoints = function () {
        var e,
            t,
            o,
            s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n) {
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) {
                        s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    }s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
                }
            }s.breakpoints.sort(function (i, e) {
                return s.options.mobileFirst ? i - e : e - i;
            });
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
    }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
        }, 50));
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
    }, e.prototype.setCSS = function (i) {
        var e,
            t,
            o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
    }, e.prototype.setDimensions = function () {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }, e.prototype.setFade = function () {
        var e,
            t = this;
        t.$slides.each(function (o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 });
        }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e);
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e,
            t,
            o,
            s,
            n,
            r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;else if ("multiple" === n) i.each(o, function (i, e) {
            r.options[i] = e;
        });else if ("responsive" === n) for (t in s) {
            if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];else {
                for (e = r.options.responsive.length - 1; e >= 0;) {
                    r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                }r.options.responsive.push(s[t]);
            }
        }l && (r.unload(), r.reinit());
    }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
    }, e.prototype.setProps = function () {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
    }, e.prototype.setSlideClasses = function (i) {
        var e,
            t,
            o,
            s,
            n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow - (n.slideCount - 1 - n.options.slidesToShow)).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
    }, e.prototype.setupInfinite = function () {
        var e,
            t,
            o,
            s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) {
                t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            }for (e = 0; e < o + s.slideCount; e += 1) {
                t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            }s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                i(this).attr("id", "");
            });
        }
    }, e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i;
    }, e.prototype.selectHandler = function (e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
    }, e.prototype.slideHandler = function (i, e, t) {
        var o,
            s,
            n,
            r,
            l,
            d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
            a.postSlide(o);
        }) : a.postSlide(o));else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
            a.postSlide(o);
        }) : a.postSlide(o));else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
                a.postSlide(s);
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function () {
                a.postSlide(s);
            }) : a.postSlide(s);
        }
    }, e.prototype.startLoad = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
    }, e.prototype.swipeDirection = function () {
        var i,
            e,
            t,
            o,
            s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
    }, e.prototype.swipeEnd = function (i) {
        var e,
            t,
            o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
    }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i);
        }
    }, e.prototype.swipeMove = function (i) {
        var e,
            t,
            o,
            s,
            n,
            r,
            l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
    }, e.prototype.swipeStart = function (i) {
        var e,
            t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
    }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy();
    }, e.prototype.updateArrows = function () {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
    }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
    }, i.fn.slick = function () {
        var i,
            t,
            o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++) {
            if ("object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        }return o;
    };
});
"use strict";

(function () {
    var MutationObserver,
        Util,
        WeakMap,
        getComputedStyle,
        getComputedStyleRX,
        bind = function bind(fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    },
        indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }return -1;
    };

    Util = function () {
        function Util() {}

        Util.prototype.extend = function (custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function (agent) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
            );
        };

        Util.prototype.createEvent = function (event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function (elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if ("on" + event in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function (elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function (elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function () {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;
    }();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function () {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function (key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function (key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;
    }());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function () {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn('MutationObserver is not supported by your browser.');
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function () {};

        return MutationObserver;
    }());

    getComputedStyle = this.getComputedStyle || function (el, pseudo) {
        this.getPropertyValue = function (prop) {
            var ref;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function (_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = function () {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function () {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function () {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = function () {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }.call(this);
            this.all = function () {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }.call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver(function (_this) {
                    return function (records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push(function () {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }.call(_this));
                        }
                        return results;
                    };
                }(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function () {
            this.stopped = true;
            this.util().removeEvent(window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function (element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function (element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function (box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function (box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate(function (_this) {
                return function () {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            }(this));
        };

        WOW.prototype.animate = function () {
            if ('requestAnimationFrame' in window) {
                return function (callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function (callback) {
                    return callback();
                };
            }
        }();

        WOW.prototype.resetStyle = function () {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function (event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function (box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function (elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push(function () {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
                    }
                    return results1;
                }.call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function (elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function (box) {
            var animationName;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (_error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function (box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function (box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function () {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function () {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = function () {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!box) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }.call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function (element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function (box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function () {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;
    }();
}).call(window);
"use strict";

/*! WOW wow.js - v(Aternity) - 2016-10-04
* https://wowjs.uk
* Copyright (c) 2016 Thomas Grainger; Licensed MIT */
(function () {
  var t,
      e,
      n,
      i,
      o,
      r = function r(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  },
      s = [].indexOf || function (t) {
    for (var e = 0, n = this.length; e < n; e++) {
      if (e in this && this[e] === t) return e;
    }return -1;
  };e = function () {
    function t() {}return t.prototype.extend = function (t, e) {
      var n, i;for (n in e) {
        i = e[n], null == t[n] && (t[n] = i);
      }return t;
    }, t.prototype.isMobile = function (t) {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
      );
    }, t.prototype.createEvent = function (t, e, n, i) {
      var o;return null == e && (e = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, n, i) : null != document.createEventObject ? (o = document.createEventObject()).eventType = t : o.eventName = t, o;
    }, t.prototype.emitEvent = function (t, e) {
      return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0;
    }, t.prototype.addEvent = function (t, e, n) {
      return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n;
    }, t.prototype.removeEvent = function (t, e, n) {
      return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e];
    }, t.prototype.innerHeight = function () {
      return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
    }, t;
  }(), n = this.WeakMap || this.MozWeakMap || (n = function () {
    function t() {
      this.keys = [], this.values = [];
    }return t.prototype.get = function (t) {
      var e, n, i, o;for (e = n = 0, i = (o = this.keys).length; n < i; e = ++n) {
        if (o[e] === t) return this.values[e];
      }
    }, t.prototype.set = function (t, e) {
      var n, i, o, r;for (n = i = 0, o = (r = this.keys).length; i < o; n = ++i) {
        if (r[n] === t) return void (this.values[n] = e);
      }return this.keys.push(t), this.values.push(e);
    }, t;
  }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
    function t() {
      "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
    }return t.notSupported = !0, t.prototype.observe = function () {}, t;
  }()), i = this.getComputedStyle || function (t, e) {
    return this.getPropertyValue = function (e) {
      var n;return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function (t, e) {
        return e.toUpperCase();
      }), (null != (n = t.currentStyle) ? n[e] : void 0) || null;
    }, this;
  }, o = /(\-([a-z]){1})/g, this.WOW = function () {
    function o(t) {
      null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new n(), this.wowEvent = this.util().createEvent(this.config.boxClass);
    }return o.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null }, o.prototype.init = function () {
      var t;return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = [];
    }, o.prototype.start = function () {
      var e, n, i, o, r;if (this.stopped = !1, this.boxes = function () {
        var t, n, i, o;for (o = [], t = 0, n = (i = this.element.querySelectorAll("." + this.config.boxClass)).length; t < n; t++) {
          e = i[t], o.push(e);
        }return o;
      }.call(this), this.all = function () {
        var t, n, i, o;for (o = [], t = 0, n = (i = this.boxes).length; t < n; t++) {
          e = i[t], o.push(e);
        }return o;
      }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle();else for (n = 0, i = (o = this.boxes).length; n < i; n++) {
        e = o[n], this.applyStyle(e, !0);
      }if (this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) return new t((r = this, function (t) {
        var e, n, i, o, s;for (s = [], e = 0, n = t.length; e < n; e++) {
          o = t[e], s.push(function () {
            var t, e, n, r;for (r = [], t = 0, e = (n = o.addedNodes || []).length; t < e; t++) {
              i = n[t], r.push(this.doSync(i));
            }return r;
          }.call(r));
        }return s;
      })).observe(document.body, { childList: !0, subtree: !0 });
    }, o.prototype.stop = function () {
      if (this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval);
    }, o.prototype.sync = function (e) {
      if (t.notSupported) return this.doSync(this.element);
    }, o.prototype.doSync = function (t) {
      var e, n, i, o, r;if (null == t && (t = this.element), 1 === t.nodeType) {
        for (r = [], n = 0, i = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; n < i; n++) {
          e = o[n], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
        }return r;
      }
    }, o.prototype.show = function (t) {
      return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t;
    }, o.prototype.applyStyle = function (t, e) {
      var n, i, o, r;return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate((r = this, function () {
        return r.customStyle(t, e, i, n, o);
      }));
    }, o.prototype.animate = "requestAnimationFrame" in window ? function (t) {
      return window.requestAnimationFrame(t);
    } : function (t) {
      return t();
    }, o.prototype.resetStyle = function () {
      var t, e, n, i, o;for (o = [], e = 0, n = (i = this.boxes).length; e < n; e++) {
        t = i[e], o.push(t.style.visibility = "visible");
      }return o;
    }, o.prototype.resetAnimation = function (t) {
      var e;if (t.type.toLowerCase().indexOf("animationend") >= 0) return (e = t.target || t.srcElement).className = e.className.replace(this.config.animateClass, "").trim();
    }, o.prototype.customStyle = function (t, e, n, i, o) {
      return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, { animationDuration: n }), i && this.vendorSet(t.style, { animationDelay: i }), o && this.vendorSet(t.style, { animationIterationCount: o }), this.vendorSet(t.style, { animationName: e ? "none" : this.cachedAnimationName(t) }), t;
    }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function (t, e) {
      var n, i, o, r;for (n in i = [], e) {
        o = e[n], t["" + n] = o, i.push(function () {
          var e, i, s, l;for (l = [], e = 0, i = (s = this.vendors).length; e < i; e++) {
            r = s[e], l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
          }return l;
        }.call(this));
      }return i;
    }, o.prototype.vendorCSS = function (t, e) {
      var n, o, r, s, l, a;for (s = (l = i(t)).getPropertyCSSValue(e), n = 0, o = (r = this.vendors).length; n < o; n++) {
        a = r[n], s = s || l.getPropertyCSSValue("-" + a + "-" + e);
      }return s;
    }, o.prototype.animationName = function (t) {
      var e;try {
        e = this.vendorCSS(t, "animation-name").cssText;
      } catch (n) {
        e = i(t).getPropertyValue("animation-name");
      }return "none" === e ? "" : e;
    }, o.prototype.cacheAnimationName = function (t) {
      return this.animationNameCache.set(t, this.animationName(t));
    }, o.prototype.cachedAnimationName = function (t) {
      return this.animationNameCache.get(t);
    }, o.prototype.scrollHandler = function () {
      return this.scrolled = !0;
    }, o.prototype.scrollCallback = function () {
      var t;if (this.scrolled && (this.scrolled = !1, this.boxes = function () {
        var e, n, i, o;for (o = [], e = 0, n = (i = this.boxes).length; e < n; e++) {
          (t = i[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
        }return o;
      }.call(this), !this.boxes.length && !this.config.live)) return this.stop();
    }, o.prototype.offsetTop = function (t) {
      for (var e; void 0 === t.offsetTop;) {
        t = t.parentNode;
      }for (e = t.offsetTop; t = t.offsetParent;) {
        e += t.offsetTop;
      }return e;
    }, o.prototype.isVisible = function (t) {
      var e, n, i, o, r;return n = t.getAttribute("data-wow-offset") || this.config.offset, o = (r = window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, e = (i = this.offsetTop(t)) + t.clientHeight, i <= o && e >= r;
    }, o.prototype.util = function () {
      return null != this._util ? this._util : this._util = new e();
    }, o.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    }, o;
  }();
}).call(window);
//# sourceMappingURL=plugins.js.map

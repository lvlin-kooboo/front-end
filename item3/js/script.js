! function() {
	"use strict";

	function e(e) {
		e.fn.swiper = function(t) {
			var s;
			return e(this).each(function() {
				var e = new a(this, t);
				s || (s = e)
			}), s
		}
	}
	var a = function(e, s) {
		function r() {
			return "horizontal" === g.params.direction
		}

		function i() {
			g.autoplayTimeoutId = setTimeout(function() {
				g.params.loop ? (g.fixLoop(), g._slideNext()) : g.isEnd ? s.autoplayStopOnLast ? g.stopAutoplay() : g._slideTo(0) : g._slideNext()
			}, g.params.autoplay)
		}

		function n(e, a) {
			var t = v(e.target);
			if (!t.is(a))
				if ("string" == typeof a) t = t.parents(a);
				else
			if (a.nodeType) {
				var s;
				return t.parents().each(function(e, t) {
					t === a && (s = a)
				}), s ? a : void 0
			}
			return 0 === t.length ? void 0 : t[0]
		}

		function o(e, a) {
			a = a || {};
			var t = window.MutationObserver || window.WebkitMutationObserver,
				s = new t(function(e) {
					e.forEach(function(e) {
						g.onResize(!0), g.emit("onObserverUpdate", g, e)
					})
				});
			s.observe(e, {
				attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
				childList: "undefined" == typeof a.childList ? !0 : a.childList,
				characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
			}), g.observers.push(s)
		}

		function l(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = e.keyCode || e.charCode;
			if (!g.params.allowSwipeToNext && (r() && 39 === a || !r() && 40 === a)) return !1;
			if (!g.params.allowSwipeToPrev && (r() && 37 === a || !r() && 38 === a)) return !1;
			if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
				if (37 === a || 39 === a || 38 === a || 40 === a) {
					var t = !1;
					if (g.container.parents(".swiper-slide").length > 0 && 0 === g.container.parents(".swiper-slide-active").length) return;
					var s = {
						left: window.pageXOffset,
						top: window.pageYOffset
					}, i = window.innerWidth,
						n = window.innerHeight,
						o = g.container.offset();
					g.rtl && (o.left = o.left - g.container[0].scrollLeft);
					for (var l = [
						[o.left, o.top],
						[o.left + g.width, o.top],
						[o.left, o.top + g.height],
						[o.left + g.width, o.top + g.height]
					], d = 0; d < l.length; d++) {
						var p = l[d];
						p[0] >= s.left && p[0] <= s.left + i && p[1] >= s.top && p[1] <= s.top + n && (t = !0)
					}
					if (!t) return
				}
				r() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !g.rtl || 37 === a && g.rtl) && g.slideNext(), (37 === a && !g.rtl || 39 === a && g.rtl) && g.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && g.slideNext(), 38 === a && g.slidePrev())
			}
		}

		function d(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = g.mousewheel.event,
				t = 0;
			if (e.detail) t = -e.detail;
			else if ("mousewheel" === a)
				if (g.params.mousewheelForceToAxis)
					if (r()) {
						if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
						t = e.wheelDeltaX
					} else {
						if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
						t = e.wheelDeltaY
					} else t = e.wheelDelta;
					else
			if ("DOMMouseScroll" === a) t = -e.detail;
			else if ("wheel" === a)
				if (g.params.mousewheelForceToAxis)
					if (r()) {
						if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
						t = -e.deltaX
					} else {
						if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
						t = -e.deltaY
					} else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
			if (g.params.mousewheelInvert && (t = -t), g.params.freeMode) {
				var s = g.getWrapperTranslate() + t;
				if (s > 0 && (s = 0), s < g.maxTranslate() && (s = g.maxTranslate()), g.setWrapperTransition(0), g.setWrapperTranslate(s), g.updateProgress(), g.updateActiveIndex(), g.params.freeModeSticky && (clearTimeout(g.mousewheel.timeout), g.mousewheel.timeout = setTimeout(function() {
					g.slideReset()
				}, 300)), 0 === s || s === g.maxTranslate()) return
			} else {
				if ((new window.Date).getTime() - g.mousewheel.lastScrollTime > 60)
					if (0 > t)
						if (g.isEnd) {
							if (g.params.mousewheelReleaseOnEdges) return !0
						} else g.slideNext();
						else
				if (g.isBeginning) {
					if (g.params.mousewheelReleaseOnEdges) return !0
				} else g.slidePrev();
				g.mousewheel.lastScrollTime = (new window.Date).getTime()
			}
			return g.params.autoplay && g.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
		}

		function p(e, a) {
			e = v(e);
			var t, s, i;
			t = e.attr("data-swiper-parallax") || "0", s = e.attr("data-swiper-parallax-x"), i = e.attr("data-swiper-parallax-y"), s || i ? (s = s || "0", i = i || "0") : r() ? (s = t, i = "0") : (i = t, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * a + "%" : s * a + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * a + "%" : i * a + "px", e.transform("translate3d(" + s + ", " + i + ",0px)")
		}

		function u(e) {
			return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
		}
		if (!(this instanceof a)) return new a(e, s);
		var c = {
			direction: "horizontal",
			touchEventsTarget: "container",
			initialSlide: 0,
			speed: 300,
			autoplay: !1,
			autoplayDisableOnInteraction: !0,
			freeMode: !1,
			freeModeMomentum: !0,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: !0,
			freeModeMomentumBounceRatio: 1,
			freeModeSticky: !1,
			setWrapperSize: !1,
			virtualTranslate: !1,
			effect: "slide",
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: !0
			},
			cube: {
				slideShadows: !0,
				shadow: !0,
				shadowOffset: 20,
				shadowScale: .94
			},
			fade: {
				crossFade: !1
			},
			parallax: !1,
			scrollbar: null,
			scrollbarHide: !0,
			keyboardControl: !1,
			mousewheelControl: !1,
			mousewheelReleaseOnEdges: !1,
			mousewheelInvert: !1,
			mousewheelForceToAxis: !1,
			hashnav: !1,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: "column",
			slidesPerGroup: 1,
			centeredSlides: !1,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: !0,
			shortSwipes: !0,
			longSwipes: !0,
			longSwipesRatio: .5,
			longSwipesMs: 300,
			followFinger: !0,
			onlyExternal: !1,
			threshold: 0,
			touchMoveStopPropagation: !0,
			pagination: null,
			paginationClickable: !1,
			paginationHide: !1,
			paginationBulletRender: null,
			resistance: !0,
			resistanceRatio: .85,
			nextButton: null,
			prevButton: null,
			watchSlidesProgress: !1,
			watchSlidesVisibility: !1,
			grabCursor: !1,
			preventClicks: !0,
			preventClicksPropagation: !0,
			slideToClickedSlide: !1,
			lazyLoading: !1,
			lazyLoadingInPrevNext: !1,
			lazyLoadingOnTransitionStart: !1,
			preloadImages: !0,
			updateOnImagesReady: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			control: void 0,
			controlInverse: !1,
			allowSwipeToPrev: !0,
			allowSwipeToNext: !0,
			swipeHandler: null,
			noSwiping: !0,
			noSwipingClass: "swiper-no-swiping",
			slideClass: "swiper-slide",
			slideActiveClass: "swiper-slide-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slidePrevClass: "swiper-slide-prev",
			wrapperClass: "swiper-wrapper",
			bulletClass: "swiper-pagination-bullet",
			bulletActiveClass: "swiper-pagination-bullet-active",
			buttonDisabledClass: "swiper-button-disabled",
			paginationHiddenClass: "swiper-pagination-hidden",
			observer: !1,
			observeParents: !1,
			a11y: !1,
			prevSlideMessage: "Previous slide",
			nextSlideMessage: "Next slide",
			firstSlideMessage: "This is the first slide",
			lastSlideMessage: "This is the last slide",
			runCallbacksOnInit: !0
		}, m = s && s.virtualTranslate;
		s = s || {};
		for (var f in c)
			if ("undefined" == typeof s[f]) s[f] = c[f];
			else
		if ("object" == typeof s[f])
			for (var h in c[f]) "undefined" == typeof s[f][h] && (s[f][h] = c[f][h]);
		var g = this;
		g.version = "3.0.8", g.params = s, g.classNames = [];
		var v;
		if (v = "undefined" == typeof t ? window.Dom7 || window.Zepto || window.jQuery : t, v && (g.$ = v, g.container = v(e), 0 !== g.container.length)) {
			if (g.container.length > 1) return void g.container.each(function() {
				new a(this, s)
			});
			g.container[0].swiper = g, g.container.data("swiper", g), g.classNames.push("swiper-container-" + g.params.direction), g.params.freeMode && g.classNames.push("swiper-container-free-mode"), g.support.flexbox || (g.classNames.push("swiper-container-no-flexbox"), g.params.slidesPerColumn = 1), (g.params.parallax || g.params.watchSlidesVisibility) && (g.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(g.params.effect) >= 0 && (g.support.transforms3d ? (g.params.watchSlidesProgress = !0, g.classNames.push("swiper-container-3d")) : g.params.effect = "slide"), "slide" !== g.params.effect && g.classNames.push("swiper-container-" + g.params.effect), "cube" === g.params.effect && (g.params.resistanceRatio = 0, g.params.slidesPerView = 1, g.params.slidesPerColumn = 1, g.params.slidesPerGroup = 1, g.params.centeredSlides = !1, g.params.spaceBetween = 0, g.params.virtualTranslate = !0, g.params.setWrapperSize = !1), "fade" === g.params.effect && (g.params.slidesPerView = 1, g.params.slidesPerColumn = 1, g.params.slidesPerGroup = 1, g.params.watchSlidesProgress = !0, g.params.spaceBetween = 0, "undefined" == typeof m && (g.params.virtualTranslate = !0)), g.params.grabCursor && g.support.touch && (g.params.grabCursor = !1), g.wrapper = g.container.children("." + g.params.wrapperClass), g.params.pagination && (g.paginationContainer = v(g.params.pagination), g.params.paginationClickable && g.paginationContainer.addClass("swiper-pagination-clickable")), g.rtl = r() && ("rtl" === g.container[0].dir.toLowerCase() || "rtl" === g.container.css("direction")), g.rtl && g.classNames.push("swiper-container-rtl"), g.rtl && (g.wrongRTL = "-webkit-box" === g.wrapper.css("display")), g.params.slidesPerColumn > 1 && g.classNames.push("swiper-container-multirow"), g.device.android && g.classNames.push("swiper-container-android"), g.container.addClass(g.classNames.join(" ")), g.translate = 0, g.progress = 0, g.velocity = 0, g.lockSwipeToNext = function() {
				g.params.allowSwipeToNext = !1
			}, g.lockSwipeToPrev = function() {
				g.params.allowSwipeToPrev = !1
			}, g.lockSwipes = function() {
				g.params.allowSwipeToNext = g.params.allowSwipeToPrev = !1
			}, g.unlockSwipeToNext = function() {
				g.params.allowSwipeToNext = !0
			}, g.unlockSwipeToPrev = function() {
				g.params.allowSwipeToPrev = !0
			}, g.unlockSwipes = function() {
				g.params.allowSwipeToNext = g.params.allowSwipeToPrev = !0
			}, g.params.grabCursor && (g.container[0].style.cursor = "move", g.container[0].style.cursor = "-webkit-grab", g.container[0].style.cursor = "-moz-grab", g.container[0].style.cursor = "grab"), g.imagesToLoad = [], g.imagesLoaded = 0, g.loadImage = function(e, a, t, s) {
				function r() {
					s && s()
				}
				var i;
				e.complete && t ? r() : a ? (i = new window.Image, i.onload = r, i.onerror = r, i.src = a) : r()
			}, g.preloadImages = function() {
				function e() {
					"undefined" != typeof g && null !== g && (void 0 !== g.imagesLoaded && g.imagesLoaded++, g.imagesLoaded === g.imagesToLoad.length && (g.params.updateOnImagesReady && g.update(), g.emit("onImagesReady", g)))
				}
				g.imagesToLoad = g.container.find("img");
				for (var a = 0; a < g.imagesToLoad.length; a++) g.loadImage(g.imagesToLoad[a], g.imagesToLoad[a].currentSrc || g.imagesToLoad[a].getAttribute("src"), !0, e)
			}, g.autoplayTimeoutId = void 0, g.autoplaying = !1, g.autoplayPaused = !1, g.startAutoplay = function() {
				return "undefined" != typeof g.autoplayTimeoutId ? !1 : g.params.autoplay ? g.autoplaying ? !1 : (g.autoplaying = !0, g.emit("onAutoplayStart", g), void i()) : !1
			}, g.stopAutoplay = function() {
				g.autoplayTimeoutId && (g.autoplayTimeoutId && clearTimeout(g.autoplayTimeoutId), g.autoplaying = !1, g.autoplayTimeoutId = void 0, g.emit("onAutoplayStop", g))
			}, g.pauseAutoplay = function(e) {
				g.autoplayPaused || (g.autoplayTimeoutId && clearTimeout(g.autoplayTimeoutId), g.autoplayPaused = !0, 0 === e ? (g.autoplayPaused = !1, i()) : g.wrapper.transitionEnd(function() {
					g && (g.autoplayPaused = !1, g.autoplaying ? i() : g.stopAutoplay())
				}))
			}, g.minTranslate = function() {
				return -g.snapGrid[0]
			}, g.maxTranslate = function() {
				return -g.snapGrid[g.snapGrid.length - 1]
			}, g.updateContainerSize = function() {
				var e, a;
				e = "undefined" != typeof g.params.width ? g.params.width : g.container[0].clientWidth, a = "undefined" != typeof g.params.height ? g.params.height : g.container[0].clientHeight, 0 === e && r() || 0 === a && !r() || (g.width = e, g.height = a, g.size = r() ? g.width : g.height)
			}, g.updateSlidesSize = function() {
				g.slides = g.wrapper.children("." + g.params.slideClass), g.snapGrid = [], g.slidesGrid = [], g.slidesSizesGrid = [];
				var e, a = g.params.spaceBetween,
					t = 0,
					s = 0,
					i = 0;
				"string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * g.size), g.virtualSize = -a, g.slides.css(g.rtl ? {
					marginLeft: "",
					marginTop: ""
				} : {
					marginRight: "",
					marginBottom: ""
				});
				var n;
				g.params.slidesPerColumn > 1 && (n = Math.floor(g.slides.length / g.params.slidesPerColumn) === g.slides.length / g.params.slidesPerColumn ? g.slides.length : Math.ceil(g.slides.length / g.params.slidesPerColumn) * g.params.slidesPerColumn);
				var o, l = g.params.slidesPerColumn,
					d = n / l,
					p = d - (g.params.slidesPerColumn * d - g.slides.length);
				for (e = 0; e < g.slides.length; e++) {
					o = 0;
					var u = g.slides.eq(e);
					if (g.params.slidesPerColumn > 1) {
						var c, m, f;
						"column" === g.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > p || m === p && f === l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({
							"-webkit-box-ordinal-group": c,
							"-moz-box-ordinal-group": c,
							"-ms-flex-order": c,
							"-webkit-order": c,
							order: c
						})) : (f = Math.floor(e / d), m = e - f * d), u.css({
							"margin-top": 0 !== f && g.params.spaceBetween && g.params.spaceBetween + "px"
						}).attr("data-swiper-column", m).attr("data-swiper-row", f)
					}
					"none" !== u.css("display") && ("auto" === g.params.slidesPerView ? o = r() ? u.outerWidth(!0) : u.outerHeight(!0) : (o = (g.size - (g.params.slidesPerView - 1) * a) / g.params.slidesPerView, r() ? g.slides[e].style.width = o + "px" : g.slides[e].style.height = o + "px"), g.slides[e].swiperSlideSize = o, g.slidesSizesGrid.push(o), g.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - g.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % g.params.slidesPerGroup === 0 && g.snapGrid.push(t), g.slidesGrid.push(t)) : (i % g.params.slidesPerGroup === 0 && g.snapGrid.push(t), g.slidesGrid.push(t), t = t + o + a), g.virtualSize += o + a, s = o, i++)
				}
				g.virtualSize = Math.max(g.virtualSize, g.size);
				var h;
				if (g.rtl && g.wrongRTL && ("slide" === g.params.effect || "coverflow" === g.params.effect) && g.wrapper.css({
					width: g.virtualSize + g.params.spaceBetween + "px"
				}), (!g.support.flexbox || g.params.setWrapperSize) && g.wrapper.css(r() ? {
					width: g.virtualSize + g.params.spaceBetween + "px"
				} : {
					height: g.virtualSize + g.params.spaceBetween + "px"
				}), g.params.slidesPerColumn > 1 && (g.virtualSize = (o + g.params.spaceBetween) * n, g.virtualSize = Math.ceil(g.virtualSize / g.params.slidesPerColumn) - g.params.spaceBetween, g.wrapper.css({
					width: g.virtualSize + g.params.spaceBetween + "px"
				}), g.params.centeredSlides)) {
					for (h = [], e = 0; e < g.snapGrid.length; e++) g.snapGrid[e] < g.virtualSize + g.snapGrid[0] && h.push(g.snapGrid[e]);
					g.snapGrid = h
				}
				if (!g.params.centeredSlides) {
					for (h = [], e = 0; e < g.snapGrid.length; e++) g.snapGrid[e] <= g.virtualSize - g.size && h.push(g.snapGrid[e]);
					g.snapGrid = h, Math.floor(g.virtualSize - g.size) > Math.floor(g.snapGrid[g.snapGrid.length - 1]) && g.snapGrid.push(g.virtualSize - g.size)
				}
				0 === g.snapGrid.length && (g.snapGrid = [0]), 0 !== g.params.spaceBetween && g.slides.css(r() ? g.rtl ? {
					marginLeft: a + "px"
				} : {
					marginRight: a + "px"
				} : {
					marginBottom: a + "px"
				}), g.params.watchSlidesProgress && g.updateSlidesOffset()
			}, g.updateSlidesOffset = function() {
				for (var e = 0; e < g.slides.length; e++) g.slides[e].swiperSlideOffset = r() ? g.slides[e].offsetLeft : g.slides[e].offsetTop
			}, g.updateSlidesProgress = function(e) {
				if ("undefined" == typeof e && (e = g.translate || 0), 0 !== g.slides.length) {
					"undefined" == typeof g.slides[0].swiperSlideOffset && g.updateSlidesOffset();
					var a = g.params.centeredSlides ? -e + g.size / 2 : -e;
					g.rtl && (a = g.params.centeredSlides ? e - g.size / 2 : e), g.container[0].getBoundingClientRect(), r() ? "left" : "top", r() ? "right" : "bottom", g.slides.removeClass(g.params.slideVisibleClass);
					for (var t = 0; t < g.slides.length; t++) {
						var s = g.slides[t],
							i = g.params.centeredSlides === !0 ? s.swiperSlideSize / 2 : 0,
							n = (a - s.swiperSlideOffset - i) / (s.swiperSlideSize + g.params.spaceBetween);
						if (g.params.watchSlidesVisibility) {
							var o = -(a - s.swiperSlideOffset - i),
								l = o + g.slidesSizesGrid[t],
								d = o >= 0 && o < g.size || l > 0 && l <= g.size || 0 >= o && l >= g.size;
							d && g.slides.eq(t).addClass(g.params.slideVisibleClass)
						}
						s.progress = g.rtl ? -n : n
					}
				}
			}, g.updateProgress = function(e) {
				"undefined" == typeof e && (e = g.translate || 0);
				var a = g.maxTranslate() - g.minTranslate();
				0 === a ? (g.progress = 0, g.isBeginning = g.isEnd = !0) : (g.progress = (e - g.minTranslate()) / a, g.isBeginning = g.progress <= 0, g.isEnd = g.progress >= 1), g.isBeginning && g.emit("onReachBeginning", g), g.isEnd && g.emit("onReachEnd", g), g.params.watchSlidesProgress && g.updateSlidesProgress(e), g.emit("onProgress", g, g.progress)
			}, g.updateActiveIndex = function() {
				var e, a, t, s = g.rtl ? g.translate : -g.translate;
				for (a = 0; a < g.slidesGrid.length; a++) "undefined" != typeof g.slidesGrid[a + 1] ? s >= g.slidesGrid[a] && s < g.slidesGrid[a + 1] - (g.slidesGrid[a + 1] - g.slidesGrid[a]) / 2 ? e = a : s >= g.slidesGrid[a] && s < g.slidesGrid[a + 1] && (e = a + 1) : s >= g.slidesGrid[a] && (e = a);
				(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / g.params.slidesPerGroup), t >= g.snapGrid.length && (t = g.snapGrid.length - 1), e !== g.activeIndex && (g.snapIndex = t, g.previousIndex = g.activeIndex, g.activeIndex = e, g.updateClasses())
			}, g.updateClasses = function() {
				g.slides.removeClass(g.params.slideActiveClass + " " + g.params.slideNextClass + " " + g.params.slidePrevClass);
				var e = g.slides.eq(g.activeIndex);
				if (e.addClass(g.params.slideActiveClass), e.next("." + g.params.slideClass).addClass(g.params.slideNextClass), e.prev("." + g.params.slideClass).addClass(g.params.slidePrevClass), g.bullets && g.bullets.length > 0) {
					g.bullets.removeClass(g.params.bulletActiveClass);
					var a;
					g.params.loop ? (a = Math.ceil(g.activeIndex - g.loopedSlides) / g.params.slidesPerGroup, a > g.slides.length - 1 - 2 * g.loopedSlides && (a -= g.slides.length - 2 * g.loopedSlides), a > g.bullets.length - 1 && (a -= g.bullets.length)) : a = "undefined" != typeof g.snapIndex ? g.snapIndex : g.activeIndex || 0, g.paginationContainer.length > 1 ? g.bullets.each(function() {
						v(this).index() === a && v(this).addClass(g.params.bulletActiveClass)
					}) : g.bullets.eq(a).addClass(g.params.bulletActiveClass)
				}
				g.params.loop || (g.params.prevButton && (g.isBeginning ? (v(g.params.prevButton).addClass(g.params.buttonDisabledClass), g.params.a11y && g.a11y && g.a11y.disable(v(g.params.prevButton))) : (v(g.params.prevButton).removeClass(g.params.buttonDisabledClass), g.params.a11y && g.a11y && g.a11y.enable(v(g.params.prevButton)))), g.params.nextButton && (g.isEnd ? (v(g.params.nextButton).addClass(g.params.buttonDisabledClass), g.params.a11y && g.a11y && g.a11y.disable(v(g.params.nextButton))) : (v(g.params.nextButton).removeClass(g.params.buttonDisabledClass), g.params.a11y && g.a11y && g.a11y.enable(v(g.params.nextButton)))))
			}, g.updatePagination = function() {
				if (g.params.pagination && g.paginationContainer && g.paginationContainer.length > 0) {
					for (var e = "", a = g.params.loop ? Math.ceil((g.slides.length - 2 * g.loopedSlides) / g.params.slidesPerGroup) : g.snapGrid.length, t = 0; a > t; t++) e += g.params.paginationBulletRender ? g.params.paginationBulletRender(t, g.params.bulletClass) : '<span class="' + g.params.bulletClass + '"></span>';
					g.paginationContainer.html(e), g.bullets = g.paginationContainer.find("." + g.params.bulletClass)
				}
			}, g.update = function(e) {
				function a() {
					s = Math.min(Math.max(g.translate, g.maxTranslate()), g.minTranslate()), g.setWrapperTranslate(s), g.updateActiveIndex(), g.updateClasses()
				}
				if (g.updateContainerSize(), g.updateSlidesSize(), g.updateProgress(), g.updatePagination(), g.updateClasses(), g.params.scrollbar && g.scrollbar && g.scrollbar.set(), e) {
					var t, s;
					g.params.freeMode ? a() : (t = "auto" === g.params.slidesPerView && g.isEnd && !g.params.centeredSlides ? g.slideTo(g.slides.length - 1, 0, !1, !0) : g.slideTo(g.activeIndex, 0, !1, !0), t || a())
				}
			}, g.onResize = function(e) {
				if (g.updateContainerSize(), g.updateSlidesSize(), g.updateProgress(), ("auto" === g.params.slidesPerView || g.params.freeMode || e) && g.updatePagination(), g.params.scrollbar && g.scrollbar && g.scrollbar.set(), g.params.freeMode) {
					var a = Math.min(Math.max(g.translate, g.maxTranslate()), g.minTranslate());
					g.setWrapperTranslate(a), g.updateActiveIndex(), g.updateClasses()
				} else g.updateClasses(), "auto" === g.params.slidesPerView && g.isEnd && !g.params.centeredSlides ? g.slideTo(g.slides.length - 1, 0, !1, !0) : g.slideTo(g.activeIndex, 0, !1, !0)
			};
			var w = ["mousedown", "mousemove", "mouseup"];
			window.navigator.pointerEnabled ? w = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (w = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), g.touchEvents = {
				start: g.support.touch || !g.params.simulateTouch ? "touchstart" : w[0],
				move: g.support.touch || !g.params.simulateTouch ? "touchmove" : w[1],
				end: g.support.touch || !g.params.simulateTouch ? "touchend" : w[2]
			}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === g.params.touchEventsTarget ? g.container : g.wrapper).addClass("swiper-wp8-" + g.params.direction), g.initEvents = function(e) {
				var a = e ? "off" : "on",
					t = e ? "removeEventListener" : "addEventListener",
					r = "container" === g.params.touchEventsTarget ? g.container[0] : g.wrapper[0],
					i = g.support.touch ? r : document,
					n = g.params.nested ? !0 : !1;
				g.browser.ie ? (r[t](g.touchEvents.start, g.onTouchStart, !1), i[t](g.touchEvents.move, g.onTouchMove, n), i[t](g.touchEvents.end, g.onTouchEnd, !1)) : (g.support.touch && (r[t](g.touchEvents.start, g.onTouchStart, !1), r[t](g.touchEvents.move, g.onTouchMove, n), r[t](g.touchEvents.end, g.onTouchEnd, !1)), !s.simulateTouch || g.device.ios || g.device.android || (r[t]("mousedown", g.onTouchStart, !1), document[t]("mousemove", g.onTouchMove, n), document[t]("mouseup", g.onTouchEnd, !1))), window[t]("resize", g.onResize), g.params.nextButton && (v(g.params.nextButton)[a]("click", g.onClickNext), g.params.a11y && g.a11y && v(g.params.nextButton)[a]("keydown", g.a11y.onEnterKey)), g.params.prevButton && (v(g.params.prevButton)[a]("click", g.onClickPrev), g.params.a11y && g.a11y && v(g.params.prevButton)[a]("keydown", g.a11y.onEnterKey)), g.params.pagination && g.params.paginationClickable && v(g.paginationContainer)[a]("click", "." + g.params.bulletClass, g.onClickIndex), (g.params.preventClicks || g.params.preventClicksPropagation) && r[t]("click", g.preventClicks, !0)
			}, g.attachEvents = function() {
				g.initEvents()
			}, g.detachEvents = function() {
				g.initEvents(!0)
			}, g.allowClick = !0, g.preventClicks = function(e) {
				g.allowClick || (g.params.preventClicks && e.preventDefault(), g.params.preventClicksPropagation && g.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
			}, g.onClickNext = function(e) {
				e.preventDefault(), g.slideNext()
			}, g.onClickPrev = function(e) {
				e.preventDefault(), g.slidePrev()
			}, g.onClickIndex = function(e) {
				e.preventDefault();
				var a = v(this).index() * g.params.slidesPerGroup;
				g.params.loop && (a += g.loopedSlides), g.slideTo(a)
			}, g.updateClickedSlide = function(e) {
				var a = n(e, "." + g.params.slideClass),
					t = !1;
				if (a)
					for (var s = 0; s < g.slides.length; s++) g.slides[s] === a && (t = !0);
				if (!a || !t) return g.clickedSlide = void 0, void(g.clickedIndex = void 0);
				if (g.clickedSlide = a, g.clickedIndex = v(a).index(), g.params.slideToClickedSlide && void 0 !== g.clickedIndex && g.clickedIndex !== g.activeIndex) {
					var r, i = g.clickedIndex;
					if (g.params.loop)
						if (r = v(g.clickedSlide).attr("data-swiper-slide-index"), i > g.slides.length - g.params.slidesPerView) g.fixLoop(), i = g.wrapper.children("." + g.params.slideClass + '[data-swiper-slide-index="' + r + '"]').eq(0).index(), setTimeout(function() {
							g.slideTo(i)
						}, 0);
						else
					if (i < g.params.slidesPerView - 1) {
						g.fixLoop();
						var o = g.wrapper.children("." + g.params.slideClass + '[data-swiper-slide-index="' + r + '"]');
						i = o.eq(o.length - 1).index(), setTimeout(function() {
							g.slideTo(i)
						}, 0)
					} else g.slideTo(i);
					else g.slideTo(i)
				}
			};
			var y, b, x, T, S, C, M, E, z, P = "input, select, textarea, button",
				I = Date.now(),
				k = [];
			g.animating = !1, g.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var L, D;
			if (g.onTouchStart = function(e) {
				if (e.originalEvent && (e = e.originalEvent), L = "touchstart" === e.type, L || !("which" in e) || 3 !== e.which) {
					if (g.params.noSwiping && n(e, "." + g.params.noSwipingClass)) return void(g.allowClick = !0);
					if (!g.params.swipeHandler || n(e, g.params.swipeHandler)) {
						if (y = !0, b = !1, T = void 0, D = void 0, g.touches.startX = g.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, g.touches.startY = g.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, x = Date.now(), g.allowClick = !0, g.updateContainerSize(), g.swipeDirection = void 0, g.params.threshold > 0 && (M = !1), "touchstart" !== e.type) {
							var a = !0;
							v(e.target).is(P) && (a = !1), document.activeElement && v(document.activeElement).is(P) && document.activeElement.blur(), a && e.preventDefault()
						}
						g.emit("onTouchStart", g, e)
					}
				}
			}, g.onTouchMove = function(e) {
				if (e.originalEvent && (e = e.originalEvent), !(L && "mousemove" === e.type || e.preventedByNestedSwiper)) {
					if (g.params.onlyExternal) return b = !0, void(g.allowClick = !1);
					if (L && document.activeElement && e.target === document.activeElement && v(e.target).is(P)) return b = !0, void(g.allowClick = !1);
					if (g.emit("onTouchMove", g, e), !(e.targetTouches && e.targetTouches.length > 1)) {
						if (g.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, g.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof T) {
							var a = 180 * Math.atan2(Math.abs(g.touches.currentY - g.touches.startY), Math.abs(g.touches.currentX - g.touches.startX)) / Math.PI;
							T = r() ? a > g.params.touchAngle : 90 - a > g.params.touchAngle
						}
						if (T && g.emit("onTouchMoveOpposite", g, e), "undefined" == typeof D && g.browser.ieTouch && (g.touches.currentX !== g.touches.startX || g.touches.currentY !== g.touches.startY) && (D = !0), y) {
							if (T) return void(y = !1);
							if (D || !g.browser.ieTouch) {
								g.allowClick = !1, g.emit("onSliderMove", g, e), e.preventDefault(), g.params.touchMoveStopPropagation && !g.params.nested && e.stopPropagation(), b || (s.loop && g.fixLoop(), C = g.getWrapperTranslate(), g.setWrapperTransition(0), g.animating && g.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), g.params.autoplay && g.autoplaying && (g.params.autoplayDisableOnInteraction ? g.stopAutoplay() : g.pauseAutoplay()), z = !1, g.params.grabCursor && (g.container[0].style.cursor = "move", g.container[0].style.cursor = "-webkit-grabbing", g.container[0].style.cursor = "-moz-grabbin", g.container[0].style.cursor = "grabbing")), b = !0;
								var t = g.touches.diff = r() ? g.touches.currentX - g.touches.startX : g.touches.currentY - g.touches.startY;
								t *= g.params.touchRatio, g.rtl && (t = -t), g.swipeDirection = t > 0 ? "prev" : "next", S = t + C;
								var i = !0;
								if (t > 0 && S > g.minTranslate() ? (i = !1, g.params.resistance && (S = g.minTranslate() - 1 + Math.pow(-g.minTranslate() + C + t, g.params.resistanceRatio))) : 0 > t && S < g.maxTranslate() && (i = !1, g.params.resistance && (S = g.maxTranslate() + 1 - Math.pow(g.maxTranslate() - C - t, g.params.resistanceRatio))), i && (e.preventedByNestedSwiper = !0), !g.params.allowSwipeToNext && "next" === g.swipeDirection && C > S && (S = C), !g.params.allowSwipeToPrev && "prev" === g.swipeDirection && S > C && (S = C), g.params.followFinger) {
									if (g.params.threshold > 0) {
										if (!(Math.abs(t) > g.params.threshold || M)) return void(S = C);
										if (!M) return M = !0, g.touches.startX = g.touches.currentX, g.touches.startY = g.touches.currentY, S = C, void(g.touches.diff = r() ? g.touches.currentX - g.touches.startX : g.touches.currentY - g.touches.startY)
									}(g.params.freeMode || g.params.watchSlidesProgress) && g.updateActiveIndex(), g.params.freeMode && (0 === k.length && k.push({
										position: g.touches[r() ? "startX" : "startY"],
										time: x
									}), k.push({
										position: g.touches[r() ? "currentX" : "currentY"],
										time: (new window.Date).getTime()
									})), g.updateProgress(S), g.setWrapperTranslate(S)
								}
							}
						}
					}
				}
			}, g.onTouchEnd = function(e) {
				if (e.originalEvent && (e = e.originalEvent), g.emit("onTouchEnd", g, e), y) {
					g.params.grabCursor && b && y && (g.container[0].style.cursor = "move", g.container[0].style.cursor = "-webkit-grab", g.container[0].style.cursor = "-moz-grab", g.container[0].style.cursor = "grab");
					var a = Date.now(),
						t = a - x;
					if (g.allowClick && (g.updateClickedSlide(e), g.emit("onTap", g, e), 300 > t && a - I > 300 && (E && clearTimeout(E), E = setTimeout(function() {
						g && (g.params.paginationHide && g.paginationContainer.length > 0 && !v(e.target).hasClass(g.params.bulletClass) && g.paginationContainer.toggleClass(g.params.paginationHiddenClass), g.emit("onClick", g, e))
					}, 300)), 300 > t && 300 > a - I && (E && clearTimeout(E), g.emit("onDoubleTap", g, e))), I = Date.now(), setTimeout(function() {
						g && (g.allowClick = !0)
					}, 0), !y || !b || !g.swipeDirection || 0 === g.touches.diff || S === C) return void(y = b = !1);
					y = b = !1;
					var s;
					if (s = g.params.followFinger ? g.rtl ? g.translate : -g.translate : -S, g.params.freeMode) {
						if (s < -g.minTranslate()) return void g.slideTo(g.activeIndex);
						if (s > -g.maxTranslate()) return void g.slideTo(g.slides.length < g.snapGrid.length ? g.snapGrid.length - 1 : g.slides.length - 1);
						if (g.params.freeModeMomentum) {
							if (k.length > 1) {
								var r = k.pop(),
									i = k.pop(),
									n = r.position - i.position,
									o = r.time - i.time;
								g.velocity = n / o, g.velocity = g.velocity / 2, Math.abs(g.velocity) < .02 && (g.velocity = 0), (o > 150 || (new window.Date).getTime() - r.time > 300) && (g.velocity = 0)
							} else g.velocity = 0;
							k.length = 0;
							var l = 1e3 * g.params.freeModeMomentumRatio,
								d = g.velocity * l,
								p = g.translate + d;
							g.rtl && (p = -p);
							var u, c = !1,
								m = 20 * Math.abs(g.velocity) * g.params.freeModeMomentumBounceRatio;
							if (p < g.maxTranslate()) g.params.freeModeMomentumBounce ? (p + g.maxTranslate() < -m && (p = g.maxTranslate() - m), u = g.maxTranslate(), c = !0, z = !0) : p = g.maxTranslate();
							else if (p > g.minTranslate()) g.params.freeModeMomentumBounce ? (p - g.minTranslate() > m && (p = g.minTranslate() + m), u = g.minTranslate(), c = !0, z = !0) : p = g.minTranslate();
							else if (g.params.freeModeSticky) {
								var f, h = 0;
								for (h = 0; h < g.snapGrid.length; h += 1)
									if (g.snapGrid[h] > -p) {
										f = h;
										break
									}
								p = Math.abs(g.snapGrid[f] - p) < Math.abs(g.snapGrid[f - 1] - p) || "next" === g.swipeDirection ? g.snapGrid[f] : g.snapGrid[f - 1], g.rtl || (p = -p)
							}
							if (0 !== g.velocity) l = Math.abs(g.rtl ? (-p - g.translate) / g.velocity : (p - g.translate) / g.velocity);
							else if (g.params.freeModeSticky) return void g.slideReset();
							g.params.freeModeMomentumBounce && c ? (g.updateProgress(u), g.setWrapperTransition(l), g.setWrapperTranslate(p), g.onTransitionStart(), g.animating = !0, g.wrapper.transitionEnd(function() {
								g && z && (g.emit("onMomentumBounce", g), g.setWrapperTransition(g.params.speed), g.setWrapperTranslate(u), g.wrapper.transitionEnd(function() {
									g && g.onTransitionEnd()
								}))
							})) : g.velocity ? (g.updateProgress(p), g.setWrapperTransition(l), g.setWrapperTranslate(p), g.onTransitionStart(), g.animating || (g.animating = !0, g.wrapper.transitionEnd(function() {
								g && g.onTransitionEnd()
							}))) : g.updateProgress(p), g.updateActiveIndex()
						}
						return void((!g.params.freeModeMomentum || t >= g.params.longSwipesMs) && (g.updateProgress(), g.updateActiveIndex()))
					}
					var w, T = 0,
						M = g.slidesSizesGrid[0];
					for (w = 0; w < g.slidesGrid.length; w += g.params.slidesPerGroup) "undefined" != typeof g.slidesGrid[w + g.params.slidesPerGroup] ? s >= g.slidesGrid[w] && s < g.slidesGrid[w + g.params.slidesPerGroup] && (T = w, M = g.slidesGrid[w + g.params.slidesPerGroup] - g.slidesGrid[w]) : s >= g.slidesGrid[w] && (T = w, M = g.slidesGrid[g.slidesGrid.length - 1] - g.slidesGrid[g.slidesGrid.length - 2]);
					var P = (s - g.slidesGrid[T]) / M;
					if (t > g.params.longSwipesMs) {
						if (!g.params.longSwipes) return void g.slideTo(g.activeIndex);
						"next" === g.swipeDirection && g.slideTo(P >= g.params.longSwipesRatio ? T + g.params.slidesPerGroup : T), "prev" === g.swipeDirection && g.slideTo(P > 1 - g.params.longSwipesRatio ? T + g.params.slidesPerGroup : T)
					} else {
						if (!g.params.shortSwipes) return void g.slideTo(g.activeIndex);
						"next" === g.swipeDirection && g.slideTo(T + g.params.slidesPerGroup), "prev" === g.swipeDirection && g.slideTo(T)
					}
				}
			}, g._slideTo = function(e, a) {
				return g.slideTo(e, a, !0, !0)
			}, g.slideTo = function(e, a, t, s) {
				"undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), g.snapIndex = Math.floor(e / g.params.slidesPerGroup), g.snapIndex >= g.snapGrid.length && (g.snapIndex = g.snapGrid.length - 1);
				var i = -g.snapGrid[g.snapIndex];
				if (!g.params.allowSwipeToNext && i < g.translate && i < g.minTranslate()) return !1;
				if (!g.params.allowSwipeToPrev && i > g.translate && i > g.maxTranslate()) return !1;
				g.params.autoplay && g.autoplaying && (s || !g.params.autoplayDisableOnInteraction ? g.pauseAutoplay(a) : g.stopAutoplay()), g.updateProgress(i);
				for (var n = 0; n < g.slidesGrid.length; n++) - i >= g.slidesGrid[n] && (e = n);
				return "undefined" == typeof a && (a = g.params.speed), g.previousIndex = g.activeIndex || 0, g.activeIndex = e, i === g.translate ? (g.updateClasses(), !1) : (g.updateClasses(), g.onTransitionStart(t), r() ? i : 0, r() ? 0 : i, 0 === a ? (g.setWrapperTransition(0), g.setWrapperTranslate(i), g.onTransitionEnd(t)) : (g.setWrapperTransition(a), g.setWrapperTranslate(i), g.animating || (g.animating = !0, g.wrapper.transitionEnd(function() {
					g && g.onTransitionEnd(t)
				}))), !0)
			}, g.onTransitionStart = function(e) {
				"undefined" == typeof e && (e = !0), g.lazy && g.lazy.onTransitionStart(), e && (g.emit("onTransitionStart", g), g.activeIndex !== g.previousIndex && g.emit("onSlideChangeStart", g))
			}, g.onTransitionEnd = function(e) {
				g.animating = !1, g.setWrapperTransition(0), "undefined" == typeof e && (e = !0), g.lazy && g.lazy.onTransitionEnd(), e && (g.emit("onTransitionEnd", g), g.activeIndex !== g.previousIndex && g.emit("onSlideChangeEnd", g)), g.params.hashnav && g.hashnav && g.hashnav.setHash()
			}, g.slideNext = function(e, a, t) {
				return g.params.loop ? g.animating ? !1 : (g.fixLoop(), g.container[0].clientLeft, g.slideTo(g.activeIndex + g.params.slidesPerGroup, a, e, t)) : g.slideTo(g.activeIndex + g.params.slidesPerGroup, a, e, t)
			}, g._slideNext = function(e) {
				return g.slideNext(!0, e, !0)
			}, g.slidePrev = function(e, a, t) {
				return g.params.loop ? g.animating ? !1 : (g.fixLoop(), g.container[0].clientLeft, g.slideTo(g.activeIndex - 1, a, e, t)) : g.slideTo(g.activeIndex - 1, a, e, t)
			}, g._slidePrev = function(e) {
				return g.slidePrev(!0, e, !0)
			}, g.slideReset = function(e, a) {
				return g.slideTo(g.activeIndex, a, e)
			}, g.setWrapperTransition = function(e, a) {
				g.wrapper.transition(e), "slide" !== g.params.effect && g.effects[g.params.effect] && g.effects[g.params.effect].setTransition(e), g.params.parallax && g.parallax && g.parallax.setTransition(e), g.params.scrollbar && g.scrollbar && g.scrollbar.setTransition(e), g.params.control && g.controller && g.controller.setTransition(e, a), g.emit("onSetTransition", g, e)
			}, g.setWrapperTranslate = function(e, a, t) {
				var s = 0,
					i = 0,
					n = 0;
				r() ? s = g.rtl ? -e : e : i = e, g.params.virtualTranslate || g.wrapper.transform(g.support.transforms3d ? "translate3d(" + s + "px, " + i + "px, " + n + "px)" : "translate(" + s + "px, " + i + "px)"), g.translate = r() ? s : i, a && g.updateActiveIndex(), "slide" !== g.params.effect && g.effects[g.params.effect] && g.effects[g.params.effect].setTranslate(g.translate), g.params.parallax && g.parallax && g.parallax.setTranslate(g.translate), g.params.scrollbar && g.scrollbar && g.scrollbar.setTranslate(g.translate), g.params.control && g.controller && g.controller.setTranslate(g.translate, t), g.emit("onSetTranslate", g, g.translate)
			}, g.getTranslate = function(e, a) {
				var t, s, r, i;
				return "undefined" == typeof a && (a = "x"), g.params.virtualTranslate ? g.rtl ? -g.translate : g.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? i = new window.WebKitCSSMatrix("none" === r.webkitTransform ? "" : r.webkitTransform) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : parseFloat(16 === t.length ? t[13] : t[5])), g.rtl && s && (s = -s), s || 0)
			}, g.getWrapperTranslate = function(e) {
				return "undefined" == typeof e && (e = r() ? "x" : "y"), g.getTranslate(g.wrapper[0], e)
			}, g.observers = [], g.initObservers = function() {
				if (g.params.observeParents)
					for (var e = g.container.parents(), a = 0; a < e.length; a++) o(e[a]);
				o(g.container[0], {
					childList: !1
				}), o(g.wrapper[0], {
					attributes: !1
				})
			}, g.disconnectObservers = function() {
				for (var e = 0; e < g.observers.length; e++) g.observers[e].disconnect();
				g.observers = []
			}, g.createLoop = function() {
				g.wrapper.children("." + g.params.slideClass + "." + g.params.slideDuplicateClass).remove();
				var e = g.wrapper.children("." + g.params.slideClass);
				g.loopedSlides = parseInt(g.params.loopedSlides || g.params.slidesPerView, 10), g.loopedSlides = g.loopedSlides + g.params.loopAdditionalSlides, g.loopedSlides > e.length && (g.loopedSlides = e.length);
				var a, t = [],
					s = [];
				for (e.each(function(a, r) {
					var i = v(this);
					a < g.loopedSlides && s.push(r), a < e.length && a >= e.length - g.loopedSlides && t.push(r), i.attr("data-swiper-slide-index", a)
				}), a = 0; a < s.length; a++) g.wrapper.append(v(s[a].cloneNode(!0)).addClass(g.params.slideDuplicateClass));
				for (a = t.length - 1; a >= 0; a--) g.wrapper.prepend(v(t[a].cloneNode(!0)).addClass(g.params.slideDuplicateClass))
			}, g.destroyLoop = function() {
				g.wrapper.children("." + g.params.slideClass + "." + g.params.slideDuplicateClass).remove(), g.slides.removeAttr("data-swiper-slide-index")
			}, g.fixLoop = function() {
				var e;
				g.activeIndex < g.loopedSlides ? (e = g.slides.length - 3 * g.loopedSlides + g.activeIndex, e += g.loopedSlides, g.slideTo(e, 0, !1, !0)) : ("auto" === g.params.slidesPerView && g.activeIndex >= 2 * g.loopedSlides || g.activeIndex > g.slides.length - 2 * g.params.slidesPerView) && (e = -g.slides.length + g.activeIndex + g.loopedSlides, e += g.loopedSlides, g.slideTo(e, 0, !1, !0))
			}, g.appendSlide = function(e) {
				if (g.params.loop && g.destroyLoop(), "object" == typeof e && e.length)
					for (var a = 0; a < e.length; a++) e[a] && g.wrapper.append(e[a]);
				else g.wrapper.append(e);
				g.params.loop && g.createLoop(), g.params.observer && g.support.observer || g.update(!0)
			}, g.prependSlide = function(e) {
				g.params.loop && g.destroyLoop();
				var a = g.activeIndex + 1;
				if ("object" == typeof e && e.length) {
					for (var t = 0; t < e.length; t++) e[t] && g.wrapper.prepend(e[t]);
					a = g.activeIndex + e.length
				} else g.wrapper.prepend(e);
				g.params.loop && g.createLoop(), g.params.observer && g.support.observer || g.update(!0), g.slideTo(a, 0, !1)
			}, g.removeSlide = function(e) {
				g.params.loop && (g.destroyLoop(), g.slides = g.wrapper.children("." + g.params.slideClass));
				var a, t = g.activeIndex;
				if ("object" == typeof e && e.length) {
					for (var s = 0; s < e.length; s++) a = e[s], g.slides[a] && g.slides.eq(a).remove(), t > a && t--;
					t = Math.max(t, 0)
				} else a = e, g.slides[a] && g.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
				g.params.loop && g.createLoop(), g.params.observer && g.support.observer || g.update(!0), g.params.loop ? g.slideTo(t + g.loopedSlides, 0, !1) : g.slideTo(t, 0, !1)
			}, g.removeAllSlides = function() {
				for (var e = [], a = 0; a < g.slides.length; a++) e.push(a);
				g.removeSlide(e)
			}, g.effects = {
				fade: {
					setTranslate: function() {
						for (var e = 0; e < g.slides.length; e++) {
							var a = g.slides.eq(e),
								t = a[0].swiperSlideOffset,
								s = -t;
							g.params.virtualTranslate || (s -= g.translate);
							var i = 0;
							r() || (i = s, s = 0);
							var n = g.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
							a.css({
								opacity: n
							}).transform("translate3d(" + s + "px, " + i + "px, 0px)")
						}
					},
					setTransition: function(e) {
						if (g.slides.transition(e), g.params.virtualTranslate && 0 !== e) {
							var a = !1;
							g.slides.transitionEnd(function() {
								if (!a && g) {
									a = !0, g.animating = !1;
									for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) g.wrapper.trigger(e[t])
								}
							})
						}
					}
				},
				cube: {
					setTranslate: function() {
						var e, a = 0;
						g.params.cube.shadow && (r() ? (e = g.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = v('<div class="swiper-cube-shadow"></div>'), g.wrapper.append(e)), e.css({
							height: g.width + "px"
						})) : (e = g.container.find(".swiper-cube-shadow"), 0 === e.length && (e = v('<div class="swiper-cube-shadow"></div>'), g.container.append(e))));
						for (var t = 0; t < g.slides.length; t++) {
							var s = g.slides.eq(t),
								i = 90 * t,
								n = Math.floor(i / 360);
							g.rtl && (i = -i, n = Math.floor(-i / 360));
							var o = Math.max(Math.min(s[0].progress, 1), -1),
								l = 0,
								d = 0,
								p = 0;
							t % 4 === 0 ? (l = 4 * -n * g.size, p = 0) : (t - 1) % 4 === 0 ? (l = 0, p = 4 * -n * g.size) : (t - 2) % 4 === 0 ? (l = g.size + 4 * n * g.size, p = g.size) : (t - 3) % 4 === 0 && (l = -g.size, p = 3 * g.size + 4 * g.size * n), g.rtl && (l = -l), r() || (d = l, l = 0);
							var u = "rotateX(" + (r() ? 0 : -i) + "deg) rotateY(" + (r() ? i : 0) + "deg) translate3d(" + l + "px, " + d + "px, " + p + "px)";
							if (1 >= o && o > -1 && (a = 90 * t + 90 * o, g.rtl && (a = 90 * -t - 90 * o)), s.transform(u), g.params.cube.slideShadows) {
								var c = s.find(r() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
									m = s.find(r() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
								0 === c.length && (c = v('<div class="swiper-slide-shadow-' + (r() ? "left" : "top") + '"></div>'), s.append(c)), 0 === m.length && (m = v('<div class="swiper-slide-shadow-' + (r() ? "right" : "bottom") + '"></div>'), s.append(m)), s[0].progress, c.length && (c[0].style.opacity = -s[0].progress), m.length && (m[0].style.opacity = s[0].progress)
							}
						}
						if (g.wrapper.css({
							"-webkit-transform-origin": "50% 50% -" + g.size / 2 + "px",
							"-moz-transform-origin": "50% 50% -" + g.size / 2 + "px",
							"-ms-transform-origin": "50% 50% -" + g.size / 2 + "px",
							"transform-origin": "50% 50% -" + g.size / 2 + "px"
						}), g.params.cube.shadow)
							if (r()) e.transform("translate3d(0px, " + (g.width / 2 + g.params.cube.shadowOffset) + "px, " + -g.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + g.params.cube.shadowScale + ")");
							else {
								var f = Math.abs(a) - 90 * Math.floor(Math.abs(a) / 90),
									h = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
									w = g.params.cube.shadowScale,
									y = g.params.cube.shadowScale / h,
									b = g.params.cube.shadowOffset;
								e.transform("scale3d(" + w + ", 1, " + y + ") translate3d(0px, " + (g.height / 2 + b) + "px, " + -g.height / 2 / y + "px) rotateX(-90deg)")
							}
						var x = g.isSafari || g.isUiWebView ? -g.size / 2 : 0;
						g.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (r() ? 0 : a) + "deg) rotateY(" + (r() ? -a : 0) + "deg)")
					},
					setTransition: function(e) {
						g.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), g.params.cube.shadow && !r() && g.container.find(".swiper-cube-shadow").transition(e)
					}
				},
				coverflow: {
					setTranslate: function() {
						for (var e = g.translate, a = r() ? -e + g.width / 2 : -e + g.height / 2, t = r() ? g.params.coverflow.rotate : -g.params.coverflow.rotate, s = g.params.coverflow.depth, i = 0, n = g.slides.length; n > i; i++) {
							var o = g.slides.eq(i),
								l = g.slidesSizesGrid[i],
								d = o[0].swiperSlideOffset,
								p = (a - d - l / 2) / l * g.params.coverflow.modifier,
								u = r() ? t * p : 0,
								c = r() ? 0 : t * p,
								m = -s * Math.abs(p),
								f = r() ? 0 : g.params.coverflow.stretch * p,
								h = r() ? g.params.coverflow.stretch * p : 0;
							Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
							var w = "translate3d(" + h + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
							if (o.transform(w), o[0].style.zIndex = -Math.abs(Math.round(p)) + 1, g.params.coverflow.slideShadows) {
								var y = o.find(r() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
									b = o.find(r() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
								0 === y.length && (y = v('<div class="swiper-slide-shadow-' + (r() ? "left" : "top") + '"></div>'), o.append(y)), 0 === b.length && (b = v('<div class="swiper-slide-shadow-' + (r() ? "right" : "bottom") + '"></div>'), o.append(b)), y.length && (y[0].style.opacity = p > 0 ? p : 0), b.length && (b[0].style.opacity = -p > 0 ? -p : 0)
							}
						}
						if (g.browser.ie) {
							var x = g.wrapper[0].style;
							x.perspectiveOrigin = a + "px 50%"
						}
					},
					setTransition: function(e) {
						g.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
					}
				}
			}, g.lazy = {
				initialImageLoaded: !1,
				loadImageInSlide: function(e, a) {
					if ("undefined" != typeof e && ("undefined" == typeof a && (a = !0), 0 !== g.slides.length)) {
						var t = g.slides.eq(e),
							s = t.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
						!t.hasClass("swiper-lazy") || t.hasClass("swiper-lazy-loaded") || t.hasClass("swiper-lazy-loading") || s.add(t[0]), 0 !== s.length && s.each(function() {
							var e = v(this);
							e.addClass("swiper-lazy-loading");
							var s = e.attr("data-background"),
								r = e.attr("data-src");
							g.loadImage(e[0], r || s, !1, function() {
								if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr("data-background")) : (e.attr("src", r), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), t.find(".swiper-lazy-preloader, .preloader").remove(), g.params.loop && a) {
									var i = t.attr("data-swiper-slide-index");
									if (t.hasClass(g.params.slideDuplicateClass)) {
										var n = g.wrapper.children('[data-swiper-slide-index="' + i + '"]:not(.' + g.params.slideDuplicateClass + ")");
										g.lazy.loadImageInSlide(n.index(), !1)
									} else {
										var o = g.wrapper.children("." + g.params.slideDuplicateClass + '[data-swiper-slide-index="' + i + '"]');
										g.lazy.loadImageInSlide(o.index(), !1)
									}
								}
								g.emit("onLazyImageReady", g, t[0], e[0])
							}), g.emit("onLazyImageLoad", g, t[0], e[0])
						})
					}
				},
				load: function() {
					var e;
					if (g.params.watchSlidesVisibility) g.wrapper.children("." + g.params.slideVisibleClass).each(function() {
						g.lazy.loadImageInSlide(v(this).index())
					});
					else if (g.params.slidesPerView > 1)
						for (e = g.activeIndex; e < g.activeIndex + g.params.slidesPerView; e++) g.slides[e] && g.lazy.loadImageInSlide(e);
					else g.lazy.loadImageInSlide(g.activeIndex); if (g.params.lazyLoadingInPrevNext)
						if (g.params.slidesPerView > 1) {
							for (e = g.activeIndex + g.params.slidesPerView; e < g.activeIndex + g.params.slidesPerView + g.params.slidesPerView; e++) g.slides[e] && g.lazy.loadImageInSlide(e);
							for (e = g.activeIndex - g.params.slidesPerView; e < g.activeIndex; e++) g.slides[e] && g.lazy.loadImageInSlide(e)
						} else {
							var a = g.wrapper.children("." + g.params.slideNextClass);
							a.length > 0 && g.lazy.loadImageInSlide(a.index());
							var t = g.wrapper.children("." + g.params.slidePrevClass);
							t.length > 0 && g.lazy.loadImageInSlide(t.index())
						}
				},
				onTransitionStart: function() {
					g.params.lazyLoading && (g.params.lazyLoadingOnTransitionStart || !g.params.lazyLoadingOnTransitionStart && !g.lazy.initialImageLoaded) && g.lazy.load()
				},
				onTransitionEnd: function() {
					g.params.lazyLoading && !g.params.lazyLoadingOnTransitionStart && g.lazy.load()
				}
			}, g.scrollbar = {
				set: function() {
					if (g.params.scrollbar) {
						var e = g.scrollbar;
						e.track = v(g.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = v('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = r() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = g.size / g.virtualSize, e.moveDivider = e.divider * (e.trackSize / g.size), e.dragSize = e.trackSize * e.divider, r() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", g.params.scrollbarHide && (e.track[0].style.opacity = 0)
					}
				},
				setTranslate: function() {
					if (g.params.scrollbar) {
						var e, a = g.scrollbar,
							t = (g.translate || 0, a.dragSize);
						e = (a.trackSize - a.dragSize) * g.progress, g.rtl && r() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), r() ? (a.drag.transform(g.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(g.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), g.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
							a.track[0].style.opacity = 0, a.track.transition(400)
						}, 1e3))
					}
				},
				setTransition: function(e) {
					g.params.scrollbar && g.scrollbar.drag.transition(e)
				}
			}, g.controller = {
				setTranslate: function(e, t) {
					function s(a) {
						e = a.rtl && "horizontal" === a.params.direction ? -g.translate : g.translate, r = (a.maxTranslate() - a.minTranslate()) / (g.maxTranslate() - g.minTranslate()), i = (e - g.minTranslate()) * r + a.minTranslate(), g.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, g), a.updateActiveIndex()
					}
					var r, i, n = g.params.control;
					if (g.isArray(n))
						for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
					else n instanceof a && t !== n && s(n)
				},
				setTransition: function(e, t) {
					function s(a) {
						a.setWrapperTransition(e, g), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
							i && a.onTransitionEnd()
						}))
					}
					var r, i = g.params.control;
					if (g.isArray(i))
						for (r = 0; r < i.length; r++) i[r] !== t && i[r] instanceof a && s(i[r]);
					else i instanceof a && t !== i && s(i)
				}
			}, g.hashnav = {
				init: function() {
					if (g.params.hashnav) {
						g.hashnav.initialized = !0;
						var e = document.location.hash.replace("#", "");
						if (e)
							for (var a = 0, t = 0, s = g.slides.length; s > t; t++) {
								var r = g.slides.eq(t),
									i = r.attr("data-hash");
								if (i === e && !r.hasClass(g.params.slideDuplicateClass)) {
									var n = r.index();
									g.slideTo(n, a, g.params.runCallbacksOnInit, !0)
								}
							}
					}
				},
				setHash: function() {
					g.hashnav.initialized && g.params.hashnav && (document.location.hash = g.slides.eq(g.activeIndex).attr("data-hash") || "")
				}
			}, g.disableKeyboardControl = function() {
				v(document).off("keydown", l)
			}, g.enableKeyboardControl = function() {
				v(document).on("keydown", l)
			}, g.mousewheel = {
				event: !1,
				lastScrollTime: (new window.Date).getTime()
			}, g.params.mousewheelControl) {
				if (void 0 !== document.onmousewheel && (g.mousewheel.event = "mousewheel"), !g.mousewheel.event) try {
					new window.WheelEvent("wheel"), g.mousewheel.event = "wheel"
				} catch (G) {}
				g.mousewheel.event || (g.mousewheel.event = "DOMMouseScroll")
			}
			g.disableMousewheelControl = function() {
				return g.mousewheel.event ? (g.container.off(g.mousewheel.event, d), !0) : !1
			}, g.enableMousewheelControl = function() {
				return g.mousewheel.event ? (g.container.on(g.mousewheel.event, d), !0) : !1
			}, g.parallax = {
				setTranslate: function() {
					g.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						p(this, g.progress)
					}), g.slides.each(function() {
						var e = v(this);
						e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							var a = Math.min(Math.max(e[0].progress, -1), 1);
							p(this, a)
						})
					})
				},
				setTransition: function(e) {
					"undefined" == typeof e && (e = g.params.speed), g.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var a = v(this),
							t = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
						0 === e && (t = 0), a.transition(t)
					})
				}
			}, g._plugins = [];
			for (var B in g.plugins) {
				var A = g.plugins[B](g, g.params[B]);
				A && g._plugins.push(A)
			}
			return g.callPlugins = function(e) {
				for (var a = 0; a < g._plugins.length; a++) e in g._plugins[a] && g._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, g.emitterEventListeners = {}, g.emit = function(e) {
				g.params[e] && g.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var a;
				if (g.emitterEventListeners[e])
					for (a = 0; a < g.emitterEventListeners[e].length; a++) g.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				g.callPlugins && g.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, g.on = function(e, a) {
				return e = u(e), g.emitterEventListeners[e] || (g.emitterEventListeners[e] = []), g.emitterEventListeners[e].push(a), g
			}, g.off = function(e, a) {
				var t;
				if (e = u(e), "undefined" == typeof a) return g.emitterEventListeners[e] = [], g;
				if (g.emitterEventListeners[e] && 0 !== g.emitterEventListeners[e].length) {
					for (t = 0; t < g.emitterEventListeners[e].length; t++) g.emitterEventListeners[e][t] === a && g.emitterEventListeners[e].splice(t, 1);
					return g
				}
			}, g.once = function(e, a) {
				e = u(e);
				var t = function() {
					a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), g.off(e, t)
				};
				return g.on(e, t), g
			}, g.a11y = {
				makeFocusable: function(e) {
					return e[0].tabIndex = "0", e
				},
				addRole: function(e, a) {
					return e.attr("role", a), e
				},
				addLabel: function(e, a) {
					return e.attr("aria-label", a), e
				},
				disable: function(e) {
					return e.attr("aria-disabled", !0), e
				},
				enable: function(e) {
					return e.attr("aria-disabled", !1), e
				},
				onEnterKey: function(e) {
					13 === e.keyCode && (v(e.target).is(g.params.nextButton) ? (g.onClickNext(e), g.a11y.notify(g.isEnd ? g.params.lastSlideMsg : g.params.nextSlideMsg)) : v(e.target).is(g.params.prevButton) && (g.onClickPrev(e), g.a11y.notify(g.isBeginning ? g.params.firstSlideMsg : g.params.prevSlideMsg)))
				},
				liveRegion: v('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(e) {
					var a = g.a11y.liveRegion;
					0 !== a.length && (a.html(""), a.html(e))
				},
				init: function() {
					if (g.params.nextButton) {
						var e = v(g.params.nextButton);
						g.a11y.makeFocusable(e), g.a11y.addRole(e, "button"), g.a11y.addLabel(e, g.params.nextSlideMsg)
					}
					if (g.params.prevButton) {
						var a = v(g.params.prevButton);
						g.a11y.makeFocusable(a), g.a11y.addRole(a, "button"), g.a11y.addLabel(a, g.params.prevSlideMsg)
					}
					v(g.container).append(g.a11y.liveRegion)
				},
				destroy: function() {
					g.a11y.liveRegion && g.a11y.liveRegion.length > 0 && g.a11y.liveRegion.remove()
				}
			}, g.init = function() {
				g.params.loop && g.createLoop(), g.updateContainerSize(), g.updateSlidesSize(), g.updatePagination(), g.params.scrollbar && g.scrollbar && g.scrollbar.set(), "slide" !== g.params.effect && g.effects[g.params.effect] && (g.params.loop || g.updateProgress(), g.effects[g.params.effect].setTranslate()), g.params.loop ? g.slideTo(g.params.initialSlide + g.loopedSlides, 0, g.params.runCallbacksOnInit) : (g.slideTo(g.params.initialSlide, 0, g.params.runCallbacksOnInit), 0 === g.params.initialSlide && (g.parallax && g.params.parallax && g.parallax.setTranslate(), g.lazy && g.params.lazyLoading && (g.lazy.load(), g.lazy.initialImageLoaded = !0))), g.attachEvents(), g.params.observer && g.support.observer && g.initObservers(), g.params.preloadImages && !g.params.lazyLoading && g.preloadImages(), g.params.autoplay && g.startAutoplay(), g.params.keyboardControl && g.enableKeyboardControl && g.enableKeyboardControl(), g.params.mousewheelControl && g.enableMousewheelControl && g.enableMousewheelControl(), g.params.hashnav && g.hashnav && g.hashnav.init(), g.params.a11y && g.a11y && g.a11y.init(), g.emit("onInit", g)
			}, g.cleanupStyles = function() {
				g.container.removeClass(g.classNames.join(" ")).removeAttr("style"), g.wrapper.removeAttr("style"), g.slides && g.slides.length && g.slides.removeClass([g.params.slideVisibleClass, g.params.slideActiveClass, g.params.slideNextClass, g.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), g.paginationContainer && g.paginationContainer.length && g.paginationContainer.removeClass(g.params.paginationHiddenClass), g.bullets && g.bullets.length && g.bullets.removeClass(g.params.bulletActiveClass), g.params.prevButton && v(g.params.prevButton).removeClass(g.params.buttonDisabledClass), g.params.nextButton && v(g.params.nextButton).removeClass(g.params.buttonDisabledClass), g.params.scrollbar && g.scrollbar && (g.scrollbar.track && g.scrollbar.track.length && g.scrollbar.track.removeAttr("style"), g.scrollbar.drag && g.scrollbar.drag.length && g.scrollbar.drag.removeAttr("style"))
			}, g.destroy = function(e, a) {
				g.detachEvents(), g.stopAutoplay(), g.params.loop && g.destroyLoop(), a && g.cleanupStyles(), g.disconnectObservers(), g.params.keyboardControl && g.disableKeyboardControl && g.disableKeyboardControl(), g.params.mousewheelControl && g.disableMousewheelControl && g.disableMousewheelControl(), g.params.a11y && g.a11y && g.a11y.destroy(), g.emit("onDestroy"), e !== !1 && (g = null)
			}, g.init(), g
		}
	};
	a.prototype = {
		isSafari: function() {
			var e = navigator.userAgent.toLowerCase();
			return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
		}(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
		isArray: function(e) {
			return "[object Array]" === Object.prototype.toString.apply(e)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
		},
		device: function() {
			var e = navigator.userAgent,
				a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				t = e.match(/(iPad).*OS\s([\d_]+)/),
				s = (e.match(/(iPod)(.*OS\s([\d_]+))?/), !t && e.match(/(iPhone\sOS)\s([\d_]+)/));
			return {
				ios: t || s || t,
				android: a
			}
		}(),
		support: {
			touch: window.Modernizr && Modernizr.touch === !0 || function() {
				return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			}(),
			transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
				var e = document.createElement("div").style;
				return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
			}(),
			flexbox: function() {
				for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
					if (a[t] in e) return !0
			}(),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			}()
		},
		plugins: {}
	};
	for (var t = (function() {
		var e = function(e) {
			var a = this,
				t = 0;
			for (t = 0; t < e.length; t++) a[t] = e[t];
			return a.length = e.length, this
		}, a = function(a, t) {
				var s = [],
					r = 0;
				if (a && !t && a instanceof e) return a;
				if (a)
					if ("string" == typeof a) {
						var i, n, o = a.trim();
						if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
							var l = "div";
							for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, r = 0; r < n.childNodes.length; r++) s.push(n.childNodes[r])
						} else
							for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], r = 0; r < i.length; r++) i[r] && s.push(i[r])
					} else
				if (a.nodeType || a === window || a === document) s.push(a);
				else if (a.length > 0 && a[0].nodeType)
					for (r = 0; r < a.length; r++) s.push(a[r]);
				return new e(s)
			};
		return e.prototype = {
			addClass: function(e) {
				if ("undefined" == typeof e) return this;
				for (var a = e.split(" "), t = 0; t < a.length; t++)
					for (var s = 0; s < this.length; s++) this[s].classList.add(a[t]);
				return this
			},
			removeClass: function(e) {
				for (var a = e.split(" "), t = 0; t < a.length; t++)
					for (var s = 0; s < this.length; s++) this[s].classList.remove(a[t]);
				return this
			},
			hasClass: function(e) {
				return this[0] ? this[0].classList.contains(e) : !1
			},
			toggleClass: function(e) {
				for (var a = e.split(" "), t = 0; t < a.length; t++)
					for (var s = 0; s < this.length; s++) this[s].classList.toggle(a[t]);
				return this
			},
			attr: function(e, a) {
				if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
				for (var t = 0; t < this.length; t++)
					if (2 === arguments.length) this[t].setAttribute(e, a);
					else
						for (var s in e) this[t][s] = e[s], this[t].setAttribute(s, e[s]);
				return this
			},
			removeAttr: function(e) {
				for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
				return this
			},
			data: function(e, a) {
				if ("undefined" == typeof a) {
					if (this[0]) {
						var t = this[0].getAttribute("data-" + e);
						return t ? t : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
					}
					return void 0
				}
				for (var s = 0; s < this.length; s++) {
					var r = this[s];
					r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
				}
				return this
			},
			transform: function(e) {
				for (var a = 0; a < this.length; a++) {
					var t = this[a].style;
					t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
				}
				return this
			},
			transition: function(e) {
				"string" != typeof e && (e += "ms");
				for (var a = 0; a < this.length; a++) {
					var t = this[a].style;
					t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
				}
				return this
			},
			on: function(e, t, s, r) {
				function i(e) {
					var r = e.target;
					if (a(r).is(t)) s.call(r, e);
					else
						for (var i = a(r).parents(), n = 0; n < i.length; n++) a(i[n]).is(t) && s.call(i[n], e)
				}
				var n, o, l = e.split(" ");
				for (n = 0; n < this.length; n++)
					if ("function" == typeof t || t === !1)
						for ("function" == typeof t && (s = arguments[1], r = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], s, r);
					else
						for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
							listener: s,
							liveListener: i
						}), this[n].addEventListener(l[o], i, r);
				return this
			},
			off: function(e, a, t, s) {
				for (var r = e.split(" "), i = 0; i < r.length; i++)
					for (var n = 0; n < this.length; n++)
						if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], s = arguments[2] || !1), this[n].removeEventListener(r[i], t, s);
						else
				if (this[n].dom7LiveListeners)
					for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(r[i], this[n].dom7LiveListeners[o].liveListener, s);
				return this
			},
			once: function(e, a, t, s) {
				function r(n) {
					t(n), i.off(e, a, r, s)
				}
				var i = this;
				"function" == typeof a && (a = !1, t = arguments[1], s = arguments[2]), i.on(e, a, r, s)
			},
			trigger: function(e, a) {
				for (var t = 0; t < this.length; t++) {
					var s;
					try {
						s = new window.CustomEvent(e, {
							detail: a,
							bubbles: !0,
							cancelable: !0
						})
					} catch (r) {
						s = document.createEvent("Event"), s.initEvent(e, !0, !0), s.detail = a
					}
					this[t].dispatchEvent(s)
				}
				return this
			},
			transitionEnd: function(e) {
				function a(i) {
					if (i.target === this)
						for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
				}
				var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
					r = this;
				if (e)
					for (t = 0; t < s.length; t++) r.on(s[t], a);
				return this
			},
			width: function() {
				return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
			},
			outerWidth: function(e) {
				return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
			},
			height: function() {
				return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
			},
			outerHeight: function(e) {
				return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
			},
			offset: function() {
				if (this.length > 0) {
					var e = this[0],
						a = e.getBoundingClientRect(),
						t = document.body,
						s = e.clientTop || t.clientTop || 0,
						r = e.clientLeft || t.clientLeft || 0,
						i = window.pageYOffset || e.scrollTop,
						n = window.pageXOffset || e.scrollLeft;
					return {
						top: a.top + i - s,
						left: a.left + n - r
					}
				}
				return null
			},
			css: function(e, a) {
				var t;
				if (1 === arguments.length) {
					if ("string" != typeof e) {
						for (t = 0; t < this.length; t++)
							for (var s in e) this[t].style[s] = e[s];
						return this
					}
					if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
				}
				if (2 === arguments.length && "string" == typeof e) {
					for (t = 0; t < this.length; t++) this[t].style[e] = a;
					return this
				}
				return this
			},
			each: function(e) {
				for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
				return this
			},
			html: function(e) {
				if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
				for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
				return this
			},
			is: function(t) {
				if (!this[0]) return !1;
				var s, r;
				if ("string" == typeof t) {
					var i = this[0];
					if (i === document) return t === document;
					if (i === window) return t === window;
					if (i.matches) return i.matches(t);
					if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
					if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
					if (i.msMatchesSelector) return i.msMatchesSelector(t);
					for (s = a(t), r = 0; r < s.length; r++)
						if (s[r] === this[0]) return !0;
					return !1
				}
				if (t === document) return this[0] === document;
				if (t === window) return this[0] === window;
				if (t.nodeType || t instanceof e) {
					for (s = t.nodeType ? [t] : t, r = 0; r < s.length; r++)
						if (s[r] === this[0]) return !0;
					return !1
				}
				return !1
			},
			index: function() {
				if (this[0]) {
					for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
					return a
				}
				return void 0
			},
			eq: function(a) {
				if ("undefined" == typeof a) return this;
				var t, s = this.length;
				return a > s - 1 ? new e([]) : 0 > a ? (t = s + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
			},
			append: function(a) {
				var t, s;
				for (t = 0; t < this.length; t++)
					if ("string" == typeof a) {
						var r = document.createElement("div");
						for (r.innerHTML = a; r.firstChild;) this[t].appendChild(r.firstChild)
					} else
				if (a instanceof e)
					for (s = 0; s < a.length; s++) this[t].appendChild(a[s]);
				else this[t].appendChild(a);
				return this
			},
			prepend: function(a) {
				var t, s;
				for (t = 0; t < this.length; t++)
					if ("string" == typeof a) {
						var r = document.createElement("div");
						for (r.innerHTML = a, s = r.childNodes.length - 1; s >= 0; s--) this[t].insertBefore(r.childNodes[s], this[t].childNodes[0])
					} else
				if (a instanceof e)
					for (s = 0; s < a.length; s++) this[t].insertBefore(a[s], this[t].childNodes[0]);
				else this[t].insertBefore(a, this[t].childNodes[0]);
				return this
			},
			insertBefore: function(e) {
				for (var t = a(e), s = 0; s < this.length; s++)
					if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);
					else
				if (t.length > 1)
					for (var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[s].cloneNode(!0), t[r])
			},
			insertAfter: function(e) {
				for (var t = a(e), s = 0; s < this.length; s++)
					if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);
					else
				if (t.length > 1)
					for (var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[s].cloneNode(!0), t[r].nextSibling)
			},
			next: function(t) {
				return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
			},
			nextAll: function(t) {
				var s = [],
					r = this[0];
				if (!r) return new e([]);
				for (; r.nextElementSibling;) {
					var i = r.nextElementSibling;
					t ? a(i).is(t) && s.push(i) : s.push(i), r = i
				}
				return new e(s)
			},
			prev: function(t) {
				return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
			},
			prevAll: function(t) {
				var s = [],
					r = this[0];
				if (!r) return new e([]);
				for (; r.previousElementSibling;) {
					var i = r.previousElementSibling;
					t ? a(i).is(t) && s.push(i) : s.push(i), r = i
				}
				return new e(s)
			},
			parent: function(e) {
				for (var t = [], s = 0; s < this.length; s++) e ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode);
				return a(a.unique(t))
			},
			parents: function(e) {
				for (var t = [], s = 0; s < this.length; s++)
					for (var r = this[s].parentNode; r;) e ? a(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
				return a(a.unique(t))
			},
			find: function(a) {
				for (var t = [], s = 0; s < this.length; s++)
					for (var r = this[s].querySelectorAll(a), i = 0; i < r.length; i++) t.push(r[i]);
				return new e(t)
			},
			children: function(t) {
				for (var s = [], r = 0; r < this.length; r++)
					for (var i = this[r].childNodes, n = 0; n < i.length; n++) t ? 1 === i[n].nodeType && a(i[n]).is(t) && s.push(i[n]) : 1 === i[n].nodeType && s.push(i[n]);
				return new e(a.unique(s))
			},
			remove: function() {
				for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
				return this
			},
			add: function() {
				var e, t, s = this;
				for (e = 0; e < arguments.length; e++) {
					var r = a(arguments[e]);
					for (t = 0; t < r.length; t++) s[s.length] = r[t], s.length++
				}
				return s
			}
		}, a.fn = e.prototype, a.unique = function(e) {
			for (var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
			return a
		}, a
	}()), s = ["jQuery", "Zepto", "Dom7"], r = 0; r < s.length; r++) window[s[r]] && e(window[s[r]]);
	var i;
	i = "undefined" == typeof t ? window.Dom7 || window.Zepto || window.jQuery : t, i && ("transitionEnd" in i.fn || (i.fn.transitionEnd = function(e) {
		function a(i) {
			if (i.target === this)
				for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
		}
		var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
			r = this;
		if (e)
			for (t = 0; t < s.length; t++) r.on(s[t], a);
		return this
	}), "transform" in i.fn || (i.fn.transform = function(e) {
		for (var a = 0; a < this.length; a++) {
			var t = this[a].style;
			t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
		}
		return this
	}), "transition" in i.fn || (i.fn.transition = function(e) {
		"string" != typeof e && (e += "ms");
		for (var a = 0; a < this.length; a++) {
			var t = this[a].style;
			t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
		}
		return this
	})), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
	"use strict";
	return window.Swiper
});
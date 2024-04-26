//----------------------------------------------------/
//
//      POLO - HTML5 Template
//      Author: INSPIRO - Ardian Berisha
//      Version: v4.5
//      Update: 20/01/2019
//
//----------------------------------------------------/

//Global var
var INSPIRO = {},
    $ = jQuery.noConflict();

(function ($) {
    // USE STRICT
    "use strict";

    //----------------------------------------------------/
    // Predefined Global Variables
    //----------------------------------------------------/
    var $window = $(window),

        //Theme
        $theme_color = '#2250fc',

        //Main
        $body = $('body'),
        $bodyInner = $('.body-inner'),
        $section = $('section'),

        //Header
        $topbar = $('#topbar'),
        $header = $('#header'),
        $headerCurrentClasses = $header.attr('class'),

        //Logo
        headerLogo = $('#logo').find('.logo'),
        headerLogoSrc = headerLogo.find('img').attr('src'),
        headerLogoSrcDark = headerLogo.attr('data-src-dark'),
        HeaderLogoSrcFixed = headerLogo.attr('data-src-fixed'),
        HeaderLogoSrcResponsive = headerLogo.attr('data-src-responsive'),

        //Main menu
        $mainmenu = $('#mainMenu'),
        $mainmenuitems = $mainmenu.find('li.dropdown > a'),
        $mainsubmenuitems = $mainmenu.find('li.dropdown-submenu > a, li.dropdown-submenu > span'),

        //sidebarOverlay
        sidebarOverlay = $('#side-panel'),
        $pageMenu = $('.page-menu'),

        /*Footer*/
        $footer = $('#footer'),
        fullScreenPanel = $('#fullscreen-panel'),

        //Window size control
        $fullScreen = $('.fullscreen') || $('.section-fullscreen'),
        $halfScreen = $('.halfscreen'), //Slider
        $slider = $('#slider'),
        $inspiroSlider = $('.inspiro-slider'),
        $carousel = $('.carousel'),

        /*Grid Layout*/
        $gridLayout = $(".grid-layout"),
        $gridFilter = $(".grid-filter"),

        windowWidth = $window.width(),

        $developmentMode = true;

    //Check header exist
    if ($header.length > 0) {
        var $headerOffsetTop = $header.offset().top;
    }

    //Window breakpoints
    $(window).breakpoints({
        breakpoints: [{
            "name": "xs",
            "width": 0
        }, {
            "name": "sm",
            "width": 576
        }, {
            "name": "md",
            "width": 768
        }, {
            "name": "lg",
            "width": 992
        }, {
            "name": "xl",
            "width": 1200
        }]
    });

    var currentBreakpoint = $(window).breakpoints("getBreakpoint");

    $body.addClass('breakpoint-' + currentBreakpoint);

    $(window).bind("breakpoint-change", function (breakpoint) {
        $body.removeClass('breakpoint-' + breakpoint.from);
        $body.addClass('breakpoint-' + breakpoint.to);
    });

    INSPIRO.core = {
        functions: function () {
            INSPIRO.core.scrollTop();
            INSPIRO.core.screenSizeControl();
            INSPIRO.core.rtlStatus();
            INSPIRO.core.equalize();
        },
        scrollTop: function () {

            var $scrollTop = $('#scrollTop');

            if ($scrollTop.length > 0) {

                var scrollOffset = $body.attr('data-offset') || 400;

                if ($window.scrollTop() > scrollOffset) {
                    $scrollTop.css({
                        'bottom': '26px',
                        'opacity': 1,
                        'z-index': 1
                    });
                } else {
                    $scrollTop.css({
                        'bottom': '16px',
                        'opacity': 0
                    });
                }

                $scrollTop.off('click').on('click', function () {
                    $('body,html').stop(true).animate({
                        'scrollTop': 0
                    }, 1000, 'easeInOutExpo');
                    return false;
                });
            }
        },

        //chkd
        screenSizeControl: function () {

            if ($fullScreen.length > 0) {
                $fullScreen.each(function () {
                    var $elem = $(this),
                        elemHeight = $window.height();

                        
                        $(window).breakpoints("greaterEqualTo", "lg", function () {
                            $elem.css('height', elemHeight);
                        });

                        
                        $(window).breakpoints("lessThan", "lg", function () {
                            if($(".text-middle").length> 0) {
                            var fullScreenContentHeight = $elem.find(".text-middle").height() + 100;
                            console.log(fullScreenContentHeight);

                            $elem.css({
                                'height': fullScreenContentHeight,
                                'padding': '60px 15px 120px'
                            }); 
                        }else {
                            $elem.css('height', elemHeight);
                        }
                        });

                });
            }
            if ($halfScreen.length > 0) {
                $halfScreen.each(function () {
                    var $elem = $(this),
                        elemHeight = $window.height();
                    $elem.css('height', elemHeight / 1.5);
                });
            }
        },
        //chkd
        rtlStatus: function () {
            var $rtlStatusCheck = $("html").attr("dir");
            var $rtlStatus = false;
            if ($rtlStatusCheck == "rtl") {
                $('head').append('<link rel="stylesheet" type="text/css" href="css/rtl.css">');
                $rtlStatus = true;
            } else {
                $rtlStatus = false;
            }
        },

        equalize: function () {

            var $equalize = $('.equalize');

            if ($equalize.length > 0) {
                $equalize.each(function () {

                    var elem = $(this),
                        selectorItem = elem.find(elem.attr('data-equalize-item')) || "> div",
                        maxHeight = 0;

                    selectorItem.each(function () {
                        if ($(this).outerHeight(true) > maxHeight) {
                            maxHeight = $(this).outerHeight(true);
                        }
                    });
                    selectorItem.height(maxHeight);

                });
            }
        }
    };
    INSPIRO.header = {
        functions: function () {
            INSPIRO.header.logoStatus();
            INSPIRO.header.stickyHeader();
            INSPIRO.header.topBar();
            INSPIRO.header.search();
            INSPIRO.header.mainMenu();
            INSPIRO.header.pageMenu();
            INSPIRO.header.sidebarOverlay();
            INSPIRO.header.dotsMenu();
            INSPIRO.header.onepageMenu();
        },
        logoStatus: function () {
            $(window).breakpoints("greaterEqualTo", "lg", function () {
                if ($header.hasClass('dark') && headerLogoSrcDark) {
                    headerLogo.find('img').attr('src', headerLogoSrcDark);
                } else {
                    headerLogo.find('img').attr('src', headerLogoSrc);
                }

                if (HeaderLogoSrcFixed && $header.hasClass('header-sticky')) {
                    headerLogo.find('img').attr('src', HeaderLogoSrcFixed);
                }
            });

            $(window).breakpoints("lessThan", "lg", function () {
                if ($header.hasClass('dark') && headerLogoSrcDark) {
                    headerLogo.find('img').attr('src', headerLogoSrcDark);
                }
                if ($header.hasClass('dark') && $header.attr('data-transparent') == "true") {
                    headerLogo.find('img').attr('src', headerLogoSrc);
                }

                if (HeaderLogoSrcResponsive) {
                    headerLogo.find('img').attr('src', HeaderLogoSrcResponsive);
                }
            });
        },
        stickyHeader: function () {

            var elem = $(this),
                shrinkHeader = elem.attr('data-shrink') || 0,
                shrinkHeaderActive = elem.attr('data-sticky-active') || 200,
                scrollOnTop = $window.scrollTop();

            if ($header.hasClass("header-modern")) {
                shrinkHeader = 300;
            }

            $(window).breakpoints("greaterEqualTo", "lg", function () {

                if (!$header.is(".header-disable-fixed, .header-always-fixed")) {
                    if (scrollOnTop > $headerOffsetTop + shrinkHeader) {
                        $header.addClass('header-sticky');
                        if (scrollOnTop > $headerOffsetTop + shrinkHeaderActive) {
                            $header.addClass('sticky-active');
                            if ($header.hasClass('dark') && $header.attr('data-transparent') == "true" && !$body.hasClass('overlay-menu')) {
                                $header.removeClass('dark');
                            }
                            INSPIRO.header.logoStatus();
                        }
                    } else {
                        $header.removeClass().addClass($headerCurrentClasses);
                        INSPIRO.header.logoStatus();
                    }
                }
            });


            $(window).breakpoints("lessThan", "lg", function () {

                if ($header.attr('data-responsive-fixed') == "true") {
                    if (scrollOnTop > $headerOffsetTop + shrinkHeader) {
                        $header.addClass('header-sticky');
                        if (scrollOnTop > $headerOffsetTop + shrinkHeaderActive) {
                            $header.addClass('sticky-active');
                            if ($header.hasClass('dark') && $header.attr('data-transparent') == "true" && !$body.hasClass('overlay-menu')) {
                                $header.removeClass('dark');
                            }
                            INSPIRO.header.logoStatus();
                        }
                    } else {
                        $header.removeClass().addClass($headerCurrentClasses);
                        INSPIRO.header.logoStatus();
                    }
                }

            });

        },
        //chkd
        topBar: function () {
            if ($topbar.length > 0) {
                $("#topbar .topbar-dropdown .topbar-form").each(function (index, element) {
                    if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                        $(element).addClass('dropdown-invert');
                    }
                });
            }
        },
        search: function () {

            var $search = $('#search');

            if ($search.length > 0) {
                var searchBtn = $('#btn-search'),
                    searchBtnClose = $('#btn-search-close'),
                    searchInput = $search.find('.form-control');

                function openSearch() {
                    $body.addClass('search-open');
                    searchInput.focus();
                }

                function closeSearch() {
                    $body.removeClass('search-open');
                    searchInput.value = '';
                }

                searchBtn.on('click touchend', function () {
                    openSearch();
                    return false;
                });
                searchBtnClose.on('click touchend', function () {
                    closeSearch();
                    return false;
                });

                document.addEventListener('keyup', function (ev) {
                    if (ev.keyCode == 27) {
                        closeSearch();
                    }
                });
            }
        },
        //chkd
        mainMenu: function () {
            if ($mainmenu.length > 0) {

                if ($body.is('.breakpoint-lg, .breakpoint-xl')) {
                    $("body #mainMenu.menu-onclick nav > ul > li.dropdown > a, body .dropdown-submenu > a, body .dropdown-submenu > span").on('click touchend', function (e) {
                        $(this).parent('li').siblings().removeClass('hover-active').removeClass('current');
                        $(this).parent('li').toggleClass('hover-active');
                        return false;
                    });

                } else {
                    $("#mainMenu nav > ul > li.dropdown > a, .dropdown-submenu > a, .dropdown-submenu > span, .page-menu nav > ul > li.dropdown > a").on('click touchend', function (e) {
                        $(this).parent('li').siblings().removeClass('hover-active');
                        $(this).parent('li').toggleClass('hover-active');
                        return false;
                    });
                }

                $("#mainMenu-trigger button").on('click touchend', function (e) {
                    $body.toggleClass("mainMenu-open");
                    $(this).toggleClass("toggle-active");
                    if ($body.hasClass("mainMenu-open")) {
                        $header.find("#mainMenu").css("max-height", $window.height() - $header.height());
                    } else {
                        $header.find("#mainMenu").css("max-height", 0);
                    }
                    return false;
                });


                $(window).breakpoints("greaterEqualTo", "lg", function () {
                    /*invert menu fix*/
                    var $menuLastItem = $("nav > ul > li:last-child"),
                        $menuLastItemUl = $("nav > ul > li:last-child > ul"),
                        $menuLastInvert = $menuLastItemUl.width() - $menuLastItem.width(),
                        $menuItems = $("nav > ul > li").find(".dropdown-menu");

                    $menuItems.css('display', 'block');
                    $('.dropdown:not(.mega-menu-item) ul ul').each(function (index, element) {
                        if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                            $(element).addClass('menu-invert');
                        }
                    });

                    if ($window.width() - ($menuLastItemUl.width() + $menuLastItem.offset().left) < 0) {
                        $menuLastItemUl.addClass('menu-last');
                    }
                    $menuItems.css('display', '');
                });
            }
        },

        /*Page Menu*/
        pageMenu: function () {
            if ($pageMenu.length > 0) {
                $pageMenu.each(function () {
                    $("#pageMenu-trigger").on("click", function () {
                        $pageMenu.toggleClass("page-menu-active");
                        $pageMenu.toggleClass("items-visible");
                    });
                });
            }
        },
        sidebarOverlay: function () {
            if (sidebarOverlay.length > 0) {
                sidebarOverlay.css("opacity", 1);
                $("#close-panel").on("click", function () {
                    $body.removeClass("side-panel-active side-panel-push");
                    $("#side-panel-trigger").removeClass("toggle-active");
                });
                var t = setTimeout(function () {
                    INSPIRO.elements.gridLayoutRefresh();
                }, 1000);
            }
        },
        dotsMenu: function () {

            var $dotsMenu = $('#dotsMenu'),
                $dotsMenuItems = $dotsMenu.find("ul > li > a");

            if ($dotsMenu.length > 0) {
                $dotsMenuItems.on('click', function () {
                    $dotsMenuItems.parent("li").removeClass('current');
                    $(this).parent("li").addClass('current');
                    return false;
                });

                $dotsMenuItems.parents("li").removeClass('current');
                $dotsMenu.find('a[href="#' + INSPIRO.header.currentSection() + '"]').parent("li").addClass('current');
            }
        },
        onepageMenu: function () {
            if ($mainmenu.hasClass("menu-one-page")) {
                var $currentMenuItem = "current";
                $(window).on("scroll", function () {
                    var $currentSection = INSPIRO.header.currentSection();
                    $mainmenu.find("nav > ul > li > a").parents("li").removeClass($currentMenuItem);
                    $mainmenu.find('nav > ul > li > a[href="#' + $currentSection + '"]').parent("li").addClass($currentMenuItem);
                });
            }
        },

        currentSection: function () {
            var elemCurrent = "body";
            $section.each(function () {
                var elem = $(this),
                    elemeId = elem.attr("id");

                if ((elem.offset().top - $window.height() / 3 < $window.scrollTop()) && (elem.offset().top + elem.height() - $window.height() / 3 > $window.scrollTop())) {
                    elemCurrent = elemeId;
                }
            });
            return elemCurrent;
        }
    };
    INSPIRO.slider = {
        functions: function () {
            INSPIRO.slider.inspiroSlider();
            INSPIRO.slider.owlCarousel();
        },
        //chkd
        sliderScreenSizeControl: function (elem) {

            var headerHeight = $header.outerHeight(),
                topbarHeight = $topbar.outerHeight() || 0,
                windowHeight = $window.height(),
                screenHeightExtra = headerHeight + topbarHeight,

                $sliderClassOuter = ".owl-stage-outer",
                $sliderClassStage = ".owl-stage",
                $sliderClassSlide = ".slide",
                sliderTargetElements = [elem, elem.find($sliderClassOuter), elem.find($sliderClassStage), elem.find($sliderClassSlide)],
                sliderFullscreen = elem.hasClass('slider-fullscreen'),
                screenRatio = elem.hasClass('slider-fullscreen') ? 1 : 1.2,
                transparentHeader = $header.attr('data-transparent="true"') || $header.hasClass("header-modern"),
                customHeight = elem.attr("data-height"),
                responsiveHeightxs = elem.attr("data-height-xs") || 300;



            $(window).breakpoints("greaterEqualTo", "lg", function () {
                if (transparentHeader) {
                    if (sliderFullscreen) {
                        $.each(sliderTargetElements, function (index, divElem) {
                            if ($topbar.length > 0) {

                            } else {}
                            divElem.css('height', $(window).height() + 'px');
                        });
                    } else {
                        if (!$header.attr('data-transparent="true"')) {
                            elem.find($sliderClassSlide).css('padding-top', screenHeightExtra + 'px');
                        }
                        if (!customHeight) {
                            $.each(sliderTargetElements, function (index, divElem) {
                                divElem.css('height', $(window).height() / screenRatio + 'px');
                            });
                        } else {
                            $.each(sliderTargetElements, function (index, divElem) {
                                divElem.css('height', customHeight + 'px');
                            });

                        }
                    }
                } else {
                    if (sliderFullscreen) {
                        $.each(sliderTargetElements, function (index, divElem) {
                            divElem.css('height', $(window).height() + 'px');
                        });

                    } else {
                        $.each(sliderTargetElements, function (index, divElem) {
                            divElem.css('height', $(window).height() / screenRatio - screenHeightExtra + 'px');
                        });
                    }
                    if (customHeight) {
                        $.each(sliderTargetElements, function (index, divElem) {
                            divElem.css('height', customHeight + 'px');
                        });
                    }
                }
            });


            $(window).breakpoints("lessThan", "lg", function () {
                $.each(sliderTargetElements, function (index, divElem) {
                    divElem.css('height', responsiveHeightxs + 'px');
                });
            });
        },
        inspiroSlider: function () {

            if ($inspiroSlider.length > 0) {

                //Check if owlCarousel plugin is loaded
                if (typeof $.fn.owlCarousel === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery owlCarousel plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $inspiroSlider.each(function () {
                    var elem = $(this),
                        carouselNav = elem.attr('data-arrows'),
                        carouselDots = elem.attr('data-dots'),
                        carouselAutoPlay = elem.attr('data-autoplay'),
                        carouselAutoplayTimeout = elem.attr('data-autoplay-timeout') || 5000,
                        carouseAnimateIn = elem.attr('data-animate-in'),
                        carouseAnimateOut = elem.attr('data-animate-out'),
                        carouselLoop = elem.attr('data-loop'),
                        carouselHoverPause = elem.attr('data-hover-pause'),
                        carouselMargin = elem.attr('data-margin') || 0,
                        carouselVideo = elem.attr('data-video'),
                        carouselSmartSpeed = elem.attr('data-smart-speed') || 500,
                        carouselDrag = elem.attr('data-drag') || true;


                    elem.addClass("owl-carousel");
                    //Kenburns effect
                    elem.find('.slide').each(function () {
                        if ($(this).hasClass("kenburns")) {
                            var elemChild = $(this),
                                elemChildImage = elemChild.css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
                            elemChild.prepend('<div class="kenburns-bg" style="background-image:url(' + elemChildImage + ')"></div>');
                        }
                    });

                    if (elem.find('.slide').length > 1) {

                        elem.owlCarousel({
                            items: 1,
                            nav: carouselNav == 'false' ? false : true,
                            dots: carouselDots == 'false' ? false : true,
                            navText: ['<i class="icon-chevron-left1"></i>', '<i class="icon-chevron-right1"></i>'],
                            autoplay: carouselAutoPlay == 'false' ? false : false,
                            autoplayTimeout: Number(carouselAutoplayTimeout),
                            autoplayHoverPause: carouselHoverPause == 'false' ? false : true,
                            loop: carouselLoop == 'false' ? false : true,
                            margin: Number(carouselMargin),
                            smartSpeed: Number(carouselSmartSpeed),
                            video: carouselVideo == 'false' ? false : true,
                            animateIn: carouseAnimateIn,
                            animateOut: carouseAnimateOut,
                            rtl: INSPIRO.core.rtlStatus(),
                            mouseDrag: carouselDrag,
                            touchDrag: carouselDrag,
                            pullDrag: false,
                            freeDrag: false,
                            callbacks: true,
                            onInitialize: function (event) {
                                var t = setTimeout(function () {
                                    elem.find(".owl-item:not(.active) .slide > video").each(function () {
                                        this.pause();
                                    });
                                    elem.find(".owl-item.active .slide .kenburns-bg").addClass("kenburns-bg-animate");

                                    elem.addClass("slider-loaded");
                                }, 100);


                            },
                            onResize: function (event) {
                                INSPIRO.slider.sliderScreenSizeControl(elem);
                            }
                        });
                        var $captions = elem.find('.slide-captions > *');
                        $captions.each(function () {
                            var $captionElem = $(this);
                            var animationDuration = "600ms";
                            if ($(this).attr("data-animation-duration")) {
                                animationDuration = $(this).attr("data-animation-duration") + "ms";
                            }
                            $(this).css("animation-duration", animationDuration);
                            $captionElem.addClass('slide-caption-hide');
                        });
                        $captions.each(function (index) {
                            var $captionElem = $(this),
                                captionDelay = $captionElem.attr("data-caption-delay") || index * 80,
                                captionAnimation = $captionElem.attr('data-caption-animation') || "fadeInUp";
                            var t = setTimeout(function () {
                                $captionElem.removeClass('slide-caption-hide').addClass(captionAnimation);
                            }, captionDelay);
                        });
                        elem.on('changed.owl.carousel', function (property) {
                            var current = property.item.index,
                                currentSlide = $(property.target).find(".owl-item").eq(current),
                                currentSlideCaptions = currentSlide.find(".slide-captions > *"),
                                currentSlideDark = currentSlide.find(".slide").hasClass("slide-dark"),
                                currentSlideKenburns = currentSlide.find(".slide").hasClass("kenburns");
                            if (currentSlideKenburns) {
                                $(this).find(".kenburns-bg").addClass("kenburns-bg-animate");
                            }
                            currentSlideCaptions.each(function (index) {
                                var $captionElem = $(this),
                                    captionDelay = $captionElem.attr("data-caption-delay") || (index * 350 + 1000),
                                    captionAnimation = $captionElem.attr('data-caption-animation') || "fadeInUp";
                                var t = setTimeout(function () {
                                    $captionElem.removeClass('slide-caption-hide').addClass(captionAnimation);
                                }, captionDelay);
                            });
                            if ($window.width() > 992) {
                                //Pause HTML5 Video
                                if (currentSlide.find("video").length > 0) {
                                    var t = setTimeout(function () {
                                        currentSlide.find(".slide video").get(0).play();
                                    }, 1000);
                                }
                            }
                        });
                        elem.on('change.owl.carousel', function (property) {
                            var current = property.item.index,
                                currentSlide = $(property.target).find(".owl-item").eq(current),
                                currentSlideCaptions = $(property.target).find(".owl-item:not(.active)").find(".slide-captions > *"),
                                currentSlideKenburns = currentSlide.find(".slide").hasClass("kenburns");
                            currentSlideCaptions.each(function () {
                                var $captionElem = $(this),
                                    captionAnimation = $captionElem.attr('data-caption-animation') || "fadeInUp";
                                $captionElem.removeClass(captionAnimation).addClass('slide-caption-hide');
                            });
                            elem.find(".slide video").each(function () {
                                this.pause();
                            });
                            if (currentSlideKenburns) {
                                $(this).find(".kenburns-bg").removeClass("kenburns-bg-animate");
                            }
                        });
                    } else {
                        elem.addClass("slider-loaded");
                        var t = setTimeout(function () {
                            elem.find('.slide').find(".kenburns-bg").addClass("kenburns-bg-animate");
                        }, 200);
                    }
                    INSPIRO.slider.sliderScreenSizeControl(elem);

                });
            }
        },

        owlCarouselAjax: function () {
            //Check if owlCarousel plugin is loaded
            if (typeof $.fn.owlCarousel === 'undefined') {
                INSPIRO.elements.notification("Warning: jQuery owlCarousel plugin is missing in plugins.js file.", "warning")
                return true;
            }
            //Plugin Options
            var elem = $(".carousel");
            elem.options = {
                nav: elem.attr('data-arrows'),
                dots: elem.attr('data-dots'),
                navText: ['<i class="icon-chevron-left1"></i>', '<i class="icon-chevron-right1"></i>'],
                itemElement: elem.attr('data-item') || "div",
                autoplay: elem.attr('data-autoplay'),
                autoplayTimeout: elem.attr('data-autoplay-timeout') || 5000,
                autoplayHoverPause: elem.attr('data-hoverpause'),
                autoWidth: elem.attr('data-auto-width'),
                loop: elem.attr('data-loop'),
                smartSpeed: 350,
                fluidSpeed: 260,
                rtl: INSPIRO.core.rtlStatus()
            };
            //Initializing plugin and passing options
            elem.owlCarousel({
                items: 1,
                nav: elem.options.nav == 'false' ? false : true,
                dots: elem.options.dots == 'true' ? true : false,
                navText: elem.options.navText,
                itemElement: elem.options.itemElement,
                autoplay: elem.options.autoPlay == 'true' ? true : false,
                autoplayTimeout: Number(elem.options.autoplayTimeout),
                autoplayHoverPause: elem.options.autoplayHoverPause == 'true' ? true : false,
                loop: elem.options.loop == 'false' ? false : true,
                smartSpeed: Number(elem.options.smartSpeed),
                fluidSpeed: Number(elem.options.fluidSpeed),
                rtl: elem.options.rtl,
                onInitialize: function (event) {
                    elem.addClass("carousel-loaded owl-carousel");
                },
            });
        },
        owlCarousel: function () {
            if ($carousel.length > 0) {
                //Check if owlCarousel plugin is loaded
                if (typeof $.fn.owlCarousel === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery owlCarousel plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                $carousel.each(function () {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        nav: elem.attr('data-arrows'),
                        dots: elem.attr('data-dots'),
                        navText: ['<i class="icon-chevron-left1"></i>', '<i class="icon-chevron-right1"></i>'],
                        itemElement: elem.attr('data-item') || "div",
                        autoplay: elem.attr('data-autoplay'),
                        autoplayTimeout: elem.attr('data-autoplay-timeout') || 5000,
                        autoplayHoverPause: elem.attr('data-hoverpause'),
                        autoWidth: elem.attr('data-auto-width'),
                        loop: elem.attr('data-loop'),
                        margin: elem.attr('data-margin') || 20,
                        items: elem.attr('data-items') || 4,
                        itemsLg: elem.attr('data-items-lg'),
                        itemsMd: elem.attr('data-items-md'),
                        itemsSm: elem.attr('data-items-sm'),
                        itemsXs: elem.attr('data-items-xs'),
                        smartSpeed: 350,
                        fluidSpeed: 260,
                        video: elem.attr('data-video'),
                        animateIn: elem.attr('data-animate-in'),
                        animateOut: elem.attr('data-animate-out'),
                        rtl: INSPIRO.core.rtlStatus()
                    };

                    //Calculate min/max on responsive breakpoints
                    elem.options.itemsLg = elem.options.itemsLg || Math.min(Number(elem.options.items), Number(4));
                    elem.options.itemsMd = elem.options.itemsMd || Math.min(Number(elem.options.itemsLg), Number(3));
                    elem.options.itemsSm = elem.options.itemsSm || Math.min(Number(elem.options.itemsMd), Number(2));
                    elem.options.itemsXs = elem.options.itemsXs || Math.min(Number(elem.options.itemsSm), Number(1));

                    //Plugin Responsive options
                    elem.responsive = {
                        0: {
                            items: Number(elem.options.itemsXs)
                        },
                        420: {
                            items: Number(elem.options.itemsSm)
                        },
                        768: {
                            items: Number(elem.options.itemsMd)
                        },
                        992: {
                            items: Number(elem.options.itemsLg)
                        },
                        1200: {
                            items: Number(elem.options.items)
                        }
                    };

                    //Initializing plugin and passing options
                    elem.owlCarousel({
                        nav: elem.options.nav == 'false' ? false : true,
                        dots: elem.options.dots == 'false' ? false : true,
                        navText: elem.options.navText,
                        itemElement: elem.options.itemElement,
                        autoplay: elem.options.autoPlay == 'true' ? true : false,
                        autoplayTimeout: elem.options.autoplayTimeout,
                        autoplayHoverPause: elem.options.autoplayHoverPause == 'true' ? true : false,
                        autoWidth: elem.options.autoWidth == 'true' ? true : false,
                        loop: elem.options.loop == 'true' ? true : false,
                        margin: Number(elem.options.margin),
                        smartSpeed: Number(elem.options.smartSpeed),
                        fluidSpeed: Number(elem.options.fluidSpeed),
                        video: elem.options.video == 'true' ? true : false,
                        animateIn: elem.options.animateIn,
                        animateOut: elem.options.animateOut,
                        rtl: elem.options.rtl,
                        onInitialize: function (event) {
                            elem.addClass("carousel-loaded owl-carousel");
                        },
                        responsive: elem.responsive
                    });
                });
            }
        },
    };
    INSPIRO.elements = {
        functions: function () {
            INSPIRO.elements.naTo();
            INSPIRO.elements.morphext();
            INSPIRO.elements.buttons();
            INSPIRO.elements.accordion();
            INSPIRO.elements.animations();
            INSPIRO.elements.parallax();
            INSPIRO.elements.responsiveVideos();
            INSPIRO.elements.counters();
            INSPIRO.elements.countdownTimer();
            INSPIRO.elements.progressBar();
            INSPIRO.elements.pieChart();
            INSPIRO.elements.maps();
            INSPIRO.elements.gridLayout();
            INSPIRO.elements.tooltip();
            INSPIRO.elements.popover();
            INSPIRO.elements.magnificPopup();
            INSPIRO.elements.yTPlayer();
            INSPIRO.elements.vimeoPlayer();
            INSPIRO.elements.modal();
            INSPIRO.elements.sidebarFixed();
            INSPIRO.elements.clipboard();
            INSPIRO.elements.bootstrapSwitch();
            INSPIRO.elements.countdown();
            INSPIRO.elements.other();
        },

        other: function (context) {

            if ($(".toggle-item").length > 0) {
                $(".toggle-item").each(function () {
                    var elem = $(this),
                        toggleItemClass = elem.attr('data-class'),
                        toggleItemClassTarget = elem.attr('data-target');

                    elem.on("click", function () {
                        if (toggleItemClass) {
                            if (toggleItemClassTarget) {
                                $(toggleItemClassTarget).toggleClass(toggleItemClass);
                            } else {
                                elem.toggleClass(toggleItemClass);
                            }
                        }
                        elem.toggleClass("toggle-active");
                        return false;
                    });
                });
            }

            /*Hover 3d Effect*/
            if ($(".hover-3d").length > 0) {
                $(".hover-3d").each(function () {
                    var $elem = $(this),
                        selector = $elem.attr("data-selector") || ".portfolio-item-wrap",
                        shine = $elem.attr("data-shine") || false,
                        sensitivity = $elem.attr("data-sensitivity") || 16;

                    $elem.hover3d({
                        selector: selector,
                        shine: shine,
                        sensitivity: Number(sensitivity)
                    });
                });
            }

            /*Dropdown popup invert*/
            var $pDropdown = $(".p-dropdown");

            if ($pDropdown.length > 0) {
                $pDropdown.each(function () {
                    var elem = $(this);
                    if ($window.width() / 2 > elem.offset().left) {
                        elem.addClass("p-dropdown-invert")
                    }
                });
            }

        },
        naTo: function () {
            $('a.scroll-to, #dotsMenu > ul > li > a, .menu-one-page nav > ul > li > a').on('click', function () {
                var extraPaddingTop = 0,
                    extraHeaderHeight = 0;

                if (windowWidth <= 991) {

                    $header.find("#mainMenu").css("max-height", 0);
                    $body.toggleClass("mainMenu-open");
                    $("#mainMenu-trigger button").toggleClass("toggle-active");

                    if ($header.attr('data-responsive-fixed') === true) {
                        extraHeaderHeight = $header.height();
                    }

                } else {
                    if ($header.length > 0) {
                        extraHeaderHeight = $header.height();
                    }
                }

                if ($('.dashboard').length > 0) {
                    extraPaddingTop = 30;
                }

                var $anchor = $(this);

                $('html, body').stop(true, false).animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - (extraHeaderHeight + extraPaddingTop))
                }, 1500, 'easeInOutExpo');
                return false;

            });



        },
        morphext: function () {

            var $textRotator = $('.text-rotator');

            if ($textRotator.length > 0) {

                //Check if Morphext plugin is loaded
                if (typeof $.fn.Morphext === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery Morphext plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $textRotator.each(function () {
                    var elem = $(this);

                    //Plugin Options
                    elem.options = {
                        animation: elem.attr('data-animation') || "fadeIn",
                        separator: elem.attr('data-separator') || ",",
                        speed: elem.attr('data-speed') || 2000
                    }

                    //Initializing Morphext plugin and passing options
                    elem.Morphext({
                        animation: elem.options.animation,
                        separator: elem.options.separator,
                        speed: Number(elem.options.speed)
                    });
                });
            }
        },
        buttons: function () {
            //Button slide width
            if ($(".btn-slide[data-width]")) {

                $(".btn.btn-slide[data-width]").each(function () {
                    var elem = $(this),
                        elemWidth = elem.attr('data-width'),
                        elemDefaultWidth;
                    switch (true) {
                        case elem.hasClass('btn-lg'):
                            elemDefaultWidth = "60";
                            break;
                        case elem.hasClass('btn-sm'):
                            elemDefaultWidth = "36";
                            break;
                        case elem.hasClass('btn-xs'):
                            elemDefaultWidth = "28";
                            break;
                        default:
                            elemDefaultWidth = "48";
                            break;
                    }
                    elem.hover(function () {
                        $(this).css("width", elemWidth + "px");
                    }, function () {
                        $(this).css("width", elemDefaultWidth + "px");
                    });
                });
            }
        },
        accordion: function () {
            var accordionType = "accordion",
                toogleType = "toggle",
                accordionItem = "ac-item",
                itemActive = "ac-active",
                itemTitle = "ac-title",
                itemContent = "ac-content",
                $accs = $("." + accordionItem);

            $accs.length && ($accs.each(function () {
                var $item = $(this);
                $item.hasClass(itemActive) ? $item.addClass(itemActive) : $item.find("." + itemContent).hide();
            }), $("." + itemTitle).on("click", function (e) {
                var $link = $(this),
                    $item = $link.parents("." + accordionItem),
                    $acc = $item.parents("." + accordionType);
                $item.hasClass(itemActive) ? $acc.hasClass(toogleType) ? ($item.removeClass(itemActive), $link.next("." + itemContent).slideUp()) : ($acc.find("." + accordionItem).removeClass(itemActive), $acc.find("." + itemContent).slideUp()) : ($acc.hasClass(toogleType) || ($acc.find("." + accordionItem).removeClass(itemActive), $acc.find("." + itemContent).slideUp("fast")), $item.addClass(itemActive), $link.next("." + itemContent).slideToggle("fast")), e.preventDefault();
                return false;
            }));
        },
        animations: function () {

            var $animate = $("[data-animate]");

            if ($animate.length > 0) {

                //Check if jQuery Waypoint plugin is loaded
                if (typeof Waypoint === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery Waypoint plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $animate.each(function () {

                    var elem = $(this);
                    elem.addClass("animated");

                    //Plugin Options
                    elem.options = {
                        animation: elem.attr("data-animate") || "fadeIn",
                        delay: elem.attr("data-animate-delay") || 200,
                        direction: ~elem.attr("data-animate").indexOf("Out") ? "back" : "forward",
                        offsetX: elem.attr("data-animate-offsetX") || 0,
                        offsetY: elem.attr("data-animate-offsetY") || -100
                    }

                    //Initializing jQuery Waypoint plugin and passing options from data animations attributes
                    if (elem.options.direction == "forward") {
                        new Waypoint({
                            element: elem,
                            handler: function () {
                                var t = setTimeout(function () {
                                    elem.addClass(elem.options.animation + " visible");
                                }, elem.options.delay);
                            },
                            offset: '100%'
                        });
                    } else {
                        elem.addClass("visible");
                        elem.on("click", function () {
                            elem.addClass(elem.options.animation);
                            return false;
                        });
                    }
                    //Demo play
                    if (elem.parents('.demo-play-animations').length) {
                        elem.on("click", function () {
                            elem.removeClass(elem.options.animation);
                            var t = setTimeout(function () {
                                elem.addClass(elem.options.animation);
                            }, 50);
                            return false;
                        });
                    }
                });
            }
        },
        parallax: function () {

            var $parallax = $('[data-parallax-image]');

            if ($parallax.length > 0) {

                //Check if scrolly plugin is loaded
                if (typeof $.fn.scrolly === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery scrolly plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $parallax.each(function () {
                    var $elem = $(this),
                        elemImageSrc = $elem.attr("data-parallax-image"),
                        elemImageVelocity = $elem.attr("data-velocity") || "-.090";

                    $elem.prepend('<div class="parallax-container" data-lazy-background="' + elemImageSrc + '"  data-velocity="' + elemImageVelocity + '" style="background: url(' + elemImageSrc + ')"></div>');

                    $(".parallax-container").lazy({
                        attribute: "data-lazy-background",
                        afterLoad: function (element) {
                            $elem.find(".parallax-container").addClass("img-loaded");

                        }
                    });

                    if ($body.hasClass('breakpoint-lg') || $body.hasClass('breakpoint-xl')) {
                        $elem.find(".parallax-container").scrolly({
                            bgParallax: true
                        });

                    } else {
                        $elem.find(".parallax-container").addClass("parallax-responsive");
                    }

                });
            }
        },
        responsiveVideos: function () {

            //Check if fitVids plugin is loaded
            if (typeof $.fn.fitVids === 'undefined') {
                INSPIRO.elements.notification("Warning: jQuery fitVids plugin is missing in plugins.js file.", "warning")
                return true;
            }

            //selecting elements
            var selectors = $("section, .content, .post-content, .video-js, .post-video, .video-wrap, .ajax-quick-view,#slider:not(.revslider-wrap)");

            //Initializing jQuery fitVids plugin and pass selectors
            selectors.fitVids();
        },
        counters: function () {

            var $counter = $('.counter');

            if ($counter.length > 0) {

                //Check if countTo plugin is loaded
                if (typeof $.fn.countTo === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery countTo plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initializing countTo plugin 
                $counter.each(function () {
                    var $elem = $(this);
                    new Waypoint({
                        element: $elem,
                        handler: function () {
                            $elem.find('span').countTo();
                        },
                        offset: '104%'
                    });
                });
            }
        },
        countdownTimer: function () {

            var $countdownTimer = $('.countdown');

            if ($countdownTimer.length > 0) {

                //Check if countdown plugin is loaded
                if (typeof $.fn.countdown === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery countdown plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                var t = setTimeout(function () {
                    $('[data-countdown]').each(function () {
                        var $this = $(this),
                            finalDate = $(this).attr('data-countdown');
                        $this.countdown(finalDate, function (event) {
                            $this.html(event.strftime('<div class="countdown-container"><div class="countdown-box"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="countdown-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="countdown-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="countdown-box"><div class="number">%S</div><span>Seconds</span></div></div>'));
                        });
                    });
                }, 300);
            }
        },
        progressBar: function () {

            var $progressBar = $('.p-progress-bar') || $('.progress-bar');

            if ($progressBar.length > 0) {
                $progressBar.each(function (i, elem) {
                    var $elem = $(this),
                        percent = $elem.attr('data-percent') || "100",
                        delay = $elem.attr('data-delay') || "60",
                        type = $elem.attr('data-type') || "%";
                    if (!$elem.hasClass('progress-animated')) {
                        $elem.css({
                            'width': '0%'
                        });
                    }
                    var progressBarRun = function () {
                        $elem.animate({
                            'width': percent + '%'
                        }, 'easeInOutCirc').addClass('progress-animated');
                        $elem.delay(delay).append('<span class="progress-type">' + type + '</span><span class="progress-number animated fadeIn">' + percent + '</span>');
                    };
                    if ($body.hasClass('breakpoint-lg') || $body.hasClass('breakpoint-xl')) {
                        new Waypoint({
                            element: $(elem),
                            handler: function () {
                                var t = setTimeout(function () {
                                    progressBarRun();
                                }, delay);
                            },
                            offset: '100%'
                        });
                    } else {
                        progressBarRun();
                    }
                });
            }
        },
        pieChart: function () {
            var $pieChart = $('.pie-chart');

            if ($pieChart.length > 0) {

                //Check if easyPieChart plugin is loaded
                if (typeof $.fn.easyPieChart === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery easyPieChart plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $pieChart.each(function () {
                    var elem = $(this);

                    //Plugin Options
                    elem.options = {
                        barColor: elem.attr('data-color') || $theme_color,
                        trackColor: elem.attr('data-trackcolor') || "rgba(0,0,0,0.10)",
                        scaleColor: elem.attr('data-scaleColor') || false,
                        scaleLength: elem.attr('data-scaleLength') || 5,
                        lineCap: elem.attr('data-lineCap') || 'square',
                        lineWidth: elem.attr('data-lineWidth') || 6,
                        size: elem.attr('data-size') || 160,
                        rotate: elem.attr('data-rotate') || 0,
                        animate: elem.attr('data-animate') || 2600,
                        elemEasing: elem.attr('data-easing') || 'easeInOutExpo'
                    }

                    elem.find('span, i').css({
                        'width': elem.options.size + 'px',
                        'height': elem.options.size + 'px',
                        'line-height': elem.options.size + 'px'
                    });

                    //Initializing jQuery easyPieChart plugin and passing options
                    new Waypoint({
                        element: elem,
                        handler: function () {
                            elem.easyPieChart({
                                barColor: elem.options.barColor,
                                trackColor: elem.options.trackColor,
                                scaleColor: elem.options.scaleColor,
                                scaleLength: elem.options.scaleLength,
                                lineCap: elem.options.lineCap,
                                lineWidth: Number(elem.options.lineWidth),
                                size: Number(elem.options.size),
                                rotate: Number(elem.options.rotate),
                                animate: Number(elem.options.animate),
                                elemEasing: elem.options.elemEasing,
                                onStep: function (from, to, percent) {
                                    elem.find('span.percent').text(Math.round(percent));
                                },
                            });
                        },
                        offset: '100%'
                    });
                });
            }
        },
        maps: function () {

            var $map = $('.map');

            if ($map.length > 0) {

                //Check if gMap plugin is loaded
                if (typeof $.fn.gMap === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery gMap plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $map.each(function () {
                    var elem = $(this);

                    //Plugin Options
                    elem.options = {
                        address: elem.attr('data-map-address') || "Melbourne, Australia",
                        maptype: elem.attr('data-map-type') || "ROADMAP",
                        zoom: elem.attr('data-map-zoom') || "14",
                        icon: elem.attr('data-map-icon') || "images/markers/marker2.png"
                    }

                    var markers = [{
                        address: elem.options.address,
                        html: elem.options.address,
                        icon: {
                            image: elem.options.icon,
                            iconsize: [40, 63],
                            iconanchor: [18, 60],
                        },
                    }];
                    //Initialize gMap plugin and passing options
                    elem.gMap({
                        address: elem.options.address,
                        maptype: elem.options.maptype,
                        markers: markers,
                        zoom: Number(elem.options.zoom),
                        doubleclickzoom: true,
                        controls: {
                            panControl: true,
                            zoomControl: true,
                            mapTypeControl: false,
                            scaleControl: true,
                            streetViewControl: false,
                            overviewMapControl: true
                        },
                        styles: [{
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{
                                visibility: "off"
                            }]
                        }]
                    });
                });
            }
        },
        gridLayout: function () {

            if ($gridLayout.length > 0) {

                //Check if isotope plugin is loaded
                if (typeof $.fn.isotope === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery isotope plugin is missing in plugins.js file.", "warning")
                    return true;
                }


                $gridLayout.each(function () {
                    var elem = $(this);

                    elem.options = {
                        itemSelector: elem.attr('data-item') || "portfolio-item",
                        layoutMode: elem.attr('data-layout') || "masonry",
                        stagger: elem.attr('data-stagger') || 0,
                        autoHeight: elem.attr('data-auto-height') || true,
                        gridMargin: elem.attr('data-margin') || 20,
                        transitionDuration: elem.attr("data-transition") || "0.55s",
                        isOriginLeft: INSPIRO.core.rtlStatus()
                    }

                    var gridXsMargin = elem.attr('data-xs-margin') || elem.options.gridMargin;

                    $(window).breakpoints("lessThan", "lg", function () {
                        elem.options.gridMargin = gridXsMargin;
                    });

                    if (elem.options.layoutMode == "fitRows") {
                        elem.options.gridMargin = (elem.options.gridMargin + 2);
                    } else {
                        var gridMargin2 = elem.options.gridMargin;
                    }
    
                    elem.css("margin", "0 -" + gridMargin2 + "px -" + elem.options.gridMargin + "px 0");
                    elem.find('.' + elem.options.itemSelector).css("padding", "0 " + elem.options.gridMargin + "px " + elem.options.gridMargin + "px 0");

                    //chkd add lazy loading images
                    var t = setTimeout(function () {
                        elem.isotope({
                            layoutMode: elem.options.layoutMode,
                             transitionDuration: elem.options.transitionDuration,
                            stagger: Number(elem.options.stagger),
                            itemSelector: "." + elem.options.itemSelector,
                            isOriginLeft: elem.options.isOriginLeft,
                            autoHeight: elem.options.autoHeight,
                           /*   hiddenStyle: {
                                opacity: 0,
                                transform: "translate3d(0px, 60px, 0px)",
                            },
                            visibleStyle: {
                                opacity: 1,
                                transform: "translate3d(0px, 0px, 0px)",
                            }, */ 
                            masonry: {
                                // use outer width of grid-sizer for columnWidth
                                columnWidth: elem.find('.' + elem.options.itemSelector + ':not(.large-width)')[0],
                            }
                        }).addClass('grid-loaded');

                        var iso = elem.data('isotope');
                        elem.isotope('reveal', iso.items);

                    }, 100);

                    $(window).on('resize', function () {
                        var t = setTimeout(function () {
                            INSPIRO.elements.gridLayoutRefresh();
                        }, 500);
                    });


                    /*Infinity Scroll*/
                    if (elem.next().hasClass("infinite-scroll")) {
                        INSPIRO.elements.gridLayoutInfinite(elem, elem.options.itemSelector, elem.options.gridMargin);
                    }


                    if ($gridFilter.length > 0) {
                        $gridFilter.each(function () {
                            var elemFilter = $(this),
                                $filterItem = elemFilter.find('a'),
                                elemFilterLayout = elemFilter.attr('data-layout'),
                                $filterItemActiveClass = "active";
    
                            $filterItem.on('click', function () {
    
                                elemFilter.find('li').removeClass($filterItemActiveClass);
                                $(this).parent('li').addClass($filterItemActiveClass);
    
                                var filterValue = $(this).attr('data-category');
                                    $(elemFilterLayout).isotope({
                                        filter: filterValue,
                                    });
    
                                if ($(".grid-active-title").length > 0) {
                                    $(".grid-active-title").empty().append($(this).text())
                                }
                                return false;
                            });
                        });
                    }


                });
                
            }
        },
        gridLayoutRefresh: function (elem) {
            if (!elem) {
                elem = $gridLayout;
            }
            if (elem.length > 0) {
                elem.each(function () {
                    var elem = $(this);
                    var t = setTimeout(function () {
                        elem.isotope('layout');
                    }, 300);
                });
            }
        },
        gridLayoutInfinite: function (element, elementSelector, elemGridMargin) {

            //Check if infinitescroll plugin is loaded
            if (typeof $.fn.infinitescroll === 'undefined') {
                INSPIRO.elements.notification("Warning: jQuery infinitescroll plugin is missing in plugins.js file.", "warning")
                return true;
            }

            var elem = element,
                gridItem = elementSelector,
                gridMargin = elemGridMargin,
                navSelector = "#pagination",
                loadMoreElem = $("#showMore"),
                loadMoreBtn = $("#showMore a.btn"),
                loadMoreBtnText = $("#showMore a.btn").html(),
                loadMoreMessage = $('<div class="infinite-scroll-message"><p class="animated visible fadeIn">No more posts to show</p></div>');

            elem.infinitescroll({
                    itemSelector: "." + gridItem,
                    navSelector: navSelector,
                    nextSelector: navSelector + ' a:not(.btn)',
                    state: {
                        isDone: false
                    },
                    extraScrollPx: 10,
                    errorCallback: function () {
                        loadMoreElem.addClass("animated visible fadeOut");
                        var t = setTimeout(function () {
                            loadMoreElem.hide();
                            elem.after(loadMoreMessage);
                        }, 500);
                        var t = setTimeout(function () {
                            $(".infinite-scroll-message").addClass("animated visible fadeOut");
                        }, 3800);
                    },
                },

                // Function called once the elements are retrieved
                function (newElements) {
                    loadMoreBtn.html(loadMoreBtnText);

                    elem.css("margin", "0 -" + gridMargin + "px -" + gridMargin + "px 0");
                    elem.find('.' + gridItem).css("padding", "0 " + gridMargin + "px " + gridMargin + "px 0");

                    INSPIRO.slider.owlCarouselAjax();
                    elem.isotope('appended', newElements);
                    INSPIRO.elements.gridLayoutRefresh();

                });

            if (loadMoreElem.length > 0) {

                $window.unbind('.infscr');
                loadMoreBtn.click(function () {
                    loadMoreBtn.text("Loading...");
                    elem.infinitescroll('retrieve');
                    return false;
                });
            }


        },
        tooltip: function () {

            var $tooltip = $('[data-toggle="tooltip"]');
            if ($tooltip.length > 0) {

                //Check if tooltip plugin is loaded
                if (typeof $.fn.tooltip === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery tooltip plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initialize Tooltip plugin function
                $tooltip.tooltip();
            }
        },
        popover: function () {

            var $popover = $('[data-toggle="popover"]');

            if ($popover.length > 0) {

                //Check if popover plugin is loaded
                if (typeof $.fn.popover === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery popover plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initialize Tooltip plugin function
                $popover.popover({
                    container: 'body',
                    html: true
                });
            }
        },
        magnificPopup: function () {

            var $lightbox = $('[data-lightbox]');

            if ($lightbox.length > 0) {

                //Check if magnificPopup plugin is loaded
                if (typeof $.fn.magnificPopup === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery magnificPopup plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                //Get lightbox data type
                var getType = {
                    image: {
                        type: 'image',
                        closeOnContentClick: true,
                        removalDelay: 500,
                        image: {
                            verticalFit: true
                        },
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        }
                    },
                    gallery: {
                        delegate: 'a[data-lightbox="gallery-image"], a[data-lightbox="gallery-image"]',
                        type: 'image',
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1]
                        },
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        },
                    },
                    iframe: {
                        type: 'iframe',
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        }
                    },
                    ajax: {
                        type: 'ajax',
                        removalDelay: 500,
                        callbacks: {
                            ajaxContentAdded: function (mfpResponse) {
                                INSPIRO.slider.owlCarouselAjax();
                                INSPIRO.elements.responsiveVideos();
                                INSPIRO.elements.buttons();
                            }
                        }
                    },
                    inline: {
                        type: 'inline',
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        },
                        closeBtnInside: false,
                        fixedContentPos: true,
                        overflowY: 'scroll',
                    }
                }


                //Initializing jQuery magnificPopup plugin and passing options
                $lightbox.each(function () {
                    var elem = $(this),
                        elemType = elem.attr('data-lightbox');

                    switch (elemType) {
                        case 'image':
                            elem.magnificPopup(getType.image);
                            break;
                        case 'gallery':
                            elem.magnificPopup(getType.gallery);
                            break;
                        case 'iframe':
                            elem.magnificPopup(getType.iframe);
                            break;
                        case 'ajax':
                            elem.magnificPopup(getType.ajax);
                            break;
                        case 'inline':
                            elem.magnificPopup(getType.inline);
                            break;
                    }
                });
            }
        },

        yTPlayer: function () {

            var $ytPlayer = $('.youtube-background');

            if ($ytPlayer.length > 0) {

                //Check if YTPlayer plugin is loaded
                if (typeof $.fn.YTPlayer === 'undefined') {
                    INSPIRO.elements.notification('<b>Warning</b><br> jQuery YTPlayer plugin is missing, please add this code line <b> &lt;script src=&quot;js/plugins/js/jquery.mb.YTPlayer.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--></b>', "warning", 10000)
                    return true;
                }

                $ytPlayer.each(function () {

                    var elem = $(this);

                    //Plugin Options
                    elem.options = {
                        videoURL: elem.attr('data-youtube-url'),
                        mute: elem.attr('data-youtube-mute'),
                        ratio: elem.attr('data-youtube-ratio') || '16/9',
                        quality: elem.attr('data-youtube-quality') || 'hd720',
                        opacity: elem.attr('data-youtube-opacity') || 1,
                        containment: elem.attr('data-youtube-container') || 'self',
                        optimizeDisplay: elem.attr('data-youtube-optimize'),
                        loop: elem.attr('data-youtube-loop'),
                        vol: elem.attr('data-youtube-volume') || 70,
                        startAt: elem.attr('data-youtube-start') || 0,
                        stopAt: elem.attr('data-youtube-stop') || 0,
                        autoPlay: elem.attr('data-youtube-autoplay'),
                        realfullscreen: elem.attr('data-youtube-fullscreen'),
                        showYTLogo: elem.attr('data-youtube-logo'),
                        showControls: elem.attr('data-youtube-controls') || false
                    }

                    //Initializing jQuery YTPlayer plugin and passing options
                    elem.YTPlayer({
                        videoURL: elem.options.videoURL,
                        mute: elem.options.mute == 'true' ? true : false,
                        ratio: elem.options.ratio,
                        quality: elem.options.quality,
                        opacity: Number(elem.options.opacity),
                        containment: elem.options.containment,
                        optimizeDisplay: elem.options.optimizeDisplay == 'false' ? false : true,
                        loop: elem.options.loop == 'false' ? false : true,
                        vol: Number(elem.options.vol),
                        startAt: Number(elem.options.startAt),
                        stopAt: Number(elem.options.stopAt),
                        autoPlay: elem.options.autoPlay == 'true' ? true : false,
                        realfullscreen: elem.options.realfullscreen == 'true' ? true : false,
                        showYTLogo: elem.options.showYTLogo == 'true' ? true : false,
                        showControls: elem.options.showControls == 'true' ? true : false
                    });

                    if (!elem.options.autoPlay) {
                        elem.find("#youtube-background-controls").addClass("video-is-playing");
                    }
                    elem.on("YTPReady", function () {
                        $("#youtube-background-controls").on("click", function () {
                            if (!$(this).hasClass("video-is-playing")) {
                                $(this).addClass("video-is-playing");
                                elem.YTPPause();
                            } else {
                                $(this).removeClass("video-is-playing");
                                elem.YTPPlay();
                            }
                            return false;
                        });
                        var elemContainerHeight = elem.height();
                        if (elem.options.autoPause) {
                            $window.on('scroll', function () {
                                if ($window.scrollTop() > elemContainerHeight) {
                                    $("#youtube-background-controls").addClass("video-is-playing");
                                    elem.YTPPause();
                                }
                            });
                        }
                    });
                });
            }
        },
        vimeoPlayer: function () {
            var $vmPlayer = $('.vimeo-background');

            if ($vmPlayer.length > 0) {

                //Check if vimeo_player plugin is loaded
                if (typeof $.fn.vimeo_player === 'undefined') {
                    INSPIRO.elements.notification('<b>Warning</b><br> jQuery vimeo_player plugin is missing, please add this code line <b> &lt;script src=&quot;js/plugins/js/jquery.mb.vimeo_player.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--></b>', "warning", 10000)
                    return true;
                }


                $vmPlayer.each(function () {
                    var elem = $(this),
                        elemVideo = elem.attr('data-vimeo-url') || null,
                        elemMute = elem.attr('data-vimeo-mute') || false,
                        elemRatio = elem.attr('data-vimeo-ratio') || '16/9',
                        elemQuality = elem.attr('data-vimeo-quality') || 'hd720',
                        elemOpacity = elem.attr('data-vimeo-opacity') || 1,
                        elemContainer = elem.attr('data-vimeo-container') || 'self',
                        elemOptimize = elem.attr('data-vimeo-optimize') || true,
                        elemLoop = elem.attr('data-vimeo-loop') || true,
                        elemVolume = elem.attr('data-vimeo-volume') || 70,
                        elemStart = elem.attr('data-vimeo-start') || 0,
                        elemStop = elem.attr('data-vimeo-stop') || 0,
                        elemAutoPlay = elem.attr('data-vimeo-autoplay') || true,
                        elemFullScreen = elem.attr('data-vimeo-fullscreen') || true,
                        elemControls = elem.attr('data-vimeo-controls') || false,
                        elemLogo = elem.attr('data-vimeo-logo') || false,
                        elemAutoPause = elem.attr('data-vimeo-autopause') || false;

                    elem.vimeo_player({
                        videoURL: elemVideo,
                        mute: elemMute,
                        ratio: elemRatio,
                        quality: elemQuality,
                        opacity: elemOpacity,
                        containment: elemContainer,
                        optimizeDisplay: elemOptimize,
                        loop: elemLoop,
                        vol: elemVolume,
                        startAt: elemStart,
                        stopAt: elemStop,
                        autoPlay: elemAutoPlay,
                        realfullscreen: elemFullScreen,
                        showvmLogo: elemLogo,
                        showControls: elemControls
                    });
                });
            }
        },
        modal: function () {

            //Check if magnificPopup plugin is loaded
            if (typeof $.fn.magnificPopup === 'undefined') {
                INSPIRO.elements.notification("Warning: jQuery magnificPopup plugin is missing in plugins.js file.", "warning")
                return true;
            }

            var $modal = $(".modal"),
                $modalStrip = $(".modal-strip"),
                $btnModal = $(".btn-modal"),
                modalShow = "modal-auto-open",
                modalShowClass = "modal-active",
                modalDecline = $(".modal-close"),
                cookieNotify = $(".cookie-notify"),
                cookieConfirm = cookieNotify.find(".modal-confirm, .mfp-close");


            /*Modal*/
            if ($modal.length > 0) {
                $modal.each(function () {
                    var elem = $(this),
                        elemDelay = elem.attr("data-delay") || 3000,
                        elemCookieExpire = elem.attr("data-cookie-expire") || 365,
                        elemCookieName = elem.attr("data-cookie-name") || "coockieName",
                        elemCookieEnabled = elem.attr("data-cookie-enabled") || "false";


                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {


                        /*Cookie Notify*/
                        var t = setTimeout(function () {
                            $.magnificPopup.open({
                                items: {
                                    src: elem
                                },
                                type: 'inline',
                                closeBtnInside: true,
                                callbacks: {
                                    beforeOpen: function () {
                                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                        this.st.mainClass = "mfp-zoom-out";
                                    },
                                    open: function () {
                                        if (elem.find("video").length > 0) {
                                            elem.find("video").get(0).play();
                                        }
                                    },
                                    close: function () {
                                        Cookies.set(elemCookieName, true, {
                                            expires: Number(elemCookieExpire)
                                        });
                                    }
                                }
                            }, 0);
                        }, elemDelay);
                    }

                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function () {
                        $.magnificPopup.close();
                        return false;
                    });
                });
            }
            /*Modal Strip*/
            if ($modalStrip.length > 0) {

                $modalStrip.each(function () {
                    var elem = $(this),
                        elemDelay = elem.attr("data-delay") || 3000,
                        elemCookieExpire = elem.attr("data-cookie-expire") || 365,
                        elemCookieName = elem.attr("data-cookie-name") || "coockieName2013",
                        elemCookieEnabled = elem.attr("data-cookie-enabled") || "false";

                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        var modalElem = $(this);
                        var timeout = setTimeout(function () {
                            modalElem.addClass(modalShowClass);
                        }, elemDelay);
                    }
                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function () {
                        elem.removeClass(modalShowClass);
                        return false;
                    });


                    /*Cookie Notify*/
                    if (elem.hasClass("cookie-notify")) {
                        var timeout = setTimeout(function () {
                            if (elemCookieEnabled != true) {
                                cookieNotify.addClass(modalShowClass);
                            } else {
                                if (typeof Cookies.get(elemCookieName) == 'undefined') {
                                    cookieNotify.addClass(modalShowClass);
                                }
                            }
                        }, elemDelay);

                        cookieConfirm.click(function () {
                            Cookies.set(elemCookieName, true, {
                                expires: Number(elemCookieExpire)
                            });
                            $.magnificPopup.close();
                            cookieNotify.removeClass(modalShowClass);
                            return false;
                        });
                    }
                });
            }
            /*Modal toggles*/
            if ($btnModal.length > 0) {

                $btnModal.each(function () {
                    var elem = $(this),
                        modalTarget = elem.attr("data-modal");
                    elem.click(function () {
                        $(modalTarget).toggleClass(modalShowClass, 1000);
                        return false;
                    });
                });
            }
        },

        notification: function (
            $message,
            $type,
            $delay,
            $spacing,
            $mouse_over,
            $allow_dismiss,
            $timer,
            $newest_on_top,
            $showProgressbar,
            $offsetX,
            $offsetY,
            $z_index,
            $animateEnter,
            $animateExit) {

            var content = {};
            content.message = $message,

                $.notify(content, {
                    type: $type || 'warning',
                    delay: $delay,
                    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="icon-x"></i></button>' +
                        '<span data-notify="icon"></span> ' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="p-progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>',
                    /* spacing: $spacing,
                mouse_over: $mouse_over,
                allow_dismiss: $allow_dismiss,
                timer: $timer,
                newest_on_top: $newest_on_top,
                showProgressbar: $showProgressbar,
                
                offset: {
                    x: $offsetX,
                    y: $offsetY
                },
               
                z_index: $z_index,
                animate: {
                    enter: 'animated ' + $animateEnter,
                    exit: 'animated ' + $animateExit
                } */
                });
        },

        sidebarFixed: function () {

            var $sidebarFixed = $('.sticky-sidebar');

            if ($sidebarFixed.length > 0) {

                //Check if theiaStickySidebar plugin is loaded
                if (typeof $.fn.theiaStickySidebar === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery theiaStickySidebar plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $sidebarFixed.each(function () {
                    var elem = $(this);
                    elem.options = {
                        additionalMarginTop: elem.attr('data-margin-top') || 120,
                        additionalMarginBottom: elem.attr('data-margin-bottom') || 50
                    }
                    //Initialize theiaStickySidebar plugin and passing options
                    elem.theiaStickySidebar({
                        additionalMarginTop: Number(elem.options.additionalMarginTop),
                        additionalMarginBottom: Number(elem.options.additionalMarginBottom)
                    });
                });
            }
        },

        bootstrapSwitch: function () {

            var $bootstrapSwitch = $('[data-switch=true]');

            if ($bootstrapSwitch.length > 0) {

                //Check if bootstrapSwitch plugin is loaded
                if (typeof $.fn.bootstrapSwitch === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery bootstrapSwitch plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initialize jQuery BootstrapSwitch plugin
                $bootstrapSwitch.bootstrapSwitch();
            }


        },

        clipboard: function () {

            var $clipboardTarget = $('[data-clipboard-target]'),
                $clipboardText = $('[data-clipboard-text]');

            if ($clipboardTarget.length > 0) {

                //Check if ClipboardJS plugin is loaded
                if (typeof ClipboardJS === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery ClipboardJS plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                if ($clipboardTarget) {
                    new ClipboardJS('[data-clipboard-target]');
                    clipboardInit($clipboardTarget);
                }
                if ($clipboardText) {
                    new ClipboardJS('[data-clipboard-text]');
                    clipboardInit($clipboardText);
                }

                function clipboardInit(clipboardType) {
                    clipboardType.each(function () {
                        var elem = $(this),
                            title = elem.attr('data-original-title') || "Copy to clipboard",
                            titleSuccess = elem.attr('data-original-title-success') || "Copied!";

                        elem.tooltip({
                            placement: 'top',
                            title: title
                        });

                        elem.on('click touchend', function () {
                            elem.attr('data-original-title', titleSuccess).tooltip('show');
                        }).on('mouseleave untouched', function () {
                            elem.tooltip('hide').attr('data-original-title', title);
                            return false;
                        });
                    });
                }
            }
        },

        countdown: function () {

            var $countdown = $(".p-countdown");

            if ($countdown.length > 0) {
                $countdown.each(function () {
                    var $elem = $(this),
                        $elemCount = $elem.find(".p-countdown-count"),
                        $elemShow = $elem.find(".p-countdown-show"),
                        $elemSeconds = $elem.attr("data-delay") || 5;

                    $elemCount.find('.count-number').html($elemSeconds);

                    new Waypoint({
                        element: $elem,
                        handler: function () {
                            var interval = setInterval(function () {
                                $elemSeconds--;
                                if ($elemSeconds == 0) {
                                    clearInterval(interval);
                                    $elemCount.fadeOut("slow");
                                    setTimeout(function () {
                                        $elemShow.fadeIn('show');
                                    }, 1000);
                                } else {
                                    $elemCount.find('.count-number').html($elemSeconds);
                                }
                            }, 1000);
                        },
                        offset: '100%'
                    });
                });
            }
        }
    };
    INSPIRO.widgets = {
        functions: function () {
            INSPIRO.widgets.twitter();
            INSPIRO.widgets.flickr();
            INSPIRO.widgets.instagram();
            INSPIRO.widgets.instagramComplete();
            INSPIRO.widgets.contactForm();
            INSPIRO.widgets.subscribeForm();
        },
        twitter: function () {

            var $widget_twitter = $('.widget-tweeter') || $('.widget-twitter');

            if ($widget_twitter.length > 0) {

                //Check if twittie plugin is loaded
                if (typeof $.fn.twittie === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery twittie plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                var t = setTimeout(function () {
                    $widget_twitter.each(function () {
                        var $elem = $(this),
                            twitterUsername = $elem.attr('data-username') || "ardianmusliu",
                            twitterLimit = $elem.attr('data-limit') || 2,
                            twitterDateFormat = $elem.attr('data-format') || '%b/%d/%Y',
                            twitterLoadingText = $elem.attr('data-loading-text') || 'Loading...',
                            twitterApiPAth = $elem.attr('data-loader') || "include/twitter/tweet.php",
                            twitterAvatar = $elem.attr('data-avatar') || false;
                        if (twitterAvatar == 'true') {
                            twitterAvatar = "{{avatar}}";
                        } else {
                            twitterAvatar = "";
                        }
                        $elem.append('<div id="twitter-cnt"></div>')

                        $elem.find('#twitter-cnt').twittie({
                            'username': twitterUsername,
                            'count': twitterLimit,
                            'dateFormat': twitterDateFormat,
                            'template': twitterAvatar + '{{tweet}}<small>{{date}}</small>',
                            'apiPath': twitterApiPAth,
                            'loadingText': twitterLoadingText
                        });
                    });
                }, 2000);
            }
        },
        flickr: function () {

            var $flickr_widget = $('.flickr-widget');

            if ($flickr_widget.length > 0) {

                //Check if jflickrfeed plugin is loaded
                if (typeof $.fn.jflickrfeed === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery jflickrfeed plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $flickr_widget.each(function () {

                    var elem = $(this);

                    elem.options = {
                        id: elem.attr('data-flickr-id') || "52617155@N08",
                        limit: elem.attr('data-flickr-images') || "9",
                        itemTemplate: '<a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>'
                    }

                    //Initializing jflickrfeed plugin and passing options
                    $flickr_widget.jflickrfeed({
                        limit: elem.options.limit,
                        qstrings: {
                            id: elem.options.id
                        },
                        itemTemplate: elem.options.itemTemplate

                    }, function () {
                        var t = setTimeout(function () {
                            elem.addClass('flickr-widget-loaded');
                        }, 1000);

                        elem.magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            gallery: {
                                enabled: true
                            }
                        });
                    });
                });
            }
        },

        instagram: function () {

            var $widget_instagram = $('.widget-instagram');
            if ($widget_instagram.length > 0) {

                //Check if spectragram plugin is loaded
                if (typeof $.fn.spectragram === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery spectragram plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $widget_instagram.each(function () {

                    var elem = $(this),
                        instagramLimit = elem.attr('data-limit') || 12,
                        instagramColumns = elem.attr('data-col') || 3,
                        instagramAccessToken = elem.attr('data-token') || '5783726529.7f62efa.75dba27ec87c4317b90d7b2ae98dde88',
                        instagramItems = "#instagram-cnt",
                        instagramSize = elem.attr('data-size') || 'small', //The size of the photos. 'small', 'medium' or 'big'. Default: 'medium'
                        instagramGridColumns = "grid-" + instagramColumns;

                    elem.append('<div id="instagram-cnt" class="' + instagramGridColumns + '"></div>');

                    jQuery.fn.spectragram.accessData = {
                        accessToken: instagramAccessToken
                    };

                    elem.find($(instagramItems)).spectragram('getUserFeed', {
                        size: instagramSize,
                        max: instagramLimit,
                        wrapEachWith: '',
                        complete: spectragramComplete
                    });

                    var t = setTimeout(function () {
                        elem.addClass('widget-instagram-loaded');
                    }, 300);

                    var spectragramComplete = function () {

                        if ($gridLayout) {
                            var t = setTimeout(function () {
                                INSPIRO.elements.gridLayoutRefresh();
                            }, 300);
                        }
                    };

                });
            }
        },
        instagramComplete: function () {
            if ($gridLayout) {
                var t = setTimeout(function () {
                    INSPIRO.elements.gridLayoutRefresh();
                }, 300);
            }
        },
        contactForm: function () {

            var $contactForm = $(".widget-contact-form");

            if ($contactForm.length > 0) {

                //Check if validate plugin is loaded
                if (typeof $.fn.validate === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery validate plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                //Check if ajaxSubmit plugin is loaded
                if (typeof $.fn.ajaxSubmit === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery ajaxSubmit plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $contactForm.each(function () {
                    var elem = $(this),
                        elemSuccessMessage = elem.attr('data-success-message') || "We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible.";

                    elem.validate({
                        submitHandler: function (form) {
                            var button = $(form).find('button#form-submit'),
                                buttonText = button.html();

                            button.html('<i class="fa fa-refresh fa-spin"></i> Sending...');

                            $(form).ajaxSubmit({
                                success: function (text) {
                                    if (text.response == 'success') {
                                        $.notify({
                                            message: elemSuccessMessage
                                        }, {
                                            type: 'success'
                                        });
                                        if ($(form).find('.g-recaptcha').children('div').length > 0) {
                                            grecaptcha.reset();
                                        }
                                        $(form)[0].reset();
                                        button.html(buttonText);

                                    } else {
                                        $.notify({
                                            message: elem.attr('data-error-message') || text.message
                                        }, {
                                            type: 'danger'
                                        });
                                        var t = setTimeout(function () {
                                            button.html(buttonText);
                                        }, 1000);
                                    }
                                }
                            });
                        }
                    });
                });
            }
        },
        subscribeForm: function () {

            var $subscribeForm = $(".widget-subscribe-form");

            if ($subscribeForm.length > 0) {

                //Check if validate plugin is loaded
                if (typeof $.fn.validate === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery validate plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                //Check if ajaxSubmit plugin is loaded
                if (typeof $.fn.ajaxSubmit === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery ajaxSubmit plugin is missing in plugins.js file.", "warning")
                    return true;
                }

                $subscribeForm.each(function () {
                    var elem = $(this),
                        elemSuccessMessage = elem.attr('success-message') || "You have successfully subscribed to our mailing list.";

                    elem.validate({
                        submitHandler: function (form) {
                            var addonIcon = elem.find('.input-group-prepend'),
                                addonIconText = addonIcon.html();

                            addonIcon.html('<i class="fa fa-refresh fa-spin"></i>');

                            $(form).ajaxSubmit({
                                dataType: 'json',
                                success: function (text) {
                                    if (text.response == 'success') {
                                        $.notify({
                                            message: elemSuccessMessage
                                        }, {
                                            type: 'success'
                                        });
                                        $(form)[0].reset();
                                        addonIcon.html(addonIconText);

                                    } else {
                                        $.notify({
                                            message: text.message
                                        }, {
                                            type: 'warning'
                                        });
                                        addonIcon.html(addonIconText);
                                    }
                                }
                            });
                        }
                    });
                });
            }
        },
    };




    //Load Functions on document ready
    $(document).ready(function () {
        INSPIRO.core.functions();
        INSPIRO.header.functions();
        INSPIRO.slider.functions();
        INSPIRO.widgets.functions();
        INSPIRO.elements.functions();


    });

    //Recall Functions on window scroll
    $window.on('scroll', function () {
        INSPIRO.header.logoStatus();
        INSPIRO.header.stickyHeader();
        INSPIRO.core.scrollTop();
        INSPIRO.header.dotsMenu();
    });

    //Recall Functions on window resize
    $window.on('resize', function () {
        INSPIRO.header.stickyHeader();
        INSPIRO.core.screenSizeControl();
        INSPIRO.header.logoStatus();
    });

})(jQuery);
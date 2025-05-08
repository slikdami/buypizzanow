/**
	Navik - HTML header navigation menu - v1.4.2
 	Copyright (c) 2020, Pophonic
	
	Author: Pophonic
	Profile: https://codecanyon.net/user/pophonic
	
**/

jQuery(document).ready(function () {
  "use strict";

  /* ========== Horizontal navigation menu ========== */
  if ($(".navik-header").length) {
    var navikHeader = $(".navik-header"),
      navikHeaderHeight = navikHeader.height(),
      logo = navikHeader.find(".logo"),
      logoImg = logo.find("img"),
      logoSrc = logoImg.attr("src"),
      logoClone = logo.clone(),
      mobileLogoSrc = logo.data("mobile-logo"),
      stickyLogoSrc = logo.data("sticky-logo"),
      burgerMenu = navikHeader.find(".burger-menu"),
      navikMenuListWrapper = $(".navik-menu > ul"),
      navikMenuListDropdown = $(".navik-menu ul li:has(ul)"),
      headerShadow = $(".navik-header.header-shadow"),
      headerTransparent = $(".navik-header.header-transparent"),
      headerOpacity = $(".navik-header.header-opacity"),
      megaMenuFullwidthContainer = $(
        ".mega-menu-fullwidth .mega-menu-container"
      );

    /* ========== Center menu 1 ========== */
    $(".center-menu-1 .navik-menu > ul:first-child").after(
      '<div class="logoCenter"></div>'
    );
    $(".logoCenter").html(logoClone);

    /* ========== Mega menu fullwidth wrap container ========== */
    megaMenuFullwidthContainer.each(function () {
      $(this)
        .children()
        .wrapAll('<div class="mega-menu-fullwidth-container"></div>');
    });

    /* ========== Window resize ========== */
    $(window)
      .on("resize", function () {
        var megaMenuContainer = $(".mega-menu-fullwidth-container");

        if ($(window).width() < 1200) {
          logoImg.attr("src", mobileLogoSrc);
          navikHeader.removeClass("viewport-lg");
          headerTransparent.removeClass("header-transparent-on");
          headerOpacity.removeClass("header-opacity-on");
          megaMenuContainer.removeClass("container");
        } else {
          logoImg.attr("src", logoSrc);
          navikHeader.addClass("viewport-lg");
          headerTransparent.addClass("header-transparent-on");
          headerOpacity.addClass("header-opacity-on");
          megaMenuContainer.addClass("container");
        }
      })
      .resize();

    /* ========== Dropdown Menu Toggle ========== */
    burgerMenu.on("click", function () {
      $(this).toggleClass("menu-open");
      navikMenuListWrapper.slideToggle(300);
    });

    navikMenuListDropdown.each(function () {
      $(this).append('<span class="dropdown-plus"></span>');
      $(this).addClass("dropdown_menu");
    });

    $(".dropdown-plus").on("click", function () {
      $(this).prev("ul").slideToggle(300);
      $(this).toggleClass("dropdown-open");
    });

    $(".dropdown_menu a").append("<span></span>");

    /* ========== Added header shadow ========== */
    headerShadow.append('<div class="header-shadow-wrapper"></div>');

    /* ========== Menu hover transition ========== */
    var listMenuHover4 = $(".navik-menu.menu-hover-4 > ul > li > a");
    listMenuHover4.append('<div class="hover-transition"></div>');
  }

  /* ========== Overlay navigation menu ========== */
  if ($(".navik-header-overlay").length) {
    var navikHeaderOverlay = $(".navik-header-overlay"),
      navikMenuOverlay = $(".navik-menu-overlay"),
      burgerMenuOverlay = navikHeaderOverlay.find(".burger-menu"),
      lineMenuOverlay = navikHeaderOverlay.find(".line-menu"),
      menuOverlayLogo = navikHeaderOverlay.find(".logo"),
      overlayLogoClone = menuOverlayLogo.clone(),
      menuWrapperLogoSrc = menuOverlayLogo.data("overlay-logo"),
      menuOverlayListDropdown = $(".navik-menu-overlay > ul > li:has(ul)"),
      menuOverlayLink = $(".navik-menu-overlay > ul > li > a"),
      menuSlide = $(".navik-header-overlay.menu-slide"),
      menuSlideSubmenuLink = menuSlide.find(".navik-menu-overlay > ul ul a"),
      menuSlideSubmenuDropdown = menuSlide.find(
        ".navik-menu-overlay > ul > li > ul li:has(ul)"
      ),
      menuSocialMedia = navikMenuOverlay.next(".menu-social-media"),
      submenuVerticalListItem = $(
        ".submenu-vertical > ul > li > ul li:has(ul)"
      ),
      submenuVerticalLink = $(".submenu-vertical > ul > li > ul a");

    lineMenuOverlay.wrapAll("<span></span>");
    menuOverlayLink.wrap('<div class="menu-overlay-link"></div>');
    submenuVerticalLink.wrap('<div class="menu-overlay-link"></div>');
    menuSlideSubmenuLink.wrap('<div class="menu-overlay-link"></div>');

    /* ========== Submenu Toggle ========== */
    menuOverlayListDropdown.each(function () {
      var menuOverlayDropdownLink = $(this).children(".menu-overlay-link");
      menuOverlayDropdownLink.prepend(
        '<span class="overlay-dropdown-plus"></span>'
      );
      $(this).addClass("overlay_dropdown_menu");
    });

    submenuVerticalListItem.each(function () {
      var submenuVerticalDropdownLink = $(this).children(".menu-overlay-link");
      submenuVerticalDropdownLink.prepend(
        '<span class="overlay-dropdown-plus"></span>'
      );
      $(this).addClass("overlay_dropdown_menu");
    });

    menuSlideSubmenuDropdown.each(function () {
      var submenuVerticalDropdownLink = $(this).children(".menu-overlay-link");
      submenuVerticalDropdownLink.prepend(
        '<span class="overlay-dropdown-plus"></span>'
      );
      $(this).addClass("overlay_dropdown_menu");
    });

    $(".overlay_dropdown_menu > ul").addClass("overlay-submenu-close");

    $(".overlay-dropdown-plus").on("click", function () {
      var $thisParent = $(this).parent(".menu-overlay-link");
      $thisParent
        .next("ul")
        .slideToggle(300)
        .toggleClass("overlay-submenu-close");
      $(this).toggleClass("overlay-dropdown-open");
    });

    navikMenuOverlay
      .add(menuSocialMedia)
      .wrapAll('<div class="nav-menu-wrapper"></div>');

    var overlayNavMenuWrapper = $(".nav-menu-wrapper");

    overlayNavMenuWrapper.prepend(overlayLogoClone);
    overlayNavMenuWrapper.find(".logo img").attr("src", menuWrapperLogoSrc);

    var menuOverlayHover = $(
      ".navik-menu-overlay > ul > .overlay_dropdown_menu > ul"
    );

    menuOverlayHover.each(function () {
      $(this).on("mouseenter", function () {
        $(this).parents("li").addClass("overlay-menu-hover");
      });
      $(this).on("mouseleave", function () {
        $(this).parents("li").removeClass("overlay-menu-hover");
      });
    });

    /* ========== Menu overlay open ========== */
    burgerMenuOverlay.on("click", function () {
      var overlayMenuList = $(".navik-menu-overlay > ul > li");

      $(this).toggleClass("menu-open");
      overlayNavMenuWrapper.toggleClass("overlay-menu-open");
      overlayMenuList.removeClass("menuSlideIn");

      if ($(this).hasClass("menu-open")) {
        overlayMenuTransition();
        overlayMenuList.removeClass("menuSlideOut").addClass("menuFade");
      }

      if (!$(this).hasClass("menu-open")) {
        overlayMenuList.addClass("menuSlideOut").removeClass("menuFade");
      }
    });

    /* ========== Menu slide settings ========== */
    var menuSlideNavWrapper = menuSlide.find(".nav-menu-wrapper"),
      menuSlideNavLogo = menuSlideNavWrapper.find(".logo");

    if (navikHeaderOverlay.hasClass("menu-slide")) {
      navikHeaderOverlay.removeClass("overlay-center-menu");
    }

    menuSlideNavLogo.remove();
    menuSlideNavWrapper.after('<div class="slidemenu-bg-overlay"></div>');

    $(".slidemenu-bg-overlay").on("click", function () {
      menuSlideNavWrapper.removeClass("overlay-menu-open");
      burgerMenuOverlay.removeClass("menu-open");
    });
  }

  /* ========== Fixed sidebar menu ========== */
  if ($(".navik-fixed-sidebar").length) {
    var navikFixedSidebar = $(".navik-fixed-sidebar"),
      navikMenuFixed = $(".navik-menu-fixed"),
      navikSideContent = $(".navik-side-content"),
      logoFixedSidebar = navikFixedSidebar.find(".logo"),
      logoClone = logoFixedSidebar.clone(),
      burgerMenuFixedSidebar = navikFixedSidebar.find(".burger-menu"),
      burgerMenuDetach = burgerMenuFixedSidebar.detach(),
      navikFixedDropdown = navikMenuFixed.find("li:has(ul)");

    navikFixedSidebar.parent("body").addClass("body-fixed-sidebar");
    navikFixedSidebar
      .after('<div class="fixedsidebar-bg-overlay"></div>')
      .after(burgerMenuDetach);
    navikSideContent.prepend(logoClone);

    $(".navik-fixed-sidebar .logo, .navik-menu-fixed").wrapAll(
      '<div class="fixed-menu-wrap"></div>'
    );

    var burgerMenuMove = navikFixedSidebar.next(".burger-menu"),
      fixedSidebarlineMenu = burgerMenuMove.find(".line-menu");

    fixedSidebarlineMenu.wrapAll("<span></span>");

    /* ========== Side menu open on mobile ========== */
    burgerMenuMove.on("click", function () {
      $(this).toggleClass("menu-open");
      navikFixedSidebar.toggleClass("fixed-sidebar-open");
    });

    $(".fixedsidebar-bg-overlay").on("click", function () {
      navikFixedSidebar.removeClass("fixed-sidebar-open");
      burgerMenuMove.removeClass("menu-open");
    });

    /* ========== Submenu collapse ========== */
    navikFixedDropdown.each(function () {
      $(this).append('<span class="overlay-dropdown-plus"></span>');
    });

    $(".overlay-dropdown-plus").on("click", function () {
      $(this).prev("ul").slideToggle(300).toggleClass("submenu-collapse");
      $(this).toggleClass("overlay-dropdown-open");
    });
  }

  /* ========== Menu icon color ========== */
  $(".navik-menu-icon").css("color", function () {
    var iconColorAttr = $(this).data("fa-color");
    return iconColorAttr;
  });
});

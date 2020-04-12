// ==UserScript==
// @name         Kopunch Classic
// @version      0.1.1
// @description  Classic Facepunch feel for Ott's Kopunch
// @author       i_speel_good
// @match        *://*.kopunch.club/*
// @match        *://kopunch.club/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  console.info("[kopunch-classic] Started");

  // OPTIONS
  const DOM_MODIFICATION_LIMIT = 100;
  let DOM_MODIFICATION_INDEX = 0;

  // URLs
  const IMG_URL = 'https://i.imgur.com/aVXZTyp.png';

  // DOM Class Selectors
  const CLASS_SELECTOR_IMG_PARENT = '.link-internal';
  const CLASS_SELECTOR_TEXT_PARENT = '.title';
  const CLASS_SELECTOR_BREADCRUMB_NAV = '.breadcrumb';
  const CLASS_SELECTOR_FOOTER_PARENT = ".footer"

  // DOM Class Names
  const CLASS_NAME_CATEGORY_PARENT = "category-title";

  // Child indices for DOM Classes
  const INDEX_IMAGE = 0;
  const INDEX_TITLE_SPAN = 0;
  const INDEX_TITLE_TITLE = 1;
  const INDEX_TITLE_BREADCRUMB_DIV = 1;
  const INDEX_TITLE_BREADCRUMB_NAVBIT = 4;
  const INDEX_TITLE_BREADCRUMB_LINK = 1;
  const INDEX_FOOTER_DIV = 1;
  const INDEX_FOOTER_LINK = 0;

  // Strings
  const TEXT_TITLE_OLD = 'Knockout';
  const TEXT_TITLE_NEW = 'Facepunch';

  /*
  * -- Image --
  *	DOM looks like this:
  *	<a class="link-internal"...
  *		<img src=...
  */
  function replaceImage() {
    let img = document
      .querySelector(CLASS_SELECTOR_IMG_PARENT);

    if (!img) {
      console.warn("[kopunch-classic] Did not update Image (no parent class)");
      return;
    }

    if (!img.hasChildNodes) {
      console.warn("[kopunch-classic] Did not update Image (no child nodes)");
      return;
    }

    if (img.childNodes[INDEX_IMAGE].src == IMG_URL) {
      console.warn("[kopunch-classic] Did not update Image (already updated)");
      return;
    }

    img
      .childNodes[INDEX_IMAGE]
      .src = IMG_URL;

    console.info('[kopunch-classic] Replaced Image');
  }

  /*
  * -- Title Header --
  *	DOM looks like this:
  *	<div class="title">
  *		<span>Knockout</span>
  */
  function replaceTitleHeaderText() {
    let spanTitle = document
      .querySelector(CLASS_SELECTOR_TEXT_PARENT)
      .childNodes[INDEX_TITLE_SPAN]
      .innerText;

    // If the header title is "Knockout", then the Breadcrumb Nav is not showing.
    if (spanTitle == TEXT_TITLE_OLD) {
      document
        .querySelector(CLASS_SELECTOR_TEXT_PARENT)
        .childNodes[INDEX_TITLE_SPAN]
        .innerText = TEXT_TITLE_NEW;

        console.info('[kopunch-classic] Replaced Title');
    }
  }

  /*
  * -- Breadcrumb --
  *	DOM looks like this:
  *	<div class="breadcrumb">
  *		<div>...</div>
  *		<div> <!-- TITLE_BREADCRUMB_DIV_INDEX=1 -->
  *			...
  *			<span class="navbit"> <!-- TITLE_BREADCRUMB_NAVBIT_INDEX=4 -->
  *				"> "	<!-- yes, this index 0 -->
  *				<a class="link-internal"> Knockout <!-- TITLE_BREADCRUMB_LINK_INDEX=1 -->
  */
  function replaceBreadcrumb() {
    let breadcrumb = document.querySelector('.breadcrumb');

    if (!breadcrumb) {
      console.warn('[kopunch-classic] No breadcrumb found')
      return;
    }

    let breadcrumbNavbit = breadcrumb
      .childNodes[INDEX_TITLE_BREADCRUMB_DIV]
      .childNodes[INDEX_TITLE_BREADCRUMB_NAVBIT];

    if (!breadcrumbNavbit) {
      console.warn('[kopunch-classic] No breadcrumb navbit found')
      return;
    }

    let breadcrumbTitle = breadcrumbNavbit
      .childNodes[INDEX_TITLE_BREADCRUMB_LINK]
      .innerText;

    if (breadcrumbTitle != TEXT_TITLE_OLD) {
      console.warn("[kopunch-classic] Did not update Breadcrumb Title");
      return;
    }

    document
      .querySelector(CLASS_SELECTOR_BREADCRUMB_NAV)
      .childNodes[INDEX_TITLE_BREADCRUMB_DIV]
      .childNodes[INDEX_TITLE_BREADCRUMB_NAVBIT]
      .childNodes[INDEX_TITLE_BREADCRUMB_LINK]
      .innerText = TEXT_TITLE_NEW;
  }

  /*
  * -- Browser Page Title --
  *	DOM looks like this:
  *	<div class="title">
  *		...
  *		<title>Knockout</title>
  */
  function replaceBrowserPageTitle() {

    let spanTitle = document
      .querySelector(CLASS_SELECTOR_TEXT_PARENT)
      .childNodes[INDEX_TITLE_TITLE]
      .innerText;

    if (spanTitle != TEXT_TITLE_OLD) {
      console.warn("[kopunch-classic] Did not update Page Title");
      return;
    }

    document
      .querySelector(CLASS_SELECTOR_TEXT_PARENT)
      .childNodes[INDEX_TITLE_TITLE]
      .innerText = TEXT_TITLE_NEW;

    console.info('[kopunch-classic] Replaced Title');
  }

  /*
  * -- Footer --
  *	DOM looks like this:
  *	<div class="footer">
  *		<div> ... </div>
  *		<div class="big">
  *     <a class="link-internal">Knockout
  */
  function replaceFooter() {
    let footerTitle = document
      .querySelector(CLASS_SELECTOR_FOOTER_PARENT)
      .childNodes[INDEX_TITLE_TITLE]
      .innerText;

    if (footerTitle != TEXT_TITLE_OLD) {
      console.warn("[kopunch-classic] Did not replace footer");
      return;
    }

    document
      .querySelector('.footer')
      .childNodes[INDEX_FOOTER_DIV]
      .childNodes[INDEX_FOOTER_LINK]
      .innerText = TEXT_TITLE_NEW;
  }

  document.addEventListener('DOMSubtreeModified', function (event) {
      // TODO: This is crude as hell lol, find a better way to modify a React based page.
      // Perhaps with MutationObserver?
      replaceImage();
      replaceTitleHeaderText();
      replaceBreadcrumb();
      replaceBrowserPageTitle();
      replaceFooter();
  });


})();

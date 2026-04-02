/**
 * ZATCA — Navbar Controller
 *
 * Handles:
 *  - Scroll-based shadow on sticky header
 *  - Mobile hamburger toggle with animated X
 *  - Body scroll lock when drawer is open
 *  - Overlay backdrop
 *  - Close on: link click, outside click, Escape key, viewport resize
 *
 * @usage Automatically initialises on DOMContentLoaded.
 *        Expects the standard .navbar markup in the DOM.
 */

const Navbar = (() => {
  'use strict';

  /* ---- DOM refs (populated in init) ---- */
  let _navbar    = null;
  let _toggle    = null;
  let _drawer    = null;
  let _overlay   = null;

  /* ---- State ---- */
  const SCROLL_THRESHOLD = 10;
  const DESKTOP_MQ       = '(min-width: 769px)';

  /* ================================================================
   *  Public
   * ================================================================ */

  function init() {
    _navbar  = document.querySelector('.navbar');
    _toggle  = document.querySelector('.navbar__toggle');
    _drawer  = document.querySelector('.navbar__mobile-menu');
    _overlay = document.querySelector('.navbar__overlay');

    if (!_navbar) return;

    _observeScroll();
    _bindToggle();
    _bindKeyboard();
    _bindOutsideClick();
    _bindViewportChange();
  }


  /* ================================================================
   *  Scroll shadow
   * ================================================================ */

  function _observeScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        _navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }, { passive: true });
  }


  /* ================================================================
   *  Mobile drawer
   * ================================================================ */

  function _bindToggle() {
    if (!_toggle || !_drawer) return;

    _toggle.addEventListener('click', _toggleDrawer);

    _drawer.querySelectorAll('.navbar__link').forEach(link =>
      link.addEventListener('click', _closeDrawer)
    );
  }

  function _toggleDrawer() {
    const willOpen = !_drawer.classList.contains('is-open');
    willOpen ? _openDrawer() : _closeDrawer();
  }

  function _openDrawer() {
    _drawer.classList.add('is-open');
    _toggle.classList.add('is-active');
    _toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (_overlay) _overlay.classList.add('is-visible');
  }

  function _closeDrawer() {
    _drawer.classList.remove('is-open');
    _toggle.classList.remove('is-active');
    _toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (_overlay) _overlay.classList.remove('is-visible');
  }

  function _isDrawerOpen() {
    return _drawer && _drawer.classList.contains('is-open');
  }


  /* ================================================================
   *  Close triggers
   * ================================================================ */

  function _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _isDrawerOpen()) {
        _closeDrawer();
        _toggle.focus();
      }
    });
  }

  function _bindOutsideClick() {
    document.addEventListener('click', (e) => {
      if (_isDrawerOpen() && !_navbar.contains(e.target)) {
        _closeDrawer();
      }
    });

    if (_overlay) {
      _overlay.addEventListener('click', _closeDrawer);
    }
  }

  function _bindViewportChange() {
    window.matchMedia(DESKTOP_MQ).addEventListener('change', (e) => {
      if (e.matches && _isDrawerOpen()) _closeDrawer();
    });
  }


  /* ---- Public API ---- */
  return { init };

})();


document.addEventListener('DOMContentLoaded', Navbar.init);

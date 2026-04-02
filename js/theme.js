/**
 * ZATCA — Theme Controller
 *
 * Handles light/dark theme switching.
 * Uses [data-theme] attribute on <html>.
 * Respects system preference on first visit, persists choice in localStorage.
 */

const Theme = (() => {
  'use strict';

  const STORAGE_KEY = 'zatca-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  let _current = LIGHT;


  /** Initialise: check saved preference or system preference. */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === DARK || saved === LIGHT) {
      _current = saved;
    } else {
      _current = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    _applyTheme(_current);
    _watchSystem();
  }


  /** Toggle between light ↔ dark. */
  function toggle() {
    const next = _current === LIGHT ? DARK : LIGHT;
    _applyTheme(next);
  }


  /** Set a specific theme. */
  function setTheme(theme) {
    if (theme === DARK || theme === LIGHT) _applyTheme(theme);
  }


  /** @returns {string} Current theme ('light' or 'dark'). */
  function getTheme() {
    return _current;
  }


  /** Apply theme to DOM and persist. */
  function _applyTheme(theme) {
    _current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === DARK ? '#0f1117' : '#004A99');
    }

    // Update toggle button icon if exists
    _updateToggleIcon(theme);
  }


  /** Listen for system preference changes (only if user hasn't manually chosen). */
  function _watchSystem() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        _applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  }


  /** Update the theme toggle button SVG icon. */
  function _updateToggleIcon(theme) {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;

    btn.innerHTML = theme === DARK
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }


  return { init, toggle, setTheme, getTheme };

})();

document.addEventListener('DOMContentLoaded', Theme.init);

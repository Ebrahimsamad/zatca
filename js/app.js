/**
 * ZATCA — Application Bootstrap
 *
 * Global initialisations that run on every page.
 * Page-specific logic should live in its own module.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  _setFooterYear();
  _markActiveNavLink();
});


/**
 * Injects the current year into any element with [data-year].
 * Keeps the footer copyright always up-to-date.
 */
function _setFooterYear() {
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}


/**
 * Marks the navbar link whose href matches the current page.
 * Compares the last segment of the URL pathname against each link's href.
 */
function _markActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__link').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('is-active');
    }
  });
}

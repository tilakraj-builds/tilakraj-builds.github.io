(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- Theme toggle ---------------------------------------------------- */
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
      toggle.setAttribute('aria-label', 'Switch to ' + (next === 'dark' ? 'light' : 'dark') + ' theme');
    });
  }

  /* ---- Mobile nav ------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---- Blog tag filter ------------------------------------------------- */
  var filters = document.querySelectorAll('.filter');
  var grid = document.getElementById('post-grid');
  var empty = document.getElementById('empty-state');

  if (filters.length && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.post-card'));

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-filter');

        filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });

        var shown = 0;
        cards.forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split('|');
          var match = want === 'all' || tags.indexOf(want) !== -1;
          card.hidden = !match;
          if (match) shown++;
        });

        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* ---- Let wide tables scroll instead of breaking the page layout ------- */
  document.querySelectorAll('.prose table').forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains('table-scroll')) return;
    var box = document.createElement('div');
    box.className = 'table-scroll';
    table.parentNode.insertBefore(box, table);
    box.appendChild(table);
  });
})();

/* ==========================================================================
   Cananga Wellness — webbplatsens enda JavaScript

   Håller tre saker igång:
     1. Årtalet i sidfoten
     2. Menyknappen på mobil
     3. Den fasta "Boka tid"-knappen längst ner på mobil

   Bokningskalendern hanteras INTE härifrån — den ligger i sitt eget
   block i index.html så att den är lätt att byta ut.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Årtal i sidfoten — så copyrightåret aldrig blir gammalt
     --------------------------------------------------------------- */
  var ar = document.getElementById('ar');
  if (ar) {
    ar.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------
     2. Menyknapp på mobil
     --------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('huvudmeny');

  if (toggle && nav) {
    var stangMeny = function () {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var oppen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', oppen ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', oppen ? 'false' : 'true');
    });

    /* Stäng menyn när man valt något i den */
    nav.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('a')) {
        stangMeny();
      }
    });

    /* Esc stänger menyn */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        stangMeny();
      }
    });
  }

  /* ---------------------------------------------------------------
     3. Flytta läsfokus till den sektion man hoppar till.
        Utan detta ligger tangentbordsfokus kvar i menyn och
        skärmläsare läser upp fel del av sidan.
     --------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var lank = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!lank) return;

    var id = lank.getAttribute('href').slice(1);
    if (!id) return;

    var mal = document.getElementById(id);
    if (!mal) return;

    /* Låt webbläsaren sköta själva rullningen (CSS scroll-behavior),
       flytta bara fokus efteråt. */
    window.setTimeout(function () {
      if (!mal.hasAttribute('tabindex')) {
        mal.setAttribute('tabindex', '-1');
      }
      mal.focus({ preventScroll: true });
    }, 400);
  });

  /* ---------------------------------------------------------------
     4. Fast bokningsknapp längst ner på mobil.
        Visas när man rullat förbi hero-sektionen, göms igen när
        bokningssektionen syns (då behövs den inte).
     --------------------------------------------------------------- */
  var cta = document.getElementById('mobil-cta');
  var hero = document.querySelector('.hero');
  var boka = document.getElementById('boka');

  if (cta && hero && boka && 'IntersectionObserver' in window) {
    var litenSkarm = window.matchMedia('(max-width: 47.99em)');
    var forbiHero = false;
    var serBokning = false;

    var uppdatera = function () {
      var visa = litenSkarm.matches && forbiHero && !serBokning;
      cta.hidden = !visa;
      document.body.classList.toggle('has-mobile-cta', visa);
    };

    new IntersectionObserver(function (poster) {
      forbiHero = !poster[0].isIntersecting;
      uppdatera();
    }).observe(hero);

    new IntersectionObserver(function (poster) {
      serBokning = poster[0].isIntersecting;
      uppdatera();
    }).observe(boka);

    /* Om man vrider på telefonen eller ändrar fönsterstorlek */
    if (litenSkarm.addEventListener) {
      litenSkarm.addEventListener('change', uppdatera);
    } else if (litenSkarm.addListener) {
      litenSkarm.addListener(uppdatera);   /* äldre Safari */
    }
  }

})();

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

  /* ---------------------------------------------------------------
     5. Mjuk intoning när en sektion rullas in i bild.

        Klassen sätts härifrån och inte i HTML-filen, så att sidan
        ser likadan ut även om JavaScript är avstängt — då syns allt
        direkt i stället för att ligga osynligt i väntan på ett skript.

        UNDANTAG, med flit:
          .hero       — ligger överst och ska synas direkt
          #boka       — bokningskalendern
          #hitta-hit  — 360-vyn
        De två sista innehåller inbäddat innehåll från andra sajter.
        En förälder som animeras med opacity eller transform skapar ett
        eget koordinatsystem, vilket kan störa hur en iframe placerar
        sig. Ta inte bort det undantaget.
     --------------------------------------------------------------- */
  var villHaMindreRorelse = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!villHaMindreRorelse && 'IntersectionObserver' in window) {
    var undantag = { 'boka': true, 'hitta-hit': true };

    var sektioner = [].slice.call(document.querySelectorAll('main > section'))
      .filter(function (el) {
        return !undantag[el.id] && !el.classList.contains('hero');
      });

    if (sektioner.length) {
      var betraktare = new IntersectionObserver(function (poster) {
        poster.forEach(function (post) {
          if (post.isIntersecting) {
            post.target.classList.add('is-visible');
            betraktare.unobserve(post.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

      sektioner.forEach(function (el) {
        el.classList.add('reveal');
        betraktare.observe(el);
      });
    }
  }

})();

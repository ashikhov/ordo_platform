(function () {
  // false = ссылки /sales/, /finance/ … (сейчас). true = sales.ordo-ai.ru … (после DNS).
  var ORDO_USE_SUBDOMAIN_NAV = false;

  function initOrdoSubdomainNav() {
    if (!ORDO_USE_SUBDOMAIN_NAV) return;
    var host = location.hostname;
    if (!host || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return;
    if (/github\.io$/i.test(host) || /pages\.dev$/i.test(host)) return;
    var productSubs = ['sales', 'search', 'finance', 'custom', 'platform'];
    var firstLabel = host.split('.')[0].toLowerCase();
    if (productSubs.indexOf(firstLabel) === -1) return;
    var parts = host.split('.');
    var strip = ['www', 'app'].concat(productSubs, ['dev', 'demo']);
    while (parts.length > 2 && strip.indexOf(parts[0].toLowerCase()) !== -1) parts.shift();
    var apex = parts.join('.');
    var port = location.port ? ':' + location.port : '';
    var proto = location.protocol;
    document.querySelectorAll('a[data-ordo-sub]').forEach(function (a) {
      var sub = a.getAttribute('data-ordo-sub');
      if (!sub) return;
      a.href = proto + '//' + sub + '.' + apex + port + '/';
    });
  }

  function initDesktopMega() {
    var items = document.querySelectorAll('.ordo-nav-item.has-mega');
    items.forEach(function (item) {
      var trigger = item.querySelector('.ordo-nav-trigger');
      if (!trigger) return;
      var closeTimer;

      function open() {
        items.forEach(function (other) {
          if (other !== item) other.classList.remove('is-open');
        });
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      function close() {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 200);
      }

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('is-open')) close();
        else open();
      });
      var mega = item.querySelector('.ordo-mega');
      item.addEventListener('mouseenter', function () {
        clearTimeout(closeTimer);
        open();
      });
      item.addEventListener('mouseleave', scheduleClose);
      if (mega) {
        mega.addEventListener('mouseenter', function () {
          clearTimeout(closeTimer);
        });
        mega.addEventListener('mouseleave', scheduleClose);
      }
      trigger.addEventListener('focus', open);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ordo-nav-item.has-mega')) {
        items.forEach(function (item) {
          item.classList.remove('is-open');
          var t = item.querySelector('.ordo-nav-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function initMobileNav() {
    var header = document.querySelector('.ordo-header');
    var burger = document.querySelector('.ordo-burger');
    var backdrop = document.querySelector('.ordo-backdrop');
    if (!header || !burger) return;

    function setOpen(open) {
      header.classList.toggle('is-mobile-open', open);
      document.body.classList.toggle('ordo-nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function close() {
      setOpen(false);
    }

    burger.addEventListener('click', function () {
      setOpen(!header.classList.contains('is-mobile-open'));
    });
    if (backdrop) backdrop.addEventListener('click', close);

    document.querySelectorAll('.ordo-mobile-group').forEach(function (group) {
      var btn = group.querySelector('.ordo-mobile-trigger');
      if (!btn) return;
      btn.addEventListener('click', function () {
        group.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', group.classList.contains('is-open') ? 'true' : 'false');
      });
    });

    header.querySelectorAll('.ordo-mobile-panel a, .ordo-mobile-link').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) close();
    });
  }

  function initCtaScroll() {
    document.querySelectorAll('.ordo-cta[data-ordo-scroll-contact]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var contact = document.getElementById('contact');
        if (!contact) return;
        e.preventDefault();
        contact.scrollIntoView({ behavior: 'smooth' });
        var header = document.querySelector('.ordo-header');
        if (header) header.classList.remove('is-mobile-open');
        document.body.classList.remove('ordo-nav-open');
        document.body.style.overflow = '';
      });
    });
  }

  initOrdoSubdomainNav();
  initDesktopMega();
  initMobileNav();
  initCtaScroll();
})();

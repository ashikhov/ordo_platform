/**
 * Заявки: почта + Telegram (опционально).
 *
 * ПОЧТА (адрес нигде на сайте не светится):
 * — https://web3forms.com — при создании Access Key укажите нужный Gmail как почту
 *   получателя уведомлений. В код ниже вставляется только ключ, не email.
 *
 * TELEGRAM:
 * — Создайте бота через @BotFather, сохраните токен.
 * — Узнайте chat_id: напишите боту любое сообщение, затем откройте в браузере
 *   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
 *   и найдите "chat":{"id": 123456789 — это chat_id (для лички положительный,
 *   для супергруппы часто отрицательный).
 * — Задеплойте Worker из workers/ordo-leads-worker.js на Cloudflare Workers,
 *   добавьте секреты TG_BOT_TOKEN, TG_CHAT_ID (см. комментарий в начале worker-файла).
 * — Вставьте URL воркера в ORDO_LEADS_WORKER_URL ниже.
 *
 * Опционально LEADS_SHARED_SECRET на воркере и ORDO_LEADS_SHARED_SECRET здесь —
 * чтобы посторонние не спамили ваш endpoint.
 */
var ORDO_WEB3FORMS_ACCESS_KEY = '4386bd02-2519-4d1f-8cc1-47cdab6a276f';
var ORDO_LEADS_WORKER_URL = 'https://ordo-leads.shikhoval97.workers.dev';
var ORDO_LEADS_SHARED_SECRET = 'ordo-leads-2026-secret';

(function (global) {
  var REQUEST_TIMEOUT_MS = 8000;

  function getKey() {
    return String(
      (global.ORDO_WEB3FORMS_ACCESS_KEY != null && global.ORDO_WEB3FORMS_ACCESS_KEY) ||
        ORDO_WEB3FORMS_ACCESS_KEY ||
        ''
    ).trim();
  }

  function getWorkerUrl() {
    return String(
      (global.ORDO_LEADS_WORKER_URL != null && global.ORDO_LEADS_WORKER_URL) ||
        ORDO_LEADS_WORKER_URL ||
        ''
    ).trim();
  }

  function getSharedSecret() {
    return String(
      (global.ORDO_LEADS_SHARED_SECRET != null && global.ORDO_LEADS_SHARED_SECRET) ||
        ORDO_LEADS_SHARED_SECRET ||
        ''
    ).trim();
  }

  function withTimeout(promise, ms, errorCode) {
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        reject(new Error(errorCode || 'TIMEOUT'));
      }, ms);

      promise
        .then(function (value) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(value);
        })
        .catch(function (error) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  function firstFulfilled(promises) {
    return new Promise(function (resolve, reject) {
      var pending = promises.length;
      var firstError = null;
      if (!pending) {
        reject(new Error('SEND_FAIL'));
        return;
      }

      promises.forEach(function (promise) {
        promise
          .then(function (value) {
            resolve(value);
          })
          .catch(function (error) {
            if (!firstError) firstError = error;
            pending -= 1;
            if (pending === 0) reject(firstError || new Error('SEND_FAIL'));
          });
      });
    });
  }

  function submitWeb3(data) {
    var key = getKey();
    var body = Object.assign({ access_key: key }, data);
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        if (result && result.success) return { channel: 'email', ok: true };
        throw new Error((result && result.message) || 'WEB3_FAIL');
      });
  }

  function submitWorker(data) {
    var url = getWorkerUrl();
    var headers = { 'Content-Type': 'application/json' };
    var sec = getSharedSecret();
    if (sec) headers['X-Ordo-Leads-Secret'] = sec;
    var payload = Object.assign(
      {},
      data,
      typeof global.location !== 'undefined' && global.location.href
        ? { _page: global.location.href }
        : {}
    );
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.text().then(function (text) {
        var json = {};
        try {
          json = text ? JSON.parse(text) : {};
        } catch (parseErr) {
          json = {};
        }
        if (!res.ok) throw new Error((json && json.error) || 'WORKER_' + res.status);
        if (json && json.ok) return { channel: 'telegram', ok: true };
        throw new Error((json && json.error) || 'WORKER_FAIL');
      });
    });
  }

  /**
   * Отправка в Web3Forms (почта) и/или Worker (Telegram). Хотя бы один канал должен быть настроен.
   */
  function submit(data) {
    var useWeb3 = !!getKey();
    var useWorker = !!getWorkerUrl();
    if (!useWeb3 && !useWorker) return Promise.reject(new Error('NO_CONFIG'));

    var tasks = [];
    if (useWeb3) {
      tasks.push(
        withTimeout(submitWeb3(data), REQUEST_TIMEOUT_MS, 'EMAIL_TIMEOUT').catch(function (e) {
          return Promise.reject(Object.assign(e, { _channel: 'email' }));
        })
      );
    }
    if (useWorker) {
      tasks.push(
        withTimeout(submitWorker(data), REQUEST_TIMEOUT_MS, 'WORKER_TIMEOUT').catch(function (e) {
          return Promise.reject(Object.assign(e, { _channel: 'telegram' }));
        })
      );
    }

    return firstFulfilled(tasks).then(function (result) {
      return { delivered: 1, result: result };
    });
  }

  global.OrdoLeads = {
    submit: submit,
    getKey: getKey,
    getWorkerUrl: getWorkerUrl
  };
})(typeof window !== 'undefined' ? window : this);

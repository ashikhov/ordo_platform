/**
 * Cloudflare Worker: заявка → сообщение в Telegram.
 *
 * Деплой:
 * 1) Workers & Pages → Create Worker → вставьте этот код.
 * 2) Settings → Variables → Secrets:
 *    TG_BOT_TOKEN — токен от @BotFather
 *    TG_CHAT_ID   — ваш id чата (см. getUpdates в js/ordo-lead-notify.js)
 *    LEADS_SHARED_SECRET (опционально) — тот же текст, что ORDO_LEADS_SHARED_SECRET в сайте
 * 3) Сохраните, скопируйте URL вида https://ordo-leads.xxx.workers.dev в ORDO_LEADS_WORKER_URL.
 *
 * Почта настраивается отдельно через Web3Forms (ключ на сайте), без email в HTML.
 */

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatBody(data) {
  var skip = { access_key: 1, _page: 1 };
  var lines = [];
  if (data._page) lines.push('<b>Страница</b>: ' + escapeHtml(data._page));
  Object.keys(data).forEach(function (k) {
    if (skip[k] || k.indexOf('_') === 0) return;
    if (data[k] === '' || data[k] == null) return;
    lines.push('<b>' + escapeHtml(k) + '</b>: ' + escapeHtml(String(data[k])).replace(/\n/g, '<br/>'));
  });
  return lines.length ? lines.join('\n') : '(пустая заявка)';
}

var corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Ordo-Leads-Secret'
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return new Response('Not Found', { status: 404, headers: corsHeaders });
    }

    var secret = env.LEADS_SHARED_SECRET;
    if (secret && request.headers.get('X-Ordo-Leads-Secret') !== secret) {
      return new Response(JSON.stringify({ ok: false, error: 'forbidden' }), {
        status: 403,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    var data;
    try {
      data = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), {
        status: 400,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    var token = env.TG_BOT_TOKEN;
    var chatId = env.TG_CHAT_ID;
    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: 'worker_not_configured' }), {
        status: 500,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    var subject = data.subject || 'Заявка с сайта Ordo';
    var text = '<b>' + escapeHtml(subject) + '</b>\n\n' + formatBody(data);

    var tgRes = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    var tgJson = await tgRes.json().catch(function () {
      return {};
    });
    if (!tgRes.ok || !tgJson.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: 'telegram', details: tgJson.description || tgRes.status }),
        { status: 502, headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders) }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
    });
  }
};

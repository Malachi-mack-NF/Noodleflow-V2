/* ═══════════════════════════════════════════
   UTILS
═══════════════════════════════════════════ */
function toast(title, msg, dur = 3100) {
  document.getElementById('tT').textContent = title;
  document.getElementById('tM').textContent = msg;
  const t = document.getElementById('toast');
  t.classList.add('show'); clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), dur);
}

function goScreen(id) {
  const allScreens = [...OP_SCREENS, ...BK_SCREENS];
  if (!id || !allScreens.find(s => s.id === id)) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + id)?.classList.add('active');
  S.screen = id;
  document.querySelector(`.ni[data-s="${id}"]`)?.classList.add('active');
  const meta = allScreens.find(s => s.id === id);
  if (meta) {
    document.getElementById('stitle').textContent = meta.title;
    document.getElementById('ssub').textContent   = meta.sub;
  }
}

/* ═══════════════════════════════════════════
   MODE SYSTEM
═══════════════════════════════════════════ */
function switchMode(mode) {
  S.mode = mode;
  document.querySelectorAll('.mt-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === mode)
  );

  // Show/hide nav sections
  document.getElementById('nav-operator').style.display = mode === 'operator' ? '' : 'none';
  document.getElementById('nav-banking').style.display  = mode === 'banking'  ? '' : 'none';

  // Update sidebar label
  document.querySelector('.oc h3').textContent = mode === 'operator' ? 'Operator mode' : 'Banking mode';
  document.querySelector('.oc p').textContent  = mode === 'operator'
    ? 'What you can spend. What\'s reserved. What to do next.'
    : 'Real Cash across all connected accounts.';

  // Navigate to the home for that mode
  const dest = mode === 'operator' ? 'home' : 'bk-home';
  goScreen(dest);
}

/* ═══════════════════════════════════════════
   HOME — MISSION CONTROL
═══════════════════════════════════════════ */
function renderHorizonTiles() {
  const grid = document.getElementById('horizonGrid');
  grid.innerHTML = Object.entries(HOME_HORIZONS).map(([key, h]) => `
    <div class="ht${S.horizon === key ? ' active' : ''}" data-horizon="${key}">
      <div class="ht-label">${h.label}</div>
      <div class="ht-amount">${h.amount}</div>
      <div class="ht-status"><div class="badge b${h.status}">${h.status.charAt(0).toUpperCase() + h.status.slice(1)}</div></div>
      <div class="ht-delta ${h.deltaDir}">${h.delta}</div>
      <div class="ht-desc">${h.desc}</div>
    </div>`).join('');

  grid.querySelectorAll('.ht').forEach(tile =>
    tile.addEventListener('click', () => {
      S.horizon = tile.dataset.horizon;
      grid.querySelectorAll('.ht').forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
    })
  );
}

function renderPrimaryRec() {
  const r = PRIMARY_REC;
  document.getElementById('primaryRec').innerHTML = `
    <div class="pr-label">⚡ Primary recommendation</div>
    <div class="pr-title">${r.title}</div>
    <div class="pr-reason">${r.reason}</div>
    <div class="pr-impact">✓ ${r.impact}</div>
    <div class="pr-actions">
      ${r.actions.map(a => {
        if (a.style === 'primary')   return `<button class="btn bp pr-action" data-id="${a.id}">${a.label}</button>`;
        if (a.style === 'danger')    return `<button class="btn-danger pr-action" data-id="${a.id}">${a.label}</button>`;
        return `<button class="btn bg pr-action" data-id="${a.id}">${a.label}</button>`;
      }).join('')}
    </div>`;

  document.querySelectorAll('.pr-action').forEach(btn =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (id === 'sim-bright')  goScreen('plan');
      if (id === 'delay-thu')   toast('Delayed', 'Bright Market invoice delayed to Thursday. Noodleflow will remind you when Inventory Reserve clears.');
      if (id === 'create-res')  showBucketModal();
      if (id === 'approve-now') toast('Approved', 'Invoice approved. Note: payroll buffer compresses to $900. Monitor through Apr 30.');
    })
  );
}

function renderChangedStrip() {
  document.getElementById('changedStrip').innerHTML = WHAT_CHANGED.map(w => `
    <div class="changed-item">
      <span class="ci-icon ${w.color}">${w.icon}</span>
      <span class="ci-text">${w.text}</span>
    </div>`).join('');
}

/* ═══════════════════════════════════════════
   RESERVE ROWS (Home) — selection contract
═══════════════════════════════════════════ */
function selectBucket(key) {
  S.bucket = key;
  const d = RESERVE_DATA[key]; if (!d) return;
  document.getElementById('acctGroups').classList.add('has-sel');
  document.querySelectorAll('.bucket-row').forEach(r =>
    r.classList.toggle('sel', r.dataset.bk === key)
  );
  document.getElementById('dp-ctx-name').textContent = d.ctx;
  document.getElementById('dp-title').textContent    = d.title;
  document.getElementById('dp-sub').textContent      = d.sub;
  const body = document.getElementById('dp-body');
  body.classList.remove('flash'); void body.offsetWidth; body.classList.add('flash');
  body.innerHTML = d.levels.map((lv, i) => `
    <div class="dl">
      <button class="dl-btn${S.panelOpen[key+i] ? ' open' : ''}" data-k="${key}" data-i="${i}">
        <span>${lv.l}</span><span class="dl-cv">▾</span>
      </button>
      <div class="dl-exp${S.panelOpen[key+i] ? ' open' : ''}">
        <div style="padding:3px 2px 7px;">${lv.b}</div>
      </div>
    </div>`).join('');
  body.querySelectorAll('.dl-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      const k = btn.dataset.k, i = btn.dataset.i;
      S.panelOpen[k+i] = !S.panelOpen[k+i];
      btn.classList.toggle('open', S.panelOpen[k+i]);
      btn.nextElementSibling.classList.toggle('open', S.panelOpen[k+i]);
    })
  );
}

function clearBucket() {
  S.bucket = null;
  document.getElementById('acctGroups').classList.remove('has-sel');
  document.querySelectorAll('.bucket-row').forEach(r => r.classList.remove('sel'));
}

function toggleGrp(g) {
  S.grpOpen[g] = !S.grpOpen[g];
  document.getElementById('ab-'+g)?.classList.toggle('open', S.grpOpen[g]);
  document.getElementById('ac-'+g)?.classList.toggle('open', S.grpOpen[g]);
}

/* ═══════════════════════════════════════════
   REVENUE — CHANNEL PERFORMANCE + NOODLEFLOW LINKS
═══════════════════════════════════════════ */
function renderPlats() {
  const list = document.getElementById('platList');
  list.querySelectorAll('.plat-item').forEach(e => e.remove());
  PLATS.forEach(p => {
    const el = document.createElement('div');
    el.className = 'plat-item' + (p.id === S.platform ? ' active' : '');
    el.innerHTML = `<div class="plat-name">${p.name}</div><div class="plat-total">${p.total}</div><div class="plat-sub">${p.sub}</div><div class="plat-bar"><div class="plat-bar-f" style="width:${p.bar}%"></div></div>`;
    el.addEventListener('click', () => { S.platform = p.id; S.deal = ''; renderPlats(); renderDeals(p.id); });
    list.appendChild(el);
  });
}

function renderDeals(pid) {
  const plat = PLATS.find(x => x.id === pid);
  document.getElementById('dealTitle').textContent = `${plat.name} — Orders`;
  document.getElementById('dealBadge').textContent = plat.total;
  const list  = document.getElementById('dealList'); list.innerHTML = '';
  const deals = DEALS[pid] || [];
  deals.forEach((d, i) => {
    const isActive = d.id === S.deal || (i === 0 && !S.deal);
    const el = document.createElement('div');
    el.className = 'dl-row' + (isActive ? ' sel' : '');
    el.innerHTML = `<div><div class="dl-id">${d.id}</div><div class="dl-date">${d.date}</div><div class="dl-skus">${d.skus.length} SKU${d.skus.length > 1 ? 's' : ''}: ${d.skus.join(', ')}</div></div><div class="badge bneut" style="font-size:0.69rem;padding:3px 7px;">${d.skus.length} SKUs</div><div class="dl-amt">${d.amt}</div>`;
    el.addEventListener('click', () => { S.deal = d.id; renderDeals(pid); renderSKU(d.id, d, pid); });
    list.appendChild(el);
    if (isActive && !S.deal) renderSKU(d.id, d, pid);
  });
  if (deals.length && !S.deal) { S.deal = deals[0].id; renderDeals(pid); }
}

function renderSKU(did, deal, pid) {
  const pname = PLATS.find(p => p.id === pid)?.name || '';
  document.getElementById('skuTitle').textContent = `Order ${did}`;
  document.getElementById('skuSub').textContent   = `${deal.date} · ${pname} · ${deal.skus.length} SKUs · ${deal.amt}`;
  const body = document.getElementById('skuBody'); body.innerHTML = '';
  const amts = DEAL_AMTS[did] || {};
  deal.skus.forEach(skuId => {
    const sku   = SKU_DATA[skuId]; if (!sku) return;
    const gross = amts[skuId] || 0;
    const tsp   = sku.allocs.find(a => a.n === 'Available')?.p || 0;
    const el = document.createElement('div'); el.className = 'sku-row';
    el.innerHTML = `
      <div class="sku-rh"><div><div class="sku-name">${sku.name}</div><div class="sku-id">${skuId}</div></div><div class="sku-gross">$${gross.toLocaleString()}</div></div>
      <div class="sku-allocs">
        <div class="sku-bw"><div class="sku-bf" style="width:${tsp}%;background:linear-gradient(90deg,var(--tight),var(--safe));"></div></div>
        ${sku.allocs.map(a => `<div class="sku-arow"><div class="sku-arow-l"><div class="sku-dot" style="background:${a.c};box-shadow:0 0 5px ${a.c};"></div>${a.n}</div><div class="sku-arow-r">$${Math.round(gross*a.p/100).toLocaleString()}<span class="sku-apct">${a.p}%</span></div></div>`).join('')}
      </div>
      <div class="sku-tot"><span>Flows to Available</span><span>$${Math.round(gross*tsp/100).toLocaleString()}</span></div>`;
    body.appendChild(el);
  });
}

function renderChannelPerf() {
  document.getElementById('chPerfBody').innerHTML = CHANNEL_PERF.map(c => `
    <div class="ch-row">
      <div class="ch-name">${c.channel}</div>
      <div>${c.gross}</div>
      <div class="ch-liq">${c.liquidity}</div>
      <div>${c.liqPct}</div>
      <div class="ch-trend-${c.trend}">${c.trend === 'up' ? '↑' : c.trend === 'down' ? '↓' : '→'}</div>
    </div>`).join('');
}

function renderNFLinks() {
  const prod = NF_LINK_PRODUCTS.find(p => p.id === S.linkProduct) || NF_LINK_PRODUCTS[0];
  const type = NF_LINK_TYPES.find(t => t.id === S.linkType)       || NF_LINK_TYPES[0];
  const slug = prod.id.toLowerCase().replace(/-/g, '');
  const url  = `https://nf.link/${slug}/${Math.random().toString(36).slice(2,8)}`;

  document.getElementById('nfLinkOutput').innerHTML = `
    <div class="nf-link-url">${url}</div>
    <div class="nf-link-meta">Type: ${type.label} · ${type.desc} · Product: ${prod.name} · Price: ${prod.price}</div>
    <div class="nf-link-actions">
      <button class="btn bg" style="font-size:0.8rem;padding:7px 12px;" onclick="copyNFLink('${url}')">Copy link</button>
      <button class="btn bc" style="font-size:0.8rem;padding:7px 11px;">Preview</button>
    </div>`;

  document.getElementById('nfImpact').innerHTML = `
    <strong>On purchase:</strong> inventory synced (${prod.stock} in stock) · POS updated · accounting logged ·
    reserve allocations revised · Available forecast updated.
    Margin contribution: <strong>${prod.margin}</strong> per sale flows to Available.`;
}

function copyNFLink(url) {
  navigator.clipboard?.writeText(url).catch(() => {});
  toast('Link copied', 'NoodleFlow purchase link copied to clipboard.');
}

/* ═══════════════════════════════════════════
   PARTNERS — RELATIONSHIP INTELLIGENCE
═══════════════════════════════════════════ */
function renderPartners() {
  const tbody = document.getElementById('partnersBody');
  tbody.innerHTML = PARTNERS_LIST.map(p => `
    <div class="partner-row${p.id === S.partner ? ' sel' : ''}" data-pid="${p.id}">
      <div><div class="partner-name">${p.name}</div><div class="partner-type">${p.type}</div></div>
      <div>${p.spend}</div>
      <div>${p.nextDue}</div>
      <div><span class="risk-badge ${p.risk}">${p.risk.charAt(0).toUpperCase()+p.risk.slice(1)}</span></div>
      <div style="font-size:0.83rem;color:var(--t2);">${p.roi}</div>
    </div>`).join('');

  tbody.querySelectorAll('.partner-row').forEach(row =>
    row.addEventListener('click', () => {
      S.partner = row.dataset.pid;
      tbody.querySelectorAll('.partner-row').forEach(r => r.classList.remove('sel'));
      row.classList.add('sel');
      renderPartnerDetail(S.partner);
    })
  );
}

function renderPartnerDetail(key) {
  const d = PARTNERS_DATA[key]; if (!d) return;
  document.getElementById('pd-ctx-name').textContent = d.name;
  document.getElementById('pd-title').textContent    = d.name;
  document.getElementById('pd-sub').textContent      = `${d.type} · ${d.category}`;
  const body = document.getElementById('pd-body');
  body.classList.remove('flash'); void body.offsetWidth; body.classList.add('flash');
  body.innerHTML = `
    <div class="pd-stat-grid">
      <div class="pd-stat"><div class="pd-stat-lbl">Annual Spend</div><div class="pd-stat-val">${d.annualSpend}</div></div>
      <div class="pd-stat"><div class="pd-stat-lbl">Terms</div><div class="pd-stat-val">${d.terms}</div></div>
      <div class="pd-stat"><div class="pd-stat-lbl">On-time rate</div><div class="pd-stat-val">${d.onTimeRate}</div></div>
      <div class="pd-stat"><div class="pd-stat-lbl">Concentration</div><div class="pd-stat-val">${d.concentration}</div></div>
    </div>
    <div class="pd-stat" style="margin-top:0;"><div class="pd-stat-lbl">Next obligation</div><div class="pd-stat-val" style="font-size:0.85rem;">${d.nextObligation}</div></div>
    <div class="pd-insight">${d.insight}</div>
    <div class="pd-actions">
      ${d.actions.map((a, i) => `<button class="btn ${i === 0 ? 'bp' : 'bg'}" style="font-size:0.8rem;padding:${i === 0 ? '8px 14px' : '7px 12px'};">${a}</button>`).join('')}
    </div>`;
}

/* ═══════════════════════════════════════════
   SPEND — INVOICES + RECEIPT CAPTURE
═══════════════════════════════════════════ */
function renderInv(key) {
  const d = INV_DATA[key]; if (!d) return;
  S.invoice = key;
  document.getElementById('inv-ctx').textContent  = d.ctx;
  document.getElementById('invTitle').textContent = d.title;
  document.getElementById('invSub').textContent   = d.sub;
  const bd = document.getElementById('invBadge');
  bd.className   = 'badge ' + d.badge;
  bd.textContent = d.bl;
  document.getElementById('invBody').innerHTML = d.rows.map(r => `
    <div class="dcard" style="margin-bottom:7px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:5px;">
        <div class="dcard-lbl" style="margin-bottom:0;">${r.l}</div>
        <div class="badge ${r.bc}" style="font-size:0.68rem;padding:3px 8px;white-space:nowrap;">${r.bb}</div>
      </div>
      <div class="dcard-val">${r.b}</div>
    </div>`).join('');
  document.querySelectorAll('.inv-item').forEach(it =>
    it.classList.toggle('sel', it.dataset.inv === key)
  );
}

function renderReceiptList() {
  const items = BK_RECENT.slice(0, 5);
  document.getElementById('receiptListBody').innerHTML = items.map(t => `
    <div class="receipt-item">
      <div>
        <div class="receipt-name">${t.desc}</div>
        <div class="receipt-meta">${t.date} · ${t.cat}</div>
      </div>
      <div>
        <div style="font-weight:600;text-align:right;">${t.amount}</div>
        <div class="receipt-match ${t.matched ? 'matched' : 'unmatched'}">${t.matched ? '✓ Receipt matched' : '⚠ No receipt'}</div>
      </div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════
   PLAN — FRAMEWORKS + SIMULATIONS
═══════════════════════════════════════════ */
function renderFrameworks() {
  const grid = document.getElementById('fwGrid');
  grid.innerHTML = FRAMEWORKS.map(f => `
    <div class="fw-card${f.id === S.framework ? ' active' : ''}" data-fw="${f.id}">
      ${f.popular ? '<div class="fw-popular">Popular</div>' : ''}
      <div class="fw-icon">${f.icon}</div>
      <div class="fw-name">${f.name}</div>
      <div class="fw-desc">${f.desc}</div>
      ${f.community ? `<div class="fw-comm">Used by ${f.community}</div>` : ''}
    </div>`).join('');

  grid.querySelectorAll('.fw-card').forEach(card =>
    card.addEventListener('click', () => {
      S.framework = card.dataset.fw;
      grid.querySelectorAll('.fw-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderFrameworkDetail(S.framework);
    })
  );
  renderFrameworkDetail(S.framework);
}

function renderFrameworkDetail(id) {
  const fw = FRAMEWORKS.find(f => f.id === id); if (!fw) return;
  document.getElementById('fwDetailTitle').textContent = fw.name;
  document.getElementById('fwDetailDesc').textContent  = fw.desc;
  const tree = document.getElementById('reserveTree');

  if (fw.id === 'custom') {
    tree.innerHTML = `
      <div style="padding:28px;text-align:center;color:var(--t3);">
        <div style="font-size:1.8rem;margin-bottom:10px;">✏️</div>
        <div style="font-size:0.9rem;font-weight:600;margin-bottom:6px;color:var(--t1);">Build your own architecture</div>
        <div style="font-size:0.82rem;line-height:1.55;max-width:300px;margin:0 auto;">Noodleflow will suggest sub-reserve templates based on your business profile, channels, margin, and obligations.</div>
        <button class="btn bp" style="margin-top:14px;" onclick="showBucketModal()">+ Start building</button>
      </div>`;
    return;
  }

  tree.innerHTML = fw.reserves.map((r, i) => `
    <div class="rt-item${i === 0 && id === 'ecommerce' ? ' highlight' : ''}">
      <div><div class="rt-name">${r.name}</div><div class="rt-note">${r.note}</div></div>
      <div class="rt-pct${i < 2 ? ' current' : ''}">${r.pct}</div>
    </div>`).join('');

  // AI insight card
  document.getElementById('fwAiRec').innerHTML = `
    <div class="ai-rec-body">
      <strong>Noodleflow recommendation</strong> · Based on your current business profile:<br><br>
      ${id === 'ecommerce' ? 'Your current reserve architecture closely matches this framework. <strong>Inventory Reserve (14%)</strong> is slightly below the recommended 14–18% range. Consider increasing to 16% to close restock gaps faster. <strong>Paid Media Reserve is unfunded</strong> — seeding even $2,000 would unlock marketing automation for Bright Market Agency.' : ''}
      ${id === 'profit-first' ? 'Profit First works best when deposits are split immediately on receipt. Your current manual allocation creates 2–4 day lag. Enabling auto-split would accelerate reserve build by an estimated <strong>18%</strong> per cycle.' : ''}
      ${id === 'lean' ? 'Lean Bootstrap is appropriate for your current volume. As you scale past $80K/month, consider migrating to the Ecommerce Operator framework to better protect inventory and media spend.' : ''}
      ${!['ecommerce','profit-first','lean'].includes(id) ? `The <strong>${fw.name}</strong> framework is well-suited to your business type. Operators using this architecture report 23% fewer cash flow surprises and 31% faster obligation resolution.` : ''}
    </div>`;
}

/* ═══════════════════════════════════════════
   PLAN — SIMULATIONS (retained from V1)
═══════════════════════════════════════════ */
function renderSim(key) {
  S.sim = key;
  const d = SIM_DATA[key]; if (!d) return;
  document.querySelectorAll('.sp').forEach(b =>
    b.classList.toggle('active', b.dataset.sim === key)
  );
  document.getElementById('srFrom').textContent = d.from;
  const toEl = document.getElementById('srTo');
  toEl.textContent = d.to; toEl.className = 'sr-to ' + d.toc;
  document.getElementById('srRec').innerHTML   = d.rec;
  const activeNodes = new Set();
  d.paths.forEach(p => { if (p.a) { activeNodes.add(p.f[0]+'-'+p.f[1]); activeNodes.add(p.t[0]+'-'+p.t[1]); } });
  document.getElementById('seqHdrs').innerHTML = d.stages.map((s, i) =>
    `<div class="seq-hdr${i===2?' hl':''}">${s}</div>`).join('');
  document.getElementById('seqNodes').innerHTML = d.cols.map((col, ci) => `
    <div class="seq-col" id="sc-${ci}">
      ${col.nodes.map((n, ni) => {
        const ia = activeNodes.has(ci+'-'+ni);
        return `<div class="sn${ia?' '+n.c:' dim'}" id="sn-${ci}-${ni}">
          <div class="sn-lbl">${n.l}</div>
          <div class="sn-amt ${n.ac}">${n.a}</div>
          <div class="sn-sub">${n.s}</div>
        </div>`;
      }).join('')}
    </div>`).join('');
  requestAnimationFrame(() => drawPaths(d));
}

function drawPaths(d) {
  const svg = document.getElementById('seqSvg');
  const cv  = svg.closest('.seq'); const cr = cv.getBoundingClientRect();
  svg.innerHTML = '';
  svg.setAttribute('width', cr.width); svg.setAttribute('height', cr.height);
  d.paths.forEach((p, i) => {
    const fe = document.getElementById(`sn-${p.f[0]}-${p.f[1]}`);
    const te = document.getElementById(`sn-${p.t[0]}-${p.t[1]}`);
    if (!fe || !te) return;
    const fr = fe.getBoundingClientRect(), tr = te.getBoundingClientRect();
    const x1 = fr.right-cr.left, y1 = fr.top+fr.height/2-cr.top;
    const x2 = tr.left-cr.left,  y2 = tr.top+tr.height/2-cr.top;
    const mx = (x1+x2)/2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    if (p.a) {
      path.setAttribute('stroke', p.c); path.setAttribute('stroke-width', '2'); path.setAttribute('opacity', '0.75');
      const L = 250;
      path.setAttribute('stroke-dasharray', L); path.setAttribute('stroke-dashoffset', L);
      const an = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      an.setAttribute('attributeName', 'stroke-dashoffset'); an.setAttribute('from', L); an.setAttribute('to', '0');
      an.setAttribute('dur', '0.55s'); an.setAttribute('begin', `${i*0.07}s`);
      an.setAttribute('fill', 'freeze'); an.setAttribute('calcMode', 'spline'); an.setAttribute('keySplines', '0.22 1 0.36 1');
      path.appendChild(an);
      const arr = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arr.setAttribute('points', `${x2},${y2} ${x2-6},${y2-3} ${x2-6},${y2+3}`);
      arr.setAttribute('fill', p.c); arr.setAttribute('opacity', '0.85');
      svg.appendChild(arr);
    } else {
      path.setAttribute('stroke', 'rgba(255,255,255,0.06)'); path.setAttribute('stroke-width', '1');
      path.setAttribute('stroke-dasharray', '3,4'); path.setAttribute('opacity', '0.45');
    }
    svg.appendChild(path);
  });
}

function updateLiveToSpend() {
  const inv  = parseInt(document.getElementById('sl-inv').value);
  const tax  = parseFloat(document.getElementById('sl-tax').value);
  const comm = parseInt(document.getElementById('sl-comm').value);
  const delta  = Math.round((inv-14)*80 + (tax-8.5)*200 + (comm-5)*60);
  const result = 42380 - delta;
  const el = document.getElementById('liveToSpend');
  el.textContent = '$' + Math.max(0, result).toLocaleString();
  el.className   = 'sr-to ' + (result > 44000 ? 'safe' : result < 38000 ? 'risk' : 'tight');
}

/* ═══════════════════════════════════════════
   GROWTH — CAPITAL DEPLOYMENT
═══════════════════════════════════════════ */
function renderGrowth() {
  const d = GROWTH_SIGNALS;

  // Surplus bar
  document.getElementById('growthSurplusBar').innerHTML = `
    <div>
      <div class="gsb-label">30-day projected surplus</div>
      <div class="gsb-amount">${d.surplus}</div>
      <div class="gsb-note">${d.surplusNote}</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn bg" style="font-size:0.82rem;" onclick="goScreen('plan')">Model it</button>
      <button class="btn bc" style="font-size:0.82rem;" onclick="goScreen('ask')">Ask Noodleflow</button>
    </div>`;

  // Opportunities
  document.getElementById('growthOpps').innerHTML = d.opportunities.map(o => `
    <div class="growth-opp${o.recommended ? ' recommended' : ''}" style="position:relative;">
      ${o.recommended ? '<div class="go-rec-label">⭐ Recommended</div>' : ''}
      <div class="go-hdr">
        <div>
          <div class="go-icon">${o.icon}</div>
          <div class="go-title">${o.title}</div>
          <div class="go-category">${o.category}</div>
        </div>
        <div>
          <div class="go-amount">${o.amount}</div>
          <div class="go-risk">Risk: ${o.risk}</div>
        </div>
      </div>
      <div class="go-body">
        ${o.rationale}
        <div class="go-return">→ ${o.expectedReturn} · ${o.timeframe}</div>
      </div>
      <div class="go-actions">
        <button class="btn bp" style="font-size:0.81rem;padding:7px 13px;" onclick="toast('Deploying','Noodleflow is modeling the deployment scenario. Check Plan for impact.')">Deploy capital</button>
        <button class="btn bg" style="font-size:0.81rem;padding:7px 12px;" onclick="goScreen('plan')">Simulate first</button>
      </div>
    </div>`).join('');

  // Benchmarks
  document.getElementById('growthBenchmarks').innerHTML = `
    <h3>How similar operators allocate surplus</h3>
    ${d.benchmarks.map(b => `
      <div class="benchmark-row">
        <div class="bm-label">${b.label}</div>
        <div class="bm-value">${b.value}</div>
        <div class="bm-note">${b.note}</div>
      </div>`).join('')}`;
}

/* ═══════════════════════════════════════════
   ASK / CHAT
═══════════════════════════════════════════ */
function addChat(userHtml, aiHtml) {
  const area = document.getElementById('chatMsgs');
  const ub = document.createElement('div'); ub.className = 'cb user'; ub.innerHTML = userHtml; area.appendChild(ub);
  const tb = document.createElement('div'); tb.className = 'cb ai';
  tb.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  area.appendChild(tb); area.scrollTop = area.scrollHeight;
  setTimeout(() => { tb.innerHTML = aiHtml; area.scrollTop = area.scrollHeight; }, 1400);
}

function sendChat() {
  const fi = document.getElementById('chatFi');
  const text = fi.textContent.trim();
  if (!text || text.includes('Ask about')) return;
  const mk = Object.keys(CHAT).find(k => text.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
  addChat(
    mk ? CHAT[mk].u : text,
    mk ? CHAT[mk].a : '<strong>Got it.</strong><br><br>Noodleflow is reviewing your current balances, obligations, and upcoming deposit schedule to give you an operator-level answer.'
  );
  fi.textContent = '';
}

/* ═══════════════════════════════════════════
   BANKING — ACCOUNTS + ACTIVITY + CARDS
═══════════════════════════════════════════ */
function renderBkHome() {
  // Summary for banking home
  const total = BK_ACCOUNTS.reduce((acc, a) => {
    const n = parseFloat(a.balance.replace(/[$,]/g,''));
    return a.type === 'Credit' ? acc : acc + n;
  }, 0);
  const el = document.getElementById('bkHomeSummary');
  if (el) el.innerHTML = `
    <div style="text-align:center;padding:32px 0 24px;">
      <div style="font-size:0.72rem;color:var(--t4);text-transform:uppercase;letter-spacing:0.18em;margin-bottom:10px;">Total Real Cash</div>
      <div style="font-family:var(--fd);font-size:4rem;letter-spacing:-0.04em;color:var(--t1);line-height:1;margin-bottom:10px;">$${total.toLocaleString()}</div>
      <div style="font-size:0.84rem;color:var(--t3);">Across ${BK_ACCOUNTS.filter(a=>a.type!=='Credit').length} connected accounts</div>
    </div>
    <div class="bk-account-grid" style="max-width:700px;margin:0 auto;">
      ${BK_ACCOUNTS.map(a => `
        <div class="bk-acct-card${a.status==='primary'?' primary':''}">
          <div class="bk-acct-eye">${a.type}</div>
          <div class="bk-acct-name">${a.name}</div>
          <div class="bk-acct-num">····  ${a.last4}</div>
          <div class="bk-acct-bal">${a.balance}</div>
          <div class="bk-acct-status ${a.status}">${
            a.status==='primary' ? 'Primary operating account' :
            a.status==='yield'   ? '4.7% APY · High-yield savings' :
            a.status==='locked'  ? 'Locked · Emergency only' :
            `$${a.balance} available credit`
          }</div>
        </div>`).join('')}
    </div>`;
}

function renderBkActivity() {
  const el = document.getElementById('bkActivityList');
  if (!el) return;
  el.innerHTML = BK_RECENT.map(t => `
    <div class="bk-act-item">
      <div class="bk-act-left">
        <div class="bk-act-desc">${t.desc}</div>
        <div class="bk-act-meta">
          ${t.date}
          <span class="bk-act-cat">${t.cat}</span>
          ${!t.matched ? '<span class="bk-no-receipt">⚠ No receipt</span>' : ''}
        </div>
      </div>
      <div class="bk-act-amt ${t.amount.startsWith('+') ? 'pos' : 'neg'}">${t.amount}</div>
    </div>`).join('');
}

function renderBkCards() {
  const el = document.getElementById('bkCardsGrid');
  if (!el) return;
  el.innerHTML = `
    <div>
      <div class="card-visual">
        <div class="cv-type">Virtual · Operating</div>
        <div class="cv-num">4821  ····  ····  4821</div>
        <div class="cv-name">Business Operations</div>
        <div class="cv-exp">Expires 09/27</div>
        <div class="cv-limit"><div class="cv-limit-lbl">Monthly limit</div><div class="cv-limit-val">$12,000</div></div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <button class="btn bg" style="font-size:0.81rem;padding:7px 13px;">Edit controls</button>
        <button class="btn bc" style="font-size:0.81rem;padding:7px 12px;">Freeze</button>
      </div>
    </div>
    <div>
      <div class="card-visual" style="background:linear-gradient(135deg,var(--c5),var(--c3));">
        <div class="cv-type">Virtual · Marketing</div>
        <div class="cv-num">7703  ····  ····  7703</div>
        <div class="cv-name">Marketing & Media</div>
        <div class="cv-exp">Expires 09/27</div>
        <div class="cv-limit"><div class="cv-limit-lbl">Monthly limit</div><div class="cv-limit-val">$5,000</div></div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <button class="btn bg" style="font-size:0.81rem;padding:7px 13px;">Edit controls</button>
        <button class="btn bc" style="font-size:0.81rem;padding:7px 12px;">+ Issue card</button>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════
   BUCKET CREATION MODAL
═══════════════════════════════════════════ */
function showBucketModal() {
  document.getElementById('bucketModal').classList.add('open');
  setBucketStep(0);
}
function hideBucketModal() {
  document.getElementById('bucketModal').classList.remove('open');
}
function setBucketStep(step) {
  S.bucketStep = step;
  ['bm-step0','bm-a1','bm-a2','bm-m1'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    if (id === 'bm-step0') { el.style.display = step === 0 ? 'block' : 'none'; return; }
    if (id.startsWith('bm-a')) {
      if (S.bucketMode === 'assisted') {
        const n = parseInt(id.replace('bm-a',''));
        el.className = 'assist-step' + (step === n ? ' active' : '');
      } else { el.className = 'assist-step'; }
      return;
    }
    if (id.startsWith('bm-m')) {
      el.className = S.bucketMode === 'manual'
        ? 'manual-step' + (step === 1 ? ' active' : '')
        : 'manual-step';
    }
  });
}

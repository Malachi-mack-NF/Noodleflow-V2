/* ═══════════════════════════════════════════
   MODE TOGGLE
═══════════════════════════════════════════ */
document.querySelectorAll('.mt-btn').forEach(b =>
  b.addEventListener('click', () => switchMode(b.dataset.mode))
);

/* ═══════════════════════════════════════════
   NAVIGATION — OPERATOR MODE
═══════════════════════════════════════════ */
document.querySelectorAll('.ni[data-s]').forEach(b =>
  b.addEventListener('click', () => goScreen(b.dataset.s))
);

// Inline data-s buttons (topbar chips, embedded nav links, etc.)
document.querySelectorAll('[data-s]:not(.ni)').forEach(el =>
  el.addEventListener('click', () => goScreen(el.dataset.s))
);

// "Next →" cycles through current mode's screens
const SCREEN_IDS = OP_SCREENS.map(s => s.id);
document.getElementById('nextBtn').addEventListener('click', () => {
  const pool = S.mode === 'operator' ? OP_SCREENS : BK_SCREENS;
  const ids  = pool.map(s => s.id);
  const i    = ids.indexOf(S.screen);
  goScreen(ids[(i + 1) % ids.length]);
});

/* ═══════════════════════════════════════════
   HOME — HORIZON TILES + PRIMARY REC
═══════════════════════════════════════════ */
// Rendered dynamically in renderHorizonTiles() — wiring is inline in that function.
// Create reserve / gap modal buttons are wired below.

document.querySelectorAll('.bucket-row').forEach(r =>
  r.addEventListener('click', () => selectBucket(r.dataset.bk))
);
document.getElementById('dp-x').addEventListener('click', clearBucket);
document.querySelectorAll('.acct-group-hdr').forEach(h =>
  h.addEventListener('click', () => toggleGrp(h.dataset.grp))
);

/* ═══════════════════════════════════════════
   REVENUE — NOODLEFLOW LINKS
═══════════════════════════════════════════ */
document.getElementById('nfProductSelect')?.addEventListener('change', e => {
  S.linkProduct = e.target.value;
  renderNFLinks();
});

document.querySelectorAll('.nf-type-btn').forEach(b =>
  b.addEventListener('click', () => {
    S.linkType = b.dataset.type;
    document.querySelectorAll('.nf-type-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderNFLinks();
  })
);

document.getElementById('generateLinkBtn')?.addEventListener('click', renderNFLinks);

/* ═══════════════════════════════════════════
   PLAN — TABS (Frameworks | Simulate)
═══════════════════════════════════════════ */
document.querySelectorAll('.ptab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.plan-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('plan-panel-' + tab.dataset.panel)?.classList.add('active');
    if (tab.dataset.panel === 'frameworks') renderFrameworks();
    if (tab.dataset.panel === 'simulate')   renderSim(S.sim);
  })
);

// Simulate scenario picker
document.querySelectorAll('.sp').forEach(b =>
  b.addEventListener('click', () => renderSim(b.dataset.sim))
);

// Sim mode tabs (Guided / Custom)
document.getElementById('smt-guided')?.addEventListener('click', () => {
  ['smt-guided','smt-custom'].forEach(id =>
    document.getElementById(id)?.classList.toggle('active', id === 'smt-guided')
  );
  document.getElementById('sim-guided-panel').style.display = 'flex';
  document.getElementById('sim-custom-panel').style.display = 'none';
});
document.getElementById('smt-custom')?.addEventListener('click', () => {
  ['smt-guided','smt-custom'].forEach(id =>
    document.getElementById(id)?.classList.toggle('active', id === 'smt-custom')
  );
  document.getElementById('sim-guided-panel').style.display = 'none';
  document.getElementById('sim-custom-panel').style.display = 'flex';
});

// Custom sim sliders
['sl-inv','sl-tax','sl-comm'].forEach(id => {
  const sl = document.getElementById(id); if (!sl) return;
  const lblId = { 'sl-inv': 'sv-inv', 'sl-tax': 'sv-tax', 'sl-comm': 'sv-comm' }[id];
  sl.addEventListener('input', () => {
    document.getElementById(lblId).textContent = parseFloat(sl.value) + '%';
    updateLiveToSpend();
  });
});

document.getElementById('runCustomSim')?.addEventListener('click', () => {
  const type   = document.getElementById('sc-type').value;
  const amt    = parseInt(document.getElementById('sc-amount').value) || 10000;
  const timing = document.getElementById('sc-timing').value;
  const newTs  = Math.max(0, 42380 - amt);
  const res    = document.getElementById('customSimResult');
  document.getElementById('csr-from').textContent = '$42,380';
  const toEl = document.getElementById('csr-to');
  toEl.textContent = '$' + newTs.toLocaleString();
  toEl.className   = 'sr-to ' + (newTs > 40000 ? 'safe' : newTs < 35000 ? 'risk' : 'tight');
  document.getElementById('csr-rec').innerHTML =
    `If you ${type.toLowerCase()} of <strong>$${amt.toLocaleString()}</strong> ${timing.toLowerCase()}, ` +
    `Available moves to <strong>$${newTs.toLocaleString()}</strong>. ` +
    `Noodleflow has modeled the downstream impact on all reserves.`;
  res.style.display = 'flex'; res.style.animation = 'none'; void res.offsetWidth;
  res.style.animation = 'scr 280ms var(--ease)';
});

// Redraw simulation paths on resize
window.addEventListener('resize', () => { if (S.sim) drawPaths(SIM_DATA[S.sim]); });

/* ═══════════════════════════════════════════
   SPEND — TABS (Invoices | Receipts)
═══════════════════════════════════════════ */
document.querySelectorAll('.stab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.spend-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('spend-panel-' + tab.dataset.panel)?.classList.add('active');
  })
);

// Invoice row selection
document.querySelectorAll('.inv-item').forEach(r =>
  r.addEventListener('click', () => renderInv(r.dataset.inv))
);

// Receipt drop zone — visual demo
document.getElementById('receiptDropZone')?.addEventListener('click', () =>
  toast('Receipt capture', 'Drag a receipt image here, or forward to receipts@noodleflow.ai for automatic OCR and matching.')
);

/* ═══════════════════════════════════════════
   BUCKET CREATION MODAL
═══════════════════════════════════════════ */
[
  document.getElementById('createBucketBtn'),
  document.getElementById('createBucketBtn2'),
  document.getElementById('simCreateBucket'),
].forEach(b => b?.addEventListener('click', showBucketModal));

document.getElementById('mc-assisted')?.addEventListener('click', () => {
  S.bucketMode = 'assisted';
  document.getElementById('mc-assisted').classList.add('active');
  document.getElementById('mc-manual').classList.remove('active');
});
document.getElementById('mc-manual')?.addEventListener('click', () => {
  S.bucketMode = 'manual';
  document.getElementById('mc-manual').classList.add('active');
  document.getElementById('mc-assisted').classList.remove('active');
});
document.getElementById('bm-next0')?.addEventListener('click', () => setBucketStep(1));
document.getElementById('bm-cancel')?.addEventListener('click', hideBucketModal);

document.querySelectorAll('.intent-opt').forEach(opt =>
  opt.addEventListener('click', () => {
    document.querySelectorAll('.intent-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    S.intent = opt.dataset.intent;
  })
);
document.getElementById('bm-a1-next')?.addEventListener('click', () => {
  const rec = INTENT_REC[S.intent] || INTENT_REC.other;
  document.getElementById('ar-title').textContent = rec.title;
  document.getElementById('ar-desc').textContent  = rec.desc;
  setBucketStep(2);
});
document.getElementById('bm-a1-back')?.addEventListener('click', () => setBucketStep(0));
document.getElementById('bm-a2-create')?.addEventListener('click', () => {
  hideBucketModal();
  toast('Reserve created', 'Noodleflow has set up your new reserve and will begin funding it automatically.');
});
document.getElementById('bm-a2-back')?.addEventListener('click', () => setBucketStep(1));
document.getElementById('bm-m1-create')?.addEventListener('click', () => {
  const name = document.getElementById('m-name').value || 'New reserve';
  hideBucketModal();
  toast('Reserve created', `"${name}" is now active. Noodleflow will begin allocating from your chosen source.`);
});
document.getElementById('bm-m1-back')?.addEventListener('click', () => setBucketStep(0));

/* ═══════════════════════════════════════════
   GAP MODAL
═══════════════════════════════════════════ */
document.getElementById('coverGapBtn')?.addEventListener('click', () =>
  document.getElementById('gapModal').classList.add('open')
);
document.getElementById('cancelGap')?.addEventListener('click', () =>
  document.getElementById('gapModal').classList.remove('open')
);
document.getElementById('confirmGap')?.addEventListener('click', () => {
  document.getElementById('gapModal').classList.remove('open');
  toast('Gap covered', '$6,200 moved from Business Savings → Inventory Reserve. Order is fully funded.');
});
document.querySelectorAll('.ms').forEach(s =>
  s.addEventListener('click', () => {
    document.querySelectorAll('.ms').forEach(x => x.classList.remove('active'));
    s.classList.add('active');
  })
);

/* ═══════════════════════════════════════════
   BANKING MODE — PAYMENTS / CARDS ACTIONS
═══════════════════════════════════════════ */
document.querySelectorAll('.pc').forEach(b =>
  b.addEventListener('click', () =>
    toast('Payment confirmed', 'Noodleflow will process at the scheduled time from the correct reserve.')
  )
);
document.querySelectorAll('.sinv').forEach(b =>
  b.addEventListener('click', () => {
    b.textContent = 'Invite sent ✓'; b.disabled = true; b.style.opacity = '0.5';
    toast('Invite sent', 'Secure payment setup link sent to vendor.');
  })
);
document.getElementById('inviteBtn')?.addEventListener('click', () =>
  toast('Invite payee', 'Enter a vendor name or email — Noodleflow sends a secure setup link.')
);

/* ═══════════════════════════════════════════
   DEMO FLOW
═══════════════════════════════════════════ */
let _demoTimer = null;
document.getElementById('demoBtn')?.addEventListener('click', () => {
  clearInterval(_demoTimer);
  const flow = S.mode === 'operator'
    ? ['home', 'revenue', 'partners', 'spend', 'plan', 'growth', 'ask']
    : ['bk-home', 'bk-accounts', 'bk-payments', 'bk-cards', 'bk-invoices', 'bk-activity'];
  let di = 0;
  function next() { if (di >= flow.length) { clearInterval(_demoTimer); return; } goScreen(flow[di++]); }
  next(); _demoTimer = setInterval(next, 2700);
  toast('Demo running', `Cycling ${S.mode} mode screens…`);
});

/* ═══════════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════════ */

// Open default reserve groups
document.getElementById('ab-ops')?.classList.add('open');
document.getElementById('ac-ops')?.classList.add('open');
document.getElementById('ab-prot')?.classList.add('open');
document.getElementById('ac-prot')?.classList.add('open');

// Render home components
renderHorizonTiles();
renderPrimaryRec();
renderChangedStrip();
selectBucket('inventory');

// Render revenue components
renderChannelPerf();
renderPlats();
renderDeals('shopify');
renderNFLinks();

// Render partners
renderPartners();
renderPartnerDetail('northline');

// Render spend
renderInv('northline');
renderReceiptList();

// Render plan
renderSim('marketing');
renderFrameworks();
updateLiveToSpend();

// Render growth
renderGrowth();

// Render banking screens
renderBkHome();
renderBkActivity();
renderBkCards();

// Set correct nav visibility for default mode
document.getElementById('nav-operator').style.display = '';
document.getElementById('nav-banking').style.display  = 'none';

// Start on home
goScreen('home');

/* ═══════════════════════════════════════════
   CENTRALIZED STATE
═══════════════════════════════════════════ */
const S = {
  screen:     'home',
  bucket:     'inventory',
  sim:        'marketing',
  simMode:    'guided',
  platform:   'shopify',
  deal:       'SHP-4471',
  invoice:    'northline',
  panelOpen:  {},
  grpOpen:    { ops: true, prot: true, sav: false },
  bucketMode: 'assisted',
  bucketStep: 0,
  intent:     'inventory',
};

/* ═══════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════ */
const SCREENS = [
  { id: 'home',         title: 'Home',         sub: 'Your real operating number — not your bank balance.' },
  { id: 'simulate',     title: 'Simulate',     sub: 'Model a decision before you make it.' },
  { id: 'opsrev',       title: 'Ops Revenue',  sub: 'Where money comes from — and what every dollar becomes.' },
  { id: 'ask',          title: 'Ask',          sub: 'Operator-language answers. Reasoning on demand.' },
  { id: 'invoices',     title: 'Invoices',     sub: '24 tracked · 18 recorded · 11 paid.' },
  { id: 'payments',     title: 'Payments',     sub: '12 connected payees · 3 payments scheduled this week.' },
  { id: 'optimization', title: 'Optimization', sub: '5 opportunities to improve your cash position.' },
];

/* ═══════════════════════════════════════════
   BUCKET DETAIL DATA
═══════════════════════════════════════════ */
const BDATA = {
  inventory: {
    ctx: 'Inventory', title: 'Inventory',
    sub: 'Reserved for your Apr 26 restock. Currently 71% funded, short $6,200.',
    levels: [
      {
        l: 'Why this amount',
        b: `<div class="dcard"><div class="dcard-lbl">Rule</div><div class="dcard-val">14% of eligible product revenue deposits</div></div>
            <div class="dcard"><div class="dcard-lbl">Next obligation</div><div class="dcard-val">Apr 26 order · $21,000 needed</div></div>
            <div class="dcard"><div class="dcard-lbl">Gap</div><div class="dcard-val" style="color:var(--tight);">–$6,200 · resolves after 4/24 deposit</div></div>`,
      },
      {
        l: 'What feeds it',
        b: `<div class="drow"><span>Shopify (this week)</span><span>$5,200</span></div>
            <div class="drow"><span>Amazon (Apr 14)</span><span>$7,400</span></div>
            <div class="drow"><span>Wholesale (Apr 10)</span><span>$2,200</span></div>
            <div class="drow" style="color:var(--tight);"><span>Gap to target</span><span>–$6,200</span></div>`,
      },
      {
        l: 'Recent activity',
        b: `<div class="aitem"><div><div class="aitem-d">Apr 17</div><div class="aitem-s">Amazon deposit (14%)</div><div class="aitem-imp">Auto-allocated</div></div><div class="aitem-a" style="color:var(--safe);">+$1,176</div></div>
            <div class="aitem"><div><div class="aitem-d">Apr 15</div><div class="aitem-s">Summit Labels paid</div><div class="aitem-imp">From inventory account</div></div><div class="aitem-a" style="color:var(--risk);">–$2,860</div></div>`,
      },
    ],
  },

  vendors: {
    ctx: 'Vendors', title: 'Vendors',
    sub: 'Scheduled from invoice inbox. Fully funded. 3 payments due today.',
    levels: [
      {
        l: 'Why this amount',
        b: `<div class="dcard"><div class="dcard-lbl">Source</div><div class="dcard-val">Invoice inbox + due date matching</div></div>
            <div class="dcard"><div class="dcard-lbl">Status</div><div class="dcard-val">Fully funded · 3 due today</div></div>`,
      },
      {
        l: 'What it funds',
        b: `<div class="drow"><span>Peak Logistics (Apr 21)</span><span>$1,920</span></div>
            <div class="drow"><span>Northline Packaging (Apr 22)</span><span>$4,280</span></div>
            <div class="drow"><span>Alpine Freight (Apr 28)</span><span>$3,100</span></div>
            <div class="drow"><span>Additional scheduled</span><span>$4,240</span></div>`,
      },
    ],
  },

  commissions: {
    ctx: 'Commissions', title: 'Commissions',
    sub: '5% of Ridgefield SKU revenue. Auto-split. Pays every Friday.',
    levels: [
      {
        l: 'Why this amount',
        b: `<div class="dcard"><div class="dcard-lbl">Rule</div><div class="dcard-val">5% of all Ridgefield SKU gross revenue</div></div>
            <div class="dcard"><div class="dcard-lbl">This week</div><div class="dcard-val">$49,600 eligible → $2,480</div></div>
            <div class="dcard"><div class="dcard-lbl">Payout</div><div class="dcard-val">Friday via ACH</div></div>`,
      },
    ],
  },

  payroll: {
    ctx: 'Payroll', title: 'Payroll',
    sub: 'Protected for Apr 30. Fully covered with $3,900 buffer.',
    levels: [
      {
        l: 'Why this amount',
        b: `<div class="dcard"><div class="dcard-lbl">Method</div><div class="dcard-val">Payroll schedule + 6 learned cycles</div></div>
            <div class="dcard"><div class="dcard-lbl">Buffer</div><div class="dcard-val" style="color:var(--safe);">$3,900 above requirement</div></div>`,
      },
      {
        l: 'Breakdown',
        b: `<div class="drow"><span>4 staff (base)</span><span>$10,200</span></div>
            <div class="drow"><span>Employer taxes</span><span>$1,400</span></div>
            <div class="drow"><span style="color:var(--safe);">Total</span><span style="color:var(--safe);">$11,600</span></div>`,
      },
    ],
  },

  taxes: {
    ctx: 'Taxes', title: 'Taxes',
    sub: 'Auto-held at 8.5% of taxable deposits. On track for May 15.',
    levels: [
      {
        l: 'Why this amount',
        b: `<div class="dcard"><div class="dcard-lbl">Rate</div><div class="dcard-val">8.5% of eligible taxable deposits</div></div>
            <div class="dcard"><div class="dcard-lbl">Q2 target</div><div class="dcard-val">$16,200 by May 15</div></div>`,
      },
      {
        l: 'Breakdown',
        b: `<div class="drow"><span>Federal income (est.)</span><span>$4,800</span></div>
            <div class="drow"><span>State tax</span><span>$3,200</span></div>
            <div class="drow"><span>Self-employment</span><span>$1,420</span></div>`,
      },
    ],
  },

  buffer: {
    ctx: 'Buffer', title: 'Operating Buffer',
    sub: 'Emergency cushion. Do not deploy unless explicitly instructed.',
    levels: [
      {
        l: 'Purpose',
        b: `<div class="dcard"><div class="dcard-lbl">Floor</div><div class="dcard-val">NoodleFlow maintains this as an untouchable minimum floor.</div></div>
            <div class="dcard"><div class="dcard-lbl">Trigger</div><div class="dcard-val">You'll be alerted before any payment would breach this amount.</div></div>`,
      },
    ],
  },
};

/* ═══════════════════════════════════════════
   SIMULATION DATA
═══════════════════════════════════════════ */
const SIM_DATA = {
  marketing: {
    badge: 'brisk', bl: 'Not recommended',
    from: '$42,380', to: '$32,380', toc: 'risk',
    rec: 'Wait for the <strong>4/24 Amazon deposit</strong>. Same $10K spend then becomes safe — inventory gap closes, payroll buffer holds at $3,900.',
    stages: ['Decision', 'Cash Pool', 'Accounts Hit', 'Impact', 'Result'],
    cols: [
      { nodes: [{ l: 'Decision',    a: 'Spend $10K',  s: 'Marketing now',    c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Bank',        a: '$88,540',      s: 'Current',           c: 'hl',       ac: 'neutral' }] },
      { nodes: [
          { l: 'Inventory', a: '$14,800', s: 'Short $6,200', c: 'hl-tight', ac: 'tight' },
          { l: 'Payroll',   a: '$11,600', s: 'Covered',      c: 'hl',       ac: 'neutral' },
        ]
      },
      { nodes: [
          { l: 'Cash depletes', a: '–$10,000', s: 'From operating',     c: 'hl-risk',  ac: 'risk' },
          { l: 'Buffer',        a: '$900',      s: 'Dangerously thin',   c: 'hl-tight', ac: 'tight' },
        ]
      },
      { nodes: [{ l: 'To Spend', a: '$32,380', s: 'After scenario', c: 'hl-risk', ac: 'risk' }] },
    ],
    paths: [
      { f: [0,0], t: [1,0], c: 'var(--blue)',  a: true },
      { f: [1,0], t: [2,0], c: 'var(--tight)', a: true },
      { f: [1,0], t: [2,1], c: 'rgba(255,255,255,0.12)', a: false },
      { f: [2,0], t: [3,1], c: 'var(--tight)', a: true },
      { f: [3,0], t: [4,0], c: 'var(--risk)',  a: true },
    ],
  },

  inventory: {
    badge: 'btight', bl: 'Gap closes 4/24',
    from: '$14,800', to: '$21,000+', toc: 'safe',
    rec: 'The <strong>4/24 Amazon deposit</strong> closes the gap with $2,200 surplus. No action needed — NoodleFlow alerts you the moment the order is fully funded.',
    stages: ['Question', 'Now', '4/24 Deposit', 'Gap Status', 'Result'],
    cols: [
      { nodes: [{ l: 'Question',      a: 'Cover order?',  s: 'Apr 26 restock',     c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Inventory now', a: '$14,800',       s: '71% of $21K',        c: 'hl-tight', ac: 'tight' }] },
      { nodes: [{ l: 'Amazon payout', a: '~$8,400',       s: 'Expected Apr 24',    c: 'hl-safe',  ac: 'safe' }] },
      { nodes: [
          { l: 'Gap closes', a: '$0',       s: '+$2,200 surplus',    c: 'hl-safe', ac: 'safe' },
          { l: 'Gap today',  a: '–$6,200',  s: 'Current shortfall',  c: 'hl-risk', ac: 'risk' },
        ]
      },
      { nodes: [{ l: 'Order status', a: 'Safe ✓', s: 'After Apr 24', c: 'hl-safe', ac: 'safe' }] },
    ],
    paths: [
      { f: [0,0], t: [1,0], c: 'var(--blue)', a: true },
      { f: [1,0], t: [2,0], c: 'var(--safe)', a: true },
      { f: [2,0], t: [3,0], c: 'var(--safe)', a: true },
      { f: [3,0], t: [4,0], c: 'var(--safe)', a: true },
    ],
  },

  delay: {
    badge: 'bsafe', bl: 'Low risk',
    from: '$42,380', to: '$44,300', toc: 'safe',
    rec: 'Delaying Northline 5 days frees $4,280 and <strong>closes the inventory gap</strong> without waiting for the Amazon deposit. Low risk given 6/6 on-time history.',
    stages: ['Decision', 'Northline Held', 'Inventory Effect', 'Rescheduled', 'Result'],
    cols: [
      { nodes: [{ l: 'Decision',      a: 'Delay Northline', s: '5 days · $4,280',  c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Payment held',  a: '$4,280',           s: 'Until Apr 27',     c: 'hl-tight', ac: 'tight' }] },
      { nodes: [
          { l: 'Gap shrinks',  a: '–$1,920', s: 'From $6,200',     c: 'hl-tight', ac: 'tight' },
          { l: '4/24 deposit', a: '+$8,400', s: 'Closes remainder', c: 'hl-safe',  ac: 'safe' },
        ]
      },
      { nodes: [{ l: 'Pays Apr 27', a: '$4,280', s: 'Fully funded', c: 'hl-safe', ac: 'safe' }] },
      { nodes: [{ l: 'To Spend',    a: '$44,300', s: 'After scenario', c: 'hl-safe', ac: 'safe' }] },
    ],
    paths: [
      { f: [0,0], t: [1,0], c: 'var(--blue)',  a: true },
      { f: [1,0], t: [2,0], c: 'var(--tight)', a: true },
      { f: [1,0], t: [2,1], c: 'var(--safe)',  a: true },
      { f: [2,1], t: [3,0], c: 'var(--safe)',  a: true },
      { f: [3,0], t: [4,0], c: 'var(--safe)',  a: true },
    ],
  },

  payroll: {
    badge: 'bsafe', bl: 'Safe',
    from: '$11,600', to: 'Safe ✓', toc: 'safe',
    rec: 'Payroll is fully protected with a <strong>$3,900 buffer</strong>. Even worst-case, buffer drops to $900 — still covered. NoodleFlow alerts before any risk.',
    stages: ['Question', 'Reserved', 'Coverage', 'Worst Case', 'Result'],
    cols: [
      { nodes: [{ l: 'Question',  a: 'Payroll safe?', s: 'Apr 30',              c: 'hl-blue', ac: 'blue' }] },
      { nodes: [{ l: 'Protected', a: '$11,600',        s: 'Auto-managed',        c: 'hl-safe', ac: 'safe' }] },
      { nodes: [
          { l: 'Required', a: '$11,600', s: '4 staff + taxes',    c: 'hl',       ac: 'neutral' },
          { l: 'Buffer',   a: '+$3,900', s: 'Above requirement',  c: 'hl-safe',  ac: 'safe' },
        ]
      },
      { nodes: [{ l: 'If $10K spent', a: '$900 left', s: 'Still covered', c: 'hl-tight', ac: 'tight' }] },
      { nodes: [{ l: 'Apr 30',        a: 'Safe ✓',    s: 'Fully covered', c: 'hl-safe',  ac: 'safe' }] },
    ],
    paths: [
      { f: [0,0], t: [1,0], c: 'var(--blue)',  a: true },
      { f: [1,0], t: [2,1], c: 'var(--safe)',  a: true },
      { f: [2,1], t: [3,0], c: 'var(--tight)', a: true },
      { f: [3,0], t: [4,0], c: 'var(--safe)',  a: true },
    ],
  },
};

/* ═══════════════════════════════════════════
   OPS REVENUE DATA
═══════════════════════════════════════════ */
const PLATS = [
  { id: 'shopify',   name: 'Shopify',   total: '$24,200', raw: 24200, sub: '14 orders', bar: 49 },
  { id: 'amazon',    name: 'Amazon',    total: '$18,800', raw: 18800, sub: '3 payouts', bar: 38 },
  { id: 'wholesale', name: 'Wholesale', total: '$6,600',  raw: 6600,  sub: '2 POs',     bar: 13 },
];

const DEALS = {
  shopify: [
    { id: 'SHP-4471', date: 'Apr 17', amt: '$8,400', skus: ['NF-RIDGE-01', 'NF-PACK-02', 'NF-LABEL-03'] },
    { id: 'SHP-4468', date: 'Apr 16', amt: '$5,200', skus: ['NF-RIDGE-01', 'NF-PACK-02'] },
    { id: 'SHP-4462', date: 'Apr 15', amt: '$4,800', skus: ['NF-LABEL-03', 'NF-PACK-02'] },
    { id: 'SHP-4455', date: 'Apr 14', amt: '$3,900', skus: ['NF-RIDGE-01'] },
  ],
  amazon: [
    { id: 'AMZ-B7712', date: 'Apr 17', amt: '$9,400', skus: ['NF-RIDGE-01', 'NF-PACK-02'] },
    { id: 'AMZ-B7698', date: 'Apr 14', amt: '$5,800', skus: ['NF-RIDGE-01'] },
    { id: 'AMZ-B7681', date: 'Apr 12', amt: '$3,600', skus: ['NF-PACK-02', 'NF-LABEL-03'] },
  ],
  wholesale: [
    { id: 'WS-221', date: 'Apr 16', amt: '$4,200', skus: ['NF-RIDGE-01', 'NF-PACK-02'] },
    { id: 'WS-219', date: 'Apr 11', amt: '$2,400', skus: ['NF-PACK-02'] },
  ],
};

const SKU_DATA = {
  'NF-RIDGE-01': {
    name: 'Ridgefield Pro Bundle',
    allocs: [
      { n: 'Inventory',   p: 14,   c: 'var(--tight)' },
      { n: 'Commissions', p: 5,    c: 'var(--blue)' },
      { n: 'Taxes',       p: 8.5,  c: 'var(--t4)' },
      { n: 'To Spend',    p: 72.5, c: 'var(--safe)' },
    ],
  },
  'NF-PACK-02': {
    name: 'Packaging Essentials Kit',
    allocs: [
      { n: 'Inventory', p: 18,   c: 'var(--tight)' },
      { n: 'Taxes',     p: 8.5,  c: 'var(--t4)' },
      { n: 'To Spend',  p: 73.5, c: 'var(--safe)' },
    ],
  },
  'NF-LABEL-03': {
    name: 'Label & Finish Pack',
    allocs: [
      { n: 'Inventory', p: 14,   c: 'var(--tight)' },
      { n: 'Taxes',     p: 8.5,  c: 'var(--t4)' },
      { n: 'To Spend',  p: 77.5, c: 'var(--safe)' },
    ],
  },
};

const DEAL_AMTS = {
  'SHP-4471': { 'NF-RIDGE-01': 5800, 'NF-PACK-02': 1600, 'NF-LABEL-03': 1000 },
  'SHP-4468': { 'NF-RIDGE-01': 3200, 'NF-PACK-02': 2000 },
  'SHP-4462': { 'NF-LABEL-03': 2100, 'NF-PACK-02': 2700 },
  'SHP-4455': { 'NF-RIDGE-01': 3900 },
  'AMZ-B7712': { 'NF-RIDGE-01': 6200, 'NF-PACK-02': 3200 },
  'AMZ-B7698': { 'NF-RIDGE-01': 5800 },
  'AMZ-B7681': { 'NF-PACK-02': 2100, 'NF-LABEL-03': 1500 },
  'WS-221':    { 'NF-RIDGE-01': 2800, 'NF-PACK-02': 1400 },
  'WS-219':    { 'NF-PACK-02': 2400 },
};

/* ═══════════════════════════════════════════
   INVOICE DATA
═══════════════════════════════════════════ */
const INV_DATA = {
  northline: {
    ctx: 'Northline Packaging', title: 'Northline Packaging',
    sub: 'PO-linked packaging · Recorded in QuickBooks · Inventory account',
    badge: 'btight', bl: 'Ready to pay',
    rows: [
      { l: 'What NoodleFlow did', bc: 'binfo',  bb: 'Auto-processed', b: 'Read invoice email, extracted amount and due date, matched vendor to accounting, mapped to Inventory.' },
      { l: 'Funding status',      bc: 'btight', bb: 'Tight',          b: 'Can be paid now, but inventory remains $6,200 short for full replenishment.' },
      { l: 'Suggested action',    bc: 'bsafe',  bb: 'Pay now',        b: 'Pay this invoice today. Delay Bright Market Agency until after the 4/24 deposit.' },
    ],
  },
  peak: {
    ctx: 'Peak Logistics', title: 'Peak Logistics',
    sub: 'Recurring freight · Auto-pay enabled · Vendors account',
    badge: 'binfo', bl: 'Waiting approval',
    rows: [
      { l: 'What NoodleFlow did', bc: 'binfo', bb: 'Auto-matched',  b: 'Recognized from prior invoices, queued for auto-approval from Vendors account.' },
      { l: 'Scheduled',           bc: 'bsafe', bb: 'Apr 21 @ 9AM', b: '$1,920 sends automatically. One-click approval gate active.' },
    ],
  },
  bright: {
    ctx: 'Bright Market Agency', title: 'Bright Market Agency',
    sub: 'Campaign invoice · Not funded · Marketing account empty',
    badge: 'brisk', bl: 'Not funded',
    rows: [
      { l: 'Funding gap',      bc: 'brisk',  bb: '$10,000 short', b: 'No marketing account exists. Paying from operating cash compresses inventory and payroll.' },
      { l: 'Suggested action', bc: 'btight', bb: 'Delay',         b: 'Hold until a marketing account is created and funded. NoodleFlow will alert when ready.' },
    ],
  },
  summit: {
    ctx: 'Summit Labels', title: 'Summit Labels',
    sub: 'Already paid · Synced to QuickBooks',
    badge: 'bsafe', bl: 'Paid',
    rows: [
      { l: 'Completed',  bc: 'bsafe', bb: 'Apr 18',   b: '$2,860 paid from Inventory account. Confirmation sent automatically.' },
      { l: 'Accounting', bc: 'bsafe', bb: 'Recorded', b: 'Synced to QuickBooks within 2 hours.' },
    ],
  },
};

/* ═══════════════════════════════════════════
   CHAT RESPONSES
═══════════════════════════════════════════ */
const CHAT = {
  'What can I safely spend this week?': {
    u: 'What can I safely spend this week?',
    a: '<strong>$42,380 — with one condition.</strong><br><br>Clear of all obligations. Leave at least $6,200 unspent before Apr 24 so the inventory order clears without a gap. After the 4/24 deposit, your full To Spend becomes unrestricted.',
  },
  'Which vendors should be paid today?': {
    u: 'Which vendors should I pay today?',
    a: '<strong>Two are time-sensitive.</strong><br><br>Peak Logistics ($1,920) is due today and auto-scheduled — no action needed. Northline Packaging ($4,280) is due tomorrow and ready to confirm. Hold Bright Market Agency until after 4/24.',
  },
  'Why is inventory tight?': {
    u: 'Why is inventory tight?',
    a: '<strong>Revenue timing.</strong><br><br>Strong sales week but the Amazon payout doesn\'t settle until Apr 24 — two days after your order window opens. $14,800 in the account covers 71% of the order. The gap closes automatically when the deposit hits.',
  },
  'How much of Amazon goes to taxes?': {
    u: 'How much of Amazon goes to taxes?',
    a: '<strong>8.5% of eligible deposits.</strong><br><br>NoodleFlow separates this automatically at the moment of deposit. For your average $8,400 Amazon payout that\'s ~$714 per cycle. The rate will increase slightly in May to hit the $16,200 quarterly target.',
  },
  'What if I delay the payroll bonus?': {
    u: 'What if I delay the payroll bonus?',
    a: '<strong>To Spend goes up $2,500 immediately.</strong><br><br>That alone nearly closes the inventory gap — no need to wait for the 4/24 deposit. NoodleFlow can auto-trigger the bonus payout once inventory is fully funded if you want to sequence it that way.',
  },
};

/* ═══════════════════════════════════════════
   BUCKET CREATION — INTENT RECOMMENDATIONS
═══════════════════════════════════════════ */
const INTENT_REC = {
  inventory: {
    title: 'NoodleFlow recommends: Inventory Expansion bucket',
    desc:  'Fund from Amazon and Shopify deposits after current inventory holdback. Target: $15,000. Timeline: ~3 weeks at current pace. Your existing Inventory account will not be affected.',
  },
  marketing: {
    title: 'NoodleFlow recommends: Marketing Reserve bucket',
    desc:  'Fund from Amazon deposits after other allocations. Target: $10,000. Timeline: ~3–4 weeks. Reduces To Spend by ~$420/week during funding.',
  },
  hire: {
    title: 'NoodleFlow recommends: Payroll Expansion bucket',
    desc:  'Fund from all product revenue at 3% rate. Target: $4,200/month (est. for new hire). Timeline: 6–8 weeks to first full payroll cycle.',
  },
  invest: {
    title: 'NoodleFlow recommends: Investment Reserve bucket',
    desc:  'Fund from operating buffer overages and a 2% holdback from Shopify. Target: $20,000. Timeline: 8–10 weeks. Minimal impact on To Spend.',
  },
  owner: {
    title: 'NoodleFlow recommends: Owner Draw bucket',
    desc:  'Fund from net operating cash after all obligations. Set a weekly cap of $2,500 to maintain safe To Spend levels. Adjust any time.',
  },
  other: {
    title: 'NoodleFlow recommends: Custom bucket',
    desc:  'Describe your goal and NoodleFlow will determine the right funding source, holdback rate, and target based on your current cash structure.',
  },
};

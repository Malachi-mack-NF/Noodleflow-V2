/* ═══════════════════════════════════════════
   CENTRALIZED STATE
═══════════════════════════════════════════ */
const S = {
  mode:        'operator',   // 'operator' | 'banking'
  screen:      'home',
  horizon:     'now',        // 'now' | '7d' | '30d' | '90d'
  bucket:      'inventory',
  sim:         'marketing',
  simMode:     'guided',
  platform:    'shopify',
  deal:        'SHP-4471',
  invoice:     'northline',
  partner:     'northline',
  framework:   'ecommerce',
  linkProduct: 'NF-RIDGE-01',
  linkType:    'social',
  panelOpen:   {},
  grpOpen:     { ops: true, prot: true, sav: false },
  bucketMode:  'assisted',
  bucketStep:  0,
  intent:      'inventory',
};

/* ═══════════════════════════════════════════
   SCREEN REGISTRIES — two modes
═══════════════════════════════════════════ */
const OP_SCREENS = [
  { id: 'home',     title: 'Mission Control', sub: 'Available cash. Upcoming obligations. One next action.' },
  { id: 'revenue',  title: 'Revenue',         sub: 'What your products actually generate after fees, reserves, and obligations.' },
  { id: 'partners', title: 'Partners',        sub: 'Supplier and vendor relationship intelligence — spend, terms, risk, and ROI.' },
  { id: 'spend',    title: 'Spend',           sub: 'Where cash leaves the business. Invoices, approvals, cards, and receipts.' },
  { id: 'plan',     title: 'Plan',            sub: 'Reserve architectures, simulations, forecasts, and operating frameworks.' },
  { id: 'growth',   title: 'Growth',          sub: 'Where to deploy excess capital for maximum operating leverage.' },
  { id: 'ask',      title: 'Ask',             sub: 'Operator-language intelligence. Benchmarks, patterns, and inference.' },
];

const BK_SCREENS = [
  { id: 'bk-home',     title: 'Banking Overview', sub: 'Real Cash across all connected accounts.' },
  { id: 'bk-accounts', title: 'Accounts',          sub: 'Connected checking, savings, and reserve accounts.' },
  { id: 'bk-payments', title: 'Payments',           sub: 'ACH, wires, bill pay, and scheduled vendor payments.' },
  { id: 'bk-cards',    title: 'Cards',              sub: 'Virtual cards, spend controls, and employee card management.' },
  { id: 'bk-invoices', title: 'Invoices',           sub: 'Invoice inbox, approvals, matching, and automated routing.' },
  { id: 'bk-activity', title: 'Activity',           sub: 'Unified transaction and movement log.' },
];

/* For navigation cycling in demo */
const SCREENS = OP_SCREENS;

/* ═══════════════════════════════════════════
   HOME — FOUR TIME HORIZONS
═══════════════════════════════════════════ */
const HOME_HORIZONS = {
  now: {
    label: 'Available Now',  amount: '$42,380', status: 'tight',
    delta: '+$1,240 vs yesterday', deltaDir: 'up',
    desc: 'After all active reserves and obligations',
  },
  '7d': {
    label: 'Safe · 7 Days', amount: '$38,200', status: 'tight',
    delta: '–$4,180 payroll Apr 30', deltaDir: 'down',
    desc: 'Includes payroll run and 3 vendor obligations',
  },
  '30d': {
    label: 'Safe · 30 Days', amount: '$29,800', status: 'safe',
    delta: '–$8,400 net obligations', deltaDir: 'down',
    desc: 'Q2 state tax + Northline restock cycle',
  },
  '90d': {
    label: 'Safe · 90 Days', amount: '$22,400', status: 'safe',
    delta: 'Memorial Day lift +$6,200', deltaDir: 'up',
    desc: 'Seasonal inventory and media modeled',
  },
};

/* ═══════════════════════════════════════════
   HOME — ONE PRIMARY RECOMMENDATION
═══════════════════════════════════════════ */
const PRIMARY_REC = {
  urgency: 'tight',
  title: 'Hold Bright Market approval until Thursday',
  reason: 'Your Inventory Reserve closes its $6,200 gap Wednesday when the Amazon deposit clears. Approving the $10K invoice now compresses payroll buffer to $900 — below your $3,200 safe floor.',
  impact: 'Payroll protected · Inventory fully funded · Marketing approved safely Thursday',
  actions: [
    { label: 'Simulate',       id: 'sim-bright', style: 'ghost' },
    { label: 'Delay to Thu',   id: 'delay-thu',  style: 'primary' },
    { label: 'Create reserve', id: 'create-res', style: 'ghost' },
    { label: 'Approve now',    id: 'approve-now',style: 'danger' },
  ],
};

const WHAT_CHANGED = [
  { icon: '↑', color: 'safe',  text: 'Amazon deposit +$8,400 cleared · Inventory Reserve improved to 71%' },
  { icon: '→', color: 'neut',  text: 'Payroll buffer stable at $3,900 · No change in near-term obligations' },
  { icon: '⚠', color: 'tight', text: 'Bright Market invoice due in 7 days · Currently unfunded' },
];

/* ═══════════════════════════════════════════
   RESERVE DATA (language: Reserves, Obligations, Available)
═══════════════════════════════════════════ */
const RESERVE_DATA = {
  inventory: {
    ctx: 'Inventory Reserve', title: 'Inventory Reserve',
    sub: 'Reserved for your Apr 26 restock. 71% funded, $6,200 short of obligation.',
    levels: [
      { l: 'Allocation rule',     b: `<div class="dcard"><div class="dcard-lbl">Rule</div><div class="dcard-val">14% of eligible product revenue deposits</div></div><div class="dcard"><div class="dcard-lbl">Next obligation</div><div class="dcard-val">Apr 26 order · $21,000 needed</div></div><div class="dcard"><div class="dcard-lbl">Shortfall</div><div class="dcard-val" style="color:var(--tight);">–$6,200 · resolves after 4/24 deposit</div></div>` },
      { l: 'What feeds this reserve', b: `<div class="drow"><span>Shopify (this week)</span><span>$5,200</span></div><div class="drow"><span>Amazon (Apr 14)</span><span>$7,400</span></div><div class="drow"><span>Wholesale (Apr 10)</span><span>$2,200</span></div><div class="drow" style="color:var(--tight);"><span>Gap to obligation</span><span>–$6,200</span></div>` },
      { l: 'Recent movements',    b: `<div class="aitem"><div><div class="aitem-d">Apr 17</div><div class="aitem-s">Amazon deposit (14%)</div><div class="aitem-imp">Auto-allocated</div></div><div class="aitem-a" style="color:var(--safe);">+$1,176</div></div><div class="aitem"><div><div class="aitem-d">Apr 15</div><div class="aitem-s">Summit Labels paid</div><div class="aitem-imp">From reserve</div></div><div class="aitem-a" style="color:var(--risk);">–$2,860</div></div>` },
    ],
  },
  vendors: {
    ctx: 'Vendor Reserve', title: 'Vendor Reserve',
    sub: 'Scheduled from invoice inbox. Fully funded. 3 obligations due today.',
    levels: [
      { l: 'Allocation rule',        b: `<div class="dcard"><div class="dcard-lbl">Source</div><div class="dcard-val">Invoice inbox + due date matching</div></div><div class="dcard"><div class="dcard-lbl">Status</div><div class="dcard-val">Fully funded · 3 obligations due today</div></div>` },
      { l: 'Upcoming obligations',   b: `<div class="drow"><span>Peak Logistics (Apr 21)</span><span>$1,920</span></div><div class="drow"><span>Northline Packaging (Apr 22)</span><span>$4,280</span></div><div class="drow"><span>Alpine Freight (Apr 28)</span><span>$3,100</span></div><div class="drow"><span>Additional scheduled</span><span>$4,240</span></div>` },
    ],
  },
  commissions: {
    ctx: 'Commission Reserve', title: 'Commission Reserve',
    sub: '5% of Ridgefield SKU revenue. Auto-split at deposit. Pays every Friday.',
    levels: [
      { l: 'Allocation rule', b: `<div class="dcard"><div class="dcard-lbl">Rule</div><div class="dcard-val">5% of all Ridgefield SKU gross revenue</div></div><div class="dcard"><div class="dcard-lbl">This week</div><div class="dcard-val">$49,600 eligible → $2,480</div></div><div class="dcard"><div class="dcard-lbl">Payout</div><div class="dcard-val">Friday via ACH</div></div>` },
    ],
  },
  payroll: {
    ctx: 'Payroll Reserve', title: 'Payroll Reserve',
    sub: 'Protected for Apr 30 run. Fully covered with $3,900 above obligation.',
    levels: [
      { l: 'Allocation rule', b: `<div class="dcard"><div class="dcard-lbl">Method</div><div class="dcard-val">Payroll schedule + 6 learned cycles</div></div><div class="dcard"><div class="dcard-lbl">Buffer above obligation</div><div class="dcard-val" style="color:var(--safe);">$3,900</div></div>` },
      { l: 'Breakdown',       b: `<div class="drow"><span>4 staff (base)</span><span>$10,200</span></div><div class="drow"><span>Employer taxes</span><span>$1,400</span></div><div class="drow"><span style="color:var(--safe);">Total reserve</span><span style="color:var(--safe);">$11,600</span></div>` },
    ],
  },
  taxes: {
    ctx: 'Tax Reserve', title: 'Tax Reserve',
    sub: 'Auto-held at 8.5% of taxable deposits. On track for May 15 obligation.',
    levels: [
      { l: 'Allocation rule', b: `<div class="dcard"><div class="dcard-lbl">Rate</div><div class="dcard-val">8.5% of eligible taxable deposits</div></div><div class="dcard"><div class="dcard-lbl">Q2 obligation</div><div class="dcard-val">$16,200 by May 15</div></div>` },
      { l: 'Breakdown',       b: `<div class="drow"><span>Federal income (est.)</span><span>$4,800</span></div><div class="drow"><span>State tax</span><span>$3,200</span></div><div class="drow"><span>Self-employment</span><span>$1,420</span></div>` },
    ],
  },
  buffer: {
    ctx: 'Operating Buffer', title: 'Operating Buffer',
    sub: 'Emergency floor. Do not deploy without explicit operator instruction.',
    levels: [
      { l: 'Purpose', b: `<div class="dcard"><div class="dcard-lbl">Floor</div><div class="dcard-val">Noodleflow maintains this as an untouchable minimum.</div></div><div class="dcard"><div class="dcard-lbl">Alert trigger</div><div class="dcard-val">Alert fires before any payment breaches this amount.</div></div>` },
    ],
  },
};
const BDATA = RESERVE_DATA; /* alias for backward compat */

/* ═══════════════════════════════════════════
   PLAN — OPERATING FRAMEWORKS
═══════════════════════════════════════════ */
const FRAMEWORKS = [
  {
    id: 'ecommerce',
    name: 'Ecommerce Operator',
    icon: '📦',
    popular: true,
    community: '4,100 operators',
    desc: 'Built for product businesses. Prioritizes inventory, media, and margin protection while managing platform and logistics dependencies.',
    reserves: [
      { name: 'Inventory Reserve',  pct: '14–18%', note: 'Product restocking by channel' },
      { name: 'Paid Media Reserve', pct: '8–12%',  note: 'Ad spend protection' },
      { name: 'Payroll Reserve',    pct: 'fixed',  note: 'Staff + employer taxes' },
      { name: 'Tax Reserve',        pct: '8.5%',   note: 'Auto-held at deposit' },
      { name: 'Vendor Reserve',     pct: 'invoice',note: 'Matched to obligations' },
      { name: 'Returns Reserve',    pct: '2–3%',   note: 'Platform chargebacks + refunds' },
      { name: 'Operating Buffer',   pct: 'floor',  note: 'Emergency minimum' },
      { name: 'Growth Capital',     pct: 'surplus',note: 'Excess deployed here' },
    ],
  },
  {
    id: 'profit-first',
    name: 'Profit First',
    icon: '🎯',
    popular: false,
    community: '2,400 operators',
    desc: 'Mike Michalowicz\'s allocation model. Revenue splits immediately into protected reserves at deposit — profit is paid first, not last.',
    reserves: [
      { name: 'Income',           pct: '100%',   note: 'All revenue flows here first' },
      { name: 'Owner Pay',        pct: '50%',    note: 'Your compensation, protected' },
      { name: 'Operating Expense',pct: '30%',    note: 'Everything it costs to run' },
      { name: 'Tax Reserve',      pct: '15%',    note: 'Auto-held at deposit' },
      { name: 'Profit',           pct: '5%',     note: 'Distributed quarterly' },
      { name: 'Emergency Reserve',pct: 'floor',  note: 'Untouchable minimum' },
    ],
  },
  {
    id: 'agency',
    name: 'Agency Operator',
    icon: '🏢',
    popular: false,
    community: '1,800 operators',
    desc: 'For service businesses. Heaviest weight on payroll protection, contractor management, and owner draw discipline.',
    reserves: [
      { name: 'Payroll',            pct: '45%',   note: 'Staff — largest obligation' },
      { name: 'Contractors',        pct: '15%',   note: '1099 and freelance' },
      { name: 'Tax Reserve',        pct: '20%',   note: 'Higher rate, service income' },
      { name: 'Tools & Software',   pct: '5%',    note: 'Subscriptions and stack' },
      { name: 'Operating Reserve',  pct: 'floor', note: '60-day cash runway minimum' },
      { name: 'Owner Draw',         pct: 'surplus',note: 'After all obligations clear' },
      { name: 'Bonus Pool',         pct: '5%',    note: 'Quarterly distributions' },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality Operator',
    icon: '🍽️',
    popular: false,
    community: '960 operators',
    desc: 'For food, beverage, and venue businesses. COGS, labor, rent, and seasonality are the primary pressure points.',
    reserves: [
      { name: 'COGS Reserve',     pct: '28–35%', note: 'Food, beverage, and supplies' },
      { name: 'Payroll Reserve',  pct: '30%',    note: 'Largest cost in hospitality' },
      { name: 'Rent Reserve',     pct: 'fixed',  note: '4–6 weeks ahead at all times' },
      { name: 'Tax Reserve',      pct: '8%',     note: 'Sales tax + income estimate' },
      { name: 'Marketing',        pct: '4–6%',   note: 'Events, social, local media' },
      { name: 'Equipment Reserve',pct: '2%',     note: 'Repair and replacement fund' },
      { name: 'Seasonal Buffer',  pct: 'floor',  note: 'Off-season operating cushion' },
    ],
  },
  {
    id: 'lean',
    name: 'Lean Bootstrap',
    icon: '⚡',
    popular: false,
    community: '3,200 operators',
    desc: 'Minimal structure for early-stage operators. Maximize Available capital while protecting hard floors.',
    reserves: [
      { name: 'Tax Reserve',       pct: '10%',    note: 'Non-negotiable' },
      { name: 'Operating Reserve', pct: 'floor',  note: '30-day minimum runway' },
      { name: 'Available',         pct: 'rest',   note: 'Operator decides deployment' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Framework',
    icon: '✏️',
    popular: false,
    community: null,
    desc: 'Design your own reserve architecture. Noodleflow suggests sub-reserve templates based on your business profile.',
    reserves: [],
  },
];

/* ═══════════════════════════════════════════
   REVENUE — CHANNEL PERFORMANCE
═══════════════════════════════════════════ */
const CHANNEL_PERF = [
  { channel: 'Shopify DTC', gross: '$24,200', liquidity: '$17,600', liqPct: '72.7%', pct: 49, trend: 'up'   },
  { channel: 'Amazon FBA',  gross: '$18,800', liquidity: '$11,900', liqPct: '63.3%', pct: 38, trend: 'flat' },
  { channel: 'Wholesale',   gross: '$6,600',  liquidity: '$3,800',  liqPct: '57.6%', pct: 13, trend: 'down' },
];

const NF_LINK_PRODUCTS = [
  { id: 'NF-RIDGE-01', name: 'Ridgefield Pro Bundle',    price: '$89', margin: '72.5%', stock: 240 },
  { id: 'NF-PACK-02',  name: 'Packaging Essentials Kit', price: '$34', margin: '73.5%', stock: 610 },
  { id: 'NF-LABEL-03', name: 'Label & Finish Pack',      price: '$22', margin: '77.5%', stock: 890 },
];

const NF_LINK_TYPES = [
  { id: 'social', label: '📱 Social post', desc: 'Instagram, TikTok, X' },
  { id: 'sms',    label: '💬 SMS / text',  desc: 'Short link with redirect' },
  { id: 'qr',     label: '⬛ QR code',    desc: 'Print-ready or digital' },
  { id: 'email',  label: '✉️ Email',      desc: 'Button or inline link' },
  { id: 'lp',     label: '🔗 Landing page',desc: 'Hosted checkout page' },
];

/* ═══════════════════════════════════════════
   PARTNERS
═══════════════════════════════════════════ */
const PARTNERS_LIST = [
  { id: 'northline',  name: 'Northline Packaging', type: 'Supplier',  spend: '$48,200', risk: 'low',    nextDue: '$4,280 · Apr 22',       roi: 'High' },
  { id: 'peak',       name: 'Peak Logistics',       type: 'Vendor',    spend: '$23,000', risk: 'medium', nextDue: '$1,920 · Apr 21',       roi: 'Medium' },
  { id: 'bright',     name: 'Bright Market Agency', type: 'Agency',    spend: '$120,000',risk: 'high',   nextDue: '$10,000 · Apr 25 ⚠',   roi: 'Unproven' },
  { id: 'ridgefield', name: 'Ridgefield Sales Rep', type: 'Affiliate', spend: '$28,960', risk: 'low',    nextDue: '$2,480 · Friday',       roi: 'Very High' },
];

const PARTNERS_DATA = {
  northline: {
    name: 'Northline Packaging', type: 'Supplier', category: 'Packaging & Materials',
    annualSpend: '$48,200', terms: 'Net 15', onTimeRate: '100%', risk: 'low', concentration: '18%',
    nextObligation: '$4,280 · Apr 22',
    insight: 'Strong relationship. 6/6 invoices paid on time. Eligible for Net 30 negotiation — could free $8,400 in working capital per cycle.',
    actions: ['Request Net 30', 'Automate payment', 'View history'],
  },
  peak: {
    name: 'Peak Logistics', type: 'Vendor', category: 'Freight & Logistics',
    annualSpend: '$23,000', terms: 'Net 15 · Auto-pay', onTimeRate: '94%', risk: 'medium', concentration: '9%',
    nextObligation: '$1,920 · Apr 21',
    insight: 'Cost creep of 11% YoY. Consider bidding Alpine Freight for Q3 — similar transit times at potentially 8% lower rate.',
    actions: ['Compare vendors', 'Request quote', 'View history'],
  },
  bright: {
    name: 'Bright Market Agency', type: 'Agency', category: 'Marketing & Creative',
    annualSpend: '$120,000', terms: 'Net 30', onTimeRate: '—', risk: 'high', concentration: '46%',
    nextObligation: '$10,000 · Apr 25 (unfunded)',
    insight: 'New relationship. No ROI data yet. High concentration — no marketing reserve exists. Delay invoice until reserve is established.',
    actions: ['Delay invoice', 'Create reserve', 'Set ROI target'],
  },
  ridgefield: {
    name: 'Ridgefield Sales Rep', type: 'Affiliate', category: 'Commission Partner',
    annualSpend: '$28,960', terms: 'Weekly · Auto', onTimeRate: '100%', risk: 'low', concentration: '11%',
    nextObligation: '$2,480 · Friday',
    insight: 'Highest ROI partner relationship. Ridgefield SKUs generate 72.5¢ of Available per $1 of revenue — your strongest liquidity contributor.',
    actions: ['Expand SKU line', 'Increase allocation', 'View performance'],
  },
};

/* ═══════════════════════════════════════════
   GROWTH — CAPITAL DEPLOYMENT
═══════════════════════════════════════════ */
const GROWTH_SIGNALS = {
  surplus: '$4,200',
  surplusNote: 'Projected 30-day surplus after all obligations',
  opportunities: [
    {
      id: 'inventory-expand', title: 'Expand Ridgefield inventory depth', category: 'Inventory Growth',
      icon: '📦', amount: '$3,500', risk: 'Low', timeframe: '30–60 days', recommended: true,
      rationale: 'Ridgefield SKUs generate 72.5% liquidity contribution — your highest margin line. Deepening by 40 units reduces stockout risk during Memorial Day lift.',
      expectedReturn: '+$6,200 in projected Available over 60 days',
    },
    {
      id: 'media-reserve', title: 'Seed a paid media reserve', category: 'Channel Expansion',
      icon: '📣', amount: '$2,000', risk: 'Medium', timeframe: '45 days to fund', recommended: false,
      rationale: 'No media reserve exists today. A $2K seed enables Bright Market invoice automation and unlocks the Shopify growth channel.',
      expectedReturn: 'Unlocks $10K marketing campaign safely',
    },
    {
      id: 'yield', title: 'Move operating buffer to yield account', category: 'Treasury Yield',
      icon: '📈', amount: '$4,800', risk: 'None', timeframe: 'Same day', recommended: false,
      rationale: 'Your $4,800 operating buffer sits idle in checking. A high-yield business savings (4.7% APY) generates ~$225/year with no liquidity tradeoff.',
      expectedReturn: '+$225/year passively',
    },
    {
      id: 'debt-payoff', title: 'Accelerate credit line paydown', category: 'Debt Reduction',
      icon: '📉', amount: '$1,200', risk: 'Low', timeframe: 'Immediate', recommended: false,
      rationale: 'Your credit line carries 14.2% APR. Every $1,200 paid down saves $170/year and improves your debt-to-liquidity ratio.',
      expectedReturn: '+$170/year · Improved credit profile',
    },
  ],
  benchmarks: [
    { label: 'Operators like you reinvest', value: '18–24%', note: 'of surplus into inventory during growth' },
    { label: 'Media spend benchmark',        value: '11–14%', note: 'of gross revenue at your margin profile' },
    { label: 'Cash reserve floor',           value: '45 days',note: 'typical for your volume and industry' },
  ],
};

/* ═══════════════════════════════════════════
   PLAN — SIMULATIONS
═══════════════════════════════════════════ */
const SIM_DATA = {
  marketing: {
    badge: 'brisk', bl: 'Not recommended', from: '$42,380', to: '$32,380', toc: 'risk',
    rec: 'Wait for the <strong>4/24 Amazon deposit</strong>. Same $10K spend then becomes safe — Inventory Reserve closes, payroll buffer holds at $3,900.',
    stages: ['Decision', 'Real Cash', 'Reserves Hit', 'Impact', 'Result'],
    cols: [
      { nodes: [{ l: 'Decision',     a: 'Spend $10K', s: 'Marketing now',    c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Real Cash',    a: '$88,540',    s: 'Current',          c: 'hl',       ac: 'neutral' }] },
      { nodes: [{ l: 'Inventory R.', a: '$14,800',    s: 'Short $6,200',     c: 'hl-tight', ac: 'tight' },
                { l: 'Payroll R.',   a: '$11,600',    s: 'Covered',          c: 'hl',       ac: 'neutral' }] },
      { nodes: [{ l: 'Cash out',     a: '–$10,000',   s: 'From Available',   c: 'hl-risk',  ac: 'risk' },
                { l: 'Buffer',       a: '$900',        s: 'Below safe floor', c: 'hl-tight', ac: 'tight' }] },
      { nodes: [{ l: 'Available',    a: '$32,380',    s: 'After scenario',   c: 'hl-risk',  ac: 'risk' }] },
    ],
    paths: [
      { f:[0,0], t:[1,0], c:'var(--blue)',  a:true },
      { f:[1,0], t:[2,0], c:'var(--tight)', a:true },
      { f:[1,0], t:[2,1], c:'rgba(255,255,255,0.1)', a:false },
      { f:[2,0], t:[3,1], c:'var(--tight)', a:true },
      { f:[3,0], t:[4,0], c:'var(--risk)',  a:true },
    ],
  },
  inventory: {
    badge: 'btight', bl: 'Gap closes 4/24', from: '$14,800', to: '$21,000+', toc: 'safe',
    rec: 'The <strong>4/24 Amazon deposit</strong> closes the gap with $2,200 surplus. No action needed.',
    stages: ['Question', 'Now', '4/24 Deposit', 'Gap Status', 'Result'],
    cols: [
      { nodes: [{ l: 'Question',     a: 'Cover order?', s: 'Apr 26 restock',  c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Reserve now',  a: '$14,800',      s: '71% of $21K',     c: 'hl-tight', ac: 'tight' }] },
      { nodes: [{ l: 'Amazon payout',a: '~$8,400',      s: 'Expected Apr 24', c: 'hl-safe',  ac: 'safe' }] },
      { nodes: [{ l: 'Gap closes',   a: '$0',           s: '+$2,200 surplus', c: 'hl-safe',  ac: 'safe' },
                { l: 'Gap today',    a: '–$6,200',      s: 'Current shortfall',c: 'hl-risk', ac: 'risk' }] },
      { nodes: [{ l: 'Order status', a: 'Safe ✓',       s: 'After Apr 24',    c: 'hl-safe',  ac: 'safe' }] },
    ],
    paths: [
      { f:[0,0], t:[1,0], c:'var(--blue)', a:true },
      { f:[1,0], t:[2,0], c:'var(--safe)', a:true },
      { f:[2,0], t:[3,0], c:'var(--safe)', a:true },
      { f:[3,0], t:[4,0], c:'var(--safe)', a:true },
    ],
  },
  delay: {
    badge: 'bsafe', bl: 'Low risk', from: '$42,380', to: '$44,300', toc: 'safe',
    rec: 'Delaying Northline 5 days frees $4,280 and <strong>closes the Inventory Reserve gap</strong> without waiting for the Amazon deposit.',
    stages: ['Decision', 'Obligation Held', 'Reserve Effect', 'Rescheduled', 'Result'],
    cols: [
      { nodes: [{ l: 'Decision',       a: 'Delay Northline', s: '5 days · $4,280', c: 'hl-blue',  ac: 'blue' }] },
      { nodes: [{ l: 'Obligation held',a: '$4,280',          s: 'Until Apr 27',    c: 'hl-tight', ac: 'tight' }] },
      { nodes: [{ l: 'Gap shrinks',    a: '–$1,920',         s: 'From $6,200',     c: 'hl-tight', ac: 'tight' },
                { l: '4/24 deposit',   a: '+$8,400',         s: 'Closes remainder',c: 'hl-safe',  ac: 'safe' }] },
      { nodes: [{ l: 'Pays Apr 27',    a: '$4,280',          s: 'Fully funded',    c: 'hl-safe',  ac: 'safe' }] },
      { nodes: [{ l: 'Available',      a: '$44,300',         s: 'After scenario',  c: 'hl-safe',  ac: 'safe' }] },
    ],
    paths: [
      { f:[0,0], t:[1,0], c:'var(--blue)',  a:true },
      { f:[1,0], t:[2,0], c:'var(--tight)', a:true },
      { f:[1,0], t:[2,1], c:'var(--safe)',  a:true },
      { f:[2,1], t:[3,0], c:'var(--safe)',  a:true },
      { f:[3,0], t:[4,0], c:'var(--safe)',  a:true },
    ],
  },
  payroll: {
    badge: 'bsafe', bl: 'Safe', from: '$11,600', to: 'Safe ✓', toc: 'safe',
    rec: 'Payroll Reserve fully protected with a <strong>$3,900 buffer</strong> above the obligation. Even worst-case, buffer drops to $900 — still covered.',
    stages: ['Question', 'Reserved', 'Coverage', 'Worst Case', 'Result'],
    cols: [
      { nodes: [{ l: 'Question',  a: 'Payroll safe?', s: 'Apr 30',            c: 'hl-blue', ac: 'blue' }] },
      { nodes: [{ l: 'Reserved',  a: '$11,600',       s: 'Auto-managed',      c: 'hl-safe', ac: 'safe' }] },
      { nodes: [{ l: 'Obligation',a: '$11,600',       s: '4 staff + taxes',   c: 'hl',      ac: 'neutral' },
                { l: 'Buffer',    a: '+$3,900',       s: 'Above obligation',  c: 'hl-safe', ac: 'safe' }] },
      { nodes: [{ l: 'If $10K',   a: '$900 buffer',  s: 'Still covered',     c: 'hl-tight',ac: 'tight' }] },
      { nodes: [{ l: 'Apr 30',    a: 'Safe ✓',       s: 'Fully covered',     c: 'hl-safe', ac: 'safe' }] },
    ],
    paths: [
      { f:[0,0], t:[1,0], c:'var(--blue)',  a:true },
      { f:[1,0], t:[2,1], c:'var(--safe)',  a:true },
      { f:[2,1], t:[3,0], c:'var(--tight)', a:true },
      { f:[3,0], t:[4,0], c:'var(--safe)',  a:true },
    ],
  },
};

/* ═══════════════════════════════════════════
   DEALS / SKU DATA (Revenue screen)
═══════════════════════════════════════════ */
const PLATS = [
  { id: 'shopify',   name: 'Shopify',   total: '$24,200', raw: 24200, sub: '14 orders', bar: 49 },
  { id: 'amazon',    name: 'Amazon',    total: '$18,800', raw: 18800, sub: '3 payouts', bar: 38 },
  { id: 'wholesale', name: 'Wholesale', total: '$6,600',  raw: 6600,  sub: '2 POs',    bar: 13 },
];
const DEALS = {
  shopify:   [{ id:'SHP-4471',date:'Apr 17',amt:'$8,400',skus:['NF-RIDGE-01','NF-PACK-02','NF-LABEL-03']},{id:'SHP-4468',date:'Apr 16',amt:'$5,200',skus:['NF-RIDGE-01','NF-PACK-02']},{id:'SHP-4462',date:'Apr 15',amt:'$4,800',skus:['NF-LABEL-03','NF-PACK-02']},{id:'SHP-4455',date:'Apr 14',amt:'$3,900',skus:['NF-RIDGE-01']}],
  amazon:    [{ id:'AMZ-B7712',date:'Apr 17',amt:'$9,400',skus:['NF-RIDGE-01','NF-PACK-02']},{id:'AMZ-B7698',date:'Apr 14',amt:'$5,800',skus:['NF-RIDGE-01']},{id:'AMZ-B7681',date:'Apr 12',amt:'$3,600',skus:['NF-PACK-02','NF-LABEL-03']}],
  wholesale: [{ id:'WS-221',  date:'Apr 16',amt:'$4,200',skus:['NF-RIDGE-01','NF-PACK-02']},{id:'WS-219',date:'Apr 11',amt:'$2,400',skus:['NF-PACK-02']}],
};
const SKU_DATA = {
  'NF-RIDGE-01': { name: 'Ridgefield Pro Bundle',    allocs:[{n:'Inventory Reserve',p:14,c:'var(--tight)'},{n:'Commission Reserve',p:5,c:'var(--blue)'},{n:'Tax Reserve',p:8.5,c:'var(--t4)'},{n:'Available',p:72.5,c:'var(--safe)'}] },
  'NF-PACK-02':  { name: 'Packaging Essentials Kit', allocs:[{n:'Inventory Reserve',p:18,c:'var(--tight)'},{n:'Tax Reserve',p:8.5,c:'var(--t4)'},{n:'Available',p:73.5,c:'var(--safe)'}] },
  'NF-LABEL-03': { name: 'Label & Finish Pack',      allocs:[{n:'Inventory Reserve',p:14,c:'var(--tight)'},{n:'Tax Reserve',p:8.5,c:'var(--t4)'},{n:'Available',p:77.5,c:'var(--safe)'}] },
};
const DEAL_AMTS = {
  'SHP-4471':{'NF-RIDGE-01':5800,'NF-PACK-02':1600,'NF-LABEL-03':1000},
  'SHP-4468':{'NF-RIDGE-01':3200,'NF-PACK-02':2000},
  'SHP-4462':{'NF-LABEL-03':2100,'NF-PACK-02':2700},
  'SHP-4455':{'NF-RIDGE-01':3900},
  'AMZ-B7712':{'NF-RIDGE-01':6200,'NF-PACK-02':3200},
  'AMZ-B7698':{'NF-RIDGE-01':5800},
  'AMZ-B7681':{'NF-PACK-02':2100,'NF-LABEL-03':1500},
  'WS-221':{'NF-RIDGE-01':2800,'NF-PACK-02':1400},
  'WS-219':{'NF-PACK-02':2400},
};

/* ═══════════════════════════════════════════
   SPEND — INVOICE DATA
═══════════════════════════════════════════ */
const INV_DATA = {
  northline:{ ctx:'Northline Packaging', title:'Northline Packaging', sub:'PO-linked packaging · Recorded in QuickBooks · Inventory Reserve', badge:'btight', bl:'Ready to pay',
    rows:[{l:'What Noodleflow did',bc:'binfo',bb:'Auto-processed',b:'Read invoice email, extracted amount and due date, matched to accounting, mapped to Inventory Reserve.'},{l:'Reserve status',bc:'btight',bb:'Tight',b:'Reserve is short $6,200. Can be paid now but restock obligation may not fully clear.'},{l:'Recommended action',bc:'bsafe',bb:'Pay now',b:'Pay today. Delay Bright Market until Inventory Reserve clears Thursday.'}]},
  peak:     { ctx:'Peak Logistics', title:'Peak Logistics', sub:'Recurring freight · Auto-pay enabled · Vendor Reserve', badge:'binfo', bl:'Waiting approval',
    rows:[{l:'What Noodleflow did',bc:'binfo',bb:'Auto-matched',b:'Recognized from prior invoices, queued for auto-approval from Vendor Reserve.'},{l:'Scheduled',bc:'bsafe',bb:'Apr 21 @ 9AM',b:'$1,920 sends automatically. One-click approval gate active.'}]},
  bright:   { ctx:'Bright Market Agency', title:'Bright Market Agency', sub:'Campaign invoice · No reserve exists · Unfunded', badge:'brisk', bl:'Unfunded',
    rows:[{l:'Reserve gap',bc:'brisk',bb:'No reserve',b:'No marketing reserve exists. Paying from Available compresses Inventory and Payroll reserves.'},{l:'Recommended action',bc:'btight',bb:'Delay',b:'Hold until Thursday. Then create a Marketing Reserve before approving future campaigns.'}]},
  summit:   { ctx:'Summit Labels', title:'Summit Labels', sub:'Already paid · Synced to QuickBooks', badge:'bsafe', bl:'Paid',
    rows:[{l:'Completed',bc:'bsafe',bb:'Apr 18',b:'$2,860 paid from Inventory Reserve. Confirmation sent automatically.'},{l:'Accounting',bc:'bsafe',bb:'Recorded',b:'Synced to QuickBooks within 2 hours.'}]},
};

/* ═══════════════════════════════════════════
   BANKING — ACCOUNTS & ACTIVITY
═══════════════════════════════════════════ */
const BK_ACCOUNTS = [
  { id:'checking', name:'Business Checking', balance:'$62,140', type:'Checking', last4:'4821', status:'primary' },
  { id:'savings',  name:'Business Savings',  balance:'$24,800', type:'Savings',  last4:'7703', status:'yield' },
  { id:'reserve',  name:'Operating Reserve', balance:'$4,800',  type:'Reserve',  last4:'3390', status:'locked' },
  { id:'credit',   name:'Business Credit',   balance:'$40,000', type:'Credit',   last4:'9911', status:'available' },
];
const BK_RECENT = [
  { date:'Apr 17', desc:'Amazon Marketplace payout',  amount:'+$8,400',  cat:'Revenue',  matched:true  },
  { date:'Apr 17', desc:'Shopify payout',              amount:'+$5,200',  cat:'Revenue',  matched:true  },
  { date:'Apr 16', desc:'Peak Logistics — freight',   amount:'–$1,920',  cat:'Vendor',   matched:true  },
  { date:'Apr 15', desc:'Summit Labels — packaging',  amount:'–$2,860',  cat:'Supplier', matched:true  },
  { date:'Apr 14', desc:'Shopify payout',             amount:'+$4,800',  cat:'Revenue',  matched:true  },
  { date:'Apr 14', desc:'Google Ads charge',          amount:'–$840',    cat:'Marketing',matched:false },
  { date:'Apr 13', desc:'Payroll ACH',                amount:'–$11,600', cat:'Payroll',  matched:true  },
  { date:'Apr 12', desc:'Amazon FBA fees',            amount:'–$1,240',  cat:'Platform', matched:true  },
];

/* ═══════════════════════════════════════════
   ASK — BENCHMARKING CHAT RESPONSES
═══════════════════════════════════════════ */
const CHAT = {
  'What can I safely spend this week?': {
    u: 'What can I safely spend this week?',
    a: '<strong>$42,380 — with one constraint.</strong><br><br>Clear of all reserves and obligations. Leave at least $6,200 unspent before Apr 24 so Inventory Reserve closes without a gap.<br><br><em style="color:var(--t3);font-size:0.9em;">Benchmark: Operators at your volume typically maintain 18–22% of Available as a discretionary floor before committing to new spend.</em>',
  },
  'Which vendors should be paid today?': {
    u: 'Which vendors should I pay today?',
    a: '<strong>Two are time-sensitive.</strong><br><br>Peak Logistics ($1,920) is due today and auto-scheduled — no action needed. Northline Packaging ($4,280) is due tomorrow and ready to confirm. Hold Bright Market Agency until Thursday.',
  },
  'Why is inventory tight?': {
    u: 'Why is inventory tight?',
    a: '<strong>Revenue timing, not revenue volume.</strong><br><br>Strong sales week but the Amazon payout doesn\'t settle until Apr 24 — two days after your order window opens. $14,800 covers 71% of the obligation. The gap closes automatically when the deposit hits.<br><br><em style="color:var(--t3);font-size:0.9em;">Similar operators resolve this by negotiating Net 30 with primary suppliers — buys an extra 15 days of cash runway per cycle.</em>',
  },
  'How much of Amazon goes to taxes?': {
    u: 'How much of Amazon goes to taxes?',
    a: '<strong>8.5% of eligible deposits — auto-separated at receipt.</strong><br><br>For your average $8,400 Amazon payout, that\'s ~$714 per cycle. Rate increases in May to hit the $16,200 Q2 obligation by May 15.<br><br><em style="color:var(--t3);font-size:0.9em;">Your margin profile typically warrants 9–11% tax reserves. You\'re slightly below — consider reviewing after Q2 filing.</em>',
  },
  'What if I delay the payroll bonus?': {
    u: 'What if I delay the payroll bonus?',
    a: '<strong>Available goes up $2,500 immediately.</strong><br><br>That alone nearly closes the Inventory Reserve gap. Noodleflow can auto-trigger the bonus payout once Inventory is fully funded if you want to sequence it that way.',
  },
};

/* ═══════════════════════════════════════════
   BUCKET CREATION INTENTS (kept)
═══════════════════════════════════════════ */
const INTENT_REC = {
  inventory: { title: 'Noodleflow recommends: Inventory Expansion Reserve', desc: 'Fund from Amazon and Shopify deposits after current inventory holdback. Target: $15,000. Timeline: ~3 weeks.' },
  marketing:  { title: 'Noodleflow recommends: Marketing Reserve',           desc: 'Fund from Amazon deposits after other reserves. Target: $10,000. Timeline: ~3–4 weeks. Reduces Available ~$420/week.' },
  hire:       { title: 'Noodleflow recommends: Payroll Expansion Reserve',   desc: 'Fund from all product revenue at 3% rate. Target: $4,200/month. Timeline: 6–8 weeks.' },
  invest:     { title: 'Noodleflow recommends: Investment Reserve',          desc: 'Fund from operating buffer overages + 2% Shopify holdback. Target: $20,000. Timeline: 8–10 weeks.' },
  owner:      { title: 'Noodleflow recommends: Owner Draw Reserve',          desc: 'Fund from net Available after all obligations. Weekly cap $2,500 to maintain safe levels.' },
  other:      { title: 'Noodleflow recommends: Custom Reserve',              desc: 'Describe your goal and Noodleflow will determine the right funding source and holdback rate.' },
};

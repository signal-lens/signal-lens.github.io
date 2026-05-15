/* ============================================================
   SIGNAL LENS · Showcase site interactivity
   ============================================================ */

// ---- Count-up animation for hero stats and gauges ----------

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = easeOutCubic(progress);
    el.textContent = Math.round(eased * target).toString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function animateAllCounts(root = document) {
  root.querySelectorAll('[data-count]').forEach((el) => {
    if (el.dataset.counted === '1') return;
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    el.dataset.counted = '1';
    animateCount(el, target);
  });
}

function animateAllGaugeFills(root = document) {
  // Old .gauge__fill bars are gone now, but keep the selector around in case
  // we reintroduce small gauges later. The new unified IntegrityScore card
  // animates via .integrity-card__fill, which we drive separately here.
  root.querySelectorAll('.gauge__fill, .integrity-card__fill').forEach((el) => {
    if (el.dataset.filled === '1') return;
    el.dataset.filled = '1';
    const pct = Number(el.dataset.pct) || 0;
    requestAnimationFrame(() => { el.style.width = pct + '%'; });
  });
}

// ---- Reveal on scroll --------------------------------------

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateAllCounts(entry.target);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section, .hero').forEach((el) => {
  el.classList.add('fade-in');
  revealObserver.observe(el);
});

// Hero stats animate on load
window.addEventListener('load', () => {
  animateAllCounts(document.querySelector('.hero__stats'));
});

// ---- Demo simulator ----------------------------------------

const runBtn      = document.getElementById('runBtn');
const deepBtn     = document.getElementById('deepBtn');
const resetBtn    = document.getElementById('resetBtn');
const rtlBtn      = document.getElementById('rtlBtn');
const emptyState  = document.getElementById('emptyState');
const quickResult = document.getElementById('quickResult');
const deepResult  = document.getElementById('deepResult');
const sidepanel   = document.getElementById('sidepanel');
const article     = document.getElementById('demoArticle');
const langCurrent = document.getElementById('langCurrent');
const tldrBody    = document.getElementById('tldrBody');
const outletInfo  = document.getElementById('outletInfo');
const biasNeedle  = document.getElementById('biasNeedle');

const i18n = {
  EN: {
    placeholder: 'Side panel ready. Click <strong>Run Quick Read</strong> below to start.',
    verdictTitle: 'Read carefully',
    outlet: 'Example News · Right-Wing · trust 42',
    tldr: 'A House bill on parental rights passed this week along party lines. The column frames it as an existential threat using loaded language and generalizations.',
    runText: '▶ Run Quick Read',
    runDoneText: '✓ Quick Read complete',
    deepText: 'Deep Analysis with Gemini',
    langSwitchBtn: 'حالت فارسی · RTL',
    timelineLabel: 'STORY TIMELINE',
    steelmanLabel: 'THE OTHER SIDE',
    tldrLabel: '30-SECOND TL;DR',
    flagsLabel: 'QUICK FLAGS · LOCAL PATTERN MATCH',
    biasLabel: 'BIAS SPECTRUM',
    leftLeg: 'Left', centerLeg: 'Center', rightLeg: 'Right',
    integrityTitle: 'INTEGRITY LEVEL',
    integrityExpand: 'How is this calculated?',
    bdOutlet: 'Outlet track record',
    bdFraming: 'Calm framing',
    bdHeadline: 'Honest headline',
    formula: "Integrity blends the outlet's public track record (50%) with how calmly the article is framed (25%) and how honest the headline is (25%). Higher is better.",
    factsLabel: 'GROUNDED FACTS',
    sentimentLabel: 'WHAT PEOPLE ARE SAYING',
  },
  FA: {
    placeholder: 'پنل آماده است. روی <strong>تحلیل سریع</strong> کلیک کنید.',
    verdictTitle: 'با دقت بخوانید',
    outlet: 'خبر نمونه · راست‌گرا · اعتبار ۴۲',
    tldr: 'لایحه‌ای درباره حقوق والدین این هفته در مجلس به تصویب رسید. ستون با استفاده از زبان احساسی، آن را به عنوان تهدیدی وجودی نشان می‌دهد.',
    runText: '▶ تحلیل سریع',
    runDoneText: '✓ تحلیل سریع انجام شد',
    deepText: 'تحلیل عمیق با Gemini',
    langSwitchBtn: 'English mode',
    timelineLabel: 'تاریخچه داستان',
    steelmanLabel: 'طرف مقابل',
    tldrLabel: 'خلاصه ۳۰ ثانیه‌ای',
    flagsLabel: 'پرچم‌های سریع',
    biasLabel: 'طیف سوگیری',
    leftLeg: 'چپ', centerLeg: 'میانه', rightLeg: 'راست',
    integrityTitle: 'سطح اعتبار',
    integrityExpand: 'این چگونه محاسبه می‌شود؟',
    bdOutlet: 'سابقه منبع خبری',
    bdFraming: 'لحن آرام',
    bdHeadline: 'تیتر صادقانه',
    formula: 'اعتبار از ترکیب سابقه عمومی منبع (۵۰٪)، آرامش لحن مقاله (۲۵٪) و صداقت تیتر (۲۵٪) به‌دست می‌آید. عدد بالاتر بهتر است.',
    factsLabel: 'حقایق تأیید شده',
    sentimentLabel: 'مردم چه می‌گویند',
  },
};

let currentLang = 'EN';

function applyLanguage(lang) {
  currentLang = lang;
  const t = i18n[lang];
  langCurrent.textContent = lang === 'EN' ? 'EN' : 'فا';
  sidepanel.setAttribute('dir', lang === 'FA' ? 'rtl' : 'ltr');
  if (rtlBtn) rtlBtn.textContent = t.langSwitchBtn;
  if (runBtn) {
    runBtn.textContent = quickResult.hidden ? t.runText : t.runDoneText;
  }
  document.querySelector('.sidepanel__placeholder').innerHTML = t.placeholder;
  document.querySelector('.verdict__title').textContent = t.verdictTitle;
  outletInfo.textContent = t.outlet;
  tldrBody.textContent = t.tldr;
  document.querySelector('.tldr__label').textContent = t.tldrLabel;
  document.querySelector('.quickflags__label').textContent = t.flagsLabel;
  document.querySelector('.bias-spectrum__label').textContent = t.biasLabel;
  document.querySelector('.steelman__label').lastChild.textContent = ' ' + t.steelmanLabel;
  document.querySelector('.timeline__label').textContent = t.timelineLabel;
  const integTitle = document.querySelector('.integrity-card__title span');
  if (integTitle) integTitle.textContent = t.integrityTitle;
  const integExpand = document.getElementById('integrityExpandLabel');
  if (integExpand) integExpand.firstChild.textContent = t.integrityExpand + ' ';
  const bdOutlet  = document.getElementById('bdOutletLabel');
  const bdFraming = document.getElementById('bdFramingLabel');
  const bdHeadline = document.getElementById('bdHeadlineLabel');
  if (bdOutlet)   bdOutlet.textContent   = t.bdOutlet;
  if (bdFraming)  bdFraming.textContent  = t.bdFraming;
  if (bdHeadline) bdHeadline.textContent = t.bdHeadline;
  const formula = document.getElementById('integrityFormula');
  if (formula) formula.textContent = t.formula;
  const factsLabel = document.querySelector('.facts__label');
  if (factsLabel) factsLabel.lastChild.textContent = ' ' + t.factsLabel;
  const sentimentLabel = document.querySelector('.sentiment__label');
  if (sentimentLabel) sentimentLabel.lastChild.textContent = ' ' + t.sentimentLabel;
  const legs = document.querySelectorAll('.bias-spectrum__legend span');
  legs[0].textContent = t.leftLeg;
  legs[1].textContent = t.centerLeg;
  legs[2].textContent = t.rightLeg;
  if (deepBtn) {
    const labelNode = [...deepBtn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    if (labelNode) labelNode.textContent = ' ' + t.deepText;
  }
}

function resetDemo() {
  emptyState.hidden = false;
  quickResult.hidden = true;
  deepResult.hidden = true;
  // reset score bars + numbers
  document.querySelectorAll('.gauge__fill, .integrity-card__fill').forEach((el) => {
    el.style.width = '0%';
    el.dataset.filled = '0';
  });
  document.querySelectorAll('.gauge__num, .integrity-card__num').forEach((el) => {
    el.textContent = '0';
    el.dataset.counted = '0';
  });
  // collapse integrity breakdown if open
  const bd = document.getElementById('integrityBreakdown');
  const toggle = document.getElementById('integrityToggle');
  if (bd && toggle) {
    bd.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    const chevron = document.getElementById('integrityChevron');
    if (chevron) chevron.style.transform = '';
  }
  // reset article overlay
  article.querySelectorAll('.article__sentence').forEach((s) => s.classList.remove('flagged'));
  // reset bias needle
  if (biasNeedle) biasNeedle.style.left = '50%';
  runBtn.textContent = i18n[currentLang].runText;
  runBtn.disabled = false;
}

function runQuickRead() {
  emptyState.hidden = true;
  quickResult.hidden = false;
  deepResult.hidden = true;
  // animate count-ups + bar fills inside the side panel
  animateAllCounts(quickResult);
  animateAllGaugeFills(quickResult);
  runBtn.textContent = i18n[currentLang].runDoneText;
}

function runDeep() {
  deepResult.hidden = false;
  // bias needle moves to ~75% (right-wing)
  setTimeout(() => {
    if (biasNeedle) biasNeedle.style.left = '78%';
  }, 100);
  // article fallacy underlines fade in
  const sentences = article.querySelectorAll('.article__sentence');
  sentences.forEach((s, i) => {
    setTimeout(() => s.classList.add('flagged'), 400 + i * 280);
  });
  // gentle scroll inside the side panel
  setTimeout(() => {
    deepResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);
}

if (runBtn) runBtn.addEventListener('click', () => {
  if (quickResult.hidden) {
    runQuickRead();
  } else if (deepResult.hidden) {
    runDeep();
  }
});

if (deepBtn) deepBtn.addEventListener('click', runDeep);

if (resetBtn) resetBtn.addEventListener('click', resetDemo);

if (rtlBtn) rtlBtn.addEventListener('click', () => {
  applyLanguage(currentLang === 'EN' ? 'FA' : 'EN');
});

// language toggle inside the side panel header is also clickable
const sidepanelLang = document.getElementById('langToggle');
if (sidepanelLang) sidepanelLang.addEventListener('click', () => {
  applyLanguage(currentLang === 'EN' ? 'FA' : 'EN');
});

// Click-to-expand on the Integrity Level card reveals the three component
// scores (outlet trust, framing, headline) plus the plain-English formula.
const integrityToggle = document.getElementById('integrityToggle');
if (integrityToggle) {
  integrityToggle.addEventListener('click', () => {
    const bd = document.getElementById('integrityBreakdown');
    const chevron = document.getElementById('integrityChevron');
    if (!bd) return;
    const open = bd.hidden;
    bd.hidden = !open;
    integrityToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
  });
}

// ---- Smooth nav scroll ------------------------------------

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

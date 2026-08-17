(() => {
  const ROOT = location.pathname.includes('/Shoosh/') ? '/Shoosh/' : '/';
  let registryPromise;
  const registry = () => registryPromise ||= fetch(`${ROOT}data/supporting-media.json`, {cache:'no-cache'}).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  const isAr = () => document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';

  function makePrice(entry) {
    const value = isAr() ? entry?.priceNoteAr : entry?.priceNoteEn;
    if (!value) return null;
    const p = document.createElement('p');
    p.className = 'price-note';
    p.dataset.priceNote = '1';
    const b = document.createElement('strong');
    b.textContent = isAr() ? 'ملاحظة الأسعار التاريخية: ' : 'Historical price note: ';
    p.append(b, document.createTextNode(value));
    return p;
  }

  async function enhance() {
    const root = document.querySelector('[data-story]');
    if (!root || !root.querySelector('.story-body')) return;
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) return;

    const all = await registry();
    const entry = all[slug];
    const prose = root.querySelector('.prose');

    if (entry && prose && !prose.querySelector('[data-price-note]')) {
      const dishList = prose.querySelector('.dish-list');
      const price = makePrice(entry);
      if (price && dishList) dishList.insertAdjacentElement('afterend', price);
    }

    // One-photo rule: the story hero is the single destination image. No repeated supporting gallery.
    root.querySelectorAll('[data-supporting-media], .destination-showcase').forEach(node => node.remove());

    const visual = root.querySelector('.story-visual');
    if (visual && !visual.querySelector('.original-badge')) {
      const badge = document.createElement('span');
      badge.className = 'original-badge';
      badge.textContent = isAr() ? 'تجربة شوش' : 'Shoosh experience';
      visual.append(badge);
    } else if (visual) {
      const badge = visual.querySelector('.original-badge');
      if (badge) badge.textContent = isAr() ? 'تجربة شوش' : 'Shoosh experience';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enhance, 80);
    const root = document.querySelector('[data-story]');
    if (root) new MutationObserver(() => setTimeout(enhance, 20)).observe(root, {childList:true, subtree:true});
  });
})();

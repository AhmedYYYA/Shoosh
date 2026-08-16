(() => {
  const ROOT = location.pathname.includes('/Shoosh/') ? '/Shoosh/' : '/';
  let registryPromise;
  const registry = () => registryPromise ||= fetch(`${ROOT}data/supporting-media.json`, {cache:'no-cache'}).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  const isAr = () => document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';

  function makeSupport(entry, title) {
    if (!entry?.officialMedia?.image) return null;
    const section = document.createElement('section');
    section.className = 'support-media';
    section.dataset.supportingMedia = '1';
    const eyebrow = document.createElement('div');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = isAr() ? 'من المكان' : 'FROM THE PLACE';
    const figure = document.createElement('figure');
    figure.className = 'support-figure';
    const img = document.createElement('img');
    img.src = entry.officialMedia.image;
    img.alt = `${title} — ${isAr() ? 'صورة مساندة للمكان' : 'supporting venue image'}`;
    img.loading = 'lazy'; img.decoding = 'async';
    img.onerror = () => { figure.hidden = true; };
    const cap = document.createElement('figcaption');
    const strong = document.createElement('strong');
    strong.textContent = entry.officialMedia.credit || (isAr() ? 'صورة مساندة' : 'Supporting image');
    const note = document.createElement('span');
    note.className = 'support-media-note';
    note.textContent = isAr() ? 'صورة مساندة من مصدر منفصل ومذكور بوضوح؛ لا تُعرض على أنها من تصوير سوش.' : 'Supporting media from a separately credited source; it is not presented as a photograph taken by Shoosh.';
    cap.append(strong, note);
    if (entry.officialMedia.page) {
      const a = document.createElement('a'); a.href = entry.officialMedia.page; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = isAr() ? 'عرض مصدر الصورة ↗' : 'View media source ↗'; cap.append(a);
    }
    figure.append(img, cap); section.append(eyebrow, figure); return section;
  }

  function makePrice(entry) {
    const value = isAr() ? entry?.priceNoteAr : entry?.priceNoteEn;
    if (!value) return null;
    const p = document.createElement('p'); p.className = 'price-note'; p.dataset.priceNote = '1';
    const b = document.createElement('strong'); b.textContent = isAr() ? 'ملاحظة الأسعار التاريخية: ' : 'Historical price note: ';
    p.append(b, document.createTextNode(value)); return p;
  }

  async function enhance() {
    const root = document.querySelector('[data-story]');
    if (!root || !root.querySelector('.story-body')) return;
    if (root.querySelector('[data-supporting-media]')) return;
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) return;
    const all = await registry(); const entry = all[slug]; if (!entry) return;
    const prose = root.querySelector('.prose'); if (!prose) return;
    const dishList = prose.querySelector('.dish-list');
    const price = makePrice(entry); if (price && dishList) dishList.insertAdjacentElement('afterend', price);
    const source = prose.querySelector('.source-note');
    const support = makeSupport(entry, root.querySelector('.story-title h1')?.textContent || slug);
    if (support) source ? source.insertAdjacentElement('beforebegin', support) : prose.append(support);
    const visual = root.querySelector('.story-visual');
    if (visual && !visual.querySelector('.original-badge')) {
      const badge=document.createElement('span'); badge.className='original-badge'; badge.textContent=isAr()?'من تجربة سوش':'Shoosh original experience'; visual.append(badge);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enhance, 80);
    const root = document.querySelector('[data-story]');
    if (root) new MutationObserver(() => setTimeout(enhance, 20)).observe(root,{childList:true,subtree:true});
  });
})();

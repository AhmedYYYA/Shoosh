(() => {
  const ROOT = location.pathname.includes('/Shoosh/') ? '/Shoosh/' : '/';
  const state = { posts: [], lang: localStorage.getItem('shoosh-lang') || 'en' };
  const text = {
    en: {
      home:'Home', journal:'Journal', about:'About', explore:'Explore the journal', latest:'Latest stories', all:'All', search:'Search venue, cuisine or place…', city:'All cities', category:'All worlds', year:'All years', stories:'stories', read:'Read the story', note:'Shoosh’s note', tried:'What Shoosh tried', reservation:'Reservation', location:'Location', cuisine:'Cuisine / type', date:'Visited', source:'Source', sourceValue:'Shoosh original Instagram post', none:'No items were listed in the supplied post.', related:'Continue the orbit', facts:'At a glance', back:'Back to journal', aed:'AED', bookNone:'No reservation guidance was recorded in the supplied post.', identity:'Brand identity', language:'عربي'
    },
    ar: {
      home:'الرئيسية', journal:'اليوميات', about:'الهوية', explore:'استكشف اليوميات', latest:'أحدث القصص', all:'الكل', search:'ابحث عن مطعم أو مطبخ أو مكان…', city:'كل المدن', category:'كل العوالم', year:'كل السنوات', stories:'تجربة', read:'اقرأ القصة', note:'ملاحظة سوش', tried:'ماذا جرّبت سوش', reservation:'الحجز', location:'الموقع', cuisine:'المطبخ / النوع', date:'تاريخ الزيارة', source:'المصدر', sourceValue:'منشور سوش الأصلي على إنستغرام', none:'لم تُذكر عناصر محددة في المنشور الم supplied.', related:'أكمل المدار', facts:'في لمحة', back:'العودة إلى اليوميات', aed:'درهم', bookNone:'لم تُسجل ملاحظة خاصة بالحجز في المنشور الم supplied.', identity:'هوية العلامة', language:'English'
    }
  };

  const t = key => text[state.lang][key] || key;
  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const url = path => ROOT + path.replace(/^\//,'');
  const storyUrl = slug => `${url('story/')}?slug=${encodeURIComponent(slug)}`;
  const isAr = () => state.lang === 'ar';
  const summary = p => isAr() ? (p.summaryAr || p.summaryEn) : (p.summaryEn || p.summaryAr);
  const reservation = p => p.reservation || t('bookNone');

  async function data() {
    if (state.posts.length) return state.posts;
    const res = await fetch(url('data/posts.json'), { cache:'no-cache' });
    if (!res.ok) throw new Error(`Content ${res.status}`);
    state.posts = await res.json();
    return state.posts;
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isAr());
    document.querySelectorAll('[data-en][data-ar]').forEach(el => { el.textContent = isAr() ? el.dataset.ar : el.dataset.en; });
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-lang-toggle]').forEach(el => { el.textContent = t('language'); });
  }

  function bindLanguage() {
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => btn.addEventListener('click', () => {
      state.lang = isAr() ? 'en' : 'ar';
      localStorage.setItem('shoosh-lang', state.lang);
      applyLanguage();
      renderPage();
    }));
  }

  function card(p, feature=false) {
    if (feature) return `<a class="feature-card ${p.featured ? 'big':''}" href="${storyUrl(p.slug)}"><span class="media" data-media="${esc(p.slug)}"></span><span class="shade"></span><span class="feature-copy"><span class="eyebrow">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.city)} · ${esc(p.area || '')}</p></span></a>`;
    const tags = (p.moods || []).slice(0,3).map(x => `<span class="tag">${esc(x)}</span>`).join('');
    return `<article class="journal-card" data-entry data-city="${esc(p.city)}" data-category="${esc(p.category)}" data-year="${esc(p.year)}" data-search="${esc([p.title,p.city,p.area,p.cuisine,summary(p)].join(' '))}"><a href="${storyUrl(p.slug)}" aria-label="${esc(p.title)}"><div class="card-media"><span class="media" data-media="${esc(p.slug)}"></span></div><div class="card-body"><div class="card-top"><span class="category">${esc(p.category)}</span><span class="place">${esc(p.city)} · ${esc(p.year)}</span></div><h3>${esc(p.title)}</h3><p>${esc(summary(p))}</p><div class="meta-row">${tags}</div></div></a></article>`;
  }

  async function renderFeatured() {
    const target = document.querySelector('[data-featured]');
    if (!target) return;
    const posts = await data();
    const chosen = posts.filter(p => p.featured).slice(0,5);
    target.innerHTML = chosen.map((p,i) => card({...p,featured:i===0}, true)).join('');
    window.ShooshMedia?.hydrate(target);
  }

  function options(values,label) {
    return `<option value="">${esc(label)}</option>` + [...new Set(values)].filter(Boolean).sort((a,b)=>String(a).localeCompare(String(b))).map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
  }

  async function renderJournal() {
    const grid = document.querySelector('[data-journal]');
    if (!grid) return;
    const posts = await data();
    const q = document.querySelector('[data-search]');
    const city = document.querySelector('[data-city]');
    const category = document.querySelector('[data-category]');
    const year = document.querySelector('[data-year]');
    if (city && !city.dataset.ready) { city.innerHTML=options(posts.map(p=>p.city),t('city')); city.dataset.ready='1'; }
    if (category && !category.dataset.ready) { category.innerHTML=options(posts.map(p=>p.category),t('category')); category.dataset.ready='1'; }
    if (year && !year.dataset.ready) { year.innerHTML=options(posts.map(p=>p.year),t('year')); year.dataset.ready='1'; }
    const filter = () => {
      const term=(q?.value||'').trim().toLowerCase();
      const filtered=posts.filter(p => (!term || [p.title,p.city,p.area,p.cuisine,p.summaryEn,p.summaryAr].join(' ').toLowerCase().includes(term)) && (!city?.value || p.city===city.value) && (!category?.value || p.category===category.value) && (!year?.value || String(p.year)===year.value));
      grid.innerHTML=filtered.length?filtered.map(p=>card(p)).join(''):`<div class="empty">No matching stories.</div>`;
      const count=document.querySelector('[data-count]'); if(count) count.textContent=`${filtered.length} ${t('stories')}`;
      window.ShooshMedia?.hydrate(grid);
    };
    [q,city,category,year].forEach(el => el && el.addEventListener(el===q?'input':'change',filter));
    filter();
  }

  function setMeta(p) {
    document.title = `${p.title} — Shoosh`;
    const d=document.querySelector('meta[name="description"]'); if(d) d.content=summary(p).slice(0,155);
    const canonical=document.querySelector('link[rel="canonical"]'); if(canonical) canonical.href=`https://ahmedyyya.github.io/Shoosh/story/?slug=${encodeURIComponent(p.slug)}`;
    const ld={"@context":"https://schema.org","@type":"BlogPosting",headline:p.title,datePublished:p.year?`${p.year}-01-01`:undefined,description:summary(p),author:{"@type":"Person",name:"Shoosh"},publisher:{"@type":"Organization",name:"Shoosh"}};
    const node=document.getElementById('story-schema'); if(node) node.textContent=JSON.stringify(ld);
  }

  async function renderStory() {
    const root=document.querySelector('[data-story]'); if(!root) return;
    const posts=await data();
    const slug=new URLSearchParams(location.search).get('slug') || posts[0]?.slug;
    const p=posts.find(x=>x.slug===slug);
    if(!p){root.innerHTML='<div class="shell section"><h1>Story not found.</h1></div>';return;}
    setMeta(p);
    const dishes=(p.dishes||[]).length ? p.dishes.map(d=>`<div class="dish"><span>${esc(d.name)}</span><span>${d.price==null?'—':`${esc(d.price)} ${t('aed')}`}</span></div>`).join('') : `<p>${esc(t('none'))}</p>`;
    root.innerHTML=`<section class="story-hero"><div class="shell story-grid"><div class="story-visual"><span class="media" data-media="${esc(p.slug)}"></span></div><div class="story-title"><div class="story-kicker"><span>${esc(p.category)}</span><span>${esc(p.city)}</span><span>${esc(p.year)}</span></div><div class="eyebrow">SHOOSH JOURNAL</div><h1>${esc(p.title)}</h1><p class="lead">${esc(summary(p))}</p><a class="button" href="${url('journal/')}">← ${esc(t('back'))}</a></div></div></section><section class="story-body"><div class="shell story-columns"><article class="prose"><div class="eyebrow">${esc(t('note'))}</div><div class="quote">${esc(summary(p))}</div>${p.summaryAr?`<h2>من المنشور</h2><p lang="ar" dir="rtl">${esc(p.summaryAr)}</p>`:''}<h2>${esc(t('tried'))}</h2><div class="dish-list">${dishes}</div><h2>${esc(t('reservation'))}</h2><p>${esc(reservation(p))}</p><div class="source-note"><strong>${esc(t('source'))}:</strong> ${esc(t('sourceValue'))}. Dish names, prices and practical notes are preserved from the supplied Shoosh content; no rating is invented.</div></article><aside class="facts"><h3>${esc(t('facts'))}</h3><div class="fact"><small>${esc(t('location'))}</small><strong>${esc([p.area,p.city].filter(Boolean).join(' · '))}</strong></div><div class="fact"><small>${esc(t('cuisine'))}</small><strong>${esc(p.cuisine||p.category)}</strong></div><div class="fact"><small>${esc(t('date'))}</small><strong>${esc([p.date,p.year].filter(Boolean).join(' · '))}</strong></div><div class="fact"><small>${esc(t('reservation'))}</small><strong>${esc(reservation(p))}</strong></div></aside></div></section><section class="section dark"><div class="shell"><div class="section-head"><h2>${esc(t('related'))}</h2></div><div class="related" data-related></div></div></section>`;
    const related=posts.filter(x=>x.slug!==p.slug && (x.city===p.city || x.category===p.category)).slice(0,3);
    const rel=root.querySelector('[data-related]'); rel.innerHTML=related.map(x=>`<a class="related-card" href="${storyUrl(x.slug)}"><span class="media" data-media="${esc(x.slug)}"></span><span class="shade"></span><span class="feature-copy"><span class="eyebrow">${esc(x.category)}</span><h3>${esc(x.title)}</h3></span></a>`).join('');
    window.ShooshMedia?.hydrate(root);
  }

  function reveal() {
    const nodes=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){nodes.forEach(n=>n.classList.add('visible'));return;}
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08}); nodes.forEach(n=>io.observe(n));
  }

  async function renderPage(){
    applyLanguage();
    await Promise.all([renderFeatured(),renderJournal(),renderStory()]);
    window.ShooshMedia?.hydrate();
  }

  document.addEventListener('DOMContentLoaded', async () => { bindLanguage(); applyLanguage(); await renderPage(); reveal(); });
})();
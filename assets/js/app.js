(() => {
  const ROOT = location.pathname.includes('/Shoosh/') ? '/Shoosh/' : '/';
  const state = { posts: [], lang: localStorage.getItem('shoosh-lang') || 'en' };
  const categoryAr={Taste:'المذاق',Places:'الأماكن',Escape:'الرحلات',Culture:'الثقافة',Moments:'اللحظات'};
  const moodAr={special:'مميز',beautiful:'جميل',dinner:'عشاء',casual:'غير رسمي',new:'جديد',cafe:'مقهى',view:'إطلالة',outdoors:'في الهواء الطلق',calm:'هادئ',escape:'رحلة',breakfast:'فطور'};
  const text={
    en:{home:'Home',journal:'Journal',about:'Identity',explore:'Explore journal',search:'Search venue, cuisine or place…',city:'All cities',category:'All worlds',year:'All years',stories:'stories',note:'Shoosh’s note',tried:'What Shoosh tried',reservation:'Reservation',location:'Location',cuisine:'Cuisine / type',date:'Visited',source:'Source',sourceValue:'Shoosh original Instagram post',none:'No individual items were listed in the supplied post.',facts:'At a glance',back:'Back to journal',aed:'AED',bookNone:'No reservation guidance was recorded in the supplied post.',language:'عربي',original:'Original Arabic note',next:'Next in the orbit',prices:'Prices shown are historical prices recorded in Shoosh’s post at the time of the visit and may have changed.'},
    ar:{home:'الرئيسية',journal:'اليوميات',about:'الهوية',explore:'استكشف اليوميات',search:'ابحث عن مطعم أو مطبخ أو مكان…',city:'كل المدن',category:'كل العوالم',year:'كل السنوات',stories:'تجربة',note:'ملاحظة شوش',tried:'ماذا جرّبت شوش',reservation:'الحجز',location:'الموقع',cuisine:'المطبخ / النوع',date:'تاريخ الزيارة',source:'المصدر',sourceValue:'منشور شوش الأصلي على إنستغرام',none:'لم تُذكر عناصر محددة في المنشور المرفق.',facts:'في لمحة',back:'العودة إلى اليوميات',aed:'درهم',bookNone:'لم تُسجل ملاحظة خاصة بالحجز في المنشور المرفق.',language:'English',original:'النص الأصلي',next:'التالي في المدار',prices:'الأسعار المعروضة هي الأسعار التي سجلتها شوش وقت الزيارة وقد تكون تغيرت.'}
  };
  const t=k=>text[state.lang][k]||k;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const url=path=>ROOT+path.replace(/^\//,'');
  const storyUrl=slug=>`${url('story/')}?slug=${encodeURIComponent(slug)}`;
  const isAr=()=>state.lang==='ar';
  const category=p=>isAr()?(categoryAr[p.category]||p.category):p.category;
  const summary=p=>isAr()?(p.summaryAr||p.summaryEn):(p.summaryEn||p.summaryAr);
  const number=i=>String(i+1).padStart(2,'0');
  const mood=x=>isAr()?(moodAr[x]||x):x;
  const reservationText=p=>{
    if(!p.reservation)return t('bookNone');
    if(!isAr())return p.reservation;
    const r=p.reservation.toLowerCase();
    if(r.includes('request a view'))return 'يُنصح بالحجز مسبقاً وطلب طاولة بإطلالة.';
    if(r.includes('website or phone'))return 'الحجز متاح عبر الموقع أو الهاتف.';
    if(r.includes('advance booking'))return 'يُنصح بالحجز مسبقاً.';
    return p.reservation;
  };

  async function data(){if(state.posts.length)return state.posts;const res=await fetch(url('data/posts.json'),{cache:'no-cache'});if(!res.ok)throw new Error(`Content ${res.status}`);state.posts=await res.json();return state.posts}

  function applyLanguage(){
    document.documentElement.lang=state.lang;document.documentElement.dir=isAr()?'rtl':'ltr';document.body.classList.toggle('rtl',isAr());
    document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.textContent=isAr()?el.dataset.ar:el.dataset.en});
    document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
    document.querySelectorAll('[data-lang-toggle]').forEach(el=>{el.textContent=t('language')});
    document.querySelectorAll('[data-menu-toggle]').forEach(el=>{if(!document.querySelector('[data-oa-menu].open'))el.textContent=isAr()?'القائمة':'MENU'});
  }
  function bindLanguage(){document.querySelectorAll('[data-lang-toggle]').forEach(btn=>btn.addEventListener('click',()=>{state.lang=isAr()?'en':'ar';localStorage.setItem('shoosh-lang',state.lang);applyLanguage();renderPage()}))}

  function featureCard(p,i){
    return `<a class="feature-card oa-feature" href="${storyUrl(p.slug)}" data-theme="dark"><span class="media" data-media="${esc(p.slug)}" data-parallax></span><span class="oa-feature-copy"><span class="oa-feature-no">${number(i)}</span><span class="oa-feature-title">${esc(p.title)}</span><span class="oa-feature-meta">${esc(category(p))}<br>${esc(p.city)} · ${esc(p.year)}</span></span></a>`;
  }
  function rowCard(p,i){
    return `<article class="journal-card oa-row" data-entry data-city="${esc(p.city)}" data-category="${esc(p.category)}" data-year="${esc(p.year)}" data-search="${esc([p.title,p.city,p.area,p.cuisine,p.summaryEn,p.summaryAr].join(' '))}"><a href="${storyUrl(p.slug)}"><span class="oa-row-no">${number(i)}</span><span class="oa-row-media"><span class="media" data-media="${esc(p.slug)}"></span></span><span class="oa-row-copy"><h3>${esc(p.title)}</h3><p>${esc(summary(p))}</p></span><span class="oa-row-meta">${esc(category(p))}<br>${esc(p.city)} · ${esc(p.year)}</span></a></article>`;
  }

  async function renderFeatured(){
    const target=document.querySelector('[data-featured]');if(!target)return;const posts=await data();
    const chosen=posts.filter(p=>p.featured).slice(0,5);target.innerHTML=chosen.map(featureCard).join('');window.ShooshMedia?.hydrate(target);
  }
  function options(values,label,translate=false){return `<option value="">${esc(label)}</option>`+[...new Set(values)].filter(Boolean).sort((a,b)=>String(a).localeCompare(String(b))).map(x=>`<option value="${esc(x)}">${esc(translate&&isAr()?(categoryAr[x]||x):x)}</option>`).join('')}

  async function renderJournal(){
    const grid=document.querySelector('[data-journal]');if(!grid)return;const posts=await data();const isArchive=location.pathname.includes('/journal');
    const q=document.querySelector('[data-search]'),city=document.querySelector('[data-city]'),cat=document.querySelector('[data-category]'),year=document.querySelector('[data-year]');
    if(city){city.innerHTML=options(posts.map(p=>p.city),t('city'))}if(cat){cat.innerHTML=options(posts.map(p=>p.category),t('category'),true)}if(year){year.innerHTML=options(posts.map(p=>String(p.year)),t('year'))}
    if(q)q.placeholder=t('search');
    const filter=()=>{
      const term=(q?.value||'').trim().toLowerCase();let filtered=posts.filter(p=>(!term||[p.title,p.city,p.area,p.cuisine,p.summaryEn,p.summaryAr].join(' ').toLowerCase().includes(term))&&(!city?.value||p.city===city.value)&&(!cat?.value||p.category===cat.value)&&(!year?.value||String(p.year)===year.value));
      if(!isArchive)filtered=filtered.slice(0,7);
      grid.innerHTML=filtered.length?filtered.map(rowCard).join(''):`<div class="empty">${isAr()?'لا توجد تجارب مطابقة.':'No matching stories.'}</div>`;
      const count=document.querySelector('[data-count]');if(count)count.textContent=`${filtered.length} ${t('stories')}`;window.ShooshMedia?.hydrate(grid);
    };
    [q,city,cat,year].forEach(el=>el&&el.addEventListener(el===q?'input':'change',filter));filter();
  }

  function setMeta(p){document.title=`${p.title} — Shoosh`;const d=document.querySelector('meta[name="description"]');if(d)d.content=summary(p).slice(0,155);const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=`https://ahmedyyya.github.io/Shoosh/story/?slug=${encodeURIComponent(p.slug)}`;const ld={"@context":"https://schema.org","@type":"BlogPosting",headline:p.title,datePublished:p.year?`${p.year}-01-01`:undefined,description:summary(p),author:{"@type":"Person",name:"Shoosh"},publisher:{"@type":"Organization",name:"Shoosh"}};const node=document.getElementById('story-schema');if(node)node.textContent=JSON.stringify(ld)}

  async function renderStory(){
    const root=document.querySelector('[data-story]');if(!root)return;const posts=await data();const slug=new URLSearchParams(location.search).get('slug')||posts[0]?.slug;const p=posts.find(x=>x.slug===slug);if(!p){root.innerHTML='<div class="oa-story-body"><h1>Story not found.</h1></div>';return}setMeta(p);
    const idx=posts.findIndex(x=>x.slug===p.slug);const dishes=(p.dishes||[]).length?p.dishes.map((d,i)=>`<div class="oa-dish"><span class="oa-dish-no">${number(i)}</span><span class="oa-dish-name">${esc(d.name)}</span><span class="oa-dish-price">${d.price==null?'—':`${esc(d.price)} ${t('aed')}`}</span></div>`).join(''):`<p>${esc(t('none'))}</p>`;
    const original=(!isAr()&&p.summaryAr)?`<div class="oa-source" lang="ar" dir="rtl"><strong>${esc(t('original'))}</strong><br>${esc(p.summaryAr)}</div>`:'';
    const next=posts[(idx+1)%posts.length];
    root.innerHTML=`<section class="oa-story-hero" data-theme="dark"><div class="oa-story-media"><span class="media" data-media="${esc(p.slug)}" data-parallax></span></div><div class="oa-story-overlay"><div class="story-counter">${number(idx)} / ${String(posts.length).padStart(2,'0')}</div><h1>${esc(p.title)}</h1><div class="oa-story-kicker"><span>${esc(category(p))}</span><span>${esc(p.city)}</span><span>${esc(p.area||'')}</span><span>${esc(p.year)}</span></div></div></section><section class="oa-story-body"><div class="oa-story-intro" data-reveal><div class="label">${esc(t('note'))}</div><blockquote class="oa-quote">${esc(summary(p))}</blockquote></div><div class="oa-story-details"><div class="oa-story-main" data-reveal><h2>${esc(t('tried'))}</h2><div class="oa-dishes">${dishes}</div><p class="price-note">${esc(t('prices'))}</p><h2 style="margin-top:70px">${esc(t('reservation'))}</h2><p>${esc(reservationText(p))}</p>${original}<div class="oa-source"><strong>${esc(t('source'))}:</strong> ${esc(t('sourceValue'))}. ${isAr()?'تم الحفاظ على الأطباق والأسعار والملاحظات كما وردت في محتوى شوش، دون اختراع تقييم رقمي.':'Dish names, prices and practical notes are preserved from the supplied Shoosh content; no rating is invented.'}</div><a class="oa-back" href="${url('journal/')}">← ${esc(t('back'))}</a></div><aside class="oa-facts" data-reveal><h2>${esc(t('facts'))}</h2><div class="oa-fact"><small>${esc(t('location'))}</small><strong>${esc([p.area,p.city].filter(Boolean).join(' · '))}</strong></div><div class="oa-fact"><small>${esc(t('cuisine'))}</small><strong>${esc(p.cuisine||category(p))}</strong></div><div class="oa-fact"><small>${esc(t('date'))}</small><strong>${esc([p.date,p.year].filter(Boolean).join(' · '))}</strong></div><div class="oa-fact"><small>${esc(t('reservation'))}</small><strong>${esc(reservationText(p))}</strong></div></aside></div></section><a class="oa-next" href="${storyUrl(next.slug)}" data-theme="dark"><span class="media" data-media="${esc(next.slug)}"></span><span class="oa-next-copy"><span><small>${esc(t('next'))}</small><h2>${esc(next.title)}</h2></span><span>→</span></span></a>`;
    window.ShooshMedia?.hydrate(root);
  }

  async function renderPage(){applyLanguage();await Promise.all([renderFeatured(),renderJournal(),renderStory()]);window.ShooshMedia?.hydrate();document.dispatchEvent(new Event('shoosh:rendered'))}
  document.addEventListener('DOMContentLoaded',async()=>{bindLanguage();applyLanguage();await renderPage()});
})();

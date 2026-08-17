(() => {
  const isAr=()=>document.documentElement.lang==='ar'||document.documentElement.dir==='rtl';
  const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

  function warmStoryLabels(){
    const root=q('[data-story]'); if(!root) return;
    const label=q('.oa-story-intro .label',root);
    if(label) label.textContent=isAr()?'من تجربة شوش':'Shoosh’s take';
    const main=q('.oa-story-main',root);
    if(main){
      const hs=qa(':scope > h2',main);
      if(hs[0]) hs[0].textContent=isAr()?'الأطباق التي جرّبتها شوش':'What Shoosh tried';
      if(hs[1]) hs[1].textContent=isAr()?'الحجز قبل الزيارة':'Before you go';
    }
    const source=q('.oa-source',root);
    if(source && isAr()){
      source.innerHTML=source.innerHTML.replaceAll('سوش','شوش');
    }
  }

  function markMissing(el){
    if(!el||el.dataset.editorialAudited==='1') return;
    const active=el.classList.contains('destination-photo-active');
    if(active){el.dataset.editorialAudited='1';return;}
    const bg=getComputedStyle(el).backgroundImage;
    const resolved=el.dataset.destinationResolved;
    if(resolved==='0' || (!bg||bg==='none')){
      el.dataset.editorialAudited='1';
      el.style.backgroundImage='none';
      const row=el.closest('.oa-row'); if(row) row.classList.add('is-media-missing');
      const stage=el.closest('.oa-story-stage'); if(stage) stage.classList.add('media-missing');
      const feature=el.closest('.oa-feature'); if(feature) feature.classList.add('media-missing');
      console.warn('Shoosh destination photo unavailable:',el.dataset.media||'unknown');
    }
  }

  function auditMedia(){
    qa('[data-media]').forEach(el=>{
      if(el.classList.contains('destination-photo-active')){el.dataset.editorialAudited='1';return;}
      if(el.dataset.destinationResolved==='0') markMissing(el);
    });
  }

  function schedule(){
    warmStoryLabels();
    setTimeout(auditMedia,900);
    setTimeout(auditMedia,3200);
    setTimeout(()=>qa('[data-media]').forEach(markMissing),7600);
  }

  document.addEventListener('DOMContentLoaded',schedule);
  document.addEventListener('shoosh:rendered',schedule);
  new MutationObserver(()=>{warmStoryLabels();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  new MutationObserver(ms=>{
    if(ms.some(m=>m.addedNodes.length)) setTimeout(schedule,80);
  }).observe(document.body,{childList:true,subtree:true});
})();

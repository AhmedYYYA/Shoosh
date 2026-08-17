(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAr=()=>document.documentElement.lang==='ar'||document.documentElement.dir==='rtl';

  function progress(){
    const bar=document.createElement('div');bar.className='shoosh-progress';document.body.append(bar);
    const update=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);const p=Math.min(1,Math.max(0,scrollY/max));bar.style.setProperty('--scroll-progress',`${(p*100).toFixed(2)}%`)};
    addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
  }

  function motionField(){
    if(reduced)return;
    const field=document.createElement('div');field.className='shoosh-motion-field';field.setAttribute('aria-hidden','true');
    field.innerHTML='<div class="shoosh-orbit orbit-a"></div><div class="shoosh-orbit orbit-b"></div><div class="shoosh-star"></div>';
    document.body.append(field);
    const a=q('.orbit-a',field),b=q('.orbit-b',field),star=q('.shoosh-star',field);
    let ticking=false;
    const update=()=>{
      ticking=false;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);const p=Math.min(1,Math.max(0,scrollY/max));
      const dir=isAr()?-1:1;
      a.style.setProperty('--orbit-x',`${dir*p*9}vw`);a.style.setProperty('--orbit-y',`${p*24}vh`);a.style.setProperty('--orbit-r',`${p*110}deg`);
      b.style.setProperty('--orbit-x',`${dir*p*-7}vw`);b.style.setProperty('--orbit-y',`${p*12}vh`);b.style.setProperty('--orbit-r',`${p*-80}deg`);
      const angle=p*Math.PI*3.2;const cx=innerWidth*(isAr()?.28:.72),cy=innerHeight*.34,rx=Math.min(innerWidth*.3,390),ry=Math.min(innerHeight*.23,220);
      star.style.setProperty('--star-x',`${cx+Math.cos(angle)*rx}px`);star.style.setProperty('--star-y',`${cy+Math.sin(angle)*ry}px`);star.style.transform=`translate(-50%,-50%) rotate(${45+p*360}deg)`;
    };
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});update();
  }

  function splitWords(el){
    if(!el||el.dataset.kineticBusy==='1')return;
    el.dataset.kineticBusy='1';
    const text=el.textContent.trim();if(!text){el.dataset.kineticBusy='0';return}
    const words=text.split(/\s+/);el.textContent='';
    words.forEach((word,i)=>{const s=document.createElement('span');s.className='kinetic-word';s.textContent=word;el.append(s);if(i<words.length-1)el.append(document.createTextNode(' '))});
    el.dataset.kineticReady='1';el.classList.add('kinetic-active');el.dataset.kineticBusy='0';
  }

  function kinetic(){
    const selectors=['.oa-statement blockquote','.oa-section-head h2','.oa-about-hero h1','.oa-identity-copy h2','.oa-manifesto .en','.oa-manifesto .ar'];
    const apply=()=>selectors.forEach(sel=>qa(sel).forEach(el=>{if(!el.querySelector('.kinetic-word'))splitWords(el)}));
    apply();
    new MutationObserver(ms=>{let needs=false;for(const m of ms){if(m.type==='childList'||m.type==='characterData'){needs=true;break}}if(needs)setTimeout(apply,20)}).observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  function ribbon(){
    if(!location.pathname.endsWith('/Shoosh/')&&!location.pathname.endsWith('/Shoosh/index.html'))return;
    if(q('.shoosh-ribbon'))return;
    const worlds=q('.oa-worlds');if(!worlds)return;
    const sec=document.createElement('section');sec.className='shoosh-ribbon';sec.setAttribute('aria-hidden','true');
    const en=['TASTE','PLACES','ESCAPE','CULTURE','MOMENTS'];const ar=['المذاق','الأماكن','الرحلات','الثقافة','اللحظات'];
    const make=arr=>arr.map(x=>`<span>${x}</span><i>✦</i>`).join('');
    sec.innerHTML=`<div class="shoosh-ribbon-track" data-ribbon-en="${make(en).replace(/"/g,'&quot;')}" data-ribbon-ar="${make(ar).replace(/"/g,'&quot;')}">${make(isAr()?ar:en)}${make(isAr()?ar:en)}</div>`;
    worlds.insertAdjacentElement('afterend',sec);
    const sync=()=>{const track=q('.shoosh-ribbon-track',sec),arr=isAr()?ar:en;track.innerHTML=make(arr)+make(arr)};
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function waveRules(){
    if(q('.shoosh-wave-rule'))return;
    const svg='<svg viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 52 C170 4 310 86 500 42 S830 9 1200 50"/><path d="M0 68 C180 22 325 98 520 58 S860 25 1200 66"/></svg>';
    qa('.oa-statement,.oa-selected,.oa-manifesto').forEach((section,i)=>{if(i>1)return;const rule=document.createElement('div');rule.className='shoosh-wave-rule'+(section.classList.contains('oa-selected')?' gold':'');rule.innerHTML=svg;section.insertAdjacentElement('afterend',rule)});
  }

  function worldMotion(){
    qa('.oa-world').forEach((el,i)=>{el.dataset.worldIndex=String(i+1).padStart(2,'0');});
    if(reduced)return;
    let ticking=false;
    const update=()=>{ticking=false;qa('.oa-world').forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=(innerHeight-r.top)/(innerHeight+r.height);const move=(p-.5)*10*(isAr()?-1:1);el.style.setProperty('--world-x',`${move.toFixed(2)}vw`)})};
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
  }

  function imageChoreography(){
    if(reduced)return;let ticking=false;
    const update=()=>{ticking=false;qa('.oa-feature').forEach(card=>{const r=card.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight+r.height)));card.style.setProperty('--image-scale',(1.12-p*.08).toFixed(3));card.style.setProperty('--image-y',`${((p-.5)*-5).toFixed(2)}vh`);card.style.setProperty('--copy-y',`${((1-p)*18).toFixed(1)}px`)})};
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});document.addEventListener('shoosh:rendered',()=>setTimeout(update,60));setTimeout(update,120);
  }

  function storyStage(){
    const root=q('[data-story]');if(!root)return;
    const enhance=()=>{
      const hero=q('.oa-story-hero',root);if(!hero)return;
      if(!hero.parentElement.classList.contains('oa-story-stage')){const stage=document.createElement('div');stage.className='oa-story-stage';const counter=q('.story-counter',hero)?.textContent?.split('/')[0]?.trim()||'';stage.dataset.storyIndex=counter;hero.before(stage);stage.append(hero)}
      qa('.oa-dish',root).forEach((dish,i)=>{dish.style.transitionDelay=`${Math.min(i*.045,.32)}s`;if(!dish.dataset.motionBound){dish.dataset.motionBound='1';dishObserver?.observe(dish)}});
    };
    let dishObserver;
    if('IntersectionObserver'in window&&!reduced)dishObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');dishObserver.unobserve(e.target)}}),{threshold:.2});
    enhance();new MutationObserver(()=>setTimeout(enhance,20)).observe(root,{childList:true,subtree:true});
    if(reduced)return;
    let ticking=false;
    const update=()=>{ticking=false;const stage=q('.oa-story-stage',root);if(!stage)return;const r=stage.getBoundingClientRect();const max=Math.max(1,stage.offsetHeight-innerHeight);const p=Math.min(1,Math.max(0,-r.top/max));stage.style.setProperty('--story-scale',(1.11-p*.09).toFixed(3));stage.style.setProperty('--story-y',`${(-p*4.5).toFixed(2)}vh`);stage.style.setProperty('--story-copy-y',`${(-p*70).toFixed(1)}px`);stage.style.setProperty('--story-copy-o',(1-p*.68).toFixed(2))};
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});document.addEventListener('shoosh:rendered',()=>setTimeout(update,50));setTimeout(update,100);
  }

  function manifestoMotion(){if(reduced)return;let ticking=false;const update=()=>{ticking=false;const sec=q('.oa-manifesto');if(!sec)return;const r=sec.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=(innerHeight-r.top)/(innerHeight+r.height);sec.style.setProperty('--manifesto-ar-x',`${((p-.5)*-10).toFixed(2)}vw`);sec.style.setProperty('--manifesto-en-x',`${((p-.5)*10).toFixed(2)}vw`)};addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update()}

  function waveTransitions(){
    if(reduced)return;const wipe=document.createElement('div');wipe.className='shoosh-wave-wipe';document.body.append(wipe);
    document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;let u;try{u=new URL(a.href,location.href)}catch{return}if(u.origin!==location.origin)return;e.preventDefault();e.stopImmediatePropagation();wipe.classList.add('go');setTimeout(()=>location.href=u.href,610)},true);
  }

  function boot(){progress();motionField();kinetic();ribbon();waveRules();worldMotion();imageChoreography();storyStage();manifestoMotion();waveTransitions()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

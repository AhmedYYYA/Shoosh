(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function menu(){
    const panel=q('[data-oa-menu]'), toggle=q('[data-menu-toggle]');
    if(!panel||!toggle) return;
    const sync=()=>{const open=panel.classList.contains('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?(document.documentElement.lang==='ar'?'إغلاق':'CLOSE'):(document.documentElement.lang==='ar'?'القائمة':'MENU');document.body.style.overflow=open?'hidden':''};
    toggle.addEventListener('click',()=>{panel.classList.toggle('open');sync()});
    qa('a',panel).forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');sync()}));
    addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open')){panel.classList.remove('open');sync()}});
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    sync();
  }

  function intro(){
    const el=q('[data-intro]'); if(!el) return;
    if(reduced){el.remove();return;}
    const seen=sessionStorage.getItem('shoosh-intro-seen');
    if(seen){el.remove();return;}
    sessionStorage.setItem('shoosh-intro-seen','1');
    setTimeout(()=>el.classList.add('done'),1450);
    setTimeout(()=>el.remove(),2400);
  }

  function reveals(){
    const nodes=qa('[data-reveal]');
    if(reduced||!('IntersectionObserver'in window)){nodes.forEach(n=>n.classList.add('is-visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'});
    nodes.forEach(n=>io.observe(n));
    new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('[data-reveal]'))io.observe(n);qa('[data-reveal]',n).forEach(x=>io.observe(x))}}))).observe(document.body,{childList:true,subtree:true});
  }

  function cursor(){
    if(reduced||!matchMedia('(pointer:fine)').matches) return;
    const c=document.createElement('div'); c.className='oa-cursor'; document.body.append(c);
    let x=-100,y=-100,tx=-100,ty=-100;
    addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('active')},{passive:true});
    const loop=()=>{x+=(tx-x)*.17;y+=(ty-y)*.17;c.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;requestAnimationFrame(loop)};loop();
    document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,input,select'))c.classList.add('hover')});
    document.addEventListener('mouseout',e=>{if(e.target.closest('a,button,input,select'))c.classList.remove('hover')});
  }

  function headerTheme(){
    const apply=()=>{
      const header=q('.site-header'); if(!header)return;
      const y=Math.min(innerHeight-1,Math.max(1,header.getBoundingClientRect().bottom+4));
      const under=document.elementFromPoint(innerWidth/2,y);
      const dark=under?.closest?.('[data-theme="dark"],.oa-hero,.oa-selected,.oa-worlds,.oa-story-hero,.oa-about-hero,.oa-next');
      document.body.classList.toggle('header-dark',!!dark);
    };
    addEventListener('scroll',apply,{passive:true});addEventListener('resize',apply);setTimeout(apply,120);
  }

  function parallax(){
    if(reduced) return;
    let ticking=false;
    const update=()=>{ticking=false;qa('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const center=r.top+r.height/2-innerHeight/2;el.style.transform=`translate3d(0,${(-center*.045).toFixed(1)}px,0) scale(1.04)`})};
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});setTimeout(update,100);
  }

  function pageTransitions(){
    if(reduced) return;
    const wipe=document.createElement('div');wipe.className='oa-page-wipe';document.body.append(wipe);
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;
      const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;
      let u;try{u=new URL(a.href,location.href)}catch{return}if(u.origin!==location.origin)return;
      e.preventDefault();wipe.classList.add('go');setTimeout(()=>location.href=u.href,360);
    });
  }

  function worldLocalization(){
    const map={Taste:'المذاق',Places:'الأماكن',Escape:'الرحلات',Culture:'الثقافة',Moments:'اللحظات'};
    const sync=()=>qa('[data-world-name]').forEach(el=>{const en=el.dataset.worldName;el.textContent=document.documentElement.lang==='ar'?(map[en]||en):en});
    sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  document.addEventListener('DOMContentLoaded',()=>{intro();menu();reveals();cursor();headerTheme();parallax();pageTransitions();worldLocalization()});
})();

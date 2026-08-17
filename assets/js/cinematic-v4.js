(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function menu(){
    const panel=q('[data-oa-menu]'),toggle=q('[data-menu-toggle]');if(!panel||!toggle)return;
    const sync=()=>{const open=panel.classList.contains('open'),ar=document.documentElement.lang==='ar';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?(ar?'إغلاق':'CLOSE'):(ar?'القائمة':'MENU');document.body.style.overflow=open?'hidden':''};
    toggle.addEventListener('click',()=>{panel.classList.toggle('open');sync()});qa('a',panel).forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');sync()}));addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open')){panel.classList.remove('open');sync()}});new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});sync();
  }

  function intro(){const el=q('[data-intro]');if(!el)return;if(reduced||sessionStorage.getItem('shoosh-intro-seen')){el.remove();return}sessionStorage.setItem('shoosh-intro-seen','1');setTimeout(()=>el.classList.add('done'),1450);setTimeout(()=>el.remove(),2400)}

  function reveals(){
    const setup=n=>{if(!n||n.dataset.revealBound)return;n.dataset.revealBound='1';if(reduced||!('IntersectionObserver'in window)){n.classList.add('is-visible');return}io.observe(n)};
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'});
    qa('[data-reveal]').forEach(setup);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('[data-reveal]'))setup(n);qa('[data-reveal]',n).forEach(setup)}}))).observe(document.body,{childList:true,subtree:true});
  }

  function cursor(){if(reduced||!matchMedia('(pointer:fine)').matches)return;const c=document.createElement('div');c.className='oa-cursor';document.body.append(c);let x=-100,y=-100,tx=-100,ty=-100;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('active')},{passive:true});const loop=()=>{x+=(tx-x)*.17;y+=(ty-y)*.17;c.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;requestAnimationFrame(loop)};loop();document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,input,select'))c.classList.add('hover')});document.addEventListener('mouseout',e=>{if(e.target.closest('a,button,input,select'))c.classList.remove('hover')})}

  function headerTheme(){
    const apply=()=>{const header=q('.site-header');if(!header)return;const probe=header.getBoundingClientRect().bottom+2;const dark=qa('[data-theme="dark"],.oa-hero,.oa-selected,.oa-worlds,.oa-story-hero,.oa-about-hero,.oa-next').some(el=>{const r=el.getBoundingClientRect();return r.top<=probe&&r.bottom>=probe});document.body.classList.toggle('header-dark',dark)};
    addEventListener('scroll',apply,{passive:true});addEventListener('resize',apply);document.addEventListener('shoosh:rendered',apply);setTimeout(apply,150);
  }

  function parallax(){if(reduced)return;let ticking=false;const update=()=>{ticking=false;qa('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const center=r.top+r.height/2-innerHeight/2;el.style.transform=`translate3d(0,${(-center*.035).toFixed(1)}px,0) scale(1.055)`})};addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});document.addEventListener('shoosh:rendered',()=>setTimeout(update,100));setTimeout(update,150)}

  function pageTransitions(){
    if(reduced)return;const wipe=document.createElement('div');wipe.className='oa-page-wipe';Object.assign(wipe.style,{position:'fixed',inset:'0',zIndex:'1000',background:'#112B68',transform:'translateY(101%)',transition:'transform .48s cubic-bezier(.22,1,.36,1)',pointerEvents:'none'});document.body.append(wipe);
    document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;let u;try{u=new URL(a.href,location.href)}catch{return}if(u.origin!==location.origin)return;e.preventDefault();wipe.style.transform='translateY(0)';setTimeout(()=>location.href=u.href,390)});
  }

  function worldLocalization(){const map={Taste:'المذاق',Places:'الأماكن',Escape:'الرحلات',Culture:'الثقافة',Moments:'اللحظات'};const sync=()=>qa('[data-world-name]').forEach(el=>{const en=el.dataset.worldName;el.textContent=document.documentElement.lang==='ar'?(map[en]||en):en});sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']})}

  function deepLinks(){
    const p=new URLSearchParams(location.search);if(!p.size)return;let tries=0;const timer=setInterval(()=>{const pairs=[['category','[data-category]'],['city','[data-city]'],['year','[data-year]']];let pending=false;pairs.forEach(([key,sel])=>{const value=p.get(key),el=q(sel);if(!value)return;if(!el||!el.options.length){pending=true;return}if([...el.options].some(o=>o.value===value)&&el.value!==value){el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}))}});if(!pending||++tries>25)clearInterval(timer)},120);
  }

  document.addEventListener('DOMContentLoaded',()=>{intro();menu();reveals();cursor();headerTheme();parallax();pageTransitions();worldLocalization();deepLinks()});
})();

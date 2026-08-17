(()=>{
  const ROOT=location.pathname.includes('/Shoosh/')?'/Shoosh/':'/';
  const SOURCE=`${ROOT}assets/js/destination-media.js`;
  let mediaPromise;

  function extractMedia(source){
    const marker='const MEDIA=';
    const start=source.indexOf(marker);
    if(start<0) return {};
    let i=start+marker.length, depth=0, quoted=false, escape=false, begin=-1;
    for(;i<source.length;i++){
      const c=source[i];
      if(begin<0){if(c==='{'){begin=i;depth=1;} continue;}
      if(quoted){if(escape){escape=false;continue;} if(c==='\\'){escape=true;continue;} if(c==='"')quoted=false;continue;}
      if(c==='"'){quoted=true;continue;}
      if(c==='{')depth++;
      else if(c==='}'&&--depth===0){
        try{return JSON.parse(source.slice(begin,i+1));}catch(e){console.warn('Shoosh destination media parse failed',e);return {};}
      }
    }
    return {};
  }

  async function media(){
    if(mediaPromise) return mediaPromise;
    mediaPromise=fetch(SOURCE,{cache:'no-cache'}).then(r=>r.ok?r.text():'').then(extractMedia).catch(()=>({}));
    return mediaPromise;
  }

  function preload(url,timeout=6500){
    return new Promise(resolve=>{
      const img=new Image(); let done=false;
      const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(ok)};
      const timer=setTimeout(()=>finish(false),timeout);
      img.onload=()=>finish(true); img.onerror=()=>finish(false); img.src=url;
    });
  }

  async function apply(el, candidates){
    if(!el||el.dataset.destinationResolved==='1') return;
    el.dataset.destinationResolved='1';
    for(const item of candidates||[]){
      if(!item?.image) continue;
      if(await preload(item.image)){
        el.style.backgroundImage=`url("${item.image.replace(/"/g,'%22')}")`;
        el.style.backgroundSize='cover';
        el.style.backgroundPosition='center';
        el.style.backgroundRepeat='no-repeat';
        el.classList.add('destination-photo-active');
        el.dataset.destinationCredit=item.credit||'';
        return;
      }
    }
    el.dataset.destinationResolved='0';
  }

  async function hydrate(root=document){
    const all=await media();
    root.querySelectorAll('.destination-peek').forEach(x=>x.remove());
    const nodes=[...root.querySelectorAll('[data-media]')];
    await Promise.all(nodes.map(el=>apply(el,all[el.dataset.media])));
  }

  function schedule(root=document){setTimeout(()=>hydrate(root),60);setTimeout(()=>hydrate(root),420);}
  document.addEventListener('DOMContentLoaded',()=>{
    schedule();
    new MutationObserver(m=>{
      const roots=new Set();
      m.forEach(x=>x.addedNodes.forEach(n=>{if(n.nodeType===1)roots.add(n)}));
      roots.forEach(r=>schedule(r));
      document.querySelectorAll('.destination-peek').forEach(x=>x.remove());
    }).observe(document.body,{childList:true,subtree:true});
  });
})();

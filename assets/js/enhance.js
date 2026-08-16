(() => {
  const cleanArabic = root => {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('الم supplied')) node.nodeValue = node.nodeValue.replaceAll('الم supplied','المُرفق');
    }
  };
  const applyDeepLink = () => {
    const p = new URLSearchParams(location.search);
    const map = [['category','[data-category]'],['city','[data-city]'],['year','[data-year]']];
    let pending = false;
    for (const [key,sel] of map) {
      const value=p.get(key), el=document.querySelector(sel);
      if (!value) continue;
      if (!el || !el.options.length) { pending=true; continue; }
      if ([...el.options].some(o=>o.value===value) && el.value!==value) {
        el.value=value;
        el.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    return !pending;
  };
  document.addEventListener('DOMContentLoaded', () => {
    cleanArabic();
    let tries=0;
    const timer=setInterval(() => {
      cleanArabic();
      if (applyDeepLink() || ++tries>20) clearInterval(timer);
    },150);
    new MutationObserver(() => cleanArabic()).observe(document.body,{subtree:true,childList:true});
  });
})();
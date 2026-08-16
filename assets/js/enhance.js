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
    for (const [key,sel] of map) {
      const value=p.get(key), el=document.querySelector(sel);
      if (value && el && [...el.options].some(o=>o.value===value)) { el.value=value; el.dispatchEvent(new Event('change',{bubbles:true})); }
    }
  };
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { cleanArabic(); applyDeepLink(); }, 120);
    new MutationObserver(() => cleanArabic()).observe(document.body,{subtree:true,childList:true});
  });
})();
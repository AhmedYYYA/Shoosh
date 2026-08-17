(() => {
  const WORLD = {
    Taste: 'المذاق',
    Places: 'الأماكن',
    Escape: 'الرحلات',
    Culture: 'الثقافة',
    Moments: 'اللحظات'
  };
  const MOOD = {
    special:'مميز', beautiful:'جميل', dinner:'عشاء', casual:'غير رسمي', new:'جديد',
    cafe:'مقهى', view:'إطلالة', outdoors:'في الهواء الطلق', calm:'هادئ', escape:'رحلة', breakfast:'فطور'
  };
  const REVERSE_WORLD = Object.fromEntries(Object.entries(WORLD).map(([k,v]) => [v,k]));
  const REVERSE_MOOD = Object.fromEntries(Object.entries(MOOD).map(([k,v]) => [v,k]));
  const isAr = () => document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';

  function polishText(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue) continue;
      let value = node.nodeValue.replaceAll('سوش', 'شوش');
      const trimmed = value.trim();
      if (isAr() && WORLD[trimmed]) value = value.replace(trimmed, WORLD[trimmed]);
      else if (!isAr() && REVERSE_WORLD[trimmed]) value = value.replace(trimmed, REVERSE_WORLD[trimmed]);
      node.nodeValue = value;
    }

    document.querySelectorAll('select[data-category] option').forEach(option => {
      if (!option.value) return;
      option.textContent = isAr() ? (WORLD[option.value] || option.value) : option.value;
    });

    document.querySelectorAll('.tag').forEach(tag => {
      const value = tag.textContent.trim();
      if (isAr() && MOOD[value]) tag.textContent = MOOD[value];
      else if (!isAr() && REVERSE_MOOD[value]) tag.textContent = REVERSE_MOOD[value];
    });
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      polishText();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    schedule();
    new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true, characterData:true});
    new MutationObserver(schedule).observe(document.documentElement, {attributes:true, attributeFilter:['lang','dir']});
  });
})();
(() => {
  try {
    if (!localStorage.getItem('shoosh-lang')) {
      const langs = navigator.languages || [navigator.language || ''];
      const ar = langs.some(l => /^ar(?:-|$)/i.test(l));
      localStorage.setItem('shoosh-lang', ar ? 'ar' : 'en');
    }
  } catch (_) {}

  // Authoritative Arabic spelling of Shoosh is "شوش" — never "سوش".
  const normalizeShooshArabic = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('سوش')) {
        node.nodeValue = node.nodeValue.replaceAll('سوش', 'شوش');
      }
    }
  };

  const startNormalizer = () => {
    normalizeShooshArabic();
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          const node = mutation.target;
          if (node.nodeValue && node.nodeValue.includes('سوش')) {
            node.nodeValue = node.nodeValue.replaceAll('سوش', 'شوش');
          }
          continue;
        }
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue && node.nodeValue.includes('سوش')) {
              node.nodeValue = node.nodeValue.replaceAll('سوش', 'شوش');
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            normalizeShooshArabic(node);
          }
        });
      }
    });
    observer.observe(document.body, {subtree: true, childList: true, characterData: true});
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startNormalizer, {once: true});
  } else {
    startNormalizer();
  }
})();

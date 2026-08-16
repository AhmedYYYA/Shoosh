(() => {
  try {
    if (!localStorage.getItem('shoosh-lang')) {
      const langs = navigator.languages || [navigator.language || ''];
      const ar = langs.some(l => /^ar(?:-|$)/i.test(l));
      localStorage.setItem('shoosh-lang', ar ? 'ar' : 'en');
    }
  } catch (_) {}
})();

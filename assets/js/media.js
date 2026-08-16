(() => {
  const PACK_URL = 'https://raw.githubusercontent.com/AhmedYYYA/Shoosh/5080c882e4c0d80d83aa12cab2d0493eb73097ab/index.html';
  let cache;

  async function unpack(outer) {
    const hit = outer.match(/const b='([^']+)'/);
    if (!hit) return outer;
    if (!('DecompressionStream' in window)) throw new Error('This browser cannot unpack the Shoosh media archive.');
    const bytes = Uint8Array.from(atob(hit[1]), c => c.charCodeAt(0));
    return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  }

  async function load() {
    if (cache) return cache;
    cache = (async () => {
      const response = await fetch(PACK_URL, { mode: 'cors', cache: 'force-cache' });
      if (!response.ok) throw new Error(`Media archive ${response.status}`);
      const source = await unpack(await response.text());
      const tagImages = [...source.matchAll(/<img src="(data:image\/[^"]+)"/g)].map(m => m[1]);
      const marker = 'let lang="en", posts=';
      const start = source.indexOf(marker);
      let posts = [];
      if (start >= 0) {
        const a = start + marker.length;
        const b = source.indexOf('];', a);
        if (b > a) posts = JSON.parse(source.slice(a, b + 1));
      }
      return {
        primary: tagImages[0] || null,
        metallic: tagImages[1] || tagImages[0] || null,
        experiences: Object.fromEntries(posts.filter(p => p.slug && p.image).map(p => [p.slug, p.image]))
      };
    })();
    return cache;
  }

  async function hydrate(root = document) {
    try {
      const media = await load();
      root.querySelectorAll('[data-brand="primary"]').forEach(el => {
        if (media.primary) el.style.backgroundImage = `url("${media.primary}")`;
      });
      root.querySelectorAll('[data-brand="metallic"]').forEach(el => {
        if (media.metallic) el.style.backgroundImage = `url("${media.metallic}")`;
      });
      root.querySelectorAll('[data-media]').forEach(el => {
        const uri = media.experiences[el.dataset.media];
        if (uri) {
          el.style.backgroundImage = `url("${uri}")`;
          el.dataset.loaded = 'true';
        }
      });
    } catch (error) {
      console.warn('Shoosh media archive unavailable; branded placeholders remain.', error);
    }
  }

  window.ShooshMedia = { load, hydrate };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => hydrate());
  else hydrate();
})();
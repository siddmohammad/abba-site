import { useEffect } from 'react';

export default function useMeta({ title, description, ogTitle, ogDescription, ogUrl, ogImage }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr, key, value) => {
      if (!value) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', ogTitle || title);
    setMeta('property', 'og:description', ogDescription || description);
    setMeta('property', 'og:url', ogUrl);
    setMeta('property', 'og:image', ogImage || 'https://getabba.info/assets/botter-mascot.webp');
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle || title);
    setMeta('name', 'twitter:description', ogDescription || description);
    setMeta('name', 'twitter:image', ogImage || 'https://getabba.info/assets/botter-mascot.webp');
  }, [title, description, ogTitle, ogDescription, ogUrl, ogImage]);
}

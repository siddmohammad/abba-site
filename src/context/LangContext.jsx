import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext({ lang: 'en', toggleLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('botter-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('botter-lang', lang);
    if (lang === 'bn') {
      document.body.classList.add('lang-bn');
    } else {
      document.body.classList.remove('lang-bn');
    }
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'bn' : 'en');

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

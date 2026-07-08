// =============================================
// QT SSW ACADEMY — Language Hook
// Supports: Japanese (ja) | English (en)
// =============================================

import { useState, useCallback } from 'react';
import type { Language } from '../types';

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>('ja');

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'ja' ? 'en' : 'ja');
  }, []);

  const t = useCallback((ja: string, en: string): string => {
    return lang === 'ja' ? ja : en;
  }, [lang]);

  return { lang, setLang, toggleLang, t };
};

export type UseLanguageReturn = ReturnType<typeof useLanguage>;

import { atom, useAtom } from 'jotai';

export interface LocaleInfo {
  id: 'zh-CN' | 'en-US';
  value: string;
}

const language = {
  localeList: atom<LocaleInfo[]>([
    { id: 'zh-CN', value: '简体中文' },
    { id: 'en-US', value: 'English' }
  ]),
  currentLocale: atom<LocaleInfo['id']>('zh-CN')
};
console.log('language:', language);

import { setCurrentLocale } from '@/i18n';
export default function useLanguage() {
  const [currentLocale, setLocale] = useAtom(language.currentLocale);
  return {
    currentLocale,
    updateLocale(locale: LocaleInfo['id']) {
      setCurrentLocale(locale);
      setLocale(locale);
    }
  };
}

export * from 'jotai';

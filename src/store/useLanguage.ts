import { atom, useRecoilState } from 'recoil';

enum KEYS {
  localeList = 'language/localeList',
  currentLocale = 'language/currentLocale'
}
interface LocaleInfo {
  id: 'zh-CN' | 'en-US',
  value: string
}

const language = {
    localeList: atom<LocaleInfo[]>({
        key: KEYS.localeList,
        default: [{ id: 'zh-CN', value: '简体中文' }, { id: 'en-US', value: 'English' },]
    }),
    currentLocale: atom<LocaleInfo['id']>({
        key: KEYS.currentLocale,
        default: 'zh-CN'
    })
};


import { setCurrentLocale } from '@/i18n';
export default function useLanguage() {
    const [currentLocale, setLocale] = useRecoilState(language.currentLocale);
    return {
        currentLocale,
        updateLocale(locale: LocaleInfo['id']) {
            setCurrentLocale(locale);
            setLocale(locale);
        }
    };
}

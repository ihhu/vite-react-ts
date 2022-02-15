import { atom } from 'recoil';

enum KEYS {
  localeList = 'localeList',
  currentLocale = 'currentLocale'
}
interface LocaleInfo {
  id: 'zh-CN' | 'en-US', value: string
}

export const localeList = atom<LocaleInfo[]>({
    key: KEYS.currentLocale,
    default: [{ id: 'zh-CN', value: '简体中文' }, { id: 'en-US', value: 'English' },]
});

export const currentLocal = atom<LocaleInfo['id']>({
    key: KEYS.currentLocale,
    default: 'zh-CN'
});

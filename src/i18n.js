import _ from 'lodash'
import I18n from 'i18n-2'
import { trData } from './i18n-import'

const supportedLocales = ['en-US', 'zh-CN', 'zh-TW']

const describeLocale = (() => {
  const table = {
    'en-US': 'English',
    'zh-CN': '简体中文',
    'zh-TW': '正體中文',
  }

  return x => table[x]
})()

const guessLocale = () => {
  const lang = navigator.language
  if (! supportedLocales.includes(lang)) {
    const shortLang = lang.substr(0,2).toLowerCase()
    return shortLang === 'zh' ? 'zh-CN' :
      shortLang === 'en' ? 'en-US' :
        'en-US'
  } else {
    return lang
  }
}

const i18nOptions = {
  locales: trData,
  defaultLocale: 'en-US',
  updateFiles: false,
  devMode: false,
}

const i18nInstances = _.fromPairs(supportedLocales.map(lang => {
  const inst = new I18n(i18nOptions)
  inst.setLocale(lang)
  return [lang, inst]
}))

export {
  supportedLocales,
  describeLocale,
  guessLocale,
  i18nInstances,
}

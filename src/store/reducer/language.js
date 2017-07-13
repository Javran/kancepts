import { guessLocale } from '../../i18n'

const reducer = (state = guessLocale(), action) => {
  if (action.type === 'Language@change') {
    const {language} = action
    return language
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: language => dispatch({
    type: 'Language@change',
    language,
  }),
})

export { reducer, mapDispatchToProps }

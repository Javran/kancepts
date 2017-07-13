import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap'

import {
  languageSelector,
} from '../../selectors'
import { mapDispatchToProps } from '../../store/reducer/language'
import { PTyp } from '../../ptyp'
import { supportedLocales, describeLocale } from '../../i18n'

class LanguageAreaImpl extends Component {
  static propTypes = {
    lang: PTyp.string.isRequired,
    changeLanguage: PTyp.func.isRequired,
  }

  handleChangeLanguage = lang => () =>
    this.props.changeLanguage(lang)

  render() {
    const {lang} = this.props
    return (
      <ButtonToolbar>
        {
          supportedLocales.map(curLang => {
            const isCurrent = curLang === lang
            return (
              <Button
                bsStyle={isCurrent ? 'primary' : 'default'}
                active={isCurrent}
                onClick={this.handleChangeLanguage(curLang)}
                key={curLang}>
                {describeLocale(curLang)}
              </Button>
            )
          })
        }
      </ButtonToolbar>
    )
  }
}

const LanguageArea = connect(
  state => {
    const lang = languageSelector(state)
    return {lang}
  },
  mapDispatchToProps
)(LanguageAreaImpl)

export { LanguageArea }

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  Button,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { encodedPersistStateSelector } from '../../../store/persist'
import { translateSelector } from '../../../selectors'
import { PTyp } from '../../../ptyp'

const canCopyToClipboard = (() => {
  try {
    return document.queryCommandSupported('copy')
  } catch (e) {
    return false
  }
})

class ExportAreaImpl extends Component {
  static propTypes = {
    encoded: PTyp.string.isRequired,
    onPostMessage: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  handleSelectAll = () => {
    if (typeof this.textAreaRef !== 'undefined') {
      this.textAreaRef.select()
    }
  }

  handleCopy = () => {
    this.handleSelectAll()
    try {
      const ret = document.execCommand('copy')
      if (!ret)
        return console.error(`failed to copy text to clipboard`)
    } catch (e) {
      return console.error(`failed to copy text to clipboard, err=${e}`)
    }

    const {onPostMessage,tr} = this.props
    onPostMessage(
      'success',
      tr('SettingsAndTools.General.ImportAndExport.MsgCopied', String(new Date()))
    )
  }

  render() {
    const {encoded} = this.props
    return (
      <div>
        <FormControl
          readOnly
          componentClass="textarea"
          style={{
            resize: 'none',
            height: '8em',
            marginTop: '.5em',
            marginBottom: '.5em',
          }}
          value={encoded}
          inputRef={r => { this.textAreaRef = r }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button
            onClick={this.handleCopy}
            disabled={!canCopyToClipboard}>
            <FontAwesome name="clipboard" />
          </Button>
        </div>
      </div>
    )
  }
}

const ExportArea = connect(
  state => {
    const encoded = encodedPersistStateSelector(state)
    const {tr} = translateSelector(state)
    return {encoded, tr}
  }
)(ExportAreaImpl)

export { ExportArea }

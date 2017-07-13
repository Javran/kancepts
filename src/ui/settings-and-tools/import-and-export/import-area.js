import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  Button,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { PTyp } from '../../../ptyp'
import { normalizePersistState } from '../../../store/persist'
import { mapDispatchToProps } from '../../../store/reducer'

const processRaw = rawStr => {
  const rawObj = JSON.parse(rawStr)
  if (rawObj.version !== 1)
    throw new Error(`expecting version 1`)
  if (_.isEmpty(rawObj.state))
    throw new Error(`state is empty`)
  const rawState = rawObj.state
  const pState = normalizePersistState(rawState)
  return pState
}

class ImportAreaImpl extends Component {
  static propTypes = {
    merge: PTyp.func.isRequired,
    onPostMessage: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  handleContentChange = e => {
    const content = e.target.value
    this.setState({content})
  }

  handleSave = () => {
    const {content} = this.state
    const {onPostMessage, merge} = this.props
    try {
      const importedState = processRaw(content)
      merge(importedState)
      onPostMessage(
        'success',
        (
          <div>
            <div>
              {
                `State merged` +
                ` at ${String(new Date())}`
              }
            </div>
            <div>
              Note that imported data is not checked strictly.
              Please reset if anything goes wrong.
            </div>
          </div>
        )
      )
    } catch (e) {
      onPostMessage(
        'danger',
        (
          <div>
            <div>
              {
                `Error while processing import data` +
                ` at ${String(new Date())}`
              }
            </div>
            <div>{e.message}</div>
          </div>
        )
      )
    }
  }

  render() {
    return (
      <div>
        <FormControl
          onChange={this.handleContentChange}
          componentClass="textarea"
          style={{
            resize: 'none',
            height: '8em',
            marginTop: '.5em',
            marginBottom: '.5em',
          }}
          value={this.state.content}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button onClick={this.handleSave}>
            <FontAwesome name="save" />
          </Button>
        </div>
      </div>
    )
  }
}

const ImportArea = connect(
  null,
  mapDispatchToProps
)(ImportAreaImpl)

export { ImportArea }

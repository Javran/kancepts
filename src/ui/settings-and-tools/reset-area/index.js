import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonToolbar,
  Modal,
} from 'react-bootstrap'
import Markdown from 'react-remarkable'

import {
  mergeMapDispatchToProps,
} from 'subtender'

import { PTyp } from '../../../ptyp'

import {
  mapDispatchToProps as rootMdtp,
} from '../../../store/reducer'
import {
  mapDispatchToProps as expedConfigsMdtp,
} from '../../../store/reducer/exped-configs'
import {
  mapDispatchToProps as shipListMdtp,
} from '../../../store/reducer/ship-list'

import { translateSelector } from '../../../selectors'

const resetOptions = []
const defineReset = (id, desc) => resetOptions.push({id, desc})

defineReset('all', 'All')
defineReset('expedConfigs', 'ExpedConfigs')
defineReset('shipList', 'ShipList')

class ResetAreaImpl extends Component {
  static propTypes = {
    factoryReset: PTyp.func.isRequired,
    resetExpedConfigs: PTyp.func.isRequired,
    resetShipList: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      resetFocus: resetOptions[0].id,
      showModal: false,
    }
  }

  getCurrentDesc = () => {
    const {resetFocus} = this.state
    const resetDef = resetOptions.find(r => r.id === resetFocus)
    return resetDef.desc
  }

  handleChangeResetFocus = id => () => {
    const {resetFocus} = this.state
    if (resetFocus === id)
      return
    this.setState({resetFocus: id})
  }

  handleOpenResetModal = () =>
    this.setState({showModal: true})

  handleCloseResetModal = () =>
    this.setState({showModal: false})

  handleReset = () => {
    this.handleCloseResetModal()
    const {resetFocus} = this.state
    /* eslint-disable indent */
    const resetFunc =
      resetFocus === 'all' ? this.props.factoryReset :
      resetFocus === 'expedConfigs' ? this.props.resetExpedConfigs :
      resetFocus === 'shipList' ? this.props.resetShipList :
      console.error(`Unknown reset type ${resetFocus}`)
    /* eslint-enable indent */
    resetFunc()
  }

  render() {
    const {tr} = this.props
    const {resetFocus, showModal} = this.state
    return (
      <div>
        <div style={{marginBottom: '.5em'}}>
          {tr('SettingsAndTools.General.Reset.Desc')}
        </div>
        <ButtonToolbar>
          {
            resetOptions.map(({id,desc}) => {
              const isActive = id === resetFocus
              return (
                <Button
                  active={isActive}
                  onClick={this.handleChangeResetFocus(id)}
                  bsStyle={isActive ? 'danger' : 'default'}
                  key={id}>
                  {tr(`SettingsAndTools.General.Reset.${desc}`)}
                </Button>
              )
            })
          }
        </ButtonToolbar>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            onClick={this.handleOpenResetModal}
          >
            {tr('SettingsAndTools.General.Reset.Reset')}
          </Button>
        </div>
        <Modal
          onHide={this.handleCloseResetModal}
          show={showModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {tr('SettingsAndTools.General.Reset.ConfirmTitle')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Markdown
              source={
                tr(
                  'SettingsAndTools.General.Reset.ConfirmMsgMarkdown',
                  tr(`SettingsAndTools.General.Reset.${this.getCurrentDesc()}`)
                )
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseResetModal}>
              {tr('No')}
            </Button>
            <Button
              bsStyle="danger"
              onClick={this.handleReset}
            >
              {tr('Yes')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const ResetArea = connect(
  translateSelector,
  mergeMapDispatchToProps(
    rootMdtp,
    expedConfigsMdtp,
    shipListMdtp
  ),
)(ResetAreaImpl)

export { ResetArea }

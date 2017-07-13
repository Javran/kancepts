import React, { Component } from 'react'
import {
  Button, ButtonToolbar,
  Modal,
} from 'react-bootstrap'

const resetOptions = []
const defineReset = (id, desc) => resetOptions.push({id, desc})

defineReset('all', 'Everything')
defineReset('expedConfigs', 'Expedition Configs')
defineReset('shipList', 'Ship List')

class ResetArea extends Component {
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
    // TODO reset
  }

  render() {
    const {resetFocus, showModal} = this.state
    return (
      <div>
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
                  {desc}
                </Button>
              )
            })
          }
        </ButtonToolbar>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            onClick={this.handleOpenResetModal}
          >
            Reset
          </Button>
        </div>
        <Modal
          onHide={this.handleCloseResetModal}
          show={showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Resetting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to reset <strong>{this.getCurrentDesc()}</strong> ?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseResetModal}>No</Button>
            <Button
              bsStyle="danger"
              onClick={this.handleReset}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export { ResetArea }

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {
  Button,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'

class CellControl extends Component {
  static propTypes = {
    value: PTyp.node.isRequired,
    leftBtnContent: PTyp.node.isRequired,
    rightBtnContent: PTyp.node.isRequired,
  }
  render() {
    const {
      value,
      leftBtnContent, rightBtnContent,
    } = this.props
    const btnProps = {
      bsSize: 'small',
      style: {width: '2em'},
    }
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Button bsSize="xsmall" style={{width: '2em'}}>
          {leftBtnContent}
        </Button>
        <div style={{flex: 1, textAlign: 'center'}}>
          {value}
        </div>
        <Button bsSize="xsmall" style={{width: '2em'}}>
          {rightBtnContent}
        </Button>
      </div>
    )
  }
}

export { CellControl }

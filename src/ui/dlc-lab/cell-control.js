import _ from 'lodash'
import React, { Component } from 'react'
import {
  Button,
  Overlay,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'

class CellControl extends Component {
  static propTypes = {
    value: PTyp.node.isRequired,
    leftBtnContent: PTyp.node.isRequired,
    rightBtnContent: PTyp.node.isRequired,

    // for making every tooltip id unique
    prefix: PTyp.string,

    leftBtnTooltip: PTyp.node,
    rightBtnTooltip: PTyp.node,

    // action of clicking left and right button
    // button and tooltip are disabled if this is not set
    leftAction: PTyp.func,
    rightAction: PTyp.func,
  }

  static defaultProps = {
    leftBtnTooltip: null,
    rightBtnTooltip: null,
    prefix: '',
    leftAction: null,
    rightAction: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      showLeft: false,
      showRight: false,
    }
  }

  handleToggleVisibility = which => value => {
    if (which === 'left') {
      return (/* event ignored */) =>
        this.setState({showLeft: value})
    }
    if (which === 'right') {
      return (/* event ignored */) =>
        this.setState({showRight: value})
    }
  }

  render() {
    const {
      prefix,
      value,
      leftBtnContent,
      rightBtnContent,
      leftBtnTooltip,
      rightBtnTooltip,
      leftAction,
      rightAction,
    } = this.props
    const hasLeftAction = typeof leftAction === 'function'
    const hasRightAction = typeof rightAction === 'function'
    const handleLeft = _.memoize(this.handleToggleVisibility('left'))
    const leftExtraProps = leftBtnTooltip ? {
      ref: r => { this.leftRef = r },
      onFocus: handleLeft(true),
      onBlur: handleLeft(false),
      onMouseOver: handleLeft(true),
      onMouseOut: handleLeft(false),
    } : {}

    const handleRight = _.memoize(this.handleToggleVisibility('right'))
    const rightExtraProps = rightBtnTooltip ? {
      ref: r => { this.rightRef = r },
      onFocus: handleRight(true),
      onBlur: handleRight(false),
      onMouseOver: handleRight(true),
      onMouseOut: handleRight(false),
    } : {}

    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Button
          {...leftExtraProps}
          disabled={!hasLeftAction}
          onClick={leftAction}
          bsSize="xsmall" style={{width: '2em'}}
        >
          {leftBtnContent}
        </Button>
        <div style={{flex: 1, textAlign: 'center'}}>
          {value}
        </div>
        <Button
          {...rightExtraProps}
          disabled={!hasRightAction}
          onClick={rightAction}
          bsSize="xsmall" style={{width: '2em'}}
        >
          {rightBtnContent}
        </Button>
        {
          leftBtnTooltip && (
            <Overlay
              show={this.state.showLeft && hasLeftAction}
              style={{margin: 0, padding: 0}}
              placement="bottom"
              target={() => this.leftRef}>
              <Tooltip id={`${prefix}left`}>
                {leftBtnTooltip}
              </Tooltip>
            </Overlay>
          )
        }
        {
          rightBtnTooltip && (
            <Overlay
              show={this.state.showRight && hasRightAction}
              placement="bottom"
              target={() => this.rightRef}>
              <Tooltip id={`${prefix}right`}>
                {rightBtnTooltip}
              </Tooltip>
            </Overlay>
          )
        }
      </div>
    )
  }
}

export { CellControl }

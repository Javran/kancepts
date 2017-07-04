import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap'
import { tableUISelector } from '../../selectors'
import { mapDispatchToProps } from '../../store/reducer/ui/table'
import { ItemIcon } from '../item-icon'
import { resourceProperties } from '../../exped-info'
import { PTyp } from '../../ptyp'

const reverseDirection = x =>
  x === 'asc' ? 'desc' :
  x === 'desc' ? 'asc' :
  console.error(`expecting asc/desc while getting ${x}`)

class TableControlImpl extends Component {
  static propTypes = {
    control: PTyp.object.isRequired,
    modifyTableUI: PTyp.func.isRequired,
  }

  handleViewDivideChange = divide => () => {
    const {modifyTableUI} = this.props
    modifyTableUI(opts => ({
      ...opts,
      view: {
        ...opts.view,
        divide,
      },
    }))
  }

  handleViewIncomeChange = income => () => {
    const {modifyTableUI} = this.props
    modifyTableUI(opts => ({
      ...opts,
      view: {
        ...opts.view,
        income,
      },
    }))
  }

  handleViewNumericToggle = () => {
    const {modifyTableUI} = this.props
    modifyTableUI(opts => ({
      ...opts,
      view: {
        ...opts.view,
        numeric: !opts.view.numeric,
      },
    }))
  }

  handleChangeSorter = (isActive, method) => () => {
    const {modifyTableUI} = this.props
    if (isActive) {
      // clicking an already active sort button simply flips 'reversed' flag
      modifyTableUI(opts => ({
        ...opts,
        sort: {
          ...opts.sort,
          reversed: !opts.sort.reversed,
        },
      }))
    } else {
      // clicking on non-active sort button switches to that one
      // and 'reversed' flag is cleared.
      modifyTableUI(opts => ({
        ...opts,
        sort: {
          ...opts.sort,
          method,
          reversed: false,
        },
      }))
    }
  }

  render() {
    const rowStyle = {display: 'flex', alignItems: 'center', marginBottom: 10}
    const headerStyle = {marginRight: 5, width: '4%', minWidth: '45px'}
    const sorterBtnStyle = {minWidth: 90}
    const {control} = this.props
    return (
      <div>
        <div style={rowStyle}>
          <div style={headerStyle}>View</div>
          <ButtonToolbar>
            <ButtonGroup>
              {
                [
                  ['total', 'Total'],
                  ['hourly', 'Hourly'],
                ].map(([id, title]) => (
                  <Button
                    onClick={this.handleViewDivideChange(id)}
                    key={id}
                    active={control.view.divide === id}>
                    {title}
                  </Button>
                ))
              }
            </ButtonGroup>
            <ButtonGroup>
              {
                [
                  ['gross', 'Gross Income'],
                  ['net', 'Net Income'],
                  ['basic', 'Basic Income'],
                ].map(([id, title]) => (
                  <Button
                    onClick={this.handleViewIncomeChange(id)}
                    key={id}
                    active={control.view.income === id}>
                    {title}
                  </Button>
                ))
              }
            </ButtonGroup>
            <ButtonGroup>
              <Button
                onClick={this.handleViewNumericToggle}
                active={control.view.numeric}>
                Numeric View
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div style={rowStyle}>
          <div style={headerStyle}>Sort</div>
          <ButtonToolbar>
            <ButtonGroup>
              {
                [
                  ['id', 'Id', 'asc'],
                  ['time', 'Time', 'asc'],
                  ...resourceProperties.map(rp =>
                    [rp, <ItemIcon name={rp} style={{width: '1em'}} />, 'desc']),
                ].map(([id,content,originDir]) => {
                  const isActive = control.sort.method === id
                  // determine which direction should arrow point to
                  const dir = isActive &&
                    (control.sort.reversed ? reverseDirection : _.identity)(originDir)
                  return (
                    <Button
                      key={id}
                      active={control.sort.method === id}
                      onClick={this.handleChangeSorter(isActive,id)}
                      style={sorterBtnStyle}>
                      <span>{content}</span>
                      { dir &&
                        <FontAwesome
                          style={{width: '1em', marginLeft: '0.2em'}}
                          name={`sort-${dir}`}
                        />
                      }
                    </Button>
                  )
                })
              }
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

const TableControl = connect(
  state => {
    const control = tableUISelector(state)
    return {control}
  },
  mapDispatchToProps)(TableControlImpl)

export { TableControl }

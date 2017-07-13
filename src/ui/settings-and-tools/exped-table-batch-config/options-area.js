import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid, Col, Row,
  FormControl,
} from 'react-bootstrap'

import { ItemIcon } from '../../item-icon'
import { enumFromTo, modifyObject } from '../../../utils'
import { PTyp } from '../../../ptyp'
import {
  mapDispatchToProps,
} from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { expedBatchConfigSelector } from './selectors'

class OptionsAreaImpl extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
    options: PTyp.object.isRequired,
    selected: PTyp.array.isRequired,
    modifyBatchConfig: PTyp.func.isRequired,
  }

  modifyOptions = modifier =>
    this.props.modifyBatchConfig(
      modifyObject('options', modifier))

  handleChangeValue = which => e => {
    const value = e.target.value
    this.modifyOptions(
      modifyObject(
        which,
        () => value
      )
    )
  }

  render() {
    const {
      formRowStyle,
      selected,
      options,
    } = this.props
    const disabled = selected.length === 0
    return (
      <Col md={9} style={formRowStyle}>
        <Grid style={{width: '100%'}}>
          <Row>
            <Col md={3}>
              <ItemIcon name="dlc" style={{width: '2.5em'}} />
            </Col>
            <Col md={9}>
              <FormControl
                disabled={disabled}
                style={{
                  ...formRowStyle,
                }}
                onChange={this.handleChangeValue('dlcCount')}
                value={options.dlcCount}
                componentClass="select">
                {
                  enumFromTo(0,4).reverse().map(x => (
                    <option value={x} key={x}>{x}</option>
                  ))
                }
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              Ship Count
            </Col>
            <Col md={9}>
              <FormControl
                disabled={disabled}
                style={{
                  ...formRowStyle,
                }}
                onChange={this.handleChangeValue('shipCount')}
                value={options.shipCount}
                componentClass="select">
                {
                  enumFromTo(4,6).reverse().map(x => (
                    <option value={x} key={x}>{x}</option>
                  ))
                }
              </FormControl>
            </Col>
          </Row>
        </Grid>
      </Col>
    )
  }
}

const OptionsArea = connect(
  expedBatchConfigSelector,
  mapDispatchToProps
)(OptionsAreaImpl)

export { OptionsArea }

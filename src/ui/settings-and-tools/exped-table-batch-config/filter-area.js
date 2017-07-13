import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Checkbox,
  FormGroup,
  FormControl,
} from 'react-bootstrap'

import { PTyp } from '../../../ptyp'
import { modifyObject } from '../../../utils'
import {
  mapDispatchToProps,
} from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { filterStateSelector } from './selectors'

class FilterAreaImpl extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
    formElemStyle: PTyp.object.isRequired,
    expedTime: PTyp.object.isRequired,
    resourceSum: PTyp.object.isRequired,
    connective: PTyp.object.isRequired,
    modifyBatchConfig: PTyp.func.isRequired,
  }

  modifyFilter = modifier =>
    this.props.modifyBatchConfig(
      modifyObject('filter', modifier))

  handleToggleFilter = which => e => {
    const enabled = e.target.checked
    this.modifyFilter(
      modifyObject(
        which,
        modifyObject(
          'enabled',
          () => enabled
        )
      )
    )
  }

  handleChangeValue = which => e => {
    const value = Number(e.target.value)
    if (_.isInteger(value) && value >= 0) {
      this.modifyFilter(
        modifyObject(
          which,
          modifyObject(
            'value',
            () => value
          )
        )
      )
    }
  }

  handleChangeConnective = e => {
    const value = e.target.value
    this.modifyFilter(
      modifyObject(
        'connective',
        modifyObject(
          'value',
          () => value
        )
      )
    )
  }

  render() {
    const {
      formRowStyle, formElemStyle,
      expedTime, resourceSum, connective,
    } = this.props
    return (
      <Col md={9} style={{
        ...formRowStyle,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <FormGroup style={{
          ...formRowStyle,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Checkbox
            onChange={this.handleToggleFilter('expedTime')}
            checked={expedTime.enabled}
            style={formElemStyle}>
            Expedition Time ≥
          </Checkbox>
          <FormControl
            onChange={this.handleChangeValue('expedTime')}
            style={{
              ...formElemStyle,
              width: '10em',
            }}
            type="number"
            disabled={!expedTime.enabled}
            value={expedTime.value}
          />
          <span style={formElemStyle}>
            mins
          </span>
        </FormGroup>
        <FormControl
          style={{
            ...formRowStyle,
            maxWidth: '10em',
          }}
          disabled={!connective.enabled}
          value={connective.value}
          onChange={this.handleChangeConnective}
          componentClass="select">
          <option value="and">AND</option>
          <option value="or">OR</option>
        </FormControl>
        <FormGroup style={{
          ...formRowStyle,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Checkbox
            onChange={this.handleToggleFilter('resourceSum')}
            checked={resourceSum.enabled}
            style={formElemStyle}>
            Sum of Raw Resources ≥
          </Checkbox>
          <FormControl
            onChange={this.handleChangeValue('resourceSum')}
            style={{
              ...formElemStyle,
              width: '10em',
            }}
            type="number"
            disabled={!resourceSum.enabled}
            value={resourceSum.value}
          />
        </FormGroup>
      </Col>
    )
  }
}

const FilterArea = connect(
  filterStateSelector,
  mapDispatchToProps,
)(FilterAreaImpl)

export { FilterArea }

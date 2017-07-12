import React, { Component } from 'react'
import {
  Col,
  Checkbox,
  FormGroup,
  FormControl,
} from 'react-bootstrap'

import { PTyp } from '../../../ptyp'

class FilterArea extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
    formElemStyle: PTyp.object.isRequired,
  }

  render() {
    const {formRowStyle, formElemStyle} = this.props
    return (
      <Col md={9} style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <FormGroup style={{
          ...formRowStyle,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Checkbox style={formElemStyle}>
            Expedition Time ≥
          </Checkbox>
          <FormControl
            style={{
              ...formElemStyle,
              width: '10em',
            }}
            type="number"
          />
          <span style={formElemStyle}>
            mins
          </span>
        </FormGroup>
        <FormControl
          style={{
            ...formRowStyle,
            width: 'auto',
          }}
          componentClass="select">
          <option value="and">AND</option>
          <option value="or">OR</option>
        </FormControl>
        <FormGroup style={{
          ...formRowStyle,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Checkbox style={formElemStyle}>
            Sum of Raw Resources ≥
          </Checkbox>
          <FormControl
            style={{
              ...formElemStyle,
              width: '10em',
            }}
            type="number"
          />
        </FormGroup>
      </Col>
    )
  }
}

export { FilterArea }

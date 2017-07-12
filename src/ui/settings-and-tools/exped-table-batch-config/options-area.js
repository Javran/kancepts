import React, { Component } from 'react'
import {
  Grid, Col, Row,
  FormControl,
} from 'react-bootstrap'

import { ItemIcon } from '../../item-icon'
import { enumFromTo } from '../../../utils'
import { PTyp } from '../../../ptyp'

class OptionsArea extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
  }

  render() {
    const {formRowStyle} = this.props
    return (
      <Col md={9}>
        <Grid style={{width: '100%'}}>
          <Row>
            <Col md={3}>
              <ItemIcon name="dlc" style={{width: '2.5em'}} />
            </Col>
            <Col md={9}>
              <FormControl
                style={{
                  ...formRowStyle,
                }}
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
                style={{
                  ...formRowStyle,
                }}
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

export { OptionsArea }

import React, { Component } from 'react'
import {
  Col,
  Label,
} from 'react-bootstrap'

import { enumFromTo } from '../../../utils'

class SelectedExpedsArea extends Component {
  render() {
    return (
      <Col md={9} style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {
          enumFromTo(1,40).map(x => (
            <Label key={x} style={{
              fontSize: '.9em',
              marginRight: '.2em',
              marginBottom: '.2em',
              width: '3em',
            }}>{x}</Label>
          ))
        }
      </Col>
    )
  }
}

export { SelectedExpedsArea }

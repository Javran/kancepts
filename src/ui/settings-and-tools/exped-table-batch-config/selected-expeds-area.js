import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Label,
} from 'react-bootstrap'

import { selectedExpedsSelector } from './selectors'
import { mapDispatchToProps } from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { PTyp } from '../../../ptyp'

class SelectedExpedsAreaImpl extends Component {
  static propTypes = {
    selectedExpeds: PTyp.arrayOf(PTyp.number).isRequired,
    modifyBatchConfig: PTyp.func.isRequired,
  }

  render() {
    const {selectedExpeds} = this.props
    return (
      <Col md={9} style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {
          selectedExpeds.map(x => (
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

const SelectedExpedsArea = connect(
  state => {
    const selectedExpeds = selectedExpedsSelector(state)
    return {selectedExpeds}
  },
  mapDispatchToProps,
)(SelectedExpedsAreaImpl)

export { SelectedExpedsArea }

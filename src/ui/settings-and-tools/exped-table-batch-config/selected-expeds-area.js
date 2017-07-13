import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import {
  Col,
  Label,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { selectedExpedsSelector } from './selectors'
import { mapDispatchToProps } from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { PTyp } from '../../../ptyp'
import { modifyObject } from '../../../utils'
import { ExpedDetail } from './exped-detail'

class SelectedExpedsAreaImpl extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
    selectedExpeds: PTyp.arrayOf(PTyp.number).isRequired,
    modifyBatchConfig: PTyp.func.isRequired,
  }

  modifySelected = modifier =>
    this.props.modifyBatchConfig(
      modifyObject('selected', modifier))

  handleRemoveExped = id => () =>
    this.modifySelected(
      selected => selected.filter(x => x !== id))

  render() {
    const {selectedExpeds, formRowStyle} = this.props
    return (
      <Col md={9} style={{
        ...formRowStyle,
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {
          selectedExpeds.length > 0 ? (
            selectedExpeds.map(id => (
              <OverlayTrigger
                key={id}
                placement="left"
                overlay={
                  <Tooltip id={`batch-config-selected-${id}`}>
                    <ExpedDetail id={id} />
                  </Tooltip>
                }>
                <Label style={{
                  fontSize: '.9em',
                  marginRight: '.2em',
                  marginBottom: '.2em',
                  width: '5.2em',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <div style={{width: '3em'}}>
                    {id}
                  </div>
                  <Button
                    onClick={this.handleRemoveExped(id)}
                    bsStyle="warning" bsSize="xsmall">
                    <FontAwesome name="close" />
                  </Button>
                </Label>
              </OverlayTrigger>
            ))
          ) : 'None'
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

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
import { modifyObject } from 'subtender'

import { selectedExpedsSelector } from './selectors'
import { mapDispatchToProps } from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { PTyp } from '../../../ptyp'
import { ExpedDetail } from './exped-detail'
import { translateSelector } from '../../../selectors'
import { getExpedInfo } from '../../../exped-info'

class SelectedExpedsAreaImpl extends Component {
  static propTypes = {
    formRowStyle: PTyp.object.isRequired,
    selectedExpeds: PTyp.arrayOf(PTyp.number).isRequired,
    modifyBatchConfig: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  modifySelected = modifier =>
    this.props.modifyBatchConfig(
      modifyObject('selected', modifier))

  handleRemoveExped = id => () =>
    this.modifySelected(
      selected => selected.filter(x => x !== id))

  render() {
    const {selectedExpeds, formRowStyle, tr} = this.props
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
                    <ExpedDetail id={id} tr={tr} />
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
                    {getExpedInfo(id).dispNum}
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
    const {tr} = translateSelector(state)
    return {selectedExpeds,tr}
  },
  mapDispatchToProps,
)(SelectedExpedsAreaImpl)

export { SelectedExpedsArea }

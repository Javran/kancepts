import React, { Component } from 'react'
import {
  Grid, Col, Row,
  Alert,
} from 'react-bootstrap'

import { FilterArea } from './filter-area'
import { SelectedExpedsArea } from './selected-expeds-area'
import { OptionsArea } from './options-area'
import { ExecuteButton } from './execute-button'

class ExpedTableBatchConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
    }
  }

  handleDismissMessage = () =>
    this.setState({message: null})

  handlePostMessage = message =>
    this.setState({message})

  render() {
    const formElemStyle = {
      marginLeft: '.4em',
    }
    const formRowStyle = {
      marginBottom: '.5em',
    }
    const {message} = this.state
    return (
      <div>
        <div style={{marginBottom: '1em'}}>
          This tool can apply great success configs on
          multiple expeditions at once.
        </div>
        <Grid style={{width: '100%'}}>
          <Row>
            <Col md={3}>
              Filter
            </Col>
            <FilterArea
              formRowStyle={formRowStyle}
              formElemStyle={formElemStyle}
            />
          </Row>
          <Row>
            <Col md={3}>
              Selected Expeditions
            </Col>
            <SelectedExpedsArea
              formRowStyle={formRowStyle}
            />
          </Row>
          <Row>
            <Col md={3}>
              Options
            </Col>
            <OptionsArea
              formRowStyle={formRowStyle}
            />
          </Row>
          <Row>
            <Col md={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <ExecuteButton
                onPostMessage={this.handlePostMessage}
              />
            </Col>
          </Row>
        </Grid>
        {
          message && (
            <Alert
              onDismiss={this.handleDismissMessage}
              style={{marginTop: '1em'}}
              bsStyle="success">
              {message}
            </Alert>
          )
        }
      </div>
    )
  }
}

export { ExpedTableBatchConfig }

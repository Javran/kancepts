import React, { Component } from 'react'
import {
  Grid, Col, Row,
  Button,
} from 'react-bootstrap'

import { FilterArea } from './filter-area'
import { SelectedExpedsArea } from './selected-expeds-area'
import { OptionsArea } from './options-area'

class ExpedTableBatchConfig extends Component {
  render() {
    const formElemStyle = {
      marginLeft: '.4em',
    }
    const formRowStyle = {
      marginBottom: '.5em',
    }
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
            <SelectedExpedsArea />
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
              <Button>
                Execute
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export { ExpedTableBatchConfig }

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid, Col, Row,
  Alert,
} from 'react-bootstrap'

import { FilterArea } from './filter-area'
import { SelectedExpedsArea } from './selected-expeds-area'
import { OptionsArea } from './options-area'
import { ExecuteButton } from './execute-button'

import { translateSelector } from '../../../selectors'
import { PTyp } from '../../../ptyp'

class ExpedTableBatchConfigImpl extends Component {
  static propTypes = {
    tr: PTyp.func.isRequired,
  }

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
    const {tr} = this.props
    return (
      <div>
        <div style={{marginBottom: '1em'}}>
          {tr('SettingsAndTools.ExpedTable.BatchConfig.Desc')}
        </div>
        <Grid style={{width: '100%'}}>
          <Row>
            <Col md={3}>
              {tr('SettingsAndTools.ExpedTable.BatchConfig.Filter')}
            </Col>
            <FilterArea
              formRowStyle={formRowStyle}
              formElemStyle={formElemStyle}
            />
          </Row>
          <Row>
            <Col md={3}>
              {tr('SettingsAndTools.ExpedTable.BatchConfig.SelectedExpeds')}
            </Col>
            <SelectedExpedsArea
              formRowStyle={formRowStyle}
            />
          </Row>
          <Row>
            <Col md={3}>
              {tr('SettingsAndTools.ExpedTable.BatchConfig.Options')}
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

const ExpedTableBatchConfig = connect(translateSelector)(ExpedTableBatchConfigImpl)

export { ExpedTableBatchConfig }

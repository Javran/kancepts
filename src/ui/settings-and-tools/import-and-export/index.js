import React, { Component } from 'react'
import {
  Tab, Row, Col,
  NavItem, Nav,
  Alert,
} from 'react-bootstrap'

import { ImportArea } from './import-area'
import { ExportArea } from './export-area'

class ImportAndExport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'export',
      message: null,
      /*
         when non-empty:
         message: {content: <node>, bsStyle: <string>}
       */
    }
  }

  handleSelectMode = mode =>
    this.setState({mode})

  handlePostMessage = (bsStyle, content) =>
    this.setState({message: {bsStyle, content}})

  handleDismissMessage = () =>
    this.setState({message: null})

  render() {
    const {mode, message} = this.state

    return (
      <div>
        <Tab.Container
          id="settings-import-and-export"
          onSelect={this.handleSelectMode}
          style={{marginBottom: '.5em'}}
          activeKey={mode}>
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="import">
                  Import
                </NavItem>
                <NavItem eventKey="export">
                  Export
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="import">
                  <ImportArea
                    onPostMessage={this.handlePostMessage}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="export">
                  <ExportArea
                    onPostMessage={this.handlePostMessage}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        {
          message && (
            <Alert
              onDismiss={this.handleDismissMessage}
              bsStyle={message.bsStyle}>
              {message.content}
            </Alert>
          )
        }
      </div>
    )
  }
}

export { ImportAndExport }

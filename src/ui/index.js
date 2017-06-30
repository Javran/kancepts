import React, { Component } from 'react'
import {
  Tab,
  Row, Col,
  Nav, NavItem,
} from 'react-bootstrap'

import { ExpedTable } from './exped-table'
import { ShipList } from './ship-list'
import { CostModel } from './cost-model'

class ExpedRecommender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: 'cost-model',
    }
  }

  handleSelectTab = activeKey =>
    this.setState({activeKey})

  render() {
    return (
      <div style={{padding: 20}}>
        <Tab.Container
          id="tab-picker"
          onSelect={this.handleSelectTab}
          activeKey={this.state.activeKey}>
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="planner">
                  Planner
                </NavItem>
                <NavItem eventKey="config">
                  Table & Config
                </NavItem>
                <NavItem eventKey="cost-model">
                  Cost Model
                </NavItem>
                <NavItem eventKey="ship-list">
                  Ship List
                </NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="planner">
                  planner placeholder
                </Tab.Pane>
                <Tab.Pane eventKey="config">
                  <ExpedTable />
                </Tab.Pane>
                <Tab.Pane eventKey="cost-model">
                  <CostModel />
                </Tab.Pane>
                <Tab.Pane eventKey="ship-list">
                  <ShipList />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

export { ExpedRecommender }

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  Row, Col,
  Nav, NavItem,
} from 'react-bootstrap'

import { Planner } from './planner'
import { ExpedTable } from './exped-table'
import { ShipList } from './ship-list'
import { CostModel } from './cost-model'
import { DlcLab } from './dlc-lab'
import { observeAll } from '../observer'
import { currentTabSelector } from '../selectors'
import { mapDispatchToProps } from '../store/reducer/ui/current-tab'
import { PTyp } from '../ptyp'

class KanceptsMainImpl extends Component {
  static propTypes = {
    currentTab: PTyp.string.isRequired,
    switchTab: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.unsubscribe = null
  }

  componentDidMount() {
    if (this.unsubscribe !== null) {
      console.error(`unsubscribe function should be null`)
    }
    this.unsubscribe = observeAll()
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe !== 'function') {
      console.error(`invalid unsubscribe function`)
    } else {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  handleSelectTab = activeKey =>
    this.props.switchTab(activeKey)

  render() {
    return (
      <div style={{padding: 20}}>
        <Tab.Container
          id="tab-picker"
          onSelect={this.handleSelectTab}
          activeKey={this.props.currentTab}>
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="planner">
                  Planner
                </NavItem>
                <NavItem eventKey="table">
                  Table
                </NavItem>
                <NavItem eventKey="cost-model">
                  Cost Model
                </NavItem>
                <NavItem eventKey="ship-list">
                  Ship List
                </NavItem>
                <NavItem eventKey="dlc-lab">
                  DLC Lab
                </NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="planner">
                  <Planner />
                </Tab.Pane>
                <Tab.Pane eventKey="table">
                  <ExpedTable />
                </Tab.Pane>
                <Tab.Pane eventKey="cost-model">
                  <CostModel />
                </Tab.Pane>
                <Tab.Pane eventKey="ship-list">
                  <ShipList />
                </Tab.Pane>
                <Tab.Pane eventKey="dlc-lab">
                  <DlcLab />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

const KanceptsMain = connect(
  state => {
    const currentTab = currentTabSelector(state)
    return {currentTab}
  },
  mapDispatchToProps,
)(KanceptsMainImpl)

export { KanceptsMain }

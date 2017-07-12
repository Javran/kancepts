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

const tabs = []
const defineTab = (id, desc, TabComponent) =>
  tabs.push({id, desc, TabComponent})

defineTab('planner', 'Planner', Planner)
defineTab('table', 'Table', ExpedTable)
defineTab('cost-model', 'Cost Model', CostModel)
defineTab('ship-list', 'Ship List', ShipList)
defineTab('dlc-lab', 'DLC Lab', DlcLab)

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
                {
                  tabs.map(({id,desc}) => (
                    <NavItem eventKey={id} key={id}>
                      {desc}
                    </NavItem>
                  ))
                }
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {
                  tabs.map(({id,TabComponent}) => (
                    <Tab.Pane eventKey={id} key={id}>
                      <TabComponent />
                    </Tab.Pane>
                  ))
                }
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

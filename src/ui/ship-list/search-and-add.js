import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import {
  Panel, Grid, Row, Col,
  DropdownButton, ButtonGroup, ButtonToolbar,
  Button, MenuItem,
} from 'react-bootstrap'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'
import { searchAndAddUISelector } from './selectors'
import { translateSelector } from '../../selectors'
import { mapDispatchToProps as shipListUIMdtp } from '../../store/reducer/ui/ship-list'
import { mapDispatchToProps as shipListMdtp } from '../../store/reducer/ship-list'
import {
  modifyObject,
  mergeMapDispatchToProps,
  mergeMapStateToProps,
} from '../../utils'
import {
  $shipTypeArray,
  $ships,
  pprShipType,
  masterIdsGrouppedBySType,
} from '../../master-data'

class SearchAndAddImpl extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
    stype: PTyp.number.isRequired,
    masterId: PTyp.number.isRequired,
    ring: PTyp.bool.isRequired,
    count: PTyp.number.isRequired,
    modifyShipListUI: PTyp.func.isRequired,
    modifyShipList: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
    trN: PTyp.func.isRequired,
  }

  modifyUI = modifier =>
    this.props.modifyShipListUI(
      modifyObject('searchAndAdd',modifier))

  handleToggleRing = () =>
    this.modifyUI(modifyObject('ring', r => !r))

  handleSelectShipType = stype =>
    this.modifyUI(ui => {
      let needUpdateMasterId
      const newUI = modifyObject('stype', oldSType => {
        needUpdateMasterId = oldSType !== stype
        return stype
      })(ui)
      if (needUpdateMasterId) {
        return modifyObject(
          'masterId',
          oldMasterId =>
            masterIdsGrouppedBySType[stype][0] || oldMasterId
        )(newUI)
      } else {
        return newUI
      }
    })

  handleSelectShip = masterId =>
    this.modifyUI(
      modifyObject('masterId', () => masterId))

  handleAddShip = () => {
    const {masterId, ring, modifyShipList} = this.props
    const partialShip = {id: masterId, ring}
    modifyShipList(shipList => {
      const rosterId = 1 + _.max(shipList.map(x => x.rosterId))
      return [...shipList, {...partialShip, rosterId}]
    })
  }

  render() {
    const {
      style,
      stype, masterId,
      ring, count,
      tr, trN,
    } = this.props
    const $ship = $ships[masterId]
    return (
      <Panel
        style={style}
        className="shiplist-panel"
        header={tr('ShipList.SearchAndAdd.Title')}
      >
        <Grid style={{
          marginTop: '.4em',
          marginBottom: '.4em',
          width: '100%',
        }}>
          <Row>
            <Col sm={5}>
              <ButtonGroup justified>
                <DropdownButton
                  onSelect={this.handleSelectShipType}
                  bsSize="small"
                  id="shiplist-search-and-add-ship-type"
                  title={pprShipType(stype)}
                >
                  {
                    $shipTypeArray.map(raw => {
                      const curStype = raw.api_id
                      return (
                        <MenuItem key={curStype} eventKey={curStype}>
                          {pprShipType(curStype)}
                        </MenuItem>
                      )
                    })
                  }
                </DropdownButton>
              </ButtonGroup>
            </Col>
            <Col sm={7}>
              <ButtonGroup justified>
                <DropdownButton
                  onSelect={this.handleSelectShip}
                  bsSize="small"
                  id="shiplist-search-and-add-ship-name"
                  title={$ship.api_name}
                >
                  {
                    masterIdsGrouppedBySType[stype].map(curMstId => (
                      <MenuItem key={curMstId} eventKey={curMstId}>
                        {$ships[curMstId].api_name}
                      </MenuItem>
                    ))
                  }
                </DropdownButton>
              </ButtonGroup>
            </Col>
          </Row>
          <Row style={{marginTop: '.4em'}}>
            <Col sm={12} style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                {tr('ShipList.SearchAndAdd.SearchResult',trN('ShipN',count))}
              </div>
              <ButtonToolbar>
                <Button
                  onClick={this.handleToggleRing}
                  bsStyle={ring ? 'primary' : 'default'}
                  style={ring ? {} : {opacity: .5}}
                  bsSize="small">
                  <ItemIcon
                    name="ring" style={{width: '1em'}}
                  />
                </Button>
                <Button
                  onClick={this.handleAddShip}
                  bsSize="small" style={{minWidth: '5em'}}>
                  <FontAwesome name="plus" />
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

const SearchAndAdd = connect(
  mergeMapStateToProps(
    searchAndAddUISelector,
    translateSelector
  ),
  mergeMapDispatchToProps(
    shipListUIMdtp,
    shipListMdtp
  )
)(SearchAndAddImpl)

export { SearchAndAdd }

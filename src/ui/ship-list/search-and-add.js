import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {
  Panel, Grid, Row, Col,
  DropdownButton, ButtonGroup, ButtonToolbar,
  Button,
} from 'react-bootstrap'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

class SearchAndAdd extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
  }

  render() {
    const {style} = this.props
    return (
      <Panel
        style={style}
        className="shiplist-panel"
        header="Search & Add"
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
                  bsSize="small"
                  id="shiplist-search-and-add-ship-type"
                  title="Type"
                />
              </ButtonGroup>
            </Col>
            <Col sm={7}>
              <ButtonGroup justified>
                <DropdownButton
                  bsSize="small"
                  id="shiplist-search-and-add-ship-name"
                  title="Name"
                />
              </ButtonGroup>
            </Col>
          </Row>
          <Row style={{marginTop: '.4em'}}>
            <Col sm={12} style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>? ships found in current list</div>
              <ButtonToolbar>
                <Button bsSize="small">
                  <ItemIcon
                    name="ring" style={{width: '1em'}}
                  />
                </Button>
                <Button bsSize="small" style={{minWidth: '5em'}}>
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

export { SearchAndAdd }

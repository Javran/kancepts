import React, { Component } from 'react'
import {
  Grid, Col, Row,
  Button,
  Checkbox,
  Label,
  FormGroup,
  FormControl,
} from 'react-bootstrap'

import { ItemIcon } from '../../item-icon'
import { enumFromTo } from '../../../utils'

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
            <Col md={9} style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <FormGroup style={{
                ...formRowStyle,
                display: 'flex',
                alignItems: 'center',
              }}>
                <Checkbox style={formElemStyle}>
                  Expedition Time ≥
                </Checkbox>
                <FormControl
                  style={{
                    ...formElemStyle,
                    width: '10em',
                  }}
                  type="number"
                />
                <span style={formElemStyle}>
                  mins
                </span>
              </FormGroup>
              <FormControl
                style={{
                  ...formRowStyle,
                  width: 'auto',
                }}
                componentClass="select">
                <option value="and">AND</option>
                <option value="or">OR</option>
              </FormControl>
              <FormGroup style={{
                ...formRowStyle,
                display: 'flex',
                alignItems: 'center',
              }}>
                <Checkbox style={formElemStyle}>
                  Sum of Raw Resources ≥
                </Checkbox>
                <FormControl
                  style={{
                    ...formElemStyle,
                    width: '10em',
                  }}
                  type="number"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              Selected Expeditions
            </Col>
            <Col md={9} style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}>
              {
                enumFromTo(1,40).map(x => (
                  <Label key={x} style={{
                    fontSize: '.9em',
                    marginRight: '.2em',
                    marginBottom: '.2em',
                    width: '3em',
                  }}>{x}</Label>
                ))
              }
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              Options
            </Col>
            <Col md={9}>
              <Grid style={{width: '100%'}}>
                <Row>
                  <Col md={3}>
                    <ItemIcon name="dlc" style={{width: '2.5em'}} />
                  </Col>
                  <Col md={9}>
                    <FormControl
                      style={{
                        ...formRowStyle,
                      }}
                      componentClass="select">
                      {
                        enumFromTo(0,4).reverse().map(x => (
                          <option value={x} key={x}>{x}</option>
                        ))
                      }
                    </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    Ship Count
                  </Col>
                  <Col md={9}>
                    <FormControl
                      style={{
                        ...formRowStyle,
                      }}
                      componentClass="select">
                      {
                        enumFromTo(4,6).reverse().map(x => (
                          <option value={x} key={x}>{x}</option>
                        ))
                      }
                    </FormControl>
                  </Col>
                </Row>
              </Grid>
            </Col>
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

import React, { Component } from 'react'
import {
  Panel,
  Form, FormControl,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'

class AfkTimePanel extends Component {
  static propTypes = {
    style: PTyp.object,
    afkTime: PTyp.number.isRequired,
    onChangeAfkTime: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style, afkTime, onChangeAfkTime} = this.props
    return (
      <Panel
        style={style}
        header="AFK Time"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Form inline style={{width: '60%', flex: 1}}>
            <FormControl
              onChange={onChangeAfkTime}
              value={afkTime}
              type="number" style={{width: '100%'}}
            />
          </Form>
          <div style={{marginLeft: '.5em'}}>
            Mins
          </div>
        </div>
      </Panel>
    )
  }
}

export { AfkTimePanel }

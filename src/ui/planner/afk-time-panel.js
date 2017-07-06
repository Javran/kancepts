import React, { Component } from 'react'
import {
  Panel,
  Form, FormControl,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'

/*
   TODO: input mechanism: having two text fields: "hrs" and "mins"

   - state is kept internally in this Component

   - a change in property afkTime updates both fields

   - a text field edit changes the corresponding field immediately,
     but update only happens after a delay (1s perhaps?)

   - if the field contains error, afkTime property is used to restore states
     instead of updating actual afkTime.

 */

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

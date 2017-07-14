import React, { PureComponent } from 'react'
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import { PTyp } from '../../ptyp'
import { resourceColor } from '../../exped-info'
import { ItemIcon } from '../item-icon'

class Cell extends PureComponent {
  static propTypes = {
    cost: PTyp.shape({
      fuelCost: PTyp.number.isRequired,
      ammoCost: PTyp.number.isRequired,
      fleet: PTyp.array.isRequired,
    }),
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    cost: null,
  }

  render() {
    const {cost, tr} = this.props
    if (cost === null) {
      return (
        <div>
          {tr('CostModel.NotAva')}
        </div>
      )
    }
    const {fuelCost, ammoCost} = cost
    const tooltip = (
      <Tooltip id="tooltip">
        <div>
          <div>{tr('CostModel.Examples')}:</div>
          {
            cost.fleet.map(({rosterId,shipName,ring}) => (
              <div
                key={rosterId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <div>{shipName}</div>
                {
                  ring && (
                    <ItemIcon
                      name="ring"
                      style={{
                        width: '1em',
                        marginLeft: '.2em',
                      }} />
                  )
                }
              </div>
            ))
          }
        </div>
      </Tooltip>)
    return (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <div>
          <div style={{
            fontWeight: 'bold',
            color: resourceColor.fuel,
          }} >
            {fuelCost}
          </div>
          <div style={{
            fontWeight: 'bold',
            color: resourceColor.ammo,
          }} >
            {ammoCost}
          </div>
        </div>
      </OverlayTrigger>
    )
  }
}

export { Cell }

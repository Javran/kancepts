import React, { PureComponent } from 'react'
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import { PTyp } from '../../ptyp'
import { resourceColor } from '../../exped-info'

class Cell extends PureComponent {
  static propTypes = {
    cost: PTyp.shape({
      fuelCost: PTyp.number.isRequired,
      ammoCost: PTyp.number.isRequired,
      nameList: PTyp.array.isRequired,
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
          {tr('NotAva')}
        </div>
      )
    }
    const {fuelCost, ammoCost} = cost
    const tooltip = (
      <Tooltip id="tooltip">
        <div>
          <div>{tr('CostModel.Examples')}:</div>
          {
            cost.nameList.map((n,ind) => (
              <div key={
                // eslint-disable-next-line react/no-array-index-key
                ind
              }>
                {n}
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

import _ from 'lodash'
import { createSelector } from 'reselect'
import { dlcLabUISelector } from '../../selectors'

const computeTokuFactor = (normalCount, tokuCount) => {
  if (tokuCount <= 2)
    return 0.02 * tokuCount
  if (tokuCount === 3) {
    /* eslint-disable indent */
    return normalCount <= 1 ? 0.05
      : normalCount === 2 ? 0.052
      : /* normalCount > 2 */ 0.054
    /* eslint-enable indent */
  }
  // tokuCount > 3
  /* eslint-disable indent */
  return normalCount === 0 ? 0.054
    : normalCount === 1 ? 0.056
    : normalCount === 2 ? 0.058
    : normalCount === 3 ? 0.059
    : /* normalCount > 3 */ 0.06
  /* eslint-enable indent */
}

// NOTE: unlike _.capitalize, we need to preserve rest of the content instead of
// turning them into lower ones
const capFirst = s => {
  if (typeof s !== 'string' || s.length === 0)
    return s

  if (s.length === 1)
    return s.toUpperCase()

  const x = s.substr(0,1)
  const xs = s.substr(1)
  return `${x.toUpperCase()}${xs}`
}

const dlcResultsSelector = createSelector(
  dlcLabUISelector,
  ui => {
    const {kinuK2, gsPercent, equipments, rawIncome} = ui
    const rows = []
    const createRow = (id, content, tooltip=null) =>
      rows.push({id,name: capFirst(id),content,tooltip})
    const incomeMod = 1+0.5*gsPercent/100
    createRow(
      'incomeMod',
      incomeMod.toFixed(4),
      `=1+0.5*${gsPercent}%`
    )
    const basicIncome = Math.floor(rawIncome*incomeMod)
    createRow(
      'basicIncome',
      basicIncome,
      `=${rawIncome}*${incomeMod.toFixed(4)}%`
    )

    const eqpCount =
      _.sum(
        _.compact(
          _.flatMap(
            Object.values(equipments),
            Object.values)))
    createRow('eqpCount', eqpCount)

    const starCount =
      _.sum(
        _.flatMap(
          Object.values(equipments),
          Object.entries
        ).map(([levelStr,count]) => Number(levelStr)*count)
      )

    const [aveImp, aveImpTooltip] = eqpCount === 0 ?
      [String(0), null] :
      [(starCount/eqpCount).toFixed(2), `=${starCount}/${eqpCount}`]
    createRow(
      'aveImp',
      aveImp, aveImpTooltip)
    const [normalCount,t89Count,t2Count,tokuCount,abCount,busoCount] =
      [68,166,167,193,408,409].map(id => {
        const equipment = equipments[id] || {}
        return _.sum(_.compact(Object.values(equipment)))
      })
    const spShipCount = kinuK2 ? 1 : 0

    const b1BeforeCap =
      0.05 * (normalCount + tokuCount + spShipCount) +
      0.03 * busoCount +
      0.02 * (t89Count + abCount) +
      0.01 * t2Count
    const b1 = Math.min(0.2, b1BeforeCap)
    const bStar = b1 * aveImp / 100
    const dlcBonus = Math.floor(basicIncome * (b1 + bStar))
    const dlcBonusTooltip =
      `=${basicIncome}x` +
      `(${(b1*100).toFixed(2)}%+` +
      `${(bStar*100).toFixed(2)}%)`

    createRow(
      'dlcBonus',
      String(dlcBonus), dlcBonusTooltip)

    const tokuFactor = computeTokuFactor(normalCount,tokuCount)
    const tokuBonus = Math.floor(basicIncome * tokuFactor)
    const tokuBonusTooltip =
      `=${basicIncome}x${(tokuFactor*100).toFixed(2)}%`
    createRow(
      'tokuBonus',
      String(tokuBonus), tokuBonusTooltip)

    const totalIncome = basicIncome + dlcBonus + tokuBonus
    const totalIncomeTooltip =
      `=${[basicIncome,dlcBonus,tokuBonus].map(String).join('+')}`
    createRow('totalIncome', String(totalIncome), totalIncomeTooltip)
    const [actualMod, actualModTooltip] = rawIncome > 0 ?
      [(totalIncome/rawIncome).toFixed(4), `=${totalIncome}/${rawIncome}`] :
      [String(0), null]
    createRow('actualMod', actualMod, actualModTooltip)
    return rows
  })

export { dlcResultsSelector }

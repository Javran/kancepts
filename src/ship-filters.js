const filters = []
const defineFilter = (id, title, func) =>
  filters.push({id,title,func})

defineFilter('any', 'Any', () =>
  true)
defineFilter('de', 'DE', s =>
  s.stype === 1)
defineFilter('dd', 'DD', s =>
  s.stype === 2)
defineFilter('cl', 'CL', s =>
  s.stype === 3)
defineFilter('cv-like', 'CV/CVL/AV/CVB', s =>
  [11,7,16,18].includes(s.stype))
defineFilter('ss-like', 'SS/SSV', s =>
  [13,14].includes(s.stype))
defineFilter('ca', 'CA', s =>
  s.stype === 5)
defineFilter('bbv', 'BBV', s =>
  s.stype === 10)
defineFilter('as', 'AS', s =>
  s.stype === 20)
defineFilter('ct', 'CT', s =>
  s.stype === 21)
defineFilter('av', 'AV', s =>
  s.stype === 16)
defineFilter('cve', 'CVE', s =>
  [521, 526, 380, 529].includes(s.mstId))

Object.freeze(filters)

const isValidFilterId = idInp =>
  typeof idInp === 'string' &&
  filters.findIndex(({id}) => id === idInp) !== -1

export {
  filters,
  isValidFilterId,
}

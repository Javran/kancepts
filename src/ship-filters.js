import _ from 'lodash'

const filters = []
const defineFilter = (id, title, func) =>
  filters.push({id,title,func})

defineFilter('any', 'Any', () =>
  true)
defineFilter('ss-like', 'SS(*)', s =>
  [13,14].includes(s.stype))
defineFilter('de', 'DE', s =>
  s.stype === 1)
defineFilter('dd', 'DD', s =>
  s.stype === 2)
defineFilter('cl', 'CL', s =>
  s.stype === 3)
defineFilter('ct', 'CT', s =>
  s.stype === 21)
defineFilter('ca', 'CA', s =>
  s.stype === 5)
defineFilter('as', 'AS', s =>
  s.stype === 20)
defineFilter('cve', 'CVE', s =>
  [521, 526, 380, 529].includes(s.masterId))
defineFilter('av', 'AV', s =>
  s.stype === 16)
defineFilter('cvl', 'CVL', s =>
  s.stype === 7)
defineFilter('cv-like', 'CV(*)', s =>
  [11,7,16,18].includes(s.stype))
defineFilter('bbv', 'BBV', s =>
  s.stype === 10)

Object.freeze(filters)

const isValidFilterId = idInp =>
  typeof idInp === 'string' &&
  filters.findIndex(({id}) => id === idInp) !== -1

const getFilterInfo = id => filters.find(d => d.id === id)
const getFilterName = id => {
  const filterInfo = getFilterInfo(id)
  return filterInfo ? filterInfo.title : id
}

const reversedFilters = [...filters].reverse()

// assuming compo is an non-null object.
const compoToStr = compo =>
  _.flatMap(
    // let "heavier" ship types go first
    reversedFilters,
    ({id,title}) => {
      const count = compo[id]
      if (! _.isInteger(count) || count <= 0)
        return []
      else
        return [`${count}${title}`]
    }).join(' ')

export {
  filters,
  isValidFilterId,
  getFilterInfo,
  getFilterName,
  compoToStr,
}

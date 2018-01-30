import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'rc-slider/assets/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { KanceptsMain } from './ui'
import { register } from './registerServiceWorker'

import { store } from './store'

/*

   TODO: need to keep a maintenance node somewhere.

   - when api_start2 gets updated:

       - use `misc/normalize-master-data.js <HAR> api_start2.json` to extra master data

   - when new remodel is implemented:

       - use `misc/generate-default-ship-list.js`

   - when new exped is implemented

      - update `assets/exped-info.json`
      - (TODO) we'll switch to use master data some day.
      - update `src/exped-info/fleet-compo.js`

   - gen exped-cost-grouping?

*/

ReactDOM.render(
  (
    <div className="root">
      <Provider store={store}>
        <KanceptsMain />
      </Provider>
    </div>
  ),
  document.getElementById('root')
)

register()

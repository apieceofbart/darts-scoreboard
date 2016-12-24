import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import dartsApp from './reducers'
import App from './components/App/App'
import Game from './components/Game/Game'
import { Router, Route, browserHistory } from 'react-router'
import { initialStore } from './defaults/'

let store = createStore(dartsApp, initialStore);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:stage)" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

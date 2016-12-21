import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import dartsApp from './reducers'
import App from './components/App/App'

let store = createStore(dartsApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

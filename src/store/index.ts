import { combineReducers, createStore } from 'redux'
import desktopsReducer from './reducers/desktopsReducer'

const rootReducer = combineReducers({
  desktopList: desktopsReducer,
})

export const store = createStore(rootReducer)

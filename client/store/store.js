import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

const initialLanguage = {
  lang: 'th'
}

export const actionTypes = {
  SET_LANGUAGE: 'SET_LANGUAGE',
}

// REDUCERS
export const reducer = (state = initialLanguage, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return Object.assign({}, state, { lang: action.lang })
    default: return state
  }
}

// ACTIONS
export const setLanguage = lang => dispatch => {
  return dispatch({ 
    type: actionTypes.SET_LANGUAGE,
    lang
  })
}

export const initStore = (initialState = initialLanguage) => 
createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
      applyMiddleware(
      thunkMiddleware,
      logger
    )))
import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import autheduser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  questions,
  autheduser,
  loadingBar: loadingBarReducer,
})

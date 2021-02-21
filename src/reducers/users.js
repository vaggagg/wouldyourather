import {RECEIVE_USERS, ADD_USER,SIGN_IN, FAILED_SIGN_IN } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
      case RECEIVE_USERS :
        return {
          ...state,
          ...action.users
        }
    case ADD_USER :
      const { user } = action
      return {
        ...state,...user
      }
      default :
        return state
    }


  }

import {RECEIVE_USERS, ADD_USER,SIGN_IN, FAILED_SIGN_IN ,ANSWER_QUESTION_USER} from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
      case RECEIVE_USERS :
        return {
          ...state,
          ...action.users
        }
    case ADD_USER :
      return {
        ...state,...action.user
      }
    case ANSWER_QUESTION_USER :
    return {
      ...state,...action.user
    }
      default :
        return state
    }
    

  }

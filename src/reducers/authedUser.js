import { SET_AUTHED_USER, FAILED_SIGN_IN } from '../actions/authedUser'

export default function authedUser (state = { user:null , FailedSignIn:null, avatarURL:null } , action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.autheduser
    case FAILED_SIGN_IN :
      return action.autheduser
    default :
      return state
  }
}

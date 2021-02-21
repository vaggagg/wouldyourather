export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const FAILED_SIGN_IN= 'FAILED_SIGN_IN'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    autheduser:{
      user:id,
      failedSignIn:false
    }
  }
}
export function FailedSignIn () {
  return {
    type: FAILED_SIGN_IN,
    autheduser:{
      user:null,
      failedSignIn:true
    }
  }
}

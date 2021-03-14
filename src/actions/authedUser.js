export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const FAILED_SIGN_IN= 'FAILED_SIGN_IN'
export const LOG_OUT = 'LOG_OUT'

export function setAuthedUser (id,avatarURL) {
  return {
    type: SET_AUTHED_USER,
    autheduser:{
      user:id,
      failedSignIn:false,
      avatarURL: avatarURL
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

export function Logout () {
  return {
    type: LOG_OUT,
    autheduser:{
      user:null,
      failedSignIn:false,
      avatarURL:''
    }
  }
}

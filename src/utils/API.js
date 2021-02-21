import {
    _getUsers,
    _getQuestions,
    _saveUser,
    _checkCredentials
  } from './_DATA.js'

  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions
    }))
  }
export function saveUser(id, password){
  return _saveUser(id,password);
}
export function checkCredentials(id,password){
  return _checkCredentials(id,password);
}

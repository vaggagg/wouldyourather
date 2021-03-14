import {
    _getUsers,
    _getQuestions,
    _saveUser,
    _checkCredentials,
    _saveQuestionAnswer,
    _saveQuestion

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
export function saveQuestionAnswer ( authedUser, qid, answer ) {
  return _saveQuestionAnswer(authedUser, qid, answer);
}

export function saveQuestion ( question ) {
  return _saveQuestion(question);
}
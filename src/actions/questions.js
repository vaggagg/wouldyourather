import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer,saveQuestion } from '../utils/API'
import {AnswerQuestionUser ,AddQuestionUser} from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION='ANSWER_QUESTION'

export function receiveQuestions(questions){
    return {
        type:RECEIVE_QUESTIONS,
        questions,
    }
}
export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question,
    }
}
export function AnswerQuestion(questions){
    return {
        type: ANSWER_QUESTION,
        questions
    }
}
export function handleAddQuestion(newQuestion){
    return (dispatch) => {

        dispatch(showLoading())
    
        return saveQuestion(newQuestion)
          .then(({questions,users}) => {
              dispatch(AddQuestionUser(users))
              dispatch(addQuestion(questions)) })    
          .then(() => dispatch(hideLoading()))
      }

}
export function handleAnswerQuestion( user, question, choice ){
    return (dispatch) => {

        dispatch(showLoading())
    
        return saveQuestionAnswer(user, question.id, choice)
          .then(([user,questions]) => {
              dispatch(AnswerQuestion(questions))
              dispatch(AnswerQuestionUser(user))
            }
          )
                
          .then(() => dispatch(hideLoading()))
      }

}
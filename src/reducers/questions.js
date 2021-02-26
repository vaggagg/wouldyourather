import {ADD_QUESTION,RECEIVE_QUESTIONS,ANSWER_QUESTION} from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
      case RECEIVE_QUESTIONS :
        return {
          ...state,
          ...action.questions
        }
      case ADD_QUESTION :
        return {
          ...state,
          ...action.question
        }
      case ANSWER_QUESTION :
        const { questions } = action
        return{
          ...state,
          ...questions
        }
      default :
        return state
    }
  }

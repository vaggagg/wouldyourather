import '../App.css';
import React, { Component } from 'react';
import { handleAnswerQuestion } from '../actions/questions';
import { connect } from 'react-redux';
class UnansweredQuestions extends React.Component{
  
  handleClick=(user, question, option )=>{
    this.props.dispatch(handleAnswerQuestion(user, question,option))
  }
  render(){

    const { question , percentage, user }=this.props;

    return(
              <div class='Question-box'>
                  <div class= "Unanswered-Question">
                  <div class='wouldRatherBe'>You would rather be</div>
                    <div class= "Question">
                      <div class="OptionOne" onClick={(e)=> this.handleClick(user, question, 'optionOne')}>
                        {question.optionOne.text }
                      </div>
                     <div class='Or'> OR </div>
                      <div class="OptionTwo" onClick={(e)=> this.handleClick(user, question, 'optionTwo')}>
                      {question.optionTwo.text}
                      </div>
                      </div>
                    </div>
                </div>
            
          )
    }
}
function mapStateToProps ({ users }) {
 
  return {
    users
  }
}
export default connect(mapStateToProps)(UnansweredQuestions);
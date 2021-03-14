import '../App.css';
import React, { Component } from 'react';
import { handleAnswerQuestion } from '../actions/questions';
import { connect } from 'react-redux';
class UnansweredQuestions extends React.Component{
  state= {
    display : false
  }
  createDiagram = (question) => { 
    const { id } = question;
    const  {optionOne,optionTwo,total} = this.props.percentage;
    const isZeroOptionOne = optionOne == 0 ;
    const isZeroOptionTwo = optionTwo == 0 ;
    const widthOfOptionOne = { width: optionOne/total * 100 + '%'}
    const widthOfOptionTwo = { width: optionTwo/total * 100 + '%'}
    const widthOfDiagram = this.state.display ? 'hovered' : 'notHovered'
   
    const diagram = <div class={ 'diagram '+ widthOfDiagram} id={id}>
                      <div class="OptionOne" style={widthOfOptionOne}>
                       {!isZeroOptionOne &&question.optionOne.text +`(${optionOne}/${total} ${(optionOne/total*100).toFixed(2)}%)` }
                      </div>
                      <div class="OptionTwo" style={widthOfOptionTwo}>
                      {!isZeroOptionTwo && question.optionTwo.text +`(${optionTwo}/${total} ${(optionTwo/total*100).toFixed(2)}%)` }
                      </div>
                   </div>
    return diagram
  }
  
  handleClick=(user, question, option )=>{
    this.props.dispatch(handleAnswerQuestion(user, question,option))
    this.setState({ display: true });
  }
  render(){

    const {question , percentage, user}=this.props;
    const { display } = this.state;

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
                    { this.createDiagram(question)}
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
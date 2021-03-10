import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class QuestionModal extends React.Component{
  state= {
    redirectBack : false
  }
  createDiagram = (question) => { 
    const { id } = question;
    const  {optionOne,optionTwo,total} = this.props.percentages[this.props.questionID];
    const isZeroOptionOne = optionOne == 0 ;
    const isZeroOptionTwo = optionTwo == 0 ;
    const widthOfOptionOne = { width: optionOne/total * 100 + '%'}
    const widthOfOptionTwo = { width: optionTwo/total * 100 + '%'}
  
    const diagram = <div class={ 'diagram hovered'} id={id}>
                      <div class="OptionOne" style={widthOfOptionOne}>
                       {!isZeroOptionOne &&question.optionOne.text +`(${optionOne}/${total} ${(optionOne/total*100).toFixed(2)}%)` }
                      </div>
                      <div class="OptionTwo" style={widthOfOptionTwo}>
                      {!isZeroOptionTwo && question.optionTwo.text +`(${optionTwo}/${total} ${(optionTwo/total*100).toFixed(2)}%)` }
                      </div>
                   </div>
    return diagram
  }
  chooseTypeOfQuestion = () =>
  { 
    const { redirectBack } = this.state;
    const {  questions, allQuestions, type} = this.props;
    const idOfQuestion = this.props.questionID;
    const question = questions[idOfQuestion];
    const questionHome = allQuestions[idOfQuestion];
    if(type=='answered')
    {
    
      return <div class='Question-box-Modal'>
        <div class='wouldRatherBe'>Would you rather</div>
          <div class= "Question">
            <div class="OptionOne">
              {question.optionOne.text }
            </div>
            <div class='Or'> OR </div>
            <div class="OptionTwo">
              {question.optionTwo.text}
            </div>
          </div>
        { this.createDiagram(question)}
        {redirectBack && <Redirect to="/Dashboard/MyProfile" />}
      </div>
  }
  else
  {
      return <div class='Question-box-Modal'>
        <div class='wouldRatherBe'>Would you rather</div>
          <div class= "Question">
            <div class="OptionOne">
              {questionHome.optionOne}
            </div>
            <div class='Or'> OR </div>
            <div class="OptionTwo">
              {questionHome.optionTwo}
            </div>
          </div>
         <div class= 'creator'>Created in {new Date(questionHome.date).toLocaleString()} by <b>{questionHome.creator}</b><img class='avatar' src={questionHome.avatar}/></div> 
        {redirectBack && <Redirect to="/Dashboard/Home" />}
      </div>
  }
}
  render(){
    

    return( 
    <div>
      <div class='Modal' onClick={()=>this.setState({redirectBack:true})}> 
        { this.chooseTypeOfQuestion() }
      </div>
      </div>
          )
    }
}
function mapStateToProps ({ questions, users }) {
    const percentages ={};
    const allQuestions = {};
    for(let key in questions){
        let value = questions[key];
        let avatarURL = users[value.author].avatarURL
    allQuestions[key]={ 
        'optionOne': value.optionOne.text,
        'optionTwo': value.optionTwo.text,
        'creator': value.author,
        'date': value.timestamp,
        'avatar': avatarURL
      }
        percentages[key]={ 
          'optionOne': value.optionOne.votes.length,
          'optionTwo': value.optionTwo.votes.length,
          'total': value.optionOne.votes.length + value.optionTwo.votes.length
        }
      }
    return {
      questions,percentages,allQuestions
    }
  }
  export default connect(mapStateToProps)(QuestionModal);
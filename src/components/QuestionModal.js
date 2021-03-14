import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UnansweredQuestions from './UnansweredQuestions.js'
import { withRouter } from "react-router";

class QuestionModal extends React.Component{
  state= {
    redirectBack : false
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
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
    const from = this.props.location.from;
    const { user,userAnswers,percentages } = this.props;
    const { redirectBack } = this.state;
    const {  questions, allQuestions, type} = this.props;
    const idOfQuestion = this.props.questionID;
    console.log(userAnswers)
    const typeOfQuestion = userAnswers.find(x=>x===idOfQuestion) !== undefined? 'answered' : 'unanswered';
    const question = questions[idOfQuestion];
    const questionHome = allQuestions[idOfQuestion];
    if (from=='Home'){
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
    else {
      if(typeOfQuestion==='answered')
      {
      
        return <div class=' Answered Question-box-Modal'>
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
    if (typeOfQuestion==='unanswered'){
        return <div class=' Unanswered Question-box-Modal'>
          <div key={question.id}> <UnansweredQuestions question={question} percentage={percentages[question.id]} user= {user} /> </div>
          {redirectBack && <Redirect to="/Dashboard/Unanswered-Questions" />}
        </div>
    }
}
}
  render(){
    

    return( 
    <div>
      <div class='Modal' onClick={()=>this.setState({redirectBack:true})}> </div>
        { this.chooseTypeOfQuestion() }
      
      </div>
          )
    }
}
function mapStateToProps ({ questions, users, autheduser }) {
    const { user }= autheduser;
    const percentages ={};
    const allQuestions = {};
    //const userAnswers=[];
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
        const valueUser = users[user];
        const userAnswers=[...Object.keys(valueUser.answers)]
    return {
      questions,percentages,allQuestions,user, userAnswers
    }
  }
  export default connect(mapStateToProps)(QuestionModal);
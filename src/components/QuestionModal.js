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
  render(){
    const { redirectBack } = this.state;
    const {  questions, } = this.props;
    const idOfQuestion = this.props.questionID;
    const question = questions[idOfQuestion];

    return( 
    <div>
        <div class='Modal' onClick={()=>this.setState({redirectBack:true})}> </div>
            <div class='Question-box-Modal'>
              <div class='wouldRatherBe'>Would you rather</div>
                  <div class= "Question">
                    <div class="OptionOne">
                      {question.optionOne.text }
                    </div>
                    <div class='Or'> OR </div>
                    <div class="OptionTwo">
                    {question.optionTwo.text}
                    </div>
                  { this.createDiagram(question)}
                  {redirectBack && <Redirect to="/Dashboard/MyProfile" />}
            </div>
        </div>
      </div>
          )
    }
}
function mapStateToProps ({ questions }) {
    const percentages ={};
    for(let key in questions){
        let value = questions[key];
        percentages[key]={ 
          'optionOne': value.optionOne.votes.length,
          'optionTwo': value.optionTwo.votes.length,
          'total': value.optionOne.votes.length + value.optionTwo.votes.length
        }
      }
      console.log(questions)
      console.log(percentages)
    return {
      questions,percentages
    }
  }
  export default connect(mapStateToProps)(QuestionModal);
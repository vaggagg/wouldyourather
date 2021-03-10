import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import MyAnsweredQuestion from './MyAnsweredQuestion';

class MyProfile extends React.Component{
  state= {
    display : false
  }
  createDiagram = (x) => { 
    const { id } = x;
    const  {optionOne,optionTwo,total} = this.props.percentages[id];
    const isZeroOptionOne = optionOne == 0 ;
    const isZeroOptionTwo = optionTwo == 0 ;
    const widthOfOptionOne = {
      width: optionOne/total * 100 + '%'
    }
    const widthOfOptionTwo = {
      width: optionTwo/total * 100 + '%'
    }
   
    
    const diagram = <div class='diagram' id={id}>
                      <div class="OptionOne" style={widthOfOptionOne}>
                       {!isZeroOptionOne &&x.optionOne.text +'('+optionOne+')' }
                      </div>
                      <div class="OptionTwo" style={widthOfOptionTwo}>
                      {!isZeroOptionTwo && x.optionTwo.text +'('+optionTwo+')'}
                      </div>
                   </div>
    return diagram
  }
  render(){

    const { percentages, createdQuestions, votedQuestions, user }=this.props;

    return(

      <div class="MyQuestions-sub">
        <div class='Title Answered-Questions'> <h1>My answered questions</h1>
          { votedQuestions.map((x)=> 
            <div key={x.id}> <MyAnsweredQuestion question={x} percentage={percentages[x.id]} user= {user} /> </div>
          )}
        </div>

        <div class='Title Created-Questions'><h1>Created by me</h1>
        {createdQuestions.map(x=>
            <div class='Question-box'>
                <div class= "Question">
                   <div class= "OptionOne">
                      {x.optionOne.text} 
                    </div>
                    <div class="Or">
                      OR
                    </div>
                    <div class= "OptionTwo">
                      {x.optionTwo.text} 
                    </div>
                  </div>
              </div>
            )}
        </div>
      </div>

    )}
}
function mapStateToProps ({questions, autheduser}) {
  const { user } = autheduser;
  const votedQuestions=[],createdQuestions=[];
  const percentages = {};
  let value,allAnswers=[],existsInAnswers;
  for(let key in questions){
    value = questions[key];
    
    allAnswers = [...value.optionOne.votes, ...value.optionTwo.votes];
    existsInAnswers=allAnswers.find(x=>x==user)
    if ( existsInAnswers !== undefined){
        votedQuestions.push(value);
        percentages[key]={ 
        'optionOne': value.optionOne.votes.length,
        'optionTwo': value.optionTwo.votes.length,
        'total': value.optionOne.votes.length + value.optionTwo.votes.length
        }
    }
    if (value.author==user)
        createdQuestions.push(value)

  }

  return {
    votedQuestions, questions, percentages, user, createdQuestions
  }
}

export default connect(mapStateToProps)(MyProfile);
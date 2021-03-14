import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink,BrowserRouter as Router } from "react-router-dom";

class Questions extends React.Component{
  
  render(){
    const { sortedAllQuestions }=this.props
    return(
            <div>
              <div class="Unanswered Dashboard-sub">
                <div class='Title'>Unanswered Questions</div>
                  {sortedAllQuestions.map(x=>
                  <div key={x.questionID}>
                    <NavLink to={'/questions/' + x.questionID}>
                      <div class= "Question">
                        <div class="OptionOne">
                          {x.optionOne}
                        </div>
                        <div class='Or'> OR </div>
                        <div class="OptionTwo">
                          {x.optionTwo}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                    )}
              </div>
          </div>

    )}
}
function mapStateToProps ({questions, autheduser}) {
  const { user } = autheduser;
  const keys=[];
  const percentages = {};
  const unansweredQuestions = [];
  for(let key in questions){
    let value = questions[key];
    let votes = [...value.optionOne.votes,...value.optionTwo.votes]
    let questionVotedFromUser = votes.find(x=>x==user)
    if(questionVotedFromUser == undefined)
      unansweredQuestions.push({
        'questionID': key,
        'optionOne': value.optionOne.text,
        'optionTwo': value.optionTwo.text,
        'date': value.timestamp
      }
      )
  }
  const sortedAllQuestions= unansweredQuestions.sort((a,b)=> { return b.date-a.date; } )
  return {
      sortedAllQuestions
  }
}

export default connect(mapStateToProps)(Questions);
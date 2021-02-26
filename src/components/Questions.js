import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { unstable_batchedUpdates } from 'react-dom';
import UnansweredQuestions from './UnansweredQuestions';

class Questions extends React.Component{
  state= {
    display : false,
    unansweredQuestions:[]
  }
  componentDidMount(){
    this.setState({unansweredQuestions:[...this.props.unansweredQuestions]})
  }
  
  render(){
    const {unansweredQuestions} = this.state;

    const { user,percentages}=this.props
    return(
            <div>
              <div class="Unanswered Questions-sub">
                <div class='Title'></div>
                  {unansweredQuestions.map(x=>
                        <UnansweredQuestions question={x} percentage={percentages[x.id]} user= {user} />
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
      unansweredQuestions.push(value)
    percentages[key]={ 
      'optionOne': value.optionOne.votes.length,
      'optionTwo': value.optionTwo.votes.length,
      'total': value.optionOne.votes.length + value.optionTwo.votes.length
    }
  }
  return {
    percentages, user, unansweredQuestions
  }
}

export default connect(mapStateToProps)(Questions);
import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink,BrowserRouter,useLocation as Router } from "react-router-dom";


class Home extends React.Component{
  state={
    display:false
  }
  render(){

    const { sortedAllQuestions } =this.props;

    return(

      <div class="Home Dashboard-sub">
        <div class='Title'> All questions </div>
        {sortedAllQuestions.map((x)=>
        <div key={x.questionID}>
          <NavLink to={{
                        pathname:'/questions/' + x.questionID,
                        from : 'Home'
                          }}>
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

    )}
}
function mapStateToProps ({autheduser, questions,users}) {
  const { user } = autheduser
  const allQuestions = [];
  for(let key in questions){
    let value = questions[key];
    let avatarURL = users[value.author].avatarURL
    allQuestions.push({ 
        'questionID': key,
        'optionOne': value.optionOne.text,
        'optionTwo': value.optionTwo.text,
        'date': value.timestamp
      })
    }
    const sortedAllQuestions= allQuestions.sort((a,b)=> { return b.date-a.date; } )
  return {
    user,sortedAllQuestions
  }
}

export default connect(mapStateToProps)(Home);
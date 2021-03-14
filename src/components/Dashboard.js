import LoadingBar from 'react-redux-loading';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import Questions from './Questions.js';
import MyProfile from './MyProfile.js';
import AddQuestions from './AddQuestions.js';
import QuestionModal from './QuestionModal.js';
import LoginAgain from './LoginAgain.js';
import {
    Redirect,
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Leaderboard from './Leaderboard.js';
function Dashboard (props) {

const { questionIDS} = props;
        return (
            <div>
                {
                    props.user===null && <LoginAgain />
                }
                {   props.user!== null &&
                <div className= "mainDashboard">
                    <div className="Titles">
                    <NavLink to="../Dashboard/Home" activeClassName="selected">
                        Home Page
                    </NavLink>
                    <NavLink to="../Dashboard/Leaderboard" activeClassName="selected">
                        Leaderboard
                    </NavLink>
                    <NavLink to="../Dashboard/Unanswered-Questions" activeClassName="selected">
                        Unanswered Questions
                    </NavLink>
                    <NavLink to="../Dashboard/addQuestions" activeClassName="selected">
                        Add Questions
                    </NavLink>
                    <NavLink to="../Dashboard/Myprofile" activeClassName="selected">
                        My Profile
                    </NavLink>
                    </div>
                    <Switch>

                        <Route exact path='/Dashboard/Home'>
                            <Home />
                        </Route>

                        <Route exact path='/Dashboard/Leaderboard'>
                            <Leaderboard />
                        </Route>

                        <Route exact path='/Dashboard/Unanswered-Questions'>
                            <Questions />
                        </Route>

                        <Route exact path='/Dashboard/addQuestions'>
                            <AddQuestions />
                        </Route>

                        <Route exact path='/Dashboard/MyProfile'>
                            <MyProfile />
                        </Route>
                       
                        <Route exact path='/Dashboard/MyProfile'>
                            <MyProfile />
                        </Route>
                        
                    </Switch>
                </div>}
            </div>
        )

}
function mapStateToProps ({autheduser, questions}) {
    const { user, failedSignIn } = autheduser
    const questionIDS = []
    for(let key in questions){
         questionIDS.push(key)
    }
    return {
       user,failedSignIn,questionIDS
    }
  }
export default connect(mapStateToProps)(Dashboard)
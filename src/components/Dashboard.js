import LoadingBar from 'react-redux-loading';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import Questions from './Questions.js';
import MyProfile from './MyProfile.js';
import AddQuestions from './AddQuestions.js';
import QuestionModal from './QuestionModal.js';
import {
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Leaderboard from './Leaderboard.js';
class Dashboard extends React.Component {


    render() {
        return (
            <div className= "mainDashboard">
                <div className="Titles">
                <NavLink to="../Dashboard/Home" activeClassName="selected">
                    Dashboard
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
                    <Route path='/Dashboard/Home'>
                        <Home />
                    </Route>
                    <Route path='/Dashboard/Leaderboard'>
                        <Leaderboard />
                    </Route>
                    <Route path='/Dashboard/Unanswered-Questions'>
                        <Questions />
                    </Route>
                    <Route path='/Dashboard/addQuestions'>
                        <AddQuestions />
                    </Route>
                    <Route exact path='/Dashboard/MyProfile'>
                        <MyProfile />
                    </Route>
                    <Route exact path='/Dashboard/MyProfile/questions/:id' 
                    render={({match}) =>
                        <Fragment>
                            <MyProfile />
                            <QuestionModal type='answered' questionID={match.params.id} previousPath='/Dashboard/MyProfile/'/>
                        </Fragment>
                    }/>
                    <Route path='/Dashboard/MyProfile'>
                        <MyProfile />
                    </Route>
                </Switch>
            </div>
        )
    }

}
function mapStateToProps ({autheduser}) {
    const { user, failedSignIn } = autheduser
    return {
       user,failedSignIn
    }
  }
export default connect(mapStateToProps)(Dashboard)
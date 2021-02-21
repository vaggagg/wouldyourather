import LoadingBar from 'react-redux-loading';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import Questions from './Questions.js';
import MyProfile from './MyProfile.js';
import {
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

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
                <NavLink to="../Dashboard/Questions" activeClassName="selected">
                    Questions
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
                        
                    </Route>
                    <Route path='/Dashboard/Questions'>
                        <Questions />
                    </Route>
                    <Route path='/Dashboard/addQuestions'>
                        
                    </Route>
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
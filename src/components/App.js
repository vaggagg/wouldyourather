import '../App.css';
import logo from './images/logo.png';
import Form from './Form';
import Welcome from './Welcome.js';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, useHistory,Redirect, Switch } from 'react-router-dom';
import { Logout } from '../actions/authedUser.js';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import QuestionModal from './QuestionModal.js';
import { NavLink } from "react-router-dom";
import LoginAgain from './LoginAgain';


class App extends Component {
  state={
    active:"",
    curtainsOpen:false
  }

  componentDidMount() {

    this.props.dispatch(handleInitialData())

  }
  curtainEffect=()=>{

    this.setState({ active: "active", curtainsOpen : true })


  }
  reRenderParent=()=>{

    this.forceUpdate();

  }
  handleLogout =()=>{
    this.props.dispatch(Logout());
    this.setState({ active: "", curtainsOpen : false , clickedLogOut : true})
    return <Redirect to="/Login" />
  }
  render() {
  const { user, failedSignIn ,avatarURL, questionIDS} = this.props
  const {active,curtainsOpen,clickedLogOut} = this.state 
  const loggedUser = user===null ? true : false ;
  const Sign_In_Failed = failedSignIn === true ? true : false
  return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="header-container">
            <div className="header"><NavLink to="../Login"> <img src={logo}/></NavLink> </div>
           { user!==null && <div><div class='connected-user'> Connected as {user},<div class='logout' onClick={this.handleLogout}>Logout</div></div><img class=' connected-avatar avatar' src = {avatarURL}/> </div> }
          </div>
          <div class={"Curtain BlueColor "+ active } />
          <div class={"Curtain RedColor "+ active } />
          <div className='container'>
              <div>
                <Switch>
                  
                  <Route exact path='/Login' exact>
                    { loggedUser && <Form reRenderParent={ this.reRenderParent } failed={Sign_In_Failed }/> }
                    { !loggedUser && <Welcome openCurtains={ this.curtainEffect }/> }
                    { !loggedUser&& curtainsOpen && <Redirect to="/Dashboard/Home" />}
                  </Route>

                  <Route path='/Dashboard' >
                    <Dashboard />
                  </Route>
                  {this.props.user!== null &&
                  <Route exact path='/questions/:id' 
                        render={({match, location}) =>
                            <Fragment>
                                {questionIDS.find(x=>x===match.params.id)===undefined && <LoginAgain error='404'/>}
                                {questionIDS.find(x=>x===match.params.id)!==undefined &&
                                    <div>
                                    <QuestionModal questionID={match.params.id} location ={location}/>
                                    </div> }
                            </Fragment>
                        }/>}

                  <Route path='/'>
                    <LoginAgain error='404' />
                  </Route>
                  
              </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}
function mapStateToProps ({autheduser, questions}) {
  const { user,avatarURL, failedSignIn } = autheduser
  const questionIDS = []
    for(let key in questions){
         questionIDS.push(key)
    }
  return {
     user,failedSignIn,avatarURL, questionIDS
  }
}

export default connect(mapStateToProps)(App)

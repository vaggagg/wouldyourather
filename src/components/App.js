import '../App.css';
import logo from './images/logo.png';
import Form from './Form';
import Welcome from './Welcome.js';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, useHistory,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';


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
  changeHistoryFromComponents=()=>{
    
  }
  render() {
  const { user, failedSignIn } = this.props
  const {active,curtainsOpen} = this.state 
  const loggedUser = user===null ? true : false ;
  const Sign_In_Failed = failedSignIn === true ? true : false
  return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="header-container">
            <div className="header"><img src={logo}/></div>
          </div>
          <div class={"Curtain BlueColor "+ active } />
          <div class={"Curtain RedColor "+ active } />
          <div className='container'>
              <div>
                  <Route path='/Login' exact>
                    { loggedUser && <Form reRenderParent={ this.reRenderParent } failed={Sign_In_Failed }/> }
                    { !loggedUser && <Welcome openCurtains={ this.curtainEffect }/> }
                    { !loggedUser&& curtainsOpen && <Redirect to="/Dashboard" />}
                  </Route>
                  <Route path='/Dashboard' >
                  <Dashboard />
                  </Route>
              </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}
//<Nav />
//<Route path='/Questions/:id' component={AnswerQuestions} />
//<Route path='/add' component={AddQuestions} />
//<Route path='/leaderboard' component={Leaderboard} />
function mapStateToProps ({autheduser}) {
  const { user, failedSignIn } = autheduser
  return {
     user,failedSignIn
  }
}

export default connect(mapStateToProps)(App)

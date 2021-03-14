import '../App.css';
import Input from './Input';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddUser,handleCheckCredentials } from '../actions/users';

class Form extends React.Component {
state={
  displaySignUp:false,
  password:"",
  username:""
}
addActive=()=>{
  this.setState({
    displaySignUp:!this.state.displaySignUp
  })
  this.setState({
    username: "",
    passsword:""
  });
}
handleSignUp=(event)=>{
  const {password,username}=this.state;

  event.preventDefault();

  this.props.dispatch(handleAddUser(username,password));

}
handleSignIn=(event)=>{

  const {username,password}=this.state;
let tempUsername;
  if(username==="")
    tempUsername=this.props.ids[0]
  else
  tempUsername = this.props.ids.find(x=>x.name===username)
  event.preventDefault();

  this.props.dispatch(handleCheckCredentials( tempUsername , password ))

}
passwordChange=(event)=>{
  this.setState({password: event.target.value});
}
usernameChange=(event)=>{
  this.setState({username: event.target.value});
}
optionChange=(event)=>{
  this.setState({username: event.target.value});
}
  render(){
    const {ids}=this.props;
    return (
      <div>
          <div class="Form">
            <div class="Label-container">
              <div className={!this.state.displaySignUp ? 'Label active' : 'Label'} onClick={this.addActive}> <a> Sign in </a> </div>
              <div className={this.state.displaySignUp ? 'Label active' : 'Label'} onClick={this.addActive}> <a> Sign up </a> </div>
            </div>
              {!this.state.displaySignUp&&
            <div class=" input-container">
              { this.props.failed&&<div id="Warning">Sign in failed</div> }
              <form onSubmit={this.handleSignIn}>
                <div clas="droplist">
                  <select name="users" id="users" className="droplist" onChange={this.optionChange}>
                    {ids.map(id=><option key={id.name} value={id.name}>{id.name}</option>)}
                  </select>
                  </div>
                  <Input placeholder="Insert your password" type="password" onChange={this.passwordChange}/>
                  <div class="button-container">
                      <button class="Button">Log in</button>
                    </div>
                </form>
              </div>
            }
            {this.state.displaySignUp&&
              <div class="input-container">
              <form onSubmit={this.handleSignUp}>
                <Input placeholder="Insert your username" type="text" onChange={this.usernameChange}/>
                <Input placeholder="Insert your password" type="password" onChange={this.passwordChange}/>
                <div class="button-container">
                  <button class="Button">Sign up</button>
                </div>
              </form>
              </div>
            }
          </div>
    </div>
  );
}

}

function mapStateToProps ({ users }) {
  const usersArray=Object.keys(users)
  const ids = usersArray.map((user)=>(
    {
      id:user,
      name:users[user].name,
      password: users[user].password,
      avatarURL:users[user].avatarURL
    })
  )
  return {
    ids,
    users
  }
}
export default connect(mapStateToProps)(Form)

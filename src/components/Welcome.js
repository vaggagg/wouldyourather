import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Welcome extends React.Component{
  state={
    display:false
  }
  componentWillMount(){
    setTimeout(()=>{
      this.props.openCurtains()
    },1000)
  }
  render(){

    const { user }=this.props

    return(

      <div class="Welcome css-typing"><p>Welcome { user }!</p></div>

    )}
}
function mapStateToProps ({autheduser}) {
  const { user } = autheduser
  return {
    user
  }
}

export default connect(mapStateToProps)(Welcome);

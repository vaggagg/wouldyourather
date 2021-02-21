import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends React.Component{
  state={
    display:false
  }
  render(){

    const { questions }=this.props

    return(

      <div class="Home Dashboard-sub">
        werwerwerwerwerwerwe
      </div>

    )}
}
function mapStateToProps ({autheduser}) {
  const { user } = autheduser
  return {
    user
  }
}

export default connect(mapStateToProps)(Home);
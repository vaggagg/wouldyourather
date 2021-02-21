import '../App.css';
import React, { Component } from 'react';

class Input extends React.Component{
  state={
    display:false
  }

  displayLabel=(e)=>{
    e.target.placeholder=""
    this.setState({ display: true })
  }
  hideLabel=(e)=>{
    if(e.target.value===""){
    this.setState({ display:false })
    e.target.placeholder=this.props.placeholder;
    }
  }

render(){
  return (
     <div class="input">
        {this.state.display?<span className="row show">{this.props.placeholder}</span> :<span className="row hide">{this.props.placeholder}</span>}
        <input placeholder={this.props.placeholder} onFocus={this.displayLabel} onBlur={this.hideLabel} type={this.props.type} onChange={this.props.onChange}/>
    </div>
  );
}
}

export default Input;

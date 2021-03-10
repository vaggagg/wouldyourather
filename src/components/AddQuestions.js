import '../App.css';
import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import  Input  from './Input.js'
class AddQuestions extends React.Component{
  state= {
    SuccessDisplay : false,
    OptionOne: '',
    OptionTwo: ''
  }
  OptionOne = (event ) =>{
      this.setState({OptionOne: event.target.value})
  }
  OptionTwo = (event ) =>{
    this.setState({OptionTwo: event.target.value})
}
handleSubmit = (e) =>{
    const {OptionOne, OptionTwo} = this.state;
    const { user } = this.props;
    const Question = { optionOneText:OptionOne , optionTwoText:OptionTwo, author:user}
    e.preventDefault();
    this.props.dispatch ( handleAddQuestion(Question))
    this.setState({SuccessDisplay:true})
}
  render(){

    return(
              
        <div className="AddQuestionContainer">
            <div className="Title">
                Create your Question
            </div>
        <form onSubmit={this.handleSubmit}>
            <div className="Subtitle">Would you rather</div>

          <Input placeholder="Insert your first choice" type="text" onChange={this.OptionOne}/>
          <div className="Subtitle">Or</div>
          <Input placeholder="Insert your second choice" type="text" onChange={this.OptionTwo}/>
          <div className="button-container">
            <button className="Button">Add Question</button>
          </div>
        </form>
       { this.state.SuccessDisplay && <div className="GreenColor"> Addition of question was succeed. </div> }
        </div>
    )}
}
function mapStateToProps ({ autheduser }) {
    const { user } = autheduser;
  return {
    user
  }
}
export default connect(mapStateToProps)(AddQuestions);
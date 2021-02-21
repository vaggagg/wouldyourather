import '../App.css';
import React, { Component } from 'react';

class MyAnsweredQuestion extends React.Component{
  state= {
    display : false
  }
  createDiagram = (question) => { 
    const { id } = question;
    const  {optionOne,optionTwo,total} = this.props.percentage;
    const isZeroOptionOne = optionOne == 0 ;
    const isZeroOptionTwo = optionTwo == 0 ;
    const widthOfOptionOne = {
      width: optionOne/total * 100 + '%'
    }
    const widthOfOptionTwo = {
      width: optionTwo/total * 100 + '%'
    }
   
    
    const diagram = <div class='diagram' id={id}>
                      <div class="OptionOne" style={widthOfOptionOne}>
                       {!isZeroOptionOne &&question.optionOne.text +'('+optionOne+')' }
                      </div>
                      <div class="OptionTwo" style={widthOfOptionTwo}>
                      {!isZeroOptionTwo && question.optionTwo.text +'('+optionTwo+')'}
                      </div>
                   </div>
    return diagram
  }
  handleHover=(question)=>{
    this.setState({ display: true });
  }
  handleHoverOut=(question)=>{
    this.setState({ display: false });
  }
  render(){

    const {question , percentage, user}=this.props;
    const { display } = this.state;

    return(
              <div class='Question-box'>
                  <div class= "Answered-Question" onMouseEnter= {this.handleHover} onMouseLeave= {this.handleHoverOut}>
                    <div class= "Answer">
                      I would rather {question.optionOne.votes.find(question=>question==user) !== undefined ? 
                      `${question.optionOne.text }  than  ${question.optionTwo.text}` :
                      `${question.optionTwo.text} than ${question.optionOne.text}`
                      } 
                      </div>
                    { display && this.createDiagram(question)}
                    </div>
                </div>
            
          )
    }
}

export default MyAnsweredQuestion;
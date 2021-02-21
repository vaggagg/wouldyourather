import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Questions extends React.Component{
  state= {
    display : false
  }
  createDiagram = (id) => { 
    const  {optionOne,optionTwo,total} = this.props.percentages[id];
    const isZeroOptionOne = optionOne == 0 ;
    const isZeroOptionTwo = optionTwo == 0 ;
    const widthOfOptionOne = {
      width: optionOne/total * 100 + '%'
    }
    const widthOfOptionTwo = {
      width: optionTwo/total * 100 + '%'
    }
    console.log(widthOfOptionOne)
    const diagram = <div class='diagram' id={id}>
                      <div class="OptionOne" style={widthOfOptionOne}>
                       { !isZeroOptionOne && optionOne }
                      </div>
                      <div class="OptionTwo" style={widthOfOptionTwo}>
                        { !isZeroOptionTwo && optionTwo}
                      </div>
                   </div>
    return diagram
  }
  
  render(){

    const { questions, keys, percentages }=this.props
    return(

      <div class="Questions-sub">
        <div class='Title'>
          {keys.map(x=>
            <div class='Question-box'>
                <div class= "Question">
                   <div class= "OptionOne">
                      {x.optionOne.text}
                    </div>
                    <div class="Or">
                      OR
                    </div>
                    <div class= "OptionTwo">
                      {x.optionTwo.text}
                    </div>
                  </div>
                  {this.createDiagram(x.id)}
              </div>
            )}

        </div>
      </div>

    )}
}
function mapStateToProps ({questions, autheduser}) {
  const { user } = autheduser;
  const keys=[];
  const percentages = {};
  for(let key in questions){
    let value = questions[key];
    keys.push(value)
    percentages[key]={ 
      'optionOne': value.optionOne.votes.length,
      'optionTwo': value.optionTwo.votes.length,
      'total': value.optionOne.votes.length + value.optionTwo.votes.length
    }
  }

  return {
    keys, questions, percentages, user
  }
}

export default connect(mapStateToProps)(Questions);
import '../App.css';
import React, { Component } from 'react';

import { connect } from 'react-redux';

function Leaderboard (props){

    const { sortedUsers_Answers } = props
    return(
            <div class='Leaderboard'>
                  <div class='Title'> Users with most answers:</div>
                  <table id = 'Leaderboard'>
                  <tr>      <th>Avatar</th>
                            <th>Name</th>
                            <th>Answers</th>
                            <th>Created</th>
                            <th>Total</th>
                    </tr>
                   {sortedUsers_Answers.map( x=>
                   <div key={x.user}>
                        <tr>
                            <td><img class="avatar" src={x.avatar}></img></td>
                            <td>{x.user}</td>
                            <td>{x.countOfAnswers}</td>
                            <td>{x.countOfCreated}</td>
                            <td>{x.totalPoints}</td>
                        </tr>
                    </div>
                    
                   )}
                   </table>
            </div>
            
          )
    
}

function mapStateToProps ({users}) {
    let Users_Answers = []
    for(let user in users){
        let countOfAnswers = 0;
        let value = users[user];
            for (let answer in value.answers)
                countOfAnswers++;
            
            let countOfCreated= value.questions.length
            let scoreOfUser = {
                'user' : user,
                'avatar' : users[user].avatarURL,
                'countOfAnswers' : countOfAnswers,
                'countOfCreated' : countOfCreated,
                'totalPoints' : countOfAnswers + countOfCreated

            }
            Users_Answers.push( scoreOfUser )
            }
    const sortedUsers_Answers = Users_Answers.sort( (a,b) => { return b.totalPoints-a.totalPoints }  )
    return {
        sortedUsers_Answers
    }
  }
  
  export default connect(mapStateToProps)(Leaderboard);
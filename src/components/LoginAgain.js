import '../App.css';
import errorLogo from './images/404img.jpg';
import React, { Component } from 'react';
import {
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

export function LoginAgain(props){
    return (
        <div>
            <div class='errorLogo'>
            {props.error ==='404' &&<img src= {errorLogo}/>}
            </div>
            <div class='Logout-Text'>
                You have to login again. Press here to <NavLink to="../../../Login"> Login</NavLink>
            </div>
        </div>
    )
}
export default LoginAgain;
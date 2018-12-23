import React from 'react'
import {  Route, Redirect } from 'react-router-dom'
export default function({component:Component,...rest}){
   return <Route {...rest} render={(props)=>{
    return localStorage.getItem('login')?<Component {...props}/>:<Redirect to="/login"/>
   }}></Route>
}
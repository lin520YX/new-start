import React from 'react';
import {Route} from './react-router-dom';
export default function({component:Component,...rest}){
    console.log(Component)
    return <Route {...rest} render={(props)=>{
        return localStorage.getItem('login')?<Component {...props}/>:<div>xxx</div>
    }}></Route>
}
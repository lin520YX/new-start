import React from 'react';
export default class Add extends React.Component{
    input = React.createRef()
    handleClick=()=>{
       let users = JSON.parse(localStorage.getItem('users'))||[];
       console.log(users)
       users.push({id:Math.random(),name:this.input.current.value});
       localStorage.setItem('users',JSON.stringify(users))
       this.props.history.push('/user/list')
    }
    render(){
        console.log(this.props)
        return <div>
            <input type="text" className="form-control" ref = {this.input}/>
            <button className='btn btn-primary' onClick={this.handleClick}>添加</button>    
        </div>
    }
}



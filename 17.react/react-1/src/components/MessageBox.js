import React from 'react'
import axios from 'axios'
axios.interceptors.response.use((res)=>{
    if (res.data.code === 1) { // 成功
        return res.data.data
      }
      return Promise.reject();
})
export default class MessageBox extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        axios.get('/list.json').then(s=>{
            console.log(s)
        })
    }
    render(){
        return(
            <div className = "container">
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        列表点赞
                    </div>
                    <div className="panel-body">
                        列表点赞
                    </div>
                    <div className="panel-footer">
                        列表点赞
                    </div>
                </div>
            </div>
        )
    }
}
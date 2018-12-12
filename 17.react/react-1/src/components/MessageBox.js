import React from 'react'
import axios from 'axios'
import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'
import { Provider } from './Context'
axios.interceptors.request.use((config) => {
    config.headers = {
        token: 'xxxx'
    }
    return config
})

axios.interceptors.response.use((res) => {
    if (res.data.code === 1) { // 成功
        return res.data.data
    }
    return Promise.reject();
})
export default class MessageBox extends React.Component {
    state = {
        list: [],
        total: 0
    }
    constructor() {
        super()
    }
    async componentDidMount() {
        let a = await axios.get('/list.json')
        this.setState({
            list: a
        })
    }
    handleClick = (val) => {
        this.setState({
            total: this.state.total + val
        })
    }
    resetClick = (val) => {
        this.setState({
            total: 0
        })
    }
    render() {
        return (
            // 必须叫value
            <Provider value={{r:this.resetClick}}>
                <div className="container">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            列表点赞
                    </div>
                        <div className="panel-body">
                            <MessageRight lists={this.state.list} fn={this.handleClick}></MessageRight>
                        </div>
                        <div className="panel-footer">
                            <MessageLeft total={this.state.total}></MessageLeft>
                        </div>
                    </div>
                </div>
            </Provider>

        )
    }
}
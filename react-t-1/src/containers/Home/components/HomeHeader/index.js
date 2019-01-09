import React,{Component} from 'react'
import './index.less'
import logo from '@/images/jy-logo.png'
export default class HomeHeader extends Component{
    render(){
        return(
            <div className='home-header'>
                <img src={logo} alt=''/>
                <div>
                    <i className='iconfont icon-uilist'></i>
                    <i className='iconfont icon-gunbi'></i>
                </div>
            </div>
        )
    }
}
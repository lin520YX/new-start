import React,{Component} from 'react'
import './index.less'
import logo from '@/images/jy-logo.png';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
export default class HomeHeader extends Component{
    constructor(props) {
        super(props);
        this.state={
            showList:false
        }
    }
    render() {
        return (
            <div className="home-header">
                <div className="header-menu">
                    <img src={logo} alt="logo" />
                    <div onClick={() => this.setState({showList:!this.state.showList})}>
                        {
                            this.state.showList?<i className="iconfont icon-guanbi"></i>:<i className="iconfont icon-uilist"></i>
                        }
                    </div>
                </div>
                <TransitionGroup>
                        {
                            this.state.showList&&<CSSTransition
                            timeout={500}
                            classNames="fade"
                              ><ul className="menu-list">
                                    <li type="1">Node课程培训</li>
                                    <li type="2">HTML课程培训</li>
                                    <li type="3">视频课程</li>
                                    <li type="4">文档课件</li>
                                </ul></CSSTransition>
                        }
                </TransitionGroup>    

            </div>
        );
    }
}
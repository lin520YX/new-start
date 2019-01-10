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
    choose=(e)=>{
        this.props.chooseLesson(e.target.getAttribute('type'))
        this.setState({showList:false})
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
                              ><ul className="menu-list" onClick={this.choose}>
                                    <li type="1">视频课程</li>
                                    <li type="2">文档课件</li>
                                    <li type="3">视频课程</li>
                                    <li type="4">文档课件</li>
                                </ul></CSSTransition>
                        }
                </TransitionGroup>    

            </div>
        );
    }
}
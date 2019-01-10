import React,{Component,Fragment} from 'react'
import HomeHeader from './components/HomeHeader/index';
import { connect } from 'react-redux';
import * as actions from '@/store/actions/home'
class Home extends Component{
    chooseLesson=(type)=>{
        this.props.setCurrentLesson(type)
        console.log(this.props)
    }    
    render(){
        return(
            <Fragment>
                <HomeHeader chooseLesson={this.chooseLesson}/>
            </Fragment>
        )
    }
}
export default connect(state => ({...state}),actions)(Home)

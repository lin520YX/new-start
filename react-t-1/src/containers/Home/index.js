import React,{Component,Fragment} from 'react'
import HomeHeader from './components/HomeHeader/index';
import { connect } from 'react-redux';

export default class Home extends Component{
    render(){
        return(
            <Fragment>
                <HomeHeader/>
            </Fragment>
        )
    }
}

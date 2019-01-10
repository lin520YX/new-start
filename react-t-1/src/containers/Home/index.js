import React,{Component,Fragment} from 'react'
import HomeHeader from './components/HomeHeader/index';
import { connect } from 'react-redux';
import actions from '@/store/actions/home'
class Home extends Component{
    render(){
        return(
            <Fragment>
                <HomeHeader currentCategory={this.props.currentCategory}
                    setCurrentCategory={this.props.setCurrentCategory}/>
            </Fragment>
        )
    }
}
export default connect(state => state.home,actions)(Home)

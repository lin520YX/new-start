import React,{Component} from 'react';
import { withRouter } from '../react-router-dom'
class Logo extends Component {
    handleClick = () => {
        this.props.history.push('/profile')
    }
    render() {
        console.log()
        return (<a className="navbar-brand" onClick={this.handleClick}>cms</a>)
    }
}
export default  withRouter(Logo)
 



import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'
class Logo extends Component {
    handleClick = () => {
        console.log(this.props)
    }
    render() {
        console.log()
        return (<a className="navbar-brand" onClick={this.handleClick}>cms</a>)
    }
}
export default  withRouter(Logo)
 



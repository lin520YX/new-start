import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
class Person extends React.Component{
    static defaultProps ={
        name:'lyf',
    }
    static propTypes ={
        // 校验类型
        age:PropTypes.number.isRequired,
        gender:PropTypes.oneOf(['男','女']),
        position:PropTypes.shape({
           x: PropTypes.number,
           y: PropTypes.number
        }),
        hobby:PropTypes.arrayOf(PropTypes.string),
        salary(props, propName, componentNam){
            if (props[propName] <= 100000){
              throw new Error('收益太低')
            }
          }
    }
    render(){
        return <div>
        {this.props.name}
        </div>
    }
}
let obj = {
    name:'lyf',
    age:25,
    gender:'男',
    position:{
        x:100,
        y:100
    },
    hobby:['xiedaima'],
    salary:1000000
}
ReactDOM.render(<Person {...obj}/>,window.root)
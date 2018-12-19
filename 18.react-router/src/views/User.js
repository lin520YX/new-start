import React from 'react';
import { Link, Route } from 'react-router-dom'
import Add from './Add'
import List from './List'
import Detail from './Detail'
export default class User extends React.Component {
    render() {
        return (
            <div>
                <div className='col-md-3'>
                    <nav className="nav nav-stacked">
                        <li><Link to='/user/add'>用户添加</Link></li>
                        <li><Link to='/user/list'>用户列表</Link></li>
                    </nav>
                </div>
                <div className='col-md-9'>
                    <Route path='/user/add' component={Add}></Route>
                    <Route path='/user/list' component={List}></Route>
                    <Route path='/user/detail/:id' component={Detail}></Route>
                </div>
            </div>
        )
    }
}



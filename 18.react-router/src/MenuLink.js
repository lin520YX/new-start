import React from 'react'
import { Link, Route } from './react-router-dom'
// children 不管是否匹配到 都会执行
export default function (p) {
    return <Route path={p.to} extrat={p.extrat || false} children={(props) => 
        {
            console.log(props)
            return <li className={props.match ? 'active' : ''}>
                <Link to={p.to}>{p.children}</Link>
            </li>
        }} />
}
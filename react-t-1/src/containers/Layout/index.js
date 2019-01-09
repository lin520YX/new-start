import React, { Component, Fragment } from 'react'
import Tab from '@/components/Tab/Tab';
import '@/common/global.less';
export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                {this.props.children}
                <Tab/>
            </Fragment>
        )
    }
}
import React from 'react';
export default class Home extends React.Component {
    render() {
        return <div>Home
            <button onClick={
                () => {
                    this.props.history.push('/profile')
                }
            }>去个人中心</button>
        </div>
    }
}



import React from 'react';
import Context from './context'
import { bindActionCreators } from 'redux';
let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
    return () => {
        class Proxy extends React.Component {
            state = mapStateToProps(this.props.store.getState())
            componentDidMount() {
                this.unsub = this.props.store.subscribe(() => {
                    this.setState(mapStateToProps(this.props.store.getState()))
                })
            }
            componentWillUnMount() {
                this.unsub();
            }
            render() {
                let mapDispatchTo;
                if (typeof mapDispatchToProps === 'object') {
                    mapDispatchTo= bindActionCreators(mapDispatchToProps, this.props.store.dispatch)
                }else{
                    mapDispatchTo= mapDispatchToProps(this.props.store.dispatch)
                }

                return <Component {...this.state} {...mapDispatchTo}></Component>
            }
        }
        return <Context.Consumer>
            {(store) => {
                return <Proxy store={store}></Proxy>
            }
            }
        </Context.Consumer >
    }
}
export default connect
import React from 'react';
import  Route  from './Route'
export default function (Component) {
    return () => {
        return <Route component={Component}/>
            }
};

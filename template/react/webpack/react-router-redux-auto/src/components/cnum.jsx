import React, { Component } from 'react';
import {actions,ADDNUM} from '../redux';
export default class Cnum extends Component {
    handle(){
        this.props.dispatch(actions[ADDNUM]());
    };
    render() {
        return (
            <div>
                <button onClick={this.handle.bind(this)}>累加redux的num值</button>
            </div>
        );
    };
};

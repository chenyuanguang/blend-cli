import React, { Component } from 'react';

class App extends Component{
    constructor(props){
        super(props);
    };
    render(){
        return <div>
            {this.props.children}
        </div>;
    };
};

export default App;

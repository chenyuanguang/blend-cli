import React , { Component } from 'react';

// import Style from '../css/app.scss';
import Style from '../css/app.css';

class App extends Component {
    constructor ( props ) {
        super ( props );
    };
    render () {
        return <div className={Style.app}>
            <h2>首页</h2>
            <p>手动搭建webpack+react项目</p>
        </div>;
    };
};
export default App;
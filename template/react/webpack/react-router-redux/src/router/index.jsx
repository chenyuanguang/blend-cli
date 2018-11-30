import React from 'react';
import {
    HashRouter as Router,
    Route,
    
} from 'react-router-dom';

import App from '../components/app';
import Index from '../components/index';
function RouterConfig(){
    return <Router>
        <App>
            <Route exact path='/' component={Index}/>
        </App>
    </Router>;
};

export default RouterConfig;

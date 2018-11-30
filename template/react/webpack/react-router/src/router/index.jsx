import React from 'react';
import {
    // HashRouter as Router,
    // MemoryRouter as Router,
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Prompt,
    Link
} from 'react-router-dom';

import App from '../components/app';
import Index from '../components/index';

function RouterCom() {
    return <Router basename='/'>
        <App>
            <Switch>
                <Route exact path='/' render={() => {
                    return <Redirect to='/index' />;
                }} />
                <Route path='/index' component={Index} />

            </Switch>
        </App>
    </Router>;
};


export default RouterCom;
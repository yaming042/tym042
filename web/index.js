import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import history from './libs/history';

import Base from './base';
import Home from './main/home';

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Router history={ history }>
                <Base>
                    <Switch>
                        <Route exact path={`/`} render={() => (
                            <Redirect to={`/app`}/>
                        )}/>
                        <Route exact path={`/app`} component={ Home }/>
                    </Switch>
                </Base>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
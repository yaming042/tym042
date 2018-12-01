import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import history from './libs/history';

import Base from './base';
import Articles from './main/page/articles';
import Drafts from './main/page/drafts';
import Article from './main/page/article';

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Router history={ history }>
                <Base>
                    <Switch>
                        <Route exact path={'/admin'} render={ ()=>{
                            return <Redirect to={'/admin/articles'}/>;
                        }}/>
                        <Route exact path={'/admin/articles'} component={ Articles }/>
                        <Route exact path={'/admin/drafts'} component={ Drafts }/>
                        <Route exact path={'/admin/article/:id'} component={ Article }/>

                        <Route component={ Articles }/>
                    </Switch>
                </Base>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
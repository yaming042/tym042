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
import Media from './main/page/media';
import Category from './main/page/category';
import Tags from './main/page/tags';
import Users from './main/page/users';
// import Comments from './main/page/comments';

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
                        <Route exact path={'/admin/media'} component={ Media }/>
                        <Route exact path={'/admin/category'} component={ Category }/>
                        <Route exact path={'/admin/tags'} component={ Tags }/>
                        <Route exact path={'/admin/users'} component={ Users }/>
                        {/*<Route exact path={'/admin/comments'} component={ Comments }/>*/}

                        <Route component={ Articles }/>
                    </Switch>
                </Base>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
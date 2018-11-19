import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import history from './libs/history';

import Base from './base';
import Home from './main/home';
import Article from './main/page/article';
import Blogs from './main/page/blogs';
import Webcodes from './main/page/webcodes';
import Notes from './main/page/notes';

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Router history={ history }>
                <Base>
                    <Switch>
                        <Route exact path={`/`} component={ Home }/>
                        <Route exact path={`/index`} component={ Home }/>
                        <Route exact path={`/notes`} component={ Notes }/>

                        <Route exact path={`/:type/:id?`} render={ (props) => {
                            let type = props.match.params.type || 'blog';
                            let id = props.match.params.id || '';

                            if(type == 'blog'){
                                return (!id ? <Blogs /> : <Article />);
                            }else if(type == 'webcode'){
                                return (!id ? <Webcodes /> : <Article />);
                            }else{
                                return <Redirect to={`/notes`}/>
                            }
                        }}/>
                    </Switch>
                </Base>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
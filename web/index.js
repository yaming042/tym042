import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import history from './libs/history';

import Base from './base';
import Home from './main/home';
import Article from './main/page/article';
import Articles from './main/page/articles';
import Notes from './main/page/notes';

import Comment from './main/components/comment';

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Base>
                <Switch>
                    <Route exact path={`/`} component={ Home }/>
                    <Route exact path={`/index`} component={ Home }/>
                    <Route exact path={`/articles/:type?`} component={ Articles }/>
                    <Route exact path={`/notes`} component={ Notes }/>

                    <Route exact path={`/comment`} component={ Comment }/>

                    <Route exact path={`/:type/:id?`} render={ (props) => {
                        let type = props.match.params.type;
                        let id = props.match.params.id || '';

                        if(type == 'blog' || type == 'webcode'){
                            if(id){
                                return <Article match={ props.match } />;
                            }else{
                                return <Redirect to={`/articles/${type}`}/>
                            }
                        }else if(type == 'notes'){
                            return <Redirect to={`/notes`}/>
                        }else{
                            return <Redirect to={`/`}/>
                        }
                    }}/>

                    <Route component={ Home }/>
                </Switch>
            </Base>
        </Router>
    </Provider>,
    document.getElementById('root')
);
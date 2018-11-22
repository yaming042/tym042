import React from 'react';

import history from '../../libs/history';

const menus = [
    {path: '/', primaryLabel: '首页', subLabel: 'Home'},
    {path: '/articles/blog', primaryLabel: '文章', subLabel: 'Blog'},
    {path: '/articles/webcode', primaryLabel: '实例', subLabel: 'Codes'},
    {path: '/notes', primaryLabel: '工作笔记', subLabel: 'Notes'},
];

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlePage: false,
        };
    }

    componentDidMount(){
        let path = location.pathname;
        if(path.indexOf('blog/') > 0 || path.indexOf('webcode/') > 0){
            this.setState({
                articlePage: true,
            });
        }
    }

    handleRoute(url){
        history.push(url);
    }

    render(){
        return (
            <div className={`web-header ${this.state.articlePage ? 'article-header' : ''}`}>
                <div className="logo">
                    TYM042
                </div>
                <div className="web-menu">
                    <div className="menu-list clearfix">
                        {
                            menus.map((d, k) => {
                                return (
                                    <div key={ k } className="menu-item" onClick={ this.handleRoute.bind(this, d.path) }>
                                        <h2>{ d.primaryLabel }</h2>
                                        <span>{ d.subLabel }</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
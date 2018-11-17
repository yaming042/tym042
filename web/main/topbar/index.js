import React from 'react';

const menus = [
    {path: '/', primaryLabel: '首页', subLabel: 'Home'},
    {path: '/blog', primaryLabel: '文章', subLabel: 'Blog'},
    {path: '/codes', primaryLabel: '实例', subLabel: 'Codes'},
];

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-header">
                <div className="logo">
                    TYM042
                </div>
                <div className="web-menu">
                    <div className="menu-list clearfix">
                        {
                            menus.map((d, k) => {
                                return (
                                    <div key={ k } className="menu-item">
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
import React from 'react';
import { Icon } from 'antd';

import history from '../../libs/history';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_923356_gicz0vz62b.js',
});

export default class Topbar extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    handleRoute(url){
        history.push(url);
    }

    render(){
        return (
            <div className="topbar-box">
                <div className="logo-box">
                    TYM042
                </div>
                <div className="option-box">
                    <IconFont
                        type="icon-wechat"
                        style={{color:'#fff'}}
                    />
                </div>
            </div>
        );
    }
}
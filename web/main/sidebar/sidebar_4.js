import React from 'react';

import Title from '../components/s_title';

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-sidebar-box box-item">
                <Title
                    label="访客统计"
                />
                <div className="visiter-count" style={{padding:'10px',height:'100px'}}>
                    访客统计
                </div>
            </div>
        );
    }
}
import React from 'react';

import Topbar from './main/topbar';
import Sidebar from './main/sidebar';

export default class Base extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="admin-container">
                <Topbar />
                <Sidebar />
                <div className="main-content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
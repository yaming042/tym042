import React from 'react';

import Header from './main/topbar';
import Footer from './main/footer';

export default class Base extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-container">
                <Header />
                <div className="main-content">
                    { this.props.children }
                </div>
                <Footer />
            </div>
        );
    }
}
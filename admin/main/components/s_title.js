import React from 'react';

export default class Title extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="sidebar-title">
                <h2>{ this.props.label || 'Label'}</h2>
            </div>
        );
    }
}
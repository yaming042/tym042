import React from 'react';

export default class Article extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>{ this.props.match.params.type }</p>
                <p>{ this.props.match.params.id }</p>
            </div>
        );
    }
}
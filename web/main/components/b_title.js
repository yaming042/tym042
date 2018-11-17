import React from 'react';

import history from '../../libs/history';

export default class Title extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="block-title">
                <h2>{ this.props.label || 'Label'}</h2>
                {
                    this.props.link ?
                        <span className="iconfont icon-more" onClick={ () => {
                            history.push( this.props.link );
                        } }></span>
                    :
                        null
                }

            </div>
        );
    }
}
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Button, Menu, Dropdown, Modal } from 'antd';
import { IconFont } from '../components/IconFont';
import styles from '../../libs/styles';

class Media extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        return (
            <div className="container-box media-box">
                <div className="add-edit-option">
                    <Button type="primary">上传资源</Button>
                </div>
                <div className="list-box">
                    <div className="list-scroll-box">
                        <div className="media-list clearfix">
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                            <div className="media-item"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Media);
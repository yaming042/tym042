import React from 'react';

import { Button, Menu, Dropdown, Modal } from 'antd';
import { IconFont } from '../components/IconFont';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import styles from '../../libs/styles';

class Comments extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        return (
            <div className="container-box comments-box">
                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">评论用户</div>
                        <div className="col-b">评论内容</div>
                        <div className="col-c">评论时间</div>
                        <div className="col-d">评论文章</div>
                        <div className="col-e">回复</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            <div className="list-item" >
                                <div className="col-a">匿名用户</div>
                                <div className="col-b">我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容</div>
                                <div className="col-c">2018-09-09 20:02:22</div>
                                <div className="col-d">失败乃成功之母</div>
                                <div className="col-e">
                                    <IconFont type="icon-edit"/>
                                </div>
                            </div>
                            <div className="list-item" >
                                <div className="col-a">匿名用户</div>
                                <div className="col-b">我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容</div>
                                <div className="col-c">2018-09-09 20:02:22</div>
                                <div className="col-d">失败乃成功之母</div>
                                <div className="col-e">
                                    <IconFont type="icon-edit"/>
                                </div>
                            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
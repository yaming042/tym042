import React from 'react';

import { Button, Menu, Dropdown, Modal } from 'antd';
import { IconFont } from '../components/IconFont';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import styles from '../../libs/styles';


class Users extends React.Component{
    constructor(props){
        super(props);


    }

    view(){}
    delete(){}


    render(){

        return (
            <div className="container-box users-box">
                <div className="add-edit-option">
                    <Button type="primary" >新增用户</Button>
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">用户昵称</div>
                        <div className="col-b">用户邮箱</div>
                        <div className="col-c">用户电话</div>
                        <div className="col-d">操作</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            <div className="list-item">
                                <div className="col-a">昵称昵称</div>
                                <div className="col-b">test@qq.com</div>
                                <div className="col-c">13211112222</div>
                                <div className="col-d">
                                    <Dropdown
                                        trigger={['click']}
                                        placement="bottomRight"
                                        overlay={
                                            <Menu>
                                                <Menu.Item key="edit" style={ styles.list.optionMenuItem } onClick={this.view.bind(this)}>
                                                    <IconFont type="icon-edit"/>
                                                    编辑
                                                </Menu.Item>
                                                <Menu.Item key="delete" style={ styles.list.optionMenuItem } onClick={this.delete.bind(this)}>
                                                    <IconFont type="icon-delete"/>
                                                    删除
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button shape="circle" style={ styles.list.optionBtn }>
                                            <IconFont type="icon-show-more" style={{fontSize:'16px'}}/>
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="col-a">昵称昵称</div>
                                <div className="col-b">test@qq.com</div>
                                <div className="col-c">13211112222</div>
                                <div className="col-d">
                                    <Dropdown
                                        trigger={['click']}
                                        placement="bottomRight"
                                        overlay={
                                            <Menu>
                                                <Menu.Item key="edit" style={ styles.list.optionMenuItem } onClick={this.view.bind(this)}>
                                                    <IconFont type="icon-edit"/>
                                                    编辑
                                                </Menu.Item>
                                                <Menu.Item key="delete" style={ styles.list.optionMenuItem } onClick={this.delete.bind(this)}>
                                                    <IconFont type="icon-delete"/>
                                                    删除
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button shape="circle" style={ styles.list.optionBtn }>
                                            <IconFont type="icon-show-more" style={{fontSize:'16px'}}/>
                                        </Button>
                                    </Dropdown>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
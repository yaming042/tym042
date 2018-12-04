import React from 'react';

import TextField from '../components/InputField';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Button, Menu, Dropdown, Modal } from 'antd';
import { IconFont } from '../components/IconFont';
import styles from '../../libs/styles';

class Category extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        return (
            <div className="container-box category-box">
                <div className="list-box clearfix">
                    <div className="add-category-box">
                        <div className="input-field">
                            <label>分类名称</label>
                            <div className="input-box">
                                <TextField
                                    id="category_name"
                                    placeholder={`请输入分类名称`}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>分类别名</label>
                            <div className="input-box">
                                <TextField
                                    id="category_slug"
                                    placeholder={`请输入分类别名`}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>分类描述</label>
                            <div className="input-box">
                                <TextField
                                    id="category_description"
                                    placeholder={`请输入分类描述`}
                                />
                            </div>
                        </div>
                        <Button type="primary" >增加分类</Button>
                    </div>
                    <div className="list-category-box">
                        <div className="list-head">
                            <div className="col-a">分类名称</div>
                            <div className="col-b">分类描述</div>
                            <div className="col-c">分类别名</div>
                            <div className="col-d">文章总数</div>
                        </div>

                        <div className="list-scroll-box">
                            <div className="list-body">
                                <div className="list-item">
                                    <div className="col-a">测试分类</div>
                                    <div className="col-b">这是一个测试分类这是一个测试分类这是一个测试分类这是一个测试分类</div>
                                    <div className="col-c">test_category</div>
                                    <div className="col-d">0</div>
                                </div>
                                <div className="list-item">
                                    <div className="col-a">测试分类</div>
                                    <div className="col-b">这是一个测试分类这是一个测试分类这是一个测试分类这是一个测试分类</div>
                                    <div className="col-c">test_category</div>
                                    <div className="col-d">0</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
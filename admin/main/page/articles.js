import React from 'react';

import { Button, Menu, Dropdown, Modal } from 'antd';
import { IconFont } from '../components/IconFont';

import Article from './article';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions';

import styles from '../../libs/styles';
import history from '../../libs/history';

const confirm = Modal.confirm;

class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articles: [],

            drawerOpen: false,
        };
    }

    drawerOpen(){
        this.setState({
            drawerOpen: true,
        });
    }
    drawerClose(){
        this.setState({
            drawerOpen: false,
        });
    }
    componentWillMount(){
        //获取列表数据todo...

        this.setState({
            articles: [
                {
                    id: '1',
                    title: '测试测试标题1',
                    category: [
                        {catid: '1',catname:'分类1',slug:'category1'},
                        {catid: '2',catname:'分类2',slug:'category2'},
                        {catid: '3',catname:'分类3',slug:'category3'},
                    ],
                    tags: [
                        {tagid: '1',tagname:'Tag1',slug:'tag1'},
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                        {tagid: '3',tagname:'Tag3',slug:'tag3'},
                    ],
                    author: 'test1',
                    updated_at: '2018-09-08 11:09:22',
                },
                {
                    id: '2',
                    title: '测试测试标题2',
                    category: [
                        {catid: '1',catname:'分类1',slug:'category1'},
                        {catid: '2',catname:'分类2',slug:'category2'},
                    ],
                    tags: [
                        {tagid: '1',tagname:'Tag1',slug:'tag1'},
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                    ],
                    author: 'test2',
                    updated_at: '2018-09-08 11:09:22',
                },
                {
                    id: '3',
                    title: '测试测试标题3',
                    category: [
                        {catid: '2',catname:'分类2',slug:'category2'},
                        {catid: '3',catname:'分类3',slug:'category3'},
                    ],
                    tags: [
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                        {tagid: '3',tagname:'Tag3',slug:'tag3'},
                    ],
                    author: 'test3',
                    updated_at: '2018-09-08 11:09:22',
                },
            ],
        });
    }
    componentWillReceiveProps(nextProps){}

    //创建新文章
    createNewArticle(){
        // history.push(`/admin/article/new`);
    }
    view(id){
        console.log(id);
        // history.push(`/admin/article/${id}`);

        this.drawerOpen();
    }
    delete(id){
        console.log(id);
        confirm({
            title: '确定要 删除 这篇文章吗？',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                console.log('OK id: '+id);
            },
            onCancel() {
                console.log('Cancel id: '+id);
            },
        });
    }

    render(){

        return (
            <div className="articles-box">
                <div className="add-edit-option">
                    <Button type="primary" onClick={ this.createNewArticle.bind(this) }>发布文章</Button>
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">标题</div>
                        <div className="col-b">作者</div>
                        <div className="col-c">分类</div>
                        <div className="col-d">标签</div>
                        <div className="col-e">日期</div>
                        <div className="col-f">操作</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">

                            {
                                this.state.articles.map((d, k) => {
                                    let cats = '';
                                    let tags = '';
                                    d.category.map((c, ck) => {
                                        cats += ','+c.catname;
                                    });
                                    d.tags.map((c, ck) => {
                                        tags += ','+c.tagname;
                                    });
                                    return (
                                        <div className="list-item" key={ d.id }>
                                            <div className="col-a">{ d.title }</div>
                                            <div className="col-b">{ d.author }</div>
                                            <div className="col-c">{ cats.substr(1) }</div>
                                            <div className="col-d">{ tags.substr(1) }</div>
                                            <div className="col-e">{ d.updated_at }</div>
                                            <div className="col-f">
                                                <Dropdown
                                                    trigger={['click']}
                                                    overlay={
                                                        <Menu>
                                                            <Menu.Item key="edit" style={ styles.list.optionMenuItem } onClick={this.view.bind(this, d.id)}>
                                                                <IconFont type="icon-edit"/>
                                                                编辑
                                                            </Menu.Item>
                                                            <Menu.Item key="delete" style={ styles.list.optionMenuItem } onClick={this.delete.bind(this, d.id)}>
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
                                    );
                                })
                            }


                        </div>
                    </div>

                </div>

                <Article
                    open={ this.state.drawerOpen }
                    handleClose={ this.drawerClose.bind(this) }
                />
            </div>
        );
    }
}



//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state;
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
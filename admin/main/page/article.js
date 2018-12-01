import React from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, Divider, Radio } from 'antd';
const { Option } = Select;

import TextField from '../components/InputField';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../actions';
import * as func from '../../libs/functions';
import styles from '../../libs/styles';

const RadioGroup = Radio.Group;

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            open: props.open,
            type: '',
            editor: null,
        };

        console.log(props.id);
    }

    drawerOpen(){
        this.setState({
            open: true,
        }, ()=>{
            this.initWangEditor();
        });
    }
    drawerClose(){
        this.setState({
            open: false,
        }, ()=>{
            this.props.handleClose && this.props.handleClose();
        });
    }
    componentWillMount(){
        let t = setTimeout(() => {
            clearTimeout(t);
            this.getArticleInfo( this.state.id );
        });
    }
    componentDidMount(){
        if(!window.hasOwnProperty('wangEditor')){
            func.createScript('/public/js/wangEditor.min.js', () => {
                console.log('insert wangEditor success');
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.open){
            this.drawerOpen();
            this.getArticleInfo(nextProps.id);
        }
    }
    componentWillUnmount(){
        this.setState({
            editor: null,
        });
    }

    getArticleInfo(id){
        if(id == 'new'){
            this.resetData();
            return ;
        }

    }

    initWangEditor(){
        if(this.state.editor){
            return;
        }
        let E = window.wangEditor;
        let editor = new E('#tooltop', '#editor');

        editor.customConfig.showLinkImg = false;
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'quote',  // 引用
            'image',  // 插入图片
            'table',  // 表格
            'code',  // 插入代码
        ];
        editor.customConfig.onfocus = function () {
            $(".placehold").hide();
        }
        editor.customConfig.onchange = function (html) {
            console.log(html);
        }

        editor.create();

        this.setState({
            editor: editor,
        });
    }

    selectType(e){
        this.setState({
            type: e.target.value,
        });
    }
    selectCategory(v, e){
        console.log(v, e);
    }
    selectTag(v, e){
        console.log(v, e);
    }

    save(status){
        if(status == 'draft'){
            console.log('save as draft');
        }else if(status == 'publish'){
            console.log('save as publish');
        }
    }
    resetData(){

    }

    render(){

        return (
            <Drawer
                title=""
                width="100%"
                placement="right"
                onClose={ this.drawerClose.bind(this) }
                maskClosable={false}
                closable={false}
                visible={ this.state.open }
                style={{
                    height: '100%',
                    overflow: 'auto',
                    paddingBottom: 53,
                }}
            >
                <div className="article-edit-box">
                    <div className="editor-topbar">
                        <div className="logo">Editor</div>
                        <div className="options">
                            <div className="draft" onClick={ this.drawerClose.bind(this) }>返回</div>
                            <div className="draft" onClick={ this.save.bind(this, 'draft') }>存草稿</div>
                            <div className="publish" onClick={ this.save.bind(this, 'publish') }>发布</div>
                        </div>
                    </div>
                    <div className="editor-article-body">
                        <div className="editor-toolbar" id="tooltop"></div>
                        <div className="article-editor">
                            <div className="placehold">请输入内容...</div>
                            <div id="editor"></div>
                        </div>

                        <div className="editor-article-info">
                            <div className="input-field">
                                <label>文章标题</label>
                                <div className="input-box">
                                    <TextField
                                        id="title"
                                        placeholder={`请输入文章标题`}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章摘要</label>
                                <div className="input-box">
                                    <TextField
                                        id="title"
                                        placeholder={`请输入文章摘要`}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章作者</label>
                                <div className="input-box">
                                    <TextField
                                        id="title"
                                        placeholder={`请输入文章作者`}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章类型</label>
                                <div className="input-box input-right-box">
                                    <RadioGroup
                                        onChange={ this.selectType.bind(this) }
                                        value={ this.state.type }
                                    >
                                        <Radio value='1'>博客</Radio>
                                        <Radio value='2'>实践</Radio>
                                        <Radio value='3'>笔记</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章分类</label>
                                <div className="input-box input-right-box">
                                    <Select
                                        defaultValue="1"
                                        style={ styles.form.select }
                                        onChange={ this.selectCategory.bind(this) }
                                    >
                                        <Option value="1">Category 1</Option>
                                        <Option value="2">Category 2</Option>
                                        <Option value="3">Category 3</Option>
                                        <Option value="4">Category 4</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章标签</label>
                                <div className="input-box input-right-box">
                                    <Select
                                        defaultValue={''}
                                        style={ styles.form.select }
                                        mode="tags"
                                        maxTagCount={3}
                                        onChange={ this.selectTag.bind(this) }
                                    >
                                        <Option value="1">Tag 1</Option>
                                        <Option value="2">Tag 2</Option>
                                        <Option value="3">Tag 3</Option>
                                        <Option value="4">Tag 4</Option>
                                    </Select>
                                </div>
                            </div>
                            <Divider />
                            <div>上传图片</div>
                        </div>
                    </div>



                </div>
            </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);
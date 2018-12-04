import React from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, Divider, Radio, message } from 'antd';
const { Option } = Select;

import TextField from '../../components/InputField';
import UploadFiles from '../../components/Upload';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../../actions/index';
import * as func from '../../../libs/functions';
import styles from '../../../libs/styles';

const RadioGroup = Radio.Group;

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            open: props.open,

            editor: null,

            thumbs: [],
            tags: [],
            category: [],
            type: '',
            author: '',
            abstract: '',
            title: '',
            content: '',

            errors: {},
        };
    }

    drawerOpen(){
        this.setState({
            open: true,
        }, ()=>{
            if(!this.state.editor){
                this.initWangEditor();
            }
        });
    }
    drawerClose(){
        this.setState({
            open: false,
            thumbs: [],
            tags: [],
            category: [],
            type: '',
            author: '',
            abstract: '',
            title: '',
            content: '',

            errors: {},
        }, ()=>{
            this.props.handleClose && this.props.handleClose();
        });

    }
    messageOpen(msg){
        message.info(msg);
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
        }else{
            //获取文章信息，并填充内容
        }

    }
    setEditor(){

    }

    initWangEditor(){
        let _this = this;
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
            _this.setState({
                content: html,
            });
        };

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
        console.log(v);
        this.setState({
            category: v,
        });
    }
    selectTag(v, e){
        this.setState({
            tags: v,
        });
    }

    getThumb(data){
        this.setState({
            thumbs: data || [],
        });
    }

    save(status){
        if(!this.validateSubmit()){
            this.errorMsgShow();
            return;
        }

        let data = {
            thumbs: this.state.thumbs.slice(0),
            tags: this.state.tags.slice(0),
            category: this.state.category.slice(0),
            type: this.state.type,
            author: this.state.author,
            abstract: this.state.abstract,
            title: this.state.title,
            content: this.state.content,
        };

        console.log(data);

        if(status == 'draft'){
            console.log('save as draft');
        }else if(status == 'publish'){
            console.log('save as publish');
        }
    }
    resetData(){
        this.setState({
            thumbs: [],
            tags: [],
            category: [],
            type: '',
            author: '',
            abstract: '',
            title: '',
            content: '',

            errors: {},
        });
    }

    validateSubmit(){
        let errors = this.state.errors;
        $("#title").focus().blur();
        $("#abstract").focus().blur();
        $("#author").focus().blur();

        if(!this.state.type){
            errors.typeErr = '请选择文章类型';
        }else{
            if(errors.typeErr){
                delete errors.typeErr;
            }
        }

        if(!this.state.category || !this.state.category.length){
            errors.categoryErr = '请选择文章分类';
        }else{
            if(errors.categoryErr){
                delete errors.categoryErr;
            }
        }

        if(!this.state.tags || !this.state.tags.length){
            errors.tagErr = '请选择文章标签';
        }else{
            if(errors.tagErr){
                delete errors.tagErr;
            }
        }

        if(!this.state.content.length || this.state.content == '<p><br></p>'){
            errors.contentErr = '请完成文章内容的输入';
        }else{
            if(errors.contentErr){
                delete errors.contentErr;
            }
        }

        if(this.state.type == '2' && !this.state.thumbs.length){
            errors.thumbsErr = '请上传文章缩略图';
        }else{
            if(errors.thumbsErr){
                delete errors.thumbsErr;
            }
        }

        this.setState({
            errors: errors,
        });
        if(Object.keys(errors).length){
            return false;
        }

        return true;
    }

    inputBlur(id, e){
        let errors = this.state.errors;
        let value = e.target.value;
        let msg = '';

        switch(id){
            case 'title':
                if(!value.length){
                    msg = '文章标题不能为空';
                }else if(value.length > 60){
                    msg = '文章标题最多60字';
                }

                if(msg){
                    errors.titleErr = msg;
                }else{
                    delete errors.titleErr;
                }

                break;
            case 'abstract':
                if(!value.length){
                    msg = '文章摘要不能为空';
                }else if(value.length > 60){
                    msg = '文章摘要最多320字';
                }

                if(msg){
                    errors.abstractErr = msg;
                }else{
                    delete errors.abstractErr;
                }

                break;
            case 'author':
                if(value.length > 60){
                    msg = '作者名称最多60字';
                }

                if(msg){
                    errors.authorErr = msg;
                }else{
                    delete errors.authorErr;
                }

                break;
            default:
                break;
        }

        this.setState({
            errors: errors,
        });

    }
    inputFocus(id, e){
        let errors = this.state.errors;

        switch(id){
            case 'title':
                errors.titleErr = '';
                break;
            case 'abstract':
                errors.abstractErr = '';
                break;
            case 'author':
                errors.authorErr = '';
                break;
            default:
                break;
        }

        this.setState({
            errors: errors,
        });
    }
    errorMsgShow(){
        let errors = this.state.errors;
        if(errors.titleErr || errors.abstractErr || errors.authorErr){
            return;
        }else if(errors.typeErr){
            this.messageOpen( errors.typeErr );
        }else if(errors.categoryErr){
            this.messageOpen( errors.categoryErr );
        }else if(errors.tagErr){
            this.messageOpen( errors.tagErr );
        }else if(errors.contentErr){
            this.messageOpen( errors.contentErr );
        }else if(errors.thumbsErr){
            this.messageOpen( errors.thumbsErr );
        }
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
                                        defaultValue={ this.state.title }
                                        error={ this.state.errors.titleErr }
                                        onBlur={ this.inputBlur.bind(this, 'title') }
                                        onFocus={ this.inputFocus.bind(this, 'title') }
                                        onChange={(e) => {this.setState({title: e.target.value});}}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章摘要</label>
                                <div className="input-box">
                                    <TextField
                                        id="abstract"
                                        placeholder={`请输入文章摘要`}
                                        defaultValue={ this.state.abstract }
                                        error={ this.state.errors.abstractErr }
                                        onBlur={ this.inputBlur.bind(this, 'abstract') }
                                        onFocus={ this.inputFocus.bind(this, 'abstract') }
                                        onChange={(e) => {this.setState({abstract: e.target.value});}}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章作者</label>
                                <div className="input-box">
                                    <TextField
                                        id="author"
                                        placeholder={`请输入文章作者`}
                                        defaultValue={ this.state.author }
                                        error={ this.state.errors.authorErr }
                                        onBlur={ this.inputBlur.bind(this, 'author') }
                                        onFocus={ this.inputFocus.bind(this, 'author') }
                                        onChange={(e) => {this.setState({author: e.target.value});}}
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
                                        defaultValue={ this.state.category }
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
                                        defaultValue={ this.state.tags }
                                        style={ styles.form.select }
                                        mode="multiple"
                                        maxTagCount={6}
                                        allowClear={true}
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
                            <div className="upload-thumb-box">
                                <div className="input-field">
                                    <label>缩略图</label>
                                    <div className="input-box input-right-box">
                                        <UploadFiles
                                            default={ this.state.thumbs }
                                            collect={ this.getThumb.bind(this) }
                                        />
                                    </div>
                                </div>
                            </div>
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
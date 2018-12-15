import React from 'react';

import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

import UploadFiles from '../../components/Upload';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../../actions/index';
import * as func from '../../../libs/functions';
import styles from '../../../libs/styles';
import * as Events from '../../../libs/events';

const categorys = [
    {
        id: '1',
        slug: 'category1',
        name: '分类 1',
    },
    {
        id: '2',
        slug: 'category2',
        name: '分类 2',
    },
    {
        id: '3',
        slug: 'category3',
        name: '分类 3',
    },
    {
        id: '4',
        slug: 'category4',
        name: '分类 4',
    },
    {
        id: '5',
        slug: 'category5',
        name: '分类 5',
    },
];
const tags = [
    {
        id: '1',
        slug: 'tag1',
        name: '标签 1',
    },
    {
        id: '2',
        slug: 'tag2',
        name: '标签 2',
    },
    {
        id: '3',
        slug: 'tag3',
        name: '标签 3',
    },
    {
        id: '4',
        slug: 'tag4',
        name: '标签 4',
    },
    {
        id: '5',
        slug: 'tag5',
        name: '标签 5',
    },
];

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            snackbar: false,
            snackbarText: '',

            editor: null,

            thumbs: [],
            tags: [],
            tagsLabel: [],
            category: "",
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
            category: '',
            type: '',
            author: '',
            abstract: '',
            title: '',
            content: '',

            errors: {},
        });

    }
    snackbarOpen(msg){
        this.setState({
            snackbar: true,
            snackbarText: msg,
        });
    }
    snackbarClose(){
        this.setState({
            snackbar: false,
            snackbarText: '',
        });
    }

    componentDidMount(){
        if(!window.hasOwnProperty('wangEditor')){
            func.createScript('/public/js/wangEditor.min.js', () => {
                console.log('insert wangEditor success');
            });
        }

        Events.emiter.on(Events.OPEN_ARTICLE_EDIT, (id) => {
            this.drawerOpen();
            this.getArticleInfo(id);
        });
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

        Events.emiter.removeAllListeners(Events.OPEN_ARTICLE_EDIT);
    }

    getArticleInfo(id){
        if(id == 'new'){
            this.resetData();
            return ;
        }else{
            //获取文章信息，并填充内容

        }

    }

    initWangEditor(){
        let _this = this;
        if(this.state.editor){
            return;
        }
        let E = window.wangEditor;
        let editor = new E('#tooltop', '#editor');

        editor.customConfig.showLinkImg = false;
        editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
        editor.customConfig.uploadImgMaxLength = 5;
        editor.customConfig.customUploadImg = function (files, insert) {
            files.map((d, k) => {
                _this.uploadImg(d, (img) => {
                    insert(img);
                });
            });
        };

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
    uploadImg(file, cb){
        let _this = this;
        var fd = new FormData();
        fd.append('file', file);

        $.ajax({
            url: `http://localhost:8888/api/upload`,
            type: 'post',
            data: fd,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: (res) => {
                if(res.code == 200){
                    cb && cb(res.data);
                }
            },
            error: (e) => {
                _this.snackbarOpen(e.statusText);
            }
        });
    }

    selectType(e, v){
        this.setState({
            type: v,
        });
    }
    selectCategory(e, key, v){
        this.setState({
            category: v,
        });
    }
    selectTag(e, key, v){
        let tagsLabel = this.state.tagsLabel.slice(0);
        tagsLabel.push(e.target.innerHTML);
        this.setState({
            tags: v,
            tagsLabel: tagsLabel,
        });
    }
    selectionRenderer(values){
        if(values.length){
            return `已经选择 ${values.length} 个标签`;
        }
        return;
    }
    removeTag(id){
        let tags = this.state.tags.slice(0);
        let tagsLabel = this.state.tagsLabel.slice(0);

        let index = tags.indexOf(id);
        tags.splice(index, 1);
        tagsLabel.splice(index, 1);
        this.setState({
            tags: tags,
            tagsLabel: tagsLabel,
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
            thumbnail: this.state.thumbs.slice(0),
            tags: this.state.tags.slice(0),
            category: this.state.category,
            type: this.state.type,
            author: this.state.author,
            abstract: this.state.abstract,
            title: this.state.title,
            content: this.state.content,
        };

        console.log(data);

        if(status == 'draft'){
            data.status = 1;
            console.log('save as draft');
        }else if(status == 'publish'){
            data.status = 2;
            console.log('save as publish');
        }
        this.submit(data);
    }
    submit(d){
        let msg = d.status == 1 ? '保存' : '发布';

        $.ajax({
            url: `${_DEV}/createPost`,
            type: 'POST',
            data: d,
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    this.snackbarOpen(`${msg}成功`);
                    let t = setTimeout(() => {
                        clearTimeout(t);
                        this.drawerClose();
                    }, 500);
                }
            },
            error: (e) => {
                this.snackbarOpen(`${msg}失败，请稍后重试`);
            }
        });
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
            this.snackbarOpen( errors.typeErr );
        }else if(errors.categoryErr){
            this.snackbarOpen( errors.categoryErr );
        }else if(errors.tagErr){
            this.snackbarOpen( errors.tagErr );
        }else if(errors.contentErr){
            this.snackbarOpen( errors.contentErr );
        }else if(errors.thumbsErr){
            this.snackbarOpen( errors.thumbsErr );
        }
    }

    render(){

        return (
            <Drawer
                open={ this.state.open }
                width="100%"
                containerStyle={{overflow:'hidden'}}
                onRequestChange={ this.drawerClose.bind(this) }
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
                                        hintText={`请输入文章标题`}
                                        hintStyle={ styles.selectField.hintStyle }
                                        inputStyle={ styles.selectField.selectedLabel }
                                        value={ this.state.title }
                                        errorText={ this.state.errors.titleErr }
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
                                        hintText={`请输入文章摘要`}
                                        hintStyle={ styles.selectField.hintStyle }
                                        inputStyle={ styles.selectField.selectedLabel }
                                        value={ this.state.abstract }
                                        errorText={ this.state.errors.abstractErr }
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
                                        hintText={`请输入文章作者`}
                                        hintStyle={ styles.selectField.hintStyle }
                                        inputStyle={ styles.selectField.selectedLabel }
                                        value={ this.state.author }
                                        errorText={ this.state.errors.authorErr }
                                        onBlur={ this.inputBlur.bind(this, 'author') }
                                        onFocus={ this.inputFocus.bind(this, 'author') }
                                        onChange={(e) => {this.setState({author: e.target.value});}}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章类型</label>
                                <div className="input-box input-right-box">
                                    <RadioButtonGroup
                                        name='category'
                                        style={{display:'flex'}}
                                        valueSelected={ this.state.type }
                                        onChange={ this.selectType.bind(this) }
                                    >
                                        <RadioButton
                                            value="1"
                                            label="博客"
                                            iconStyle={ styles.button.radioButton.iconStyle }
                                            labelStyle={ styles.button.radioButton.labelStyle }
                                            className="radioButton"
                                            style={ styles.button.radioButton.root }
                                        />
                                        <RadioButton
                                            value="2"
                                            label="实践"
                                            iconStyle={ styles.button.radioButton.iconStyle }
                                            labelStyle={ styles.button.radioButton.labelStyle }
                                            className="radioButton"
                                            style={ styles.button.radioButton.root }
                                        />
                                        <RadioButton
                                            value="3"
                                            label="笔记"
                                            iconStyle={ styles.button.radioButton.iconStyle }
                                            labelStyle={ styles.button.radioButton.labelStyle }
                                            className="radioButton"
                                        />
                                    </RadioButtonGroup>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>文章分类</label>
                                <div className="input-box input-right-box">
                                    <SelectField
                                        value={ this.state.category }
                                        hintText="请选择文章分类"
                                        hintStyle={ styles.selectField.hintStyle }
                                        onChange={this.selectCategory.bind(this) }
                                        labelStyle={ styles.selectField.selectedLabel }
                                    >
                                        {
                                            categorys.map((d, k) => {
                                                return (
                                                    <MenuItem key={ d.id } value={ d.id } primaryText={ d.name } />
                                                );
                                            })
                                        }
                                    </SelectField>
                                </div>
                            </div>
                            <div className="input-field" style={{marginBottom:0}}>
                                <label>文章标签</label>
                                <div className="input-box input-right-box">
                                    <SelectField
                                        multiple={ true }
                                        hintText="请选择文章标签"
                                        hintStyle={ styles.selectField.hintStyle }
                                        value={ this.state.tags }
                                        onChange={ this.selectTag.bind(this) }
                                        selectionRenderer={this.selectionRenderer.bind(this) }
                                        labelStyle={ styles.selectField.selectedLabel }
                                    >
                                        {
                                            tags.map((d, k) => {
                                                let checked = this.state.tags && this.state.tags.indexOf(d.slug) > -1;

                                                return (
                                                    <MenuItem
                                                        key={ d.id }
                                                        insetChildren={ true }
                                                        checked={ checked }
                                                        value={ d.slug }
                                                        primaryText={ d.name }
                                                    />
                                                );
                                            })
                                        }
                                    </SelectField>
                                </div>
                            </div>
                            <div className="input-field" style={{marginTop:0}}>
                                <label>&nbsp;</label>
                                <div className="input-box input-right-box">
                                    {
                                        this.state.tagsLabel.map((d, k) => {

                                            return (
                                                <div key={ k } className="tag-label">
                                                    <span>{d}</span>
                                                    <i className="iconfont icon-delete" onClick={ this.removeTag.bind(this, d) }></i>
                                                </div>
                                            );
                                        })
                                    }
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

                    <Snackbar
                        open={ this.state.snackbar }
                        message={ this.state.snackbarText }
                        autoHideDuration={ 3000 }
                        onRequestClose={ this.snackbarClose.bind(this) }
                    />
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
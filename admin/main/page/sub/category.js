import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import styles from '../../../libs/styles';
import * as Events from '../../../libs/events';
import store from '../../../store';

export default class Category extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open: false,
            topPX: 0,
            snackbar: false,
            snackbarText: '',

            name: '',
            slug: '',
            description: '',
            count: 0,

            errors: {},
        };
    }
    dialogOpen(){
        this.setState({
            open: true,
        });
        let t = setTimeout(() => {
            clearTimeout(t);
            this.setData();
        });
    }
    dialogClose(){
        this.setState({
            open: false,
            name: '',
            slug: '',
            description: '',
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

    componentWillMount(){
        this.centerDialog();
    }
    componentDidMount(){
        Events.emiter.on(Events.OPEN_CATEGORY_EDIT, (id) => {
            console.log(id);
            this.dialogOpen();
        });
    }

    setData(){
        let data = store.getState().category.curCategory || {};

        this.setState({
            name: data.name || '',
            slug: data.slug || '',
            description: data.description || '',
            count: data.count || 0,
        });
    }

    confirm(type){
        if(this.checkData()){
            let data = {
                name: this.state.name,
                slug: this.state.slug,
                description: this.state.description,
            };

            console.log(data);
            let url = `${_DEV}/addCategory`;
            let method = `POST`;
            let msg = `创建`;

            if(type && type == 'update'){//更新数据
                let cid = store.getState().category.curCategoryId;
                url = `${_DEV}/updateCategory/${cid}`;
                method = `PUT`;
                msg = `更新`;
            }

            $.ajax({
                url: url,
                type: method,
                data: data,
                dataType: 'json',
                success: (res) => {
                    if(res.code == 200){
                        this.snackbarOpen(`${msg}分类成功`);
                        this.dialogClose();
                        Events.emiter.emit(Events.UPDATE_CATEGORYS);
                    }else{
                        this.snackbarOpen(`${msg}分类失败，${res.msg}`);
                    }
                },
                error: (e) => {
                    this.snackbarOpen(`${msg}分类失败，请稍后重试`)
                }
            });
        }else{
            console.log('no pass');
        }
    }


    //弹框居中
    centerDialog(){
        let winH = window.innerHeight;
        this.setState({
            topPX: ((winH - 600)/2 - 16),
        });
    }
    inputFocus(id){
        let errors = this.state.errors;

        switch(id){
            case 'name':
                errors.nameErr = '';
                break;
            case 'slug':
                errors.slugErr = '';
                break;
            case 'description':
                errors.descriptionErr = '';
                break;
            default:
                break;
        }

        let t = setTimeout(() => {
            clearTimeout(t);

            this.setState({
                errors: errors,
            });
        });
    }
    inputBlur(id, e){
        let errors = this.state.errors;
        let value = e.target.value;

        switch(id){
            case 'name':
                if(!value.length){
                    errors.nameErr = '分类名称不能为空';
                }else if(value.length > 50){
                    errors.nameErr = '分类名称最多 50 字';
                }else{
                    delete errors.nameErr;
                }

                break;
            case 'slug':
                if(!value.length){
                    errors.slugErr = '分类别名不能为空';
                }else if(value.length > 50){
                    errors.slugErr = '分类别名最多 50 字';
                }else if(this._isChinese(value)){
                    errors.slugErr = '别名仅限 [a-z|A-Z|0-9|_]'
                }else{
                    delete errors.slugErr;
                }

                break;
            case 'description':
                if(!value.length){
                    errors.descriptionErr = '分类描述不能为空';
                }else if(value.length > 320){
                    errors.descriptionErr = '分类描述最多 320 字';
                }else{
                    delete errors.descriptionErr;
                }

                break;
            default:
                break;
        }

        let t = setTimeout(() => {
            clearTimeout(t);

            this.setState({
                errors: errors,
            });
        });
    }
    checkData(){
        let errors = this.state.errors;
        $("#name").focus().blur();
        $("#slug").focus().blur();
        $("#description").focus().blur();

        let name = this.state.name;
        let slug = this.state.slug;
        let desc = this.state.description;

        if(Object.keys(errors).length || !name || !slug || !desc){
            return false;
        }else{
            return true;
        }
    }
    _isChinese(str){
        let reg = /[\u4E00-\u9FA5]/g;
        return reg.test(str);
    }



    render(){
        let curCategoryId = store.getState().category.curCategoryId || '';

        return (
            <div>
                <Dialog
                    className={`customDialog`}
                    open={ this.state.open }
                    modal={ false }
                    autoDetectWindowHeight={ false }
                    contentStyle={{width:'900px',maxWidth:'none',height:'600px',transform:`translate(0px, ${this.state.topPX}px)`}}
                    bodyStyle={{padding:'0'}}
                    bodyClassName="customDialog-bodyClassName"
                    contentClassName="customDialog-contentClassName"
                    onRequestClose={ this.dialogClose.bind(this) }
                >
                    <div className="custom-dialog-container has-header has-footer">
                        <div className="custom-dialog-option">
                            <IconButton
                                iconClassName="iconfont icon-close"
                                iconStyle={{fontSize:'16px'}}
                                onClick={ this.dialogClose.bind(this) }
                            />
                        </div>
                        <div className="custom-dialog-header">
                            <div>
                                <i className="iconfont icon-category-manage"></i>
                                <span>{curCategoryId && curCategoryId != 'new' ? this.state.name : '新建文章分类'}</span>
                            </div>
                        </div>
                        <div className="custom-dialog-body">
                            <div className="custom-dialog-body-scroll">
                                <div className="input-field">
                                    <div className="input-label">
                                        <label className="required">分类名称</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="name"
                                            hintText={`请输入分类名称`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            value={ this.state.name }
                                            errorText={ this.state.errors.nameErr }
                                            onBlur={ this.inputBlur.bind(this, 'name') }
                                            onFocus={ this.inputFocus.bind(this, 'name') }
                                            onChange={(e) => {this.setState({name: e.target.value});}}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-label">
                                        <label className="required">分类别名</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="slug"
                                            hintText={`请输入分类别名`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            value={ this.state.slug }
                                            errorText={ this.state.errors.slugErr }
                                            onBlur={ this.inputBlur.bind(this, 'slug') }
                                            onFocus={ this.inputFocus.bind(this, 'slug') }
                                            onChange={(e) => {this.setState({slug: e.target.value});}}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-label">
                                        <label>分类描述</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="description"
                                            hintText={`请输入分类描述`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            multiLine={ true }
                                            rowsMax={ 6 }
                                            value={ this.state.description }
                                            errorText={ this.state.errors.descriptionErr }
                                            onBlur={ this.inputBlur.bind(this, 'description') }
                                            onFocus={ this.inputFocus.bind(this, 'description') }
                                            onChange={(e) => {this.setState({description: e.target.value});}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-dialog-footer">
                            <FlatButton
                                label="取消"
                                style={ styles.button.cancel }
                                onClick={ this.dialogClose.bind(this) }
                            />
                            {
                                curCategoryId && curCategoryId != 'new' ?
                                    <FlatButton
                                        label="保存"
                                        style={ styles.button.confirm }
                                        onClick={ this.confirm.bind(this, 'update') }
                                    />
                                :
                                    <FlatButton
                                        label="确定"
                                        style={ styles.button.confirm }
                                        onClick={ this.confirm.bind(this, 'save') }
                                    />
                            }
                        </div>
                    </div>
                </Dialog>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />
            </div>
        );
    }
}
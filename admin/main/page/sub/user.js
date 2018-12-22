import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import styles from '../../../libs/styles';
import * as events from '../../../libs/events';
import store from '../../../store';
import * as Funcs from '../../../libs/functions';


export default class User extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open: false,
            topPX: 0,
            snackbar: false,
            snackbarText: '',

            name: '',
            email: '',
            pwd: '',
            confirmpwd: '',

            errors: {},
        };
    }
    dialogOpen(){
        this.setState({
            open: true,
        });
    }
    dialogClose(){
        this.setState({
            open: false,
            name: '',
            email: '',
            pwd: '',
            confirmpwd: '',
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
        events.emiter.on(events.OPEN_USER_EDIT, (id) => {
            this.dialogOpen();
        });
    }

    confirm(type){
        if(this.checkData()){
            let data = {
                name: this.state.name,
                email: this.state.email,
                pwd: this.state.pwd,
                confirmpwd: this.state.confirmpwd,
            };

            console.log(data);

            $.ajax({
                url: `${_DEV}/addUser`,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: (res) => {
                    if(res.code == 200){
                        this.snackbarOpen(`新增用户成功`);
                        this.dialogClose();
                        events.emiter.emit(events.UPDATE_USERS);
                    }else{
                        this.snackbarOpen(res.msg);
                    }
                },
                error: (e) => {
                    this.snackbarOpen(`新增用户失败，请稍后重试`)
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
            case 'email':
                errors.emailErr = '';
                break;
            case 'pwd':
                errors.pwdErr = '';
                break;
            case 'confirmpwd':
                errors.confirmpwdErr = '';
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
            case 'email':
                if(!Funcs._isEmail(value)){
                    errors.emailErr = '请输入正确的邮箱地址';
                }else{
                    delete errors.emailErr;
                }

                break;
            case 'pwd':
                if(!value.length){
                    errors.pwdErr = '密码不能为空';
                }else if(value.length > 10){
                    errors.pwdErr = '密码最多 10 位';
                }else{
                    delete errors.pwdErr;
                }

                break;
            case 'confirmpwd':
                if(value != this.state.pwd){
                    errors.confirmpwdErr = '两次输入的密码不一样';
                }else{
                    delete errors.confirmpwdErr;
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
        $("#email").focus().blur();
        $("#pwd").focus().blur();
        $("#confirmpwd").focus().blur();

        if(Object.keys(errors).length){
            return false;
        }else{
            return true;
        }
    }

    render(){
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
                                <span>新增用户</span>
                            </div>
                        </div>
                        <div className="custom-dialog-body">
                            <div className="custom-dialog-body-scroll">
                                <div className="input-field">
                                    <div className="input-label">
                                        <label className="required">用户昵称</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="name"
                                            hintText={`请输入用户昵称`}
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
                                        <label className="required">用户邮箱</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="email"
                                            hintText={`请输入用户邮箱`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            value={ this.state.email }
                                            errorText={ this.state.errors.emailErr }
                                            onBlur={ this.inputBlur.bind(this, 'email') }
                                            onFocus={ this.inputFocus.bind(this, 'email') }
                                            onChange={(e) => {this.setState({email: e.target.value});}}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-label">
                                        <label className="required">用户密码</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="pwd"
                                            type="password"
                                            hintText={`请输入用户密码`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            value={ this.state.pwd }
                                            errorText={ this.state.errors.pwdErr }
                                            onBlur={ this.inputBlur.bind(this, 'pwd') }
                                            onFocus={ this.inputFocus.bind(this, 'pwd') }
                                            onChange={(e) => {this.setState({pwd: e.target.value});}}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-label">
                                        <label className="required">再次输入密码</label>
                                    </div>
                                    <div className="input-box">
                                        <TextField
                                            id="confirmpwd"
                                            type="password"
                                            hintText={`请再次输入密码`}
                                            hintStyle={ styles.selectField.hintStyle }
                                            inputStyle={ styles.selectField.selectedLabel }
                                            value={ this.state.confirmpwd }
                                            errorText={ this.state.errors.confirmpwdErr }
                                            onBlur={ this.inputBlur.bind(this, 'confirmpwd') }
                                            onFocus={ this.inputFocus.bind(this, 'confirmpwd') }
                                            onChange={(e) => {this.setState({confirmpwd: e.target.value});}}
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
                            <FlatButton
                                label="保存"
                                style={ styles.button.confirm }
                                onClick={ this.confirm.bind(this) }
                            />
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
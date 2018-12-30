import React from 'react';

export default class Notes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loginH: 'auto',

            nameErr: '',
            pwdErr: '',

            canSubmit: true,
        };
    }

    componentDidMount(){
        let winH = $(window).height(),
            headerH = $(".web-header").outerHeight(),
            footerH = $(".web-footer").outerHeight();
        this.setState({
            loginH: winH - headerH - footerH,
        });
    }

    submit(){
        if(!this.checkSubmit()){
            return;
        }
        this.setState({
            canSubmit: false,
        });

        // $.ajax({
        //
        // });
        let t = setTimeout(() => {
            clearTimeout(t);

            this.setState({
                canSubmit: true,
            });
        }, 3000);
    }

    //数据校验
    checkSubmit(){
        $("#name").focus().blur();
        $("#pwd").focus().blur();

        if(!this.state.nameErr && !this.state.pwdErr){
            return true;
        }else{
            return false;
        }
    }
    inputFocus(id){
        switch(id){
            case 'name':
                this.setState({
                    nameErr: '',
                });
                break;
            case 'pwd':
                this.setState({
                    pwdErr: '',
                });
                break;
            default:
                break;
        }
    }
    inputBlur(id, e){
        let value = e.target.value;

        switch(id){
            case 'name':
                let nameErr = '';
                if(!value.length){
                    nameErr = '用户名不能为空';
                }else if(value.length < 6 || value.length > 32){
                    nameErr = '用户名有效长度(6 ~ 32)';
                }else{
                    nameErr = '';
                }

                this.setState({
                    nameErr: nameErr,
                });
                break;
            case 'pwd':
                let pwdErr = '';
                if(!value.length){
                    pwdErr = '密码不能为空';
                }else if(value.length < 6 || value.length > 12){
                    pwdErr = '密码有效长度(6 ~ 12)';
                }else{
                    pwdErr = '';
                }

                this.setState({
                    pwdErr: pwdErr,
                });
                break;
            default:
                break;
        }
    }


    render(){
        return (
            <div className="login-container" style={{height: this.state.loginH}}>
                <div className="login-box">
                    <h3>登录 tym042 后台</h3>
                    <div className="input-field">
                        <div className={`input ${this.state.nameErr ? 'err-input' : ''}`}>
                            <i className="iconfont icon-user"></i>
                            <input
                                id="name"
                                type="text"
                                autoComplete="off"
                                placeholder="请输入用户名"
                                onFocus={ this.inputFocus.bind(this, 'name') }
                                onBlur={ this.inputBlur.bind(this, 'name') }
                                onChange={ (e) => {this.setState({name:e.target.value});} }
                            />
                        </div>
                        {
                            this.state.nameErr ? <p className="error-msg">{ this.state.nameErr }</p> : ''
                        }
                    </div>
                    <div className="input-field">
                        <div className={`input ${this.state.pwdErr ? 'err-input' : ''}`}>
                            <i className="iconfont icon-pwd"></i>
                            <input
                                id="pwd"
                                type="password"
                                autoComplete="off"
                                placeholder="请输入密码"
                                onFocus={ this.inputFocus.bind(this, 'pwd') }
                                onBlur={ this.inputBlur.bind(this, 'pwd') }
                                onChange={ (e) => {this.setState({pwd:e.target.value});} }
                            />
                        </div>
                        {
                            this.state.pwdErr ? <p className="error-msg">{ this.state.pwdErr }</p> : ''
                        }
                    </div>

                    <div className="input-field">
                        <span
                            className={`button ${this.state.canSubmit ? '' : 'disabled'}`}
                            onClick={ this.submit.bind(this) }
                        >
                            登录
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import ReactDOM from 'react-dom';

import IconButton from 'material-ui/IconButton';

import styles from '../../libs/styles';

export default class Topbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userStatus: false,
        };
    }

    componentDidMount(){

    }

    toggleUser(event){
        event.stopPropagation();
        let _this = this;

        function e(event){
            event.stopPropagation();
            let menu = ReactDOM.findDOMNode(_this.refs.user_menu);

            if (!$(menu).is(event.target) && $(menu).has(event.target).length === 0) {
                _this.setState({
                    userStatus: false,
                });

                document.removeEventListener('click', e);
            }
        }

        if(this.state.userStatus){
            this.setState({
                userStatus: true,
            });

            document.removeEventListener('click', e);
        }else{
            this.setState({
                userStatus: true,
            });

            document.addEventListener('click', e);
        }

    }

    render(){
        return (
            <div className="topbar-box">
                <div className="logo-box">
                    TYM042
                </div>
                <div className="option-box">
                    <IconButton iconClassName="iconfont icon-user" />

                    {
                        this.state.userStatus ?
                            <div className="menu-detail" ref="user_menu">
                                <div className="tips-box">
                                    <div className="tips-item tips-head">Hello，tim</div>
                                    <div className="tips-item" onClick={ ()=>{alert("退出登录")} }>退出登录</div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>


            </div>
        );
    }
}
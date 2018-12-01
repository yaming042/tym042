import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button } from 'antd';

import styles from '../../libs/styles';

//iconfont图标
import { IconFont } from '../components/IconFont';

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
                    <Button
                        shape="circle"
                        style={ styles.topbarIcon }
                        onClick={ this.toggleUser.bind(this) }
                    >
                        <IconFont
                            type="icon-user"
                            style={{color:'#333'}}
                        />
                    </Button>
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
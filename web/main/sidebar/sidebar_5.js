import React from 'react';

import Title from '../components/s_title';

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-sidebar-box box-item">
                <Title
                    label="关于我"
                />
                <div className="contact-us">
                    <div className="qrcode">
                        <div className="qrcode-img">
                            <img src="https://csdnimg.cn/pubfooter/images/csdn-kf.png" alt=""/>
                        </div>
                        <div className="qrcode-img">
                            <img src="https://csdnimg.cn/pubfooter/images/csdn-kf.png" alt=""/>
                        </div>
                    </div>
                    <div className="contact-way">
                        <p>
                            <i className="iconfont icon-wechat"></i>
                            99999999
                        </p>
                        <p>
                            <i className="iconfont icon-qq"></i>
                            99999999
                        </p>
                        <p>
                            <i className="iconfont icon-phone"></i>
                            99999999
                        </p>
                        <p>
                            <i className="iconfont icon-email"></i>
                            99999999
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
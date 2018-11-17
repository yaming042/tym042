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
                    label="网络博文"
                />
                <div className="net-list">
                    <div className="net-item">
                        <div className="net-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <div className="net-details">
                            Redis 应用策略指南——原理分析、案例，及解决Redis 应用策略指南——原理分析、案例，及解决
                        </div>
                    </div>
                    <div className="net-item">
                        <div className="net-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <div className="net-details">
                            Redis 应用策略指南——原理分析、案例，及解决Redis 应用策略指南——原理分析、案例，及解决
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
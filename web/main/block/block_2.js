import React from 'react';

import Btitle from '../components/b_title';

export default class Block extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-block-box">
                <Btitle
                    label="Web Code"
                    link="/"
                />
                <div className="web-code-list">
                    <div className="web-code-item">
                        <div className="web-code-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <div className="web-code-info">
                            <div className="info-title">标题标题标题标题</div>
                            <div className="info-desc">描述描述描述描述描述描述描述描述描述描述</div>
                        </div>
                    </div>
                    <div className="web-code-item">
                        <div className="web-code-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <div className="web-code-info">
                            <div className="info-title">标题标题标题标题</div>
                            <div className="info-desc">描述描述描述描述描述描述描述描述描述描述</div>
                        </div>
                    </div>
                    <div className="web-code-item">
                        <div className="web-code-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <div className="web-code-info">
                            <div className="info-title">标题标题标题标题</div>
                            <div className="info-desc">描述描述描述描述描述描述描述描述描述描述</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';

export default class Resume extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="resume">
                <h2>
                    <span>Resume</span>
                </h2>
                <div className="resume-list">
                    <div className="resume-list-item">
                        <span className="resume-icon">
                            <i className="iconfont icon-resume"></i>
                        </span>
                        <div className="resume-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <p>测试测试测试测试</p>
                    </div>
                    <div className="resume-list-item">
                        <span className="resume-icon">
                            <i className="iconfont icon-resume"></i>
                        </span>
                        <div className="resume-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <p>测试测试测试测试</p>
                    </div>
                    <div className="resume-list-item">
                        <span className="resume-icon">
                            <i className="iconfont icon-resume"></i>
                        </span>
                        <div className="resume-img">
                            <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                        </div>
                        <p>测试测试测试测试</p>
                    </div>
                </div>
            </div>
        );
    }
}
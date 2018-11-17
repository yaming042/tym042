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
                   label="Blog"
                   link="/"
               />
                <div className="blog-list">
                    <div className="blog-item">
                        <div className="blog-item-title">
                            <h3>这是一个文字的头部文字，标题标题标题标题标题标题标题标题标题</h3>
                        </div>
                        <div className="blog-item-body">
                            <div className="blog-img">
                                <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                            </div>
                            <div className="blog-article">
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </div>
                        </div>
                        <div className="blog-item-footer">
                            <div className="time">2018-09-09 12:12:12</div>
                            <div className="author">作者：小明</div>
                            <div className="source">来源：原创</div>
                        </div>
                    </div>

                    <div className="blog-item">
                        <div className="blog-item-title">
                            <h3>这是一个文字的头部文字，标题标题标题标题标题标题标题标题标题</h3>
                        </div>
                        <div className="blog-item-body">
                            <div className="blog-img">
                                <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/001.png" alt=""/>
                            </div>
                            <div className="blog-article">
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </div>
                        </div>
                        <div className="blog-item-footer">
                            <div className="time">2018-09-09 12:12:12</div>
                            <div className="author">作者：小明</div>
                            <div className="source">来源：原创</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
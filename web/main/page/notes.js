import React from 'react';

import Pagination from '../components/pagination';

export default class Notes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            openFilter: false,
        };
    }

    render(){
        return (
            <div className={`web-articles web-notes`}>
                <div className="articles-page-banner">
                    <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/banner_top.jpg" alt=""/>
                </div>

                <div className="articles-content">
                    <div className="articles-body">

                        <div className="articles-options">
                            <div className="articles-navgation">
                                <span>全部笔记</span>
                                <i className="iconfont icon-arrow-r"></i>
                                <span>2018年</span>
                            </div>

                            {
                                this.state.openFilter ?
                                    <div className="articles-action">
                                        <div className="sort">排序：</div>
                                        <div>默认</div>
                                        <div>按更新时间</div>
                                        <div>按访问量</div>
                                    </div>
                                    :
                                    null
                            }
                        </div>

                        <div className="articles-list">
                            <div className="articles-item">
                                <p className="content">应石头兄弟之邀，想从复杂性的视角看一下从微服务到service mesh 的演进，
                                    没想到复杂性本身就是一个难点，于是找来了一本关于复杂性的书，希望从中能够对复杂性有一些进一步的认识。
                                    （来自百度百科） 复杂性是当代科学的一个前沿和热点，具有跨学科综合性的趋势。不幸的是，复杂系统理论仍</p>
                                <div className="articles-info">
                                    <span>发布时间: 2018-08-29 07:00:00</span>
                                </div>
                            </div>
                            <div className="articles-item">
                                <p className="content">应石头兄弟之邀，想从复杂性的视角看一下从微服务到service mesh 的演进，
                                    没想到复杂性本身就是一个难点，于是找来了一本关于复杂性的书，希望从中能够对复杂性有一些进一步的认识。
                                    （来自百度百科） 复杂性是当代科学的一个前沿和热点，具有跨学科综合性的趋势。不幸的是，复杂系统理论仍</p>
                                <div className="articles-info">
                                    <span>发布时间: 2018-08-29 07:00:00</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Pagination
                                curPage={ 1 }
                                total={ 15 }
                            />
                        </div>
                    </div>
                    <div className="articles-sidebar">
                        <div style={{height:'200px',background:'blue'}}></div>
                    </div>
                </div>
            </div>
        );
    }
}
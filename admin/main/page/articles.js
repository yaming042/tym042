import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions';

import _ from 'underscore';

import Pagination from '../components/pagination';

class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openFilter: false,
        };
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(nextProps.match.params, this.props.match.params)){
            console.log('执行更新操作！');
        }
    }

    render(){
        let type = this.props.match.params.type;
        let articleClass = type ? (type == 'blog' ? 'web-articles-blog' : 'web-articles-code') : 'web-articles-list';
        return (
            <div className={`web-articles ${ articleClass }`}>
                <div className="articles-page-banner">
                    <img src="http://demo.cssmoban.com/cssthemes5/ccps_21_bpr/images/banner_top.jpg" alt=""/>
                </div>

                <div className="articles-content">
                    <div className="articles-body">

                        <div className="articles-options">
                            <div className="articles-navgation">
                                <span>全部文章</span>
                                <i className="iconfont icon-arrow-r"></i>
                                <span>热点</span>
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
                                <h4 className="title">《复杂系统突现论》读后</h4>
                                <p className="content">应石头兄弟之邀，想从复杂性的视角看一下从微服务到service mesh 的演进，
                                    没想到复杂性本身就是一个难点，于是找来了一本关于复杂性的书，希望从中能够对复杂性有一些进一步的认识。
                                    （来自百度百科） 复杂性是当代科学的一个前沿和热点，具有跨学科综合性的趋势。不幸的是，复杂系统理论仍</p>
                                <div className="articles-info">
                                    <span>发布时间: 2018-08-29 07:00:00</span>
                                    <span>阅读量: 999</span>
                                </div>
                            </div>
                            <div className="articles-item">
                                <h4 className="title">《复杂系统突现论》读后</h4>
                                <p className="content">应石头兄弟之邀，想从复杂性的视角看一下从微服务到service mesh 的演进，
                                    没想到复杂性本身就是一个难点，于是找来了一本关于复杂性的书，希望从中能够对复杂性有一些进一步的认识。
                                    （来自百度百科） 复杂性是当代科学的一个前沿和热点，具有跨学科综合性的趋势。不幸的是，复杂系统理论仍</p>
                                <div className="articles-info">
                                    <span>发布时间: 2018-08-29 07:00:00</span>
                                    <span>阅读量: 999</span>
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



//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state;
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
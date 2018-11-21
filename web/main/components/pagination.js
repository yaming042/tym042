import React from 'react';

export default class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPage: 6,
        };
    }

    render(){
        let total = this.props.total || 0;
        let curPage = this.props.curPage || 1;
        let pages = [];

        let beginForNumber = this.state.showPage <= total ? 1 : curPage;
        let forNumberTo = beginForNumber+this.state.showPage <= total ? total : beginForNumber+this.state.showPage;

        for(let i=beginForNumber;i<forNumberTo;i++){
            pages.push(
                <span data-pid={`${i}`}>{i}</span>
            );
        }

        return (
            <div className="pagination-component">
                {
                    this.state.showPage > total ?
                        <div className={`first-page radiusLeft`}>
                            <span className="iconfont icon-first-page"></span>
                        </div>
                    :
                        null
                }

                <div className={`prev-page ${this.state.showPage > total ? '' : 'radiusLeft'}`}>
                    <span className="iconfont icon-arrow-l"></span>
                </div>
                <div className="pagination-page">
                    { pages }
                </div>
                <div className={`next-page ${this.state.showPage > total ? '' : 'radiusRight'}`}>
                    <span className="iconfont icon-arrow-r"></span>
                </div>
                {
                    this.state.showPage > total ?
                        <div className="last-page radiusRight">
                            <span className="iconfont icon-last-page"></span>
                        </div>
                    :
                        null
                }

                <div className="total-page">
                    <span>共 { total } 页</span>
                </div>
            </div>
        );
    }
}
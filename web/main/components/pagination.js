import React from 'react';

export default class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPage: 7,
            pages: [],
        };
    }

    componentDidMount(){
        let pages = this.calculatePages();
        this.setState({
            pages: pages.slice(0),
        });

        this.bindEvents();
    }
    componentWillUnmount(){
        $('document').off('click.pagination');
    }

    calculatePages(){
        let showPage = this.state.showPage;
        let total = this.props.total || 0;
        let curPage = this.props.curPage || 1;
        let pages = [];

        if(curPage < showPage - 2){//头
            for(let i=1;i<=showPage;i++){
                let temp = '';
                if(i<=showPage - 2){
                    temp = <span key={i} data-pid={`${i}`} className={`${i == curPage ? 'active-page' : ''}`}>{i}</span>
                }else if(i == showPage){
                    temp = <span key={i} data-pid={`${total}`}>{total}</span>
                }else{
                    temp = <span key={i} className="ellipsis">...</span>
                }
                pages.push( temp );
            }
        }else if(curPage > total - (showPage - 2)){//尾
            for(let i=1;i<=showPage;i++){
                let temp = '';
                if(i == 1){
                    temp = <span key={i} data-pid="1">1</span>
                }else if(i == 2){
                    temp = <span key={i} className="ellipsis">...</span>
                }else{
                    temp = <span key={i} data-pid={`${ total-(showPage-2)+1 }`}  className={`${(total-(showPage-2)+1) == curPage ? 'active-page' : ''}`}>{ total-(showPage-2)+1 }</span>
                }
                pages.push( temp );
            }
        }else{
            let middle = parseInt(showPage/2) + 1;
            let h = curPage - middle;

            for(let i=1;i<=showPage;i++){
                let temp = '';
                if(i == 1){
                    temp = <span key={i} data-pid="1">1</span>
                }else if(i == 2 || i == showPage - 1){
                    temp = <span key={i} className="ellipsis">...</span>
                }else if(i == showPage){
                    temp = <span key={i} data-pid={`${total}`}>{total}</span>
                }else{
                    temp = <span key={i} data-pid={`${i+h}`} className={`${(i+h) == curPage ? 'active-page' : ''}`}>{i+h}</span>
                }
                pages.push( temp );
            }
        }

        return pages;
    }
    bindEvents(){
        $(document).on('click.pagination', '.pagination-component .pagination-page span', (e) => {
            let pid = $(e.target).attr('data-pid');
            if(!$(e.target).hasClass('ellipsis')){
                console.log(pid);
            }
        });
    }

    render(){
        return (
            <div className="pagination-component">
                {
                    this.props.curPage == 1 ?
                        null
                    :
                        <div className={`prev-page radiusLeft`}>
                            <span className="iconfont icon-arrow-l"></span>
                        </div>
                }

                <div className="pagination-page">
                    { this.state.pages }
                </div>
                {
                    this.props.curPage == this.props.total ?
                        null
                    :
                        <div className={`next-page radiusRight`}>
                            <span className="iconfont icon-arrow-r"></span>
                        </div>
                }


                <div className="total-page">
                    <span>共 { this.props.total || 0 } 页</span>
                </div>
            </div>
        );
    }
}
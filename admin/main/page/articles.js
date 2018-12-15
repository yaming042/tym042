import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import Article from './sub/article';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions';

import styles from '../../libs/styles';
import history from '../../libs/history';
import * as Events from '../../libs/events';

class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            curArticleId: '',

            drawerOpen: false,
            dialogOpenDel: false,
        };
    }

    dialogOpenDelete(){
        this.setState({
            dialogOpenDel: true,
        });
    }
    dialogCloseDelete(){
        this.setState({
            dialogOpenDel: false,
        });
    }
    showOptionsMenu(id, e){
        //不要在setState的更新函数中访问event变量，会报错的
        this.setState({
            curArticleId: id,
        });

        this.commonMenuOpen('articles-options-menu', e);
    }
    //显示操作菜单
    commonMenuOpen(menuId, evt){
        let node = $(evt.target);
        let pclass = 'list-item';
        let cClass = 'tr-bg';
        let tClass = 'iconfont-show-more';

        /*根据父节点是否有特定的类来判断是否需要打开或关闭
         * 1:点击同一个icon
         * 2:点击不同的icon
         * 3:点击icon之外的节点
         * */
        let pnode = node.parents('.'+pclass);
        if(pnode.hasClass(cClass)){
            pnode.removeClass(cClass);
            $('#'+menuId).css({'left': '0px', 'top': '-1000px', "display": 'none'});
        }else{
            pnode.siblings().removeClass(cClass);
            pnode.addClass(cClass);
            if(evt){
                let left = evt.clientX;
                let top = evt.clientY;
                if(top > ($(window).height() / 5 * 4)){
                    $('#'+menuId).css({
                        'left': left - 10 - $('#'+menuId).width() + 'px',
                        'top': top + 5 - $('#'+menuId).height() + 'px',
                        'zIndex': 1501,
                        'display': 'block'
                    });
                }else{
                    $('#'+menuId).css({'left': left - 10 - $('#'+menuId).width() + 'px', 'top': top + 5 + 'px','zIndex': 1501, 'display': 'block'});
                }

                $(document).on('click.openMenu', function(e) {//用命名空间绑定函数，方便取消取消显示窗口
                    if(!$(e.target).hasClass(tClass)){
                        hiddenMenu(pclass, menuId);
                    }
                });
            }

        }

        function hiddenMenu(c, menuId){
            $('.'+c).removeClass(cClass);
            $('#'+menuId).css({'left': '0px', 'top': '-1000px','display': 'none'});
            $(document).unbind("click.openMenu" );
        }
    }

    componentWillMount(){
        //获取列表数据todo...

        this.setState({
            articles: [
                {
                    id: '1',
                    title: '测试测试标题1',
                    category: [
                        {catid: '1',catname:'分类1',slug:'category1'},
                        {catid: '2',catname:'分类2',slug:'category2'},
                        {catid: '3',catname:'分类3',slug:'category3'},
                    ],
                    tags: [
                        {tagid: '1',tagname:'Tag1',slug:'tag1'},
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                        {tagid: '3',tagname:'Tag3',slug:'tag3'},
                    ],
                    author: 'test1',
                    updated_at: '2018-09-08 11:09:22',
                },
                {
                    id: '2',
                    title: '测试测试标题2',
                    category: [
                        {catid: '1',catname:'分类1',slug:'category1'},
                        {catid: '2',catname:'分类2',slug:'category2'},
                    ],
                    tags: [
                        {tagid: '1',tagname:'Tag1',slug:'tag1'},
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                    ],
                    author: 'test2',
                    updated_at: '2018-09-08 11:09:22',
                },
                {
                    id: '3',
                    title: '测试测试标题3',
                    category: [
                        {catid: '2',catname:'分类2',slug:'category2'},
                        {catid: '3',catname:'分类3',slug:'category3'},
                    ],
                    tags: [
                        {tagid: '2',tagname:'Tag2',slug:'tag2'},
                        {tagid: '3',tagname:'Tag3',slug:'tag3'},
                    ],
                    author: 'test3',
                    updated_at: '2018-09-08 11:09:22',
                },
            ],
        });
    }
    componentWillReceiveProps(nextProps){}

    //创建新文章
    createNewArticle(){
        Events.emiter.emit(Events.OPEN_ARTICLE_EDIT, 'new');
    }
    //编辑、预览文章
    view(){
        let aid = this.state.curArticleId;
        Events.emiter.emit(Events.OPEN_ARTICLE_EDIT, aid);
    }
    //删除文章
    delete(){
        this.dialogOpenDelete();
    }

    confirmDelete(){
        this.dialogCloseDelete();
    }

    render(){
        let actionsDelete = [
            <FlatButton label="取消" style={ styles.button.cancel } onClick={ this.dialogCloseDelete.bind(this) } />,
            <FlatButton label="确定" style={ styles.button.confirmDelete } onClick={ this.confirmDelete.bind(this) } />,
        ];

        return (
            <div className="container-box articles-box">
                <div className="add-edit-option">
                    <FlatButton
                        label="发布文章"
                        style={ styles.button.createButton }
                        onClick={ this.createNewArticle.bind(this) }
                    />
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">标题</div>
                        <div className="col-b">作者</div>
                        <div className="col-c">分类</div>
                        <div className="col-d">标签</div>
                        <div className="col-e">日期</div>
                        <div className="col-f">操作</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            {
                                this.state.articles.map((d, k) => {
                                    let cats = '';
                                    let tags = '';
                                    d.category.map((c, ck) => {
                                        cats += ','+c.catname;
                                    });
                                    d.tags.map((c, ck) => {
                                        tags += ','+c.tagname;
                                    });
                                    return (
                                        <div className="list-item" key={ d.id }>
                                            <div className="col-a">{ d.title }</div>
                                            <div className="col-b">{ d.author }</div>
                                            <div className="col-c">{ cats.substr(1) }</div>
                                            <div className="col-d">{ tags.substr(1) }</div>
                                            <div className="col-e">{ d.updated_at }</div>
                                            <div className="col-f">
                                                <IconButton
                                                    className="iconfont-show-more"
                                                    iconClassName="iconfont icon-show-more"
                                                    iconStyle={ styles.optionMenu.icon }
                                                    onClick={ this.showOptionsMenu.bind(this, d.id) }
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>
                    </div>

                </div>

                {/*文章详情页*/}
                <Article />

                <Dialog
                    titleStyle={ styles.deleteDialog.title }
                    contentStyle={ styles.deleteDialog.content }
                    actions={ actionsDelete }
                    modal={ false }
                    open={ this.state.dialogOpenDel }
                    onRequestClose={ this.dialogCloseDelete.bind(this) }
                >
                    是否确定 删除 此文章?
                </Dialog>

                <Paper id="articles-options-menu" className="options-menu" style={ styles.optionMenu.menu } >
                    <div className="menu-item" onClick={ this.view.bind(this) }>
                        <i className="iconfont icon-edit"></i>
                        <span>编辑</span>
                    </div>
                    <div className="menu-item" onClick={ this.delete.bind(this) }>
                        <i className="iconfont icon-delete"></i>
                        <span>删除</span>
                    </div>
                </Paper>
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
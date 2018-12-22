import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import Article from './sub/article';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions';

import styles from '../../libs/styles';
import * as Events from '../../libs/events';

import store from '../../store';
import * as TYPE from '../../libs/const';

const articleTypes = ['','博客','实践','笔记'];
const articleStatus = ['','草稿','已发布','已删除'];

class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            snackbar: false,
            snackbarText: '',

            articles: [],
            curArticleId: '',

            drawerOpen: false,
            dialogOpenDel: false,

            articleType: '',//筛选，文章类型，''：所有稿件，1：博客，2：实践，3：笔记
            articleStatus: 2,//筛选，文章状态，''：所有稿件，1：草稿，2：已发布，3：已删除
        };
    }

    snackbarOpen(msg){
        this.setState({
            snackbar: true,
            snackbarText: msg,
        });
    }
    snackbarClose(){
        this.setState({
            snackbar: false,
            snackbarText: '',
        });
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
        this.getArticles();
    }
    componentDidMount(){
        Events.emiter.on(Events.UPDATE_ARTICLE_LIST, () => {
            this.getArticles();
        });
    }
    componentWillReceiveProps(nextProps){}
    componentWillUnmount(){
        Events.emiter.removeAllListeners(Events.UPDATE_ARTICLE_LIST);
    }

    getArticles(){
        $.ajax({
            url: `${_DEV}/getPosts`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                if(res.code == 200){
                    this.setState({
                        articles: res.data || [],
                    });
                }else{
                    this.snackbarOpen( res.msg );
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取文章列表失败，请稍后重试`);
            }
        });
    }
    getArticleInfo(id){
        $.ajax({
            url: `${_DEV}/getPost/${id}`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                if(res.code == 200){
                    store.dispatch({
                        type: TYPE.SET_CUR_ARTICLE,
                        val: res.data || {}
                    });
                    store.dispatch({
                        type: TYPE.SET_CUR_ARTICLE_ID,
                        val: id
                    });

                    Events.emiter.emit(Events.OPEN_ARTICLE_EDIT, id);
                }else{
                    this.snackbarOpen(`获取文章详情失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取文章详情失败，请稍后重试`);
            }
        });
    }
    //编辑、预览文章
    view(type){
        let aid = this.state.curArticleId;
        if(type && type == 'new'){
            aid = type == 'new' ? '' : aid;

            store.dispatch({
                type: TYPE.SET_CUR_ARTICLE,
                val: {}
            });
            store.dispatch({
                type: TYPE.SET_CUR_ARTICLE_ID,
                val: aid
            });

            Events.emiter.emit(Events.OPEN_ARTICLE_EDIT, aid);
        }else{
            // this.getArticleInfo(aid);
            let articles = this.state.articles.slice(0) || [],
                len = articles.length;
            for(let i=0;i<len;i++){
                if( articles[i].guid == aid ){
                    store.dispatch({
                        type: TYPE.SET_CUR_ARTICLE,
                        val: articles[i] || {}
                    });
                    store.dispatch({
                        type: TYPE.SET_CUR_ARTICLE_ID,
                        val: aid
                    });

                    Events.emiter.emit(Events.OPEN_ARTICLE_EDIT, aid);
                    break;
                }
            }
        }
    }
    //删除文章
    delete(){
        this.dialogOpenDelete();
    }
    confirmDelete(){
        let id = this.state.curArticleId;
        if(!id){
            this.snackbarOpen(`缺失当前文章的id`);
            return;
        }
        $.ajax({
            url: `${_DEV}/deletePost/${id}`,
            type: 'PUT',
            dataType: 'json',
            success: (res) => {
                this.dialogCloseDelete();

                if(res.code == 200){
                    this.snackbarOpen(`删除文章成功`);
                    let t = setTimeout(() => {
                        clearTimeout(t);

                        Events.emiter.emit(Events.UPDATE_ARTICLE_LIST);
                    }, 500);
                }else{
                    this.snackbarOpen(res.msg);
                }
            },
            error: (e) => {
                this.dialogCloseDelete();
                this.snackbarOpen(`删除文章失败，请稍后重试`);
            }
        });
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
                        label="新建稿件"
                        style={ styles.button.createButton }
                        onClick={ this.view.bind(this, 'new') }
                    />
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">标题</div>
                        <div className="col-b">
                            类型
                            <IconMenu
                                iconButtonElement={
                                    <IconButton style={{padding:0,width:24,height:24}}>
                                        <FontIcon className="iconfont icon-arrow-b" style={{fontSize:12}}/>
                                    </IconButton>
                                }
                                iconStyle={ styles.optionMenu.iconMenuStyle }
                                style={{padding:0}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                onItemClick={(event, child) => {
                                    this.setState({
                                        articleType: child.key,
                                    });
                                }}
                            >
                                <MenuItem style={ styles.menu.iconMenusList } key={''} primaryText="所有文章"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={1} primaryText="博客"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={2} primaryText="实践"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={3} primaryText="笔记"/>
                            </IconMenu>
                        </div>
                        <div className="col-c">作者</div>
                        <div className="col-d">分类</div>
                        <div className="col-e">标签</div>
                        <div className="col-f">日期</div>
                        <div className="col-g">
                            状态
                            <IconMenu
                                iconButtonElement={
                                    <IconButton style={{padding:0,width:24,height:24}}>
                                        <FontIcon className="iconfont icon-arrow-b" style={{fontSize:12}}/>
                                    </IconButton>
                                }
                                iconStyle={ styles.optionMenu.iconMenuStyle }
                                style={{padding:0}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                onItemClick={(event, child) => {
                                    this.setState({
                                        articleStatus: child.key,
                                    });
                                }}
                            >
                                <MenuItem style={ styles.menu.iconMenusList } key={''} primaryText="所有状态"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={1} primaryText="草稿"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={2} primaryText="已发布"/>
                                <MenuItem style={ styles.menu.iconMenusList } key={3} primaryText="已删除"/>
                            </IconMenu>
                        </div>
                        <div className="col-h">&nbsp;</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            {
                                this.state.articles.map((d, k) => {
                                    let cat = d.category.name || '';
                                    let tags = '';

                                    ( d.tags || [] ).map((c, ck) => {
                                        tags += '、'+c.name;
                                    });
                                    return (
                                        <div className="list-item" key={ d.guid }>
                                            <div className="col-a">{ d.title }</div>
                                            <div className="col-b">{ articleTypes[d.type] }</div>
                                            <div className="col-c">{ d.author }</div>
                                            <div className="col-d">{ cat }</div>
                                            <div className="col-e">{ tags.substr(1) }</div>
                                            <div className="col-f">{ d.updated_at }</div>
                                            <div className="col-g">{ articleStatus[d.status] }</div>
                                            <div className="col-h">
                                                <IconButton
                                                    className="iconfont-show-more"
                                                    iconClassName="iconfont icon-show-more"
                                                    iconStyle={ styles.optionMenu.icon }
                                                    onClick={ this.showOptionsMenu.bind(this, d.guid) }
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {
                                this.state.articles.length ?
                                    null
                                    :
                                    <p className="empty-data">没有数据喔~</p>
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
                    <div className="menu-item" onClick={ this.view.bind(this, 'edit') }>
                        <i className="iconfont icon-edit"></i>
                        <span>编辑</span>
                    </div>
                    <div className="menu-item" onClick={ this.delete.bind(this) }>
                        <i className="iconfont icon-delete"></i>
                        <span>删除</span>
                    </div>
                </Paper>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />
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
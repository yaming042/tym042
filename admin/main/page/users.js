import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import styles from '../../libs/styles';

import store from '../../store';
import * as events from '../../libs/events';
import * as TYPE from '../../libs/const';

import User from './sub/user';

class Users extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            curUserId: '',
            dialogOpenDel: false,
            users: [],

            snackbar: false,
            snackbarText: '',
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
            curUserId: id,
        });

        this.commonMenuOpen('users-options-menu', e);
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
        this.getUsers();
    }
    componentDidMount(){
        events.emiter.on(events.UPDATE_USERS, () => {
            this.getUsers();
        });
    }
    componentWillReceiveProps(nextProps){}
    componentWillUnmount(){
        events.emiter.removeAllListeners(events.UPDATE_USERS);
    }

    getUsers(){
        $.ajax({
            url: `${_DEV}/getUsers`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                if(res.code == 200){
                    this.setState({
                        users: res.data || [],
                    });
                }else{
                    this.snackbarOpen( res.msg );
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取用户列表失败，请稍后重试`);
            }
        });
    }

    view(type){
        let uid = this.state.curUserId;
        if(type && type == 'new'){
            uid = type == 'new' ? '' : uid;

            store.dispatch({
                type: TYPE.SET_CUR_USER,
                val: {}
            });
            store.dispatch({
                type: TYPE.SET_CUR_USER_ID,
                val: uid
            });

            events.emiter.emit(events.OPEN_USER_EDIT, uid);
        }else{
            // this.getUserInfo(aid);
            let users = this.state.users.slice(0) || [],
                len = users.length;
            for(let i=0;i<len;i++){
                if( users[i].userid == uid ){
                    store.dispatch({
                        type: TYPE.SET_CUR_USER,
                        val: users[i] || {}
                    });
                    store.dispatch({
                        type: TYPE.SET_CUR_USER_ID,
                        val: uid
                    });

                    events.emiter.emit(events.OPEN_USER_EDIT, uid);
                    break;
                }
            }
        }
    }
    delete(){
        this.dialogOpenDelete();
    }
    confirmDelete(){
        let id = this.state.curUserId;
        if(!id){
            this.snackbarOpen(`缺失当前用户的id`);
            return;
        }
        $.ajax({
            url: `${_DEV}/deleteUser/${id}`,
            type: 'PUT',
            dataType: 'json',
            success: (res) => {
                this.dialogCloseDelete();

                if(res.code == 200){
                    this.snackbarOpen(`删除用户成功`);
                    let t = setTimeout(() => {
                        clearTimeout(t);

                        events.emiter.emit(events.UPDATE_USER);
                    }, 500);
                }else{
                    this.snackbarOpen(res.msg);
                }
            },
            error: (e) => {
                this.dialogCloseDelete();
                this.snackbarOpen(`删除用户失败，请稍后重试`);
            }
        });
    }



    render(){
        let actionsDelete = [
            <FlatButton label="取消" style={ styles.button.cancel } onClick={ this.dialogCloseDelete.bind(this) } />,
            <FlatButton label="确定" style={ styles.button.confirmDelete } onClick={ this.confirmDelete.bind(this) } />,
        ];

        return (
            <div className="container-box users-box">
                <div className="add-edit-option">
                    <FlatButton
                        label="新增用户"
                        style={ styles.button.createButton }
                        onClick={ this.view.bind(this, 'new') }
                    />
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">用户昵称</div>
                        <div className="col-b">用户邮箱</div>
                        <div className="col-c">创建时间</div>
                        <div className="col-d">&nbsp;</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            {
                                this.state.users.length ?
                                    (this.state.users || []).map((d, k) => {
                                        return (
                                            <div className="list-item" key={ d.userid }>
                                                <div className="col-a">{ d.nickname }</div>
                                                <div className="col-b">{ d.email }</div>
                                                <div className="col-c">{ d.created_at }</div>
                                                <div className="col-d">
                                                    <IconButton
                                                        className="iconfont-show-more"
                                                        iconClassName="iconfont icon-show-more"
                                                        iconStyle={ styles.optionMenu.icon }
                                                        onClick={ this.showOptionsMenu.bind(this, d.userid) }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                :
                                    <p className="empty-data">没有数据喔~</p>
                            }
                        </div>
                    </div>

                </div>

                <User />

                <Dialog
                    titleStyle={ styles.deleteDialog.title }
                    contentStyle={ styles.deleteDialog.content }
                    actions={ actionsDelete }
                    modal={ false }
                    open={ this.state.dialogOpenDel }
                    onRequestClose={ this.dialogCloseDelete.bind(this) }
                >
                    是否确定 删除 此用户?
                </Dialog>

                <Paper id="users-options-menu" className="options-menu" style={ styles.optionMenu.menu } >
                    {/*<div className="menu-item" onClick={ this.view.bind(this) }>*/}
                        {/*<i className="iconfont icon-edit"></i>*/}
                        {/*<span>编辑</span>*/}
                    {/*</div>*/}
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

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
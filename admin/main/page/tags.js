import React from 'react';

import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import store from '../../store';
import * as TYPE from '../../libs/const';

import * as events from '../../libs/events';

import styles from '../../libs/styles';

import DialogTag from './sub/tag';

class Tags extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            snackbar: false,
            snackbarText: '',
            dialogOpenDel: false,

            tags: [],
            curTagId: '',
            curTag: {},
            name: '',
            slug: '',
            description: '',

            errors: {},
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
    dialogDeleteClose(){
        this.setState({
            dialogOpenDel: false,
        });
    }

    componentWillMount(){
        this.getTags();
    }
    componentDidMount(){
        events.emiter.on(events.UPDATE_TAGS, () => {
            this.getTags();
        });
    }

    showOptionsMenu(id, e){
        //不要在setState的更新函数中访问event变量，会报错的
        this.setState({
            curTagId: id,
        });
        store.dispatch({
            type: TYPE.SET_CUR_TAG_ID,
            val: id
        });

        this.commonMenuOpen('tag-options-menu', e);
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

    getTags(){
        $.ajax({
            url: `${_DEV}/getTags`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    this.setState({
                        tags: res.data || [],
                    });
                }else{
                    this.snackbarOpen(`获取标签列表数据失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取标签列表数据失败，请稍后重试`);
            }
        });
    }
    getTag(id, e){
        if(e != undefined && $(e.target).hasClass('iconfont')){
            return;
        }
        $.ajax({
            url: `${_DEV}/getTag/${id}`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    store.dispatch({
                        type: TYPE.SET_CUR_TAG,
                        val: res.data || {}
                    });
                    store.dispatch({
                        type: TYPE.SET_CUR_TAG_ID,
                        val: id
                    });

                    events.emiter.emit(events.OPEN_TAG_EDIT, id);
                }else{
                    this.snackbarOpen(`获取分类数据失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取分类数据失败，请稍后重试`);
            }
        });
    }
    edit(type){
        let id = this.state.curTagId;
        if(type && (type == 'new')){
            id = type == 'new' ? '' : id;

            store.dispatch({
                type: TYPE.SET_CUR_TAG,
                val: {}
            });
            store.dispatch({
                type: TYPE.SET_CUR_TAG_ID,
                val: id
            });

            events.emiter.emit(events.OPEN_TAG_EDIT, id);
        }else{
            this.getTag(id);
        }
    }
    delete(){
        this.setState({
            dialogOpenDel: true,
        });
    }
    deleteTag(){
        let id = this.state.curCategoryId;

        $.ajax({
            url: `${_DEV}/deleteTag/${id}`,
            type: 'delete',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    this.snackbarOpen(`删除标签成功`);
                    let t = setTimeout(() => {
                        clearTimeout(t);

                        this.dialogDeleteClose();
                        this.getTags();
                    });
                }else{
                    this.snackbarOpen(`删除标签失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`删除标签失败，请稍后重试`);
            }
        });
    }

    render(){
        let actionsDelete = [
            <FlatButton label="取消" style={ styles.button.cancel } onClick={ this.dialogDeleteClose.bind(this) } />,
            <FlatButton label="确定" style={ styles.button.confirmDelete } onClick={ this.deleteTag.bind(this) } />,
        ];

        return (
            <div className="container-box tag-box">
                <div className="add-edit-option">
                    <FlatButton
                        label="新建标签"
                        style={ styles.button.createButton }
                        labelStyle={ styles.button.createButtonLabel }
                        onClick={ this.edit.bind(this, 'new') }
                    />
                </div>
                <div className="list-box clearfix">
                    <div className="list-head">
                        <div className="col-a">标签名称</div>
                        <div className="col-b">标签描述</div>
                        <div className="col-c">标签别名</div>
                        <div className="col-d">文章总数</div>
                        <div className="col-e">&nbsp;</div>
                    </div>

                    <div className="list-scroll-box">
                        <div className="list-body">
                            {
                                this.state.tags.map((d, k) => {
                                    return (
                                        <div className="list-item" key={ d.tid } onClick={ this.getTag.bind(this, d.tid)}>
                                            <div className="col-a">{ d.name }</div>
                                            <div className="col-b">{ d.description }</div>
                                            <div className="col-c">{ d.slug }</div>
                                            <div className="col-d">{ d.count }</div>
                                            <div className="col-e">
                                                <IconButton
                                                    className="iconfont-show-more"
                                                    iconClassName="iconfont icon-show-more"
                                                    iconStyle={ styles.optionMenu.icon }
                                                    onClick={ this.showOptionsMenu.bind(this, d.tid) }
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {
                                this.state.tags.length ?
                                    null
                                    :
                                    <p className="nodata">没有数据</p>
                            }
                        </div>
                    </div>
                </div>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />

                <Paper id="tag-options-menu" className="options-menu" style={ styles.optionMenu.menu } >
                    <div className="menu-item" onClick={ this.edit.bind(this, 'edit') }>
                        <i className="iconfont icon-edit"></i>
                        <span>编辑</span>
                    </div>
                    <div className="menu-item" onClick={ this.delete.bind(this) }>
                        <i className="iconfont icon-delete"></i>
                        <span>删除</span>
                    </div>
                </Paper>

                <Dialog
                    titleStyle={ styles.deleteDialog.title }
                    contentStyle={ styles.deleteDialog.content }
                    actions={ actionsDelete }
                    modal={ true }
                    open={ this.state.dialogOpenDel }
                >
                    是否确定 删除 此标签?
                </Dialog>

                <DialogTag />
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

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
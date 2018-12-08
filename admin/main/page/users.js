import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import styles from '../../libs/styles';


class Users extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            curUserId: '',
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

    view(){}
    delete(){}


    render(){
        let actionsDelete = [
            <FlatButton label="取消" style={ styles.button.cancel } onClick={ this.dialogCloseDelete.bind(this) } />,
            <FlatButton label="确定" style={ styles.button.confirmDelete } onClick={ this.delete.bind(this) } />,
        ];

        return (
            <div className="container-box users-box">
                <div className="add-edit-option">
                    <FlatButton
                        label="新增用户"
                        style={ styles.button.createButton }
                    />
                </div>

                <div className="list-box">
                    <div className="list-head">
                        <div className="col-a">用户昵称</div>
                        <div className="col-b">用户邮箱</div>
                        <div className="col-c">用户电话</div>
                        <div className="col-d">操作</div>
                    </div>
                    <div className="list-scroll-box">
                        <div className="list-body">
                            <div className="list-item">
                                <div className="col-a">昵称昵称</div>
                                <div className="col-b">test@qq.com</div>
                                <div className="col-c">13211112222</div>
                                <div className="col-d">
                                    <IconButton
                                        className="iconfont-show-more"
                                        iconClassName="iconfont icon-show-more"
                                        iconStyle={ styles.optionMenu.icon }
                                        onClick={ this.showOptionsMenu.bind(this, '1') }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

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
                    <div className="menu-item" onClick={ this.view.bind(this) }>
                        <i className="iconfont icon-edit"></i>
                        <span>编辑</span>
                    </div>
                    <div className="menu-item" onClick={ this.dialogOpenDelete.bind(this) }>
                        <i className="iconfont icon-delete"></i>
                        <span>删除</span>
                    </div>
                </Paper>
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
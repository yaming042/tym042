import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import styles from '../../libs/styles';

class Category extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            snackbar: false,
            snackbarText: '',
            dialogOpenDel: false,

            categorys: [],
            curCategoryId: '',
            curCategory: {},
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
        this.getCategorys();
    }

    getCategorys(){
        $.ajax({
            url: `${_DEV}/getCategorys`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    this.setState({
                        categorys: res.data || [],
                    });
                }else{
                    this.snackbarOpen(`获取分类列表数据失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取分类列表数据失败，请稍后重试`);
            }
        });
    }
    getCategory(id, e){
        if($(e.target).hasClass('iconfont')){
            return;
        }
        $.ajax({
            url: `${_DEV}/getCategory/${id}`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if(res.code == 200){
                    this.setState({
                        curCategory: res.data || {},
                    });
                }else{
                    this.snackbarOpen(`获取分类数据失败，${res.msg}`);
                }
            },
            error: (e) => {
                this.snackbarOpen(`获取分类数据失败，请稍后重试`);
            }
        });
    }
    addCategroy(){
        if(this.checkData()){
            let data = {
                name: this.state.name,
                slug: this.state.slug,
                description: this.state.description,
            };

            console.log(data);

            $.ajax({
                url: `${_DEV}/addCategory`,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: (res) => {
                    if(res.code == 200){
                        this.snackbarOpen(`创建分类成功`);
                        this.getCategorys();
                        let t = setTimeout(() => {
                            clearTimeout(t);

                            this.setState({
                                name: '',
                                slug: '',
                                description: '',
                                errors: {},
                            });
                        }, 300);
                    }else{
                        this.snackbarOpen(`创建分类失败，${res.msg}`);
                    }
                },
                error: (e) => {
                    this.snackbarOpen(`创建分类失败，请稍后重试`)
                }
            });
        }else{
            console.log('no pass');
        }
    }
    delete(id){
        this.setState({
            curCategoryId: id,
            dialogOpenDel: true,
        });
    }
    deleteCategory(){
        console.log('will delete category, id is: '+this.state.curCategoryId);

        let t = setTimeout(() => {
            clearTimeout(t);

            this.dialogDeleteClose();
        }, 1000);
    }

    inputFocus(id){
        let errors = this.state.errors;

        switch(id){
            case 'category_name':
                errors.nameErr = '';
                break;
            case 'category_slug':
                errors.slugErr = '';
                break;
            case 'category_description':
                errors.descriptionErr = '';
                break;
            default:
                break;
        }

        let t = setTimeout(() => {
            clearTimeout(t);

            this.setState({
                errors: errors,
            });
        });
    }
    inputBlur(id, e){
        let errors = this.state.errors;
        let value = e.target.value;

        switch(id){
            case 'category_name':
                if(!value.length){
                    errors.nameErr = '分类名称不能为空';
                }else if(value.length > 50){
                    errors.nameErr = '分类名称最多 50 字';
                }else{
                    delete errors.nameErr;
                }

                break;
            case 'category_slug':
                if(!value.length){
                    errors.slugErr = '分类Slug不能为空';
                }else if(value.length > 50){
                    errors.slugErr = '分类Slug最多 50 字';
                }else{
                    delete errors.slugErr;
                }

                break;
            case 'category_description':
                if(!value.length){
                    errors.descriptionErr = '分类描述不能为空';
                }else if(value.length > 320){
                    errors.descriptionErr = '分类描述最多 320 字';
                }else{
                    delete errors.descriptionErr;
                }

                break;
            default:
                break;
        }

        let t = setTimeout(() => {
            clearTimeout(t);

            this.setState({
                errors: errors,
            });
        });
    }
    checkData(){
        let errors = this.state.errors;
        $("#category_name").focus().blur();
        $("#category_slug").focus().blur();
        $("#category_description").focus().blur();

        let name = this.state.name;
        let slug = this.state.slug;
        let desc = this.state.description;

        console.log(this.state, name, slug, desc);

        if(Object.keys(errors).length || !name || !slug || !desc){
            return false;
        }else{
            return true;
        }
    }


    render(){
        let actionsDelete = [
            <FlatButton label="取消" style={ styles.button.cancel } onClick={ this.dialogDeleteClose.bind(this) } />,
            <FlatButton label="确定" style={ styles.button.confirmDelete } onClick={ this.deleteCategory.bind(this) } />,
        ];

        return (
            <div className="container-box category-box">
                <div className="list-box clearfix">
                    <div className="add-category-box">
                        <div className="input-field">
                            <label>分类名称</label>
                            <div className="input-box">
                                <TextField
                                    id="category_name"
                                    hintText={`请输入分类名称`}
                                    hintStyle={ styles.selectField.hintStyle }
                                    inputStyle={ styles.selectField.selectedLabel }
                                    errorText={ this.state.errors.nameErr || '' }
                                    value={ this.state.name || '' }
                                    onFocus={ this.inputFocus.bind(this, 'category_name') }
                                    onBlur={ this.inputBlur.bind(this, 'category_name')}
                                    onChange={ (e) => {this.setState({name:e.target.value});} }
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>分类别名</label>
                            <div className="input-box">
                                <TextField
                                    id="category_slug"
                                    hintText={`请输入分类别名`}
                                    hintStyle={ styles.selectField.hintStyle }
                                    inputStyle={ styles.selectField.selectedLabel }
                                    errorText={ this.state.errors.slugErr || '' }
                                    value={ this.state.slug || '' }
                                    onFocus={ this.inputFocus.bind(this, 'category_slug') }
                                    onBlur={ this.inputBlur.bind(this, 'category_slug')}
                                    onChange={ (e) => {this.setState({slug:e.target.value});} }
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>分类描述</label>
                            <div className="input-box">
                                <TextField
                                    id="category_description"
                                    hintText={`请输入分类描述`}
                                    hintStyle={ styles.selectField.hintStyle }
                                    inputStyle={ styles.selectField.selectedLabel }
                                    errorText={ this.state.errors.descriptionErr || '' }
                                    value={ this.state.description || '' }
                                    onFocus={ this.inputFocus.bind(this, 'category_description') }
                                    onBlur={ this.inputBlur.bind(this, 'category_description')}
                                    onChange={ (e) => {this.setState({description:e.target.value});} }
                                />
                            </div>
                        </div>
                        <div style={{height:'20px'}}></div>
                        <FlatButton
                            label="增加分类"
                            style={ styles.button.createButton }
                            onClick={ this.addCategroy.bind(this) }
                        />
                    </div>
                    <div className="list-category-box">
                        <div className="list-head">
                            <div className="col-a">分类名称</div>
                            <div className="col-b">分类描述</div>
                            <div className="col-c">分类别名</div>
                            <div className="col-d">文章总数</div>
                            <div className="col-e">&nbsp;</div>
                        </div>

                        <div className="list-scroll-box">
                            <div className="list-body">
                                {
                                    this.state.categorys.map((d, k) => {
                                        return (
                                            <div className="list-item" key={ d.cid } onClick={ this.getCategory.bind(this, d.cid)}>
                                                <div className="col-a">{ d.name }</div>
                                                <div className="col-b">{ d.description }</div>
                                                <div className="col-c">{ d.slug }</div>
                                                <div className="col-d">{ d.count }</div>
                                                <div className="col-e">
                                                    <IconButton
                                                        className="iconfont-show-more"
                                                        iconClassName="iconfont icon-delete"
                                                        iconStyle={ styles.optionMenu.icon }
                                                        onClick={ this.delete.bind(this, d.cid) }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    this.state.categorys.length ?
                                        null
                                        :
                                        <p className="nodata">没有数据</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />

                <Dialog
                    titleStyle={ styles.deleteDialog.title }
                    contentStyle={ styles.deleteDialog.content }
                    actions={ actionsDelete }
                    modal={ true }
                    open={ this.state.dialogOpenDel }
                >
                    是否确定 删除 此分类?
                </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
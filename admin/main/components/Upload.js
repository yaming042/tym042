import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

import styles from '../../libs/styles';

/*
 * parmas:
 * multi: 是否是多选，默认是单选
 * default: 初始化的数据，默认是没有图片的
 * callback: 上传完成后的回调
 * disabled: 是否允许操作
 * removeCall: 删除后的回调
 * */

export default class UploadOne extends Component{
    constructor(props){
        super(props);

        let multi = this.props.multi ? true : false;

        this.state = {
            id: this.props.id ? this.props.id : 'upload_btn',
            url: this.props.default ? (multi ? this.props.default : this.props.default.slice(0,1)) : [],
            multi: multi,//默认是单选

            uploader: null,

            showProgress: false,
            showUpBtn: this.props.default && this.props.default.length ? (multi ? true : false) : true,

            previewVisible: false,//是否打开图片预览
            previewImage: '',//预览图片的地址

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

    componentDidMount(){
        let _this = this;
        _this.setState({
            url: this.props.default ? (this.state.multi ? this.props.default : this.props.default.slice(0,1)) : [],
        });
        _this.initUpload();
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            url: nextProps.default ? (nextProps.multi ? nextProps.default : nextProps.default.slice(0,1)) : [],
        });
    }

    initUpload(){
        let _this = this;
        let uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: this.state.id,
            multi_selection: this.state.multi || false,
            flash_swf_url: `/public/libs/Moxie.swf`,
            silverlight_xap_url: `/public/libs/Moxie.xap`,
            url: `http://localhost:8888/api/upload`,
            resize: {
                quality: 100,
            },
            filters: {
                mime_types: [ //只允许上传图片
                    {title: "Image files", extensions: `${this.props.suffix || "jpg,jpeg,gif,png,bmp"}`},
                ],
                max_file_size: `${this.props.limit || '1mb'}`, //最大只能上传1mb的文件
                prevent_duplicates: true //不允许选取重复文件
            },

            init: {
                PostInit: function(){},
                FilesAdded: function (up, files) {
                    _this.setState({
                        showProgress: true,
                    });
                    uploader.start();//增加后即刻上传
                },
                FilesRemoved: function(up, file){},
                BeforeUpload: function (up, file) {},
                UploadProgress: function (up, file) {
                    let btnId = _this.state.id;

                    $('#file-name-'+btnId).text(file.percent + '%');
                    $('#file-progress-'+btnId).css('width',file.percent + '%');//控制进度条
                },
                FileUploaded: function (up, file, info) {
                    console.log(info);
                    let res = JSON.parse( info.response );
                    let oldUrls = _this.state.url.slice(0);
                    if(res.code == 200){
                        let url = res.data;
                        oldUrls.push(url);
                        _this.setState({
                            url: oldUrls,
                        });
                    }
                },
                UploadComplete: function(up, files){
                    let btnId = _this.state.id;
                    let urls = _this.state.url.slice(0);

                    if(!_this.state.multi){
                        _this.setState({
                            showUpBtn: false,
                        });
                    }
                    _this.setState({
                        showProgress: false,
                    }, () => {
                        $('#file-name-'+btnId).text('');
                        $('#file-progress-'+btnId).css('width','0');//控制进度条恢复原始状态
                    });

                    _this.props.collect && _this.props.collect(urls);
                },
                Error: function (up, err) {
                    if(err.code == -600){
                        _this.snackbarOpen(`图片大小不能超过 ${this.props.limit || '1M'}`);
                    }else if (err.code == -601){
                        _this.snackbarOpen(`请选择正确格式的图片 ( ${this.props.suffix || 'jpg, jpeg, gif, png, bmp'} )`);
                    }else if(err.code == -602){
                        _this.snackbarOpen('请勿上传重复的文件');
                    }else{
                        console.log(err);
                        _this.snackbarOpen('Error xml: ' + err);
                    }
                }
            }
        });

        uploader.init();
        let t = setTimeout(() => {
            clearTimeout(t);
            _this.setState({
                uploader: uploader,
            });
        });
    }

    showPreview(index){
        let urls = this.state.url.slice(0);
        let curImage = urls[index];

        this.setState({
            previewImage: curImage,
            previewVisible: true,
        });
    }
    closePreview(){
        this.setState({
            previewImage: '',
            previewVisible: false,
        });
    }
    removeImage(index){
        let urls = this.state.url.slice(0);
        let curImage = urls.splice(index, 1);

        this.setState({
            url: urls,
            showUpBtn: true,//移除图片就显示上传按钮，多选的话没影响，单选的话就可以显示了
        });

        this.props.collect && this.props.collect(urls);
    }

    render(){
        let images = this.state.url;
        let uploaderId = this.state.id;
        let disabled = this.props.disabled;

        let uploadBtnStatus = disabled ? 'none' : ( this.state.showUpBtn ? 'flex' : 'none' );
        let borderc = this.props.error ? 'red' : '#e0e0e0';



        return (
            <div className="file-upload-component clearfix">
                <div className="upload-preview clearfix" id={uploaderId + '_preview'}>
                    {
                        images.length ?
                            images.map((d,k) => {
                                return (
                                    <div className="preview-item" key={'preview_item_' + k}>
                                        <img src={ d } alt={ d }/>
                                        {
                                            disabled ?
                                                null
                                            :
                                                <div className="del-mask" >
                                                    <span className='iconfont icon-image-view' onClick={ this.showPreview.bind(this, k) }></span>
                                                    <span className='iconfont icon-delete' onClick={ this.removeImage.bind(this, k) }></span>
                                                </div>
                                        }
                                    </div>
                                );
                            })
                        :
                            null
                    }


                    <div className="upload-button-box" style={{display: uploadBtnStatus,borderColor: borderc}}>
                        <div className="upload-button"  id={ uploaderId }>
                            <span className={`iconfont icon-image-upload`}></span>
                        </div>
                        {
                            this.state.showProgress ?
                                <div className="upload-progress">
                                    <span id={`file-name-${uploaderId}`}></span>
                                    <span id={`file-progress-${uploaderId}`}></span>
                                </div>
                                :
                                null
                        }
                    </div>

                </div>

                <Dialog
                    open={ this.state.previewVisible }
                    modal={ true }
                    bodyStyle={{textAlign:'center'}}
                >
                    <IconButton
                        iconClassName="iconfont icon-close"
                        style={ styles.button.dialogClose }
                        iconStyle={{fontSize:'14px'}}
                        onClick={ this.closePreview.bind(this) }
                    />
                    <img alt="Preview Image" src={ this.state.previewImage } />
                </Dialog>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={this.snackbarClose.bind(this) }
                />
            </div>
        );
    }
}
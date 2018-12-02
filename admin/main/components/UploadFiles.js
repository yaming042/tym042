import React from 'react';
import { Upload, Icon, Modal } from 'antd';

export default class UploadFiles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }
            ],
        };
    }

    handleCancel(){
        this.setState({
            previewVisible: false ,
        });
    }

    handlePreview(file){
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange({ fileList }){
        this.setState({
            fileList
        })
    }

    render(){
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传缩略图</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={ fileList }
                    onPreview={ this.handlePreview.bind(this) }
                    onChange={ this.handleChange.bind(this) }
                    multiple={ this.props.multiple ? true : false }
                >
                    {
                        this.props.multiple ? uploadButton : (!fileList.length ? uploadButton : null )
                    }
                </Upload>
                <Modal visible={ previewVisible } footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={ previewImage } />
                </Modal>
            </div>
        );
    }
}
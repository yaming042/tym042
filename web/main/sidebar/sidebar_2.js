import React from 'react';

import Title from '../components/s_title';

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-sidebar-box box-item">
                <Title
                    label="标签云"
                />
                <div className="tag-list">
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                    <label>
                        <i className="iconfont icon-tags-1"></i>
                        标签1
                    </label>
                </div>
            </div>
        );
    }

}
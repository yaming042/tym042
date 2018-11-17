import React from 'react';

import Btitle from '../components/b_title';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="web-block-box">
                <Btitle
                    label="Notes"
                    link="/"
                />
                <div className="notes-list">
                    <div className="notes-item">
                        <div className="notes-item-desc">
                            简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单
                            描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述
                        </div>
                        <div className="notes-tags">
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签1
                            </label>
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签2
                            </label>
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签3
                            </label>
                        </div>
                    </div>

                    <div className="notes-item">
                        <div className="notes-item-desc">
                            简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述简单
                            描述简单描述简单描述简单描述简单描述简单描述简单描述简单描述
                        </div>
                        <div className="notes-tags">
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签1
                            </label>
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签2
                            </label>
                            <label>
                                <i className="iconfont icon-tags-1"></i>
                                标签3
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
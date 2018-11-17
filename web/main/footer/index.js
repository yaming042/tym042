import React from 'react';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-footer">
                <h2 className="friend-state">友情声明</h2>
                <div className="cooperation">
                    <p>本网站部分资料来源于网络，如有任何问题可联系站主解决</p>
                    <p><a href="http://www.miitbeian.gov.cn/" target="_blank">豫ICP备17028068号</a></p>
                </div>
            </div>
        );
    }
}
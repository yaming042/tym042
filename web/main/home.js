import React from 'react';

import Banner from './banner/banner_1';
import Resume from './recommends/resume';
import Block1 from './block/block_1';
import Block2 from './block/block_2';
import Block3 from './block/block_3';
import Sidebar1 from './sidebar/sidebar_1';

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="web-home">
                <Banner />
                <Resume />
                <div className="web-container-box">
                    <div className="web-home-body">
                        <Block1 />
                        <Block2 />
                        <Block3 />
                    </div>
                    <div className="web-home-sidebar">
                        <Sidebar1 />
                    </div>
                </div>
            </div>
        );
    }
}
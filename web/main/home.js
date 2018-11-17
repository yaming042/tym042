import React from 'react';

import Banner from './banner/banner_1';
import Resume from './recommends/resume';
import Block1 from './block/block_1';
import Block2 from './block/block_2';
import Block3 from './block/block_3';
import Sidebar1 from './sidebar/sidebar_1';
import Sidebar2 from './sidebar/sidebar_2';
import Sidebar3 from './sidebar/sidebar_3';
import Sidebar4 from './sidebar/sidebar_4';
import Sidebar5 from './sidebar/sidebar_5';

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
                        <Sidebar2 />
                        <Sidebar3 />
                        <Sidebar4 />
                        <Sidebar5 />
                    </div>
                </div>
            </div>
        );
    }
}
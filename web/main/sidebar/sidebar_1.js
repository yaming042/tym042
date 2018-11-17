import React from 'react';

import Clock from '../components/clock';
import Calendar from '../components/calendar';


export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-sidebar-box">
                <div className="sidebar-clock">
                    <Clock />
                </div>

                <div className="sidebar-calendar">
                    <Calendar />
                </div>


            </div>
        );
    }
}
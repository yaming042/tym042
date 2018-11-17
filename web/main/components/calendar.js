import React from 'react';

export default class Calendar extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.Calendar($(".calendar"));
    }

    _isLeap(year){
        return year%4 == 0 ? (year%100 != 0 ? 1 : (year%400 ==  0 ? 1 : 0)) : 0;
    }
    Calendar(node){
        // 获取日期信息
        let data = new Date();
        let year = data.getFullYear(),
            month = data.getMonth(),
            firstDay = new Date(year,month,1),
            day = firstDay.getDay();
        let today = data.getDate();

        // 新建数组
        let monthArr = [31,28+this._isLeap(year),31,30,31,30,31,31,30,31,30,31];

        // 判断行数
        let row = Math.ceil((day + monthArr[month]) / 7);

        // 渲染数据
        let buf = [],
            count = monthArr[month],
            tmonth = month,
            total = 7*row;

        let invalidDay;
        // 渲染结构
        let html = '<table id="calendar"><thead><tr><th colspan="7">'+year+"年"+(tmonth + 1)+'月</th></tr></thead><tbody><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
        for(let i=0;i<total;i++){
            if(month == 0){
                tmonth = 12;
            }

            if(i%7 == 0){
                html += '<tr>';
            }

            let bufdata = monthArr[tmonth-1]-day+i+1;
            if(i<day){
                bufdata = monthArr[tmonth-1]-day+i+1;
                html += '<td class="noday">'+bufdata+'</td>';
            }else if(i>=day&&i<(day+count)){
                bufdata = i - day + 1;
                if(today == bufdata){
                    html += '<td class="today">'+bufdata+'</td>';
                }else{
                    html += '<td class="">'+bufdata+'</td>';
                }
            }else{
                bufdata = i - day - count + 1;
                html += '<td class="noday">'+bufdata+'</td>';
            }

            if(i+1%7==0){
                html += '</tr>';
            }
            buf.push(bufdata);
        }
        html += '</tbody></table>';
        $(html).appendTo(node);
    }

    render(){
        return (
            <div className="calendar"></div>
        );
    }
}
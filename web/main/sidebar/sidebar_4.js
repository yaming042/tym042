import React from 'react';

import Title from '../components/s_title';

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);

        this.dataBufLen = 0;
    }

    componentDidMount(){
        //1. defined svg w&h
        let width = document.getElementById("visitor_svg").offsetWidth,
            height = document.getElementById("visitor_svg").offsetHeight,
            padding = 30;

        let visitorStr = '2018/11/12-23;2018/11/13-103;2018/11/14-32;2018/11/15-68;2018/11/16-20;2018/11/17-37;2018/11/18-45',
            visitorObj = visitorStr.split(";"),
            visitorLen = visitorObj.length;
        let dataBuf = [],
            oneBuf = [];

        for(let i=0;i<visitorLen;i++){
            oneBuf = visitorObj[i].split("-");
            oneBuf[1] = oneBuf[1]*1;
            this.dataBufLen = dataBuf.push(oneBuf);
        }

        let mark = [];
        let y,m,n,d;
        for(let i=0;i<this.dataBufLen;i++){
            d = dataBuf[i][0];
            y = d.substr(0,4);
            m = d.substr(5,2);
            n = d.substr(8,2);
            mark.push(n);
        }

        let maxAxisData = this.getMax(dataBuf),
            yTicks = 5,
            temp = maxAxisData / 10;
        if(temp <= 5){
            maxAxisData = 50;
        }else if(temp > 5 && temp <= 10){
            yTicks = 10;
            maxAxisData = 100;
        }else if(temp > 10 && temp <= 20){
            yTicks = 10;
            maxAxisData = 200;
        }else if(temp > 20 && temp <= 50){
            yTicks = 10;
            maxAxisData = 500;
        }else{
            yTicks = 10;
            maxAxisData = 1000;
        }

        // 2. add svg
        let svg = d3.select("#visitor_svg")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("fill","#fff")
            .style("stroke-width",1)
            .style("stroke","#000");

        // add title
        // svg.append("g")
        //     .append("text")
        //     .text("访客统计")
        //     .attr("class","visitortitle")
        //     .attr("x",(width-padding*2)/2)
        //     .attr("y",padding/2);

        // 3. x&y scale
        let xScale = d3.scale.linear()
            .domain([0,6])
            .range([0,width-padding*2]);
        let yScale = d3.scale.linear()
            .domain([0,maxAxisData])
            .range([height-padding*2,0]);

        // 4. add x&y axis
        let xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(6)
            .orient("bottom");
        let yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(yTicks)
            .orient("left");

        // add grid
        let xInner = d3.svg.axis()
            .scale(xScale)
            .tickSize(-(height-padding*2),0,0)
            .tickFormat("")
            .orient("bottom")
            .ticks(6);

        svg.append("g")
            .attr("class","inner_line")
            .attr("transform","translate("+padding+","+(height-padding)+")")
            .call(xInner);


        let yInner = d3.svg.axis()
            .scale(yScale)
            .tickSize(-(width-padding*2),0,0)
            .tickFormat("")
            .orient("left")
            .ticks(yTicks);
        svg.append("g")
            .attr("class","inner_line")
            .attr("transform","translate("+padding+","+padding+")")
            .call(yInner);

        // 5. append axis to container
        let xBar = svg.append("g")
            .attr("class","axis")
            .attr("transform","translate("+padding+","+(height-padding)+")")
            .call(xAxis);
        let yBar = svg.append("g")
            .attr("class","axis")
            .attr("transform","translate("+padding+","+padding+")")
            .call(yAxis);

        // axis add text
        xBar.selectAll("text")
            .text(function(d,i){return mark[i]});

        // 6. create line modal
        let lineFun = d3.svg.line()
            .x(function(d,i){return xScale(i)+padding;})
            .y(function(d){return yScale(d[1])+padding;})
            .interpolate("cardinal");
        // 7. render line
        let line = svg.append("path")
            .attr("d",lineFun(dataBuf))
            .attr("stroke","green")
            .attr("stroke-width",2)
            .attr("fill","none");

        // add line
        let focus = svg.append("g")
            .style("display","none");
        focus.append("line")
            .attr("id","focusX")
            .attr("class","focusLine");
        focus.append("line")
            .attr("id","focusY")
            .attr("class","focusLine");
        focus.append("text")
            .attr("id","focusTxt")
            .attr("class","focusTxt");

        svg.append("rect")
            .attr("class","overrect")
            .attr("width",width-padding*2)
            .attr("height",height-padding*2)
            .attr("x",padding)
            .attr("y",padding)
            .on("mouseover",function(){
                focus.style("display","");
            })
            .on("mouseout",function(){
                focus.style("display","none");
            })
            .on("mousemove",function(){
                let mouse = d3.mouse(this);

                let m = (width-padding*2) / (visitorLen-1);
                let index = Math.round((mouse[0]-padding) / m);//x position
                index = index > 0 ? (index > visitorLen-1 ? visitorLen-1 : index ) : 0;

                let vdate = dataBuf[index][0],
                    vnum = dataBuf[index][1];

                focus.select("#focusX")
                    .attr("x1",xScale(index)+padding)
                    .attr("y1",0+padding)
                    .attr("x2",xScale(index)+padding)
                    .attr("y2",height-padding);
                focus.select("#focusY")
                    .attr("x1",padding)
                    .attr("y1",yScale(vnum)+padding)
                    .attr("x2",width-padding)
                    .attr("y2",yScale(vnum)+padding);

                let centerx = index > visitorLen / 2 ?  xScale(index)-padding : xScale(index)+padding+10,
                    centery = yScale(vnum) > height / 2 ? yScale(vnum)+padding : yScale(vnum)+padding+10;
                focus.select("#focusTxt")
                    .text("访问:"+vnum)
                    .attr("x",centerx)
                    .attr("y",centery);
            })
    }

    getMax(dataBuf){
        var maxData = dataBuf[0][1];
        for(var i = 1;i<this.dataBufLen;i++){
            maxData = d3.max([maxData,dataBuf[i][1]]);
        }
        return maxData;
    }
    // min function
    getMin(dataBuf){
        var minData = dataBuf[0][1];
        for(var i = 1;i<this.dataBufLen;i++){
            minData = d3.min([minData,dataBuf[i][1]]);
        }
        return minData;
    }

    render(){
        return (
            <div className="web-sidebar-box box-item">
                <Title
                    label="访客统计"
                />
                <div className="visitor-count">
                    <div id="visitor_svg"></div>
                </div>
            </div>
        );
    }
}
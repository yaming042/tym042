import React from 'react';

import digit from '../../libs/digit';

export default class Clock extends React.Component{
    constructor(props){
        super(props);

        //canvas的宽高
        this.canvasW = 280;
        this.canvasH = 90;
        //圆球半径
        this.Radius = 2;
        //canvas的内边距
        this.canvasPT = 20;
        this.canvasPL = 10;
        // 每个小球正方形的内边距值
        this.ballP = 0.5;

        this.day = 0;
        this.ext = null;
        this.Balls = [];
        this.initTime = '';
        this.Colors = ['#FFFF00','#cb2ccb','#3D3D3D','#9A32CD','#919191','#7CFC00','#388E8E','#FF7256','#BFEFFF','#ADFF2F'];
    }

    componentDidMount(){
        //获取canvas
        let canvas = document.getElementById("canvas");
        this.ext = canvas.getContext('2d');

        //设置canvas宽高
        canvas.width = this.canvasW;
        canvas.height = this.canvasH;
        //全局的时间变量
        this.initTime = this._getTime();

        //渲染画布
        let t = setInterval(() => {
            this.renderCanvas(this.ext);
            this.update();
        },50);
    }
    renderCanvas(ext){
        // 清除画布
        ext.clearRect(0,0,ext.canvas.width,ext.canvas.height);
        // 每个数字x轴坐标的步长
        let leftVal = -(7*(this.Radius + this.ballP)*2 + 14);
        //将时间数输入数组，其中10为冒号
        let data = this._getTime();
        //循环渲染数字
        for(let i=0;i<data.length;i++){
            if(i != 0 && i%3 == 0){
                leftVal += 4*(this.Radius + this.ballP)*2;
            }else{
                leftVal += 8*(this.Radius + this.ballP)*2;
            }
            this.renderDigit(this.canvasPL+leftVal,this.canvasPT,data[i],this.Radius,ext);
        }
        //绘制要动画的小球
        this.renderBall(this.Balls,ext);
    }
    update(){
        let time = this._getTime();
        var leftVal = -(7*(this.Radius + this.ballP)*2 + 14);
        //比较时间的变化值
        // var a = time.map(function(value,index){
        // 	if(value != initTime[index]){//不一样的数字，这是需要描绘的
        // 		if(index != 0 && index%3 == 0){
        // 			leftVal += 4*(Radius + 1)*2;
        // 		}else{
        // 			leftVal += 8*(Radius + 1)*2;
        // 		}
        // 		addBall(canvasPL+leftVal,canvasPT,value);//增加小球
        // 	}
        // });
        for(let i=0;i<time.length;i++){
            if(i != 0 && i%3 == 0){
                leftVal += 4*(this.Radius + this.ballP)*2;
            }else{
                leftVal += 8*(this.Radius + this.ballP)*2;
            }
            if(time[i] != this.initTime[i]){
                this.addBall(this.canvasPL+leftVal,this.canvasPT,time[i]);//增加小球
            }
        }

        this.initTime = time.slice(0);
        this.updateBall(this.ext);//更新小球
    }
    //增加小球
    addBall(x,y,num){
        for(let i=0;i<digit[num].length;i++){//i相当于y
            for(let j=0;j<digit[num][i].length;j++){//j相当于x
                let oneBall = {
                    x: x + 2*j*(this.Radius + this.ballP) + (this.Radius + this.ballP),//坐标信息
                    y: y + 2*i*(this.Radius + this.ballP) + (this.Radius + this.ballP),//坐标信息
                    vx: Math.pow(-1,this._getRandom(0,10))*this._getRandom(1,3),
                    vy: -4 + this._getRandom(0,4),
                    g: 1.8 + this._getRandom(1,2),
                    color: this.Colors[this._getRandom(0,this.Colors.length)]
                };
                this.Balls.push(oneBall);
            }
        }
    }
    //更新小球
    updateBall(ext){
        let len = 0;
        for(let i=0;i<this.Balls.length;i++){
            this.Balls[i].x += this.Balls[i].vx;
            this.Balls[i].y += this.Balls[i].vy;
            this.Balls[i].vy += this.Balls[i].g;

            if(this.Balls[i].y >= ext.canvas.height - this.Radius){
                this.Balls[i].y = ext.canvas.height - this.Radius;
                this.Balls[i].vy = -this.Balls[i].vy*0.6;
            }

            // 边界判断，删除较早的小球
            if(this.Balls[i].x > this.Radius && this.Balls[i].x < ext.canvas.width){
                this.Balls[len++] = this.Balls[i];
            }
        }
        while(this.Balls.length > Math.min(700,len)){
            this.Balls.shift();
        }
    }

    //渲染单独的一个数字
    renderDigit(x,y,num,radius,ext){
        let centerX,
            centerY;
        ext.fillStyle = this.Colors[this.day];

        for(let i=0;i<digit[num].length;i++){//i相当于y
            for(let j=0;j<digit[num][i].length;j++){//j相当于x
                centerX = x + 2*j*(radius + this.ballP) + (radius + this.ballP);
                centerY = y + 2*i*(radius + this.ballP) + (radius + this.ballP);
                if(digit[num][i][j]){
                    ext.beginPath();
                    ext.arc(centerX,centerY,radius,0,2*Math.PI);
                    ext.closePath();
                    ext.fill();
                }
            }
        }
    }
    //渲染要动画的小球
    renderBall(balls,ext){
        let len = balls.length;
        for(let i=0;i<len;i++){
            ext.fillStyle = balls[i].color;
            ext.beginPath();
            ext.arc(balls[i].x,balls[i].y,this.Radius,0,2*Math.PI);
            ext.closePath();
            ext.fill();
        }
    }

    //时间处理函数
    _getTime(){
        let date = new Date(),
            h = date.getHours(),
            m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        this.day = date.getDay();

        let timeArr = [parseInt(h/10),h%10,10,parseInt(m/10),m%10,10,parseInt(s/10),s%10];
        return timeArr;
    }
    //获取范围随机数
    _getRandom(n,m){
        let c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    }

    render(){
        return (
            <canvas id="canvas">您的浏览器暂不支持HTML5的canvas属性，请更换浏览器试试</canvas>
        );
    }
}
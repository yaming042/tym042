import React from 'react';

import Btitle from '../components/b_title';

export default class Article extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="web-article">
                <div className="web-article-container">
                    <div className="web-article-view">
                        <div className="article-baseinfo">
                            <h2>[译] 你不知道的 console 命令</h2>
                            <div className="other-info">
                                <span>发布时间：2018年09月22日</span>
                                <span>阅读：999</span>
                            </div>
                        </div>
                        <p>告诉写 JavaScript 的人应该使用浏览器的调试器去调试代码，这看来很不错，并且肯定有其适用的时间和场合。但是大多数时候你仅仅只想查看一段特定的代码是否执行或者一个变量的值是什么，而不是迷失在 RxJS 代码库或者一个 Promise 库的深处。</p>
                        <p>告诉写 JavaScript 的人应该使用浏览器的调试器去调试代码，这看来很不错，并且肯定有其适用的时间和场合。但是大多数时候你仅仅只想查看一段特定的代码是否执行或者一个变量的值是什么，而不是迷失在 RxJS 代码库或者一个 Promise 库的深处。</p>
                        <p>告诉写 JavaScript 的人应该使用浏览器的调试器去调试代码，这看来很不错，并且肯定有其适用的时间和场合。但是大多数时候你仅仅只想查看一段特定的代码是否执行或者一个变量的值是什么，而不是迷失在 RxJS 代码库或者一个 Promise 库的深处。</p>
                    </div>

                    <div className="web-article-sidebar">
                        <div style={{height:'200px',background:'blue'}}>

                        </div>
                    </div>
                </div>
                <div className="article-comments">
                    <Btitle
                        label="评论"
                    />
                    <div className="comments">
                        这里是评论区域
                    </div>
                </div>
            </div>
        );
    }
}
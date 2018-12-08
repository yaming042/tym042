import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const comments = [
    {
        id: 'abcccc',
        user: '1111',
        origin: '2222',
        created_at: '2018-05-08 20:02:33',
        content: '小米你不行雅，点击放大了空间哦i尽快递交了空间；跌幅接近发',
        children: [],
    },
    {
        id: 'bcccccc',
        user: '3333',
        origin: '44444',
        created_at: '2018-08-08 20:02:33',
        content: '小击放大了空间哦i大幅度积分卡九分九七二九幅度萨芬近发',
        children: [
            {
                id: '5555',
                user: '5555',
                origin: '66666',
                created_at: '2018-05-08 20:02:33',
                content: '小米你不行雅，点击放大了空间哦i尽快递交了空间；跌幅接近发',
                children: [],
            },
            {
                id: 'beeeee',
                user: '777',
                origin: '888888',
                created_at: '2018-05-08 20:02:33',
                content: '小米你不行雅，点击放大了空间哦i尽快递交了空间；跌幅接近发',
                children: [
                    {
                        id: 'efdfdfd',
                        user: '9999',
                        origin: '00000',
                        created_at: '2018-05-08 20:02:33',
                        content: '小米你不行雅，点击放大了空间哦i尽快递交了空间；跌幅接近发',
                        children: [],
                    },
                    {
                        id: 'adfefdfde',
                        user: 'dfdfdfd',
                        origin: 'aaaaaaaa',
                        created_at: '2018-05-08 20:02:33',
                        content: '小米你e打发打发打发打发官方大哥大阿打发父亲打是非得失发打发打发而且范德萨发啊了空间哦i尽快递交了空间；跌幅接近发',
                        children: [],
                    }
                ],
            },
        ],
    },
];

export default class Comments extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            comments: comments || [],
            aid: props.aid || 'test',

            commentError: '',
            snackbar: false,
            snackbarText: '',

            nickname: '匿名用户',
            email: '',
        };
    }

    snackbarOpen(msg){
        this.setState({
            snackbar: true,
            snackbarText: msg,
        });
    }
    snackbarClose(){
        this.setState({
            snackbar: false,
            snackbarText: '',
        });
    }

    componentWillMount(){
        setTimeout(() => {
            // this.getCommentList(this.state.aid);
        });
    }

    getCommentList(id){
        let _this = this;

        $.ajax({
            url: `${_DEV}/getComments?id=${id}`,
            type: 'GET',
            dataType: 'json',
            success: function(res){
                if(res.code == '200'){
                    console.log(res);
                    _this.setState({
                        comments: res.data || [],
                    });
                }else{
                    _this.snackbarOpen('获取评论列表失败，请稍后重试!'+res.msg);
                }
            },
            error: function(){
                _this.snackbarOpen('获取评论列表失败，请稍后重试');
            }
        });
    }
    sendComment(id, rname){
        let _this = this;
        let data = {
            aid: '',
            pid: '',
            cname: '',
            rname: '',
            comment: '',
            email: '',
        };
        let comment = '';
        let successMsg = '';

        if(!arguments.length || arguments.length < 2){//无id参数说明是首次发表评论，否则就是回复评论
            comment = $("#comment").val();

            if(!comment.length){
                _this.snackbarOpen('请填写您的评论');
                return;
            }else if(comment.length > 320){
                _this.snackbarOpen('评论应限制在 320 个字以内');
                return;
            }

            data = {
                aid: this.state.aid,
                pid: '',
                cname: this.state.nickname || '匿名用户',
                rname: '',
                comment: comment,
                email: this.state.email,
            };
            successMsg = '评论';
        }else if(arguments[0] == id && arguments[1] == rname){
            comment = $("textarea[reply-id='"+id+"']").val();

            if(!comment.length){
                _this.snackbarOpen('请填写您的评论');
                return;
            }else if(comment.length > 320){
                _this.snackbarOpen('评论应限制在 320 个字以内');
                return;
            }

            data = {
                aid: this.state.aid,
                pid: id,
                cname: this.state.nickname || '匿名用户',
                rname: rname,
                comment: comment,
                email: this.state.email,
            };
            successMsg = '回复';
        }else{
            _this.snackbarOpen('参数错误');
            return;
        }

        console.log(data);

        $.ajax({
            url: `${_DEV}/createComment`,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(res){
                console.log(res);
                if(res.code == '200'){
                    _this.snackbarOpen(`${successMsg}成功`);
                    _this.resetComment();
                    _this.getCommentList(_this.state.aid);
                }else{
                    _this.snackbarOpen(`${successMsg}失败，${res.msg}`);
                }
            },
            error: function(){
                _this.snackbarOpen(`${successMsg}失败，请稍后重试`);
            }
        });
    }

    commentFocus(e){
        this.setState({
            commentError: '',
        });
    }
    commentBlur(e){
        let value = e.target.value;
        let error = '';
        if(!value.length){
            error = '请填写你想说的评论';
        }else if(value.length > 320){
            error = '评论字数请限制在320个字以内';
        }
        this.setState({
            commentError: error,
        });
    }
    resetComment(){
        $("#comment").val('');
    }
    //辅助函数
    _parseUrl(search){
        let searchs = search.split('&');
        let len = searchs.length;
        let obj = {};
        let temp = [];
        for(let i=0;i<len;i++){
            temp = searchs[i].split('=');
            obj[temp[0]] = temp[1];
        }
        return obj;
    }
    _isArray(obj){
        return Array.isArray?Array.isArray(obj):Object.prototype.toString.call(obj) === '[object Array]';
    }
    _isPhone(tel){
        return ( /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel) );
    }
    _isMobile(phone){
        return ( /^1[34578]\d{9}$/.test(phone) );
    }
    _isURL(url){
        let reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        return reg.test(url);
    }
    _isEmail(email){
        return (/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email));
    }


    //测试函数
    renderList(menu, child=''){
        let { comments } = this.state;

        let node = menu.map((dd, kk) => {
            let hasChild = dd.children && dd.children.length ? true : false;

            return (
                <div key={kk} className={`comment-item ${child ? 'comment-item-child' : ''}`}>
                    <div className="comment-user"><span className="cname">{dd.user}</span>{dd.origin ? '回复' : ''}{dd.origin ? <span className="cname">{dd.origin}</span> : ''}</div>
                    <div className="comment-content">{dd.content}</div>
                    <div className="comment-option">
                        <span>{ dd.created_at }</span>
                        <span
                            className="option reply"
                            onClick={ () => {
                                dd.openRely = !dd.openRely;
                                this.setState({
                                    comments: comments,
                                });
                            }}
                        >回复</span>
                        {/*<span className="option like">赞</span>*/}
                        {/*<span className="option report">举报</span>*/}
                    </div>
                    {
                        dd.openRely ?
                            <div className="reply-box">
                                <textarea
                                    className="reply-content"
                                    onBlur={(e) => {
                                        let value = e.target.value;
                                        if(!value.length || value.length > 320){
                                            $(e.target).css('border-color', 'red');
                                        }
                                    }}
                                    onFocus={(e) => {
                                        $(e.target).css('border-color', '#1595f0');
                                    }}
                                ></textarea>
                                <div className="reply-button">
                                    <button
                                        className="reply-cancle"
                                        onClick={ () => {
                                            dd.openRely = !dd.openRely;
                                            this.setState({
                                                comments: comments,
                                            });
                                        }}
                                    >取消</button>
                                    <button
                                        className="reply-submit"
                                        onClick={ this.sendComment.bind(this) }
                                    >回复</button>
                                </div>
                            </div>
                            :
                            null
                    }

                    {
                        dd.children && dd.children.length ?
                            this.renderList(dd.children, 'child')
                        :
                            null
                    }
                </div>
            );
        });

        return node;
    }

    render(){
        return (
            <div className="comment-container">
                <div className="commenter clearfix">
                    <div className="input-field">
                        <label>昵称</label>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="最多 16 个字"
                            defaultValue={ this.state.nickname || '匿名用户'}
                            onBlur={(e)=>{
                                let value = e.target.value;
                                if(value.length > 16){
                                    this.snackbarOpen('昵称过长，最多 16 个字，请修改');
                                    value = value.substr(0, 13)+'...';
                                }
                                this.setState({
                                    nickname: value,
                                });
                            }}

                        />
                        <span>昵称仅用于展示,为<strong> 非 </strong>必须项</span>
                    </div>
                    {
                        false ?
                            <div className="input-field">
                                <label>Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    onBlur={(e) => {
                                        let value = e.target.value;
                                        if(value.length){
                                            if(!this._isEmail(value)){
                                                this.snackbarOpen('请填写正确的邮箱地址');
                                            }else{
                                                this.setState({
                                                    email: value,
                                                });
                                            }
                                        }
                                    }}
                                />
                            </div>
                        :
                            null
                    }

                    <div className="commenter-tip">

                    </div>
                </div>

                <textarea
                    id="comment"
                    className="comment"
                    onFocus={ this.commentFocus.bind(this) }
                    onBlur={ this.commentBlur.bind(this) }
                    style={{borderColor:`${this.state.commentError ? 'red' : '#1595f0'}`}}
                ></textarea>
                <button id="submit" className="submit" onClick={ this.sendComment.bind(this) }>发表</button>

                <div className="comments-list">
                    { this.renderList(this.state.comments) }
                    {
                        !this.state.comments.length ?
                            <p className="empty-tips">还没有评论喔，赶紧来坐个沙发吧</p>
                        :
                            null
                    }
                </div>

                <Snackbar
                    open={ this.state.snackbar }
                    message={ this.state.snackbarText }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.snackbarClose.bind(this) }
                />
            </div>
        );
    }
}
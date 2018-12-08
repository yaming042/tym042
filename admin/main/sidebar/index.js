import React, { Component } from 'react';

import {List, ListItem, makeSelectable} from 'material-ui/List';

import styles from '../../libs/styles';
import history from '../../libs/history';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component{
        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange(event, index){
            this.setState({
                selectedIndex: index,
            });
            defaultMenu = index;

            history.push(index);
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange.bind(this)}
                    selectedItemStyle={styles.menu.selectStyle}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

let defaultMenu = '';

export default class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menu: [
                {
                    path: '/admin/articles',
                    icon: < i className="iconfont icon-article-manage" style={ styles.menu.menuItem }></i>,
                    label: '文章管理',
                },
                {
                    path: '/admin/drafts',
                    icon: <i className="iconfont icon-draft-manage" style={ styles.menu.menuItem }></i>,
                    label: '草稿管理',
                },
                {
                    path: '/admin/media',
                    icon: <i className="iconfont icon-media-manage" style={ styles.menu.menuItem }></i>,
                    label: '媒体库',
                },
                {
                    path: '/admin/category',
                    icon: <i className="iconfont icon-category-manage" style={ styles.menu.menuItem }></i>,
                    label: '分类管理',
                },
                {
                    path: '/admin/tags',
                    icon: <i className="iconfont icon-tag-manage" style={ styles.menu.menuItem }></i>,
                    label: '标签管理',
                },
                {
                    path: '/admin/users',
                    icon: <i className="iconfont icon-user-manage" style={ styles.menu.menuItem }></i>,
                    label: '用户管理',
                },
                {
                    path: '/admin/comment',
                    icon: <i className="iconfont icon-comment-manage" style={ styles.menu.menuItem }></i>,
                    label: '评论管理',
                    children: [
                        {
                            path: '/admin/comments',
                            icon: <i className="iconfont icon-pinglun" style={ styles.menu.menuItem }></i>,
                            label: '所有评论',
                        },
                        {
                            path: '/admin/badcomments',
                            icon: <i className="iconfont icon-jubao" style={ styles.menu.menuItem }></i>,
                            label: '被举报评论',
                        },
                    ],
                }
            ],
        };
    }
    componentWillMount(){
        console.log(location.pathname);
        let pname = location.pathname == '/admin/' ? '/admin/articles' : location.pathname;
        defaultMenu = pname;
    }

    renderSubMenu(menus){

        let nodes = menus.map((dd, kk) => {
            let child = [];
            if(dd.children && dd.children.length){
                child = this.renderSubMenu(dd.children);
            }

            return (
                <ListItem
                    key={ kk }
                    value={ dd.path }
                    primaryText={ dd.label }
                    leftAvatar={ dd.icon }
                    nestedItems={ child }
                    initiallyOpen={ true }
                    autoGenerateNestedIndicator={false}
                    disabled={ dd.children && dd.children.length ? true : false }
                    nestedListStyle={ {padding: `${dd.children && dd.children.length ? '0' : '8px 0'}` } }
                    className={`menuItem`}
                    innerDivStyle={ styles.menu.innerDiv }
                    style={ styles.menu.menuRoot }
                />
            );
        });

        return nodes;
    }

    render(){

        return (
            <div className="navbar-box">
                <SelectableList defaultValue={ defaultMenu }>
                    { this.renderSubMenu(this.state.menu) }
                </SelectableList>
            </div>
        );
    }
}
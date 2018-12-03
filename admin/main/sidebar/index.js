import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { IconFont } from '../components/IconFont';

import styles from '../../libs/styles';
import history from '../../libs/history';

export default class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menu: [
                {
                    path: 'admin/articles',
                    icon: <IconFont type="icon-article-manage"/>,
                    label: '文章管理',
                },
                {
                    path: 'admin/drafts',
                    icon: <IconFont type="icon-draft-manage"/>,
                    label: '草稿管理',
                },
                {
                    path: 'admin/media',
                    icon: <IconFont type="icon-media-manage"/>,
                    label: '媒体库',
                },
                {
                    path: 'admin/category',
                    icon: <IconFont type="icon-category-manage"/>,
                    label: '分类管理',
                },
                {
                    path: 'admin/tags',
                    icon: <IconFont type="icon-tag-manage"/>,
                    label: '标签管理',
                },
                {
                    path: 'admin/users',
                    icon: <IconFont type="icon-user-manage"/>,
                    label: '用户管理',
                },
                // {
                //     path: 'admin/comments',
                //     icon: <IconFont type="icon-comment-manage"/>,
                //     label: '评论管理',
                // },
                {
                    path: 'admin/comment',
                    icon: <IconFont type="icon-comment-manage"/>,
                    label: '评论管理',
                    children: [
                        {
                            path: 'admin/comments',
                            icon: <IconFont type="icon-comment-manage"/>,
                            label: '所有评论',
                        },
                        {
                            path: 'admin/badcomments',
                            icon: <IconFont type="icon-comment-manage"/>,
                            label: '被举报评论',
                        },
                    ],
                }
            ],
            defaultMenu: [],
        };
    }
    componentWillMount(){
        let menu = this.state.defaultMenu.slice(0);
        let path = 'admin/articles';
        let pname = location.pathname;

        if(pname.indexOf('article') > -1){
            path = 'admin/articles';
        }else if(pname.indexOf('draft') > -1){
            path = 'admin/drafts';
        }else if(pname.indexOf('media') > -1){
            path = 'admin/media';
        }else if(pname.indexOf('category') > -1){
            path = 'admin/category';
        }else if(pname.indexOf('tags') > -1){
            path = 'admin/tags';
        }else if(pname.indexOf('users') > -1){
            path = 'admin/users';
        }else if(pname.indexOf('comments') > -1){
            path = 'admin/comments';
        }
        menu.splice(0,1, path);

        let t = setTimeout(() => {
            clearTimeout(t);
            this.setState({
                defaultMenu: menu,
            });
        });
    }

    handleRoute(item){
        let menu = this.state.defaultMenu.slice(0);
        if(location.pathname.indexOf(item.key) > -1){
            return;
        }
        menu.splice(0,1, item.key);
        this.setState({
            defaultMenu: menu,
        });
        history.push(`/${item.key}`);
    }

    renderSubMenu(menus){

        let nodes = menus.map((md, mk) => {

            return (
                <SubMenu key={ md.path } title={`${md.icon}${md.label}`}>
                    <Menu.Item key={ md.path } style={ styles.menu.menuItem }>{md.icon}{md.label}</Menu.Item>
                    {
                        md.children && md.children.length ?
                            this.renderSubMenu(md.children)
                        :
                            null
                    }
                </SubMenu>
            );
        });

        return nodes;
    }

    render(){

        return (
            <div className="navbar-box">
                <Menu
                    style={ styles.menu.menuRoot }
                    selectedKeys={ this.state.defaultMenu }
                    mode="inline"
                    onClick={ this.handleRoute.bind(this) }
                >
                    <Menu.Item key="admin/articles" style={ styles.menu.menuItem }><IconFont type="icon-article-manage"/>文章管理</Menu.Item>
                    <Menu.Item key="admin/drafts" style={ styles.menu.menuItem }><IconFont type="icon-draft-manage"/>草稿管理</Menu.Item>
                    <Menu.Item key="admin/media" style={ styles.menu.menuItem }><IconFont type="icon-media-manage"/>媒体库</Menu.Item>
                    <Menu.Item key="admin/category" style={ styles.menu.menuItem }><IconFont type="icon-category-manage"/>分类管理</Menu.Item>
                    <Menu.Item key="admin/tags" style={ styles.menu.menuItem }><IconFont type="icon-tag-manage"/>标签管理</Menu.Item>
                    <Menu.Item key="admin/users" style={ styles.menu.menuItem }><IconFont type="icon-user-manage"/>用户管理</Menu.Item>
                    <SubMenu title={<span><IconFont type="icon-comment-manage" />评论管理</span>} style={ styles.menu.submenu }>
                        <Menu.Item key="admin/comments" style={ styles.menu.menuItem }><IconFont type="icon-comment-manage"/>所有评论</Menu.Item>
                        <Menu.Item key="admin/baccomments" style={ styles.menu.menuItem }><IconFont type="icon-comment-manage"/>被举报评论</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
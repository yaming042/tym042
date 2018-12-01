import React from 'react';
import { Menu } from 'antd';
import { IconFont } from '../components/IconFont';

import styles from '../../libs/styles';
import history from '../../libs/history';

console.log(styles);

export default class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menu: [
                {
                    path: 'admin/articles',
                    icon: <IconFont type="icon-tags-1"/>,
                    label: '文章列表',
                },
                {
                    path: 'admin/drafts',
                    icon: <IconFont type="icon-tags-1"/>,
                    label: '草稿',
                },
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

    render(){

        return (
            <div className="navbar-box">
                <Menu
                    style={ styles.menu.menuRoot }
                    selectedKeys={ this.state.defaultMenu }
                    onClick={ this.handleRoute.bind(this) }
                >
                    {
                        this.state.menu.map((d, k) => {
                            return (
                                <Menu.Item key={ d.path } style={ styles.menu.menuItem }>
                                    { d.icon }
                                    { d.label }
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </div>
        );
    }
}
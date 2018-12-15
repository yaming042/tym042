import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

import styles from '../../../libs/styles';
import * as Events from '../../../libs/events';

export default class Category extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open: false,
        };
    }
    dialogOpen(){
        this.setState({
            open: true,
        });
    }
    dialogClose(){
        this.setState({
            open: false,
        });
    }

    componentDidMount(){
        Events.emiter.on(Events.OPEN_CATEGORY_EDIT, (id) => {
            this.dialogOpen();
        });
    }


    render(){
        return (
            <div>
                <Dialog
                    open={ this.state.open }
                    autoDetectWindowHeight={ false }
                    contentStyle={{width:'768px',height:'567px'}}
                    onRequestClose={ this.dialogClose.bind(this) }
                >
                    弹框
                </Dialog>
            </div>
        );
    }
}
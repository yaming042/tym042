import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions';

import _ from 'underscore';

import Pagination from '../components/pagination';

class Drafts extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){

    }

    render(){

        return (
            <div>
                drafts
            </div>
        );
    }
}



//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state;
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Draft from '../page/drafts';

function bindStateToProps(state){
    return state;
}
function bindDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

export default connect(bindStateToProps, bindDispatchToProps)(Draft);
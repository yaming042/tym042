import * as TYPE from '../libs/const';
import * as Funcs from '../libs/functions';

Funcs.objectAssign();

const initState = {
    curUserId: '',
    curUser: {},
};

function tag(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_CUR_USER_ID:
            return Object.assign({}, state, {curUserId: action.val});
        case TYPE.SET_CUR_USER:
            return Object.assign({}, state, {curUser: action.val});
        default:
            return state;
    }
}

export default tag;
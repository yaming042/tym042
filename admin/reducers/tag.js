import * as TYPE from '../libs/const';
import * as Funcs from '../libs/functions';

Funcs.objectAssign();

const initState = {
    curTagId: '',
    curTag: {},
};

function tag(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_CUR_TAG_ID:
            return Object.assign({}, state, {curTagId: action.val});
        case TYPE.SET_CUR_TAG:
            return Object.assign({}, state, {curTag: action.val});
        default:
            return state;
    }
}

export default tag;
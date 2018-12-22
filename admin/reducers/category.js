import * as TYPE from '../libs/const';
import * as Funcs from '../libs/functions';

Funcs.objectAssign();

const initState = {
    curCategoryId: '',
    curCategory: {},
};

function category(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_CUR_CATEGORY_ID:
            return Object.assign({}, state, {curCategoryId: action.val});
        case TYPE.SET_CUR_CATEGORY:
            return Object.assign({}, state, {curCategory: action.val});
        default:
            return state;
    }
}

export default category;
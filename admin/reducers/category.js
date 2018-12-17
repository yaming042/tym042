import * as TYPE from '../libs/const';

if(typeof Object.assign !== 'function') {
    Object.assign = function (target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}

const initState = {
    curCategoryId: '',
    curCategory: {},
};

function draft(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_CUR_CATEGORY_ID:
            return Object.assign({}, state, {curCategoryId: action.val});
        case TYPE.SET_CUR_CATEGORY:
            return Object.assign({}, state, {curCategory: action.val});
        default:
            return state;
    }
}

export default draft;
import * as TYPE from '../libs/const';
import * as Funcs from '../libs/functions';

Funcs.objectAssign();

const initState = {
    curArticleId: '',
    curArticle: {},
};

function tag(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_CUR_ARTICLE_ID:
            return Object.assign({}, state, {curArticleId: action.val});
        case TYPE.SET_CUR_ARTICLE:
            return Object.assign({}, state, {curArticle: action.val});
        default:
            return state;
    }
}

export default tag;
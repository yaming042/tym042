import {combineReducers} from 'redux';
import category from './category';
import tag from './tag';
import article from './article';
import user from './user';

const rootReducer = combineReducers({
    article,
    category,
    tag,
    user,
});

export default rootReducer;
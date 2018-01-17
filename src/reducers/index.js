import { combineReducers } from 'redux';
import creditcardReducer from './creditcardReducer';

export default combineReducers({
    creditcard: creditcardReducer
});

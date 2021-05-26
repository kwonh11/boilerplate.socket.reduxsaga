import { combineReducers } from "redux";
import common from '@redux/common/state';
import socket from '@redux/socket/state';


const rootReducer = combineReducers({
    common,
    socket,
});
 
export default rootReducer;

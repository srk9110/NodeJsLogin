import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types';

export default function (preState={}, action){
    switch (action.type) {
        case LOGIN_USER:
            //loginSuccess에 request(backend에서 가져온 모든 reaponse data)를 넣어줌
            return {...preState, loginSuccess: action.payload};
            break;
    
        case REGISTER_USER:
            return {...preState, register: action.payload }
            break;

        case AUTH_USER:
            return {...preState, userData: action.payload }
            break;    

        default:
            return preState;
    }
}
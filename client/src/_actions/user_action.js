import axios from 'axios';
import {LOGIN_USER,REGISTER_USER,AUTH_USER} from './types';

export function loginUser(dataToSubmit) {

    //action 처리
    //response : backend에서 가져온 모든 data
    const request=axios.post('/api/users/login', dataToSubmit)
        .then(response=>response.data);
        
    //reducer에 보내기위해 반환 (type, response 필요)
    //여기서는 payload라고 함
    //reducer에서 타입만 import하면 리덕스에서 action을 알아서 보내준다!
    //user_action->index(combineReducers)->type에 따라 case 필터->return
    return  {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request=axios.post('/api/users/register', dataToSubmit)
        .then(response=>response.data);
        
    return  {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request=axios.get('/api/users/auth')
        .then(response=>response.data);
        
    return  {
        type: AUTH_USER,
        payload: request
    }
}
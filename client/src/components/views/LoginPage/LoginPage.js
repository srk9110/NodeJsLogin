import React,{useState} from 'react';
import '../../../style.css';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
//React router v4에선 histroy.push를 사용하려면 
//withRouter로 컴포넌트를 감싸줘야함
import { withRouter } from 'react-router-dom';

function LoginPage(props){

    //redux dispatch
    const dispatch=useDispatch();

    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onEmailHandler=(event)=>{
        const {target:{value},}=event;
        setEmail(value);
    };

    const onPasswordHandler=(event)=>{
        const {target:{value},}=event;
        setPassword(value);
    };

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        let body={
            email: email,
            password: password,
        }

        //dispatch(action)
        //To user_reducer.js
        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                //페이지 이동
                props.history.push('/');    
            } else {
                alert('로그인 실패!');
            }
        });

        
    };

    return (
        <div>
            <form className="container" onSubmit={onSubmitHandler}>
                <label>email</label>
                <input type="email" value={email} onChange={onEmailHandler} placeholder="email"/>
                <label>password</label>
                <input type="password" value={password} onChange={onPasswordHandler} placeholder="password"/>
                <br/>
                <button type="submit">확인</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);
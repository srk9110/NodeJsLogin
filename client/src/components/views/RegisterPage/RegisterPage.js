import React, {useState} from 'react';
import '../../../style.css';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props){

    //redux dispatch
    const dispatch=useDispatch();

    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const onEmailHandler=(event)=>{
        const {target:{value},}=event;
        setEmail(value);
    };

    const onNameHandler=(event)=>{
        const {target:{value},}=event;
        setName(value);
    };

    const onPasswordHandler=(event)=>{
        const {target:{value},}=event;
        setPassword(value);
    };

    const onConfirmPasswordHandler=(event)=>{
        const {target:{value},}=event;
        setConfirmPassword(value);
    };

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        if(password!==confirmPassword){
            return alert("비밀번호와 비밀번호 확인이 다릅니다.");
        }

        let body={
            email: email,
            password: password,
            name: name
        }

        //dispatch(action)
        //To user_reducer.js
        dispatch(registerUser(body))
        .then(response=>{
            if(response.payload.success){
                props.history.push("/login")
            } else {
                alert("회원가입에 실패했습니다.");
            }
        });

        
    };

    return (
        <div>
            <form className="container" onSubmit={onSubmitHandler}>
                <label>email</label>
                <input type="email" value={email} onChange={onEmailHandler} placeholder="email"/>
                <label>name</label>
                <input type="text" value={name} onChange={onNameHandler} placeholder="name"/>
                <label>password</label>
                <input type="password" value={password} onChange={onPasswordHandler} placeholder="password"/>
                <label>confirm password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} placeholder="password"/>
                <br/>
                <button type="submit">회원 가입</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);
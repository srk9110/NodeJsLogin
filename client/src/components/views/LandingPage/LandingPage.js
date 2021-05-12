import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../style.css';
import { withRouter } from 'react-router-dom';

function LandingPage(props){

    const [logText, setLogText]=useState(""); 

    useEffect(()=>{
        axios.get('/api/users/auth')
        .then(response=>{
            console.log(response.data);
            
            if(!response.data.isAuth){
                setLogText("Login");
            } else {
                setLogText("Logout");
            }
        });
        

    },[]);

    const onLogInAndOutHandler=()=>{

        if(logText==="Logout"){
            
            axios.get('/api/users/logout')
            .then(response=>{
                if(response.data.success){
                    //props.history.push("/login");
                    setLogText("Login");
                } else {
                    alert('로그아웃에 실패했습니다!');
                }
            });
        } else {
            props.history.push("/login");
        }
    }

    return (
        <div className="container">
            <h2>Hello ;)</h2>
            <button onClick={onLogInAndOutHandler}>{logText}</button>
        </div>
    )
}

export default withRouter(LandingPage);
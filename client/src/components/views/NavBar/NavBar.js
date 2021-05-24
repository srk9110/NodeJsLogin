import React,{useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../../../src/style.css';

function NavBar(props){

    const [logText, setLogText]=useState("");

    useEffect(()=>{
        axios.get('/api/users/auth')
        .then(response=>{
            if(response.data.isAuth){
                setLogText("LOG OUT");
            } else {
                setLogText("LOG IN");
            }
        });
    });

    const onLogTextChange=(event)=>{
        if(logText==="LOG OUT"){
            axios.get('/api/users/logout')
            .then(response=>{
                if(response.data.success){
                    setLogText("LOG IN");
                } else {
                    alert('로그아웃에 실패했습니다!');
                }
            });
        } 
    };

    return (
        <nav>
            <Link to="/" className="nav-logo"><h3>NodeJS & React</h3></Link>
            <ul>
                <li>
                     <Link to="/" className="nav-link">HOME</Link>
                </li>
                <li>
                     <Link to="/register" className="nav-link">SIGN UP</Link>
                </li>
                <li>
                     <Link to="/login" className="nav-link" onClick={onLogTextChange}>{logText}</Link>
                </li>
            </ul>
        </nav>
    )
}

export default withRouter(NavBar);
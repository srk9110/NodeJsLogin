//higher order component : 컴포넌트를 가져와 새로운 컴포넌트로 반환
//유저의 상태에 따라 허락된 페이지를 구분하는 용도

import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRouter=null){
    
    //specificComponent: hoc에 넣을 컴포넌트 ex) loginPage
    //option:
        //null: 아무나 출입가능
        //true: 로그인한 유저만 출입가능
        //false: 로그인한 유저는 출입불가능
    //Admin: 관리자만 출입가능 true/false     

    function AuthCheck(props){

        //1. 서버에 request를 날림
        const dispatch=useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(response=>{
                console.log(response);

                //2. 분기를 나눔
                //2-1. 로그인하지 않은 상태
                if(!response.payload.isAuth){

                    //로그인 안하고 접근하려고 할때 
                    if(option){
                        props.history.push('/login');
                    }

                } else {
                    //2-2. 로그인한 상태
                    //어드민이 아닌데 어드민페이지에 접근하려고 할때
                    if(adminRouter && !response.payload.isAdmin){
                        props.history.push('/');
                    } else {
                        //로그인한 상태로 출입불가능한 곳에 들어가려 할때
                        if(!option){
                            props.history.push('/');
                        }
                    }
                }
            });
        },[])

        return (
            <SpecificComponent />
        );
    }

    return withRouter(AuthCheck);
}
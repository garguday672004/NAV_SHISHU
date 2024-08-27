import React from 'react'
import Template from '../components/Template';
import login_NAVSHISHU from '../assets/login_NAVSHISHU.jpg';

function Login({setIsLoggedIn}){
    return(
        <Template
            title='Welcome Back'
            desc1='Login to continue your surrogacy journey'
            desc2='For intended parents or gestational carriers'
            image={login_NAVSHISHU}
            formtype='login'
            setIsLoggedIn={setIsLoggedIn}
            >

        </Template>
    )
}

export default Login;
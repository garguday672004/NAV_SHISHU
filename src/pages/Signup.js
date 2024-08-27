import React from 'react'
import Template from '../components/Template';
import signup_NAVSHISHU from '../assets/signup_NAVSHISHU.jpeg';

function Signup({setIsLoggedIn}){
    return(
        <Template
            title='New To Nav-Shishu?'
            desc1='Start your surrogacy journey today.'
            desc2='Build your dream family.'
            image={signup_NAVSHISHU}
            formtype='signup'
            setIsLoggedIn={setIsLoggedIn}
            >

        </Template>
    )
}

export default Signup;
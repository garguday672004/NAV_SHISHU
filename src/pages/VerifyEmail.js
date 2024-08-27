import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/addOns/Loader';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { signup } from '../services/operations/authAPI';
import '../index.css';

const VerifyEmail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if(!signupData){
            navigate('/signup');
        }
    },[])

    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = signupData;

    console.log('SIGNUP DATA ....', signupData);

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]'>
        {
            loading ? (
                <Loader/>
            ) : 
            (
                <div className='max-w-[500px] p-4 lg:p-8 border-2 rounded-lg border-richblack-500'>

                    <h1 className='text-3xl font-semibold text-black'>Verify Email</h1>

                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-black'>A verification mail has been sent. Please enter the OTP</p>

                    <form onSubmit={handleOnSubmit}>

                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="separator"></span>} // Add a class for styling
                            renderInput={(inputProps, index) => (
                                <input {...inputProps} placeholder='-' className="otp-input min-w-12" /> // Add a class for styling
                            )}
                        />

                        <button type='submit' className='w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>Verify Email</button>

                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <div className='flex items-center gap-x-2 text-black'>
                            <navigate to='/login'>
                                <p>Back to Login</p>
                            </navigate>
                        </div>

                        <button onClick={() => dispatch(sendOtp(signupData.email,navigate))} className='flex items-center text-blue-100 gap-x-2'>
                            Resend it
                        </button>
                    </div>
                    
                </div>
            )
        }






    </div>
  )
}

export default VerifyEmail
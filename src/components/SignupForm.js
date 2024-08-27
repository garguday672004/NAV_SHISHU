import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../services/operations/authAPI';

function SignupForm({setIsLoggedIn}){

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    function changeHandler(e){
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {email, password, confirmPassword} = formData;

    function submitHandler(e){
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

        const signupData = {
            ...formData,
            accountType
        }

        dispatch(setSignupData(signupData));
        dispatch(sendOtp(email, navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType('Surrogate');
    }

    const [accountType, setAccountType] = useState('Surrogate');

    return (
        <div>
            
            <div
                className='flex bg-indigo-600 p-1 gap-z-1 my-6 rounded-full max-w-max text-white'>
                <button className={`${accountType === 'Surrogate' ? 'bg-white text-indigo-600' : 'bg-indigo-600'} rounded-full px-4 py-1`}
                onClick={() => {setAccountType('Surrogate')}}>
                Surrogate Mother
                </button>

                <button className={`${accountType === 'Parent' ? 'bg-white text-indigo-600' : 'bg-indigo-600'} rounded-full px-4 py-1`}
                onClick={() => {setAccountType('Parent')}}>
                Intended Parent
                </button>
            </div>

            <form onSubmit={submitHandler}>
                <div className='flex justify-between'>
                    <label>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Firstname<sup className='text-pink-200'>*</sup></p>
                        <input
                            type="text"
                            placeholder="Enter firstname"
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={changeHandler}
                            className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        />
                    </label>

                    <label>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Lastname<sup className='text-pink-200'>*</sup></p>
                        <input
                            type="text"
                            placeholder="Enter lastname"
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={changeHandler}
                            className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        />
                    </label>
                </div>

                <label>
                    <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        type="text"
                        placeholder="Enter email address"
                        required
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                    />
                </label>

                <div className='flex justify-between'> 
                    <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        />
                        <span onClick={() => {setshowPassword(!showPassword)}} className='absolute text-2xl right-3 top-[38px] cursor-pointer'>
                            { !showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>

                    <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            required
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        />
                        <span onClick={() => {setshowConfirmPassword(!showConfirmPassword)}} className='absolute text-2xl right-3 top-[38px] cursor-pointer'>
                            { !showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>
                </div>

                <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 py-[8px] mt-4 w-full'>
                    Create Account
                </button>

            </form>

        </div>
    )
}

export default SignupForm; 
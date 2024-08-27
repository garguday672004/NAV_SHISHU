import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../services/operations/authAPI';
import Loader from './addOns/Loader';

function LoginForm({setIsLoggedIn}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading}  = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

    function submitHandler(e){
        e.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    }

    return (
        <div>
            {
                loading ? 
                (<Loader/>) : 
                (
                    <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>

                        <input 
                        required
                        type='text' 
                        placeholder='Enter email address'
                        value={formData.email}
                        onChange={changeHandler} 
                        name='email'
                        className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        ></input>
                    </label>

                    <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-300 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>

                        <input 
                        required
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        value={formData.password}
                        onChange={changeHandler} 
                        name='password'
                        className='rounded-[0.5rem] text-black w-full p-[12px] border-black border-2'
                        ></input>

                        <span onClick={() => {setshowPassword(!showPassword)}} className='absolute right-3 top-[38px] text-2xl cursor-pointer'>
                            { !showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>

                        <Link to='#'>
                            <p className='text-sm mt-1 text-blue-100 absolute right-3 top-[70px]'>
                                Forgot Password
                            </p>
                        </Link>
                    </label>

                    <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 py-[8px] mt-4'>
                        Sign In
                    </button>


                </form>
                )
            }
        </div>
    )
}

export default LoginForm;
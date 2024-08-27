// login and singup vaale page ka similar component banao
import frame from '../assets/frame.png'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google';

function Template({title,desc1, desc2, image, formtype, setIsLoggedIn}) {
    
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 justify-between'>

        <div className='w-11/12 max-w-[450px] mx-0'>
            <h1 className='text-rickblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>

            <p className='text-[1.125rem] leading[1.625rem] mt-4'>
                <span className='text-richblack-100'>{desc1}</span>
                <br></br>
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === 'signup' ? (<SignupForm setIsLoggedIn={setIsLoggedIn}></SignupForm>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm>)}

            <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] bg-richblack-700 w-full'></div>
                <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                <div className='h-[1px] bg-richblack-700 w-full'></div>
            </div>

            <button onClick={() => login()} className='w-full flex justify-center items-center rounded-[8px] font-medium text-white px-[12px] py-[8px] gap-x-2 mt-6  bg-indigo-600'>
                <FcGoogle size={24}></FcGoogle>
                <p>Sign in with Google</p>
            </button>

        </div>

        <div className='relative w-11/12 max-w-[450px]'>
            <img src={frame} alt='Pattern' width={558} height={504} loading='lazy'></img>
            <img src={image} alt='login-imag' width={558} height={700} loading='lazy' className='absolute top-4 right-4 h-[400px]'></img>
        </div>
      
    </div>
  );
}

export default Template;
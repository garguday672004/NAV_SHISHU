import { toast } from 'react-hot-toast';
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from '../../slices/profileSlice';

const { 
  LOGIN_API,
  SIGNUP_API,
  SENDOTP_API,
} = endpoints;

export function login(email, password, navigate){
  
  return async(dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading....")
    try{

      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log('LOGIN API RESPONSE ....', response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success('Login Successful');
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.data));

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.data))
      navigate('/dashboard/my-profile');
    }
    catch(error){
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
}

export function signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
      })

      console.log('SIGNUP API RESPONSE ....', response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success('Signup Successful');
      // dispatch(setToken(response.data.token));
      navigate('/login');
    }
    catch(error){
      console.log("SIGNUP API ERROR............", error);
      toast.error("SignUp Failed");
      navigate('/signup')
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false));
  }
}

export function sendOtp(email, navigate){
  
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      })

      console.log('SEND OTP API RESPONSE ....', response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success('OTP Sent Successfully');

      navigate('/verify-email');
    }
    catch(error){
      console.log("SEND OTP API ERROR............", error);
      toast.error("OTP Failed");
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false));
  }
  
}

export function logout(navigate){
  return async(dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem('token');
    localStorage.removeItem("user")
    toast.success('Logged Out Successfully');
    navigate('/');
  }
}
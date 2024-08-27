import React from 'react'
import { Link } from 'react-router-dom'
import logo_V2 from '../assets/logo_V2.jpg'
import nav_shishu_hindi from '../assets/nav_shishu_hindi.png'
// import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { logout } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar(props){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    // const {user} = useSelector((state) => state.profile);


    const location = useLocation();
    // let isLoggedIn = props.isLoggedIn;
    // let setIsLoggedIn = props.setIsLoggedIn;

    return(
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-3 mx-auto'>
            
            <div className='flex items-center'>
                <Link to='/'>
                    <img src={logo_V2} alt='logo' width={80} height={16} loading='lazy'></img>
                </Link>

                <Link to='/'>
                    <img src={nav_shishu_hindi} alt='logo2' width={80} height={16} loading='lazy'></img>
                </Link>
            </div>

            <nav>
                <ul className='flex gap-x-10 text-lg font-normal'> 
                    <li><Link to='/' className={location.pathname === '/' ? 'text-indigo-600' : ''}>Home</Link></li>
                    <li><Link to='/Education' className={location.pathname === '/Education' ? 'text-indigo-600' : ''}>Education</Link></li>
                    <li><Link to='/SurrogacyLaws' className={location.pathname === '/SurrogacyLaws' ? 'text-indigo-600' : ''}>Surrogacy Laws</Link></li>
                    <li><Link to='/Contact' className={location.pathname === '/Contact' ? 'text-indigo-600' : ''}>Contact</Link></li>
                </ul>
            </nav>

            <div className='flex items-center gap-x-4'>
                {
                    token === null &&
                    <Link to='/login'>
                        <button className='bg-indigo-600 text-white py-[8px] px-[12px] rounded-[8px] border border-indigo-500 font-normal'>Login</button>
                    </Link>
                }
                { token === null &&
                    <Link to='/signup'>
                        <button className='bg-indigo-600 text-white py-[8px] px-[12px] rounded-[8px] border border-indigo-500 font-normal'>Signup</button>
                    </Link>
                }
                { token !== null &&
                    <Link to='/'>
                        <button className='bg-indigo-600 text-white py-[8px] px-[12px] rounded-[8px] border border-indigo-500 font-normal' onClick={() => {
                            dispatch(logout(navigate));
                            }}>Logout</button>
                    </Link>
                }
                {  token !== null &&
                    <Link to='/dashboard/my-profile'>
                        <button className='bg-indigo-600 text-white py-[8px] px-[12px] rounded-[8px] border border-indigo-500 font-normal'>Dashboard</button>
                    </Link>
                }
            </div>

        </div>
    )
}

export default Navbar;
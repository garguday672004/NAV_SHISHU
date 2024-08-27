import React from 'react'
import { logout } from '../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import {sidebarLinks} from '../components/addOns/dashboard-links'
import SidebarLink from './SidebarLink';
import Loader from './addOns/Loader';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, loading : profileLoading} = useSelector((state) => state.profile);
    const {loading : authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading){
        return (
            <Loader/>
        )
    }

  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-200 h-[calc(100vh-3.5rem)] bg-richblack-200 py-10'>

        <div className='flex flex-col'>
        {
            sidebarLinks.map( (link) => {
                if(link.type && user.accountType !== link.type){
                    return null;
                }
                return (
                    <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                )
            })
        }
        </div>

        <div className='mx-auto mt-6 mb-6 h-[1px] w-full bg-white '></div>

        <div className='flex flex-col'>
            <SidebarLink link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear"></SidebarLink>
        </div>

        <button onClick={() => dispatch(logout(navigate))} className='flex items-center px-8 py-2 text-md gap-2'>
            <VscSignOut/>
            <span>Logout</span>
        </button>

    </div>
  )
}

export default Sidebar
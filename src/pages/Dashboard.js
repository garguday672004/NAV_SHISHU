import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../components/addOns/Loader';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard(){

    const {loading : profileLoading} = useSelector((state) => state.profile);
    const {loading : authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading){
        return (
            <Loader/>
        )
    }


    return(
        <div className='realtive flex min-h-[calc(100vh-3.5rem)]'> 
            <Sidebar/>
            <div className='h-[calc(100vh-3.5rem)] overflow-auto flex-1'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'> <Outlet/> </div>
            </div>
        </div>
    )
}

export default Dashboard;
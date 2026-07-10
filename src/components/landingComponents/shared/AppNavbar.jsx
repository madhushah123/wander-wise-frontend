import React from 'react'
import useAuth from '@/hooks/useAuth';
import CustomButton from './CustomButton';
import { NavLink } from 'react-router-dom';


const AppNavbar = () => {

    const {logout } = useAuth();
  return (
    <header className="px-20 py-4 fixed top-0 z-30 bg-white w-full flex justify-between items-center">
        {/* left part */}
        <div>
            <h1 className="text-4xl font-semibold">WanderWise</h1>
        </div>

        {/* right part  */}
        <div className='flex items-center gap-16'>
            <nav className='text-lg space-x-8'>
                <NavLink to={"/trips"}>Trips</NavLink>
                 <NavLink to={"/itinerary"}>Itinerary</NavLink>
                <NavLink to={"/baggage"}>Baggage</NavLink>
            </nav>

           <div onClick={logout}>
             <CustomButton text="Logout" />
           </div>

        </div>
    </header>
  )
}

export default AppNavbar
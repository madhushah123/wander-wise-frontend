import React from 'react'

const Navbar = () => {
  return (
    <header className="px-20 py-4 flex justify-between items-center">
        {/* left part */}
        <div>
            <h1 className="text-4xl font-semibold">WanderWise</h1>
        </div>
        {/* right part */}
        <div className='flex items-center gap-16'>
            <nav className='text-lg space-x-8'>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>

            <button className='bg-blue-700 px-5 py-1.5 rounded-sm text-white cursor-pointer hover:bg-blue-400'>
                Login
            </button>

        </div>

    </header>
  )
}

export default Navbar
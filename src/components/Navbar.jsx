import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar line flex gap-5 py-10 absolute top0 left-1/2 -translate-x-1/2 font-[Helvetica_Now_Display]'>
            {
                [
                    'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'Accessories', 'Support'
                ].map((e) => (
                    <a href="#" className='text-white text-sm mx-4 capitalize'>{e}</a>
                ))
            }
        </div>
    )
}

export default Navbar
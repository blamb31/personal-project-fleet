import React from 'react'

import {Link} from 'react-router-dom'

import './navBar.css'

export default function NavBar(props) {
    return(
        <div className='navBarDiv'>
            <hr />
            <Link className='navBarLinks' to='/user/admin/api/cars'>Cars</Link>
            <hr />
            <Link className='navBarLinks' to='/user/admin/api/maintenance'>Maintenance</Link>
            <hr />
            <Link className='navBarLinks' to='/user/admin/api/createDriver'>Drivers</Link>
            <hr />
        </div>
    )
}
import React from 'react'

import {Link} from 'react-router-dom'

export default function NavBar(props) {
    return(
        <div>
            <Link to='/user/admin/api/cars'>Cars</Link>
            <Link to='/user/admin/api/createDriver'>Drivers</Link>
            <Link to='/user/admin/api/maintenance'>Maintenance</Link>
        </div>
    )
}
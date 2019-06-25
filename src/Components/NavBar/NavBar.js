import React from 'react'

import {Link} from 'react-router-dom'

export default function NavBar(props) {
    return(
        <div>
            <Link to='/user/admin/api/cars'>Cars</Link>
            <Link to='/admin/api/drivers'>Drivers</Link>
            <Link to='/admin/api/maintenance'>Maintenance</Link>
        </div>
    )
}
import React from 'react'
import './Navbar.css'
import BarChartIcon from '@mui/icons-material/BarChart';

const Navbar = () => {
    return (
        <div id='navbar'>
            <BarChartIcon 
                onClick={() => window.location.reload(true)} 
                style={{cursor:'pointer'}}
            />
        </div>
    )
}

export default Navbar

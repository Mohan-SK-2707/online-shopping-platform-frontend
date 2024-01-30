import React from 'react'
import '../Navigationbar/Navbar.css'

const NavigationBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li><a href="/home"> Home </a></li>
                <li><a href="/about"> About </a></li>
                <li><a href="/contact"> Contact </a></li>
                <li><a href="/users"> Users </a></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
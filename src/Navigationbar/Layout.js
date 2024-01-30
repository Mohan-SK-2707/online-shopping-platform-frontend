import React from 'react';
import NavigationBar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    );
};

export default Layout;

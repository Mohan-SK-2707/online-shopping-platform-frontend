import { UserOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from 'antd/es/typography/Link';
import { useState } from "react";


const Navbar = () => {

    const [current, setCurrent] = useState('mail');

    const items = [
        {
            label: 'Your Profile',
            key: 'profile',
            icon: <UserOutlined />,
            children: [
                {
                    type: 'group',
                    label: 'User Profile',
                    children: [
                        {
                            label: <a href='/account/profile'>Profile</a>,
                            key: 'profile::setting',
                        },
                        {
                            label: <Link href='/'>Orders</Link>,
                            key: 'orders:setting',
                        },
                    ],
                },
            ],
        },
        {
            label: <Link href='/'>Sign out</Link>,
            key: 'profile::setting',
        },
    ];


    return (
        <div className="container">
            <Menu mode="horizontal" onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} items={items} style={{
                justifyContent: 'flex-end', padding: '10px', backgroundColor: 'whitesmoke', boxShadow: '0 0 10px grey', position: "fixed",
                top: "0%",
                left: "0%",
                width: '100%',
                zIndex:'1000'
            }}>
            </Menu>
            <Footer
                style={{
                    textAlign: "center",
                    position: "fixed",
                    bottom: "0%",
                    left: "0%",
                    width: '100%',
                    zIndex:'1000'
                }}
            >
                E-Com ©{new Date().getFullYear()} Created by E-Com online shopping platform
            </Footer>
        </div>
    );
}


export default Navbar;
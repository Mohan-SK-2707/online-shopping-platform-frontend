import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Menu, Modal } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from 'antd/es/typography/Link';
import { useState } from "react";
import UserProfile from '../user/UserProfile';


const Dashboard = () => {

    const [openProfile, setOpenProfile] = useState(false);
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
                            label: <Link onClick={() => setOpenProfile(true)}>Profile</Link>,
                            key: 'profile::setting',
                        },
                        {
                            label: <Link href='/signin'>Orders</Link>,
                            key: 'orders:setting',
                        },
                    ],
                },
            ],
        },
        {
            label: <Link href='/signin'>Sign out</Link>,
            key: 'profile::setting',
        },
    ];


    return (
        <div className="container">
            <Menu mode="horizontal" onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} items={items} style={{ justifyContent: 'flex-end', padding: '10px', backgroundColor: 'whitesmoke', boxShadow: '0 0 10px grey' }}>
                {/* <Menu.Item key="profile" icon={<UserOutlined />}  >
                    <Link onClick={() => setOpenProfile(true)}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                    <Link href='/signin'>Logout</Link>
                </Menu.Item> */}
            </Menu>
            <Modal
                title="Profile"
                style={{ textAlign: 'center', textAlignLast: 'center' }}
                centered
                open={openProfile}
                onOk={() => setOpenProfile(false)}
                width={700}
                height={700}

            >
                <UserProfile id={"650046c390fc095ba87e6472"} />
            </Modal>
            <Footer
                style={{
                    textAlign: "center",
                    position: "fixed",
                    bottom: "0%",
                    left: "0%",
                    width: '100%'
                }}
            >
                E-Com ©{new Date().getFullYear()} Created by E-Com online shopping platform
            </Footer>
        </div>
    );
}


export default Dashboard;
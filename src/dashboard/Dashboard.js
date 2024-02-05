import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Modal } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from 'antd/es/typography/Link';
import { useState } from "react";
import UserProfile from '../user/UserProfile';


const Dashboard = () => {

    const [openProfile, setOpenProfile] = useState(false);


    return (
        <div className="container">
            <Menu mode="horizontal" style={{ justifyContent: 'flex-end' }}>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                    <Link onClick={() => setOpenProfile(true)}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                    <Link href='/signin'>Logout</Link>
                </Menu.Item>
                <Modal
                    title="Profile"
                    style={{ textAlign: 'center', textAlignLast: 'center' }}
                    centered
                    open={openProfile}
                    width={700}
                    height={400}
                    footer={null}
                >
                    <UserProfile id={1} />
                </Modal>
            </Menu>
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
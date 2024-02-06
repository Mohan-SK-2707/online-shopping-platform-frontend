import { Collapse, Form, Input, theme } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import axios from "axios";
import { useEffect, useState } from "react";


const UserProfile = ({ id }) => {

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 10,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };



    const getItems = (panelStyle) => [
        {
            key: '1',
            label: <b>Address</b>,
            children: <> <Form labelCol={{
                span: 9,
            }} wrapperCol={{
                span: 10,
            }}> <Form.Item label="Line 1">
                    <Input type="text" value={address.addressLine} />
                </Form.Item><Form.Item label="City" >
                    <Input type="text" value={address.city} />
                </Form.Item><Form.Item label="State" >
                    <Input type="text" value={address.state} />
                </Form.Item><Form.Item label="Pincode" required>
                    <Input type="number" value={address.pincode} />
                </Form.Item></Form></>,
            style: panelStyle,
        },
    ];


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddrrOpen] = useState(false);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                var url = `http://localhost:8085/online-shopping-platform/user/${encodeURIComponent(id)}`;
                const profileResponse = await axios.get(url);
                console.log(profileResponse);
                setFirstName(profileResponse.data.firstName);
                setLastName(profileResponse.data.lastName);
                setEmailId(profileResponse.data.emailId);
                setUserName(profileResponse.data.userName);
                setContactNo(profileResponse.data.contactNo);
                setAddrrOpen(profileResponse.data.address);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <Form layout="horizontal" labelCol={{
            span: 10
        }} wrapperCol={{
            span: 10
        }} style={{ marginTop: '6%' }}>
            <Form.Item label="First Name">
                <Input value={firstName} />
            </Form.Item>
            <Form.Item label="Last Name">
                <Input value={lastName} />
            </Form.Item>
            <Form.Item label="Email ID">
                <Input value={emailId} />
            </Form.Item>
            <Form.Item label="Username">
                <Input value={userName} />
            </Form.Item>
            <Form.Item label="Contact Number">
                <Input value={contactNo} />
            </Form.Item>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: token.colorBgContainer,
                }}
                items={getItems(panelStyle)}>

            </Collapse>
        </Form>
    );
}
export default UserProfile;
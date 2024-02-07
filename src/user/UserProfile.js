import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Form, Input, Spin, message, theme } from "antd";
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

    const handleFormInput = () => {
        setEnableInput(prevState => !prevState);
    }

    const toast = (type, message, standby) => {
        messageApi.open({
            type: type,
            content: message,
            duration: standby
        });
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
                    <Input type="text" value={address.addressLine} disabled={enableInput ? disabled : undefined} onChange={(e) => setAddressline(e.target.value)} />
                </Form.Item><Form.Item label="City" >
                    <Input type="text" value={address.city} disabled={enableInput ? disabled : undefined} onChange={(e) => setCity(e.target.value)} />
                </Form.Item><Form.Item label="State" >
                    <Input type="text" value={address.state} disabled={enableInput ? disabled : undefined} onChange={(e) => setState(e.target.value)} />
                </Form.Item><Form.Item label="Pincode" required>
                    <Input type="number" value={address.pincode} disabled={enableInput ? disabled : undefined} onChange={(e) => setPincode(e.target.value)} />
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
    const [addressline, setAddressline] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [disabled] = useState(true);
    const [enableInput, setEnableInput] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();



    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                var fetchProfileUrl = `http://localhost:8085/online-shopping-platform/user/${encodeURIComponent(id)}`;
                const profileResponse = await axios.get(fetchProfileUrl);
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

    const doProfileUpdate = async (e) => {
        try {
            setSpinner(true);
            var updateProfileUrl = `http://localhost:8085/online-shopping-platform/user?id=${encodeURIComponent(id)}`
            const updateResponse = await axios.put(updateProfileUrl, {
                updateId: id,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                contactNo: contactNo,
                address: address
            });
            console.log(updateResponse);
            setTimeout(() => {
                setSpinner(false);
                setEnableInput(false);
            }, 2000);
            toast('success', "Profile updated....", 3);
        } catch (error) {
            console.error('Error fetching data:' + error);
            toast('error', error.response.data.errorMsg, 4);
            setTimeout(() => {
                setSpinner(false);
            }, 2000);
        }
    }


    return (
        <>
            {contextHolder}
            <Spin spinning={spinner} fullscreen /><Form layout="horizontal" labelCol={{
                span: 10
            }} wrapperCol={{
                span: 10
            }} style={{ marginTop: '4%' }}>
                <Checkbox style={{ backgroundColor: 'ButtonShadow', marginLeft: '80%' }} onChange={handleFormInput}>Edit</Checkbox>
                <Form.Item label="First Name">
                    <Input value={firstName} disabled={enableInput ? disabled : undefined} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input value={lastName} disabled={enableInput ? disabled : undefined} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email ID">
                    <Input value={emailId} disabled />
                </Form.Item>
                <Form.Item label="Username">
                    <Input value={userName} disabled={enableInput ? disabled : undefined} onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Contact Number">
                    <Input value={contactNo} disabled={enableInput ? disabled : undefined} />
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
            </Form><Button style={{ backgroundColor: 'ButtonShadow' }} onClick={doProfileUpdate}>Update Profile</Button></>
    );
}
export default UserProfile;
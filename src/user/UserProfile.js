import { Button, Checkbox, Divider, Form, Input, Spin, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from '../dashboard/Navbar';
import '../user/Profile.css';



const UserProfile = ({ id }) => {


    const handleFormInput = () => {
        setEnableInput(prevState => !prevState);
        setEnableUpdate(prevState => !prevState)
    }

    const toast = (type, message, standby) => {
        messageApi.open({
            type: type,
            content: message,
            duration: standby
        });
    };



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [disabled] = useState(true);
    const [enableInput, setEnableInput] = useState(true);
    const [enableUpdate, setEnableUpdate] = useState(false);
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
                contactNo: contactNo
            });
            console.log(updateResponse);
            setTimeout(() => {
                setSpinner(false);
            }, 2000);
            setEnableInput(false);
            setEnableUpdate(false);
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
            <Navbar />
            {contextHolder}
            <Spin spinning={spinner} fullscreen />
            <div className="form-container">
                <h2 style={{ justifyContent: 'left' }}>User profile</h2>
                <Checkbox style={{ backgroundColor: 'ButtonShadow', marginLeft: '45%', marginTop: '6%' }} onChange={handleFormInput}>Edit</Checkbox>
                <Form layout="horizontal" labelCol={{
                    span: 5
                }} wrapperCol={{
                    span: 14
                }} style={{ marginTop: '-7%', padding: '8%' }}>
                    <Form.Item label="First Name">
                        <Input className="ainput" value={firstName} disabled={enableInput ? disabled : undefined} onChange={(e) => setFirstName(e.target.value)} />
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

                </Form>
                {enableUpdate && <Button style={{ backgroundColor: 'ButtonShadow' }} onClick={doProfileUpdate} >Update Profile</Button>}
            </div>
            <div className="side-nav">
                <h1 >Account</h1>
                <Divider></Divider>
                <a href='/profile' className="usr-prf" >User Profile</a>
                <Divider></Divider>
                <a href='/account/address' className="usr-prf" >Manage Address</a>
            </div></>
    );
}
export default UserProfile;
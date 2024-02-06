import { Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const UserProfile = ({ id }) => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [addropen, setAddrrOpen] = useState(false);


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
        </Form>
    );
}
export default UserProfile;
import { Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const UserProfile = (id) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [addropen, setAddrrOpen] = useState(false);


    useEffect((id) => {
        const fetchUserProfile = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:8085/online-shopping-platform/user/' + id);
                setProfile(profileResponse);
                console.log(profileResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {

            }
        };

        fetchUserProfile();
    }, []);

    return (
        <Form layout="horizontal" labelCol={{
            span: 10
        }} wrapperCol={{
            span: 10
        }} style={{ marginTop: '6%' }}>
            <Form.Item label="First Name">
                <Input label={firstName} disabled />
            </Form.Item>
            <Form.Item label="Last Name">
                <Input label={lastName} disabled />
            </Form.Item>
            <Form.Item label="Email ID">
                <Input label={emailId} disabled />
            </Form.Item>
            <Form.Item label="Username">
                <Input label={userName} disabled />
            </Form.Item>
            <Form.Item label="Contact Number">
                <Input label={contactNo} disabled />
            </Form.Item>
        </Form>
    );
}
export default UserProfile;
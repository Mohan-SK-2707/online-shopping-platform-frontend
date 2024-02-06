
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Spin, message } from "antd";
import Link from 'antd/es/typography/Link';
import axios from 'axios';
import React, { useState } from "react";
import '../Signup/Signup.css';


const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [addropen, setAddrrOpen] = useState(false);
    const [reg, setRegOpen] = useState(false);
    const [address, setAddress] = useState({ addressLine: '182/2w', city: 'Theni', state: 'Tamilnadu', pincode: '625536' }); {/**/ }
    const [spinner, setSpinner] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const toast = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleCheckboxClick = () => {
        if (reg) {
            setRegOpen(false);
        } else {
            setRegOpen(true);
        }

    };




    const doSignup = async (e) => {
        console.log(e);
        try {
            setSpinner(true);
            const response = await axios.post('http://localhost:8085/online-shopping-platform/authentication/v1/sign-up', {
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                password: password,
                userName: userName,
                contactNo: contactNo,
                address: address
            });
            console.log(response.id);
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
            toast('success', "Signup successful....");
        } catch (error) {
            console.error('Error fetching data:', error);
            toast('error', error.response.data.errorMsg);
            setTimeout(() => {
                setSpinner(false);
            }, 2000);
        }
    };

    return (
        <div className="reg">
            {contextHolder}
            <Spin spinning={spinner} fullscreen />
            <Form className="regform">
                <h2>SIGN UP</h2>
                <Form.Item label="First name" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }} rules={[{ required: true }]}>
                    <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Last name" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email Id" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Input.Password
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item label="UserName" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>
                <Form.Item label="ContactNo" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Input type="number" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                </Form.Item>
                <Form.Item label="Residence" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Button onClick={() => setAddrrOpen(true)} style={{ backgroundColor: 'ButtonShadow' }}>
                        Add address
                    </Button>
                    <Modal
                        title="Add address"
                        centered
                        open={addropen}
                        onOk={() => setAddrrOpen(false) && setAddress({ addressLine: address.addressLine, city: address.city, state: address.state, pincode: address.pincode })}
                        onCancel={() => setAddrrOpen(false)}
                        // onClick={}
                        width={900}
                        height={400}
                    >
                        <Form.Item label="Line 1" labelCol={{
                            span: 5,
                        }} wrapperCol={{
                            span: 10,
                        }}>
                            <Input type="text" value={address.addressLine} />
                        </Form.Item>
                        <Form.Item label="City" labelCol={{
                            span: 5,
                        }} wrapperCol={{
                            span: 10,
                        }} required>
                            <Input type="text" value={address.city} />
                        </Form.Item>
                        <Form.Item label="State" labelCol={{
                            span: 5,
                        }} wrapperCol={{
                            span: 10,
                        }} required>
                            <Input type="text" value={address.state} />
                        </Form.Item>
                        <Form.Item label="Pincode" labelCol={{
                            span: 5,
                        }} wrapperCol={{
                            span: 10,
                        }} required>
                            <Input type="number" value={address.pincode} />
                        </Form.Item>
                    </Modal>
                </Form.Item>
                <Form.Item label="" valuePropName="checked" required style={{ display: 'flex', marginTop: '20px', marginLeft: '10%' }}>
                    <Checkbox onClick={handleCheckboxClick}>I would like to know more about new arrivals promotions from
                        E-Com and agree about the privacy policy terms and conditions</Checkbox>
                </Form.Item>
                <Form.Item labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Button style={{ position: 'relative', left: '65%', backgroundColor: 'ButtonShadow' }} onClick={doSignup} disabled={!reg}  >Register</Button>
                </Form.Item>
                {/**/}
                <Form.Item style={{ padding: '10px', marginTop: '-3%', marginRight: '16%', marginLeft: '14%' }}>
                    Already have an account
                    <Link href='/signin' >  Sign In</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Signup;
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import Link from 'antd/es/typography/Link';


const Login = () => {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const toast = (message, type) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const doLogin = async (e) => {
        try {
            setSpinner(true);
            const response = await axios.post('http://localhost:8085/online-shopping-platform/authentication/v1/sign-in', {
                emailId: emailId,
                password: password
            });
            console.log(response);
            toast("Successfull authentication...", 'success');
            navigate('/dashboard');
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
        } catch (error) {
            if (error.response.data.errorMsg !== '') {
                toast(error.response.data.errorMsg, 'error');
            } else {
                toast(error.message, 'error');
            }
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
        }
    }


    return (
        <div className="logincontainer">
            {contextHolder}
            <Spin spinning={spinner} fullscreen />
            <Form initialValues={{
                remember: true,
            }} className="loginform">
                <h2>SIGN IN</h2>
                <Form.Item label="EmailId" labelCol={{
                    span: 6,
                }} wrapperCol={{
                    span: 15,
                }} required rules={[{ required: true, message: 'Enter the emailId' }]}>
                    <Input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" labelCol={{
                    span: 6,
                }} wrapperCol={{
                    span: 15,
                }} required rules={[{ required: true, message: 'Enter the emailId' }]}>
                    <Input.Password type="password" value={password} onChange={(e) => setPassword(e.target.value)} required iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />} />
                    <Button style={{ marginTop: '15%', marginRight: '9%', backgroundColor: 'ButtonShadow', zIndex: 999, width: '50%' }} onClick={doLogin}>Sign In</Button>
                </Form.Item>
                <Form.Item style={{ padding: '10px', marginTop: '-26%', marginRight: '-67%' }} >
                    <Link className="frgpwd"> Forgot password ?</Link>
                </Form.Item>
                <Form.Item style={{ padding: '10px', marginTop: '15%', marginRight: '16%', marginLeft: '19%' }}>
                    Don't have an account yet ?
                    <Link href='/signup'> Sign up</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
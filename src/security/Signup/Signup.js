
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import '../Signup/Signup.css';




const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    {/* const [address, setAddress] = useState(null);*/ }


    const doSignup = (e) => {
        console.log(e);
    }

    return (
        <div className="reg">
            <Form onSubmit={(e) => doSignup(e)} className="regform">
                <Form.Item label="First name" labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
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
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <Form.Item label="Policy terms" valuePropName="checked" required style={{ display: 'flex', marginTop: '20px', marginLeft: '10%' }}>
                    <Checkbox>I agree with E-Com brand's privacy policy terms and conditions</Checkbox>
                </Form.Item>
                <Form.Item labelCol={{
                    span: 7,
                }} wrapperCol={{
                    span: 10,
                }}>
                    <Button style={{ position: 'relative', left: '65%', backgroundColor: 'ButtonShadow' }}>Register</Button>
                </Form.Item>
                {/* <Form.Item label="Already a customer - SignIn">
                    <Link target="_blank">SignIn</Link>
                </Form.Item>*/ }
            </Form>
        </div>
    );
}

export default Signup;
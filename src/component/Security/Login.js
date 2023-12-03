import { useState } from "react";
import { Form,useNavigate } from "react-router-dom";

const Login = () => {

    var navigate = useNavigate();
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = () => {
        navigate('/home');
    };

    return (
        <div id="login-container">
            <h1>Login</h1>
                <div id="textbox">
                <i class="bi bi-people"></i>
                    <input type="text" placeholder="Username" name="" class="control-label" value=""/>
                </div>
                <div id="textbox">
                <i class="bi bi-lock-fill"></i>
                    <input type="password" placeholder="Password" name=""  value=""/>
                </div>
                <input class="primary-btn" onClick={handleSubmit} type="button" name="" value="Sign In"/>
        </div>
    );
}

export default Login;
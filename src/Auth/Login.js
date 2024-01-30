// Login.jsx

import { useState } from "react";
import '../Auth/Login.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
       navigate('/home')
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <div className="unm-form-group">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username or Mobile"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="pwd-form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="pwd" >
                    <label style={{ display:"flex", flexDirection:"row", alignItems:"center",  }} htmlFor="showpwd" className="labelpwd">Show password <input type="checkbox" htmlFor="showpwd" className="showpwd"/> </label>
                   
                </div>
                <button className="authbtn" type="submit">Authenticate</button>
            </form>
        </div>
    );
};

export default Login;

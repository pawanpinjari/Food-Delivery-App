import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import './User.css';
import axios from "axios"
import { setUser, setToken, setLoginStatus } from '../Redux/Actions/index';

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    async function submit(e) {
        e.preventDefault();
        try {

            await axios.post("http://localhost:8000/login", {
                email, password
            })
                .then(res => {
                    const data = res.data;
                    const user = [data.user]

                    if (res.data) {
                        dispatch(setUser(user));
                        dispatch(setToken(data.token));
                        dispatch(setLoginStatus(true));
                        history("/")
                    }
                    else if (res.data == "notexist") {
                        alert("User have not sign up")
                    }
                })
                .catch(e => {
                    alert("wrong details")
                   
                })

        }
        catch (e) {
            alert("wrong details")

        }

    }
    return (
        <div className='cont'>
            <br /><br />
            <div className='title-cont'>
                <p><span className='title title-log'>SWEETLY </span><span className='sub-title'>Order Your Food..!</span></p>

            </div>


            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8 main'>

                    <form action="POST">

                        <input type="text" className='box' onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                        <input type="password" className='box' onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                        <input type="submit" value='Login' onClick={submit} id="submit" />

                    </form>
                    <div className='sub-text'> You have not account please <a href="/signup">Signup Here</a></div>
                </div>

                <div className='col-md-2'></div>
            </div>
        </div>
    )
}

export default Login

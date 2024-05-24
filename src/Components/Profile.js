import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken, setLoginStatus,deleteAll,setRest } from '../Redux/Actions/index';

const Profile = () => {
    const dispatch = useDispatch()
    const history = useNavigate();
    const navigate = useNavigate();

    const userData = useSelector(state => state.user);
    const loginStatus = useSelector(state => state.isLoggedIn);

    const [image, setImage] = useState("");


    useEffect(() => {

        if (Array.isArray(userData)) {
            userData.map((e) => setImage(e.image));
        }
    }, [userData]);



    const logout = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setLoginStatus(false));
        dispatch(deleteAll());
        dispatch(setRest(null));
        setImage("")
        history("/")
    }

    return (
        <div >
            {loginStatus ? (
                Array.isArray(userData) && userData.length > 0 ? (
                    userData.map((e) => (
                        <text key={e.email} >
                            <text key={e.email} className='user-data'>
                                {
                                    image ? (
                                        <text>
                                            <img src={image} className='profile-image' alt="data" /> <br />

                                        </text>

                                    ) : (
                                        <text>
                                            <img src="./owner/profile.png" alt='data' className='profile-image' /> <br />

                                        </text>
                                    )

                                }
                                <text >
                                </text> <br />
                                <text>
                                    <span className='first-span'>Name: </span>
                                    <span>{e.name}</span>
                                </text><br />
                                <text>
                                    <span className='first-span'>Email: </span>
                                    <span>{e.email}</span>
                                </text><br />
                                <text>
                                    <span className='first-span'>Mobile: </span>
                                    <span>{e.mobile}</span>
                                </text> <br />
                                <text>
                                    <span className='first-span'>Address: </span>
                                    <span>{e.address}</span>
                                    <span>{e.addr}</span>
                                </text> <br />
                               
                                <button className='button-logout' onClick={logout}>Logout</button>
                            </text>
                        </text>

                    ))
                ) : (
                    <div >
                        <div>
                            <div>
                                <p>something went wrong please try again</p>
                                <button className='button' onClick={() => navigate("/login")}>User Login</button>
                                <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                                <button className='button' onClick={() => navigate("/signup")}>Admin</button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div >
                    <div >
                        <div>
                            <button className='button' onClick={() => navigate("/login")}>User Login</button>
                            <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                            <button className='button' onClick={() => navigate("/admin-login")}>Admin</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Profile

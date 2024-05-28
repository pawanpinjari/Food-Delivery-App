import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
    const navigate = useNavigate();

    const userData = useSelector(state => state.user);
    const loginStatus = useSelector(state => state.isLoggedIn);

    const [image, setImage] = useState("");


    useEffect(() => {

        if (Array.isArray(userData)) {
            userData.map((e) => setImage(e.image));
        }
    }, [userData]);



    return (
        <div >
            {loginStatus ? (
                Array.isArray(userData) && userData.length > 0 ? (
                    userData.map((e) => (
                        <div key={e.email}>
                            <div className='cont-image'>
                            {
                                    image ? (
                                        <div>
                                            <img src={image} className='profile-image' alt="data" /> <br />

                                        </div>

                                    ) : (
                                        <div>
                                            <img src="./owner/profile.png" alt='data' className='profile-image' /> <br />

                                        </div>
                                    )

                                }
                           
                            </div>
                            <div className='name-box'>
                                    {e.name}
                            </div>
                        </div>
   

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

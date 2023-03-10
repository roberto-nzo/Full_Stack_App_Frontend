import React from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { GiTeamIdea } from "react-icons/gi";
import { SiCodeproject } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <>
            <div className="topNav">
                <ul>
                    {user ?
                        (<>
                            <li>
                                <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                            </li>
                        </>) :
                        (<>
                            <li>
                                <Link to='/register'><FaUser /> Register</Link>
                            </li>
                            <li>
                                <Link to='/login'><FaSignInAlt /> Login</Link>
                            </li>
                        </>)}
                </ul>
            </div>

            <div className="main-title">
                <div className="title">
                    <p>Welcome {user ? user.firstname + ' ' + user.lastname : 'to School'}</p>
                </div>
            </div>

            <div className="home">
                <div className="wise">
                    <div className="be">
                        <p>Wise</p>
                        <i><GiTeamIdea /></i>
                    </div>
                </div>
                <div className="smart">
                    <div className="be">
                        <i><SiCodeproject /></i>
                        <p>Smart</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
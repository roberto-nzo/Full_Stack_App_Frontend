import { Link } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";
import { SiGoogleclassroom, SiBookstack } from "react-icons/si";
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Navs({ children }) {

    const [navOpen, setNavOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)

    return (
        <>

            <div className={'menu-btn' + (navOpen && user ? ' close' : '')} onClick={() => { setNavOpen(!navOpen) }}>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
            </div>

            <div className="content">
                <div className={"side-bar " + (navOpen && user ? 'show' : '')}>
                    <div className="profile">
                        <div className="profile-branding">
                            <a href="/">
                                <div className="portrait">
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='side-links'>
                        <div className='side-link'>
                            <Link to='/students' className='_link'><BsPeopleFill /> Students</Link>
                        </div>

                        <div className='side-link'>
                            <Link to='/classes' className='_link'><SiGoogleclassroom /> Classes</Link>
                        </div>

                        <div className='side-link'>
                            <Link to='/courses' className='_link'><SiBookstack /> Courses</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"options " + (navOpen && user ? 'show' : '')}>
                {children}
            </div>
        </>
    )
}

export default Navs
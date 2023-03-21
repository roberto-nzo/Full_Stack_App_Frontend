import { Link } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";
import { SiGoogleclassroom, SiBookstack } from "react-icons/si";
import { useState } from 'react';

function Navs({ children }) {

    const [navOpen, setNavOpen] = useState(false)

    return (
        <>
            <div className={'menu-btn' + (navOpen ? ' close' : '')} onClick={() => { setNavOpen(!navOpen) }}>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
            </div>

            <div className="content">
                <div className={"side-bar " + (navOpen ? 'show' : '')}>
                    <div className="profile">
                        <a href="/">
                            <div className="portrait">
                            </div>
                        </a>
                    </div>
                    <div className='side-links'>
                        <Link to='/students' className='side-link'><BsPeopleFill /> Students</Link>
                        <Link to='/classes' className='side-link'><SiGoogleclassroom /> Classes</Link>
                        <Link to='/courses' className='side-link'><SiBookstack />Courses</Link>
                    </div>
                </div>
            </div>

            <div className={"options " + (navOpen ? 'show' : '')}>
                {children}
            </div>
        </>
    )
}

export default Navs
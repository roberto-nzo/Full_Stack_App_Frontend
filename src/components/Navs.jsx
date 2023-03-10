import { Link } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";
import { SiGoogleclassroom, SiBookstack } from "react-icons/si";

function Navs() {
    return (
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
    )
}

export default Navs
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navs from "./components/Navs";
import Home from "./pages/home"
import Students from './pages/students/students'
import AddStudent from './pages/students/addstudent';
import Courses from './pages/courses/courses'
import Addcourse from './pages/courses/addcourse';
import Classes from './pages/classes/classes'
import Addclass from './pages/classes/addclass';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div className="container">

        {/* <div className='menu-btn'>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </div> */}

        <div className="content">

          <div className="side-bar">

            <div className="profile">
              <div className="profile-branding">
                <a href="/"><div className="portrait">

                </div></a>
              </div>
              {/* <div className="description">
                <div className="name-id">
                  <p>Roberto Nzohabonayo</p>
                  <p>ID: 20185281</p>
                </div>
                <div className="view-profile">
                  <div className="view"><a href="">View Profile</a></div>
                </div>
              </div> */}
            </div>

            <Navs />
          </div>
          <div className="options">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<Students />} />
              {/* <Route path="/addstudent" element={<AddStudent />} /> */}
              <Route path="/classes" element={<Classes />} />
              <Route path="/addclass" element={<Addclass />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/addcourse" element={<Addcourse />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
            <ToastContainer />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navs from "./components/Navs";
import Home from "./pages/home"
import Students from './pages/students/students'
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

        <Navs>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/addclass" element={<Addclass />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/addcourse" element={<Addcourse />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <ToastContainer />

        </Navs>
      </div>
    </>
  );
}

export default App;
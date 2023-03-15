import { React, useState, useEffect } from 'react'

// useSelector is used to selected something from the state
// useDispatch is used when we wanna dispatch a function like register the async thunk function or the reset function in our reducer
import { useSelector, useDispatch } from 'react-redux'

// useNavigate --> to redirect
import { useNavigate } from 'react-router-dom'

// import in app.js ToastContainer from 'react-toastify' and 'ReactToastify.css' for the toast to show up
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
    // the object has properties for each input in our form equal spelling as name attribute in the form
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        password: '',
        password2: ''
    })

    const { firstname, lastname, age, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // let's select what we want from our state using userSelector
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth) // the part of the state we are looking to get the data from is auth state, which is our global state right now

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // spread accross the previous state bcz we want all the other fields
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/students')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch]) // anything in dependency array fire off useEffet if any of this changes

    const onSubmit = (e) => {
        // prevents the form from doing a post request when it's submitted
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            // object properties come from form data
            const userData = {
                firstname,
                lastname,
                age,
                password,
                password2
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <>
            <div className="add">
                <div className="title">
                    <p><FaUser /> Register</p>
                </div>
            </div>

            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name='firstname' value={firstname} placeholder='Enter your firstname' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name='lastname' value={lastname} placeholder='Enter your lastname' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name='age' value={age} placeholder='Enter your age' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name='password' value={password} placeholder='Enter password' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className="form-control" name='password2' value={password2} placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
// useState bcz we're gonna have form field each useState will have component level state
import { React, useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa";


function AddStudent() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        password: ''
    })

    const { firstname, lastname, age, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // spread accross the previous state bcz we want all the other fields
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return <>
        <div className="add">
            <div className="title">
                <p><FaUser /> Register student</p>
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
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </div>
    </>
}

export default AddStudent
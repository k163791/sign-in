import React, { useState, useEffect } from 'react'
import { create } from './api-user'

export default function Signup() {
 
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        console.log("values: ", values)
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            console.log("data: ", data)
            if(data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, open: true, error: '' })
                alert('Account Created Successfully')
            }
        })
    }

    return(
        <div className="my-5 w-50">
            <div className="card">
                <div className="card-header">
                    Sign Up
                </div>
                <div className="card-body">
                    <form>
                        {
                            values.error && (
                                <div className="alert alert-danger">
                                    {values.error}
                                </div>
                            )
                        }
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                placeholder="email"
                                className="form-control"
                                onChange={handleChange('email')}
                            />                           
                        </div>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                onChange={handleChange('name')}
                            />                           
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={handleChange('password')}
                            />                           
                        </div>

                        <div className="form-group text-center">
                            <button
                                className="btn btn-primary"
                                onClick={clickSubmit}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
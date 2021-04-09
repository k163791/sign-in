import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { signin } from './api-auth'
import auth from './auth-helper'


export default function Signin(props) {
    
    const [ values, setValues ] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = (e) => {
        e.preventDefault()
        let user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                console.log('data: ', data)
                auth.authenticate(data, () => {
                    setValues({ ...values, redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const { redirectToReferrer } = values

    if(redirectToReferrer) {
        return (<Redirect to={ from }/>)
    }

    return(
        <div className="my-5 w-50">
            <div className="card">
                <div className="card-header">
                    SIGN IN
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
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="email"
                                className="form-control"
                                onChange={handleChange('email')}
                            />                           
                        </div>
                        <div className="form-group">
                            <label>Password</label>
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
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
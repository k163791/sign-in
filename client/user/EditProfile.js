import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import auth from '../auth/auth-helper'
import { update } from './api-user'


export default function EditProfile({ match }) {

    const [ values, setValues ] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        userId: '',
        redirectToProfile: false,
    })

    const clickSubmit = (e) => {
        e.preventDefault()
        const jwt = auth.isAuthenticated()

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        update({ userId: match.params.userId }, { t: jwt.token }, user).then((data) => {
            console.log("data: ", data)
            if(data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, userId: data._id, redirectToProfile: true })
            }
        })
    }


    if(values.redirectToProfile){
        return (<Redirect to={"/user/" + values.userId }/>)
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    return(
        <form>
            <div className="form-group">
                <label for="Name">Name</label>
                <input 
                    type="text" 
                    onChange={handleChange('name')} 
                    className="form-control"
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <label for="Email">Email</label>
                <input 
                    placeholder="Email"
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    placeholder="Email"
                />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input 
                    type="password"
                    placeholder="Password"
                    onChange={handleChange('password')}
                    className="form-control"
                />
            </div>
            <div className="form-group text-center">
                <button
                    className="btn btn-primary"
                    onClick={clickSubmit}
                >
                    Update
                </button>
            </div>
        </form>
    )
}
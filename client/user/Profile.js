import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import auth from '../auth/auth-helper'
import { read } from './api-user'
import DeleteUser from './DeleteUser'

export default function Profile({ match }) {

    const [ user, setUser ] = useState({})
    const [ redirectToSignin, setRedirectToSignin ] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = auth.isAuthenticated()

        read({ userId: match.params.userId }, { t: jwt.token }, signal).then((data) => {
            if(data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])   


    if(redirectToSignin) {
        return (<Redirect to='/signin'/>)
    }


    return(
        <div className="card">
            <div className="card-header">
                <h6>Profile</h6>
            </div>
            <div className="card-body">
                <strong>Name: </strong><p>{user.name}</p>
                <br/>
                <strong>Email: </strong><p>{user.email}</p>
                <br />
                <strong>Joined: </strong><p>{user.created}</p>
                <br/>
                {
                    auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
                        <div>
                            <a href={'/user/edit/' + user._id}>Edit</a>
                            <br />
                            {/* <a href={'/user/delete/' + user._id}>Delete</a> */}
                            <DeleteUser userId={user._id} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
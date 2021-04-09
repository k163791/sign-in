import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import auth from '../auth/auth-helper'
import { read } from './api-user'

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
        <div>
            
        </div>
    )
}
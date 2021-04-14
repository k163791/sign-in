import React, { useState } from 'react'
import { Redirect } from 'react-router'
import auth from '../auth/auth-helper'
import { remove } from './api-user'



export default function DeleteUser(props) {

    const [ open, setOpen ]= useState(false)
    const [ redirect, setRedirect ] = useState(false) 

    const clickButton = () => {
        setOpen(!open)
    }

    const deleteAccount = (e) => {
        e.preventDefault()  
        const jwt = auth.isAuthenticated()
        remove(
            { userId: props.userId }, 
            { t: jwt.token }).then((data) => {
                if(data && data.error) {
                    console.log(data.error)
                } else {
                    auth.clearJwt(() => {
                        console.log('deleted')
                    })
                    setRedirect(true)
                }
            })
    }


    if(redirect) {
        return (<Redirect to={'/'}/>)
    }

    return(
        <div className="row">
            <button
                className="btn btn-danger"
                onClick={deleteAccount}
            >
                Delete account
            </button>
            <button
                className="btn btn-default"
                onClick={clickButton}
            >
                Cancel
            </button>
        </div>
    )
}
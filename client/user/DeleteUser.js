import React, { useState } from 'react'
import { Redirect } from 'react-router'
import auth from '../auth/auth-helper'
import { remove } from './api-user'
import PropTypes from 'prop-types'

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
        <div className="row justify-content-around">
            {
                !open ?
                (
                    <button
                        className="btn btn-danger"
                        onClick={deleteAccount}
                    >
                        Delete account
                    </button>
                ): null
            }

            {
                open ? 
                (
                    <div className="text-center">
                        Are you sure ?
                        <div className="row justify-content-around">
                            <button className="btn btn-sm btn-danger">
                                Delete
                            </button>
                            <button className="btn btn-sm btn-default">
                                Cancel
                            </button>
                        </div>
                    </div>
                ): null
            }
        </div>
    )
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}
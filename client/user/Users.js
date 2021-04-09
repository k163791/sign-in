import React, { useEffect, useState } from 'react'
import { list } from './api-user'
import { Link } from 'react-router-dom'

export default function Users() {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if(data && data.error) {
                console.log('Error: ', data.error)
            } else {
                setUsers(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return(
        <div className="card">
            <div className="card-header">
                All Users
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                        users.map((item, i) => {
                            return (
                                <div key={i}>
                                    <Link to={"/user/" + item._id}>
                                        <li className="list-group-item">
                                            {item.name}
                                        </li>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
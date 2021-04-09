import React from 'react'
import unicornBikeImg from './../assets/images/unicornbike.jpg'
import { Link } from 'react-router-dom'

export default function Home(){
    return(
        <div className="card text-center">
            <h6 className="card-header font-weight-bold">
                Home Page
            </h6>
            <div className="card-body">
                <img 
                    className="w-50"
                    height="auto"
                    src={unicornBikeImg}
                />
                <p className="font-weight-bold">Welcome to home</p>
                <Link to="/users">Users</Link>
                <br/>
                <Link to="/signup">Signup</Link>
                <br/>
                <Link to="/signin"></Link>
            </div>
        </div>
    )
}
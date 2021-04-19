import React from 'react'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";



const isActive = (history, path) => {
    if (history.location.pathname == path) {
        return { color: '#ff4081'}
    } else {
        return { color: '#000000' }
    }
}

const Menu = withRouter(({history}) => (
    <div className="row justify-content-between">
        <h5>MERN SIGN IN</h5>
        <Link to='/'>
            <button style={isActive(history, "/")}>Home</button>
        </Link>
        <Link to="/users">
            <button style={isActive(history, "/users")}>Users</button>
        </Link>
        {
            !auth.isAuthenticated() &&
            (
                <div>
                    <Link to='/signup'>
                        <button style={isActive(history, '/signup')}>Sign Up</button>
                    </Link>
                    <Link to="/signin">
                        <button style={isActive(history, '/signin')}>Sign In</button>
                    </Link>
                </div>
            )
        }

        {
             auth.isAuthenticated() && 
             (
                <div>
                    
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <button style={isActive(history, '/user/' + auth.isAuthenticated().user._id )}>
                            My Profile
                        </button>
                    </Link>
                    
                    <button onClick={() => { auth.clearJwt(() => history.push('/')) }}>Sign Out</button>
                </div>
             )
        }
    </div>
))


export default Menu
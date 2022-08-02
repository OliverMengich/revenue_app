import React from "react";
import './Navigations.css'
import { Link } from "react-router-dom";
const mainNavigation = (props)=>{
    
    return(
        <header>
            <h1>Revenue App</h1>
            <nav className="navigation">
                <ul>
                <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/admins/transactions'>Transactions</Link>
                    </li>
                </ul>
            </nav>
            <div className="user">
                <button onClick={props.onSignUp} className="btn">
                    <Link to='/users/register'>Signup</Link>
                </button>
                <button onClick={props.onLogin} className="btn">
                    <Link to='/users/login'>Login</Link>
                </button>
            </div>
        </header>
    )
};
export default mainNavigation;
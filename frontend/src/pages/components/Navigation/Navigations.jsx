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
                        <Link to='/transactions'>Transactions</Link>
                    </li>
                    
                    <li>
                        <Link to='/partners'>Partners</Link>
                    </li>
                </ul>
            </nav>
            <div className="user">
                <button onClick={props.onSignUp} className="btn">
                    <Link to='/signup'>Signup</Link>
                </button>
                <button onClick={props.onLogin} className="btn">
                    <Link to='/login'>Login</Link>
                </button>
            </div>
        </header>
    )
};
export default mainNavigation;
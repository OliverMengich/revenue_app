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
                <h3>UserLogo</h3>
            </div>
        </header>
    )
};
export default mainNavigation;
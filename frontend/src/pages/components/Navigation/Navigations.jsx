import React,{useContext} from "react";
import './Navigations.css'
import { Link } from "react-router-dom";
// import AuthContext from "../../../context/auth-context";
import AuthContext from "../../../context/auth-context";
const MainNavigation = (props)=>{
    const context = useContext(AuthContext)
    return(
        <header>
            <h1>Revenue App</h1>
            {
                context.token &&(
                    <nav className="navigation">
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/admins/transactions'>Transactions</Link>
                            </li>
                        </ul>
                        <div className="user">
                            <button onClick={context.logout} className="btn">
                                LogOut
                            </button>
                        </div>
                    </nav>
                )
            }
            {/* {
                !context.token &&(
                    <div className="user">
                        <button className="btn">
                            <Link to='/users/login'>Login</Link>
                        </button>
                    </div> 
                )
            }  */}
        </header>
    )
};
export default MainNavigation;
import React,{useContext} from "react";
import './Navigations.css'
import { Link } from "react-router-dom";
import AuthContext from "../../../../context/auth-context";
const UserNavigation = (props)=>{
    const context =useContext(AuthContext);
    return(
        <header>
            <h1>Revenue App</h1>
            {
                !context.usertoken &&(
                    <div className="user">
                        <button className="btn">
                            <Link to='/user/register'>Signup</Link>
                        </button>
                        <button className="btn">
                            <Link to='/user/login'>Login</Link>
                        </button>
                    </div>
                )
            }
            
            {
                context.usertoken &&(
                    <div className="user">
                        <button onClick={context.userlogout} className="btn">
                            LogOut
                        </button>
                    </div>
                )
            }
            
        </header>
    )
};
export default UserNavigation;
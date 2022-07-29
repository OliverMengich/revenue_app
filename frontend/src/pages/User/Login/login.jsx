import React from "react";
import './login.css';
import MainNavigation from "../../../components/Navigation/Navigations";
class  Login extends React.Component{
    
    loginSubmitHandler = async (event)=>{
        event.preventDefault();
        console.log(event.target.value)
    }
    state={
        passwordVissible: false
    }
    togglePasswordVissibilityHandler = ()=>{
        this.setState({passwordVissible: !this.state.passwordVissible})
    }
    render(){
    return(
        <React.Fragment>
            <div className="register__page">
                <MainNavigation/>
                <div className="register-container">
                    
                    <form onSubmit={this.loginSubmitHandler}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">ID Number</span>
                                <input type="number" placeholder="Enter number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <div className="password__section">
                                    <input type="password" placeholder="Enter password" required />
                                    <i onClick={this.togglePasswordVissibilityHandler} className={ this.state.passwordVissible?"fa fa-eye": "fa fa-eye-slash"}></i>
                                </div>
                            </div>
                            
                        </div>
                        <input className="button" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )}
}
export default Login;
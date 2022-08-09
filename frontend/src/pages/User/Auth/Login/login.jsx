import React from "react";
import './login.css';

import AuthContext from "../../../../context/auth-context";
import UserNavigation from "../../components/Navigation/Navigations";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.idnumber = React.createRef();
        this.password = React.createRef();
    }
    static contextType=AuthContext;
    loginSubmitHandler = async (event)=>{
        event.preventDefault();
        const idnumber = this.idnumber.current.value;
        const password = this.password.current.value;
        //set up prop types
        if(idnumber.trim().length === 0 || password.trim().length ===0){
            throw new Error("Cannot be null or empty")
        }
        let requestBody;
        requestBody={
            query: `query {
                login(IDNumber: ${idnumber}, password: "${password}"){
                    userId
                    usertoken
                    tokenExpiration
                }
            }`
        }
        fetch('http://localhost:8000/users',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            console.log(res);
            if(res.status !== 200 && res.status !==201){
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData=>{
            this.setState({
                errorMessageVissible: false
            })
            // console.log(resData.errors);
            this.context.userlogin(
                resData.data.login.usertoken,
                resData.data.login.userId,
            );
            // console.log(this.context)
        })
        .catch(err=>{
            // console.log(err)
            this.setState({
                errorMessageVissible: true
            })
        })
    }
    state={
        passwordVissible: false,
        passwordType: 'password',
        errorMessageVissible: false 
    }
    togglePasswordVissibilityHandler = ()=>{
        this.setState({
            passwordVissible: !this.state.passwordVissible
        })
        if(!this.state.passwordVissible){
            this.setState({
                passwordType: 'text'
            })
        }else{
            this.setState({
                passwordType: 'password'
            })
        }
    }
    render(){
    return(
        <React.Fragment>
            <div className="register__page">
                <UserNavigation/>
                {
                    this.state.errorMessageVissible &&(
                        <p>Error encountered: Try Again</p>
                    )
                }
                
                <div className="register-container">
                    
                    <form onSubmit={this.loginSubmitHandler}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">ID Number</span>
                                <input type="number" ref={this.idnumber} placeholder="Enter your ID number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <div className="password__section">
                                    <input ref={this.password} type={this.state.passwordType} placeholder="Enter password" required />
                                    <i onClick={this.togglePasswordVissibilityHandler} className={ this.state.passwordVissible?"fa fa-eye-slash": "fa fa-eye"}></i>
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
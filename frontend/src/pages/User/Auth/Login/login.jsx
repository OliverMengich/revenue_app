import React from "react";
import './login.css';
// import MainNavigation from "../../../components/Navigation/Navigations";
import MainNavigation from "../../../components/Navigation/Navigations";
import AuthContext from "../../../../context/auth-context";
class  Login extends React.Component{
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
                    token
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
            if(res.status !== 200 && res.status !==201){
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData=>{
            console.log(this.context);
            this.context.login(
                resData.data.login.token,
                resData.data.login.userId,
            );
            console.log(this.context)
        })
        .catch(err=>{
            console.log(err)
        })
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
                                <input type="number" ref={this.idnumber} placeholder="Enter your ID number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <div className="password__section">
                                    <input ref={this.password} type="password" placeholder="Enter password" required />
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
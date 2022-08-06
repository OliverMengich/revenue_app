import React from 'react';
import './confirm-phonenumber.css';
import MainNavigation from '../../../components/Navigation/Navigations';
import UserRegistrationContext from '../../../../context/user_registration-context';
import { Navigate } from 'react-router-dom';
class ConfirmPhoneNumber extends React.Component {
    static contextType = UserRegistrationContext;
    constructor(props){
        super(props);
        this.passedCode = React.createRef();
    }
    async componentDidMount() {
        await console.log(this.context)
    }
    state={
        sendingMessageStatus: false,
        verificationCode: null,
        redirectToLogin: false
    }
    generateCodeHandler = ()=>{
        //send a request to the backend to verify the phonenumber
        console.log(this.context.phoneNumber)
        let requestBody={
            query :`
                query{
                    verifyPhoneNumber(phoneNumber: "${this.context.phoneNumber}"){
                        message
                        randomNumber
                        phoneNumber
                    }
                }
            `
        }
        fetch('http://localhost:8000/users',{
            method:'POST',
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
            console.log(resData);
            this.setState({ 
                verificationCode: resData.data.verifyPhoneNumber.randomNumber,
                sendingMessageStatus: true
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    confirmNumberPassedHandler = (event) =>{
        event.preventDefault();
        if(this.passedCode.current.value === this.state.verificationCode){
            //1. first register the user to our Database
            let requestBody;
            requestBody={
                query: `
                    mutation{
                        createUser(userInput:{name:"${this.context.name}", email:"${this.context.email}",phoneNumber: "${this.context.phoneNumber}",IDNumber:"${this.context.IDNumber}", age: "${this.context.age}",dateOfBirth:"${this.context.dateOfBirth}", imageUrl:"${this.context.imageFileValue}", password:"${this.context.password}"}){
                            name
                        }
                    }
                `
            }
            fetch('http://localhost:8000/users',{
                method:'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res=>{
                if(res.status !== 200 && res.status !==201){
                    throw new Error("Failed");
                }
                return res.json();
            }).then(resData=>{
                console.log(resData);
                this.setState({
                    redirectToLogin: true,
                })
            })
            .catch(err=>{
                console.log(err)
            })
            //redirect user to login page
            
        }else{
            alert("Verification code passed is not correct :( try again")
            throw new Error("Verification Code Error")
        }
    }
    render(){
        return (
            <React.Fragment>
                <MainNavigation />
                <div className="register-container">
                    <div className='information__detail'>
                        <h2>Verify that {this.context.phoneNumber} is your phonenumber</h2>
                        <p>Click on the button below</p>
                        {
                            (this.state.sendingMessageStatus) &&( 
                                <p className={this.state.verificationCode ==null ? 'verification__status_failed': 'verification__status'}>
                                    {
                                        this.state.verificationCode ==null? this.context.failureMessage: this.context.successMessage
                                    }
                                </p>
                            )
                        }
                        <button onClick={this.generateCodeHandler} className='button'>Generate code</button>
                        { 
                        this.state.verificationCode !== null? (
                            <form onSubmit={this.confirmNumberPassedHandler}>
                                <div className='user-details'>
                                    <div className="input-box">
                                        <span className="details">Enter generated Code here</span>
                                        <input required type="number" ref={this.passedCode} placeholder="Enter Confirmation Code you received ;-)" />
                                    </div>
                                </div>
                                <input type="submit" value="Submit" className="button"/>
                            </form>) : ''
                        }
                    </div>
                </div>
                {
                    this.state.redirectToLogin &&(
                        <Navigate to="/users/login"/>
                    )
                }
            </React.Fragment>
        );
    }
}
export default ConfirmPhoneNumber;

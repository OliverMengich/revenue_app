import React from 'react';
import './confirm-phonenumber.css';
import MainNavigation from '../../../components/Navigation/Navigations';
import UserRegistrationContext from '../../../../context/user_registration-context';
class ConfirmPhoneNumber extends React.Component {
    static contextType = UserRegistrationContext;
    async componentDidMount() {
        await console.log(this.context)
    }
    state={
        sendingMessageStatus: false,
        verificationCode: null
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
                verificationCode: resData.data.verifyPhoneNumber.randomNumber
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    confirmNumberPassedHandler = (event, passedCode) =>{
        event.preventDefault();
        if(passedCode === this.state.verificationCode){
            //redirect user to login page
            this.setState({
                redirectToLogin: true,
            })
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
                            (this.context.sendingMessageStatus) &&( 
                                <p className={this.context.verificationCode ==null ? 'verification__status_failed': 'verification__status'}>
                                    {
                                        this.context.verificationCode ==null? this.context.failureMessage: this.context.successMessage
                                    }
                                </p>
                            )
                        }
                        <button onClick={this.generateCodeHandler} className='button'>Generate code</button>
                        {/* { 
                        props.verificationCode !== null? (
                            <form onSubmit={this.confirmNumberPassedHandler( passedCode)}>
                                <div className='user-details'>
                                    <div className="input-box">
                                        <span className="details">Enter generated Code here</span>
                                        <input required type="number" value={passedCode} onChange={e=>setPassedCode(e.target.value)} placeholder="Enter Staff ID No." />
                                    </div>
                                </div>
                                <input type="submit" value="Submit" className="button"/>
                            </form>) : ''
                        } */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ConfirmPhoneNumber;

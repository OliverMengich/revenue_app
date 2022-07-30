import React from "react";
import { Navigate } from "react-router-dom";
import './Register.css';

import MainNavigation from "../../../components/Navigation/Navigations";
import ConfirmPhoneNumber from "../ConfirmPhoneNumber/confirm-phonenumber";
class  Register extends React.Component{
    constructor(props){
        super(props);
        this.video = React.createRef()
        this.canvas = React.createRef()
        // this.imageFile = React.createRef()
        this.surname =React.createRef();
        this.othernames =React.createRef();
        this.idnumber =React.createRef();
        this.email =React.createRef();
        this.phonenumber =React.createRef();
        this.age =React.createRef();
        this.genderselect =React.createRef();
        this.password = React.createRef();
        this.confirmpassword = React.createRef()
    }
    state={
        pressed: false,
        imageFileValue: '',
        sendingMessageStatus: false,
        verificationCode: null,
        redirectToLogin: false
    }
    captureImageHandler = async () =>{
        if(this.state.pressed === false){
            // let stream = new MediaStream()
            let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            this.video.srcObject =stream;
            this.setState({pressed: !this.state.pressed});
        }else{
            this.video.pause();
            console.log(this.canvas);
            this.canvas.current.getContext('2d').drawImage(this.video,0,0, this.canvas.width, this.canvas.height);
            let image_data_url = this.canvas.current.toDataURL()
            this.setState({imageFileValue: image_data_url});
            // console.log(typeof(image_data_url))
            console.log(image_data_url);
            this.setState({pressed: !this.state.pressed});
            console.log(this.state);
        }
    }
    setImageFileValHandler = (event) =>{
        console.log(event.target.value)
    }
    generateCodeHandler = async (phoneNumber)=>{
        //send a request to the backend to verify the phonenumber
        console.log(phoneNumber)
        let requestBody={
            querry:`
                query{
                    verifyPhoneNumber(phoneNumber: ${phoneNumber}){
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
            this.setState({ verificationCode: resData.data.verifyPhoneNumber.randomNumber})
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
    registerSubmitHandler = async (event)=>{
        event.preventDefault();
        const surname = this.surname.current.value;
        const othernames = this.othernames.current.value;
        const idnumber = this.idnumber.current.value;
        const phoneNumber = this.phonenumber.current.value;
        const email = this.email.current.value;
        const genderselect = this.genderselect.current.value;
        const password =this.password.current.value;
        const confirmpassword = this.confirmpassword.current.value;
        console.log(surname, othernames,idnumber,)
        //setup the prop types
        if(password !== confirmpassword){
            throw new Error("Passwords don't Match")
        }
        <ConfirmPhoneNumber 
            phoneNumber={phoneNumber} 
            surname={surname}
            othernames={othernames}
            idnumber={idnumber}
            email={email}
            genderselect={genderselect}
            password={password}
            successMessage = "Verification code sent"
            failureMessage = "Failed! kindly check the number you entered"
            verificationCode = {this.state.verificationCode}
            sendingMessageStatus = {this.state.sendingMessageStatus}
            generateCodeHandler = {this.generateCodeHandler}
            confirmNumberPassedHandler ={this.confirmNumberPassedHandler}/>
        console.log(event.target.value)
    }
    render(){
    return(
        <React.Fragment>
            <div className="register__page">
                <MainNavigation/>
                <div className="register-container">
                    
                    <form action="/register" onSubmit={this.registerSubmitHandler}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">SurName</span>
                                <input ref={this.surname}  type="text" placeholder="Kenyatta" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Other Names</span>
                                <input ref={this.othernames} type="text" placeholder="Uhuru Muigai" required />
                            </div>
                            <div className="input-box">
                                <span className="details">ID Number</span>
                                <input ref={this.idnumber} type="number" placeholder="Enter number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input ref={this.email} type="text" placeholder="Enter your email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input ref={this.phonenumber} type="text" pattern="[0-9]{4}[0-9]{6}" maxLength="10" placeholder="e.g 0710235787" />    
                            </div>
                            <div className="input-box">
                                <span className="details">Age</span>
                                <input ref={this.age} type="number" placeholder="Enter your age" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Image</span>
                                <div className="image-section">
                                    <video ref={video => {this.video = video}} width="320" height="240" autoPlay>
                                        <canvas ref={this.canvas} width="320" height="240"></canvas>
                                    </video>
                                    {/* <input ref={this.imageFile} type="file" hidden accept=".jpg, .png"/> */}
                                    <input type="text" hidden value={this.state.imageFileValue} onChange={this.setImageFileValHandler} required/>
                                    <button className="button" onClick={this.captureImageHandler}> 
                                        {
                                            this.state.pressed? 'Take Another': 'Capture'
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="input-box">
                                <label  className="details">Gender</label>
                                <select ref={this.genderselect} id="gender">
                                    <option value="male">MALE</option>
                                    <option value="female">FEMALE</option>
                                    <option value="other">OTHER</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input ref={this.password} type="text" placeholder="Enter your password" required />
                            </div>
                            
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input ref={this.confirmpassword} type="text" placeholder="confirm password" required />
                            </div>
                        </div>
                        <input className="button" type="submit" value="Register" />
                    </form>
                </div>
            </div>
            {
                this.state.redirectToLogin ? <Navigate to='/login' /> : ''
            }
        </React.Fragment>
    )}
}
export default Register;
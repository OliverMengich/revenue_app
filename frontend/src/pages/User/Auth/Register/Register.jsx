import React from "react";
// import { Navigate } from "react-router-dom";
import './Register.css';
import RegistrationContext from "../../../../context/user_registration-context";
// import ConfirmPhoneNumber from "../ConfirmPhoneNumber/confirm-phonenumber";
import UserNavigation from "../../components/Navigation/Navigations";
class  Register extends React.Component{
    constructor(props){
        super(props);
        this.video = React.createRef()
        this.canvas = React.createRef()
        // this.imageFile = React.createRef()
        this.surname =React.createRef();
        this.othernames =React.createRef();
        this.IDNumber =React.createRef();
        this.email =React.createRef();
        this.phonenumber =React.createRef();
        this.age =React.createRef();
        this.genderselect =React.createRef();
        this.password = React.createRef();
        this.confirmpassword = React.createRef()
        this.dateOfBirth = React.createRef()
    }
    state={
        pressed: false,
        imageFileValue: '',
        verificationCode: null,
        redirectToConfirmPhoneNumber: false,
        surname: '',
        othernames: '',
        IDNumber: null,
        email: '',
        phoneNumber: '',
        age: null,
        genderselect: '',
        password: '',
        dateOfBirth: '',
        userImage: ''
    }
    
    setImageFileValHandler = (event) =>{
        console.log(event.target.value)
    }
    handleFileSubmit= async(e)=>{
        await this.setState({
            imageFileValue: URL.createObjectURL(e.target.files[0]),
            userImage: e.target.files[0]
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
                        createUser(userInput:{name:"${this.context.name}", email:"${this.context.email}",phoneNumber: "${this.context.phoneNumber}",IDNumber:${this.context.IDNumber}, age: ${this.context.age},dateOfBirth:"${this.context.dateOfBirth}", imageUrl:"${this.context.imageFileValue}", password:"${this.context.password}"}){
                            name
                        }
                    }
                `
            }
            fetch('http://localhost:8000/users',{
                method:'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=--------------------------28947758',
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
    registerSubmitHandler = async (event)=>{
        event.preventDefault();
        const surname = this.surname.current.value;
        const othernames = this.othernames.current.value;
        const IDNumber = this.IDNumber.current.value;
        const phoneNumber = this.phonenumber.current.value;
        const email = this.email.current.value;
        const genderselect = this.genderselect.current.value;
        const password =this.password.current.value;
        const age = this.age.current.value;
        const dateOfBirth = this.dateOfBirth.current.value;
        const confirmpassword = this.confirmpassword.current.value;
        console.log(dateOfBirth,surname, othernames,IDNumber,phoneNumber, email,genderselect,password,confirmpassword)
        //setup the prop types
        if(password !== confirmpassword){
            throw new Error("Passwords don't Match")
        }
        await this.setState((prevState)=>{
            return {
                ...prevState,
                redirectToConfirmPhoneNumber: true,
                password,
                surname,
                othernames,
                IDNumber,
                phoneNumber,
                email,
                genderselect,
                age,
                dateOfBirth
            }
        });
        let requestBody;
        console.log(typeof(this.state.userImage));
        
        requestBody={
            query: `
                mutation{
                    createUser(userInput:{surname:"${this.state.surname}",othernames:"${this.state.othernames}" email:"${this.state.email}",phoneNumber: "${this.state.phoneNumber}",IDNumber:${this.state.IDNumber}, age: ${this.state.age},dateOfBirth:"${this.state.dateOfBirth}", imageUrl:"${this.state.userImage.toString()}", password:"${this.state.password}"}){
                        surname
                    }
                }
            `
        }
        // console.log(requestBody);
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
    }
    render(){
    return(
        <React.Fragment>
            <RegistrationContext.Provider
                value={{
                    phoneNumber: this.state.phoneNumber,
                    surname: this.state.surname,
                    othernames: this.state.othernames,
                    IDNumber: this.state.IDNumber,
                    email: this.state.email,
                    genderselect: this.state.genderselect,
                    password: this.state.password,
                    dateOfBirth: this.state.dateOfBirth,
                    successMessage: "Verification code sent",
                    failureMessage: "Failed! kindly check the number you entered",
                    verificationCode : this.state.verificationCode,
                    imageFileValue: this.state.imageFileValue,
                }}
            >
                <div className="register__page">
                    <UserNavigation />
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
                                    <input ref={this.IDNumber} type="number" placeholder="Enter ID number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input ref={this.email} type="email" placeholder="Enter your email" required />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="date">Choose an Image</label>
                                    <input type="file" onChange={this.handleFileSubmit} capture accept="image/*"/>
                                    <div className="image-section">
                                        <img height="300" width="300" src={this.state.imageFileValue} alt="this_user" />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <label htmlFor="date">Date Of Birth</label>
                                    <input type="date" id="date" name="date" required placeholder="Date of birth" ref={this.dateOfBirth}/>
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input ref={this.phonenumber} type="text" pattern="[0-9]{4}[0-9]{6}" maxLength="10" placeholder="e.g 0710235787" />    
                                </div>
                                <div className="input-box">
                                    <span className="details">Age</span>
                                    <input ref={this.age} type="number" maxLength="2" placeholder="Enter your age" required />
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
                {/* {
                    this.state.redirectToConfirmPhoneNumber? (
                        <ConfirmPhoneNumber />
                    ): (
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
                                            <input ref={this.idnumber} type="number" placeholder="Enter ID number" required />
                                        </div>
                                        <div className="input-box">
                                            <span className="details">Email</span>
                                            <input ref={this.email} type="email" placeholder="Enter your email" required />
                                        </div>
                                        <div className="input-box">
                                            <label htmlFor="date">Choose an Image</label>
                                            <input type="file" onChange={this.handleFileSubmit} capture accept="image/*"/>
                                            <div className="image-section">
                                                <img height="300" width="300" src={this.state.imageFileValue} alt="this_user" />
                                            </div>
                                        </div>
                                        <div className="input-box">
                                            <label htmlFor="date">Date Of Birth</label>
                                            <input type="date" id="date" name="date" placeholder="Date of birth" ref={this.dateOfBirth}/>
                                        </div>
                                        <div className="input-box">
                                            <span className="details">Phone Number</span>
                                            <input ref={this.phonenumber} type="text" pattern="[0-9]{4}[0-9]{6}" maxLength="10" placeholder="e.g 0710235787" />    
                                        </div>
                                        <div className="input-box">
                                            <span className="details">Age</span>
                                            <input ref={this.age} type="number" maxLength="2" placeholder="Enter your age" required />
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
                    )
                } */}
            </RegistrationContext.Provider>
            
        </React.Fragment>
    )}
}
export default Register;
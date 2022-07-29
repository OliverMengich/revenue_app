import React from "react";
import './Register.css';

import MainNavigation from "../../../components/Navigation/Navigations";
class  Register extends React.Component{
    constructor(props){
        super(props);
        this.video = React.createRef()
        this.canvas = React.createRef()
        // this.imageFile = React.createRef()
    }
    state={
        pressed: false,
        imageFileValue: ''
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
    registerSubmitHandler = async (event)=>{
        event.preventDefault();
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
                                <input  type="text" placeholder="Kenyatta" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Other Names</span>
                                <input  type="text" placeholder="Uhuru Muigai" required />
                            </div>
                            <div className="input-box">
                                <span className="details">ID Number</span>
                                <input type="number" placeholder="Enter number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" placeholder="Enter your email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" pattern="[0-9]{4}[0-9]{6}" maxLength="10" placeholder="e.g 0710235787" />    
                            </div>
                            <div className="input-box">
                                <span className="details">Age</span>
                                <input type="number" placeholder="Enter your age" required />
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
                                <select id="gender">
                                    <option value="male">MALE</option>
                                    <option value="female">FEMALE</option>
                                    <option value="other">OTHER</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="text" placeholder="Enter your password" required />
                            </div>
                            
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input type="text" placeholder="confirm password" required />
                            </div>
                        </div>
                        <input className="button" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )}
}
export default Register;
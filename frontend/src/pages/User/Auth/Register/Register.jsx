import React from "react";
import './login.css';
// import MainNavigation from "../../components/Navigation/Navigations";
import MainNavigation from "../../../components/Navigation/Navigations";
function Login(){
    return(
        <React.Fragment>
            <MainNavigation/>
            <div className="register-container">
                <h1 className="title">Sign Up</h1>
                
                <form action="/register" method="POST">
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
                            <input type="text" pattern="[0-9]{4}[0-9]{6}" maxlength="10" placeholder="e.g 0710235787" required />    
                        </div>
                        <div className="input-box">
                            <span className="details">Age</span>
                            <input type="number" placeholder="Enter your age" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Image</span>
                            <div className="image-section">
                                <video id="video" width="320" height="240" autoplay>
                                    <canvas id="canvas" width="320" height="240"></canvas>
                                </video>
                                <input id="imageFile" type="file" hidden accept=".jpg, .png" required />
                                <button className="button" id="click-photo">Take Photo</button>
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
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </React.Fragment>
    )
}
export default Login;
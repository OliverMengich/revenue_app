import React from 'react';
import './confirm-phonenumber.css';
import MainNavigation from '../../../components/Navigation/Navigations';
const ConfirmPhoneNumber = (props)=>{
    return (
        <React.Fragment>
            <MainNavigation />
            <div className="register-container">
                <div className='information__detail'>
                    <h2>Verify that +254741954425 is your phonenumber</h2>
                    <p>Click on the button below</p>
                    <p className="verification__status_failed">Verification code sent!!</p>
                    <button onClick={props.generateCodeHandler.bind(this,props.phoneNumber)} className='button'>Generate code</button>
                    <form onSubmit={props.confirmPhoneNumberHandler}>
                        <div className='user-details'>
                            <div className="input-box">
                                <span className="details">Enter generated Code here</span>
                                <input type="number" placeholder="Enter Staff ID No." required />
                            </div>
                        </div>
                        <input type="submit" value="Submit" className="button"/>
                    </form>
                </div>
                {/* this box should only render when there is a successfull message  */}

                
                
            </div>
        </React.Fragment>
    );
}
export default ConfirmPhoneNumber;

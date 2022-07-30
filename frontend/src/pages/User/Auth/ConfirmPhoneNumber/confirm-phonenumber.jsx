import React, {useState} from 'react';
import './confirm-phonenumber.css';
import MainNavigation from '../../../components/Navigation/Navigations';

const ConfirmPhoneNumber = (props)=>{
    const [passedCode, setPassedCode] = useState(null);
    return (
        <React.Fragment>
            <MainNavigation />
            <div className="register-container">
                <div className='information__detail'>
                    <h2>Verify that {props.phoneNumber} is your phonenumber</h2>
                    <p>Click on the button below</p>
                    {
                        (props.sendingMessageStatus) &&( 
                            <p className={props.verificationCode ==null ? 'verification__status_failed': 'verification__status'}>
                                {
                                    props.verificationCode ==null? props.failureMessage: props.successMessage
                                }
                            </p>
                        )
                    }
                    <button onClick={props.generateCodeHandler.bind(this,props.phoneNumber)} className='button'>Generate code</button>
                    { 

                    props.verificationCode !== null? (
                        <form onSubmit={props.confirmNumberPassedHandler.bind(this, passedCode)}>
                            <div className='user-details'>
                                <div className="input-box">
                                    <span className="details">Enter generated Code here</span>
                                    <input required type="number" value={passedCode} onChange={e=>setPassedCode(e.target.value)} placeholder="Enter Staff ID No." />
                                </div>
                            </div>
                            <input type="submit" value="Submit" className="button"/>
                        </form>) : ''
                    }
                </div>
            </div>
        </React.Fragment>
    );
}
export default ConfirmPhoneNumber;

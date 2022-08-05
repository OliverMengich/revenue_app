import React from "react";
import './HomePage.css'
import UserNavigation from "../components/Navigation/Navigations";
class UserHomePage extends React.Component{
    render() {
        return(
            <React.Fragment>
                <UserNavigation/>
                <div className="user__nav">
                    <h1>My Transactions</h1>
                </div>
                <div className="body-contents">
                    <h3>Amount: 1000</h3>
                    <div>
                        <h3>DueDate</h3>
                    </div>
                    <div>
                        <h3 className="paid">Paid</h3>
                    </div>
                </div>
                <div className="body-contents">
                    <h3>Amount: 2000</h3>
                    <div>
                        <h3>DueDate</h3>
                    </div>
                    <div>
                        <h3 className="pending">Pending</h3>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default UserHomePage;
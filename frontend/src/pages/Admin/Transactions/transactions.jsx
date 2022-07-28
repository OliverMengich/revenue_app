import React, {Component, Fragment} from "react";
import MainNavigation from "../../components/Navigation/Navigations";
import './transactions.css';
// import UserDetail from "../../User detail/user-detail";
class Transactions extends Component{
    state={

    }
    userDetailNav= ()=>{
        console.log("you clocked me")
    }
    render() {
        return(
            <Fragment>
                <MainNavigation/>
                <div className="body-container">
                    <div onClick={this.userDetailNav} className="body-contents">
                        <h1>Jane Doe</h1>
                        <div>
                            <h3>No of Transactions: 3</h3>
                        </div>
                        <div>
                            <h3>Latest Transactions: <span>Pending</span></h3>
                        </div>
                    </div>
                    
                </div>
            </Fragment>
        )
    }
}
export default Transactions;
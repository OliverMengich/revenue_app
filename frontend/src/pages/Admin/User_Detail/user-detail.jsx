import React from "react";
import './user-detail.css'
import MainNavigation from "../../components/Navigation/Navigations";
function UserDetail(){
    return (
        <React.Fragment>
            <MainNavigation/>
            <div className="user__detail__container">
                <div className="user__list">
                    <div className="user_image">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="user" />
                    </div>
                    <div className="user__items">
                        <h1>Jane Doe</h1>
                        <h2>37546727</h2>
                        <h3>janedoe@gmail.com</h3>
                    </div>
                </div>
                <div>
                    <div className="user__body-contents">
                        <h1>Jane Doe</h1>
                        <div>
                            <h3>No of Transactions: 3</h3>
                        </div>
                        <div>
                            <h3>Latest Transactions: <span>Pending</span></h3>
                        </div>
                    </div>
                    <div className="user__body-contents">
                        <h1>Jane Doe</h1>
                        <div>
                            <h3>No of Transactions: 3</h3>
                        </div>
                        <div>
                            <h3>Latest Transactions: <span>Pending</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserDetail;
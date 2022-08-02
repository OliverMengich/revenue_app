import React from "react";
import './user-detail.css'
// import MainNavigation from "../../components/Navigation/Navigations";
function UserDetail(props){
    console.log(props)
    return (
        <React.Fragment>
            <div className="user__detail__container">
                <div className="user__list">
                    <div className="user_image">
                        <img src={props.user.imageUrl} alt="user" />
                    </div>
                    <div className="user__items">
                        <h1>{props.user.othernames}</h1>
                        <h2>{props.user.IDNumber}</h2>
                    </div>
                </div>
                <div>
                    {
                        props.user.transactionsId.map(transactionsId=>{
                            return(
                                <div className="user__body_contents">
                                    <h2>{transactionsId.amount} Ksh</h2>
                                    <div>
                                        <h3>{transactionsId.dueDate}</h3>
                                    </div>
                                    <div>
                                        <h3>Transaction: <span>{transactionsId.paid? 'Paid': 'Pending'} </span></h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserDetail;
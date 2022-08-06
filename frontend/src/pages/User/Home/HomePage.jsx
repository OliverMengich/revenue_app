import React from "react";
import './HomePage.css'
import UserNavigation from "../components/Navigation/Navigations";
import AuthContext from "../../../context/auth-context";
class UserHomePage extends React.Component{
    state={
        transactions: [],
        errorMessage: null
    }
    static contextType= AuthContext;
    componentDidMount(){
        this.fetchUserTransactions();
    }
    fetchUserTransactions = () =>{
        //1. first register the user to our Database
        console.log(this.context.userId);
        let requestBody;
        requestBody={
            query: `
                query{
                    getuserTransactions(userId: "${this.context.userId}"){
                        paid
                        amount
                        dueDate
                        _id
                    }
                }
            `
        }
        fetch('http://localhost:8000/users',{
            method:'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.context.usertoken
            }
        })
        .then(res=>{
            // console.log(res);
            if(res.status !== 200 && res.status !==201){
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData=>{
            console.log(resData);
            this.setState({
                transactions: resData.data.getuserTransactions
            })
            console.log(this.state);
        })
        .catch(err=>{
            console.log(err)
            // this.setState({
            //     errorMessage: err.me
            // })
        })
        //redirect user to login page
        
    }
    payTransactionHandler=(transactionId,bankIdVerification)=>{
        let requestBody;
        requestBody={
            query: `
                query{
                    makeTransaction(transactionId: ${transactionId},bankIdVerification: ${bankIdVerification}){
                        paid
                        amount
                        dueDate
                        _id
                    }
                }
            `
        }
        fetch('http://localhost:8000/users',{
            method:'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.context.usertoken
            }
        })
        .then(res=>{
            // console.log(res);
            if(res.status !== 200 && res.status !==201){
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData=>{
            console.log(resData);
            this.setState({
                transactions: resData.data.getuserTransactions
            })
            console.log(this.state);
        })
        .catch(err=>{
            console.log(err)
            // this.setState({
            //     errorMessage: err.me
            // })
        })
    }
    render() {
        return(
            <React.Fragment>
                <UserNavigation/>
                <div className="user__nav">
                    <h1>My Transactions</h1>
                    <p>Error encountered</p>
                </div>
                {
                    this.state.transactions.map((transaction)=>{
                        return(
                            <div className="body-contents">
                                <h3>Amount: {transaction.amount}</h3>
                                <div>
                                    <h3>DueDate: {transaction.dueDate}</h3>
                                </div>
                                {
                                    transaction.paid?(
                                        <h3 className="paid">Paid</h3>
                                    ):(
                                        <button onClick={this.payTransactionHandler(transaction._id)} className='pending'>Click to pay</button>
                                    )
                                }
                                
                            </div>
                        )
                    })
                }
                
            </React.Fragment>
        )
    }
}
export default UserHomePage;
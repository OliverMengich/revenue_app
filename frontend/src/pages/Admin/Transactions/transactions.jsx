import React, {Component, Fragment} from "react";
import MainNavigation from "../../components/Navigation/Navigations";
import './transactions.css';
// import UserDetail from "../../User detail/user-detail";
import SearchBar from "../../components/SearchBar/SearchBar";
class Transactions extends Component{
    state={
        transactions: [],
        selectedTransaction: null
    }
    componentDidMount(){
        this.fetchUsers()
    }
    fetchUsers = ()=>{
        let requestBody;
        requestBody={
            query: `
                query{
                    getTransactions{
                        _id
                        to{
                            othernames
                            IDNumber
                        }
                        dueDate
                        amount
                        paid
                    }
                }
            `
        }
        fetch('http://localhost:8000/admins',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status !== 200 && res.status !==201){
                throw new Error("Failed");
            }
            return res.json();
        })
        .then(resData=>{
            console.log(resData);
            this.setState({
                transactions:resData.data.getTransactions
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    userDetailNav= ()=>{
        console.log("you clicked me")
    }
    searchUser=async(searchValue)=>{
        console.log(typeof(parseInt(searchValue)));
        const userTransactions =this.state.transactions.filter(e=>e.to.IDNumber===parseInt(searchValue));
        console.log(userTransactions)
        
    }
    render() {
        return(
            <Fragment>
                <MainNavigation/>
                <SearchBar searchUser={this.searchUser}/>
                {
                    this.state.transactions.map(transaction=>{
                        return(
                            <div key={transaction._id} className="body-container">
                                <div onClick={this.userDetailNav} className="body-contents">
                                    <h3>{transaction.to.othernames}</h3>
                                    <div>
                                        <h3>{transaction.dueDate}</h3>
                                        <h3>Amount: {transaction.amount}</h3>
                                    </div>
                                    <div>
                                        <h3 className={transaction.paid?'paid':'pending'}>{transaction.paid?'Paid':'Pending'}</h3>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}
export default Transactions;
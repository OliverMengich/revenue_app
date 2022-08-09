import React, {Component, Fragment} from "react";
import MainNavigation from "../../components/Navigation/Navigations";
import './transactions.css';
// import UserDetail from "../../User detail/user-detail";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/modal/Modal";
import AddTransactionsComponent from "../../components/AddTransactions/add-transaction";
import Backdrop from "../../components/Backdrop/Backdrop";
class Transactions extends Component{
    constructor(props){
        super(props);
        this.userID = React.createRef();
        this.amount=React.createRef();
        this.dueDate = React.createRef();
    }
    state={
        transactions: [],
        selectedTransaction: null,
        creatingTransaction: false,
        specificUser:null,
        isLoading: false,
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
            // console.log(resData);
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
        const userTransactions =this.state.transactions.filter(e=>(e.to.IDNumber).toString().includes(searchValue));
        if(searchValue.length !== 0){
            if(userTransactions.length !==0){
                await this.setState({
                    transactions: userTransactions
                })
            }else{
                await this.fetchUsers();
            }
        }else{
            await this.fetchUsers();
        }
    }
    
    addTransactionToUserHandler= async(to,amount,dueDate)=>{
        console.log(to,amount,dueDate);
        let requestBody;
        requestBody={
            query: `
                mutation{
                    createTransaction(transaction:{to:"${to}", amount:${amount}, dueDate: "${dueDate}"}){
                        to{
                            othernames
                            IDNumber
                        }
                        amount
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
            // this.fetchUsers()
            this.setState({
                creatingTransaction: !this.state.creatingTransaction
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    addTransactionHandler=async()=>{
        await this.setState({
            creatingTransaction: true
        })
    }
    searchUserIDHandler=async(event)=>{
        event.preventDefault();
        this.setState({
            isLoading: true
        })
        const userID =this.userID.current.value;
        let requestBody;
        requestBody={
            query: `
                query{
                    getuser(IDNumber: ${userID}){
                        othernames
                        IDNumber
                        _id
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
                isLoading: false,
                specificUser: resData.data.getuser
            })
        })
        .catch(err=>{
            this.setState({
                isLoading: false,
            })
            console.log(err);
        })
    }
    render() {
        return(
            <Fragment>
                <MainNavigation/>
                <SearchBar searchUser={this.searchUser}/>
                <AddTransactionsComponent addTransactionHandler = {this.addTransactionHandler} />
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
                {
                    this.state.creatingTransaction &&(
                        <Backdrop/>
                    )
                }
                {
                    this.state.creatingTransaction &&(
                        <Modal>
                            <header className='modal__header'>
                                    <h1>Add</h1>
                            </header>
                            <section className='modal__content'>
                                <form onSubmit={this.searchUserIDHandler}>           
                                    <div className="form-control">
                                        <input required autoFocus ref={this.userID} type="number" placeholder="ID Number of User"/>
                                        <input required autoFocus ref={this.amount} type="number" placeholder="Amount"/>
                                        <input required autoFocus ref={this.dueDate} type="date" placeholder="Amount"/>
                                        <button type='submit' value="Search"> &#128269; Search</button>
                                    </div>
                                </form>
                                {
                                    this.state.specificUser &&(
                                        <div onClick={this.addTransactionToUserHandler(this.state.specificUser._id,this.amount.current.value,this.dueDate.current.value)} className="body-contents">
                                            <h2>{this.state.specificUser.othernames}</h2>
                                            <h2>{this.state.specificUser.IDNumber}</h2>
                                        </div>
                                    )
                                }
                            </section>
                            <section onClick={e=>{this.setState({creatingTransaction: !this.state.creatingTransaction})}} className='modal__actions'>
                                <button className='btn'>Cancel</button>
                            </section>
                        </Modal>
                    )
                }
            </Fragment>
        )
    }
}
export default Transactions;
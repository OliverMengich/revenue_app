import React, {Component} from "react";
// import {Link} from "react-router-dom";
import MainNavigation from "../../components/Navigation/Navigations";
import './Users.css';
import Modal from "../../components/modal/Modal";
import Backdrop from "../../components/Backdrop/Backdrop";
class Home extends Component{
    state={
        buttonClicked: false,
        selectedUser: null,
        users:[],
        redirectToUserDetail: false
    }
    backdropRender= async(eventId)=>{
        await this.setState(prevState=>{
            let selectedUser = prevState.users.find(e=>e._id===eventId)
            return{
                ...prevState,
                buttonClicked: !this.state.buttonClicked,
                selectedUser: selectedUser
            }
        })
        console.log(this.state)
    }
    componentDidMount(){
        this.fetchUsers();
    }
    cancelModalHandler = async()=>{
        await this.setState({
            selectedUser: null,
            buttonClicked: !this.state.buttonClicked
        })
        console.log(this.state)
    }
    confirmModalHander =(userId)=>{
        //navigate to a page, pass in the users ID
        console.log(userId);
        this.setState({
            redirectToUserDetail: true
        })
    }
    fetchUsers = ()=>{
        let requestBody;
        requestBody={
            query: `
                query{
                    getusers{
                        _id
                        othernames
                        IDNumber
                        imageUrl
                        email
                        transactionsId{
                            dueDate
                            paid
                            amount
                        }
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
            console.log(resData)
            this.setState({
                users:resData.data.getusers
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    signUpHandler =()=>{
        this.props.history.push('/signup');
    }
    LoginHandler =()=>{
        this.props.history.push('/login');
    }
    render() {
        return(
            <div>
                <MainNavigation />
                <div className="body-container">
                    {
                        this.state.users.length !== 0 ?(
                            this.state.users.map(user=>{
                                return(
                                <div key={user.IDNumber} className="users__list">
                                    <div className="users_image">
                                        <img src={ user.imageUrl.toString() } alt={user.IDNumber} />
                                    </div>
                                    <div className="users__items">
                                        <h1>{user.othernames}</h1>
                                        <h2>{user.IDNumber}</h2>
                                        <h3>{user.email}</h3>
                                    </div>
                                    <button onClick={this.backdropRender.bind(this,user._id)} className="btn">View Details</button>
                                </div>
                                )
                            })
                        ): <h1>No users found</h1>
                    }
                    {
                        this.state.buttonClicked &&(
                            <Backdrop/>
                        ) 
                    }
                    {
                        this.state.buttonClicked &&(
                            <Modal _id={this.state.selectedUser._id} onConfirm={this.confirmModalHander} onCancel={this.cancelModalHandler}>
                                <header className='modal__header'>
                                    <h1>{this.state.selectedUser.othernames}</h1>
                                </header>
                                <section className='modal__content'>
                                    <img src={this.state.selectedUser.imageUrl} alt="user" />            
                                    <h3>{this.state.selectedUser.email}</h3>
                                    <h4>Latest Transaction: <span>{this.state.selectedUser.transactionsId[0].paid? 'Paid': 'Pending'}</span></h4>
                                </section>
                            </Modal>
                        )
                        
                    }
                </div>
            </div>

        )
    }
}
export default Home;
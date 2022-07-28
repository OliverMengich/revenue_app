import React, {Component} from "react";
import MainNavigation from "../../components/Navigation/Navigations";
import './Users.css';
import Modal from "../../components/modal/Modal";
import Backdrop from "../../components/Backdrop/Backdrop";
class Home extends Component{
    state={
        buttonClicked: false,
        selectedUser: []
    }
    backdropRender=()=>{
        this.setState({
            buttonClicked: !this.state.buttonClicked
        })
    }
    cancelModalHandler =()=>{
        this.setState({
            buttonClicked: !this.state.buttonClicked
        })
    }
    confirmModalHander =(userId)=>{
        //navigate to a page, pass in the users ID

    }
    render() {
        return(
            <div>
                <MainNavigation/>
                
                <div className="body-container">
                    <div className="users__list">
                        <div className="users_image">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="user" />
                        </div>
                        <div className="users__items">
                            <h1>Jane Doe</h1>
                            <h2>37546727</h2>
                            <h3>janedoe@gmail.com</h3>
                        </div>
                        <button onClick={this.backdropRender} className="btn">View Details</button>
                    </div>
                    <div className="users__list">
                        <div className="users_image">
                            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="user" />
                        </div>
                        <div className="users__items">
                            <h1>John Doe</h1>
                            <h2>36546727</h2>
                            <h3>johndoe@gmail.com</h3>
                        </div>
                        {
                            this.state.buttonClicked &&(
                                <Backdrop/>
                            ) 
                        }
                        {
                            this.state.buttonClicked &&(
                                <Modal onConfirm={this.confirmModalHander} onCancel={this.cancelModalHandler}/>
                            )
                            
                        }
                        
                        <button onClick={this.backdropRender} className="btn">View Details</button>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;
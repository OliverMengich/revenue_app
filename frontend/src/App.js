import './App.css';
import React, {Component} from 'react';
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import Transactions from './pages/Admin/Transactions/transactions';
import Home from './pages/Admin/Home/Users';
// import Login from './pages/Admin/Login/login';
import Login from './pages/User/Auth/Login/login';
import UserDetail from './pages/Admin/User_Detail/user-detail';
import FileHandler from './pages/User/Files_handler/file-hander';
import Register from './pages/User/Auth/Register/Register';
import AuthContext from './context/auth-context';
import AdminLogin from './pages/Admin/Login/admin-login';
import UserHomePage from './pages/User/Home/HomePage';
import NotFound from './pages/User/components/404/404';
class App extends Component{
  state={
    token: null,
    administratorId: null,
    usertoken: null,
    userId: null
  }
  login=(token, administratorId)=>{
    this.setState({
      administratorId,
      token,
    })
  }
  logout=()=>{
    this.setState({
      administratorId: null,
      token: null
    })
  }
  userLogin = (usertoken,userId)=>{
    this.setState({
      usertoken,
      userId
    })
  }
  userlogout=()=>{
    this.setState({
      usertoken: null,
      userId: null
    })
  }
    render(){
      return(
        <BrowserRouter>
          <AuthContext.Provider value={{
              token: this.state.token,
              administratorId: this.state.administratorId,
              login: this.login,
              logout: this.logout,

              usertoken: this.state.usertoken,
              userId: this.state.userId,
              userlogin: this.userLogin,
              userlogout: this.userlogout
          }}>
            <Routes>
              <Route path='/' element={this.state.token? <Home/>: <AdminLogin/> }/>
              <Route path="/admin/login" element={this.state.token?<Navigate to="/" /> :<AdminLogin/> }/>
              
              <Route path='/file-submit' element={<FileHandler/>} />
              <Route path='/admins/users/user-detail' element={this.state.token?<Navigate to="/" /> : <UserDetail/>} />
              <Route path='/admins/transactions' element={this.state.token?<Transactions/> : <AdminLogin/> } />
              {/* <Route path='/admins/transactions' element={<Transactions/> } /> */}
              <Route path='*' element={<NotFound/>} />
              <Route path='/user/login' element={this.state.usertoken? <Navigate to='/user'/> :<Login/>}/>
              <Route path='/user' element={this.state.usertoken? <UserHomePage/> : <Navigate to='/user/login'/>}/>
              <Route path='/user/register' element={this.state.usertoken? <Navigate to='/user'/> :<Register/>} />
            </Routes>
          </AuthContext.Provider>
          
        </BrowserRouter>
      )
    }
}

export default App;


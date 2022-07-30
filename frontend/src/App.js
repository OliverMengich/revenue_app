import './App.css';
import React, {Component} from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Transactions from './pages/Admin/Transactions/transactions';
import Home from './pages/Admin/Home/Users';
import Login from './pages/Admin/Login/login';
import UserDetail from './pages/Admin/User_Detail/user-detail';
import FileHandler from './pages/User/Files_handler/file-hander';
import Register from './pages/User/Auth/Register/Register';
import ConfirmPhoneNumber from './pages/User/Auth/ConfirmPhoneNumber/confirm-phonenumber';
class App extends Component{
    render(){
      return(
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              {/* <Route path="/signup" element={}/> */}
              <Route path="/login" element={<Login/>}/>
              <Route path='/register' element={<Register/>} />
              <Route path='/confirm-phonenumber' element={<ConfirmPhoneNumber/>} />
              <Route path='/file-submit' element={<FileHandler/>} />
              <Route path="/user-detail" element={ <UserDetail/>} />
              <Route path='/transactions' element={<Transactions/>} />
          </Routes>
        </BrowserRouter>
      )
    }
}

export default App;


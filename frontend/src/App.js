import './App.css';
import React, {Component} from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Transactions from './pages/Admin/Transactions/transactions';
import Home from './pages/Admin/Home/Users';
class App extends Component{
    render(){
      return(
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/transactions' element={<Transactions/>} />
          </Routes>
        </BrowserRouter>
      )
    }
}

export default App;


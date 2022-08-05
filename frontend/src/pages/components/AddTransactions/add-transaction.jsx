import React from 'react';
import './add-transactions.css';
const AddTransactionsComponent = (props)=>{
    return(
        <div className='add-transactions'>
            <button onClick={props.addTransactionHandler} className='btn'><span> &#43;</span>Add Tax to a User</button>
        </div>
    )
}
export default AddTransactionsComponent;
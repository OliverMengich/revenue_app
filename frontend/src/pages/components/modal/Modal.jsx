import React from 'react';
import './Modal.css'
const modal = props=>(
    <div className='modal'>
        {/* <header className='modal__header'>
            <h1>John Doe</h1>
        </header>
        <section className='modal__content'>
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="user" />            
            <h3>Contact: +254741954425</h3>
            <h4>Latest Transaction: <span>Pending</span></h4>
        </section> */}
        {
            props.children
        }
        <section className='modal__actions'>
            <button onClick={props.onCancel} className='btn'>Cancel</button>
            <button onClick={props.onConfirm.bind(this, props._id)} className='btn'>View More</button>
        </section>
    </div>
)
export default modal;
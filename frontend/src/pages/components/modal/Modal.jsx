import React from 'react';
import './Modal.css'
const Modal = props=>(
    <div className='modal'>
        {
            props.children
        }
        <section className='modal__actions'>
            <button onClick={props.onCancel} className='btn'>Cancel</button>
            <button onClick={props.onConfirm.bind(this, props._id)} className='btn'>View More</button>
        </section>
    </div>
)
export default Modal;
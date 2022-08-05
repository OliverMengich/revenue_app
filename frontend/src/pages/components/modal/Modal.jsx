import React from 'react';
import './Modal.css'
const Modal = props=>(
    <div className='modal'>
        {
            props.children
        }
    </div>
)
export default Modal;
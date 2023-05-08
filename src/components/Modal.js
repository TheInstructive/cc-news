import React, { useState } from 'react'

export default function Modal(props) {


  return (
    <div onClick={props.button} className='modal'>
        <div className='modal-container'>
            <div className='modal-top'>
                <h2>{props.modalTitle}</h2>
                <button>CLOSE</button>
            </div>

            <div className='modal-content'> 
                {props.modalContent}
            </div>
        </div>
    </div>
  )
}

import React from 'react'
import '../App.css';

export default function CollectionItem(props) {
  return (
    <div className='collection-item'>
    <h3>{props.collectionName}</h3>
    <img src={props.collectionImage}></img>
    <button onClick={props.buttonClick}>SELECT</button>
    </div>
  )
}

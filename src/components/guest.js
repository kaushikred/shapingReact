import React from 'react';

const Guest = (props) => {
    
    return (         
        <li >{
          props.isEditing ? <input  
            type="text"
            onChange={props.handleNameEdits} 
            value={props.name}/> : 
            <span>{props.name}</span>
         }
         
          <label>
            <input 
              type="checkbox" 
              onChange={props.handleConfirmation}
              checked={props.isConfirmed} /> Confirmed
          </label>
          <button onClick={props.handleEditing}>
          {props.isEditing ? 'save' : 'edit'}</button>
          <button onClick={props.handleremoveGuest}>remove</button>
        </li>
    )
}

export default Guest;
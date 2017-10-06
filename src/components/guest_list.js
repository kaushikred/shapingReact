import React from 'react';
import Guest from './guest';

const GuestList = (props) => {
    return (
        <ul>
        {
        props.guests
        .filter(guest =>  !props.isFiltered || guest.isConfirmed)
        .map((guest,index) =>           
        <Guest
            key={guest.id}
            handleNameEdits={e => props.setNameAt(e.target.value,guest.id)}
            isEditing={guest.isEditing}
            handleEditing = {()=>props.toggleEditingAt(guest.id)} 
            handleConfirmation={()=>props.toggleConfirmationAt(guest.id)}
            handleremoveGuest = {() => props.removeGuest(guest.id)}
            name={guest.name} 
            isConfirmed={guest.isConfirmed} />
        )}
      </ul>
    )
}

export default GuestList;
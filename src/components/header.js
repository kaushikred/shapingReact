import React from 'react';

const Header = (props) => {
    return (
        <header>
        <h1>RSVP</h1>
        
        <form onSubmit={props.newGuestSubmitHandler}>
            <input
              onChange={props.handNameInput} 
              type="text" 
              value={props.pendingGuest} placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
    )
}

export default Header;
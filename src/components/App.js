
import React, {Component} from 'react';
import '../App.css';
import GuestList from './guest_list';
import Counter from './counter';
import Header from './header';

class  App extends Component {
 
  constructor (props){
    super(props);
    this.state = {
      isFiltered: false,
      pendingGuest: "",
      guests: []
    }
  }

  lastGuestId = 0;

  newGuestId = () => {
    let id = this.lastGuestId;
    this.lastGuestId += 1 ;
    return id;
  }

  toggleGuestPropertyAt = (property,indexToChange) =>{
    this.setState({
      guests: this.state.guests.map((guest,index) => {
        if(guest.id === indexToChange){
          return{
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })  
    })

  }



  toggleConfirmationAt = (index) => {
    this.toggleGuestPropertyAt('isConfirmed',index)
  }

  toggleEditingAt = (index) => {
    this.toggleGuestPropertyAt('isEditing',index)
  }

  setNameAt = (name,indexToChange) =>{
    this.setState({
      guests: this.state.guests.map((guest,index) => {
        if(guest.id === indexToChange){
          return {
            ...guest,
            name: name
          }
        }
        return guest
      })
    })
  }
  
  toggleFilter = () => {
    this.setState({ isFiltered : ! this.state.isFiltered})
  }

  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id = this.newGuestId();
    //This will add to the first while .concat add it to the last
    this.setState({
      guests: [
        {
          id,
          name:  this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }
  
  handNameInput = e => {
    
    this.setState({
      pendingGuest : e.target.value
    })
  }

  removeGuest = (indexToRemove) => {
    console.log(indexToRemove)
    this.setState({
      guests: this.state.guests.filter((guest,index)=> guest.id !== indexToRemove)
    })
    //Or
      // guests: [
      //   ...this.state.guests.slice(0,index),
      //   ...this.state.guests.slice(index+1)
      // ]
  }

  getTotalInvited = () => this.state.guests.length;
  getUnconfirmed = () =>{
    var guesting = 0;
    this.state.guests.forEach(guest => guest.isConfirmed ? ++guesting: guesting)
    return guesting;
  }
  getAttendingGuests = () =>{
    return this.state.guests.reduce((total,guest)=> guest.isConfirmed ? total + 1 : total , 0
    )

  }
  // getUnconfirmedGuests = () =>
  
  render() {
    const numberAttending = this.getAttendingGuests();
    return (
      <div className="App">
      <Header 
        newGuestSubmitHandler= {this.newGuestSubmitHandler}
        handNameInput = {this.handNameInput}
        pendingGuest = {this.state.pendingGuest}/>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input
              onChange={this.toggleFilter} 
              checked = {this.state.isFiltered} 
              type="checkbox" /> Hide those who haven't responded
          </label>
        </div>
        <Counter 
          getUnconfirmed={this.getUnconfirmed}
          numberAttending= {numberAttending}
          total={this.state.guests.length}/>
        <GuestList
          toggleEditingAt= {this.toggleEditingAt} 
          setNameAt = {this.setNameAt}
          removeGuest = {this.removeGuest}
          isFiltered = {this.state.isFiltered}
          toggleConfirmationAt={this.toggleConfirmationAt} 
          guests={this.state.guests}/>
      </div>
    </div>
      ) 
  }
  
}




export default App;

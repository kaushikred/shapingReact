import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


const Card = (props) => {
  return (
    <div style={{ margin : '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft:10}}>
        <div style={{fontSize:'1.25em'}}>{props.name}</div>
        <div>{props.company} </div>
      </div>
      
    </div>
  ) 
}

const CardList = (props) =>{
  return(
    <div >
        {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}



class Form extends Component {
  state = { userName: '' }
  handleSubmit = (event) =>{
    event.preventDefault();
    console.log("Event:",this.state.userName)
    axios.get('https://api.github.com/users/'+ this.state.userName )
      .then(resp =>{
        
        this.props.onSubmit(resp.data)
        this.setState({ userName: ''})
      })
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
        value = {this.state.userName}
        onChange ={(event)=> this.setState({userName:  event.target.value})  }
        type="text" placeholder="Github username" required />
        <button type="submit" >Add Card </button>
      </form>
    )
  }
}

class App extends Component {
  state = {
     cards:[
    ]
  }

  addNewCard = (cardInfo) =>{
    console.log(cardInfo)
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
    
  }
  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> React</h2>
        </div>

      </div>
      
      <br/>
      <Form onSubmit={this.addNewCard} />
      <CardList cards={this.state.cards}/>
      
      </div>
     
    );
  }
}




export default App;

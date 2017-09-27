import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Form, FormControl, Button, Grid, Row,Col,Thumbnail } from 'react-bootstrap';


const Stars = (props)=>{
  const numberOfStars = 1 + Math.floor(Math.random()*9) ;
  // let stars = [];
  // for (let i=0; i<numberOfStars;i++){
  //   stars.push(<i key={i} className="fa fa-star"/>)
  // }
  return (
    <div >
      {_.range(numberOfStars).map(i =>
        <i key={i} className="fa fa-star"></i>
      )}
    </div>
  )
}

const ButtonC = (props)=>{
  return (
    <div >
      <button>=</button>
    </div>
  )
}

const Answer = (props)=>{
  return (
    <div >
      <span>5</span>
      <span>6</span>
    </div>
  )
}


const Numbers = (props) => {
  return(
    <Thumbnail >
      {Numbers.list.map((number,i)=>
        <span key={i}>{number}</span>
      )}
    </Thumbnail>
  )
}

Numbers.list =  _.range(1,10);


class Game extends Component {
  render(){
    return (
      <div >
       <h3>Play nine</h3>
       <hr/>
       <div >
      
       <Grid>
        <Row className="show-grid">
          <Col xs={12} md={5}> <Stars /></Col>
          <Col xs={6} md={2}> <ButtonC /></Col>
          <Col xs={6} md={5}>  <Answer /></Col>

        </Row>
       </Grid>
       <br/>
       <Numbers />
       </div>
       
      </div>
    )
    
  }
}

class App extends Component {
  
  render() {
    return (
      <div className="App">
      
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> React</h2>
        </div>
      <br/>
      <div className="container">
      <Game />
      </div>
      
      </div>
    );
  }
}




export default App;

import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Form, FormControl, Button, Grid, Row,Col,Thumbnail } from 'react-bootstrap';


const Stars = (props)=>{
  // let stars = [];
  // for (let i=0; i<numberOfStars;i++){
  //   stars.push(<i key={i} className="fa fa-star"/>)
  // }
  return (
    <div >
      {_.range(props.randomNumberOfStars).map(i =>
        <i key={i} className="fa fa-star"></i>
      )}
    </div>
  )
}


const ButtonC = (props)=>{
  
  return (
    <div >
      
      <Button disabled={props.selectedNumbers.length === 0}>=</Button>
    </div>
  )
}

const Answer = (props)=>{
  return (
    
    <div >
      {props.selectedNumbers.map((number,i) =>
        
        <span key={i} onClick={()=>props.unSelectNumber(number)}>{number}</span>
      )}
    </div>
  )
}


const Numbers = (props) => {
  const numberClassName = (number) =>{
    if(props.selectedNumbers.indexOf(number) >= 0){
      return 'selected';
    }
  }
  return(
    <Thumbnail >
      {Numbers.list.map((number,i)=>
        <span key={i} className={numberClassName(number)}
              onClick={() => props.selectNumber(number)}>{number}</span>
      )}
    </Thumbnail>
  )
}

Numbers.list =  _.range(1,10);


class Game extends Component {
  state = {
    selectedNumbers : [],
    randomNumberOfStars: 1 + Math.floor(Math.random()*9) 
  };
  selectNumber = (clickedNumber) =>{
    if(this.state.selectedNumbers.indexOf(clickedNumber)>=0) return;
    this.setState(prevState =>({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  }

  unSelectNumber = (clickedNumber) => {
    this.setState(prevState =>({
      selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }

  render(){
    const { selectedNumbers, randomNumberOfStars} = this.state;
    return (
      <div >
       <h3>Play nine</h3>
       <hr/>
       <div >
      
       <Grid>
        <Row className="show-grid">
          <Col xs={12} md={5}> <Stars randomNumberOfStars={randomNumberOfStars}/></Col>
          <Col xs={6} md={2}> <ButtonC selectedNumbers={selectedNumbers} /></Col>
          <Col xs={6} md={5} >  <Answer selectedNumbers={selectedNumbers} 
                                        unSelectNumber={this.unSelectNumber}/></Col>

        </Row>
       </Grid>
       <br/>
       <Numbers selectedNumbers={selectedNumbers}
                selectNumber={this.selectNumber}/>
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

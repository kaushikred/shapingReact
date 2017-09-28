import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Form, FormControl, Button, Grid, Row,Col,Thumbnail } from 'react-bootstrap';


var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
  let button;
  switch(props.answerIsCorrect){
    case true:
      button = 
      <Button bsStyle="success" 
        onClick={props.acceptAnswer}
        disabled={props.selectedNumbers.length === 0}>
        <i className="fa fa-check"></i>
      </Button>
      break;
    case false:
      button = 
      <Button bsStyle="danger" disabled={props.selectedNumbers.length === 0}>
         <i className="fa fa-times"></i>
      </Button>
      break;
    default:
      button = 
      <Button  
      onClick = {props.checkAnswer}
      disabled={props.selectedNumbers.length === 0}>=</Button>
      break;
  }
  return (
    <div className="text-center">
      {button}
      <br/><br/>
      <Button 
      onClick={props.redraw}
      disabled={props.redraws === 0}
      bsStyle="warning"><i className="fa fa-refresh"></i>{props.redraws}</Button>
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

const DoneFrame = (props) => {
  return(
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <Button onClick={props.reset}>Play Again</Button>
    </div>
    
  )
}


const Numbers = (props) => {
  const numberClassName = (number) =>{
    if(props.usedNumbers.indexOf(number) >= 0){
      return 'used';
    }
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
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers : [],
    usedNumbers: [],
    randomNumberOfStars:Game.randomNumber(),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  });
  state = Game.initialState();

  reset = () => this.setState(Game.initialState());
  selectNumber = (clickedNumber) =>{

    if(this.state.usedNumbers.indexOf(clickedNumber)>=0 || this.state.selectedNumbers.indexOf(clickedNumber)>=0) return;
    this.setState(prevState =>({
      answerIsCorrect:null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  }

  unSelectNumber = (clickedNumber) => {
    this.setState(prevState =>({
      answerIsCorrect:null,
      selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }

  checkAnswer = () => {
    
    this.setState(prevState => ({
      answerIsCorrect : prevState.randomNumberOfStars === 
        prevState.selectedNumbers.reduce((acc,n)=> acc+n,0)
    }))

  }

  acceptAnswer = () =>{
    console.log("here")
    this.setState(prevState =>({
      usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      randomNumberOfStars:Game.randomNumber(),
      answerIsCorrect: null
    }),this.updateDoneStatus)

  }

  redraw = () =>{
    if(this.state.redraws === 0) return;
    this.setState(prevState => ({
      randomNumberOfStars:Game.randomNumber(),
      selectedNumbers : [],
      answerIsCorrect: null,
      redraws:prevState.redraws - 1
    }), this.updateDoneStatus)

  }

  possibleSolutions({randomNumberOfStars,usedNumbers}){
   const possibleNumbers = _.range(1,10).filter(number => usedNumbers.indexOf(number) == -1)

   return possibleCombinationSum(possibleNumbers,randomNumberOfStars)

  }


  updateDoneStatus = () =>{
    console.log("in update DoneStatus")
    this.setState(prevState =>{
      if( prevState.usedNumbers.length == 9){
        return {doneStatus: 'Done, Nice!'}
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return {doneStatus: 'Game Over!'}
      }
    })
  }
  render(){
    const { selectedNumbers, randomNumberOfStars, answerIsCorrect,usedNumbers,redraws,doneStatus } = this.state;
    return (
      <div >
       <h3>Play nine</h3>
       <hr/>
       <div >
      
       <Grid>
        <Row className="show-grid">
          <Col xs={12} md={5}> <Stars randomNumberOfStars={randomNumberOfStars}/></Col>
          <Col xs={6} md={2}> <ButtonC selectedNumbers={selectedNumbers} 
                                       redraw={this.redraw}
                                       redraws={redraws}
                                       checkAnswer={this.checkAnswer}
                                       acceptAnswer={this.acceptAnswer}
                                       answerIsCorrect={answerIsCorrect}/></Col>
          <Col xs={6} md={5} >  <Answer selectedNumbers={selectedNumbers} 
                                        unSelectNumber={this.unSelectNumber}/></Col>

        </Row>
       </Grid>
       <br/>
       {doneStatus ? 
        <DoneFrame doneStatus= {doneStatus}
                   reset={this.reset}/>:
        <Numbers selectedNumbers={selectedNumbers}
                selectNumber={this.selectNumber}
                usedNumbers={usedNumbers}/>
        }
       
       
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

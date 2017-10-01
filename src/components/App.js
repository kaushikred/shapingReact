
import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';




class  App extends Component {
  
  render() {
    return (
      <div>
       
      <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2> React</h2>
        </div>
        <br/>
        <BookList />
        <BookDetail />
      </div>
      </div>
      ) 
  }
  
}




export default App;

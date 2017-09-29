import React, { Component } from 'react';
import { Form,FormGroup, FormControl } from 'react-bootstrap';

//Using ES6 syntactic suga... {Component} is actually const Component = React.Component;

class SearchBar extends Component {
    constructor (props) {
       super(props);

       this.state = { term: ''};
    } 
    render() {
        return (
            <input
            placeholder="Search Videos"
            type="text" 
            onChange = {event => this.onInputChange(event.target.value)}
            value = {this.state.term}
            />
        )
    }

    onInputChange(term){
        
         this.setState({term})
         this.props.onSearchTermChange(term)

    }

    
}

export default SearchBar;


// <form className="search">
// <FormGroup>
//     <FormControl
//     placeholder="Search Videos"
//     type="text" 
//     value = {this.state.term}
//     onChange = {event => this.setState({term : event.target.value})}/>
// </FormGroup>
// </form>


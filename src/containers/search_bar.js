import React, {Component} from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';
import { connect } from 'react-redux';

 class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {term: ''}

        this.onInputChange = this.onInputChange.bind(this)

        this.onFormSubmit = this.onFormSubmit.bind(this)
    }
    onInputChange(event){
        
        this.setState({term: event.target.value})
       
    }
    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);

        this.setState({term:''})

    }

    render(){
        return(
            <div>
                <form onSubmit={this.onFormSubmit} inline>
              
                  <input
                    value = {this.state.term}
                    onChange= {this.onInputChange} 
                    type="text" 
                    placeholder="Get a five day forecast in of your favorite city" />
              
               
                <Button type="submit">
                  Search
                </Button>
              </form>
            </div>
        )
    }
}

function mapDispatchtoProps(dispatch){
    return bindActionCreators({fetchWeather},dispatch);
}

export default connect (null, mapDispatchtoProps)(SearchBar)



//If you pass a callback 'this.onInputChange' that makes a reference to 'this'
// in this case 'this.setState({term: event.target.value})' then we need to
//bind it
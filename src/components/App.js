
import React, {Component} from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostsIndex from './posts_index';
import PostsNew from './posts_new';
import PostsShow from './posts_show';


class  App extends Component {

  
  render() {
    return (
        <BrowserRouter>
          <div>
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route  path="/" component={PostsIndex} />
          </Switch>
          </div>
        </BrowserRouter>
      ) 
  }
  
}




export default App;

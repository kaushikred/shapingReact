
import React, {Component} from 'react';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCI-e6ZWhlD-NEvFO0ebQ9oTOQovJf43zg' ;


class  App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      videos : [],
      selectedVideo : null
    };

  this.videoSearch('Game of thrones')

  }

  videoSearch(term){
    YTSearch({key: API_KEY,term:term}, (videos)=>{
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      }) 
   //   this.setState({ videos }) 
    })
  }


  render() {

    const videoSearch = _.debounce((term) => {
      this.videoSearch(term)
    },400)
    return (
      <div>
       
      <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2> React</h2>
        </div>
        <br/>
        <div className="search">
          <SearchBar onSearchTermChange={videoSearch}/>
        </div>
        <VideoDetail video={this.state.selectedVideo}/>
        <div >
        <VideoList 
          onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
          videos={this.state.videos}/>
        </div>
      </div>
      </div>
      ) 

  }
  
}




export default App;

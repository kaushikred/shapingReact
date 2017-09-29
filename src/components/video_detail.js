import React from 'react';
import { ResponsiveEmbed } from 'react-bootstrap';


const VideoDetail = ({video}) => {
    if(!video){
        return <div>Loading.. </div>
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div>
            <ResponsiveEmbed a16by9>
            <embed type="image/svg+xml" src={url} />
          </ResponsiveEmbed>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    )

}

export default VideoDetail;
import React, { Component } from "react";
import "./Gallery.css";
import config from '../../config';

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      groupGalleryImages: []
    };
  }
  getImages() {
    let groupIDImages = [];
    fetch("https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=" +
      config.REACT_APP_API_KEY + "&group_id=" + this.props.match.params.groupID + "&per_page=20&format=json&nojsoncallback=1")
      .then(response => response.json())
      .then(j => j.photos.photo.map(pic => {
        var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
        return <div key={pic.secret}><img alt="pic" width="100%" src={srcPath} key={pic.secret} /> </div>;
      })).then(grpImages => {
        groupIDImages.push(grpImages);
        this.setState({ groupGalleryImages: groupIDImages });
      }).catch(e => console.error(e));
  }

  componentWillReceiveProps() {
    this.getImages()
  }

  componentDidMount() {
    console.log(this.props.match.params.groupID);
    this.getImages()

  }


  render() {
    return (

      <div className="gal">
        {
          (this.state.groupGalleryImages) ?
            (this.state.groupGalleryImages) :
            <p>Loading...</p>
        }
      </div>
    );
  }
}

export default Gallery;

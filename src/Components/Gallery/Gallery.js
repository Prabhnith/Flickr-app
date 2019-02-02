import React, { Component } from "react";
import "./Gallery.css";
import StackGrid from "react-stack-grid";

const REACT_APP_API_KEY = "cd7182a2e83351df21c02d6c0e4f2d9e";
class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    // alert(REACT_APP_API_KEY);
    //  Each group card will contain its name, avatar and some images of that group
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
      REACT_APP_API_KEY +
      "&tags=nyc&per_page=20&page=1&format=json&nojsoncallback=1")
      .then(function (response) {
        return response.json();
      }).then(
        function (j) {
          let picArray = j.photos.photo.map(pic => {
            var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret +".jpg";
            return <div key={pic.secret}><img width="100%" alt="dogs" src={srcPath} key={pic.secret} /> </div>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  }

  render() {
    return (

      <StackGrid columnWidth={350} gutterWidth={7}>
        {this.state.pictures}
      </StackGrid>

    );
  }
}

export default Gallery;

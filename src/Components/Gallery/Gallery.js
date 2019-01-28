import React, { Component } from "react";
import "./Gallery.css";

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
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        REACT_APP_API_KEY +
        "&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1"
    )
      .then(function(response) {
        return response.json();
      })
      .then(
        function(j) {
          //   alert(JSON.stringify(j));
          let picArray = j.photos.photo.map(pic => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img alt="dogs" src={srcPath} />;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  }

  render() {
    return (
      <div class="container-fluid">
        <nav class="navbar navbar-nav navbar-default">
          <div className="col-lg-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for..."
              />
              <span className="col-lg-4 input-group-btn">
                <button className="btn btn-primary" type="button">
                  Search Groups
                </button>
              </span>
            </div>
          </div>
        </nav>
        <div className="col-md-12">
          <div className="row">
            <hr />

            <div className="gal">{this.state.pictures}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;

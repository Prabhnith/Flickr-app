import React, { Component, Fragment } from "react";
import "./Gallery.css";
import config from '../../config';

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      groupGalleryImages: [],
      scrolledAmount: 0,
      nextPageImages: [],
      pageNum: 1,
      appendImages: true
    };
    this.lazyLoad = this.lazyLoad.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getImages();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    )
  }

  lazyLoad() {
    let winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
    let docheight = this.getDocHeight();
    let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let trackLength = docheight - winheight;
    let pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    this.setState({ scrolledAmount: pctScrolled });
    if (this.state.scrolledAmount === 80 || this.state.scrolledAmount>95) {
      this.setState({ pageNum: this.state.pageNum + 1 });
      if(this.state.appendImages){
        this.fetchNextPageImages();
        this.setState({ appendImages: !this.state.appendImages });
      }
    }
  }

  fetchNextPageImages() {
    let groupIDImages = [];
    fetch("https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=" +
      config.REACT_APP_API_KEY + "&group_id=" + this.props.match.params.groupID + "&per_page=20" + "&page=" + this.state.pageNum
      + "&format=json&nojsoncallback=1")
      .then(response => response.json())
      .then(j => j.photos.photo.map(pic => {
        var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
        return <div key={pic.secret}><img alt="pic" width="100%" src={srcPath} key={pic.secret} /> </div>;
      })).then(grpImages => {
        groupIDImages.push(grpImages);
        this.setState({ nextPageImages: [this.state.nextPageImages, ...groupIDImages] });
      }).catch(e => console.error(e));
  }

  handleScroll(event) {
    this.lazyLoad();
    if (this.state.scrolledAmount > 50) {
      this.setState({ appendImages: true });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="gal">
          {
            (this.state.groupGalleryImages) ? (this.state.groupGalleryImages) : <p>Loading...</p>
          }
          {
            (this.state.nextPageImages && this.state.appendImages) ? (this.state.nextPageImages) : ""
          }
        </div>
      </Fragment>
    );
  }
}

export default Gallery;
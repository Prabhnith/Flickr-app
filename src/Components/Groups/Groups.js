import React, { Component } from "react";
import "./Groups.css";

const REACT_APP_API_KEY = "cd7182a2e83351df21c02d6c0e4f2d9e";
class Groups extends Component {
  constructor() {
    super();
    this.state = {
      searchGroupValue: "",
      groupImages :[],
      groups:[]
    };
  }

  async fetchGroupImages(groupID) {
    const response = await fetch("https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=" +
      REACT_APP_API_KEY + "&group_id=" + groupID + "&per_page=9&format=json&nojsoncallback=1");
    let j = await response.json();
    let groupImages = j.photos.photo.map(pic => {
      var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
      return <img alt="dogs" src={srcPath} />;
    });
    // console.log(groupImages);
    return groupImages;
  }

  async componentDidMount() {
    let response = await fetch("https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=" + REACT_APP_API_KEY +
      "&text=flickrcentral&per_page=9&format=json&nojsoncallback=1")
    let j = await response.json();

    var groupsArray = j.groups.group.map(group => {
      let singleGroupImages =  this.fetchGroupImages(group.nsid);
      let groupImages={};
      groupImages[group.nsid] = singleGroupImages;
      
      groupImages[group.nsid].then(img => {
        let newArray =[];
        let is = img.map(i =>{
          // console.log(i);
          newArray.push(i);
          return (i);
        })
        groupImages[group.nsid] = newArray;
        newArray=[];
        // console.log(is);
        // return 0;
      });
        this.setState(prevState => ({
          groupImages: [...prevState.groupImages, groupImages ]
        }))
      return (
        <div className="col-md-4">
          <div className="card">
            <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
            <h5 className="groupName">{group.name}</h5>
            <p className="membersCount">Members : {group.members}</p>
            <div className="container">
              <div className="row"> <hr />
                <div className="gal">
                {
                  (this.state.groupImages.length >0 )
                  ? 
                  (
                    // console.log(this.state.groupImages)
                    this.state.groupImages.map(obj =>{
                      let arr= Object.values(obj);
                      arr.map(imgobj =>{
                        imgobj.then(img =>{
                          let imgs = img.map(elem =>{
                            return(elem.props.src);
                          })
                          console.log("END");
                        })

                      })
                    }
                    )               
                  )
                  : <p>Loading...</p>
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    this.setState({ groups: groupsArray });
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-nav navbar-default">
          <div className="col-lg-5">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..."/>
              <span className="col-lg-4 input-group-btn">
                <button className="btn btn-primary" type="button">Search Groups</button>
              </span>
            </div>
          </div>
        </nav>
        <div className="row groupsContainer">{this.state.groups}</div>
      </div>
    );
  }
}
export default Groups;

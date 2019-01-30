import React, { Component } from "react";
import "./Groups.css";

const REACT_APP_API_KEY = "cd7182a2e83351df21c02d6c0e4f2d9e";
class Groups extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      searchGroupValue: "",
      groups: [],
      groupID_Images: [],
      groupIDs:[],
      groupIDs_ImageTags:{}
    };
  }

  // fetch images from the group
  async fetchGroupImages(groupID){
    let groupIDImages={};
    const response = await fetch("https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=" +
      REACT_APP_API_KEY + "&group_id=" + groupID + "&per_page=9&format=json&nojsoncallback=1");
      let j = await response.json();
      let groupImages = j.photos.photo.map(pic => {
        var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
        return <img alt="dogs" src={srcPath} />;
      });
      console.log(groupImages);
      groupIDImages[groupID] = groupImages;

      var newArray = this.state.groupID_Images.slice();    
      newArray.push(groupIDImages);   
      this.setState({groupID_Images:newArray});
      console.log(this.state.groupID_Images);
      // console.log("FIRST :",this.state.groupID_Images[0][groupID][0].props.src);

      var groupImageArray = this.state.groupID_Images;
      let groupIDs_ImageTags={};
      groupImageArray.map((obj) => {
        let groupId = Object.keys(obj)[0];
        let GroupID_picArray = Object.values(obj);
        let picsArray = [];
        for (let i = 0; i < GroupID_picArray[0].length; i++) {
          picsArray.push(
              <img alt={GroupID_picArray[0][i].props.alt} src={GroupID_picArray[0][i].props.src} />
          );  
        }
        groupIDs_ImageTags[groupId] = picsArray;
      });
      this.setState({groupIDs_ImageTags});
  }

  async getImagesfromArray(){
    var groupImageArray = this.state.groupID_Images;
    let groupIDs_ImageTags={};
    let groupImagesSrc = groupImageArray.map((obj) => {
      let groupId = Object.keys(obj)[0];
      // console.log(obj);
      // console.log(groupId);
      // console.log(Object.values(obj));
      let GroupID_picArray = Object.values(obj);
      // console.log(GroupID_picArray);
      let picsArray = [];
      for (let i = 0; i < GroupID_picArray[0].length; i++) {
        // console.log(i, GroupID_picArray[0][i].props.src);
        // picsArray.push(GroupID_picArray[0][i].props.src);
        picsArray.push(
            <img alt={GroupID_picArray[0][i].props.alt} src={GroupID_picArray[0][i].props.src} />
        );  
      }
      // console.log(picsArray);
      groupIDs_ImageTags[groupId] = picsArray;
      console.log("PICS : ",picsArray);
      // console.log(obj[Object.keys(obj)[i]][index].props.src);
      // console.log(obj[index][groupIDs[index]][index].props.src);
      // return obj[index][groupIDs[index]][index].props.src;  
      // return <img alt="pic" src={obj[Object.keys(obj)[index]][index].props.src} />  
    });
    this.setState({groupIDs_ImageTags});
    console.log(groupIDs_ImageTags);
    // console.log(groupIDs_ImageTags["1557286@N20"][0])
    // console.log(groupImagesSrc);
  }
  async componentDidMount() {
    // alert(REACT_APP_API_KEY);
    //  Each group card will contain its name, avatar and some images of that group
    
    //fetch group name according to the text
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=" + REACT_APP_API_KEY +
        "&text=flickrcentral&per_page=9&format=json&nojsoncallback=1"
    )
      .then(function(response) {
        return response.json();
      })
      .then(
        function(j) {
          // console.log(JSON.stringify(j));
          var groupIDs = [];
          var groupID_Images ={};
          var groupsArray = j.groups.group.map(group => {
            // group.name group.members
            var groupName = group.name;
            var groupMembers = group.members;
            groupIDs.push(group.nsid);
            this.fetchGroupImages(group.nsid);
            // groupID_Images[group.nsid] = groupImages;
            // console.log(groupName, " ", groupMembers);
            return (
              <div className="col-md-4">
                <div className="card">
                  <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                  <h5 className="groupName">{groupName}</h5>
                  <p className="membersCount">Members : {groupMembers}</p>
                  <div className="container">
                    <div className="row"> <hr />
                      <div className="gal">{this.state.pictures}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });

          this.setState({ groups: groupsArray, groupIDs });
          // console.log(groupIDs);
          // console.log(groupID_Images);
        }.bind(this)
      );

      //fetch random images with tag=face 
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + REACT_APP_API_KEY +
        "&tags=face&per_page=9&page=1&format=json&nojsoncallback=1"
    )
      .then(function(response) {
        return response.json();
      })
      .then(
        function(j) {
          //   alert(JSON.stringify(j));
          let picArray = j.photos.photo.map(pic => {
            var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
            return <img alt="dogs" src={srcPath} />;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      ); 
  }

  componentWillMount(){

  }

  render() {
    // const img = this.state.groupIDs_ImageTags;
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-nav navbar-default">
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

        <div className="row groupsContainer">
          {this.state.groups}
        </div>
        
          {this.state.groupIDs_ImageTags && this.state.groupIDs_ImageTags["1557286@N20"] ? 
          <img alt="pic" src={this.state.groupIDs_ImageTags["1557286@N20"][0].props.src} /> : "" }
          
        
      </div>
    );
  }
}

export default Groups;

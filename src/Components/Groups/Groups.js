import React, { Component } from "react";
import "./Groups.css";
import GroupCard from '../Card/GroupCard';
import SearchGroups from "../SearchGroups/SearchGroups";
import config from '../../config';

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      searchGroupValue: "",
      groups: [],
    };
  }

  componentDidMount() {
    fetch("https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=" + config.REACT_APP_API_KEY +
      "&text=flickrcentral&per_page=9&format=json&nojsoncallback=1")
      .then(response => response.json())
      .then(j => j.groups.group.map(group => {
        return <GroupCard groupName={group.name} groupMembers={group.members} groupID={group.nsid} key={ group.nsid}/>;
      })).then(groupArrays => {
        this.setState({ groups: groupArrays });
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <SearchGroups searchValue={this.searchGroupValue}/>
        <div className="row groupsContainer">
          {this.state.groups}
        </div>
      </div>
    );
  }
}

export default Groups;
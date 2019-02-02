import React, { Component } from "react";

import "./Groups.css";

import SearchGroups from "../SearchGroups/SearchGroups";
import GroupGallery from "../GroupGallery/GroupGallery";
import Gallery from "../Gallery/Gallery";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      searchWord: ""
    };
  }

  updateInputValue = (inputValue) => { this.setState({ inputValue }); }

  handleSubmitSearch = () => { this.setState({ searchWord: this.state.inputValue }); }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container-fluid">
        <SearchGroups searchValue={this.setSearchValue} handleSubmit={this.handleSubmitSearch} handleSubmitSearch={this.updateInputValue} />
        <GroupGallery keyword={this.state.searchWord} />
      </div>
    );
  }
}

export default Groups;
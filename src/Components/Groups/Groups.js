import React, { Component } from "react";

import "./Groups.css";

import SearchGroups from "../SearchGroups/SearchGroups";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container-fluid">
        <SearchGroups />

      </div>
    );
  }
}

export default Groups;
import React, { Component } from 'react';
import GroupCard from '../Card/GroupCard';
import config from '../../config';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class GroupGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
    }
    fetchGalleryImages() {
        if (this.props.keyword) {
            fetch("https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=" + config.REACT_APP_API_KEY +
                "&text=" + this.props.keyword + "&per_page=9&format=json&nojsoncallback=1")
                .then(response => response.json())
                .then(j => j.groups.group.map(group => {
                    return (
                        <GroupCard onclick={(e) => console.log(e)} groupName={group.name} groupMembers={group.members} groupID={group.nsid} key={group.nsid} />
                    )
                })).then(groupArrays => {
                    this.setState({ groups: groupArrays });
                }).catch(e => console.log(e));
        }
    }
    componentWillReceiveProps() {
        this.fetchGalleryImages();
    }

    componentDidMount() {
        this.fetchGalleryImages();
    }
    render() {
        return (
            <div className="row groupsContainer">
                {
                    (this.props.keyword) ? this.state.groups : ""
                }
            </div>
        )
    }
}

export default GroupGallery;
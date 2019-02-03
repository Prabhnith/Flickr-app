import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Groupcard.css';

class GroupCard extends Component {
    constructor() {
        super();
        this.state = {
            groupGalleryImages: []
        };
    }

    componentDidMount() {
        let groupIDImages = [];
        fetch("https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=" +
            config.REACT_APP_API_KEY + "&group_id=" + this.props.groupID + "&per_page=9&format=json&nojsoncallback=1")
            .then(response => response.json())
            .then(j => j.photos.photo.map(pic => {
                var srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
                return <div className="stagger" key={pic.secret}><img alt="pic" width="100%" src={srcPath} key={pic.secret} /> </div>;
            })).then(grpImages => {
                groupIDImages.push(grpImages);
                // console.log("groupID :", this.props.groupID);
                // console.log("groupIDImages :", groupIDImages);
                this.setState({ groupGalleryImages: groupIDImages });
            }).catch(e => console.error(e));
    }


    render() {
        return (
            <Fragment>
                <Link to={"/gallery/" + this.props.groupID} style={{ textDecoration: 'none', color: 'black' }} className="col-md-4 link">
                    {
                        (!this.state.groupGalleryImages.length) ? ""
                            :
                            (
                                <div className="card">
                                    <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                    <h5 className="groupName">{this.props.groupName}</h5>
                                    <p className="membersCount">Members : {this.props.groupMembers} </p>
                                    <div className="gal">
                                        {
                                            (this.state.groupGalleryImages) ?
                                                (this.state.groupGalleryImages) :
                                                <p>Loading...</p>
                                        }
                                    </div>
                                </div>
                            )
                    }
                </Link>
            </Fragment>
        )
    }
}

export default GroupCard;
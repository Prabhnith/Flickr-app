import React, { Component, Fragment } from 'react';
import GroupGallery from '../GroupGallery/GroupGallery';
import './SearchGroups.css';

class SearchGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            searchWord: ""

        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateInputValue(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ searchWord: this.state.inputValue })
    }

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-nav navbar-default">
                    <div className="container">
                        <div className="col-lg-12 col-md-12 com-sm-12 col-12">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" style={{ marginRight: '1%', float: 'left' }} 
                            className="searchInput col-4 col-sm-5 col-md-5 col-lg-5 form-control" placeholder="Search for..."
                                value={this.state.inputValue} onChange={this.updateInputValue} />
                            <span className="col-lg-4 col-md-4 col-sm-4 col-4 input-group-btn">
                                <button className="btn btn-primary" type="submit" >Search Groups</button>
                            </span>
                        </form>
                        </div>
                    </div>
                </nav>
                {
                    (this.state.searchWord.length) ?
                        <GroupGallery keyword={this.state.searchWord} /> :
                        <div className="card col-lg-4 col-md-4 noSearchWord">
                        <h4>Enter something to search!!</h4>
                        </div>
                }
            </Fragment>
        )
    }
}


export default SearchGroups;
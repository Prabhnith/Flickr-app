import React, { Component, Fragment } from 'react';
import GroupGallery from '../GroupGallery/GroupGallery';

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
                        <form onSubmit={this.handleSubmit} className="col-lg-12">
                            <input type="text" style={{ marginLeft: '20%', marginRight: '1%', float: 'left' }} className="searchInput col-lg-4 form-control" placeholder="Search for..."
                                value={this.state.inputValue} onChange={this.updateInputValue} />
                            <span className="col-lg-3 input-group-btn">
                                <button className="btn btn-primary" type="submit" >Search Groups</button>
                            </span>
                        </form>
                    </div>
                </nav>
                {
                    (this.state.searchWord.length) ?
                        <GroupGallery keyword={this.state.searchWord} /> :
                        <h4>Enter something to search!!</h4>
                }
            </Fragment>
        )
    }
}


export default SearchGroups;
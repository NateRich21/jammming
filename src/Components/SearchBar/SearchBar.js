import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.enterPressed = this.enterPressed.bind(this) ; 
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13)
      this.search()
    } 


  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song Title" 
          onChange={this.handleTermChange} 
          onKeyPress={this.enterPressed} 
        />
        <button 
          type="submit" 
          className="SearchButton" 
          onClick={this.search} 
        >
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;

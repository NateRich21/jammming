import React from 'react';

import './PrevSearch.css';

class PrevSearch extends React.Component {
    
    render() {
        return(
            <div className="prev-search-box">
            <h2>Previous Searches</h2>

               {this.props.prevSearches.map(search => {
                return <div key={search.idsearched_terms}        className="search-term">
                    {search.search_term}
                </div>
           })} 
            </div>
        )
    }
}

export default PrevSearch;
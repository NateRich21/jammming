import React from 'react';

import './PrevSearch.css';

class PrevSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searches: [],
            user:'1233787987'
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/users/terms?user=1233787987')
        .then(response => response.json())
        .then(response => this.setState({ searches: response.data }))
        .catch(err => console.error(err)) 
    }

    render() {
        return(
            <div className="prev-search-box">
               {this.state.searches.map(search => {
                    return <div>{search.search_term}</div>
               })} 
            </div>
        )
    }
}

export default PrevSearch;
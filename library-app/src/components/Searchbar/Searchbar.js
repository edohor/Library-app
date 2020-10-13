import React, { useState } from 'react';
import './Searchbar.css';

function Searchbar(props) {
    
    const [search, setSearch] = useState("");
    
    props.search(search);

    return (
        <div>
            <input type="search"
                className="searchBar"
                placeholder="Search"
                onChange={event => setSearch(event.target.value)}
                value={search}/>
        </div>
    )
}

export default Searchbar;
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div className="tileContainer">
            <Link exact to={"/books"} className="tile">Books</Link>
            <Link exact to={"/users"} className="tile">Users</Link>
        </div>
    )
}

export default Homepage;
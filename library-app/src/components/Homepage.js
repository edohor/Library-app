import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div className="tileContainer">
            <Link exact to={"/books"} className="booksTile"><span className="tileText">BOOKS</span></Link>
            <Link exact to={"/users"} className="usersTile"><span className="tileText">USERS</span></Link>
        </div>
    )
}

export default Homepage;
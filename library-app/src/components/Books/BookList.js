import React, { useState } from 'react';
import './BookList.css';
import Searchbar from '../Searchbar/Searchbar';

function BookList() {
    
    let search = "";

    const searchBooks = (value) => {
        console.log("value", value);
        search = value;
    }

    function openAddBookPopup () {
        console.log("openAddBookPopup");

    }

    return (
        <div>
            <Searchbar search={e => searchBooks(e)}/>
            <div className="booksContainer">
                <button onClick={openAddBookPopup} className="addBookButton">Add new book</button>

                <table className="booksTable">
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Available</th>
                    </tr>
                    <tr>
                        <td>a</td>
                        <td>t</td>
                        <td>y/n</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default BookList;
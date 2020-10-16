import React, { useState } from 'react';
import './BookList.css';
import Searchbar from '../Searchbar/Searchbar';
import AddBookModal from '../ModalWindow/AddBookModal';
import EditBookModal from '../ModalWindow/EditBookModal';

function BookList () {

    const [books, setBooks] = useState(
        (localStorage.getItem("books")!==null && JSON.parse(localStorage.getItem("books")).length>0) ? 
        JSON.parse(localStorage.getItem("books")) : []
        );
    const [ addBookModalOpened, setAddBookModalOpened ] = useState(false);
    const [ editBookModalOpened, seteditBookModalOpened ] = useState(false);
    const [ search, setSearch ] = useState(false);
    const [ bookInfo, setBookInfo ] = useState(null);
    const [ showFiltered, setShowFiltered ] = useState(false);
    const [ searchResults, setSearchResults ] = useState(false);

    const searchBooks = (value) => {
        setSearch(value);

        if (value.length > 0) {
            setSearchResults(true)
        }
    }

    function openAddBookPopup () {
        setAddBookModalOpened(true);
    }

    function openEditBookPopup (id, index) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].id===id) {
                setBookInfo(books[i]);                
            }            
        }
        
        seteditBookModalOpened(true);

    }

    function editBookInfo (id, author, title, available) {
        let obj = {id: id, author: author, title: title, available: available};

        for(let i=0; i<books.length; i++){
            if(books[i].id === id){
                books.splice(i, 1, obj);
            }
        }

        localStorage.setItem("books", JSON.stringify(books));

        setBooks(JSON.parse(localStorage.getItem("books")));

        closeModal();
    }

    function deleteBook (id){
        for(let i=0; i<books.length; i++){
            if(books[i].id === id){
                books.splice(i, 1);
            }
        }

        localStorage.setItem("books", JSON.stringify(books));

        setBooks(JSON.parse(localStorage.getItem("books")));

        closeModal();
    }

    function filterRentedBooks() {
        setShowFiltered(!showFiltered);
    }

    function closeModal() {
        setAddBookModalOpened(false);
        seteditBookModalOpened(false);
    }

    function saveNewBook(author, title) {
        setAddBookModalOpened(false);
        
        // find largest id number and set it as id for new book
        let largestId = 0;
        if(books.length>0){
            let checkIds = books.reduce((a, c) => (a[c.id] = c, a), {});
            largestId = Math.max(...Object.keys(checkIds))+1;
        }

        let obj = {id: largestId, author: author, title: title, available: true};
        books.push(obj);

        localStorage.setItem("books", JSON.stringify(books));

        setBooks(JSON.parse(localStorage.getItem("books")));
        
    }
    
    let editButton = [];
    let availableText = [];

    let tableInfo = [];
    if (showFiltered) {
        let filteredList = [];
        
        for (let i = 0; i < books.length; i++) {
            if (!books[i].available) {
                filteredList.push(books[i]);
            }
        }

        if(!searchResults){
            
            tableInfo = filteredList.map((filteredList, index) => {
                editButton = <div onClick={() => openEditBookPopup(filteredList.id, index)} className="editButton">Edit</div>

                if (books.available) {
                    availableText = <div>Yes</div>
                } else {
                    availableText = <div>No</div>
                }

                return (<tr>
                            <td>{filteredList.author}</td>
                            <td>{filteredList.title}</td>
                            <td>{availableText}</td>
                            <td className="textButton">{editButton}</td>
                        </tr>)            
            })
        } else {
            let searchFiltered = [];
            for (let i = 0; i < filteredList.length; i++) {
                if (filteredList[i].author.toLowerCase().includes(search.toLowerCase()) || filteredList[i].title.toLowerCase().includes(search.toLowerCase())) {
                    searchFiltered.push(filteredList[i]);
                }
            }
            
            tableInfo = searchFiltered.map((filteredList, index) => {
                editButton = <div onClick={() => openEditBookPopup(filteredList.id, index)} className="editButton">Edit</div>

                if (books.available) {
                    availableText = <div>Yes</div>
                } else {
                    availableText = <div>No</div>
                }

                return (<tr>
                            <td>{filteredList.author}</td>
                            <td>{filteredList.title}</td>
                            <td>{availableText}</td>
                            <td className="textButton">{editButton}</td>
                        </tr>)            
            })
        }

    } else if(searchResults){
        if (books.length>0){
            let filteredList = [];
            for (let i = 0; i < books.length; i++) {
                if (books[i].author.toLowerCase().includes(search.toLowerCase()) || books[i].title.toLowerCase().includes(search.toLowerCase())) {
                    filteredList.push(books[i]);
                }
            }


            tableInfo = filteredList.map((books, index) => {
                editButton = <div onClick={() => openEditBookPopup(books.id, index)} className="editButton">Edit</div>
                
                if (books.available) {
                    availableText = <div>Yes</div>
                } else {
                    availableText = <div>No</div>
                }

                return (<tr className="tableRow">
                            <td>{books.author}</td>
                            <td>{books.title}</td>
                            <td>{availableText}</td>
                            <td className="textButton">{editButton}</td>
                        </tr>)            
            })
        }

    } else {
        if (books.length>0){
            tableInfo = books.map((books, index) => {
                editButton = <div onClick={() => openEditBookPopup(books.id, index)} className="editButton">Edit</div>
                
                if (books.available) {
                    availableText = <div>Yes</div>
                } else {
                    availableText = <div>No</div>
                }

                return (<tr className="tableRow">
                            <td>{books.author}</td>
                            <td>{books.title}</td>
                            <td>{availableText}</td>
                            <td className="textButton">{editButton}</td>
                        </tr>)            
            })
        }
    }

    return (
        <div>
            <Searchbar search={e => searchBooks(e)}/>
            <div className="booksContainer">
                <button onClick={openAddBookPopup} className="bookButton">Add new book</button>
                <button onClick={filterRentedBooks} className="bookButton">{showFiltered ? "Show all books" : "Show only rented books"}</button>

                <table className="booksTable">
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Available</th>
                        <th></th>
                    </tr>
                    {tableInfo}
                </table>
            </div>

            <AddBookModal show={addBookModalOpened}
                handleClose={closeModal}
                saveNewBook={saveNewBook}/>

            <EditBookModal show={editBookModalOpened}
                handleClose={closeModal}
                saveNewBook={saveNewBook}
                bookInfo={bookInfo}
                editBookInfo={editBookInfo}
                deleteBook={deleteBook}/>
                
        </div>
    )
}

export default BookList;
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

let userData = null;

function BookRentModal(props) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [rented, setRented] = useState([]);
    const [dataSet, setDataSet] = useState(false);
    const [books, setBooks] = useState(
        (localStorage.getItem("books")!==null && JSON.parse(localStorage.getItem("books")).length>0) ? 
        JSON.parse(localStorage.getItem("books")) : []
        );
    const [users, setUsers] = useState(
        (localStorage.getItem("users")!==null && JSON.parse(localStorage.getItem("users")).length>0) ? 
        JSON.parse(localStorage.getItem("users")) : []
        );
    const [search, setSearch] = useState("");

    function setInitaialData() {
        userData = props.userInfo;

        setName(props.userInfo.name);
        setLastName(props.userInfo.lastName);
        setDob(props.userInfo.dob);
        setRented(props.userInfo.books);
        setDataSet(true);
    }

    if (userData !== props.userInfo) {
        if (props.userInfo!==null && !dataSet) {
            setInitaialData();
        }        
    }

    function handleRent() {
        resetData();
        props.handleRent(props.userInfo.id);
    }

    function closeModal() {
        resetData();
        setSearch("");
        props.handleClose();
    }

    function resetData(){
        setDataSet(false);
    }

    function addBookForRent (bookId, author, title) {

        let rentedBooks = rented;
        rentedBooks.push(bookId);
        setRented(rentedBooks);
        let userObj = {id: userData.id, name: name, lastName: lastName, dob: dob, books: rentedBooks};

        for(let i=0; i<users.length; i++){
            if(users[i].id === userData.id){
                users.splice(i, 1, userObj);
            }
        }

        localStorage.setItem("users", JSON.stringify(users));

        setUsers(JSON.parse(localStorage.getItem("users")));

        
        let bookObj = {id: bookId, author: author, title: title, available: false, rentedTo: userData.id};

        for(let i=0; i<books.length; i++){
            if(books[i].id === bookId){
                books.splice(i, 1, bookObj);
            }
        }

        localStorage.setItem("books", JSON.stringify(books));

        setBooks(JSON.parse(localStorage.getItem("books")));

    }

    function returnBook (bookId, author, title) {

        let rentedBooks = rented;
        for(let i=0; i<rentedBooks.length; i++){
            if(rentedBooks[i] === bookId){
                rentedBooks.splice(i, 1);
            }
        }

        setRented(rentedBooks);
        let userObj = {id: userData.id, name: name, lastName: lastName, dob: dob, books: rentedBooks};

        for(let i=0; i<users.length; i++){
            if(users[i].id === userData.id){
                users.splice(i, 1, userObj);
            }
        }

        localStorage.setItem("users", JSON.stringify(users));

        setUsers(JSON.parse(localStorage.getItem("users")));

        
        let bookObj = {id: bookId, author: author, title: title, available: true, rentedTo: []};

        for(let i=0; i<books.length; i++){
            if(books[i].id === bookId){
                books.splice(i, 1, bookObj);
            }
        }

        localStorage.setItem("books", JSON.stringify(books));

        setBooks(JSON.parse(localStorage.getItem("books")));

    }
    
    let filteredList = [];
    let bookListTable = null;
    let rentedBooks = [];
    let availableText = [];
    let addBook = null;

    if (rented.length>0) {
        for (let i = 0; i < rented.length; i++) {
            for (let j = 0; j < books.length; j++) {
                if (rented[i] === books[j].id) {
                    rentedBooks.push(books[j]);
                }
            }
        }
        
        bookListTable = rentedBooks.map((books, index) => {
                
            availableText = <div>No</div>
            addBook = <div onClick={() => returnBook(books.id, books.author, books.title)} className="editButton">Return</div>

            return (<tr className="tableRow">
                        <td>{books.author}</td>
                        <td>{books.title}</td>
                        <td>{availableText}</td>
                        <td>{addBook}</td>
                    </tr>)            
        })
    }

    if (search.length > 0) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].author.toLowerCase().includes(search.toLowerCase()) || books[i].title.toLowerCase().includes(search.toLowerCase())) {
                filteredList.push(books[i]);
            }
        }

        if (filteredList.length > 0) {
            bookListTable = filteredList.map((books, index) => {
                
                if (books.available) {
                    availableText = <div>Yes</div>
                    addBook = <div onClick={() => addBookForRent(books.id, books.author, books.title)} className="editButton">Rent</div>
                } else {
                    availableText = <div>No</div>
                    if (userData.id===books.rentedTo) {
                        addBook = <div onClick={() => returnBook(books.id, books.author, books.title)} className="editButton">Return</div>
                    } else {
                        addBook = null;
                    }
                }

                return (<tr className="tableRow">
                            <td>{books.author}</td>
                            <td>{books.title}</td>
                            <td>{availableText}</td>
                            <td>{addBook}</td>
                        </tr>)            
            }) 
        }
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                centered={true}
                keyboard={false}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                animation={false}
                className="modal"
            >

                <Modal.Header>
                    <Modal.Title>Book rent/return</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="entryField">
                        <span className="fieldText">Name:</span>
                        <span className="userInfoRent">{name}</span>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Last name:</span>
                        <span className="userInfoRent">{lastName}</span>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Date of birth:</span>
                        <span className="userInfoRent">{dob}</span>
                    </div>

                    <div className="bookSearch">
                        
                        <div>
                            <input type="search"
                                className="smallSearchBar"
                                placeholder="Search"
                                onChange={event => setSearch(event.target.value)}
                                value={search}/>
                        </div>
                        
                        
                        <table className="booksTable">
                            <tr>
                                <th>Author</th>
                                <th>Title</th>
                                <th>Available</th>
                                <th></th>
                            </tr>
                            {bookListTable}
                        </table>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={closeModal}>Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BookRentModal;
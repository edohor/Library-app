import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

let userData = null;

function BookRentModal(props) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [dataSet, setDataSet] = useState(false);
    const [books, setBooks] = useState(
        (localStorage.getItem("books")!==null && JSON.parse(localStorage.getItem("books")).length>0) ? 
        JSON.parse(localStorage.getItem("books")) : []
        );
    const [search, setSearch] = useState("");
    
    console.log("BookRentModal props", props);

    function setInitaialData() {
        userData = props.userInfo;

        setName(props.userInfo.name);
        setLastName(props.userInfo.lastName);
        setDob(props.userInfo.dob);
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
        props.handleClose();
    }

    function resetData(){
        setDataSet(false);
    }

    function addBookForRent () {
        
    }
    
    let filteredList = [];
    let bookListTable = null;
    if (search.length > 0) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].author.toLowerCase().includes(search.toLowerCase()) || books[i].title.toLowerCase().includes(search.toLowerCase())) {
                filteredList.push(books[i]);
            }
        }
        console.log("filteredList = ", filteredList);

        let availableText = [];
        let addBook = null;
        if (filteredList.length > 0) {
            bookListTable = filteredList.map((books, index) => {
                addBook = <div onClick={() => addBookForRent(filteredList.id, index)} className="editButton">Edit</div>
                
                if (books.available) {
                    availableText = <div>Yes</div>
                } else {
                    availableText = <div>No</div>
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
                        
                        <select className="bookSelect" multiple>
                            {bookListTable}
                        </select>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleRent}>Done</Button>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BookRentModal;
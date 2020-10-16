import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

let bookData = null;

function EditBookModal(props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [available, setAvailable] = useState(null);
    const [dataSet, setDataSet] = useState(false);
    const [users, setUsers] = useState(
        (localStorage.getItem("users")!==null && JSON.parse(localStorage.getItem("users")).length>0) ? 
        JSON.parse(localStorage.getItem("users")) : []
        );
    const [userRented, setUserRented] = useState("");
    const [disabled, setDisabled] = useState(false);

    function setInitaialData() {
        bookData = props.bookInfo;

        setAuthor(props.bookInfo.author);
        setTitle(props.bookInfo.title);
        setAvailable(props.bookInfo.available);
        setDataSet(true);
    }

    if (bookData !== props.bookInfo) {
        if (props.bookInfo!==null && !dataSet) {
            setInitaialData();
            if (!props.bookInfo.available && props.bookInfo.rentedTo!==undefined) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id === props.bookInfo.rentedTo) {
                        setUserRented(users[i]);
                    }
                }
            } else {
                setUserRented("");
            }
        }        
    } else if (bookData !== null && !dataSet && 
        (author !== bookData.author || title !== bookData.title || available !== bookData.available)) {
        setInitaialData();
        setDataSet(false);
    }

    function editData() {
        resetData();
        props.editBookInfo(props.bookInfo.id, author, title, available);
    }

    function deleteBook() {
        resetData();
        props.deleteBook(props.bookInfo.id);
    }

    function closeModal() {
        resetData();
        props.handleClose();
    }

    function resetData(){
        setDataSet(false);
    }

    let userInfo = null;
    if (userRented!=="") {
        userInfo = (
            <div className="entryField">
                <span className="fieldText">Rented to:</span>
                <span className="userInfo">{userRented.name + " " + userRented.lastName + " " + userRented.dob}</span>
            </div>
        )
    } else {
        userInfo = null;
    }

    if (author.length > 0 && title.length > 0 && disabled) {
        setDisabled(false);
    } else if ((author.length === 0 || title.length === 0) && !disabled) {
        setDisabled(true);
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
                    <Modal.Title>Edit book information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="entryField">
                        <span className="fieldText">Author:</span>
                        <input type="text" className="inputText" 
                            onChange={event => setAuthor(event.target.value)}
                            value={author}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Title:</span>
                        <input type="text" className="inputText"
                            onChange={event => setTitle(event.target.value)}
                            value={title}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Available:</span>
                        <input type="checkbox" className="checkbox"
                            onChange={event => setAvailable(event.target.checked)}
                            defaultChecked={available}/>
                    </div>
                    {userInfo}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" className="deleteButton" onClick={deleteBook}>Delete</Button>
                    <div className="basicButtons">
                        <Button variant="primary" disabled={disabled} onClick={editData}>Done</Button>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditBookModal;
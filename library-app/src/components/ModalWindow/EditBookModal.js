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
    
    console.log("EditBookModal props", props);

    function setInitaialData() {
        bookData = props.bookInfo;

        setAuthor(props.bookInfo.author);
        setTitle(props.bookInfo.title);
        setAvailable(props.bookInfo.available);
        setDataSet(true);
    }

    if (bookData !== props.bookInfo) {
        if (props.bookInfo!==null && !dataSet) {
            console.log("EditBookModal author before setting", author);
            console.log("EditBookModal title before setting", title);
            console.log("EditBookModal available before setting", available);
            setInitaialData();
        }        
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

    console.log("EditBookModal author", author);
    console.log("EditBookModal title", title);
    console.log("EditBookModal available", available);

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
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" className="deleteButton" onClick={deleteBook}>Delete</Button>
                    <div className="basicButtons">
                        <Button variant="primary" onClick={editData}>Done</Button>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditBookModal;
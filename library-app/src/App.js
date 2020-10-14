import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookList from './components/Books/BookList';
import UsersList from './components/Users/UsersList';

let defaultBooks = [];
let bookObj1 = {id: 0, author: "JK Rowling ", title: "Harry Potter", available: true, rentedTo: []};
let bookObj2 = {id: 1, author: "George R. R. Martin ", title: "A Game of Thrones", available: true, rentedTo: []};
let bookObj3 = {id: 2, author: "Dan Brown ", title: "The Da Vinci Code", available: true, rentedTo: []};
defaultBooks.push(bookObj1,bookObj2,bookObj3);

localStorage.setItem("books", JSON.stringify(defaultBooks));

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/books"} component={BookList} />
        <Route exact path={"/users"} component={UsersList} />
        <Route exact path={"/"} component={Homepage}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);

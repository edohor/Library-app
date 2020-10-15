import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookList from './components/Books/BookList';
import UsersList from './components/Users/UsersList';

let defaultBooks = [];
let bookObj1 = {id: 0, author: "JK Rowling ", title: "Harry Potter", available: false, rentedTo: 0};
let bookObj2 = {id: 1, author: "George R. R. Martin ", title: "A Game of Thrones", available: true, rentedTo: []};
let bookObj3 = {id: 2, author: "Denis Villeneuve ", title: "Dune", available: true, rentedTo: []};
defaultBooks.push(bookObj1,bookObj2,bookObj3);

localStorage.setItem("books", JSON.stringify(defaultBooks));

let defaultUsers = [];
let userObj1 = {id: 0, name: "Ivan", lastName: "Ivanković", dob: "1985-02-23", books: [0]};
let userObj2 = {id: 1, name: "Marko", lastName: "Marković", dob: "1990-10-10", books: []};
defaultUsers.push(userObj1,userObj2);

localStorage.setItem("users", JSON.stringify(defaultUsers));

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

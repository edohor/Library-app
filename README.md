# Library-app
App to handle books, authors and users

----------------------

After opening the app click on "Books" or "Users" button to view each. All books and users are saved in browser local storage and on opening there are 3 books and 2 users as default.


BOOKS:

- Search bar - search books by author or title
- Add new book button - a modal window where you can enter author and title of a book and save it to the list of books. New book is saved with a unique id and is set as available (not rented)
- Show only rented books button - filters all books with available property set as false and changes button text to "Show all books". Next time a user clicks the button, all books are displayed
- Edit button - a modal window where you can change author, title or availability of a book. If the selected book was already unavailable, below the "Available" checkbox will be displayed information about the user that rented the book. Delete button deletes the book from the list and removes the id from the list of rented books from a user if it was rented

USERS:

- Search bar - search users by name or last name
- Add new user button - a modal window where you can enter name, last name and date of birth of a user and save it to the list of users. New user is saved with a unique id and an empty list of rented books
- Rent button - a modal window displaying user information, a search bar to search all books and a table displaying search results or a list of already rented books. Renting and returning books works by clicking on the "Rent"/"Return" button
- Edit button - a modal window where you can change name, last name and date of birth of a user. Delete button deletes the user from the list and removes the id from the list of users that rented a book if the user had some rented books

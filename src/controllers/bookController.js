const Book = require("../models/Book");

/**
 * The function `getBookData` retrieves all book data from a database using an asynchronous operation.
 * @returns The function `getBookData` is returning the result of the `Book.find()` method, which is a
 * promise that resolves to an array of book data.
 */
const getBookData = async () => {
  try {
    return await Book.find();
  } catch (error) {
    throw error;
  }
};
/**
 * The function `addBook` is an asynchronous function that creates a new book record in a database with
 * the provided ISBN, name, author, genre, copies, publication, and fine.
 * @param ISBN - The ISBN (International Standard Book Number) is a unique identifier for a book. It is
 * typically a 10 or 13 digit number.
 * @param name - The name of the book.
 * @param author - The author parameter represents the name of the author of the book.
 * @param genre - The genre parameter refers to the category or type of the book, such as fiction,
 * non-fiction, romance, mystery, etc.
 * @param copies - The "copies" parameter represents the number of copies of the book that are
 * available in the library.
 * @param publication - The "publication" parameter refers to the publication date of the book. It is
 * the date when the book was published or released.
 * @param fine - The "fine" parameter represents the amount of money that needs to be paid as a penalty
 * for late return or damage of the book.
 */
const addBook = async (ISBN, name, author, genre, copies, publication, fine) => {
  try {

    const existingBook = await Book.findOne({
      ISBN: ISBN,
    });

    if (existingBook) {
      throw new Error("A book with this ISBN already exists.");
    }

    await Book.create({
      ISBN:ISBN,
      name: name,
      author: author,
      genre: genre,
      copies: copies,
      publication: publication,
      fine: fine,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * The function `deleteBook` is an asynchronous function that deletes a book from the database using
 * its ISBN.
 * @param isbn - The `isbn` parameter is the unique identifier of the book that you want to delete from
 * the database.
 */
const deleteBook = async (isbn) => {
  try {
    await Book.findByIdAndRemove(isbn);
  } catch (error) {
    throw error;
  }
};

/**
 * The function `updateBook` updates a book's information in a database.
 * @param id - The id parameter is the unique identifier of the book that needs to be updated. It is
 * used to find the book in the database and update its details.
 * @param name - The name of the book to be updated.
 * @param author - The author parameter is the name of the author of the book.
 * @param genre - The genre parameter represents the genre of the book. It is used to specify the
 * category or type of the book, such as fiction, non-fiction, romance, mystery, etc.
 * @param copies - The "copies" parameter represents the number of copies of the book that are
 * available.
 * @param publication - The "publication" parameter refers to the publication date of the book. It is
 * used to update the publication date of a book in the database.
 * @param fine - The "fine" parameter represents the amount of money that a person has to pay as a
 * penalty for returning the book late or for any other violation of the library's rules.
 */
const updateBook = async (
  id,
  name,
  author,
  genre,
  copies,
  publication,
  fine
) => {
  try {
    const book = await Book.findByIdAndUpdate(id, {
      name: name,
      author: author,
      genre: genre,
      copies: copies,
      publication: publication,
      fine: fine,
    }, {new: true});
    if(!book){
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBookData,
  addBook,
  deleteBook,
  updateBook,
};

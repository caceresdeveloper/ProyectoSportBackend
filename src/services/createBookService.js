const bookController = require("../controllers/bookController");

/**
 * The function `getBookData` is an asynchronous function that retrieves book data and sends it as a
 * response in JSON format, or returns an error message if there is an error.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request method, request URL, and request body.
 * It is used to retrieve data from the client-side.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `http.ServerResponse` class in Node.js.
 */
const getBookData = async (req, res) => {
  try {
    await bookController.getBookData().then((books) => {
      res.status(200).json({ books: books });
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting book data" });
  }
};

/**
 * The function `createBook` is an asynchronous function that handles the registration of a book by
 * extracting the necessary information from the request body and calling the `addBook` method of the
 * `bookController` object, then sending a success or error response accordingly.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, etc. In this case, the `req` object is used to access the `body`
 * property,
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
const createBook = async (req, res) => {
  try {
    const { ISBN, name, author, genre, copies, publication, fine } = req.body;
    await bookController.addBook(
      ISBN,
      name,
      author,
      genre,
      copies,
      publication,
      fine
    );

    res.status(200).json({ message: "Book registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering book" });
  }
};
/**
 * The deleteBook function deletes a book from the database and returns a success message or an error
 * message if there is an issue.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. In this case,
 * `req.params.id` is used to access the `id` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the Express `Response` object.
 */
const deleteBook = async (req, res) => {
  try {
    await bookController.deleteBook(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the register" });
  }
};

/**
 * The function `updateBook` updates a book record with the provided information and returns a success
 * message or an error message if there is an issue.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, and request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an object that contains methods and properties for handling the response, such as
 * setting the status code and sending JSON data.
 */
const updateBook = async (req, res) => {
  try {
    const { _id, name, author, genre, copies, date, fine } = req.body;
    
    await bookController.updateBook(
      _id,
      name,
      author,
      genre,
      copies,
      date,
      fine
    );
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating book" });
  }
};

module.exports = {
  getBookData,
  createBook,
  deleteBook,
  updateBook,
};

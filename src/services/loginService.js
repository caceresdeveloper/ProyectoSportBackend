const loginController = require('../controllers/loginController');

/**
 * The function `validateLogin` is an asynchronous function that takes in a request and response
 * object, extracts the username and password from the request body, and then calls a `validateLogin`
 * function from a `loginController` module to validate the login credentials. If the login is
 * successful and the user has a valid role (admin, employee, or customer), it returns a success
 * message with the role. Otherwise, it returns an error message indicating that the user is not
 * registered.
 * @param req - The `req` parameter is an object that represents the HTTP request made to the server.
 * It contains information such as the request headers, request body, request method, and request URL.
 * In this code snippet, `req.body` is used to access the request body, which is expected to contain a
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const validateLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const rol = await loginController.validateLogin(username, password);
    if (rol) {
      if (rol === 'admin' || rol === 'employee' || rol === 'customer') {
        res.status(200).json({ message: "User finded ", rol: rol})
      } else {
        res.status(500).json({ error: "Error, user is not registered" })
      }
    } else {
      res.status(500).json({ error: "Error, user is not registered" })
    }
  } catch (error) {
    res.status(500).json({ error: "Error, user is not registered" })
  }
};

module.exports = {
  validateLogin
};
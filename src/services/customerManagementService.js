const customerManagementController = require('../controllers/customerManagementController')
/**
 * The function `getCustomerData` is an asynchronous function that retrieves customer data and sends it
 * as a response in JSON format, or sends an error response if there is an error.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const getCustomerData = async (req, res) => {
  try {
    await customerManagementController.getCustomerData()
    .then((customers) =>{
      res.status(200).json({ customers: customers })
    })
  } catch (error) {
    res.status(500).json({ error: "Error getting customer data" })
  }
};

/**
 * The function `registerCustomer` is an asynchronous function that takes in a request and response
 * object, extracts the email and customer data from the request body, and then calls the
 * `registerCustomer` function from the `customerManagementController` module to register the customer
 * with the provided data, returning a success message if successful or an error message if there was
 * an error.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
const registerCustomer = async (req, res) =>{
    const { email, customer } = req.body
    try {
      await customerManagementController.registerCustomer(customer.name, customer.lastName, customer.documentType, customer.documentNumber, customer.birthday, customer.cellphone, customer.address, email, customer.password, customer.loans)
      res.status(200).json({ message: "Customer registered successfully" })
    } catch (error) {
      res.status(500).json({ error: "Error registering the customer" })
    } 
}

/**
 * The function `updateCustomer` updates a customer's information in a customer management system.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const updateCustomer = async (req, res) => {
  const { email, customer } = req.body
  try {
    await customerManagementController.updateCustomer(customer.name, customer.lastName, customer.documentType, customer.documentNumber, customer.birthday, customer.cellphone, customer.address, email, customer.loans)
    res.status(200).json({ message: "Customer updated succesfully" })
  } catch (error) {
    res.status(500).json({ error: "Error updating customer" })
  }
}

/**
 * The deleteCustomer function is an asynchronous function that deletes a customer and returns a
 * success message if the deletion is successful, or an error message if there is an error.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `params`, which contains route parameters
 * extracted from the URL, and `body`, which contains the request body data.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const deleteCustomer = async (req, res) => { 
  try {
    await customerManagementController.deleteCustomer(req.params.id)
    res.status(200).json({ message: "Customer deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting the customer" })
  }
}

/**
 * The function `registerLoan` registers a loan for a customer with a given username and book ISBN.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, etc. In this case, the `req` object is used to access the `body`
 * property,
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
const registerLoan = async (req, res) => {
  const { username, ISBN } = req.body

  try {
    await customerManagementController.registerLoan(username, ISBN)
    res.status(200).json({ message: "Loan register successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error registering loan" })
  }
};

/**
 * The function `updateStatus` updates the loan status for a customer and sends a response indicating
 * whether the update was successful or not.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, request headers, request body, request
 * parameters, etc. In this case, `req.params` is an object that contains the route parameters
 * extracted from the URL. `
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, it is used to send a JSON response with a success
 * message
 */
const updateStatus = async (req, res) => {
  try {
    await customerManagementController.updateStatus(req.params.email, req.params.id)
    res.status(200).json({ message: "Loan status updated successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error updating loan status" })
  }
}

/**
 * The function `getCustomerDataUnique` is an asynchronous function that retrieves unique customer data
 * based on the provided email and sends a response with the data if it exists, otherwise it sends an
 * error response.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request parameters, and request body. In this
 * case, `req.params.email` is accessing the `email` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const getCustomerDataUnique = async (req, res) =>{
  try {
    await customerManagementController.getCustomerDataUnique(req.params.email)
    .then((user) =>{
      res.status(200).json({ customerData: user })
    })
  } catch (error) {
    res.status(500).json({ error: "Error, customer doesnt exist" })
  }
}

module.exports = {
    getCustomerData,
    registerCustomer,
    deleteCustomer,
    updateCustomer,
    registerLoan,
    updateStatus,
    getCustomerDataUnique 
}
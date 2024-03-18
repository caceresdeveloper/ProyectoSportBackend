const EmployeeManagementController = require("../controllers/employeeManagementController");
/**
 * The function `getEmployeeData` is an asynchronous function that retrieves employee data from the
 * `EmployeeManagementController` and sends it as a JSON response.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is used to
 * retrieve data from the client-side and pass it to the server-side.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object and provides methods to set the
 * response status, headers, and body. In this code snippet, it is used to send a JSON response with
 */
const getEmployeeData = async (req, res) => {
  try {
    await EmployeeManagementController.getEmployeeData().then((employees) => {
      res.status(200).json({ employees: employees });
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting employee data" });
  }
};

/**
 * The function `registerEmployee` is an asynchronous function that handles the registration of an
 * employee by calling the `registerEmployee` method of the `EmployeeManagementController` and returns
 * a success message if the registration is successful or an error message if there is an error.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made to the server. It includes properties such as the request headers, request body,
 * request method, and request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
const registerEmployee = async (req, res) => {
  const { email, employee } = req.body;
  
  try {
    await EmployeeManagementController.registerEmployee(
      employee.name,
      employee.lastName,
      employee.documentType,
      employee.documentNumber,
      employee.birthday,
      employee.cellphone,
      employee.address,
      email,
      employee.password
    );
    res.status(200).json({ message: "Employee registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering the employee" });
  }
};

/**
 * The function `updateEmployee` updates an employee's information in the Employee Management system.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, and request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const updateEmployee = async (req, res) => {
  const { email, employee } = req.body;
  try {
    await EmployeeManagementController.updateEmployee(employee.name, employee.lastName, employee.documentType, employee.documentNumber, employee.birthday, employee.cellphone, employee.address, email)
    res.status(200).json({ message: "Employee updated succesfully" })
  } catch (error) {
    res.status(500).json({ error: "Error updating employee" });
  }
};

/**
 * The deleteEmployee function is an asynchronous function that deletes an employee from the
 * EmployeeManagementController and returns a success message or an error message.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request method, request headers,
 * request parameters, request body, etc. In this case, `req.params.id` is used to access the `id`
 * parameter from
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object and provides methods to set the
 * response status, headers, and body. In this code snippet, it is used to send a JSON response with
 */
const deleteEmployee = async (req, res) => {
  try {
    await EmployeeManagementController.deleteEmployee(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the employee" });
  }
};

module.exports = {
  getEmployeeData,
  registerEmployee,
  deleteEmployee,
  updateEmployee,
};

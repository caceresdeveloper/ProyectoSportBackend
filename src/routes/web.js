const express = require("express");
const service = require("../services/loginService");
const serviceCustomerManagement = require("../services/customerManagementService");
const serviceEmployeeManagement = require("../services/employeeManagementService");
const serviceBook = require("../services/createBookService");

const router = express.Router();


/* The line `router.post("/login/validateUser", service.validateLogin);` is defining a route for
handling a POST request to "/login/validateUser". When a POST request is made to this route, the
`service.validateLogin` function will be called to handle the request. This route is typically used
for validating user login credentials. */
router.post("/login/validateUser", service.validateLogin);


/* These lines of code are defining routes for handling various HTTP requests related to customer
management. */
router.get("/dashBoard/customersManagement", serviceCustomerManagement.getCustomerData);
router.post("/dashboard/registerCustomer/register", serviceCustomerManagement.registerCustomer);
router.patch("/dashboard/customersManagement/edit", serviceCustomerManagement.updateCustomer);
router.delete("/dashboard/customersManagement/delete/:id", serviceCustomerManagement.deleteCustomer);
router.patch("/dashBoard/loansManagement/changeStatus/:email/:id", serviceCustomerManagement.updateStatus);
router.get("/dashBoard/loansHistoryManagement/:email", serviceCustomerManagement.getCustomerDataUnique);


/* These lines of code are defining routes for handling HTTP GET and POST requests related to loan
management. */
router.get(
  "/dashBoard/loansManagement",
  serviceCustomerManagement.getCustomerData
);
router.post(
  "/dashboard/registerLoan/register",
  serviceCustomerManagement.registerLoan
);

/* These lines of code are defining routes for handling various HTTP requests related to employee
management. */
router.get("/dashBoard/EmployeeManagement", serviceEmployeeManagement.getEmployeeData);
router.post("/dashboard/registerEmployee/register", serviceEmployeeManagement.registerEmployee);
router.patch("/dashboard/employeeManagement/edit", serviceEmployeeManagement.updateEmployee);
router.delete("/dashboard/employeeManagement/delete/:id", serviceEmployeeManagement.deleteEmployee);

/* These lines of code are defining routes for handling various HTTP requests related to book
management. */
router.get("/dashBoard/bookManagement", serviceBook.getBookData);
router.post("/book/createBook", serviceBook.createBook);
router.delete("/dashboard/booksManagement/delete/:id", serviceBook.deleteBook);
router.patch("/dashboard/bookManagement/edit", serviceBook.updateBook);

module.exports = router;

const User = require("../models/User");

/**
 * The function `getEmployeeData` retrieves employee data from the database and formats it into an
 * array of objects.
 * @returns The function `getEmployeeData` returns an array of formatted employee objects.
 */
const getEmployeeData = async () => {
  try {
    const employees = await User.find({ "employee.rol": "employee" });
    const formattedEmployees = employees.map((user) => {
      const { _id, email, employee } = user;
      return {
        _id,
        username: email,
        ...employee._doc,
      };
    });
    return formattedEmployees;
  } catch (error) {
    return [];
  }
};

/**
 * The function `registerEmployee` is used to register a new employee with their personal information
 * and validate their age.
 * @param name - The first name of the employee.
 * @param lastName - The `lastName` parameter is a string that represents the last name of the employee
 * being registered.
 * @param documentType - The documentType parameter represents the type of document that the employee
 * is providing for identification purposes. It could be a passport, driver's license, national ID
 * card, etc.
 * @param documentNumber - The documentNumber parameter is the identification number of the employee,
 * such as a passport number or national ID number.
 * @param birthday - The birthday parameter is the date of birth of the employee.
 * @param cellphone - The cellphone parameter is the employee's cellphone number.
 * @param address - The address parameter is a string that represents the employee's address.
 * @param email - The email parameter is the email address of the employee being registered.
 * @param password - The password parameter is the password that the employee will use to log in to
 * their account.
 */
const registerEmployee = async (
  name,
  lastName,
  documentType,
  documentNumber,
  birthday,
  cellphone,
  address,
  email,
  password
) => {
  try {
    const currentDate = new Date();
    const birthdayDate = new Date(birthday);
    const ageDifferenceInMs = currentDate - birthdayDate;
    const ageInYears = ageDifferenceInMs / (1000 * 60 * 60 * 24 * 365.25);
    if (ageInYears < 18) {
      throw new Error("The employee must be older than 18");
    }
    const existingUser = await User.findOne({
      "employee.documentNumber": documentNumber,
    });

    const existingUserEmail = await User.findOne({
      email: email,
    });

    if (existingUserEmail) {
      throw new Error("A user with this email already exists.");
    }

    if (existingUser) {
      throw new Error("A user with this document number already exists.");
    }

    await User.create({
      email: email,
      employee: {
        password: password,
        rol: "employee",
        name: name,
        lastName: lastName,
        documentType: documentType,
        documentNumber: documentNumber,
        cellphone: cellphone,
        address: address,
        birthday: birthday,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * The function `updateEmployee` updates the information of an employee in a database based on their
 * email.
 * @param name - The first name of the employee.
 * @param lastName - The `lastName` parameter is the last name of the employee.
 * @param documentType - The document type of the employee, such as "ID card", "passport", "driver's
 * license", etc.
 * @param documentNumber - The documentNumber parameter is the unique identification number of the
 * employee's document, such as a national identification number or passport number.
 * @param birthday - The birthday parameter is the date of birth of the employee.
 * @param cellphone - The `cellphone` parameter is the new cellphone number of the employee.
 * @param address - The address parameter is a string that represents the employee's address.
 * @param email - The email parameter is the email address of the employee whose information needs to
 * be updated.
 */
const updateEmployee = async (
  name,
  lastName,
  documentType,
  documentNumber,
  birthday,
  cellphone,
  address,
  email
) => {
  try {
    const user = await User.findOne({
      email: email,
      "employee.rol": "employee",
    });

    if (user) {
      user.employee.name = name;
      user.employee.lastName = lastName;
      user.employee.documentType = documentType;
      user.employee.documentNumber = documentNumber;
      user.employee.birthday = birthday;
      user.employee.cellphone = cellphone;
      user.employee.address = address;
      await user.save();
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * The deleteEmployee function deletes an employee from the database by their ID.
 * @param id - The `id` parameter is the unique identifier of the employee that you want to delete from
 * the database.
 * @returns If the user is found and successfully deleted, nothing is returned. If the user is not
 * found, an error is thrown with the message "User doesnt exist".
 */
const deleteEmployee = async (id) => {
  try {
    const user = await User.findByIdAndRemove(id);

    if (user) {
      return;
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEmployeeData,
  registerEmployee,
  deleteEmployee,
  updateEmployee,
};

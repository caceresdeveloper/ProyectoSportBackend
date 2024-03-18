const User = require('../models/User')
const Book = require('../models/Book')

/**
 * The function `getCustomerData` retrieves customer data from the database and formats it into an
 * array of objects.
 * @returns The function `getCustomerData` returns an array of formatted customer data.
 */
const getCustomerData = async () => {
  try {
    const customers = await User.find({ 'customer.rol': 'customer' });
    const formattedCustomers = customers.map((user) => {
      const { _id, email, customer } = user;
      return {
        _id,
        username: email,
        ...customer._doc,
      };
    });
    return formattedCustomers;
  } catch (error) {
    return [];
  }
}

/**
 * The function `registerCustomer` creates a new user with customer details and saves it to a database.
 * @param name - The first name of the customer.
 * @param lastName - The `lastName` parameter is the last name of the customer.
 * @param documentType - The document type of the customer, such as "passport" or "driver's license".
 * @param documentNumber - The documentNumber parameter is the unique identification number of the
 * customer's document, such as a national identification number or passport number.
 * @param birthday - The birthday parameter is the date of birth of the customer.
 * @param cellphone - The cellphone parameter is the customer's phone number.
 * @param address - The address parameter is a string that represents the customer's address.
 * @param email - The email parameter is the email address of the customer.
 * @param password - The password parameter is the password that the customer will use to log in to
 * their account.
 * @param loans - The "loans" parameter is an optional parameter that represents an array of loan
 * objects associated with the customer. If no loans are provided, it defaults to an empty array.
 */
const registerCustomer = async (
  name,
  lastName,
  documentType,
  documentNumber,
  birthday,
  cellphone,
  address,
  email,
  password,
  loans
) => {
  try {
    const existingUser = await User.findOne({
      "customer.documentNumber": documentNumber,
    });

    if (existingUser) {
      throw new Error("A user with this document number already exists.");
    }
    const existingUserEmail = await User.findOne({
      email: email,
    });

    if (existingUserEmail) {
      throw new Error("A user with this email already exists.");
    }
    await User.create({
      email: email,
      customer: {
        password: password,
        rol: "customer",
        name: name,
        lastName: lastName,
        documentType: documentType,
        documentNumber: documentNumber,
        cellphone: cellphone,
        address: address,
        birthday: birthday,
        loans: loans || [],
      }
    });
  } catch (error) {
    throw error
  }
}

/**
 * The function `updateCustomer` updates the customer information in a database if the user exists.
 * @param name - The first name of the customer.
 * @param lastName - The `lastName` parameter is the last name of the customer.
 * @param documentType - The document type of the customer, such as "passport" or "driver's license".
 * @param documentNumber - The documentNumber parameter is the unique identification number of the
 * customer's document, such as a national identification number or passport number.
 * @param birthday - The birthday parameter is the date of birth of the customer.
 * @param cellphone - The cellphone parameter is the customer's phone number.
 * @param address - The address parameter is a string that represents the customer's address.
 * @param email - The email parameter is the email address of the customer whose information needs to
 * be updated.
 * @param loans - The `loans` parameter is an array that contains information about the loans
 * associated with the customer.
 */
const updateCustomer = async (
  name,
  lastName,
  documentType,
  documentNumber,
  birthday,
  cellphone,
  address,
  email,
  loans
) => {
  try {
    const user = await User.findOne({ email: email, 'customer.rol': 'customer' });

    if (user) {
      user.customer.name = name;
      user.customer.lastName = lastName;
      user.customer.documentType = documentType;
      user.customer.documentNumber = documentNumber;
      user.customer.birthday = birthday;
      user.customer.cellphone = cellphone;
      user.customer.address = address;
      user.customer.loans = loans
      await user.save();
    } else {
      throw new Error("User doesnt exist")
    }
  } catch (error) {
    throw error
  }
}

/**
 * The function `deleteCustomer` is an asynchronous function that deletes a user with the specified id
 * and throws an error if the user doesn't exist.
 * @param id - The `id` parameter is the unique identifier of the customer that you want to delete from
 * the database.
 * @returns nothing if the user is successfully deleted.
 */
const deleteCustomer = async (id) => {
  try {
    const user = await User.findByIdAndRemove(id);
    if (user) {
      return 
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) { 
    throw error
  }
};

/**
 * The function `registerLoan` is an asynchronous function that registers a loan for a user and a book,
 * updating the user's loan history and decreasing the number of available copies of the book.
 * @param username - The username parameter is the email of the user who wants to register a loan.
 * @param ISBN - The ISBN parameter is a unique identifier for a book. It stands for International
 * Standard Book Number and is used to identify books worldwide.
 * @returns Nothing is being returned explicitly in the code.
 */
const registerLoan = async (username, ISBN) => {
  try {
    const user = await User.findOne({ email: username, 'customer.rol': 'customer' })
    const book = await Book.findOne({ ISBN })

    if (user && book) {
      const currentDate = new Date()
      const endDate = new Date(currentDate)
      endDate.setDate(currentDate.getDate() + 8)

      const newLoan = {
        id: username + currentDate,
        isbn: ISBN,
        startDate: currentDate,
        endDate: endDate,
        state: true,
      }
      book.copies--
      user.customer.loans.push(newLoan)
      await user.save()
      await book.save()

      return;
    } else {
      throw new Error("User or book doesnt exist");
    }
  } catch (error) {
    throw error
  }
}

/**
 * The function `updateStatus` updates the state of a loan for a specific user based on their email and
 * loan ID.
 * @param email - The email parameter is the email address of the user whose loan status needs to be
 * updated.
 * @param id - The id parameter is the unique identifier of the loan that needs to be updated.
 * @returns The function does not explicitly return anything.
 */
const updateStatus = async (email, id) => {
  try {
    const user = await User.findOne({ email: email, 'customer.rol': 'customer' })
    if (user) {
      const loanToUpdate = user.customer.loans.find((loan) => loan.id === id)
      if (loanToUpdate) {
        loanToUpdate.state = false
        await user.save()
        return
      } else {
        throw new Error("Loan doesnt exist")
      }
    } else {
      throw new Error("User doesnt exist")
    }
  } catch (error) {
    throw error
  }
}

/**
 * The function `getCustomerDataUnique` is an asynchronous function that retrieves a user's data based
 * on their email and customer role.
 * @param email - The email parameter is the email address of the customer for which you want to
 * retrieve the data.
 * @returns The function `getCustomerDataUnique` returns the user object that matches the given email
 * and has a customer role of 'customer'.
 */
const getCustomerDataUnique = async (email) => {
  try {
    const user = await User.findOne({ email: email, 'customer.rol': 'customer' });
    return user
  } catch (error) {
    throw error
  }
};

module.exports = {
  getCustomerData,
  registerCustomer,
  deleteCustomer,
  updateCustomer,
  registerLoan,
  updateStatus,
  getCustomerDataUnique,
};

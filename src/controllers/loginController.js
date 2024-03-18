const User = require('../models/User');

/**
 * The function `validateLogin` takes a username and password as input, and checks if the user exists
 * in the database and if the password matches the user's password, returning the user's role if
 * successful or null if not.
 * @param username - The username parameter is the email address of the user trying to log in.
 * @param password - The password parameter is the password entered by the user during the login
 * process.
 * @returns The function `validateLogin` returns the role of the user if the username and password are
 * valid, otherwise it returns `null`.
 */
const validateLogin = async (username, password) => {
  try {
    const user = await User.findOne({ email: username });
    if (user) {
        if(user.admin){
            if (user.admin.password === password) {
                return user.admin.rol;
            } else {
                return null;
            }
        }
        if(user.employee){
            if (user.employee.password === password) {
                return user.employee.rol;
            } else {
                return null;
            }
        }
        if(user.customer){
            if (user.customer.password === password) {
                return user.customer.rol;
            } else {
                return null;
            }
        }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

module.exports = {
  validateLogin
};




const mongoose = require('mongoose')

/* The code is defining a Mongoose schema for a loan. The loan schema has the following properties: */
const loanSchema = new mongoose.Schema({
  id: String,
  isbn: String,
  startDate: Date,
  endDate: Date,
  state: Boolean
});


/* The `adminSchema` is defining the schema for the "admin" role in the application. It specifies the
properties that an admin user should have, such as password, role, name, last name, document type,
document number, cellphone, address, and birthday. The `{ _id: false }` option is used to disable
the automatic generation of an `_id` field for documents created using this schema. */
const adminSchema = new mongoose.Schema({
  password: String,
  rol: String,
  name: String,
  lastName: String,
  documentType: String,
  documentNumber: String,
  cellphone: String,
  address: String,
  birthday: Date
}, { _id: false });

/* The code is defining a Mongoose schema for the "employee" role in the application. It specifies the
properties that an employee user should have, such as password, role, name, last name, document
type, document number, cellphone, address, and birthday. The `{ _id: false }` option is used to
disable the automatic generation of an `_id` field for documents created using this schema. */
const employeeSchema = new mongoose.Schema({
  password: String,
  rol: String,
  name: String,
  lastName: String,
  documentType: String,
  documentNumber: String,
  cellphone: String,
  address: String,
  birthday: Date
}, { _id: false });

/* The `customerSchema` is defining the schema for the "customer" role in the application. It specifies
the properties that a customer user should have, such as password, role, name, last name, document
type, document number, cellphone, address, birthday, and loans. */
const customerSchema = new mongoose.Schema({
  password: String,
  rol: String,
  name: String,
  lastName: String,
  documentType: String,
  documentNumber: String,
  cellphone: String,
  address: String,
  birthday: Date,
  loans: [loanSchema]
}, { _id: false });

/* The code is defining a Mongoose schema for a user. The user schema has the following properties: */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: adminSchema,
  employee: employeeSchema,
  customer: customerSchema
});

/* `const User = mongoose.model('users', UserSchema)` is creating a Mongoose model named "User" based
on the "UserSchema" schema. */
const User = mongoose.model('users', UserSchema)

module.exports = User;

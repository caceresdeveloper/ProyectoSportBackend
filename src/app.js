/* This code is setting up a basic Express server in JavaScript. */
const express = require("express")
const app = express();
const cors = require('cors')
require('dotenv').config()

require('./drivers/connect-db')

app.use(express.json())
app.use(cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));


app.set("PORT", process.env.PORT || 4000);
app.listen(app.get("PORT"), () => {
  console.log(`Server deployed on port ${app.get("PORT")}`)
});

const webRoutes = require("./routes/web");
app.use("/", webRoutes);

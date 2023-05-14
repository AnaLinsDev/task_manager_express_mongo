const express = require("express");
const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");



require("dotenv").config();
/* 
    dotenv is used to configure the app configuration
    mostly if you don't want to show the config to the users.
    OBS: put it on .gitignore.
*/

app.use(express.static('./public'))
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

//middlewares
app.use(notFound)
app.use(errorHandler)

// --------------------------

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`\n Server is listening on port ${port}... \n `)
    );
  } catch (err) {
    console.log(`\n ${err} \n`);
  }
};

start();

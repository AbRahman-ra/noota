// @ts-check

const app = require("./app");
const connectDB = require("./config/database");

// Initialization
const PORT = process.env.PORT || 4000;

// Establish the server connection after connecting to database
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
);

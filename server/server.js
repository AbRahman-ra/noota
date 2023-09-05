// @ts-check

const app = require("./app");
const connectDB = require("./config/database");
require("dotenv").config({ path: "./.env" });

// INITIALIZATION
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

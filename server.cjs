const express = require("express");
const errorHandler = require("./middleware/errorHandler.cjs");
const connectDb = require("./config/dbConnection.cjs");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes.cjs"));
app.use("/api/users", require("./routes/userRoutes.cjs"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

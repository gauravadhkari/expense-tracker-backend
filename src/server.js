const app = require("./app")
const helmet = require("helmet");
app.use(helmet());
require("dotenv").config( { path : "../.env"})
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});
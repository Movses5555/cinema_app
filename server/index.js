const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { sequelize } = require('./src/models/index.js');
const routes = require("./src/routes/index.js");
const uploadsRoute = require("./src/utils/uploads.js");

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", uploadsRoute);
app.use(bodyParser.json());

app.use("/api", routes);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });
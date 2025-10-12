require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const dbConnect = require('./config/db');

app.use(cors());
app.use(express.json());

app.use(require("./controllers/polls"));
app.use(require("./controllers/users"));

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

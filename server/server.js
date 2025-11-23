require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const dbConnect = require('./config/db');

app.use(cors());
app.use(express.json());

app.use(require("./controllers/feedback"));

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
});

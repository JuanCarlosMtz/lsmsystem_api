const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT

const { connection } = require("./config/db.js");

app.use(express.json())

app.get('/', function (req, res) {
    res.send('Home');
});

app.use(require('./routes/routes.js'));

app.listen(port, () => {
 console.log(`Listening port ${port}`);
});
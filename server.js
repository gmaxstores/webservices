const express = require("express");
const app = express();
const routes = require("./routes");
const contactsRoute = require("./routes/contactsRoute")
const mongodb = require("./data/database");
const bodyParser = require("body-parser");


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes)

// route to all contacts
app.use("/contacts", contactsRoute);

mongodb.connectToDatabase((err) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    }
    else {
        app.listen(port);
        console.log(`Server is running on http://localhost:${port} and mongodb is connected`);
    }
});


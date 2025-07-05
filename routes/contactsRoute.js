const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contactsController");

// route to get all contacts
router.get("/", contactsController.getAllContacts);

//route to get a contact by id
router.get("/:id", contactsController.getContactById);

module.exports = router;
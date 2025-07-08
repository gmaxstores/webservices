const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contactsController");

// route to get all contacts
router.get("/", contactsController.getAllContacts);

//route to get a contact by id
router.get("/:id", contactsController.getContactById);

//route to create a new contact
router.post("/new", contactsController.createNewContact);

//route to update a contact by id
router.put("/update/:id", contactsController.updateContactById);

//route to delete a contact by id
router.delete("/delete/:id", contactsController.deleteContactById);

module.exports = router;
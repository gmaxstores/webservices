const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const contactsController = {};

//get all contacts
contactsController.getAllContacts = async (req, res) => {
    try {
        const contacts = await mongodb.getDataBase().db('webservices').collection('contacts').find().toArray();
        res.status(200).send(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//get contact by id
contactsController.getContactById = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const contact = await mongodb.getDataBase().db('webservices').collection('contacts').find({_id: contactId}).toArray();
        res.status(200).send(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//create new contact
contactsController.createNewContact = async (req, res) => {
    try {
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
        const result = await mongodb.getDataBase().db('webservices').collection('contacts').insertOne(newContact);
        res.status(201).send({ message: "Contact created successfully", contactId: result.insertedId });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//update contact by id
contactsController.updateContactById = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const updatedContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
        const result = await mongodb.getDataBase().db('webservices').collection('contacts').updateOne(
            { _id: contactId },
            { $set: updatedContact }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Contact updated successfully" });
        } else {
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//delete contact by id
contactsController.deleteContactById = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDataBase().db('webservices').collection('contacts').deleteOne({ _id: contactId });
        if (result.deletedCount > 0) {
            res.status(200).send({ message: "Contact deleted successfully" });
        } else {
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = contactsController;
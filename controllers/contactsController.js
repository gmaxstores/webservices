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

module.exports = contactsController;
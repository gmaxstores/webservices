const baseController = {};


baseController.getIndex = (req, res) => {
    res.send("Hello world!");
};

module.exports = baseController;
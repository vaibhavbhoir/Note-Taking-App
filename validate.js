const validate = (req,res) => {
    if (!req.body.note || req.body.note < 3) {
        res.status(400).send("Note needs to be more than 3 letters");
    }
}
module.exports = validate;
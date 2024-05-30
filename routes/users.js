var express = require("express");
var router = express.Router();
const user_form = require("../controllers/forms/user.form");

/* GET users listing. */
router.post("/userDetails", user_form.fill_form);

module.exports = router;

const express = require("express");
const router = express.Router();

//Get api/post
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
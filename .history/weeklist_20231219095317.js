const express = require("express");
const router = express.Router();

const app3 = express();

router.get('/weeklists', (req, res) => {
    
});

app3.get("/weeklist", (req, res) => {
  res.send("Weeklists");
});

module.exports = router;

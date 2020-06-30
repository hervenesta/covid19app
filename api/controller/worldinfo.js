const express = require('express');
let router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
    (async () => {
        try {
          const response = await fetch('https://api.covid19api.com/summary');
      
          const data = await response.json();
          res.send(data.Countries);
      
        } catch (err) {
          console.error(err);
        }
      })();
})

module.exports = router;
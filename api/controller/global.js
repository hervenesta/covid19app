const express = require('express');
let router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
    // fetch('https://api.covid19api.com/summary')
    (async () => {
        try {
          const response = await fetch('https://api.covid19api.com/summary');
      
          const data = await response.json();
          res.send([{
              global: data.Global,
              Date: data.Countries[0].Date
          }]);
      
        } catch (err) {
          console.error(err);
        }
      })();
})

module.exports = router;
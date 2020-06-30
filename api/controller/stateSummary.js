const express = require('express');
let router = express.Router();
const fetch = require("node-fetch");

router.get("/:id", (req, res) => {
    let state = req.params.id;
    (async () => {
        try {
          const response = await fetch('https://covidtracking.com/api/states');
      
          const data = await response.json();
          const filterdata = data.filter((d) => {
              return d.state == state;
          })
          res.send(filterdata);
      
        } catch (err) {
          console.error(err);
        }
      })();
})

module.exports = router;
const express = require('express');
let router = express.Router();
var request = require("request");
require('dotenv').config();

router.get('/:id', (req, res) => {
    let province = req.params.id;
    var options = {
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats',
    qs: {country: 'USA'},
    headers: {
        'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var json = body;
        var obj = JSON.parse(json);
        var data = obj.data.covid19Stats;
        var newdata = data.filter(function(d) {
            return d.province === province;
        })
        res.send(newdata);
    });
      
})

module.exports = router;
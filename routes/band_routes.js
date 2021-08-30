var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/", async (req, res) => {
    try {
    const url='http://localhost:8080/api/job-role/all';
    await fetch(url)
    fetch(url)
    .then(data => { return data.json()})
    .then(band_data => {res.render('training_for_band', {bands: band_data})});
}
catch(err){
    res.render('training_for_band',{bands: ""});
}
});


module.exports = router;
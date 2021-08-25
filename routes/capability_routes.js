var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/job-family", async (req, res) => {

    const url='http://localhost:8080/api/job-family/all';
    fetch(url)
    .then(data => { return data.json()})
    .then(job_families_data => {res.render('job_family', {job_families: job_families_data})});
});


module.exports = router;
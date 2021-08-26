var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/job-family", async (req, res) => {
    try {
    const url='http://localhost:8080/api/job-family/all';
    await fetch(url)
    .then(data => { return data.json()})
    .then(job_families_data => {res.render('job_family', {job_families: job_families_data})});
    }
    catch(err){
        res.render('job_family',{job_families: ""});
    }
});



module.exports = router;
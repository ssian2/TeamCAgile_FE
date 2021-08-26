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

router.get("/all", async (req, res) => {
    try {
    const url='http://localhost:8080/api/capability/all';
    await fetch(url)
    .then(data => { return data.json()})
    .then(job_capabilities_data => {res.render('job_roles_capability', {job_capabilities: job_capabilities_data})});
    }
    catch(err){
        res.render('job_roles_capability',{job_capabilities: ""});
    }
});

module.exports = router;
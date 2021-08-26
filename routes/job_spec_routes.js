var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


//displays specification for a particular role 
router.get("/:specid", async (req, res) => {

    const url='http://localhost:8080/api/job-role/view-job-spec/' + req.params.specid;
    fetch(url)
    .then(data => { return data.json()})
    .then(jobspec_data => {res.render('job_roles_spec', {job_roles_spec: jobspec_data})});
});

//displays all roles with their specs 
router.get("/", async (req, res) => {

    const url='http://localhost:8080/api/job-role/view-job-spec/';
    fetch(url)
    .then(data => { return data.json()})
    .then(alljobspec_data => {res.render('all_job_specs', {all_job_specs_data: alljobspec_data})});
});

module.exports = router;
var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/", async (req, res) => {

    const url='http://localhost:8080/api/job-role/all';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles', {job_roles: jobrole_data})});
});


router.get("/by-band", async (req, res) => {

    const url='http://localhost:8080/api/job-role/view-band-level';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles_by_band', {job_roles: jobrole_data})});
});


module.exports = router;
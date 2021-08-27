var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/", async (req, res) => {
    try {
    const url='http://localhost:8080/api/job-role/all';
    await fetch(url)
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles', {job_roles: jobrole_data})});
}
catch(err){
    res.render('job_roles',{job_roles: ""});
}
});

router.get("/by-band", async (req, res) => {
    try{
    const url='http://localhost:8080/api/job-role/view-band-level';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles_by_band', {job_roles: jobrole_data})});
    }catch (err) {
        res.render('job_roles_by_band', { job_roles: "" });
    }
});

router.get("/responsibilities-per-role", async (req, res) => {
    try{
    const url='http://localhost:8080/api/job-role/view-responsibilities-per-role';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles_responsibilities', {job_roles: jobrole_data})});
    }catch (err) {
        res.render('job_roles_by_band', { job_roles: "" });
    }
});

module.exports = router;
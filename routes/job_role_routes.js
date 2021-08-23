var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/", async (req, res) => {

    const url='https://mocki.io/v1/01fef238-e169-4344-b86b-3abd1d99e644';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobrole_data => {res.render('job_roles', {job_roles: jobrole_data})});
});


router.get("/", async (req, res) => {

    const url='https://mocki.io/v1/cdd1fc06-7d5a-45b8-aac5-283b7bad4b46';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobspec_data => {res.render('job_roles_spec', {job_roles_spec: jobspec_data})});
});

module.exports = router;
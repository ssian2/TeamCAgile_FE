var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


router.get("/", async (req, res) => {

    const url='https://mocki.io/v1/cdd1fc06-7d5a-45b8-aac5-283b7bad4b46';
    fetch(url)
    .then(data => { return data.json()})
    .then(jobspec_data => {res.render('job_roles_spec', {job_roles_spec: jobspec_data})});
});

module.exports = router;
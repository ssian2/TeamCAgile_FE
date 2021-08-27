var express = require('express')
const fetch = require("node-fetch");
var router = express.Router()


//displays specification for a particular role 
router.get("/:specid", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/job-role/view-job-spec/' + req.params.specid;
        await fetch(url)
            .then(data => { return data.json() })
            .then(jobspec_data => { res.render('job_roles_spec', { job_roles_spec: jobspec_data }) });
    }
    catch (err) {
        res.render('job_roles_spec', { job_roles_spec: "" });
    }
});

module.exports = router;
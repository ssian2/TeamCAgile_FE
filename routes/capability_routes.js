var express = require('express')
const fetch = require("node-fetch");
var router = express.Router();


router.get("/", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/capability/with-roles';
        await fetch(url)
            .then(data => { return data.json() })
            .then(job_capabilities_data => { res.render('job_roles_capability', { capability: job_capabilities_data }) });
    }
    catch (err) {
        res.render('job_roles_capability', { capability: "" });
    }});
        
router.get("/job-family", async (req, res) => {
    try {
        const url='http://localhost:8080/api/job-family/all';
        await fetch(url)
        .then(data => { return data.json()})
        .then(job_families_data => {res.render('job_family', {job_families: job_families_data})});
    } catch(err) {
        res.render('job_family',{job_families: ""});
    }
});


router.get("/get/:name", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/capability/get-capability/' + req.params.name;
        await fetch(url)
            .then(data => { return data.json() })
            .then(capabilities_data => { res.render('job_roles_families', { capabilities: capabilities_data }) });
    }
    catch (err) {
        res.render('job_roles_families', { capabilities: "" });
    }
});


router.get("/matrix/:name", async (req, res) => {
    try {
        const role_data = 'http://localhost:8080/api/job-role/by-capability/' + req.params.name;
        const family = 'http://localhost:8080/api/capability/get-capability/' + req.params.name;
        const band_orders = 'http://localhost:8080/api/bands/order';

        //Fetch all 3 Urls and map the reponses to the reponse variable. 
       await Promise.all([fetch(role_data), fetch(family), fetch(band_orders)])
            .then(function (responses) {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            }).then(function (data) {
                let data_dict = { roles: data[0], family: data[1], band_level: data[2] }
                res.render('capability_matrix', { data: data_dict })
            });
    } catch {
        res.render('capability_matrix', { data: '' })
    }

});

router.get("/leads", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/capability/leads';
        await fetch(url)
            .then(data => { return data.json() })
            .then(capability_lead_data => { res.render('capability_leads', { capability_leads: capability_lead_data }) });
    }
    catch (err) {
        res.render('capability_leads', { capability_leads: "" });
    }
});


module.exports = router;

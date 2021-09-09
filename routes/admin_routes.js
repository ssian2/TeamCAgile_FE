const express = require('express');
const fetch = require('node-fetch');
const { render } = require('nunjucks');
var router = express.Router();

function validate_connection(req, res) {
    // put validation code here
    // return true if okay
    return true;
    // res.render('error', {error: {code: 403, message:'Access denied.'}});
    // res.statusCode = 403;
}

// Rendering of form outsourced to a function so we don't 
// repeat code in get & post requests
async function render_add_job_role(req, res) {
    try {
        const band_url = 'http://localhost:8080/api/bands/all';
        const families_url = "http://localhost:8080/api/job-family/all";

        // Use Promise.all to await multiple promised in parallel
        let [bands_data, families_data] = await Promise.all([
            fetch(band_url)
                .then(res => res.json()),
            fetch(families_url)
                .then(res => res.json())
        ]);
        
        // req.body contains sent contents of the form so values are
        // re-rendered to the user if validation fails
        res.render('add_job_role', {
            job_families: families_data,
            bands: bands_data,
            body: req.body,
            sources: req.sources
        });
    }
    catch (err) {
        console.log(err);
        res.render('error', {error: {code:500, message:'Internal server error.'} });
    }
}

router.get("/", async(req, res) => {
    if (validate_connection(req)) {
        res.render('admin_index', {});
    }
});

router.get("/add-job-role", async(req, res) => {
    if (validate_connection(req)) {
        await render_add_job_role(req, res);
    }
});

router.post("/add-job-role", async(req, res) => {
    if (validate_connection(req)) {
        const url = 'http://localhost:8080/api/job-role/add';
        let json = await fetch(url, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(console.log);

        if (json.okay) {
            // Code 200, everything's fine
        } else {
            // Code 400 or 500, not okay
            if (req.sources) {
                delete req[sources];
            }
            req.sources = json.sources;
        }

        await render_add_job_role(req, res);
    }
});

router.get("/delete-job-roles", async (req, res) => {
    try {
        const url='http://localhost:8080/api/job-role/all';
        await fetch(url)
        fetch(url)
        .then(data => { return data.json()})
        .then(jobrole_data => {res.render('job_roles', {job_roles: jobrole_data})});
    } catch(err) {
        res.render('job_roles',{job_roles: ""});
    }
});


router.get("/job-roles-spec/:specid", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/job-role/view-job-spec/' + req.params.specid;
        await fetch(url)
            .then(data => { return data.json() })
            .then(jobspec_data => { res.render('job_roles_spec', { job_roles_spec: jobspec_data ,id_data: req.params.specid, admin: true}) });
    }
    catch (err) {
        res.render('job_roles_spec', { job_roles_spec: "" });
    }
});

router.get("/delete/:specid",async (req,res)=>{
    try{
        
        const url = 'http://localhost:8080/api/job-role/delete/' + req.params.specid;
         await fetch(url, {
                method: 'DELETE',
                })
                .then(text => { return text.text()}) 
                .then(variable => {if(variable=="Deleted")
                {
                    res.render('correctly_deleted',{what: "job role",what_id:req.params.specid});
                }
            else{
                    res.render('error.njk');
            } });
    }
    catch (err) {
        res.render('error.njk');
    }
});

router.get("/add/capability", async (req, res) => {
        res.render('add_cap', { body: req.body, sources: req.sources}) ;
    });
    


router.post("/add/capability", async(req, res) => {
    if (validate_connection(req)) {
        const url = 'http://localhost:8080/api/capability/add';
        let json = await fetch(url, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(console.log);

        if (json.okay) {
            // Code 200, everything's fine
            res.render('succes_add_cap')

        } else {
            // Code 400 or 500, not okay
            if (req.sources) {
                delete req[sources];
            }
            req.sources = json.sources;
            res.render('add_cap', { body: req.body, sources: req.sources}) ;
        }

        
    }
});


module.exports = router;
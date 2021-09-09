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
        const band_url = 'http://localhost:8080/api/band';
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
        .then(data => { return data.json()})
        .then(jobrole_data => {res.render('delete-job-roles', {job_roles: jobrole_data})});
    } catch(err) {
        res.render('delete-job-roles',{job_roles: ""});
    }
});

/* route for page with all roles available to edit */
router.get("/edit-roles", async (req, res) => {
    try {
        const url='http://localhost:8080/api/job-role/all';
        await fetch(url)
        .then(data => { return data.json()})
        .then(jobrole_data => {res.render('all_roles_to_edit', {job_roles: jobrole_data})});
    } catch(err) {
        res.render('all_roles_to_edit',{job_roles: ""});
    }
});

/* route for page to edit a specific role */
router.get("/edit-roles/:id", async (req, res) => {
    try {
        const roles_url='http://localhost:8080/api/job-role/all';
        const bands_url='http://localhost:8080/api/bands/all';
        const capability_url='http://localhost:8080/api/capability/';
        let [jobrole_data, bands_data, capability_data] = await Promise.all([
            fetch(roles_url)
            .then(data => { return data.json()}),
            fetch(bands_url)
            .then(data => { return data.json()}),
            fetch(capability_url)
            .then(data => { return data.json()})
          ])

          res.render('edit_job_role', {
            job_roles: jobrole_data,
            bands: bands_data,
            capabilities: capability_data,
            body: req.params.id
        });

    } catch(err) {
        res.render('edit_job_role',{job_roles: ""});
    }
});

router.post("/edit-roles/:id", async(req, res) => {
    if (validate_connection(req)) {
        const url = 'http://localhost:8080/api/job-role/edit/' + req.params.id;
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
    }
});

router.get("/job-roles-spec/:specid", async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/job-role/view-job-spec/' + req.params.specid;
        await fetch(url)
            .then(data => { return data.json() })
            .then(jobspec_data => { res.render('job_roles_spec_admin', { job_roles_spec: jobspec_data ,id_data: req.params.specid}) });
    }
    catch (err) {
        res.render('job_roles_spec_admin', { job_roles_spec: "" });
    }
});

router.delete("/delete/:specid",async (req,res)=>{
    try{
        
        const url = 'http://localhost:8080/api/job-role/delete/' + req.params.specid;
        fetch(url, {
                method: 'DELETE',
                })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))
                .then(returned_data => {res.render('correctly_deleted',{what: "job role",what_id:req.params.specid})});
                
                
    }
    catch (err) {
        res.render('error.njk');
    }
    /* use router.get for editing the role! */
});


module.exports = router;
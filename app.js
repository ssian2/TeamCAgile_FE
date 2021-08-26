/*jshint globalstrict: true, devel: true, node: true*/
'use strict';

require('dotenv').config();
const nunjucks = require('nunjucks');
var path = require('path');
var express = require('express');
var app = express();

/* 
    Configure view engine
*/
nunjucks.configure('views', {
    express: app,
    autoescape: true
});

app.set('view engine', 'njk');

/* 
    Using body parser in Express v4.16.0 and higher
*/
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

/*
    Routing
*/

const job_role_routes = require('./routes/job_role_routes');
app.use("/job-roles",job_role_routes);

const capability_routes = require('./routes/capability_routes');
app.use("/capabilities",capability_routes);

const spec_route = require('./routes/job_spec_routes');

app.use("/job-roles-spec",spec_route);


app.get("/", (req, res) => res.render('index'));
app.get("*", (req, res) => res.render('notfound'));

/* Port configuration */
let server = app.listen(process.env.PORT || 7999, function () {
    console.log(`Application started on PORT: ${process.env.PORT || 7999}`);
});

/* Handle interrupt to close the application */
process.on('SIGINT', function () {
    console.log("Application shutting down...");
    process.exit();
});

module.exports = server;
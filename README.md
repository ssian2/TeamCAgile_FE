# Team C Job Role Application

**PROBLEM STATEMENT**

Currently within Kainos there is not one source of truth to view job roles
and the relevant information attached (e.g. job descriptions, capability,
competencies, banding etc) this can be confusing and time-consuming for 
employees to retrieve the relevant job role information.

**VISION**

An online job application that serves both Kainos employees and recruitment admin to retrieve and update job roles and their relevant information.

## Description

Our online job application allows you to view job roles available at Kainos, 
including relevant information such as job description, capability, competencies, 
banding and training. 

The application can be navigated as an Admin or an Employee with the following
options available for each group: 

**Admin**

* Add
    * new job role to existing capability and band
    * new capability
    * a job role to a band (existing capability)
    * a new job family
    

* Edit or delete
    * a job role
    * a capability 
    * a job band information 
    * a job family
    
**Employee**

* View 
    * job roles available at Kainos
    * job specification information for each job role
    * the capability under which a job role falls within
    * the band levels for each job role
    * a list of competencies for each band level
    * a list of responsibilities for each job role
    * a matrix of band name, capability and job family for each role
    * training available for band level (categorised by their band)
    * information about capability leads 
    * each job family per capability
    
## Getting Started

For optimal performance, use Google Chrome to access the web application. 

### Accessing the web application

Follow the links below to access the application: 

  * Homepage: http://localhost:7999/
  * Job roles: http://localhost:7999/job-roles
  * Job capabilities: http://localhost:7999/capabilities
  * Job training: http://localhost:7999/bands-training
  * Job band-levels: http://localhost:7999/job-roles/by-band

### Prerequisites

* Install Maven onto your machine (most IDEs should already have this included
  as a plugin), and run the following command 
```
mvn clean install
```  

* Install npm by running the following command - this should install all 
the dependencies required to run the server and use the application as 
  expected on the web. 
```
npm install
```

### Using the job application

* Command to start the application in the backend
```
mvn spring-boot:run
```

* Command to start the server in the frontend
```
npm start
```

Navigate your way to the job application using the links listed above and you
should be able to use the app either as an Admin or an Employee. 

NOTE: the application must be running in the backend in order to view the 
relevant data on the web application. 

### Running tests 

* To run tests in the backend, run the following command 
```
mvn clean verify
```

* To run tests in the frontend, run the following command
```
npm test
```

## Authors

* Tasnya Khanom 
* Aimee Boyle 
* Patrycja Weihs
* Lukasz Całka
* Simran Sian

## Version History

* 0.1
    * Initial Release
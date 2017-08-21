# Nigerian Crop DashBoard

Downloaded several CSV files from http://nigeria.opendataforafrica.org/ on several crop prices. 
Then parsed and uploaded the data collected to a PostgresSQL Sequelized database. The database is then wrapped in a
Express based API that is accessed by the AngularJS front-end to gain insight on crop trends.

To run locally

-run postgres and createdb 'releaf' in a terminal window

-git clone https://github.com/clockwrk/releaf-programming-challenge.git

-cd releaf-programming-challenge/

-npm install

-node seed/seed.js

-node app.js

-visit https://localhost:3000

Currently Deployed

https://desolate-castle-17166.herokuapp.com

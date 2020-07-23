---
name: Improve the project
about: Improving the project
title: Issue#1
labels: ''
assignees: EmanuelRaileanu

---

To do list:
- create a knex.js configuration file;
- add a migration to create the table 'movies' with the following columns: id, title, description, runtime (in minutes), releaseDate, budget, gross, overallRating, createdAt, updatedAt (find appropriate data types for each column);
- create a 'routes' folder inside the 'src' folder for the api routes;
- create routes for each entity: 'root.ts' for '/', 'movieRoutes.ts' for /movies etc.;
- create a route that catches errors in case an user tries to access and url that we don't have a route for.

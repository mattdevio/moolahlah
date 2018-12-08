moolahlah
=========

[![Project Management | Github Projects](https://img.shields.io/badge/pm-github-orange.svg)](https://github.com/mattdevio/moolahlah/projects/3) [![CircleCI](https://circleci.com/gh/mattdevio/moolahlah.svg?style=svg)](https://circleci.com/gh/mattdevio/moolahlah)

A personal budget and finance management platform that helps you save money by effortless planning.

Running Requirements
====================

+ Node.js > v10.12.0
+ NPM > v6.00
+ Redis v4.0.0 (LTS / Alpine)
+ MySQL v5.7.24

Running with Docker
===================

The project is setup for docker containers. Though not required, It is recommended you use [docker](https://www.docker.com) & `docker-compose` to get the application up and running.

**DON'T RUN NPM INSTALL, DOCKER WILL DO IT FOR YOU!!!**
This is because the `bcrypt.js` package required for authorization installs locals binaries which are OS specific.

**The easy way to get going...**

```bash
$ git clone https://github.com/mattdevio/moolahlah.git && cd moolahlah
$ npm run config
$ docker-compose build
$ docker-compose up
```

**Notice:** The first time you start the application, it will take a _long time_ to download the docker images and initialize the services. After the services are started you will need to run the database migrations and seeders to initialize the db. A good indication that the containers have finished building is when you see the webpack compiler output.

You can read more about the migration tools in [database management](#database_management).

```bash
$ npm run migrate:latest
$ npm run seed:run
```

<table>
  <tr>
    <td>Build Docker Images</td>
    <td>docker-compose build</td>
  </tr>
  <tr>
    <td>Start Containers w/ All Output</td>
    <td>docker-compose up</td>
  </tr>
  <tr>
    <td>Start Containers In Detached Mode</td>
    <td>docker-compose up -d</td>
  </tr>
  <tr>
    <td>Start Containers w/ App Output (Prefered)</td>
    <td>docker-compose up -d && docker attach moolahlah</td>
  </tr>
  <tr>
    <td>List All Containers</td>
    <td>docker ps -a</td>
  </tr>
  <tr>
    <td>Destroy Containers</td>
    <td>docker-compose down</td>
  </tr>
</table>

Custom Configuration
====================

All enviornment variables are stored within an `.env` file not included in this repository. You can find an example of this file and it's associated variables by looking at the [example.env](/example.env) file.

In an effort to make configuration as easy as possible, you can use the built in configure command to load the defaults. This will setup the `.env` file for you.

```
npm run config
```

You can pass optional arguments to the command to override the default variables. This will merge the defaults found in the [example.env](/example.env) file with your values.

```
npm run config \
  PORT=1337 \
  BASE_URL=https://moolahlah.com
```

Database Management
===================

We are using the [knex cli](https://knexjs.org/#Migrations-CLI) to manage database migrations and seeders. You can access the cli commands by running `npx knex` from the root of this project. Here is a list of the most common commands.

<table>
  <tr>
    <td>npx knex migrate:make &lt;name&gt;</td>
    <td>Start a new migration file</td>
  </tr>
  <tr>
    <td>npx knex migrate:latest</td>
    <td>Run all pending migrations</td>
  </tr>
  <tr>
    <td>npx knex migrate:rollback</td>
    <td>Rollback the last set of migrations</td>
  </tr>
  <tr>
    <td>npx knex seed:make &lt;name&gt;</td>
    <td>Start a new seeder file</td>
  </tr>
  <tr>
    <td>npx knex seed:make &lt;name&gt;</td>
    <td>Start a new seeder file</td>
  </tr>
  <tr>
    <td>npx knex seed:run</td>
    <td>Run seeder files</td>
  </tr>
</table>

Migrations have to be run from the server where is running the application; in our case, that would be the docker container. Here is how you gain acesss to the docker container to run migrations (make sure the containers are running first).

```bash
$ docker exec -it moolahlah /bin/bash
```

Alternatively, you can use the `npm scripts` which have an alias to remotely execute the migration commands on the docker container while on your local enviornment.

<table>
  <tr>
    <td>npm run migrate:latest</td>
    <td>runs 'npx knex migrate:latest' remotely</td>
  </td>
  <tr>
    <td>npm run migrate:rollback</td>
    <td>runs 'npx knex migrate:rollback' remotely</td>
  </td>
  <tr>
    <td>npm run seed:run</td>
    <td>runs 'npx knex seed:run' remotely</td>
  </td>
</table>

Coding Style
============

All code is formatted via the eslint and the rules found in the [.eslintrc](/.eslintrc.js) file.

Deployment
==========

Nothing defined yet...

Built With
==========

* [MySQL DB](https://dev.mysql.com/doc/) - The Database Used
* [mysql2](https://www.npmjs.com/package/mysql2) - The MySQL Node.js Driver
* [Knex.js](https://knexjs.org/) - MySQL Query Builder / Migrations & Seeder
* [Objection.js](https://vincit.github.io/objection.js/) - The MySQL ORM
* [Redis](https://redis.io/) - Session Store
* [Express](https://expressjs.com/en/4x/api.html) - Server Side Web Framework
* [React](https://reactjs.org/docs/) - Client Interface Development Library
* [Redux](https://redux.js.org/) = State Management
* [Webpack](https://webpack.js.org/concepts/) - Bundler / Compiler
* [Styled Components](https://www.styled-components.com/docs/basics) - CSS Modules

Versioning
==========

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

Contributors
============

* **Matthew Greenberg** - *Lead Developer* - [MattDevIo](https://github.com/mattdevio)

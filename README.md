# moolahlah

[![Project Management | Github Projects](https://img.shields.io/badge/pm-github-orange.svg)](https://github.com/mattdevio/moolahlah/projects/3)

A personal budget and finance management platform that helps you save money by effortless planning.

## Getting Started

**Clone** -> **Install Dependencies** -> **Configure** -> **Start Server**

```
git clone https://github.com/mattdevio/moolahlah.git && cd moolahlah
npm install
npm run config
npm start
```

### Prerequisites

+ Node.js v8.9.4 (LTS / Carbon)
+ NPM v6.00
+ Redis v4.0.0 (LTS / Alpine)

### Custom Configuration

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

### Running with Docker

The project is setup for docker containers. You can use `docker-compose` to get the application up and running without any trouble. Here are some commands to help you.

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

**The easy way to get going...**

```
$ npm run config
$ docker-compose build
$ docker-compose up -d && docker attach moolahlah
```

### And coding style tests

All code is formatted via the eslint and the rules found in the [.eslintrc](/.eslintrc.js) file.

## Deployment

Nothing to deploy yet...

## Built With

* [MongoDB](https://docs.mongodb.com/manual/) - The Database Used
* [Redis](https://redis.io/) - Session Store
* [Mongoose](https://mongoosejs.com/docs/guide.html) - Database ORM
* [Express](https://expressjs.com/en/4x/api.html) - Server Side Web Framework
* [React](https://reactjs.org/docs/) - Client Interface Development Library
* [Redux](https://redux.js.org/) = State Management
* [Webpack](https://webpack.js.org/concepts/) - Bundler / Compiler
* [Styled Components](https://www.styled-components.com/docs/basics) - CSS Modules

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Matthew Greenberg** - *Lead Developer* - [MattDevIo](https://github.com/mattdevio)

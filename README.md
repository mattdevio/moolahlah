# moolahlah

![Trello - Moolahlah](https://img.shields.io/badge/project%20management-trello-blue.svg)

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

### Custom Configuration

All enviornment variables are stored within an `.env` file not included in this repository. You can find an example of this file and it's associated variables by looking at the [example.env](/example.env) file.

In an effort to make configuration as easy as possible, you can use the built in configure command to load the defaults. This will setup the `.env` file for you.

```
npm run config
```

You can pass optional arguments to the command to override the default variables. This will merge the defaults found in the [example.env](/example.env) file with your values.

```
npm run config PORT=1337 BASE_URL=https://moolahlah.com
```

### Running with Docker

The project is setup for docker containers. You can use `docker-compose` to get the application up and running without any trouble. Here are some commands to help you.

```
// (Step 1) Build Docker Images
$ docker-compose build

// (Step 2) Start Docker Containers
$ docker-compose up

// (Step 3) Stop and Remove Docker Containers
$ docker-compose down
```

### And coding style tests

All code is formatted via the eslint and the rules found in the [.eslintrc](/.eslintrc.js) file.

## Deployment

Nothing to deploy yet...

## Built With

* [MongoDB](https://docs.mongodb.com/manual/) - The Database Used
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

<h1 align="center">🐮 moolahlah</h1>
<h3 align="center">Your personal cash cow!</h3>

A financial planner that aims to help users save money by tracking their income, spending and debt.

[Moolahlah App](http://moolahlah.com)

## Directory

1. [Brief](/docs/BRIEF.md)
2. [Project Milestones](/docs/PROJECT_MILESTONES)
3. [Spec](/docs/SPEC.md)

### Setup & Development

**Requirements :**<br>
> Node Version `8.9.4` (LTS / Carbon) or Higher<br>
> NPM Version `6.0.0` or Higher<br>

**Bash Commands :**
<table>
  <tr>
    <td>Clone Repository</td>
    <td><pre>git clone https://github.com/mattdevio/moolahlah.git && cd moolahlah</pre></td>
  </tr>
  <tr>
    <td>Install Dependencies</td>
    <td><pre>npm install</pre></td>
  </tr>
  <tr>
    <td>Configure Enviornment</td>
    <td><pre>npm run config [variable=value]</pre></td>
  </tr>
  <tr>
    <td>Start Dev Server</td>
    <td><pre>npm start</pre></td>
  </tr>
</table>

**Getting Started :**<br>
Clone the repository and install the dependencies. After installation has finished configure the enviornment by adding an `.env` file to the project root. All project enviornment variables can be found the [example.env](/example.env) file. You can use the Configure Enviornment command in the table above to set this up automatically for you. Once your enviornment is configured, you can start the development server with the common `npm start` command.

**Project Structure :**<br>
This is a MERN stack application meaning it uses Mongo, Express, React, Node. All of the server side code can be found in the directory named `server`. Likewise, client side code can be found in the directory labeled `client`. 

**Code of Conduct :**<br>
All code must follow the linter rules. Use comments when neccessary, but less is more.

___
**Designed by Matthew Greenberg**<br>
**Fullsail University**<br>
**Capstone Project**<br>
**September - November 2018**


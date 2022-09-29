# Overview

API Code will ideally be written with [REST design patterns](https://blog.stoplight.io/api-design-patterns-for-rest-web-services), [MVC project structure](https://developer.mozilla.org/en-US/docs/Glossary/MVC) and [SOLID principals](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design). This source code uses the [NodeJS Runtime Environment](https://nodejs.org/en/) and the [ExpressJS Framework](https://expressjs.com/). For detailed information on the stack used __you should always check the online documentation & communities for the most up to date information.__  

### Project Dependencies
- [NodeJS Runtime Environment](https://nodejs.org/en/)
    - [ExpressJS](https://expressjs.com/)
    - [Dotenv](https://www.npmjs.com/package/dotenv)
    - [Sequelize](https://sequelize.org/)
    - [ValidatorJS](https://github.com/mikeerickson/validatorjs)
    - [Luxon](https://www.npmjs.com/package/luxon)

### Non-Code specific Dependencies
- [Docker](https://www.docker.com/)
- [VS Code](https://code.visualstudio.com/)
    - [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

# Development

## Run Nodemon locally ( without mock database)

> Nodemon enabled hot refresh for your code changes for an easier deving experiencing.

**__In most cases this will require database credentials to be added to .env__**

Change directory to /src and run the following command:  
```
npm run start-dev
```

## Run locally ( with mock database )

With [Docker]() installed on you machine issue the following command from within the root directory:  
> ( The folder that has the docker-compose.yml file )
```
docker-compose up
```
> if you are having issues, try running the following command to force docker to re-build the container
```
docker-compose up --build
```

**__Once docker-compose is finished visit localhost:3000!__**

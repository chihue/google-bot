#Integration with Google chat API

You need to enable the Google Chat API to make this project work, at [https://developers.google.com/chat?hl=es-419](https://developers.google.com/chat?hl=es-419). Once created, you will need an HTTP server listening via HTTPS for the webhook. In this example, we will be using Nodejs and Fastify.

##Configuration

For make this project working first need to create a `.env` file on your root directory , need to add the variables `MONGODATABASE` and `MONGOURI` with the [MongoDB](https://www.mongodb.com/) configuration, this server is used to save the User API key for the Chat GPT api.

To run this project, you need to have Node.js and npm installed in your project.

First, you need to execute the command `npm install` to download the dependencies. Once this is done, you can run the project with the command `npm run start`.
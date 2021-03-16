import express from 'express';
import mongoConnection from './core/mongoConnection';
import routes from './core/routes';
import server from './core/server';
import parseRes from './core/parseRes';

const app = express();

app.disable('x-powered-by'); //Disable Express Signature

mongoConnection();
parseRes(app);
routes(app);

server(app);

import express, { Application, Request, Response } from "express";
const { ApolloServer } = require("apollo-server-express");
// import typeDefs from "./schema/typeDefs";
import resolvers from "./resolvers/resolvers";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import getUser from './getUser';

const connectServer = async () => {
  try {
     mongoose.connect("mongodb://romeo:qw123456@mongo:27017/wallss", {
      useNewUrlParser: true,
    });
    const db =  mongoose.connection;
    db.on("error", console.error.bind(console, "Connect error"));
    db.once("open", () => {
      console.log("connected");
    });

    const typeDefs = fs
      .readFileSync(path.join(__dirname, "./schema", "schema.graphql"), "utf-8")
      .toString();

    const app: Application = express();
    type Req = {  req: any }
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: (context:any) => {
        const token = context.req.headers.authorization || '';
        const user:any = getUser(token);

        return {user};
      }
    });

    server.applyMiddleware({ app });

    app.get("/", (req: Request, res: Response) => {
      res.send("Helloss World!fuck offs yepsaaa");
    });

    app.listen(4000);
  } catch (error) {
      console.log(error);
  }
};

connectServer();
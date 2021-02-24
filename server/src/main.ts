import express, { Application, Request, Response } from "express";
const { ApolloServer } = require("apollo-server-express");
// import typeDefs from "./schema/typeDefs";
import resolvers from "./resolvers/resolvers";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

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
    const server = new ApolloServer({
      typeDefs,
      resolvers,
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
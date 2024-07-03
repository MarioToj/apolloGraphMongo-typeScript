import { startStandaloneServer } from "@apollo/server/standalone";
import UsersDataSource from "./datasources/UserDataSource";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import gql from "graphql-tag";
import dotenv from 'dotenv'
import path from "path";
// TODO


dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected TO Mongo")
})
const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
      encoding: "utf-8",
    })
);
const server = new ApolloServer({typeDefs, resolvers});


async function startApolloServer() {

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;

            return {
                dataSources: {
                    mongoDataSource: new UsersDataSource(),
                }
            }
        }
    })

    console.log(`
        🚀  Server is running!
        📭  Query at ${url}
      `);
};

startApolloServer();
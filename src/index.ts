require("dotenv").config();
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import cookieParser from "cookie-parser";

import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

const main = async () => {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [MeResolver, RegisterResolver, LoginResolver],
    });

    const app = Express();

    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

    app.use(cookieParser());

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        plugins: [
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log("Express app listening at http://localhost:%s", port);
    });
};

main();

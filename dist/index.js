"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const message_1 = require("./resolvers/message");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const main = async () => {
    const connection = await (0, typeorm_1.createConnection)();
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use((0, cors_1.default)());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [message_1.MessageResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map
import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { Log, User, Project, ProjectType } from './entities/';
require('dotenv').config();

const connection_options: ConnectionOptions = {
    type: "mongodb",
    name: '',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: true,
    authSource: 'admin',
    useUnifiedTopology: true,
    entities: [
        Log, Project, User, ProjectType
    ],
}
const connection: Promise<void | Connection> = createConnection(connection_options).catch((error: any) => console.log(error));


export async function getRepository<T>(arg: { new(): T; }): Promise<any> {
    const conn = await connection;
    if (!conn) throw new Error('Connection to db not available');

    return conn.getMongoRepository(arg);
}
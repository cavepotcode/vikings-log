import 'reflect-metadata';
import {createConnection, Connection, ConnectionOptions} from "typeorm";
import { Log } from './entities/log';


const connection_options: ConnectionOptions = {
  type: "mongodb",
  name: '',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  logging: true,
  synchronize: true,
  entities: [
    Log
  ],
}
const connection: Promise<void | Connection> = createConnection(connection_options).catch((error: any) => console.log(error));


export async function getRepository<T>(arg: {new(): T; }): Promise<any> {
  const conn = await connection;
  if (!conn) throw new Error('Connection to db not available');

  return conn.getRepository(arg);
}
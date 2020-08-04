import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

export enum Level{
  INFO = 0,
  WARNING,
  ERROR
}

@Entity('logs')
export class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: Date;
  
  @Column()
  level: string;
  
  @Column()
  message: string;

  @Column()
  stackTrace: string;

  @ObjectIdColumn()
  project: ObjectID;
}
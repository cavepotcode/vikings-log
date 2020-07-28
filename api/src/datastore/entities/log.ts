import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

export enum Level{
  INFO = 0,
  WARNING,
  ERROR
}

@Entity()
export class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: Date;
  
  @Column()
  level: number;
  
  @Column()
  message: string;

  @Column()
  stackTrace: string;

  @Column()
  project: string;
}
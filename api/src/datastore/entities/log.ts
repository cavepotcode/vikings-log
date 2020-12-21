import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

export enum Level {
    INFO = 0,
    WARNING,
    ERROR
}

@Entity('logs')
export class Log {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    message: string;

    @Column()
    level: string;

    @Column()
    type: string;

    @ObjectIdColumn()
    project: ObjectID;

    @Column()
    date: Date;

    @Column()
    info: object;

    @Column()
    exception: object;
}
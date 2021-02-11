import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

export enum Level {
    INFO = 0,
    WARNING,
    ERROR
}
export class HistoryLog {
    date: Date;
    fromStatus:string;
    toStatus:string;
    user: string;
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

    @Column()
    status: string;

    @Column()
    history: Array<HistoryLog>;
}
import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";


@Entity('projects')
export class Project {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    apiKey: string;

    @Column()
    type: any;

    @Column()
    status: string;

    @Column()
    typeLogStatus: Array<string>;

    @Column()
    urls:Array<string>
}
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
    type: string;

    @Column()
    status: string;
}
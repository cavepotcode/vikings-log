import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('projectType')
export class ProjectType {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
  
  @Column()
  apiKey: string;
}
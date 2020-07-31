import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  projects: Array<string>
}
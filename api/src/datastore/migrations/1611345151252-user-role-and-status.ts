import { MigrationInterface, QueryRunner } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { UserRoles, UserStatus } from "../../sdk/constants";

export class userRoleAndStatus1611345151252 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('users', {}, { $set: { status: UserStatus.ACTIVE, role: UserRoles.USER } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

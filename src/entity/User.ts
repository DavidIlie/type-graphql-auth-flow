import { Entity, ObjectIdColumn, Column, BaseEntity, ObjectID } from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Column("boolean", { default: false })
    isAdmin: boolean = false;

    @Column("boolean", { default: false })
    confirmed: boolean = false;

    @Column()
    password: string;
}

import { Role } from "./role.enum";
import { RequestWithUser } from "./requestWithUser";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export interface RequestWithID extends RequestWithUser{
    name: string;
    email: string;
    role: Role;
    id: UUID
}
import {Role} from "./role.enum";

export type jwtPayload = {
    name: string;
    role: Role;
}
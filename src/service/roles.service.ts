import { Role } from "../utils/role.enum";

class RolesService{

    getAllRoles():string[]{
        const roles: string[] = [];
        for(const role in Role){
            roles.push(role);
        }
        return roles
    }

}
export default RolesService;
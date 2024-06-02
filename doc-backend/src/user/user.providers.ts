import { User } from "./entities/user.entity";

export const UserProvider  = [
    {provide : 'UserRepository', useValue :  User}
]
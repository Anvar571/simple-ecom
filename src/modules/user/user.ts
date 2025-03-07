import { BaseClass } from "../base/base";
import { UserModel } from "./user.types";

export class User extends BaseClass<UserModel> {
    constructor(user: UserModel) {
        super(user);
    }

    public get name() {
        return this.data.name;
    }

    public get password() {
        return this.data.password;
    }

    public get phone() {
        return this.data.phone;
    }

    public get email() {
        return this.data.email;
    }

    public get createdAt() {
        return this.data.createdAt;
    }

    public get updatedAt() {
        return this.data.updatedAt;
    }
}

import userModel from "@/resources/user/user.model";

import token from "@/utils/token";

class UserService {

    private user = userModel;

    /**
     * Register a new user 
     */

    public async register(
        name:string,
        email:string,
        password:string,
        role:string
    ):Promise<string|Error>{
        try {
            const user = await this.user.create({name,email,password,role});
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            console.log(error);
            throw new Error("Unable to create user");
        }
    }

    
    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('Unable to find user with that email address');
            }
            const checkIsvalid = await user.isValidPassword(password);
            if (!checkIsvalid) {
                throw new Error('Wrong credentials given');
                
            } 
            return token.createToken(user);
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;
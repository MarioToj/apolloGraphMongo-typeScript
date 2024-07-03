import { MongoDataSource } from 'apollo-datasource-mongodb';
import User, { IUser } from '../models/User';
import { CreateUserInput, UpdateUserInput } from '../types';

class UsersDataSource extends MongoDataSource<IUser> {


    constructor() {
        super({
            modelOrCollection: User,
        });
    }

    async getAllUsers() {
        return await this.model.find();        
    }

    async getUser(userId: string) {
        return await this.model.findById(userId);
    }

    async createUser(user: CreateUserInput) {

        const newUser = new this.model(user);
        
        return await newUser.save();
    }

    async editUserById(id: string, user: UpdateUserInput) {

        const userUpdated = this.model.findByIdAndUpdate(id, user);
        
        return await userUpdated;
    }

    async deleteUserById(id: string) {

        const user = this.model.findByIdAndDelete(id);
        
        return await user;
    }
};

export default UsersDataSource;
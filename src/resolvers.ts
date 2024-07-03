import { Resolvers } from "./types";


export const resolvers: Resolvers = {

   Query: {
    async getUsers(_, __, { dataSources }) {

        try {
            
            const users = await dataSources.mongoDataSource.getAllUsers();

            return {
                code: 200,
                success: true,
                message: 'Users fetched successfully!',
                users: users
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Failed to fetch users: ${error.errmsg}`,
                users: []
            }
        }

    },

    async getUser(_, { userId }, { dataSources }) {

        try {
            
            const userFound = await dataSources.mongoDataSource.getUser(userId);

            return {
                code: 200,
                success: true,
                message: 'User found!',
                user: userFound
            }
        } catch (error) {
            return {
                code: 404,
                success: false,
                message: 'User not found!',
                user: null
            }
        }
    }
   },

   Mutation: {

    createUser: async (_, { input }, { dataSources }) => {
        
        try {
            const newUser = await dataSources.mongoDataSource.createUser(input);
            
            return {
                code: 201,
                success: true,
                message: 'User created!',
                user: newUser,
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Something went wrong: ${ error.errmsg }`,
                user: null,
            }
        }
    },

    async editUser(_, { id, input }, { dataSources }) {

        try {

            const userUpdated = await dataSources.mongoDataSource.editUserById(id, input);

            return {

                code: 200,
                success: true,
                message: `User updated!`,
                user: userUpdated
            }

        } catch (error) {
            return {
                code: 404,
                success: false,
                message: 'Failed to update user',
                user: null
            }
        }
    },

    async deleteUser(_, { id }, { dataSources }) {

        try {
            
            const user = await dataSources.mongoDataSource.deleteUserById(id);

            return {
                code: 200,
                success: true,
                message: `User with id: ${user.id} was eliminated!`
            }

        } catch (error) {
            return {
                code: 404,
                success: false,
                message: `User with id: ${id} not found!`
            }
        }
    }
   }
}
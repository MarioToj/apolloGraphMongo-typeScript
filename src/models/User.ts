import { Document, Model, Schema, model } from "mongoose"

interface IUser extends Document {

    id: string
    username: string
    password: string
    email: string
}

const userSchema = new Schema<IUser>({
    
    username: { type: String, required: true, unique: true  },
    password: { type: String, required: true},
    email: { type: String, required: true },
});


const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
export { IUser };
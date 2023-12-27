import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a User model type based on the IUser interface
type UserModel = Model<IUser>;

// Check if the model is already defined to prevent redefining it
const User: UserModel = mongoose.models.User as UserModel || model<IUser>('User', userSchema);

export default User;
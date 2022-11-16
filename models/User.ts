import { Schema, models, model } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: any = models.User || model<IUser>("User", UserSchema);

export default User;

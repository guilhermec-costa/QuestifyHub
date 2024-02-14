import mongoose, { Model } from "mongoose";
const { Types } = mongoose.Schema;
import User from "../validations/UserValidation";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: Types.String,
        required: true,
        unique: true
    },
    displayName: Types.String,
    email: {
        type: Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Types.String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



const UserModel = mongoose.model("User", UserSchema);

export default UserModel;


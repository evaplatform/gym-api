// src/models/User.ts
import mongoose from "mongoose";
import { IUser } from "./IUser";
import { paymentInfoSchema } from "../paymentInfo/mongo-schema";
import { CardioByUserSchema } from "../cardioByUser/mongo-schema";
import { BodyBuildingByUserSchema } from "../bodyBuildingByUser/mongo-schema";

const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    profilePhoto: { type: String, default: null, },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: null, },
    bodyBuildingByUser: [BodyBuildingByUserSchema],
    cardioByUser: [CardioByUserSchema],
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: "Academy", default: null },
    paymentInfo: paymentInfoSchema
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
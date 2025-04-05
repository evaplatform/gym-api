import mongoose from "mongoose";
import { IBodyBuildingByUser } from "./IBodyBuildingByUser";

export const BodyBuildingByUserSchema = new mongoose.Schema<IBodyBuildingByUser>({
    exerciseId: { type: String, required: true },
    plan: [
        {
            exerciseId: { type: String, required: true },
            clientWeight: { type: Number, required: true },
            repetitions: { type: Number, required: true },
            goal: { type: String, required: true },
            weekDays: [{ type: String }],
        },
    ],
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
})


// it does not have a mongoose model because it is not a collection
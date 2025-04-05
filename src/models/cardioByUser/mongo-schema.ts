import mongoose from "mongoose";
import { ICardioByUser } from "./ICardioByUser";
import { WeekDaysEnum } from "../../shared/enums/WeekDayEnum";

export const CardioByUserSchema = new mongoose.Schema<ICardioByUser>({
    exerciseId: { type: String, required: true },
    plan: [
        {
            speed: { type: Number, required: true }, // speed in minutes
            distance: { type: Number, required: true }, // Distance in kilometers
            initialDate: { type: Date, required: true },
            finalDate: { type: Date, required: true },
            weekDays: [{ type: String, enum: Object.values(WeekDaysEnum), required: true }],
        },
    ],
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
})


// it does not have a mongoose model because it is not a collection
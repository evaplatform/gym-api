import mongoose from "mongoose";
import { IGroup } from "./IGroup";

const GroupSchema = new mongoose.Schema<IGroup>({
    name: { type: String, required: true, unique: true },
    permissions: {
        drawerMenu: {
            drawer: { type: Boolean, default: false }
        }
    }
    }, {
        timestamps: true // Automatically add createdAt and updatedAt fields
    })

export const GroupModel = mongoose.model<IGroup>("Group", GroupSchema);
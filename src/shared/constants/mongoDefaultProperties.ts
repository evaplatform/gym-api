import mongoose from "mongoose";

export const MONGO_DEFAULT_PROPERTIES = {
    toJSON: {
        virtuals: true, // include the virtuals (eg: id)
        versionKey: false, // remove __v
        transform: function (doc: mongoose.Document, ret: { [key: string]: any }) {
            delete ret._id; // optional: remove _id if you only want id
        },
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
}
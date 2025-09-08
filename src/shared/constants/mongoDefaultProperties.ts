import mongoose from "mongoose";

export const MONGO_DEFAULT_PROPERTIES = {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc: mongoose.Document, ret: { [key: string]: any }) {
        ret.id = ret._id.toString();  // Adicionar id explicitamente
        delete ret._id;
        delete ret.__v;
      }
    },
    toObject: {  // Adicionar toObject também
      virtuals: true,
      versionKey: false,
      transform: function (doc: mongoose.Document, ret: { [key: string]: any }) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      }
    },
    timestamps: true
  };
import mongoose from "mongoose";

const { Schema, model, models, Types } = mongoose;

const connectionSchema = new Schema({
  from: { type: Types.ObjectId, ref: 'user', required: true }, 
  to: { type: Types.ObjectId, ref: 'user', required: true },  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

const connectionModel = models.connection || model('connection', connectionSchema);
export default connectionModel;
import mongoose from "mongoose";

const { Schema, model, models, Types } = mongoose;

const msgSchema = new Schema({
  sender: { type: Types.ObjectId, ref: 'user', required: true },
  receiver: { type: Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  connectionId: { type: Types.ObjectId, ref: 'connection', required: true }
});


const msgModel = models.msg || model('msg', msgSchema);
export default msgModel;
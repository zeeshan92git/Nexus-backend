import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['entrepreneur', 'investor'] },

  // Common Profile Info
  bio: { type: String, default: 'Bio' },
  location: { type: String, default: 'Abc' },
  website: { type: String, default: 'www.edu.com' },
  profileCompleted: { type: Boolean, default: false },

  // Entrepreneur-specific
  startupName: { type: String, default: '' },
  startupDescription: { type: String, default: '' },
  fundingNeed: { type: String, default: '' },
  pitchDeckURL: { type: String, default: '' },

  // Investor-specific
  interests: { type: String, default: '' },
  portfolio: { type: String, default: '' }

}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;

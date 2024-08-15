import { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  avatarUrl?: string;
}

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
});

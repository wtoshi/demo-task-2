import { Schema, Document } from 'mongoose';

export interface Destination extends Document {
  city?: string; // city opsiyonel olabilir çünkü her veri setinde olmayabilir
  country: string;
  iata: string;
}

export const DestinationSchema = new Schema({
  city: { type: String }, // city opsiyonel
  country: { type: String, required: true },
  iata: { type: String, required: true, unique: true },
});

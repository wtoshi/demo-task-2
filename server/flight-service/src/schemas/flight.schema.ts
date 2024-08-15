import { Schema, Document } from 'mongoose';

export interface Flight extends Document {
  flightName: string;
  flightNumber: number;
  departure: string;
  departureTime: Date;
  destination: string;
  arrivalTime: Date;
  airline: string;
  duration: string;
  price: string;
  userName: string;
}

export const FlightSchema = new Schema({
  flightName: { type: String, required: true },
  flightNumber: { type: Number, required: true },
  departure: { type: String, required: true },
  departureTime: { type: Date, required: true },
  destination: { type: String, required: true },
  arrivalTime: { type: Date, required: true },
  airline: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  userName: { type: String, required: true },
});

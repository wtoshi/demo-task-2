import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from './schemas/flight.schema';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import axios from 'axios';
import { Destination } from './schemas/destination.schema';

@Injectable()
export class FlightService {
  private readonly FLIGHT_API_URL = process.env.FLIGHT_API_URL || '';
  private readonly APP_ID = process.env.FLIGHT_APP_ID || '';
  private readonly APP_KEY = process.env.FLIGHT_APP_KEY || '';

  constructor(
    @InjectModel('Flight') private readonly flightModel: Model<Flight>,
    @InjectModel('Destination')
    private readonly destinationModel: Model<Destination>,
  ) {}

  async findById(id: string): Promise<Flight> {
    const flight = await this.flightModel.findById(id).exec();
    if (!flight) {
      throw new NotFoundException(`Flight with ID "${id}" not found`);
    }
    return flight;
  }

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = new this.flightModel(createFlightDto);
    return flight.save();
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.flightModel
      .findByIdAndUpdate(id, updateFlightDto, {
        new: true,
      })
      .exec();
    if (!flight) {
      throw new NotFoundException(`Flight with ID "${id}" not found`);
    }
    return flight;
  }

  async delete(id: string): Promise<void> {
    const result = await this.flightModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Flight with ID "${id}" not found`);
    }
  }

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }

  async findByUserId(userName: string): Promise<Flight[]> {
    return this.flightModel
      .find({ userName: userName })
      .sort({ createdAt: -1 }) // En son eklenen uçuşlar en üstte olacak şekilde sıralar
      .exec();
  }

  async searchFlights(query: any): Promise<any> {
    console.log('searchFlights query:', query);
    console.log('FLIGHT_API_URL:', this.FLIGHT_API_URL);
    console.log('APP_ID:', this.APP_ID);
    console.log('APP_KEY:', this.APP_KEY);

    const response = await axios.get(`${this.FLIGHT_API_URL}/flights`, {
      headers: {
        ResourceVersion: 'v4',
        app_id: this.APP_ID,
        app_key: this.APP_KEY,
      },
      params: query,
    });

    // Headers bilgisi ve link analizi
    const headers = response.headers;
    let next = false;
    let prev = false;

    if (headers.link) {
      const links = headers.link.split(',');

      // next ve prev kontrolü
      next = links.some((link) => link.includes('rel="next"'));
      prev = links.some((link) => link.includes('rel="prev"'));
    }

    // console.log('flight response:', response);

    if (response.status === 200 && response.data.flights.length > 0) {
      // console.log('flights:', response.data.flights);
      return {
        flights: response.data.flights || [],
        next: next,
        prev: prev,
      };
    } else {
      return { message: 'No flights found' };
    }
    // if (response.status === 204 || response.status === 404) {
    //   return { message: 'No flights found' }; // Uçuş bulunmadı mesajı dön
    // } else if (response.status === 200 && response.data.length > 0) {
    //   console.log('flights:', response.data);
    //   return response.data;
    // } else {
    //   throw new NotFoundException(
    //     `Error fetching flights: ${response.statusText}`,
    //   );
    // }
  }

  async suggestDestinations(query: string): Promise<Destination[]> {
    return this.destinationModel
      .find({
        $or: [
          { city: new RegExp(query, 'i') },
          { country: new RegExp(query, 'i') },
          { iata: new RegExp(query, 'i') },
        ],
      })
      .limit(10)
      .exec();
  }

  async fetchAndSaveAllDestinations(): Promise<void> {
    let page = 0;
    let hasMorePages = true;

    while (hasMorePages) {
      const data = await this.getDestinations(page);
      if (data && data.destinations.length > 0) {
        await this.saveDestinations(data.destinations);
        page++;
        // Eğer son sayfadaysak döngüyü bitir
        if (data.destinations.length < 10) {
          hasMorePages = false;
        }
        await this.delay(3000); // Her sayfa isteği arasında 3 saniye
      } else {
        hasMorePages = false;
      }
    }
  }

  async getDestinations(page: number = 0): Promise<any> {
    console.log('Fetching destinations page:', page);
    const response = await axios.get(`${this.FLIGHT_API_URL}/destinations`, {
      headers: {
        ResourceVersion: 'v4',
        app_id: this.APP_ID,
        app_key: this.APP_KEY,
      },
      params: {
        page: page,
        sort: '+iata',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new NotFoundException(
        `Error fetching destinations: ${response.statusText}`,
      );
    }
  }

  async saveDestinations(destinations: any[]): Promise<void> {
    for (const destination of destinations) {
      await this.destinationModel.updateOne(
        { iata: destination.iata },
        {
          city: destination.city || null, // city opsiyonel olarak ekleniyor
          country: destination.country,
        },
        { upsert: true },
      );
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

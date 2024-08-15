import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('/fetch-destinations')
  async fetchDestinations() {
    console.log('Fetching destinations');
    await this.flightService.fetchAndSaveAllDestinations();
    return { message: 'Destinations fetched and saved successfully' };
  }

  @Get('/search')
  async searchFlights(@Query() query: any) {
    console.log('query:', query);
    return this.flightService.searchFlights(query);
  }

  @Get('/suggest-destinations')
  async suggestDestinations(@Query('query') query: string) {
    return this.flightService.suggestDestinations(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-flight')
  async createFlight(@Body() createFlightDto: CreateFlightDto) {
    console.log('createFlightDto:', createFlightDto);
    return this.flightService.create(createFlightDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFlight(@Param('id') id: string) {
    return this.flightService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateFlight(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.flightService.update(id, updateFlightDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFlight(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFlights() {
    return this.flightService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userName')
  async getFlightsByUserId(@Param('userName') userName: string) {
    return this.flightService.findByUserId(userName);
  }
}

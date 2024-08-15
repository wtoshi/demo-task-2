export class UpdateFlightDto {
  readonly flightName?: string; // Uçuş adı
  readonly flightNumber?: number; // Uçuş numarası
  readonly departure?: string; // Kalkış şehri
  readonly departureTime?: Date; // Kalkış zamanı
  readonly departureAirport?: string; // Kalkış havaalanı kodu
  readonly destination?: string; // Varış şehri
  readonly arrivalTime?: Date; // Varış zamanı
  readonly destinationAirport?: string; // Varış havaalanı kodu
  readonly airline?: string; // Havayolu adı
  readonly duration?: string; // Uçuş süresi
  readonly price?: string; // Fiyat
  readonly userId?: string; // Kullanıcı ID'si
}

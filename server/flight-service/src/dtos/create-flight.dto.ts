export class CreateFlightDto {
  readonly flightName: string; // Uçuş adı (örn: Alitalia 1234)
  readonly flightNumber: number; // Uçuş numarası
  readonly departure: string; // Kalkış havaalanı kodu
  readonly departureTime: Date; // Kalkış zamanı
  readonly destination: string; // Varış havaalanı kodu
  readonly arrivalTime: Date; // Varış zamanı
  readonly airline: string; // Havayolu adı
  readonly duration: string; // Uçuş süresi
  readonly price: string; // Fiyat
  readonly userName: string; // Username
}

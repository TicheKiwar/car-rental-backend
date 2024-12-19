export class UpdateReservationDto {
    reservationId: number;
    reservationDate: string;
    reservationDays?: number;
    totalCost?: string;
    clientId?: number;
    vehicleId?: number;
  }
  
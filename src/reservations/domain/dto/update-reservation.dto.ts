export class UpdateReservationDto {
    reservationId: number;
    reservationDate: string;
    reservationDays?: number;
    status?: string;
    totalCost?: string;
    clientId?: number;
    employeeId?: number;
    vehicleId?: number;
  }
  
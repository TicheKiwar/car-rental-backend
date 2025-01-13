import { PaymentDto } from "./dto/payment.dto";

export interface PaymentRepository{
    deposit (paymentDto:PaymentDto)
    createPayReturn(paymentDto:PaymentDto);
}
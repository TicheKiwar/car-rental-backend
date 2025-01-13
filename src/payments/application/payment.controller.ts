import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "../interface/payment.service";
import { PaymentDto } from "../domain/dto/payment.dto";

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }

  @Post("deposit")
  async deposit (
    @Body() paymentDto:PaymentDto
  ){
    return await this.paymentService.deposit(paymentDto)
  }

  @Post("update")
  async updatePayment(@Body() paymentDto: PaymentDto) {
    return await this.paymentService.createPayReturn(paymentDto);
  }
}
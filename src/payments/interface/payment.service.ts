import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payments } from "src/entity/Payments.entity";
import { Repository } from "typeorm";
import { PaymentRepository } from "../domain/payment.repository";
import { PaymentDto } from "../domain/dto/payment.dto";
import { RentalService } from "src/rental/interface/rental.service";
import { Rentals } from "src/entity/Rentals.entity";
@Injectable()
export class PaymentService implements PaymentRepository{
    constructor(
        @InjectRepository(Payments)
        private readonly paymentRepository:Repository<Payments>,
        private readonly rentalService: RentalService,
         @InjectRepository(Rentals)
            private readonly rentalRepository: Repository<Rentals>,
    ){}
    async deposit(paymentDto: PaymentDto) {
        const rental = await this.rentalRepository.findOne({
            where:{
                rentalId:paymentDto.rentalId
            }
        })
        this.rentalService.setRentalStatus(rental,"Por Retirar")
        const payment = this.paymentRepository.create({
            amount:paymentDto.amount,
            isRefundable:true,
            paymentMethodId:paymentDto.paymentMethodId,
            rentalId:paymentDto.rentalId,
            paymentType:paymentDto.paymentType,
            status:"CONFIRMED"
        })
        return await this.paymentRepository.save(payment)
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payments } from "src/entity/Payments.entity";
import { Repository } from "typeorm";
import { PaymentRepository } from "../domain/payment.repository";
import { PaymentDto } from "../domain/dto/payment.dto";
import { RentalService } from "src/rental/interface/rental.service";
import { Rentals } from "src/entity/Rentals.entity";
import { Returns } from "src/entity/Returns.entity";
@Injectable()
export class PaymentService implements PaymentRepository {
    constructor(
        @InjectRepository(Payments)
        private readonly paymentRepository: Repository<Payments>,
        private readonly rentalService: RentalService,
        @InjectRepository(Rentals)
        private readonly rentalRepository: Repository<Rentals>,
        @InjectRepository(Returns)
        private readonly returnsRepository: Repository<Returns>,
    ) { }
    async deposit(paymentDto: PaymentDto) {
        const rental = await this.rentalRepository.findOne({
            where: {
                rentalId: paymentDto.rentalId
            }
        })
        this.rentalService.setRentalStatus(rental, "Por Retirar")
        const payment = this.paymentRepository.create({
            amount: paymentDto.amount,
            isRefundable: true,
            paymentMethodId: paymentDto.paymentMethodId,
            rentalId: paymentDto.rentalId,
            paymentType: paymentDto.paymentType,
            status: "CONFIRMED"
        })
        return await this.paymentRepository.save(payment)
    }

    async createPayReturn(paymentDto: PaymentDto) {
        // Actualizar estado de Rentals
        const rental = await this.rentalRepository.findOne({ where: { rentalId: paymentDto.rentalId } });
        if (!rental) {
            throw new NotFoundException(`Rental with ID ${paymentDto.rentalId} not found`);
        }
    
        rental.status = paymentDto.rentalStatus;
        await this.rentalRepository.save(rental);
    
        // Actualizar costo por daños en Returns
        if (paymentDto.returnId) {
            const returnRecord = await this.returnsRepository.findOne({ where: { returnId: paymentDto.returnId } });
            if (!returnRecord) {
                throw new NotFoundException(`Return with ID ${paymentDto.returnId} not found`);
            }
            returnRecord.costPerDamages = paymentDto.amount;
            await this.returnsRepository.save(returnRecord);
        }
    
        // Crear y guardar el pago
        const payment = this.createPayment(paymentDto, true, "CONFIRMED");
        return await this.paymentRepository.save(payment);
    }
    
    // Método auxiliar para crear el pago
    private createPayment(paymentDto: PaymentDto, isRefundable: boolean, status: string) {
        return this.paymentRepository.create({
            amount: paymentDto.amount,
            isRefundable,
            paymentMethodId: paymentDto.paymentMethodId,
            rentalId: paymentDto.rentalId,
            paymentType: paymentDto.paymentType,
            status,
        });
    }
    

}
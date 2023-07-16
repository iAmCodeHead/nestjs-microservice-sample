import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateOrderRequestDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    userId: number;
}
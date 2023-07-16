import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class AuthRequestDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Min(5)
    password: string;
}
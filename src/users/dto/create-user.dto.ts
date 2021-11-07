/* eslint-disable prettier/prettier */
import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(2, 100)
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Informe um endereço de email válido' })
    @IsString()
    email: string;

    @Length(6, 16)
    @IsString({ message: 'Informe uma senha válida' })
    password: string;

    @Length(6, 16)
    @IsString({ message: 'Informe uma confirmação de senha válida' })
    passwordConfirmation: string;
}
import { IsString, IsNotEmpty, MinLength, Length, IsIn, IsOptional } from 'class-validator';
import { IsUserExist } from '../users/dto/UserCustomValidators.dto';
import { Expose } from 'class-transformer';
import { MIN_SHORT_LENGTH, MAX_SHORT_LENGTH, MIN_PASSWORD_LENGTH } from '../../../constants/validation.constants';
import { Roles } from '../users/users.schema';

export class LoginRequestDTO {
    @IsNotEmpty()
    username: string;

    @MinLength(MIN_PASSWORD_LENGTH)
    @IsNotEmpty()
    password: string;
}

//Return only those fields after login
export const LoginResponseDTO = ['first_name', 'last_name', 'username', 'role'];

export class RegisterRequestDTO {
    @IsOptional()
    @IsString()
    @Length(MIN_SHORT_LENGTH, MAX_SHORT_LENGTH)
    @Expose()
    first_name: string;

    @IsOptional()
    @IsString()
    @Length(MIN_SHORT_LENGTH, MAX_SHORT_LENGTH)
    @Expose()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @IsUserExist()
    @Expose()
    username: string;

    @IsNotEmpty()
    @IsIn([Roles.Admin, Roles.Analyst])
    @Expose()
    role: number;

    @IsString()
    @MinLength(MIN_PASSWORD_LENGTH)
    @Expose()
    password: string;
}

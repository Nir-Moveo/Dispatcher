import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, Length, IsIn, IsOptional, MinLength } from 'class-validator';
import { MIN_SHORT_LENGTH, MAX_SHORT_LENGTH, MIN_PASSWORD_LENGTH } from '../../../../constants/validation.constants';

export const BaseUserResponse = ['username', 'first_name', 'last_name', 'role'];
export const UserWithIdResponse = [...BaseUserResponse, '_id'];

export class CreateUserDTO {}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    @Length(MIN_SHORT_LENGTH, MAX_SHORT_LENGTH)
    @Expose()
    first_name?: string;

    @IsOptional()
    @IsString()
    @Length(MIN_SHORT_LENGTH, MAX_SHORT_LENGTH)
    @Expose()
    last_name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn([1, 2, 3])
    @Expose()
    role?: number;

    @IsOptional()
    @IsString()
    @MinLength(MIN_PASSWORD_LENGTH)
    @Expose()
    password?: string;
}

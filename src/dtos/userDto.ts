import {IsEmail, IsString, IsNotEmpty, IsUUID, IsBoolean} from 'class-validator';

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string
    @IsString()
    @IsNotEmpty()
    readonly lastName: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsString()
    @IsNotEmpty()
    readonly username: string
}

export class updateUserDto {
    @IsUUID()
    @IsNotEmpty()
    readonly userId: string
    @IsString()
    readonly name?: string
    @IsString()
    readonly lastName?: string
    @IsString()
    @IsEmail()
    readonly email?: string
    @IsString()
    readonly username?: string
}

export class updateUsersStatusDto {
    @IsUUID()
    @IsNotEmpty()
    readonly userId: string
    @IsBoolean()
    @IsNotEmpty()
    readonly isDeleted: boolean
}
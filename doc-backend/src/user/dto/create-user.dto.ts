import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
    id : number;
    @ApiProperty({required : true})
    userType : string;
    @ApiProperty({required : true})
    fullName : string;
    @ApiProperty({required : true})
    fatherName : string;
    @ApiProperty({required : true})
    email : string;
    @ApiProperty({required : true})
    password : string;
    @ApiProperty({required : true})
    phone : string;
    @ApiProperty({required : true})
    gender : string;
    @ApiProperty({required : false})
    cnic : string;
    @ApiProperty({required : true})
    dob : Date;
    @ApiProperty({required : false})
    opdCharges : number;
    @ApiProperty({required : false})
    designation : number;
    @ApiProperty({required : false})
    speciality : number;
    @ApiProperty({required : false})
    countryId : number;
    @ApiProperty({required : false})
    stateId : number;
    @ApiProperty({required : false})
    cityId : number;
    @ApiProperty({required : false})
    businessId ?: number;
}

export class LoginDto{
    @IsEmail()
    @ApiProperty({required : true})
    email : string;
    @ApiProperty({required : true})
    password : string;
}
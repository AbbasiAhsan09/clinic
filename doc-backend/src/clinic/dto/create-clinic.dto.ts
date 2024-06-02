import { ApiProperty } from "@nestjs/swagger";
import  { IsEnum } from 'class-validator'
import { Subscriptions } from "src/shared/enum/common.enum";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateClinicDto {
    id? : number;
    @ApiProperty({required : true})
    businessName:string;
    @ApiProperty({required : true})
    businessEmail:string;
    @ApiProperty({required : false})
    businessPhone? : string;
    @ApiProperty({required : true})
    @IsEnum(Subscriptions)
    subscription : Subscriptions;
    @ApiProperty({required : false})
    isIpRestricted?: boolean;
    @ApiProperty({required : false})
    allowedIp?: string;
    @ApiProperty({required : false})
    businessLogo?: string;
    @ApiProperty({required : false})
    address? : string;
    @ApiProperty({required : false})
    website? : string;
    @ApiProperty({required : true, type : CreateUserDto})
    owner : CreateUserDto;
}

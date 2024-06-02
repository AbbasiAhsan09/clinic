import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
    @ApiProperty({required : true})
    fullName : string;
    @ApiProperty({required : true})
    gender:string;
    @ApiProperty({required : true})
    relativeName : string;
    @ApiProperty({required : true})
    relation : string;
    @ApiProperty({required : true})
    ageFormat : string;
    @ApiProperty({required : true})
    age : number;
    @ApiProperty({required : true})
    countryId : number;
    @ApiProperty({required : true})
    stateId : number;
    @ApiProperty({required : true})
    cityId : number;
    @ApiProperty({required : true})
    email : string;
    @ApiProperty({required : true})
    phone : string;
    @ApiProperty({required : false})
    referedBy : number;
    @ApiProperty({required : true})
    entryType : string;
    @ApiProperty({required : true})
    businessId : number;
    @ApiProperty({required : true})
    addedBy : number;
}

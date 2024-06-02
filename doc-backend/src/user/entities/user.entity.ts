import { Model,AutoIncrement, Column, PrimaryKey, Table, DataType, UpdatedAt, CreatedAt, DeletedAt, ForeignKey } from "sequelize-typescript";
import { Clinic } from "src/clinic/entities/clinic.entity";
import { Gender, UserType } from "src/shared/enum/common.enum";

@Table({
    paranoid : true,
    timestamps : true
})
export class User extends Model<User>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id : number;
    @Column({type : DataType.ENUM(
        UserType.SUPERADMIN,UserType.OWNER, 
        UserType.ACCOUNTANT, UserType.DOCTOR, 
        UserType.OPERATOR, UserType.MANAGER
        )})
    userType : string;
    @Column
    fullName : string;
    @Column
    fatherName : string;
    @Column
    email : string;
    @Column
    password : string;
    @Column
    phone : string;
    @Column({type : DataType.ENUM(Gender.M , Gender.F), allowNull  : false})
    gender : string;
    @Column({allowNull : true})
    cnic : string;
    @Column({allowNull : true, type : DataType.DATEONLY})
    dob : Date;
    @Column({allowNull : true})
    opdCharges : number;
    @Column({allowNull : true})
    designation : number;
    @Column({allowNull : true})
    speciality : number;
    @Column({allowNull : true})
    countryId : number;
    @Column({allowNull : true})
    stateId : number;
    @Column({allowNull : true})
    cityId : number;
    @ForeignKey(() => Clinic)
    @Column
    businessId : number;

}

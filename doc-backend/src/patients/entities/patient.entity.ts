import { AutoIncrement, Column,Model, PrimaryKey, Table, DataType, ForeignKey } from "sequelize-typescript";
import { Clinic } from "src/clinic/entities/clinic.entity";
import { Gender, RelationShip } from "src/shared/enum/common.enum";
import { User } from "src/user/entities/user.entity";

@Table({timestamps : true, paranoid : true})
export class Patient  extends Model<Patient> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @Column({allowNull : false})
    fullName : string;
 
    @Column({allowNull : false})
    relativeName : string;
    
    @Column({allowNull : false, 
        type : DataType.ENUM(RelationShip.FATHER,RelationShip.BROTHER,
        RelationShip.MOTHER, RelationShip.DAUGHTER,
        RelationShip.SON)})
    relation : string;
    
    @Column({allowNull : false,type : DataType.ENUM('years','months','days')})
    ageFormat : string;
    
    @Column({allowNull : false})
    age : number;

    @Column
    countryId : number;
    
    @Column
    stateId : number;

    @Column
    cityId : number;

    @Column({allowNull : true})
    email: string;

    @Column({allowNull : true})
    phone : string;
    
    @Column({allowNull : false , type : DataType.ENUM(Gender.F,Gender.M)})
    gender : string;
    @ForeignKey(() => User)
    @Column({allowNull : true})
    referedBy : number;
    
    @Column({type : DataType.ENUM("OPD","ER", "OTHER")})
    entryType : string;

    @ForeignKey(() => Clinic)
    @Column({allowNull : false})
    businessId : number;

    @ForeignKey(() => User)
    addedBy : number;

}
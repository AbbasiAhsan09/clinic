import { AutoIncrement, Column, Model,PrimaryKey, Table, DataType, UpdatedAt, CreatedAt, DeletedAt } from "sequelize-typescript";
import { Subscriptions } from "src/shared/enum/common.enum";
@Table({
    timestamps : true,
    paranoid : true
})
export class Clinic extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column
    id : number;
    @Column
    businessName: string;
    @Column
    businessEmail:string;
    @Column({allowNull : true})
    businessPhone:string;
    @Column({type : DataType.ENUM(Subscriptions.MONTHLY,Subscriptions.QUARTERLY, Subscriptions.BIANNUALY,Subscriptions.ANNUALY)})
    subscription: string;
    @Column({defaultValue : false})
    isIpRestricted : boolean;
    @Column({allowNull : true})
    allowedIp : string;
    @Column({allowNull : true})
    businessLogo: string;
    @Column({allowNull : true})
    address : string;
    @Column({allowNull : true})
    website : string;
    @Column({allowNull : true})
    dailyPatienstSize : number;
}

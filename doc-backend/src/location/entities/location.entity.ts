import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    timestamps : true,
    paranoid : true
})
export class Countries extends Model<Countries> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;
    @Column
    name : string;
    @Column
    code : string;
}

@Table({
    timestamps : true,
    paranoid : true
})
export class States extends Model<States>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;
    @ForeignKey(() => Countries)
    @Column
    countryId : number;
    @Column
    name : string;
    @Column
    code : string;
}

@Table({
    timestamps : true,
    paranoid : true
})
export class Cities extends Model<Cities>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;
    @ForeignKey(() => Countries)
    @Column
    countryId : number;
    @ForeignKey(() => States)
    @Column
    stateId : number;
    @Column
    name : string;
    @Column
    code : string;
}

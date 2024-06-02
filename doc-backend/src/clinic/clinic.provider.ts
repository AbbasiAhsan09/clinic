import { Clinic } from "./entities/clinic.entity";

export const clinicProvider = [
    {provide : 'ClinicRepo' , useValue : Clinic}
]
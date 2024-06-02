import { Patient } from "./entities/patient.entity";

export const patientProvider = [
    {provide : 'PatientRepo', useValue : Patient}
]
import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PatientsService {
  constructor(@Inject('PatientRepo') private readonly patientRepo : typeof Patient){}
  async create(req : Request, createPatientDto: CreatePatientDto) {
    try {
      const loggedUser:User = req["user"];
      createPatientDto.addedBy = loggedUser?.id ?? 1;
      createPatientDto.businessId = loggedUser?.businessId ?? 1;
      return await this.patientRepo.create(createPatientDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(req:Request) {
    const user:User= req["user"];
    return await  this.patientRepo.findAll({where : {businessId : user?.businessId ?? 1} });
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

 async update(req : Request,id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const user: User = req["user"];
      delete updatePatientDto?.businessId;
      const findPatient = await this.patientRepo.findOne({where : {id : id}});
      if(findPatient && findPatient?.businessId === (user?.businessId ?? 1)){
        return await findPatient.update(updatePatientDto);
      }
      throw new Error("Patient Not Found");
    } catch (err) {
      throw new Error(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}

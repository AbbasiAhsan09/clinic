import { Inject, Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from './entities/clinic.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClinicService {
  constructor ( @Inject("ClinicRepo") private readonly clinicRepo : typeof Clinic,
  private readonly userService : UserService,
  ){}
  async create(createClinicDto: CreateClinicDto) {
    try {
      const insertedClinic = await this.clinicRepo.create({...createClinicDto});
      const user = createClinicDto.owner;
      user.businessId = insertedClinic.id;
      return await this.userService.create(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all clinic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}

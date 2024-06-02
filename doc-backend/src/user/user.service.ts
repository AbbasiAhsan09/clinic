import { ConflictException, Inject, Injectable,UnauthorizedException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtConfigService } from 'src/jwt-config-module/jwt.service';

@Injectable()
export class UserService {
  constructor(@Inject("UserRepository") private readonly userRepo : typeof User,
              private readonly jwtConfigService : JwtConfigService){}

 async create(createUserDto: CreateUserDto) {
    try {
      if(await this.getUserByEmail(createUserDto.email)){
        throw new ConflictException("Email already registered!");
      }
      const {password} = createUserDto;
      const hashedPassword = await bcrypt.hash(password,10);
      createUserDto.password = hashedPassword;
      const user = await this.userRepo.create(createUserDto);
      return await this.authorizeUser(user.email, password);
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async authorizeUser(email:string , password: string): Promise<{token:string}>{
    try {
      const user = await this.userRepo.findOne<User>({where : {email : email}});
      if(!user){
        throw new UnauthorizedException("Unauthorized");
      }
      if(await bcrypt.compare(password,user.password)){
        const payload = {id : user.id, email : user.email, user_type : user.userType};
        const token =  await this.jwtConfigService.generateToken(payload);
        return {token};
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async getUserByEmail(email:string){
    return this.userRepo.findOne({where: { email : email}});
  }
async login(email:string , password:string):Promise<{token:string}>{
  return await this.authorizeUser(email,password);
}

async findById(id:number|string){
  return await this.userRepo.findOne({where : {id : +id}});
}
}

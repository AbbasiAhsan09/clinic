import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.providers';
import { JwtConfigModule } from 'src/jwt-config-module/jwt-config-module.module';
import { JwtConfigService } from 'src/jwt-config-module/jwt.service';

@Module({
  controllers: [UserController],
  imports : [JwtConfigModule],
  providers: [UserService, ...UserProvider, JwtConfigService],
  exports : [UserService]
})
export class UserModule {}

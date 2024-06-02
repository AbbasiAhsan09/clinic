import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt.service';

@Module({
    imports : [
        JwtModule.register({
            secret : process.env.JWT_SECRET ?? 'THIS_IS_SECRET',
            signOptions : {expiresIn : '1h'}
        }),
    ],
    exports : [JwtModule],
    providers :[JwtConfigService]
})
export class JwtConfigModule {}

// user-auth.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service'; // Import your user service

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService, // Replace with your user service
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        const user = await this.userService.findById(decoded.userId);
        if (user) {
          req.user = user;
          next();
        } else {
          req.user = false;
        }
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      req.user = false;
      next();
    }
  }
}

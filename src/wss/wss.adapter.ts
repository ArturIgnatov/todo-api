import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import {
  ForbiddenException,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class WssAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication,
    private readonly jwt: JwtService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server: Server = super.createIOServer(3001, options);

    server.use((socket, next) => {
      const token = socket.handshake.auth.token;
      const config = this.app.get(ConfigService);

      if (!token) {
        return next(new ForbiddenException());
      }

      try {
        const payload = this.jwt.verify(token, {
          secret: config.get('JWT_SECRET'),
        });

        if (payload) {
          socket.handshake.auth.user = payload;
        } else {
          return next(new UnauthorizedException());
        }

        next();
      } catch (e) {
        return next(new UnauthorizedException());
      }
    });

    return server;
  }
}

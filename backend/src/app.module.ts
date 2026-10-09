import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CancionesController } from './canciones/canciones.controller';
import { CancionesService } from './canciones/canciones.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'vibra-secreto',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, CancionesController],
  providers: [AuthService, CancionesService],
})
export class AppModule {}
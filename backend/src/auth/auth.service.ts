import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private usuarios = [
    { id: 1, usuario: 'admin', password: bcrypt.hashSync('1234', 10) },
  ];

  constructor(private jwt: JwtService) {
    console.log('Contraseña encriptada de admin:', this.usuarios[0].password);
  }

  login(usuario: string, password: string) {
    const u = this.usuarios.find((x) => x.usuario === usuario);
    if (!u || !bcrypt.compareSync(password, u.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return { token: this.jwt.sign({ sub: u.id, usuario: u.usuario }) };
  }
}
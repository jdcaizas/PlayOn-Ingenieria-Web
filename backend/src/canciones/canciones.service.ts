import { Injectable, NotFoundException } from '@nestjs/common';

export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  album: string;
  genero: string;
}

@Injectable()
export class CancionesService {
  private canciones: Cancion[] = [
    { id: 1, titulo: 'Blinding Lights', artista: 'The Weeknd', album: 'After Hours', genero: 'Pop' },
  ];

  findAll() {
    return this.canciones;
  }

  create(data: Omit<Cancion, 'id'>) {
    const nueva = { id: Date.now(), ...data };
    this.canciones.push(nueva);
    return nueva;
  }

  update(id: number, data: Partial<Cancion>) {
    const c = this.canciones.find((x) => x.id === id);
    if (!c) throw new NotFoundException('Canción no encontrada');
    Object.assign(c, data, { id });
    return c;
  }

  remove(id: number) {
    const i = this.canciones.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException('Canción no encontrada');
    this.canciones.splice(i, 1);
    return { ok: true };
  }
}
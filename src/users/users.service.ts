import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  usuarios = [
    {
      id: 0,
      name: 'Ralph',
      email: 'ralph@gmail.com',
      password: 'bolinha1',
    },
  ];
  create(data: CreateUserDto) {
    this.usuarios.push(data);
  }

  findAll() {
    return this.usuarios;
  }

  findOne(id: number) {
    return this.usuarios[id];
  }

  update(id: number, data: CreateUserDto) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        this.usuarios.splice(i, 1);
      }
    }
    this.usuarios.push(data);
  }

  remove(id: number) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        this.usuarios.splice(i, 1);
      }
    }
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from '../users/enum/role.enum';

@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('create')
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get('find-all')
  findMany(): Promise<Movie[]> {
    return this.service.findMany();
  }

  @UseGuards(AuthGuard())
  @Get('find/:id')
  findUnique(@Param('id') id: string): Promise<Movie> {
    return this.service.findUnique(id);
  }

  @Delete('delete/:id')
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}

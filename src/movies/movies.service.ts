import { User } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.MovieCreateInput): Promise<Movie> {
    const movie = await this.db.movie.create({ data });
    return movie;
  }

  async findMany(): Promise<Movie[]> {
    const movies = await this.db.movie.findMany();
    return movies;
  }

  async findUnique(id: string): Promise<Movie> {
    const movie = await this.db.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Id do Filme não encontrado');
    }

    return movie;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.movie.delete({
      where: { id },
    });

    return {
      message: ' Filme deletado com sucesso',
    };
  }

  async thermometerMovie(userId: string, movieId: string): Promise<User> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        movies: {
          connect: {
            id: movieId,
          },
        },
      },
    });
    return this.db.user.findUnique({
      where: { id: userId },
      include: {
        movies: true,
      },
    });
  }
}

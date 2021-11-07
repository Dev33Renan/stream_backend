import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  year: Date;
  lenght: Date;

  @IsNotEmpty()
  storyline: string;

  @IsUrl()
  image: string;
}

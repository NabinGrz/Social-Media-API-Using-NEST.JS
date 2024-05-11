import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  caption: string;
}

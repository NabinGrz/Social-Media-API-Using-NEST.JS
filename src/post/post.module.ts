import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { PostController } from './post.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PostService } from './post.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule],
  providers: [UsersService, CloudinaryService, PostService],
  controllers: [PostController],
})
export class PostModule {}

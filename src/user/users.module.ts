import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
})
export class UsersModule {}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user.dto';
import { USER_MODEL, User, UserDocument } from './schema/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    console.log(this.userModel);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email: email });
      return user;
      //.exec();
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }
  async changeProfile(file: { buffer: Buffer }, userId: string) {
    try {
      const uploadPromise = await this.cloudinaryService.uploadFile(file);
      const user = await this.userModel.findById(userId);
      user.profileUrl = (await uploadPromise).secure_url;
      return await user.save();
    } catch (error) {
      return error;
    }
  }

  async create(createUserDto: CreateUserDTO) {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        throw new BadRequestException('Email address has already been used');
      } else {
        await this.userModel.create({
          ...createUserDto,
          password: await bcrypt.hash(createUserDto.password, 10),
        });
        return { message: 'User has been created' };
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    } else {
      return user;
    }
  }
  async update(id: string, updatedUserDto: UpdateUserDTO) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updatedUserDto, {
        new: true,
      });
      user;
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  async remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return {
      _id: id,
    };
  }
}
